const today = new Date();

const arraymonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const msg_date = `${arraymonths[today.getMonth()]} ${today.getDay()}  ${today.getFullYear()}     ${today.getHours()}:${today.getMinutes()}`;

const createBlogForm = document.getElementById('blogform');
const Title = document.getElementById('title');
const author = document.getElementById('author');
const description = document.getElementById('description');
const createBtn = document.getElementById('create-button');
const updateBtn = document.getElementById('update-button')
console.log(updateBtn)



createBlogForm.addEventListener('submit', (e) => {
  e.preventDefault()
  createblog();
})

updateBtn.addEventListener('click', (e) => {
  e.preventDefault()
  updateblog()
})


// createBlogForm.addEventListener('submit', (e) => {
//   e.preventDefault();
  
//     const imageFile = blogImage.files[0];
//     const storageRef = firebase.storage().ref(`post_images/${imageFile.name}`);
//     const uploadImage = storageRef.put(imageFile);
//     uploadImage.snapshot.ref.getDownloadURL().then((downloadURL) => {
//       console.log(downloadURL);

//       db.collection('blogs').add({
//         image: downloadURL,
//         title: Title.value,
//         Author: author.value,
//         descriptiojn: description.value,

//        date: msg_date,
//       }).then(() => {
//         createBlogForm.reset();
//         location.href = 'index.html';
//       }).catch((error) => {
//         console.log(error);
//       });
//     });

    
  
// });


// function renderblogs(doc) {
//  const blogul = document.querySelector('.blog-list')
//  const li = document.createElement('li')
//  li.setAttribute('data-id' , doc.id);


// li.innerHTML = `<img src = '${doc.data().image}'> <h2>${doc.data().title}</h2> <p>${doc.data().descriptiojn} </p>  <div class="change">
// <button class="delete">delete blog</button>
// <button class="edit">edit blog</button>
// </div>`;

// li.innerHTML = ` <div class="blog">
//                     <img src="${doc.data().image}">
//                     <div class="blog-txt">
//                     <h2>${doc.data().title}</h2>
//                     <p>${doc.data().descriptiojn}</p>
//                     <button class="delete">delete blog</button>
//                     <button class="edit">edit blog</button>
//                     </div>
//                 </div>`
//                 console.log(li)
//   // commentt.textContent = doc.data().comment;

//   // name.appendChild(commentt)
//   blogul.appendChild(li)

  
// }

// db.collection('blogs').get().then((snapshot) => {
//   snapshot.docs.forEach(doc => {
//       renderblogs(doc)
//   })
// })

async function getblogs() {
  const blogData = await fetch('https://mybrandbb.herokuapp.com/getblogs')
  const blog = await blogData.json()
  .then(blog => blog)
  .then(data => {
      data.forEach(d => {
         let title = d.title;
         let image = d.image;
         let body = d.descr;
         let id = d._id
         console.log(d)
         const blogul = document.querySelector('.blog-list')
         const li = document.createElement('li')
         li.setAttribute('data-id' , id);

         li.innerHTML = ` <div class="blog">
                              <div class= 'blogs-cont'>
                                <img src="${image}">
                                <div class="blog-txt">
                                  <h3>${title}</h3>
                                  <p>${body}</p>
                                </div>
                              </div>
                          </div>
                          <button class="delete" onclick = "deleteblog(this.parentElement.getAttribute('data-id'))">delete blog</button>
                          <button class="edit" onclick = "loadUpdate(this.parentElement.getAttribute('data-id'))" >edit blog</button>`
       

         blogul.appendChild(li)
      })
  })
  
}
getblogs()

async function deleteblog(id) {
  let token = localStorage.getItem('token')
  await fetch (`https://mybrandbb.herokuapp.com/deleteblog/${id}`, {
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

async function createblog() {
  const err = document.getElementById('error')
  const imageURL = document.getElementById('url').files[0]; 
  const formData = new FormData();
  formData.append("title", Title.value)
  formData.append("descr", description.value)
  formData.append("author", localStorage.getItem('user'))
  formData.append("image", imageURL)
  let token = localStorage.getItem('token')
  await fetch ('https://mybrandbb.herokuapp.com/createblog', {
    method: 'POST',
    body : formData,
    headers : {
      "Authorization": `bearer ${token}`
    }
  })
  .then(res => res.json())
  .then(response => {
    if (response.message.includes('required')){
      err.innerHTML = response.message
      console.log(response)
    }else {
      alert(response.message)
      location.reload()
    }
  })

}

async function loadUpdate(id){
  createBtn.style.display = "none";
  updateBtn.style.display = "block"
  await fetch (`https://mybrandbb.herokuapp.com/getblog/${id}`)
  .then(res => res.json())
  .then(response => {
    localStorage.setItem('blogid', response.blog._id)
    localStorage.setItem('blogimage', response.blog.image)
    Title.value = response.blog.title;
    description.value = response.blog.descr;
    console.log(response)
  })
}

async function updateblog(){
    const err = document.getElementById('error')
    let imageURL = document.getElementById('url').files[0];
    const id = localStorage.getItem('blogid')
    const formData = new FormData();
    formData.append("title", Title.value)
    formData.append("descr", description.value)
    formData.append("author", localStorage.getItem('user'))
    formData.append("image", imageURL)
    let token = localStorage.getItem('token')

    await fetch (`https://mybrandbb.herokuapp.com/updateblog/${id}`, {
      method: 'PATCH',
      body : formData,
      headers : {
        "Authorization": `bearer ${token}`
      }
    })
    .then(res => res.blob())
    .then(resp => {
      // if (resp.message.includes('successfully')){
      //   alert(resp.message)
      //   location.reload()
      // }else {
        // err.innerHTML = resp.message
        console.log(resp)
      // }
    })
}