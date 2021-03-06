import logo from './logo.svg';
import './App.css';
import { Users, BrowserStorage } from '@spacehq/sdk';
// eslint-disable-next-line
import { UserStorage, AddItemsResultSummary } from '@spacehq/sdk';


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
}

async function createStorage() {
const storage = new UserStorage(user);
await storage.createFolder({ bucket: 'personal', path: 'topFolder' });
const result = await storage.listDirectory({ bucket: 'personal', path: '' });
}

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

async function fileShare() {
  const storage = new UserStorage(user);

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
        <div className='registration'>
          <h1>Registration</h1>
          <label>Username</label>
          <input type='text' />
          <label>Password</label>
          <input type='test' />
          <button> Register</button>
        </div>
        
        <div className='login'>
          <h1>Login</h1>
          <label>Username</label>
          <input type='text' placeholder='Username'/>
          <label>Password</label>
          <input type='password' placeholder='Password'/>
          <button>Login</button>
        </div>
      
        <button className="createToken" onClick = {userCreate}> Create User</button>
        <button className="createToken" onClick = {createStorage}> Create Storage</button>
        <button className="createToken" onClick = {fileStorage}> Upload file</button>
        <button className="createToken" onClick = {fileShare}> Share File</button>
      </header>
    </div>
  );
}

export default App;
