document.getElementById('certificateForm').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const studentName = document.getElementById('studentName').value;
    const course = document.getElementById('course').value;
    const grade = document.getElementById('grade').value;
    const issuedDate = document.getElementById('issuedDate').value;
  
    const certData = { studentName, course, issuedDate, grade };
  
    try {
      const response = await fetch('http://localhost:4000/issue', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(certData),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        document.getElementById('issueStatus').innerHTML =
          `<p style="color: green;">✅ Certificate issued successfully. Tx Hash: ${data.txHash}</p>`;
      } else {
        document.getElementById('issueStatus').innerHTML =
          `<p style="color: red;">❌ Error: ${data.error}</p>`;
      }
    } catch (err) {
      document.getElementById('issueStatus').innerHTML =
        `<p style="color: red;">❌ Network error: ${err.message}</p>`;
    }
  });
  
  
  document.getElementById('verifyCertificateForm').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const studentName = document.getElementById('verifyStudentName').value;
    const courseName = document.getElementById('verifyCourseName').value;
    const issuedDate = document.getElementById('verifyIssuedDate').value;
  
    try {
      const response = await fetch('http://localhost:4000/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentName, courseName, issuedDate })
      });
  
      const data = await response.json();
  
      if (data.valid) {
        document.getElementById('verificationResult').innerHTML = `
          ✅ Certificate is valid.<br>
          🔐 Certificate Hash: <code>${data.cert.certHash}</code>
        `;
      } else {
        document.getElementById('verificationResult').innerHTML = '❌ Certificate is not valid.';
      }
    } catch (err) {
      console.error(err);
      document.getElementById('verificationResult').innerText = '⚠️ Error occurred during verification.';
    }
  });
  