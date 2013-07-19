

			var meshCode = "", matProperties = "", geoProperties = "";
			var matList = [ "new THREE.MeshNormalMaterial({","new THREE.MeshBasicMaterial({","new THREE.MeshLambertMaterial({","new THREE.MeshPhongMaterial({"
				];
			var geoList = [ "new THREE.CubeGeometry(", "new THREE.SphereGeometry(", "new THREE.IcosahedronGeometry(", "new THREE.OctahedronGeometry(", "new THREE.TetrahedronGeometry(", "new THREE.CylinderGeometry(", "new THREE.TorusGeometry(", "new THREE.TorusKnotGeometry(", "new THREE.LatheGeometry(", "new THREE.PlaneGeometry(", "new THREE.CircleGeometry(", "new THREE.RingGeometry(", "new THREE.ConvexGeometry("
			];
			var vecPoints = undefined;


			var planeWireCode = "", planeCode = "", ecode = "";
			var enviroCode = "";

			var lcHem="", lcAmb="", lcDir="", lcSpot1="", lcSpot2="";
			var lightCode = "";


			function updateCnsl() {
				var cnsl = document.getElementById('mcnsl').innerHTML = meshCode + enviroCode + lightCode;	
				// var objCnslDiv = document.getElementById('mcnsl'); objCnslDiv.scrollTop = objCnslDiv.scrollHeight;
			}


			function updateMeshCode() {


					if(meshObj.geometry==0){
						geoProperties = rnd(meshObj.cubeW)+", "+rnd(meshObj.cubeH)+", "+rnd(meshObj.cubeD);
						vecPoints = undefined;
					}
					if(meshObj.geometry==1){
						geoProperties = rnd(meshObj.sphereR)+", "+ rnd(meshObj.sphereSW)+", "+ rnd(meshObj.sphereSH);
						vecPoints = undefined;
					}
					if(meshObj.geometry==2){
						geoProperties = rnd(meshObj.radius)+", "+rnd(meshObj.detail);
						vecPoints = undefined;
					}
					if(meshObj.geometry==3){
						geoProperties = rnd(meshObj.radius)+", "+rnd(meshObj.detail);
						vecPoints = undefined;
					}
					if(meshObj.geometry==4){
						geoProperties = rnd(meshObj.radius)+", "+rnd(meshObj.detail);
						vecPoints = undefined;
					}
					if(meshObj.geometry==5){
						geoProperties = rnd(meshObj.cyliRT)+", "+ rnd(meshObj.cyliRB)+", "+ rnd(meshObj.cyliH )+", "+ meshObj.cyliRS+", "+ meshObj.cyliHS+", "+ meshObj.cyliOE;
						vecPoints = undefined;
					}
					if(meshObj.geometry==6){
						geoProperties = rnd(meshObj.torusR)+", "+ rnd(meshObj.torusT)+", "+Math.round(meshObj.torusRS)+", "+meshObj.torusTS+", "+ rnd(Math.PI*meshObj.torusA);
						vecPoints = undefined;
					}
					if(meshObj.geometry==7){
						geoProperties = rnd(meshObj.knotR)+", "+rnd(meshObj.knotT)+", "+meshObj.knotRS+", "+meshObj.knotTS+", "+rnd(meshObj.knotP)+", "+rnd(meshObj.knotQ)+", "+rnd(meshObj.knotH);
						vecPoints = undefined;
					}
					if(meshObj.geometry==8){
						// geoProperties = lathePnts(meshObj.latheP)+", "+ meshObj.latheS;
						//////
						geoProperties = "points, "+ meshObj.latheS;
						vecPoints = "";
						var objJson = JSON.stringify( lathePnts(meshObj.latheP) );
						var obj = JSON.parse(objJson);
						for(var i in obj){
							vecPoints += "&nbsp;&nbsp;&nbsp;&nbsp;new THREE.Vector3( "+rnd(obj[i].x)+", "+rnd(obj[i].y)+", "+rnd(obj[i].z)+" ),<br>";
						}

					}
					if(meshObj.geometry==9){
						geoProperties = rnd(meshObj.planeW)+", "+ rnd(meshObj.planeH)+", "+meshObj.planeWS+", "+meshObj.planeHS;
						vecPoints = undefined;
					}
					if(meshObj.geometry==10){
						geoProperties = rnd(meshObj.circleR)+", "+ meshObj.circleS+", "+ meshObj.circleTS+", "+ Math.PI*rnd(meshObj.circleTL);
						vecPoints = undefined;
					}
					if(meshObj.geometry==11){
						geoProperties = rnd(meshObj.ringIR)+", "+ rnd(meshObj.ringOR)+", "+ meshObj.ringTS+", "+ meshObj.ringPS+", "+ rnd(meshObj.ringTSt)+", "+ Math.PI*rnd(meshObj.ringTL);
						vecPoints = undefined;
					}
					if(meshObj.geometry==12){
						geoProperties = " points ";
						vecPoints = "";
						var objJson = JSON.stringify( ranPnts(meshObj.convexP) );
						var obj = JSON.parse(objJson);
						for(var i in obj){
							vecPoints += "&nbsp;&nbsp;&nbsp;&nbsp;new THREE.Vector3( "+rnd(obj[i].x)+", "+rnd(obj[i].y)+", "+rnd(obj[i].z)+" ),<br>";
						}

						
					}

				matProperties = "";
					if(meshObj.smooth==false){  matProperties += "shading: THREE.FlatShading" }
					else if(meshObj.smooth==true){ matProperties += "shading: THREE.SmoothShading" }
					if(meshObj.material>0){
						matProperties += ", color: "+ dec2hex(meshObj.color);
					if(meshObj.material==3){
						matProperties += ", ambient: "+dec2hex(meshObj.ambient);
						matProperties += ", emissive: "+dec2hex(meshObj.emissive);
						matProperties += ", specular: "+dec2hex(meshObj.specular);
						matProperties += ", shininess: "+rnd(meshObj.shininess);
					}
					if(meshObj.texture==true){ matProperties += ", map: map"; }
						matProperties += "";
					}
					if(meshObj.sided==1){ matProperties += ", side: THREE.BackSide" }
					else if(meshObj.sided==2){ matProperties += ", side: THREE.DoubleSide" }
					if(meshObj.wireframe==true){ matProperties += ", wireframe: true, wireframeLinewidth: "+rnd(meshObj.linewidth); }
					if(meshObj.transparent==true){matProperties += ", transparent: true, opacity: "+rnd(meshObj.opacity);}

				meshCode = "";
					if(vecPoints!=undefined){
						meshCode += "var points = [<br>"
						meshCode += vecPoints;
						meshCode += "];<br><br>";
					}
					if(meshObj.texture==true && CUSTOM_TEXTURE==undefined){
						meshCode += "map = THREE.ImageUtils.loadTexture('../texturez/"+meshObj.txtList[meshObj.txt]+"');<br>";
					} else if(meshObj.texture==true && CUSTOM_TEXTURE!=undefined){
						meshCode += "map = THREE.ImageUtils.loadTexture('../texturez/proxy.php?url="+CUSTOM_TEXTURE+"');<br>";
					}
					meshCode += "geometry = "+geoList[meshObj.geometry]+geoProperties+");<br>";
					meshCode += "material = "+matList[meshObj.material]+matProperties+"});<br>";
					meshCode += "mesh = new THREE.Mesh(geometry, material);<br>";
					if(meshObj.texture==true){
						meshCode += "map.wrapS = map.wrapT = THREE.RepeatWrapping;<br>";
						meshCode += "map.repeat.set( "+meshObj.txtRepeat+", "+meshObj.txtRepeat+" );<br>";
					}
					if(meshObj.scale!=1){ meshCode += "mesh.scale.x = mesh.scale.y = mesh.scale.z = "+rnd(meshObj.scale)+";<br>"; }

					if(meshObj.posy!=0){ meshCode += "mesh.position.y = "+rnd(meshObj.posy)+";<br>" };
					if(meshObj.rotx!=0){ meshCode += "mesh.rotation.x = "+rnd(meshObj.rotx)+";<Br>"; }
					if(meshObj.roty!=0){ meshCode += "mesh.rotation.y = "+rnd(meshObj.roty)+";<Br>"; }
					if(meshObj.rotz!=0){ meshCode += "mesh.rotation.z = "+rnd(meshObj.rotz)+";<Br>"; }
					if(mesh.castShadow==true){ meshCode += "mesh.castShadow = true;<br>"; }
					meshCode += "scene.add(mesh);<br><br>";

					updateCnsl();
			}



			function updateEnviroCode() {

					if(planeObj.toggleWireframe==true){
						planeWireCode = "wgeometry = new THREE.PlaneGeometry( 1000, 1000, 100, 100 );<br>wmaterial = new THREE.MeshBasicMaterial( { color: 0x000000, wireframe: true, wireframeLinewidth: 1 } );<br>wireplane = new THREE.Mesh( wgeometry, wmaterial );<br>wireplane.scale.set( "+rnd(planeObj.w_scale)+", "+rnd(planeObj.w_scale)+", "+rnd(planeObj.w_scale)+" );<br>wireplane.rotation.x = - Math.PI / 2;<br>scene.add( wireplane );<br><br>";
					} else { planeWireCode = ""; }

					if(planeObj.togglePlane==true){
						planeCode = "pgeometry = new THREE.PlaneGeometry( 1000, 1000, 20, 20 );<br>map = THREE.ImageUtils.loadTexture('../texturez/"+planeObj.txtList[planeObj.texture]+"');<br>pmaterial = new THREE.MeshPhongMaterial({ map: map });<br>map.wrapS = map.wrapT = THREE.RepeatWrapping;<br>map.repeat.set( "+rnd(planeObj.repeat)+", "+rnd(planeObj.repeat)+" );<br>plane = new THREE.Mesh( pgeometry, pmaterial );<br>plane.rotation.x = - Math.PI / 2;<br>plane.receiveShadow	= true;<br>plane.scale.set( "+rnd(planeObj.scale)+", "+rnd(planeObj.scale)+", "+rnd(planeObj.scale)+" );<br>scene.add( plane );<br><br>";
					} else { planeCode = ""; };

					ecode="";

					if(bgcode != undefined){
						ecode += "bg = document.body.style;<br>bg.background = '"+bgcode+"';<br><br>";
					}

					// if(enviro.renderShadows == true){
					if(mesh.castShadow==true){
						ecode+= "renderer.shadowMapEnabled = true;<br><br>";
					}

					if(enviro.fog==true){
						ecode+= "scene.fog = new THREE.Fog( "+dec2hex(enviro.fclr)+", "+rnd(enviro.fnear)+", "+rnd(enviro.ffar)+" );";
					}

					enviroCode = planeWireCode + planeCode + ecode;
					updateCnsl();
			}


			function updateLightCode() {

				if(lights.AmbientLight == true){
					lcAmb = "ambientLight = new THREE.AmbientLight( "+dec2hex(lights.aclr)+" );<br>scene.add( ambientLight );<br><br>";
				} else { lcAmb = "";}

				if(lights.HemisphereLight == true){
					lcHem = "hemisphereLight = new THREE.HemisphereLight("+dec2hex(lights.hs)+", "+dec2hex(lights.hg)+", "+rnd(lights.hi)+");<br>scene.add( hemisphereLight );<br><br>";
				} else { lcHem = "";}

				if(lights.DirectionalLight == true){
					lcDir = "directionalLight = new THREE.DirectionalLight("+dec2hex(lights.dclr)+", "+rnd(lights.di)+");<br>directionalLight.position.set( "+rnd(lights.dx)+", "+rnd(lights.dy)+", "+rnd(lights.dz)+" );<br>directionalLight.castShadow = true;<br>scene.add( directionalLight );<br><br>";
				} else { lcDir = "";}				

				

				if(lights.SpotLight1 == true){
					lcSpot1 = "spotLight1 = new THREE.SpotLight( "+dec2hex(lights.s1clr)+", "+rnd(lights.s1i)+" );<br>spotLight1.position.set( "+rnd(lights.s1x)+", "+rnd(lights.s1y)+", "+rnd(lights.s1z)+" );<br>spotLight1.castShadow = true;<br>spotLight1.shadowDarkness = "+rnd(lights.s1sd)+";<br>scene.add( spotLight1 );<br><br>";
				} else { lcSpot1 = "";}	

				if(lights.SpotLight2 == true){
					lcSpot2 = "spotLight2 = new THREE.SpotLight( "+dec2hex(lights.s2clr)+", "+rnd(lights.s2i)+" );<br>spotLight2.position.set( "+rnd(lights.s2x)+", "+rnd(lights.s2y)+", "+rnd(lights.s2z)+" );<br>spotLight2.castShadow = true;<br>spotLight2.shadowDarkness = "+rnd(lights.s2sd)+";<br>scene.add( spotLight2 );<br><br>";
				} else { lcSpot2 = "";}	

				lightCode = lcAmb + lcHem + lcDir + lcSpot1 + lcSpot2;
				updateCnsl();

			}		

