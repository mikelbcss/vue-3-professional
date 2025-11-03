<script setup lang="ts">
import { type Component, computed, onMounted, ref, watch } from 'vue';
import ContentLayout from '../components/ContentLayout.vue';
import { courseStructure } from '../data/courseStructure.ts';
import MdxRenderer from '../components/MdxRenderer.vue';
import { Button, Card, CardContent, CardHeader, CardTitle } from '../components/ui';
import { useRouter } from 'vue-router';

interface Props {
  moduleId: string;
  sectionId: string;
}

const props = defineProps<Props>();

const router = useRouter();

const SectionContent = ref<Component | null>(null);

const module = computed(() => {
  return courseStructure.modules.find((m) => m.id === props.moduleId);
});

const section = computed(() => {
  return module.value?.sections.find((s) => s.id === props.sectionId);
});

const sectionTitle = computed(() => {
  return section.value?.title || `Sección ${props.sectionId}`;
});

async function loadContent() {
    if (section.value) {
      SectionContent.value = null;
      const content = await import(/* @vite-ignore */ section.value.mdxPath);
      SectionContent.value = content.default;
    }
}

onMounted(loadContent);

watch([() => props.moduleId, () => props.sectionId], loadContent);

const navigateToExercise = (exerciseId: string) => {
  if (!section.value) throw new Error('Section not found')
  router.push(`/modules/${props.moduleId}/${section.value.id}/${exerciseId}`);
};
</script>

<template>
  <ContentLayout><div v-if="section" class="space-y-8">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-foreground mb-4">
        {{ sectionTitle }}
      </h1>
    </div>

    <MdxRenderer :content="SectionContent"/>

    <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Card
          v-for="exercise in section.exercises"
          :key="exercise.id"
          class="cursor-pointer hover:shadow-lg transition-shadow justify-between"
          @click="navigateToExercise(exercise.id)"
      >
        <CardHeader>
          <CardTitle class="text-xl">{{ exercise.title }}</CardTitle>
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
  </div></ContentLayout>
</template>
