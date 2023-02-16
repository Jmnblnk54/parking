import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import fire from "../config/config";
const AuthContext = createContext({});
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState("");

  const getData = async () => {};

  useEffect(() => {
    // getting user id from firebase auth
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        // console.log("User", user.uid);
        setUser(user);
        fire
          .firestore()
          .collection("users")
          .where("userId", "==", user.uid)
          .get()
          .then((doc) => {
            if (doc.size === 0) {
              // console.log("Size 0")
            } else {
              doc.forEach(async (data) => {
                // console.log(data.data().userType);
                setUserType(data.data().userType);
              });
            }
          })
          .catch((e) => {
            console.log(e);
          });
      } else {
        // console.log("No Loggin");
      }
    });
  }, []);
  // if (user !== null) {

  // }
  return (
    <AuthContext.Provider
      value={{
        user: user, //storing user value in context api
        userType: userType,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default function useAuth() {
  return useContext(AuthContext);
}
