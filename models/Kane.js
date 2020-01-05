const sha256 = require('js-sha256').sha256;
const stringify = require('json-stable-stringify');
const Url = require('url-parse');
const axios = require('axios');

class Kane {
	constructor() {
		this.chain = [];
		this.mempool = [];
		this.createBlock(1, '0');
		this.nodes = new Set();
	}

	// MODIFIES: Empties mempool after adding them to the new block
	// EFFECTS: creates a new blocok and append it to the chain
	createBlock(nonce, prev_hash) {
		let block = {
			index: this.chain.length + 1,
			timestamp: new Date().toISOString(),
			nonce: nonce,
			prev_hash: prev_hash,
			transactions: this.mempool
		};
		this.mempool = [];
		this.chain.push(block);
		return stringify(block);
	}

	// MODIFIES: Creates a new transaction and append it to mempool
	// EFFECTS: Returns the idx of the block to which this transaction is to be added
	createTransaction(sender, receiver, amount) {
		this.mempool.push({
			sender: sender,
			reveiver: receiver,
			amount: amount
		});
		return this.lastBlock.index + 1;
	}

	addNode(address) {
		let url = new Url(address);
		this.nodes.add(url.host);
	}
	// EFFECTS: Returns the last block in the chain
	get lastBlock() {
		return this.chain.slice(-1)[0];
	}

	// EFFECTS: Mines a block and return the nonce
	findNonce(prev_nonce) {
		let nonce = 0;
		let isValidNonce = false;
		while (!isValidNonce) {
			let hash = sha256((Math.pow(nonce, 2) - Math.pow(prev_nonce, 2)).toString());
			if (hash.slice(0, 4) === '0000')
				isValidNonce = true; // mining successes if leading 4 digits are 0
			else nonce++;
		}
		return nonce;
	}

	// EFFECTS: returns the hash of an entire block
	hash(block) {
		return sha256(stringify(block));
	}

	// EFFECTS: loop over a chain to see all the links are valid
	isChainValid(chain) {
		if (chain.length == 1) return true;
		let prev_block = chain[1];
		for (let i = 2; i < chain.lenght; i++) {
			let cur_block = chain[i];
			if (cur_block.prev_hash !== this.hash(prev_block)) return false;
			let prev_nonce = prev_block.nouce;
			let cur_nonce = cur_block.nouce;
			if (sha256((Math.pow(cur_nonce, 2) - Math.pow(prev_nonce, 2)).toString()).slice(0, 4) !== '0000') return false;
			prev_block = cur_block;
		}
		return true;
	}
}

module.exports = Kane;
