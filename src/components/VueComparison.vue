<script setup lang="ts">
import { type Component, onMounted, ref, shallowRef } from 'vue';
import { Card, CardContent, Tabs, TabsList, TabsTrigger } from './ui';
import CodeBlock from './CodeBlock.vue';

interface Props {
  leftTitle: string;
  rightTitle: string;
  leftComponent: string;
  rightComponent: string;
}

const props = defineProps<Props>();

const activeTab = ref<'left' | 'right'>('left');
const leftCode = ref('');
const rightCode = ref('');
const LeftComponent = shallowRef<Component | null>(null);
const RightComponent = shallowRef<Component | null>(null);

// Use import.meta.glob to get all Vue components (using relative paths that Vite can resolve)
const componentModules = import.meta.glob('/src/content/**/*.vue', { eager: false });
const componentRawModules = import.meta.glob('/src/content/**/*.vue', {
  eager: false,
  query: '?raw',
});

// Helper function to convert component path to glob path
const getGlobPath = (componentPath: string) => {
  return `/src/content/${componentPath}`;
};

onMounted(async () => {
  // Load left component and its raw code
  try {
    const leftGlobPath = getGlobPath(props.leftComponent);

    if (componentModules[leftGlobPath]) {
      const leftModule = (await componentModules[leftGlobPath]()) as { default: Component };
      LeftComponent.value = leftModule.default;
    }

    if (componentRawModules[leftGlobPath]) {
      const leftRaw = (await componentRawModules[leftGlobPath]()) as { default: string };
      leftCode.value = leftRaw.default;
    }
  } catch (error) {
    console.error('Error loading left component:', error);
  }

  try {
    const rightGlobPath = getGlobPath(props.rightComponent);

    if (componentModules[rightGlobPath]) {
      const rightModule = (await componentModules[rightGlobPath]()) as { default: Component };
      RightComponent.value = rightModule.default;
    } else {
      console.error('Right component not found:', rightGlobPath);
      console.log('Available components:', Object.keys(componentModules));
      console.log('Looking for:', props.rightComponent);
    }

    if (componentRawModules[rightGlobPath]) {
      const rightRaw = (await componentRawModules[rightGlobPath]()) as { default: string };
      rightCode.value = rightRaw.default;
    } else {
      console.error('Right component raw not found:', rightGlobPath);
    }
  } catch (error) {
    console.error('Error loading right component:', error);
  }
});
</script>

<template>
  <div class="vue-comparison space-y-6">
    <!-- Tab Selector -->
    <div class="flex justify-center">
      <Tabs v-model="activeTab" class="w-full max-w-md">
        <TabsList class="grid w-full grid-cols-2">
          <TabsTrigger value="left">{{ props.leftTitle }}</TabsTrigger>
          <TabsTrigger value="right">{{ props.rightTitle }}</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>

    <!-- Content Display -->
    <Card>
      <CardContent>
        <!-- Left Content -->
        <div v-if="activeTab === 'left'" class="space-y-6">
          <div class="grid lg:grid-cols-2 gap-6">
            <!-- Live Preview -->
            <div class="space-y-3">
              <h4 class="text-lg font-semibold text-foreground">🎯 Vista Previa</h4>
              <div class="border rounded-lg p-4 bg-background min-h-[200px] flex items-center justify-center">
                <component :is="LeftComponent" v-if="LeftComponent" />
                <div v-else class="text-muted-foreground">
                  <slot name="left">Contenido no disponible</slot>
                </div>
              </div>
            </div>

            <!-- Raw Code -->
            <div class="space-y-3">
              <h4 class="text-lg font-semibold text-foreground">💻 Código Fuente</h4>
              <div class="max-h-[400px] overflow-y-auto">
                <CodeBlock
                  v-if="leftCode"
                  :code="leftCode"
                  language="vue"
                />
                <div v-else class="text-muted-foreground p-4 border rounded">
                  Cargando código...
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Content -->
        <div v-if="activeTab === 'right'" class="space-y-6">
          <div class="grid lg:grid-cols-2 gap-6">
            <!-- Live Preview -->
            <div class="space-y-3">
              <h4 class="text-lg font-semibold text-foreground">🎯 Vista Previa</h4>
              <div class="border rounded-lg p-4 bg-background min-h-[200px] flex items-center justify-center">
                <component :is="RightComponent" v-if="RightComponent" />
                <div v-else class="text-muted-foreground">
                  <slot name="right">Contenido no disponible</slot>
                </div>
              </div>
            </div>

            <!-- Raw Code -->
            <div class="space-y-3">
              <h4 class="text-lg font-semibold text-foreground">💻 Código Fuente</h4>
              <div class="max-h-[400px] overflow-y-auto">
                <CodeBlock
                  v-if="rightCode"
                  :code="rightCode"
                  language="vue"
                />
                <div v-else class="text-muted-foreground p-4 border rounded">
                  Cargando código...
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
</template>

<style scoped>
.vue-comparison {
  max-width: 100%;
}
</style>
