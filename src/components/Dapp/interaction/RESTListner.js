import React, { useState } from 'react';
import { Card } from 'antd';
import { createIpfsResponse, ipfsAdd, ipfsRead } from '../ipfsClient';
import axios from 'axios';
import { signTransaction } from '../signTransaction';

function buildRestAxiosConfig(restApiUriContent) {
  console.log('[buildRestAxiosConfig]', restApiUriContent);
  return {
    method: restApiUriContent?.method,
    url: restApiUriContent?.url,
    params: restApiUriContent?.params,
    data: restApiUriContent?.data,
  };
}

const getRestApiUriContent = async (ipfsId) => {
  try {
    return await ipfsRead(ipfsId);
  } catch (err) {
    console.error('getApiUriContent error:', JSON.stringify(err));
  }
};

async function getRestResponse(axiosConfig) {
  try {
    return await axios(axiosConfig);
  } catch (err) {
    console.error('getApiUriContent error:', JSON.stringify(err));
  }
}

export function RESTListner(props) {
  const [restApiUriContent, setRestApiUriContent] = useState();
  const [response, setResponse] = useState();

  React.useEffect(() => {
    // Estrarre returnValues (che contiene le informazioni, per invocare il REST, capire se  è onway|twoway, e sapere il metodo con cui rientrare nella blockchain )
    // Estrarre restApiUri da returnValues e decodificare il contenuto per costruire axiosConfig
    // Invocare AxiosConfig (quindi chiamare l'URL che era specificato nel messaggio blockchain )  e recuperare la Response
    // Creare IPFS con il contenuto delle Response
    // Inviare la risposta alla blockchain differenziando comportamento se oneway o twoway

    const handleRestchainCallback = async (
      _restChainCallParams,
      _contractAddress,
    ) => {
      const _restApiUriContent = await getRestApiUriContent(
        _restChainCallParams?.restApiUri,
      );
      setRestApiUriContent(_restApiUriContent.data);
      const _axiosConfig = buildRestAxiosConfig(_restApiUriContent.data);
      const _restResponse = await getRestResponse(_axiosConfig);
      setResponse(_restResponse.data);
      let _restCallResponseIpfs = undefined;

      if (returnValues?.fnType === 'twoway') {
        const ipfsRestResponse = await createIpfsResponse(_restResponse.data);
        _restCallResponseIpfs = [ipfsRestResponse];
      }
      // Se oneway non esiste ipfs quindi viene passato undefined altrimenti si calcola
      signTransaction(
        _contractAddress,
        returnValues.callbackFn,
        _restCallResponseIpfs,
      );
    };

    console.log(
      '[REST Listner] callRESTMethod',
      JSON.stringify(props.event, null, 2),
    );
    const returnValues = props?.event?.returnValues;

    if (returnValues) {
      handleRestchainCallback(returnValues, props.event.address);
    }
  }, [props.event]);

  return (
    <div
      style={{
        paddingLeft: '10%',
        paddingRight: '10%',
        marginTop: 20,
        marginBottom: 20,
      }}
    >
      <Card title="Last REST call">
        <p>
          <div>
            <div>RetVal:{JSON.stringify(restApiUriContent)}</div>
            <b>Response:</b> {JSON.stringify(JSON.stringify(response))}
          </div>
        </p>
      </Card>
    </div>
  );
}

/**
 * [REST Listner] listen {
 *   "address": "0x0E98Be0B99340b805F801EF204B5C3e2829a939C",
 *   "blockHash": "0x73c0cfbae69ee3e127480e2d54d26f29e74cc6117c2ad21480403803796e6824",
 *   "blockNumber": 38891904,
 *   "logIndex": 21,
 *   "removed": false,
 *   "transactionHash": "0xc3528b83c9e8f46503afcc690ab4467af728afa4753aecbe9f571f93e30c06ec",
 *   "transactionIndex": 5,
 *   "id": "log_5fc4d4fd",
 *   "returnValues": {
 *     "0": "0x535CCa8697F29DaC037a734D6984eeD7EA943A85",
 *     "1": "Message_0b4l2zh_resp",
 *     "2": "QmS3C8QyxtJZSrzqU73LRDuqwAZYhZ51n257cTwhj3KTN8",
 *     "3": "oneway",
 *     "id": "0x535CCa8697F29DaC037a734D6984eeD7EA943A85",
 *     "callbackFn": "Message_0b4l2zh_resp",
 *     "restApiUri": "QmS3C8QyxtJZSrzqU73LRDuqwAZYhZ51n257cTwhj3KTN8",
 *     "fnType": "oneway"
 *   },
 *   "event": "callRESTMethod",
 *   "signature": "0x90ff5938c230c6780245540f8011639c00804727f44fdd01c26684a26b08f90b",
 *   "raw": {
 *     "data": "0x000000000000000000000000535cca8697f29dac037a734d6984eed7ea943a85000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000c0000000000000000000000000000000000000000000000000000000000000012000000000000000000000000000000000000000000000000000000000000000144d6573736167655f3062346c327a685f72657370000000000000000000000000000000000000000000000000000000000000000000000000000000000000002e516d53334338517978744a5a53727a715537334c5244757177415a59685a35316e323537635477686a334b544e3800000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000066f6e657761790000000000000000000000000000000000000000000000000000",
 *     "topics": [
 *       "0x90ff5938c230c6780245540f8011639c00804727f44fdd01c26684a26b08f90b"
 *     ]
 *   }
 * }
 */
