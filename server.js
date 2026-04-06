const express = require('express');
const fs = require('fs');
const os = require('os');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

const counterFile = path.join(__dirname, 'counter.json');

// lire compteur
function readCounter() {
  try {
    const data = fs.readFileSync(counterFile, 'utf8');
    return JSON.parse(data).count || 0;
  } catch (err) {
    return 0;
  }
}

// sauvegarder compteur
function saveCounter(count) {
  fs.writeFileSync(counterFile, JSON.stringify({ count }), 'utf8');
}

let visitCount = readCounter();

// route principale
app.get('/', (req, res) => {
  visitCount++;
  saveCounter(visitCount);

  const serverName = os.hostname();
  const platform = os.platform();

  const clientIP = req.ip;
  const userAgent = req.headers['user-agent'];

  res.send(`
    <h1>Visit Counter App</h1>
    
    <h2>📊 Visit Counter</h2>
    <p>Nombre de visites : ${visitCount}</p>

    <h2>🖥️ Server Info</h2>
    <p>Nom serveur : ${serverName}</p>
    <p>OS : ${platform}</p>

    <h2>🌍 Client Info</h2>
    <p>IP : ${clientIP}</p>
    <p>Browser : ${userAgent}</p>
  `);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});