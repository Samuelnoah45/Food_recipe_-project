import { beforeEach ,describe, it, expect ,test ,vi} from 'vitest'
import { mount ,  } from '@vue/test-utils'
import signup from '../../views/Signup.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createPinia } from 'pinia';
import { DefaultApolloClient } from "@vue/apollo-composable";
import { apolloClient } from "../../../apollo/config";
import { routes } from "../../router/index";
const router = createRouter({
  history: createWebHistory(),
  routes: routes,
})

describe('RegistrationForm', () => {
  let pinia;
  
  // add apollo client to provide
  const provide = {
    [DefaultApolloClient]: apolloClient,
  };


  beforeEach(() => {
    pinia = createPinia();
  })

  it('submits the form  test', async () => {

    const wrapper = mount(signup ,{
      global: {
        plugins: [pinia ,router],
        provide,
    
      },
    });
    
    const confirmFunction =vi.spyOn(wrapper.vm ,"confirmPassword");
    await wrapper.find('#name').setValue('John Doe');
    await wrapper.find('#email').setValue('samuelnoah668@gmail.com');
    await wrapper.find('#password').setValue('password123');
    await wrapper.find('#confirm-password').setValue('password123');
    wrapper.vm.confirmPassword()
    
    await wrapper.find('form').trigger('submit');
    // await submitButton.trigger('click');
    expect(confirmFunction).toHaveBeenCalled();
    // expect(confirmFunction).toHaveProperty('submit');


  });
  it('submits the form  test invalid', async () => {

    const wrapper = mount(signup ,{
      global: {
        plugins: [pinia ,router],
        provide,
    
      },
    });
    
    const confirmFunction =vi.spyOn(wrapper.vm ,"confirmPassword");
    await wrapper.find('#name').setValue('John Doe');
    await wrapper.find('#email').setValue('samuelnoah668@gmail.com');
    await wrapper.find('#password').setValue('password123');
    await wrapper.find('#confirm-password').setValue('password123');
    wrapper.vm.confirmPassword()
    // await submitButton.trigger('click');
    
    await wrapper.find('form').trigger('submit');
    expect(confirmFunction).toHaveBeenCalled();
    // expect(confirmFunction).toHaveProperty('submit');


  });

 
});

