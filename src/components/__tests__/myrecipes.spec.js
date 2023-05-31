import { beforeEach ,describe, it, expect ,test ,vi} from 'vitest'

import { mount   } from '@vue/test-utils'
import home from '../ProvideComp.vue'
import card from '../injectComp.vue'
import { createPinia } from 'pinia';
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
    const wrapper = mount(home ,{
      global: {
        plugins: [pinia],
        provide
      },
    });
    // test  page  includes  card component
    const cards = wrapper.findComponent(card) // => finds Bar by component instance
    expect(cards.exists()).toBe(true)
    


  });


 


});

