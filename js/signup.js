const signup = document.getElementById('log');
const btn = document.getElementById('signup-btn');
const firstname = document.getElementById('firstname');
const lastname = document.getElementById('lastname');
const email = document.getElementById('email');
const password = document.getElementById('password');
const name = `${firstname} ${lastname}`

//creating a new user

// btn.addEventListener('click', (e) => {
//     e.preventDefault();
//     const email = document.getElementById('email').value;
//     const password = document.getElementById('password').value;
    
//     // console.log( email , password)
//     firebase.auth().createUserWithEmailAndPassword(email, password)
//     .then((userCredential) => {
//       // Signed in 
//       var user = userCredential.user;
//       // ...
//     })
//     .catch((error) => {
//       var errorCode = error.code;
//       var errorMessage = error.message;
//       // ..
//     });

// })

async function signupp(){
  const suc = document.getElementById('success')
  const err = document.getElementById('error')
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const firstname = document.getElementById('firstname').value;
  const lastname = document.getElementById('lastname').value;
  let fullname = `${firstname} ${lastname}`
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

signup.addEventListener('submit', (e) => {
  
  e.preventDefault();
  signupp()
})