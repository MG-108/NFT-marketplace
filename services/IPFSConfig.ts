import { create as ipfsHttpClient } from 'ipfs-http-client';
import validateEnv from '../utils/validateEnv';

const projectId = validateEnv(
  'IPFS Project Id',
  process.env.NEXT_PUBLIC_IPFS_API_KEY
);

const projectSecret = validateEnv(
  'IPFS Project API secret key',
  process.env.NEXT_PUBLIC_IPFS_PROJECT_API_SECRET
);

const auth = `Basic ${Buffer.from(`${projectId}:${projectSecret}`).toString(
  'base64'
)}`;

// https://ipfs.infura.io:5001

export const client = ipfsHttpClient({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  headers: {
    authorization: auth,
  },
});
