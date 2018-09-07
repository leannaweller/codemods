#!/bin/bash
for f in $(find /home/user/workspace/awesome_project/src  -name '*.js' -or -name '*.jsx')
do 
	jscodeshift -t index.js $f --file=../test/args.json; 
done
