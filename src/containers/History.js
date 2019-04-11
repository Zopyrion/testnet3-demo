import React, { Component } from "react";
import CONSTANT from '../constant';
import { Alert, Button, FormGroup, FormControl, ControlLabel} from "react-bootstrap";
import "../stylesheets/shared.css";
const Chart = require('chart.js');
const HistoryScanner = require("../service/historyScanner");

export default class Balance extends Component {
    constructor(props) {
        super(props);
        const query = new URLSearchParams(this.props.location.search);
        let address = "";
        if(query.get('address') !== null){
            address = query.get('address');
        }
        this.state = {
            address: address,
            response: null,
            data: null,
            ctx: null
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
        const destination = CONSTANT.BLOCKCHAIN + "/addrs/" + this.state.address;
        const that = this;
        fetch(destination).then(function(response) {
            response.json().then(function(data) {
                that.setState({response: response.status, data: data})
            });
        })
    };

    render() {
        let result = null;
        if(this.state.data != null){
            if(this.state.response === 200) {
                result =  <Result data={this.state.data}/>;
            } else {
                result =  <Result class="danger" data={this.state.data}/>;
            }
        }
        const link = "/history?address=mihSbs8B1T7MdKB1kBM2ByANRLPAtMcjJE";
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <FormGroup controlId="address" bsSize="large" id="text">
                        <ControlLabel>Address</ControlLabel>
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
                        View History
                    </Button>
                    <br/>
                    <p> Try this address: <a href={link}>mihSbs8B1T7MdKB1kBM2ByANRLPAtMcjJE</a></p>
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
        this.chart = React.createRef();
    }

    componentDidMount(){
        this.draw();
    }

    componentDidUpdate() {
        this.draw();
    }

    draw(){
        const ctx = this.chart.current.getContext('2d');
        if(this.props.class === "danger"){
            return;
        }
        const res = HistoryScanner.build(this.props.data);
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: res.len,
                datasets: [{
                    label: 'Inputs',
                    data: res.inputs,
                    fill: false,
                    backgroundColor: "rgba(42,155,34,1)",
                    borderColor: "rgb(76,234,65,1)"
                },{
                    label: 'Outputs',
                    data: res.outputs,
                    fill: false,
                    backgroundColor: "rgba(38,92,181,1)",
                    borderColor: "rgb(99,153,242,1)"
                }],
            },
            options: {
                scales: {
                    xAxes: [{
                        ticks: {
                            display: false
                        }
                    }]
                },
                title: {
                    display: true,
                    text: 'Input/Output for Address ' + this.props.data['address'],
                    fontSize: 22
                }
            }
        });
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
            return (
                <Alert>
                    <div className="chart-container">
                        <canvas id="myChart" width="400" height="250" ref={this.chart}/>
                    </div>
                </Alert>
            );
        }
    }
}