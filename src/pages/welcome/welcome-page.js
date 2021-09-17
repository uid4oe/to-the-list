import { Link } from "react-router-dom";
import { Button, Grid, Header, Card, Image } from "semantic-ui-react";

import QuickStartButton from "../../components/navigation-menu-component/quick-start-button-component";

import hey from "../welcome/hey.gif";

const WelcomePage = () => {
  return (
    <Grid>
      <Grid.Column>
        <Grid columns={2}>
          <Grid.Column width={12}>
            <Card fluid>
              <Card.Content>
                <Card.Header>
                  <Header>Greetings 👋</Header>
                </Card.Header>
                <Card.Description>
                  <Header size="medium">
                    <br />
                    I'm Oguzhan.
                    <br />
                    On To The List uses React.js with Semantic UI and Firebase as BaaS.
                    <br />
                    You can create, share or view any sorts of public lists, also you may
                    add other lists to your library.
                    <br /> <br />
                    Start using the app by clicking <span> 👉 </span>
                    <QuickStartButton compact />
                    <br />
                    <br />
                    Or have a look at public lists of other users
                    <span> 👉 </span>
                    <Button
                      color="green"
                      content="Explore"
                      compact
                      as={Link}
                      to="/explore"
                    />
                  </Header>
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <Button
                  compact
                  size="medium"
                  content="App Source Code"
                  icon="github"
                  labelPosition="right"
                  color="purple"
                  role="a"
                  target="_blank"
                  href="https://github.com/uid4oe/to-the-list"
                ></Button>
                <Button
                  compact
                  size="medium"
                  content="My LinkedIn"
                  icon="linkedin"
                  labelPosition="right"
                  color="blue"
                  role="a"
                  target="_blank"
                  href="https://www.linkedin.com/in/uid4oe/"
                ></Button>
              </Card.Content>
            </Card>
          </Grid.Column>
          <Grid.Column width={4}>
            <Card fluid>
              <Image src={hey} />
            </Card>
          </Grid.Column>
        </Grid>
      </Grid.Column>
    </Grid>
  );
};

export default WelcomePage;
