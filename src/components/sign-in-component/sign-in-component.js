import { Button, Modal, Tab, Menu } from "semantic-ui-react";

import SignInTab from "./sign-in-tab-component";
import RegisterTab from "./register-tab-component";

const SignIn = ({ theme }) => {
  const panes = [
    {
      menuItem: <Menu.Item>Sign In</Menu.Item>,
      render: () => <SignInTab />,
    },
    {
      menuItem: <Menu.Item>Register</Menu.Item>,
      render: () => <RegisterTab />,
    },
  ];

  return (
    <Modal
      closeIcon
      size="tiny"
      trigger={<Button content="Sign In" color="purple"></Button>}
    >
      <Modal.Content>
        <Tab
          menu={{
            secondary: true,
            pointing: true,
            style: { justifyContent: "center" },
          }}
          panes={panes}
        />
      </Modal.Content>
    </Modal>
  );
};

export default SignIn;
