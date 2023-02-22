import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authActions, validateToken } from "./features/store/authSlice";
import { fetchUserData } from "./features/store/userDataSlice";
import { fetchUsers } from "./features/Users/usersSlice";
import { fetchBookmarksData, fetchPosts } from "./features/store/postSlice";
import MainRoutes from "./utils/MainRoutes";

function App() {
  const userId = useSelector((state) => state.auth.userId);
  const currentToken = useSelector((state) => state.auth.token);
  const { following } = useSelector((state) => state.user.userData);
  const userDataStatus = useSelector((state) => state.user.status);
  const dispatch = useDispatch();

  // Validating token and getting User-Id
  useEffect(() => {
    if (currentToken) {
      dispatch(validateToken(currentToken));
    }
  }, [currentToken, dispatch]);

  useEffect(() => {
    dispatch(authActions.userLoggedIn(currentToken));
  }, [currentToken, dispatch]);

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserData(userId));
    }
  }, [userId, dispatch]);

  useEffect(() => {
    if (userId) {
      dispatch(fetchUsers(userId));
    }
  }, [userId, dispatch]);

  useEffect(() => {
    if (userId) {
      dispatch(fetchBookmarksData(userId));
    }
  }, [dispatch, userId]);

  useEffect(() => {
    if (userId && userDataStatus === "succeeded") {
      dispatch(fetchPosts({ following, userId }));
    }
  }, [dispatch, userId, following, userDataStatus]);

  return <MainRoutes />;
}

export default App;
