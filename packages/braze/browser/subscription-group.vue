<template>
  <div class="form-group">
    <div class="custom-control custom-checkbox">
      <input
        :id="`custom-boolean-${id}`"
        v-model="given"
        :disabled="disabled"
        :required="required"
        type="checkbox"
        class="custom-control-input"
      >
      <label class="custom-control-label" :for="`custom-boolean-${id}`" :required="required">
        <strong v-html="label" />
        <strong v-if="required" class="text-danger">*</strong>
        <span
          v-if="description"
          class="font-weight-normal d-block text-muted"
          v-html="description"
        />
      </label>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    id: {
      type: String,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    value: {
      type: Boolean,
      default: false,
    },
    required: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: '',
    },
  },
  computed: {
    given: {
      get() {
        return Boolean(this.value);
      },
      set(given) {
        this.$emit('input', Boolean(given));
      },
    },
  },
};
</script>
