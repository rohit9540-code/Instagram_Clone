import { Box, Flex, Image,  Text, VStack } from "@chakra-ui/react"
// import { color } from "framer-motion"
import Login from "./Login"
import SignUp from "./SignUp"
import { useState } from "react"
import GoogleAuth from "./GoogleAuth"
import MSAuth from "./MSAuth"
function AuthForm() {
  const [isLogin, setIsLogin] = useState(true)
 
  return (
<>
    <Box border={"0.5px solid gray"} borderRadius={4} padding={5}>
      <VStack spacing={4}>
        <Image src="/logo.png" h={24} cursor={"pointer"} alt="Instagram Logo"/>
        
        {isLogin ? <Login />:<SignUp/>}
        

        {/* ---------OR---------- */}

        <Flex alignItems={"center"} justifyContent={"center"} my={4} gap={1} w={"full"}>
          <Box flex={2} h={"1px"} bg={"gray.400"}/>
          <Text>OR</Text> 
          <Box flex={2} h={"1px"} bg={"gray.400"}/>
        </Flex>

        <GoogleAuth prefix={ isLogin ? "Log in" : "Sign up"}/>    {/* Google auth*/}
        <MSAuth prefix={ isLogin ? "Log in" : "Sign up"}/>        {/*Microsoft auth */}
      </VStack>
    </Box>

     <Box border={"1px solid gray"} borderRadius={4} padding={5}>
        <Flex alignItems={"center"} justifyContent={"center"}>
          <Box mx={2} fontSize={14}>
            {isLogin? "Don't have an Account?" : "Already have an Account?"}
          </Box>
          <Box onClick={()=>(setIsLogin(!isLogin))} color ={"blue.500"} cursor={"pointer"}>
            {isLogin? "Sign up" : "Log in"}
          </Box>
        </Flex>
     </Box>

</>
  )
}

export default AuthForm