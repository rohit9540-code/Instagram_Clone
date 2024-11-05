import { Box, Container, Flex, Skeleton, SkeletonCircle, Text, VStack } from "@chakra-ui/react"
import FeedPost from "./FeedPost"
import useGetFeedPosts from "../../Hooks/useGetFeedPosts"

const FeedPosts = () => {
  const {isLoading,posts} = useGetFeedPosts();
  // console.log(posts);
  
  return (
   <Container maxW={"container.sm"}>
    {isLoading && [0,1,2].map((_,index)=>(
      <VStack key={index} gap={4} alignItems={"flex-start"} mb={10}>
        <Flex gap={2}>
          <SkeletonCircle size={10}/>
          <VStack mt={1} >
            <Skeleton height={"10px"} w={"200px"}/>
            <Skeleton height={"10px"} w={"200px"}/>
          </VStack>
        </Flex>
        <Skeleton w={"full"}>
          <Box height={"400px"} >
            Content to wrap
          </Box>
        </Skeleton>
      </VStack>
    ))}
        {!isLoading && posts.length > 0 && posts.map((post)=> <FeedPost key={post.id} post={post} />)}
        {!isLoading && posts.length === 0 && (
				<>
					<Text fontSize={"xl"} color={"red"}>
						Dayuum. Looks like you don&apos;t have any friends.
					</Text>
					<Text color={"red.400"}>Stop coding and go make some!!</Text>
				</>
			)}
   </Container>
  )
}

export default FeedPosts