import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  limit,
} from "firebase/firestore";
import { db } from "./firebase-config";

export const addUserData = async (
  firstname,
  lastname,
  email,
  dob,
  country,
  username,
  userId
) => {
  const userData = {
    firstname,
    lastname,
    email,
    dob,
    country,
    username,
    userId,
  };
  await addDoc(collection(db, "userData"), userData);
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

export const addPostData = async (
  postText,
  firstname,
  lastname,
  username,
  userId
) => {
  try {
    await addDoc(collection(db, "posts"), {
      dateCreated: new Date().toLocaleString(),
      postText,
      firstname,
      lastname,
      username,
      userId,
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
  const q = query(collection(db, "userData"), where("userId", "!=", userId));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    users.push({ data: doc.data() });
  });
  return users;
};

export const addBookmarks = async (userId, postId) => {
  try {
    await addDoc(collection(db, "bookmarks"), { userId, postId });
  } catch (error) {
    throw new Error(error);
  }
};

export const getBookmarks = async (userId) => {
  let bookmarks = [];
  const bookmarksById = await getDocs(
    collection(db, "bookmarks"),
    where("userId", "==", userId)
  );
  bookmarksById.forEach((doc) => {
    bookmarks.push(doc.data());
  });
  return bookmarks;
};
