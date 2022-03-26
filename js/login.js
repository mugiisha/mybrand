const login = document.getElementById('log');
const suc = document.getElementById('success')
const err = document.getElementById('error')

function loginn(){
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    fetch('https://mybrandbb.herokuapp.com/login', {
      method: 'POST',
      body : JSON.stringify({
        email: email,
        password: password
      }),
      headers : {"Content-type": "application/json;charset=UTF-8"}
    }) 
    .then(res => res.json())
    .then(response => {
      if((response.message.includes('welcome'))&&(response.userinfo.role == 'admin')){

        localStorage.setItem('token', response.userinfo.token)
        localStorage.setItem('user', response.userinfo.name)

         alert(response.message)

          window.location.href = './dashboard.html'

        }else if ((response.message.includes('welcome'))&& (response.userinfo.role == 'user')){
          localStorage.setItem('token', response.userinfo.token)
          localStorage.setItem('user', response.userinfo.name)

          alert(response.message)

          window.location.href = './index.html'
          console.log(response)
        } else {
        err.innerHTML = response.message
      }
    })
    .catch(err => alert(err))
   
  }
  
  login.addEventListener('submit', (e) => {
    e.preventDefault();
    loginn()
  })