import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { FirebaseContext } from "../firebase";


const useProfile = () => {
  const firebase = useContext(FirebaseContext);
  const [userProfile, setUserProfile] = useState(JSON.parse(localStorage.getItem('authUser')));
  const [user, setUser] = useState(firebase.auth.currentUser || userProfile);

  const history = useHistory();
  const path = history.location.pathname;

  useEffect(() => {
    if (user?.uid) {
      return firebase.firestore
        .doc(`users/${user.uid}`)
        .onSnapshot((doc) => {
          if (doc.exists) {
            const data = doc.data();
            data.displayName = data.displayName || "Anonymous 🦆";
            setUserProfile(data);
            localStorage.setItem('authUser', JSON.stringify(data));
          }
        })
    } else {
      setUserProfile(null)
      localStorage.removeItem('authUser');
    }
  }, [user]);

  useEffect(() => {
    return firebase.auth.onAuthStateChanged((u) => setUser(u))
  }, [user]);

  useEffect(() => {
    if (user && path === "/welcome") {
      history.push("/")
    }
    else if (!user && path !== "/welcome" && !path.startsWith("/explore")) {
      history.push("/welcome")
    }
  }, [user]);

  return userProfile;
};

export { useProfile };
