import React, {useEffect, useState} from "react";
import {BpmnViewer} from "../BpmnViewer";
import {ProcessCurrentState} from "./ProcessCurrentState";
import {CurrentStateViewer} from "./CurrentStateViewer";

/***
 *
 * @param props
 * @returns {*}
 * @constructor
 */
export const BPMNModelProcessor = (props) => {

    const [state, setState] = useState({currentState: null});

    useEffect(
        () => {
            runCurrentState();
        }
        , [props.currentState, props.event]
    )

    const runCurrentState = async () => {
        console.log("[BPMNModelProcessor] called runCurrentState")
        if (props.contract) {
            //Calls the currentState method from the smart contract and then set the result as state
            props.contract.methods.getCurrentState().call()
                .then((result) => {
                    setState({
                        currentState: result
                    });
                    console.log("[BPMNModelProcessor] currentState",JSON.stringify(result))
                }).catch(function (err) {
            });

        }

    }
    return <div>
        <BpmnViewer xmlId={props.xmlId} readOnly={true}>
            <div style={{display: 'flex', flexWrap: 'nowrap', padding: '20px'}}>
                <CurrentStateViewer {...state} reload={runCurrentState}/>
                <div style={{display: 'flex', justifyContent: 'space-evenly', width: '100%', marginTop: '40px'}}>
                    <ProcessCurrentState {...state} {...props} callBack={runCurrentState}/>
                </div>
            </div>
        </BpmnViewer>
    </div>
}

export default BPMNModelProcessor;