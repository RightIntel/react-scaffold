const path = require('path');
const fs = require('fs');

// attempt to find react src directory
async function getSourceDir() {
	const cwd = process.cwd();
	// check current dir
	const child = path.join(cwd, 'src');
	if (fs.existsSync(child)) {
		return child;
	}
	// check parent dirs
	let full = cwd;
	let dir;
	while (1) {
		dir = path.basename(full);
		if (dir === 'src') {
			return full;
		}
		full = path.dirname(full);
		if (full === '/') {
			break;
		}
	}
	throw new Error('Unable to find your react src directory.\nIt must be in this directory or a parent directory.');
}

module.exports = getSourceDir;
