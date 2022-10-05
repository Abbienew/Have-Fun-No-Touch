var px = 50; // Position x and y
var py = 50;
var vx = 0.0; // Velocity x and y
var vy = 0.0;
var updateRate = 1 / 60; // Sensor refresh rate
var soundFile,;

function preload() {
    soundFormats('mp3');
    soundFile = loadSound('Sample/3-SteadySimilar.mp3');
}

function setup() {
    // These methods return useful infos about the file
    print('SFSampleRate= ' + soundFile.sampleRate() + 'Hz');
    print('SFSamples= ' + soundFile.frames() + 'samples');
    print('SFDuration= ' + soundFile.duration() + ' seconds');
    soundFile.loop();
}


function getAccel() {
    DeviceMotionEvent.requestPermission().then(response => {
        if (response == 'granted') {
            // Add a listener to get smartphone orientation 
            // in the alpha-beta-gamma axes (units in degrees)
            window.addEventListener('deviceorientation', (event) => {
                // Expose each orientation angle in a more readable way
                rotation_degrees = event.alpha;
                frontToBack_degrees = event.beta;
                leftToRight_degrees = event.gamma;

                // Update velocity according to how tilted the phone is
                // Since phones are narrower than they are long, double the increase to the x velocity
                vx = vx + leftToRight_degrees * updateRate * 2;
                vy = vy + frontToBack_degrees * updateRate;

                // Update position and clip it to bounds
                px = px + vx * .5;
                if (px > 98 || px < 0) {
                    px = Math.max(0, Math.min(98, px)) // Clip px between 0-98
                    vx = 0;
                }

                py = py + vy * .5;
                if (py > 98 || py < 0) {
                    py = Math.max(0, Math.min(98, py)) // Clip py between 0-98
                    vy = 0;
                }

                dot = document.getElementsByClassName("indicatorDot")[0]
                dot.setAttribute('style', "left:" + (px) + "%;" +
                    "top:" + (py) + "%;");

                var panning = map(vx, 0., vx, -1.0, 1.0); //how to map panning 
                soundFile.pan(panning);
                
                var rate = (map(vx, 0, vx, 0.25, 3.0));
                soundFile.rate(rate);
                
                var amp = (map(vy, 0, vy, 0.2, 1.0));
                soundFile.amp(amp);
                
            } // solve it  
    )} // solve it 
