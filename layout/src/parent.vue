<template>
  <div class="parent-app">
    <!-- host app HOST-->
    <div class="app-label"># Hosting App [HOST]</div>
    <img src="./logo.png" width="30" />
    <button @click="inc">Click me</button>

    <h1>parent App 1</h1>
    <div class="remote-component">
      <!-- remote-component REMOTE -->
      <div class="app-label">#remote-component [REMOTE]</div>
      <content-element />
      <button-element />
    </div>
  </div>
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
    const count = ref(1);
    const inc = () => {
      if(count.value %5 === 0) {
        throw new Error('ERROR_PARENT_COMPONENT');
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

<style scoped>
img {
  width: 200px;
}
h1 {
  font-family: Arial, Helvetica, sans-serif;
}
.remote-component {
  border: 1px solid blue;
  padding: 10px;
}
.parent-app {
  border: 1px solid green;
  padding: 10px;
}
.app-label {
  padding: 5px 2px;
  font-style: italic;
  font-size: 20px;
  color: gray;
}
</style>
