<?php

if(isset($_POST['sketchCode'])) {

	$con=mysqli_connect("myhost","myuser","mypassw","mybd");
	//$con=mysqli_connect("myhost","myuser","mypassw","mybd");
	// Check connection
	if (mysqli_connect_errno())
	  {
	  echo "Failed to connect to MySQL: " . mysqli_connect_error();
	  }

	$sketchName = mysqli_real_escape_string($con, $_POST[sketchName]);
	$userName = mysqli_real_escape_string($con, $_POST[userName]);
	$sketchCode = mysqli_real_escape_string($con, $_POST[sketchCode]);
	$isForkOf = mysqli_real_escape_string($con, $_POST[isForkOf]);

	$sql="INSERT INTO sketches (sketchName, userName, sketchCode, isForkOf)
	VALUES
	('$sketchName','$userName','$sketchCode','$isForkOf')";

	if (!mysqli_query($con,$sql))
	  {
	  die('Error: ' . mysqli_error($con));
	  }

	mysqli_close($con);
}

?>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">

		<style>
			body {
				background-color: #ffcc88;
				margin: 0;
				overflow: hidden;
				font-family: Arial;
			}


			.bg {
				position: fixed;
				top:-275px; left:50px;
				z-index: -1;
				font-family: monospace;
				color: rgba(0,0,0,0.4);
				line-height: 0px;
			}

			.frame {
				width:800px;
				border: 50px solid #000;
				opacity: 1;
	
			}
			.element {
				width: 800px;
				height: 250px;
				background-color: #000;
			}
				.name {
					position: absolute;
					top: 120px;
					width: 100%;
					font-size: 70px;
					font-family: sans-serif;
					color: #fff;
					font-weight: bold;
					overflow: hidden;
					white-space: nowrap;
				}

				.author {
					position: absolute;
					top: 196px;
					width: 100%;
					font-size: 70px;
					font-family: sans-serif;
					color: #fff;
					/*font-weight: bold;*/
					overflow: hidden;
					white-space: nowrap;
				}

			a {

				color: #ffffff;
				text-decoration: none;

			}

			.menu {
				position: absolute;
				top:0px; left:0px;
				height: 22px; width:100%;
				color:#222; 
				background-color: #000;
				font-size: 13px;
				font-family: 'Lucida Grande', Ariel, sans-serif;
				padding: 6px 0 2px 10px;
				margin-top: -2px;
				z-index: 1000;
			}
			.menu a { color:#777; }
			.menu a:hover { color:#e43f8c; }

			.nfo {
				padding: 15px;
				background: #000;
				position: absolute;
				top: 27px;
				right: 15px;
				z-index: 10000;
			}




		</style>
	</head>
	<body>

		<div class="bg" id="bg"></div>

		<div class="menu">
			<a href="../" style="margin-right:50px;">_three.js playGnd</a>
			<a href="../gui" style="margin-right:50px">[1] gui</a>
			<a href="../editor/editor.html" target="_blank" style="margin-right:50px">[2] editor</a>
    		<a href="../archive" style="color:#fff">[3] archive</a>
		</div>

		<div class="nfo" id="nfo">
			<img src="../images/arrows.gif"><br>
			<img src="../images/enter.gif">
		</div>

<!-- 		<div class="frame">
		<div class="element">
			<div class="name">Test Project</div>
			<div class="author">by Nick Briz</div>
		</div>
		</div> -->
		
		<script src="../js/three.min.js"></script>
		<script src="../js/Detector.js"></script>
		<script src="../js/tween.min.js"></script>
		<script src="../js/CSS3DRenderer.js"></script>

		<script src="../editor/js/codemirror/codemirror.js"></script>
		<script src="../editor/js/rawinflate.js"></script>

		<script>

			if ( ! Detector.webgl ) Detector.addGetWebGLMessage();
			
			var data = [

				<?php

					$con=mysqli_connect("myhost","myuser","mypassw","mybd");
					//$con=mysqli_connect("myhost","myuser","mypassw","mybd");
					// Check connection
					if (mysqli_connect_errno()) {
						echo "Failed to connect to MySQL: " . mysqli_connect_error();
					}

					$result = mysqli_query($con,"SELECT * FROM sketches");
					$numRows = mysqli_num_rows($result);
					$i=1;

					while($row = mysqli_fetch_array($result)) {
						echo "['" . $row['sketchName'] . "', '" . $row['userName'] . "', '" . $row['sketchCode'] . "', 'id" . $row['id'] . "', '" . $row['isForkOf'] . "']";
						if($i==$numRows){} else { echo ","; }
						$i++;
					}

					mysqli_close($con);
				
				?>

			];

			 <?php

				if(isset($_POST['sketchCode'])) {
					$con=mysqli_connect("myhost","myuser","mypassw","mybd");
					//$con=mysqli_connect("myhost","myuser","mypassw","mybd");
					// Check connection
					if (mysqli_connect_errno()) {
					  echo "Failed to connect to MySQL: " . mysqli_connect_error();
					}

					$result = mysqli_query($con,"SELECT id FROM sketches ORDER BY id DESC LIMIT 1");
					while($row = mysqli_fetch_array($result)){
					  $lastID = $row['id'];
					}
					print 'alert("your sketch has been added to the archive >> navigate down to find it or copy this short_url >> http://threejsplaygnd.brangerbriz.net/s/?id=' . $lastID . '")'; 


					mysqli_close($con);
				}
			?>

			var objArrays = [];			// css3 objects
			var targsArrays = [];		// target locations for tweening
			
			var camera, scene, renderer, container;

			var mouseX = 0, mouseY = 0;
			var windowHalfX = window.innerWidth / 2;
			var windowHalfY = window.innerHeight / 2;
			
			// global vars for navigation
			var currentID = 'id1';
			var showingforks = false;	
			var history = [];

			var inTween = 500;
			var outTween = 300;
			var jim;



			// ------------------------------------------------------------------------------------------------------------
			// ------------------------------------ SETUP -----------------------------------------------------------------
			// ------------------------------------------------------------------------------------------------------------


			function setup() {

				var W = window.innerWidth, H = window.innerHeight;
				renderer = new THREE.CSS3DRenderer();
				renderer.setSize( W, H );
				document.body.appendChild( renderer.domElement );

				camera = new THREE.PerspectiveCamera( 75, W/H, 1, 10000 );
				camera.position.z = 1800;

				scene = new THREE.Scene();

				container = new THREE.Object3D();

				scene.add(container);

				makeColumn(''); // null = fork of none (ie. initial column)

				window.addEventListener( 'resize', onWindowResize, false );
				document.addEventListener( 'mousemove', onDocumentMouseMove, false );
			}


			// ------------------------------------------------------------------------------------------------------------
			// ------------------------------------ MAKE COLUMN -----------------------------------------------------------------
			// ------------------------------------------------------------------------------------------------------------

			function makeColumn(forkof) {

		    	oCnt = history.length;

		    	var cnt = 0;	// for y (targets) positioning 

		    	// console.log("new objArrays[ "+oCnt+" ]");

		    	var obj = new Array();
		    	objArrays[oCnt] = obj
		    	var objects = objArrays[oCnt];		// create new array + add to objArrays (ie. a column, random elements position)

		    	var targs = new Array();
		    	targsArrays[oCnt] = targs;
		    	var targets = targsArrays[oCnt];	// create new array + add to targsArrays (ie. column's final elements position)

		    	var itemIDz = [];					// collect all id's in this column for history array

				for ( var i = 0; i < data.length; i ++ ) {

					if(data[ i ][4] == forkof){ 

						// ---------------- make objects (CSS3Objects)
						
						var item = data[ i ];

						itemIDz.push(item[ 3 ]);

						var frame = document.createElement( 'a' );
						frame.className = 'frame';
						frame.href = "http://brangerbriz.net/labs/threejs_playGnd/editor/?id="+ item[3] +"#B/" + item[2];
						frame.target = "_blank";
						frame.name = item[ 2 ];
						frame.id = item[ 3 ];

						var element = document.createElement( 'div' );
						element.className = 'element';
						frame.appendChild( element );

						var name = document.createElement( 'div' );
						name.className = 'name';
						name.textContent = item[ 0 ];
						element.appendChild( name );

						var author = document.createElement( 'div' );
						author.className = 'author';
						author.innerHTML = 'by ' + item[ 1 ];
						element.appendChild( author );

						frame.addEventListener( 'mouseover', function ( event ) {
							var t = document.getElementById(this.id);
								t.style.borderColor = 'rgba(228,63,140,0.0)';
								t.children[0].style.background = 'rgba(228,63,140,0.0)';
								t.children[0].children[0].style.color = '#000';
								t.children[0].children[1].style.color = '#000';
						});

						frame.addEventListener( 'mouseout', function ( event ) {
							if(this.id != currentID) {			
								var t = document.getElementById(this.id);				
									t.style.borderColor = '#000';
									t.children[0].style.background = '#000';
									t.children[0].children[0].style.color = '#fff';
									t.children[0].children[1].style.color = '#fff';
							} else {
								var t = document.getElementById(this.id);				
									t.style.borderColor = 'rgba(228,63,140,0.6)';
									t.children[0].style.background = 'rgba(228,63,140,0.6)';
									t.children[0].children[0].style.color = '#fff';
									t.children[0].children[1].style.color = '#fff';
							}
						});

						var object = new THREE.CSS3DObject( frame );
						object.position.x = Math.random() * 4000 - 2000;
						object.position.y = Math.random() * 4000 - 2000;
						object.position.z = Math.random() * 4000 - 2000;

						object.rotation.x = Math.random() * 2;
						object.rotation.y = Math.random() * 2;
						object.rotation.z = Math.random() * 2;

						container.add( object );

						objects.push( object );	

						// ---------------- make targets (ie. tweening destination)

						var twObject = new THREE.Object3D();
						twObject.position.x = ( (history.length+1) * 950 ) - 700;
						twObject.position.y = - ( cnt * 400 ) + 1100;
						targets.push( twObject );

						cnt++;
					}

				}
				
				history.push(itemIDz);				// add id array to history array
				tweenin( inTween, objects, targets );


			}


			// ------------------------------------------------------------------------------------------------------------
			// ------------------------------------ TWEEN -----------------------------------------------------------------
			// ------------------------------------------------------------------------------------------------------------

			function tweenin( duration, objs, targs ) {
				// TWEEN.removeAll();
				var o = objs;
				var t = targs;

				for ( var i = 0; i < o.length; i ++ ) { 

					var object = o[ i ];
					var target = t[ i ];

					new TWEEN.Tween( object.position )
						.to( { x: target.position.x, y: target.position.y, z: target.position.z }, Math.random() * duration + duration )
						.easing( TWEEN.Easing.Exponential.InOut )
						.start();

					new TWEEN.Tween( object.rotation )
						.to( { x: target.rotation.x, y: target.rotation.y, z: target.rotation.z }, Math.random() * duration + duration )
						.easing( TWEEN.Easing.Exponential.InOut )
						.start();
				}
			}


			function tweenout( duration, objs ) {
				// TWEEN.removeAll();
				var o = objs;

				for ( var i = 0; i < o.length; i ++ ) { 

					var object = o[ i ];
					var ranPos = Math.random() * 4000 - 2000;
					var ranRot = Math.random() * 2;

					new TWEEN.Tween( object.position )
						.to( { x: ranPos, y: ranPos, z: ranPos }, Math.random() * duration + duration )
						.easing( TWEEN.Easing.Exponential.InOut )
						.start();

					new TWEEN.Tween( object.rotation )
						.to( { x: ranRot, y: ranRot, z: ranRot }, Math.random() * duration + duration )
						.easing( TWEEN.Easing.Exponential.InOut )
						.start();
				}
			}

			function tweenright() {
					// TWEEN.removeAll();
					var duration = 750;
					var xPos = container.position.x;

					new TWEEN.Tween( container.position )
							.to( { x: xPos -= 950 }, duration )
							.easing( TWEEN.Easing.Exponential.Out )
							.start();
			}

			function tweenleft() {
					// TWEEN.removeAll();
					var duration = 750;
					var xPos = container.position.x;

					new TWEEN.Tween( container.position )
							.to( { x: xPos += 950 }, duration )
							.easing( TWEEN.Easing.Exponential.Out )
							.start();
			}

			function tweenback(object, opac) {
					// TWEEN.removeAll();
					var duration = 1500;
					var zPos = object.position.z;
					var xPos = object.position.x;
					var yRot = object.rotation.y;

					object.element.style.opacity = opac;

					new TWEEN.Tween( object.position )
							.to( { z: zPos -= 250}, duration )
							.easing( TWEEN.Easing.Exponential.Out )
							.start();

					// if(object.rotation.y > -0.75 ){
					// 	new TWEEN.Tween( object.rotation )
					// 		.to( { y: yRot -= 0.125 }, duration )
					// 		.easing( TWEEN.Easing.Exponential.InOut )
					// 		.start();
					// }
			}


			// ------------------------------------------------------------------------------------------------------------
			// ------------------------------------ DRAW -----------------------------------------------------------------
			// ------------------------------------------------------------------------------------------------------------


			function onWindowResize() {
				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();
				renderer.setSize( window.innerWidth, window.innerHeight );
			}

			function onDocumentMouseMove(event) {
				mouseX = ( event.clientX - windowHalfX );
				mouseY = ( event.clientY - windowHalfY );
			}

			function draw() {

				requestAnimationFrame( draw );
				TWEEN.update();

				camera.position.x += ( mouseX - camera.position.x ) * .05;
				camera.position.y = THREE.Math.clamp( camera.position.y + ( - ( mouseY - 1000 ) - camera.position.y ) * .05, 50, 2000 );
				// camera.position.z = (mouseX + mouseY) * 2;

				render();
			}

			function render() {
				renderer.render( scene, camera );
			}

			setup();
			draw();







			// ------------------------------------------------------------------------------------------------------------
			// ------------------------------------ BACKGROUND STUFFZ -----------------------------------------------------------------
			// ------------------------------------------------------------------------------------------------------------

			var hi=1, h=0;
			function bgHue() {
				h+=hi;
				if(h>=360){ h=0; }
				var bgh = document.body.style;
				bgh.background =  "hsl("+h+",50%, 50%)";
			} 
			setInterval(bgHue,50);


			var decode = function ( string ) {
				return RawDeflate.inflate( window.atob( string ) );
			};
			var bgCode = "";

			var documents = [ { filename: 'webgl_sketch', filetype: 'text/plain', autoupdate: true, code: bgCode } ];

			if ( localStorage.codeeditor !== undefined ) {
				documents = JSON.parse( localStorage.codeeditor );
			}

			var bg = CodeMirror( document.getElementById( 'bg' ));
			bg.setValue(decode(bgCode));




			// ------------------------------------------------------------------------------------------------------------
			// ------------------------------------ FADE OUT CONTROLLz -----------------------------------------------------------------
			// ------------------------------------------------------------------------------------------------------------

			var fcnt=1, inc=0.1;
			function fadeOut() {

				var nfo = document.getElementById('nfo');
				var opac = fcnt;
				nfo.style.opacity = fcnt;
				fcnt-=inc;

				if(fcnt >= 0){ setTimeout("fadeOut()",10); } 
				else { nfo.style.opacity = 0; }
			}


			// ------------------------------------------------------------------------------------------------------------
			// ------------------------------------ CONTROLLZ -----------------------------------------------------------------
			// ------------------------------------------------------------------------------------------------------------

			// current coordinates on grid
			var curX = 0;	
			var curY = 0;
			var Yparents = [];	// history of where curY left off before moving-right to fork column
			var colHeight = objArrays[objArrays.length-1].length;
		
			document.getElementById(currentID).style.borderColor = 'rgba(228,63,140,0.6)'; 
			document.getElementById(currentID).firstChild.style.background = 'rgba(228,63,140,0.6)'; 

			document.onkeydown=function(e){
			    var e=window.event || e

			    if(e.keyCode == 37) { //left
			    	if(curX>0){
				    	curX--;
				    	curY = Yparents[Yparents.length-1];
				    	navigate('left');
				    	Yparents.pop();	
						// if(history.length>4){
							tweenleft();
						// }		    		
			    	}
			    	if(fcnt==1){fadeOut();}
			    }

			    if(e.keyCode == 38) { //up
			    	if(curY>0){
						curY--; 
						navigate('up');
			    	}
			    	if(fcnt==1){fadeOut();}
			    }

			    if(e.keyCode == 39) { //right
			    	if(curX < (history.length-1)){
				    	Yparents.push(curY);
				    	curY = 0;
				    	curX++;
				    	navigate('right');
						// if(history.length>3){
							tweenright();
						// }
			    	}
			    	if(fcnt==1){fadeOut();}
			    }

			    if(e.keyCode == 40) { //down
			    	if(curY < colHeight-1){
						curY++;
						navigate('down');
			    	} 
			    	if(fcnt==1){fadeOut();}
			    }

			    if(e.keyCode == 13) { //enter
			    	document.getElementById(currentID).click();
			    	if(fcnt==1){fadeOut();}
			    }
			}

			function navigate(direction){

				var id = history[ curX ][ curY ];
				var prevId = currentID;
				currentID = id;

				document.getElementById(id).style.borderColor = 'rgba(228,63,140,0.6)'; 
				document.getElementById(id).firstChild.style.background = 'rgba(228,63,140,0.6)'; 

				document.getElementById(prevId).style.borderColor = '#000'; 
				document.getElementById(prevId).firstChild.style.background = '#000'; 	

				bg.setValue(decode(document.getElementById(id).name)); 
				document.getElementById('bg').children[0].children[0].style.top = "0px";	// fix CodeMirror bug
				document.getElementById('bg').children[0].children[2].style.height = "0px"; // fix CodeMirror bug

				// move column up (where 'objects' is all the items in a column)
				var objects = objArrays[curX];
				for(var i = 0; i < objects.length; i++) {
					if(direction=='down'){ objects[i].position.y += 400;  }
					if(direction=='up'){ objects[i].position.y -= 400;  }
				};

				// if(direction=='right'){  
				// 	for(var i = 0; i < objArrays.length-1; i++) {
				// 		var objects = objArrays[i];
				// 		var inc = 0.25, 
				// 			cur = (objects.element.style.opacity<1) ? objects.element.style.opacity : 1; 
				// 			cur -= inc;
				// 		for(var j = 0; j < objects.length; j++) {
				// 			tweenback(objects[j],cur);
				// 		}
				// 	}
				// }

				// if(direction=='left'){  
				// 	for(var i = 0; i < objArrays.length-1; i++) {
				// 		var objects = objArrays[i];
				// 		for(var j = 0; j < objects.length; j++) {


				// 		}
				// 	}
				// }

				var hasforks = false;
		    	var itemIDz = [];					// collect all id's of forks for history

		    	// are there forks shown to the right of current column
				if(curX < (history.length-1)){ showingforks = true; } 
				else { showingforks = false; }
		    					
				//remove the previous item's forks if it had any
				if(showingforks==true && direction!='right' || direction=='left'){

					tweenout(outTween,objArrays[objArrays.length-1]);

					setTimeout(
						(function(){

							// remove any listed forks (and forks of forks)
							var childColumns = (history.length-1) - curX;
							for (var i = 0; i < childColumns; i++) {
								history.pop();	
								for (var j = 0; j < objArrays[objArrays.length-1].length; j++) {
									var o = objArrays[objArrays.length-1][ j ];
									o.parent.remove( o );				
									renderer.cameraElement.removeChild( o.element );
								};
								objArrays.pop();
							};

							//check if current item has forks, if so make 'em
							for ( var i = 0; i < data.length; i++ ) {
								if(data[ i ][4] == id){ hasforks = true; break }
							}
							if(hasforks==true){ makeColumn(id); }

						}),outTween);

				}  else {

					//check if current item has forks, if so make 'em
					for ( var i = 0; i < data.length; i++ ) {
						if(data[ i ][4] == id){ hasforks = true; break }
					}
					if(hasforks==true){ makeColumn(id); }

				}

				colHeight = objArrays[curX].length; // for 'down' conditional
			
			}	

		</script>
		<script>
		  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
		  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
		  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
		  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

		  ga('create', 'UA-6098550-26', 'brangerbriz.net');
		  ga('send', 'pageview');

		</script>
		
	</body>
</html>