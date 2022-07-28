<script setup>
import { useQuery } from '@vue/apollo-composable';
import upload from '../graphql/query/uploadImage.gql'
import { ref } from 'vue'
import axios from 'axios';
// let loading = false;
let done = false;
const variables=ref({
  image:[],

});

const queryOptions=ref({enabled:false})
const {result,onResult,onError,loading} = useQuery(upload, variables,queryOptions);
const passit = onResult((result) =>
   {console.log(result.loading)
    console.log(result)
    
     if (result.loading==true) {
     
       console.log("loading")
     }

     else {
      
       done = true
       console.log("done")
       
     }
   

  })

 
const handleImage = async () =>
{   
  const files = document.querySelector('#uploadpic').files;
   console.log(files)
  let images = []
   
 async function readAndPreview(file) {

    // Make sure `file.name` matches our extensions criteria
    if ( /\.(jpe?g|png|gif)$/i.test(file.name) ) {
      const reader = new FileReader();
      reader.addEventListener("load", function (e)
      {
        variables.value.image.push(e.target.result);
      }, false);

      reader.readAsDataURL(file);
    }

  }

  if (files) {
    // [].forEach.call(files, readAndPreview);
    for (var i = 0; i < files.length;i++){
    await  readAndPreview(files[i])
    }
  }
}



const post = () =>
{

       
        queryOptions.value.enabled = true
}



const creatBase64Image =  (fileObject) =>
{
    const reader = new FileReader();

    reader.onload = (e) =>
    {
          
        variables.value.image.push(e.target.result);
        console.log(variables.value.image);
        queryOptions.value.enabled = true
        onResult((result) =>
        {
      if (!result.loading) {
      images=result.data.uploadImage.url
            
        }


            
        })

    }
  
reader.readAsDataURL(fileObject);
    
 
    
}

</script>

<template>
 <div class="container mt-10">
     <div class="card bg-slate-100">
       <img :src="images" alt="">
       <form  v-on:submit.prevent="post">
        <input @change="handleImage" ref="file"  type="file" accept="image/*" multiple name="" id="uploadpic">
        <input type="submit">
      </form>
     <div>
       <h1 v-if="loading">loading......</h1>
      <h1  v-else >Done!!! </h1>

     </div>

     </div>
 </div>

  
</template>
<style scoped>

</style>