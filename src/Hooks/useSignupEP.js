import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import {auth, firestore} from "../firebase/firebase"
// import SignUp from '../components/AuthForm/SignUp';
import { collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore';
import useShowToast from './useShowToast';
import useAuthStore from '../store/authStore';

const useSignupEP = () => {
  const [
    createUserWithEmailAndPassword,loading,error] = useCreateUserWithEmailAndPassword(auth)
    const showToast = useShowToast();
    const loginUser = useAuthStore((state)=>state.login)

    const signup = async (inputs)=> {

    if(!inputs.password || !inputs.email || !inputs.username || !inputs.fullname){
      console.log("showToast being called with error"); // Debugging
      
      showToast("Error","Please fill all the fields","error")   
      return;
    }
    const usersRef = collection(firestore, "users");                    /* RE-READ these three*/
		const q = query(usersRef, where("username", "==", inputs.username));/* RE-READ these three*/
		const querySnapshot = await getDocs(q);                             /* RE-READ these three*/

		if (!querySnapshot.empty) {
			showToast("Error", "Username already exists", "error");
			return;
		}
    try {
      const newUser = await createUserWithEmailAndPassword(inputs.email,inputs.password)
      if(!newUser)
      {
      showToast("Error", "This email is already in use. Please use another email.", "error"); 
      return;
      }
      if(newUser){
        const userDoc = {
          uid:newUser.user.uid,
          email:inputs.email,
          fullName:inputs.fullname,
          username:inputs.username,
          followers:[],
          following:[],
          posts:[],
          profilePicURL:[],
          bio:"",
          createdAt:Date.now()
        }
        await setDoc(doc(firestore, "users", newUser.user.uid), userDoc);
        localStorage.setItem("user-info",JSON.stringify(userDoc))
        console.log("showToast being called with success"); // Debugging
        loginUser(userDoc)

        showToast("Success", "Account created successfully", "success"); // Add success toast

      }

    } catch (error) {
      
      console.log("showToast being called with catch block error:", error.message); // Debugging
      showToast("Error",error.message,"error")
    }
   }
  return {loading,error,signup}
  
}

export default useSignupEP