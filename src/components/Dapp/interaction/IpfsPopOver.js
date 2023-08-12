import {useIpfsCall} from "../hooks";
import {Icon, Popover, Tag} from "antd";
import React, {useEffect, useState} from "react";
import JSONPretty from "react-json-pretty";
import {ipfsRead} from "../ipfsClient";

export function IpfsPopover(id) {
    const [ipfsContent, setIpfsContent] = useState();
    useEffect(() => {
            async function getIpfs(id) {
                const resp = await ipfsRead(id).catch((e) => console.error(JSON.stringify(e)))
                if (resp && resp.data) {
                    setIpfsContent(resp.data)
                }
            }
            if (!!id) {
                getIpfs(id)
            }
        },
        [id]
    )

    return (
        <Popover
            content={Content(ipfsContent)}
            title={<><Icon type={'interaction'}/>{`  IPFS #${id}`}</>}
            trigger="hover">
            {id && <Tag color={'cyan'}>Ipfs</Tag>}
        </Popover>
    )
}


function isIpfs(str) {
    return str.includes("_rcid") || str.includes("_rcbkid")
}


const Content = (ipfsContent) => (
    <div style={{width: '400px', wordWrap: "break-word"}}>
        <JSONPretty id="json-pretty" data={ipfsContent}/>
    </div>
)