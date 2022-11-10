import { defineStore } from 'pinia'
import { ref } from 'vue';
// import { set } from 'pinia/node_modules/vue-demi';
export const useUserStore = defineStore('userStore', ()=>{
  
  const  user=ref( {
          name: "",
          email: "",
          image:"",
          active:false,
          pageNumber: 1,
          userId: 0,
      })
  const profile =ref( { active:"btn1" })
  
  function   setUser(data)
      {
          user.value.email = data.email;
          user.value.name = data.name;
          user.value.active = true;
          user.value.userId=data.userId
          user.value.pageNumber = 1
          user.value.image=data.image
          console.log(data);
      
    }
 function  setPage(page){
      user.value.pageNumber = page;

    }

function reset()
    {
          user.value.email = "";
          user.value.name = "";
          user.value.active = false;

    }
  function  setActiveBtn(btn)
    {
    profile.value.active = btn
    console.log(profile.value.active)

  }
  
function    resetActiveBtn(btn)
    {
           profile.value.active=btn

    }
    
  return {

    user,
    profile,
    setPage,
    reset,
    setActiveBtn,
    resetActiveBtn,
    setUser
  }  
  
})
