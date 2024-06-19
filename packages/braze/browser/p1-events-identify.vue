<template>
  <div class="p1-events-identity-x" style="display: none;" />
</template>

<script>

export default {
  props: {
    identifier: {
      type: String,
      required: true,
    },
  },
  created() {
    window.p1events('setIdentity', this.identifier);
  },
};
</script>
