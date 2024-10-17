import determineAccessKeyLabel from "./determineAccessKeyLabel.js";

function installAccessKeyLabelPolyfill() {
  // Exit if not in browser context
  if (typeof window === "undefined") {
    return;
  }

  // Exit if browser already supports accessKeyLabel
  if (
    Object.getOwnPropertyDescriptor(HTMLElement.prototype, "accessKeyLabel")
  ) {
    return;
  }

  // Determine accessKeyLabel
  const modifiers = determineAccessKeyLabel(window.navigator.userAgent);

  // Attach polyfill
  Object.defineProperty(HTMLElement.prototype, "accessKeyLabel", {
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

installAccessKeyLabelPolyfill();
