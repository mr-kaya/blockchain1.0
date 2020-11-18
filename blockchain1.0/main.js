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
		this.nonce = 0;
	}

	calculateHash() {
		return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
	}

	mineBlock(difficulty) {
		while (this.hash.substring(0, difficulty) !== Array(difficulty).join("0")) {
			this.nonce++;
			this.hash = this.calculateHash();
		}

		console.log("Block mined: " + this.hash);
	}
}

class Blockchain {
	constructor() {
		this.chain = [this.createGenesisBlock()];
		this.difficulty = 6; //mining bloklarýnýn, hash kodlarýnýn baþýndaki sýfýrlarýn ('0') kaç tane olacaðýný belirler.
	}

	createGenesisBlock() {
		return new Block(0, "01/01/2020", "Genesis block", "0");
	}

	getLatestBlock() {
		return this.chain[this.chain.length - 1];
	}

	addBlock(newBlock) {
		newBlock.previousHash = this.getLatestBlock().hash;
		newBlock.mineBlock(this.difficulty);
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

console.log('mining block 1....');
blockchain.addBlock(new Block(1, "10/07/2020", { amount: 4 }));

console.log('mining block 2....');
blockchain.addBlock(new Block(2, "12/07/2020", { amount: 10 }));