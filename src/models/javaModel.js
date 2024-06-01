const net = require('net');

const PORTA = 12761;
const IP = '127.0.0.1';

function loginJava(user) {
    return new Promise((resolve, reject) => {
        const client = new net.Socket();
    
        client.connect(PORTA, IP, () => {
          client.write(JSON.stringify(user));
          client.destroy()
        });
    
        client.on('data', (data) => {
          client.destroy();
          resolve(data.toString());
        });
    
        client.on('error', (err) => {
          console.error(`Error: ${err}`);
          reject(err);
        });
      });
}

function logout() {
    return new Promise((resolve, reject) => {
        const client = new net.Socket();
    
        client.connect(PORTA, IP, () => {
          client.write('');
          client.destroy()
        });
    
        client.on('data', (data) => {
          client.destroy();
          resolve(data.toString());
        });
    
        client.on('error', (err) => {
          console.error(`Error: ${err}`);
          reject(err);
        });
      });
}

module.exports = {
    loginJava,
    logout
};