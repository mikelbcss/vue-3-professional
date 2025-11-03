<script setup lang="ts">
import hljsVuePlugin from '@highlightjs/vue-plugin'
import 'highlight.js/styles/github-dark.css'
import 'highlight.js/lib/common'

interface Props {
  code?: string
  language?: string
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  code: '',
  language: 'javascript',
})

const { component: HighlightComponent } = hljsVuePlugin
</script>

<template>
  <div class="relative">
    <div :class="['rounded-lg overflow-x-auto not-prose', props.class]">
      <HighlightComponent autodetect :lang="language" :code="code" />
    </div>
  </div>
</template>
