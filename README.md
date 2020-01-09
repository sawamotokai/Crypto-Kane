# General-Block-Chain
# Crypto-Kane

This app can simulate Blockchain, built on a Peer to Peer distributed network.

# To get starget
Clone the repo.

Open up 3 terminals and run the command: 
```
		node nodes/node1.js
		node nodes/node2.js
		node nodes/node3.js
		```
in each of the terminals.

On Postman, send post request to 
1. "http://localhost:3001/connect_nodes"
2. "http://localhost:3002/connect_nodes"
3. "http://localhost:3003/connect_nodes"
with JSON raw body data of:
```
{
	"nodes": [ "http://localhost:3002/", "http://localhost:3003/" ]
}
,
{
	"nodes": [ "http://localhost:3001/", "http://localhost:3003/" ]
} and 
{
	"nodes": [ "http://localhost:3001/", "http://localhost:3002/" ]
}
```
respecticely.

Now that all three nodes on the P2P distributed network is connected,
you can send get request to the following endpoints:
	"/mine_block" to mine Kane (my sudo cryptocurrency),\\
	"/get_chain" to see the info about the chain the current node is holding,\\
	"/replace_chain" to get in sync with the other node which holds the longest blockchain (pretending concensus). The app is going to send API request to all other nodes and adopts the longest chain of all.
	
You can send post request to the following endpoints:
	"/add_transaction" with the following data to create a new transaction between people: 
	{
		"sender": "sender's name",
		"receiver": "receiver's name",
		"amount": amount (int)
	}
	This transaction will then be added to the mempool.
	
