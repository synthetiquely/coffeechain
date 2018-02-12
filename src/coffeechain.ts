import { Chain } from './chain';
import { Block } from './block';

export interface CoffeeChain {
  chain: Chain;
}

export class CoffeeChain {
  constructor() {
    this.chain = new Chain();
  }

  /**
   * Returns current chain of blocks
   * @return {Block[]}
   */
  getChain(): Block[] {
    return this.chain.blockchain;
  }

  /**
   * Mine a new block
   * @return {Block}
   */
  mine() {
    const latestBlock = this.chain.getLatestBlock();
    const latestProof = latestBlock.proof;
    const proof = this.chain.proofOfWork(latestProof);
    this.chain.addTransaction('0', String(process.env.NODE_NAME), 1);
    const previousHash = this.chain.hashBlock(latestProof.toString());

    return this.chain.addBlock(proof, previousHash);
  }

  /**
   * Create a new transaction
   * @param  {string} sender
   * @param  {string} recipient
   * @param  {number} amount
   * @return {string}
   */
  addTransaction(sender: string, recipient: string, amount: number): string {
    const index = this.chain.addTransaction(sender, recipient, amount);
    return `Transaction will be added to Block ${index}`;
  }
}
