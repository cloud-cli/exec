import { spawn } from 'child_process';
import { exec, execString, Process } from './index';

describe('exec', () => {
  it('should throw an error for invalid inputs', async () => {
    await expect(() => exec('')).rejects.toThrow();
  });

  it('should execute a command and exit', async () => {
    const date = new Date().toISOString().slice(0, 10);
    const result = await exec('date', ['-u', '+"%Y-%m-%d"']);

    expect(result).toEqual({
      code: 0,
      ok: true,
      stdout: expect.stringContaining(date),
      stderr: '',
      error: undefined,
    });
  });

  it('should execute a command with additional options', async () => {
    const result = await exec('env', [], { env: { FOO: '123' } });

    expect(result).toEqual({
      code: 0,
      ok: true,
      stdout: expect.stringContaining('FOO=123'),
      stderr: '',
      error: undefined,
    });
  });

  it('should capture error output from a command', async () => {
    const result = await exec('ls', ['/invalid/path']);

    expect(result).toEqual({
      code: expect.any(Number),
      ok: false,
      stdout: '',
      stderr: expect.stringContaining('/invalid/path'),
      error: expect.any(Error),
    });
    expect(result.code).not.toBe(0);
  });

  it('should capture error event from a command', async () => {
    const result = await exec('invalid-command');

    expect(result).toEqual({
      code: -1,
      ok: false,
      stdout: '',
      stderr: '',
      error: expect.any(Error),
    });

    expect(result.error.message).toEqual('');
  });
});

describe('execString', () => {
  it('should run a command as string', () => {
    const date = new Date().toISOString().slice(0, 10);
    const result = await execString('date -u +"%Y-%m-%d"');

    expect(result).toEqual({
      code: 0,
      ok: true,
      stdout: expect.stringContaining(date),
      stderr: '',
      error: undefined,
    });
  });
});

describe('Process', () => {
  it('should wrap a spawned process', (done) => {
    const ps = new Process(spawn('date'));

    ps.on('done', (result) => {
      expect(result.ok).toBe(true);
      done();
    });
  });
});
