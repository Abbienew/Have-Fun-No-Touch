var soundFile, landscape, mouseX, mouseY;

function preload() {
    soundFormats('wav');
    soundFile = loadSound('vibraphon_.wav');
}

function setup() {
    createCanvas(1920, 1080);
    img = loadImage('wispfire_02.png');
    landscape = loadImage('landscape.png');

    // These methods return useful infos about the file
    print('SFSampleRate= ' + soundFile.sampleRate() + 'Hz');
    print('SFSamples= ' + soundFile.frames() + 'samples');
    print('SFDuration= ' + soundFile.duration() + ' seconds');
    soundFile.loop();
}


function draw() {
    background(landscape);
    image(img, mouseX / 2, mouseY / 2, mouseX, mouseY);
    var panning = map(mouseX, 0., width, -1.0, 1.0);
    soundFile.pan(panning);
    var rate = (map(mouseX, 0, width, 0.25, 3.0));
    soundFile.rate(rate);
    var amp = (map(mouseY, 0, width, 0.2, 1.0));
    soundFile.amp(amp);
}