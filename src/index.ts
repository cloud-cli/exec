import { EventEmitter } from 'events';
import { spawn } from 'child_process';
import { StringDecoder } from 'string_decoder';

export interface ExecOutput {
  ok: boolean;
  code: number;
  stdout: string;
  stderr: string;
  error?: Error;
}

export type ExecOptions = Parameters<typeof spawn>[2];

export class Process extends EventEmitter {
  code: number = 0;
  completed = false;
  error: Error;

  get hasError() {
    return Boolean(this._errorBuffer.length || this.code !== 0 || this.error);
  }

  constructor(protected childProcess: ReturnType<typeof spawn>) {
    super();

    childProcess.stdout?.on('data', (data) => (this.stdout = data));
    childProcess.stderr?.on('data', (data) => (this.stderr = data));
    childProcess.on('exit', (code) => (this.code = code));
    childProcess.on('close', () => this.complete());
    childProcess.on('error', (error) => (this.error = error));
  }

  set stdout(value: Buffer) {
    this._outputBuffer += this.stdoutDecoder.write(value);
  }

  set stderr(value: Buffer) {
    this._errorBuffer += this.stderrDecoder.write(value);
  }

  private _outputBuffer = '';
  private _errorBuffer = '';
  private stdoutDecoder = new StringDecoder();
  private stderrDecoder = new StringDecoder();

  complete(): void {
    this.completed = true;
    this._outputBuffer += this.stdoutDecoder.end();
    this._errorBuffer += this.stderrDecoder.end();

    this.emit('done', this.output);
  }

  get output(): ExecOutput {
    return {
      ok: !this.hasError && this.code === 0,
      code: this.error ? -1 : this.code,
      stdout: this._outputBuffer,
      stderr: this._errorBuffer,
      error: this.hasError ? new Error(this._errorBuffer) : undefined,
    };
  }
}

export async function exec(command: string, args: string[] = [], options?: ExecOptions): Promise<ExecOutput> {
  return new Promise((resolve, reject) => {
    try {
      const childProcess = spawn(command, args, options);
      const state = new Process(childProcess);

      state.on('done', () => resolve(state.output));
    } catch (error) {
      reject(error);
    }
  });
}
