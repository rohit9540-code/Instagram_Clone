import { Box, Container, Flex } from "@chakra-ui/react"
import FeedPosts from "../../components/Feedposts/FeedPosts"
import SuggestedUsers from "../../components/SuggestedUsers/SuggestedUsers"

 
function HomePage() {
  return (
    <Container maxW={"container.lg"}>
      <Flex gap={20}>
        <Box flex={2} py={10} mr={{base:"-4vw",md:0}} >
         <FeedPosts/>
        </Box>

        <Box flex={3} ml={10} display={{base:"none",lg:"block"}} maxW={"20vw"} >
          <SuggestedUsers/> 
        </Box>
      </Flex>
    </Container>
  )
}

export default HomePage