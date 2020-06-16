import React, { Component } from 'react';
import ListView from "../component/ListView";
import { Container, Row, Col } from 'reactstrap';



const socketUrl = 'ws://stocks.mnet.website/';

class StockHome extends Component {

    constructor(props) {
        super(props)

        this.state = {
            stocks: {}
        }

    }
    componentDidMount() {

        this.socket = new WebSocket(socketUrl);
        this.socket.onopen = this.connectionEstabished;
        this.socket.onmessage = this.handleUpdateMessage;
        this.socket.onclose = this.connectedClosed;
        this.socket.onerror = this.errorOccured;

    }

    connectionEstabished = (event) => {
        console.log("Connected Established");
    }

    handleUpdateMessage = (event) => {
        const stockData = JSON.parse(event.data);
        console.log(stockData);
        const new_stocks = this.state.stocks

        stockData.map((stock) => {
            console.log(stock);
            if (this.state.stocks[stock[0]]) {

                new_stocks[stock[0]].current_value = stock[1];
                new_stocks[stock[0]].history.push({ time: Date.now(), value: stock[1] });
            }
            else {
                new_stocks[stock[0]] = { current_value: stock[1], history: [{ time: Date.now(), value: Number(stock[1]) }] };
            }
        });

        this.setState({ stocks: new_stocks })
        console.log(this.state.stocks);
    }

    connectedClosed = (event) => {
        if (event.wasClean) {
            alert(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
        } else {
            // e.g. server process killed or network down
            // event.code is usually 1006 in this case
            alert('[close] Connection died');
        }
    }

    errorOccured = (error) => {
        alert(`[error] ${error.message}`);
    };

    render() {
        return (
            <div className="stockHomeSection">
                <Container>
                    <Row>
                        <Col lg="7" sm="7" xs="12">
                            <ListView
                                stocks={this.state.stocks}
                            />
                        </Col>
                    </Row>
                </Container>
            </div>

        );
    }
}


export default StockHome;