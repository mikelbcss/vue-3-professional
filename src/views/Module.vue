<script setup lang="ts">
import { type Component, computed, onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import ContentLayout from '../components/ContentLayout.vue';
import { courseStructure } from '../data/courseStructure.ts';
import { Button, Card, CardContent, CardHeader, CardTitle } from '../components/ui';
import MdxRenderer from '../components/MdxRenderer.vue';

interface Props {
  moduleId: string;
}

const props = defineProps<Props>();

const router = useRouter();

const module = computed(() => courseStructure.modules.find((m) => m.id === props.moduleId));
const moduleContent = ref<Component | null>(null);

async function loadContent() {
  if (module.value) {
    moduleContent.value = null;
    const content = await import(/* @vite-ignore */ module.value.mdxPath);
    moduleContent.value = content.default;
  }
}

onMounted(loadContent);

watch([() => props.moduleId], loadContent);

const navigateToSection = (sectionId: string) => {
  router.push(`/modules/${props.moduleId}/${sectionId}`);
};
</script>

<template>
  <ContentLayout>
      <div v-if="module" class="space-y-8">
        <!-- Module Header -->
        <div class="space-y-4">
          <h1 class="text-4xl font-bold text-foreground">{{ module.title }}</h1>
          <p class="text-xl text-muted-foreground">{{ module.description }}</p>
        </div>

        <MdxRenderer :content="moduleContent" />

        <!-- Sections Grid -->
        <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card
              v-for="section in module.sections"
              :key="section.id"
              class="cursor-pointer hover:shadow-lg transition-shadow"
              @click="navigateToSection(section.id)"
          >
            <CardHeader>
              <CardTitle class="text-xl">{{ section.title }}</CardTitle>
            </CardHeader>
            <CardContent>
              <div class="flex items-center justify-between">
                <Button>
                  Comenzar →
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div v-else class="text-center py-12">
        <h1 class="text-2xl font-bold text-gray-900 mb-4">Módulo no encontrado</h1>
        <p class="text-gray-600 mb-6">El módulo no pudo ser encontrado.</p>
        <button
            @click="router.push('/')"
            class="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
        >
          Volver al inicio
        </button>
      </div>
  </ContentLayout>
</template>
