///////////////////////------------------------------------------------------------------Terra
const bip39 = require("bip39");
let generatedMnemonic = bip39.generateMnemonic(192); //tạo ví
console.log(generatedMnemonic)
//Connect với ví thì xài thư viện của nó là dc

const { pubkeyToAddress } = require("@cosmjs/launchpad");
const { network } = require("@cosmostation/cosmosjs");

const { default: TransportNodeHid } = require('@ledgerhq/hw-transport-node-hid');
const { testnet } = require('bitcoinjs-lib/src/networks');
const { default: ECPairFactory } = require('ecpair');

const { Coins, Coin } = require("@terra-money/terra.js");


const { MnemonicKey, LCDClient } =  require('@terra-money/terra.js');
const terra = new LCDClient({
     URL: "https://lcd.terra.dev",
     chainId: "phoenix-1",
   });

   
const mk = new MnemonicKey({
     mnemonic:'victory snack host dizzy dragon impact piece crawl surprise token vicious tired',
   });
const wallet = terra.wallet(mk);


async function getbalance() {
     const a = await terra.bank.balance('terra14l46jrdgdhaw4cejukx50ndp0hss95ekt2kfmw');
     console.log(a);
   }
getbalance()

console.log(
     "Mnemonic Key:", mk.mnemonic,
     "\n\nWallet Address:", mk.accAddress,
     "\n\nKeys:", generatedMnemonic
);

