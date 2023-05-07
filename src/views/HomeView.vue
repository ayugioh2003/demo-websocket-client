<script setup>
import { reactive } from 'vue'
const chapters = reactive([
  '1. 有使用者進入或離開頁面，跳出提示通知',
  '2. 跟其他使用者聊天',
  '3. 記錄聊天訊息',
  '4. 可切換房間'
])
</script>

<template>
  <main>Websocket Demo</main>
  <div>
    <div v-for="(item, index) in chapters" :key="index">{{ item }}</div>
  </div>
</template>
