let uid;
// const authenticated = parseInt(localStorage.getItem('auth'));

// auth.onAuthStateChanged((user) => {
//   if (user) {
//     uid = user.uid;
//     // localStorage.setItem('auth', 1);
//     authUser(user);
//   } else {
//     // localStorage.setItem('auth', 0);
//     // console.log(uid);
//     authUser();
//   }
// });

// login
const loginForm = document.querySelector('#loginForm');
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // get user info
  const email = loginForm['EmailAddress'].value;
  const password = loginForm['Password'].value;

  const admEmail = 'admin@discoveru.com';

  // log the user in
  if (email != admEmail) {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        console.log(user);
        // ...
      })
      .then(() => {
        // Move up to dashboards
        alert('You have successfully signed in');
        window.location.href = 'dashboard.html';
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        alert(errorMessage);
      });
  } else {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        console.log(user);
        // ...
      })
      .then(() => {
        // Move up to dashboards
        alert('You have successfully signed in');
        window.location.href = 'admin.html';
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        alert(errorMessage);
      });
  }
});
