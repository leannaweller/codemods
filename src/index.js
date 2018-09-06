require('babel-plugin-transform-decorators-legacy');
module.exports.parser = 'flow';
const fs = require('fs');
const OPTIONS_FILE = './args1.json';
import {
	createImport, 
	createAttr, 
	findAttr, 
	filterAttrsByName,
	getDoubleProperty,
	setDoubleProperty,
	getImports,
	addImport,
	findElementsByAttrValue
} from './utils';

export default function transform(file, api, options){
    const j = api.jscodeshift;
    const args = JSON.parse(fs.readFileSync(options.file || OPTIONS_FILE, 'utf8'));
    const root = j(file.source);
    const nodes = findElementsByAttrValue(root.find(j.JSXElement), 'className', args.className, false);  
    if (!nodes.length) return;
    nodes.forEach(p => {
      setDoubleProperty(p.value.openingElement, 'name', args.component.name);
      setDoubleProperty(p.value.closingElement, 'name', args.component.name);
      const {attributes} = p.value.openingElement;
      p.value.openingElement.attributes = filterAttrsByName(attributes, 'className');
      getDoubleProperty(findAttr(attributes, 'className'), 'value').split(' ')
        .filter(prop => prop !== args.className)
        .forEach(prop => args.props[prop] ? 
                 p.value.openingElement.attributes.push(createAttr(j, args.props[prop]))
                 : null);
    });
    root.find(j.Program)
      .replaceWith(({ node }) => {
         const importsCount = getImports(node).length;
         const newImport = createImport(j, args.component);
         addImport(node, newImport, importsCount);      
         return node;
    });
    return root.toSource().replace(new RegExp('"', 'g'), "'");
};

