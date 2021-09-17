import { useContext, useEffect, useState } from "react";
import { Grid, Header, Divider, Message } from "semantic-ui-react";

import Loading from "../../components/loading-component/loading-component";
import {
  BusContext,
  FirebaseContext,
  UserContext,
} from "../../firebase/context";

import { EditListCardGroup } from "../../components/edit-list-component/edit-list-group-component";

import { useFirestoreUserLists } from "../../hooks/useFirestoreUserLists-hook";
import QuickAdd from "../../components/quick-add-component/quick-add-component";

const MyLists = () => {
  const [data, error] = useFirestoreUserLists();

  const [items, setItems] = useState(data);

  const user = useContext(UserContext);
  const firebase = useContext(FirebaseContext);

  useEffect(() => {
    if (data?.length && firebase?.scrollTo) {
      const item = document.querySelector("#scroll-" + firebase.scrollTo);
      if (item) {
        item.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "nearest",
        });
        firebase.scrollTo = null;
      }
    }
  }, [data]);

  useEffect(() => {
    if (user.uid) {
      let unsub = firebase.firestore
        .collection("lists")
        .where("added_by", "==", user.uid)
        .orderBy("added_at", "desc")
        .onSnapshot((s) => {
          let result = s.docs.map((doc) => {
            let data = doc.data();
            data.id = doc.id;
            return data;
          });
          setItems(result);
        });
      return () => unsub();
    }
  }, []);

  return (
    <Grid style={{ paddingBottom: "1em" }}>
      <Grid.Column width={16}>
        <QuickAdd />
        <Divider />

        {items.length ? (
          <EditListCardGroup data={items} />
        ) : error ? (
          <Message negative>
            <Message.Header>Error</Message.Header>
            <p>Can't fetch data, try later</p>
          </Message>
        ) : items.length === 0 ? (
          <Header>No List</Header>
        ) : (
          <Loading size="200" />
        )}
      </Grid.Column>

    </Grid>
  );
};

export default MyLists;
