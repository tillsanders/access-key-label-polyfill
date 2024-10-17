import determineAccessKeyLabel from './determineAccessKeyLabel.js';

export default function installAccessKeyLabelPolyfill() {
  // Exit if browser already supports accessKeyLabel
  if (Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'accessKeyLabel')) {
    return;
  }

  // Determine accessKeyLabel
  const modifiers = determineAccessKeyLabel(window.navigator.userAgent);

  // Attach polyfill
  Object.defineProperty(HTMLElement.prototype, 'accessKeyLabel', {
    // eslint-disable-next-line no-unused-vars
    get(this: HTMLElement) {
      if (!this.accessKey || !modifiers) {
        return undefined;
      }
      return modifiers + this.accessKey;
    },
    enumerable: true,
    configurable: true,
  });
}
