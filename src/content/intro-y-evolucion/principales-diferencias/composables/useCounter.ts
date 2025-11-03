import { computed, ref } from 'vue'

export interface UseCounter {
  initial: number
  step?: number
}

export function useCounter(options: UseCounter) {
    const step = options.step ?? 1
    const count = ref<number>(options.initial)

    function set(n: number) {
        count.value = n
    }

    function increment() {
        set(count.value + step)
    }

    function decrement() {
        set(count.value - step)
    }

    function reset() {
        set(options.initial)
    }

    const isEven = computed(() => count.value % 2 === 0)

    return { count, increment, decrement, reset, isEven }
}