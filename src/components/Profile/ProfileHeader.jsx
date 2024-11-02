import { Avatar, AvatarGroup, Button, Flex, Text, useDisclosure, VStack } from "@chakra-ui/react"
import useUserprofileStore from "../../store/userProfileStore"
import useAuthStore from "../../store/authStore"
import EditProfile from "./EditProfile"
import useFollowUser from "../../Hooks/useFollowUser"

const ProfileHeader = () => {
  const {isOpen,onOpen,onClose}= useDisclosure()
  const {userProfile} = useUserprofileStore()
  const authUser = useAuthStore((state)=>state.user)

  const {handleFollowUser,isFollowing,isUpdating} = useFollowUser(userProfile?.uid)

  const isOwnProfile = authUser && authUser.username === userProfile.username;
  const isAnotherProfile = authUser && authUser.username !== userProfile.username;
  return (
    <Flex gap={{ base: 4, sm: 10 }} py={10} direction={{ base: "column", sm: "row" }}>

<AvatarGroup size={{ base: "xl", md: "2xl" }} justifySelf={"center"} alignSelf={"flex-start"} mx={"auto"}>

<Avatar  src={userProfile.profilePicURL} alt='Rohit,s logo' />

</AvatarGroup>

<VStack alignItems={"start"} gap={2} mx={"auto"} flex={1}>
<Flex

gap={4}

direction={{ base: "column", sm: "row" }}

justifyContent={{ base: "center", sm: "flex-start" }}

alignItems={"center"}

w={"full"}>

<Text fontSize={{ base: "lg", md: "xl" }} fontWeight={600}>{userProfile.username}</Text>

{ isOwnProfile && (<Flex gap={4} alignItems={"center"} justifyContent={"center"}>
<Button bg={"white"} color={"black"} _hover={{bg:"whiteAlpha.800"}} size={{base:"xs", md:"sm"}}onClick={onOpen}>
Edit Profile
</Button>
</Flex>) }
{ isAnotherProfile && (<Flex gap={4} alignItems={"center"} justifyContent={"center"}>
<Button bg={"blue.500"} color={"white"} _hover={{bg:"blue.600"}} size={{base:"xs", md:"sm"}}
onClick={handleFollowUser}
isLoading={isUpdating}>
{isFollowing ? "unfollow" : "Follow"}
</Button>
</Flex>) }

</Flex> 
<Flex alignItems={"center"} gap={{base:2,sm:4}}>
<Text fontSize={{base:"xs",md:"lg"}}>
    <Text as={"span"} fontWeight={"semibold"} fontSize={"xl"} mr={1}>{userProfile.posts.length}</Text>
    {(userProfile.posts.length > 1) ? "Posts" : "Post"}
</Text>
<Text fontSize={{base:"xs",md:"lg"}}>
    <Text as={"span"} fontWeight={"semibold"} fontSize={"xl"} mr={1}>{userProfile.followers.length}</Text>
    {(userProfile.followers.length > 1) ? "Followers" : "Follower"}
</Text>
<Text fontSize={{base:"xs",md:"lg"}}>
    <Text as={"span"} fontWeight={"semibold"} fontSize={"xl"}> {userProfile.following.length} </Text>
    Following
</Text>
</Flex>
<Flex alignItems={"center"} mt={1}>
<Text fontSize={"lg"} fontWeight={"bold"}> {userProfile.fullName} </Text>
</Flex>
<Text fontSize={"md"}mt={-2}fontWeight={400}>{userProfile.bio}</Text>



</VStack>

{ isOpen && <EditProfile isOpen={isOpen} onClose={onClose} /> }
</Flex>
  )
}

export default ProfileHeader