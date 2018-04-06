# ssh-key-files [![Build Status](https://travis-ci.org/florianb/ssh-key-files.svg?branch=master)](https://travis-ci.org/florianb/ssh-key-files)

> Return object containing private ssh-keyfiles of user


## Install

```
$ npm install ssh-key-files
```


## Usage

```js
const sshKeyFiles = require('ssh-key-files');

sshKeyFiles();
//=> {unicorn: '/Users/dr-evil/.ssh/unicorn'}

// Search a custom directory instead
sshKeyFiles('/temp');
//=> {garbage: '/temp/garbage'}
```


## API

### sshKeyFiles([dir])

Searches at the users ssh-directory for private/public key-file pairs. It estimates the given file pairs share the same basename where the private name has no file-extension and the public keyfile ends with `.pub`.

The result consists of private keyfile-basename / private keyfile-path pairs, if the private as well as the public files exist.

**Example:**

    {
      github: '/Users/unicorn/.shh/github',
      gitlab_rsa: '/Users/unicorn/.shh/gitlab_rsa'
    }

> :warning: The file permissions are not checked.

The public keyfile can be easily derived by adding the `.pub`-extension manually:

    const keyFiles = sshKeyFiles();
    const privateKeyFile = keyFiles.unicorn; //=> /Users/dr-evil/.ssh/unicorn
    const publicKeyFile = `${privateKeyFile}.pub`; //=> /Users/dr-evil/.ssh/unicorn.pub

#### dir

Type: `string`

Alternative path to search for files with a corresponding `.pub`-file. Defaults to the users `.ssh`-folder (located at the users os-specific home directory).



## License

MIT © [Florian Breisch](https://mindkeeper.solutions)
