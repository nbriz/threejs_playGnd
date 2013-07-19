<?php

	$con=mysqli_connect("myhost","myuser","mypassw","mybd");

	if (mysqli_connect_errno()) {
	  echo "Failed to connect to MySQL: " . mysqli_connect_error();
	}


	$id = $_GET['id'];

	$getCode = mysqli_fetch_assoc(mysqli_query($con, "SELECT sketchCode FROM sketches WHERE id = $id"));
	$code = $getCode['sketchCode'];
	// echo $code;

	mysqli_close($con);

	// header( 'Location: http://brangerbriz.net/labs/threejs_playGnd/editor/?id=id'.$id.'#B/'.$code ) ; 	# WORX
	header( 'Location: http://threejsplaygnd.brangerbriz.net/editor/?id=id'.$id.'#B/'.$code ) ;				# WORX
	// header( 'Location: http://threejsplaygnd.brangerbriz.com/editor/?id=id'.$id.'#B/'.$code ) ; 			# DOESN'T WORK

	


?>
