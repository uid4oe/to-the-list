import { useContext, useState } from "react";
import {
  Card,
  Button,
  List,
  Icon,
  Grid,
  Popup,
  Modal,
  Label,
  Radio,
  Checkbox,
  Segment,
  GridColumn,
} from "semantic-ui-react";
import { FirebaseContext, UserContext } from "../../firebase/context";
import { EditListDetail } from "./edit-list-detail-component";

const EditListCard = ({ data }) => {
  const user = useContext(UserContext);

  const firebase = useContext(FirebaseContext);

  const [localData, setLocalData] = useState(data);

  const { name, added_by, displayName, added_at, items, id, visibility } = localData;

  const [localVisibility, setLocalVisibility] = useState(visibility);

  const fav = user?.favourite_lists?.includes(id);

  const isPublic = localData?.visibility == "public";

  return (
    <Card fluid key={id}>
      <Card.Content>
        <Card.Header>
          <Grid columns={2}>
            <Grid.Column width={6}
              style={{ overflow: "hidden", textOverflow: "ellipsis" }}
            >
              {name}
            </Grid.Column>
            {user && (
              <Grid.Column textAlign="right" width={10}>
                <Button compact size="tiny">
                  <Checkbox toggle
                    checked={isPublic}
                    label="Visible"
                    onClick={() => {
                      const newVisibility = localVisibility === "public" ? "private" : "public";
                      setLocalVisibility(newVisibility);
                      firebase.firestore_update_list(id, { visibility: newVisibility });
                    }
                    } />
                </Button>
                <Button
                  compact
                  icon="cancel"
                  color="red"
                  onClick={() => firebase.deleteList(id)} />

                <Popup
                  on="click"
                  trigger={<Button icon="share" color="green" compact />}
                  inverted
                >
                  Copied ✔️
                </Popup>
              </Grid.Column>
            )}
          </Grid>
        </Card.Header>
        <Card.Description>
          <List divided style={{ overflow: "hidden", maxHeight: "90px" }}>
            {items?.slice(0, 4).map((item) => (
              <List.Item>
                <List.Header>{item.name}</List.Header>
              </List.Item>
            ))}
          </List>
          {items?.length > 4 && <div style={{ marginTop: "-1em" }}>...</div>}
        </Card.Description>
      </Card.Content >
      <Card.Content extra>
        <Card.Description>
          <Modal
            size="small"
            closeIcon
            onClose={() => {
              firebase.firestore_update_list(id, { items, name, visibility: localData.visibility })
            }
            }
            trigger={
              <Button fluid compact>
                Edit
              </Button>
            }
          >
            <Modal.Content>
              <EditListDetail
                localData={localData}
                setLocalData={setLocalData}
              />
            </Modal.Content>
          </Modal>
        </Card.Description>
      </Card.Content>
    </Card >
  );
};

export { EditListCard };
