const signupForm = document.querySelector('#registerForm');
signupForm.addEventListener('submit', (e) => {
  e.preventDefault();

  let agree = document.getElementById('Agree').checked;
  if (agree == false) {
    alert('You must agree all first');
    return;
  }

  function _convert1(text) {
    var tl = text.length;
    if (tl % 16) {
      text += '\x00'.repeat(16 - (tl % 16));
    }
    return text;
  }

  function _en_aes(text) {
    var key_192 = [
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
      21, 22, 23,
    ];
    var iv = [21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36];
    text = _convert1(text);
    var textBytes = aesjs.utils.utf8.toBytes(text);
    var aesCbc = new aesjs.ModeOfOperation.cbc(key_192, iv);
    var encryptedBytes = aesCbc.encrypt(textBytes);
    var encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);
    return encryptedHex;
  }

  let text = document.getElementById('Password').value;
  let male = document.getElementById('Male');

  var encryptedHex = _en_aes(text);

  // get user info
  if (male.checked) {
    var gender = 'Male';
  } else {
    var gender = 'Female';
  }

  const email = signupForm['EmailAddress'].value;
  const password = signupForm['Password'].value;

  // sign up the user & add firestore data
  auth
    .createUserWithEmailAndPassword(email, password)
    .then((cred) => {
      return db
        .collection('users')
        .doc(cred.user.uid)
        .set({
          firstname: document.getElementById('FirstName').value,
          lastname: document.getElementById('LastName').value,
          emailaddress: signupForm['EmailAddress'].value,
          password: encryptedHex,
          age: document.getElementById('Age').value,
          gender: gender,
        });
    })
    .then(() => {
      // close the signup modal & reset form
      alert('Register process success, please sign in now');
      signupForm.reset();
      document.getElementById('thankYou').style.display = 'block';
      signupForm.style.display = 'none';
    })
    .catch((err) => {
      alert(err.message);
    });
});
