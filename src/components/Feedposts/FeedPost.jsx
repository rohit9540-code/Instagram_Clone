import { Box, Image } from "@chakra-ui/react"
import useFetchUserProfile from "../../Hooks/useFetchUserProfile";
import PostHeader from "./PostHeader"
import PostFooter from "./PostFooter"

const FeedPost = ({post}) => {
  // console.log(post);
  const {userProfile} = useFetchUserProfile(post.createdBy)
  return (
    <>
    <PostHeader post={post} creatorProfile={userProfile}/>
    <Box my={3} borderRadius={2} overflow={"hidden"}>
      <Image src={post.imageURL} alt="feedPost img"/>
    </Box>
    <PostFooter  post={post} creatorProfile={userProfile}/>
    </>
  )
}

export default FeedPost