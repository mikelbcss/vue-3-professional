
<template>
  <div>
    <h2>{{ title }}</h2>
    <p>Valor: {{ counter }}</p>
    <button @click="increment">Incrementar</button>
    <button @click="reset">Reset</button>
    <p v-if="isEven">El número es par</p>
  </div>
</template>

<script setup lang="ts">

  import { ref, computed, onMounted } from 'vue';

  const title = ref('Contador Vue 3');
  const counter = ref(0);

  const isEven = computed(() => {
    return counter.value % 2 === 0;
  });

  const setLocaldata = (value: number) => {
    localStorage.setItem('counterValue', value.toString());
  };

  const increment = () => {
    counter.value++;
    setLocaldata(counter.value);
  };

  const reset = () => {
    counter.value = 0;
    setLocaldata(counter.value);
  };

  onMounted(() => {
    counter.value = parseInt(localStorage.getItem('counterValue') || '0');
  });

  onMounted(() => {
    alert(counter.value);
  });

</script>
