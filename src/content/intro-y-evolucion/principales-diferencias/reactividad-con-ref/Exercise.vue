<script setup lang="ts">
  import { ref, computed, onMounted } from 'vue';
  import type { ApiResult } from './api-result';
  const title = ref('Perfil de Usuario VUE3');
  const name = ref('Juan');
  const age = ref(25);
  const email = ref('juan@example.com');

  const answer = ref(undefined)
  const force = ref(undefined)
  const image = ref(undefined)

  const updateName = () => {
    name.value = 'María';
  };
  const incrementAge = () => {
    age.value++;
  };
  const updateEmail = () => {
    email.value = 'maria@example.com';
  };
  const reset = () => {
    name.value = 'Juan';
    age.value = 25;
    email.value = 'juan@example.com';
  };

  const isAdult = computed(() => {
    return age.value >= 18;
  });

  const getValue = () => {
    fetch('https://yesno.wtf/api')
      .then(response => response.json() as ApiResult)
      .then(data => {
        answer.value = data.answer;
        force.value = data.force;
        image.value = data.image;
      });
  }

  onMounted(() => {
    console.log('Componente montado');
    getValue()
  });
</script>


<template>
  <div>
    <h2>{{ title }}</h2>
    <p>Nombre: {{ name }}</p>
    <p>Edad: {{ age }}</p>
    <p>Email: {{ email }}</p>
    <p>Answer: {{ answer }}</p>
    <p>Force: {{ force }}</p>
    <p>Image: {{ image }}</p>
    <button @click="updateName">Cambiar Nombre</button>
    <button @click="incrementAge">Incrementar Edad</button>
    <button @click="updateEmail">Cambiar Email</button>
    <button @click="reset">Resetear</button>
    <p v-if="isAdult">Es mayor de edad</p>
  </div>
</template>
