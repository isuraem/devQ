import auth0 from 'auth0-js';

var webAuth = new auth0.WebAuth({
    domain: `${process.env.AUTH0_ISSUER_BASE_URL}`,
    clientID:  `${process.env.AUTH0_CLIENT_ID}`
  });

export default webAuth;