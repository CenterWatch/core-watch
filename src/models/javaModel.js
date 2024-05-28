const net = require('net');

function loginJava(user) {
    return new Promise((resolve, reject) => {
        const client = new net.Socket();
    
        client.connect(37373, '127.0.0.1', () => {
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
    
        client.connect(37374, '127.0.0.1', () => {
          client.write(' ');
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