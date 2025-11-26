const { exec } = require('child_process');
const path = require('path');

const featurePath = path.join(__dirname, 'features', 'checkOut.feature');
const reportPath = path.join(__dirname, 'cucumber-report.html');

const command = `npx cucumber-js ${featurePath} --format html:${reportPath}`;
console.log(`Running: ${command}\n`);

exec(command, (error, stdout, stderr) => {
  console.log(stdout);
  if (stderr) console.error(stderr);
  
  if (error) {
    console.error('Tests failed with code ${error.code}');
    process.exit(error.code);
  } else {
    console.log('Tests passed. Report: ${reportPath}');
    process.exit(0);
  }
});