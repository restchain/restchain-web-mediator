// import ipfsApi from 'ipfs-http-client'

import IpfsApiMini from 'ipfs-mini';

// export const ipfsMini = new ipfsApiMini({ host: '127.0.0.1', port: 5001, protocol: 'http',base: '/api/v0'  });

/*
 * When new ipfsApiMini it's call without
 * arguments it will be initialized with the default parameters
 *
 * default { host: '127.0.0.1', port: 5001, protocol: 'http',base: '/api/v0'  }
 *
 */
export const ipfsMini = new IpfsApiMini();

// connection to local IPFS daemon
// export const IPFS  = ipfsApi('/ip4/127.0.0.1/tcp/5001');