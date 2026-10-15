'use client';

import React, { useMemo } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

interface MathRendererProps {
  content: string;
  className?: string;
}

/**
 * Renders mathematical expressions using KaTeX.
 * Supports inline `$math$` and `$$block math$$`, as well as standard mathematical symbols.
 */
export const MathRenderer: React.FC<MathRendererProps> = ({ content, className = '' }) => {
  const renderedHtml = useMemo(() => {
    if (!content) return '';

    try {
      // If content contains $...$ or $$...$$, parse and render those segments
      if (content.includes('$')) {
        const parts = content.split(/(\$\$[\s\S]*?\$\$|\$[^\$]+?\$)/g);
        return parts
          .map((part) => {
            if (part.startsWith('$$') && part.endsWith('$$')) {
              const math = part.slice(2, -2);
              return katex.renderToString(math, { displayMode: true, throwOnError: false });
            } else if (part.startsWith('$') && part.endsWith('$')) {
              const math = part.slice(1, -1);
              return katex.renderToString(math, { displayMode: false, throwOnError: false });
            }
            return escapeHtml(part);
          })
          .join('');
      }

      // Check if standard math formulas are present (e.g. x² - 8x + 15 = 0 or LaTeX tags \frac, \sqrt)
      if (
        content.includes('\\frac') ||
        content.includes('\\sqrt') ||
        content.includes('\\pm') ||
        content.includes('\\alpha') ||
        content.includes('\\beta') ||
        content.includes('\\theta')
      ) {
        return katex.renderToString(content, { displayMode: false, throwOnError: false });
      }

      // Fallback: standard safe text with preserved superscripts and formatting
      return escapeHtml(content);
    } catch (e) {
      return escapeHtml(content);
    }
  }, [content]);

  return (
    <span
      className={`academic-math-content inline leading-relaxed ${className}`}
      dangerouslySetInnerHTML={{ __html: renderedHtml }}
    />
  );
};

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
    .replace(/\n/g, '<br />');
}
