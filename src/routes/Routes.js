import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "../containers/Home";
import Balance from "../containers/Balance";
import Send from "../containers/Send"
import Fund from "../containers/Fund"
import Create from "../containers/Create"
import History from "../containers/History"

export default () =>
    <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/balance" exact component={Balance} />
        <Route path="/fund" component={Fund} />
        <Route path="/create" component={Create} />
        <Route path="/send" component={Send} />
        <Route path="/history" component={History} />
    </Switch>;