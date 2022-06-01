import sample from 'lodash/sample'

// Array of available nodes to connect to
export const nodes = [process.env.REACT_APP_NODE_1, process.env.REACT_APP_NODE_2, process.env.REACT_APP_NODE_3]
const allNodes = JSON.parse(
  '{"1":["https://speedy-nodes-nyc.moralis.io/fbb4b2b82993bf507eaaab13/eth/mainnet"], "4":["https://speedy-nodes-nyc.moralis.io/fbb4b2b82993bf507eaaab13/eth/rinkeby"], "56":["https://speedy-nodes-nyc.moralis.io/fbb4b2b82993bf507eaaab13/bsc/mainnet","https://speedy-nodes-nyc.moralis.io/fbb4b2b82993bf507eaaab13/bsc/mainnet","https://speedy-nodes-nyc.moralis.io/fbb4b2b82993bf507eaaab13/bsc/mainnet"],"97":["https://speedy-nodes-nyc.moralis.io/480f9fd047ed15e4229e4547/bsc/testnet/archive","https://speedy-nodes-nyc.moralis.io/480f9fd047ed15e4229e4547/bsc/testnet/archive","https://speedy-nodes-nyc.moralis.io/480f9fd047ed15e4229e4547/bsc/testnet/archive"]}',
)

export const getNodeUrl = (chainId = 56) => {
  return sample(allNodes[chainId])
}
export const getRpcUrl = () => {
  return sample(nodes)
}
const wssNodes = [process.env.REACT_APP_WSS_NODE_1]

export const getWssUrl = () => {
  return sample(wssNodes)
}

export default getNodeUrl
