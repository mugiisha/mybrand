const author = document.getElementById('author-name');
const blogImage = document.getElementById('image');
const title = document.getElementById('title');
const descr = document.getElementById('descr');
const comment = document.getElementById('comment');
const err = document.getElementById('err');
const commentList = document.getElementById('comments-list')
const commentBtn = document.getElementById('btn')

const id = localStorage.getItem('blogid');


commentBtn.addEventListener('click', () => {
  commeting()
})

async function getblog() {
    const blogData = await fetch(`https://mybrandbb.herokuapp.com/getblog/${id}`)
    const blog = await blogData.json()
    .then(blog => blog)
    .then(data => {
        console.log(data)
          author.innerHTML = `Author: ${data.blog.author}`
          blogImage.setAttribute('src', data.blog.image)
          title.innerHTML = data.blog.title
          descr.innerHTML = data.blog.descr
        })
}

  async function commeting() {
  const name = localStorage.getItem('user')
  await fetch(`https://mybrandbb.herokuapp.com/getblog/${id}/comment`,{
    method: 'POST',
    body: JSON.stringify({
      name:name,
      comment: comment.value,
      blog: id
    }),
    headers: {"Content-type": "application/json;charset=UTF-8",
    "Authorization" : `bearer: ${localStorage.getItem('token')}`
  },
  })
  .then(res => res.json())
  .then(response => {
    if(response.message.includes('successfully')){
     alert(response.message);
     location.reload()
    }else {
      err.innerHTML = response.message
    }
  })
  // .catch(err => alert(err))
 
}

async function getcomments() {
      await fetch(`https://mybrandbb.herokuapp.com/getBlog/${id}/getcomments`)
      .then(comments => comments.json())
      .then(data => {
           data.docs.forEach(d => {
               const li = document.createElement('li');
               const name = document.createElement('p')
               const commentt = document.createElement('span')
               li.setAttribute('data-id' , d._id)

               name.innerHTML = d.name
               commentt.innerHTML = d.comment

               li.appendChild(name)
               li.appendChild(commentt)

               commentList.appendChild(li)

    
           })
      
            
    
      })
    }
    getcomments()

getblog()