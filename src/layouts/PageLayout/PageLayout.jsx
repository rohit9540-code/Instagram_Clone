import { Box, Flex, Spinner } from "@chakra-ui/react"
import Sidebar from "../../components/Sidebar/Sidebar"
import { useLocation } from "react-router-dom"
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase";
import Navbar from "../../components/Navbar/Navbar";

function PageLayout({children}) {
    const {pathname} = useLocation();
    const [user,loading] = useAuthState(auth)
    const canRenderSidebar = pathname !== "/auth" && user;
    const canRenderNavbar = !user && !loading && pathname !== '/auth';
    const isAuthUser = !user && loading;

    if(isAuthUser) return <PageLayoutSpinner/>
    return (
    <Flex flexDirection={canRenderNavbar ? "column" : "row"}>
        {/* sidebar on the left */}
        {canRenderSidebar ? (
            <Box w={{base:"10vw",md:"0vw"}} mr={{base:"0vw", md:"5vw"}} >
            <Sidebar/>
            </Box>
        ) : null}
        {canRenderNavbar ? <Navbar /> : null}
        {/* Page Content on the right */}
        <Box flex={1} w={{base:"calc(100% - 9vw)",md:"calc(100% - 240px)"}} mx={"auto"}>
            {children}
        </Box>
    </Flex>
)
}

export default PageLayout
const PageLayoutSpinner = ()=>{
    return (
        <Flex flexDirection={"column"} h={"100vh"} alignItems={"center"} justifyContent={"center"}>
            <Spinner size={"xl"}/>
        </Flex>
    )
}