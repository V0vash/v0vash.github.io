<template>
  <div class="w-full">
    <div>
      <div class="absolute w-full">
        <div class="flex mx-2 my-1 justify-between">
          <div class="text-white font-bold">FPS:{{ fps }}</div>
          <div></div>
        </div>
      </div>
      <div ref="container" class="w-screen h-screen">
        <P5Canvas :sketch="sketch" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import p5 from 'p5'
import { ref } from 'vue'
import type { Ref } from 'vue'

const container = ref<HTMLDivElement>()

interface Agent {
  x: number
  y: number
  heading: number
  vx: number
  vy: number
  rotAngle: number
  sensors: Sensors
}

interface Sensors {
  rSensorPos: Vector
  lSensorPos: Vector
  fSensorPos: Vector
}

interface SensorsSettings {
  angle: number
  distance: number
}

interface Vector {
  x: number
  y: number
}

// let mounted: Ref<boolean> = ref(true)
let fps: Ref<number> = ref(0)
let agents_amount: Ref<number> = ref(1000)
let agent_color: Ref<string> = ref('#870391')
let paused: Ref<boolean> = ref(false)

let sensors_settings: Ref<SensorsSettings> = ref({
  angle: 45,
  distance: 10
})

const sketch = (p5: p5) => {
  let agents: Array<Agent> = []
  let d: number
  p5.setup = () => {
    if (container.value) {
      const canvas = p5.createCanvas(container?.value.clientWidth, container?.value.clientHeight)
      p5.angleMode(p5.DEGREES)
      d = p5.pixelDensity()

      canvas.mouseClicked(toggleRendering)

      for (let i = 0; i < agents_amount.value; i++) {
        let heading_const = p5.random(360)

        let coords = getSpawnCoords('circle', 20, p5.width / 2, p5.height / 2)

        agents[i] = {
          x: coords.x,
          y: coords.y,
          heading: heading_const,
          vx: p5.cos(heading_const),
          vy: p5.sin(heading_const),
          rotAngle: 45,
          sensors: {
            rSensorPos: p5.createVector(0, 0),
            lSensorPos: p5.createVector(0, 0),
            fSensorPos: p5.createVector(0, 0)
          }
        }
      }
    }
  }

  p5.draw = () => {
    p5.background(0, 5)
    p5.loadPixels()

    for (let i = 0; i < agents_amount.value; i++) {
      display(update(agents[i]))
    }

    p5.frameRate(60)
    fps.value = Math.floor(p5.frameRate())
  }

  function update(agent: Agent) {
    agent.vx = p5.cos(agent.heading)
    agent.vy = p5.sin(agent.heading)

    // borders
    agent.x = agent.x + agent.vx
    agent.y = agent.y + agent.vy

    if (agent.x < 50 || agent.y < 50 || agent.x + 50 > p5.width || agent.y > p5.height - 50) {
      agent.heading > 180
        ? (agent.heading = agent.heading - 180)
        : (agent.heading = agent.heading + 180)
    }

    agent.sensors.rSensorPos = getSensorPos(
      agent,
      agent.sensors.rSensorPos,
      sensors_settings.value,
      agent.heading + sensors_settings.value.angle
    )
    agent.sensors.lSensorPos = getSensorPos(
      agent,
      agent.sensors.lSensorPos,
      sensors_settings.value,
      agent.heading - sensors_settings.value.angle
    )
    agent.sensors.fSensorPos = getSensorPos(
      agent,
      agent.sensors.fSensorPos,
      sensors_settings.value,
      agent.heading
    )

    let index, l, r, f

    index =
      4 * (d * p5.floor(agent.sensors.rSensorPos.y)) * (d * p5.width) +
      4 * (d * p5.floor(agent.sensors.rSensorPos.x))
    r = p5.pixels[index]

    index =
      4 * (d * p5.floor(agent.sensors.lSensorPos.y)) * (d * p5.width) +
      4 * (d * p5.floor(agent.sensors.lSensorPos.x))
    l = p5.pixels[index]

    index =
      4 * (d * p5.floor(agent.sensors.fSensorPos.y)) * (d * p5.width) +
      4 * (d * p5.floor(agent.sensors.fSensorPos.x))
    f = p5.pixels[index]

    if (f > l && f > r) {
      agent.heading += 0
    }

    if (f < l && f < r) {
      if (p5.random(1) < 0.5) {
        agent.heading += agent.rotAngle
      } else {
        agent.heading -= agent.rotAngle
      }
    }

    if (l > r) {
      agent.heading += -agent.rotAngle
    }

    if (r > l) {
      agent.heading += agent.rotAngle
    }

    return agent
  }

  function display(agent: Agent) {
    p5.noStroke()
    p5.stroke(agent_color.value)
    p5.strokeWeight(1)
    p5.point(agent.x, agent.y)

    return agent
  }

  function toggleRendering() {
    {
      if (paused.value) {
        p5.noLoop()
      }
      if (!paused.value) {
        p5.loop()
      }
      paused.value = !paused.value
    }
  }

  function getSensorPos(
    agent: Agent,
    sensor: Vector,
    sensors_settings: SensorsSettings,
    angle: number
  ) {
    sensor.x = (agent.x + sensors_settings.distance * p5.cos(angle) + p5.width) % p5.width
    sensor.y = (agent.y + sensors_settings.distance * p5.sin(angle) + p5.height) % p5.height

    return sensor
  }

  function getSpawnCoords(
    method: 'circle' | 'square',
    spawns: number = 1,
    x_center: number,
    y_center: number
  ) {
    let coords: {
      x: number
      y: number
    } = {
      x: x_center,
      y: y_center
    }

    if (spawns === 1 && method === 'circle') {
      coords = getCircleDots(20, x_center, y_center)
    }

    if (spawns === 1 && method === 'square') {
      coords = getSquareDots(20, x_center, y_center)
    }

    if (spawns > 1 && method === 'circle') {
      let { x, y } = getRandomDotFromCircle(spawns, x_center, y_center)
      coords = getCircleDots(20, x, y)
    }

    if (spawns > 1 && method === 'square') {
      let { x, y } = getRandomDotFromCircle(spawns, x_center, y_center)
      coords = getSquareDots(20, x, y)
    }

    return coords
  }

  // https://leetcode.com/problems/generate-random-point-in-a-circle/
  function getCircleDots(radius: number, x_center: number, y_center: number) {
    let ang = Math.random() * 2 * Math.PI,
      hyp = Math.sqrt(Math.random()) * radius,
      adj = Math.cos(ang) * hyp,
      opp = Math.sin(ang) * hyp
    return { x: x_center + adj, y: y_center + opp }
  }

  function getSquareDots(length: number, x_center: number, y_center: number) {
    return {
      x: p5.random(x_center - length, x_center + 20),
      y: p5.random(y_center - length, y_center + 20)
    }
  }

  function getRandomDotFromCircle(amount: number, x_center: number, y_center: number) {
    let dots = []

    for (let i = 0; i < Math.PI * 2; i += (Math.PI * 2) / amount) {
      let x = x_center + 100 * Math.sin(i)
      let y = y_center + 100 * Math.cos(i)

      dots.push({ x: x, y: y })
    }
    return dots[Math.floor(Math.random() * dots.length)]
  }
}
</script>
