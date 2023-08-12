import {Button, Input, Select, Spin} from "antd";
import React, {useState} from "react";
import {isEmpty} from "lodash";
import {ipfsAdd} from "../ipfsClient";

const {TextArea} = Input;

export function IPFSForm({onOk}) {
    const [paramsValue, setParamsValue] = useState({});
    const [dataValue, setDataValue] = useState({});
    const [urlValue, setUrlValue] = useState();
    const [methodValue, setMethodValue] = useState();
    const [loading, setLoading] = useState(false);
    const [cid, setCid] = useState(false);
    const [res, setRes] = useState(false);


    const handleAdd = () => {
        //console.log("method ", methodValue)
        setLoading(true)
        const value = {
            url: urlValue,
            method: methodValue,
            params: !isEmpty(paramsValue) ? JSON.parse(paramsValue) : {},
            // data: dataValue ? JSON.parse(dataValue) : undefined,
        }
        const buffer = Buffer.from(JSON.stringify(value))
        ipfsAdd(buffer).then((response) => {
            setRes(JSON.stringify(value))
            setCid(response)
            setLoading(false);
            onOk(response);
        })
    };

    const handleCancel = () => {
        setParamsValue(undefined);
        setDataValue(undefined);
        setMethodValue(undefined);
        setUrlValue(undefined);
        setLoading(false);
        setCid(undefined);
        setRes(undefined);
        // onCancel();
    }


    return <div>
        {
            !loading && !cid &&
            <><h3>Content</h3>
                <div><strong>Url:</strong></div>
                <Input
                    placeholder={'http://resturi.api'}
                    onChange={(e) => setUrlValue(e.target.value)}
                />
                <div><strong>Method:</strong></div>
                <Select onChange={(v) => setMethodValue(v)}>
                    <Select.Option value={'get'}>GET</Select.Option>
                    <Select.Option value={'post'}>POST</Select.Option>
                    <Select.Option value={'put'}>PUT</Select.Option>
                    <Select.Option value={'delete'}>DELETE</Select.Option>
                </Select>
                <div><strong>Params:</strong></div>
                <TextArea
                    rows={5}
                    placeholder={'{ "para1": "string_value", "para2" : number_value, "para3": { "p1" : "string_value" }'}
                    onChange={(e) => setParamsValue(e.target.value)}
                />
                {(methodValue === 'post' || methodValue === 'put') &&
                    <>
                        <div><strong>Data (POST, PUT):</strong></div>
                        <TextArea
                            rows={5}
                            placeholder={'{ "para1": "string_value", "para2" : number_value, "para3": { "p1" : "string_value" }'}
                            onChange={(e) => setDataValue(e.target.value)}
                        />
                    </>
                }
                <div style={{marginTop: '5px', textAlign: "center"}}>
                    <Button onClick={() => handleAdd()} type={"primary"}>Create IPFS</Button>
                </div>
            </>
        }

        {
            cid && <div>
                <strong>cid:</strong>{cid}
                <div>{res}</div>
            </div>
        }
        {
            loading && <Spin>Creating IPFS......</Spin>
        }
    </div>
}































