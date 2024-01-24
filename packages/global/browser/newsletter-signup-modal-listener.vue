<template>
  <div style="display: none;" />
</template>

<script>
export default {
  created() {
    setTimeout(() => {
      // @todo Correct newsletterSignupType to a specific type for this signup position
      if (window.dataLayer.find((dataEvent) => dataEvent['identity-x'] && dataEvent['identity-x'].newsletterSignupType === 'inlineContent')) {
        const newsletterSignupModalElement = document.getElementById('newsletter-signup-modal');
        newsletterSignupModalElement.classList.add('newsletter-signup-modal-fade-in');
      }
    }, 5000);
  },
};
</script>
