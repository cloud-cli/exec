import { exec } from './index';

describe('test', () => {
  it('should execute', () => {
    const result = await exec('whoami');
  });
});
