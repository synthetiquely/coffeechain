import * as cryptojs from 'crypto-js';
import { Block } from '../block';

/**
 * Generates a hash for the provided data to keep the integrity of the data
 * @param {number} index index of the block
 * @param {string} previousHash hash of the previous block
 * @param {number} timeStamp timestamps in ms
 * @param {any} data the data piece you want to encrypt
 * @return {string} hash
 */
export const calculateHash = (
  index: number,
  previousHash: string,
  timeStamp: number,
  data: any,
): string => {
  return cryptojs.SHA256(index + previousHash + timeStamp + data).toString();
};

/**
 * Generates a hash for the provided block to keep the integrity of the data
 * @param {Block} block the block of chain
 * @return {string} hash
 */
export const calculateHashForBlock = (block: Block) => {
  return calculateHash(
    block.index,
    block.previousHash,
    block.timeStamp,
    block.data,
  );
};
