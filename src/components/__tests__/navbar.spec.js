import { beforeEach ,describe, it, expect ,test ,vi} from 'vitest'

import { mount   } from '@vue/test-utils'
import nav from '../NavBar.vue'
import { createPinia } from 'pinia';
import { DefaultApolloClient } from "@vue/apollo-composable";
import { apolloClient } from "../../../apollo/config";
import { createRouter ,createWebHistory} from 'vue-router';
import { routes } from "../../router/index";

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
})

const provide = {
  [DefaultApolloClient]: apolloClient,
};
describe('RegistrationForm', () => {
  let pinia;

  beforeEach( async () => {
    pinia = createPinia();

  })
  it('class name test', async () => {

    const wrapper = mount(nav ,{
      global: {
        plugins: [pinia ,router],
        provide,
       
        
      },
    });
    
  expect(wrapper.classes()).toContain('app_nav')
  expect(wrapper.classes('app_nav')).toBe(true)
  expect(wrapper.classes('not-existing')).toBe(false)


  });


  test('attributes', () => {
    const wrapper = mount(nav ,{
      global: {
        // stubs: ['RouterLink','RouterView'],
        plugins: [pinia ,router],
        provide,
      },
    });
    expect(wrapper.attributes('id')).toBe('navbar')
    expect(wrapper.attributes('class')).toBe('fixed z-20 w-full app_nav')
  })

 


});

