<script setup lang="ts">
import { MDXProvider } from '@mdx-js/vue'
import { type Component, defineComponent, h } from 'vue'
import CodeBlock from './CodeBlock.vue'

interface Props {
  content: Component | null
}

const props = defineProps<Props>()

const CodeWithProps = defineComponent({
  name: 'CodeWithProps',
  setup(p, { slots }) {
    return () => {
      // Extract code content from children or slots
      const children = (p as any).children ?? slots.default?.()
      let code = '' as string
      let language = 'javascript' as string

      if (children) {
        if (Array.isArray(children)) {
          const codeChild = children.find((child: any) => (child && child.type === 'code') || child.props?.className)
          if (codeChild) {
            if (codeChild.props?.className && typeof codeChild.props.className === 'string') {
              const match = codeChild.props.className.match(/language-(\w+)/)
              if (match) {
                language = match[1]
              }
            }
            if (codeChild.children) {
              code = Array.isArray(codeChild.children) ? codeChild.children.join('') : codeChild.children
            }
          }
        } else if ((children as any).props) {
          const codeProps = (children as any).props
          if (codeProps.className && typeof codeProps.className === 'string') {
            const match = codeProps.className.match(/language-(\w+)/)
            if (match) {
              language = match[1]
            }
          }
          if (codeProps.children) {
            code = Array.isArray(codeProps.children) ? codeProps.children.join('') : codeProps.children
          }
        } else if (typeof children === 'string') {
          code = children as string
        }
      }

      return h(CodeBlock, {
        code,
        language,
        class: `${(p as any).class ?? ''} not-prose`,
      })
    }
  },
})

const mdxComponents = {
  pre: CodeWithProps,
} as const
</script>

<template>
  <article class="prose prose-sm max-w-none">
    <MDXProvider :components="mdxComponents">
      <component :is="props.content" v-if="props.content" :components="mdxComponents" />
      <div v-else class="text-muted-foreground">Cargando contenido...</div>
    </MDXProvider>
  </article>
</template>
