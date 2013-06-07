			// ---------------------------------------------------------------------------------------------------------------------------
			//
			//     OBJS
			//
			// ---------------------------------------------------------------------------------------------------------------------------


				// -----------------------------------------
				//											\\
				//     MESH OBJECT							||
				//											//
				// -----------------------------------------


				function lathePnts(n) {
					var pnts = []; 
					for ( var i = 0; i < n; i ++ ) { //n = 50 default
						pnts.push( new THREE.Vector3( Math.sin( i * 0.4 ) * 30 + 100, 0, ( i - 10 ) * 4 ) );
					}
					return pnts;
				}

				function newGeometry(v){
					var geoArray = [
						new THREE.CubeGeometry(meshObj.cubeW,meshObj.cubeH,meshObj.cubeD),
						new THREE.SphereGeometry(meshObj.sphereR, meshObj.sphereSW, meshObj.sphereSH),
						new THREE.IcosahedronGeometry( meshObj.radius, meshObj.detail ),
						new THREE.OctahedronGeometry( meshObj.radius, meshObj.detail ),
						new THREE.TetrahedronGeometry( meshObj.radius, meshObj.detail ),
						new THREE.CylinderGeometry(meshObj.cyliRT, meshObj.cyliRB, meshObj.cyliH , meshObj.cyliRS, meshObj.cyliHS, meshObj.cyliOE),
						new THREE.TorusGeometry( meshObj.torusR, meshObj.torusT,meshObj.torusRS,meshObj.torusTS, Math.PI*meshObj.torusA),
						new THREE.TorusKnotGeometry(meshObj.knotR,meshObj.knotT,meshObj.knotRS,meshObj.knotTS,meshObj.knotP,meshObj.knotQ,meshObj.knotH),
						new THREE.LatheGeometry( lathePnts(meshObj.latheP), meshObj.latheS ),
						new THREE.PlaneGeometry( meshObj.planeW, meshObj.planeH,meshObj.planeWS, meshObj.planeHS),
						new THREE.CircleGeometry( meshObj.circleR, meshObj.circleS, meshObj.circleTS, Math.PI*meshObj.circleTL ),
						new THREE.RingGeometry( meshObj.ringIR, meshObj.ringOR, meshObj.ringTS, meshObj.ringPS, meshObj.ringTSt, Math.PI*meshObj.ringTL ),
						new THREE.ConvexGeometry( ranPnts(meshObj.convexP) )
					];
					return geoArray[v];
				}
				function newMaterial(v){
					var matArray = [
						new THREE.MeshNormalMaterial(),
						new THREE.MeshBasicMaterial(),
						new THREE.MeshLambertMaterial(),
						new THREE.MeshPhongMaterial()
					];
					return matArray[v];
				}

			function MeshObj() {
				this.geometry = 0;
				this.material = 0;
				this.texture = false;
				this.txt = 3;
				this.txtList = ['white.jpg','mario.jpg','linen.jpg','crate.jpg','dots.jpg','rock_tile.jpg','water.jpg','wood.jpg'];
				this.txtRepeat = 1;
				this.scale = 1;
				this.posy = 0;
				this.rotx = 0;
				this.roty = 0;
				this.rotz = 0;
				this.smooth = false;
				this.sided = 0;	
				this.castShadow = false;
				// -- popUp matGUI
				this.wireframe = false;
				this.linewidth = 1;
				this.opacity = 1;
				this.color = 0xffffff;
				this.ambient = 0xffffff;
				this.emissive = 0x000000;
				this.specular = 0x111111;
				this.shininess = 30;
				// -- popUp geoGUI
				this.cubeW = 200;
				this.cubeH = 200;
				this.cubeD = 200;
				this.sphereR = 150;
				this.sphereSW = 100;
				this.sphereSH = 100;
				this.radius = 150;
				this.detail = 0;
				this.cyliRT = 100;
				this.cyliRB = 100;
				this.cyliH = 200;
				this.cyliRS = 50;
				this.cyliHS = 50;
				this.cyliOE = false;
				this.torusR = 100;
				this.torusT = 40;
				this.torusRS = 40;
				this.torusTS = 40;
				this.torusA = 2;
				this.latheP = 50;
				this.latheS = 20;
				this.knotR = 100;
				this.knotT = 40;
				this.knotRS = 64;
				this.knotTS = 8;
				this.knotP = 2;
				this.knotQ = 3;
				this.knotH = 1; 
				this.planeW = 200;
				this.planeH = 200;
				this.planeWS = 4;
				this.planeHS = 4;
				this.circleR = 150;
				this.circleS = 50;
				this.circleTS = 0;
				this.circleTL = 2;
				this.ringIR = 150;
				this.ringOR = 50;
				this.ringTS = 50;
				this.ringPS = 5;
				this.ringTSt = 0;
				this.ringTL = 2;
				this.convexP = 40;

				this.make = function(){
					scene.remove(mesh); 
					mesh = new THREE.Mesh(newGeometry(this.geometry),newMaterial(this.material));
					if(this.smooth==false){  mesh.material.shading = THREE.FlatShading; }
					else { mesh.material.shading = THREE.SmoothShading; }
					if(this.material==2 || this.material==1){
						mesh.material.color.setHex( dec2hex(this.color) ); 
					}
					if(this.material==3){
						mesh.material.color.setHex( dec2hex(this.color) ); 
						mesh.material.ambient.setHex( dec2hex(this.ambient) );
						mesh.material.emissive.setHex( dec2hex(this.emissive) ); 
						mesh.material.specular.setHex( dec2hex(this.specular) ); 
						mesh.material.shininess = this.shininess;
					}
					if(this.texture==true){
						map = THREE.ImageUtils.loadTexture('../texturez/'+this.txtList[this.txt]);
						mesh.material.map = map;
						map.wrapS = map.wrapT = THREE.RepeatWrapping;
						map.repeat.set( this.txtRepeat, this.txtRepeat );
					}
					if(this.sided==0){ mesh.material.side = THREE.FrontSide; }
					else if(this.sided==1){ mesh.material.side = THREE.BackSide; }
					else if(this.sided==2){ mesh.material.side = THREE.DoubleSide; }
					mesh.material.wireframe = this.wireframe; 
					mesh.material.wireframeLinewidth = this.linewidth;
					mesh.material.opacity = this.opacity;
					mesh.scale.x = mesh.scale.y = mesh.scale.z = this.scale;
					mesh.position.y = this.posy;
					mesh.rotation.x = this.rotx; mesh.rotation.y = this.roty; mesh.rotation.z = this.rotz;
					mesh.castShadow = this.castShadow;
					scene.add(mesh);
					updateMeshCode();
				}
				this.openMat = function() { if(matgui==undefined){ materialzGUI(meshObj.material); } }
				this.closeMat = function() { matgui.destroy(); matgui = undefined; }
				this.openGeo = function() { if(geogui==undefined){ geometriezGUI(meshObj.geometry); } }
				this.closeGeo = function() { geogui.destroy(); geogui = undefined; }

				this.isConvex = false;
			} meshObj = new MeshObj();	







				// -----------------------------------------
				//											\\
				//     PLANE OBJECT 						||
				//											//
				// -----------------------------------------

			function PlaneObj() {
				this.togglePlane = false;
				this.txtList = ['mario.jpg','linen.jpg','crate.jpg','dots.jpg','rock_tile.jpg','water.jpg','wood.jpg','white.jpg'];
				this.texture = 7;
				this.repeat = 80;
				this.scale = 30;
				this.toggleWireframe = false;
				this.w_line = 1;
				this.w_scale = 1;
				this.makePlane = function() {
					if(plane!=undefined){ scene.remove(plane);}
					pgeometry = new THREE.PlaneGeometry( 1000, 1000, 20, 20 );
					map = THREE.ImageUtils.loadTexture('../texturez/'+this.txtList[this.texture]);
				   	pmaterial = new THREE.MeshPhongMaterial({ map: map }); 
					map.wrapS = map.wrapT = THREE.RepeatWrapping;
					map.repeat.set( this.repeat, this.repeat );
					plane = new THREE.Mesh( pgeometry, pmaterial );
					plane.rotation.x = - Math.PI / 2;
					plane.receiveShadow	= true;
					plane.scale.set( this.scale, this.scale, this.scale );
					scene.add( plane );
				};
				this.makeWireframe = function() {
					if(wireplane!=undefined){ scene.remove(wireplane);}
					wgeometry = new THREE.PlaneGeometry( 1000, 1000, 100, 100 );
					wmaterial = new THREE.MeshBasicMaterial( { color: 0x000000, wireframe: true, wireframeLinewidth: this.w_line } );
					wireplane = new THREE.Mesh( wgeometry, wmaterial );
					wireplane.scale.set( this.w_scale, this.w_scale, this.w_scale );
					wireplane.rotation.x = - Math.PI / 2;
					scene.add( wireplane );
				};
			} planeObj = new PlaneObj();









				// -----------------------------------------
				//											\\
				//     LIGHTZ OBJECT 						||
				//											//
				// -----------------------------------------

			function LightsObj(){
				this.AmbientLight = true;
				this.aclr = 0x000000;
				this.HemisphereLight = true;
				this.hs = 0xffffff;
				this.hg = 0x000000;
				this.hi = 0.2;
				this.DirectionalLight = true;
				this.dclr = 0xffffff;
				this.di = 0.1;
				this.dx = 0;
				this.dy = 1;
				this.dz = 0;
				this.SpotLight1 = true;
				this.s1clr = 0xffffff;
				this.s1x = 100;
				this.s1y = 1000;
				this.s1z = 100;
				this.s1i = 0.1;
				this.s1sd = 0.2
				this.SpotLight2 = true;
				this.s2clr = 0xffffff;
				this.s2x = 100;
				this.s2y = 1000;
				this.s2z = 100;
				this.s2i = 0.1;
				this.s2sd = 0.2
				this.makeHem = function() {
					if(hemisphereLight!=undefined){scene.remove(hemisphereLight);}
					hemisphereLight = new THREE.HemisphereLight();
					hemisphereLight.color.setHex( dec2hex(this.hs) ); 
					hemisphereLight.groundColor.setHex( dec2hex(this.hg) ); 
					hemisphereLight.intensity = this.hi;
					scene.add( hemisphereLight ); 
				}
				this.makeDir = function() {
					if(directionalLight!=undefined){scene.remove(directionalLight);}
					directionalLight = new THREE.DirectionalLight();
					directionalLight.color.setHex( dec2hex(this.dclr) ); 
					directionalLight.intensity = this.di;
					directionalLight.position.x = this.dx;
					directionalLight.position.y = this.dy;
					directionalLight.position.z = this.dz;
					directionalLight.castShadow = true;
					scene.add( directionalLight ); 
				}
				this.makeSpot1 = function() {
					if(spotLight1!=undefined){scene.remove(spotLight1);}
					spotLight1 = new THREE.SpotLight( 0xffffff, 0.5 );
					spotLight1.color.setHex( dec2hex(this.s1clr) ); 
					spotLight1.position.x = this.s1x;
					spotLight1.position.y = this.s1y;
					spotLight1.position.z = this.s1z;
					spotLight1.castShadow = true;
					spotLight1.shadowDarkness = this.s1sd;
					spotLight1.intensity = this.s1i;
					scene.add( spotLight1 ); 
				}
				this.makeSpot2 = function() {
					if(spotLight2!=undefined){scene.remove(spotLight2);}
					spotLight2 = new THREE.SpotLight( 0xffffff, 0.5 );
					spotLight2.color.setHex( dec2hex(this.s2clr) ); 
					spotLight2.position.x = this.s2x;
					spotLight2.position.y = this.s2y;
					spotLight2.position.z = this.s2z;
					spotLight2.castShadow = true;
					spotLight2.shadowDarkness = this.s2sd;
					spotLight2.intensity = this.s2i;
					scene.add( spotLight2 ); 
				}
				this.makeAmbient = function() {
					if(ambientLight!=undefined){scene.remove(ambientLight);}
					ambientLight = new THREE.AmbientLight();
					ambientLight.color.setHex( dec2hex(this.aclr) ); 
					scene.add( ambientLight ); 
				}
				this.open = function(v){ if(lightgui==undefined){ lightGUI(); } }
				this.close = function(v){ lightgui.destroy(); lightgui = undefined; }				
			} lights = new LightsObj();








				// -----------------------------------------
				//											\\
				//     ENVIRONMENT OBJECT					||
				//											//
				// -----------------------------------------

			function EnvironmentObj() {
				this.renderShadows = false;
				this.fog = false;
				this.fclr = 0xf2f7ff;
				this.fnear = 1;
				this.ffar = 9000;
				this.reset = 100000;
				this.makeFog = function() {
					scene.fog = new THREE.Fog( this.fclr, this.fnear, this.ffar );
				}
			} enviro = new EnvironmentObj();



				// -----------------------------------------
				//											\\
				//     CODE/CONSOLE OBJECT					||
				//											//
				// -----------------------------------------

			function ConsoleObj() {
				this.selectMeshCode = function() {
					var doc = document;
				    var text = doc.getElementById('mcnsl');    
				    if (doc.body.createTextRange) {
				        var range = document.body.createTextRange();
				        range.moveToElementText(text);
				        range.select();
				    } else if (window.getSelection) {
				        var selection = window.getSelection();
				        var range = document.createRange();
				        range.selectNodeContents(text);
				        selection.removeAllRanges();
				        selection.addRange(range);
				    }
				}
				this.background = false;

			} codez = new ConsoleObj();


