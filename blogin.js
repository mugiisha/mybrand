const com = document.querySelector('#comment')
const comments = document.querySelector('#comments')
const username = document.getElementById('name')
const btn = document.getElementById('btn')

btn.addEventListener('click', () => {
    let commenter = username.value;
    let commented = comment.value ;
    comments.innerHTML += `<h3>${commenter} </h3> <p> ${commented} </p>`
})