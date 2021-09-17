import { Button, Form, Message, Tab } from "semantic-ui-react";

import { useContext, useState } from "react";
import { FirebaseContext } from "../../firebase";

const SignInTab = () => {
  const auth = useContext(FirebaseContext).auth;

  const [state, setState] = useState({
    email: "",
    password: "",
    loading: false,
    error: false,
  });

  const onChange = async (event) => {
    const {
      target: { name, value },
    } = event;

    setState({ ...state, [name]: value });
  };

  const onSubmit = async () => {
    setState({ ...state, loading: false, error: false });

    try {
      await auth.signInWithEmailAndPassword(state.email, state.password);
    } catch (err) {
      setState({ ...state, error: err });
    }
  };

  const isInvalid = !state.email || !state.password;

  return (
    <Tab.Pane attached={false}>
      <Form loading={state.loading} onSubmit={onSubmit}>
        {state.error && (
          <Message negative>
            <Message.Content>{state.error.message}</Message.Content>
          </Message>
        )}
        <Form.Input
          label="Email"
          name="email"
          iconPosition="left"
          icon="mail"
          type="email"
          placeholder="Enter Email"
          onChange={onChange}
          required
        />
        <Form.Input
          label="Password"
          iconPosition="left"
          name="password"
          icon="key"
          type="password"
          placeholder="Enter Password"
          onChange={onChange}
          required
        />
        <Button fluid primary disabled={isInvalid} type="submit">
          Sign In
        </Button>
      </Form>
    </Tab.Pane>
  );
};

export default SignInTab;
