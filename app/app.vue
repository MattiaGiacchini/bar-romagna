<script setup lang="ts">
import AppHeader from "./components/AppHeader.vue";

useSeoMeta({
  robots: 'noindex, nofollow'
})
</script>

<template>
  <div class="background">
    <img src="/logo.svg" alt="Logo" class="logo"/>
  </div>
</template>

<style lang="scss">
.background {
  background-color: #FFEBBE; // el color de fondo
  display: flex;
  justify-content: center;   // centra horizontal
  align-items: center;       // centra vertical
  height: 100vh;             // ocupa toda la altura de la ventana
  max-height: 100vh;             // ocupa toda la altura de la ventana
  padding: 0 20%;            // margen lateral 20%
  box-sizing: border-box;
}

.logo {
  width: 100%;               // ocupará el ancho disponible dentro del padding
  height: auto;              // mantiene ratio original
  max-width: 100%;           // nunca excede del contenedor
}
</style>
