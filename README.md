# Wrapper for [child_process.exec](https://nodejs.org/api/child_process.html#child_process_child_process_exec_command_options_callback)

## Usage

As a function:

```ts
import { exec } from '@cloud-cli/exec';

// ...

const { stdout, ok } = await exec('ls', ['-l']);

if (ok) {
  console.log(stdout);
}
```

As an event emitter:

```ts
import { Process } from '@cloud-cli/exec';
import { spawn } from 'child_process';

const ps = new Process(spawn('ls', ['-l']));
ps.on('done', (result) => {
  console.log(result.ok, result.stdout);
});
```
