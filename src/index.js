import domready from "domready";
import React from "react";
import ReactDOM from "react-dom";
import { browserHistory, Router, Route, IndexRoute } from "react-router";
import { App } from "./components/App";
import { Home } from "./components/Home";

function main() {
    ReactDOM.render(
        <Router history={browserHistory}>
            <Route path="/" component={App}>
                <IndexRoute component={Home} />
            </Route>
        </Router>,
        document.querySelector("#main")
    );
}

domready(main);
