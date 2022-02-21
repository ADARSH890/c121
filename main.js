function preload(){

}
function setup(){
canvas=createCanvas(300,300);
canvas.center();
video=createCapture(VIDEO);
video.hide();
classifier=ml5.imageClassifier("MobileNet",modelloaded);
}
function modelloaded(){
    console.log("modelloaded");
}
function draw(){
image(video,0,0,300,300);
classifier.classify(video,gotresult);
}
var previous_result="";



function gotresult(error,results){
if(error){
    console.error(error);

}
else{
if((results[0].confidence>0.5)&&(previous_result!=results[0].label)){
    console.log(results);
    previous_result=results[0].label;
    synth=window.speechSynthesis;
    speakdata="the object detected is "+results[0].label;
   utterthis= new SpeechSynthesisUtterance(speakdata);
   synth.speak(utterthis);
   document.getElementById("Object_name").innerHTML=results[0].label;
   document.getElementById("Accuracy_name").innerHTML=results[0].confidence.toFixed(3);
}
}

}