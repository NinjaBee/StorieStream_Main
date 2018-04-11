let container = document.querySelector('#container');


//// modified scroll function using t with (x,y) coordinates centered in text divs. /////

let current_t = 0.0;
window.onwheel = function (evt) {
    current_t += 0.0001*evt.deltaY;
    if (current_t < 0) {
        current_t = 0;
    } else if (current_t > 1.0) {
        current_t = 1.0;
    }
    let current_pt = text_path.getPoint(current_t);
    console.log(current_pt);
    //current_pt = text_path.gc.invert(current_pt);
    container.style.transform = 'translate(' + (text_path.gc.center_x - current_pt.x) + 'px,' + (text_path.gc.center_y - current_pt.y) + 'px)';
    //container.style.transform = 'translate(' + current_pt.x + 'px,' + current_pt.y + 'px)';

    evt.preventDefault();
    return false;
};

function changeOrientation(event) {
    alert("Rotate");
    event.preventDefault();
}