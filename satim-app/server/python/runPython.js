import { spawn } from "node:child_process";

export const runKoppenPythonScript = async (competenceItems) => {
    return new Promise((resolve, reject) => {
        const py = spawn('python3', ['python/koppen.py']);
        py.stdin.write(JSON.stringify({competenceItems}));
        py.stdin.end();
        let output = '';
        let error = '';

        py.stdout.on('data', (chunk) => (output += chunk));
        py.stderr.on('data', (chunk) => (error += chunk));

        py.on('close', (code) => {
            if (code === 0) {
                try {
                    const parsed = JSON.parse(output);
                    resolve(parsed);
                } catch (err) {
                    reject(new Error('Failed to parse Python output: ' + err));
                }
            } else {
                reject(new Error(error || `Python exited with code ${code}`));
            }
        });
    });
}
