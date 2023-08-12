import { mumbai_net, restchainABI, signerPrivateKey } from './const';

const Web3 = require('web3');

/**
 * Firma la transazione senza l'utilizzo di Metamask
 * @param contractAddress
 * @param methodToCall
 * @param inputs
 * @returns {Promise<<>>}
 */
export async function signTransaction(contractAddress, methodToCall, inputs) {
  // console.log('[signTransaction] contractAddress', contractAddress);
  // console.log('[signTransaction] methodToCall', methodToCall);
  // console.log('[signTransaction] inputs', inputs);
  const startTime = new Date();

  const web3 = new Web3(mumbai_net);

  const contract = new web3.eth.Contract(restchainABI, contractAddress);
  let encodedABI;
  if (inputs && inputs.length > 0) {
    encodedABI = contract.methods[methodToCall](inputs[0]).encodeABI();
  } else {
    encodedABI = contract.methods[methodToCall]().encodeABI();
  }
  const firstCall = await web3.eth.accounts.signTransaction(
    {
      to: contractAddress,
      gas: 200000,
      data: encodedABI,
    },
    signerPrivateKey,
  );
  const sendTr = await web3.eth.sendSignedTransaction(firstCall.rawTransaction);
  const endTime = new Date();
  console.log(
    `[SIGN TRANSACTION] - (${methodToCall}) elapsedTime`,
    endTime - startTime,
  );
  return sendTr;
}
