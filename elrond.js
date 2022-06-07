////////////////////////////////////////////ELROND

async function testElrond(){
  const walletCore = require("@elrondnetwork/erdjs-walletcore")
  const { Address, Transaction, TransactionPayload, TransactionVersion, Account, SignableMessage } = require("@elrondnetwork/erdjs/out");
  const { UserVerifier } = require("@elrondnetwork/erdjs-walletcore/out");
  const { Signature } = require("@elrondnetwork/erdjs/out/signature");
  const {ProxyNetworkProvider } = require("@elrondnetwork/erdjs-network-providers")

  let mnemonic = 'switch frozen govern prepare error dust online hour boil music pet switch';

  const accountMom = walletCore.Mnemonic.fromString(mnemonic)
  const account0 = accountMom.deriveKey(0)
  
  const publicKey = account0.generatePublicKey()
  const privateKey = Buffer.from(account0.hex(), "hex")
  const bech32Adr = publicKey.toAddress().bech32()


  let networkProvider = new ProxyNetworkProvider("https://testnet-gateway.elrond.com");
  let networkConfig = await networkProvider.getNetworkConfig();
  console.log(networkConfig.MinGasPrice);
  console.log(networkConfig.MinTransactionVersion);

  let accountDetails = await networkProvider.getAccount(new Address(bech32Adr))
  console.log(accountDetails.balance)
  console.log()

  let tx = new Transaction({
    nonce: accountDetails.nonce,
    value: "10000",
    receiver: new Address("erd19m8rv4dnasxzhsz8ulmchxn6hatjzfg2e9h752qjnwuucfwcakhq3pn0zn"),
    data: new TransactionPayload(""),
    chainID: networkConfig.ChainID,
    version: new TransactionVersion(1),
    gasLimit: 70000,
    gasPrice: networkConfig.MinGasPrice
  })
  const msg = tx.serializeForSigning(new Address(bech32Adr))
  const sign = account0.sign(msg)
  console.log(sign.toString("hex"))
  const signature = new Signature(sign)
  tx.applySignature(signature, new Address(bech32Adr))
  let txHash = await networkProvider.sendTransaction(tx);
  console.log(txHash)
}
testElrond()