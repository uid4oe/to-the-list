import React from "react";
import { Dimmer, Grid, Header, Loader, Segment } from "semantic-ui-react";

const Loading = ({ size }) => {
  size = Number(size);
  return (
    <Grid.Column >
      <Segment >
        <Dimmer active inverted className="cb">
          <Loader size="large" >
            <Header size="small">Loading</Header>
          </Loader>
        </Dimmer>
        <div style={{ minWidth: size, minHeight: size }} />
      </Segment>
    </Grid.Column>
  );
};

export default Loading;
