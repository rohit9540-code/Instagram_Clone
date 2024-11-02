import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, firestore } from "../../firebase/firebase";
import useShowToast from "../../Hooks/useShowToast"
import useAuthStore from "../../store/authStore";
import { useSignInWithMicrosoft } from 'react-firebase-hooks/auth';
import { Flex, Image, Text } from "@chakra-ui/react";

const MSAuth = ({ prefix }) => {
    const showToast = useShowToast();
    const loginUser = useAuthStore((state)=>state.login);
    const [signInWithMicrosoft, user, , error] = useSignInWithMicrosoft(auth);
    
    const handleMSAuth = async ()=>{
        try {
            const newUser = await signInWithMicrosoft();
            if(!newUser && error){
                showToast("Error",error.message,"error")
                return;
            }
            const userRef = doc(firestore, "users", newUser.user.uid);
			const userSnap = await getDoc(userRef);

            if(userSnap.exists()){
                //login
                const userDoc = userSnap.data();
                localStorage.setItem("user-info",JSON.stringify(userDoc))
                loginUser(userDoc)
            }
            else{
                //sign up
                const userDoc = {
                    uid: user.uid,
                    email: user.email,
                    username: user.email.split("@")[0],
                    fullName: user.displayName,
                    bio: "",
                    profilePicURL: user.photoURL,
                    followers: [],
                    following: [],
                    posts: [],
                    createdAt: Date.now(),
                };
                await setDoc(doc(firestore,"users",newUser.user.uid),userDoc)
                localStorage.setItem("user-info",JSON.stringify(userDoc))
                loginUser(userDoc)
            }
        } catch (error) {
            showToast("Error",error.message,"error")
        }

    }
 
    return (
        <Flex alignItems={"center"} justifyContent={"center"} cursor={"pointer"} onClick={handleMSAuth}>
        <Image src='/MS.png' w={5} alt='MS logo' />
        <Text mx='2' color={"blue.500"}>
            {prefix} with Microsoft
        </Text>
    </Flex>
  )
}

export default MSAuth