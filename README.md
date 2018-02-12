# Coffeechain

Implementation of blockchain using JavaScript

## API

```js
import { CoffeeChain } from 'coffeechain';

const blockchain = new CoffeeChain();

# To get a current chain of blocks
blockchain.getChain();

# To create a new Transaction
blockchain.addTransaction(sender, recipient, amount);

# To mine a new block
blockchain.mine();
```
