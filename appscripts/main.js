define(

["../jslibs/raphael.lonce"],

function () {
    
    // including sounds
    var ting = new Audio("resources/ting.wav")
    function enableTing() { 
        ting.autoplay = true;
        ting.load();
    }

    var jingle = new Audio("resources/jingle.wav")
    function enableJingle() { 
        jingle.autoplay = true;
        jingle.load();
    }

    // sound plays when the page is loaded
    enableJingle();
    
    // first canvas for SHAPES BOARD
    var svgdiv = document.getElementById("svgcanvas");
    var paper = new Raphael(svgdiv);

    // second canvas for DRAWING BOARD
    var svgdiv2 = document.getElementById("svgcanvas2");
    var paper2 = new Raphael(svgdiv2);

    // defining the dimensions for the canvases
    var dimX = paper.canvas.offsetWidth;
    var dimY = paper.canvas.offsetHeight;
        console.log("Width is " + dimX + ", and Height is " + dimY); //print onto the console the dimensions of the canvas


    // ---------- SHAPES BOARD VARIABLES -----------
    
    // creating a rectangle where rectangle where shapes will be created on
    var pRect = paper.rect(0,0, dimX, dimY, 10); 
        pRect.attr({
            "fill": "white",
            "fill-opacity": 0,
            "stroke": "white"
        });

    // setting the clear button to clear SHAPES BOARD
    var clear2 = document.getElementById("clearButton2");
    clear2.addEventListener('click',function(ev){
        paper.clear();
        // inserts the rectangle again
        paper.put(pRect);
    }); 

    // set a variable to change size of shapes
    var size = document.getElementById("size");
    var shapeSize = 100*size.value;
        size.addEventListener('input', function(){
            shapeSize = 100*size.value; // slider is set to be in [0,1]
        });
       
    // linking HTML radio buttons to variables for shapes
    var button1 = document.getElementById("button1");
    var button2 = document.getElementById("button2");    
    var button3 = document.getElementById("button3");
    var button4 = document.getElementById("button4");

    // linking HTML checkbox to variable for line
    var line = document.getElementById("line");

    // creating function to draw path
    var draw = {
        // setting the start of line drawn at (0,0)
        'oldX' : "0",  
        'oldY' : "0",

        // draws a path while remember 
        'drawline': function(newx, newy) { // defining a function as a property
            // writing string for a path
            var connectShapes = paper.path("M " + draw.oldX + "," + draw.oldY + " L " + newx + "," + newy);
            connectShapes.attr("stroke-width", 5);
            console.log("Drawing a path " + connectShapes);
            paper.path(connectShapes);

            // updates values of oldX and oldY to start drawing from new values
            draw.oldX = newx;
            draw.oldY = newy;
        }
     }

    
    // ---------- DRAWING BOARD VARIABLES -----------
    
    // creating a rectangle where rectangle where drawing will be created on
    var bgRect2 = paper2.rect(0,0, dimX, dimY);
        bgRect2.attr({
            "fill": "white",
            "stroke": "white"});       

    // sets the clear button to clear DRAWING BOARD
    var clear = document.getElementById("clearButton");
        clear.addEventListener('click',function(ev){
        paper2.clear();
        // inserts the rectangle again
        paper2.put(bgRect2);
    }); 

    // creating variable to remember the mouse state between function callbacks later
    var mousePushed = false;   

    // ---------- HSL VARIABLES to set colour -----------

    // linking 3 sliders to HSL variables
    var hue = document.getElementById("Hue");
    var saturation = document.getElementById("Saturation");
    var lightness = document.getElementById("Lightness");

    var map = function(v,a,b,m,n) { // mapping the function which takes variable x in the range [a,b] 
        return Math.floor(m+(n-m)*(v-a)/(b-a)); // function returns a value mapped into the range [m,n]
    }; 
    
    var makeColorString = function(ih, is, il){ // hsl (hue, saturation, lightness) color string
        // defining hue, saturation and lightness in the colorstring
        var colorString = "hsl(" + ih + "," + is + "%, " + il + "%)"; 
        return colorString;
    }


    // ----------- SHAPES BOARD MOUSE EVENT LISTENERS ---------------
    
    // listening for a click on pRect
    pRect.addEventListener('click', function(ev){ 

        v = Math.random(); // setting a random number for v to be put into HSL
        colorH = map(v,0,1,1,360);
        colorS = map(v,0,1,1,100);
        colorL = map(v,0,1,1,100);


        // plays a sound when a 'click' happens
        enableTing();

        // setting 'if' statements for different radio buttons pressed
        
        if (button1.checked){
            console.log("radio1 selected");
            // a circle is created
            var circle = paper.circle(ev.offsetX, ev.offsetY, shapeSize);
            circle.attr({
                "fill": makeColorString(colorH,colorS,colorL), 
                "fill-opacity": 0.5,
                "stroke-width" : 5
            })
            console.log("The colour is " + colorH + ", " + colorS + "%, " + colorL + "%");

            // draws a line if checkbox is ticked
            if (line.checked){
                draw.drawline(ev.offsetX, ev.offsetY);
            }

           // iosocket.send({"data" : circle, "mtype" : "shape", "color": colorString});

        }

        else if (button2.checked){
            console.log("radio2 selected");
            // a square is created
            var square = paper.rect(ev.offsetX, ev.offsetY, shapeSize*2, shapeSize*2);
            square.attr({
                "fill": makeColorString(colorH,colorS,colorL), // setting the colour of the shape
                "fill-opacity": 0.5,
                "stroke-width" : 5
            })
            console.log("The colour is " + colorH + ", " + colorS + "%, " + colorL + "%"); 

            // draws a line if checkbox is ticked
            if (line.checked){
                draw.drawline(ev.offsetX, ev.offsetY);
            }
        }

        else if (button3.checked){
            console.log("radio3 selected");
            // a rectangle is created
            var rect = paper.rect(ev.offsetX, ev.offsetY, (shapeSize+15)*2, shapeSize*2);
            rect.attr({
                "fill": makeColorString(colorH,colorS,colorL), // setting the colour of the shape
                "fill-opacity": 0.5,
                "stroke-width" : 5
            })
            console.log("The colour is " + colorH + ", " + colorS + "%, " + colorL + "%"); 

            // draws a line if checkbox is ticked
            if (line.checked){
                draw.drawline(ev.offsetX, ev.offsetY);
            }
        }

        else if (button4.checked){
            console.log("radio4 selected");
            // an oval is created
            var ellipse = paper.ellipse(ev.offsetX, ev.offsetY, shapeSize+15, shapeSize);
            ellipse.attr({
                "fill": makeColorString(colorH,colorS,colorL), // setting the colour of the shape
                "fill-opacity": 0.5,
                "stroke-width" : 5
            })
            console.log("The colour is " + colorH + ", " + colorS + "%, " + colorL + "%");

            // draws a line if checkbox is ticked
            if (line.checked){
                draw.drawline(ev.offsetX, ev.offsetY);
            }
        }

                
        });

    // ----------- DRAWING BOARD MOUSE EVENT LISTENERS ---------------
    
    // listens for a mousedown event on svgdiv2
    svgdiv2.addEventListener('mousedown', function(ev){
            
            mousePushed = true; 
            console.log("Mouse is clicked on drawing board");
            
            // finds current x and y position
            var s = ev.offsetX;         
            var t = ev.offsetY;

            pathString = "M " + s + ", " + t + " ";
            raphaelPath = paper2.path(pathString);
            raphaelPath.attr({
                    'stroke-linecap': 'round',
                    'stroke-linejoin': 'round',
            });

            // setting colour of path to HSL values
            colorString = "hsl(" + hue.value + "," + saturation.value + "," + lightness.value + ")";
            raphaelPath.attr({
                "stroke": colorString,
                "stroke-width": "4px"
            });
        });
    
    // listens for a mouseup event on svgdiv2
    svgdiv2.addEventListener('mouseup', function(ev){

            mousePushed = false;  
            console.log("Mouse is off on drawing board");
            });

    // listens for a mousemove event on svgdiv2
    svgdiv2.addEventListener('mousemove', function(ev){
        
        // finds current x and y position
        var s = ev.offsetX;         
        var t = ev.offsetY;

        // drawing a path using Raphael is mousePushed is true
        if (mousePushed === true){
            pathString += "L " + s + "," + t + " ";  
            raphaelPath.attr({'path': pathString});
    
    }

    });
            

});

 

