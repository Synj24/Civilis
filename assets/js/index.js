// colours
var background  = '#e5e5e5'
var grey        = '#ccc'
var lightGrey   = '#dedede'
var red         = '#f76a6a'
var black       = '#8c8c8c'
var yellow      = '#f2c94c'
var blue        = '#bcdfeb'

const canvas    = document.getElementById('canvas')
var ctx         = canvas.getContext('2d')
var canvasSize  = 96
var sqaureWidth = 4
var borderWidth = 16
var selectedColour

var canvasActualWidth = 390
var canvasActualHeight = 585
var scale = 4

var topOfset = canvasActualHeight/scale-canvasActualWidth/scale //48.75

// make the canvas bigger to simplify things
ctx.scale(scale,scale)

function drawUnit(x,y) {

  // draw center square
  ctx.fillStyle = grey
  ctx.fillRect(
    x*borderWidth-borderWidth/2-sqaureWidth/2+1,
    y*borderWidth-borderWidth/2-sqaureWidth/2+1+topOfset,
    sqaureWidth,
    sqaureWidth)

  // draw highlight to show depth
  ctx.fillStyle = lightGrey
  ctx.fillRect(
    x*borderWidth-borderWidth/2-sqaureWidth/2+1,
    y*borderWidth-borderWidth/2-sqaureWidth/2+1+topOfset,
    sqaureWidth,
    sqaureWidth/4)

  // draw border
  ctx.strokeStyle = lightGrey
  ctx.strokeRect(
    x*borderWidth-borderWidth/2-borderWidth/2+1,
    y*borderWidth-borderWidth/2-borderWidth/2+1+topOfset,
    borderWidth,
    borderWidth)

}

function drawGrid(gridWidth, gridHeight) {
  for (y=1; y<=gridHeight; y++) {
    for (x=1; x<=gridWidth; x++) {
      drawUnit(x,y)
    } // draw across
  } //draw down
}



function changeColour(c) {
  switch(c) {
    case red:
    case 1:
      selectedColour = red
      break
    case black:
    case 2:
      selectedColour = black
      break
    case yellow:
    case 3:
      selectedColour = yellow
      break
    case blue:
    case 4:
      selectedColour = blue
      break
  }
}

document.getElementById("red").addEventListener("click",
  function(){
    changeColour(red)
  })
document.getElementById("black").addEventListener("click",
  function(){
    changeColour(black)
  })
document.getElementById("yellow").addEventListener("click",
  function(){
    changeColour(yellow)
  })
document.getElementById("blue").addEventListener("click",
  function(){
    changeColour(blue)
  })

function drawTower(x,y,height) {
  // draw bottom
  ctx.fillStyle = grey
  ctx.fillRect(
    x*borderWidth-borderWidth/2-sqaureWidth/2+1,
    y*borderWidth-borderWidth/2-sqaureWidth/2+1-height*3+topOfset,
    sqaureWidth,
    sqaureWidth+height*3)
  // draw top
  ctx.fillStyle = selectedColour
  ctx.fillRect(
    x*borderWidth-borderWidth/2-sqaureWidth/2+1,
    y*borderWidth-borderWidth/2-sqaureWidth/2+1-height*3+topOfset,
    sqaureWidth,
    sqaureWidth)
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max))+1
}

drawGrid(6,6)
//game loop
window.main = function () {
  window.requestAnimationFrame( main )
  // change color
  changeColour(getRandomInt(4))
  // draw the grid
  for (var i = 1; i <= 6; i++) {
    drawTower(getRandomInt(6),i,getRandomInt(18))
  }
};

main(); //Start the cycle.
// drawTower(2,2)
