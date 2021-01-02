import { HashRouter as Router, Route } from "react-router-dom"; 
import Detail from "../routes/Detail";
import Home from "../routes/Home";
import "./App.css";

function App() {
  return (
    // <div className="App">

    // </div>
    <Router>
      <Route exact path="/" component={Home}></Route>
      <Route path="/:id" component={Detail}></Route>
    </Router>
  );
}

export default App;
