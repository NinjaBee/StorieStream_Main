let straight_segment_bt = document.getElementById('straight_segment_bt');
let upperLeft_segment_bt = document.getElementById('upperLeft_segment_bt');
let upperRight_segment_bt = document.getElementById('upperRight_segment_bt');
let lowerLeft_segment_bt = document.getElementById('lowerLeft_segment_bt');
let lowerRight_segment_bt = document.getElementById('lowerRight_segment_bt');
let sin_segment_bt = document.getElementById('sin_segment_bt');
let go_bt = document.getElementById('go_bt');


function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

let segments = [];
//let text = { text };


//// Adding event listeners to buttons to add segment chunks to the segments array. ////

/* Segment buttons. Currently these do not trigger images. Incrementing needs to happen instead of rand. num */
straight_segment_bt.addEventListener("click", function(){
    let straight_segment = new StraightSegment(Math.PI/4, 100);
    let number = getRandomInt(1, 1000).toString();
    segments.push(straight_segment + number);
    console.log(segments);
});

upperLeft_segment_bt.addEventListener("click", function(){
    let upperLeft_segment = new CurvedSegment(400, CurvedSegment.UpperLeft);
    let number = getRandomInt(1, 1000).toString();
    segments.push(upperLeft_segment + number);
    console.log(segments);
});

upperRight_segment_bt.addEventListener("click", function(){
    let upperRight_segment = new CurvedSegment(400, CurvedSegment.UpperRight);
    let number = getRandomInt(1, 1000).toString();
    segments.push(upperRight_segment + number);
    console.log(segments);
});

lowerLeft_segment_bt.addEventListener("click", function(){
    let lowerLeft_segment = new CurvedSegment(400, CurvedSegment.LowerLeft);
    let number = getRandomInt(1, 1000).toString();
    segments.push(lowerLeft_segment + number);
    console.log(segments);
});

lowerRight_segment_bt.addEventListener("click", function(){
    let lowerRight_segment = new CurvedSegment(400, CurvedSegment.LowerRight);
    let number = getRandomInt(1, 1000).toString();
    segments.push(lowerRight_segment + number);
    console.log(segments);
});

sin_segment_bt.addEventListener("click", function(){
    let sin_segment = new SinSegment();
    let number = getRandomInt(1, 1000).toString();
    segments.push(sin_segment + number);
    console.log(segments);
});


///// Set Width, Line-height, container, and new text path //////

let width = 30; // our width we use when making lines, etc. Can connect to slider.
let line_height = 30;
let container = document.querySelector('#container'); // This is the div we automatically populate that you can see in the html. We create more than one of these.
let text = `{{text}}`;

/* Go button pushes all the segments to the text path. */
go_bt.addEventListener("click", function(){
    let text_path = new TextPath(text, container, segments);
    console.log(text_path);
    console.log(text);
    console.log(container);
    console.log(segments);
});

///// I WANT TO EITHER REDIRECT TO A NEW PAGE WHEN GO IS PUSHED OR APPLY THE TEXT PATH TO THE
////  CONTENTS OF THE CENTRAL PANEL AND BE ABLE TO SCROLL THROUGH
//// == a simple test with resizing the container makes me think redirecting to a new page is best. ==


