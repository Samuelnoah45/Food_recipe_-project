import { beforeEach ,describe, it, expect ,test ,vi} from 'vitest'

import { mount ,shallowMount  } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import signup from '../NavBar.vue'
import { createPinia } from 'pinia';
import { provide ,createApp } from "vue";
import { DefaultApolloClient } from "@vue/apollo-composable";
import { apolloClient } from "../../../apollo/config";


// localVue.use(require("@vue/composition-api").default);

describe('RegistrationForm', () => {
  let pinia;
  let localVue;
  beforeEach(() => {
    pinia = createPinia();
  })
  

  it('class name test', async () => {
    const wrapper = mount(signup ,{
      global: {
        plugins: [pinia],
        provide:{}
      },
    });
   
  expect(wrapper.classes()).toContain('app_nav')
  expect(wrapper.classes('app_nav')).toBe(true)
  expect(wrapper.classes('not-existing')).toBe(false)


  });


  test('attributes', () => {
    const wrapper = mount(signup)
    expect(wrapper.attributes('id')).toBe('navbar')
    expect(wrapper.attributes('class')).toBe('fixed z-20 w-full app_nav')
  })



});

