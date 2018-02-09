var Example = Example || {};

             Example.springbed = function() {   
                var Engine=Matter.Engine,
                Render=Matter.Render,
                World=Matter.World,
                Constraint=Matter.Constraint,
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
           Engine.run(engine);
           
           var rectA=Bodies.rectangle(333,$(window).height()-100,40,200,{
        isStatic:true,
        render:{
            fillStyle:"#f00"
        },
        collisionFilter:{
            group:-1
        }
    });
           var rectB=Bodies.rectangle(333,$(window).height()-180,400,40,{
              render:{
                  fillStyle:"#00f"
        },
        collisionFilter:{
            group:-1
        }
    });
           var rotate=Constraint.create({
           	bodyA:rectA,
           	pointA:{x:0,y:-80},
           	bodyB:rectB,
           	length:0,
            stiffness:0.9
           });
           
           
           var ground=Bodies.rectangle($(window).width()/2,$(window).height()-10,$(window).width(),20,{
           	    isStatic:true,
             	render:{
           		    fillStyle:"#9fa"
           	    }
           });
           var stack_rect=Composites.stack(300,100,4,3,0,0,function(x,y){
           	   return Bodies.rectangle(x,y,150,40);
           });
           var stack_circle=Composites.stack(1200,100,1,5,2,3,function(x,y){
           	   return Bodies.circle(x,y,30);
           });
           
           var wallA=Bodies.rectangle(630,730,50,400,{isStatic:true});
    var wallB=Bodies.rectangle(1580,730,50,400,{isStatic:true});
           
           var chains=Composites.stack(666,600,10,1,9,0,function (x, y) {
        return Bodies.rectangle(x,y,80,30,{
            chamfer:15
        })
    });
           
           Composites.chain(chains,0.4,0,-0.4,0,{});
    Composites.chain(chains,0.4,0.3,-0.4,0.3,{});
    Composites.chain(chains,0.4,-0.3,-0.4,-0.3,{});

           
           var fixLeft=Constraint.create({
       bodyA:wallA,
       pointA:{x:0,y:-90},
       bodyB:chains.bodies[0],
       pointB:{x:-25,y:0}
    });
            var fixRight=Constraint.create({
           	   bodyA:chains.bodies[chains.bodies.length-1],
           	   pointA:{x:25,y:0},
           	   bodyB:wallB,
           	   pointB:{x:0,y:-90}
           });          
           
           var mouseConstraint=MouseConstraint.create(engine,{
           	   element:document.body
           });
           
           World.add(world,[rectA,rectB,ground,stack_rect,stack_circle,mouseConstraint,rotate]);
           World.add(world,[wallA,wallB,chains,fixLeft,fixRight]);


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









