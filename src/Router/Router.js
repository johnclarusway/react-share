import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Signup from "../pages/Signup";
import Signin from "../pages/Signin";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function AppRouter() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/register" component={Signup} />
        <Route path="/login" component={Signin} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default AppRouter;
