import { useContext } from "react";
import { Grid, Message, Card, Header } from "semantic-ui-react";

import Loading from "../../components/loading-component/loading-component";
import RegisterTab from "../../components/sign-in-component/register-tab-component";
import { FirebaseContext } from "../../firebase";

const MyAccountPage = () => {
  const firebase = useContext(FirebaseContext);

  const user = firebase.auth.currentUser;

  return (
    <Grid>
      <Grid.Column>
        {user ? (
          user.email ? (
            <>
              <Card fluid>
                <Card.Content>
                  <Card.Description>
                    <Header>My Account Page</Header>
                  </Card.Description>
                </Card.Content>
              </Card>
            </>
          ) : (
            <Grid columns={2}>
              <Grid.Column>
                <Card fluid>
                  <Card.Content>
                    <Card.Header>Hi, Anonymous 🦆</Card.Header>
                    <Card.Description>
                      Please register so that I can link your lists with an
                      permanent account.
                    </Card.Description>
                  </Card.Content>
                </Card>
              </Grid.Column>
              <Grid.Column>
                <Card fluid>
                  <RegisterTab />
                </Card>
              </Grid.Column>
            </Grid>
          )
        ) : "error" ? (
          <Message negative>
            <Message.Header>Error</Message.Header>
            Can't fetch data, try later
          </Message>
        ) : (
          <Loading size="100" />
        )}
      </Grid.Column>
    </Grid>
  );
};

export default MyAccountPage;
