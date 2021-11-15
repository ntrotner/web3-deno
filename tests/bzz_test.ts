import {assertEquals} from "https://deno.land/std@0.114.0/testing/asserts.ts";
import Web3 from '../mod.ts';

const web3 = new Web3()

Deno.test("setProvider", async () => {
  let result = web3.bzz.setProvider('https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161')
  assertEquals(result, true)
});
