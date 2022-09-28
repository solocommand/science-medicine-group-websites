<template>
  <div>
    <form @submit.prevent="handleSubmit">
      <p>
        Form description/instructions can go here.
      </p>
      <fieldset>
        <div class="row">
          <div class="col-12">
            <div class="form-group">
              <label for="sign-on-email-address">
                Email Address
                <strong class="text-danger">*</strong>
              </label>
              <input
                id="sign-on-email-address"
                type="email"
                required="required"
                placeholder="example@google.com"
                autocomplete="email"
                class="form-control"
                :value="email"
                @input="updateEmail"
              >
            </div>
          </div>
        </div>
        <div class="row mt-3">
          <subscription-group
            v-for="question in questions"
            :id="question.groupId"
            :key="question.groupId"
            :label="question.label"
            :description="question.description"
            :value="Boolean(question.checked)"
            :required="false"
            @input="setSubscriptionGroup(question.groupId, $event)"
          />
        </div>
      </fieldset>
      <button type="submit" class="btn btn-primary" :disabled="loading">
        Update preferences
      </button>
      <span v-if="didSubmit" class="ml-2">
        Your preferences have been updated.
      </span>
      <p v-if="error" class="mt-3 text-danger">
        An error occurred while processing your request: {{ error }}.
      </p>
      <div class="row mt-3">
        <div class="col">
          <small class="text-muted">
            Privacy policy boilerplate can go here.
          </small>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import SubscriptionGroup from './braze-subscription-group.vue';

export default {
  /**
   *
   */
  components: {
    SubscriptionGroup,
  },
  /**
   *
   */
  props: {
    endpoint: {
      type: String,
      default: '/user/subscribe',
    },
    questions: {
      type: Array,
      required: true,
    },
    email: {
      type: String,
      default: '',
    },
  },

  /**
   *
   */
  data: () => ({
    error: null,
    loading: false,
    didSubmit: false,
    optIns: {},
  }),

  mounted() {
    // Check Braze API for user state?
    console.log('mounted, check braze');
    this.questions.forEach((q) => {
      this.optIns[q.groupId] = false;
    });
  },

  /**
   *
   */
  methods: {
    async handleSubmit() {
      this.loading = true;
      try {
        const r = await fetch(this.endpoint, {
          method: 'post',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ email: this.email, optIns: this.optIns }),
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
    setSubscriptionGroup(e, v) {
      this.optIns[e] = v;
    },
    updateEmail(email) {
      this.email = email;
      // Debounce/refresh state. will require computed props to re-render
    },
  },
};
</script>
