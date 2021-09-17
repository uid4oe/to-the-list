import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { Card, List, Icon, Grid, Popup, Label, Button } from "semantic-ui-react";
import { BusContext, FirebaseContext, UserContext } from "../../firebase/context";

const ViewListDetail = ({ data }) => {
  const history = useHistory();

  const firebase = useContext(FirebaseContext)
  const user = useContext(UserContext);

  const { name, added_by, displayName, added_at, items, id } = data;

  const fav = user?.favourite_lists?.includes(id);

  const operation = fav ? "remove" : "add";

  const color = fav ? "yellow" : "grey";

  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>
          <Grid columns={2}>
            <Grid.Column floated="left">
              <Button
                size="tiny"
                compact
                onClick={() => {
                  firebase.scrollTo = id;
                  history.goBack();
                }}
              >
                <Icon name="arrow left"></Icon>Go Back
              </Button>
            </Grid.Column>
            <Grid.Column
              floated="right"
              style={{ flex: "0 0 auto", width: "auto" }}
            >
              {user && (
                <Icon
                  color={color}
                  onClick={() => firebase.updateFavouriteLists(id, operation)}
                  name="star"
                />
              )}

              <Popup
                on="click"
                trigger={<Icon link color="teal" name="share" />}
                inverted
              >
                {" "}
                Copied ✔️
              </Popup>
            </Grid.Column>
          </Grid>
        </Card.Header>
      </Card.Content>
      <Card.Content>
        <Card.Header>{name}</Card.Header>
        <Card.Meta>{displayName}</Card.Meta>
      </Card.Content>
      <Card.Content extra>
        <Card.Description>
          <List divided>
            {items.map((item) => (
              <List.Item>
                <List.Header>{item.name}</List.Header>
              </List.Item>
            ))}
          </List>
        </Card.Description>
      </Card.Content>
    </Card>
  );
};

export { ViewListDetail };
