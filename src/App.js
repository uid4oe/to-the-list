import { Switch, Route } from "react-router-dom";
import { Grid } from "semantic-ui-react";

import NavigationMenu from "./components/navigation-menu-component/navigation-menu-component";
import ExplorePage from "./pages/explore/explore-page";
import MyListsPage from "./pages/my-lists/my-lists-page";
import MyAccountPage from "./pages/my-account/my-account-page";
import WelcomePage from "./pages/welcome/welcome-page";
import ExploreDetailPage from "./pages/explore/explore-detail-page";

import { useContext, useState } from "react";
import { darkStyles, lightStyles } from "./styles";

import { FirebaseContext, UserContext, ThemeContext, mode } from "./firebase/context";


function App() {
  const firebase = useContext(FirebaseContext)
  const user = useContext(UserContext);

  const changeTheme = (user, newTheme) => {
    user && firebase.updateTheme(newTheme);
    setState({ ...state, theme: newTheme });
  }

  const [state, setState] = useState({ theme: user?.theme || mode.light, toggleTheme: changeTheme })

  if (user?.theme && user.theme !== state.theme) {
    setState({ ...state, theme: user.theme });
  }

  return (
    <ThemeContext.Provider value={state}>
      <NavigationMenu />
      <br />
      <Grid centered>
        <style>{state.theme === "dark" ? darkStyles : lightStyles}</style>
        <Grid.Column width={15} >
          <Switch>
            {!user && <Route exact path="/welcome" component={WelcomePage} />}
            <Route exact path="/explore" component={ExplorePage} />
            <Route path="/explore/:id" exact component={ExploreDetailPage} />
            {user && <>
              <Route exact path="/" component={MyListsPage} />
              <Route exact path="/my-lists" component={MyListsPage} />
              <Route exact path="/my-account" component={MyAccountPage} />

            </>}
          </Switch>
        </Grid.Column>
      </Grid >
    </ThemeContext.Provider>
  );
}

export default App;
