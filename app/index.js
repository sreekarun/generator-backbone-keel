'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var BackboneKeelGenerator = module.exports = function BackboneKeelGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(BackboneKeelGenerator, yeoman.generators.Base);

BackboneKeelGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

  var prompts = [{
    name: 'appName',
    message: 'What do you want to call your App?'
  },
  {
    name: 'author',
    message: 'Please tell me your name',
    default: 'Sapient'
  },
  {
    name: 'appDescription',
    message: 'You want to give some descriptions?',
    default: 'A stabilizing framework for Backbone applications'
  }];

  this.prompt(prompts, function (props) {
    this.appName = props.appName;
    this.author = props.author;
    this.appDescription = props.appDescription;

    cb();
  }.bind(this));
};

BackboneKeelGenerator.prototype.app = function app() {
  
  this.directory('src','src');
  this.directory('tests','tests');

  this.copy('_package.json', 'package.json');
  this.copy('_.gitignore', '.gitignore');
  this.copy('_.travis.yml', '.travis.yml');
  this.copy('_Gruntfile.js', 'Gruntfile.js');
  this.copy('_LICENSE.md', 'LICENSE.md');
  this.copy('_README.md', 'README.md');

};

BackboneKeelGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
};
