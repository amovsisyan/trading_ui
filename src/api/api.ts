import { AxiosResponse } from 'axios';
import { mainAPI } from './instance';

const depositCRUD = 'deposits';
const transactionsCRUD = 'transactions';

export interface ICreateDeposit {
    balance: number;
    user_id: string;
    token: string;
}

export interface IDeposit {
    id: number;
    balance: number;
    user_id: string;
    token: string;
}

interface ICreateTransaction {
    amount: number;
    user_id: string;
    token: string;
    price: number;
    type: number;
}

export interface ITransaction {
    id: number;
    amount: number;
    user_id: string;
    token: string;
    price: number;
    type: number;
    status: number;
}

export const createDeposit = (
    createData: ICreateDeposit
): Promise<AxiosResponse<IDeposit>> => mainAPI.post(`${depositCRUD}`, createData);

export const getTransactions = (
    userId: string
): Promise<AxiosResponse<ITransaction[]>> => mainAPI.get(`${transactionsCRUD}/users/${userId}`);

export const createTransaction = (
    createData: ICreateTransaction
): Promise<AxiosResponse<ITransaction>> => mainAPI.post(`${transactionsCRUD}`, createData);

export const updateTransaction = (
    updateData: ITransaction
): Promise<AxiosResponse<ITransaction>> => mainAPI.put(`${transactionsCRUD}/${updateData.id}`, updateData);

