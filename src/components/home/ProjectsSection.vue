<template>
  <section
    class="min-h-screen py-12 bg-gradient-to-b from-gray-50 via-white to-gray-500 px-4 mx-auto sm:px-6 lg:px-8"
  >
    <div class="container mx-auto">
      <h2 class="text-xs font-bold tracking-widest text-gray-500 uppercase">
        🔥 Проекты (не коммерческие)
      </h2>

      <div class="mt-4">
        <ProjectCard
          v-for="(project, _idx) in projects"
          v-bind:key="_idx"
          :project="project"
          :orientation="_idx % 2 ? 'right' : 'left'"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type ProjectInterface from './Projects/ProjectInterface'
import ProjectCard from './Projects/ProjectCard.vue'

const projects: ProjectInterface[] = [
  {
    title: 'Physarum ( Физарум )',
    semi_title: 'ver. 1.0 on CPU',
    description:
      'Физарум многоглавый (лат. Physarum polycephalum) — вид миксомицетов семейства Физаровые. Является распространённым модельным организмом в генетике, физиологии и биохимии, а также одним из наиболее изученных организмов.',
    stack: ['p5.js', 'vue 3', 'tailwind'],
    project_img: 'physarum-gif.gif'
  }
]
</script>
