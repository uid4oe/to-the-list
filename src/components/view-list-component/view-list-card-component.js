import { useContext } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  Button,
  List,
  Icon,
  Grid,
  Popup,
  Divider,
} from "semantic-ui-react";
import { FirebaseContext, UserContext } from "../../firebase/context";

const ViewListCard = ({ data }) => {
  const user = useContext(UserContext);
  const firebase = useContext(FirebaseContext);

  const { name, added_by, displayName, added_at, items, id } = data;

  const fav = user?.favourite_lists?.includes(id);

  const operation = fav ? "remove" : "add";

  const color = fav ? "yellow" : "grey";

  return (
    <Card fluid id={`scroll-${id}`}>
      <Card.Content>
        <Card.Header>
          <Grid>
            <Grid.Column
              style={{ overflow: "hidden", textOverflow: "ellipsis" }}
              width={13}
            >
              {name}
            </Grid.Column>
            <Grid.Column
              width={3}
              style={{
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "flex-end",
              }}
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

        <Card.Meta>{displayName}</Card.Meta>
        <Divider />
        <Card.Description>
          <List divided style={{ overflow: "hidden", maxHeight: "120px" }}>
            {items?.slice(0, 5).map((item) => (
              <List.Item>
                <List.Header>{item.name}</List.Header>
              </List.Item>
            ))}
          </List>
          {items?.length > 5 && <div style={{ marginTop: "-1em" }}>...</div>}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Card.Description>
          <Button fluid size="tiny" compact as={Link} to={`explore/${id}`}>
            View More
          </Button>
        </Card.Description>
      </Card.Content>
    </Card>
  );
};

export { ViewListCard };
