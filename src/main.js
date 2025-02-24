import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import Button from 'primevue/button'
import Lara from '@primevue/themes/lara'
import Checkbox from 'primevue/checkbox'
import RadioButton from 'primevue/radiobutton'
import Select from 'primevue/select'
import Tooltip from 'primevue/tooltip'
import ScrollPanel from 'primevue/scrollpanel'
import InputText from 'primevue/inputtext'

import StatLine from './components/playground/StatLine.vue'
import BetLine from './components/playground/BetLine.vue'
import Navigation from './components/navigation/Navigation.vue'
import checkUserId from './services/user.service'

import App from './App.vue'
import router from './router'

checkUserId()

const app = createApp(App)
app.use(PrimeVue, {
  theme: {
    preset: Lara
  }
})

app.directive('tooltip', Tooltip)

app.component('InputText', InputText)
app.component('ScrollPanel', ScrollPanel)
app.component('Select', Select)
app.component('Button', Button)
app.component('Checkbox', Checkbox)
app.component('RadioButton', RadioButton)

app.component('StatLine', StatLine)
app.component('BetLine', BetLine)
app.component('Navigation', Navigation)

app.use(createPinia())
app.use(router)

app.mount('#app')
