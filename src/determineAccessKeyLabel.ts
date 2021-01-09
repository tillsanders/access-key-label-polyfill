export default function determineAccessKeyLabel(ua: string): string | undefined {
  // macOS
  if (ua.match(/macintosh/i)) {
    // Firefox
    if (ua.match(/firefox/i)) {
      const firefoxVersion = ua.match(/firefox[\s/](\d+)/i);
      // Firefox < v14
      if (firefoxVersion[1] && parseInt(firefoxVersion[1], 10) < 14) {
        return '⌃';
      }
    }
    return '⌃⌥';
  }

  // Internet Explorer / Edge
  if (ua.match(/msie|trident/i) || ua.match(/\sedge/i)) {
    return 'Alt + ';
  }

  // iOS / iPadOS
  if (ua.match(/(ipod|iphone|ipad)/i)) {
    // accessKeyLabel is supported > v14, but we're not checking for versions here, since we use
    // feature support detection
    return '⌃⌥';
  }

  // Fallback
  // Note: Apparently, Chrome for Android is not even supporting accessKey, so be prepared.
  return undefined;
}
