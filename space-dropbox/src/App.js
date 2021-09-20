import logo from './logo.svg';
import './App.css';
import { Users, BrowserStorage } from '@spacehq/sdk';
// eslint-disable-next-line
import { UserStorage, AddItemsResultSummary } from '@spacehq/sdk';

var tempUser
var tempStorage

async function userCreate() {
  console.log('hi')
  const users = await Users.withStorage(
    new BrowserStorage(), 
    { endpoint: 'wss://auth-dev.space.storage' }
    
);
console.log(typeof(users.users))
// createIdentity generate a random keypair identity
const identity = await users.createIdentity();

// the new keypair can be used to authenticate a new user
// `users.authenticate()` generates hub API session tokens for the keypair identity.
const user = await users.authenticate(identity);

console.log(identity)
console.log(users)
tempUser = user
}

async function createStorage() {
const storage = new UserStorage(tempUser);
await storage.createFolder({ bucket: 'personal', path: 'topFolder' });
console.log(storage)
const result = await storage.listDirectory({ bucket: 'personal', path: '' });
console.log(result)
}
/*
async function fileStorage() {
  await spaceStorage.addItems({
    bucket: 'personal',
    files: [
      {
        path: 'file.txt',
        content: '',
      },
      {
        path: 'space.png',
        content: '',
      }
    ],
 });
}
*/
async function fileShare() {
  const storage = new UserStorage(tempUser);

// you can share privately with existing users via their public key:
await storage.shareViaPublicKey({
    publicKeys: [{
      id: 'user@email.com', // or any identifier for the user
      pk: 'user-pk-hex-or-multibase', // optional, omit if user doesn't exist yet, it would generate temp access key
    }],
    paths: [{
        bucket: 'personal',
        path: '/file/path/here'
    }],
});
}


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      
        <button className="createToken" onClick = {userCreate}> Create User</button>
        <button className="createToken" onClick = {createStorage}> Create Storage</button>
        <button className="createToken" onClick = {fileShare}> Share File</button>
      </header>
    </div>
  );
}

export default App;
