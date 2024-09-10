<template>
  <div
    class="my-4 bg-white shadow-sm sm:flex sm:flex-row"
    :class="orientation === 'right' ? 'sm:flex-row-reverse' : ''"
  >
    <div class="lg:w-3/12">
      <img class="h-full w-full object-fill" :src="projectImageUrl" alt="Card Image" />
    </div>
    <div class="flex flex-wrap w-9/12">
      <div class="p-4 flex flex-col h-full sm:p-7">
        <h3 class="text-lg font-bold text-gray-800">
          {{ project.title }}
          <span v-if="project.semi_title" class="text-sm text-gray-500">
            {{ '//' + project.semi_title }}</span
          >
        </h3>
        <p class="mt-2 text-slate-600 leading-normal font-light">
          {{ project.description }}
        </p>
        <div class="mt-2">
          <p class="text-xs font-bold tracking-widest text-gray-500 uppercase">
            ⚡️ Стэк : {{ project.stack.join(' + ') }}
          </p>
        </div>
        <div class="mt-5 sm:mt-auto">
          <span
            v-if="!project.project_link && !project.about_link"
            class="font-bold tracking-widest text-gray-500"
          >
            Сейчас я рефакторю код, но скоро здесь будет ссылка
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type ProjectInterface from './ProjectInterface'
import { type PropType } from 'vue'

const props = defineProps({
  project: {
    type: Object as PropType<ProjectInterface>,
    required: true
  },
  orientation: {
    type: String,
    default: 'left'
  }
})

const projectImageUrl = computed(
  () => new URL(`/src/assets/images/${props.project.project_img}`, import.meta.url).href
)
</script>
