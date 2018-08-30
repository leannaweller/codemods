import React from 'react';
import fs from 'fs'

let tips = [
  "Click on any AST node with a '+' to expand it",

  "Hovering over a node highlights the \
   corresponding part in the source code",

  "Shift click on an AST node expands the whole substree"
];

const a = (
  <div>
     <h2 className='x-text x-text_color_red'>hgffghfg</h2>
  </div>
);

function printTips() {
  tips.forEach((tip, i) => console.log(`Tip ${i}:` + tip));
}

