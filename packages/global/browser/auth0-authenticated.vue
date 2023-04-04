<!-- eslint-disable no-restricted-globals -->
<template>
  <div class="auth0-idx-init" style="display: none;" />
</template>

<script>
export default {
  inject: ['EventBus'],
  props: {
    activeUser: {
      type: Object,
      default: () => {},
    },
    source: {
      type: String,
      default: '',
    },
    additionalEventData: {
      type: Object,
      default: () => {},
    },
  },
  created() {
    const url = new URL(window.location.href);
    if (this.activeUser.id && this.source) {
      this.EventBus.$emit('identity-x-authenticated', {
        id: this.activeUser.id,
        email: this.activeUser.email,
        additionalEventData: this.additionalEventData,
        source: this.source,
      });

      // Replace the current history entry to strip the additional query params
      url.searchParams.delete('authenticated');
      url.searchParams.delete('loginSource');
      url.searchParams.delete('additionalEventData');

      // eslint-disable-next-line no-restricted-globals
      history.replaceState(null, null, url);
    }
  },
};
</script>
