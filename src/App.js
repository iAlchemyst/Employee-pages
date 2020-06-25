import React, {useState, Component} from "react";
import "./App.css";
import Header from './components/Header/Header';
import Login from "./components/LoginPage/Login";
import RegisterForm from "./components/RegisterForm/RegisterForm";
// import Home from "./component/Home/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  const [title, updateTitle] = useState(null);
  return (
    <Router>
      <div className="App">
      <Header title={title}/>
        <Switch>
          <Route path="/" exact={true}>
            <RegisterForm updateTitle={updateTitle}/>
          </Route>
          <Route path="/register">
            <RegisterForm updateTitle={updateTitle}/>
          </Route>
          <Route path="/login">
            <Login updateTitle={updateTitle}/>
          </Route>
        </Switch>
      </div>
    </Router>
    // {/* <Home /> */}
  );
}

export default App;
