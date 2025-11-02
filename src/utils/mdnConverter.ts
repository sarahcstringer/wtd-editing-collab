/**
 * Converts MDN-specific syntax to standard HTML/Markdown
 */

/**
 * Escapes HTML entities to prevent XSS attacks
 */
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Metadata extracted from markdown frontmatter
 */
interface DocumentMetadata {
  title: string;
  slug: string;
  pageType: string;
  content: string;
}

export function convertMDNSyntax(content: string): string {
  let converted = content;

  // Convert [!NOTE] style callouts to blockquotes
  // Keep as blockquote so marked can process the markdown inside
  // Don't add "Note:" text since CSS ::before already adds "ℹ️ NOTE"
  converted = converted.replace(
    />\s*\[!NOTE\]\n>\s*/g,
    '> '
  );

  // Convert {{DOMxRef("Foo", "text")}} to link
  converted = converted.replace(
    /\{\{DOMxRef\("([^"]+)"(?:,\s*"([^"]+)")?\)\}\}/g,
    (_, ref, text) => {
      const linkText = text || ref;
      // Remove parentheses and convert dots to slashes for URL
      const slug = ref.replace(/\(\)/g, '').replace(/\./g, '/');
      return `<a href="https://developer.mozilla.org/en-US/docs/Web/API/${slug}" target="_blank" rel="noopener">${escapeHtml(linkText)}</a>`;
    }
  );

  // Convert {{domxref("Foo")}} (lowercase variant)
  converted = converted.replace(
    /\{\{domxref\("([^"]+)"(?:,\s*"([^"]+)")?(?:,\s*"[^"]*")?(?:,\s*"[^"]*")?\)\}\}/g,
    (_, ref, text) => {
      const linkText = text || ref;
      // Remove parentheses and convert dots to slashes for URL
      const slug = ref.replace(/\(\)/g, '').replace(/\./g, '/');
      return `<a href="https://developer.mozilla.org/en-US/docs/Web/API/${slug}" target="_blank" rel="noopener">${escapeHtml(linkText)}</a>`;
    }
  );

  // Convert {{Glossary("Term", "Text")}} to abbr tag
  converted = converted.replace(
    /\{\{Glossary\("([^"]+)"(?:,\s*"([^"]+)")?\)\}\}/g,
    (_, term, text) => {
      const displayText = text || term;
      const slug = term.replace(/\s+/g, '_');
      return `<a href="https://developer.mozilla.org/en-US/docs/Glossary/${slug}" target="_blank" rel="noopener"><abbr title="${escapeHtml(term)}">${escapeHtml(displayText)}</abbr></a>`;
    }
  );

  // Convert {{httpheader("Foo")}} to code
  converted = converted.replace(
    /\{\{httpheader\("([^"]+)"\)\}\}/g,
    (_, header) => `<code>${escapeHtml(header)}</code>`
  );

  // Convert {{DefaultAPISidebar("Foo")}} - just remove it
  converted = converted.replace(/\{\{DefaultAPISidebar\([^)]+\)\}\}/g, '');

  return converted;
}

export function extractMetadata(content: string): DocumentMetadata {
  // Limit frontmatter size to prevent ReDoS attacks
  const frontmatterMatch = content.match(/^---\n([\s\S]{1,10000}?)\n---/);
  if (!frontmatterMatch) {
    return { title: 'Untitled', slug: '', pageType: '', content };
  }

  const frontmatter = frontmatterMatch[1];
  const titleMatch = frontmatter.match(/title:\s*(.+)/);
  const slugMatch = frontmatter.match(/slug:\s*(.+)/);
  const pageTypeMatch = frontmatter.match(/page-type:\s*(.+)/);

  const contentWithoutFrontmatter = content.replace(/^---\n[\s\S]{1,10000}?\n---\n/, '');

  return {
    title: titleMatch ? titleMatch[1].trim() : 'Untitled',
    slug: slugMatch ? slugMatch[1].trim() : '',
    pageType: pageTypeMatch ? pageTypeMatch[1].trim() : '',
    content: contentWithoutFrontmatter,
  };
}
