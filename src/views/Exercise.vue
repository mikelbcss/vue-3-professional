<script setup lang="ts">
import { type Component, computed, onMounted, ref, shallowRef, watch } from 'vue';
import { Check, Eye, EyeOff, Play, Square } from 'lucide-vue-next';
import { Button, Card, CardContent } from '../components/ui';
import ContentLayout from '../components/ContentLayout.vue';
import { useExercisesStore } from '../stores/exercises.ts';
import { courseStructure } from '../data/courseStructure.ts';
import MdxRenderer from '../components/MdxRenderer.vue';

interface Props {
  moduleId: string;
  sectionId: string;
  exerciseId: string;
}

const props = defineProps<Props>();
const exercisesStore = useExercisesStore();

const ExerciseContent = ref<Component | null>(null);
const SolutionContent = ref<Component | null>(null);
const ExerciseComponent = shallowRef<Component | null>(null);
const showSolution = ref(false);

const module = computed(() => {
  const found = courseStructure.modules.find((m) => m.id === props.moduleId);
  if (!found) throw new Error(`Module not found: ${props.moduleId}`);
  return found;
});

const section = computed(() => {
  const found = module.value.sections.find((s) => s.id === props.sectionId);
  if (!found) throw new Error(`Section not found: ${props.sectionId}`);
  return found;
});

const exercise = computed(() => {
  const found = section.value.exercises.find((e) => e.id === props.exerciseId);
  if (!found) throw new Error(`Exercise not found: ${props.exerciseId}`);
  return found;
});

const isCompleted = computed(() => exercisesStore.isExerciseCompleted(props.exerciseId));

const toggleCompletion = () => {
  exercisesStore.toggleExercise(props.exerciseId);
};

const toggleSolution = () => {
  showSolution.value = !showSolution.value;
};

const baseUrl = computed(() => {
  return `../content/${module.value.id}/${section.value.id}/${exercise.value.id}`;
});

const url = computed(() => {
  return `${baseUrl.value}/Exercise.vue`;
});

const solutionUrl = computed(() => {
  return `${baseUrl.value}/solution.mdx`;
});

const loadContent = async () => {
  if (!exercise.value) return;

  try {
    // Reset content first
    ExerciseContent.value = null;
    SolutionContent.value = null;
    ExerciseComponent.value = null;
    showSolution.value = false;

    // Load MDX content
    const mdxModule = await import(/* @vite-ignore */ exercise.value.mdxPath);
    ExerciseContent.value = mdxModule.default;

    // Load MDX Solution
    const mdxSolutionModule = await import(/* @vite-ignore */ solutionUrl.value);
    SolutionContent.value = mdxSolutionModule.default;

    // Load exercise component
    const componentModule = await import(/* @vite-ignore */ url.value);
    ExerciseComponent.value = componentModule.default;
  } catch (error) {
    console.error('Error loading exercise:', error);
  }
};

// Load content on mount
onMounted(loadContent);

// Watch for route parameter changes and reload content
watch([() => props.moduleId, () => props.sectionId, () => props.exerciseId], loadContent);
</script>

<template>
  <ContentLayout :full-width="true">
      <!-- Exercise Header -->
      <div class="mb-8">
        <div class="flex items-center space-x-3 mb-4">
          <div class="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
            <Play class="w-5 h-5 text-orange-600" />
          </div>
          <div>
            <h1 class="text-2xl font-bold text-foreground">{{ exercise.title }}</h1>
            <p class="text-muted-foreground">{{ exercise.description }}</p>
          </div>
        </div>

        <!-- Completion Status -->
        <div class="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
          <div class="flex items-center space-x-3">
            <Button
              @click="toggleCompletion"
              :variant="isCompleted ? 'default' : 'outline'"
              size="sm"
              class="w-8 h-8 p-0"
            >
              <Check v-if="isCompleted" class="w-4 h-4" />
              <Square v-else class="w-4 h-4" />
            </Button>
            <span :class="['font-medium', isCompleted ? 'text-green-700' : 'text-muted-foreground']">
              {{ isCompleted ? 'Completado' : 'Marcar como completado' }}
            </span>
          </div>

          <Button
            v-if="isCompleted"
            @click="toggleSolution"
            variant="outline"
            size="sm"
          >
            <Eye v-if="!showSolution" class="w-4 h-4 mr-2" />
            <EyeOff v-else class="w-4 h-4 mr-2" />
            {{ showSolution ? 'Ocultar solución' : 'Ver solución' }}
          </Button>
        </div>
      </div>

      <!-- Exercise Content -->
      <div class="grid lg:grid-cols-2 gap-8">
        <!-- Instructions -->
        <div class="space-y-6">
          <Card>
            <CardContent class="p-6">
              <h3 class="text-lg font-semibold mb-4">📝 Instrucciones</h3>
                <MdxRenderer :content="ExerciseContent" />
            </CardContent>
          </Card>

        </div>

        <!-- Live Preview -->
        <div class="space-y-6">
          <Card>
            <CardContent class="p-6">
              <h3 class="text-lg font-semibold mb-4">🎯 Vista Previa</h3>
              <div class="border rounded-lg p-4 bg-background min-h-[200px] flex items-center justify-center">
                <component :is="ExerciseComponent" v-if="ExerciseComponent" />
                <div v-else class="text-muted-foreground">
                  Cargando componente...
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

    <!-- Solution Modal -->
    <div v-if="showSolution" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50" @click="showSolution = false">
      <div class="bg-background rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto" @click.stop>
        <div class="p-6">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-xl font-bold text-green-800">✅ Solución: {{ exercise?.title }}</h3>
            <button @click="showSolution = false" class="text-muted-foreground hover:text-foreground">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        <div class="space-y-4">
          <div class="bg-green-50 p-4 rounded-lg border border-green-200">
            <p class="text-green-800 text-sm">
              Esta es la implementación completa del ejercicio. Estudia el código y compáralo con tu solución.
            </p>
          </div>
          <MdxRenderer :content="SolutionContent" />
        </div>
        </div>
      </div>
    </div>
  </ContentLayout>
</template>
