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
    element: document.body,
    engine: engine,
    options: {
        width: 1000,
        height: 600,
        showAngleIndicator: false
    }
});

Render.run(render);

// create runner
var runner = Runner.create();
Runner.run(runner, engine);

percy = function(xx, yy){
        x = xx,
        y = yy,
        skull = Bodies.circle(x, y, 30),
        teeth = Bodies.rectangle(x, y-30, 40, 40, { render: skull.render });

    var percy = Body.create({
        parts: [skull, teeth]
    });

return percy;
};

drill = function(xx, yy){
    x = xx,
    y = yy,
    newdrill = Bodies.polygon(x,y,3,50);

return newdrill;
}

Composite.add(world, [
    Bodies.rectangle(600, 600, 600, 50, { isStatic: true }),    //floor
    Bodies.rectangle(0, 600, 300, 50, {isStatic: true }),
    Bodies.rectangle(-100, 500, 50, 300, {isStatic: true }),
    Bodies.rectangle(125, 500, 50, 300, {isStatic: true }),
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
    newpercy = percy(0,0);
    newdrill = drill(0,0);
    const blocks = [newpercy, newdrill];
    choose = Math.floor(Math.random() * 2);
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
            width: 1000,
            height: 600,
            showAngleIndicator: false
        }
    });
    Render.run(render)
    Runner.run(runner, engine);
    Composite.add(world, [
        Bodies.rectangle(600, 600, 600, 50, { isStatic: true }),    //floor
        Bodies.rectangle(0, 600, 300, 50, {isStatic: true }),
        Bodies.rectangle(-100, 500, 50, 300, {isStatic: true }),
        Bodies.rectangle(125, 500, 50, 300, {isStatic: true }),
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
