import { Block } from './block';
import { calculateHash } from './helpers/calculateHash';
import { validateIntegrity } from './helpers/validateIntegrity';

export interface Chain {
  blockchain: Block[];
}

export class Chain {
  constructor() {
    this.blockchain = [this.getGenesisBlock()];
  }

  /**
   * Returns the genesis block of the chain
   * @return {Block} a first block in the blockchain, which is hard-coded
   */
  getGenesisBlock(): Block {
    return new Block(
      0,
      '0',
      1465154705,
      'i love coffee',
      '816534932c2b7154836da6afc367695e6337db8a921823784c14378abed4f7d7',
    );
  }

  /**
   * Returns the latest block of the chain
   * @return {Block} a latest block of the chain
   */
  getLatestBlock(): Block {
    return this.blockchain[this.blockchain.length - 1];
  }

  /**
   * Adds new block to the existing chain
   * @param {Block} newBlock
   */
  addBlock(newBlock: Block): void {
    if (validateIntegrity(newBlock, this.getLatestBlock())) {
      this.blockchain.push(newBlock);
    }
  }

  /**
   * Generates and returns a new block of the chain
   * @param {any} blockData the data piece to place in the block
   * @return {Block} new encrypted block in the chain
   */
  generateBlock(blockData: any): Block {
    const previousBlock = this.getLatestBlock();
    const nextIndex = previousBlock.index + 1;
    const nextTimeStamp = new Date().getTime() / 1000;
    const nextHash = calculateHash(
      nextIndex,
      previousBlock.hash,
      nextTimeStamp,
      blockData,
    );
    return new Block(
      nextIndex,
      previousBlock.hash,
      nextTimeStamp,
      blockData,
      nextHash,
    );
  }
}
