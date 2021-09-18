import { Users, BrowserStorage } from '@spacehq/sdk';
import { UserStorage, AddItemsResultSummary } from '@spacehq/sdk';
import { UserStorage } from '@space/sdk';
import { Users, BrowserStorage } from '@spacehq/sdk';

//creating identities

const users = await Users.withStorage(
    new BrowserStorage(), 
    { endpoint: 'wss://auth-dev.space.storage' }
);

// createIdentity generate a random keypair identity
const identity = await users.createIdentity();

// the new keypair can be used to authenticate a new user
// `users.authenticate()` generates hub API session tokens for the keypair identity.
const user = await users.authenticate(identity);
// `user` can be used with the storage class to provide identity.

// user's identity can also be backed up with a special recovery phrase
const uuid = 'specify-uuid-representing-user-in-your-system';
const passphrase = 'specify-unique-pass-phrase-related-to-backup-type';
const backupType = VaultBackupType.Google;
await users.backupKeysByPassphrase(uuid, passphrase, backupType, user.identity);

// backed up users identity can also be recovered later
const recoveredUser = await users.recoverKeysByPassphrase(uuid, passphrase, backupType);
// `recoveredUser` has same authentication as `user` above.

//storage

const storage = new UserStorage(user);
await storage.createFolder({ bucket: 'personal', path: 'topFolder' });
const result = await storage.listDirectory({ bucket: 'personal', path: '' });
// result contains `topFolder` items

// upload a file
const uploadResponse = await spaceStorage.addItems({
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
// uploadresponse is an event listener
uploadResponse.once('done', (data: AddItemsEventData) => {
  const summary = data as AddItemsResultSummary;
  // returns a summary of all files and their upload status
});

//sharing files

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

// or you could share the file publicly by generating a link. Generated link references
await spaceStorage.setFilePublicAccess({
  bucket: 'personal',
  path: '/file.txt',
  allowAccess: true, // <- set to false to revoke public access
});

//key pairs

const users = new Users({ endpoint: 'wss://auth-dev.space.storage' });

// createIdentity generate a random keypair identity
const identity = await users.createIdentity();


