const Web3 = require("web3");
// Dai Stablecoin ABI
const abi = require("./abi.json");
const INFURA_URL =
  "wss://mainnet.infura.io/ws/v3/7f80eb3375b24926838e29507ee8eb87";

const web3 = new Web3(new Web3.providers.WebsocketProvider(INFURA_URL));

// Address of Dai Stablecoin
const address = "0x6B175474E89094C44Da98b954EedeAC495271d0F";

async function main() {
  
  //Subscribe to an event
  const contract = new web3.eth.Contract(abi, address);
  console.log("Subscribe to Transfer event");
  contract.events.Transfer(
    {
        //filter by sender
        filter : {src : "0x60594a405d53811d3BC4766596EFD80fd545A270"}
    },
    (error,log) =>{
        if(error){
            console.log("Error : ", error);
        }
        console.log("log : ",log);
    }
  );
}

main();