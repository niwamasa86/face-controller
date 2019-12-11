//ゲームの描画（ｐ５．ｊｓ）
let eX = 50;
let eY = 50;
var dx = 0;
var dy = 0;
let posX = 0;
let posY = 0;
let offX;
let offY;
$(function() {
  var off = $('#tenkey').offset();
  offX = off.left;
  offY = off.top;
});

function setup() {
  let game = createCanvas(window.parent.screen.width, window.parent.screen.height - 100);
  game.parent('game');
  spriteme = createSprite(eX, eY, 100, 100);
  spritewallA = createSprite(200, 0, 70, height);
  spritewallB = createSprite(400, height, 70, 800);
  spritewallC = createSprite(600, 0, 70, height + 200);
  console.log(offX);
  console.log(offY);
  //左側の壁を生成
  wallLeft = createSprite(-5, height / 2, 10, height);
  wallLeft.immovable = true;

  //右側の壁を生成
  wallRight = createSprite(width + 5, height / 2, 10, height);
  wallRight.immovable = true;

  //上川の壁を生成
  wallTop = createSprite(width / 2, -5, width, 10);
  wallTop.immovable = true;

  wallBottom = createSprite(width / 2, height + 5, width, 10);
  wallBottom.immovable = true;

}

function draw() {
  background(255);
  stroke(255);
  spriteme.shapeColor = color(100, 100, 100);
  spriteme.collide(spritewallA);
  spriteme.collide(spritewallB);
  spriteme.collide(spritewallC);
  spriteme.collide(wallLeft);
  spriteme.collide(wallTop);
  spriteme.collide(wallRight);
  spriteme.collide(wallBottom);
  posX = spriteme.position.x
  posY = spriteme.position.y
$('#movingface').css('left',posX-50+"px");
$('#movingface').css('top',posY-50+'px');
  drawSprites();
  fill(100, 0, 0);
}
// function yajirushi(nX, nY) {
//   translate(nX, nY);
//   rotate(PI / 3);
//   rect(0, 1, 5, 20, 20, 20, 20, 20);
//   translate(2.5, 0);
//   rotate(PI / 3);
//   rect(0, 0, 5, 20, 20, 20, 20, 20);
//   rotate(-PI / 3);
//   rotate(-PI / 3);
//   translate(-nX - 2.5, -nY);
// }
//
// function yajirushis(keyX, keyY) {
//   if (dx > 4) {
//     fill(255, 0, 0);
//     stroke(255, 0, 0);
//   }
//   translate(keyX, keyY);
//   yajirushi(160, 73);
//   if (dx > 1) {
//     fill(255, 0, 0);
//     stroke(255, 0, 0);
//   }
//   yajirushi(140, 73);
//   translate(-keyX, -keyY);
//   fill(255);
//   stroke(255);
//
//   if (dy > 4) {
//     fill(255, 0, 0);
//     stroke(255, 0, 0);
//   }
//   translate(keyX, keyY);
//   rotate(PI / 2);
//   yajirushi(158, -88);
//   if (dy > 1) {
//     fill(255, 0, 0);
//     stroke(255, 0, 0);
//   }
//   yajirushi(138, -86);
//
//   rotate(-PI / 2);
//   translate(-keyX, -keyY);
//   fill(255);
//   stroke(255);
//
//   if (dx < 4) {
//     fill(255, 0, 0);
//     stroke(255, 0, 0);
//   }
//   translate(keyX, keyY);
//   rotate(PI);
//   yajirushi(-25, -84);
//   if (dx < 0) {
//     fill(255, 0, 0);
//     stroke(255, 0, 0);
//   }
//   yajirushi(-5, -82);
//
//   rotate(-PI);
//   translate(-keyX, -keyY);
//   fill(255);
//   stroke(255);
//
//   if (dy < 4) {
//     fill(255, 0, 0);
//     stroke(255, 0, 0);
//   }
//   translate(keyX, keyY);
//   rotate(-PI / 2);
//   yajirushi(-23, 78);
//   if (dy < 0) {
//     fill(255, 0, 0);
//     stroke(255, 0, 0);
//   }
//   yajirushi(-3, 80);
//
//   rotate(PI / 2);
//   translate(-keyX, -keyY);
//   fill(255);
//   stroke(255);
//
//
// }

//以降内部処理
var vid = document.getElementById('videoel');
var vid_width = vid.width;
var vid_height = vid.height;
var video2 = document.getElementById('videoel');
var overlay = document.getElementById('overlay');
var movingface=document.getElementById('movingface')
var overlayCC = overlay.getContext('2d');
var context = movingface.getContext('2d');
/********** check and set up video/webcam **********/
function enablestart() {
  var startbutton = document.getElementById('startbutton');
  startbutton.value = "start";
  startbutton.disabled = null;
}

function adjustVideoProportions() {
  // resize overlay and video if proportions are different
  // keep same height, just change width
  var proportion = vid.videoWidth / vid.videoHeight;
  vid_width = Math.round(vid_height * proportion);
  vid.width = vid_width;
  overlay.width = vid_width;

}

function gumSuccess(stream) {
  // add camera stream if getUserMedia succeeded
  if ("srcObject" in vid) {
    vid.srcObject = stream;
  } else {
    vid.src = (window.URL && window.URL.createObjectURL(stream));
  }
  vid.onloadedmetadata = function() {
    adjustVideoProportions();
    vid.play();

  }
  vid.onresize = function() {
    adjustVideoProportions();
    if (trackingStarted) {
      ctrack.stop();
      ctrack.reset();
      ctrack.start(vid);

    }
  }
}

function gumFail() {
  alert("There was some problem trying to fetch video from your webcam. If you have a webcam, please make sure to accept when the browser asks for access to your webcam.");
}

navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
window.URL = window.URL || window.webkitURL || window.msURL || window.mozURL;

// check for camerasupport
if (navigator.mediaDevices) {
  navigator.mediaDevices.getUserMedia({
    video: true
  }).then(gumSuccess).catch(gumFail);
} else if (navigator.getUserMedia) {
  navigator.getUserMedia({
    video: true
  }, gumSuccess, gumFail);
} else {
  alert("This demo depends on getUserMedia, which your browser does not seem to support. :(");
}

vid.addEventListener('canplay', enablestart, false);

/*********** setup of emotion detection *************/

// set eigenvector 9 and 11 to not be regularized. This is to better detect motion of the eyebrows
pModel.shapeModel.nonRegularizedVectors.push(9);
pModel.shapeModel.nonRegularizedVectors.push(11);

var ctrack = new clm.tracker({
  useWebGL: true
});
ctrack.init(pModel);
var trackingStarted = false;

function startVideo() {
   $('#game').css('display', 'inline');
   $('#movingface').css('display', 'inline');
  // start video
  vid.play();
  // start tracking
  ctrack.start(vid);
  trackingStarted = true;
  // start loop to draw face
  drawLoop();
}
var sx=100;
var sy=100;
var sw=100;
var sh=100;
function drawLoop() {
  var positions = ctrack.getCurrentPosition();
  requestAnimFrame(drawLoop);
  overlayCC.clearRect(0, 0, vid_width, vid_height);
  //psrElement.innerHTML = "score :" + ctrack.getScore().toFixed(4);
  if (ctrack.getCurrentPosition()) {
    ctrack.draw(overlay);
    sx=positions[1][0];
    sy=positions[20][1];
    console.log(sx);
    console.log(sy);
    sw=positions[13][0]-positions[1][0];
    sh=positions[7][1]-positions[20][1];
  }

  var cp = ctrack.getCurrentParameters();
  var er = ec.meanPredict(cp);
  if (er) {
    updateData(er);
    for (var i = 0; i < er.length; i++) {
      console.log(er[i].emotion + ":" + er[i].value);
      peX = eX;
      peY = eY;
      if (er[i].value > 0.2) {
        document.getElementById('icon' + (i + 1)).style.visibility = 'visible';
        if (i == 0) {
          dx = -8 * er[i].value;
          dy = 0;
          spriteme.setSpeed(8 * er[i].value, 180)
        } else if (i == 1) {
          dx = 8 * er[i].value;
          dy = 0;
          spriteme.setSpeed(8 * er[i].value, 0)
        } else if (i == 2) {
          dx = 0;
          dy = -8 * er[i].value;
          spriteme.setSpeed(8 * er[i].value, 270)
        } else if (i == 3) {
          dx = 0;
          dy = +8 * er[i].value;

          spriteme.setSpeed(8 * er[i].value, 90)
        }
      } else {
        document.getElementById('icon' + (i + 1)).style.visibility = 'hidden';
      }
    }
  }
}
video2.addEventListener('canplaythrough', function(){
    // 33ミリ秒毎にcanvasに動画をコピーする
    setInterval(function(){
        context.drawImage(video2, sx*3,sy*3, sw*5,sh*6,0,0,400,300);
    }, 33);
}, false);
delete emotionModel['disgusted'];
delete emotionModel['fear'];
var ec = new emotionClassifier();
ec.init(emotionModel);
var emotionData = ec.getBlank();
console.log(emotionData);

/************ d3 code for barchart *****************/

var margin = {
    top: 20,
    right: 20,
    bottom: 10,
    left: 40
  },
  width = 400 - margin.left - margin.right,
  height = 100 - margin.top - margin.bottom;

var barWidth = 30;

var formatPercent = d3.format(".0%");

var x = d3.scale.linear()
  .domain([0, ec.getEmotions().length]).range([margin.left, width + margin.left]);

var y = d3.scale.linear()
  .domain([0, 1]).range([0, height]);

var svg = d3.select("#emotion_chart").append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)

svg.selectAll("rect").
data(emotionData).
enter().
append("svg:rect").
attr("x", function(datum, index) {
  return x(index);
}).
attr("y", function(datum) {
  return height - y(datum.value);
}).
attr("height", function(datum) {
  return y(datum.value);
}).
attr("width", barWidth).
attr("fill", "#2d578b");

svg.selectAll("text.labels").
data(emotionData).
enter().
append("svg:text").
attr("x", function(datum, index) {
  return x(index) + barWidth;
}).
attr("y", function(datum) {
  return height - y(datum.value);
}).
attr("dx", -barWidth / 2).
attr("dy", "1.2em").
attr("text-anchor", "middle").
text(function(datum) {
  return datum.value;
}).
attr("fill", "white").
attr("class", "labels");

svg.selectAll("text.yAxis").
data(emotionData).
enter().append("svg:text").
attr("x", function(datum, index) {
  return x(index) + barWidth;
}).
attr("y", height).
attr("dx", -barWidth / 2).
attr("text-anchor", "middle").
attr("style", "font-size: 12").
text(function(datum) {
  return datum.emotion;
}).
attr("transform", "translate(0, 18)").
attr("class", "yAxis");

function updateData(data) {
  // update
  var rects = svg.selectAll("rect")
    .data(data)
    .attr("y", function(datum) {
      return height - y(datum.value);
    })
    .attr("height", function(datum) {
      return y(datum.value);
    });
  var texts = svg.selectAll("text.labels")
    .data(data)
    .attr("y", function(datum) {
      return height - y(datum.value);
    })
    .text(function(datum) {
      return datum.value.toFixed(1);
    });

  // enter
  rects.enter().append("svg:rect");
  texts.enter().append("svg:text");

  // exit
  rects.exit().remove();
  texts.exit().remove();
}

/******** stats ********/

stats = new Stats();
stats.domElement.style.position = 'absolute';
stats.domElement.style.top = '0px';
document.getElementById('container').appendChild(stats.domElement);

// update stats on every iteration
document.addEventListener('clmtrackrIteration', function(event) {
  stats.update();
}, false);
