function main1()
{
    var width = 500;
    var height = 500;

    var scene = new THREE.Scene();

    var fov = 45;
    var aspect = width / height;
    var near = 1;
    var far = 1000;
    var camera = new THREE.PerspectiveCamera( fov, aspect, near, far );
    camera.position.set( 0, 0, 5 );
    scene.add( camera );

    var light = new THREE.PointLight();
    light.position.set( 5, 5, 5 );
    scene.add( light );

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize( width, height );
    document.body.appendChild( renderer.domElement );

    var vertices = [
        [ -1,  1, 0 ], // 0
        [ -1, -1, 0 ], // 1
        [  1, -1, 0 ]  // 2
    ];

    var faces = [
        [ 0, 1, 2 ], // f0
    ];

    var scalars = [
        0.1,   // S0
        0.2, // S1
        0.8  // S2
    ];

    // Create color map
    var cmap = [];
    for ( var i = 0; i < 256; i++ )
    {
        var S = i / 255.0; // [0,1]
        var R = Math.max( Math.cos( ( S - 1.0 ) * Math.PI ), 0.0 );
        var G = Math.max( Math.cos( ( S - 0.5 ) * Math.PI ), 0.0 );
        var B = Math.max( Math.cos( S * Math.PI ), 0.0 );
        var color = new THREE.Color( R, G, B );
        cmap.push( [ S, '0x' + color.getHexString() ] );
	//document.write(color+"<br>");
    }

    // Draw color map
    var lut = new THREE.Lut( 'rainbow', cmap.length );
    lut.addColorMap( 'mycolormap', cmap );
    lut.changeColorMap( 'mycolormap' );
    scene.add( lut.setLegendOn( {
        'layout':'horizontal',
        'position': { 'x': 0.6, 'y': -1.1, 'z': 2 },
        'dimensions': { 'width': 0.15, 'height': 1.2 }
    } ) );

    var geometry = new THREE.Geometry();
    var material = new THREE.MeshBasicMaterial();

    var nvertices = vertices.length;
    for ( var i = 0; i < nvertices; i++ )
    {
        var vertex = new THREE.Vector3().fromArray( vertices[i] );
        geometry.vertices.push( vertex );
    }

    var nfaces = faces.length;
    for ( var i = 0; i < nfaces; i++ )
    {
        var id = faces[i];
        var face = new THREE.Face3( id[0], id[1], id[2] );
        geometry.faces.push( face );
    }

    // Assign colors for each vertex
    material.vertexColors = THREE.VertexColors;
    for ( var i = 0; i < nfaces; i++ )
    {
        var id = faces[i];

	var S0 = Math.round(scalars[ id[0] ]*255/0.7-255/0.7*0.1);
	var S1 = scalars[ id[1] ]*255/0.7-255/0.7*0.1;
	var S10 = Math.floor(scalars[ id[1] ]*255/0.7-255/0.7*0.1);
	var S11 = Math.ceil(scalars[ id[1] ]*255/0.7-255/0.7*0.1);
	var S2 = Math.round(scalars[ id[2] ]*255/0.7-255/0.7*0.1);
	var a1 = (S1-S10)/(S11-S10);
	var C0 = new THREE.Color().setHex( cmap[ S0 ][1] );
	var c10 = cmap[S10][1];
	var c11 = cmap[S11][1];

	var R1 = [];
	var R2 = [];
	var G1 = [];
	var G2 = [];
	var B1 = [];
	var B2 = [];
	R1.push( [c10[2]+ c10[3]] );
	R2.push( [c11[2]+ c11[3]] );
	G1.push( [c10[4]+ c10[5]] );
	G2.push( [c11[4]+ c11[5]] );
	B1.push( [c10[6]+ c10[7]] );
	B2.push( [c11[6]+ c11[7]] );
	
	r=Math.round(a1*(parseInt(R2,16)-parseInt(R1,16)));
	R=parseInt(R1,16)+r
	R=("0"+R.toString(16)).slice(-2);
	g=Math.round(a1*(parseInt(G2,16)-parseInt(G1,16)));
	G=parseInt(G1,16)+g;
	G=("0"+G.toString(16)).slice(-2);
	b=Math.round(a1*(parseInt(B2,16)-parseInt(B1,16)));
	B=parseInt(B1,16)+b;
	B=("0"+B.toString(16)).slice(-2);
	var c1=[];
	c1.push("0x"+R+G+B);
	var C1 = new THREE.Color().setHex( c1 );
	var C2 = new THREE.Color().setHex( cmap[ S2 ][1] );
        geometry.faces[i].vertexColors.push( C0 );
        geometry.faces[i].vertexColors.push( C1 );
        geometry.faces[i].vertexColors.push( C2 );
    }

    var triangle = new THREE.Mesh( geometry, material );
    scene.add( triangle );
    
    loop();

    function loop()
    {
        requestAnimationFrame( loop );
        renderer.render( scene, camera );
    }
}

function main2()
{
    var width = 500;
    var height = 500;

    var scene = new THREE.Scene();

    var fov = 45;
    var aspect = width / height;
    var near = 1;
    var far = 1000;
    var camera = new THREE.PerspectiveCamera( fov, aspect, near, far );
    camera.position.set( 0, 0, 5 );
    scene.add( camera );

    var light = new THREE.PointLight();
    light.position.set( 5, 5, 5 );
    scene.add( light );

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize( width, height );
    document.body.appendChild( renderer.domElement );

    var vertices = [
        [ -1,  1, 0 ], // 0
        [ -1, -1, 0 ], // 1
        [  1, -1, 0 ]  // 2
    ];

    var faces = [
        [ 0, 1, 2 ], // f0
    ];

    var scalars = [
        0.1,   // S0
        0.2, // S1
        0.8  // S2
    ];

    // Create color map
    var cmap = [];
    for ( var i = 0; i < 256; i++ )
    {
        var S = i / 255.0; // [0,1]
        var R = 1
        var G = Math.max( Math.cos( S * Math.PI ), 0.0 );
        var B = Math.max( Math.cos( S * Math.PI ), 0.0 );
        var color = new THREE.Color( R, G, B );
        cmap.push( [ S, '0x' + color.getHexString() ] );
	//document.write(color+"<br>");
    }

    // Draw color map
    var lut = new THREE.Lut( 'rainbow', cmap.length );
    lut.addColorMap( 'mycolormap', cmap );
    lut.changeColorMap( 'mycolormap' );
    scene.add( lut.setLegendOn( {
        'layout':'horizontal',
        'position': { 'x': 0.6, 'y': -1.1, 'z': 2 },
        'dimensions': { 'width': 0.15, 'height': 1.2 }
    } ) );

    var geometry = new THREE.Geometry();
    var material = new THREE.MeshBasicMaterial();

    var nvertices = vertices.length;
    for ( var i = 0; i < nvertices; i++ )
    {
        var vertex = new THREE.Vector3().fromArray( vertices[i] );
        geometry.vertices.push( vertex );
    }

    var nfaces = faces.length;
    for ( var i = 0; i < nfaces; i++ )
    {
        var id = faces[i];
        var face = new THREE.Face3( id[0], id[1], id[2] );
        geometry.faces.push( face );
    }

    // Assign colors for each vertex
    material.vertexColors = THREE.VertexColors;
    for ( var i = 0; i < nfaces; i++ )
    {
        var id = faces[i];

	var S0 = Math.round(scalars[ id[0] ]*255/0.7-255/0.7*0.1);
	var S1 = scalars[ id[1] ]*255/0.7-255/0.7*0.1;
	var S10 = Math.floor(scalars[ id[1] ]*255/0.7-255/0.7*0.1);
	var S11 = Math.ceil(scalars[ id[1] ]*255/0.7-255/0.7*0.1);
	var S2 = Math.round(scalars[ id[2] ]*255/0.7-255/0.7*0.1);
	var a1 = (S1-S10)/(S11-S10);
	var C0 = new THREE.Color().setHex( cmap[ S0 ][1] );
	var c10 = cmap[S10][1];
	var c11 = cmap[S11][1];

	var R1 = [];
	var R2 = [];
	var G1 = [];
	var G2 = [];
	var B1 = [];
	var B2 = [];
	R1.push( [c10[2]+ c10[3]] );
	R2.push( [c11[2]+ c11[3]] );
	G1.push( [c10[4]+ c10[5]] );
	G2.push( [c11[4]+ c11[5]] );
	B1.push( [c10[6]+ c10[7]] );
	B2.push( [c11[6]+ c11[7]] );
	
	r=Math.round(a1*(parseInt(R2,16)-parseInt(R1,16)));
	R=parseInt(R1,16)+r
	R=("0"+R.toString(16)).slice(-2);
	g=Math.round(a1*(parseInt(G2,16)-parseInt(G1,16)));
	G=parseInt(G1,16)+g;
	G=("0"+G.toString(16)).slice(-2);
	b=Math.round(a1*(parseInt(B2,16)-parseInt(B1,16)));
	B=parseInt(B1,16)+b;
	B=("0"+B.toString(16)).slice(-2);
	var c1=[];
	c1.push("0x"+R+G+B);
	var C1 = new THREE.Color().setHex( c1 );
	var C2 = new THREE.Color().setHex( cmap[ S2 ][1] );
        geometry.faces[i].vertexColors.push( C0 );
        geometry.faces[i].vertexColors.push( C1 );
        geometry.faces[i].vertexColors.push( C2 );
    }

    var triangle = new THREE.Mesh( geometry, material );
    scene.add( triangle );
    
    loop();

    function loop()
    {
        requestAnimationFrame( loop );
        renderer.render( scene, camera );
    }
}

function main3()
{
    var width = 500;
    var height = 500;

    var scene = new THREE.Scene();

    var fov = 45;
    var aspect = width / height;
    var near = 1;
    var far = 1000;
    var camera = new THREE.PerspectiveCamera( fov, aspect, near, far );
    camera.position.set( 0, 0, 5 );
    scene.add( camera );

    var light = new THREE.PointLight();
    light.position.set( 5, 5, 5 );
    scene.add( light );

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize( width, height );
    document.body.appendChild( renderer.domElement );

    var vertices = [
        [ -1,  1, 0 ], // 0
        [ -1, -1, 0 ], // 1
        [  1, -1, 0 ],  // 2
	[  1,  1, 0 ]
    ];

    var faces = [
        [ 0, 1, 2 ], // f0
	[ 2, 3, 0 ]
    ];

    var scalars = [
        0.1,   // S0
        0.2, // S1
        0.8, // S2
	0.5
    ];

    // Create color map
    var cmap = [];
    for ( var i = 0; i < 256; i++ )
    {
        var S = i / 255.0; // [0,1]
        var R = Math.max( Math.cos( ( S - 1.0 ) * Math.PI ), 0.0 );
        var G = Math.max( Math.cos( ( S - 0.5 ) * Math.PI ), 0.0 );
        var B = Math.max( Math.cos( S * Math.PI ), 0.0 );
        var color = new THREE.Color( R, G, B );
        cmap.push( [ S, '0x' + color.getHexString() ] );
	//document.write(color+"<br>");
    }

    // Draw color map
    var lut = new THREE.Lut( 'rainbow', cmap.length );
    lut.addColorMap( 'mycolormap', cmap );
    lut.changeColorMap( 'mycolormap' );
    scene.add( lut.setLegendOn( {
        'layout':'horizontal',
        'position': { 'x': 0.6, 'y': -1.1, 'z': 2 },
        'dimensions': { 'width': 0.15, 'height': 1.2 }
    } ) );

    var geometry = new THREE.Geometry();
    var material = new THREE.MeshBasicMaterial();

    var nvertices = vertices.length;
    for ( var i = 0; i < nvertices; i++ )
    {
        var vertex = new THREE.Vector3().fromArray( vertices[i] );
        geometry.vertices.push( vertex );
    }

    var nfaces = faces.length;
    for ( var i = 0; i < nfaces; i++ )
    {
        var id = faces[i];
        var face = new THREE.Face3( id[0], id[1], id[2] );
        geometry.faces.push( face );
    }

    // Assign colors for each vertex
    material.vertexColors = THREE.VertexColors;
    for ( var i = 0; i < nfaces; i++ )
    {
        var id = faces[i];

	var S0 = Math.round(scalars[ id[0] ]*255/0.7-255/0.7*0.1);
	var S1 = scalars[ id[1] ]*255/0.7-255/0.7*0.1;
	var S10 = Math.floor(scalars[ id[1] ]*255/0.7-255/0.7*0.1);
	var S11 = Math.ceil(scalars[ id[1] ]*255/0.7-255/0.7*0.1);
	var S2 = Math.round(scalars[ id[2] ]*255/0.7-255/0.7*0.1);
	var a1 = (S1-S10)/(S11-S10);
	var C0 = new THREE.Color().setHex( cmap[ S0 ][1] );
	var c10 = cmap[S10][1];
	var c11 = cmap[S11][1];

	var R1 = [];
	var R2 = [];
	var G1 = [];
	var G2 = [];
	var B1 = [];
	var B2 = [];
	R1.push( [c10[2]+ c10[3]] );
	R2.push( [c11[2]+ c11[3]] );
	G1.push( [c10[4]+ c10[5]] );
	G2.push( [c11[4]+ c11[5]] );
	B1.push( [c10[6]+ c10[7]] );
	B2.push( [c11[6]+ c11[7]] );
	
	r=Math.round(a1*(parseInt(R2,16)-parseInt(R1,16)));
	R=parseInt(R1,16)+r
	R=("0"+R.toString(16)).slice(-2);
	g=Math.round(a1*(parseInt(G2,16)-parseInt(G1,16)));
	G=parseInt(G1,16)+g;
	G=("0"+G.toString(16)).slice(-2);
	b=Math.round(a1*(parseInt(B2,16)-parseInt(B1,16)));
	B=parseInt(B1,16)+b;
	B=("0"+B.toString(16)).slice(-2);
	var c1=[];
	c1.push("0x"+R+G+B);
	var C1 = new THREE.Color().setHex( c1 );
	var C2 = new THREE.Color().setHex( cmap[ S2 ][1] );
        geometry.faces[i].vertexColors.push( C0 );
        geometry.faces[i].vertexColors.push( C1 );
        geometry.faces[i].vertexColors.push( C2 );
    }

    var triangle = new THREE.Mesh( geometry, material );
    scene.add( triangle );
    
    loop();

    function loop()
    {
        requestAnimationFrame( loop );
        renderer.render( scene, camera );
    }
}