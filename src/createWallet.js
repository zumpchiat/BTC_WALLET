//import dependencies

const { BIP32Factory } = require("bip32"); // Alterado: Importando a Factory
const ecc = require("tiny-secp256k1"); // Novo: Importando o motor ECC
const bip39 = require("bip39");
const bitcoin = require("bitcoinjs-lib");

//definindo rede
const network = bitcoin.networks.testnet;

//wallet Hierarquica e deterministica
const path = `m/49'/1'/0'/0`;

//criando as palavras
let mnemonic = bip39.generateMnemonic();
const seed = bip39.mnemonicToSeedSync(mnemonic);

// Inicializando o bip32 com o ecc
const bip32 = BIP32Factory(ecc);

//criando a raiz da carteira HD
let root = bip32.fromSeed(seed, network);

//criando a conta
let account = root.derivePath(path);
let node = account.derive(0).derive(0);

let btcAddress = bitcoin.payments.p2pkh({
  pubkey: node.publicKey,
  network: network,
}).address;

console.log("Carteira gerada");
console.log("Endereço: ", btcAddress);
console.log("Crave Privada: ", node.toWIF());
console.log("Seed: ", mnemonic);
