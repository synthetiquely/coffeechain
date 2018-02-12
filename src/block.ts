import { Transaction } from './helpers/transaction';

export interface Block {
  index: number;
  timeStamp: Date;
  previousHash: string;
  proof: number;
  transactions: Transaction[];
}

export class Block {
  constructor(
    index: number,
    timeStamp: Date,
    previousHash: string,
    proof: number,
    transactions: Transaction[],
  ) {
    this.index = index;
    this.timeStamp = timeStamp;
    this.previousHash = previousHash;
    this.proof = proof;
    this.transactions = transactions;
  }
}
