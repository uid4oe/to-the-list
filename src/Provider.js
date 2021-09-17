
import { BusContext, UserContext } from "./firebase/context";
import App from "./App";

import { useProfile } from "./hooks/useProfile-hook";

function Provider() {
  return (
    <UserContext.Provider value={useProfile()}>
      <App />
    </UserContext.Provider>

  );
}

export default Provider;
