//hotkeys
//a - left
//d - right
//space - shoot

// skybox
const loader = new THREE.CubeTextureLoader();
  const texture = loader.load([
    'textures/bkg1_right.png',
    'textures/bkg1_left.png',
    'textures/bkg1_top.png',
    'textures/bkg1_bot.png',
    'textures/bkg1_front.png',
    'textures/bkg1_back.png',
  ]);

const scene = new THREE.Scene();
scene.background = texture;
scene.rotation.x = -Math.PI / 3;
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
camera.position.set(0, 35, 5);
camera.rotation.z = Math.PI / 2;
camera.lookAt( scene.position );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor( new THREE.Color( 0xffffff ) )
document.getElementsByTagName('body')[0].appendChild( renderer.domElement );

// lights
const light = new THREE.AmbientLight( 0x222222 );
scene.add( light );

const spotLight = new THREE.SpotLight( 0xffffff );
spotLight.castShadow = true;
spotLight.position.set( 80, 50, -20 );
scene.add(spotLight);

renderer.render( scene, camera );


let wynik = 0

// creating a shape of spaceship
const shape1 = new THREE.Shape();

shape1.moveTo(0, 0, 5);

shape1.lineTo(1.75, 0);
shape1.lineTo(2, 2);
shape1.lineTo(0, 2);
shape1.lineTo(0.25, 0);

const tekstura1 = new THREE.TextureLoader().load('textures/dark.jpg');
tekstura1.wrapS = THREE.RepeatWrapping;
tekstura1.wrapT = THREE.RepeatWrapping;
const geometry1 = new THREE.ShapeGeometry( shape1 );
const material1 = new THREE.MeshStandardMaterial( {map: tekstura1} );
const mesh1 = new THREE.Mesh( geometry1, material1 ) ;

const shape2 = new THREE.Shape();

shape2.moveTo(0, 2, 5);

shape2.lineTo(2.4, 2);
shape2.lineTo(2.9, 6);
shape2.lineTo(0, 6);
shape2.lineTo(-0.9, 6);
shape2.lineTo(-0.4, 2);

const geometry2 = new THREE.ShapeGeometry( shape2 );
const material2 = new THREE.MeshStandardMaterial( {color: 0x272423} );
const mesh2 = new THREE.Mesh( geometry2, material2 ) ;

const shape3 = new THREE.Shape();

shape3.moveTo(0.875, 6, 5);

shape3.lineTo(10, 5.6);
shape3.lineTo(8, 8);
shape3.lineTo(2.025, 10);

const geometry3 = new THREE.ShapeGeometry( shape3 );
const material3 = new THREE.MeshStandardMaterial( {color: 0x272423} );
const mesh3 = new THREE.Mesh( geometry3, material3 ) ;

const shape4 = new THREE.Shape();

shape4.moveTo(0.875, 6, 5);

shape4.lineTo(-8.25, 5.6);
shape4.lineTo(-6.25, 8);
shape4.lineTo(-0.275, 10);

const geometry4 = new THREE.ShapeGeometry( shape4 );
const material4 = new THREE.MeshStandardMaterial( {color: 0x272423} );
const mesh4 = new THREE.Mesh( geometry4, material4 ) ;

const shape5 = new THREE.Shape();

shape5.moveTo(0.875, 6, 5);

shape5.lineTo(4, 5.9);
shape5.lineTo(0.875, 17);
shape5.lineTo(-2.25, 5.9);

const geometry5 = new THREE.ShapeGeometry( shape5 );
const material5 = new THREE.MeshStandardMaterial( {color: 0x272423} );
const mesh5 = new THREE.Mesh( geometry5, material5 ) ;

const shape6 = new THREE.Shape();

shape6.moveTo(0.875, 12, 5);

shape6.lineTo(4, 10, 5);
shape6.lineTo(4.2, 11, 5);
shape6.lineTo(0.875, 15, 5);

const geometry6 = new THREE.ShapeGeometry( shape6 );
const material6 = new THREE.MeshStandardMaterial( {color: 0x272423} );
const mesh6 = new THREE.Mesh( geometry6, material6 ) ;

const shape7 = new THREE.Shape();

shape7.moveTo(0.875, 12, 5);

shape7.lineTo(-2.25, 10, 5);
shape7.lineTo(-2.45, 11, 5);
shape7.lineTo(0.875, 15, 5);

const geometry7 = new THREE.ShapeGeometry( shape7 );
const material7 = new THREE.MeshStandardMaterial( {color: 0x272423} );
const mesh7 = new THREE.Mesh( geometry7, material7 ) ;

const statekz = new THREE.Group();
statekz.add(mesh1);
statekz.add(mesh2);
statekz.add(mesh3);
statekz.add(mesh4);
statekz.add(mesh5);
statekz.add(mesh6);
statekz.add(mesh7);
statekz.rotation.x = Math.PI / -2;
statekz.position.x = -0.875;
statekz.position.z = 23;
statekz.castShadow = true;
statekz.receiveShadow = true;
scene.add(statekz);

// Sun
const slonce_tekstura = new THREE.TextureLoader().load('textures/sun.jpg');
tekstura1.wrapS = THREE.RepeatWrapping;
tekstura1.wrapT = THREE.RepeatWrapping;
const slonce_geometry = new THREE.SphereGeometry( 250, 64, 32 );
const slonce_material = new THREE.MeshBasicMaterial( { map: slonce_tekstura } );
const slonce = new THREE.Mesh( slonce_geometry, slonce_material );
slonce.position.set(550, 0, -650);
scene.add( slonce );

let strzaly = [];
let przeszkody = [];

// keyboard
document.addEventListener("keydown", onDocumentKeyDown, false);
function onDocumentKeyDown(event) {
    let keyCode = event.which;
    if (keyCode == 65) {
      if(statekz.position.x <= -20)
      {
        statekz.position.x -= 0;
      }
      else
        statekz.position.x -= 3;
    } else if (keyCode == 68) {
      if(statekz.position.x >= 20)
      {
        statekz.position.x += 0;
      }
      else
        statekz.position.x += 3;
    } else if (keyCode == 32) {
      let strzal_geometry = new THREE.BoxGeometry( 1, 1, 5 );
      let strzal_material = new THREE.MeshBasicMaterial( { color: 0xd9092b } );
      let strzal = new THREE.Mesh( strzal_geometry, strzal_material );
      // starting position of shot
      strzal.position.set(statekz.position.x + 0.875, statekz.position.y, statekz.position.z - 17);
      // where the shot goes
      strzal.predkosc = new THREE.Vector3(0, 0, -2);
      strzaly.push(strzal);
      scene.add( strzal );
    }
}


// randomizing
function spawnPrzeszkoda() {
  let losoweX = 0;
  const przeszkoda_tekstura = new THREE.TextureLoader().load('textures/meteorite.jpg')
  const przeszkoda_geometry = new THREE.SphereGeometry( 6, 64, 32 );
  const przeszkoda_material = new THREE.MeshStandardMaterial( {map: przeszkoda_tekstura} );
  const przeszkoda = new THREE.Mesh( przeszkoda_geometry, przeszkoda_material );
  przeszkoda.castShadow = true;
  przeszkoda.receiveShadow = true;
  losoweX = Math.floor(Math.random() * (50)) - 25;
  przeszkoda.position.set(losoweX, 0, -100);
  przeszkoda.predkosc = new THREE.Vector3(0, 0, 0.6);
  przeszkody.push(przeszkoda);
  scene.add(przeszkoda);
  setTimeout(spawnPrzeszkoda, 3000);
}



function animate() {
  requestAnimationFrame( animate );

slonce.rotation.y += 0.0001;

  for(let i = 0; i < strzaly.length; i++) {
    strzaly[i].position.add(strzaly[i].predkosc);
    if(strzaly[i].position.z < -100 ) {
      scene.remove(strzaly[i]);
      strzaly.splice(i, 1);
    }
  }

  for(let j = 0; j < przeszkody.length; j++) {
    przeszkody[j].position.add(przeszkody[j].predkosc);
    if(przeszkody[j].position.z > 15) {
      scene.remove(przeszkody[j]);
      przeszkody.splice(j, 1);
      alert("YOU LOST! YOUR SCORE = " + wynik);
      window.location.reload();
    }
  }


  // collisions
  for(let i = 0; i < strzaly.length; i++) {
    for(let j = 0; j < przeszkody.length; j++) {
      if(strzaly[i].position.distanceTo(przeszkody[j].position) <= 6) {
        scene.remove(strzaly[i]);
		    strzaly.splice(i, 1);
        scene.remove(przeszkody[j]);
		    przeszkody.splice(j, 1);
        wynik += 1
      }
    }
  }



	renderer.render( scene, camera );
}

spawnPrzeszkoda();
animate();


// rescale
window.addEventListener(
  'resize',
  function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.render( scene, camera );
  },
  false
);
