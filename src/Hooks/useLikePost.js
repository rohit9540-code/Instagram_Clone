import { useState } from "react"
import useShowToast from "./useShowToast";
import useAuthStore from "../store/authStore";
import { firestore } from "../firebase/Firebase";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";

const useLikePost = (post) => {
  const [isUpdating,setIsUpdating] = useState(false)
  const authUser = useAuthStore((state)=>state.user)
  const [like, setLike] = useState(post?.likes?.length || 0); // Default to 0 if post.likes is undefined
  const [isLiked, setIsLiked] = useState(post?.likes?.includes(authUser?.uid) || false); // Default to false if post.likes is undefined
  const showToast = useShowToast();

  const handleLikedPost = async()=>{
    if(isUpdating) return;
    if(!authUser) return showToast("Error","You must Login to Like this Post","error")
    if (!post) return showToast("Error", "Post data is missing", "error");
    setIsUpdating(true)
    try {
        const postRef = doc(firestore,"posts",post.id)
        await updateDoc(postRef,{
            likes: isLiked ? arrayRemove(authUser.uid) : arrayUnion(authUser.uid)
        })
        setIsLiked(!isLiked);
        isLiked ? setLike(like -1) : setLike(like +1);
    } catch (error) {
        showToast("Error",error.message,"error")
    } finally {
        setIsUpdating(false)
    }
  }
  return {like,isUpdating,isLiked,handleLikedPost}
}

export default useLikePost