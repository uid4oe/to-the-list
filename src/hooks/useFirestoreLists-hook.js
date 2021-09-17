import { useContext, useEffect, useState } from "react";
import { FirebaseContext } from "../firebase";

const useFirestoreLists = () => {

  const firebase = useContext(FirebaseContext);

  const [data, setData] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const get = async () => {
      try {
        const snapshot = await firebase.firestore
          .collection("lists")
          .where("visibility", "==", "public")
          .orderBy("added_at", "desc")
          .get();


        const midResult = snapshot.docs.map((doc) => {
          const obj = doc.data();
          obj["added_at"] = new Date(obj["added_at"].seconds * 1000 + obj["added_at"].nanoseconds / 1000000)
          obj["id"] = doc.id;
          return obj;
        })

        const result = await Promise.all(midResult.map(async item => {
          const doc = await firebase.firestore
            .doc(`users/${item.added_by}`)
            .get();
          const o = doc.data();
          return { ...item, displayName: o?.displayName || "Annoymous 🦆" }
        }));

        setData(result)

      } catch (err) { console.error(err); setError(err) }
    }
    get();
  }, []);

  return [data, error];
};

export { useFirestoreLists };
