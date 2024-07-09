<template>
  <div style="color: red">{{ count }}</div>
  <button @click="inc">Click me</button>
</template>
<script>
import { ref, defineAsyncComponent } from 'vue';

export default {
  data() {
    return {
      title: 'Remote Component in Action..',
    };
  },
  setup() {
    const count = ref(0);
    const inc = () => {
      if(count.value %3 === 0) {
        throw new Error('ERROR_CHILD_COMPONENT');
      }
      count.value++;
    };

    return {
      count,
      inc,
    };
  },
};
</script>
