import scrollLock from 'scroll-lock';

export const disable = () => {
  scrollLock.enablePageScroll();
};

export const enable = () => {
  scrollLock.disablePageScroll();
};

export const toggle = () => {
  const canScroll = scrollLock.getScrollState();
  canScroll ? scrollLock.disablePageScroll() : scrollLock.enablePageScroll();
};
