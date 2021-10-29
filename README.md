
# Credential Manager - DAPP Application

Follow the steps below to download, install, and run this project.

## Dependencies
Install these prerequisites to run the application

- NPM: https://nodejs.org
- Truffle: https://github.com/trufflesuite/truffle
- Ganache: http://truffleframework.com/ganache/
- Metamask: https://metamask.io/


## Step 1. Clone the project
`git clone https://github.com/raheenulhasan/credential-manager-dapp.git`

## Step 2. Install dependencies
```
$ cd credential-manager-dapp
$ npm install
```
## Step 3. Start Ganache
Open the Ganache GUI client that you downloaded and installed. This will start your local blockchain instance. 


## Step 4. Compile & Deploy Credential Manager DAPP Smart Contract
`$ truffle migrate --reset --compile-all`
<br>
You must migrate the smart contract each time your restart ganache.

## Step 5. Configure Metamask
- Unlock Metamask
- Connect metamask to your local Etherum blockchain provided by Ganache.
- Import an account provided by ganache.

## Step 6. Run the Front End Application
`$ npm run dev` <br>
Visit this URL in your browser: http://localhost:3000


