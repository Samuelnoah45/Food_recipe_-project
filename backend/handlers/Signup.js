const { gql } = require("graphql-tag");
const apollo_client = require("../utils/apollo");
const jwt = require("jsonwebtoken");
 const bcrypt = require("bcrypt");


const signupHandler = async (req, res) => {

    console.log(req.body.input);
    console.log("Signup")
    const credentials = req.body.input;
    credentials.password = await bcrypt.hash(credentials.password, 12);
    console.log(process.env.HASURA_GRAPHQL_ADMIN_SECRET)
    const variables = {
    email: credentials.email,
    password:credentials.password,
    name: credentials.name,
  };

  console.log(credentials);

  let data = await apollo_client.mutate({
    mutation: gql`
    mutation ($email: String!, $password: String!, $name: String!) {
      insert_users_one(object: {email:$email, name:$name, password:$password}){
        id
        email
        name
      }
    }
    
    `,
    variables: variables,
  });
  
  console.log(data.data.insert_users_one.id);

  payload = {
      "https://hasura.io/jwt/claims": {
          "x-hasura-allowed-roles": ["admin", "user"],
          "x-hasura-default-role": "user",
          "x-hasura-user-id":""+data.data.insert_users_one.id,
      }
  }

//   console.log(payload);
  const token = jwt.sign(payload, process.env.HASURA_GRAPHQL_JWT_SECRETS, {
      algorithm: "HS256",
      expiresIn: '1hr'
  })

  return res.json({
    token,
    email: data.data.insert_users_one.email,
    name: data.data.insert_users_one.name, 
  })
};

module.exports = signupHandler;
