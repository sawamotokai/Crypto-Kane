const sha256 = require('js-sha256').sha256;
const stringify = require('json-stable-stringify');

class BlockChain {
	constructor() {
		this.chain = [];
		this.create_block(1, '0');
	}

	create_block(nonce, prev_hash) {
		let block = {
			index: this.chain.length + 1,
			timestamp: new Date().toISOString(),
			nonce: nonce,
			prev_hash: prev_hash
		};
		this.chain.push(block);
		return stringify(block);
	}

	get last_block() {
		return this.chain.slice(-1)[0];
	}

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
	// findNonce(prev_hash) {
	// 	let nonce = 0;
	// 	let block = stringify({
	// 		index: this.chain.length + 1,
	// 		timestamp: new Date().toISOString(),
	// 		nouce: nouce,
	// 		prev_hash: prev_hash
	// 	});
	// 	let isValidNonce = false;
	// 	while (!isValidNonce) {
	// 		let hash = sha256(block);
	// 		if (hash.slice(0, 4) === '0000')
	// 			isValidNonce = true; // mining successes if leading 4 digits are 0
	// 		else block.nonce++;
	// 	}
	// 	return [ block ];
	// }

	hash(block) {
		return sha256(stringify(block));
	}

	// loop over a chain to see all the links are valid
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

module.exports = BlockChain;
