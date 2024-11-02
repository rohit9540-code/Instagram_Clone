import { Flex, Text, VStack } from "@chakra-ui/react"
import SuggestedHeader from "./SuggestedHeader"
import SuggestedUser from "./SuggestedUser"
import useGetSuggestedUsers from "../../Hooks/useGetSuggestedUsers"
// import useAuthStore from "../../store/authStore"
const SuggestedUsers = () => {
  const {isLoading,suggestedUsers} = useGetSuggestedUsers()
  // const setUser = useAuthStore((state)=>state.setUser)
  if(isLoading) return null;
  return (
    <VStack>
        <SuggestedHeader/>
        {suggestedUsers.length !== 0 && <Flex justifyContent={"space-between"} w={"full"} alignItems={"center"} mt={8} mb={5}>
            <Text fontSize={12} fontWeight={"bold"} color={"gray.500"}>
                Suggested for you</Text>
            <Text  fontSize={12} fontWeight={"bold"} _hover={{color:"gray.500"}} cursor={"pointer"}>
                See All</Text>
        </Flex>}
       {suggestedUsers.map((user=>
        (<SuggestedUser user={user} key={user.id} />)
       ))}

        <Text fontSize={12} color={"gray.500"} mt={25} alignSelf={"start"}>
            © 2024 Built by Rohit Dixit
        </Text>
    </VStack>
  )
}

export default SuggestedUsers