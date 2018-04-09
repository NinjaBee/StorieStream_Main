let width = 30; // our width we use when making lines, etc.
let line_height = 30;
let container = document.querySelector('#container'); // This is the div we automatically populate that you can see in the html. We create more than one of these.
let text_path = new TextPath(text, container);

  let current_t = 0.0;
    window.onwheel = function (evt) {
        //current_t += 0.0001*evt.deltaY;
        current_t += text_path.gc.scale*evt.deltaY/100000;
        if (current_t < 0) {
            current_t = 0;
        } else if (current_t > 1.0) {
            current_t = 1.0;
        }
        let current_pt = text_path.getPoint(current_t);
        console.log(current_pt);
        //current_pt = text_path.gc.invert(current_pt);
        container.style.transform = 'translate(' + (text_path.gc.center_x-current_pt.x) + 'px,' + (text_path.gc.center_y-current_pt.y) + 'px)';
        //container.style.transform = 'translate(' + current_pt.x + 'px,' + current_pt.y + 'px)';

        evt.preventDefault();
        return false;
    };

    function changeOrientation(event) {
    alert("Rotate");
    event.preventDefault();
}