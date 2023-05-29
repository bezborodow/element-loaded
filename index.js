export default function elementLoaded(selector, target = document) {
  return new Promise((resolve, reject) => {
    const firstPass = target.querySelector(selector);
    if (firstPass) {
      resolve(firstPass);
      return;
    }

    const observer = new MutationObserver((mutations) => {
      for (const { addedNodes } of mutations) {
        for (const addedNode of addedNodes) {
          if (addedNode instanceof HTMLElement) {
            const element = (addedNode.matches(selector) && addedNode)
              || addedNode.querySelector(selector)
              || addedNode.closest(selector);

            if (element) {
              observer.disconnect();
              resolve(element);
              return;
            }
          }
        }
      }
    });

    document.addEventListener('DOMContentLoaded', () => {
      reject('DOM finished loading, not found.');
      observer.disconnect();
    });

    if (document.readyState != 'loading') {
      reject('DOM already loaded, not found.');
      return;
    }

    observer.observe(target, { subtree: true, childList: true });
  });
}
