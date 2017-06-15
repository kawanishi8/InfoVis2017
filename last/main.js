function main() {
    screen.init(volume, {
        width: window.innerWidth*0.8,
        height: window.innerHeight,
        enableAutoResize: false
    });
    bounds = Bounds(volume);
    screen.scene.add(bounds);
    var elem = document.getElementById('isovalue').value;
    var isovalue = elem;
    surfaces = Isosurfaces(volume, isovalue,screen,color,shading);
    screen.scene.add(surfaces);    
    document.addEventListener('mousemove', function () {
        screen.light.position.copy(screen.camera.position);0
    });
    window.addEventListener('resize', function () {
        screen.resize([window.innerWidth*0.8, window.innerHeight]);
    });
    screen.loop();
}
function main2(a) {
    screen.scene.remove(surfaces);
    screen.scene.remove(bounds);
    bounds = Bounds(volume);
    screen.scene.add(bounds);
    var elem = document.getElementById('isovalue').value;
    var isovalue = elem;
    color = a
    var A = document.getElementById('colormap');
    if (a == 0) {
        A.innerHTML = "rainbow"
    } else {
        A.innerHTML = "white-red"
    }

    surfaces = Isosurfaces(volume, isovalue, screen,color,shading);
    screen.scene.add(surfaces);

    document.addEventListener('mousemove', function () {
        screen.light.position.copy(screen.camera.position); 0
    });
    window.addEventListener('resize', function () {
        screen.resize([window.innerWidth * 0.8, window.innerHeight]);
    });
    screen.loop();
}
function main3(a) {
    screen.scene.remove(surfaces);
    screen.scene.remove(bounds);
    var elem = document.getElementById('isovalue').value;
    bounds = Bounds(volume);
    screen.scene.add(bounds);
    var isovalue = elem;
    shading = (shading + 1) % 2;
    var A = document.getElementById('shading');
    if (shading == 0) {
        A.innerHTML = "on"
    } else {
        A.innerHTML = "off"
    }
    surfaces = Isosurfaces(volume, isovalue, screen,color,shading);
    screen.scene.add(surfaces);
    document.addEventListener('mousemove', function () {
        screen.light.position.copy(screen.camera.position); 0
    });

    window.addEventListener('resize', function () {
        screen.resize([window.innerWidth * 0.8, window.innerHeight]);
    });
    screen.loop();
}

