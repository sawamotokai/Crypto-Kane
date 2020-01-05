const app = require('express')();
const Kane = require('./models/Kane');

const kane = new Kane();

app.get('/', (req, res) => {
	res.send(`${kane.findNonce(4)}`);
});

app.get('/mine_block', (req, res) => {
	let prev_block = kane.lastBlock;
	let new_nonce = kane.findNonce(prev_block.nonce);
	let block = JSON.parse(kane.createBlock(new_nonce, kane.hash(prev_block)));
	console.log(block);
	res.status(200).json(block);
});

app.get('/get_chain', (req, res) => {
	let response = {
		chain: kane.chain,
		length: kane.chain.length
	};
	res.status(200).json(response);
});

app.get('/is_valid_chain', (req, res) => {
	let isValid = kane.isChainValid(kane.chain);
	let respond = {
		message: isValid ? 'Good. Blockchain is valid' : 'Bad. Blockchain is invalid'
	};
	return res.status(200).json(respond);
});

const port = 3000;
app.listen(port, () => {
	console.log(`Server started on ${port}`);
});
