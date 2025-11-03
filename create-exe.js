const { exec } = require('child_process');

// Replace this URL with your deployed app URL after deploying to Render or Netlify
const appUrl = 'https://your-deployed-app-url.com';

// Configure the executable options
const options = [
  appUrl,
  '--name', 'Gokuldhaam Bank',
  '--platform', 'windows',
  '--arch', 'x64',
  '--icon', 'bank-icon.ico',
  '--width', '1200',
  '--height', '800',
  '--min-width', '800',
  '--min-height', '600',
  '--disable-dev-tools',
  '--disable-context-menu',
  '--single-instance',
  '--app-copyright', '© 2024 Gokuldhaam Bank',
  '--conceal',
  '--disable-old-build-warning-yesiknowitisinsecure'
];

// Execute nativefier command
const command = `npx nativefier ${options.join(' ')}`;
console.log(`Executing: ${command}`);

exec(command, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`stderr: ${stderr}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
  console.log('Executable created successfully!');
});