const { gql } = require("graphql-tag");
const apollo_client = require("../utils/apollo");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const loginHandler = async (req, res) => {
  // get request input
  const credientials = req.body.input;
  const email = credientials.email;

  let GET_USER = gql`
  query ($email: String!) {
    users(where: {email: {_eq: $email}}) {
      id
      name
      email
      password
     
    }}
  
  `;

  let data = await apollo_client.query({
    query: GET_USER,
    variables: { email },
  });
  
  const user = data.data.users[0];
  console.log(user)
  if(user){
    const isValidPassword = await bcrypt.compare(
      credientials.password,
      user.password
      ) 
  
  if(isValidPassword){
     console.log(user)

  payload = {
    "https://hasura.io/jwt/claims": {
      "x-hasura-allowed-roles": ["admin", "user"],
      "x-hasura-default-role": "user",
      "x-hasura-user-id":""+user.id,
    },
    metadata: {
      "x-hasura-allowed-roles": ["admin", "user"],
      "x-hasura-default-role": "user",
      "x-hasura-user-id":""+user.id,
    },
  };
  const token = jwt.sign(payload, process.env.HASURA_GRAPHQL_JWT_SECRETS, {
    algorithm: "HS256",
    expiresIn: Date.now() + 1 * 24 * 60 * 60 * 1000,
  });

console.log(token);
  // success
  return res.json({ 
    email: user.email,
    name: user.name,
    token: token,
    userId:user.id
  });

  }
    
  else {
    
return res.json({
    numOfposts:"",
    email:"",
    name: "",
    token: "",
    userId:null
})
    }

  }


else{
return res.json({
    numOfposts:"",
    email:"",
    name: "",
    token: "",
    userId:null
})

}

};

module.exports = loginHandler;
