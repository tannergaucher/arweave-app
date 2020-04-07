import "semantic-styles";

const arweave = Arweave.init();

const generateWalletBtn = document.querySelector("#generate-wallet-btn");
generateWalletBtn.addEventListener("click", generateWallet);

const walletBalance = document.querySelector("#wallet-balance");

function generateWallet() {
  generateWalletBtn.innerHTML = "Generating Address";

  arweave.wallets.generate().then((jwk) => {
    generateWalletAddress(jwk);
  });
}

function generateWalletAddress(jwk) {
  generateWalletBtn.innerHTML = "Generate a wallet";

  arweave.wallets.jwkToAddress(jwk).then((address) => {
    const walletAddress = document.querySelector("#wallet-address");
    walletAddress.innerHTML = `Address: ${address}`;

    getWalletBalance(address);
    walletBalance.innerHTML = `Checking wallet balance`;
  });
}

function getWalletBalance(address) {
  arweave.wallets.getBalance(address).then((balance) => {
    let ar = arweave.ar.winstonToAr(balance);

    walletBalance.innerHTML = `Balance: ${ar}`;
  });
}
