function splitText(text, width) {
    text = text.replace(/\n/g, ' ');
    // console.log(text);

    let words = text.split(/[ \t]+/); // split on whitespace
    let lines = [];  // This is an empty array for lines
    let current_line = '';
    while (words.length > 0) {
        current_line = '';
        while (true) {
            if (words.length > 0 && current_line.length + words[0].length <= width) {
                current_line += words.shift() + ' ';
            } else {
                break;
            }
        }
        lines.push(current_line);
    }
    return lines;
}



// Segments are chunks of text in multiple divs that are curved (or not) according to mathematical equations.
class Segment {
    constructor(xt, yt) {
        this.min_t = 0; // to be set by TextPath.calculateTRanges
        this.max_t = 1;
        this.xt = xt;
        this.yt = yt;
    }

    // We use this later when styling/twisitng our divs. getX and getY are made essentially the same way.
    getX(t) {
        t = (t - this.min_t) / (this.max_t - this.min_t);
        return this.xt(t);
    }

    getY(t) {
        t = (t - this.min_t) / (this.max_t - this.min_t);
        return this.yt(t);
    }

    getDistance() {
        // take 1000 steps from t=0 to t=1, sum up distances
        let n_samples = 1000;
        let distance = 0;
        let length = 0;
        for (let i = 0; i < n_samples; ++i) {
            // find the point at t0
            let t0 = i / n_samples;
            // find the point at t1
            let t1 = (i + 1) / n_samples;
            let delta_x = (this.xt(t1) - this.xt(t0));
            let delta_y = (this.yt(t1) - this.yt(t0));
            // calculate the distance
            distance += Math.sqrt(Math.pow(delta_x, 2) + Math.pow(delta_y, 2));
            // add that distance to a running sum
            length += distance;

        }
        return distance;


    }
}

class StraightSegment extends Segment {
    constructor(angle, scale) {
        super(function (t) {
            return scale * Math.cos(angle) * t;
        }, function (t) {
            return scale * Math.sin(angle) * t;
        });
    }
}

class SinSegment extends Segment {
    constructor() {
        super(function (t) {
            return t;
        }, function (t) {
            return Math.sin(t);
        })
    }
}

class ArcSegment extends Segment {
    constructor(radius) {
        super(function (t) {
            return radius(100 - 100 * Math.cos(t * Math.PI));
        }, function (t) {
            return radius(100 * Math.sin(t * Math.PI));
        })
    }
}

class CurvedSegment extends Segment {
    constructor(radius, curve) {
        super(null, null);
        if (curve === CurvedSegment.UpperLeft) {
            this.xt = function (t) {
                return radius * (1 - Math.sin((t * Math.PI) / 2) - 1);
            };
            this.yt = function (t) {
                return radius * (Math.cos((t * Math.PI) / 2) - 1);
            };
        } else if (curve === CurvedSegment.UpperRight) {
            this.xt = function (t) {
                return radius * (Math.sin((t * Math.PI) / 2));
            };
            this.yt = function (t) {
                return radius * (1 - Math.cos((t * Math.PI) / 2) - 1);
            }
        } else if (curve === CurvedSegment.LowerLeft) {
            this.xt = function (t) {
                return radius * (1 - Math.sin((t * Math.PI) / 2));
            };
            this.yt = function (t) {
                return radius * (1 - Math.cos((t * Math.PI) / 2) - 1);
            }
        } else if (curve === CurvedSegment.LowerRight) {
            this.xt = function (t) {
                return radius * (Math.sin((t * Math.PI) / 2));
            };
            this.yt = function (t) {
                return radius * (1 - Math.cos((t * Math.PI) / 2));
            }
        }
    }
}

CurvedSegment.UpperLeft = 0;
CurvedSegment.UpperRight = 1;
CurvedSegment.LowerLeft = 2;
CurvedSegment.LowerRight = 3;


class GlobalCoordinates {
    // Need to define scale
    constructor(center_x, center_y, scale) {
        this.center_x = center_x;
        this.center_y = center_y;
        this.scale = scale;
    }

    transformX(x) {
        return this.center_x + this.scale * x;
    }

    transformY(y) {
        return this.center_y + this.scale * y;
    }

    invertX(x) {
        return x / this.scale - this.center_x;
    }

    invertY(y) {
        return y / this.scale - this.center_y;
    }

    transform(p) {
        return new Point(this.center_x + this.scale * p.x,
            this.center_y + this.scale * p.y);
    }

    invert(p) {
        return new Point(p.x / this.scale - this.center_x,
            p.y / this.scale - this.center_y);
    }
}


// Making a class for point
class Point {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    toString() {
        return '(' + this.x + ', ' + this.y + ')';
    }
}

//May not need segment points.
class segmentPoint extends Point {
    constructor(x, y, segment_t) {
        super(x, y);
        this.segment_t = segment_t;
    }
}


// Text path is the twisting-turning text segment constructor.  Currently we have three segments hard coded in. This will need to change.
class TextPath {
    constructor(text, container, segments) {
        // simplifying segments_array into segments for reference.

        this.segments = segments;
        this.calculateTRanges();

        // Calling split text function to get our lines.
        let lines = splitText(text, width);

        //lines = lines.splice(0, 80);
        let text_scale_factor = 0.1;

        // Creating a new global coordinate called gc.
        let gc = new GlobalCoordinates(400, 400, lines.length * text_scale_factor);

        // Making the global coordinate (gc) accessible
        this.gc = gc;

        // Starting segment index at 0 and incrementing through the array.
        let segment_index = 0;

        // Itterating through all the lines.
        for (let i = 0; i < lines.length; ++i) {
            // get our t sub-division based on the number of lines.
            let t = i / (lines.length - 1);

            // max t is the highest our t can go.
            if (t >= segments[segment_index].max_t) {

                // Everything is based on segments here. Unsure if this needs to change. Possible.
                if (segment_index < segments.length - 1) {
                    let end_x = segments[segment_index].xt(1.0);
                    let end_y = segments[segment_index].yt(1.0);


                    // TODO FIX, USE A POINT NOT GC TO MOVE ALONG
                    // SEE 277, 278
                    gc.center_x = gc.transformX(end_x);
                    gc.center_y = gc.transformY(end_y);
                    segment_index += 1;


                }
                // let x = starting_point.x + this.segments[i].getX(t);
                // let y = starting_point.y + this.segments[i].getY(t);
            }

            // creating divs for our lines to live
            let div = document.createElement('div');
            div.style.position = 'absolute';

            // This section is where we are adjusting the curve of our divs along a parametric equation.
            // todo: take p(t-dt) and p(t+dt) rather than p(t) and p(t+dt)
            // dt is a magic number. Delta t?
            let dt = 0.01;
            // 'point x equals' gc = global coordinates. getX and getY are from class Segment
            let px = gc.transformX(segments[segment_index].getX(t));
            // 'point y equals...'
            let py = gc.transformY(segments[segment_index].getY(t));
            // second point of x
            let px2 = gc.transformX(segments[segment_index].getX(t + dt));
            // second point of y
            let py2 = gc.transformY(segments[segment_index].getY(t + dt));
            // Find the angle
            let angle = Math.atan2(py2 - py, px2 - px) - Math.PI / 2;

            // Positioning the divs. gc = global coordinates. getX and getY are from class Segment.
            // Hard coded segments in equation will need to change, may be reflected here.
            div.style.left = gc.transformX(segments[segment_index].getX(t)) + 'px';
            div.style.top = gc.transformY(segments[segment_index].getY(t)) + 'px';
            // Rotating div according to the current angle we want
            div.style.transform = 'rotate(' + angle + 'rad)';
            //div.style.transform +=  'scale(0.5)';

            // Fill div with enough words for one line.
            div.innerText = lines[i];
            // Might be pointless to have line_height
            div.style.height = line_height + 'px';
            // It is important that width be constant. When width is adustable by pixels this may not be needed.
            div.style.width = '300px';   // DON'T LOSE THIS
            // Add new div to our outter div "container"
            container.appendChild(div);

        }
        this.gc = new GlobalCoordinates(400, 400, lines.length * text_scale_factor);  ///////// hashed together recall of this.gc

    }

    // Right now I think all of these are based on an x/y coordinate in the center of the text
    // which is why it is starting out skewed I think.
    getPoint(t) {
        // these are some magic numbers.
        let starting_point = new Point(0, 0);
        for (let i = 0; i < this.segments.length; ++i) {

            //starting_point.x += this.segments[i].xt(0.0);
            //starting_point.y += this.segments[i].yt(0.0);

            if (t >= this.segments[i].min_t && t <= this.segments[i].max_t) {
                // getX and getY is from our segments

                let x = starting_point.x + this.segments[i].getX(t);
                let y = starting_point.y + this.segments[i].getY(t);
                return this.gc.transform(new Point(x, y));
            }
            starting_point.x += this.segments[i].xt(1.0);
            starting_point.y += this.segments[i].yt(1.0);


            //console.log(starting_point);
        }
        return this.gc.transform(starting_point);
    }

    calculateTRanges() {
        // loop over segments, find their distances
        let sum = 0;
        let segment_distances = [];
        for (let i = 0; i < this.segments.length; ++i) {
            let segment = this.segments[i];

            // calculate length
            let distance = this.segments[i].getDistance();
            // put length in array
            segment_distances.push(distance);
            // add length to running sum
            sum += distance;
        }
        // loop over segments again
        let running_t = 0;
        for (let i = 0; i < this.segments.length; ++i) {
            // divide the segment length by the total length (sum)
            let t_length = segment_distances[i] / sum;
            // set the segment's t range
            this.segments[i].min_t = running_t;
            this.segments[i].max_t = running_t + t_length;
            running_t += t_length;
        }
    }
}