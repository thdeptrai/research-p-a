// const solTest = async () => {
//   const { Buffer } = require("buffer");
//   const bs58 = require("bs58");
//   const web3 = require("@solana/web3.js");

//   let toPublicKey = web3.Keypair.generate().publicKey;
//   let fromPublicKey = web3.Keypair.generate();

//   let connection = new web3.Connection(
//     web3.clusterApiUrl("devnet"),
//     "confirmed"
//   );

//   let airdropSignature = await connection.requestAirdrop(
//     fromPublicKey.publicKey,
//     web3.LAMPORTS_PER_SOL
//   );
//   console.log(airdropSignature);
//   const confirmRes = await connection.confirmTransaction(airdropSignature);
//   console.log(confirmRes);

//   let type = web3.SYSTEM_INSTRUCTION_LAYOUTS.Transfer;
//   let data = Buffer.alloc(type.layout.span);
//   let layoutFields = Object.assign({ instruction: type.index });
//   type.layout.encode(layoutFields, data);

//   let recentBlockhash = await connection.getRecentBlockhash();

//   console.log(recentBlockhash)

//   let messageParams = {
//     accountKeys: [
//       fromPublicKey.publicKey.toString(),
//       toPublicKey.toString(),
//       web3.SystemProgram.programId.toString(),
//     ],
//     header: {
//       numReadonlySignedAccounts: 0,
//       numReadonlyUnsignedAccounts: 1,
//       numRequiredSignatures: 1,
//     },
//     instructions: [
//       {
//         accounts: [0, 1],
//         data: bs58.encode(data),
//         programIdIndex: 2,
//       },
//     ],
//     recentBlockhash,
//   };

//   let message = new web3.Message(messageParams);

//   let transaction = web3.Transaction.populate(message, [
//     fromPublicKey.publicKey.toString(),
//   ]);

//   const res = await web3.sendAndConfirmTransaction(connection, transaction, [
//     fromPublicKey,
//   ]);

// };

// solTest();
const secretKeyA =
  "24mAYQF8vnUG7sUMxqYV9kxsinTwwUpNMaWMvebHXmGvPF81kL7JAJ8WecrTgArEmsXgchBFtPqzAwzKnSwQHShd"; //secretKey
const publicKeyA = "BaBgVhsLcaeuTKBha2R2cN1v3bEG26dks8WhY9FDDvSj";
const bs58 = require("bs58");
const secretKeyB =
  "61muvL88mNh4MV6E9F5o1EGq2gbh6AB4TNo8AerD3EK86tgHev1woxf8nGGfTD4fWU3g8L5C9syzbBL61ry85UAg"; //secretKey
let secretKeyA_ = bs58.decode(secretKeyA);
let secretKeyB_ = bs58.decode(secretKeyB);
const testWeb3JSAPI = async () => {
  const web3 = require("@solana/web3.js");

  // Fund a key to create transactions
  let fromPublicKey = web3.Keypair.fromSecretKey(secretKeyA_);
  let connection = new web3.Connection(
    web3.clusterApiUrl("testnet"),
    "confirmed"
  );

  let airdropSignature = await connection.requestAirdrop(
    fromPublicKey.publicKey,
    web3.LAMPORTS_PER_SOL
  );
  await connection.confirmTransaction(airdropSignature, 'confirmed');

  // Create Account
  let stakeAccount = web3.Keypair.fromSecretKey(secretKeyB_);
  let authorizedAccount = web3.Keypair.generate();
  /* Note: This is the minimum amount for a stake account -- Add additional Lamports for staking
      For example, we add 50 lamports as part of the stake */
  let lamportsForStakeAccount =
    (await connection.getMinimumBalanceForRentExemption(
      web3.StakeProgram.space
    )) + 50;

  let createAccountTransaction = web3.StakeProgram.createAccount({
    fromPubkey: fromPublicKey.publicKey,
    authorized: new web3.Authorized(
      authorizedAccount.publicKey,
      authorizedAccount.publicKey
    ),
    lamports: lamportsForStakeAccount,
    lockup: new web3.Lockup(0, 0, fromPublicKey.publicKey),
    stakePubkey: stakeAccount.publicKey,
  });
  await web3.sendAndConfirmTransaction(connection, createAccountTransaction, [
    fromPublicKey,
    stakeAccount,
  ]);

  // Check that stake is available
  let stakeBalance = await connection.getBalance(stakeAccount.publicKey);
  console.log(`Stake balance: ${stakeBalance}`);
  // Stake balance: 2282930

  // We can verify the state of our stake. This may take some time to become active
  let stakeState = await connection.getStakeActivation(stakeAccount.publicKey);
  console.log(`Stake state: ${stakeState.state}`);
  // Stake state: inactive

  // To delegate our stake, we get the current vote accounts and choose the first
  let voteAccounts = await connection.getVoteAccounts();
  let voteAccount = voteAccounts.current.concat(voteAccounts.delinquent)[0];
  let votePubkey = new web3.PublicKey(voteAccount.votePubkey);

  // We can then delegate our stake to the voteAccount
  let delegateTransaction = web3.StakeProgram.delegate({
    stakePubkey: stakeAccount.publicKey,
    authorizedPubkey: authorizedAccount.publicKey,
    votePubkey: votePubkey,
  });
  await web3.sendAndConfirmTransaction(connection, delegateTransaction, [
    fromPublicKey,
    authorizedAccount,
  ]);

  // To withdraw our funds, we first have to deactivate the stake
  let deactivateTransaction = web3.StakeProgram.deactivate({
    stakePubkey: stakeAccount.publicKey,
    authorizedPubkey: authorizedAccount.publicKey,
  });
  await web3.sendAndConfirmTransaction(connection, deactivateTransaction, [
    fromPublicKey,
    authorizedAccount,
  ]);

  // Once deactivated, we can withdraw our funds
  let withdrawTransaction = web3.StakeProgram.withdraw({
    stakePubkey: stakeAccount.publicKey,
    authorizedPubkey: authorizedAccount.publicKey,
    toPubkey: fromPublicKey.publicKey,
    lamports: stakeBalance,
  });

  await web3.sendAndConfirmTransaction(connection, withdrawTransaction, [
    fromPublicKey,
    authorizedAccount,
  ]);
};

testWeb3JSAPI();

/*
 * Keypair.generate() --- gendered keypair { publicKey + secretKey }
 * Decode secretKey from phantom extension ------ Doc: https://gist.github.com/Xavier59/b0b216f003b8e54db53c39397e98cd70
 * Connect wallet with secretKey
 */

/*
 * clusterApiUrl(typeNetWork, tls)
 * tls === false ? 'http' : 'https';
 * http: {
 *   devnet: 'http://api.devnet.solana.com',
 *   testnet: 'http://api.testnet.solana.com',
 *  'mainnet-beta': 'http://api.mainnet-beta.solana.com/',
 * },
 * https: {
 *   devnet: 'https://api.devnet.solana.com',
 *   testnet: 'https://api.testnet.solana.com',
 *   'mainnet-beta': 'https://api.mainnet-beta.solana.com/',
 * },
 */
