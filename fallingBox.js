var Example = Example || {};

Example.fallingBox = function() {
    var Engine=Matter.Engine,
                Render=Matter.Render,
                World=Matter.World,
                Bodies=Matter.Bodies;
            var engine=Engine.create(),
                world=engine.world;
            var render=Render.create({
                 engine:engine,
                 element:document.body
           });
            Render.run(render);
           Engine.run(engine);
           var boxA=Bodies.rectangle(500,170,60,260);
               
           var ground=Bodies.rectangle(400,600,600,100,{isStatic:true});
          World.add(world,[boxA,ground]);
    
    
    

    // keep the mouse in sync with rendering
    render.mouse = mouse;

    // fit the render viewport to the scene
    Render.lookAt(render, {
        min: { x: 0, y: 0 },
        max: { x: 800, y: 600 }
    });

    // context for MatterTools.Demo
    return {
        engine: engine,
        runner: runner,
        render: render,
        canvas: render.canvas,
        stop: function() {
            Matter.Render.stop(render);
            Matter.Runner.stop(runner);
        }
    };
};
