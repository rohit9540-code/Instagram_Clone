import { useEffect, useState } from "react"
import useShowToast from "./useShowToast"
import { collection, getDocs, query, where } from "firebase/firestore"
import { firestore } from "../firebase/firebase"
import useUserprofileStore from "../store/userProfileStore"

const useGetUserProfile = (username) => {
    const showToast = useShowToast()
    const [isLoading, setIsLoading] = useState(true)
    const {userProfile,setUserProfile} = useUserprofileStore()

  useEffect(() => {
    const getUserProfile = async ()=> {
        setIsLoading(true)
        try {
            const q = query(collection(firestore,"users"),where("username","==",username))
            const querySnapshot = await getDocs(q)
            if(querySnapshot.empty) return setUserProfile(null);
            let userDoc;
            querySnapshot.forEach((doc) => {
                userDoc = doc.data();                
            });
            console.log(userDoc);
            setUserProfile(userDoc);
        } catch (error) {
            showToast("Error",error.message,"error");
        }
        finally {
            setIsLoading(false);
        }

    }
    getUserProfile()
    }, [setUserProfile,showToast,username])
  return {isLoading,userProfile}
}

export default useGetUserProfile