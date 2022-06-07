


async function test (){
    const TronWebNode = require('tronweb')
    const bip39 = require("bip39");
    const { BIP32Factory } = require("bip32");
    const ecc = require("tiny-secp256k1");
    const bip32 = BIP32Factory(ecc);
    const seed = await bip39.mnemonicToSeed(
        "victory snack host dizzy dragon impact piece crawl surprise token vicious tired"
    );
    const node = await bip32.fromSeed(seed);
    const child = await node.derivePath(`m/44'/195'/0'/0/0`);
    const privateKey = await child.privateKey.toString("hex");
    const address = await TronWebNode.address.fromPrivateKey(privateKey);
    let addressDetails = {
        privateKey,
        address,
    };
    //console.log(addressDetails);
    const tronWeb = new TronWebNode({
        fullHost: "https://api.shasta.trongrid.io",
        //headers: { "TRON-PRO-API-KEY": '10aed4d0-4a37-44a2-8691-bfc77ebe118c' }, //TESTNET NO NEED,MAINNET 100K/1 DAY
        privateKey: addressDetails.privateKey,
    });
    // //GETACCOUNT INFO
    const accountDetails = await tronWeb.trx.getAccount(addressDetails.address)
    console.log(addressDetails)
    // tron
    // //GET BALANCE
    const accountbalance = await tronWeb.trx.getBalance(addressDetails.address)
    //console.log(accountbalance)
    
    //SEND TRANSACTION
    // const accountTo = 'TVDGpn4hCSzJ5nkHPLetk8KQBtwaTppnkr'
    // const tx = await tronWeb.trx.sendTransaction(accountTo, 1)
    // console.log(tx)

    //Get last block
    const lastBlock = await tronWeb.trx.getCurrentBlock()
    const lastBlockNumber = lastBlock.block_header.raw_data.number
    const oldBlock = await tronWeb.trx.getBlockByNumber(lastBlockNumber - 10)
    const oldBlockJson = JSON.stringify(oldBlock)
    console.log(oldBlock)
    // if (oldBlockJson.transactions.length > 0){
    //     const lastTx = oldBlockJson.transactions[0].txID;
    //     console.log(lastTx)
    // }else{ 
    //     console.log("no tx")
    //  }

    // //INFO TRANSACTION 
    // const txDetails = await tronWeb.trx.getTransactionInfo("54ec5e197c83ab6a2ea2be9af99774a20800dc0942a54aacf824452490767ce1")
    // console.log(txDetails)

}
  
test();