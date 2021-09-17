import { useContext, useState } from "react";
import { Menu, Icon, Modal, Grid, Header, Button, Container, Segment, Card } from "semantic-ui-react";
import { FirebaseContext } from "../../firebase";


const QuickStartButton = ({ compact }) => {

  const firebase = useContext(FirebaseContext);

  const [loading, setLoading] = useState(false);

  const anonymous = async () => {

    try {
      setLoading(true)
      const user = await firebase.auth.signInAnonymously();
      const { uid, displayName, email } = user.user;
      await firebase.firestore.doc(`users/${uid}`).set({
        uid,
        displayName,
        email,
        favourite_lists: [],
        theme: "light",
        status: "active",
      })
    }
    catch (err) {
      setLoading(false)
    };

  }
  return <Button loading={loading} color="orange" content="Quick Start" onClick={anonymous} compact={compact} />
};

export default QuickStartButton;
