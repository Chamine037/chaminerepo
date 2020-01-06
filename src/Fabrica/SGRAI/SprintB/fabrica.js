import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { LoadingManager } from 'three/src/loaders/LoadingManager.js';
import { DragControls } from "three/examples/jsm/controls/DragControls.js";
//import { SimplifyModifier } from 'three/examples/jsm/modifiers/SimplifyModifier.js';
import * as THREE from 'three';
import axios from 'axios';

var scene, camera, renderer, controls, controlsD, press, pressTable, factoryBuild, robomesa, furar, furar2, estante, fork, boxFork, maquina, mesa2, plane;
var meshFloor, meshRoof, ambientLight, light, activeCamera, cameraOrtho;
var crate, crateTexture, crateNormalMap, crateBumpMap;
var objects = [];
var dragTo, dragObject = [];
var maquinaadd;
var linhasproducao = [];
var keyboard = {};
var player = { height: 1.8, speed: 0.2, turnSpeed: Math.PI * 0.02 };
var USE_WIREFRAME = false;

var manager = new THREE.LoadingManager();
manager.onLoad = async function () {
    await axios.get('https://mdf37.azurewebsites.net/api/GetAllLinhasProducao').then(response => linhasproducao = response.data);
    console.log(linhasproducao)
    linhasproducao.map(lp => {
        addLp(lp.nome, lp.eixo_X, lp.eixo_Y, 0)
    });
    console.log("loaded all resources");
    RESOURCES_LOADED = true;
};

var loader = new THREE.ObjectLoader(manager);

var loadingScreen = {
    scene: new THREE.Scene(),
    camera: new THREE.PerspectiveCamera(90, 1280 / 720, 0.1, 100),
    box: new THREE.Mesh(
        new THREE.BoxBufferGeometry(0.5, 0.5, 0.5),
        new THREE.MeshBasicMaterial({ color: 0x4444ff })
    )
};
var loadingManager = null;
var RESOURCES_LOADED = false;
var i = 0, j = 0, a = 0, b = 0, x = 0;
var pressBollean = false, furarBollean = false, ortoBollean = false, firstPerson = false, dragcontrols = false, mouseAdd = false, mouseDelete = false;

var mouse = { x: 0, y: 0 }, INTERSECTED;
var canvas1, context1, texture1, latestMouseProjection;

var canvas;

var raycaster;  // A THREE.Raycaster for user mouse input.

var ground; // A square base on which the cylinders stand.

var world;  // An Object3D that contains all the mesh objects in the scene.
// Rotation of the scene is done by rotating the world about its
// y-axis.  (I couldn't rotate the camera about the scene since
// the Raycaster wouldn't work with a camera that was a child
// of a rotated object.)

var ROTATE = 1, DRAG = 2, ADD = 3, DELETE = 4, NADA = 5;  // Possible mouse actions
var mouseAction;  // currently selected mouse action
var dragItem;  // the cylinder that is being dragged, during a drag operation
var intersects; //the objects intersected

var objectsFabrica = [];

var targetForDragging;  // An invisible object that is used as the target for raycasting while
// dragging a cylinder.  I use it to find the new location of the
// cylinder.  I tried using the ground for this purpose, but to get
// the motion right, I needed a target that is at the same height
// above the ground as the point where the user clicked the cylinder

// Models index
var models = {
    forklift: {
        obj: "/Chamine037/models/forklift.obj",
        mtl: "/Chamine037/models/forklift.mtl",
        mesh: null
    },
    window: {
        obj: "/Chamine037/models/window.obj",
        mtl: "/Chamine037/models/window.mtl",
        mesh: null
    }
};
// Meshes index
var meshes = {};

export function init() {
    try {
        canvas = document.getElementById("maincanvas");
        renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            antialias: false,
            stencil: false,
            alpha: false,
            preserveDrawingBuffer: false
        });
        // Add support for retina displays
        renderer.setPixelRatio(window.devicePixelRatio);
        // Specify the size of the canvas
        renderer.setSize(window.innerWidth, window.innerHeight);
        // SHADOW
        // renderer.shadowMap.enabled = true;
        // renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    }
    catch (e) {
        document.getElementById("canvas-holder").innerHTML = "<p><b>Sorry, an error occurred:<br>" +
            e + "</b></p>";
        return;
    }
    //renderer = new THREE.WebGLRenderer();
    //renderer.setSize(window.innerWidth, 600);
    //renderer.shadowMap.enabled = true;
    //renderer.shadowMap.type = THREE.BasicShadowMap;


    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.set(0, 15, 50);
    camera.lookAt(new THREE.Vector3(0, player.height, 0));

    activeCamera = camera;

    // cameraOrtho = new THREE.OrthographicCamera(-125 / 4, 125 / 4, 100 / 4, -100 / 4, 0.1, 10000);
    // cameraOrtho.position.set(0, 15, 50);
    // cameraOrtho.lookAt(new THREE.Vector3(0, player.height, 1));

    window.addEventListener('resize', () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        activeCamera.aspect = window.innerWidth / window.innerHeight;

        activeCamera.updateProjectionMatrix();
    });


    //TODO Descomentar
    /*controls = new OrbitControls(camera, renderer.domElement);
    controls.addEventListener('change', render);
    controls.minDistance = 0;
    controls.maxDistance = 1500;
    controls.maxPolarAngle = Math.PI / 4 * 1.87;
    controls.enableKeys = false;*/

    // var controls1 = new OrbitControls(cameraOrtho, renderer.domElement);
    // controls1.addEventListener('change', render);
    // controls1.minDistance = 0;
    // controls1.maxDistance = 1500;
    // controls1.maxPolarAngle = Math.PI / 4 * 1.87;

    controls = new OrbitControls(camera, renderer.domElement);
    controls.addEventListener('change', render);
    controls.minDistance = 0;
    controls.maxDistance = 1500;
    controls.maxPolarAngle = Math.PI / 4 * 1.87;
    controls.enableKeys = false;

    animate();

    loadingScreen.box.position.set(0, 0, 5);
    loadingScreen.camera.lookAt(loadingScreen.box.position);
    loadingScreen.scene.add(loadingScreen.box);

    loadingManager = new LoadingManager();
    loadingManager.onProgress = function (item, loaded, total) {
        //console.log(item, loaded, total);
    };
    loadingManager.onLoad = function () {
        onResourcesLoaded();
    };
    skybox();
    factory();


    var planeGeometry = new THREE.PlaneBufferGeometry(300, 300, 1, 1);
    var texture = new THREE.TextureLoader().load('/Chamine037/images/sh_dn.png');
    var planeMaterial = new THREE.MeshBasicMaterial({ map: texture });
    //var planeMaterial = new THREE.MeshLambertMaterial({color: 0xffffff});
    plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.receiveShadow = true;
    // rotate and position the plane
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.set(0, -0.1, 0);
    // add the plane to the scene
    scene.add(plane);


    ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientLight);

    light = new THREE.PointLight(0xffffff, 0.8, 18);
    light.position.set(-3, 6, -3);
    light.castShadow = true;
    light.shadow.camera.near = 0.1;
    light.shadow.camera.far = 25;
    scene.add(light);

    var l1 = new THREE.PointLight(0xffffff, 1, 30);
    l1.position.set(-3, 6, 20);
    l1.castShadow = true;
    scene.add(l1);

    var l2 = new THREE.PointLight(0xffffff, 1, 30);
    l2.position.set(-3, 6, -20);
    l2.castShadow = true;
    scene.add(l2);

    var l3 = new THREE.PointLight(0xffffff, 1, 30);
    l3.position.set(-3, 6, 40);
    l3.castShadow = true;
    scene.add(l3);

    var l4 = new THREE.PointLight(0xffffff, 1, 30);
    l4.position.set(-3, 6, -40);
    l4.castShadow = true;
    scene.add(l4);

    var l5 = new THREE.PointLight(0xffffff, 1, 30);
    l5.position.set(-20, 6, -40);
    l5.castShadow = true;
    scene.add(l5);

    var l6 = new THREE.PointLight(0xffffff, 1, 30);
    l6.position.set(20, 6, -40);
    l6.castShadow = true;
    scene.add(l6);

    var l7 = new THREE.PointLight(0xffffff, 1, 30);
    l7.position.set(-20, 6, 40);
    l7.castShadow = true;
    scene.add(l7);

    var l8 = new THREE.PointLight(0xffffff, 1, 30);
    l8.position.set(40, 6, -3);
    l8.castShadow = true;
    scene.add(l8);

    var l9 = new THREE.PointLight(0xffffff, 1, 30);
    l9.position.set(-40, 6, -3);
    l9.castShadow = true;
    scene.add(l9);

    var ll1 = new THREE.PointLight(0xffffff, 1, 30);
    ll1.position.set(20, 6, -3);
    ll1.castShadow = true;
    scene.add(ll1);

    var ll2 = new THREE.PointLight(0xffffff, 1, 30);
    ll2.position.set(-20, 6, -3);
    ll2.castShadow = true;
    scene.add(ll2);

    var light2 = new THREE.PointLight(0xffffff, 1, 30);
    light2.position.set(17.25 * 2, 5, -9.8 * 2);
    light2.castShadow = true;
    scene.add(light2);

    var light3 = light2.clone();
    light3.position.set(17.25 * 2, 5, 10.5 * 2);
    scene.add(light3);

    var light4 = light2.clone();
    light4.position.set(-17.25 * 2, 5, 10.5 * 2);
    scene.add(light4);

    var light5 = light2.clone();
    light5.position.set(-17.25 * 2, 5, -9.8 * 2);
    scene.add(light5);


    // Texture Loading
    var textureLoader = new THREE.TextureLoader();
    crateTexture = textureLoader.load("/Chamine037/crate0/crate0_diffuse.png");
    crateBumpMap = textureLoader.load("/Chamine037/crate0/crate0_bump.png");
    crateNormalMap = textureLoader.load("/Chamine037/crate0/crate0_normal.png");


    //Create mesh with these textures
    crate = new THREE.Mesh(
        new THREE.BoxBufferGeometry(2, 2, 2),
        new THREE.MeshPhongMaterial({
            color: 0xffffff,

            map: crateTexture,
            bumpMap: crateBumpMap,
            normalMap: crateNormalMap
        })
    );
    crate.name = "CAIXA";
    scene.add(crate);
    objectsFabrica.push(crate);
    crate.position.set(-6, 2 / 2, -6);
    crate.receiveShadow = true;
    crate.castShadow = true;
    dragObject.push(crate);

    // Load models
    // REMEMBER: Loading in Javascript is asynchronous, so you need
    // to wrap the code in a function and pass it the index. If you
    // don't, then the index '_key' can change while the model is being
    // downloaded, and so the wrong model will be matched with the wrong
    // index key.
    for (var _key in models) {
        (function (key) {

            var mtlLoader = new MTLLoader(loadingManager);
            mtlLoader.load(models[key].mtl, function (materials) {
                materials.preload();

                var objLoader = new OBJLoader(loadingManager);

                objLoader.setMaterials(materials);
                objLoader.load(models[key].obj, function (mesh) {

                    mesh.traverse(function (node) {
                        if (node instanceof THREE.Mesh) {
                            node.castShadow = true;
                            node.receiveShadow = true;
                        }
                    });
                    models[key].mesh = mesh;

                });
            });
        })(_key);
    }

    controlsD = new DragControls(objects, activeCamera, renderer.domElement);
    controlsD.addEventListener('dragstart', function (event) {
        controls.enabled = false;
    });
    controlsD.addEventListener('drag', function (event) {
        console.log('drag');
        event.object.position.y = 3 // This will prevent moving z axis, but will be on 0 line. change this to your object position of z axis.
 

    })
    controlsD.addEventListener('dragend', function (event) {
        controls.enabled = true;
    });


    dragTo = new DragControls(dragObject, activeCamera, renderer.domElement);
    dragTo.addEventListener('dragstart', function (event) {
        controls.enabled = false;
    });
    dragTo.addEventListener('dragend', function (event) {
        controls.enabled = true;
    });


    // create a canvas element
    canvas1 = document.createElement('canvas');
    context1 = canvas1.getContext('2d');
    context1.font = "Bold 20px Arial";
    context1.fillStyle = "rgba(0,0,0,0.95)";
    context1.fillText('Hello, world!', 0, 20);

    // canvas contents will be used for a texture
    texture1 = new THREE.Texture(canvas1)
    texture1.needsUpdate = true;

    document.addEventListener('mousemove', onDocumentMouseMove, false);

    document.addEventListener('keydown', onKeyDown, false);

    targetForDragging = new THREE.Mesh(
        new THREE.BoxBufferGeometry(100, 0.01, 100),
        new THREE.MeshBasicMaterial()
    );
    targetForDragging.material.visible = false;

    mouseAction = NADA;

    setUpMouseHander(canvas, doMouseDown, doMouseMove);
    setUpTouchHander(canvas, doMouseDown, doMouseMove);

    raycaster = new THREE.Raycaster();

    document.getElementById("sgraiDiv").appendChild(renderer.domElement);


}

function doMouseDown(x, y) {
    if (mouseAction == ROTATE) {
        return true;
    }

    if (targetForDragging != undefined && targetForDragging.parent == scene) {
        scene.remove(targetForDragging);  // I don't want to check for hits on targetForDragging
    }
    var a = 2 * x / canvas.width - 1;
    var b = 1 - 2 * y / canvas.height;
    raycaster.setFromCamera(new THREE.Vector2(a, b), camera);
    intersects = raycaster.intersectObjects(scene.children, true);  // no need for recusion since all objects are top-level

    if (intersects.length == 0) {
        return false;
    }
    var item = intersects[0];
    var objectHit = item.object;
    switch (mouseAction) {
        case DRAG:
            //TODO usar isto para o tooltip tambem
            var final_inter;
            var itemObject = intersects[0].object;
            var flag = true;
            while (flag) {
                if (itemObject.parent != null && itemObject.type !== "Scene") {
                    if (objectsFabrica.filter(e => e === itemObject).length > 0) {
                        final_inter = itemObject;
                        flag = false;
                        /* vendors contains the element we're looking for */
                    } else {
                        itemObject = itemObject.parent;
                    }
                } else {
                    flag = false;
                }
            }
            item = intersects[0];;
            objectHit = final_inter;

            if (objectHit == meshFloor) {
                return false;
            } else if (objectHit == skybox) {
                return false;
            } else if (objectHit == plane) {
                return false;
            } else if (objectHit == undefined) {
                return false;
            } else {
                dragItem = objectHit;
                scene.add(targetForDragging);
                targetForDragging.position.set(0, item.point.y, 0);
                render();
                return true;
            }
        case ADD:

            var locationX = item.point.x;  // Gives the point of intersection in world coords
            var locationZ = item.point.z;
            //scene.worldToLocal(coords);  // to add cylider in correct position, neew local coords for the world object
            //render();
            addMachine(locationX, 0, locationZ);
            render();

            return false;
        case DELETE:
            if (objectHit != meshFloor) {
                scene.remove(objectHit);
                render();
            }
            return false;
        default: // NADA
            return false;
    }
}

function doMouseMove(x, y, evt, prevX, prevY) {
    if (mouseAction == ROTATE) {
        /*var dx = x - prevX;
        scene.rotateY( dx/200 );
        render();*/
        return true
    } else if (mouseAction == DRAG) {  // drag
        var a = 2 * x / canvas.width - 1;
        var b = 1 - 2 * y / canvas.height;
        raycaster.setFromCamera(new THREE.Vector2(a, b), camera);
        intersects = raycaster.intersectObject(targetForDragging);
        if (intersects.length == 0) {
            return;
        }
        var locationX = intersects[0].point.x;
        var locationZ = intersects[0].point.z;
        var coords = new THREE.Vector3(locationX, 0, locationZ);
        scene.worldToLocal(coords);
        dragItem.position.set(coords.x, 0, coords.z);
        render();
    }
}


function doJoyStickMove(x, y, evt, prevX, prevY) {
    if (mouseAction == ROTATE) {
        var dx = x - prevX;
        world.rotateY(dx / 200);
        render();
    } else if (mouseAction == DRAG) {  // drag
        //var a = 2*x/canvas.width - 1;
        //var b = 1 - 2*y/canvas.height;
        //raycaster.setFromCamera( new THREE.Vector2(a,b), camera );
        //var intersects = raycaster.intersectObject( targetForDragging );
        //if (intersects.length == 0) {
        //  return;
        //}
        var locationX = intersects[0].point.x;
        var locationZ = intersects[0].point.z;
        var coords = new THREE.Vector3(locationX, 0, locationZ);
        scene.worldToLocal(coords);
        a = Math.min(19, Math.max(-19, coords.x));  // clamp coords to the range -19 to 19, so object stays on ground
        b = Math.min(19, Math.max(-19, coords.z));
        dragItem.position.set(a + x, 3, b + y);
        render();
    }
}


function setUpMouseHander(element, mouseDownFunc, mouseDragFunc, mouseUpFunc) {
    /*
           element -- either the element itself or a string with the id of the element
           mouseDownFunc(x,y,evt) -- should return a boolean to indicate whether to start a drag operation
           mouseDragFunc(x,y,evt,prevX,prevY,startX,startY)
           mouseUpFunc(x,y,evt,prevX,prevY,startX,startY)
       */

    if (!element || !mouseDownFunc || !(typeof mouseDownFunc == "function")) {
        throw "Illegal arguments in setUpMouseHander";
    }
    if (typeof element == "string") {
        element = document.getElementById(element);
    }
    if (!element || !element.addEventListener) {
        throw "first argument in setUpMouseHander is not a valid element";
    }
    var dragging = false;
    var startX, startY;
    var prevX, prevY;

    function doMouseDown(evt) {

        if (dragging) {
            return;
        }
        var r = element.getBoundingClientRect();
        var x = evt.clientX - r.left;
        var y = evt.clientY - r.top;
        prevX = startX = x;
        prevY = startY = y;
        dragging = mouseDownFunc(x, y, evt);
        if (dragging) {
            document.addEventListener("mousemove", doMouseMove);
            document.addEventListener("mouseup", doMouseUp);
        }
    }

    function doMouseMove(evt) {

        if (dragging) {
            if (mouseDragFunc) {
                var r = element.getBoundingClientRect();
                var x = evt.clientX - r.left;
                var y = evt.clientY - r.top;
                mouseDragFunc(x, y, evt, prevX, prevY, startX, startY);
            }
            prevX = x;
            prevY = y;
        }
    }

    function doMouseUp(evt) {

        if (dragging) {
            document.removeEventListener("mousemove", doMouseMove);
            document.removeEventListener("mouseup", doMouseUp);
            if (mouseUpFunc) {
                var r = element.getBoundingClientRect();
                var x = evt.clientX - r.left;
                var y = evt.clientY - r.top;
                mouseUpFunc(x, y, evt, prevX, prevY, startX, startY);
            }
            dragging = false;
        }
    }
    element.addEventListener("mousedown", doMouseDown);
}

function setUpTouchHander(element, touchStartFunc, touchMoveFunc, touchEndFunc, touchCancelFunc) {
    /*
           element -- either the element itself or a string with the id of the element
           touchStartFunc(x,y,evt) -- should return a boolean to indicate whether to start a drag operation
           touchMoveFunc(x,y,evt,prevX,prevY,startX,startY)
           touchEndFunc(evt,prevX,prevY,startX,startY)
           touchCancelFunc()   // no parameters
       */

    if (!element || !touchStartFunc || !(typeof touchStartFunc == "function")) {
        throw "Illegal arguments in setUpTouchHander";
    }
    if (typeof element == "string") {
        element = document.getElementById(element);
    }
    if (!element || !element.addEventListener) {
        throw "first argument in setUpTouchHander is not a valid element";
    }
    var dragging = false;
    var startX, startY;
    var prevX, prevY;

    function doTouchStart(evt) {

        if (evt.touches.length != 1) {
            doTouchEnd(evt);
            return;
        }
        evt.preventDefault();
        if (dragging) {
            doTouchEnd();
        }
        var r = element.getBoundingClientRect();
        var x = evt.touches[0].clientX - r.left;
        var y = evt.touches[0].clientY - r.top;
        prevX = startX = x;
        prevY = startY = y;
        dragging = touchStartFunc(x, y, evt);
        if (dragging) {
            element.addEventListener("touchmove", doTouchMove);
            element.addEventListener("touchend", doTouchEnd);
            element.addEventListener("touchcancel", doTouchCancel);
        }
    }

    function doTouchMove(evt) {

        if (dragging) {
            if (evt.touches.length != 1) {
                doTouchEnd(evt);
                return;
            }
            evt.preventDefault();
            if (touchMoveFunc) {
                var r = element.getBoundingClientRect();
                var x = evt.touches[0].clientX - r.left;
                var y = evt.touches[0].clientY - r.top;
                touchMoveFunc(x, y, evt, prevX, prevY, startX, startY);
            }
            prevX = x;
            prevY = y;
        }
    }

    function doTouchCancel() {

        if (touchCancelFunc) {
            touchCancelFunc();
        }
    }

    function doTouchEnd(evt) {

        if (dragging) {
            dragging = false;
            element.removeEventListener("touchmove", doTouchMove);
            element.removeEventListener("touchend", doTouchEnd);
            element.removeEventListener("touchcancel", doTouchCancel);
            if (touchEndFunc) {
                touchEndFunc(evt, prevX, prevY, startX, startY);
            }
        }
    }
    element.addEventListener("touchstart", doTouchStart);
}


//  joystick
var stick = document.createElement("div");
stick.classList.add("stick");
var joy = document.createElement("div");
joy.classList.add("joy");
document.querySelector('body').appendChild(stick);
stick.appendChild(joy);

var stk = document.querySelector('.stick'),
    joy = document.querySelector('.joy'),
    stw = stk.offsetWidth,
    jow = joy.offsetWidth,
    begin = (stw - jow) / 2,
    mo = false, radi = stw / 2,
    ela = { hx: 0, vx: 0 };

stk.style.height = stw + "px";
joy.style.height = jow + "px";
joy.style.left = begin + "px";
joy.style.top = begin + "px";

var x0 = 0, y0 = 0,
    pan = function (dx, dy) {
        if (field != null) {
            var field = document.querySelector('#sgraiDiv');
            var posX = parseInt(field.clientLeft);
            var posY = parseInt(field.clientTop);
            if (posX < 10) posX = 10;
            if (posX > 1500) posX = 1500;
            if (posY < 10) posY = 10;
            if (posY > 500) posY = 500;

            field.style.left = (posX + (dx / 10)) + "px";
            field.style.top = (posY + (dy / 10)) + "px";
        }
    }

var elastic = function (ex, ey) {
    var stkl = stk.offsetLeft,
        stkt = stk.offsetTop,
        xl = stkl + radi,
        xt = stkt + radi,
        x = ex - stkl - (jow / 2),
        y = ey - stkt - (jow / 2);

    var hx = ex - xl, vx = ey - xt,
        lef = (ex > xl) ? hx : xl - ex,
        tops = (ey > xt) ? vx : xt - ey,
        dist = Math.hypot(lef, tops);    // hypotenuse

    ela.hx = hx;
    ela.vx = vx;

    if (dist < radi && mo) {
        joy.style.left = x + "px";
        joy.style.top = y + "px";
    } else {//return to begin
        //mo = false, ela.hx = 0, ela.vx = 0;
        //joy.style.left = begin + "px";
        //joy.style.top = begin + "px";
    }
}   // calc and return joystick movement

stk.addEventListener("touchmove", function (e) {
    mo = true;
    elastic(e.pageX, e.pageY);
});

stk.addEventListener("mousedown", function (e) {
    mo = true;
    e.preventDefault();
});

var pos3Dx = 0,
    pos3Dy = 0;

stk.addEventListener("mousemove", function (e) {
    if (mo == true) {
        elastic(e.pageX, e.pageY);
        doJoyStickMove(e.pageX, e.pageY, null, 0, 0)
    }
});

document.addEventListener("mouseup", function () {
    if (mo == true) {
        mo = false;
        ela.hx = 0;
        ela.vx = 0;
        joy.style.left = begin + "px";
        joy.style.top = begin + "px";
    }
});

document.addEventListener("keydown", function (eventObject) {
    if (eventObject.which == 37 && !mo) {  //left arrow
        joy.style.left = "0px";
        pan(-50, 0);
    } else if (eventObject.which == 39 && !mo) {  //right arrow
        joy.style.left = (stw - jow) + "px";
        pan(50, 0);
    } else if (eventObject.which == 38 && !mo) {  //up arrow
        joy.style.top = "0px";
        pan(0, -50);
    } else if (eventObject.which == 40 && !mo) {  //down arrow
        joy.style.top = (stw - jow) + "px";
        pan(0, 50);
    } else if (eventObject.which == 27) { //esc

    } else if (eventObject.which == 9) {  //tab
    }
});

document.addEventListener("keyup", function (eventObject) {
    if (eventObject.which >= 37 && eventObject.which <= 40) { // arrows
        joy.style.left = begin + "px";
        joy.style.top = begin + "px";
    }
});

function moveSelectedObj() {
    if (mo == true) {
        pan(ela.hx, ela.vx);
    }
    requestAnimationFrame(moveSelectedObj);
}
requestAnimationFrame(moveSelectedObj);

function onDocumentMouseMove(event) {
    // the following line would stop any other event handler from firing
    // (such as the mouse's TrackballControls)
    // event.preventDefault();

    // update sprite position
    //sprite1.position.set( event.clientX, event.clientY - 20, 0 );

    // update the mouse variable
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
}

function skybox() {

    var materialArray = [];
    var texture_ft = new THREE.TextureLoader().load('/Chamine037/images/sh_ft.png');
    var texture_bk = new THREE.TextureLoader().load('/Chamine037/images/sh_bk.png');
    var texture_up = new THREE.TextureLoader().load('/Chamine037/images/sh_up.png');
    var texture_dn = new THREE.TextureLoader().load('/Chamine037/images/sh_dn.png');
    var texture_rt = new THREE.TextureLoader().load('/Chamine037/images/sh_rt.png');
    var texture_lf = new THREE.TextureLoader().load('/Chamine037/images/sh_lf.png');

    materialArray.push(new THREE.MeshBasicMaterial({ map: texture_ft }));
    materialArray.push(new THREE.MeshBasicMaterial({ map: texture_bk }));
    materialArray.push(new THREE.MeshBasicMaterial({ map: texture_up }));
    materialArray.push(new THREE.MeshBasicMaterial({ map: texture_dn }));
    materialArray.push(new THREE.MeshBasicMaterial({ map: texture_rt }));
    materialArray.push(new THREE.MeshBasicMaterial({ map: texture_lf }));
    for (var i = 0; i < materialArray.length; i++)
        materialArray[i].side = THREE.BackSide;
    var skyboxGeo = new THREE.BoxBufferGeometry(1000, 1000, 1000);
    var skybox = new THREE.Mesh(skyboxGeo, materialArray);
    scene.add(skybox);

}

function factory() {
    meshFloor = new THREE.Mesh(
        new THREE.PlaneBufferGeometry(35 * 2, 50 * 2, 10, 10),
        new THREE.MeshPhongMaterial({ color: 0xffffff, wireframe: USE_WIREFRAME })
    );
    meshFloor.rotation.x -= Math.PI / 2;
    meshFloor.receiveShadow = true;
    scene.add(meshFloor);

    meshRoof = new THREE.Mesh(
        new THREE.PlaneBufferGeometry(35 * 2, 50 * 2, 10, 10),
        new THREE.MeshPhongMaterial({ color: 0xffffff, wireframe: USE_WIREFRAME })
    );
    meshRoof.rotation.x -= Math.PI / 2 * 3;
    meshRoof.receiveShadow = true;
    meshRoof.position.y = 10;
    scene.add(meshRoof);


    var door = new THREE.Mesh(new THREE.PlaneBufferGeometry(7 * 2.5, 13, 10, 10), new THREE.MeshBasicMaterial({ color: 0xffffff, map: new THREE.TextureLoader().load("images/fabrica/factorydoors15.jpg") }));
    door.position.set(8 * 2, 1, 25.22 * 2);
    door.name = "Portão";
    scene.add(door);

    var doorInside = door.clone();
    doorInside.position.set(8 * 2, 1, 24.8 * 2);
    doorInside.rotation.y = Math.PI;
    scene.add(doorInside);

    var frontWall = new THREE.Mesh(new THREE.PlaneBufferGeometry(35 * 2, 20, 10, 10), new THREE.MeshBasicMaterial({ color: 0xffffff, map: new THREE.TextureLoader().load("images/fabrica/frwall2.jpg") }));
    frontWall.position.set(0, 0, 25.2 * 2);
    scene.add(frontWall);

    var glassdoor = new THREE.Mesh(new THREE.PlaneBufferGeometry(5 * 2, 4 * 2, 10, 10), new THREE.MeshBasicMaterial({ color: 0xffffff, map: new THREE.TextureLoader().load("images/fabrica/glassdoor.jpg") }));
    glassdoor.position.set(-8 * 2, 3.9, 25.22 * 2);
    glassdoor.name = "Porta de entrada";
    scene.add(glassdoor);

    var glassdoorInside = glassdoor.clone();
    glassdoorInside.position.set(-8 * 2, 3.9, 24.8 * 2);
    glassdoorInside.rotation.y = Math.PI;
    scene.add(glassdoorInside);

}
function render() {
    renderer.render(scene, camera);
    //console.log(renderer.info)
}

// Runs when all resources are loaded
function onResourcesLoaded() {
    // Clone models into meshes.
    meshes["forklift1"] = models.forklift.mesh.clone();

    // Reposition individual meshes, then add meshes to scene
    meshes["forklift1"].position.set(0, -2, 0);
    meshes["forklift1"].rotation.y = Math.PI;
    meshes["forklift1"].scale.set(1.9, 1.9, 1.9);
    // scene.add(meshes["forklift1"]);
    meshes["forklift1"].name = "Empilhadora";
    objectsFabrica.push(meshes["forklift1"]);
    var boxGeometry = new THREE.BoxBufferGeometry(4, 5, 4, 5, 5, 5);
    var gridGeometry = GridBoxGeometry(boxGeometry, false);
    var grid = new THREE.LineSegments(gridGeometry, new THREE.LineBasicMaterial({ color: 0xFF0000, ambient: 0xCCCCCC, transparent: true, opacity: 0, depthTest: false }));
    grid.name = "Forklift";
    grid.position.set(0, 2, 7)
    grid.add(meshes["forklift1"]);
    dragObject.push(grid);
    scene.add(grid);


    meshes["window"] = models.window.mesh.clone();
    meshes["window"].position.set(-17.2 * 2, 5, 10.5 * 2);
    meshes["window"].rotation.z = Math.PI / 2;
    meshes["window"].rotation.x = -Math.PI / 2;
    meshes["window"].scale.set(0.107 * 2, 0.08, 0.0785);
    scene.add(meshes["window"]);

    var window2 = meshes["window"].clone();
    window2.position.set(-17.2 * 2, 5, -9.8 * 2);
    scene.add(window2);

    var window3 = meshes["window"].clone();
    window3.position.set(17.2 * 2, 5, -9.8 * 2);
    window3.rotation.z = - Math.PI / 2;
    scene.add(window3);

    var window4 = meshes["window"].clone();
    window4.position.set(17.2 * 2, 5, 10.5 * 2);
    window3.rotation.z = - Math.PI / 2;
    scene.add(window4);

    // loader.load("../../../../models/estante.json", function (obj1) {
    //     estante = obj1.clone();
    //     //console.log(estante);
    //     estante.position.set(12, 0, -23);
    //     estante.scale.set(0.03, 0.03, 0.03);
    //     estante.name = "Estante";
    //     scene.add(estante);
    // });
    maquinas();
}

function maquinas() {

    loader.load("/Chamine037/models/roboAmarelo.json", function (obj1) {
        robomesa = obj1.clone();
        robomesa.position.set(6.8, 1.3, -7);
        robomesa.scale.set(0.04, 0.04, 0.04);
        robomesa.name = "Robo";
        robomesa.receiveShadow = true;
        robomesa.castShadow = true;
        objectsFabrica.push(robomesa);
        //scene.add(robomesa);


    });

    loader.load("/Chamine037/models/mesaParaRobo.json", function (obj1) {
        mesa2 = obj1.clone();
        //console.log(robomesa);
        mesa2.position.set(6.8, 0, -6);
        mesa2.scale.set(0.8, 0.8, 0.8);
        mesa2.name = "Mesa";
        mesa2.receiveShadow = true;
        mesa2.castShadow = true;
        objectsFabrica.push(mesa2);
        //scene.add(mesa2);

    });


    // Load Press Table
    loader.load("/Chamine037/models/press_table.json", function (obj1) {
        pressTable = obj1.clone();
        //console.log(press);
        pressTable.position.set(0, 0, -6);
        pressTable.scale.set(0.8, 0.8, 0.8);
        pressTable.name = "Mesa Prensa";
        pressTable.receiveShadow = true;
        pressTable.castShadow = true;
        objectsFabrica.push(pressTable);
        //scene.add(pressTable);

    });

    // Load Press
    loader.load("/Chamine037/models/press.json", function (obj1) {
        press = obj1.clone();
        //console.log(press);
        press.position.set(0, 0, -6);
        press.scale.set(0.8, 0.8, 0.8);
        press.name = "Prensa";
        press.receiveShadow = true;
        press.castShadow = true;
        objectsFabrica.push(press);
        //scene.add(press);

    });

    loader.load("/Chamine037/models/factory.json", function (obj1) {
        factoryBuild = obj1.clone();
        //console.log(press);
        factoryBuild.position.set(0, 0, 0);
        factoryBuild.scale.set(1 * 2, 0.668, 1 * 2);
        factoryBuild.name = "FactoryBuild";

        scene.add(factoryBuild);
    });

    loader.load("/Chamine037/models/furar.json", function (obj1) {
        furar = obj1.clone();
        //console.log(furar);
        furar.position.set(6.8, 0, -6);
        furar.scale.set(0.8, 0.8, 0.8);
        furar.name = "Furar";
        furar.receiveShadow = true;
        furar.castShadow = true;
        objectsFabrica.push(furar);
        //scene.add(furar);

    });

    loader.load("/Chamine037/models/furar2.json", function (obj1) {
        furar2 = obj1.clone();
        //console.log(furar2);
        furar2.position.set(8.79, 1.9, -5.477);
        furar2.scale.set(0.8, 0.8, 0.8);
        furar2.name = "Maquina de Furar";
        furar2.receiveShadow = true;
        furar2.castShadow = true;
        objectsFabrica.push(furar2);
        //scene.add(furar2);

    });

    loader.load("/Chamine037/models/fork.json", function (obj1) {
        fork = obj1.clone();
        fork.position.set(-2, 1.55, -5.9);
        fork.scale.set(0.1, 0.1, 0.1);
        fork.name = "Garfo";
        fork.receiveShadow = true;
        fork.castShadow = true;
        objectsFabrica.push(fork);
        //scene.add(fork);

    })
    /*loader.load("../../../../models/box_with_fork.json", function (obj1) {
        boxFork = obj1.clone();
        //console.log(furar2);
        boxFork.position.set(11.5, 0, -5.9);
        boxFork.scale.set(0.25, 0.25, 0.25);
        boxFork.name = "Caixa talheres"
        objectsFabrica.push(boxFork);
        scene.add(boxFork);
    })*/
    loader.load("/Chamine037/models/openBox.json", function (obj1) {
        boxFork = obj1.clone();
        //console.log(furar2);
        boxFork.position.set(11.5, 0, -5.9);
        boxFork.scale.set(0.085, 0.085, 0.085);
        boxFork.rotateY(Math.PI)
        boxFork.name = "Caixa talheres"
        objectsFabrica.push(boxFork);
    })

    loader.load("/Chamine037/models/maquina.json", function (obj1) {
        maquina = obj1.clone();
        maquina.position.set(0, 0, 0);
        maquina.scale.set(0.003, 0.003, 0.003);
        maquina.name = "Maquina";
        maquina.receiveShadow = true;
        maquina.castShadow = true;
        objectsFabrica.push(maquina);

    })
}

function onKeyDown(event) {
    switch (event.keyCode) {
        case 79: /*O*/
            activeCamera = cameraOrtho;
            break;
        case 80: /*P*/
            activeCamera = camera;
            break;
        default:
            break;
    }

}


export function animate() {
    // Play the loading screen until resources are loaded.
    if (RESOURCES_LOADED === false) {
        requestAnimationFrame(animate);

        loadingScreen.box.position.x -= 0.05;
        if (loadingScreen.box.position.x < -10) loadingScreen.box.position.x = 10;
        loadingScreen.box.position.y = Math.sin(loadingScreen.box.position.x);

        renderer.render(loadingScreen.scene, loadingScreen.camera);
        return;
    }

    requestAnimationFrame(animate);

    if (dragcontrols === true) {
        controlsD.enabled = true;
        dragTo.enabled = true;
        hideTooltip();
    } else {
        controlsD.enabled = false;
        dragTo.enabled = false;
    }
    if (pressBollean === true) {
        pressMov();
    } else {
        //press.position.set(0, 0, -6);
    }
    if (furarBollean === true) {
        furarMov();
    } else {
        //furar2.position.set(8.79, 1.9, -5.477);
    }
    if (furarBollean === true && pressBollean === true) {
        forkMov();
    }
    if (keyboard[79]) { /*O*/
        activeCamera = cameraOrtho;
    }
    if (keyboard[80]) { /*P*/
        activeCamera = camera;
    }

    if (firstPerson === true) {

        if (keyboard[87]) { // W key
            activeCamera.position.x -= Math.sin(activeCamera.rotation.y) * player.speed;
            activeCamera.position.z -= -Math.cos(activeCamera.rotation.y) * player.speed;
        }
        if (keyboard[83]) { // S key
            activeCamera.position.x += Math.sin(activeCamera.rotation.y) * player.speed;
            activeCamera.position.z += -Math.cos(activeCamera.rotation.y) * player.speed;
        }
        if (keyboard[65]) { // A key
            activeCamera.position.x += Math.sin(activeCamera.rotation.y + Math.PI / 2) * player.speed;
            activeCamera.position.z += -Math.cos(activeCamera.rotation.y + Math.PI / 2) * player.speed;
        }
        if (keyboard[68]) { // D key
            activeCamera.position.x += Math.sin(activeCamera.rotation.y - Math.PI / 2) * player.speed;
            activeCamera.position.z += -Math.cos(activeCamera.rotation.y - Math.PI / 2) * player.speed;
        }

        if (keyboard[37]) { // left arrow key
            activeCamera.rotation.y -= player.turnSpeed;
        }
        if (keyboard[39]) { // right arrow key
            activeCamera.rotation.y += player.turnSpeed;
        }
        render();
    }

    //TODO verificar se é isto que é para fazer ou o do "onKeyDown"
    /*if(keyboard[79]){
        orthographic();
    }*/
    //controls.update;
    render();
    update();
}


function update() {
    // create a Ray with origin at the mouse position
    //   and direction into the scene (camera direction)
    var vector = new THREE.Vector3(mouse.x, mouse.y, 0);
    vector.unproject(camera);
    var ray = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());

    // create an array containing all objects in the scene with which the ray intersects
    var intersects = ray.intersectObjects(scene.children);

    // INTERSECTED = the object in the scene currently closest to the camera
    //		and intersected by the Ray projected from the mouse position

    // if there is one (or more) intersections
    if (intersects.length > 0) {
        // if the closest object intersected is not the currently stored intersection object
        if (intersects[0].object !== INTERSECTED) {
            // restore previous intersection object (if it exists) to its original color
            if (INTERSECTED && INTERSECTED.currentHex != null) {
                INTERSECTED.material.color.setHex(INTERSECTED.currentHex);
            }
            // store reference to closest object as current intersection object
            INTERSECTED = intersects[0].object;
            latestMouseProjection = intersects[0].point
            // store color of closest object (for later restoration)
            if (INTERSECTED.material.color != null) {
                INTERSECTED.currentHex = INTERSECTED.material.color.getHex();
            }
            // set a new color for closest object
            if (INTERSECTED.material.color != null) {
                INTERSECTED.material.color.setHex(0xffff00);
            }

            // update text, if it has a "name" field.
            if (intersects[0].object.name) {
                showTooltip();
            } else {
                hideTooltip();
            }
        }
    } else { // there are no intersections
        // restore previous intersection object (if it exists) to its original color
        if (INTERSECTED.material.color != null)
            INTERSECTED.material.color.setHex(INTERSECTED.currentHex);
        // remove previous intersection object reference
        //     by setting current intersection object to "nothing"
        INTERSECTED = null;
        context1.clearRect(0, 0, 300, 300);
        texture1.needsUpdate = true;
    }

    controls.update();
}
export function addMachine(inputX, inputY, inputZ) {
    //var inputX = document.getElementById("inputY").value;
    //var inputY = document.getElementById("inputZ").value;
    //var inputZ = document.getElementById("inputX").value;
    try {
        var maquinaR;
        console.log(maquinaadd);
        if (maquinaadd == "robo") {
            maquinaR = robomesa.clone();
        } else if (maquinaadd == "prensa") {
            maquinaR = new THREE.Group();
            var x = pressTable.clone();
            x.position.set(0, 0, 0);
            var xx = press.clone();
            xx.position.set(0, 0, 0);
            maquinaR.add(x);
            maquinaR.add(xx);
        } else if (maquinaadd == "maquinafurar") {
            maquinaR = new THREE.Group();
            var x = furar.clone();
            x.position.set(0, -0.8, 0);
            var xx = furar2.clone();
            xx.position.set(1.99, 1.1, 0.51);
            maquinaR.add(x);
            maquinaR.add(xx);
        }
        // maquinaR.name = "Maquina R";

        //maquinaR.position.set(inputX, (inputY / 3), inputZ);
        maquinaR.position.set(0, -0.8, 0);
        //objectsFabrica.push(maquinaR);
        var boxGeometry = new THREE.BoxBufferGeometry(4, 3, 3, 5, 5, 5);
        boxGeometry.visible = false;
        var gridGeometry = GridBoxGeometry(boxGeometry, false);

        var grid = new THREE.LineSegments(gridGeometry, new THREE.LineBasicMaterial({ color: 0xFF0000, ambient: 0xCCCCCC, transparent: true, opacity: 0, depthTest: false }));
        grid.name = maquinaadd;
        grid.position.set(inputX, 2, inputZ);
        grid.add(maquinaR);
        dragObject.push(grid);
        scene.add(grid);
    } catch (e) {
        window.alert("Escolha uma maquina depois do ADD estar ativo!")
    }
}

//Activar maquina hidraulica de pressao
export function pressAnimation() {
    var pressBtn = document.getElementById("pressBtn");
    if (pressBollean) {
        pressBtn.style.background = "red";
    } else {
        pressBtn.style.background = "green";
    }

    pressBollean = !pressBollean;
}
export function addLp(nome, x, y, z) {
    var id = nome;
    var rb = robomesa.clone();
    rb.position.set(6.8 - 3.5, 1.3 - 3, -7 + 6.8);

    var m = mesa2.clone();
    m.position.set(6.8 - 3.5, 0 - 3, -6 + 6.8);

    var pt = pressTable.clone();
    pt.position.set(0 - 3.5, 0 - 3, -6 + 6.8);

    var p = press.clone();
    p.position.set(0 - 3.5, 0 - 3, -6 + 6.8);

    var f = furar.clone();
    f.position.set(6.8 - 3.5, 0 - 3, -6 + 6.8);

    var f2 = furar2.clone();
    f2.position.set(8.79 - 3.5, 1.9 - 3, -5.477 + 6.8);

    var fk = fork.clone();
    fk.position.set(-2 - 3.5, 1.55 - 3, -5.9 + 6.8);

    var bfk = boxFork.clone();
    bfk.position.set(7.99, -2, 1);


    // var mq = maquina.clone();
    // mq.position.set(-3.5 +y , 0 -3, 6.8 +x);


    var g = new THREE.Group();
    g.add(id);
    g.add(rb);
    g.add(m);
    g.add(pt);
    g.add(p);
    g.add(f);
    g.add(f2);
    g.add(fk);
    g.add(bfk);
    //g.add(mq);
    // var gr = new THREE.GridHelper(10, 10);
    // console.log(gr);
    // gr.position.set(y, 0, x);
    // gr.add(g);
    //scene.add(g);
    // scene.add(gr);
    // objects.push(gr);

    var boxGeometry = new THREE.BoxBufferGeometry(15, 5, 4.5, 5, 5, 5);
    boxGeometry.visible = false;
    var gridGeometry = GridBoxGeometry(boxGeometry, false);

    var grid = new THREE.LineSegments(gridGeometry, new THREE.LineBasicMaterial({ color: 0xFF0000, ambient: 0xCCCCCC, transparent: true, opacity: 0, depthTest: false }));
    grid.position.set(y, 3, x)
    grid.name = "linha de producao "+ nome;
    grid.add(g);
    scene.add(grid);
    objects.push(grid);
    console.log(objects);

}

function GridBoxGeometry(geometry, independent) {

    if (!(geometry instanceof THREE.BoxBufferGeometry)) {
        console.log("GridBoxGeometry: the parameter 'geometry' has to be of the type THREE.BoxBufferGeometry");
        return geometry;
    }
    independent = independent !== undefined ? independent : false;

    let newGeometry = new THREE.BoxBufferGeometry();
    let position = geometry.attributes.position;
    newGeometry.attributes.position = independent === false ? position : position.clone();

    let segmentsX = geometry.parameters.widthSegments || 1;
    let segmentsY = geometry.parameters.heightSegments || 1;
    let segmentsZ = geometry.parameters.depthSegments || 1;

    let startIndex = 0;
    let indexSide1 = indexSide(segmentsZ, segmentsY, startIndex);
    startIndex += (segmentsZ + 1) * (segmentsY + 1);
    let indexSide2 = indexSide(segmentsZ, segmentsY, startIndex);
    startIndex += (segmentsZ + 1) * (segmentsY + 1);
    let indexSide3 = indexSide(segmentsX, segmentsZ, startIndex);
    startIndex += (segmentsX + 1) * (segmentsZ + 1);
    let indexSide4 = indexSide(segmentsX, segmentsZ, startIndex);
    startIndex += (segmentsX + 1) * (segmentsZ + 1);
    let indexSide5 = indexSide(segmentsX, segmentsY, startIndex);
    startIndex += (segmentsX + 1) * (segmentsY + 1);
    let indexSide6 = indexSide(segmentsX, segmentsY, startIndex);

    let fullIndices = [];
    fullIndices = fullIndices.concat(indexSide1);
    fullIndices = fullIndices.concat(indexSide2);
    fullIndices = fullIndices.concat(indexSide3);
    fullIndices = fullIndices.concat(indexSide4);
    fullIndices = fullIndices.concat(indexSide5);
    fullIndices = fullIndices.concat(indexSide6);

    newGeometry.setIndex(fullIndices);

    function indexSide(x, y, shift) {
        let indices = [];
        for (let i = 0; i < y + 1; i++) {
            let index11 = 0;
            let index12 = 0;
            for (let j = 0; j < x; j++) {
                index11 = (x + 1) * i + j;
                index12 = index11 + 1;
                let index21 = index11;
                let index22 = index11 + (x + 1);
                indices.push(shift + index11, shift + index12);
                if (index22 < ((x + 1) * (y + 1) - 1)) {
                    indices.push(shift + index21, shift + index22);
                }
            }
            if ((index12 + x + 1) <= ((x + 1) * (y + 1) - 1)) {
                indices.push(shift + index12, shift + index12 + x + 1);
            }
        }
        return indices;
    }
    return newGeometry;
};

//Activar maquina de furar
export function drillAnimation() {
    var drillBtn = document.getElementById("drillBtn");
    if (furarBollean) {
        drillBtn.style.background = "red";
    } else {
        drillBtn.style.background = "green";
    }
    furarBollean = !furarBollean;
}

export function resetCamera() {
    activeCamera.position.set(0, 15, 50);
    camera.lookAt(new THREE.Vector3(0, player.height, 0));
}
export function toogleWireframe() {
    meshFloor.material.wireframe = !meshFloor.material.wireframe;
    //factoryBuild.material.wireframe=!factoryBuild.material.wireframe;
}
export function firstPersonFunc() {
    // Get the checkbox
    var fpBtn = document.getElementById("fpBtn");

    firstPerson = !firstPerson;

    if (firstPerson) {
        fpBtn.style.background = "green";
        activeCamera.position.set(0, 2, -20);
        activeCamera.lookAt(new THREE.Vector3(0, player.height, 0));
    } else {
        fpBtn.style.background = "red";
        activeCamera.position.set(0, 15, 50);
        activeCamera.lookAt(new THREE.Vector3(0, player.height, 0));
    }
}

// export function mouseRotateFunc() {
//     
//     var mouseRotateBtn = document.getElementById("mouseRotate");

//     mouseRotate = !mouseRotate;

//     if (mouseRotate) {
//         var mouseDragBtn = document.getElementById("mouseDrag");
//         var mouseAddBtn = document.getElementById("mouseAdd");
//         var mouseDeleteBtn = document.getElementById("mouseDelete");
//         mouseDragBtn.style.background = "red";
//         mouseAddBtn.style.background = "red";
//         mouseDeleteBtn.style.background = "red";


//         mouseRotateBtn.style.background = "green";
//         //mouseAction = ROTATE;

//         controls = new OrbitControls(camera, renderer.domElement);
//         controls.addEventListener('change', render);
//         controls.minDistance = 0;
//         controls.maxDistance = 1500;
//         controls.maxPolarAngle = Math.PI / 4 * 1.87;
//         controls.enableKeys = false;

//         animate();
//     } else {
//         mouseRotateBtn.style.background = "red";
//         if (controls !== undefined) {
//             controls.enabled = false;
//         }

//         mouseAction = NADA;
//     }
// }
// export function mouseDragFunc() {
//     
//     var mouseDragBtn = document.getElementById("mouseDrag");

//     mouseDrag = !mouseDrag;

//     if (mouseDrag) {
//         var mouseRotateBtn = document.getElementById("mouseRotate");
//         var mouseAddBtn = document.getElementById("mouseAdd");
//         var mouseDeleteBtn = document.getElementById("mouseDelete");
//         mouseRotateBtn.style.background = "red";
//         mouseAddBtn.style.background = "red";
//         mouseDeleteBtn.style.background = "red";
//         if (controls !== undefined) {
//             controls.enabled = false;
//         }

//         mouseDragBtn.style.background = "green";
//         mouseAction = DRAG;
//     } else {
//         mouseDragBtn.style.background = "red";
//         mouseAction = NADA;
//     }
// }

export function saveCoordinates() {
    var save = document.getElementById("save");

    for (var i = 0; i < linhasproducao.length; i++) {
        var x = objects[i].position.z;
        var y = objects[i].position.x;
        console.log(x);
        console.log(y);
        axios.put('https://mdf37.azurewebsites.net/api/updatelp/' + linhasproducao[i].id + '/' + Math.ceil(x) + '/' + Math.ceil(y)

        ).then((response) => {

            window.alert("Update com sucesso!")

            console.log(response);
        }, (error) => {
            console.log(error);
            window.alert("Sem sucesso!")
        })

    }

}

export function dgragFunc() {

    var drag = document.getElementById("drag");
    console.log(drag);
    if (dragcontrols == false) {
        dragcontrols = true;

        drag.style.background = "green";
    } else {
        dragcontrols = false;
        drag.style.background = "red";
    }


}
export function selectAdd(maquina) {
    maquinaadd = maquina;
    console.log(maquinaadd);
}
export function mouseAddFunc() {

    var mouseAddBtn = document.getElementById("mouseAdd");

    mouseAdd = !mouseAdd;

    if (mouseAdd) {
        controls.enabled = false;
        firstPerson = true;
        mouseAddBtn.style.background = "green";
        maquinaadd = mouseAddBtn;
        mouseAction = ADD;
    } else {
        firstPerson = false;
        controls.enabled = true;
        mouseAddBtn.style.background = "red";
        mouseAction = NADA;
    }
}
export function mouseDeleteFunc() {

    var mouseDeleteBtn = document.getElementById("mouseDelete");

    mouseDelete = !mouseDelete;

    if (mouseDelete) {




        mouseDeleteBtn.style.background = "green";
        mouseAction = DELETE;
    } else {
        mouseDeleteBtn.style.background = "red";
        mouseAction = NADA;
    }
}
// This will move tooltip to the current mouse position and show it by timer.
function showTooltip() {
    var divElement = document.getElementById("tooltip");

    if (divElement && latestMouseProjection) {

        var canvasHalfWidth = renderer.domElement.offsetWidth / 2;
        var canvasHalfHeight = renderer.domElement.offsetHeight / 2;

        var tooltipPosition = latestMouseProjection.clone().project(camera);
        tooltipPosition.x = (tooltipPosition.x * canvasHalfWidth - 30) + canvasHalfWidth + renderer.domElement.offsetLeft;
        tooltipPosition.y = -(tooltipPosition.y * canvasHalfHeight - 30) + canvasHalfHeight + renderer.domElement.offsetTop;

        var tootipWidth = divElement.offsetWidth;
        var tootipHeight = divElement.offsetHeight;

        var calculatedLeft = tooltipPosition.x - tootipWidth / 2;
        var calculatedTop = tooltipPosition.y - tootipHeight - 5;
        divElement.style.left = calculatedLeft + 'px';
        divElement.style.top = calculatedTop + 'px';

        divElement.innerText = INTERSECTED.name;

        divElement.classList.remove('tooltipHide');
        divElement.classList.add('tooltipShow');

    }
}

// This will immediately hide tooltip.
function hideTooltip() {
    var divElement = document.getElementById("tooltip");
    if (divElement != null) {
        divElement.classList.remove('tooltipShow');
        divElement.classList.add('tooltipHide');
    }
}

function pressMov() {
    if (i === 0) {
        objects[0].children[0].children[3].translateY(-0.03);
        j = j + 0.06;
        if (j >= 0.90) {
            i = 1;
            j = 0;
        }
    }

    if (i === 1) {
        objects[0].children[0].children[3].translateY(0.03);
        j = j + 0.06;
        if (j >= 0.90) {
            i = 0;
            j = 0;
        }
    }
}

function furarMov() {
    if (a === 0) {
        objects[0].children[0].children[5].translateY(-0.03);
        b = b + 0.06;
        if (b >= 0.80) {
            a = 1;
            b = 0;
        }
    }

    if (a === 1) {
        objects[0].children[0].children[5].translateY(0.03);
        b = b + 0.06
        if (b >= 0.80) {
            a = 0;
            b = 0;
        }
    }
}

function forkMov() {
    if (x < 265) {
        objects[0].children[0].children[6].translateX(0.05);
        x++;
    } else if (x < 310) {
        objects[0].children[0].children[6].translateZ(-0.03);
        objects[0].children[0].children[6].translateX(0.01);
        x++;
    }
    else {
        objects[0].children[0].children[6].position.set(-2 - 3.5, 1.55 - 3, -5.9 + 6.8);
        x = 0;
    }

}

function keyDown(event) {
    keyboard[event.keyCode] = true;
}

function keyUp(event) {
    keyboard[event.keyCode] = false;
}

window.addEventListener('keydown', keyDown);
window.addEventListener('keyup', keyUp);

