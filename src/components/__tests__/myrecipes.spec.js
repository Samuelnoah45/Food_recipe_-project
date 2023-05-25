import { beforeEach ,describe, it, expect ,test ,vi} from 'vitest'

import { mount ,shallowMount  } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import myRecipes from '../MyRecipes.vue'
import { createPinia } from 'pinia';
import { provide ,createApp } from "vue";
import { DefaultApolloClient } from "@vue/apollo-composable";
import { apolloClient } from "../../../apollo/config";


// localVue.use(require("@vue/composition-api").default);

describe('myRecipes component', () => {
  let pinia;
  let localVue;
  beforeEach(() => {
    pinia = createPinia();
  })
  

  it('emitted test ', async () => {
    const wrapper = mount(myRecipes ,{
      global: {
        plugins: [pinia],
        provide:{}
      },
    });
   
    wrapper.findComponent({name:"card"})


  });


 


});

