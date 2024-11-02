import {  Box, Container, Flex, Image, VStack } from "@chakra-ui/react"
import AuthForm from "../../components/AuthForm/AuthForm"
// import { useState } from "react"

function AuthPage() {
    // const [isLogin, setIsLogin] = useState(true)
  return (
<Flex minH={"100vh"} justifyContent={"center"} alignItems={"center"} px={4}>
    <Container maxW={"container.md"} padding={0}>
       <Flex gap={10} alignItems={"center"} justifyContent={"center"}>
        {/* left hand side */}
      
        <Box display={{base:"none", md:"block"}}>
            <Image src="/auth.png" h={650} alt="phone img"/>
        </Box>

        {/* right hand side */}

            <VStack spacing={4} alignItems={"stretch"}>
                <AuthForm/>                  {/* here is the AuthForm*/}
                <Box textAlign={"center"}>
                    Get the App.
                </Box>

                <Flex gap={5} justifyContent={"center"}>
                    <Image src="/playstore.png" h={10} alt="PlayStore logo"/>
                    <Image src="/microsoft.png" h={10} alt="Microsoft logo"/>
                </Flex>
            </VStack>
        </Flex>

    </Container>
</Flex>
  )
}

export default AuthPage