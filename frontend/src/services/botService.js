import videoService from "./videoService";

// Helper: pick one option from an array
function pick(options) {
  return options[Math.floor(Math.random() * options.length)];
}

// Long message generator used for testing and bulk output
function generateLongMessage(n = 1000) {
  const lines = new Array(n);
  for (let i = 0; i < n; i++)
    lines[i] = `Line ${i + 1}: This is part of a long test message.`;
  return lines.join("\n");
}

// Generic fetcher for video lists
async function fetchVideos(page, limit, label) {
  try {
    const res = await videoService.getAllVideos(page, limit);
    const vids = res?.data?.videos || [];
    if (!vids.length) return `No ${label.toLowerCase()} videos right now.`;
    return `${label}:\n` + vids.map((v, i) => `${i + 1}. ${v.title} `).join("\n");
  } catch {
    return `Unable to fetch ${label.toLowerCase()} videos right now.`;
  }
}

// Build detailed templates programmatically
const botService = {
  greeting: () =>
    pick([
      "I support these commands (type any of these): 1. Trending videos — /trending or just 'trending' 2. Recommended videos — /recommend or 'suggest me something' 3. Report bug — start a bug report 4. Contact us — show contact/support info"
    ]),


  recommend: () => fetchVideos(1, 8, "Here are some picks "),
  trending: () => fetchVideos(1, 4, "Trending "),
  recommended: () => fetchVideos(2, 4, "Recommended"),

  contact: () =>
    [
      "📞 Contact Us:",
      "Email: singhraj22996@gmail.com",
      "Phone: +91 9432561970",
      "Location: 1st Cross, 2nd Main, Near City Mall, MG Road, Bengaluru, Karnataka 560001",
    ].join("\n"),
};

// Minimal callable default export to preserve backward compatibility
export default async function sendMessage(text) {
  const t = (text || "").trim().toLowerCase();
  if (!t) return botService.help();

  // direct commands
  if (/^(\/longmessage|\/long)\b/i.test(t)) return generateLongMessage(1000);
  if (/(^|\s)(\/help|help)(\s|$)/i.test(t)) return botService.help();
  if (/\btrending\b|^\/trending\b|^\/top\b/i.test(t))
    return await botService.trending();
  if (/\brecommended?\b|^\/recommended?\b|\bsuggest\b/i.test(t)) {
    if (/recommended/i.test(t)) return await botService.recommended();
    return await botService.recommend();
  }
  if (/\bcontact\b|\bsupport\b|^\/contact\b/i.test(t))
    return botService.contact();

  // fallback: if text contains 'recommend' or 'trending'
  if (/recommend|suggest|trending/i.test(t))
    return await botService.recommend();

  // default greeting
  return botService.greeting();
}
