const fs = require('fs');

async function runTest() {
  try {
    const loginRes = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: 'admin', password: 'admin123' })
    });
    const loginData = await loginRes.json();
    const token = loginData.token;
    
    const formData = new FormData();
    formData.append('members', JSON.stringify([
      { name: 'Test', role: 'Role', period: '2024', description: 'Desc', image: '' }
    ]));
    // Let's create a dummy file blob
    const blob = new Blob(['dummy content'], { type: 'image/jpeg' });
    formData.append('historyImage', blob, 'test.jpg');

    const response = await fetch('/api/settings/about', {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData
    });

    const data = await response.text();
    console.log(response.status, data);
  } catch(e) {
    console.error(e);
  }
}
runTest();
