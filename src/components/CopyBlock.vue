<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  /** 终端标题（默认显示为代码语言或文件名） */
  title?: string
  /** 终端内展示的命令（带 $ 提示符，可复制） */
  command?: string
  /** 纯代码展示块（不可复制） */
  code?: string
}>()

const copied = ref(false)

async function copy() {
  if (!props.command) return
  try {
    await navigator.clipboard.writeText(props.command)
  } catch {
    // 剪贴板 API 不可用时的兜底
    const el = document.createElement('textarea')
    el.value = props.command
    document.body.appendChild(el)
    el.select()
    document.execCommand('copy')
    document.body.removeChild(el)
  }
  copied.value = true
  setTimeout(() => (copied.value = false), 1600)
}
</script>

<template>
  <div v-if="command" class="terminal">
    <div class="terminal-head">
      <div class="terminal-dots"><span /><span /><span /></div>
      <span class="terminal-title">{{ title ?? 'Terminal' }}</span>
      <button class="copy-btn" :class="{ copied }" type="button" @click="copy">
        {{ copied ? '已复制' : '复制' }}
      </button>
    </div>
    <div class="terminal-body">
      <span class="prompt">$ </span><span class="cmd">{{ command }}</span>
    </div>
  </div>

  <pre v-else-if="code" class="code-block"><code>{{ code }}</code></pre>
</template>
