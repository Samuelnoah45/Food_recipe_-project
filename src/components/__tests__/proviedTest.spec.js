import { mount, defineComponent ,vi } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import { createPinia } from 'pinia'
import { routes } from "../../router/index";
import { DefaultApolloClient } from "@vue/apollo-composable";
import { apolloClient } from "../../../apollo/config";
import parent from '../ProvideComp.vue'
import inject from '../injectComp.vue'


//Arrange
const router = createRouter({
  history: createWebHistory(),
  routes: routes,
})

const pinia = createPinia();

const provide = {
    [DefaultApolloClient]: apolloClient,
  };



  test('provides correct data', () => {
    //  defineComponent in vite is not working
  
    const wrapper = mount(parent, {
      global: {
        stubs: {
            inject: inject
        }
      }
    })
  
    expect(wrapper.find('#provide-test').text()).toBe('some-data')
  })
  