
import { useCallback, useContext, useEffect, useState } from "react";
import { Card, Icon, Grid, Popup, Input, Divider, ItemContent, Button, Checkbox } from "semantic-ui-react";
import { FirebaseContext, UserContext } from "../../firebase/context";
import { EditListDetailItem } from "./edit-list-detail-item-component";

import update from "immutability-helper";
const EditListDetail = ({ localData, setLocalData }) => {
  const user = useContext(UserContext);
  const firebase = useContext(FirebaseContext);

  const { name, added_by, displayName, added_at, items, id, visibility } = localData;

  const [title, setTitle] = useState(name);

  const [localVisibility, setLocalVisibility] = useState(visibility);

  const isPublic = localVisibility == "public";

  const [cards, setCards] = useState(items.map(({ name }) => { return ({ name, id: Math.random() * 1000 }) }));

  const [wasDragOperation, setWasDragOperation] = useState(true);

  const [inputValue, setInputValue] = useState("");

  const moveCard = useCallback(
    (dragIndex, hoverIndex) => {
      const dragCard = cards[dragIndex];
      setWasDragOperation(true);
      setCards(
        update(cards, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragCard],
          ],
        })
      );
    },
    [cards]
  );

  useEffect(() => {
    const items = cards.map(item => { return { name: item.name } });
    setLocalData({ ...localData, items, title });
    if (!wasDragOperation) {
      const item = document.querySelector(`.si-${cards.length - 1}`);
      if (item) {
        item.scrollIntoView(true, {});
        const inputItem = document.querySelector(
          `.inp-si-${cards.length - 1}`
        );
        if (inputItem) {
          inputItem.focus();
        }
      }
    }
  }, [cards]);

  useEffect(() => {
    setLocalData({ ...localData, name: title });
  }, [title]);

  const renderCard = (card, index) => {
    return (
      <EditListDetailItem
        cn={`si-${index}`}
        key={card.id}
        index={index}
        name={card.name}
        moveCard={moveCard}
        updateLocalItem={updateLocalItem}
        deleteLocalItem={deleteLocalItem}
      />
    );
  };

  const addLocalItem = (value) => {
    setWasDragOperation(false);
    setCards([...cards, { name: value, id: Math.random() * 1000 }]);
    setInputValue("");
  };

  const updateLocalItem = (value, index) => {
    setWasDragOperation(true);
    const newValues = [...cards];
    newValues[index].name = value;
    setCards(newValues);
  };


  const deleteLocalItem = (index) => {
    cards.splice(index, 1)
    setCards([...cards])
  }

  return (
    <>
      <Card.Content>
        <Card.Header>
          <Grid style={{ fontSize: "1.3em" }} columns={2}>
            <Grid.Column width={10}>
              <Input
                style={{ fontSize: "1.3em" }}
                fluid
                value={title}
                onChange={(e, { value }) => setTitle(value)}
                transparent
              />
            </Grid.Column>
            <Grid.Column textAlign="right" width={6}>
              <Button compact size="tiny">
                <Checkbox toggle
                  checked={isPublic}
                  label="Visible"
                  onClick={() => {
                    const newVisibility = localVisibility === "public" ? "private" : "public";
                    setLocalVisibility(newVisibility);
                    setLocalData({ ...localData, visibility: newVisibility })
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
          </Grid>
        </Card.Header>
        <Divider hidden />
        <Card.Description>
          <Card.Group
            itemsPerRow={1}
            style={{ overflow: "auto", maxHeight: "300px" }}
          >
            {cards?.map((item, i) => renderCard(item, i))}
          </Card.Group>
        </Card.Description>
      </Card.Content>

      <Card.Content extra>

        <Grid columns={2} style={{ width: "100%", margin: "2em 0 0 0" }}>

          <Grid.Column width={1} style={{ paddingLeft: "0" }}>
            <Icon name="plus" />
          </Grid.Column>
          <Grid.Column width={15} style={{ paddingLeft: "0" }}>
            <Input
              transparent
              fluid
              placeholder="add item"
              value={inputValue}
              onChange={(e, { value }) => addLocalItem(value)}
            ></Input>
          </Grid.Column>
        </Grid>
      </Card.Content>
    </>
  );
};

export { EditListDetail };