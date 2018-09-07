require('babel-plugin-transform-decorators-legacy');
import transformTags from './core/tag_to_element';
import transformAttributes from './dummy-codemods/save_tag_name'; 
import {compose} from './utils';
module.exports.parser = 'flow';
const fs = require('fs');
const OPTIONS_FILE = './args1.json';

export default function transform(file, api, options){
    console.log(`Processing file ${file.path}`);
    const args = JSON.parse(fs.readFileSync(options.file || OPTIONS_FILE, 'utf8'));
    const j = api.jscodeshift;
    const root = compose(transformTags, transformAttributes)(j(file.source), api, args);
    if (root){
      return root.toSource().replace(new RegExp('"', 'g'), "'");
    } 
};

