const container = document.getElementById('container')


async function getblogs() {
    await fetch('https://mybrandbb.herokuapp.com/getblogs')
    .then(blog => blog.json())
    .then(data => {
        data.forEach(d => {
           let title = d.title;
           let image = d.image;
           let body = d.descr;
           let id = d._id
           console.log(d)
  
           container.innerHTML += `<div class="blog" data-id = "${id}">
               <img src="${image}" alt="">
           <div class="blog-text">
               <h2>${title}</h2>
               <p>${body}</p>
           </div>
       </div>`
         
  
        })
    })
}

getblogs()