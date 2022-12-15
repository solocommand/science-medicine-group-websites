<template>
  <div class="row">
    <div :class="element('image-wrapper', ['d-none', 'd-md-flex', 'col-md-5', 'col-lg-4'])">
      <img
        v-if="imageSrc"
        :src="imageSrc"
        :srcset="imageSrcset"
        :alt="name"
        :class="element('image')"
      >
    </div>
    <div :class="element('form-wrapper', ['col-12', 'col-md-6', 'col-lg-5'])">
      <div :class="element('name')">
        {{ name }}
      </div>
      <!-- eslint-disable-next-line vue/no-v-html -->
      <div :class="element('description')" v-html="description" />
      <a href="/login">
        <sign-up-button
          :class="element('form-button')"
          label="Sign In"
        />
      </a>
    </div>
    <div :class="element('close-container', ['d-none', 'd-md-flex', 'col-md-1', 'col-lg-3'])">
      <close-button
        :class-name="element('close').join(' ')"
        target-button=".site-navbar__newsletter-toggler"
        :icon-modifiers="['lg']"
      />
    </div>
  </div>
</template>

<script>

import CloseButton from '@parameter1/base-cms-marko-web-theme-monorail/browser/newsletter-close-button.vue';
import SignUpButton from '@parameter1/base-cms-marko-web-theme-monorail/browser/newsletter-signup-form/sign-up-button.vue';

export default {
  components: {
    CloseButton,
    SignUpButton,
  },
  props: {
    blockName: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    imageSrc: {
      type: String,
      default: null,
    },
    imageSrcset: {
      type: String,
      default: null,
    },
    privacyPolicyLink: {
      type: Object,
      required: true,
    },
  },

  data: () => ({
    didFocus: false,
    email: null,
    error: null,
    isLoading: false,
    recaptcha: { loading: false, error: null },
  }),

  watch: {
    didFocus(value) {
      if (value) this.$emit('focus');
    },
  },

  methods: {
    element(elementName, classNames = []) {
      return [`${this.blockName}__${elementName}`, ...classNames];
    },

    async submit() {
      try {
        this.error = null;
        this.isLoading = true;
        window.location.href = `/user/subscribe?email=${this.email}`;
      } catch (e) {
        this.error = e;
        this.$emit('error', e);
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>
