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

