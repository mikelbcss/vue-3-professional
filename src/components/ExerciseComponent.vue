<script setup lang="ts">
import { ref } from 'vue'
import { useExercisesStore } from '../stores/exercises.ts'
import { Button, Card, CardContent, Checkbox } from './ui'
import { Pencil } from 'lucide-vue-next'
import { useRouter } from 'vue-router'

interface Props {
  moduleId: string
  sectionId: string
  exerciseId: string
  title: string
  description: string
  showSolution?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  showSolution: false,
})

const exercisesStore = useExercisesStore()
const router = useRouter()
const showSolutionVisible = ref(false)

const toggleCompletion = () => {
  exercisesStore.toggleExercise(props.exerciseId)
}

const isCompleted = () => exercisesStore.isExerciseCompleted(props.exerciseId)

const goToExercise = () => {
  router.push(`/modules/${props.moduleId}/${props.sectionId}/${props.exerciseId}`)
}
</script>

<template>
  <Card class="my-8 shadow-lg border-l-4 border-l-orange-400 bg-orange-50">
    <CardContent class="p-6">
      <div class="flex items-start space-x-4">
        <div class="flex-shrink-0 mt-1">
          <div class="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
            <Pencil class="w-5 h-5 text-orange-600" />
          </div>
        </div>
        <div class="flex-1">
          <h3 class="text-xl font-bold text-foreground mb-2">{{ title }}</h3>
          <p class="text-muted-foreground mb-4">{{ description }}</p>

          <!-- Exercise Content Slot -->
          <div class="bg-background p-4 rounded-lg border border-orange-200 mb-4">
            <slot name="content">
              <h4 class="font-semibold text-foreground mb-3">📝 Tarea:</h4>
              <div class="prose prose-sm max-w-none text-muted-foreground">
                <p>
                  Contenido del ejercicio no proporcionado. Usa el slot "content" para añadir el contenido del
                  ejercicio.
                </p>
              </div>
            </slot>
          </div>

          <!-- Solution Section -->
          <div
            v-if="isCompleted() && (showSolutionVisible || props.showSolution)"
            class="bg-green-50 p-4 rounded-lg border border-green-200 mb-4"
          >
            <h4 class="font-semibold text-green-800 mb-3">✅ Solución:</h4>
            <div class="prose prose-sm max-w-none text-green-700">
              <slot name="solution">
                <p>Solución no proporcionada. Usa el slot "solution" para añadir la solución del ejercicio.</p>
              </slot>
            </div>
          </div>

          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-2">
              <Button @click="goToExercise"> Ir al ejercicio → </Button>
            </div>

            <div class="flex items-center space-x-3">
              <Checkbox :checked="isCompleted()" @update:checked="toggleCompletion" />
              <span :class="['font-medium', isCompleted() ? 'text-green-700' : 'text-muted-foreground']">
                {{ isCompleted() ? '✅ Completado' : 'Marcar como completado' }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
</template>
