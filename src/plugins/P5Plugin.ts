import type { App } from 'vue'
import P5Canvas from '../components/p5/P5Canvas.vue'

export default {
  install: (app: App) => {
    app.component('P5Canvas', P5Canvas)
  }
}

export { P5Canvas }
