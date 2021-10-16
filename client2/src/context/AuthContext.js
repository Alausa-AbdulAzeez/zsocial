import { createContext, useReducer } from "react";
import { AuthReducer } from "./AuthReducer";

const INITIAL_STATE = {
  user: {
    _id: "6129ca5e4b2a8648cc06b441",
    profilePicture: "",
    coverPicture: "",
    followers: [],
    following: [
      "6129ca914b2a8648cc06b443",
      "6119700a5a60d60c5c3020cf",
      "612dcc66c769302d2095d3d5",
    ],
    isAdmin: false,
    username: "tayo",
    email: "tayo@gmail.com",
    city: "New York",
    from: "Madrid",
    relationship: "1",
  },
  isFetching: false,
  error: false,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
