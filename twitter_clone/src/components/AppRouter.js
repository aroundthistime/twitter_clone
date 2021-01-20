import {HashRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Profile from "../routes/Profile";
import Navigation from "./Navigation";

export default ({isLoggedIn, userObj}) => (
    <Router>
        {isLoggedIn && <Navigation />}
        <Switch>
            {isLoggedIn ? (
                <>
                    <Route path="/profile">
                        <Profile userObj={userObj}></Profile>
                    </Route>
                    <Route exact path="/">
                        <Home userObj={userObj}></Home>
                    </Route>
                    <Redirect from="*" to='/'></Redirect>
                </>
            ) : (
                <>
                    <Route>
                        <Auth></Auth>
                    </Route>
                    <Redirect from="*" to='/'></Redirect>
                </>
            )}
        </Switch>
    </Router>
)
