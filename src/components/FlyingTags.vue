<template>
  <div ref="container" class="w-full h-full">
    <P5Canvas :sketch="sketch" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import p5 from 'p5'

const { tags_color = '0,255,0' } = defineProps<{ tags_color: string }>()

const container = ref<HTMLDivElement>()

const stack = [
  'VUE',
  'NUXT',
  'JS',
  'TS',
  'CSS',
  'HTML',
  'NODE',
  'v 0',
  'v 1.2',
  'frontend',
  'web',
  'git',
  'linux',
  '.',
  '}',
  '{',
  '_',
  '+',
  '@',
  '!',
  '~'
]

const tags: Array<Tag> = []
const SEPARATION: number = 0.75

interface Tag {
  value: string
  position: Vector
}

interface Vector {
  x: number
  y: number
  z: number
}
const sketch = (p5: p5) => {
  let font: object

  let time = 0

  const camera = p5.createVector(0, 0, SEPARATION + 1)

  p5.preload = () => {
    font = p5.loadFont('/PixeloidMono.ttf')
  }

  p5.setup = () => {
    if (container.value) {
      p5.createCanvas(container?.value.clientWidth, container?.value.clientHeight)
      p5.angleMode(p5.DEGREES)

      createTags()
    }
  }

  p5.draw = () => {
    p5.background(0, 0)
    p5.clear()
    for (let tag of tags) {
      render(update(tag))
    }
  }

  p5.windowResized = () => {
    if (container.value) {
      p5.resizeCanvas(container.value.clientWidth, container.value.clientHeight)
    }
  }

  function createTags() {
    ;[...Array(4)].forEach((_) => {
      for (const str of stack) {
        const X = p5.random(-1, 1) * SEPARATION
        const Y = p5.random(-1, 1) * SEPARATION
        const Z = p5.random(-1, 1) * SEPARATION
        const tag = {
          value: str,
          position: p5.createVector(X, Y, Z)
        }

        tags.push(tag)
      }
    })
  }

  function getProjection(vector: Vector) {
    const ZP = vector.z + camera.z
    const DIV = ZP / p5.height
    const XP = (vector.x + camera.x) / DIV + p5.width / 2
    const YP = (vector.y + camera.y) / DIV + p5.height / 2

    return {
      XP,
      YP,
      ZP
    }
  }

  function render(tag: Tag) {
    const { XP, YP, ZP } = getProjection(tag.position)
    const MAX_SIZE = 50
    const SIZE = (1 / ZP) * MAX_SIZE
    const BRIGHTNESS = SIZE / MAX_SIZE

    p5.textFont(font)
    p5.textSize(SIZE)
    p5.fill(`rgba(${tags_color}, ${BRIGHTNESS})`)
    p5.text(tag.value, XP, YP)
  }

  function update(tag: Tag) {
    const DX = p5.degrees(0.01 * p5.sin(time * 0.0001))
    const DY = p5.degrees(0.01 * p5.cos(time * 0.0001))

    tag.position = rotate(tag.position, 'x', DX)
    tag.position = rotate(tag.position, 'y', DY)
    time++

    return tag
  }

  function rotate(vector: Vector, direction: 'x' | 'y', angle: number) {
    const SIN = p5.sin(angle)
    const COS = p5.cos(angle)

    if (direction === 'x') {
      vector.y = vector.y * COS - vector.z * SIN
      vector.z = vector.y * SIN + vector.z * COS
    }

    if (direction === 'y') {
      vector.x = vector.x * COS - vector.z * SIN
      vector.z = vector.x * SIN + vector.z * COS
    }

    return vector
  }
}
</script>
