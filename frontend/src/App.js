import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch, Link } from "react-router-dom";
import { fetchBeers } from "./store/beers";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import BeersPage from "./components/BeersPage";
import BeerForm from "./components/BeerForm";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    dispatch(sessionActions.restoreUser())
    // .then(() => dispatch(fetchEmails()))
    // .then(() => dispatch(fetchUsernames()))
    // .then(() => dispatch(fetchUsers()))
    .then(() => dispatch(fetchBeers()))
    .then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          {/* <Route exact path="/">
            <SplashPage />
          </Route> */}
          <Route path="/signup">
            <SignupFormPage />
          </Route>

          <Route path="/beers">
            <BeersPage isLoaded={isLoaded} />
          </Route>

          <Route path='/new-beer'>
              <BeerForm isLoaded={isLoaded} />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;