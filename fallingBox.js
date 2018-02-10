var Example = Example || {};

Example.fallingBox = function() {
    var Engine=Matter.Engine,
                Render=Matter.Render,
                World=Matter.World,
                Runner = Matter.Runner,
                Mouse=Matter.Mouse,
                MouseConstraint=Matter.MouseConstraint,
                Composites=Matter.Composites,
                Bodies=Matter.Bodies;
            var engine=Engine.create(),
                world=engine.world;
            var render=Render.create({
                 engine:engine,
                 element:document.body,
                 options:{
                 	width:$(window).width(),
                 	height:$(window).height(),
                 	wireframes:false
                 }
           });
            Render.run(render);
          
           
           var runner = Runner.create();
    Runner.run(runner, engine);
           
           var recA=Bodies.rectangle(100,20,200,40,{
           	   render:{
           		     fillStyle:"#f0c"
           	   }
           })
           var ground=Bodies.rectangle($(window).width()/2,$(window).height()-10,$(window).width(),20,{
           	    isStatic:true,
             	render:{
           		    fillStyle:"#9fa"
           	    }
           })
           var stack_rect=Composites.stack(300,100,4,3,0,0,function(x,y){
           	   return Bodies.rectangle(x,y,150,40);
           })
           var stack_circle=Composites.stack(1200,100,5,5,2,3,function(x,y){
           	   return Bodies.circle(x,y,30);
           })
           var mouseConstraint=MouseConstraint.create(engine,{});
           
           World.add(world,[recA,ground,stack_rect,stack_circle,mouseConstraint]);
    

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
