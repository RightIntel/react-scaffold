#!/usr/bin/env node
// npm
const fs = require('fs');
const path = require('path');
const prompts = require('prompts');
const chalk = require('chalk');
const mkdir = require('make-dir');
const template = require('lodash.template');
// local functions
const getSourceDir = require('./lib/getSourceDir.js');

main().catch(err => console.log('** Scaffold exception **\n', err));

// functions only beyond this point
async function main() {
    const srcDir = await getSourceDir();
    const { chosenType } = await prompts({
        type: 'select',
        message: 'Choose what to scaffold:',
        name: 'chosenType',
        choices: [
            {
                title: 'Page',
                description: 'A component at a specified URL',
                value: 'Page',
            },
            {
                title: 'Component',
                description: 'Re-usable, rendered state',
                value: 'Component',
            },
            {
                title: 'SubComponent',
                description: 'A child component of a page or component',
                value: 'SubComponent',
            },
            {
                title: 'React hook',
                description: 'Re-usable component logic',
                value: 'hook',
            },
            {
                title: 'lib',
                description: 'Class or function',
                value: 'lib',
            },
            {
                title: 'store',
                description: 'A store with state and actions',
                value: 'store',
            },
        ],
    });

    if (!chosenType) {
        console.log('No files created.');
        return;
    }

    let parent;
    if (chosenType === 'SubComponent') {
        // get the list of pages
        let pages = fs.readdirSync(`${srcDir}/pages`);
        pages = [...pages].filter(isDir);
        pages = pages.map(page => ({ title: `pages/${page}`, value: `pages/${page}` }));
        // get the list of components
        let components = fs.readdirSync(`${srcDir}/components`);
        components = [...components].filter(isDir);
        components = components.map(component => ({
            title: `components/${component}`,
            value: `components/${component}`,
        }));
        // prompt to choose one
        const choices = [...pages, ...components];
        const chosen = await prompts({
            type: 'autocomplete',
            name: 'parent',
            message: 'Pick a parent component or page',
            choices,
            suggest: wordBasedSuggester,
        });
        if (!chosen.parent) {
            console.log('No files created.');
            return;
        }
        parent = chosen.parent;
        mkdir.sync(`${srcDir}/${parent}/components`);
    }
    if (chosenType === 'store') {
        const reusability = await prompts({
            type: 'select',
            name: 'owner',
            message: 'Who can use it?',
            choices: [
                { value: 'reusable', title: 'Usable by any component' },
                { value: 'component', title: 'Choose a component...' },
            ],
        });
        if (reusability.owner === 'component') {
            // get the list of pages
            let pages = fs.readdirSync(`${srcDir}/pages`);
            pages = [...pages].filter(isDir);
            pages = pages.map(page => ({ title: `pages/${page}`, value: `pages/${page}` }));
            // get the list of components
            let components = fs.readdirSync(`${srcDir}/components`);
            components = [...components].filter(isDir);
            components = components.map(component => ({
                title: `components/${component}`,
                value: `components/${component}`,
            }));
            // prompt to choose one
            const choices = [...pages, ...components];
            // TODO: also allow choosing subcomponents!!
            const chosen = await prompts({
                type: 'autocomplete',
                name: 'parent',
                message: "Pick the component's owner",
                choices,
                suggest: wordBasedSuggester,
            });
            if (!chosen.parent) {
                console.log('No files created.');
                return;
            }
            parent = chosen.parent;
            mkdir.sync(`${srcDir}/${parent}/stores`);
        }
    }

    const { chosenName } = await prompts({
        type: 'text',
        name: 'chosenName',
        message: function() {
            return {
                Page: 'Page name? (use PascalCase NOT ending with "Page")',
                Component: 'Component name? (use PascalCase)',
                SubComponent: 'SubComponent name? (use PascalCase)',
                hook: 'Hook name? (must start with "use")',
                lib: 'Lib name? (use PascalCase for classes, camelCase for functions)',
                store: 'Store name? (use camelCase)',
            }[chosenType];
        },
        validate: function(name) {
            if (!name) {
                return 'Name cannot be blank.';
            }
            if (chosenType === 'hook' && !name.match(/^use[A-Z0-9]/)) {
                return 'Hook name must start with "use" and use camelCase.';
            }
            if (chosenType === 'store' && !name.match(/^[a-z]/)) {
                return 'Store name must use camelCase.';
            }
            if (chosenType === 'Page' && name.match(/Page$/)) {
                return 'Page cannot end with "Page".';
            }
            if (['Page', 'Component', 'SubComponent'].includes(chosenType)) {
                if (!name.match(/^[A-Z]/)) {
                    return 'Name must start with a capital letter.';
                }
                if (!name.match(/^\w+$/)) {
                    return 'Name must contain only letters and numbers';
                }
                return true;
            }
            return true;
        },
    });

    if (!chosenName) {
        console.log('No files created.');
        return;
    }

    let chosenPath, pathVariables, pageTitle, pageSubtitle;
    if (chosenType === 'Page') {
        // ask for page url
        const { url } = await prompts({
            type: 'text',
            name: 'url',
            message: 'Enter the URL. (e.g. /posts/:id or /admin/users)',
            validate: function(path) {
                if (/[A-Z]/.test(path)) {
                    return 'Paths should not use uppercase letters.';
                }
                if (/_/.test(path)) {
                    return 'Paths should use dashes and no underscores.';
                }
                if (path.charAt(0) !== '/') {
                    return 'Paths must begin with a slash';
                }
                return true;
            },
        });
        if (!url) {
            console.log('No files created.');
            return;
        }
        chosenPath = url;
        pathVariables = getPathVariables(url);
        // ask for page title
        const { title } = await prompts({
            type: 'text',
            name: 'title',
            message: 'Enter the page title (Large text next to logo)',
            initial: chosenName,
        });
        if (!title) {
            console.log('No files created.');
            return;
        }
        pageTitle = title;
        // ask for page subtitle
        const { subtitle } = await prompts({
            type: 'text',
            name: 'subtitle',
            message: 'Enter the page subtitle (Small text next to logo)',
        });
        if (!subtitle) {
            console.log('No files created.');
            return;
        }
        pageSubtitle = subtitle;
    }

    const { src, dest } = getSrcDest(chosenType, chosenName, parent);
    console.log(chalk.yellow('The following files will be created'));
    console.log(chalk.cyan(dest.join('\n')));

    const { confirmed } = await prompts({
        type: 'confirm',
        name: 'confirmed',
        message: 'Press Enter to continue or "n" to cancel',
        initial: true,
    });

    if (!confirmed) {
        console.log('No files created.');
        return;
    }

    src.forEach((src, i) => {
        const srcPath = `${__dirname}/../${src}`;
        const destPath = `${srcDir}/${dest[i]}`;
        let content = fs.readFileSync(srcPath, 'utf8');
        content = content.replace(/__name__/g, chosenName);
        content = content.replace(/\*\*name\*\*/g, chosenName); // md files
        content = content.replace(/__path__/g, chosenPath);
        if (src.match(/\.tpl$/)) {
            content = template(content)({
                type: chosenType,
                name: chosenName,
                path: chosenPath,
                pathVariables,
                pageTitle,
                pageSubtitle,
            });
        }
        mkdir.sync(path.dirname(destPath));
        fs.writeFileSync(destPath, content, 'utf8');
    });
    console.log(`✔ Wrote ${src.length} files.`);

    if (chosenType === 'Page') {
        const routePath = `${srcDir}/pages/routes.js`;
        let routeContents = fs.readFileSync(routePath, 'utf8');
        routeContents = routeContents.replace(/[\t ]+\/\/ END route list/, $0 => {
            return `\t${chosenName}Route, // path=${chosenPath}\n${$0}`;
        });
        const routeImport = `import ${chosenName}Route from './${chosenName}/${chosenName}Route.js';`;
        routeContents = insertAndSort(routeContents, routeImport, 'route imports');
        fs.writeFileSync(routePath, routeContents, 'utf8');
        console.log('✔ Registered route in src/pages/routes.js.');
        console.log(
            chalk.cyan(
                'NOTE that you may need to update src/pages/routes.js to put your route in a certain order.'
            )
        );
    } else if (chosenType === 'SubComponent' && parent.match(/^pages\//)) {
        const [, pageName] = parent.split('/');
        const pagePath = `${srcDir}/pages/${pageName}/${pageName}Page.js`;
        let pageContents = fs.readFileSync(pagePath, 'utf8');
        let pageParts = pageContents.split('\nimport');
        const idx = pageParts.length - 1;
        pageParts[idx] = pageParts[idx].replace(
            '\n',
            `\nimport ${chosenName} from './components/${chosenName}/${chosenName}.js';\n`
        );
        pageContents = pageParts.join('\nimport');
        fs.writeFileSync(pagePath, pageContents, 'utf8');
        console.log(`✔ Imported SubComponent into src/pages/${pageName}/${pageName}Page.js.`);
    } else if (chosenType === 'SubComponent' && parent.match(/^components\//)) {
        const [, parentName] = parent.split('/');
        const componentPath = `${srcDir}/components/${parentName}/${parentName}.js`;
        let componentContents = fs.readFileSync(componentPath, 'utf8');
        let componentParts = componentContents.split('\nimport');
        const idx = componentParts.length - 1;
        componentParts[idx] = componentParts[idx].replace(
            '\n',
            `\nimport ${chosenName} from './components/${chosenName}/${chosenName}.js';\n`
        );
        componentContents = componentParts.join('\nimport');
        fs.writeFileSync(componentPath, componentContents, 'utf8');
        console.log(`✔ Imported SubComponent into src/components/${parentName}/${parentName}.js.`);
    }
}

function getSrcDest(type, name, parent) {
    let spec;
    if (type === 'Page') {
        spec = {
            src: [
                'templates/Page/Page.css',
                'templates/Page/Page.js.tpl',
                'templates/Page/Page.md.tpl',
                'templates/Page/Page.spec.js',
                'templates/Page/Route.js',
            ],
            dest: [
                'pages/__name__/__name__Page.css',
                'pages/__name__/__name__Page.js',
                'pages/__name__/__name__Page.md',
                'pages/__name__/__name__Page.spec.js',
                'pages/__name__/__name__Route.js',
            ],
        };
    } else if (type === 'Component') {
        spec = {
            src: [
                'templates/Component/Component.css',
                'templates/Component/Component.js',
                'templates/Component/Component.md',
                'templates/Component/Component.spec.js',
            ],
            dest: [
                'components/__name__/__name__.css',
                'components/__name__/__name__.js',
                'components/__name__/__name__.md',
                'components/__name__/__name__.spec.js',
            ],
        };
    } else if (type === 'SubComponent') {
        spec = {
            src: [
                'templates/SubComponent/SubComponent.js',
                'templates/SubComponent/SubComponent.spec.js',
            ],
            dest: [
                `src/${parent}/components/__name__/__name__.js`,
                `src/${parent}/components/__name__/__name__.spec.js`,
            ],
        };
    } else if (type === 'hook') {
        spec = {
            src: [
                'templates/hook/useHook.js',
                'templates/hook/useHook.md',
                'templates/hook/useHook.spec.js',
            ],
            dest: [
                'hooks/__name__/__name__.js',
                'hooks/__name__/__name__.md',
                'hooks/__name__/__name__.spec.js',
            ],
        };
    } else if (type === 'store') {
        spec = {
            src: [
                'templates/store/store.js',
                'templates/store/store.md',
                'templates/store/store.spec.js',
            ],
            dest: parent
                ? [
                      `src/${parent}/stores/__name__/__name__Store.js`,
                      `src/${parent}/stores/__name__/__name__Store.md`,
                      `src/${parent}/stores/__name__/__name__Store.spec.js`,
                  ]
                : [
                      `src/stores/__name__/__name__Store.js`,
                      `src/stores/__name__/__name__Store.md`,
                      `src/stores/__name__/__name__Store.spec.js`,
                  ],
        };
    } else if (type === 'lib') {
        // if name starts with a capital letter, assume it is a class
        const libType = name.match(/^[A-Z]/) ? 'class' : 'function';
        spec = {
            src: [
                `scaffolds/lib/${libType}.js`,
                'templates/lib/lib.md',
                'templates/lib/lib.spec.js',
            ],
            dest: [
                'libs/__name__/__name__.js',
                'libs/__name__/__name__.md',
                'libs/__name__/__name__.spec.js',
            ],
        };
    } else {
        throw new Error(`Unknown scaffold type ${type}.`);
    }
    spec.dest = spec.dest.map(path => {
        return path.replace(/__name__/g, name);
    });
    return spec;
}

// helper to filter out files
function isDir(file) {
    return !file.includes('.');
}

// helper to auto-suggest based on words
function wordBasedSuggester(input, choices) {
    const words = input.split(' ').map(word => new RegExp(word, 'i'));
    return Promise.resolve(
        choices.filter(choice => {
            return words.every(word => word.test(choice.title));
        })
    );
}

function insertAndSort(contents, newItem, boundary) {
    // use a regex to find the lines between the boundary text
    const regex = new RegExp(`(// BEGIN ${boundary}\\n)([\\S\\s]+)(\\n// END ${boundary})`);
    contents = contents.replace(regex, ($0, $1, $2, $3) => {
        // split into lines, add our line and sort the new set of lines
        const items = $2.split('\n');
        items.push(newItem);
        items.sort();
        // return new set of lines with boundary strings
        return $1 + items.join('\n') + $3;
    });
    return contents;
}

function getPathVariables(path) {
    const segments = path.split('/');
    const vars = [];
    segments.forEach(segment => {
        const match = segment.match(/^:([\w_-]+)$/);
        if (match) {
            vars.push(match[1]);
        }
    });
    return vars;
}
