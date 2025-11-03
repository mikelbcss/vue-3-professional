<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { cn } from '../../../lib/utils.ts';
import Input from '../input/Input.vue';

const props = defineProps<{
  class?: HTMLAttributes['class'];
}>();

const classes = cn(
    'bg-background h-8 w-full shadow-none',
    props.class,
)
</script>

<template>
  <Input
    data-slot="sidebar-input"
    data-sidebar="input"
    :class="classes"
  />
</template>
