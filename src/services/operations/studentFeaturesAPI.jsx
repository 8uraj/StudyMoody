import toast from "react-hot-toast";
import axios from "axios";
import rzp_logo from "../../assets/Logo/rzp_logo.png";
function loadScript(src){
    return new Promise((resolve)=>{
        const script=document.createElement("script");
        script.src=src;

        script.onload=()=>{
            resolve(true);
        }
        script.onerror=()=>{
            resolve(false);
        }
        document.body.appendChild(script);
    })
}

export async function buyCourse(token,courses,userDetails,navigate,dispatch){
    const toastId=toast.loading("Loading...");
   
    try{
      const res=await loadScript("https://checkout.razorpay.com/v1/checkout.js");
      if(!res){
         
        toast.error("Razorpay failed to load");
      }
       var url = import.meta.env.VITE_REACT_APP_BASE_URL;
      const orderResponse=await axios.post(`${url}/payment/capturePayment`,{courses,token},{
        Authorization:`Bearer ${token}`
      })
      
      if(!orderResponse.data.success){
       
        throw new Error(orderResponse.data.message);
      }
      const options = {
        key: import.meta.env.RAZORPAY_KEY,
        currency: orderResponse.data.message.currency,
        amount: `${orderResponse.data.message.amount}`,
        order_id: orderResponse.data.message.id,
        name: "StudyNotion",
        description: "Thank you for purchasing thr course",
        image: rzp_logo,
        prefill: {
          name: `${userDetails.firstName}`,
          email: userDetails.email,
        },
        handler: function (response) {
          sendPaymentSuccessEmail(
            response,
            orderResponse.data.message.amount,
            token
          ),
            verifyPayment({ ...response, courses }, token, navigate, dispatch);
        },
      };
       
       const paymentObject=new window.Razorpay(options);
       paymentObject.open();
       paymentObject.on("payment.failed",function(response){
        toast.error("Payment failed");

       })
      
    }
    catch(err){

      console.log(err);
      console.log("Payment error");
    }
     toast.dismiss(toastId);
}

async function sendPaymentSuccessEmail(response,amount,token){
    try{
      var url = import.meta.env.VITE_REACT_APP_BASE_URL;
        await axios.post(`${url}/payment/sendPaymentSuccessEmail`,{
            orderId:response.razorpay_order_id,
            paymenId:response.razorpay_payment_id,
            amount,token

        },{
            Authorization:`Bearer ${token}`
        })
    }
    catch(err){
      console.log("Payment success email error");
    }
}
async function verifyPayment(bodyData,token,navigate,dispatch){
    const toastId=toast.loading("verifying payment");
    // dispatch(setPaymentLoading(true));
    try{
      var url = import.meta.env.VITE_REACT_APP_BASE_URL;
      const response = await axios.post(
        `${url}/payment/verifyPayment`,
        {bodyData,token},
        {
          Authorization: `Bearer ${token}`,
        }
      );
      if(!response.data.success){
        throw new Error (response.data.message);
      }
      toast.success("payment successfull");
      navigate("/dashboard/enrolled-courses");
      dispatch(resetCart());
    }
    catch(err){
      console.log(err);
      console.log("payment verify error");
    }
    toast.dismiss(toastId);
    // dispatch(setPaymentLoading(false));
}