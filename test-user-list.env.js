const UserList = require('./user-list')
const users = new UserList()

users.on('saved-user', function(user) {
  console.log('user name saved: ' + user.name + ' (' + user.id + ')')
})

users.on('saved-user', function(user) {
  console.log('user occupation: ' + user.occupation)
})

users.save({ name: 'Jason Frick', occupation: 'Project Manager' })
console.log('<...next user...>')
users.save({ name: 'Alyssa Bradley', occupation: 'Sr. SCRUM Master' })
