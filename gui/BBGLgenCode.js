

			var meshCode = "", matProperties = "", geoProperties = "";
			var matList = [ "new THREE.MeshNormalMaterial({","new THREE.MeshBasicMaterial({","new THREE.MeshLambertMaterial({","new THREE.MeshPhongMaterial({"
				];
			var geoList = [ "new THREE.CubeGeometry(", "new THREE.SphereGeometry(", "new THREE.IcosahedronGeometry(", "new THREE.OctahedronGeometry(", "new THREE.TetrahedronGeometry(", "new THREE.CylinderGeometry(", "new THREE.TorusGeometry(", "new THREE.TorusKnotGeometry(", "new THREE.LatheGeometry(", "new THREE.PlaneGeometry(", "new THREE.CircleGeometry(", "new THREE.RingGeometry(", "new THREE.ConvexGeometry("
			];

			function updateMeshCode() {


					if(meshObj.geometry==0){
						geoProperties = rnd(meshObj.cubeW)+", "+rnd(meshObj.cubeH)+", "+rnd(meshObj.cubeD);
					}
					if(meshObj.geometry==1){
						geoProperties = rnd(meshObj.sphereR)+", "+ rnd(meshObj.sphereSW)+", "+ rnd(meshObj.sphereSH);
					}
					if(meshObj.geometry==2){
						geoProperties = rnd(meshObj.radius)+", "+rnd(meshObj.detail);
					}
					if(meshObj.geometry==3){
						geoProperties = rnd(meshObj.radius)+", "+rnd(meshObj.detail);
					}
					if(meshObj.geometry==4){
						geoProperties = rnd(meshObj.radius)+", "+rnd(meshObj.detail);
					}
					if(meshObj.geometry==5){
						geoProperties = rnd(meshObj.cyliRT)+", "+ rnd(meshObj.cyliRB)+", "+ rnd(meshObj.cyliH )+", "+ meshObj.cyliRS+", "+ meshObj.cyliHS+", "+ meshObj.cyliOE;
					}
					if(meshObj.geometry==6){
						geoProperties = rnd(meshObj.torusR)+", "+ rnd(meshObj.torusT)+", "+Math.round(meshObj.torusRS)+", "+meshObj.torusTS+", "+ rnd(Math.PI*meshObj.torusA);
					}
					if(meshObj.geometry==7){
						geoProperties = rnd(meshObj.knotR)+", "+rnd(meshObj.knotT)+", "+meshObj.knotRS+", "+meshObj.knotTS+", "+rnd(meshObj.knotP)+", "+rnd(meshObj.knotQ)+", "+rnd(meshObj.knotH);
					}
					if(meshObj.geometry==8){
						geoProperties = lathePnts(meshObj.latheP)+", "+ meshObj.latheS;
					}
					if(meshObj.geometry==9){
						geoProperties = rnd(meshObj.planeW)+", "+ rnd(meshObj.planeH)+", "+meshObj.planeWS+", "+meshObj.planeHS;
					}
					if(meshObj.geometry==10){
						geoProperties = rnd(meshObj.circleR)+", "+ meshObj.circleS+", "+ meshObj.circleTS+", "+ Math.PI*rnd(meshObj.circleTL);
					}
					if(meshObj.geometry==11){
						geoProperties = rnd(meshObj.ringIR)+", "+ rnd(meshObj.ringOR)+", "+ meshObj.ringTS+", "+ meshObj.ringPS+", "+ rnd(meshObj.ringTSt)+", "+ Math.PI*rnd(meshObj.ringTL);
					}
					if(meshObj.geometry==12){
						geoProperties = ranPnts(meshObj.convexP);
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
					if(meshObj.texture==true){ matProperties += ", map: textureMap"; }
						matProperties += "";
					}
					if(meshObj.sided==1){ matProperties += ", side: THREE.BackSide" }
					else if(meshObj.sided==2){ matProperties += ", side: THREE.DoubleSide" }
					if(meshObj.wireframe==true){ matProperties += ", wireframe: true, wireframeLinewidth: "+rnd(meshObj.linewidth); }
					if(meshObj.opacity<1){ matProperties += ", opacity: "+rnd(meshObj.opacity); }

				meshCode = "";

					if(meshObj.texture==true){
						meshCode += "textureMap = THREE.ImageUtils.loadTexture('../texturez/"+meshObj.txtList[meshObj.txt]+"');<br>";
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

				var cnsl = document.getElementById('mcnsl').innerHTML = meshCode;
			}




