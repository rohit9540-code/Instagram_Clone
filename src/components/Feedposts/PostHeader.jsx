import { Avatar, Box, Button, Flex, SkeletonCircle } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import useFollowUser from "../../Hooks/useFollowUser"
import { timeAgo } from "../../utils/timeAgo"

const PostHeader = ({post,creatorProfile}) => {
  // console.log(post);
  
  const {handleFollowUser,isFollowing,isUpdating} = useFollowUser(post.id)
  return (
    <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"} mb={2} mt={5}>
        <Flex alignItems={"center"} gap={2}>
            {creatorProfile ? (
              <Link to={`/${creatorProfile.username}`}>
               <Avatar src={creatorProfile.profilePicURL} alt="User Profile Picture" size={"sm"}/>
              </Link>) : (
              <SkeletonCircle size={"10px"}/>
            )}
            {creatorProfile ? (
              <Link to={`/${creatorProfile.username}`}>
              <Flex fontSize={14} fontWeight={"bold"} gap={2}>
                    {creatorProfile.username}
                      
              </Flex>
              </Link>
            ) :
            (
              <SkeletonCircle height={"10px"} width={"100px"}/>
            )
          }
            <Box color={"gray.500"}>{timeAgo(post.createdAt)}</Box>
        </Flex>
        <Box cursor={"pointer"}>
          <Button
          size={"xs"}
          bg={"transparent"} 
          fontSize={12} 
          color={"blue.500"} 
          fontWeight={"bold"}
          _hover={{
            color:"white",
          }}
          transition={"0.3 ease-in-out"}
          onClick={handleFollowUser}
          isLoading={isUpdating}
          >
            {!isFollowing ? "UnFollow" : "Follow"}
          </Button>
        </Box>
    </Flex>
  )
}

export default PostHeader