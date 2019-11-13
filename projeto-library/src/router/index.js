import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'
import Lista from '../components/Lista.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/lista',
    name: 'lista',
    component: Lista
  },
  {
    path: '/:operacao/livro?livroId=:id', 
    name: 'editar', 
    component: Home
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
