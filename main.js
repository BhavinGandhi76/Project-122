x = 0;
y = 0;

num = 0;
apple="";
draw_apple = "";

var SpeechRecognition = window.webkitSpeechRecognition;
  
var recognition = new SpeechRecognition();

function preload(){
  apple = loadImage("apple.png");
}

function start()
{
  document.getElementById("status").innerHTML = "System is listening please speak";  
  recognition.start();
} 
 
recognition.onresult = function(event) {

 console.log(event); 

 content = event.results[0][0].transcript;

    document.getElementById("status").innerHTML = "The speech has been recognized: " + content;
    num = Number(content);
    if(Number.isInteger(num)) {
      document.getElementById("status").innerHTML = "Started drawing apple";
      draw_apple = "set";
    }
    else{
      document.getElementById("status").innerHTML = "the speech has not recognised a number";
    }

}

function setup() {
   canvas = createCanvas(1900,750);
   canvas.position(0,150);
}

function draw() {
  if(draw_apple == "set")
  {
    for(var i = 1; i <= num; i++)
    {
      x = Math.floor(Math.random()* 1500);
      y = Math.floor(Math.random() *700);
      image(apple, x, y, 50, 50);
    }

    document.getElementById("status").innerHTML = num + " Apples drawn";
    speak_data = num+"Apples Drawn";
    speak();
    draw_apple = "";
  }
}

function speak(){
    var synth = window.speechSynthesis;

    var utterThis = new SpeechSynthesisUtterance(speak_data);

    synth.speak(utterThis);

    speak_data = "";
}
