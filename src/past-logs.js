const Web3 = require("web3");
// Dai Stablecoin ABI
const abi = require("./abi.json");
const INFURA_URL =
  "https://mainnet.infura.io/v3/7f80eb3375b24926838e29507ee8eb87";

const web3 = new Web3(INFURA_URL);

// Address of Dai Stablecoin
const address = "0x6B175474E89094C44Da98b954EedeAC495271d0F";

async function main() {
  const latest = await web3.eth.getBlockNumber();

  console.log("Latest block:", latest);

  const contract = new web3.eth.Contract(abi, address);

  const logs = await contract.getPastEvents("Transfer", {
    fromBlock: latest - 100,
    toBlock: latest,
    // filter by sender
    // filter: { src: "0x526af336D614adE5cc252A407062B8861aF998F5" }

    // filter by receiver
    filter: { dst: "0xf8b721bFf6Bf7095a0E10791cE8f998baa254Fd0" }
  });

   console.log("Logs", logs, `${logs.length} logs`);

  // Print senders
  console.log(
    "Senders",
    logs.map(log => log.returnValues.src),
    `${logs.length} logs`
  );

  // Print receiver
  console.log(
    "Receivers",
    logs.map(log => log.returnValues.dst),
    `${logs.length} logs`
  );

  
}

main();