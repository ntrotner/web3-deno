import {assertEquals} from "https://deno.land/std@0.114.0/testing/asserts.ts";
import Web3 from '../mod.ts';
import {aaveSolABI} from './resources/aaveABI.ts'

const web3 = new Web3()

Deno.test("setProvider", async () => {
  let result = web3.setProvider(new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161'))
  assertEquals(result, true)
});

Deno.test("providers", async () => {
  assertEquals(Object.keys(web3.eth.providers).length, 3)
});

Deno.test("defaults", async () => {
  assertEquals(web3.defaultAccount, undefined)
  assertEquals(web3.defaultBlock, undefined)
});


Deno.test("getAccounts", async () => {
  let accounts = await web3.eth.getAccounts()
  assertEquals(accounts.length, 0)
});

Deno.test("getBalance", async () => {
  let balance = await web3.eth.getBalance("0xa9eCA732d539D93267126B05Df29283489392fa0")
  assertEquals(balance, "0")
})

Deno.test("getBlock", async () => {
  let number = 13590913
  let nonce = "0x5a6ef83a4d26f458"
  let block = await web3.eth.getBlock(number)
  
  assertEquals(block.number, number)
  assertEquals(block.nonce, nonce)
})

Deno.test("getTransaction", async () => {
  let transactionNumber = "0xecd8ccbef183239e1d307348616f163781d4438e6cdbf1e320fd947feed98c75"
  let tx = await web3.eth.getTransaction(transactionNumber)
  
  assertEquals(tx.hash, transactionNumber)
  assertEquals(tx.gas, 77517)
})

Deno.test("estimateGas", async () => {
  let gas = await web3.eth.estimateGas({
    to: "0xa9eCA732d539D93267126B05Df29283489392fa0",
    data: "0xc6888fa10000000000000000000000000000000000000000000000000000000000000003"
  })
  assertEquals(gas > 1, true)
})

Deno.test("read and execute read contract", async () => {
  var contract = new web3.eth.Contract(aaveSolABI, "0x4da27a545c0c5B758a6BA100e3a049001de870f5");
  
  let balanceOfAddress = await contract.methods.balanceOf("0xa9eCA732d539D93267126B05Df29283489392fa0").call()
  assertEquals(balanceOfAddress, "0")
})

Deno.test("toIBAN", async () => {
  let result = web3.eth.Iban.fromAddress("0xa9eCA732d539D93267126B05Df29283489392fa0");
  assertEquals(result._iban, "XE04JUKE508R98CS791TEPPLV19D6UH7XR4")
})


Deno.test("toABI", async () => {
  let result = web3.eth.abi.encodeFunctionSignature({
    name: 'myMethod',
    type: 'function',
    inputs: [{
      type: 'uint256',
      name: 'myNumber'
    }, {
      type: 'string',
      name: 'myString'
    }]
  })
  assertEquals(result, "0x24ee0097")
})
