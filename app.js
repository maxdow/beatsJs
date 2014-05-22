var sourceElement = document.getElementById("audioSrcElement");

var context = new AudioContext();
var analyser = context.createAnalyser();

analyser.fftSize = 32;
console.log(analyser.frequencyBinCount); // fftSize/2 = 32 data points

var frequencyBlockArray = [];

for (var i = 0; i < analyser.frequencyBinCount; i++) {

    var elm = document.createElement("div");

    elm.className = "frequencyBlock";
    frequencyBlockArray.push(elm);

    document.body.appendChild(elm);
}

var source = context.createMediaElementSource(sourceElement);
source.connect(analyser);
analyser.connect(context.destination);

sourceElement.addEventListener("play", function(e) {
    analyseLoop();
});



function analyseLoop() {
    if (!sourceElement.paused) {
        var frequencyData = new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(frequencyData);

        for (var i = 0,t = frequencyBlockArray.length; i < t; i++) {
            var val = frequencyData[i];
            var red = val;
            var green = 255 - val;
            var blue = val / 2;

            frequencyBlockArray[i].style.background = "rgb(" + red + "," + green + "," + blue + ")";
        }
    //console.log(frequencyData);
    //setTimeout(analyseLoop,100);
    window.requestAnimationFrame(analyseLoop);
}
}



sourceElement.addEventListener("pause", function(e) {
    console.log("pause");
});
