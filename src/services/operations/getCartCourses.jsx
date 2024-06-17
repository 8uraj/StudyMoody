import axios from "axios";
import { setcart } from "../../slices/cartSlice";
export async function getCartCourses(token, dispatch) {
  try {
    var url = import.meta.env.VITE_REACT_APP_BASE_URL;
    const result = await axios.post(
      `${url}/cart/getcartcourses`,
      {token},
      {
        Authorization: `Bearer ${token}`,
      }
    );
     
    dispatch(setcart(result.data.cartCourses));
    return result;
    // window.location.reload();
  } catch (err) {
    console.log(err);
    console.log("error in getting cart courses");
  }
}
