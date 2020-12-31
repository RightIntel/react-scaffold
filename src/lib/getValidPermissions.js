const fs = require('fs');
const path = require('path');

function getValidPermissions() {
	// For the Sharpr platform this file should be at
	// ~/Sites/sharpr/Code/a-react-app/node_modules/react-scaffold/src/lib/getValidPermissions.js
	const permissionPhpPath = path.resolve(__dirname + '/../../../../app/libs/Permission.php');
	if (!fs.existsSync(permissionPhpPath)) {
		return [];
	}
	const roleMapMatcher = /\$roleMap = \[([\s\S]+?)];/;
	const sectionMatcher = /'.+?' => \[([\s\S]+?)],/g;
	const permsMatcher = /'(.+?)'/g;
	const lookup = {};
	const php = fs.readFileSync(permissionPhpPath, 'utf8');
	const roleMap = php.match(roleMapMatcher);
	if (!roleMap) {
		return [];
	}
	roleMap[1].replace(sectionMatcher, ($0, section) => {
		section.replace(permsMatcher, ($0, perm) => {
			lookup[perm] = true;
		});
	});

	const valid = Object.keys(lookup);
	valid.sort();
	return valid;
}

module.exports = getValidPermissions;
