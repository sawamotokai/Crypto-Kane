const express = require('express');
const app = express();
const Kane = require('../models/Kane');
const uuid4 = require('uuid4');

app.use(express.json());

const kane = new Kane();
const nodeAddress = uuid4().replace(/-/g, ''); // address of node on port 3000

app.get('/', (req, res) => {
	res.send(`Welcome to my cryptocurrency Kane! ${kane.findNonce(4)}`);
});

app.get('/mine_block', (req, res) => {
	let prev_block = kane.lastBlock;
	let new_nonce = kane.findNonce(prev_block.nonce);
	kane.createTransaction(nodeAddress, 'Shin', 10);
	let block = JSON.parse(kane.createBlock(new_nonce, kane.hash(prev_block)));
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

app.get('/replace_chain', (req, res) => {
	let wasReplaced = kane
		.replaceChain()
		.then(() => {
			let respond = {
				message: wasReplaced ? 'Chain was replaced by the longest.' : 'This chain is the largest.',
				newChain: kane.chain
			};
			return res.status(200).json(respond);
		})
		.catch((err) => {
			console.error(err);
		});
});

app.post('/add_transaction', (req, res) => {
	const { sender, receiver, amount } = req.body;
	if (!sender || !receiver || !amount) {
		console.log(req);
		console.log(sender, receiver, amount);
		return res.status(400).json({
			message: 'Some param is missing!!'
		});
	}

	let targetBlockIdx = kane.createTransaction(sender, receiver, amount);
	return res.status(201).json({ message: `Transaction to be added to Block with index: ${targetBlockIdx}` });
});

app.post('/connect_nodes', (req, res) => {
	const { nodes } = req.body;
	if (!nodes) return res.status(401).json({ message: 'Nodes is empty' });
	nodes.forEach((node) => {
		kane.addNode(node);
	});
	let response = {
		message: 'All the nodes are now connected. Kane contains following nodes: ',
		nodes: [ ...kane.nodes ]
	};
	return res.status(201).json(response);
});

const port = 3002;
app.listen(port, () => {
	console.log(`Server started on ${port}`);
});
