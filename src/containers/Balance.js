import React, { Component } from "react";
import CONSTANT from '../constant';
import { Alert, Button, FormGroup, FormControl, ControlLabel} from "react-bootstrap";
import "../stylesheets/shared.css";

export default class Balance extends Component {
    constructor(props) {
        super(props);

        this.state = {
            address: "",

            result: 0,
            message: "",
            walletAddress: ""
        };
    }

    validateForm() {
        return this.state.address.length > 0;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };

    handleSubmit = event => {
        event.preventDefault();
        const destination = CONSTANT.BLOCKCHAIN + "/addrs/" + this.state.address + "/balance";
        const that = this;
        fetch(destination).then(function(response) {
            response.json().then(function(data) {
                if(response.status === 429){
                    that.setState({result: 429, class: 'danger',
                        message: "Blockcypher API rate limited. Try again later."});
                } else if(response.status === 200){
                    that.setState({result: 200, class: '', message: "Wallet found.", data: data});
                } else {
                    that.setState({result: 404, class: 'danger', message: "Wallet address not found."});
                }
            });
        })
    };

    render() {
        let result = null;
        switch(this.state.result) {
            case 0:
                result = null;
                break;
            default:
                result = <Result data={this.state.data} class={this.state.class}
                                        message={this.state.message} result={this.state.result}/>;
        }

        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <FormGroup controlId="address" bsSize="large" id="text">
                        <ControlLabel>Wallet Address</ControlLabel>
                        <FormControl
                            autoFocus
                            type="text"
                            placeholder="2N53FAK46zZmFSNACdtF2bn6ZxniaqB4WMG"
                            value={this.state.address}
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                    <Button
                        block
                        bsSize="large"
                        disabled={!this.validateForm()}
                        type="submit"
                    >
                        Check Balance
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
        if(this.props.result === 200){
            const link = "/history?address=" + this.props.data['address'];
            return (
                <Alert>
                    <p> Wallet Address: {this.props.data['address']}</p>
                    <p> Current Balance: {this.props.data['balance'] / 100000000} BTC</p>
                    <p> Pending Transactions: {this.props.data['unconfirmed_n_tx']}</p>
                    <br/>
                    <a href={link}>Check graph of address flow history. </a>
                </Alert>
            );
        } else {
            return (
                <Alert className={this.props.class}>
                    <p>
                        {this.props.message}
                    </p>
                </Alert>
            );
        }
    }
}
//http://api.blockcypher.com/v1/btc/test3/addrs/2N53FAK46zZmFSNACdtF2bn6ZxniaqB4WMG/balance