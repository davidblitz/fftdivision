var mic;
var fft;
var step = 40;
var yellowLine = 0;
var backgroundColor = 200;
var fs = false;
function setup() {
    createCanvas(1000, 800);
    frameRate(10);
    mic = new p5.AudioIn();
    mic.start();
    fft = new p5.FFT(0.8, 32);
    fft.setInput(mic);
    stroke(0);
    strokeWeight(5);
    fill(backgroundColor);
}
function mousePressed() {
    var fs = fullscreen();
    fullscreen(!fs);
}
function draw() {
    background(backgroundColor);
    if (frameCount % 30 == 1) {
        yellowLine = int(random(this.width / step) - 3);
    }
    var spectrum = fft.analyze();
    var lines = [];
    for (var i = 2 * step; i <= this.width - step; i += step) {
        var line_1 = [];
        var sv = map(spectrum[i / step], 0, 255, 0, step / 8);
        for (var j = 0; j <= this.width; j += step) {
            var distanceToCenter = Math.abs(j - this.width / 2);
            var variance = Math.max(this.width / 2 - 50 - distanceToCenter, 0);
            var r = sv * noise(i + frameCount / 10.0, j + frameCount / 10.0) * variance / 2 * -1;
            line_1.push(createVector(j, i + r));
        }
        lines.push(line_1);
    }
    for (var i = 0; i < lines.length; i++) {
        if (yellowLine == i) {
            stroke(250, 201, 1);
        }
        beginShape();
        vertex(0, this.height);
        for (var cnt = 0; cnt < lines[i].length; cnt++) {
            var p = lines[i][cnt];
            curveVertex(p.x, p.y);
        }
        vertex(this.width, this.height);
        endShape(CLOSE);
        stroke(0);
    }
}
//# sourceMappingURL=build.js.map