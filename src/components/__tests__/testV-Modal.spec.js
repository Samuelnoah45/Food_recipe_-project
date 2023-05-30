import { mount, flushPromises ,vi } from '@vue/test-utils'
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



test('v-modal  test', async () => {

  // After this line, router is ready
  // ACT
  const wrapper = mount(textField, {
    props: {
        modelValue: 'initialText',
        'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e })
      },
    global: {
      plugins: [pinia ,router],
      provide
    }
    
  })

//Assert
 await wrapper.find('input').setValue('samuel')
  expect(wrapper.props('modelValue')).toBe('samuel')

})
