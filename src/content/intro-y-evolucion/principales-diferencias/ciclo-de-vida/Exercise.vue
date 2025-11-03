<template>
  <div>
    <p>Abre la consola para ver los mensajes del ciclo de vida</p>
  </div>
</template>

<script>
export default {
  mounted() {
    console.log('✅ mounted: Componente montado')
  },
  updated() {
    console.log('🔄 updated: Componente actualizado')
  },
  beforeUnmount() {
    console.log('🧹 beforeUnmount: Limpiando antes de desmontar')
  },
}
</script>
