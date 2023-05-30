import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import { createPinia } from 'pinia'
import { routes } from "../../router/index";
import { DefaultApolloClient } from "@vue/apollo-composable";
import { apolloClient } from "../../../apollo/config";
import textField from '../../components/inputs/h-text-field.vue'


//Arrange
const router = createRouter({
  history: createWebHistory(),
  routes: routes,
})

const pinia = createPinia();

const provide = {
    [DefaultApolloClient]: apolloClient,
  };



test('slot test', async () => {

  // ACT
  const wrapper = mount(textField, {
    slots: {
        label: 'Email'  
    },
    global: {
      plugins: [pinia ,router],
      provide
    }
    
  })

//Assert
expect(wrapper.html()).toContain('Email')

})
test('multi slot', () => {
    const wrapper = mount(textField, {
      slots: {
        label: [
          '<div id="one">One</div>',
          '<div id="two">Two</div>'
        ]
      }
    })
  
    expect(wrapper.find('#one').exists()).toBe(true)
    expect(wrapper.find('#two').exists()).toBe(true)
  })