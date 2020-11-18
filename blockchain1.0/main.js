const { Blockchain, Transaction } = require('./blockchain');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

const myKey = ec.keyFromPrivate('1bf20ad0bad87bed2270a1b3a8d1fb841d3eb74eda246e96b9c9f311454f32fb');

const myWalletAddress = myKey.getPublic('hex');

const blockchain = new Blockchain();

const tx1 = new Transaction(myWalletAddress, 'address1', 1);
tx1.signTransaction(myKey);
blockchain.addTransaction(tx1);

blockchain.minePendingTransactions(myWalletAddress);

console.log();
console.log(`${myWalletAddress} hesabindaki tutar ${blockchain.getBalanceOfAddress(myWalletAddress)}`);

const tx2 = new Transaction(myWalletAddress, 'address1', 50);
tx2.signTransaction(myKey);
blockchain.addTransaction(tx2);

blockchain.minePendingTransactions(myWalletAddress);

console.log();
console.log(`${myWalletAddress} hesabindaki tutar ${blockchain.getBalanceOfAddress(myWalletAddress)}`);

// Blok zincirini kurcalayýp, en alttaki sorguyu Hayir yapmak istiyorsan alttaki yorumu kaldýr.
//blockchain.chain[1].transactions[0].amount = 10;

console.log();
console.log('Blockchain dogru mu?', blockchain.isChainValid() ? 'Evet' : 'Hayir');