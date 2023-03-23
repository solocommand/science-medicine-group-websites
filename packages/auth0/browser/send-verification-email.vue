<template>
  <div>
    <form @submit.prevent="handleSubmit">
      <p>
        Haven't seen the verification message yet? Click the link below to re-send.
      </p>
      <button type="submit" class="btn btn-link" :disabled="isButtonDisabled">
        Send verification email
      </button>
      <span v-if="didSubmit" class="ml-2">
        Done! You should receive a message in your inbox shortly.
      </span>
      <p v-if="error" class="mt-3 text-danger">
        An error occurred while processing your request: {{ error }}.
      </p>
    </form>
  </div>
</template>

<script>
export default {
  /**
   *
   */
  props: {
    endpoint: {
      type: String,
      default: '/__auth0/resend-email',
    },
    userId: {
      type: String,
      required: true,
    },
  },

  /**
   *
   */
  data: () => ({
    error: null,
    loading: false,
    didSubmit: false,
  }),

  /**
   *
   */
  computed: {
    isButtonDisabled() {
      return this.loading || (this.didSubmit && !this.error);
    },
  },

  /**
   *
   */
  methods: {
    async handleSubmit() {
      this.loading = true;
      this.error = null;
      try {
        const r = await fetch(this.endpoint, {
          method: 'post',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ userId: this.userId }),
        });
        if (!r.ok) {
          const { error } = await r.json();
          if (error) throw new Error(error);
          throw new Error(`${r.status} ${r.statusText}`);
        }
        this.didSubmit = true;
      } catch (e) {
        this.error = e.message;
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
