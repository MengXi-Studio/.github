import type { Directive } from 'vue'

function reducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

interface TiltBinding {
  /** 最大倾斜角度（度） */
  max?: number
}

/**
 * v-tilt：卡片 3D 倾斜跟随鼠标。
 * 移动时以 rAF 节流更新透视变换，离开时弹性复位；
 * 触屏设备与系统减弱动效下自动禁用。
 */
export const vTilt: Directive<HTMLElement, TiltBinding | undefined> = {
  mounted(el, binding) {
    if (reducedMotion()) return
    if (window.matchMedia('(hover: none)').matches) return

    const max = binding.value?.max ?? 5
    let raf = 0

    const onEnter = (): void => {
      el.style.transition = 'transform 0.12s ease-out'
    }
    const onMove = (e: MouseEvent): void => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = 0
        const r = el.getBoundingClientRect()
        const px = (e.clientX - r.left) / r.width - 0.5
        const py = (e.clientY - r.top) / r.height - 0.5
        el.style.transform = `perspective(800px) rotateX(${(-py * max).toFixed(2)}deg) rotateY(${(px * max).toFixed(2)}deg) translateY(-4px)`
      })
    }
    const onLeave = (): void => {
      el.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
      el.style.transform = ''
      window.setTimeout(() => {
        el.style.transition = ''
      }, 400)
    }

    el.addEventListener('mouseenter', onEnter)
    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)

    const off = (): void => {
      el.removeEventListener('mouseenter', onEnter)
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
      if (raf) cancelAnimationFrame(raf)
    }
    ;(el as HTMLElement & { __tiltOff?: () => void }).__tiltOff = off
  },
  unmounted(el) {
    ;(el as HTMLElement & { __tiltOff?: () => void }).__tiltOff?.()
  },
}
