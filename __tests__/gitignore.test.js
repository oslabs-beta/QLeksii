const fs = require('fs');
const path = require('path');

const gitignore = path.resolve(__dirname, '../.gitignore');

describe('Gitignore Tests', () => {

  it('Testing if node_modules is included in the file', () => {
    fs.readFile(gitignore, function(err, data){
    if(err) throw err;
    const result = data.includes("node_modules");
    expect(result).toEqual(true);
    });
  })

  it('Testing if .env is included in the file', () => {
    fs.readFile(gitignore, function(err, data){
    if(err) throw err;
    const result = data.includes(".env");
    expect(result).toEqual(true);
    });
  })

  it('Testing if package-lock.json is included in the file', () => {
    fs.readFile(gitignore, function(err, data){
    if(err) throw err;
    const result = data.includes("package-lock.json");
    expect(result).toEqual(true);
    });
  })

  it('Testing if build/bundle.js is included in the file', () => {
    fs.readFile(gitignore, function(err, data){
    if(err) throw err;
    const result = data.includes("build/bundle.js");
    expect(result).toEqual(true);
    });
  })

  it('Testing if out/ is included in the file', () => {
    fs.readFile(gitignore, function(err, data){
    if(err) throw err;
    const result = data.includes("out/");
    expect(result).toEqual(true);
    });
  })

  it('Testing if dist is included in the file', () => {
    fs.readFile(gitignore, function(err, data){
    if(err) throw err;
    const result = data.includes("dist");
    expect(result).toEqual(true);
    });
  })

});