import React, { Component } from "react";
import CONSTANT from '../constant';
import { Alert, Button, FormGroup, ControlLabel} from "react-bootstrap";
import "../stylesheets/shared.css";

export default class Create extends Component {
    constructor(props) {
        super(props);
        this.state = {
            address: "",
            result: 0,
            message: "",
        };
    }

    handleSubmit = event => {
        event.preventDefault();
        const destination = CONSTANT.BLOCKCHAIN + "/addrs";
        const that = this;
        fetch(destination, {
            method: 'POST'
        }).then(function(response) {
            response.json().then(function(data) {
                if(response.status === 429){
                    that.setState({result: 429, class: 'danger',
                        message: "Blockcypher API rate limited. Try again later."});
                } else if(response.status === 201){
                    that.setState({result: 200, class: '', message: "Address Created.", data: data});
                } else {
                    that.setState({result: 404, class: 'danger', message: "API Error."});
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
                        <ControlLabel>Create New Address</ControlLabel>
                    </FormGroup>
                    <Button
                        block
                        bsSize="large"
                        type="submit"
                    >
                        Create Address
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
            return (
                <Alert>
                    <p> Keep note of these to test sending transactions.</p><br/>
                    <p> Private Key: {this.props.data['private']}</p>
                    <p> Public Key: {this.props.data['public']}</p>
                    <p> Address: {this.props.data['address']}</p>
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