async function test(){
    const { ApiPromise, WsProvider, Keyring } =  require('@polkadot/api');
    const provider = new WsProvider('wss://westend-rpc.polkadot.io');
    const api = await ApiPromise.create({provider});

    const mnemonic = "victory snack host dizzy dragon impact piece crawl surprise token vicious tired"
    const keyring = new Keyring() //Can use type ex: { type: 'sr25519' }
    const account = keyring.addFromMnemonic(mnemonic)

    // //Get balance of an account
    const dataBalance = await api.derive.balances.all(account.address)  //5EWNeodpcQ6iYibJ3jmWVe85nsok1EDG8Kk3aFg8ZzpfY1qX for the top account
    console.log({dataBalance})
    //Transfer wnd
    const transaction =  api.tx.balances.transfer("5EWNeodpcQ6iYibJ3jmWVe85nsok1EDG8Kk3aFg8ZzpfY1qX", 100000)

    const paymentInfo = await transaction.paymentInfo(account.address) //estimate fee
    console.log({
        class: paymentInfo.class.toString(),
        weight: paymentInfo.weight.toString(),
        partialFee: paymentInfo.partialFee.toHuman()
    });
    
    //may sign frist but it was deprecated, so send
    const send =  await transaction.signAndSend(
        account,
        ({ status, events }) => {
        if (status.isInBlock || status.isFinalized) {
          events
            //check for fail events
            .filter(({ event }) =>
              api.events.system.ExtrinsicFailed.is(event)
            )
            // we know that data for system.ExtrinsicFailed is
            // (DispatchError, DispatchInfo)
            .forEach(({ event: { data: [error, info] } }) => {
              if (error.isModule) {
                // for module errors, we have the section indexed, lookup
                const decoded = api.registry.findMetaError(error.asModule);
                const { docs, method, section } = decoded;
                console.log(`${section}.${method}: ${docs.join(' ')}`);
              } else {
                // Other, CannotLookup, BadOrigin, no extra info
                console.log(error.toString());
              }
            });
            
        }
        if(status.isFinalized){
            //get the final tx to check
            console.log({transactionHash : status.asFinalized.toHex()})
        }
    });
    
}
test()