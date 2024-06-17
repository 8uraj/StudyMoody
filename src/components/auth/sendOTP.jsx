import  axios  from "axios";
export default async function sendOTP(email,dispatch){
 try{
  var url = import.meta.env.VITE_REACT_APP_BASE_URL;
      const result = await axios.post(`${url}/sendOTP`, {
        email: email,
      });
      console.log("result in opt is : ",result);
      return result;
 }
 catch(err){
    return err;
 }
}