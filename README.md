# 🚀Blockchain Certificate Verification System

This project demonstrates a decentralized certificate issuing and verification system using Ethereum smart contracts, a Node.js backend, and MongoDB. The frontend is built with HTML/CSS/JS. It enables institutions to securely issue and verify student certificates on the blockchain.
---
### 🛠️ Project Structure

```bash
certificate-verification/
├── backend/             # Node.js + Express + MongoDB + Ethers
│   ├── models/          # Mongoose models
│   ├── index.js         # Main backend server
│   └── .env             # Environment variables (not pushed)
├── contracts/           # Solidity smart contract
├── artifacts/           # Compiled smart contract (from Hardhat)
├── frontend/            # HTML + CSS + JS static frontend
│   ├── index.html       # Homepage
│   ├── issue.html       # Certificate issuing
│   └── verify.html      # Certificate verification
├── .gitignore
└── README.md
```
---

### 📦 Backend Setup Instructions

**Clone the Repository**

```bash
git clone https://github.com/yourusername/certificate-verification.git
cd certificate-verification/backend
```
Try running some of the following tasks:

```shell
# 1. Install all project dependencies
npm install
```

```shell
# 2. Compile the smart contract
npx hardhat compile
```

```shell
# 3. Start a local blockchain
npx hardhat node
```

```shell
# 4. Deploy the contract to the local blockchain
npx hardhat run scripts/deploy.js --network localhost
```

```shell
# 5. Create a .env file inside the backend folder and add the following:
# (Replace values as needed)

MONGO_URI=mongodb://localhost:27017/certificates
GANACHE_URL=http://127.0.0.1:7545
PRIVATE_KEY=your_private_key
CONTRACT_ADDRESS=deployed_contract_address
```

```shell
# 6. Start the backend server
cd backend
npm install
node index.js
```

```shell
# 7. Open the frontend in a browser (index.html, issue.html, verify.html)
# Or serve using a local server:
cd frontend
npx serve .
```

---

## MongoDB Certificate Schema

Each certificate is stored in MongoDB in the following format:

```json
{
  "studentName": "John Doe",
  "courseName": "Blockchain 101",
  "issuedDate": "2024-04-12",
  "grade": "A+",
  "certHash": "0xabc123..."
}
```

---

## Optional Enhancements

- ✅ Add certificate revocation
- ☁️ Integrate IPFS for certificate storage
- 🔐 Admin authentication
- 🦊 MetaMask frontend integration

---

### ✅ Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [Ganache](https://trufflesuite.com/ganache/) (for local Ethereum blockchain)
- [MongoDB](https://www.mongodb.com/) (Local or cloud e.g. MongoDB Atlas)
- [Metamask](https://metamask.io/) (if using frontend wallet in future)

---

### 🛡️ Security Notes

- Certificate hashes are generated using `keccak256` (same as Solidity's hashing).
- All certificate data is stored on-chain for verification; metadata is stored in MongoDB.
- Consider adding HTTPS + authentication + revocation logic for production.

---

### 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

---
