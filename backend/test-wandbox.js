import fetch from 'node-fetch';

async function testWandbox() {
  try {
    const response = await fetch('https://wandbox.org/api/compile.json', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        compiler: 'nodejs-18.15.0',
        code: 'console.log("Hello from Wandbox!");'
      })
    });
    const data = await response.json();
    console.log('Wandbox Response:', JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Wandbox Error:', error.message);
  }
}

testWandbox();
