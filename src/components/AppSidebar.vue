<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { useExercisesStore } from '../stores/exercises'
import { courseStructure } from '../data/courseStructure'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from './ui/sidebar'
import { Card, CardContent, Progress } from './ui'
import { BookOpen, CheckCircle, Circle, GraduationCap, Home, Play } from 'lucide-vue-next'

const route = useRoute()
const router = useRouter()
const exercisesStore = useExercisesStore()

const isCurrentRoute = (moduleId: string, sectionId?: string, exerciseId?: string) => {
  if (exerciseId && sectionId) {
    return route.path === `/modules/${moduleId}/section-${sectionId}/exercise-${exerciseId}`
  }
  if (sectionId) {
    return route.path === `/modules/${moduleId}/section-${sectionId}`
  }
  return route.path === `/modules/${moduleId}`
}

const goToHome = () => {
  router.push('/')
}

const goToModule = (moduleId: string) => {
  router.push(`/modules/${moduleId}`)
}

const goToSection = (moduleId: string, sectionId: string) => {
  router.push(`/modules/${moduleId}/${sectionId}`)
}

const goToExercise = (moduleId: string, sectionId: string, exerciseId: string) => {
  router.push(`/modules/${moduleId}/${sectionId}/${exerciseId}`)
}
</script>

<template>
  <Sidebar>
    <SidebarHeader>
      <div class="flex items-center space-x-3 px-2 py-2">
        <div class="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
          <GraduationCap class="w-4 h-4 text-white" />
        </div>
        <span class="text-lg font-bold text-sidebar-foreground">Vue 3 Pro</span>
      </div>

      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton :is-active="route.path === '/'" class="w-full" @click="goToHome">
            <Home class="w-4 h-4" />
            <span>Inicio</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>

      <!-- Progress Card -->
      <Card class="mx-2 mt-4">
        <CardContent class="p-4">
          <div class="text-center">
            <h3 class="text-sm font-semibold text-foreground mb-2">Progreso Global</h3>
            <div class="space-y-2">
              <div class="flex justify-between items-center text-xs">
                <span class="text-muted-foreground">Completado:</span>
                <span class="font-medium text-foreground">
                  {{ exercisesStore.completedCount }} / {{ exercisesStore.totalExercises }}
                </span>
              </div>
              <Progress :model-value="exercisesStore.progressPercentage" class="h-2" />
              <div class="text-sm font-bold text-green-600">{{ exercisesStore.progressPercentage }}%</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </SidebarHeader>

    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Módulos del Curso</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem v-for="module in courseStructure.modules" :key="module.id">
              <SidebarMenuButton
                :is-active="isCurrentRoute(module.id)"
                :disabled="module.locked"
                @click="goToModule(module.id)"
              >
                <BookOpen class="w-4 h-4" />
                <span>{{ module.title }}</span>
                <span v-if="module.locked" class="ml-auto text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                  Próximamente
                </span>
              </SidebarMenuButton>

              <!-- Sections -->
              <SidebarMenuSub v-if="!module.locked && module.sections.length > 0">
                <SidebarMenuSubItem v-for="section in module.sections" :key="section.id">
                  <SidebarMenuSubButton
                    :is-active="isCurrentRoute(module.id, section.id)"
                    @click="goToSection(module.id, section.id)"
                  >
                    <Circle class="w-3 h-3" />
                    <span>{{ section.title }}</span>
                  </SidebarMenuSubButton>

                  <!-- Exercises -->
                  <SidebarMenuSub v-if="section.exercises.length > 0" class="ml-4">
                    <SidebarMenuSubItem v-for="exercise in section.exercises" :key="exercise.id">
                      <SidebarMenuSubButton
                        :is-active="isCurrentRoute(module.id, section.id, exercise.id)"
                        size="sm"
                        @click="goToExercise(module.id, section.id, exercise.id)"
                      >
                        <CheckCircle
                          v-if="exercisesStore.isExerciseCompleted(exercise.id)"
                          class="w-3 h-3 text-green-600"
                        />
                        <Play v-else class="w-3 h-3 text-orange-500" />
                        <span class="text-xs">{{ exercise.title }}</span>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </SidebarMenuSubItem>
              </SidebarMenuSub>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>

    <SidebarFooter>
      <div class="text-xs text-muted-foreground text-center p-2">Vue 3 Professional Course</div>
    </SidebarFooter>
  </Sidebar>
</template>
