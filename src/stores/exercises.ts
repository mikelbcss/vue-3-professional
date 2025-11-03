import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { z } from 'zod'
import { courseStructure } from '../data/courseStructure.ts'

export const ExerciseSchema = z.object({
  id: z.string(),
  completed: z.boolean(),
})

export const ExercisesStateSchema = z.object({
  completedExercises: z.array(z.string()),
})

export type Exercise = z.infer<typeof ExerciseSchema>
export type ExercisesState = z.infer<typeof ExercisesStateSchema>

export const useExercisesStore = defineStore(
  'exercises',
  () => {
    const completedExercises = ref<string[]>([])

    // Calculate total exercises dynamically from course structure
    const totalExercises = computed(() => {
      return courseStructure.modules.reduce((total, module) => {
        return (
          total +
          module.sections.reduce((sectionTotal, section) => {
            return sectionTotal + section.exercises.length
          }, 0)
        )
      }, 0)
    })

    const completedCount = computed(() => completedExercises.value.length)

    const progressPercentage = computed(() => {
      if (totalExercises.value === 0) return 0
      return Math.round((completedCount.value / totalExercises.value) * 100)
    })

    const toggleExercise = (exerciseId: string) => {
      // Validate exercise ID
      try {
        z.string().min(1).parse(exerciseId)
      } catch {
        console.error('Invalid exercise ID:', exerciseId)
        return
      }

      const index = completedExercises.value.indexOf(exerciseId)
      if (index === -1) {
        completedExercises.value.push(exerciseId)
      } else {
        completedExercises.value.splice(index, 1)
      }
    }

    const isExerciseCompleted = (exerciseId: string): boolean => {
      return completedExercises.value.includes(exerciseId)
    }

    return {
      completedExercises,
      totalExercises,
      completedCount,
      progressPercentage,
      toggleExercise,
      isExerciseCompleted,
    }
  },
  {
    persist: {
      key: 'vue-course-exercises',
      storage: localStorage,
    },
  },
)
