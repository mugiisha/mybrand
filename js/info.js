let usersBtn = document.getElementById('users-btn');
const messagesBtn = document.getElementById('messages-btn')
let users = document.getElementById('users');
const messages = document.getElementById('messages')
const token = localStorage.getItem('token')

usersBtn.addEventListener('click', () => {
    getusers()
})

messagesBtn.addEventListener('click', () => {
    getmessages()
})



async function getusers() {
    await fetch('https://mybrandbb.herokuapp.com/users')
    .then(users => users.json())
    .then(data => {
        const table = document.createElement('table');
        table.innerHTML = `<tr>
        <th>Name</th>
        <th>email</th>
        <th>role</th>
        <th>delete</th>
      </tr>
        `
        data.forEach(d => {

           let name = d.name;
           let email = d.email;
           let role = d.role;
           let id = d._id


           table.innerHTML += `
         <tr data-id = "${id}">
           <td>${name}</td>
           <td>${email}</td>
           <td>${role}</td>
           <td><i class="fa fa-trash-o" style="font-size:24px; color: red" onclick="deleteuser(this.parentElement.parentElement.getAttribute('data-id'))"></i></td>
         </tr> `

        users.appendChild(table)
        })
    })
    
  }


async function getmessages() {
    await fetch('https://mybrandbb.herokuapp.com/getmessages', {
        headers: {
            "Authorization": `bearer ${token}`
        }
    })
    .then(messages => messages.json())
    .then(data => {
        const table = document.createElement('table');
        table.innerHTML = `<tr>
        <th>Name</th>
        <th>message</th>
        <th>delete</th>
      </tr>
        `
        data.forEach(d => {

           let name = d.name;
           let message = d.message;
           let id = d._id


           table.innerHTML += `
         <tr data-id = "${id}">
           <td>${name}</td>
           <td>${message}</td>
           <td><i class="fa fa-trash-o" style="font-size:16px; color: red" onclick="deletemessage(this.parentElement.parentElement.getAttribute('data-id'))"></i></td>
         </tr> `

        messages.appendChild(table)
        })
    })
    
  }

  async function deleteuser(id) {
    await fetch (`https://mybrandbb.herokuapp.com/deleteuser/${id}`, {
      method: 'DELETE',
      headers : {
        "Content-type": "application/json;charset=UTF-8",
        "Authorization": `bearer ${token}`
      }
    })
    .then(res => res.json())
    .then(response => {
      alert(response.message)
      location.reload()
    })
  }


  async function deletemessage(id) {
    await fetch (`https://mybrandbb.herokuapp.com/deletemessage/${id}`, {
      method: 'DELETE',
      headers : {
        "Content-type": "application/json;charset=UTF-8",
        "Authorization": `bearer ${token}`
      }
    })
    .then(res => res.json())
    .then(response => {
      alert(response.message)
      location.reload()
    })
}