let ImgURL;
let snapshotRequested = false;

document.getElementById('requestSnapshotButton').addEventListener('click', () => {
  snapshotRequested = true;
});

const createScene = async function() {
  const scene = new BABYLON.Scene(engine);

  const camera = new BABYLON.ArcRotateCamera("camera",Math.PI/2, Math.PI/2, 200, new BABYLON.Vector3(0, 100, 0));
  camera.attachControl(canvas, true);
  // camera.useAutoRotationBehavior = true;
  // camera.autoRotationBehavior.idleRotationSpeed=1;

  const lightx = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(2, 0, 0));
  const lighty = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 2, 0));
  const lightz = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 0, 2));

  let head = await BABYLON.SceneLoader.ImportMeshAsync("", "./assets/", "Male.obj", scene);
  console.log(head);
  const head_mat = new BABYLON.StandardMaterial("head_mat");
  // head_mat.diffuseColor=new BABYLON.Color3(.5,.5,.5);
  head_mat.diffuseTexture= new BABYLON.Texture("./assets/TM-4096-Male.png",scene);
  head_mat.specularColor=new BABYLON.Color3(0.2,.2,.2);
  head = scene.getMeshByName("Male");
  console.log(head);
  head.material=head_mat;
  
  return scene;
  }
const canvas = document.getElementById("renderCanvas"); // Get the canvas element
canvas.width=window.innerWidth-20;
canvas.height=window.innerHeight-20;
const engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine

createScene().then((scene)=>{

  // Register a render loop to repeatedly render the scene
  engine.runRenderLoop(function () {
    scene.render();
    if (snapshotRequested) {
      snapshotRequested = false;
      var canvas= document.getElementById('renderCanvas')
      ImgURL = canvas.toDataURL();
      // console.log(ImgURL);
      canvas.remove();
      document.getElementById('requestSnapshotButton').remove();
      startKonva();
    }
  });

  // Watch for browser/canvas resize events
  window.addEventListener("resize", function () {
    engine.resize();
  });
});

function startKonva(){
  insertHTML();

  var width = (window.innerWidth/4)*3;
  var height = window.innerHeight;

  var check_draw = false;
  function not_draw() {
  check_draw = false;
  stage.off("mousedown touchstart");
  stage.off("mouseup touchend");
  stage.off("mousemove touchmove");
  }

  var colour = "black";
  var reshape = new Konva.Transformer();
  var shapes = [];

  var stage = new Konva.Stage({
    container: "container",
    width: width,
    height: height
  });

  var layer = new Konva.Layer();
  stage.add(layer);

  //*******************DRAWING*************************//

  document.getElementById("Circle").addEventListener(
    "click",
    function () {
      not_draw();
      var circle = new Konva.Circle({
        x: 400,
        y: 150,
        radius: 70,
        stroke: colour,
        strokeWidth: 5,
        type: "Circle",
        draggable: true,
        strokeScaleEnabled: false
        // fill, 
      });
      layer.add(circle);
      shapes.push(circle);
      makeList();
      circle.addEventListener("click", function () {
        layer.add(reshape);
        reshape.nodes([circle]);
      });
      circle.addEventListener("dblclick", function () {
        reshape.detach();
      });
      console.log('circle',shapes);
    },
    false
  );

  document.getElementById("Rectangle").addEventListener(
    "click",
    function () {
      not_draw();

      var rect = new Konva.Rect({
        x: 400,
        y: 150,
        width: 125,
        height: 75,
        stroke: colour,
        type: "Rectangle",
        strokeWidth: 5,
        draggable: true,
        strokeScaleEnabled: false
        //fill
      });
      layer.add(rect);
      shapes.push(rect);
      makeList();
      rect.addEventListener("click", function () {
        layer.add(reshape);
        reshape.nodes([rect]);
      });
      rect.addEventListener("dblclick", function () {
        reshape.detach();
      });
      console.log('rectangle',shapes);
    },
    false
  );

  document.getElementById("Triangle").addEventListener(
    "click",
    function () {
      not_draw();

      var triangle = new Konva.RegularPolygon({
        x: 400,
        y: 150,
        sides: 3,
        radius: 50,
        type: "Triangle",
        draggable: "true",
        stroke: colour,
        strokeWidth: 5,
        strokeScaleEnabled: false
      });
      layer.add(triangle);
      shapes.push(triangle);
      makeList();
      triangle.addEventListener("click", function () {
        layer.add(reshape);
        reshape.nodes([triangle]);
      });
      triangle.addEventListener("dblclick", function () {
        reshape.detach();
      });
      console.log('triangle',shapes);
    },
    false
  );

  document.getElementById("Arrow").addEventListener(
    "click",
    function () {
      not_draw();

      var arrow = new Konva.Arrow({
        x: 400,
        y: 150,
        points: [0, 0, 100, 100],
        pointerLength: 10,
        pointerWidth: 10,
        fill: colour,
        stroke: colour,
        type: "Arrow",
        draggable: "true",
        strokeWidth: 5,
        strokeScaleEnabled: false,
        hitStrokeWidth: 50
      });
      layer.add(arrow);
      shapes.push(arrow);
      makeList();
      arrow.addEventListener("click", function () {
        layer.add(reshape);
        reshape.nodes([arrow]);
      });
      arrow.addEventListener("dblclick", function () {
        reshape.detach();
      });
      console.log('arrow',shapes);
    },
    false
  );

  document.getElementById("Tick").addEventListener(
    "click",
    function () {
      not_draw();

      var tick = new Konva.Shape({
        x: 300,
        y: 100,
        type: "Tick",
        draggable: true,
        strokeScaleEnabled: false,
        sceneFunc: function (context, shape) {
          context.beginPath();
          context.moveTo(15, 75);
          context.lineTo(30, 90);
          context.lineTo(60, 60);
          context.fillStrokeShape(shape);
        },
        hitFunc: function (context, shape) {
          context.beginPath();
          context.rect(15, 60, 45, 30);
          context.fillStrokeShape(shape);
        },
        stroke: colour,
        strokeWidth: 5
      });
      tick.getSelfRect = function () {
        return {
          x: 15,
          y: 60,
          width: 45,
          height: 30
        };
      };
      layer.add(tick);
      shapes.push(tick);
      makeList();
      tick.addEventListener("click", function () {
        layer.add(reshape);
        reshape.nodes([tick]);
      });
      tick.addEventListener("dblclick", function () {
        reshape.detach();
      });
      console.log('tick',shapes);
    },
    false
  );

  document.getElementById("Draw").addEventListener(
    "click",
    function () {
      if (!check_draw) {
        check_draw = true;
        var isPaint = false;
        var Draw;
        stage.on("mousedown touchstart", function (e) {
          isPaint = true;
          var pos = stage.getPointerPosition();
          Draw = new Konva.Line({
            stroke: colour,
            strokeWidth: 5,
            type: "Draw",
            points: [pos.x, pos.y]
          });
          shapes.push(Draw);
          layer.add(Draw);
          makeList();
        });

        stage.on("mouseup touchend", function () {
          isPaint = false;
        });

        stage.on("mousemove touchmove", function () {
          if (!isPaint) {
            return;
          }
          const pos = stage.getPointerPosition();
          var newPoints = Draw.points().concat([pos.x, pos.y]);
          Draw.points(newPoints);
        });
      } else {
        not_draw();
      }
      console.log('draw',shapes);
    },
    false
  );

  document.getElementById("Text").addEventListener("click", function () {
    not_draw();

    var text = new Konva.Text({
      text: "Some text here",
      x: 450,
      y: 150,
      fontSize: 20,
      type: "Text",
      draggable: true,
      fill: colour
    });
    layer.add(text);
    shapes.push(text);
    makeList();
    text.addEventListener("click", function () {
      layer.add(reshape);
      reshape.nodes([text]);
    });

    text.on("dblclick dbltap", () => {
      var textPosition = text.getAbsolutePosition();
      var stageBox = stage.container().getBoundingClientRect();

      var areaPosition = {
        x: stageBox.left + textPosition.x,
        y: stageBox.top + textPosition.y
      };

      var textarea = document.createElement("textarea");
      document.body.appendChild(textarea);

      textarea.value = text.text();
      textarea.style.position = "absolute";
      textarea.style.top = areaPosition.y + "px";
      textarea.style.left = areaPosition.x + "px";
      textarea.style.width = text.width();

      textarea.focus();

      textarea.addEventListener("keydown", function (e) {
        if (e.keyCode === 13) {
          text.text(textarea.value);
          document.body.removeChild(textarea);
        }
      });
      reshape.detach();
    });
    console.log('text',shapes);
  });

  //*********************CLEANING***********************//

  document.getElementById("Clean").addEventListener(
    "click",
    function () {
      not_draw();

      for (var i = 0; i < shapes.length; i++) {
        if (shapes[i]["attrs"].type !== "Image") {
          reshape.detach();
          shapes[i].destroy();
          shapes.splice(i, 1);
          i--;
        }
      }
      makeList();
      console.log('clean',shapes);
    },
    false
  );

  document.getElementById("Cleanshapes").addEventListener(
    "click",
    function () {
      not_draw();

      for (var i = 0; i < shapes.length; i++) {
        if (
          shapes[i]["attrs"].type !== "Image" &&
          shapes[i]["attrs"].type !== "Text" &&
          shapes[i]["attrs"].type !== "Draw"
        ) {
          reshape.detach();
          shapes[i].destroy();
          shapes.splice(i, 1);
          i--;
        }
      }
      makeList();
      console.log('cleanshape',shapes);
    },
    false
  );

  document.getElementById("CleanCircle").addEventListener(
    "click",
    function () {
      not_draw();

      for (var i = 0; i < shapes.length; i++) {
        if (shapes[i]["attrs"].type === "Circle") {
          reshape.detach();
          shapes[i].destroy();
          shapes.splice(i, 1);
          i--;
        }
      }
      makeList();
      console.log('cleancircle',shapes);
    },
    false
  );

  document.getElementById("CleanRectangle").addEventListener(
    "click",
    function () {
      not_draw();

      for (var i = 0; i < shapes.length; i++) {
        if (shapes[i]["attrs"].type === "Rectangle") {
          reshape.detach();
          shapes[i].destroy();
          shapes.splice(i, 1);
          i--;
        }
      }
      makeList();
      console.log('cleanrectangle',shapes);
    },
    false
  );

  document.getElementById("Undo").addEventListener("click", function () {
    not_draw();

    var i = shapes.length - 1;
    if (i >= 0) {
      if (shapes[i]["attrs"].type !== "Image") {
        reshape.detach();
        shapes[i].destroy();
        shapes.splice(i, 1);
      }
    }
    makeList();
    console.log('undo',shapes);
  });

  //*************************IMAGE****************************//
  //**************Image Upload****************//

  // var w = width,
  //   h = height;
  // var f_in = document.getElementById("file_input");
  // if (f_in) {
  //   f_in.addEventListener("change", function (e) {
  //     var URL = window.webkitURL || window.URL;
      // var url = URL.createObjectURL(e.target.files[0]);
      var url = ImgURL;
      var img = new Image();
      img.src = url;
      img.onload = function () {
        CleanBG();
        w = this.width;
        h = this.height;
        resizeStage(w, h);
        console.log("Image width: " + w);
        console.log("Image height: " + h);
        var theImg = new Konva.Image({
          image: img,
          type: "Image",
          x: 0,
          y: 0,
          width: w,
          height: h
        });
        layer.add(theImg);
        // shapes.push(theImg);
        layer.draw();
        makeList();
      };
      console.log('image',shapes);
  //   });
  // }

  function CleanBG() {
    for (var i = 0; i < shapes.length; i++) {
      reshape.detach();
      shapes[i].destroy();
      shapes.splice(i, 1);
      i--;
    }
  }

  function resizeStage(newWidth, newHeight) {
    stage.width(newWidth);
    stage.height(newHeight);
  }

  //*********************Save as Image***********************//

  function downloadURI(uri, name) {
    var link = document.createElement("a");
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    delete link;
  }

  document.getElementById("save").addEventListener(
    "click",
    function () {
      var dataURL = stage.toDataURL({
        mimeType: "image/jpeg",
        quality: 0.9, //***Quality at .9 for first compression.***
        pixelRatio: 3
      });
      console.log(
        "Size after first compression: " + dataURL.length / 1024 + "Kb"
      );
      //****Condition for second compression*****//
      if (dataURL.length < 1024 * 200) downloadURI(dataURL, "stage.jpeg");
      else {
        const blobURL = dataURL;
        const img = new Image();
        img.src = blobURL;
        img.onerror = function () {
          URL.revokeObjectURL(this.src);
          // Handle the failure properly
          console.log("Cannot load image");
        };
        img.onload = function () {
          URL.revokeObjectURL(this.src);
          const canvas = document.createElement("canvas");
          //***Increase resolution of canvas for more clarity.***//
          canvas.width = 2 * stage.width();
          canvas.height = 2 * stage.height();
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          canvas.toBlob(
            (blob) => {
              // Handle the compressed image. es. upload or save in local state
              downloadBlob(blob, "stage.jpeg");
              console.log(
                "Size after second compression: " + blob.size / 1024 + "Kb"
              );
              //Checks file size in Kb.
            },
            "image/jpeg",
            0.9 //*********Quality*********
            //The second compression decresases the quality a lot even when quality
            //kept at 1. So increased the resolution 2*2 folds. Now quality does not
            //decrease much after quality is kept at 0.9. Though it costs some more
            //in terms of file size. File size can further be reduced if canvas resolution
            //is kept low.
          );
        };
      }
      console.log('save',shapes);
    },
    false
  );

  function downloadBlob(blob, name = "stage.jpeg") {
    // For other browsers:
    // Create a link pointing to the ObjectURL containing the blob.
    const data = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = data;
    link.download = name;

    // this is necessary as link.click() does not work on the latest firefox
    link.dispatchEvent(
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
        view: window
      })
    );
  }

  //---------------------Adding List Functionality-----------------------------


  function makeList(){
    var ul = document.getElementById("myList");
    ul.innerHTML = '<div>Shapes:</div>';
    for(var i = 0; i < shapes.length; i++)
    {
      if(shapes!=='theImg'){
        var li = document.createElement("li");
        const t = document.createTextNode(""+shapes[i]["attrs"].type);
        li.appendChild(t);
        document.getElementById("myList").appendChild(li);

        var span = document.createElement("SPAN");
        span.className = "close";
        li.appendChild(span);
      }
    }
  }



}

function insertHTML(){
  var knva=document.getElementById('knva');
  knva.innerHTML=
  `
  <div id="buttons">
    <button id="Circle" type="button" class="btn btn-primary">Circle</button>
    <button id="Rectangle" type="button" class="btn btn-primary">Rectangle</button>
    <button id="Triangle" type="button" class="btn btn-primary">Triangle</button>
    <button id="Arrow" type="button" class="btn btn-primary">Arrow</button>
    <button id="Tick" type="button" class="btn btn-primary">Tick</button>
    <button id="Draw" type="button" class="btn btn-primary">Draw</button>
    <button id="Text" type="button" class="btn btn-primary">Text</button>
    <button id='Undo' type="button" class="btn btn-primary">Undo</button>
    <button id='Clean' type="button" class="btn btn-primary">Clean</button>
    <button id='Cleanshapes' type="button" class="btn btn-primary">Clean shapes</button>
    <button id='CleanCircle' type="button" class="btn btn-primary">Clean Circle</button>
    <button id='CleanRectangle' type="button" class="btn btn-primary">Clean Rectangle</button>
    <button id="save" type="button" class="btn btn-success">Download</button>
    <div id="container"> </div>
    <div id="list">
      <ul id="myList">
        <li>Empty</li>
      </ul>
    </div>
    
   
  </div>
  `;
}