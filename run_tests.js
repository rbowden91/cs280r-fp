var fs = require('fs');
var execSync = require('execsync');
var es = require('./error_suggestions');

fs.readdir('tests', function(err, files) {
    process.chdir('tests');
    for (var i = 0; i < files.length; i++) {
    	var output = execSync('make ' + [files[i].substring(0, files[i].length - 2)]);
    	var response = es.suggest(output);
	if (response === false) {
	    console.log(files[i]);
	}
    }
});
