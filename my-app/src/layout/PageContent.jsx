import Header from "./Header";
import Footer from "./Footer";
import HomePage from "../pages/HomePage";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function PageContent() {
  return (
    <Router>
      <Header />
      <main className="min-h-screen bg-white">
        <Switch>
          <Route path="/" exact component={HomePage} />
        </Switch>
      </main>
      <Footer />
    </Router>
  );
}

export default PageContent;
