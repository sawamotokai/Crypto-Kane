const app = require('express')();
const BlockChain = require('./models/BlockChain');

const BC = new BlockChain();

app.get('/', (req, res) => {
	res.send(`${BC.findNonce(2)}`);
});

app.get('/mine_block', (req, res) => {
	let prev_block = BC.last_block;
	let new_nonce = BC.findNonce(prev_block.nonce);
	let block = JSON.parse(BC.create_block(new_nonce, BC.hash(prev_block)));
	console.log(block);
	res.status(200).json(block);
});

app.get('/get_chain', (req, res) => {
	let response = {
		chain: BC.chain,
		length: BC.chain.length
	};
	res.status(200).json(response);
});

app.get('/is_valid_chain', (req, res) => {
	let isValid = BC.isChainValid(BC.chain);
	let respond = {
		message: isValid ? 'Good. Blockchain is valid' : 'Bad. Blockchain is invalid'
	};
	return res.status(200).json(respond);
});

const port = 3000;
app.listen(port, () => {
	console.log(`Server started on ${port}`);
});
