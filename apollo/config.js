import {ApolloClient,createHttpLink,InMemoryCache,gql} from "@apollo/client/core";
import token from '../Authentication/cookie';
// import { useUserStore } from "../src/store/userInfo";
// const userStore =useUserStore()
// console.log(userStore.user.token)
const auth = "Bearer " + token.getCookie("foodRecipeUser");

let httpLink;
console.log(token.getCookie("foodRecipeUser"));
if (token.getCookie("foodRecipeUser") !="") {
   httpLink = createHttpLink({
  uri: "http://localhost:8080/v1/graphql",
  headers: {
    "content-type": "application/json",
    //  "x-hasura-admin-secret": "skyisbluesamuelnoah",
     "Authorization":auth
}
});
console.log("auth")
}
else {
   httpLink = createHttpLink({
  uri: "http://localhost:8080/v1/graphql",
  headers: {
    "content-type": "application/json",
    // "x-hasura-admin-secret": "skyisbluesamuelnoah",
    //  "Authorization":auth
}
  });
console.log("noauth")
  
}



const cache = new InMemoryCache();

const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
});

export{apolloClient}

