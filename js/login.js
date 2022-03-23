const email = document.getElementById('email');
const password = document.getElementById('password');
const login = document.getElementById('log')

function loginn(){
    fetch('https://mybrandbb.herokuapp.com/register', {
      method: 'POST',
      body : JSON.stringify({
        name : fullname,
        email: email,
        password: password
      }),
      headers : {"Content-type": "application/json;charset=UTF-8"}
    }) 
    .then(res => res.json())
    .then(response => {
      if(response.message.includes('successfully')){
        suc.innerHTML = `${response.message} go to login page`
      }else {
        err.innerHTML = response.message
      }
    })
    .catch(err => alert(err))
   
  }
  
  login.addEventListener('submit', (e) => {
    
    e.preventDefault();
    login()
  })