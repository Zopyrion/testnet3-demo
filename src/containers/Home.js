import React, { Component } from "react";
import "../stylesheets/shared.css";
import Jumbotron from "react-bootstrap/es/Jumbotron";

export default class Home extends Component {
    render() {
        return (
            <Jumbotron fluid>
                    <h2>Testnet3</h2>
                    <br/>
                    <p>
                        Demo with the testnet3. Create address, fund with facuet, check balance, send
                        transactions, and view transaction history.
                    </p>
                    <p>
                        *Coins have no actual value on the testnet*
                    </p>
            </Jumbotron>
        );
    }
}