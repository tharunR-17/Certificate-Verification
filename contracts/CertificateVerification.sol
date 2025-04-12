// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract CertificateVerification {
    address public admin;

    struct Certificate {
        string studentName;
        string courseName;
        string issuedDate;
        string ipfsHash;
        bool isValid;
    }

    mapping(bytes32 => Certificate) public certificates;

    constructor() {
        admin = msg.sender;
    }

    function issueCertificate(
        string memory studentName,
        string memory courseName,
        string memory issuedDate,
        string memory ipfsHash
    ) public {
        require(msg.sender == admin, "Only admin can issue certificates");

        bytes32 certHash = keccak256(abi.encodePacked(studentName, courseName, issuedDate));
        certificates[certHash] = Certificate(studentName, courseName, issuedDate, ipfsHash, true);
    }

    function verifyCertificate(
        string memory studentName,
        string memory courseName,
        string memory issuedDate
    ) public view returns (bool, string memory) {
        bytes32 certHash = keccak256(abi.encodePacked(studentName, courseName, issuedDate));
        Certificate memory cert = certificates[certHash];
        return (cert.isValid, cert.ipfsHash);
    }
}
