import { Block } from './block';
import { Transaction } from './helpers/transaction';
import * as crypto from 'crypto';

export interface Chain {
  blockchain: Block[];
  transactions: Transaction[];
}

export class Chain {
  constructor() {
    this.blockchain = [];
    this.transactions = [];

    // Create a genesis block
    this.addBlock(100, '1');
  }

  /**
   * Returns the genesis block of the chain
   * @return {Block} a first block in the blockchain
   */
  getGenesisBlock(): Block {
    return this.blockchain[0];
  }

  /**
   * Returns the latest block of the chain
   * @return {Block} a latest block of the chain
   */
  getLatestBlock(): Block {
    return this.blockchain[this.blockchain.length - 1];
  }

  /**
   * Generates and returns a new block of the chain
   * @param {number} proof
   * @param {string} previousHash
   * @return {Block}
   */
  addBlock(proof: number, previousHash: string): Block {
    const index = this.blockchain.length + 1;
    const timeStamp = new Date();
    const block = new Block(
      index,
      timeStamp,
      previousHash,
      proof,
      this.transactions,
    );
    this.transactions = [];
    this.blockchain.push(block);
    return block;
  }
  /**
   * Store a new transaction
   * @param {string} sender
   * @param {string} recipient
   * @param {number} amount
   * @return {number} index of the block where the transaction will be added
   */
  addTransaction(sender: string, recipient: string, amount: number): number {
    this.transactions.push({
      sender,
      recipient,
      amount,
    });
    return this.getLatestBlock()['index'] + 1;
  }

  /**
   * Generates a hash for the provided block to keep the integrity of the data
   * @param {string} block
   * @return {string}
   */
  hashBlock(block: string): string {
    const blockString = JSON.stringify(block);
    return crypto
      .createHmac(String(process.env.HASH_TYPE), String(process.env.SECRET_KEY))
      .update(blockString)
      .digest('hex');
  }

  /**
   * Validates if a proof could become part of the chain by comparing their hashes
   * @param  {number} lastProof the previous block of the chain
   * @param  {number} proof block that needs to be validated
   * @return {boolean} returns true if the proof is valid
   */
  private validateProof(lastProof: number, proof: number): boolean {
    const hash = crypto
      .createHmac(String(process.env.HASH_TYPE), String(process.env.SECRET_KEY))
      .update(`${lastProof}${proof}`)
      .digest('hex');
    return hash.substr(0, 5) === process.env.RESOLUTION_HASH;
  }

  /**
   * Cycles until the solution to the block is found
   * @param  {number} lastProof
   * @return {number}
   */
  proofOfWork(lastProof: number): number {
    let proof = 0;
    while (true) {
      if (!this.validateProof(lastProof, proof)) {
        proof++;
      } else {
        break;
      }
    }
    return proof;
  }
}
