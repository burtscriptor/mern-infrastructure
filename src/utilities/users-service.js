import * as usersAPI from '../utilities/users-api'

export async function signUp(userData) {
    // Delegate the network request code to the users-api.js API module
    // which will ultimately return a JSON Web Token (JWT)
    const token = await usersAPI.signUp(userData);
    // Baby step by returning whatever is sent back by the server
    localStorage.setItem('token', token);
    return getUser();
};

export async function logIn(logUser) {
  // console.log('user-service login triggerd')
    const token =  await usersAPI.logIn(logUser);

localStorage.setItem('token',token)
return getUser();

};

  export function logOut () {
    localStorage.removeItem('token');
  };

  export function getToken() {
    // console.log('this is gettoken');
    // getItem returns null if there's no string
    const token = localStorage.getItem('token');
    if (!token) return null;
    // Obtain the payload of the token
    const payload = JSON.parse(atob(token.split('.')[1]));
    // A JWT's exp is expressed in seconds, not milliseconds, so convert
    if (payload.exp < Date.now() / 1000) {
      // Token has expired - remove it from localStorage
      localStorage.removeItem('token');
      return null;
    }
    return token;
  };
  
const checkToken = async () => {
    // console.log("user-service checkToken triggered")
    // Just so that you don't forget how to use .then
  return usersAPI.checkToken().then(dateStr => new Date(dateStr));
}

  export function getUser() {
    // console.log('this is get user');
    const token = getToken();
    // console.log('token from getuser', token)
    // If there's a token, return the user in the payload, otherwise return null
    return token ? JSON.parse(atob(token.split('.')[1])).user : null;
  };

  export default checkToken;