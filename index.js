function elementLoaded(selector, target = document) {
  return new Promise((resolve, reject) => {
    const firstPass = target.querySelector(selector);
    if (firstPass) {
      resolve(firstPass);
      return;
    }

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type == 'childList') {
          for (const addedNode of mutation.addedNodes) {
            if (addedNode instanceof HTMLElement) {
              if (addedNode.matches(selector)) {
                observer.disconnect();
                resolve(addedNode);
                return;
              }
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
