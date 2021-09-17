import { useRef, useState } from "react";
import { List, Icon, Grid, Input, Button } from "semantic-ui-react";

import { useDrag, useDrop } from "react-dnd";

const EditListDetailItem = ({
  id,
  name,
  index,
  moveCard,
  cn,
  updateLocalItem,
  deleteLocalItem
}) => {
  const [value, setValue] = useState(name);

  const ref = useRef(null);
  const [{ handlerId }, drop] = useDrop({
    accept: "card",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 4;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveCard(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });
  const [{ isDragging }, drag] = useDrag({
    type: "card",
    item: () => {
      return { id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  const updateValue = ({ target: { value } }) => {
    setValue(value);
    updateLocalItem(value, index);
  };

  return (
    <div
      ref={ref}
      className={cn}
      style={{ opacity, width: "100%", margin: "1em" }}
      data-handler-id={handlerId}
    >
      <Grid columns={3}>
        <Grid.Column width={1} style={{ paddingLeft: "0" }}>
          <Icon name="grid layout" style={{ cursor: "move" }} />
        </Grid.Column>

        <Grid.Column width={14} style={{ paddingLeft: "0" }}>
          <List.Item>
            <List.Header>
              <Input transparent fluid>
                <input
                  className={"inp-" + cn}
                  value={value}
                  onChange={updateValue}
                />
              </Input>
            </List.Header>
          </List.Item>
        </Grid.Column>
        <Grid.Column
          width={1}
        >
          <Button color="red" icon="delete" size="tiny" compact style={{ marginRight: "0" }}
            onClick={() => deleteLocalItem(index)} />
        </Grid.Column>
      </Grid>
    </div>
  );
};

export { EditListDetailItem };
