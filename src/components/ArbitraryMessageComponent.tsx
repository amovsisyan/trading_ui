import React, {ChangeEvent} from "react";
import {useWeb3Context} from "web3-react";
import {utf8ToHex} from "web3-utils";
import { Typography, TextField, Button } from '@mui/material';

interface IArbitraryMessageComponent {
    setToken: (token: string) => void
}

export const ArbitraryMessageComponent: React.FC<IArbitraryMessageComponent> = ({setToken}) => {
    const [message, setMessage] = React.useState('');
    const {library} = useWeb3Context();

    const generateMessage = (): void => {
        if (message) {
            library.getSigner().signMessage(utf8ToHex(message)).then((token: string) => {
                setToken(token);
            });
        }
    };

    const setMessageHandler = (e: ChangeEvent<HTMLInputElement>): void => {
        setMessage(e.target.value);
    };

    return (
        <>
            <Typography variant="h5" gutterBottom component="div">
                Nicely done.
            </Typography>
            <Typography variant="subtitle1" gutterBottom component="div">
                Now Please Add arbitrary message.
            </Typography>
            <TextField
                margin="normal"
                label="Message"
                value={message}
                onChange={setMessageHandler}
                placeholder={'Hello world'}
            />
            <div>
                <Button disabled={message.length === 0} variant="outlined" onClick={generateMessage}>Generate & Sign</Button>
            </div>
        </>
    );
};
