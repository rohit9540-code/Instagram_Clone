import { Flex, Image, Text } from "@chakra-ui/react";
import { auth, firestore } from "../../firebase/Firebase";
import useShowToast from "../../Hooks/useShowToast";
import useAuthStore from "../../store/authStore";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const GoogleAuth = ({ prefix }) => {
    const showToast = useShowToast();
    const loginUser = useAuthStore((state) => state.login);

    const handleGoogleAuth = async () => {
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({
            prompt: "select_account", // This will force account selection
        });

        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            const userRef = doc(firestore, "users", user.uid);
            const userSnap = await getDoc(userRef);

            if (userSnap.exists()) {
                // User exists, log them in
                const userDoc = userSnap.data();
                localStorage.setItem("user-info", JSON.stringify(userDoc));
                loginUser(userDoc);
            } else {
                // User does not exist, create new user
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
                await setDoc(doc(firestore, "users", user.uid), userDoc);
                localStorage.setItem("user-info", JSON.stringify(userDoc));
                loginUser(userDoc);
            }
        } catch (error) {
            showToast("Error", error.message, "error");
        }
    };

    return (
        <Flex
            justifyContent={"center"}
            alignItems={"center"}
            cursor={"pointer"}
            onClick={handleGoogleAuth}
        >
            <Image src="/google.png" w={5} alt="Google Logo" />
            <Text mx={2} color={"blue.500"}>
                {prefix} with Google
            </Text>
        </Flex>
    );
};

export default GoogleAuth;
