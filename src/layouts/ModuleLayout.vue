<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppSidebar from '../components/AppSidebar.vue'
import { SidebarProvider, SidebarInset } from '../components/ui/sidebar'
</script>

<template>
  <SidebarProvider>
    <AppSidebar />
    <SidebarInset>
      <div class="px-4 sm:px-6 lg:px-8 py-8">
        <RouterView />
      </div>
    </SidebarInset>
  </SidebarProvider>
</template>
