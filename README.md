# jThree
[![Build Status](https://travis-ci.org/jThreeJS/jThree.svg?branch=develop)](https://travis-ci.org/jThreeJS/jThree)


## What is jThree?

jThree is an innovative 3D graphics engine. It may seem to be just a javascript library.
However, jThree will enable browser to use most of the feature as other game engines do in local environment, plugins features,hierarchies,templates,module systems.


### Purposes.

* Provide a good learning resource for the beginners to know how programming is awesome via this library.
* Sharing features that will be achieved easily by this library implemented with javascript.
* Redefine legacies of 3DCG technologies on the Internet.
* Have Enjoyable contributions :heart:


### Dependencies.

This library depends on the following libraries. We appreciate these contributors below :heart:

|Name|Purpose|URL|Memo|
|:-:|:-:|:-:|:-:|
|superagent|Use for ajax to resolve plugins|https://visionmedia.github.io/superagent/||
|gl-matrix|Use for calculation for webgl|https://github.com/toji/gl-matrix||


## Contributions.

Thank you for your interest in contributions!   :kissing_smiling_eyes:


### Installation to build.

You need the applications below.
* node.js
* npm

You need **not** to install these packages in global.

You need to run the command below to install npm packages,bower packages,and so on in local environment.

```shell
npm install
```

**That is all you need to do for preparation!**

Then, run the command below to build "j3.js"

```shell
npm run build
```

|command|description|
|:-:|:-:|
|npm run build|build "j3.js"|
|npm run test|run test|
|npm run watch|watch files for build and run simple web server(under wwwroot)|
|npm start|only run simple web server(under wwwroot)|

(simple web server supported LiveReload)

## Coding Style.

Most of the code in this project is written with Typescript.
For writing Typescript, we use these coding style below.
There is too much code in this project that is not written by following the coding style, but It will be refactored in the future.
https://github.com/jThreeJS/jThree/edit/develop/README.md#


### Names

* Use PascalCase for type names.
* Do not use "I" as a prefix for interface names.
* Use PascalCase for enum values.
* Use camelCase for function names.
* Use camelCase for property names and local variables.
* Do not use "_" as a prefix for private properties.
* Use whole words in names when possible.
