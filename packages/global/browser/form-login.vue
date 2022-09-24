<template>
  <div v-if="hasActiveUser">
    <p>You are currently logged in as {{ activeUser.email }}.</p>
    <a
      :href="endpoints.profile"
      class="btn btn-secondary"
      role="button"
    >
      {{ buttonLabels.profile || "Modify Profile" }}
    </a>
    <a
      :href="endpoints.logout"
      class="btn btn-primary"
      role="button"
    >
      {{ buttonLabels.logout || "Log out" }}
    </a>
  </div>
  <div v-else>
    <form @submit.prevent="handleSubmit">
      <p>
        Register and gain access to premium content, including this article and much more.
        To get started, click the button below.
      </p>
      <a :href="loginUrl" class="btn btn-primary" :disabled="loading">
        Log in
      </a>
      <p v-if="error" class="mt-3 text-danger">
        An error occurred: {{ error.message }}
      </p>
    </form>
  </div>
</template>

<script>
import EventEmitter from '@parameter1/base-cms-marko-web-identity-x/browser/mixins/global-event-emitter';

export default {
  /**
   *
   */
  mixins: [EventEmitter],

  /**
   *
   */
  props: {
    source: {
      type: String,
      default: 'default',
    },
    activeUser: {
      type: Object,
      default: () => {},
    },
    endpoints: {
      type: Object,
      required: true,
    },
    buttonLabels: {
      type: Object,
      default: () => ({
        continue: 'Continue',
        profile: 'Modify Profile',
        logout: 'Logout',
      }),
    },
    consentPolicy: {
      type: String,
      default: null,
    },
    redirect: {
      type: String,
      default: null,
    },
    appContextId: {
      type: String,
      default: null,
    },
    loginEmailPlaceholder: {
      type: String,
      default: null,
    },
    senderEmailAddress: {
      type: String,
      default: 'noreply@identity-x.parameter1.com',
    },
    actionText: {
      type: String,
      default: 'logging in',
    },
    loginEmailLabel: {
      type: String,
      default: 'Email Address',
    },

    /**
     * Regional consent polices to display (if/when a user selects a country on login)
     * if enabled.
     */
    regionalConsentPolicies: {
      type: Array,
      default: () => [],
    },
  },

  /**
   *
   */
  data: () => ({
    error: null,
    loading: false,
  }),

  /**
   *
   */
  computed: {
    /**
     *
     */
    hasActiveUser() {
      return this.activeUser && this.activeUser.email;
    },

    /**
     *
     */
    loginUrl() {
      return `/login?returnTo=${this.redirectTo}`;
    },

    /**
     *
     */
    redirectTo() {
      const { redirect } = this;
      if (redirect) return redirect;
      const { pathname, search, hash } = window.location;
      return `${pathname}${search}${hash}`;
    },
  },

  /**
   *
   */
  mounted() {
    this.emit('login-mounted');
  },
};
</script>
