module.exports.parser = 'flow';
const fs = require('fs');
const OPTIONS_FILE = './args1.json';

export default function transform(file, api, options){
    const j = api.jscodeshift;
    const args = JSON.parse(fs.readFileSync(options.file || OPTIONS_FILE, 'utf8'));
    const root = j(file.source);
     root.find(j.JSXElement)
    .filter(
      p => {
        const classNameAttr = findClassNameAttr(p.value.openingElement.attributes);
        return classNameAttr && classNameAttr.value.value.indexOf(args.className) !== -1;
      }
    )
    .forEach(p => {
      p.value.openingElement.name.name = args.component.name;
      p.value.closingElement.name.name = args.component.name;
      const {attributes} = p.value.openingElement;
      p.value.openingElement.attributes = [];
      findClassNameAttr(attributes)
        .value.value.split(' ')
        .filter(prop => prop !== args.className)
	.forEach(prop => args.props[prop] ? 
                 p.value.openingElement.attributes.push(createProp(j, args.props[prop]))
                 : null);
    });
    root.find(j.Program)
      .replaceWith(({ node }) => {
         const importsCount = node.body.filter(n => n.type === 'ImportDeclaration').length;
         node.body.splice(importsCount, 0, createImport(j, args.component));      
         return node;
    });
    return root.toSource();
};

const createImport = (j, {path, name}) => (
  j.importDeclaration([j.importDefaultSpecifier(j.identifier(name))], j.literal(path))
);

const createProp = (j, {name, value}) => j.jsxAttribute(j.jsxIdentifier(name), j.literal(value));

const findClassNameAttr = (attributes) => {
  return attributes.find(a => a.name.name === 'className');
};

