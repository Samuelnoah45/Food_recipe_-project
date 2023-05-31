import { createRouter, createWebHistory } from 'vue-router'
import { createPinia  ,setActivePinia} from 'pinia'
import { routes } from "../../router/index";
import { useUserStore } from '../../store/userInfo';
import { DefaultApolloClient } from "@vue/apollo-composable";
import { apolloClient } from "../../../apollo/config";
import { describe } from 'vitest';


//Arrange
const router = createRouter({
  history: createWebHistory(),
  routes: routes,
})

const pinia = createPinia();

const provide = {
    [DefaultApolloClient]: apolloClient,
  };

describe('RegistrationForm', () => {

  let store;
  beforeEach(() => {
   
    setActivePinia(createPinia())
  
    store = useUserStore()
  })
  it('initializes with correct values', () => { 

    expect(store.user.email).toEqual("")
    expect(store.user.image).toEqual("")
    expect(store.user.userId).toEqual(0)
    expect(store.user.name).toEqual("")
   
    
   })
  it('test adding a user', () => {
        store.setUser({
        email: "samuelnoah668@gmail.com",
        image: "imageUrl",
        userId: 123456789,
        name: "samuel noah",})
        expect(store.user.email).toEqual("samuelnoah668@gmail.com")
        expect(store.user.image).toEqual("imageUrl")
        expect(store.user.userId).toEqual(123456789)
        expect(store.user.name).toEqual("samuel noah")
  })

  it('test removing user ', () => { 
    store.reset()
    expect(store.user.email).toEqual("")
    expect(store.user.image).toEqual("")
    expect(store.user.userId).toEqual(0)
    expect(store.user.name).toEqual("")


   })
 

})
