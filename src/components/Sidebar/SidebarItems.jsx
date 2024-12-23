import CreatePost from "./CreatePost"
import Home from "./Home"
import Notifications from "./Notifications"
import ProfileLink from "./ProfileLink"
import Search from "./Search"

const SidebarItems = () => {
  return (
   <>
   <Home />
   <Notifications />
   <CreatePost/>
   <Search/>
   <ProfileLink/>
   </>
  )
}

export default SidebarItems