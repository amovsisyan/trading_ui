import React, {ChangeEvent, useState} from "react";
import {useSelector} from "react-redux";
// @ts-ignore
import { useHistory } from "react-router-dom";
import {
    RadioGroup,
    FormControlLabel,
    Radio,
    TextField,
    Select,
    MenuItem,
    SelectChangeEvent, Button
} from "@mui/material";
import {selectToken} from "../features/global/globalSlice";
import {useWeb3Context} from "web3-react/dist";
import {createTransaction, getTransactions, ITransaction, updateTransaction} from "../api/api";
import {TokensList} from "../constants/TokensList";

export const TradingComponent = () => {
    const [transactions, setTransactions] = useState<ITransaction[]>([]);
    const [buyOrSell, setBuyOrSell] = useState('buy');
    const [amount, setAmount] = useState(1);
    const [token, setToken] = useState(TokensList[0]);
    const globalToken = useSelector(selectToken);
    const history = useHistory();
    const {account} = useWeb3Context();

    React.useEffect(() => {
        if (!globalToken) {
            history.push('/')
        }
    }, [globalToken, history]);

    React.useEffect(() => {
        if (account) {
            getTransactions(account).then(({data: transactions}) => {
                setTransactions(transactions);
            })
        }
    }, [account]);

    const setAmountHandler = (e: ChangeEvent<HTMLInputElement>): void => {
        setAmount(+e.target.value);
    };

    const setTokenHandler = (e: SelectChangeEvent<string>) => {
        setToken(e.target.value);
    };

    const makeTransaction = () => {
        createTransaction({
            type: buyOrSell === 'buy' ? 1 : 2,
            amount,
            user_id: account || '',
            token,
            price: 100, // do not know what is this
        }).then(({data: transaction}) => {
            setTransactions([...transactions, transaction]);
        });
    };

    const goToDeposit = () => {
        history.push('/deposit')
    };

    const setBuyOrSellHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setBuyOrSell(e.target.value)
    };
    
    const onCancel = (transaction: ITransaction) => {
        updateTransaction({
            ...transaction,
            status: 2,
        }).then(() => {
            setTransactions(transactions.map((t) => {
                if (t.id === transaction.id) {
                    return {...t, status: 2}
                } else {
                    return t
                }
            }));
        });
    };

    return (
        <div>
            <RadioGroup row name="row-radio-buttons-group" onChange={setBuyOrSellHandler} value={buyOrSell}>
                <FormControlLabel value="buy" control={<Radio />} label="Buy" />
                <FormControlLabel value="sell" control={<Radio />} label="Sell" />
            </RadioGroup>
            <TextField
                type="number"
                label="Amount"
                value={amount}
                onChange={setAmountHandler}
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
                <Button disabled={amount === 0} variant="outlined" onClick={makeTransaction}>Make Transaction</Button>
            </div>
            <div>
                <Button variant="contained" onClick={goToDeposit}>Go to Deposit</Button>
            </div>
            <div>
                Transactions List: {!transactions.length ? 'Empty': ''}
            </div>
            {
                transactions.map((transaction, key) => {
                    // pls do not pay attention here to styles and mock up
                    return <div key={transaction.id}>
                        <p>

                            {key +1} ^{transaction.type === 1 ? 'BUY' : 'SELL'}^ - Amount: {transaction.amount} - {transaction.token} - Status: {transaction.status === 1 ? 'OK' : 'Canceled'} <span style={{color: 'red', cursor: 'pointer'}} onClick={() => onCancel(transaction)}>Cancel</span>
                        </p>
                    </div>;
                })
            }
        </div>
    );
};