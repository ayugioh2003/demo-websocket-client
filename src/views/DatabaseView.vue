<script setup>
import { onMounted, onUnmounted, reactive, watch, ref, nextTick } from 'vue'
import io from 'socket.io-client'
import dayjs from 'dayjs'

import { getMessages } from '@/apis/messages.js'

let socket = {}
const messageArea = ref(null)

const chatStatus = reactive({
  user: '',
  content: ''
})

const messages = ref([])

watch(
  messages,
  () => {
    // 若捲軸在最下方，則有新訊息時，捲軸持續在最下方
    if (
      Math.abs(
        messageArea.value.scrollTop +
          messageArea.value.offsetHeight -
          messageArea.value.scrollHeight
      ) <= 10
    ) {
      nextTick(() => {
        messageArea.value.scrollTop = messageArea.value.scrollHeight
      })
    }
  },
  { deep: true }
)

onMounted(() => {
  const URL = 'localhost:3005/'
  socket = io(URL, { transports: ['websocket'] })

  // 2. 處理聊天訊息
  socket.on('chatMessage', (data) => {
    console.log('data from server:', data)
    messages.value.push(data)
  })

  // 3. 取得聊天資料
  getMessage()
})

onUnmounted(() => {
  socket?.disconnect()
})

function sendMessage({ user, content }) {
  socket.emit('chatMessage', { user, content })
}

async function getMessage(query) {
  try {
    const { data } = await getMessages(query)
    messages.value = data.data
  } catch (error) {
    console.error(error)
  }
}
</script>

<template>
  <div>3. 記錄聊天訊息</div>
  <div class="flex justify-center">
    <div>
      <div class="overflow-y-auto h-[300px] max-w-xs" ref="messageArea">
        <div
          v-for="(message, index) in messages"
          :key="index"
          class="mb-2"
          :class="{ 'text-right': message.user === chatStatus.user }"
        >
          <div
            class="inline-block bg-gray-200 p-1 rounded-lg break-all"
            :class="{ 'bg-green-300': message.user === chatStatus.user }"
          >
            <span>{{ message.user }}</span> : {{ message.content }}
          </div>
          <div class="text-xs text-gray-300">
            {{ dayjs(message.createAt).format('YYYY-MM-DD hh:mm') }}
          </div>
        </div>
      </div>

      <hr />

      <label class="flex gap-2 mb-2">
        <input type="text" v-model="chatStatus.user" />
        <span>使用者名稱</span>
      </label>
      <div class="flex gap-2">
        <textarea v-model="chatStatus.content" />
        <button @click="sendMessage({ user: chatStatus.user, content: chatStatus.content })">
          送出訊息
        </button>
      </div>
    </div>
  </div>
</template>
