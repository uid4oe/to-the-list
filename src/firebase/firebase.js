import app from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_ID,
};

class Firebase {
  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();
    this.firestore = app.firestore();
    this.scrollTo = null;
  }

  register = async (e, p, displayName) => {

    try {
      const anonymous = this.auth?.currentUser?.isAnonymous;

      let user;

      if (anonymous) {
        user = this.auth.currentUser.linkWithCredential(app.auth.EmailAuthProvider.credential(e, p));
      } else {
        user = this.auth.createUserWithEmailAndPassword(e, p);
      }

      const { uid, email } = (await user).user;

      await this.firestore.doc(`users/${uid}`).set({
        uid,
        displayName,
        email,
        theme: "light",
        status: "active",
      })

      await this.auth.currentUser.updateProfile({ displayName, photoURL: null });

    }

    catch (err) { throw err }

  }

  firestore_delete_doc = (path) => {
    this.firestore
      .doc(path)
      .delete()
      .then(
      ).catch((err) => err);
  }

  firestore_update_doc = async (path, data) => {

    try {
      await this.firestore
        .doc(path)
        .update(
          { items: app.firestore.FieldValue.arrayUnion(data) }
        )
    }
    catch (err) { console.error(err) };
  }

  firestore_update_list = async (listID, data) => {
    try {
      await this.firestore
        .collection("lists")
        .doc(listID)
        .update(data)
    }
    catch (err) { console.error(err) };
  }

  firestore_create_doc = async (collection, data) => {
    try {
      const uid = this.auth?.currentUser?.uid;
      uid && await this.firestore
        .collection(collection)
        .add(
          {
            ...data,
            items: [],
            visibility: "public",
            added_by: uid,
            added_at: app.firestore.Timestamp.now(),
            updated_by: uid,
            updated_at: app.firestore.Timestamp.now()
          });
    }
    catch (err) {
      console.error(err)
    }
  }

  updateFavouriteLists = (data, type) => {
    let obj;

    try {
      if (type !== "add" && type !== "remove") {
        throw new Error('Wrong operation type')
      }
      if (type === "add") {
        obj = { favourite_lists: app.firestore.FieldValue.arrayUnion(data) }
      } else if (type === "remove") {
        obj = { favourite_lists: app.firestore.FieldValue.arrayRemove(data) }
      }

      this.firestore.doc(`users/${this.auth.currentUser.uid}`).update(obj)
    }
    catch (err) {
      console.error(err);
    }
  }

  updateTheme = (theme) => {
    try {
      this.firestore.doc(`users/${this.auth.currentUser.uid}`).update({ theme })
    }
    catch (err) {
      console.error(err);
    }
  }


  deleteList = (listId) => {
    try {
      this.firestore.doc(`lists/${listId}`).delete();
    }
    catch (err) {
      console.error(err);
    }
  }


  doPasswordReset = (email) => this.auth.sendPasswordResetEmail(email);

  doSendEmailVerification = () =>
    this.auth.currentUser.sendEmailVerification({
      url: process.env.REACT_APP_CONFIRMATION_EMAIL_REDIRECT,
    });

  doPasswordUpdate = (password) =>
    this.auth.currentUser.updatePassword(password);

}

export default Firebase;
