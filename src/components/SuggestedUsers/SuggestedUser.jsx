import { Avatar, Box, Button, Flex, VStack } from "@chakra-ui/react"
import useFollowUser from "../../Hooks/useFollowUser"
import useAuthStore from "../../store/authStore"
import { Link } from "react-router-dom"

const SuggestedUser = ({user,setUser}) => {
  const {isFollowing,isUpdating,handleFollowUser} = useFollowUser(user.uid)
  const authUser = useAuthStore((state)=>state.user)
  const onFollowUser = async () => {
		await handleFollowUser();
		setUser({
			...user,
			followers: isFollowing
				? user.followers.filter((follower) => follower.uid !== authUser.uid)
				: [...user.followers, authUser],
		});
	};
  return (
    <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"}>
      <Flex alignItems={"center"}gap={2}>
        <Link to={`/${user.username}`}>
        <Avatar src={user.profilePicURL} alignItems={"center"} gap={2} />
        </Link>
        <VStack spacing={2} alignItems={"flex-start"}>
        <Link to={`/${user.username}`}>
        <Box fontSize={13} fontWeight={"bold"} >{user.fullname}</Box>
        </Link>
        <Box fontSize={12} color={"gray.500"}>{user.followers.length} followers</Box>
        </VStack>
      </Flex>
        {(authUser.uid !== user.uid) && 
        <Button fontSize={13}
        bg={"transparent"}
        p={0}
        h={"max-content"}
        color={"blue.400"}
        cursor={"pointer"}
        _hover={{color:"white"}}
        // _active={{pl:-15}}
        onClick={onFollowUser}
        isLoading={isUpdating}
        border={"4px solid transparent"}
        >
        {isFollowing? "unfollow":"follow"}
        </Button>}
    </Flex>
  )
}

export default SuggestedUser