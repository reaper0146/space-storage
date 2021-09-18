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
      </header>
      <div>
        <button className="createToken" onClick = {userCreate}> USER</button>
      </div>
    </div>
  );
}

export default App;
