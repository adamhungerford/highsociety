var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Composites = Matter.Composites,
    MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse,
    Composite = Matter.Composite,
    Bodies = Matter.Bodies;
    Body = Matter.Body;

// create engine
var engine = Engine.create(),
    world = engine.world;

// create renderer
var render = Render.create({
    element: document.getElementById("canvas"),
    engine: engine,
    options: {
        wireframes:false,
        width: 800,
        height: 480,
        showAngleIndicator: false,
        background: "black"
    }
});

Render.run(render);

// create runner
var runner = Runner.create();
Runner.run(runner, engine);

percy = function(xx, yy){
        x = xx,
        y = yy,
        skull = Bodies.rectangle(x, y, 60, 60, {render: {fillStyle: "white"}}),
        teeth = Bodies.rectangle(x, y-30, 40, 40, { render: skull.render});
        eye1 = Bodies.rectangle(x-10, y, 8, 8, {render: {fillStyle: "black"}});
        eye2 = Bodies.rectangle(x+10, y, 8, 8, {render: {fillStyle: "black"}}); 

    var percy = Body.create({
        parts: [skull, teeth, eye1, eye2],
        friction: 1,
        density: 1,
    });

return percy;
}

drill = function(xx, yy){
    x = xx,
    y = yy,
    handle = Bodies.polygon(x,y,8,15);
    shaft = Bodies.rectangle(x,y+30,10,70, { render:{ fillStyle: "grey"}});
    bit = Bodies.polygon(x,y+65,3,5, { angle : 0.536, render:{ fillStyle: "grey"} });
    var newdrill = Body.create({
        parts: [shaft, bit, handle],
        friction: 1,
        density: 1,
    })

return newdrill;
}

burrower = function(xx, yy){
    x = xx,
    y = yy,
    tread = Bodies.rectangle(x,y,80,40, {render: {fillStyle: "grey"}});
    cap = Bodies.polygon(x,y-28,7,35, {angle: 1.571, render: {fillStyle: "#664e78"}});
    var newburrower = Body.create({
        parts: [tread, cap],
        friction: 1,
        density: 1,
    })
    return newburrower;
}

flaregun = function(xx, yy){
    x = xx,
    y = yy,
    handle = Bodies.rectangle(x,y,40,20,{
        render: {
            fillStyle: "orange",
        },
    });
    barrel = Bodies.rectangle(x+20, y+20,10,60, {
        render: {
            fillStyle: "orange",
        }
    });
    warning = Bodies.polygon(x-10, y, 3, 10,{
        angle: 3.1415,
        render: {
            fillStyle: "yellow",
        }
    });
    ex1 = Bodies.rectangle(x-8, y, 8, 2, {
        render: {
            fillStyle: "black"
        }
    });
    ex2 = Bodies.rectangle(x-14, y, 2, 2, {
        render: {
            fillStyle: "black"
        }
    });

    var newflaregun = Body.create({
        parts: [handle, barrel, warning, ex1, ex2],
        friction: 1,
        density: 1,
    })
    return newflaregun;
}

funicular = function(xx, yy){
    x = xx,
    y = yy,
    car1 = Bodies.rectangle(x,y,70,70, {render: {
        fillStyle: "#ed7272"
    }});
    car2 = Bodies.rectangle(x+350,y,70,70, { 
        render: {
            fillStyle: "#ed7272"
        }});
    connector = Bodies.rectangle(x+175,y-30,350,5, {
        render: {
            fillStyle: "grey"
        }
    });
    window1 = Bodies.rectangle(x,y-10, 60, 40, {render:{fillStyle:"#d8edf0"}});
    window2 = Bodies.rectangle(x+350, y-10, 60, 40, {render:{fillStyle:"#d8edf0"}});

    var newfunicular = Body.create({
        parts: [connector, car1, car2, window1, window2],
        friction: 1,
        density: 1,
    })

    return newfunicular;
}

box = function(){
    floor = Bodies.rectangle(62.5, 362.5, 215, 25, {render: {fillStyle: "white"}});
    wall1 = Bodies.rectangle(-50, 250, 25, 250, {render: floor.render});
    wall2 = Bodies.rectangle(175, 250, 25, 250, {render: wall1.render});

    var newbox = Body.create({
        parts: [wall1, wall2, floor],
        friction: 1,
        isStatic: true,
    })
    return newbox;
}

box = box();

Composite.add(world, [
    Bodies.rectangle(550, 550, 600, 25, { isStatic: true, friction:1, render: { fillStyle: "white"}}),    //floor
    box,
    funicular(400,200),
]);

// add mouse control
var mouse = Mouse.create(render.canvas),
    mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
            stiffness: 0.2,
            render: {
                visible: false
            }
        }
    });

Composite.add(world, mouseConstraint);

// keep the mouse in sync with rendering
render.mouse = mouse;

// fit the render viewport to the scene
Render.lookAt(render, {
    min: { x: 0, y: 0 },
    max: { x: 800, y: 600 }
});

document.getElementById("spawn").onclick = function() {
    newpercy = percy(100,0);
    newdrill = drill(100,0);
    newburrower = burrower(75,0);
    newflaregun = flaregun(75,0);
    const blocks = [newpercy, newdrill, newburrower, newflaregun];
    choose = Math.floor(Math.random() * blocks.length);
    console.log(choose);
    Composite.add(world, [blocks[choose]]);
};

document.getElementById("reset").onclick = function(){
    Composite.clear(world);
    Engine.clear(engine);
    Render.stop(render);
    Runner.stop(runner);
    render.canvas.remove();

    render = Render.create({
        element: document.body,
        engine: engine,
        options: {
            wireframes:false,
            width: 800,
            height: 480,
            showAngleIndicator: false,
        }
    });
    Render.run(render)
    Runner.run(runner, engine);
    Composite.add(world, [
        Bodies.rectangle(550, 550, 600, 25, { isStatic: true, friction:1, render: { fillStyle: "white"}}),    //floor
        box,
        funicular(400,200),
    ]);

    var mouse = Mouse.create(render.canvas),
    mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
            stiffness: 0.2,
            render: {
                visible: false
            }
        }
    });

    Composite.add(world, mouseConstraint);

    // keep the mouse in sync with rendering   
    render.mouse = mouse;

// fit the render viewport to the scene
    Render.lookAt(render, {
        min: { x: 0, y: 0 },
        max: { x: 800, y: 600 }
    });

}
