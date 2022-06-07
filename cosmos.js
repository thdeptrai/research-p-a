// //ATOM
// async function getbalance() {
//     const bip39 = require("bip39");
//     let generatedMnemonic = bip39.generateMnemonic(192);

//     const proto_signing = require('@cosmjs/proto-signing')
//     const stargate = require('@cosmjs/stargate')
//     const crypto = require('@cosmjs/crypto')

//     const rpcURL = "http://rpc.laozi1.bandchain.org"
//     const wallet = await proto_signing.DirectSecp256k1HdWallet.fromMnemonic(generatedMnemonic, {prefix : 'band'});

//     const firstAccount = await wallet.getAccounts();
//     console.log(firstAccount[0].address)


//     //Get balance
//     //const client = await stargate.StargateClient.connect(rpcURL);
//     //const balance = await client.getBalance('band10lzj4fk0t8hqa3frqx8lt8ky7w305hperkpmfu', 'uband')
//     //console.log(balance)


//     const client = await stargate.SigningStargateClient.connectWithSigner(rpcURL, wallet);    

//     const amt = proto_signing.coins(0, 'ATOM');
//     const sendMsg = {
//         typeUrl: "/cosmos.bank.v1beta1.MsgSend",
//         value: {
//         fromAddress: firstAccount[0].address,  
//         toAddress: firstAccount[0].address,
//         amount: [amt],
//         }
//     };

//     const gasEstimation = await client.simulate(firstAccount[0].address, [sendMsg], "MSG");
//     console.log(gasEstimation)
//     const multiplier = 1.3;
//     let gasprice = GasPrice.fromString("0.002uatom");
//     let usedFee = calculateFee(Math.round(gasEstimation * multiplier), gasprice);
    
//   // const txRaw = await client.sign(firstAccount.address, [sendMsg], usedFee, "MSG");
//   // const txBytes = TxRaw.encode(txRaw).finish();
// }
// getbalance()





let { coins, GasPrice } = require("@cosmjs/launchpad");
let { SigningStargateClient, StargateClient } = require("@cosmjs/stargate");
let { DirectSecp256k1HdWallet } = require("@cosmjs/proto-signing");
//SEND TOKEN
async function sendCoin() {
    const mnemonic =
    "surround miss nominee dream gap cross assault thank captain prosper drop duty group candy wealth weather scale put";
    const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, {prefix : 'cosmos'});
    const [firstAccount] = await wallet.getAccounts();

    const rpcURL = "https://mainnet-node.like.co/rpc/";


    //const rpcURL = "http://rpc.laozi1.bandchain.org"

    // /////////Get balance
    // const clientGetbalance = await StargateClient.connect(rpcURL);
    // const balance = await clientGetbalance.getBalance('band10lzj4fk0t8hqa3frqx8lt8ky7w305hperkpmfu', 'uband')
    // console.log(balance)



    const gasPrice = GasPrice.fromString("3.14nanolike");
    const gasLimits = {
    send: 160000,
    };
    const options = { gasPrice: gasPrice, gasLimits: gasLimits };
    
    const client = await SigningStargateClient.connectWithSigner(
    rpcURL,
    wallet,
    options
    );

    const recipient = "cosmos1xv9tklw7d82sezh9haa573wufgy59vmwe6xxe5";
    const amount = {
    denom: "nanolike",
    amount: "1234567",
    };
    console.log(firstAccount.address)
    const result = await client.sendTokens(
    firstAccount.address,
    firstAccount.address,
    [amount],
    "auto"
    // "LIKE as rewards"
    );
    //assertIsBroadcastTxSuccess(result);
    console.log(result);
}
sendCoin();