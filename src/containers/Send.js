import React, { Component } from "react";
import {Button, FormGroup, FormControl, ControlLabel, Alert} from "react-bootstrap";
import "../stylesheets/Send.css";
import CONSTANT from "../constant";

export default class Send extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sourcePrivateKey: "",
            destinationAddress: "",
            amount: null,
            response: 0,
            message: "",
            walletAddress: "",
            data: null
        };
    }

    validateForm() {
        const re = /^[0-9\b]+$/;
        if (!re.test(this.state.amount)) {
            return false;
        }
        return this.state.sourcePrivateKey.length > 0 && this.state.destinationAddress.length > 0;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };

    handleSubmit = event => {
        event.preventDefault();

        const destination = CONSTANT.BLOCKCHAIN + "/txs/micro?";
        const privateKey = "from_private=" + this.state.sourcePrivateKey;
        const toAddress = "to_address=" + this.state.destinationAddress;
        const value = "value_satoshis=" + this.state.amount;
        const waitGuarantee = "wait_guarantee=false";
        const token = "token=" + CONSTANT.TOKEN;
        const url = destination + privateKey + "&" + toAddress + "&" + value + "&" + waitGuarantee + "&" + token;

        const that = this;
        fetch(url, {
            method: 'GET'
        }).then(function(response) {
            response.json().then(function(data) {
                that.setState({response: response.status, data: data})
            });
        })
    };

    render() {
        let result = null;
        if(this.state.data != null){
            if(this.state.response === 201) {
                result =  <Result data={this.state.data}/>;
            } else {
                result =  <Result class="danger" data={this.state.data}/>;
            }
        }
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <FormGroup controlId="sourcePrivateKey" bsSize="large" id="text">
                        <ControlLabel>Private Key</ControlLabel>
                        <FormControl
                            autoFocus
                            type="text"
                            placeholder="Source Address Private Key."
                            value={this.state.sourcePrivateKey}
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                    <FormGroup controlId="destinationAddress" bsSize="large" id="text">
                        <ControlLabel>Destination Address</ControlLabel>
                        <FormControl
                            autoFocus
                            type="text"
                            placeholder="Destination Address To Deposit Into."
                            value={this.state.destinationAddress}
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                    <FormGroup controlId="amount" bsSize="large" id="text">
                        <ControlLabel>Amount</ControlLabel>
                        <FormControl
                            autoFocus
                            type="number"
                            placeholder="Satoshis"
                            value={this.state.amount}
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                    <Button
                        block
                        bsSize="large"
                        disabled={!this.validateForm()}
                        type="submit"
                    >
                        Send
                    </Button>
                </form>
                <br/><br/>
                {result}
            </div>
        );
    }
}

class Result extends Component {
    constructor(props) {
        super(props);
        this.state = { };
    }

    render() {
        if(this.props.class === "danger"){
            return (
                <Alert className="danger">
                    <p>
                        Error: {this.props.data['error']}
                    </p>
                </Alert>
            );

        } else {
            const link = "https://live.blockcypher.com/btc-testnet/tx/"
                + this.props.data['hash'];
            return (
                <Alert>
                    <p>
                        Successfully sent {this.props.data['value_satoshis']} Satoshis to
                        address <b>{this.props.data['to_address']}</b>.
                        Check out details about your transaction ->
                        <a href={link}> {this.props.data['hash']}.</a>
                    </p>
                </Alert>
            );
        }
    }
}