import React, { useContext, useReducer, useEffect, createContext } from "react";
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
import Auth from "./Components/User/Authentication/Auth";
import Landing from "./Components/User/Landing/Landing";
import Discard from './Components/User/discard/Discard';
import StudentAdd from './Components/User/StudentAdd/StudentAdd';
import "./App.module.css";
import { intialState, reducer } from "./reducer/Usereucer";
import classes from "./App.module.css";
import EditStudent from './Components/User/editStudent/EditStudent'


export const UserContext = createContext();

const Routing = () => {
  // we use useContext for we want to acess state and dispatch
  const { state, dispatch } = useContext(UserContext);
  const history = useHistory();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("mascStudetDb"));
    if (user) {
      dispatch({ type: "USER", payload: user });
      //  console.log(state);
      history.push("/");
    } else {
      history.push("/login");
    }
  }, []);
  return (
    // switch is like a empty fragment more ablity
    <Switch>
      <Route exact path="/">
        <Landing />
      </Route>

      <Route path="/login">
        <Auth />
      </Route>

      <Route path="/discard">
        <Discard />
      </Route>

      <Route path="/addstudent">
        <StudentAdd />
      </Route>

      <Route  path="/editstudent/:id">
        <EditStudent />
      </Route> 
    </Switch>
  );
};

function App() {
  const [state, dispatch] = useReducer(reducer, intialState);
  return (
    <div className={classes.App}>
      <UserContext.Provider value={{ state, dispatch }}>
        <BrowserRouter>
          <Routing />
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}

export default App;
