//------------------------------------------------------------------Terra
// const bip39 = require("bip39");
// let generatedMnemonic = bip39.generateMnemonic(192); //tạo ví
// console.log(generatedMnemonic)
// //Connect với ví thì xài thư viện của nó là dc

// const { pubkeyToAddress } = require("@cosmjs/launchpad");
// const { network } = require("@cosmostation/cosmosjs");

// const { default: TransportNodeHid } = require('@ledgerhq/hw-transport-node-hid');
// const { testnet } = require('bitcoinjs-lib/src/networks');
// const { default: ECPairFactory } = require('ecpair');

// const { Coins, Coin } = require("@terra-money/terra.js");


// const { MnemonicKey, LCDClient } =  require('@terra-money/terra.js');
// const terra = new LCDClient({
//      URL: "https://lcd.terra.dev",
//      chainId: "phoenix-1",
//    });

   
// const mk = new MnemonicKey({
//      mnemonic:'victory snack host dizzy dragon impact piece crawl surprise token vicious tired',
//    });
// const wallet = terra.wallet(mk);


// async function getbalance() {
//      const a = await terra.bank.balance('terra14l46jrdgdhaw4cejukx50ndp0hss95ekt2kfmw');
//      console.log(a);
//    }
// getbalance()

// console.log(
//      "Mnemonic Key:", mk.mnemonic,
//      "\n\nWallet Address:", mk.accAddress,
//      "\n\nKeys:", generatedMnemonic
// );

// const bip39 = require("bip39");
// let generatedMnemonic = bip39.generateMnemonic(192);
// const cosmosjs = require("@cosmostation/cosmosjs");
// const chainId = "cosmoshub-4";
// const lcdUrl = "https://api.cosmos.network"
// const cosmos = cosmosjs.network(lcdUrl, chainId);
// const mnemonic = generatedMnemonic
// cosmos.setPath("m/44'/118'/0'/0/0");
// const address = cosmos.getAddress(mnemonic);

// async function getbalance() {
//      const a = await cosmos.getAccounts(address)
//      console.log(a);
//    }
// getbalance()

// const ecpairPriv = cosmos.getECPairPriv(mnemonic);
// console.log(ecpairPriv)




// //ATOM
// async function getbalance() {

//   const bip39 = require("bip39");
//   let generatedMnemonic = bip39.generateMnemonic(192);

//   const proto_signing = require('@cosmjs/proto-signing')
//   const stargate = require('@cosmjs/stargate')
//   const crypto = require('@cosmjs/crypto')

//   const rpcURL = "http://rpc.laozi1.bandchain.org"
//   const wallet = await proto_signing.DirectSecp256k1HdWallet.fromMnemonic(generatedMnemonic, {prefix : 'band'});
  
//   const firstAccount = await wallet.getAccounts();
//   console.log(firstAccount[0].address)
//   const client = await stargate.StargateClient.connect(rpcURL);

//   const balance = await client.getBalance('band10lzj4fk0t8hqa3frqx8lt8ky7w305hperkpmfu', 'uband')
//   console.log(balance)


  // const client = await stargate.SigningStargateClient.connectWithSigner(rpcURL, wallet);    

  // const amt = proto_signing.coins(0, 'ATOM');
  // const sendMsg = {
  //     typeUrl: "/cosmos.bank.v1beta1.MsgSend",
  //     value: {
  //       fromAddress: firstAccount[0].address,  
  //       toAddress: firstAccount[0].address,
  //       amount: [amt],
  //     }
  // };

  // const gasEstimation = await client.simulate(firstAccount[0].address, [sendMsg], "MSG");
  // console.log(gasEstimation)
  // const multiplier = 1.3;
  // let gasprice = GasPrice.fromString("0.002uatom");
  // let usedFee = calculateFee(Math.round(gasEstimation * multiplier), gasprice);
  
  // // const txRaw = await client.sign(firstAccount.address, [sendMsg], usedFee, "MSG");
  // // const txBytes = TxRaw.encode(txRaw).finish();
// }
// getbalance()


// let { coins, GasPrice } = require("@cosmjs/launchpad");
// let { SigningStargateClient } = require("@cosmjs/stargate");
// let { DirectSecp256k1HdWallet } = require("@cosmjs/proto-signing");
// // const sender = {
// //   mnemonic:
// //     "luggage rotate orient usage program cloud armed warrior rich erase acquire remember",
// //   address: "cosmos14eadktsf4zzah6har7h7a46tunnj7rq7lmppy5",
// //   path: "m/44'/118'/0'/0/0",
// // };
// // const recipient = {
// //   mnemonic:
// //     "lottery inflict car soup announce vanish loud between cart flag fatigue lottery",
// //   address: "cosmos19kwxp2u3w4djkkkfr4gmwuytm57evagr69y69r",
// //   path: "m/44'/118'/0'/0/0",
// // };
// // const tendermintUrl = "https://mainnet-node.like.co/rpc/";

// let {
//   assertIsBroadcastTxSuccess,
//   StargateClient,
// } = require("@cosmjs/stargate");

// async function sendCoin() {
//   const mnemonic =
//     "surround miss nominee dream gap cross assault thank captain prosper drop duty group candy wealth weather scale put";
//   const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic);
//   const [firstAccount] = await wallet.getAccounts();
//   const gasPrice = GasPrice.fromString("3.14nanolike");
//   const gasLimits = {
//     send: 160000,
//   };
//   const options = { gasPrice: gasPrice, gasLimits: gasLimits };
//   const rpcEndpoint = "https://mainnet-node.like.co/rpc/";
//   const client = await SigningStargateClient.connectWithSigner(
//     rpcEndpoint,
//     wallet,
//     options
//   );

//   const recipient = "cosmos1xv9tklw7d82sezh9haa573wufgy59vmwe6xxe5";
//   const amount = {
//     denom: "nanolike",
//     amount: "1234567",
//   };
//   const result = await client.sendTokens(
//     firstAccount.address,
//     recipient,
//     [amount],
//     "auto"
//     // "LIKE as rewards"
//   );
//   //assertIsBroadcastTxSuccess(result);
//   console.log(result);
// }
// sendCoin();




// async function a (){
// const bip39 = require('bip39')

// // HD keys
// const { BIP32Factory } = require('bip32')
// const ecc = require('tiny-secp256k1')
// const bip32 = BIP32Factory(ecc)

// // Address creation
// const bitcoin = require('bitcoinjs-lib')
// const network = bitcoin.networks.testnet;
// const mnemonic = bip39.generateMnemonic();
// const seed = await bip39.mnemonicToSeed(mnemonic);
// const root = bip32.fromSeed(seed, network);
// const interim = root.derivePath("m/84'/0'/0'/0")
// const addresses = []
// for (let i = 0; i < 20; i++) {
//     const node = interim.derive(i);
//     const { address } = bitcoin.payments.p2wpkh({
//         pubkey: node.publicKey,
//         network,
//     })
//     const p = node.privateKey.toString("hex")
//     addresses.push(address)
    
//     console.log(p)

// }
// }

// a()
// async function a (){
//   const bip39 = require('bip39')
//   const axios = require("axios")
//   // HD keys
//   const { BIP32Factory } = require('bip32')
//   const ecc = require('tiny-secp256k1')
//   const bip32 = BIP32Factory(ecc)
  
//   // Address creation
//   const bitcoin = require('bitcoinjs-lib')
//   const network = bitcoin.networks.testnet;
//   const mnemonic =  "victory snack host dizzy dragon impact piece crawl surprise token vicious tired"//bip39.generateMnemonic();
//   const seed = await bip39.mnemonicToSeed(mnemonic);
//   const root = bip32.fromSeed(seed, network);
//   const interim = root.derivePath("m/84'/1'/0'/0")
//   const node = interim.derive(0);
//   const {address} = bitcoin.payments.p2wpkh({
//       pubkey: node.publicKey,
//       network,
//   })
//   console.log(address)
//   const receiver = "tb1qv590jt20xhkhyse54s9d5h98z00q8lgxgum6xv"
//   let privateK = node.toWIF()
//   const publicKey = node.publicKey.toString("hex")


//   const hash = "b45d59347988ef77cce6f2ff72a5424ed487bdf2274232cdffdcddac7e01ec17"
//   const psbt = new bitcoin.Psbt({network: testnet})
//   var txHex = "02000000000101d6c38baca4812477d89d3495a4a88e3d05509f181ac9156ca58d8a30727b68270100000000ffffffff0210270000000000001976a914e1bad33e7d1350b4b569aa46a7687a3360bfaf3188ac865800000000000016001497e127e0f727d1edfba0d94a86ae83f9bcc989be024730440220203cb04449ef954100a5ff2a3cd6c7d76e9cee19bef132b290560d74346101ec022024662cc9e55f0dd2bc342ecc32b784921fb5c694d0a290b04be1a19cc6e1efc901210327989b301549ff30704e30b5777e0b967804f5dfeb8e1db8b3a148eed56a7d9d00000000"
//   //https://blockstream.info/testnet/api/tx/8fbc42629781ff464c6f95623421a238b91f1dbaf00c2b4a6264538671598336/hex
  
//   psbt.addInput({
//     hash: hash,
//     index: 1,
//     nonWitnessUtxo: Buffer.from(txHex, "hex")
//   })
  
//   psbt.addOutput({ address: receiver, value: 200 });
//   // const ECPairFactory = require("ecpair");
//   // const ECPair = ECPairFactory.ECPairFactory(ecc);
//   // const keyPair = ECPair.fromWIF(privateK, network );
//   psbt.signInput(0, node);//or keypair
//   psbt.finalizeAllInputs();
//   const fee = psbt.getFee()
//   console.log(fee)
//   let transactionHex = psbt.extractTransaction().toHex();
//   console.log(transactionHex)
//   //Just need to broadcast this hex
//   //https://mempool.space/docs/api/rest#get-address-utxo
//   //push with this api
//   //https://github.com/mempool/mempool.js/blob/4893ff1d815d97826a33228e7e049ea22b71c164/README-liquid.md
//   //or you can create your own node
// }  
// a()









// ///////////////////////////////////////NEAR
// const run = async() => {
  
//   const { connect, KeyPair, keyStores, WalletConnection, utils, providers  } = require("near-api-js");
//   const { parseSeedPhrase }= require("near-seed-phrase")
//   const { secretKey, publicKey } = parseSeedPhrase('elephant uniform cup boil boat toilet enlist fiber large exhibit ugly switch')
  

//   const keyPair = KeyPair.fromString(secretKey);
//   const keyStore = new keyStores.InMemoryKeyStore();
  
//   let accountIDBase = utils.PublicKey.fromString(publicKey).data.toString("hex") //base account id
//   console.log(accountIDBase)
//   // await keyStore.setKey('testnet', accountIDBase, keyPair)
//   // const config = {
//   //   networkId: "testnet",
//   //   keyStore,
//   //   nodeUrl: "https://rpc.testnet.near.org",
//   //   walletUrl: "https://wallet.testnet.near.org",
//   //   helperUrl: "https://helper.testnet.near.org",
//   //   explorerUrl: "https://explorer.testnet.near.org",
//   // };
//   // const provider = new providers.JsonRpcProvider("https://rpc.testnet.near.org")
//   // provider.query({

//   // })
//   // // const config = {
//   // //   networkId: "mainnet",
//   // //   keyStore,
//   // //   nodeUrl: "https://rpc.mainnet.near.org",
//   // //   walletUrl: "https://wallet.mainnet.near.org",
//   // //   helperUrl: "https://helper.mainnet.near.org",
//   // //   explorerUrl: "https://explorer.mainnet.near.org",
//   // // };
//   // const near = await connect(config);
//   // const account = await near.account(accountIDBase)
//   // const create =  await near.createAccount("convoito1.testnet", publicKey)
//   // console.log(create)
//   //Create new account if having NEAR
//   //const create = await near.createAccount("1233dichoidd.testnet", publicKey)
//   // console.log(create)


//   // await account.sendMoney(
//   //   "569abc5cf748dd6dccc49718c705aa73736048de8a0137b09f703f27baf88e09",
//   //   "19199999999999999999999999"
//   // );


//   //get balance in any situations
//   //const balance = await account.getAccountBalance()
//   //console.log(balance)

// }
// run()
// async function sendNear(amount, receiver){

//   const { connect, KeyPair, keyStores, WalletConnection, utils  } = require("near-api-js");
//   const { parseSeedPhrase }= require("near-seed-phrase")
//   const { secretKey, publicKey } = parseSeedPhrase('elephant uniform cup boil boat toilet enlist fiber large exhibit ugly switch')
//   const keyPair = KeyPair.fromString(secretKey);
//   const keyStore = new keyStores.InMemoryKeyStore();
//   let accountIDBase = utils.PublicKey.fromString(publicKey).data.toString("hex") //base account id
//   //accountIDBase = "convoito1.testnet"
//   await keyStore.setKey('testnet', accountIDBase, keyPair)
//   const config = {
//     networkId: "testnet",
//     keyStore,
//     nodeUrl: "https://rpc.testnet.near.org",
//     walletUrl: "https://wallet.testnet.near.org",
//     helperUrl: "https://helper.testnet.near.org",
//     explorerUrl: "https://explorer.testnet.near.org",
//   };
//   const near = await connect(config);
//   const account = await near.account(accountIDBase)
//   await account.sendMoney(
//     receiver,
//     utils.format.parseNearAmount(amount)
//   );
// }
// sendNear("1", "12dbfabcdbbb3b452e6f78f7c305cb31c10f64979876eaca09b3b7ad37ff469b")






// ////////////////////////////////////////////ELROND

// async function testElrond(){
//   const walletCore = require("@elrondnetwork/erdjs-walletcore")
//   const { Address, Transaction, TransactionPayload, TransactionVersion, Account, SignableMessage } = require("@elrondnetwork/erdjs/out");
//   const { UserVerifier } = require("@elrondnetwork/erdjs-walletcore/out");
//   const { Signature } = require("@elrondnetwork/erdjs/out/signature");
//   const {ProxyNetworkProvider } = require("@elrondnetwork/erdjs-network-providers")

//   let mnemonic = 'switch frozen govern prepare error dust online hour boil music pet switch';

//   const accountMom = walletCore.Mnemonic.fromString(mnemonic)
//   const account0 = accountMom.deriveKey(0)
  
//   const publicKey = account0.generatePublicKey()
//   const privateKey = Buffer.from(account0.hex(), "hex")
//   const bech32Adr = publicKey.toAddress().bech32()


//   let networkProvider = new ProxyNetworkProvider("https://testnet-gateway.elrond.com");
//   let networkConfig = await networkProvider.getNetworkConfig();
//   console.log(networkConfig.MinGasPrice);
//   console.log(networkConfig.MinTransactionVersion);

//   let accountDetails = await networkProvider.getAccount(new Address(bech32Adr))
//   console.log(accountDetails.balance)
//   console.log()

//   let tx = new Transaction({
//     nonce: accountDetails.nonce,
//     value: "10000",
//     receiver: new Address("erd19m8rv4dnasxzhsz8ulmchxn6hatjzfg2e9h752qjnwuucfwcakhq3pn0zn"),
//     data: new TransactionPayload(""),
//     chainID: networkConfig.ChainID,
//     version: new TransactionVersion(1),
//     gasLimit: 70000,
//     gasPrice: networkConfig.MinGasPrice
//   })
//   const msg = tx.serializeForSigning(new Address(bech32Adr))
//   const sign = account0.sign(msg)
//   console.log(sign.toString("hex"))
//   const signature = new Signature(sign)
//   tx.applySignature(signature, new Address(bech32Adr))
//   let txHash = await networkProvider.sendTransaction(tx);
//   console.log(txHash)
// }
// testElrond()



// THORChain(RUNE)
// BNB Beacon Chain (BNB BEP2 BEP8)
// Elrond (EGLD ESPT SFT)



// Cosmos(ATOM)
// Terra(LUNA CW20)
// BandChain(BAND)
// Secret Network(SCRT)
// Persistence(XPRT)
// BTC

// Tezos(XTZ FA1.2 FA2 ) vl