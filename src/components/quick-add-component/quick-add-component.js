import { Grid, Dropdown, Popup } from "semantic-ui-react";
import { useState, useContext } from "react";
import { FirebaseContext } from "../../firebase";

const QuickAdd = () => {
  const firebase = useContext(FirebaseContext);

  const [dropDownContent, setDropDownContent] = useState({ options: [] });
  const [dropDownLoading, setDropDownLoading] = useState(false);

  const handleAddition = async (e, { value }) => {
    setDropDownLoading(true);
    const data = { name: value };
    await firebase.firestore_create_doc("lists", data);
    setDropDownLoading(false);
  };

  const handleChange = (e, { value }) => {
    setDropDownContent(value);
  };


  return (
    <Grid
      verticalAlign="middle"
      style={{ fontSize: "1.5rem" }}
      centered
    >
      <Grid.Column width={1}>
        <p>add</p>
      </Grid.Column>
      <Grid.Column width={5}>
        <Popup
          inverted
          trigger={
            <Dropdown
              className="quickadd"
              style={{ textOverflow: "hidden", textAlign: "center" }}
              search
              allowAdditions
              selection
              fluid
              value={dropDownContent?.selected?.value}
              onAddItem={handleAddition}
              onChange={handleChange}
              loading={dropDownLoading}
              placeholder="any"
            ></Dropdown>
          }
        >Type a new one</Popup>
      </Grid.Column>
      <Grid.Column width={1}>
        <p>list</p>
      </Grid.Column>
    </Grid>
  );
};

export default QuickAdd;
