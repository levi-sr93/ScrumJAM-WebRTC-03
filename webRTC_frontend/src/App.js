import { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { connectWithWebsocket } from "./utils/websocket/websocketConnection";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import EnterExistingRoom from "./pages/EnterExistingRoom";

function App() {
  useEffect(() => {
    connectWithWebsocket();
  }, []);
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route path="/home">
          <Home />
        </Route>
        <Route path="/enter-room">
          <EnterExistingRoom />
        </Route>
        <Route path="/dashboard">
          <Dashboard />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
