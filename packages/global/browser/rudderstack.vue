<template>
  <div class="rudderstack-init" style="display: none;" />
</template>

<script>
const identify = (window) => (...args) => {
  const fn = window.rudderanalytics ? window.rudderanalytics.identify : () => {};
  return fn(...args);
};

export default {
  inject: ['EventBus'],
  props: {
    activeUser: {
      type: Object,
      default: () => {},
    },
  },
  created() {
    this.EventBus.$on('identity-x-login-link-sent', (payload) => {
      identify(window)(payload.data?.appUser?.id, { email: payload.email });
    });
    this.EventBus.$on('identity-x-authenticated', ({ id, email }) => {
      identify(window)(id, { email });
    });
    if (this.activeUser && this.activeUser.email) {
      const { id, email } = this.activeUser;
      identify(window)(id, { email });
    }
  },
};
</script>
