import { Block } from '../block';
import { calculateHashForBlock } from './calculateHash';

/**
 * Validates if a new block could become part of the chain by comparing hashes and indexes
 * @param  {Block} newBlock block that needs to be validated
 * @param  {Block} previousBlock the previos block of the chain
 * @return {boolean} returns true if the block is valid
 */
export const validateIntegrity = (
  newBlock: Block,
  previousBlock: Block,
): boolean => {
  if (previousBlock.index + 1 !== newBlock.index) {
    console.log('Inalid index');
    return false;
  } else if (previousBlock.hash !== newBlock.previousHash) {
    console.log('Invalid previous hash');
    return false;
  } else if (calculateHashForBlock(newBlock) !== newBlock.hash) {
    console.log('Invalid hash');
    return false;
  }
  return true;
};
