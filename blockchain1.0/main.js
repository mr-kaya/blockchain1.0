const SHA256 = require('crypto-js/sha256');
// npm install --save crypto-js
//node main.js
class Block {
	constructor(index, timestamp, data, previousHash = '') {
		this.index = index;
		this.data = data;
		this.timestamp = timestamp;
		this.previousHash = previousHash;
		this.hash = this.calculateHash();
	}

	calculateHash() {
		return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
	}
}

class Blockchain {
	constructor() {
		this.chain = [this.createGenesisBlock()];
	}

	createGenesisBlock() {
		return new Block(0, "01/01/2020", "Genesis block", "0");
	}

	getLatestBlock() {
		return this.chain[this.chain.length - 1];
	}

	addBlock(newBlock) {
		newBlock.previousHash = this.getLatestBlock().hash;
		newBlock.hash = newBlock.calculateHash();
		this.chain.push(newBlock);
	}

	isChainValid() {
		for (let i = 1; i < this.chain.length; i++) {
			const currentBlock = this.chain[i];
			const previousBlock = this.chain[i - 1];

			if (currentBlock.hash !== currentBlock.calculateHash()) {
				return false;
			}

			if (currentBlock.previousHash !== previousBlock.hash) {
				return false;
			}
		}
		return true;
	}
}

let blockchain = new Blockchain();
blockchain.addBlock(new Block(1, "10/07/2020", { amount: 4 }));
blockchain.addBlock(new Block(2, "12/07/2020", { amount: 10 }));

console.log(JSON.stringify(blockchain, null, 4));

console.log('Blockchain verileri dogru mu?' + blockchain.isChainValid()); //Veriler De�i�timi

blockchain.chain[1].data = { amount: 100 }//Eklersen Veriler De�i�ti Olur

console.log('Blockchain verileri dogru mu?' + blockchain.isChainValid()); //Veriler De�i�timi