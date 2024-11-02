import { useState } from "react";
import useAuthStore from "../store/authStore"
import useShowToast from "./useShowToast";
import usePostStore from "../store/postStore";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { firestore } from "../firebase/Firebase";


const usePostComment = () => {
  const authUser = useAuthStore((state)=>state.user)
  const showToast = useShowToast();
  const [isCommenting,setIsCommenting] = useState(false);
  const addComment = usePostStore((state)=>state.addComment)

    const handlePostComment = async(postId,comment)=>{
        if(isCommenting) return;
        if(!authUser) return showToast("Error","You must log in to comment","error");
        setIsCommenting(true);

        const newComment = {
            comment,
            postId,
            createdAt:Date.now(),
            createdBy:authUser.uid
        }
        try {
            await updateDoc(doc(firestore,"posts",postId),{
                comment:arrayUnion(newComment)
            })
            addComment(postId,newComment)
        } catch (error) {
            showToast("Error",error.message,"error");
        } finally {
            setIsCommenting(false);
        }

    }
    return{handlePostComment,isCommenting}
}

export default usePostComment