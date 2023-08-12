import {mumbai_net, restchainABI, signerPrivateKey} from "./const";

const Web3 = require("web3");

/**
 * Firma la transazione senza l'utilizzo di Metamask
 * @param contractAddress
 * @param methodToCall
 * @param inputs
 * @returns {Promise<<>>}
 */
export async function signTransaction(contractAddress, methodToCall, inputs) {
    console.log("[signTransaction] contractAddress", contractAddress)
    console.log("[signTransaction] methodToCall", methodToCall)
    console.log("[signTransaction] inputs", inputs)

    const web3 = new Web3(mumbai_net)

    const contract = new web3.eth.Contract(restchainABI, contractAddress);
    if (inputs && inputs.length > 0) {
        const encodedABI = contract.methods[methodToCall](inputs[0]).encodeABI();
        const firstCall = await web3.eth.accounts.signTransaction({
            to: contractAddress,
            gas: 200000,
            data: encodedABI
        }, signerPrivateKey)
        return web3.eth.sendSignedTransaction(firstCall.rawTransaction)
    } else {
        const encodedABI = contract.methods[methodToCall]().encodeABI();
        const firstCall = await web3.eth.accounts.signTransaction({
            to: contractAddress,
            gas: 200000,
            data: encodedABI
        }, signerPrivateKey)
        return web3.eth.sendSignedTransaction(firstCall.rawTransaction)
    }
}


