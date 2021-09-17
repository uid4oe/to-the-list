import { Icon, Grid, Header, Button, Card, Sticky } from "semantic-ui-react";

import UserDropdown from "../user-dropdown-component/user-dropdown-component";

import { Link } from "react-router-dom";
import SignIn from "../sign-in-component/sign-in-component";
import QuickStartButton from "./quick-start-button-component";
import { mode, ThemeContext, UserContext } from "../../firebase/context";
import { useContext } from "react";

const NavigationMenu = () => {
  const user = useContext(UserContext)
  return (
    <ThemeContext.Consumer>
      {({ theme, toggleTheme }) => {
        const condition = theme === "dark";
        return (
          <Sticky>
            <Card fluid className="nav" style={{ borderRadius: "0" }}>
              <Card.Content>
                <Grid
                  columns={2}
                >
                  <Grid.Column width={4}>
                    <Header size="huge" as={Link} to={user ? "/" : "/welcome"}>
                      To The List 😍
                    </Header>
                  </Grid.Column>
                  <Grid.Column width={12} textAlign="right">
                    <Button
                      onClick={() => toggleTheme(user, theme === mode.dark ? mode.light : mode.dark)}
                      className="icon"
                      color={condition ? "yellow" : "black"}
                    >
                      <Icon
                        name={condition ? "sun" : "moon"}
                      />
                    </Button>
                    <Button content="Explore" color="green" as={Link} to="/explore" />

                    {user ? (
                      <>
                        <Button as={Link} to="/my-lists" color="blue">
                          My Lists
                        </Button>

                        <UserDropdown user={user.displayName} />
                      </>
                    ) : (
                      <>
                        <Button.Group>
                          <QuickStartButton theme={theme} />
                          <Button.Or />
                          <SignIn />
                        </Button.Group>
                      </>
                    )}
                  </Grid.Column>
                </Grid>
              </Card.Content>
            </Card>
          </Sticky>
        )
      }
      }</ThemeContext.Consumer >)
}

export default NavigationMenu;
