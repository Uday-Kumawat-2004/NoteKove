import api from "../api/axios";


export function signupUser(data) {

  return api.post(
    "/users/signup",
    data
  );

}


export function signinUser(data) {

  return api.post(
    "/users/signin",
    data
  );

}


export function logoutUser() {

  return api.post(
    "/users/logout"
  );

}


export function getCurrentUser() {

  return api.get(
    "/users/profile"
  );

}