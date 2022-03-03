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