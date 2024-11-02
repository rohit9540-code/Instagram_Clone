import { useEffect, useState } from "react";
import useAuthStore from "../store/authStore";
import useUserprofileStore from "../store/userProfileStore";
import useShowToast from "./useShowToast";
import { arrayRemove, arrayUnion, doc, updateDoc, getDoc } from "firebase/firestore";
import { firestore } from "../firebase/Firebase";

const useFollowUser = (userId) => {
    const [isFollowing, setIsFollowing] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const authUser = useAuthStore((state) => state.user);
    const setAuthUser = useAuthStore((state) => state.setUser);
    const { userProfile, setUserProfile } = useUserprofileStore();
    const showToast = useShowToast();

    const handleFollowUser = async () => {
        if (!authUser || !authUser.uid) {
            showToast("Error", "User not authenticated", "error");
            return;
        }

        setIsUpdating(true);
        const currentUserRef = doc(firestore, "users", authUser.uid);
        const userToFollowRef = doc(firestore, "users", userId);

        try {
            const currentUserDoc = await getDoc(currentUserRef);
            const userToFollowDoc = await getDoc(userToFollowRef);

            if (!currentUserDoc.exists() || !userToFollowDoc.exists()) {
                throw new Error("User document does not exist");
            }

            await updateDoc(currentUserRef, {
                following: isFollowing ? arrayRemove(userId) : arrayUnion(userId)
            });
            await updateDoc(userToFollowRef, {
                followers: isFollowing ? arrayRemove(authUser.uid) : arrayUnion(authUser.uid)
            });

            // Update local authUser and userProfile state
            const updatedAuthUser = {
                ...authUser,
                following: isFollowing
                    ? authUser.following.filter((uid) => uid !== userId)
                    : [...authUser.following, userId]
            };
            setAuthUser(updatedAuthUser);

            if (userProfile) {
                const updatedUserProfile = {
                    ...userProfile,
                    followers: isFollowing
                        ? userProfile.followers.filter((uid) => uid !== authUser.uid)
                        : [...userProfile.followers, authUser.uid]
                };
                setUserProfile(updatedUserProfile);
            }

            // Update localStorage with the new authUser state
            localStorage.setItem("user-info", JSON.stringify(updatedAuthUser));
            setIsFollowing(!isFollowing);
        } catch (error) {
            showToast("Error", error.message, "error");
        } finally {
            setIsUpdating(false);
        }
    };

    useEffect(() => {
        if (authUser?.following) {
            setIsFollowing(authUser.following.includes(userId));
        }
    }, [authUser, userId]);

    return { isFollowing, isUpdating, handleFollowUser };
};

export default useFollowUser;