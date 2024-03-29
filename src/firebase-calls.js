import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  limit,
  doc,
  deleteDoc,
  setDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { db } from "./firebase-config";

export const addUserData = async (
  firstname,
  lastname,
  email,
  dob,
  country,
  username,
  userId,
  followers,
  following,
  profilePicURL,
  coverPicURL,
  bio
) => {
  const userData = {
    firstname,
    lastname,
    email,
    dob,
    country,
    username,
    userId,
    followers,
    following,
    profilePicURL,
    coverPicURL,
    bio,
  };
  await setDoc(doc(db, "userData", userId), userData);
};

export const updateUserdata = async (
  firstname,
  lastname,
  dob,
  country,
  profilePicURL,
  coverPicURL,
  bio,
  userId
) => {
  await updateDoc(doc(db, "userData", userId), {
    firstname,
    lastname,
    dob,
    country,
    profilePicURL,
    coverPicURL,
    bio,
  });
};
export const updateProfilePic = async (userId, profilePicURL) => {
  await updateDoc(doc(db, "userData", userId), {
    profilePicURL,
  });
};

export const getUserData = async (userId) => {
  const q = query(collection(db, "userData"), where("userId", "==", userId));
  const querySnapshot = await getDocs(q);
  let userDetails = {};
  querySnapshot.forEach((doc) => {
    userDetails = doc.data();
  });
  return userDetails;
};

export const addPostData = async (postText, userId, comments, imgURL) => {
  try {
    await addDoc(collection(db, "posts"), {
      dateCreated: Date.now(),
      postText,
      userId,
      comments,
      imgURL,
    });
  } catch (e) {
    console.error("Error adding Post doc: ", e);
  }
};

export const getPosts = async () => {
  let posts = [];
  const postData = await getDocs(collection(db, "posts"));
  postData.forEach((doc) => {
    posts.push({ data: doc.data(), id: doc.id });
  });
  return posts;
};

export const getAllUsers = async (userId) => {
  let users = [];
  const q = query(collection(db, "userData"));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    users.push({ data: doc.data() });
  });
  return users;
};

export const addBookmarks = async (userId, postId) => {
  try {
    const doc = await addDoc(collection(db, "bookmarks"), { userId, postId });
    return doc.id;
  } catch (error) {
    throw new Error(error);
  }
};

export const getBookmarks = async (userId) => {
  let bookmarks = [];
  const q = query(collection(db, "bookmarks"), where("userId", "==", userId));
  const querySnapshot = await getDocs(q);
  bookmarks = querySnapshot.docs.map((doc) => ({
    postId: doc.data().postId,
  }));

  return bookmarks;
};

export const deleteBookmark = async (postId, userId) => {
  try {
    const deleteQuery = query(
      collection(db, "bookmarks"),
      where("postId", "==", postId),
      where("userId", "==", userId)
    );
    const data = await getDocs(deleteQuery);
    const deleteId = data.docs[0].id;
    const BookmarkDoc = doc(db, "bookmarks", deleteId);
    await deleteDoc(BookmarkDoc);
    return deleteId;
  } catch (error) {
    throw new Error(error);
  }
};

export const addLikes = async (userId, postId) => {
  try {
    const doc = await addDoc(collection(db, "likes"), { userId, postId });
    return doc.id;
  } catch (error) {
    throw new Error(error);
  }
};

export const getLikes = async (postId) => {
  let data = [];
  const q = query(collection(db, "likes"), where("postId", "==", postId));
  const querySnapshot = await getDocs(q);
  data = querySnapshot.docs.map((doc) => ({
    userId: doc.data().userId,
    likeId: doc.id,
  }));
  return data;
};

export const deleteLike = async (postId, userId) => {
  try {
    const deleteQuery = query(
      collection(db, "likes"),
      where("postId", "==", postId),
      where("userId", "==", userId)
    );
    const data = await getDocs(deleteQuery);
    const deletePostId = data.docs[0].id;
    const likeToDelete = doc(db, "likes", deletePostId);
    await deleteDoc(likeToDelete);
    return deletePostId;
  } catch (error) {
    throw new Error(error);
  }
};

export const updateFollowData = async (userId, followUserId) => {
  const followingRef = doc(db, "userData", userId);
  const followerRef = doc(db, "userData", followUserId);
  await updateDoc(followingRef, {
    following: arrayUnion(followUserId),
  });
  await updateDoc(followerRef, {
    followers: arrayUnion(userId),
  });
};

export const updateUnfollowData = async (userId, followUserId) => {
  const followingRef = doc(db, "userData", userId);
  const followerRef = doc(db, "userData", followUserId);
  await updateDoc(followingRef, {
    following: arrayRemove(followUserId),
  });
  await updateDoc(followerRef, {
    followers: arrayRemove(userId),
  });
};

export const updateCommentsData = async (postId, commentData) => {
  const CommentRef = doc(db, "posts", postId);

  await updateDoc(CommentRef, {
    comments: arrayUnion(commentData),
  });
};
