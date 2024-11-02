import {  Avatar, Flex, Skeleton, SkeletonCircle, Text } from "@chakra-ui/react"
import useFetchUserProfile from "../../Hooks/useFetchUserProfile"
import { Link } from "react-router-dom"
import { timeAgo } from "../../utils/timeAgo"


const Comment = ({comment}) => {
    const {userProfile,isFetching} = useFetchUserProfile(comment.createdBy)
    console.log(userProfile)
    if(isFetching) return <CommentSkeleton />
    
    return (
    <Flex gap={4}>
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
                    {comment.comment}
                </Text>
            </Flex>
                <Text fontSize={12} color={"gray"}>
                    {timeAgo(comment.createdAt)}
                </Text>
        </Flex>
    </Flex>
  )
}

export default Comment

const CommentSkeleton = () => {
	return (
		<Flex gap={4} w={"full"} alignItems={"center"}>
			<SkeletonCircle h={10} w='10' />
			<Flex gap={1} flexDir={"column"}>
				<Skeleton height={2} width={100} />
				<Skeleton height={2} width={50} />
			</Flex>
		</Flex>
	);
};