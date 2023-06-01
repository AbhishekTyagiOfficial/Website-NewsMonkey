import React, { Component } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import Navbar from "./components/Navbar";
import News from "./components/News";
import About from "./components/About";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default class App extends Component {
  render() {
    return (
      <>
        <Router>
          <Navbar />
          <Routes>
            <Route
              exact
              path="/"
              element={
                <News
                  key="general" // for reload the content by uniqe id
                  // heading="Today's Top News"
                  pageSize={9}
                  country="in"
                  category="General"
                />
              }
            ></Route>
            <Route
              exact
              path="/business"
              element={
                <News
                  key="busines"
                  pageSize={9}
                  // heading="Today's Busines News"
                  country="in"
                  category="Business"
                />
              }
            ></Route>
            <Route
              path="/entertainment"
              element={
                <News
                  key="entertainment"
                  // heading="Today's Entertainment News"
                  pageSize={9}
                  country="in"
                  category="Entertainment"
                />
              }
            ></Route>
            <Route
              exact
              path="/health"
              element={
                <News
                  key="health"
                  // heading="Today's Health News"
                  pageSize={9}
                  country="in"
                  category="Health"
                />
              }
            ></Route>
            <Route
              exact
              path="/science"
              element={
                <News
                  key="science"
                  // heading="Today's Science News"
                  pageSize={9}
                  country="in"
                  category="Science"
                />
              }
            ></Route>
            <Route
              exact
              path="/sports"
              element={
                <News
                  key="sports"
                  // heading="Today's Sports News"
                  pageSize={9}
                  country="in"
                  category="Sports"
                />
              }
            ></Route>
            <Route
              exact
              path="/technology"
              element={
                <News
                  key="technology"
                  // heading="Today's Technology News"
                  pageSize={9}
                  country="in"
                  category="Technology"
                />
              }
            ></Route>
            <Route exact path="/about" element={<About />}></Route>
          </Routes>
        </Router>
      </>
    );
  }
}
