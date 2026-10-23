import { URL } from 'url';

export interface SsrfValidationResult {
  isSafe: boolean;
  normalizedUrl?: string;
  blockedReason?: string;
}

// Blocked private / internal subnet definitions
const BLOCKED_HOSTNAMES = new Set([
  'localhost',
  '127.0.0.1',
  '0.0.0.0',
  '::1',
  'metadata.google.internal',
  'instance-data',
]);

const CLOUD_METADATA_IPS = ['169.254.169.254', '169.254.169.123'];

/**
 * Validate that a URL does not target loopback, RFC 1918 private subnets, or cloud metadata services.
 */
export function validateUrlForSsrf(inputUrl: string): SsrfValidationResult {
  try {
    const parsed = new URL(inputUrl.trim());

    // 1. Only allow HTTP and HTTPS protocols
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
      return {
        isSafe: false,
        blockedReason: `Disallowed protocol scheme "${parsed.protocol}". Only HTTP and HTTPS are permitted.`,
      };
    }

    const hostname = parsed.hostname.toLowerCase();

    // 2. Reject explicit blocked hostnames
    if (BLOCKED_HOSTNAMES.has(hostname)) {
      return {
        isSafe: false,
        blockedReason: `Forbidden loopback or local hostname "${hostname}".`,
      };
    }

    // 3. Reject cloud metadata endpoints
    if (CLOUD_METADATA_IPS.includes(hostname) || hostname.startsWith('169.254.')) {
      return {
        isSafe: false,
        blockedReason: 'SSRF Attack vector blocked: Cloud metadata service destination.',
      };
    }

    // 4. IP Range validation (RFC 1918 & Loopback)
    const ipv4Regex = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/;
    const ipMatch = hostname.match(ipv4Regex);

    if (ipMatch) {
      const octet1 = parseInt(ipMatch[1], 10);
      const octet2 = parseInt(ipMatch[2], 10);

      // Loopback (127.0.0.0/8)
      if (octet1 === 127) {
        return { isSafe: false, blockedReason: 'Loopback 127.x.x.x addresses are forbidden.' };
      }

      // Zero-network (0.0.0.0/8)
      if (octet1 === 0) {
        return { isSafe: false, blockedReason: 'Zero-network destination is forbidden.' };
      }

      // 10.0.0.0/8 (RFC 1918)
      if (octet1 === 10) {
        return { isSafe: false, blockedReason: 'Private RFC1918 (10.x.x.x) address is forbidden.' };
      }

      // 172.16.0.0 - 172.31.255.255 (RFC 1918)
      if (octet1 === 172 && octet2 >= 16 && octet2 <= 31) {
        return { isSafe: false, blockedReason: 'Private RFC1918 (172.16-31.x.x) address is forbidden.' };
      }

      // 192.168.0.0/16 (RFC 1918)
      if (octet1 === 192 && octet2 === 168) {
        return { isSafe: false, blockedReason: 'Private RFC1918 (192.168.x.x) address is forbidden.' };
      }
    }

    // 5. Port restriction: Block internal ports (ssh, redis, postgres, mongo)
    if (parsed.port) {
      const portNum = parseInt(parsed.port, 10);
      const allowedPorts = [80, 443, 8080, 8443];
      if (!allowedPorts.includes(portNum)) {
        return {
          isSafe: false,
          blockedReason: `Non-standard port ${portNum} is forbidden. Allowed ports are: 80, 443, 8080, 8443.`,
        };
      }
    }

    return {
      isSafe: true,
      normalizedUrl: parsed.toString(),
    };
  } catch (err: any) {
    return {
      isSafe: false,
      blockedReason: `Malformed or unparseable URL: ${err.message}`,
    };
  }
}

/**
 * Safe fetch wrapper that enforces SSRF checks, max payload boundaries (2MB), and request timeouts
 */
export async function safeFetchDocument(
  targetUrl: string,
  options: { maxBytes?: number; timeoutMs?: number } = {}
): Promise<{ ok: boolean; status?: number; data?: string; mimeType?: string; error?: string }> {
  const maxBytes = options.maxBytes || 2 * 1024 * 1024; // 2MB
  const timeoutMs = options.timeoutMs || 5000; // 5s timeout

  const validation = validateUrlForSsrf(targetUrl);
  if (!validation.isSafe) {
    return { ok: false, error: validation.blockedReason };
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(validation.normalizedUrl!, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'LoopEdu-FactBot/1.0 (+https://loopedu.in/about/crawling)',
        Accept: 'text/html,application/xhtml+xml,application/json;q=0.9,*/*;q=0.8',
      },
      redirect: 'manual', // Re-evaluate redirects
    });

    clearTimeout(timer);

    // Reject redirection to untrusted destinations without validation
    if (res.status >= 300 && res.status < 400) {
      const redirectLocation = res.headers.get('location');
      if (redirectLocation) {
        const redirectCheck = validateUrlForSsrf(redirectLocation);
        if (!redirectCheck.isSafe) {
          return { ok: false, error: `Unsafe redirect target blocked: ${redirectCheck.blockedReason}` };
        }
      }
    }

    const contentType = res.headers.get('content-type') || 'text/html';
    const textData = await res.text();

    if (textData.length > maxBytes) {
      return { ok: false, error: `Document exceeded max permitted size (${maxBytes} bytes)` };
    }

    return {
      ok: true,
      status: res.status,
      data: textData,
      mimeType: contentType,
    };
  } catch (err: any) {
    clearTimeout(timer);
    if (err.name === 'AbortError') {
      return { ok: false, error: `Request timed out after ${timeoutMs}ms` };
    }
    return { ok: false, error: err.message };
  }
}
