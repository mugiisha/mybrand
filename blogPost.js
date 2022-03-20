const today = new Date();

const arraymonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const msg_date = `${arraymonths[today.getMonth()]} ${today.getDay()}  ${today.getFullYear()}     ${today.getHours()}:${today.getMinutes()}`;

const createBlogForm = document.querySelector('#blogform');
const Title = document.querySelector('#title');
const author = document.querySelector('#author');
const description = document.querySelector('#description');
const blogImage = document.querySelector('#fileimage');


createBlogForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
    const imageFile = blogImage.files[0];
    const storageRef = firebase.storage().ref(`post_images/${imageFile.name}`);
    const uploadImage = storageRef.put(imageFile);
    uploadImage.snapshot.ref.getDownloadURL().then((downloadURL) => {
      console.log(downloadURL);

      db.collection('blogs').add({
        image: downloadURL,
        title: Title.value,
        Author: author.value,
        descriptiojn: description.value,

       date: msg_date,
      }).then(() => {
        createBlogForm.reset();
        location.href = 'index.html';
      }).catch((error) => {
        console.log(error);
      });
    });

    
  
});

//get blogs 
function renderblogs(doc) {
 const blogul = document.querySelector('.blog-list')
 const li = document.createElement('li')
 li.setAttribute('data-id' , doc.id);


// li.innerHTML = `<img src = '${doc.data().image}'> <h2>${doc.data().title}</h2> <p>${doc.data().descriptiojn} </p>  <div class="change">
// <button class="delete">delete blog</button>
// <button class="edit">edit blog</button>
// </div>`;

li.innerHTML = ` <div class="blog">
                    <img src="${doc.data().image}">
                    <div class="blog-txt">
                    <h2>${doc.data().title}</h2>
                    <p>${doc.data().descriptiojn}</p>
                    <button class="delete">delete blog</button>
                    <button class="edit">edit blog</button>
                    </div>
                </div>`
  // commentt.textContent = doc.data().comment;

  // name.appendChild(commentt)
  blogul.appendChild(li)

  
}

db.collection('blogs').get().then((snapshot) => {
  snapshot.docs.forEach(doc => {
      renderblogs(doc)
  })
})


//         db.collection("blogs").doc("wrqBTmuaQo3qI9KPI15l").delete().then(() => {
//     console.log("Document successfully deleted!");
// }).catch((error) => {
//     console.error("Error removing document: ", error);
// });

// db.collection("comments").get().then((querySnapshot) => {
//     querySnapshot.forEach((doc) => {
//         console.log(`${doc.id} => ${doc.data()}`);
//     });
// });