import { useSelector } from "react-redux";
import FollowersFollowing from "../components/FollowersFollowing";

const FollowingPage = () => {
  const { following } = useSelector((state) => state.user.profileData);

  return <FollowersFollowing connectedPeople={following} />;
};

export default FollowingPage;
