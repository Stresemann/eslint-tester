import path from 'path';
import eslint from 'eslint';
import fs from 'fs';
var regex = /.js$/;

function lintFiles(files) {
  var CLIEngine = eslint.CLIEngine
  const cli = new CLIEngine({
    envs: ['browser', 'mocha', "es6"],
    useEslintrc: false,
    rules: {
      semi: 2,
    },
  });

  const lints = cli.executeOnFiles(files);
  console.log("testing", lints);
  if (lints.errorCount > 0) {
    for (const lintResults of lints.results) {
      console.log(
        lintResults.filePath,
        lintResults.errorCount,
        lintResults.messages
      );
    }
  }

  return lints.errorCount;
}

function walkSync(currentDirPath, callback) {
  return fs.readdirSync(currentDirPath).forEach(function (name) {
      var filePath = path.join(currentDirPath, name);
      var stat = fs.statSync(filePath);
      if (stat.isFile() && regex.test(name)) {
          callback(filePath, stat);
      } else if (stat.isDirectory() && name !== 'node_modules') {
          walkSync(filePath, callback);
      }
  });
}

var files = [];
walkSync('../tr-assessment/', function(filePath, stat) {
  files.push(filePath);
});

lintFiles(files);
