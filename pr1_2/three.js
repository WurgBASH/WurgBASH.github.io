
// ренкер
var renderer = new THREE.WebGLRenderer({canvas: document.getElementById('canvas'), antialias: true});
renderer.setClearColor(0xE6E6EE);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

// настройки сцени
var camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 3000);
var scene = new THREE.Scene();
var light1 = new THREE.AmbientLight(0xffffff, 0.5);
var light2 = new THREE.PointLight(0xffffff, 0.5);
var cameraControls;

// створюємо губку і центруємо її
var parent = new THREE.Object3D();
parent.position.set(0, 0, -2000);

// рендер губки
function draw(){
  scene.remove(parent);
  while(scene.children.length > 0){ 
    scene.remove(scene.children[0]); 
  }
  parent = new THREE.Object3D();
  parent.position.set(0, 0, -2000);
  scene.add(light1);
  scene.add(light2);
  scene.add(parent);

  var width = getIntegerInput('widgub');
  var last = getIntegerInput('iterat');
  var x = getIntegerInput('axx');
  var y =getIntegerInput('axy');
  var z = getIntegerInput('axz');

  mengerSponge(x, y, z, width, 0, last);

}
draw()
requestAnimationFrame(render);

function render() {
  parent.rotation.x = 0.1;
  parent.rotation.y = 0.3;
  parent.rotation.z += 0.01;
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

/**
 * Губка Серпінського
 * @param x       - координата x
 * @param y       - координата y
 * @param z       - координата z 
 * @param width   - ширина губки
 * @param current - 
 * @param last    - кількість ітерацій
 */

function mengerSponge(x, y, z, width, current, last) {
  // перевірка на помилки
  if (last < 0) {
    alert("Недійсний останній параметр");
    return;
  } else if (last > 5) {
    alert("Останній параметр спричинить занадто велику відстань");
    return;
  } else if (last == 0) {
    cube(0, 0, 0, x, y, z, width * 3);
    return;
  }

  // ітерація по осі x
  for (var i = 1; i <= 3; i++) {
    // ітерація по осі y
    for (var j = 1; j <= 3; j++) {
      // ітерація по осі z
      for (var k = 1; k <= 3; k++) {
        //рахуємо фрактал
        var num2 = 0;
        if (i == 2) num2++;
        if (j == 2) num2++;
        if (k == 2) num2++;

        if (num2 < 2) {
          // Рекурсія
          if (current < last - 1) {
            mengerSponge(
              (x + i * width),
              (y + j * width),
              (z + k * width),
              (width / 3),
              (current + 1),
              last
            );
          } else if (current == last - 1) {
            // Малюємо куб з заданими координатами
            cube(i, j, k, x, y, z, width);
          }
        }
      }
    }
  }
}

function cube(i, j, k, x, y, z, width) {
  // створення куба
  var geometry = new THREE.BoxGeometry(width, width, width);
  var material = new THREE.MeshPhongMaterial({color: 0xFF0000});
  var cube = new THREE.Mesh(geometry, material);

  // Встановимо положення куба
  cube.position.set(
    x + ((i + 1) * width),
    y + ((j + 1) * width),
    z + ((k + 1) * width)
  );

  // Добавимо куб на екран
  parent.add(cube);
}

function getIntegerInput(id) {
    return parseInt( document.getElementById(id).value );
}
$( 'input#iterat' ).change( draw );
$( 'input#widgub' ).change( draw );
$( 'input#axx' ).change( draw );
$( 'input#axy' ).change( draw );
$( 'input#axz' ).change( draw );
