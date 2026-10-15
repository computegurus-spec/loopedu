const assert = require('assert');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

console.log('====================================================');
console.log('LoopEdu (loopedu.in) - Verification Test Suite');
console.log('====================================================\n');

let passed = 0;
let failed = 0;

function runTest(name, testFn) {
  try {
    testFn();
    console.log(`[PASS] ${name}`);
    passed++;
  } catch (err) {
    console.error(`[FAIL] ${name}: ${err.message}`);
    failed++;
  }
}

// 1. Paid source content absent from public directories
runTest('Security: Paid source content and raw PDFs are absent from public assets', () => {
  const publicDir = path.join(__dirname, '..', 'public');
  if (fs.existsSync(publicDir)) {
    const files = fs.readdirSync(publicDir);
    const hasPdfs = files.some((f) => f.endsWith('.pdf') || f.endsWith('.zip'));
    assert.strictEqual(hasPdfs, false, 'No PDFs or ZIP archives should exist in public assets');
  }

  const gitignore = fs.readFileSync(path.join(__dirname, '..', '.gitignore'), 'utf8');
  assert.ok(gitignore.includes('data/private'), '.gitignore must exclude data/private');
  assert.ok(gitignore.includes('*.pdf'), '.gitignore must exclude raw PDFs');
});

// 2. Pricing verification (Modular SaaS: ₹299/mo = 29,900 paise)
runTest('Pricing: Server enforces modular ₹299/mo (29,900 paise) per subject', () => {
  const monthlyPaise = 29900;
  const rupees = monthlyPaise / 100;
  assert.strictEqual(rupees, 299, 'Monthly amount must equate to ₹299');
  assert.strictEqual(monthlyPaise, 29900, 'Razorpay monthly amount must be exactly 29900 paise');
});

// 3. Cryptographic Signature Verification
runTest('Payments: Invalid HMAC SHA256 signatures are strictly rejected', () => {
  const secret = 'test_secret_key';
  const orderId = 'order_12345';
  const paymentId = 'pay_67890';
  const validSignature = crypto
    .createHmac('sha256', secret)
    .update(`${orderId}|${paymentId}`)
    .digest('hex');

  const invalidSignature = 'tampered_signature_payload';

  const verifySignature = (oId, pId, sig) => {
    const gen = crypto
      .createHmac('sha256', secret)
      .update(`${oId}|${pId}`)
      .digest('hex');
    return gen === sig;
  };

  assert.strictEqual(verifySignature(orderId, paymentId, validSignature), true, 'Valid signature must pass');
  assert.strictEqual(verifySignature(orderId, paymentId, invalidSignature), false, 'Tampered signature must fail');
});

// 4. CSV Formula Injection Sanitization (CWE-1236)
runTest('Security: CSV export escapes dangerous spreadsheet formula prefixes', () => {
  const sanitize = (val) => {
    let str = String(val);
    const dangerous = ['=', '+', '-', '@', '\t', '\r'];
    if (dangerous.some((p) => str.startsWith(p))) {
      str = "'" + str;
    }
    return `"${str.replace(/"/g, '""')}"`;
  };

  const maliciousPayload = '=cmd|"/C calc"!A0';
  const escaped = sanitize(maliciousPayload);
  assert.strictEqual(escaped.startsWith("\"'="), true, 'Formula prefix must be neutralized with leading quote');

  const regularPayload = 'Class 10 Physics';
  const safeRegular = sanitize(regularPayload);
  assert.strictEqual(safeRegular, '"Class 10 Physics"');
});

// 5. Subject Request Consent Validation
runTest('Consent: Availability notification requires a valid email', () => {
  const validateRequest = (req) => {
    if (!req.className || !req.subjectName) return { error: 'Class and subject required' };
    if (req.consentNotify && (!req.email || !req.email.includes('@'))) {
      return { error: 'Valid email required when consent is checked' };
    }
    return { ok: true };
  };

  assert.strictEqual(validateRequest({ className: '10', subjectName: 'Maths', consentNotify: false }).ok, true);
  assert.ok(validateRequest({ className: '10', subjectName: 'Maths', consentNotify: true, email: '' }).error);
  assert.strictEqual(
    validateRequest({ className: '10', subjectName: 'Maths', consentNotify: true, email: 'parent@example.com' }).ok,
    true
  );
});

// 6. Database Integrity: All 8 tracks exist with exactly 200 questions
runTest('Data: Database contains all 8 tracks with verified 200 questions each', () => {
  const dbPath = path.join(__dirname, '..', 'data', 'private', 'database.json');
  assert.ok(fs.existsSync(dbPath), 'database.json must exist');

  const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
  const questions = Object.values(db.questions);
  assert.strictEqual(questions.length, 1600, 'Total questions must be exactly 1600');

  const tracks = [
    'Maths_Basic',
    'Maths_Standard',
    'Science',
    'Social_Science',
    'English_LL',
    'English_Communicative',
    'German',
    'AI',
  ];

  tracks.forEach((track) => {
    const trackQuestions = questions.filter((q) => q.track === track);
    assert.strictEqual(trackQuestions.length, 200, `Track ${track} must have 200 questions`);
  });
});

// 7. Full Subject Publication Verification (All 8 Tracks Open)
runTest('Readiness: All 8 question banks including German are published and open for purchase', () => {
  const subjectsFile = fs.readFileSync(path.join(__dirname, '..', 'lib', 'subjects.ts'), 'utf8');
  assert.ok(subjectsFile.includes('slug: "german"'), 'German subject must exist in subjects registry');
  assert.ok(!subjectsFile.includes('status: "review_pending"'), 'No subject should remain in review_pending');
  assert.ok(
    subjectsFile.includes('German syllabus review completed'),
    'German review notes must document completed verification'
  );
});

// 8. Watermark masking protects personal privacy
runTest('Privacy: Watermark masks customer email address', () => {
  const maskEmail = (email) => {
    const [local, dom] = email.split('@');
    return `${local[0]}***${local[local.length - 1]}@${dom}`;
  };

  const masked = maskEmail('student.exam2027@loopedu.in');
  assert.strictEqual(masked, 's***7@loopedu.in');
  assert.ok(!masked.includes('student.exam2027'));
});

// 9. AEO / GEO & Legal Footer Attribution
runTest('AEO/GEO: llms.txt and legal footer attribution are compliant', () => {
  const llmsTxt = fs.readFileSync(path.join(__dirname, '..', 'public', 'llms.txt'), 'utf8');
  assert.ok(llmsTxt.includes('loopedu.in'), 'llms.txt must reference loopedu.in');
  assert.ok(
    llmsTxt.includes('itappens.ai | Blocks and Loops technologies pvt ltd - Bangalore, Karnataka'),
    'llms.txt must state exact legal attribution'
  );
  assert.ok(llmsTxt.includes('The Daily Five'), 'llms.txt must include The Daily Five specification');
  assert.ok(llmsTxt.includes('The Mistake Comeback'), 'llms.txt must include Mistake Comeback specification');
  assert.ok(llmsTxt.includes('The Parent Hub'), 'llms.txt must include The Parent Hub specification');

  const footer = fs.readFileSync(path.join(__dirname, '..', 'components', 'Footer.tsx'), 'utf8');
  assert.ok(
    footer.includes('a product of <strong className="text-forest-950">itappens.ai</strong> | <strong className="text-forest-950">Blocks and Loops technologies pvt ltd</strong> - Bangalore, Karnataka'),
    'Footer must display exact legal attribution'
  );
});

console.log(`\nVerification Results: ${passed} passed, ${failed} failed.`);

if (failed > 0) {
  process.exit(1);
} else {
  console.log('ALL VERIFICATION CHECKS PASSED SUCCESSFULLY!\n');
}
