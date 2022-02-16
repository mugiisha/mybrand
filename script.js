const toggleBtn = document.getElementsByClassName('toggle-btn')[0]
const navBtn = document.getElementsByClassName('nav-btn')[0]

toggleBtn.addEventListener('click', () =>{
    navBtn.classList.toggle('active')
})