import { defineStore } from 'pinia'
import { set } from 'pinia/node_modules/vue-demi';
export const useUserStore = defineStore('userStore', {
  state() {
    return {
      user: {
          name: "",
          email: "",
          active:false,
          pageNumber: 1,
          userId: 0,
         
      },
      profile: {
        active:"btn1"
      }

     
       
        }
  },
    getters: {
      
  
  },
  actions: {
      setUser(data)
      {
          this.user.email = data.email;
          this.user.name = data.name;
          this.user.active = true;
          this.user.userId=data.userId
          this.user.pageNumber=1
      
    },
    setPage(page){
      this.user.pageNumber = page;

    },

    reset()
    {
          this.user.email = "";
          this.user.name = "";
          this.user.active = false;

    },
    setActiveBtn(btn)
    {
      this.profile.active=btn

    }
    
  }
})
