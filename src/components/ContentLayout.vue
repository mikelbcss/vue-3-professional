<script setup lang="ts">
import { computed, type FunctionalComponent } from 'vue'
import { useRoute } from 'vue-router'
import { Home } from 'lucide-vue-next'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from './ui'
import { courseStructure } from '../data/courseStructure.ts'

interface Props {
  fullWidth?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  fullWidth: false,
})

const route = useRoute()

const breadcrumbs = computed(() => {
  const crumbs: { name: string; path: string; icon?: FunctionalComponent }[] = [
    { name: 'Inicio', path: '/', icon: Home },
  ]

  const moduleId = route.params.moduleId
  const sectionId = route.params.sectionId
  const exerciseId = route.params.exerciseId

  if (moduleId) {
    const module = courseStructure.modules.find(m => m.id === moduleId)
    if (module) {
      crumbs.push({
        name: module.title,
        path: `/modules/${moduleId}`,
      })

      if (sectionId) {
        const section = module.sections.find(s => s.id === sectionId)
        if (section) {
          crumbs.push({
            name: section.title,
            path: `/modules/${moduleId}/section-${sectionId}`,
          })

          if (exerciseId) {
            const exercise = section.exercises.find(e => e.id === exerciseId)
            if (exercise) {
              crumbs.push({
                name: exercise.title,
                path: `/modules/${moduleId}/section-${sectionId}/exercise-${exerciseId}`,
              })
            }
          }
        }
      }
    }
  }

  return crumbs
})
</script>

<template>
  <div
    :class="[
      'bg-card rounded-lg shadow-sm border',
      props.fullWidth ? 'w-full' : 'max-w-4xl mx-auto',
      'min-h-[calc(100vh-4rem)]',
    ]"
  >
    <div class="p-8">
      <!-- Breadcrumbs -->
      <Breadcrumb class="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem v-for="(crumb, index) in breadcrumbs" :key="crumb.path">
            <BreadcrumbLink
              v-if="index < breadcrumbs.length - 1"
              :href="crumb.path"
              class="flex items-center hover:text-foreground transition-colors cursor-pointer"
              @click.prevent="$router.push(crumb.path)"
            >
              <component :is="crumb.icon" v-if="crumb.icon && index === 0" class="w-4 h-4 mr-2" />
              {{ crumb.name }}
            </BreadcrumbLink>
            <BreadcrumbPage v-else class="flex items-center">
              <component :is="crumb.icon" v-if="crumb.icon && index === 0" class="w-4 h-4 mr-2" />
              {{ crumb.name }}
            </BreadcrumbPage>
            <BreadcrumbSeparator v-if="index < breadcrumbs.length - 1" />
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <!-- Content -->
      <slot />
    </div>
  </div>
</template>
