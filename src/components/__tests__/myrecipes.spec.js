import { beforeEach ,describe, it, expect ,test ,vi} from 'vitest'

import { mount ,shallowMount  } from '@vue/test-utils'
import myRecipes from '../MyRecipes.vue'
import { createPinia } from 'pinia';
import { createApp } from "vue";
import { DefaultApolloClient } from "@vue/apollo-composable";
import { apolloClient } from "../../../apollo/config";


// localVue.use(require("@vue/composition-api").default);
const provide = {
  [DefaultApolloClient]: apolloClient,
};

describe('myRecipes component', () => {
  let pinia;
  let router;
  beforeEach(() => {
    pinia = createPinia();
  
  
  })
  

  it('check some component  is inside page ', async () => {
    const wrapper = mount(myRecipes ,{
      global: {
        plugins: [pinia],
        provide
      },
    });
    // test  page  includes  card component
    wrapper.findComponent({name:"card"})


  });


 


});

