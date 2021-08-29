import { spawn } from 'child_process';

export interface ExecOutput {
  code: number;
  stdout: string;
  stderr: string;
  error?: Error;
}

export interface ExecOptions {
  shell: boolean;
}

export async function exec(comnand: string, args: string[] = [], options?: ExecOptions): Promise<ExecOutput> {) {
  const spawnOptions = {
    shell: options?.shell ?? false,
  }

  return new Promise((resolve, reject) => {
    try {

      const childProcess = spawn(comnand, args, spawnOptions);
    } catch (error) {
      reject(error);
    }

  });
}
