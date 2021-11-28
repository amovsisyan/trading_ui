import React, {ChangeEvent, useState} from "react";
// @ts-ignore
import { useHistory } from "react-router-dom";
import {useWeb3Context} from "web3-react/dist";
import { useSelector } from 'react-redux'
import { selectToken } from '../features/global/globalSlice'
import {Button, TextField, Typography, Select, MenuItem, SelectChangeEvent, Snackbar} from "@mui/material";
import {TokensList} from "../constants/TokensList";
import {createDeposit} from "../api/api";

export const DepositComponent = () => {
    const [snackOpen, setSnackOpen] = useState(false);
    const [deposit, setDeposit] = useState(1);
    const {account} = useWeb3Context();
    const [token, setToken] = useState(TokensList[0]);
    const globalToken = useSelector(selectToken);
    const history = useHistory();

    React.useEffect(() => {
        if (!globalToken) {
            history.push('/')
        }
    }, [globalToken, history]);

    const setDepositHandler = (e: ChangeEvent<HTMLInputElement>): void => {
        setDeposit(+e.target.value);
    };

    const generateDeposit = () => {
        createDeposit({
            user_id: account || '',
            balance: deposit,
            token,
        }).then(() => {
            setSnackOpen(true);
        });
    };

    const setTokenHandler = (e: SelectChangeEvent<string>) => {
        setToken(e.target.value);
    };

    const goToTrading = () => {
        history.push('/trading')
    };

    const onCloseHandler = () => {
        setSnackOpen(false);
    };

    return (
        <div>
            <Typography variant="h5" gutterBottom component="div">
                Deposit.
            </Typography>
            <Typography variant="subtitle1" gutterBottom component="div">
                Select amount to deposit.
            </Typography>
            <TextField
                type="number"
                label="Deposit"
                value={deposit}
                onChange={setDepositHandler}
                placeholder={'1'}
            />
            <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={token}
                label="Age"
                onChange={setTokenHandler}
            >
                {TokensList.map(t => <MenuItem value={t}>{t}</MenuItem>)}
            </Select>
            <div>
                <Button disabled={deposit === 0} variant="outlined" onClick={generateDeposit}>Deposit</Button>
            </div>
            <div>
                <Button variant="contained" onClick={goToTrading}>Go to Trading</Button>
            </div>

            <Snackbar
                open={snackOpen}
                onClose={onCloseHandler}
                message="Done"
            />
        </div>
    );
};