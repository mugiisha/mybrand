const toggleBtn = document.getElementsByClassName('toggle-btn')[0]
const navBtn = document.getElementsByClassName('nav-btn')[0]

toggleBtn.addEventListener('click', () =>{
    navBtn.classList.toggle('active')
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

const blogs = document.getElementsByClassName('blog');
console.log(blogs.item(0).innerHTML)

