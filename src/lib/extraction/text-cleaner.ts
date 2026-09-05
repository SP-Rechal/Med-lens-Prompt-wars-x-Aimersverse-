export function cleanText(raw: string): string {
  if (!raw) return '';
  
  return raw
    // Replace non-printable characters and weird whitespace with standard spaces
    .replace(/[\x00-\x1F\x7F-\x9F]/g, ' ')
    // Normalize newlines (replace multiple newlines with double newline)
    .replace(/\n{3,}/g, '\n\n')
    // Normalize spaces (replace multiple spaces with single space)
    .replace(/[ \t]{2,}/g, ' ')
    .trim();
}

export function segmentReportSections(text: string): Record<string, string> {
  const sections: Record<string, string> = {};
  
  // This is a basic heuristics-based approach to finding sections.
  // Many lab reports use ALL CAPS followed by a colon or newline for section headers.
  const sectionRegex = /^([A-Z][A-Z\s\/\-&]{3,30})(?::|\s*$)/gm;
  
  let match;
  let lastIndex = 0;
  let currentSection = 'General';
  
  while ((match = sectionRegex.exec(text)) !== null) {
    const sectionTitle = match[1].trim();
    const sectionStart = match.index;
    
    if (sectionStart > lastIndex) {
      sections[currentSection] = text.substring(lastIndex, sectionStart).trim();
    }
    
    currentSection = sectionTitle;
    lastIndex = sectionRegex.lastIndex;
  }
  
  // Add the last section
  if (lastIndex < text.length) {
    sections[currentSection] = text.substring(lastIndex).trim();
  }
  
  // Clean up empty sections
  for (const key in sections) {
    if (!sections[key]) {
      delete sections[key];
    }
  }
  
  return sections;
}
