import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { Web3 } from './web3.min.js'

const web3 = new Web3('http://85.214.129.69:8545')
let accounts = await web3.eth.getAccounts()
console.log(accounts)
let balance = await web3.eth.getBalance('0x9f6c5B894fe87F2F0dD35F1B5501948Dd4C93f80')
console.log(balance)
