const toggleBtn = document.getElementsByClassName('toggle-btn')[0];
const navBtn = document.getElementsByClassName('nav-btn')[0];
const blogsCont = document.getElementById('blogs-cont');
const err = document.getElementById('error')
const msgBtn = document.getElementById('msg')
const message = document.getElementById('rev')

console.log(blogsCont)




toggleBtn.addEventListener('click', (e) =>{
    e.preventDefault();
    navBtn.classList.toggle('active');
})

const navclick = e => {
    navBtn.classList.toggle('active')
}

msgBtn.addEventListener('click', (e) => {
    e.preventDefault();
    sendmessage();
})

// const blogs = document.getElementsByClassName('blog-img');
// console.log(blogs.item(0).innerHTML)

// // firebase image

// // Create a root reference
// var storageRef = firebase.storage().ref();

// // Create a reference to 'mountains.jpg'
// var mountainsRef = storageRef.child('blog.jpg');

// // Create a reference to 'images/mountains.jpg'
// var mountainImagesRef = storageRef.child('images/blog-1.jpg');

// // While the file names are the same, the references point to different files
// mountainsRef.name === mountainImagesRef.name;           // true
// mountainsRef.fullPath === mountainImagesRef.fullPath;   // 
function blogid(id){
    localStorage.setItem('blogid', id)
}


async function getdata() {
    const blogData = await fetch('https://mybrandbb.herokuapp.com/getblogs');
    const blog = await blogData.json()
    .then(blog => {
        return blog
    })
    .then(data => {
        const blogDisp = data.slice(0,2);
        console.log(blogDisp)
        blogDisp.forEach(blog => {
            const pageblog = document.createElement('a')
            pageblog.setAttribute('data-id', blog._id)
            pageblog.setAttribute('href', "blogin.html")
                pageblog.innerHTML = `
                <div class="blog2 blog" onclick = "blogid(this.parentElement.getAttribute('data-id'))">
                        <img src="${blog.image}" class="blog-img" alt="">
                        <div class="blog-txt">
                            <h2>${blog.title}.</h2>
                            <p>${blog.descr}</p>
                        </div>
                </div>
                `
                blogsCont.appendChild(pageblog)
    
        })
    })
    
}
getdata()

async function sendmessage() {
    const name = localStorage.getItem('user')
  await fetch(`https://mybrandbb.herokuapp.com/send`,{
    method: 'POST',
    body: JSON.stringify({
      name:name,
      message: message.value
    }),
    headers: {"Content-type": "application/json;charset=UTF-8",
    "Authorization" : `bearer: ${localStorage.getItem('token')}`
  },
  })
  .then(res => res.json())
  .then(response => {
    if(typeof(response.message.name) === "string"){
     alert("message successfully sent")
     location.reload()
    }else if (response.message.includes('Invalid')) {
      err.innerHTML = "you have to be logged in to send a message or review"
    } else {
        err.innerHTML = response.message
    }
  })
}