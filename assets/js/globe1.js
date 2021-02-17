var globeContainer = document.getElementById('globeSection');

// loading
var createLoader = (function () {

var container = null;
var progress = null;
var finished = false;

var canvas = null;
var callback = null;

function setupLoaderElement() {
    container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.top = '50%';
    container.style.left = '50%';
    container.style.transform = 'translate(-50%, -50%)';
    container.style.transition = 'opacity 1s';

    var text = document.createElement('p');
    text.style.margin = '0 0 10px';
    text.style.paddingLeft = '5px';
    text.style.textAlign = 'center';
    text.style.color = '#fff';
    text.style.fontFamily = 'monospace';
    text.style.fontSize = '16px';
    text.style.letterSpacing = '10px';
    text.textContent = 'LOADING';

    var progressCtn = document.createElement('div');
    progressCtn.style.background = '#555';
    progressCtn.style.width = '250px';
    progressCtn.style.height = '1px';

    progress = document.createElement('div');
    progress.style.background = '#fff';
    progress.style.width = '0%';
    progress.style.height = 'inherit';
    progress.style.margin = '0 auto';
    progress.style.transition = 'width 0.15s';

    progressCtn.appendChild(progress);
    container.appendChild(text);
    container.appendChild(progressCtn);

    globeContainer.appendChild(container);
}

function setupCanvas() {
    canvas.style.transition = 'opacity 1s';
    canvas.style.opacity = '0';
}

function updateProgress(rate) {
    progress.style.width = Math.round(rate * 100.0) + '%';
}

function hideLoader() {
    container.style.opacity = '0';
    setTimeout(function () {
        globeContainer.removeChild(container);
    }, 1000);
}

function showCanvas() {
    globeContainer.appendChild(canvas);
    if (typeof callback === 'function') {
        callback();
    }
    setTimeout(function () {
        canvas.style.opacity = '1';
    }, 0);
}

return function (_canvas, _callback) {
    var manager = new THREE.LoadingManager();

    canvas = _canvas;
    callback = _callback;

    setupLoaderElement();
    setupCanvas();

    manager.onProgress = function (item, loaded, total) {
        updateProgress(loaded / total);
        if (loaded === total && !finished) {
            finished = true;
            hideLoader();
            setTimeout(function () {
                showCanvas();
            }, 1000);
        }
    };

    return manager;
}

})();

let raycaster, intersects;
let mouse, INTERSECTED;

var earth;

// ------ Marker object ------------------------------------------------

function Marker() {
    THREE.Object3D.call(this);

    var radius = 0.005;
    var sphereRadius = 0.02;
    var height = 0.05;

    var material = new THREE.MeshPhongMaterial({ color: 0xFF0000 });//0xbab68f

    var cone = new THREE.Mesh(new THREE.ConeBufferGeometry(radius, height, 8, 1, true), material);
    cone.position.y = height * 0.5;
    cone.rotation.x = Math.PI;

    var sphere = new THREE.Mesh(new THREE.SphereBufferGeometry(sphereRadius, 16, 8), material);
    sphere.position.y = height * 0.95 + sphereRadius;

    this.add(sphere);
    // this.add(cone, sphere);
}

Marker.prototype = Object.create(THREE.Object3D.prototype);

// ------ Earth object -------------------------------------------------

function Earth(radius, texture) {
    THREE.Object3D.call(this);

    this.userData.radius = radius;

    var earth1 = new THREE.Mesh(
        new THREE.SphereBufferGeometry(radius, 64.0, 48.0),
        new THREE.MeshPhongMaterial({
            map: texture
        })
    );

    this.add(earth1);
}

Earth.prototype = Object.create(THREE.Object3D.prototype);

Earth.prototype.createMarker = function (lat, lon) {
    var marker = new Marker();

    var latRad = lat * (Math.PI / 180);
    var lonRad = -lon * (Math.PI / 180);
    var r = this.userData.radius;

    marker.position.set(Math.cos(latRad) * Math.cos(lonRad) * r, Math.sin(latRad) * r, Math.cos(latRad) * Math.sin(lonRad) * r);
    marker.rotation.set(0.0, -lonRad, latRad - Math.PI * 0.5);

    this.add(marker);
};

// ------ Three.js code ------------------------------------------------

var scene, camera, renderer;
var controls;

init();

function init() {
    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(45, 4 / 3, 0.1, 100);
    camera.position.set(0.0, 1.5, 3.0);

    renderer = new THREE.WebGLRenderer({ antialias: true });

    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.autoRotate = true;
    controls.autoRotateSpeed = -1.0;
    controls.enablePan = false;

    var ambient = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambient);

    var direcitonal = new THREE.DirectionalLight(0xffffff, 0.5);
    direcitonal.position.set(5.0, 2.0, 5.0).normalize();
    scene.add(direcitonal);

    // just some code for the loading
    var manager = createLoader(renderer.domElement, animate);

    var texLoader = new THREE.TextureLoader(manager).setCrossOrigin(true);

    var texture = texLoader.load('assets/img/world.jpg');
    texture.anisotropy = renderer.capabilities.getMaxAnisotropy();

    earth = new Earth(1.0, texture);

    earth.createMarker(48.856700, 2.350800); // Paris
    earth.createMarker(51.507222, -0.1275); // London
    earth.createMarker(34.050000, -118.250000); // LA
    earth.createMarker(41.836944, -87.684722); // Chicago
    earth.createMarker(35.683333, 139.683333); // Tokyo
    earth.createMarker(33.333333, 44.383333); // Baghdad
    earth.createMarker(40.712700, -74.005900); // New York

    earth.createMarker(55.750000, 37.616667); // Moscow
    earth.createMarker(35.117500, -89.971111); // Memphis
    earth.createMarker(-33.925278, 18.423889); // Cape Town
    earth.createMarker(32.775833, -96.796667); // Dallas
    earth.createMarker(52.366667, 4.900000); // Amsterdam
    earth.createMarker(42.358056, -71.063611); // Boston
    earth.createMarker(52.507222, 13.145833); // Berlin

    earth.createMarker(37.783333, -122.416667); // San Francisco

    scene.add(earth);

    window.addEventListener('resize', onResize);
    onResize();

    globeContainer.appendChild(renderer.domElement);
}

function onResize() {
    camera.aspect = globeContainer.offsetWidth / globeContainer.offsetHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(globeContainer.offsetWidth, globeContainer.offsetHeight);
    renderer.setClearColor(0xffffff, 1.0);
}

function animate() {
    requestAnimationFrame(animate);

    

    raycaster.setFromCamera( mouse, camera );
    intersects = raycaster.intersectObject( earth );

    if ( intersects.length > 0 ) {
        if ( INTERSECTED != intersects[ 0 ].index ) {console.log("RRRRRRRRR");
            // attributes.size.array[ INTERSECTED ] = PARTICLE_SIZE;
            INTERSECTED = intersects[ 0 ].index;
            // attributes.size.array[ INTERSECTED ] = PARTICLE_SIZE * 1.25;
            // attributes.size.needsUpdate = true;
        }
    } 
    else if ( INTERSECTED !== null ) {console.log("XXXXXXX");
        // attributes.size.array[ INTERSECTED ] = PARTICLE_SIZE;
        // attributes.size.needsUpdate = true;
        INTERSECTED = null;
    }
    controls.update();
    renderer.render(scene, camera);
}