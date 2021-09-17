import { Card } from "semantic-ui-react";
import { EditListCard } from "./edit-list-card-component";


const EditListCardGroup = ({ data }) => {
    return <Card.Group itemsPerRow={3}>
        {data?.map((item) => <EditListCard key={Math.random() * 100} data={item} />)}
    </Card.Group>
}

export { EditListCardGroup };