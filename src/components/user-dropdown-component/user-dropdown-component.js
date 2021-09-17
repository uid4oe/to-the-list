import { useContext } from "react";
import { Link } from "react-router-dom";
import { Dropdown, Button } from "semantic-ui-react";
import { FirebaseContext } from "../../firebase";

const UserDropdown = ({ user }) => {
  const auth = useContext(FirebaseContext).auth;

  const signOut = () => {
    auth.signOut();
  };

  return (
    <Dropdown
      text={`Hi, ${user}`}
      icon="user"
      labeled
      button
      className="icon"
      as={Button}
      color="orange"
    >
      <Dropdown.Menu>
        <Dropdown.Item
          icon="user circle"
          text="My Account"
          as={Link}
          to="/my-account"
        />
        <Dropdown.Item icon="sign out" text="Sign Out" onClick={signOut} />
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default UserDropdown;
