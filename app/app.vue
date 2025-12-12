<script setup lang="ts">
import AppHeader from "./components/AppHeader.vue";

useSeoMeta({
  robots: 'noindex, nofollow'
})
</script>

<template>
  <div>
    <AppHeader />
    <NuxtRouteAnnouncer />
    <NuxtWelcome />
  </div>
</template>
