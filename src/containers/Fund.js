import React, { Component } from "react";
import "../stylesheets/shared.css";
import Jumbotron from "react-bootstrap/es/Jumbotron";

export default class Fund extends Component {
    render() {
        return (
            <Jumbotron fluid>
                <p>
                    Test transactions by funding your newly created address with a facuet.
                </p>
                <br/>
                <p><a href={"https://coinfaucet.eu/en/btc-testnet/"}> Coinfaucet.eu</a></p>
                <br/>
                <p><a href={"https://testnet-faucet.mempool.co/"}> Testnet-faucet.mempool.co</a></p>
                <br/>
                <p><a href={"https://bitcoinfaucet.uo1.net/"}> Bitcoinfaucet.uo1.net.</a></p>
                <br/>
                <p><a href={"https://www.google.com/search?q=bitcoin+testnet3+faucet"}> Google for more.</a></p>
                <br/>
            </Jumbotron>
        );
    }
}
