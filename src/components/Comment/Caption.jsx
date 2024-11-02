import { Avatar, Flex, Text } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import useUserprofileStore from "../../store/userProfileStore"
import { timeAgo } from "../../utils/timeAgo"

const Caption = ({post}) => {
    const userProfile = useUserprofileStore((state)=>state.userProfile)
  return (<Flex gap={4}>
    <Link to={`/${userProfile.fullName}`}>
    <Avatar src={userProfile.profilePicURL} size={"sm"} />
    </Link>
    <Flex direction={"column"}>
        <Flex alignItems={"center"} gap={2}>
            <Link to={`/${userProfile.fullName}`}>
                <Text fontSize={12} fontWeight={"bold"}>
                    {userProfile.fullName}
                </Text>
            </Link>
            <Text fontSize={14} >
                {post.caption}
            </Text>
        </Flex>
            <Text fontSize={12} color={"gray"}>
                {timeAgo(post.createdAt)}
            </Text>
    </Flex>
</Flex>)
}

export default Caption