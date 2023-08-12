import axios from 'axios';
import { ipfsMini } from '../../ipfs';

const ipfsUrl = 'http://127.0.0.1:5001';

export const ipfsRead = async (id) => {
  return axios.post(`${ipfsUrl}/api/v0/cat/${id}`);
};

export const ipfsAdd = async (data) => {
  return ipfsMini.add(data);
};

export async function createIpfsResponse(data) {
  const buffer = Buffer.from(JSON.stringify(data));
  try {
    return await ipfsAdd(buffer);
  } catch (err) {
    console.error('createIpfsResponse error:', JSON.stringify(err));
  }
}

export async function ipfsAddWithLog(data, text) {
  const buffer = Buffer.from(JSON.stringify(data));
  const startTime = new Date();
  try {
    const resp = await ipfsAdd(buffer);
    const endTime = new Date();
    console.log(`[IPFS ADD] (${text}) - ElapsedTime: ${endTime - startTime} `);
    return resp;
  } catch (err) {
    console.error('createIpfsResponse error:', JSON.stringify(err));
  }
}

/**
 * usage
 *
 * ipfsRead('QmSYGqnyPGnf5i7Kx9qLAv7yBLRdqEssorRNT1Egn6p6LR').then((r)=>console.log("AA",r.data))
 *
 * const r = ipfsRead('QmS3C8QyxtJZSrzqU73LRDuqwAZYhZ51n257cTwhj3KTN8')
 * console.log("BB",(await r).data)
 * const add = ipfs("questa è una prova ")
 * console.log("CC",(await add))
 */
