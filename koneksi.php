<?php 
	$servername = "localhost";
	$database = "indoorlocal";
	$username = "root";
	$password = "";
	$koneksi = mysqli_connect($servername,$username,$password,$database);
 
	// Check connection
	if (mysqli_connect_errno()){
		echo "Koneksi database gagal : " . mysqli_connect_error();
	}


	// menangkap data yang di kirim dari form
	$topic = @$_POST['topic'];
	$value = @$_POST['value'];
	$status = @$_POST['status'];

	// menginput data ke database
	mysqli_query($koneksi,"insert into discoveru values('$topic','$value','$status')");
	// mysqli_query($koneksi,"insert into discoveru (topic, value, status) VALUES ('dikry/locator/A_SIG', 12, 'test')");
echo "berhasil diinput";

	$A_SIG = 20;
	$B_SIG = 20;
	$C_SIG = 20;
	$D_SIG = 10;
?>