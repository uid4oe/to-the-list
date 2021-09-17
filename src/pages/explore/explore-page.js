import { useContext, useEffect, useState } from "react";
import { Button, Grid, Message, Popup } from "semantic-ui-react";
import { ViewListCardGroup } from "../../components/view-list-component/view-list-group-component";

import Loading from "../../components/loading-component/loading-component";
import SideBar from "../../components/sidebar-component/sidebar-component";
import { FirebaseContext } from "../../firebase/context";

import { useFirestoreLists } from "../../hooks/useFirestoreLists-hook";

const ExplorePage = () => {
  const [searchValue, setSearchValue] = useState();
  const [data, error] = useFirestoreLists();
  const firebase = useContext(FirebaseContext);

  useEffect(() => {
    if (data.length && firebase?.scrollTo) {
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

  return (
    <Grid columns={2} style={{ paddingBottom: "1em" }}>
      <Grid.Column width={3} >

        <SideBar setSearchValue={setSearchValue} />

      </Grid.Column>

      <Grid.Column width={13}>
        {data.length ? (
          <ViewListCardGroup data={data} />
        ) : error ? (
          <Message negative>
            <Message.Header>Error</Message.Header>
            <p>Can't fetch data, try later</p>
          </Message>
        ) : (
          <Loading size="200" />
        )}
      </Grid.Column>
    </Grid>
  );
};

export default ExplorePage;
