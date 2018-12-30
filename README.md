# vanilla-node
Learning to Node at it's core without installing any dependencies or packages. This repository (for now) will
show examples of Node in it's vanilla and purest form, without relying on third-party NPM modules.

You will learn many of the core concepts in a syntactical fashion - we won't be adding much
theory so understanding the core concepts behind Node like callback err pattern, blocking / non-blocking I/O,
event driven applications (event loop) and the like will be up to you to absorb. I strongly suggest you do that with
some reading as well as familiarizing yourself with the API.

* [About Node.js](https://nodejs.org/en/about/)
* [Overview of Blocking vs Non-Blocking](https://nodejs.org/en/docs/guides/blocking-vs-non-blocking/)
* [What is the Event Loop?](https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/)
* [Node.js API](https://nodejs.org/dist/latest-v10.x/docs/api/) 

The goal of this repo is to begin to understand Node and how it works at it's core and not the plethora of third party
modules/tools within the ecosystem that have helped many new breed developers ramp up using Express, Mongoose, NPM. The 
other side of Node's story is that as Node API has matured many developers have abandoned the API in favor of 3rd party
libraries frameworks and NPM packages.

Let's focus on just Node, not just focus but laser focus :)

## Globals in Node.js
Node.js has a variety of built-in global identifiers that you should be familiar with. Some of these are pure
globals while others exist and are inherited at every module level, thus being pseudo-globals.

Truly global objects:

* console
* global
* process
* URL
* setTimeout()
* setInterval()

Globals available in the scope of modules: 

* __dirname
* __filename
* module
* exports
* require

## Callbacks
Callbacks are essential to understand and are the building blocks upon which we write asynchronous code in JavaScript. Nearly
everything in Node.js uses callbacks, which by the way, are not part of Node but the JavaScript language itself. I'm sure you're
already familiar with them.

In a synchronous program you would write something like this:
```javascript
var num = 0

function addTwo() {
  num += 2
}

addTwo()
console.log(num)
// => 2
addTwo()
console.log(num)
// => 2
```

The code above runs sequentially, or from top to bottom When the function is invoked it adds two to our humble num variable - when
`addTwo()` is invoked consecutively we can expect that each time it will simply add two to our `num` variable.
 
In Node.js you would write your program asynchronously, in a non-blocking fashion. Let's take the `readFile()` function from the
`fs` (file system) core module to do this.
```javascript
var fs = require('fs')
var num = 0

function addTwo(callback) {
  fs.readFile('num.txt', 'utf8', function(err, numData) {
    if (!err && numData) {
      numData = parseInt(numData)
      num += numData
      callback()
    }
  })
}

// defining the callback function
function logNum() {
  console.log(num)
}

addTwo(logNum)
// => 3
addTwo(logNum)
// => 5
```

> **Note:** Had we not passed in a callback to our function we would have received undefined from our log because `readFile()` is
asynchronous and we don't know when it completes, therefore logging our original un-incremented `num` variable as 0
```javascript
var fs = require('fs')
var num = 0

function addTwo() {
  fs.readFile('num.txt', 'utf8', function(err, numData) {
    if (!err && numData) {
      numData = parseInt(numData)
      num += numData
    }
  })
}

console.log(num)
// => 0
```

> It's also worth noting that you can invoke `readFile()` without explicitly wrapping it in a function. In this case the signature
of the function itself takes a callback:
```javascript
fs.readFile('num.txt', 'utf8', function(err, numData) {
    if (!err && numData) {
      numData = parseInt(numData)
      num += numData
    }
  })
```

Asynchronous programming with callbacks can be confusing and look unnecessarily complicated. You will get used to them if you apply
yourself to learning this foundational concept in Node.js and JavaScript as a whole. This will allow you to have hundreds, or even 
thousands of pending requests and perform those blocking queries asynchronously.

Here is the typical error callback convention in pseudo code:
```javascript
function myAsyncOperation(foo, bar, baz, thenRunThisOperation) {
  // .. work
  if (/* an error occurs */) { 
    // callback
    thenRunThisOperation(new Error("An error has occured"))
  }
  
  // .. more body
  // callback
  thenRunThisOperation(d, e, null)
}

myAsyncOperation(param1, param2, function andThenRunThisOperation() {})
```

*PRO TIP: The callback pattern is essential to understand, but leads to deeply nested vertical code which can be hard to read and maintain.
There are other ways to manage asynchronous complexity and avoid Callback Hell :)

Use promises by the way of `utils.promisify(original)`
```javascript
const util = require('util')
const fs = require('fs')

const readFile = util.promisify(fs.readFile)

readFile('num.txt', 'utf8').then((fileContents) => {
  console.log(fileContents)
}).catch((error) => {
  console.log(error.message)
})

// => 2
```

Or, equivalently use the `async` function:
```javascript
const util = require('util')
const fs = require('fs')

const readFile = util.promisify(fs.readFile)

async function callReadFile() {
  const fileContents = await readFile('num.txt', 'utf8')
  console.log(fileContents)
}

callReadFile()
// => 2
```

[View complete list](https://nodejs.org/api/globals.html)

## Passing in Command Line Arguments in Node.js
Node applications accept command line arguments as strings of text. They are useful as they allow us to pass 
additional information to a program when it is run through a CLI (command line interface).

An example of the syntax of command line arguments below:

```bash
$ [runtime] [script_name] [argument-1 argument-2 argument-3 ... argument-n]
```

The simplest way of retrieving arguments in Node is via `process.argv` array which is a global object where the
first element of the `process.argv` array will be a file system path point to the node executable. The second element
is the name of the JS file that is being executed, and of course the third element is the first argument passed 
in by the actual users.

Let's take a simple example:
```javascript
/* process.argv.js */
'use strict'

for (let k = 0; k < process.argv.length; k++) {
  console.log(k + ' - ' + (process.argv[k]))
}
```

Now we can run the following command:
```bash
$ node process.argv.js foo bar 3

0 - /Users/ahadbokhari/.nvm/versions/node/v10.14.1/bin/node
1 - /Users/ahadbokhari/open-source/vanilla-node/process.argv.js
2 - foo
3 - bar
4 - 3
```

Taking the knowledge we've learnt thus far we know that our custom arguments will
always start at the 2nd index in `process.argv`
```javascript
/* args.js */

const myArgs = process.argv.slice(2)
console.log (`Grabbing my args from the command line, ${myArgs}`)
```

