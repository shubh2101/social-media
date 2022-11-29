import { collection, query, where, getDocs, addDoc } from "firebase/firestore";

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
  const userDataRef = await addDoc(collection(db, "userData"), userData);
  console.log("user data send");
  console.log("The new ID is: " + userDataRef.id);
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
