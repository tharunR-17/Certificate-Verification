require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { Contract, Wallet, JsonRpcProvider, keccak256, toUtf8Bytes, AbiCoder } = require('ethers');
const Certificate = require('./models/Certificate');
const contractArtifact = require('../artifacts/contracts/CertificateVerification.sol/CertificateVerification.json');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// Setup ethers v6
const provider = new JsonRpcProvider(process.env.GANACHE_RPC);
const wallet = new Wallet(process.env.PRIVATE_KEY, provider);
const contract = new Contract(process.env.CONTRACT_ADDRESS, contractArtifact.abi, wallet);
const abiCoder = AbiCoder.defaultAbiCoder();

app.post('/issue', async (req, res) => {
  const { studentName, course, issuedDate, grade } = req.body;

  try {
    const encoded = abiCoder.encode(['string', 'string', 'string'], [studentName, course, issuedDate]);
    const certHash = keccak256(encoded);

    const tx = await contract.issueCertificate(studentName, course, issuedDate, certHash);
    await tx.wait();

    const newCert = new Certificate({
      studentName,
      courseName: course,
      issuedDate,
      grade,
      certHash
    });

    await newCert.save();

    res.json({ status: 'Certificate issued', certHash, txHash: tx.hash });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.post('/verify', async (req, res) => {
  const { studentName, courseName, issuedDate } = req.body;

  try {
    const encoded = abiCoder.encode(['string', 'string', 'string'], [studentName, courseName, issuedDate]);
    const certHash = keccak256(encoded);

    const cert = await Certificate.findOne({ certHash });
    if (!cert) return res.json({ valid: false });

    const [isValid] = await contract.verifyCertificate(studentName, courseName, issuedDate);
    res.json({ valid: isValid, cert });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(4000, () => console.log('🚀 Server running on http://localhost:4000'));
