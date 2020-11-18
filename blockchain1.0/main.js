const { Blockchain, Transaction } = require('./blockchain');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');
const myKey = ec.keyFromPrivate('e3cdf62b497e83e4fd57586fb8690b358e953699aa280ee898c31750a85ef3e0');
const myWalletAddress = myKey.getPublic('hex');

let blockchain = new Blockchain();

const tx1 = new Transaction(myWalletAddress, 'public key goes here', 10);
tx1.signTransaction(myKey);
blockchain.addTransaction(tx1);

console.log('\n Starting the miner...');
blockchain.minePendingTransactions(myWalletAddress);

console.log('\nBalance of xavier is ', blockchain.getBallanceOfAddress(myWalletAddress));

blockchain.chain[1].transactions[0].amount = 1;

console.log('Is chain valid?', blockchain.isChainValid());