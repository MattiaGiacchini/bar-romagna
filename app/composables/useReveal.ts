// composables/useReveal.ts
// IntersectionObserver-based scroll reveal utility.
// Usage: const { revealRef, isVisible } = useReveal()
// Bind revealRef to a template ref, then use isVisible to toggle a CSS class.

export const useReveal = (threshold = 0.15) => {
  const isVisible = ref(false)
  const revealRef = ref<HTMLElement | null>(null)

  let observer: IntersectionObserver | null = null

  onMounted(() => {
    if (!revealRef.value) return
    observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          isVisible.value = true
          observer?.disconnect() // fire once
        }
      },
      { threshold }
    )
    observer.observe(revealRef.value)
  })

  onUnmounted(() => observer?.disconnect())

  return { revealRef, isVisible }
}

// useRevealList: reveal a list of items staggered
export const useRevealList = (threshold = 0.1) => {
  const visibleItems = ref<Set<number>>(new Set())
  const listRef = ref<HTMLElement | null>(null)

  let observer: IntersectionObserver | null = null

  onMounted(() => {
    if (!listRef.value) return
    const children = Array.from(listRef.value.children) as HTMLElement[]
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const idx = children.indexOf(entry.target as HTMLElement)
            if (idx !== -1) visibleItems.value = new Set([...visibleItems.value, idx])
          }
        })
      },
      { threshold }
    )
    children.forEach(child => observer!.observe(child))
  })

  onUnmounted(() => observer?.disconnect())

  return { listRef, visibleItems }
}
