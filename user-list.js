const EventEmitter = require('events').EventEmitter
const util = require('util')

let id = 1
const database = {
  users: [
    {id: id++, name: 'Teresa Mcadams',  occupation: 'Sr. Software Engineer'},
    {id: id++, name: 'Hunter Joe',   occupation: 'Data Analyst'},
    {id: id++, name: 'Cathy Alonso', occupation: 'Devops Engineer'}
  ]
}

// our constructor function, ES5. one could easily create a class as well :/
function UserList() {
  EventEmitter.call(this)
}

// inherit it's prototype, add EventEmitter's prototype to UserList.prototype
util.inherits(UserList, EventEmitter)

// add method and emits the 'saved-user event'
UserList.prototype.save = function (obj) {
  obj.id = id++
  database.users.push(obj)
  this.emit('saved-user', obj)
}

// method to retrieve all users
UserList.prototype.all = function () {
  return database.users
}

module.exports = UserList
