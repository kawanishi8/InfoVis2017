function main() {
    var volume = new KVS.LobsterData();
    var screen = new KVS.THREEScreen();

    screen.init(volume, {
        width: window.innerWidth*0.8,
        height: window.innerHeight,
        enableAutoResize: false
    });
    var elem = document.getElementById('isovalue');
    document.write(elem)
    var bounds = Bounds(volume);
    screen.scene.add(bounds);

    var isovalue = 128;
    var surfaces = Isosurfaces(volume, isovalue,screen);
    screen.scene.add(surfaces);

    document.addEventListener('mousemove', function () {
        screen.light.position.copy(screen.camera.position);0
    });

    window.addEventListener('resize', function () {
        screen.resize([window.innerWidth*0.8, window.innerHeight]);
    });

    screen.loop();
}
