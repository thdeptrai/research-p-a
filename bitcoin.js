async function MultiwalletCreation (){
    const bip39 = require('bip39')
    // HD keys
    const { BIP32Factory } = require('bip32')
    const ecc = require('tiny-secp256k1')
    const bip32 = BIP32Factory(ecc)
    // Address creation
    const bitcoin = require('bitcoinjs-lib')
    const network = bitcoin.networks.testnet;
    const mnemonic = bip39.generateMnemonic();
    const seed = await bip39.mnemonicToSeed(mnemonic);
    const root = bip32.fromSeed(seed, network);
    const interim = root.derivePath("m/84'/0'/0'/0")
    const addresses = []
    for (let i = 0; i < 20; i++) {
        const node = interim.derive(i);
        const { address } = bitcoin.payments.p2wpkh({
            pubkey: node.publicKey,
            network,
        })
        const p = node.privateKey.toString("hex")
        addresses.push(address)
        console.log(p)
        }

}
MultiwalletCreation()
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