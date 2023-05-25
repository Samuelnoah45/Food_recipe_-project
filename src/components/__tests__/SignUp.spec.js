import { beforeEach ,describe, it, expect ,test ,vi} from 'vitest'

import { mount ,shallowMount  } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import signup from '../../views/Signup.vue'
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

  it('submits the form with valid data', async () => {

    const wrapper = mount(signup ,{
      global: {
        plugins: [pinia],
        provide:{}
      },
    });
   
    // Fill in form data
    
    const confirmFunction =vi.spyOn(wrapper.vm ,"confirmPassword");
    await wrapper.find('#name').setValue('John Doe');
    await wrapper.find('#email').setValue('samuelnoah668@gmail.com');
    await wrapper.find('#password').setValue('password123');
    await wrapper.find('#confirm-password').setValue('password123');
    await wrapper.find('form').trigger('submit');
    const submitButton = wrapper.find('button');
    await submitButton.trigger('click');
    // wrapper.vm.confirmPassword()
    // expect(confirmFunction).toHaveBeenCalled()

    // expect().toBeCalled()



    

    



  });

  it('does not submit the form with invalid data', async () => {
    // const wrapper = mount(signup);

    // // Fill in form data with invalid email
    // await wrapper.find('#name').setValue('John Doe');
    // await wrapper.find('#email').setValue('samuelnoah668@gmail.com');
    // await wrapper.find('#password').setValue('password123');
    // await wrapper.find('#confirm-password').setValue('password123');

    // await wrapper.find('form').trigger('submit');

    // expect(wrapper.emitted('submit')).toBeFalsy();
  });

  it("test if the submit is function" ,async()=>{

    // expect(typeof signup).toBe("object");
  })
});

