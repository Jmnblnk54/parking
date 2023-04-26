import React from "react";
import {
  BrowserRouter,
  Redirect,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";

import AuthedLayout from "./layouts/authed/AuthedLayout";

import Login from "./view/auth/loginscreen/Login";
import Signup from "./view/auth/signupscreen/Signup";
import HostProfile from "./view/HostProfile/HostProfile";
import Owner from "./view/owner/Owner";
import SpotNearMe from "./view/spotNearMe/SpotNearMe";

import Trips from "./view/alltrips/Trips";
import Book from "./view/Booking/Booking";
import Confirmation from "./view/confirmation/Confirmation";
import FavouriteSpot from "./view/favouriteSpot/FavouriteSpot";
import HostHome from "./view/HostHome/HostHome";
import Listing from "./view/listing/Listing";
import ManageBalance from "./view/managebalance/ManageBalance";
import TravelerHome from "./view/travelerhome/TravelerHome";
import TravelerProfile from "./view/travelerprofile/TravelerProfile";
import TravelSearch from "./view/travelsearch/TravelSearch";
import UpcomingReservation from "./view/upcomingreservation/UpcomingReservation";

import ManageProfile from "./view/manageProfile/ManageProfile";
import HostMessages from "./view/MessageHost/HostMessages";
import MySpots from "./view/mySpots/MySpots";
import { SpotList } from "./view/spotList/SpotList";
import travelerMessages from "./view/travelermessages/travelerMessages";
import Transactions from "./view/transactions/Transactions";
import HostTransaction from "./view/transactions/HostTransaction";
import StartTrip from "./view/starttrip/StartTrip";
import TermsConditions from "./view/terms-conditions/TermsConditions";
import FAQ from "./view/faq/FAQ";
import Privacy from "./view/privacy/Privacy";
import About from "./view/about/About";

//Auth Provider

// import useAuth, { AuthProvider } from "./hooks/useAuth";

// import fire from "./config/config";

const Routes = () => {
  const history = useHistory();
  // const {user,userType}=useAuth();
  const session = localStorage.getItem("Auth Token");
  const type = localStorage.getItem("User Type");

  // console.log("Session", localStorage.getItem("Auth Token"));
  return (
    <BrowserRouter>
      <Switch>
        {/* <Route path="/stripe" component={HostRoute} />
        <Route path="/personal-information" component={Personalnformation} /> */}
        <AuthedRoute
          path="/owner"
          component={Owner}
          isAuthentication={session}
          userType={type}
        />
        <AuthedRoute
          path="/"
          component={TravelerHome}
          exact={true}
          isAuthentication={session}
          userType={type}
        />
        <AuthedRoute
          path="/traveler/signup"
          component={Signup}
          exact={true}
          isAuthentication={session}
          userType={type}
        />
        <AuthedRoute
          path="/traveler/Login"
          component={Login}
          exact={true}
          isAuthentication={session}
          userType={type}
        />
        <AuthedRoute
          path="/host/signup"
          component={Signup}
          exact={true}
          isAuthentication={session}
          userType={type}
        />
        <AuthedRoute
          path="/host/Login"
          component={Login}
          exact={true}
          isAuthentication={session}
          userType={type}
        />
        <AuthedRoute
          path="/travelers"
          component={TravelerHome}
          isAuthentication={session}
          userType={type}
        />
        <AuthedRoute
          path="/hosts"
          component={HostHome}
          isAuthentication={session}
          userType={type}
        />
        <AuthedRoute
          path="/search"
          component={TravelSearch}
          isAuthentication={session}
          userType={type}
        />

        <AuthedRoute
          path="/"
          component={TravelerHome}
          exact={true}
          isAuthentication={session}
          userType={type}
        />
        <AuthedRoute
          path="/traveler/signup"
          component={Signup}
          exact={true}
          isAuthentication={session}
          userType={type}
        />
        <AuthedRoute
          path="/traveler/Login"
          component={Login}
          exact={true}
          isAuthentication={session}
          userType={type}
        />
        <AuthedRoute
          path="/host/signup"
          component={Signup}
          exact={true}
          isAuthentication={session}
          userType={type}
        />
        <AuthedRoute
          path="/host/Login"
          component={Login}
          exact={true}
          isAuthentication={session}
          userType={type}
        />
        <AuthedRoute
          path="/travelers"
          component={TravelerHome}
          isAuthentication={session}
          userType={type}
        />
        <AuthedRoute
          path="/hosts"
          component={HostHome}
          isAuthentication={session}
          userType={type}
        />
        <AuthedRoute
          path="/search"
          component={TravelSearch}
          isAuthentication={session}
          userType={type}
        />
        <AuthedRoute
          path="/favour"
          component={FavouriteSpot}
          isAuthentication={session}
          userType={type}
        />
        <AuthedRoute
          path="/terms"
          component={TermsConditions}
          isAuthentication={session}
          userType={type}
        />
        <AuthedRoute
          path="/faq"
          component={FAQ}
          isAuthentication={session}
          userType={type}
        />
        <AuthedRoute
          path="/privacy"
          component={Privacy}
          isAuthentication={session}
          userType={type}
        />
        <AuthedRoute
          path="/about"
          component={About}
          isAuthentication={session}
          userType={type}
        />

        <AuthedRouteHost
          path="/host/home"
          component={HostHome}
          isAuthentication={session}
          userType={type}
        />
        <AuthedRouteHost
          path="/host/profile"
          component={HostProfile}
          isAuthentication={session}
          userType={type}
        />
        <AuthedRouteHost
          path="/host/listing"
          component={Listing}
          isAuthentication={session}
          userType={type}
        />
        <AuthedRouteHost
          path="/host/owner"
          component={Owner}
          isAuthentication={session}
          userType={type}
        />
        <AuthedRouteHost
          path="/host/spotList"
          component={SpotList}
          isAuthentication={session}
          userType={type}
        />
        <AuthedRouteHost
          path="/host/transactions"
          component={HostTransaction}
          isAuthentication={session}
          userType={type}
        />
        <AuthedRouteHost
          path="/host/payouts"
          component={ManageBalance}
          isAuthentication={session}
          userType={type}
        />
        <AuthedRouteHost
          path="/host/messages"
          component={HostMessages}
          isAuthentication={session}
          userType={type}
        />
        <AuthedRouteHost
          path="/host/myspots"
          component={MySpots}
          isAuthentication={session}
          userType={type}
        />

        <AuthedRouteHost
          path="/host/upcomingreservation"
          component={UpcomingReservation}
          isAuthentication={session}
          userType={type}
        />
        <AuthedRouteHost
          path="/terms"
          component={TermsConditions}
          isAuthentication={session}
          userType={type}
        />
        <AuthedRouteHost
          path="/faqs"
          component={FAQ}
          isAuthentication={session}
          userType={type}
        />
        <AuthedRouteHost
          path="/privacy"
          component={FAQ}
          isAuthentication={session}
          userType={type}
        />
        {/* <AuthedRouteTraveler path="/traveler/login" component={Login} exact={true} /> */}
        {/* <AuthedRouteTraveler path="/traveler/signup" component={Signup} /> */}
        <AuthedRouteTraveler
          path="/traveler/home"
          component={TravelerHome}
          isAuthentication={session}
          userType={type}
        />
        <AuthedRouteTraveler
          path="/traveler/transactions"
          component={Transactions}
          isAuthentication={session}
          userType={type}
        />
        <AuthedRouteTraveler
          path="/traveler/search"
          component={TravelSearch}
          isAuthentication={session}
          userType={type}
        />
        <AuthedRouteTraveler
          path="/traveler/booking"
          component={Book}
          isAuthentication={session}
          userType={type}
        />
        <AuthedRouteTraveler
          path="/traveler/profile"
          component={TravelerProfile}
          isAuthentication={session}
          userType={type}
        />
        <AuthedRouteTraveler
          path="/traveler/confirmation"
          component={Confirmation}
        />
        <AuthedRouteTraveler
          path="/traveler/favorites"
          component={FavouriteSpot}
          isAuthentication={session}
          userType={type}
        />
        <AuthedRouteTraveler
          path="/traveler/messages"
          component={travelerMessages}
          isAuthentication={session}
          userType={type}
        />
        <AuthedRouteTraveler
          path="/traveler/manage"
          component={ManageProfile}
          isAuthentication={session}
          userType={type}
        />
        <AuthedRouteTraveler
          path="/traveler/deposit"
          component={ManageBalance}
          isAuthentication={session}
          userType={type}
        />

        <AuthedRouteTraveler
          path="/traveler/spotnearme"
          component={SpotNearMe}
          isAuthentication={session}
          userType={type}
        />
        <AuthedRouteTraveler
          path="/traveler/trips"
          component={Trips}
          isAuthentication={session}
          userType={type}
        />
        <AuthedRouteTraveler
          path="/traveler/favorites"
          isAuthentication={session}
          userType={type}
        />
        <AuthedRouteTraveler
          path="/traveler/tripstart"
          component={StartTrip}
          isAuthentication={session}
          userType={type}
        />
        <AuthedRouteTraveler
          path="/traveler/terms"
          component={TermsConditions}
          isAuthentication={session}
          userType={type}
        />
        <AuthedRouteTraveler
          path="/traveler/faq"
          component={FAQ}
          isAuthentication={session}
          userType={type}
        />
        <AuthedRouteTraveler
          path="/traveler/terms"
          component={TermsConditions}
          isAuthentication={session}
          userType={type}
        />
        {session && type === "HOST" ? (
          <>
            <Redirect to="/host/profile" exact={true} />
          </>
        ) : (
          <>
            <Redirect to="/traveler/profile" exact={true} />
          </>
        )}
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;

const AuthedRoute = ({
  component: Component,
  isAuthentication,
  userType,
  ...props
}) => {
  // console.log(userType);
  return isAuthentication === null ? (
    <Route
      {...props}
      render={(props) => (
        <AuthedLayout pathname={props.location.pathname}>
          <Component {...props} />
        </AuthedLayout>
      )}
    />
  ) : (
    // Inital login routes
    <Redirect
      to={
        isAuthentication
          ? userType === "HOST"
            ? "/host/profile"
            : "/traveler/profile"
          : "/"
      }
    />
  );
};

const AuthedRouteTraveler = ({
  component: Component,
  isAuthentication,
  userType,
  ...props
}) => {
  return isAuthentication !== null && userType === "TRAVELER" ? (
    <Route
      {...props}
      render={(props) => (
        <AuthedLayout pathname={props.location.pathname}>
          <Component {...props} />
        </AuthedLayout>
      )}
    />
  ) : (
    <Redirect to="/" />
  );
};
const AuthedRouteHost = ({
  component: Component,
  isAuthentication,
  userType,
  ...props
}) => {
  return isAuthentication !== null && userType === "HOST" ? (
    <Route
      {...props}
      render={(props) => (
        <AuthedLayout pathname={props.location.pathname}>
          <Component {...props} />
        </AuthedLayout>
      )}
    />
  ) : (
    <Redirect to="/" />
  );
};
