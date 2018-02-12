export interface Block {
  index: number;
  previousHash: string;
  timeStamp: number;
  data: any;
  hash: string;
}

export class Block {
  constructor(
    index: number,
    previousHash: string,
    timeStamp: number,
    data: any,
    hash: string,
  ) {
    this.index = index;
    this.previousHash = previousHash.toString();
    this.timeStamp = timeStamp;
    this.data = data;
    this.hash = hash.toString();
  }
}
