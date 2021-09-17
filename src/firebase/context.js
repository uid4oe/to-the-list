import { createContext } from "react";

export const mode = { dark: "dark", light: "light" }

const FirebaseContext = createContext(null);
const UserContext = createContext(null);
const ThemeContext = createContext(null);

export { FirebaseContext, UserContext, ThemeContext };
