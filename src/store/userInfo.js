import { defineStore } from 'pinia'
export const useUserStore = defineStore('userStore', {
  state() {
    return {
        user: {
            name: "",
            email: "",
            active:false,
           pageNumber: 1,
            userId:null
          },
      profile: {
          
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

     }
    
  }
})
