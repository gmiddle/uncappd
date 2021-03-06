import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { fetchBeers } from "./store/beers";
import { getAllReviews } from "./store/reviews";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import BeersPage from "./components/BeersPage";
import BeerForm from "./components/BeerForm";
import SingleBeerPage from "./components/SingleBeerPage/SingleBeerPage";
import Splash from "./components/SplashPage";
import Footer from './components/Footer';


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    dispatch(sessionActions.restoreUser())
    .then(() => dispatch(getAllReviews()))
    .then(() => dispatch(fetchBeers()))
    .then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>

          <Route exact path="/">
            <Splash />
          </Route>

          <Route path="/signup">
            <SignupFormPage />
          </Route>

          <Route exact path="/beers">
              <BeersPage isLoaded={isLoaded} />
          </Route>

          <Route path='/new-beer'>
              <BeerForm isLoaded={isLoaded} />
          </Route>

          <Route path='/beers/:id'>
            <SingleBeerPage isLoaded={isLoaded} />
          </Route>

          
          
        </Switch>
      )}
      <Footer />
    </>
  );
}

export default App;