import Web3 from "web3";

const getWeb3 = () =>
  new Promise((resolve, reject) => {
    // Wait for loading completion to avoid race conditions with web3 injection timing.
    window.addEventListener("load", async () => {
      // Modern dapp browsers...
        /*const provider = new Web3.providers.websocket.WebsocketProvider(
          "http://127.0.0.1:7545"
        );
        const web3 = new Web3(provider);*/
        const web3 = new Web3("ws://127.0.0.1:7545")
        console.log("No web3 instance injected, using Local web3.");
        resolve(web3);
      
    });
  });

export default getWeb3;
