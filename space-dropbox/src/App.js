import logo from './logo.svg';
import './App.css';
import { Users, BrowserStorage } from '@spacehq/sdk';
import { UserStorage, AddItemsResultSummary } from '@spacehq/sdk';
import { UserStorage } from '@space/sdk';
import { Users, BrowserStorage } from '@spacehq/sdk';

function userCreate() {
  const users = await Users.withStorage(
    new BrowserStorage(), 
    { endpoint: 'wss://auth-dev.space.storage' }
);

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
      <body>
        <button className="createToken" onClick = {userCreate}></button>
      </body>
    </div>
  );
}

export default App;
