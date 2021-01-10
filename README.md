# AccessKeyLabelPolyfill

> Polyfills the accessKeyLabel property to improve discoverability of native keyboard shortcuts for
> your website. Tiny (< 1KB) and dependency-free.

With the [`accesskey` HTML property](https://developer.mozilla.org/de/docs/Web/HTML/Globale_Attribute/accesskey),
you can easily provide keyboard shortcuts for the buttons of your web application.

```html
<button accesskey="D">Do crazy stuff</button>
<!-- Can be activated using Ctrl + Alt + D -->
```

Sadly, most users don't even know these shortcuts can be used, even if the web developer provided
them. To make these shortcuts more discoverable you might decide to use the `title` property, a
tooltip or some other UI element to display the keyboard shortcut.

```html
<button accesskey="D">Do crazy stuff</button>
<small>Hint: Use Ctrl + Alt + D to quickly access this button!</small>
```

A good idea, but browsers use different combinations of modifier keys. But thanks to the
[`accessKeyLabel` property](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/accessKeyLabel),
we can easily get a string representation of the keyboard shortcut assigned by the browser. Sooo,
we're good, right? Alas, not quite. Though the API has been around for years,
[browser support](https://caniuse.com/?search=accessKeyLabel) isn't good enough. Especially, since
Chrome is still missing out. To help bridge the gap, you can use this polyfill and finally let your
users benefit from the keyboard shortcuts you provide!

[**Demo**](https://tillsanders.github.io/access-key-label-polyfill/)
[**Full length article** about accessKey and accessKeyLabel on dev.to](https://dev.to/tillsanders/boy-was-it-hard-to-implement-proper-keyboard-shortcuts-4d72)

## Usage

### NPM

Simply install the polyfill:

```sh
npm i access-key-label-polyfill
# or
yarn add access-key-label-polyfill
```

And the import and run the install function:

```javascript
import installAccessKeyLabelPolyfill from 'access-key-label-polyfill';
installAccessKeyLabelPolyfill();
```

Note: CJS, UMD and ESM are available, just take a look in the package.

### Browser

You can also use this polyfill 'oldschool'. Simply download the demo files and add the
`AccessKeyLabelPolyfill.umd.js` file to your body:

```html
<body>
  <!-- ... -->
  <script src="path/to/AccessKeyLabelPolyfill.umd.js"></script>
  <script>
    accessKeyLabelPolyfill(); // lowerCamelCase!
  </script>
```

## Demo

You can view the demo here: <https://tillsanders.github.io/access-key-label-polyfill/>

The demo will tell you wether the polyfill detected native support for `accessKeyLabel` or not and
will display either output below the button.

## How does it work?

First, the polyfill will try to detect wether the browser already supports `accessKeyLabel`. If it
does, it will exit immediately. If the browser doesn't support this API, the polyfill will add a
small function to fill the gap. This function will try to detect the browser / operating system and
return the correct label. You can then use `accessKeyLabel` as expected.

### Caveats

- To return the correct label, the polyfill needs to determine the correct operating system, browser
  and sometimes even the browser version. This is done with a very lightweight script and based on
  the user-agent. While this has been tested successfully and should work reliably, wrong
  user-agents can still mess it up, of course.
- The polyfill currently supports the major browsers on macOS (including Firefox < v14), namely
  Chrome. As well as Internet Explorer, Edge and Safari on iOS / iPadOS. There might be more
  browsers, that need this polyfill, but there is surprisingly little information regarding support,
  so please feel free to open an issue if you come across an unsupported case.
- Chrome on Android does not seem to support `accessKey`, or at least, I was unable to guess (why
  is this not documented anywhere?!) the correct modifier keys. Would love to get help with this!

# Changelog

## 0.1.1 – (10.01.2021)

- Fix browser detection of Edge

## 0.1.0 – (09.01.2021)

- Initial implementation
