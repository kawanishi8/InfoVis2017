function main() {
    var width = 500;
    var height = 500;

    var scene = new THREE.Scene();

    var fov = 45;
    var aspect = width / height;
    var near = 1;
    var far = 1000;
    var camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(0, 0, 5);
    scene.add(camera);

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    document.body.appendChild(renderer.domElement);

    var vertices = [
	[-1, 1, 0],
	[-1, -1, 0],
	[1, -1, 0],
	[1, 1, 0],
	[-1, 1, -2],
	[-1, -1, -2],
	[1, -1, -2],
	[1, 1, -2],
    ];

    var geometry = new THREE.Geometry();

    var v0 = new THREE.Vector3().fromArray(vertices[0]);
    var v1 = new THREE.Vector3().fromArray(vertices[1]);
    var v2 = new THREE.Vector3().fromArray(vertices[2]);
    var v3 = new THREE.Vector3().fromArray(vertices[3]);
    var v4 = new THREE.Vector3().fromArray(vertices[4]);
    var v5 = new THREE.Vector3().fromArray(vertices[5]);
    var v6 = new THREE.Vector3().fromArray(vertices[6]);
    var v7 = new THREE.Vector3().fromArray(vertices[7]);

    geometry.vertices.push(v0);
    geometry.vertices.push(v1);
    geometry.vertices.push(v2);
    geometry.vertices.push(v3);
    geometry.vertices.push(v4);
    geometry.vertices.push(v5);
    geometry.vertices.push(v6);
    geometry.vertices.push(v7);

    var f0 = new THREE.Face3(0, 1, 3);
    var f1 = new THREE.Face3(2, 3, 1);
    var f2 = new THREE.Face3(4, 5, 0);
    var f3 = new THREE.Face3(1, 0, 5);
    var f4 = new THREE.Face3(4, 0, 7);
    var f5 = new THREE.Face3(3, 7, 0);
    var f6 = new THREE.Face3(3, 2, 7);
    var f7 = new THREE.Face3(6, 7, 2);
    var f8 = new THREE.Face3(7, 6, 4);
    var f9 = new THREE.Face3(5, 4, 6);
    var f10 = new THREE.Face3(1, 5, 2);
    var f11 = new THREE.Face3(6, 2, 5);

    geometry.faces.push(f0);
    geometry.faces.push(f1);
    geometry.faces.push(f2);
    geometry.faces.push(f3);
    geometry.faces.push(f4);
    geometry.faces.push(f5);
    geometry.faces.push(f6);
    geometry.faces.push(f7);
    geometry.faces.push(f8);
    geometry.faces.push(f9);
    geometry.faces.push(f10);
    geometry.faces.push(f11);

    geometry.computeFaceNormals();

    var light = new THREE.PointLight(0xffffff);
    light.position.set(1, 1, 2);
    scene.add(light);
    light = new THREE.PointLight(0xffffff);
    light.position.set(-1, -1, 2);
    scene.add(light);
    light = new THREE.PointLight(0xffffff);
    light.position.set(-1, 1, 2);
    scene.add(light);
    light = new THREE.PointLight(0xffffff);
    light.position.set(1, -1, 2);
    scene.add(light);
    var material = new THREE.MeshLambertMaterial({ color: 0xffffff });
    //var material = new THREE.MeshBasicMaterial();
    material.side = THREE.DoubleSide
    material.vertexColors = THREE.FaceColors;
    var triangle = new THREE.Mesh(geometry, material);
    scene.add(triangle);
    loop();

    function loop() {
        requestAnimationFrame(loop);
        triangle.rotation.x += 0.005;
        triangle.rotation.y += 0.005;
        renderer.render(scene, camera);
    }
}
