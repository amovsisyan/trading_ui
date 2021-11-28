import React, {Component} from "react";
import Web3Provider, {Connectors} from "web3-react";
import {Container} from '@mui/material';
// @ts-ignore
import {Provider} from 'react-redux';
// @ts-ignore
import {BrowserRouter as Router, Switch, Route,} from "react-router-dom";
import {AuthComponent} from "./components/AuthComponent";
import {DepositComponent} from "./components/DepositComponent.";
import {store} from './store'
import {TradingComponent} from "./components/TradingComponent";

const MetaMask = new Connectors.InjectedConnector({
    supportedNetworks: [1, 3, 4, 5, 42],
});
const connectors = {MetaMask};

class App extends Component {
    render() {
        return (
            <Router>
                <Provider store={store}>
                    <Web3Provider connectors={connectors} libraryName="ethers.js">
                        <Container fixed>
                            <Switch>
                                <Route path="/trading">
                                    <TradingComponent/>
                                </Route>
                                <Route path="/deposit">
                                    <DepositComponent/>
                                </Route>
                                <Route path="/">
                                    <AuthComponent/>
                                </Route>
                            </Switch>
                        </Container>
                    </Web3Provider>
                </Provider>
            </Router>
        );
    }
}

export default App;
