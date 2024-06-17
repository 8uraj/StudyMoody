import toast from "react-hot-toast";
import { setToken } from "../../slices/authSlice";
import { setUser } from "../../slices/profileSlice";

export default async function Logout(dispatch,navigate){
    

    try {
      dispatch(setToken(null));
      dispatch(setUser(null));

      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/login");
      toast.success("Logout Successfull");
    } catch (err) {
        console.log(err);
      toast.error("Logout Failed ");
    }
}