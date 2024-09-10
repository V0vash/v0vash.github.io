<template>
  <section class="pt-12 bg-gradient-to-b from-gray-300 via-white to-gray-50">
    <div class="px-4 mx-auto sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 mx-auto lg:grid-cols-12 gap-x-6 gap-y-8 lg:max-w-none">
        <div class="self-center lg:col-span-4">
          <div>
            <h1 class="text-3xl font-bold text-gray-900 sm:text-4xl xl:text-5xl">
              Привет👋
              <br />
              Я <span :class="`text-[rgb(${theme.color})]`">v0vash</span>, пишу код.
            </h1>
            <p class="mt-5 text-base font-normal leading-7 text-gray-500">
              В этом spa можно увидеть интересные кейсы. Например ➡️
              <br />
              это облако технологий с которыми я работаю и оно реактивное!
              <br />
              кликни на цвет по душе
              <span
                class="text-[rgb(255,0,0)] hover:underline cursor-pointer"
                @click="theme.color = '255,0,0'"
              >
                красный</span
              >,
              <span
                class="text-[rgb(0,0,255)] hover:underline cursor-pointer"
                @click="theme.color = '0,0,255'"
              >
                синий</span
              >, я вот предпочитаю
              <span
                class="text-[rgb(0,255,0)] hover:underline cursor-pointer"
                @click="theme.color = '0,255,0'"
              >
                зеленый</span
              >
            </p>
            <div class="relative inline-flex mt-9 group">
              <div
                class="absolute transitiona-all duration-1000 opacity-70 inset-0 bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-lg filter group-hover:opacity-100 group-hover:duration-200"
              ></div>
            </div>
          </div>

          <div>
            <p class="text-xs font-bold tracking-widest text-gray-500 uppercase">⚡️ Обо мне</p>

            <div class="mt-6 space-y-6 lg:space-y-8">
              <div class="relative overflow-hidden">
                <div class="flex items-start lg:items-center">
                  <p class="ml-5 text-base font-bold leading-6 text-gray-900">
                    <span>
                      Опыт коммерческой разработки с 2020,<br />
                      а так-же управления frontend командами
                    </span>
                  </p>
                </div>
              </div>

              <div class="relative overflow-hidden">
                <div class="flex items-start lg:items-center">
                  <p class="ml-5 text-base font-bold leading-6 text-gray-900">
                    if (you.wanna.hire.me){ <br />
                    <a
                      href="https://t.me/v0vash"
                      target="_blank"
                      class="hover:underline pl-2"
                      :class="`text-[rgb(${theme.color})]`"
                      >https://t.me/v0vash</a
                    >
                    <br />}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="self-end lg:col-span-8 h-full min-h-96">
          <FlyingTags :tags_color="theme.color" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import FlyingTags from '../FlyingTags.vue'

import { useThemeStore } from '@/stores/theme'

const theme = useThemeStore()
</script>
