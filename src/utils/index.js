export const createImport = (j, {path, name}) => (
  j.importDeclaration([j.importDefaultSpecifier(j.identifier(name))], j.literal(path))
);

export const createAttr = (j, {name, value}) => j.jsxAttribute(j.jsxIdentifier(name), j.literal(value));

export const findAttr = (attributes, name) => attributes.find(a => getDoubleProperty(a, 'name') === name)

export const filterAttrsByName = (attributes, name) => 
attributes
.filter(a => getDoubleProperty(a, 'name') !== name)


export const getDoubleProperty = (node, name) => (node && node[name]) ? node[name][name] : null

export const setDoubleProperty = (node, name, value) => {if (node && node[name]) node[name][name] = value}

export const getImports = (node) => node.body.filter(n => n.type === 'ImportDeclaration')

export const addImport = (node, newImport, position) => node.body.splice(position, 0, newImport)


export const findElementsByAttrValue = (elements, name, value, strictCheck) => 
  elements
    .filter(
      p => {
        const attr = findAttr(p.value.openingElement.attributes, name);
        const val = getDoubleProperty(attr, 'value');
        if (strictCheck) {
          return val ? val === value : false;
        } else {
          return val ? val.indexOf(value) !== -1 : false;
        }
      }
    )

export const getTagName = (node) => getDoubleProperty(node.value.openingElement, 'name')

export const compose = (...fns) => (x, ...args) => fns.reduceRight((v, f) => f(v, ...args), x);

