import { Card } from "semantic-ui-react";
import { ViewListCard } from "./view-list-card-component";

const ViewListCardGroup = ({ data }) => {
  return (
    <Card.Group itemsPerRow={3} >
      {data?.map((item) => (
        <ViewListCard key={item.id} data={item} />
      ))}
    </Card.Group>
  );
};

export { ViewListCardGroup };
