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

// set radius values for curved segments
let radius = document.getElementById('radius').value;  // get radius value for curved segments
let radiusOutput = document.getElementById('radiusOutput');
radiusOutput.innerHTML = slider.value; // Display the default slider value
radius.oninput = function() {
    radius = this.value; // Change value of radius oninput
    radiusOutput.innerHTML = this.value;  // show the value in html
};

// set scale value for straight segment
let scale = document.getElementById('scale').value;
let scaleOutput = document.getElementById('scaleOutput');
scaleOutput.innerHTML = slider.value; // Display the default slider value
scale.oninput = function(){
    scale = this.value;
    scaleOutput.innerHTML = this.value;
};

//// Adding event listeners to buttons to add segment chunks to the segments array. ////

/* Segment buttons. Currently these do not trigger images. Incrementing needs to happen instead of rand. num */
straight_segment_bt.addEventListener("click", function(){
    let angle = 0;
    segments.push(new StraightSegment(angle, scale));
});

upperLeft_segment_bt.addEventListener("click", function(){
    segments.push(new CurvedSegment(radius, CurvedSegment.UpperLeft));
});

upperRight_segment_bt.addEventListener("click", function(){
    segments.push(new CurvedSegment(radius, CurvedSegment.UpperRight));
});

lowerLeft_segment_bt.addEventListener("click", function(){
    segments.push( new CurvedSegment(radius, CurvedSegment.LowerLeft));
});

lowerRight_segment_bt.addEventListener("click", function(){
    segments.push(new CurvedSegment(radius, CurvedSegment.LowerRight));
});

sin_segment_bt.addEventListener("click", function(){
    segments.push(new SinSegment());
});


///// Set Width, Line-height, container, and new text path //////

let width = 30; // our width we use when making lines, etc. Can connect to slider.
let line_height = 30;
let container = document.querySelector('#container'); // This is the div we automatically populate that you can see in the html. We create more than one of these.
let text = `{{text}}`;

/* Go button pushes all the segments to the text path. */
go_bt.addEventListener("click", function(){
    let text_path = new TextPath(text, container, segments);
});

///// I WANT TO EITHER REDIRECT TO A NEW PAGE WHEN GO IS PUSHED OR APPLY THE TEXT PATH TO THE
////  CONTENTS OF THE CENTRAL PANEL AND BE ABLE TO SCROLL THROUGH
//// == a simple test with res izing the container makes me think redirecting to a new page is best. ==


