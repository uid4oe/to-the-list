import { useContext, useEffect, useState } from "react";
import { FirebaseContext } from "../firebase";

const useFirestoreSingleList = (id) => {

  const firebase = useContext(FirebaseContext);
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const get = async () => {
      try {
        const doc = await firebase.firestore
          .doc(`lists/${id}`)
          .get();

        const result = doc.data();
        result.id = doc.id;

        setData(result)

      } catch (err) { console.error(err); setError(err) }
    }
    get();
  }, []);

  return [data, error];
};

export { useFirestoreSingleList };
