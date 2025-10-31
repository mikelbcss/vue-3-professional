
<script setup lang="ts">

import { ref, reactive, computed, onMounted } from 'vue';
import type { User } from './user';

const title = ref('Perfil de Usuario Completo');
const user = reactive<User>({
  name: 'Juan',
  age: 25,
  email: 'juan@example.com',
  address: {
    city: 'Madrid',
    country: 'España',
  },
});

const updateName = () => {
  user.name = 'María';
};

const incrementAge = () => {
  user.age++;
};

const updateEmail = () => {
  user.email = 'maria@example.com';
};

const updateAddress = () => {
  user.address.city = 'Barcelona';
  user.address.country = 'España';
};

const reset = () => {
  user.name = 'Juan';
  user.age = 25;
  user.email = 'juan@example.com';
  user.address.city = 'Madrid';
  user.address.country = 'España';
};

const isAdult = computed(() => {
  return user.age >= 18;
});
const totalFields = computed(() => {
  return Object.keys(user).length + Object.keys(user.address).length;
});
</script>

<template>
  <div>
    <h2>{{ title }}</h2>
    <p>Nombre: {{ user.name }}</p>
    <p>Edad: {{ user.age }}</p>
    <p>Email: {{ user.email }}</p>
    <p>Ciudad: {{ user.address.city }}</p>
    <p>País: {{ user.address.country }}</p>
    <button @click="updateName">Cambiar Nombre</button>
    <button @click="incrementAge">Incrementar Edad</button>
    <button @click="updateEmail">Cambiar Email</button>
    <button @click="updateAddress">Cambiar Dirección</button>
    <button @click="reset">Resetear</button>
    <p v-if="isAdult">Es mayor de edad</p>
    <p>Total de campos: {{ totalFields }}</p>
  </div>
</template>
