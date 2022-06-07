///////////////////////////////////////NEAR
const run = async() => {
  
  const { connect, KeyPair, keyStores, WalletConnection, utils, providers  } = require("near-api-js");
  const { parseSeedPhrase }= require("near-seed-phrase")
  const { secretKey, publicKey } = parseSeedPhrase('elephant uniform cup boil boat toilet enlist fiber large exhibit ugly switch')
  

  const keyPair = KeyPair.fromString(secretKey);
  const keyStore = new keyStores.InMemoryKeyStore();
  
  let accountIDBase = utils.PublicKey.fromString(publicKey).data.toString("hex") //base account id
  console.log(accountIDBase)
  // await keyStore.setKey('testnet', accountIDBase, keyPair)
  // const config = {
  //   networkId: "testnet",
  //   keyStore,
  //   nodeUrl: "https://rpc.testnet.near.org",
  //   walletUrl: "https://wallet.testnet.near.org",
  //   helperUrl: "https://helper.testnet.near.org",
  //   explorerUrl: "https://explorer.testnet.near.org",
  // };
  // const provider = new providers.JsonRpcProvider("https://rpc.testnet.near.org")
  // provider.query({

  // })
  // // const config = {
  // //   networkId: "mainnet",
  // //   keyStore,
  // //   nodeUrl: "https://rpc.mainnet.near.org",
  // //   walletUrl: "https://wallet.mainnet.near.org",
  // //   helperUrl: "https://helper.mainnet.near.org",
  // //   explorerUrl: "https://explorer.mainnet.near.org",
  // // };
  // const near = await connect(config);
  // const account = await near.account(accountIDBase)
  // const create =  await near.createAccount("convoito1.testnet", publicKey)
  // console.log(create)
  //Create new account if having NEAR
  //const create = await near.createAccount("1233dichoidd.testnet", publicKey)
  // console.log(create)


  // await account.sendMoney(
  //   "569abc5cf748dd6dccc49718c705aa73736048de8a0137b09f703f27baf88e09",
  //   "19199999999999999999999999"
  // );


  //get balance in any situations
  //const balance = await account.getAccountBalance()
  //console.log(balance)

}
run()
async function sendNear(amount, receiver){

  const { connect, KeyPair, keyStores, WalletConnection, utils  } = require("near-api-js");
  const { parseSeedPhrase }= require("near-seed-phrase")
  const { secretKey, publicKey } = parseSeedPhrase('elephant uniform cup boil boat toilet enlist fiber large exhibit ugly switch')
  const keyPair = KeyPair.fromString(secretKey);
  const keyStore = new keyStores.InMemoryKeyStore();
  let accountIDBase = utils.PublicKey.fromString(publicKey).data.toString("hex") //base account id
  //accountIDBase = "convoito1.testnet"
  await keyStore.setKey('testnet', accountIDBase, keyPair)
  const config = {
    networkId: "testnet",
    keyStore,
    nodeUrl: "https://rpc.testnet.near.org",
    walletUrl: "https://wallet.testnet.near.org",
    helperUrl: "https://helper.testnet.near.org",
    explorerUrl: "https://explorer.testnet.near.org",
  };
  const near = await connect(config);
  const account = await near.account(accountIDBase)
  await account.sendMoney(
    receiver,
    utils.format.parseNearAmount(amount)
  );
}
sendNear("1", "12dbfabcdbbb3b452e6f78f7c305cb31c10f64979876eaca09b3b7ad37ff469b")

