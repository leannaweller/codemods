# codemods
Codemode for quick refactoring `jsx`... Does stuff like:
```jsx
<div className="text text_color_red"> Some text </div>  => <Text color="red"> Some text </Text>
```
## Steps
1.
```js
npm i --g jscodeshift
```
2.
```sh
git clone https://github.com/leannaweller/codemods.git
```
3. 
```sh
cd codemods
```
4. 
```sh
cd src
cp transform.example.sh transform.sh
cd test
cp args.example.json args.json
cp guinea-pig.example.js guinea-pig.js
cd ..
```
5. Modify `args.json` and `transform.sh`
6. 
```sh
chmod +x ./test/transform.sh
```
7. 
```sh
./transform.sh
```
