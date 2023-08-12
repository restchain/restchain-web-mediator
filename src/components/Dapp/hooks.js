// import {useEffect, useState} from "react";
// import * as _ from "lodash";
// import axios from "axios";
// import {message, notification} from "antd";
// import {ipfsMini} from "../../ipfs";
// import {signTransaction} from "./signTransaction";
//
//
// /***
//  * Listen to events (stateChanged,callRESTMethod)
//  *
//  *
//  * @returns {{eventSign: undefined, invokeRest: undefined}}
//  */
// export function useListenEvents(contract, signature) {
//     const [eventSignature, setEventSign] = useState();
//     const [event, setEvent] = useState();
//     const [restMethod, setRestMethod] = useState();
//     useEffect(() => {
//         contract && contract.events.allEvents({
//             fromBlock: 'latest',
//         }, function (error, event) {
//
//
//             if (error)
//                 alert("error while subscribing to event")
//             if (event) {
//                 console.debug("[Event] - ", event.event, event.returnValues)
//                 if (event.event === "stateChanged") {
//                     setEventSign(event.signature);
//                     setEvent(event);
//                 }
//                 if (event.event === "callRESTMethod") {
//                     setEventSign(event.signature);
//                     setEvent(event);
//                     setRestMethod(event.returnValues);
//                 }
//             }
//         })
//     }, [contract, signature]);
//
//
//     return {eventSignature, restMethod, event}
// }
//
//
// /***
//  * handle the rest calls from the e request to the response
//  *
//  *
//  * @param accounts
//  * @param contract
//  * @param restInfo
//  * @returns {{restReturnValue: unknown, callbackReturnValue: unknown}}
//  */
//
//
// export function useRest(web3, accounts, contract, restInfo) {
//     const [restReturnValue, setRestReturnValue] = useState(null);
//     const [callbackReturnValue, setCallbackReturnValue] = useState(null);
//     const [{cid, loading, content: ipfsContent}, doCat, doAdd] = useIpfsCmd();
//     console.log("WEB3 ", web3)
//
//
//     const handleRestInfo = async () => {
//         // console.log("props.invokeRest ", restInfo)
//         // console.log("_.keys(restInfo) ", _.keys(restInfo))
//         // console.log("_.keys(restInfo).filter((k) => k.includes(\"endpoint\"))", _.keys(restInfo).filter((k) => k.includes("endpoint")))
//
//         // DA CAMBIARE QUANDO SI MODIFICHERA LA VOCE endpoint con qualcosa relativo a ipfs
//         let restEndpointKey = _.keys(restInfo).filter((k) => k.includes("endpoint"))[0];
//         // console.log("restEndpoint ", restEndpointKey);
//         restEndpointKey = restInfo && restInfo['restApiUri'];
//         // console.log("restEndpoint ", restEndpointKey);
//
//
//         // Se restApiUri allora leggi il contenuto dell'IPFS
//         if (restEndpointKey) {
//             console.log("this.restEndpointKey ", restEndpointKey)
//             console.log("call doCAt")
//             doCat(restEndpointKey); // permette all'hook ipfs di leggere il contenuto del IPFS
//             console.log("end doCAt")
//
//         }
//
//     }
//
//     //Invoke a Rest call
//     useEffect(
//         () => {
//             console.log("REST REST REST",)
//             handleRestInfo();
//         }
//         , [restInfo]
//     )
//
//     const clear = () => {
//         setRestReturnValue();
//         setCallbackReturnValue();
//     }
//
//     const callRestWithMethod = async () => {
//         console.log(" ipfsContent", JSON.stringify(ipfsContent));
//         // const restDetail = JSON.parse(ipfsContent);
//         // console.log(" restDetail", restDetail);
//
//         const callDefinition = {
//             method: ipfsContent?.method,
//             url: ipfsContent?.url,
//             params: ipfsContent?.params,
//             data: ipfsContent?.data,
//         }
//         axios(callDefinition)
//             .then((resp) => {
//                 clear();
//                 setRestReturnValue(resp.data)
//                 console.log("[callRestWithMethod] REST API RESULT:", resp.data)
//                 console.log("[callRestWithMethod] LOG this  ", restReturnValue)
//                 console.log("[callRestWithMethod] restInfo  ", restInfo)
//                 message.success('Endpoint ' + ipfsContent.url + ' successfully called ', 10);
//                 if (resp.data && restInfo.fnType === 'oneway') {
//                     callContractCallbackOneway(restInfo, resp.data)
//                 } else if (resp.data && restInfo.fnType === 'twoway') {
//                     // controlla che l'account designato per il rientro in blockchain sia corretto
//                     if (accounts[0] === restInfo.id) {
//                         callContractCallbackTwoway(restInfo, resp.data)
//                     } else {
//                         console.log(" ** Drop REST CALL because account not allowed ** - account:", accounts[0])
//                     }
//                 }
//             });
//     }
//
//
//     //Invoke a Rest call
//     useEffect(
//         () => {
//             // Se cè contenuto IPFS allora invoca il REST dopo aver aperto il contenuto
//             if (ipfsContent) {
//                 console.log("DEntro useEffect ipfsContent ", ipfsContent)
//                 callRestWithMethod();
//             }
//         }
//         , [ipfsContent]
//     )
//
//     const callContractCallbackOneway = async (rest, apiResult) => {
//
//         console.log("REST CALL [OneWay]", rest, apiResult)
//         if (apiResult && rest && rest['callbackFn']) {
//             const startTime = new Date();
//             const method = `${rest['callbackFn']}`
//             console.log("** [TIME RESP (" + method + ") ] (OneWay):", startTime);
//
//             // contract.methods[`${method}`]().send({
//             //     // contract.methods.sid_00e1b46c_e485_4551_a17b_6f0c3f21ec2c('car').send({
//             //     from: accounts[0]
//             // })
//             signTransaction(contract._address, method, undefined).then((result) => {
//                 const endTime = new Date();
//                 console.log("** [TIME RESP (" + method + "))] (OneWay):", endTime);
//                 console.log("** [TIME RESP (" + method + ")] (OneWay) - ElapsedTime  ", endTime - startTime);
//                 setCallbackReturnValue(result);
//             }).catch(function (err, jj) {
//
//                 console.error("REST CALL [OneWay] err", JSON.stringify(err, null, 2))
//
//                 notification['error']({
//                     message: 'Transaction error' + jj,
//                     description: JSON.stringify(err)
//                     ,
//                 });
//             })
//         }
//     }
//
//     const callContractCallbackTwoway = async (rest, apiResult) => {
//         console.log("REST CALL [TwoWay]", rest, apiResult)
//         if (apiResult && rest && rest['callbackFn']) {
//             const method = `${rest['callbackFn']}`
//             const startTime = new Date();
//             console.log("** [TIME RESP (" + method + ")]:", startTime);
//             ipfsMini.add(JSON.stringify(apiResult)).then((resp) => {
//                 // contract.methods[`${method}`](resp).send({
//                 //     // contract.methods.sid_00e1b46c_e485_4551_a17b_6f0c3f21ec2c('car').send({
//                 //     from: accounts[0],
//                 // })
//                 // signTransaction(contract._address, method, resp)
//                     .then((result) => {
//                         const endTime = new Date();
//                         console.log("** [TIME RESP (" + method + ")] (TwoWay):", endTime);
//                         console.log("** [TIME RESP (" + method + ")] (TwoWay) - ElapsedTime :", endTime - startTime);
//                         setCallbackReturnValue(result);
//                     }).catch(function (err, jj) {
//                     console.error("REST CALL [TwoWay] err", JSON.stringify(err, null, 2))
//
//                     notification['error']({
//                         message: 'Transaction error' + jj,
//                         description: JSON.stringify(err)
//                         ,
//                     })
//                 })
//             })
//         }
//     }
// //
// // //Invoke a Contract callback
// // useEffect(() => {
// //         console.log("LOG this  ", restReturnValue)
// //         if (restReturnValue && restInfo.fnType === 'oneway') {
// //             callContractCallbackOneway(restInfo, restReturnValue)
// //         } else if (restReturnValue && restInfo.fnType === 'twoway') {
// //             callContractCallbackTwoway(restInfo, restReturnValue)
// //         }
// //     },
// //     [restReturnValue]
// // )
//
//     return {restReturnValue, callbackReturnValue, clear}
// }
//
//
// export function useIpfsCall(id) {
//     const [res, setRes] = useState();
//     useEffect(() => {
//         const startTime = new Date();
//
//         console.log(` ** [TIME Reading IPFS] cid: ${id}, startTime: ${startTime}`)
//         console.log("useIpfsCall cat", id)
//         id && axios.post("http://127.0.0.1:5001/api/v0/cat/" + id).then(
//             (resp) => {
//                 if (resp) {
//                     const endTime = new Date();
//
//                     console.log(` ** [TIME Reading IPFS] cid: ${id}, endTime: ${endTime}`);
//                     console.log(` ** [TIME Reading IPFS] cid: ${id}, elapsedTime: ${endTime - startTime}`);
//                     // console.log("useIpfsCall", JSON.stringify(resp))
//                     setRes(resp.data)
//                 }
//             }
//         )
//     }, [id])
//     return res;
// }
//
//
// /***
//  * Hook per creare o aprire un pacchetto IPFS
//  * @returns {({loading: boolean, content: undefined, cid: undefined}|((value: (((prevState: undefined) => undefined) | undefined)) => void))[]}
//  */
// export function useIpfsCmd() {
//     const [cid, setCid] = useState();
//     const [data, setData] = useState();
//     const [content, setContent] = useState();
//     const [loading, setLoading] = useState(false);
//     console.log("Into useIpfsCmd cid:",cid)
//
//     useEffect(() => {
//         console.log("[useIpfsCmd]: primo",data)
//
//         if (data) {
//             setLoading(true);
//             const startTime = new Date();
//
//             console.log(` ** [TIME creating IPFS] startTime: ${startTime}`)
//             ipfsMini.add(JSON.stringify(data)).then((resp) => {
//                     const endTime = new Date();
//
//                     console.log(` ** [TIME creating IPFS]  endTime: ${endTime}`);
//                     console.log(` ** [TIME creating IPFS]  elapsedTime: ${endTime - startTime}`);
//                     setCid(resp);
//                     setLoading(false);
//                 }
//             )
//         }
//     }, [data])
//
//
//     useEffect(() => {
//         console.log("[DoCAt] cid", cid)
//         if (cid) {
//             setLoading(true)
//             const startTime = new Date();
//             console.log(` ** [TIME Reading IPFS] cid: ${cid}, startTime: ${startTime}`)
//             console.log("useEffect useIpfsCall cat", cid)
//             axios.post("http://127.0.0.1:5001/api/v0/cat/" + cid).then((resp) => {
//                     const endTime = new Date();
//                     console.log(` ** [TIME Reading IPFS] cid: ${cid}, endTime: ${endTime}`);
//                     console.log(` ** [TIME Reading IPFS] cid: ${cid}, elapsedTime: ${endTime - startTime}`);
//                     console.log("[DoCAt] data", resp.data)
//
//                     setContent(resp.data);
//                     setLoading(false);
//                 }
//             )
//         }
//     }, [cid]);
//
//     console.log("[useIpfsCmd]: all",{cid, loading, content}, setCid, setData)
//
//     return [{cid, loading, content}, setCid, setData]
// }
//
//
//
