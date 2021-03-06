# Crypto-Kane
This app can simulate Blockchain, built on a Peer to Peer distributed network.

# To get starget
Clone the repo.
### Connect Nodes
Open up 3 terminals and run the command: 
```
		node nodes/node1.js
		node nodes/node2.js
		node nodes/node3.js
```
in each of the terminals.

On Postman, send post request to 
* "http://localhost:3001/connect_nodes"
* "http://localhost:3002/connect_nodes"
* "http://localhost:3003/connect_nodes"
with JSON raw body data of:
```JavaScript
{
	"nodes": [ "http://localhost:3002/", "http://localhost:3003/" ]
}
```
```JavaScript
{
	"nodes": [ "http://localhost:3001/", "http://localhost:3003/" ]
}
```
```JavaScript
{
	"nodes": [ "http://localhost:3001/", "http://localhost:3002/" ]
}
```
respecticely.

Now that all three nodes on the P2P distributed network is connected,
you can send get request to the following endpoints:
### GET request endpoints
* "/mine_block" to mine Kane (my sudo cryptocurrency),
* "/get_chain" to see the info about the chain the current node is holding,
* "/replace_chain" to get in sync with the other node which holds the longest blockchain (pretending concensus). The app is going to send API request to all other nodes and adopts the longest chain of all.
	
You can send post request to the following endpoints:
### POST request endpoints
* "/add_transaction" with the following data to create a new transaction between people:
```JavaScript
{
	"sender": "sender's name",
	"receiver": "receiver's name",
	"amount": number
}
```
This transaction will then be added to the mempool.
	
## How to increase nodes
1. Duplicate any of the node files and name it node4.js, for example.
2. Change the port variable to a new number which is not taken already (e.g. 3004).
3. Open up a new terminal and run the command `node nodes/node4.js` (example).
4. Connect all the nodes following the connect nodes section above. (Don't for get to modify the JSON query appropriately)
