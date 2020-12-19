import Web3 from "web3";

const getWeb3 = () =>
  new Promise((resolve) => {
    // Wait for loading completion to avoid race conditions with web3 injection timing.
    window.addEventListener("load", async () => {
      const web3 = new Web3("ws://127.0.0.1:7545")
      console.log("No web3 instance injected, using Local web3.");
      resolve(web3);
      }
    );
  });

export default getWeb3;
