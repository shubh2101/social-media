import { IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { BookmarkBorderIcon, BookmarkedIcon } from "../../../assets/MUI/icons";
import {
  deleteBookmarkdata,
  fetchBookmarksData,
  postActions,
} from "../../../features/store/postSlice";
import { addBookmarks } from "../../../firebase-calls";

const Bookmark = ({ postId, bookmarks }) => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.userId);
  const isBookmarked = bookmarks?.find((bm) => bm.postId === postId);

  const addBookmarkHandler = async () => {
    const docId = await addBookmarks(userId, postId);
    const payload = { postId: postId, bookmarkId: docId } || {};
    dispatch(postActions.setBookmark(payload));
  };

  const deleteBookmarkHandler = async () => {
    dispatch(deleteBookmarkdata({ postId: postId, userId: userId } || {})).then(
      () => {
        dispatch(fetchBookmarksData(userId));
      }
    );
  };

  return (
    <IconButton
      aria-label="bookmark"
      onClick={isBookmarked ? deleteBookmarkHandler : addBookmarkHandler}
    >
      {isBookmarked ? (
        <BookmarkedIcon color="secondary" />
      ) : (
        <BookmarkBorderIcon />
      )}
    </IconButton>
  );
};

export default Bookmark;
