const users = []
class User {
  static addUser({ id, email, room }) {
    let [headEmailName] = email.split('@')
    room = room.trim().toLowerCase()
    headEmailName = headEmailName.trim().toLowerCase()

    const existRegister = users.find(
      (user) => user.name === headEmailName && user.room === room
    )
    if (existRegister) {
      return { error: 'User existed!! Please try another email!!' }
    }
    const user = { id, name: headEmailName, room }
    users.push(user)
    return { user }
  }

  static removeUser(id) {
    const index = users.findIndex((user) => user.id == id)
    if (index !== -1) {
      return users.splice(index, 1)[0]
    }
  }

  static getUser(id) {
    return users.find((user) => user.id === id)
  }

  static getUsersInRoom(room) {
    return users.filter((user) => user.room === room)
  }
}

module.exports = User
