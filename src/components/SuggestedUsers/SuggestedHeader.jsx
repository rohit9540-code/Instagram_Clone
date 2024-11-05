import { Avatar, Flex,  Text,  Button } from "@chakra-ui/react"
import useLogout from "../../Hooks/useLogout"
import useAuthStore from "../../store/authStore";
import { Link } from "react-router-dom";

const SuggestedHeader = () => {
  const {handleLogout,isLoggingOut} = useLogout();
  const authUser = useAuthStore((state) => state.user)
  if(!authUser) return null;
  return (
    <Flex justifyContent={"space-between"} w={"full"} alignItems={"center"} mt={10} px={0}>
      <Flex alignItems={"center"}  gap={4}>
       <Link to={`${authUser.username}`}>
       <Avatar  size={"md"} src={authUser.profilePicURL}/>
       </Link>
       <Link to={`${authUser.username}`}>
       <Text fontSize={15} mt={2} pr={4} pb={2} fontWeight={"bold"}>
        {authUser.username}
       </Text>
       </Link>
      </Flex>
      <Button
       bg={"transparent"}
       colorScheme='blue'
       variant='ghost'
       fontSize={14}
       fontWeight={"medium"}
       color={"blue.400"}
       cursor={"pointer"}
       style={{ textDecoration:"none" }}
       onClick={handleLogout}
       isLoading={isLoggingOut}
       >Log out</Button>
    </Flex>
  )
}

export default SuggestedHeader