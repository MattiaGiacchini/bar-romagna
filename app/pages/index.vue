<template>
  <div class="background">
    <img src="/logo-horizontal.svg" alt="Logo" class="logo"/>
  </div>
</template>

<style scoped lang="scss">
.background {
  background-color: #FFEABE; // el color de fondo
  height: 100%;
  min-height: 100%;
  display: flex;
  justify-content: center;   // centra horizontal
  align-items: center;       // centra vertical
  box-sizing: border-box;
}

.logo {
  width: 100%;               // ocupará el ancho disponible dentro del padding
  height: auto;              // mantiene ratio original
  max-width: 100%;           // nunca excede del contenedor
}
</style>