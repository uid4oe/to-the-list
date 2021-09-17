import { useRouteMatch } from "react-router";
import { Grid, Message } from "semantic-ui-react";
import { ViewListDetail } from "../../components/view-list-component/view-list-detail-component";

import Loading from "../../components/loading-component/loading-component";
import { useFirestoreSingleList } from "../../hooks/useFirestorSingleList-hook";

const ExploreDetailPage = () => {
  const {
    params: { id },
  } = useRouteMatch();

  const [data, error] = useFirestoreSingleList(id);

  return (
    <Grid columns={1} style={{ paddingBottom: "1em" }}>
      <Grid.Column>
        {data ? (
          <ViewListDetail data={data} />
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

export default ExploreDetailPage;
