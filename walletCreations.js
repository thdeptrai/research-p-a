async function MultiwalletCreation (){
    const bip39 = require("bip39");
    const { BIP32Factory } = require("bip32");
    const ecc = require("tiny-secp256k1");
    const bip32 = BIP32Factory(ecc);
    const seed = await bip39.mnemonicToSeed(
        "victory snack host dizzy dragon impact piece crawl surprise token vicious tired"
    );
    
    const root = bip32.fromSeed(seed);
    //Cosmos
    for (let i = 0; i < 20; i++) {
        const child = root.derivePath(`m/44'/118'/0'/0/${i}`)
        const proto_signing = require('@cosmjs/proto-signing')
        const wallet = await proto_signing.DirectSecp256k1Wallet.fromKey(child.privateKey, "cosmos")
        const firstAccount = await wallet.getAccounts();
        //console.log(firstAccount[0].address);
    }
    //Bitcoin
    for (let i = 0; i < 20; i++) {
        const child = root.derivePath(`m/84'/0'/0'/0/${i}`)
        const bitcoin = require('bitcoinjs-lib')
        const privateKey = child.privateKey.toString("hex")
        const { address } = bitcoin.payments.p2wpkh({
            pubkey: child.publicKey,
        })
        //console.log(address)
    }
    //
    const seed64 = await bip39.mnemonicToSeed("victory snack host dizzy dragon impact piece crawl surprise token vicious tired")
    for (let i = 0; i < 1; i++) {
        const solWeb3 = require("@solana/web3.js")
        const account = solWeb3.Keypair.fromSeed(seed64)
        console.log(account)
    }



}
MultiwalletCreation()