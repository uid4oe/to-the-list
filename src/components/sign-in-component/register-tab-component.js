import { Dropdown, Button, Modal, Grid, Card, Form, Icon, Message, Tab, Menu, StepTitle } from "semantic-ui-react";

import { useContext, useState } from "react";
import { FirebaseContext } from "../../firebase";

const RegisterTab = () => {

  const firebase = useContext(FirebaseContext);

  const [state, setState] = useState({ email: "", password: "", displayName: "", loading: false, error: false });

  const onChange = (event) => {
    const { target: { name, value } } = event;
    setState({ ...state, [name]: value });
  }

  const onSubmit = async (e) => {
    setState({ ...state, loading: true, error: false });
    try {
      await firebase.register(state.email, state.password, state.displayName);
    }
    catch (err) {
      setState({ ...state, loading: false, error: err })
    }
  }

  const isInvalid = !state.email || !state.password || !state.displayName;

  return <Tab.Pane attached={false}><Form
    loading={state.loading}
    onSubmit={onSubmit}
  >
    {state.error && (
      <Message negative>
        <Message.Content>
          {state.error.message}
        </Message.Content>
      </Message>
    )}
    <Form.Input
      name="displayName"
      label="Display Name"
      iconPosition="left"
      icon="user"
      type="text"
      placeholder="Enter Display Name"
      onChange={onChange}
      required />
    <Form.Input
      name="email"
      label="Email"
      iconPosition="left"
      icon="mail"
      type="email"
      placeholder="Enter Email"
      onChange={onChange}
      required />
    <Form.Input
      name="password"
      label="Password"
      iconPosition="left"
      icon="key"
      type="password"
      placeholder="Enter Password"
      onChange={onChange}
      required />
    <Button fluid primary disabled={isInvalid} type="submit">
      Register
    </Button>
  </Form></Tab.Pane >
};

export default RegisterTab;
