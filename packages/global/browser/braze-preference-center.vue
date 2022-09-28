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
                v-model="email"
                type="email"
                required="required"
                placeholder="example@google.com"
                autocomplete="email"
                class="form-control"
                :disabled="didSubmit"
                @input="updateEmail"
              >
            </div>
          </div>
        </div>
        <div class="row mt-3">
          <subscription-group
            v-for="question in checked"
            :id="question.groupId"
            :key="question.groupId"
            :label="question.label"
            :description="question.description"
            :value="Boolean(question.checked)"
            :required="false"
            :disabled="loading"
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
    timeout: null,
  }),

  computed: {
    checked() {
      return this.questions.map(q => ({ ...q, checked: this.optIns[q.groupId] }));
    },
  },

  mounted() {
    // Set submission state
    this.setOptIns();
  },


  /**
   *
   */
  methods: {
    async setOptIns() {
      if (!/.+@.+\..+/.test(this.email)) return;
      this.loading = true;
      try {
        const r = await fetch(`${this.endpoint}/check?email=${encodeURIComponent(this.email)}`);
        const response = await r.json();
        if (!r.ok) {
          if (response.error) throw new Error(response.error);
          throw new Error(`${r.status} ${r.statusText}`);
        }
        this.optIns = response;
      } catch (e) {
        this.error = e.message;
      } finally {
        this.loading = false;
      }
    },
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
    updateEmail() {
      // Debounce/refresh state. will require computed props to re-render
      if (this.timeout) clearTimeout(this.timeout);
      this.timeout = setTimeout(this.setOptIns, 300);
    },
  },
};
</script>
