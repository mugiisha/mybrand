const toggleBtn = document.getElementsByClassName('toggle-btn')[0];
const navBtn = document.getElementsByClassName('nav-btn')[0];


toggleBtn.addEventListener('click', (e) =>{
    e.preventDefault();
    navBtn.classList.toggle('active');
})

const navclick = e => {
    navBtn.classList.toggle('active')
}

const blogs = document.getElementsByClassName('blog-img');
console.log(blogs.item(0).innerHTML)

// firebase image

// Create a root reference
var storageRef = firebase.storage().ref();

// Create a reference to 'mountains.jpg'
var mountainsRef = storageRef.child('blog.jpg');

// Create a reference to 'images/mountains.jpg'
var mountainImagesRef = storageRef.child('images/blog-1.jpg');

// While the file names are the same, the references point to different files
mountainsRef.name === mountainImagesRef.name;           // true
mountainsRef.fullPath === mountainImagesRef.fullPath;   // false 

async function getdata() {
    const blogData = await fetch('https://mybrandbb.herokuapp.com/getblogs');
    const blog = await blogData.json()
    .then(blog => {
        return blog
    })
    .then(data => {
        data.forEach(d => {
            console.log(d)
        })
    })
    
}
getdata()