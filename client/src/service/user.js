import jwt_decode from "jwt-decode";

export const getUserDetail = ()=>{
    const token = JSON.parse(localStorage.getItem('dev_token'));
   if(token){
    const decoded = jwt_decode(token);
    return decoded;
   }
}