import {
	createImport, 
	createAttr, 
	findAttr, 
	filterAttrsByName,
	getDoubleProperty,
	setDoubleProperty,
	getImports,
	addImport,
	findElementsByAttrValue,
	getTagName
} from '../utils';

export default function transform(root, api, args){
    if (!root) return;
    const j = api.jscodeshift;
    const nodes = findElementsByAttrValue(root.find(j.JSXElement), 'className', args.className, false);  
    if (!nodes.length) return;
     nodes.forEach(p => {
      const tagName = getTagName(p);
      p.value.openingElement.attributes.push(createAttr(j, {name: 'tag', value: tagName}))
    });
    return root;
};

