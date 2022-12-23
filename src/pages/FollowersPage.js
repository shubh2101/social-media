import { useSelector } from "react-redux";
import FollowersFollowing from "../components/FollowersFollowing";

const FollowersPage = () => {
  const { followers } = useSelector((state) => state.user.profileData);

  return <FollowersFollowing connectedPeople={followers} />;
};

export default FollowersPage;
