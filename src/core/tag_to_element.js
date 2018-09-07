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
} from '../utils';

export default function transform(root, api, args) {
    if (!root) return;
    const j = api.jscodeshift;
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
    return root;
};

