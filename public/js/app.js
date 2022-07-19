function logout() {
  auth.signOut();
  window.location.href = 'logout.html';
}

function readTextFile(file) {
  var rawFile = new XMLHttpRequest();
  rawFile.open('GET', file, false);
  rawFile.onreadystatechange = function () {
    if (rawFile.readyState === 4) {
      if (rawFile.status === 200 || rawFile.status == 0) {
        var allText = rawFile.responseText;
        const result = allText.split(/\r?\n/);
        console.log(result);
        console.log(result[0]);
      }
    }
  };
  rawFile.send(null);
}

function showHide(show, hide) {
  let showEle = document.getElementById(show);
  let hideEle = document.getElementById(hide);
  showEle.style.display = 'block';
  hideEle.style.display = 'none';
}

function loadMap() {
  var canvas = document.getElementById('Canvas');
  var context = canvas.getContext('2d');

  var scale = 1;
  // var width = 700;

  let width = canvas.width;

  // if (screen_width >= 1280) {
  //   var scale = 1;
  //   var width = canvas.width;
  // } else if (screen_width <= 420) {
  //   width = screen_width;
  //   scale = width / canvas.width;
  // } else {
  //   width = (canvas.width * screen_width) / 1280;
  //   scale = screen_width / 1280;
  // }

  var Map = function () {
    this.Sprite = new Image();
    this.Sprite.src = 'img/gd_map600.jpg';

    this.Width = 640;
    this.Height = 640;
  };

  var Marker = function () {
    this.Sprite = new Image();
    this.Sprite.src = 'img/map_marker.png';
    this.Width = 50;
    this.Height = 50;
  };

  var firstLoad = function () {
    context.font = '15px Georgia';
    context.textAlign = 'center';
    // context.scale(dpr, dpr);
  };

  firstLoad();

  var main = function () {
    var refresh = document.getElementById('posRefresh');
    var pos = parseInt(refresh.value);

    draw(pos);

    pos = pos + 4;
    loop = 40;
    if (pos > loop) {
      pos = 0;
    }

    refresh.value = pos;
  };

  // function readTextFile(file) {
  //     var rawFile = new XMLHttpRequest();
  //     rawFile.open("GET", file, false);
  //     rawFile.onreadystatechange = function() {
  //         if (rawFile.readyState === 4) {
  //             if (rawFile.status === 200 || rawFile.status == 0) {
  //                 var allText = rawFile.responseText;
  //                 const result = allText.split(/\r?\n/);
  //                 console.log(result);
  //                 console.log(result[0]);
  //                 return 'test';
  //             }
  //         }
  //     }
  //     rawFile.send(null);
  // }
  // readTextFile = readTextFile("ALL_SIG.txt");
  // alert(readTextFile);
  // console.log(readTextFile);
  var draw = function (pos) {
    // Clear Canvas
    context.fillStyle = '#000';
    context.fillRect(0, 0, width, width);

    var map = new Map();
    context.drawImage(map.Sprite, 0, 0, map.Width, map.Height);
    var x1 = 0; // (akses point a / esp a X)
    var y1 = 11; // (akses point a / esp a Y)
    var x2 = 12; // (akses point b / esp b X)
    var y2 = 10; // (akses point b / esp b Y)
    var x3 = 9; // (akses point c / esp c X)
    var y3 = 0; // (akses point c / esp c Y)
    var x4 = 0; // (akses point d / esp d X)
    var y4 = 2; // (akses point d / esp d Y)
    var A1 = -82; // (ini adalah ketetapan jarak 1meter yg sudah di uji untuk akses point A  dengan cara mengambil data xample sebanyak 10 data, setelah itu data tersebut di rata-rata kan )
    var A2 = -86; // (ini adalah ketetapan jarak 1meter yg sudah di uji untuk akses point B  dengan cara mengambil data xample sebanyak 10 data, setelah itu data tersebut di rata-rata kan )
    var A3 = -71; // (ini adalah ketetapan jarak 1meter yg sudah di uji untuk akses point C  dengan cara mengambil data xample sebanyak 10 data, setelah itu data tersebut di rata-rata kan )
    var A4 = -82; // (ini adalah ketetapan jarak 1meter yg sudah di uji untuk akses point D  dengan cara mengambil data xample sebanyak 10 data, setelah itu data tersebut di rata-rata kan )

    /*
	        	var RSSI_A = value // (ini sinyal real perangakat itag dengan point A  yang sudah di rata2 kan)
	        	var RSSI_B = value // (ini sinyal real perangakat itag dengan point B  )
	        	var RSSI_C = value // (ini sinyal real perangakat itag dengan point C  )
	        	var RSSI_D = value // (ini sinyal real perangakat itag dengan point D  )
	        */
    // pengambilan data post
    var refresh = document.getElementById('posRefresh');
    var pos = parseInt(refresh.value);
    console.log('dataaaaaaaaaaaa post -----------------> ' + pos);

    var rawFile = new XMLHttpRequest();
    var file = 'js/ALL_SIG.txt';
    var RSSI_A = 0;
    var RSSI_B = 0;
    var RSSI_C = 0;
    var RSSI_D = 0;

    rawFile.open('GET', file, false);
    rawFile.onreadystatechange = function () {
      if (rawFile.readyState === 4) {
        if (rawFile.status === 200 || rawFile.status == 0) {
          var allText = rawFile.responseText;
          const result = allText.split(/\r?\n/);
          console.log('result data');
          console.log(result);

          console.log(result[0]);

          RSSI_A = parseInt(pos);
          RSSI_B = parseInt(pos + 1);
          RSSI_C = parseInt(pos + 2);
          RSSI_D = parseInt(pos + 3);

          console.log('show result pos a ' + RSSI_A);
          console.log('show result pos b ' + RSSI_B);
          console.log('show result pos c ' + RSSI_C);
          console.log('show result pos d ' + RSSI_D);

          RSSI_A = result[RSSI_A];
          RSSI_B = result[RSSI_B];
          RSSI_C = result[RSSI_C];
          RSSI_D = result[RSSI_D];

          console.log('dengan nilai RSSI_A ' + RSSI_A);
          console.log('dengan nilai RSSI_B ' + RSSI_B);
          console.log('dengan nilai RSSI_C ' + RSSI_C);
          console.log('dengan nilai RSSI_D ' + RSSI_D);
        }
      }
    };
    rawFile.send(null);

    // pemilihan sinyal paling kuat
    // sinyal yg kuat adalah sinyal yang nilainya besar ex : -20 sedangkan sinyal yg lemah adalah -90

    // var RSSI_A = -73 // (ini sinyal real perangakat itag dengan point A  yang sudah di rata2 kan)
    // var RSSI_B = -82 // (ini sinyal real perangakat itag dengan point B  yang sudah di rata2 kan)
    // var RSSI_C = -79 // (ini sinyal real perangakat itag dengan point C  yang sudah di rata2 kan)
    // var RSSI_D = -84 // (ini sinyal real perangakat itag dengan point D  yang sudah di rata2 kan)
    NilaiTerendah = Math.min(RSSI_A, RSSI_B, RSSI_C, RSSI_D);
    console.log('NilaiTerendah => ' + NilaiTerendah);

    // if (pos > 40) {

    //     var RSSI_nilai_1 = RSSI_A;
    //     var RSSI_nilai_2 = RSSI_B;
    //     var RSSI_nilai_3 = RSSI_C;
    // } else {

    //     var RSSI_nilai_1 = RSSI_A;
    //     var RSSI_nilai_2 = RSSI_B;
    //     var RSSI_nilai_3 = RSSI_D;
    // }

    var RSSI_nilai_1 = RSSI_A;
    var RSSI_nilai_2 = RSSI_B;
    var RSSI_nilai_3 = RSSI_C;
    // console.log('NilaiTerendah => '.NilaiTerendah)
    /*
	        switch (NilaiTerendah) {
	            case RSSI_A:
	                console.log('formula yg dijalanin RSSI_A')
	                var RSSI_nilai_1 = RSSI_B;
	                var RSSI_nilai_2 = RSSI_C;
	                var RSSI_nilai_3 = RSSI_D;
	                break;
	            case RSSI_B:
	                console.log('formula yg dijalanin RSSI_B')
	                var RSSI_nilai_1 = RSSI_A;
	                var RSSI_nilai_2 = RSSI_C;
	                var RSSI_nilai_3 = RSSI_D;
	                break;
	            case RSSI_C:
	                console.log('formula yg dijalanin RSSI_C')
	                var RSSI_nilai_1 = RSSI_A;
	                var RSSI_nilai_2 = RSSI_B;
	                var RSSI_nilai_3 = RSSI_D;
	                break;
	            case RSSI_D:
	                console.log('formula yg dijalanin RSSI_D')
	                var RSSI_nilai_1 = RSSI_A;
	                var RSSI_nilai_2 = RSSI_B;
	                var RSSI_nilai_3 = RSSI_C;
	                break;
	            default:
	                console.log('formula yg dijalanin RSSI_C')
	                var RSSI_nilai_1 = RSSI_A;
	                var RSSI_nilai_2 = RSSI_B;
	                var RSSI_nilai_3 = RSSI_D;
	                break;
	        }
			*/
    // proses cari rumus jarak d trilateration
    // proses cari rumus jarak d trilateration untuk yg gate A
    var tahap1_hasild1 = A1 - RSSI_nilai_1; // D1 (jarak antara akses point A dengan itag  ) -4,5
    console.log(
      'A1(-82) => ' +
        A1 +
        ' dan RSSI_nilai_1(-73) ' +
        RSSI_nilai_1 +
        ' hasilnya adalah ' +
        tahap1_hasild1
    );
    var tahap2_hasild1 = tahap1_hasild1 / 20; // D1 (jarak antara akses point A dengan itag  ) -4,5
    console.log(' hasil  dari di bagi 20' + tahap2_hasild1);
    var hasild1 = tahap2_hasild1 * 10; // D1 (jarak antara akses point A dengan itag  ) -4,5
    // var hasild1 = 10 * (A1 - RSSI_nilai_1) / 20; // D1 (jarak antara akses point A dengan itag  ) -4,5
    console.log('hasild1 => ' + hasild1 + ' seharusnya -4,5');

    // proses cari rumus jarak d trilateration untuk yg gate B
    // var hasild2 = 10 * (A2 + RSSI_nilai_2) / 20; // D2 (jarak antara akses point B dengan itag  )
    var tahap1_hasild2 = A2 - RSSI_nilai_2; // D1 (jarak antara akses point A dengan itag  ) -4,5
    var tahap2_hasild2 = tahap1_hasild2 / 20; // D1 (jarak antara akses point A dengan itag  ) -4,5
    var hasild2 = tahap2_hasild2 * 10; // D1 (jarak antara akses point A dengan itag  ) -4,5

    // proses cari rumus jarak d trilateration untuk yg gate C
    // var hasild3 = 10 * (A3 + RSSI_nilai_3) / 20; // D3 (jarak antara akses point C dengan itag  )
    var tahap1_hasild3 = A3 - RSSI_nilai_3; // D1 (jarak antara akses point A dengan itag  ) -4,5
    var tahap2_hasild3 = tahap1_hasild3 / 20; // D1 (jarak antara akses point A dengan itag  ) -4,5
    var hasild3 = tahap2_hasild3 * 10; // D1 (jarak antara akses point A dengan itag  ) -4,5

    // proses cari rumus jarak d trilateration untuk yg gate C
    // var hasild3 = 10 * (A3 + RSSI_nilai_3) / 20; // D3 (jarak antara akses point C dengan itag  )
    // var tahap1_hasild4 = A4 - RSSI_nilai_4; // D1 (jarak antara akses point A dengan itag  ) -4,5
    // var tahap2_hasild4 = tahap1_hasild4 / 20; // D1 (jarak antara akses point A dengan itag  ) -4,5
    // var hasild4 = tahap2_hasild4 * 10; // D1 (jarak antara akses point A dengan itag  ) -4,5

    //masuk ke rumus trilateration
    var h = -2 * x1 + 2 * x2;
    var i = -2 * y1 + 2 * y2;
    var j = hasild1 ** 2 - hasild2 ** 2 - x1 ** 2 + x2 ** 2 - y1 ** 2 + y2 ** 2;
    //var j = Math.pow(hasild1, 2) - Math.pow(hasild2, 2) - Math.pow(x1, 2) + Math.pow(x2, 2) - Math.pow(y1, 2) + Math.pow(y2, 2);
    //var j = (hasild1 * 2) - (hasild2 * 2) - (x1 * 2) + (x2 * 2) - (y1 * 2) + (y2 * 2);
    var k = -2 * x2 + 2 * x3;
    var l = -2 * y2 + 2 * y3;
    var m = hasild2 ** 2 - hasild3 ** 2 - x2 ** 2 + x3 ** 2 - y2 ** 2 + y3 ** 2;
    //var m = Math.pow(hasild2, 2) - Math.pow(hasild3, 2) - Math.pow(x2, 2) + Math.pow(x3, 2) - Math.pow(y2, 2) + Math.pow(y3, 2);
    //var m = (hasild2 * 2) - (hasild3 * 2) - (x2 * 2) + (x3 * 2) - (y2 * 2) + (y3 * 2);

    //data untuk mencari x
    var hasiljl = j * l;
    var hasilmi = m * i;
    var hasillh = l * h;
    var hasilik = i * k;

    //data untuk mencari Y
    var hasiljk = j * k;
    var hasilhm = h * m;
    //var hasilki = k * i;
    //var hasilhl = h * l;

    //data atas X
    var hasilxx = hasiljl - hasilmi;
    //data bawah x
    var hasilxxx = hasillh - hasilik;

    //data atas Y
    var hasilyy = hasiljk - hasilhm;
    //data bawah Y
    var hasilyyy = hasilik - hasillh;

    //data pembagian X
    hasilxx1 = hasilxx / hasilxxx;

    //data pembagian Y
    hasilyy1 = hasilyy / hasilyyy;

    // printf("hasilx =%d", hasilx);
    //var hasily = j * k - h * m / i * k - h * l;
    // printf("hasily =%d", hasily);

    var marker = new Marker();

    // var posX = document.getElementById('posX');
    var posX = hasilxx1 * 50;
    var posX = posX - 50;
    console.log('posX 2 => ' + hasilxx1);
    console.log('posX fixel => ' + posX);
    // var posx = parseInt(posX.value);

    // var posY = document.getElementById('posY');
    var posY = hasilyy1 * 50;
    var posY = posY - 50;
    console.log('posY 8 => ' + hasilyy1);
    console.log('posY fixel => ' + posY);
    //var posy = parseInt(posY.value);

    context.drawImage(marker.Sprite, posY, posX, marker.Width, marker.Height);
  };

  // setInterval(main, (1000 / 60)); // Refresh 60 times a second
  setInterval(main, 1000); // Refresh 60 times a second
}
