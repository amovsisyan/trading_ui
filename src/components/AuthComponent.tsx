import React from "react";
import {useWeb3Context} from "web3-react";
import { useDispatch } from 'react-redux';
// @ts-ignore
import { useHistory } from "react-router-dom";
import {UnavailableToConnectComponent} from "./UnavailableToConnectComponent";
import {ArbitraryMessageComponent} from "./ArbitraryMessageComponent";
import { setToken } from '../features/global/globalSlice'

export const AuthComponent = () => {
    const context = useWeb3Context();
    const dispatch = useDispatch();
    const history = useHistory();

    React.useEffect(() => {
        // todo can not check pending status to show loading, that's why it will show error first, after account details
        context.setConnector("MetaMask")
    }, [context]);

    const onSetToken = (token: string) => {
        dispatch(setToken(token));
        history.push('/deposit')
    };

    return (
        <>
            {
                context.active ? (
                    <ArbitraryMessageComponent setToken={onSetToken}/>
                ) : (
                    <UnavailableToConnectComponent/>
                )
            }
        </>
    );
};