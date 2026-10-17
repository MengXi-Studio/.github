import type { Directive } from 'vue'

function reducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/* --------------------------------------------------------------------------
 * v-reveal：滚动显现
 * -------------------------------------------------------------------------- */

interface RevealCtx {
  stagger?: boolean
}

const revealCtx = new WeakMap<HTMLElement, RevealCtx>()

let revealObserver: IntersectionObserver | null = null

function getRevealObserver(): IntersectionObserver {
  if (!revealObserver) {
    revealObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          revealObserver!.unobserve(entry.target)
          runReveal(entry.target as HTMLElement)
        }
      },
      { threshold: 0, rootMargin: '0px 0px -48px 0px' },
    )
  }
  return revealObserver
}

function runReveal(el: HTMLElement): void {
  const stagger = revealCtx.get(el)?.stagger

  if (stagger) {
    // 容器变体：为直接子元素添加显现类，按序错峰
    const children = Array.from(el.children) as HTMLElement[]
    children.forEach((child, i) => {
      child.style.transitionDelay = `${i * 70}ms`
      child.classList.add('reveal')
    })
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        children.forEach((child) => child.classList.add('revealed'))
      })
    })
    // 最后一个子元素动画结束后清理，避免延迟影响后续 hover 交互
    window.setTimeout(
      () => {
        for (const child of children) {
          child.classList.remove('reveal', 'revealed')
          child.style.removeProperty('transition-delay')
        }
      },
      children.length * 70 + 780,
    )
    return
  }

  // 自身变体
  el.classList.add('revealed')
  const delay = parseInt(el.style.transitionDelay || '0', 10) || 0
  window.setTimeout(
    () => {
      el.classList.remove('reveal', 'revealed')
      el.style.removeProperty('transition-delay')
    },
    delay + 800,
  )
}

export const vReveal: Directive<HTMLElement, unknown> = {
  mounted(el, binding) {
    if (reducedMotion()) return
    const stagger = !!binding.modifiers.stagger
    revealCtx.set(el, { stagger })
    if (stagger) el.classList.add('reveal-group')
    else el.classList.add('reveal')
    getRevealObserver().observe(el)
  },
  unmounted(el) {
    revealObserver?.unobserve(el)
    revealCtx.delete(el)
  },
}

/* --------------------------------------------------------------------------
 * v-count-up：数字滚动
 * -------------------------------------------------------------------------- */

interface CountUpState {
  final: string
}

const countUpStates = new WeakMap<HTMLElement, CountUpState>()

function animateCount(el: HTMLElement): void {
  const state = countUpStates.get(el)
  if (!state) return
  const match = state.final.match(/^(\d+)(.*)$/)
  if (!match || match[1] === '0') return
  const suffix = match[2]
  const target = parseInt(match[1], 10)
  const duration = 1200
  const start = performance.now()

  const step = (now: number): void => {
    const p = Math.min((now - start) / duration, 1)
    const eased = 1 - Math.pow(1 - p, 3)
    el.textContent = Math.round(target * eased) + suffix
    if (p < 1) requestAnimationFrame(step)
  }
  el.textContent = '0' + suffix
  requestAnimationFrame(step)
}

export const vCountUp: Directive<HTMLElement, unknown> = {
  mounted(el) {
    if (reducedMotion()) return
    countUpStates.set(el, { final: (el.textContent ?? '').trim() })
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return
        io.disconnect()
        animateCount(el)
      },
      { threshold: 0.5 },
    )
    io.observe(el)
  },
  // 实时数据到达时同步目标值，动画进行中也会逐帧读取最新目标
  updated(el) {
    const state = countUpStates.get(el)
    if (state) state.final = (el.textContent ?? '').trim()
  },
}
