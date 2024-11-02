import { useEffect, useState } from "react"
import useShowToast from "./useShowToast"
import { firestore } from "../firebase/Firebase"
import { doc, getDoc } from "firebase/firestore"

const useFetchUserProfile = (userId) => {
 const [isFetching,setIsFetching] = useState(true)
 const [userProfile,setUserProfile] = useState(null)
 const showToast = useShowToast()
//  console.log(typeof(userProfile.username))
useEffect(()=>{
    const getUserProfile = async()=>{
        setUserProfile(null);
        setIsFetching(true);
        // console.log(userProfile)
        try {
            const userRef = await getDoc(doc(firestore,"users",userId))
            if(userRef.exists()){
                setUserProfile(userRef.data())
            }
        } catch (error) {
            showToast("Error", error.message,"error")
        } finally {
            setIsFetching(false)
        }
    }
    
    getUserProfile();
},[showToast,setUserProfile,userId])
return {isFetching,setUserProfile,userProfile}
}

export default useFetchUserProfile