			// ---------------------------------------------------------------------------------------------------------------------------
			//
			//     MISC FUNCTIONS
			//
			// ---------------------------------------------------------------------------------------------------------------------------

			function onDocumentMouseMove(event) {
				mouseX = ( event.clientX - windowHalfX );
				mouseY = ( event.clientY - windowHalfY );
			}

			function rnd(n){ var r = Math.round(n*100)/100; return r; } // round to nearest 100th

			function dec2hex(i) {	//convernt dat.gui's decimal to hex color values
				var result = "0x000000";
				if (i >= 0 && i <= 15) { result = "0x00000" + i.toString(16); }
				else if (i >= 16 && i <= 255) { result = "0x0000" + i.toString(16); }
				else if (i >= 256 && i <= 4095) { result = "0x000" + i.toString(16); }
				else if (i >= 4096 && i <= 65535) { result = "0x00" + i.toString(16); }
				else if (i >= 65535 && i <= 1048575) { result = "0x0" + i.toString(16); }
				else if (i >= 1048575 ) { result = '0x' + i.toString(16); }
				return result;
			}

			var storePnts;
			function randomPointInSphere( radius ) { // Random Points for ConvexGeometry
				return new THREE.Vector3(
					( Math.random() - 0.5 ) * 2 * radius,
					( Math.random() - 0.5 ) * 2 * radius,
					( Math.random() - 0.5 ) * 2 * radius
				);
			}
			function ranPnts(npts) { // // Random Points for ConvexGeometry
				var cpoints = [];
				for ( var i = 0; i < npts; i ++ ) {
					cpoints.push( randomPointInSphere( 100 ) );
				}
				storePnts = cpoints;
				return cpoints;
			}





