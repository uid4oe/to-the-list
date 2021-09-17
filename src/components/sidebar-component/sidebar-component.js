import { useState } from "react";
import { Input, Label, Header, Card, Button, Grid, Segment, Icon } from "semantic-ui-react";


const categories = [
  { name: "todo", color: "red" },
  { name: "wish", color: "orange" },
  { name: "travel", color: "yellow" },
  { name: "read", color: "teal" },
  { name: "bucket", color: "blue" },
  { name: "other", color: "grey" },
]


const SideBar = ({ setSearchValue }) => {


  const [category, setCategory] = useState({ name: "all", color: "green" });

  return (
    <Card
      style={{ textAlign: "center" }}
      fluid
    >
      <Card.Content>
        <Input
          className="cb"
          fluid
          action={{ icon: "search" }}
          placeholder="Search Item"
          onChange={(e, { value }) => setSearchValue(value)}
        />
      </Card.Content>
      <Card.Content>
        <Grid columns={2}>
          <Grid.Column width={6} verticalAlign="middle">
            <Header size="small">
              Browsing
            </Header>
          </Grid.Column>
          <Grid.Column width={10}>
            {category.name !== "all" ?
              <div ><Button
                size="small"
                compact
                attached="left"
                color={category?.color}
              >
                {category?.name}
              </Button>
                <Button
                  attached="right" compact size="small" icon="delete" style={{ cursor: "pointer" }} onClick={() => setCategory({ name: "all", color: "green" })} />
              </div> : <Button
                fluid
                color="green"
                compact
                style={{ cursor: "default", pointerEvents: "none" }}
              >all</Button>}
          </Grid.Column>
        </Grid>

      </Card.Content>
      <Card.Content>
        <Label.Group size="medium">
          {categories.map(item => <Label as={Button} color={item.color} content={item.name} onClick={() => setCategory(item)} />)}
        </Label.Group>
      </Card.Content>
    </Card >
  );
};

export default SideBar;
