<script setup>
import { onMounted, onUnmounted } from 'vue'
import io from 'socket.io-client'
import Swal from 'sweetalert2'

let socket = {}

onMounted(() => {
  const URL = 'http://localhost:3005/'
  socket = io(URL, { transports: ['websocket'] })

  socket.on('userConnectNotify', (data) => {
    console.log('data from server:', data)
    Swal.fire({
      toast: true,
      title: data,
      position: 'top-end',
      showConfirmButton: false,
      timerProgressBar: true,
      timer: 3000
    })
  })
})

onUnmounted(() => {
  socket?.disconnect()
})
</script>

<template>
  <div>1. 有使用者進入或離開頁面，跳出提示通知</div>
</template>
