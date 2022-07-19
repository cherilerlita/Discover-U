const adminForm = document.querySelector('#adminForm');

function home() {
  auth.signOut();
  window.location.href = 'index.html';
}

adminForm.addEventListener('submit', (e) => {
  e.preventDefault();
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

  let text = adminForm['Password'].value;
  let aes = document.getElementById('AES');

  if (aes.checked) {
    const startEnc = performance.now();
    var method = 'AES192';
    var encryptedHex = _en_aes(text);
    console.log('AES 192:');
    console.log(encryptedHex);
    const endEnc = performance.now();
    var duration = endEnc - startEnc;
    // Add a new document with a generated id.
    db.collection('encrypt')
      .add({
        email: adminForm['EmailAddress'].value,
        plaintext: adminForm['Password'].value,
        ciphertext: encryptedHex,
        method: method,
        duration: duration,
      })
      .then((docRef) => {
        alert(
          'Send Data Success \n Method: ' +
            method +
            '\n Duration: ' +
            duration.toFixed(2) +
            ' seconds'
        );
        console.log('Document written with ID: ', docRef.id);
        window.location.href = 'admin.html';
      })
      .catch((error) => {
        console.error('Error adding document: ', error);
      });
  } else {
    const startEnc = performance.now();
    var method = 'No Encryption';
    var encryptedHex = text;
    console.log('No Encryption Happened');
    console.log(encryptedHex);
    const endEnc = performance.now();
    var duration = endEnc - startEnc;
    // Add a new document with a generated id.
    db.collection('no-encrypt')
      .add({
        email: adminForm['EmailAddress'].value,
        plaintext: adminForm['Password'].value,
        ciphertext: encryptedHex,
        method: method,
        duration: duration,
      })
      .then((docRef) => {
        alert(
          'Send Data Success \n Method: ' +
            method +
            '\n Duration: ' +
            duration.toFixed(2) +
            ' seconds'
        );
        console.log('Document written with ID: ', docRef.id);
        window.location.href = 'admin.html';
      })
      .catch((error) => {
        console.error('Error adding document: ', error);
      });
  }
});
