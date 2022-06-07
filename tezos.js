///////////////////////////////////////////////////////////TEZOS////////////////////////////////////////////////////////////

// async function check(){
//   const TezosToolkit = require('@taquito/taquito');
//   const importKey = require('@taquito/signer');

//   const Tezos = new TezosToolkit.TezosToolkit('https://rpc.ithacanet.teztnets.xyz');
//   const decimals = 1000000
  
//   const bip39 = require("bip39");
//   let generatedMnemonic = bip39.generateMnemonic(192);

//   // importKey.InMemorySigner.fromFundraiser("jxmjvauo.guddusns@tezos.example.org", "dasdasd", generatedMnemonic)
//   importKey.importKey(
//     Tezos,
//     '',
//     '',
//     generatedMnemonic,
//     '',
//   ).catch((e) => console.error(e));

//   // Tezos.tz
//   //   .getBalance('tz1h3rQ8wBxFd8L9B3d7Jhaawu6Z568XU3xY')
//   //   .then((balance) => console.log(`${balance.toNumber() / decimals} ꜩ`))
//   //   .catch((error) => console.log(JSON.stringify(error)));
// }
// check()