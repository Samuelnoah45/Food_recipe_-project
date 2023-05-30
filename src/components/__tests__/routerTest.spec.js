import { mount, flushPromises ,vi } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import { createPinia } from 'pinia'
import { routes } from "../../router/index";
import Home from '../../views/index.vue'
import { DefaultApolloClient } from "@vue/apollo-composable";
import { apolloClient } from "../../../apollo/config";
import NavBar from '../NavBar.vue'


//Arrange
const router = createRouter({
  history: createWebHistory(),
  routes: routes,
})

const pinia = createPinia();

const provide = {
    [DefaultApolloClient]: apolloClient,
  };
test('routing', async () => {
  router.push('/')
 
  // After this line, router is ready
  await router.isReady()

  const wrapper = mount(Home, {
    global: {
      plugins: [pinia ,router],
      provide
    }
  })
  expect(wrapper.html()).toContain('<div class="text-white font-extrabold md:text-5xl self-end text-2xl text-center">“Good food changes the mood.<br> try new recipes with us.”</div>')
})

test('routing click', async () => {
  router.push('/')

  // After this line, router is ready
  await router.isReady()
  // ACT
  const wrapper = mount(NavBar, {
    global: {
      plugins: [pinia ,router],
      provide
    }
  })
  

await wrapper.find('#signup').trigger('click')

//Assert
expect(wrapper.html()).toContain('signup')


})