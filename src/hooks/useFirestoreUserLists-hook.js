import { useContext, useEffect, useState } from "react";
import { FirebaseContext } from "../firebase";
import { UserContext } from "../firebase/context";

const useFirestoreUserLists = () => {

  const firebase = useContext(FirebaseContext);
  const user = useContext(UserContext);

  const [data, setData] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const get = async () => {
      if (user.uid) {
        try {
          const snapshot = await firebase.firestore
            .collection("lists")
            .where("added_by", "==", user.uid)
            .orderBy("added_at", "desc")
            .get();


          const result = snapshot.docs.map((doc) => {
            let data = doc.data();
            data.id = doc.id;
            return data;
          })

          setData(result)

        } catch (err) { console.error(err); setError(err) }
      }
    }
    get();
  }, [user]);

  return [data, error];
};

export { useFirestoreUserLists };
