
async function test(){
  const bip39 = require("bip39");
  const { BIP32Factory } = require("bip32");
  const ecc = require("tiny-secp256k1");
  const bip32 = BIP32Factory(ecc);
  const seed = await bip39.mnemonicToSeed(
      "victory snack host dizzy dragon impact piece crawl surprise token vicious tired"
  );
  const solWeb3 = require("@solana/web3.js")
  const seedBuffer = Buffer.from(seed).toString('hex');
  const path44Change = `m/44'/501'/0'/0'`; //third one for index
  const { derivePath } = require('ed25519-hd-key');
  
  const derivedSeed = derivePath(path44Change, seedBuffer).key;
  const keypair =  solWeb3.Keypair.fromSeed(derivedSeed)
  console.log(keypair.publicKey.toBase58())

  const receiver = "CPYFx9y6mETWDrDacC9RHJYGiRi5GhHSrjKC41a7bLgh"
  const pubkeyReceiver = new solWeb3.PublicKey(receiver) //address to pubkey
  console.log(pubkeyReceiver.toBase58())

  //get balance
  var connection = new solWeb3.Connection(solWeb3.clusterApiUrl("testnet"), "confirmed");
  // var balanceGet = await connection.getBalance(keypair.publicKey)
  // console.log({balance: balanceGet})
  const tx = new solWeb3.Transaction({
    blockhash: receiver,
    lastValidBlockHeight: 136113925,
    feePayer: keypair.publicKey
  })
  //create tx
  tx.add(
    solWeb3.SystemProgram.transfer({
        fromPubkey: keypair.publicKey,
        toPubkey: pubkeyReceiver,
        lamports: solWeb3.LAMPORTS_PER_SOL/100,
    })
  );
  //estimate gas
  // const fee = await tx.getEstimatedFee(connection)
  // console.log({fee: fee})
  

  //way1
  // var txhash = await solWeb3.sendAndConfirmTransaction(
  //   connection,
  //   tx,
  //   [keypair]
  // );


  //way2
  var txhash =  await connection.sendTransaction(tx, [keypair])
  console.log({txhash: txhash})
}
test()