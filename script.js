const toggleBtn = document.getElementsByClassName('toggle-btn')[0];
const navBtn = document.getElementsByClassName('nav-btn')[0];

toggleBtn.addEventListener('click', (e) =>{
    e.preventDefault();
    navBtn.classList.toggle('active');
})

const about = document.getElementById('about');
const design = document.getElementById('design');
const develop = document.getElementsByClassName('develop')[0];
const port = document.getElementsByClassName('por')[0];
const blo = document.getElementsByClassName('blo')[0];

const btn = document.getElementsByClassName('fa')[0];

btn.addEventListener('click', () => {
    about.classList.toggle('dark');
    design.classList.toggle('dark');
    develop.classList.toggle('dark');
    port.classList.toggle('dark');
    blo.classList.toggle('dark')
})

const newsLetter = document.querySelector('.more')

newsLetter.addEventListener('click', () =>{
    prompt('enter your email and subscribe to our newsletter')
})

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