<template>
  <div :id="id" :class="bem('item', [type])" @click="expanded = !expanded">
    <h4 v-if="name" :class="bem('title')">
      {{ name }}
    </h4>
    <!-- eslint-disable-next-line vue/no-v-html -->
    <div :class="slotClasses" v-html="body" />
  </div>
</template>

<script>
export default {
  props: {
    blockName: {
      type: String,
      default: 'collapsible-sidebar',
    },
    type: {
      type: String,
      default: 'collapsible-sidebar',
    },
    name: {
      default: '',
      type: String,
    },
    body: {
      required: false,
      type: String,
      default: '',
    },
    id: {
      required: true,
      type: Number,
    },
  },
  data: () => ({ expanded: false }),
  computed: {
    slotClasses() {
      return this.bem('content', [...(this.expanded ? ['expanded'] : ['collapsed'])]);
    },
  },
  methods: {
    bem(name, mod = []) {
      return [
        this.blockName,
        `${this.blockName}__${name}`,
        ...mod.map((m) => `${this.blockName}__${name}--${m}`),
      ];
    },
  },
};
</script>
