import determineAccessKeyLabel from '../src/determineAccessKeyLabel';
import installAccessKeyLabelPolyfill from '../src/AccessKeyLabelPolyfill';

describe('AccessKeyLabelPolyfill', () => {
  it('determines the correct modifiers', () => {
    const userAgents = [
      {
        // macOS, Safari
        test: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1 Safari/605.1.15',
        expectedModifiers: '⌃⌥',
      },
      {
        // macOS, Safari
        test: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0.1 Safari/605.1.15',
        expectedModifiers: '⌃⌥',
      },
      {
        // macOS, Chrome
        test: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36',
        expectedModifiers: '⌃⌥',
      },
      {
        // macOS, Newer Firefox
        test: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.13; rv:62.0) Gecko/20100101 Firefox/62.0',
        expectedModifiers: '⌃⌥',
      },
      {
        // macOS, Older Firefox
        test: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.9; rv:13.0) Gecko/20100101 Firefox/13.0',
        expectedModifiers: '⌃', // works different than other browsers on macOS!
      },
      {
        // Windows, IE 11
        test: 'Mozilla/5.0 CK={} (Windows NT 6.1; WOW64; Trident/7.0; rv:11.0) like Gecko',
        expectedModifiers: 'Alt + ',
      },
      {
        // Windows, Edge
        test: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.140 Safari/537.36 Edge/18.17763',
        expectedModifiers: 'Alt + ',
      },
      {
        // iPadOS
        test: 'Mozilla/5.0 (iPad8,5; CPU iPhone OS 13_3_1 like Mac OS X) AppleWebKit (KHTML, like Gecko) Version/13.3.1 Mobile Safari Quora 7.1.13 rv:2050',
        expectedModifiers: '⌃⌥',
      },
      {
        // Android for Chrome
        test: 'Mozilla/5.0 (Linux; Android 9; SM-G950F Build/PPR1.180610.011; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/74.0.3729.157 Mobile Safari/537.36',
        expectedModifiers: undefined,
      },
    ];
    userAgents.forEach((userAgent) => {
      expect(determineAccessKeyLabel(userAgent.test)).toBe(userAgent.expectedModifiers);
    })
  });

  it('will not install the polyfill if the browser seems to support accessKeyLabel natively', () => {
    Object.defineProperty(HTMLElement.prototype, 'accessKeyLabel', { value: 'test', writable: true });
    installAccessKeyLabelPolyfill()
    expect(HTMLElement.prototype.accessKeyLabel).toBe('test')
  });
});