<template>
  <div style="display: none;" />
</template>

<script>
import cookies from 'js-cookie';

export default {
  props: {
    cookieName: {
      type: String,
      required: true,
    },
    cookieValue: {
      type: String,
      default: '0',
    },
    hasCookie: {
      type: Boolean,
      required: true,
    },
  },
  created() {
    setTimeout(() => {
      const newsletterSignupModalElement = document.getElementById('newsletter-signup-modal');
      if (
        this.hasCookie
        && this.cookieValue === '1'
        && window.dataLayer.find((dataEvent) => dataEvent['identity-x']
        && dataEvent['identity-x'].newsletterSignupType === 'modal')
        && !window.location.pathname.match(/^\/user|\/page/)
      ) {
        newsletterSignupModalElement.classList.add('newsletter-signup-modal-fade-in');
        // Set cookie, expires is in days so we have to divide by 24 for hours
        cookies.set(this.cookieName, '2', { expires: 1 / 24 });
      } else if (this.hasCookie && this.cookieValue === '0') {
        cookies.set(this.cookieName, '1', { expires: 1 });
      } else if (!this.hasCookie) {
        cookies.set(this.cookieName, '0', { expires: 1 });
      }
    }, 2500);
  },
};
</script>
