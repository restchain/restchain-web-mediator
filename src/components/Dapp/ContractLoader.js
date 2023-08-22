import React, {useEffect, useState} from 'react';
import {connect} from 'react-refetch';
import {Spin} from 'antd';
import getWeb3 from '@drizzle-utils/get-web3';
import UserView from './UserView';
import SubscribeAsOptional from './SubscribsAsOptional';
import BPMNModelProcessor from './interaction/BPMNModelProcessor';
import {ContractInfo} from './interaction/ContractInfo';
import {SmartContractCodeViewer} from './interaction/SmartContractCodeViewer';
import {RESTListner} from './interaction/RESTListner';

const ContractLoader = (props) => {
    const [state, setState] = useState({
        web3: null,
        accounts: null,
        contract: null,
        currentState: null,
    });
    const {modelFetch, refreshModel} = props;
    const [signature, setSignature] = React.useState();
    const [event, setEvent] = React.useState();
    const [callRESTMEthodEvent, setCallRESTMEthodEvent] = React.useState();

    useEffect(() => {
        const init = async () => {
            console.log(
                '[ContractLoader] init ')
            if (modelFetch.fulfilled)
                try {
                    const web3 = await getWeb3();
                    console.log(
                        '[ContractLoader] gasLimit: ' +
                        web3.eth.getBlock('latest').gasLimit,
                    );
                    console.log(
                        '[ContractLoader] modelFetch.value.address ',
                        modelFetch.value.address,
                    );
                    const accounts = await web3.eth.getAccounts();
                    const contract = new web3.eth.Contract(
                        JSON.parse(modelFetch.value.abi),
                        modelFetch.value.address,
                        // accounts[0]
                    );
                    setState({web3, accounts, contract});

                    eventListener(contract);
                } catch (error) {
                    alert(
                        `Failed to load web3, accounts, or contract.
          Check console for details.`,
                    );
                    console.error(error);
                }
        };

        const eventListener = async (contract) => {
            console.log(
                '[ContractLoader] listening events fromBlock: \'latest\' ..... ')
            contract &&
            contract.events.allEvents(
                {
                    fromBlock: 'latest',
                },
                function (error, event) {
                    if (error) alert('error while subscribing to event');
                    if (event) {
                        setEvent(event);
                        console.log('[ContractLoader] - Event :  ', event.event, event.returnValues);
                        if (event.event === 'stateChanged') {
                            // setEventSign(event.signature);
                            // console.log("[STATECHANGE] event", JSON.stringify(event, null, 2))
                        }
                        if (event.event === 'callRESTMethod') {
                            // console.log("[callRESTMethod] event", JSON.stringify(event, null, 2))
                            setSignature(event.signature);
                            // restCaller(event.returnValues);
                            // setEventSign(event.signature);
                            setCallRESTMEthodEvent(event);
                            // setRestMethod(event.returnValues);
                        }
                    }
                },
            );
        };

        init();
    }, [modelFetch.fulfilled]);

    if (modelFetch.pending) {
        return <Spin/>;
    } else if (modelFetch.rejected) {
        return <div>{modelFetch.reason}</div>;
    } else if (modelFetch.fulfilled) {
        return (
            <div>
                <UserView accounts={state.accounts}/>
                <SubscribeAsOptional {...state} />
                <ContractInfo {...modelFetch.value} />
                <BPMNModelProcessor {...modelFetch.value} {...state} event={event}/>
                <RESTListner
                    {...modelFetch.value}
                    {...state}
                    signature={signature}
                    event={callRESTMEthodEvent}
                />
                <SmartContractCodeViewer {...modelFetch.value} />
            </div>
        );
    }
};

export default connect((props) => {
    const url = '/api2/contract/' + props.match.params.id;
    return {
        modelFetch: url,
        refreshModel: () => ({
            modelFetch: {
                url,
                force: true,
                refreshing: true,
            },
        }),
    };
})(ContractLoader);
