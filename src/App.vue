<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/notify">1.Notify</RouterLink>
        <RouterLink to="/chat">2.Chat</RouterLink>
        <RouterLink to="/database">3.database</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>

  <hr />

  <RouterView />
</template>

<style lang="scss">
.wrapper nav {
  display: flex;
  gap: 1rem;
}
</style>
