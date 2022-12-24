import { useDispatch, useSelector } from "react-redux";
import { StyledFollowButton } from "../assets/MUI/components/Button";
import { userActions } from "../features/store/userDataSlice";
import { updateFollowData, updateUnfollowData } from "../firebase-calls";

const FollowButton = ({isFollowing, followUserId}) => {
  const dispatch = useDispatch();
  const loggedInUserId = useSelector((state) => state.user.userId);
  const followHandler = async () => {
    try {
      await updateFollowData(loggedInUserId, followUserId);
      dispatch(userActions.follow(followUserId));
    } catch (error) {
      throw new Error(error);
    }
  };

  const unfollowHandler = async () => {
    try {
      await updateUnfollowData(loggedInUserId, followUserId);
      dispatch(userActions.unfollow(followUserId));
    } catch (error) {
      throw new Error(error);
    }
  };

  return (
    <StyledFollowButton
      variant="contained"
      onClick={isFollowing ? unfollowHandler : followHandler}
    >
      {isFollowing ? "Unfollow" : "Follow"}
    </StyledFollowButton>
  );
};

export default FollowButton;
