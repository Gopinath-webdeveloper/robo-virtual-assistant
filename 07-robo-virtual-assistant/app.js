let btn = document.querySelector(".talk");
let content = document.querySelector(".content");

// active robo
let talk = document.querySelector(".talk2");


function speak(text) {
 
  const text_speak = new SpeechSynthesisUtterance(text);
 
  //   console.log(text_speak);
 
  text_speak.rate = 1;
  text_speak.volume = 1;
  text_speak.pitch = 1;

 
  window.speechSynthesis.speak(text_speak);
}


/* window.addEventListener('load', ()=>{
     speak("Initializing robo");
   
}); */

let roboactivated = true;
// console.log(roboactivated + "before");

talk.addEventListener("click", () => {
//    talk.textContent =  talk.textContent ==  "active robo" ? "deactivate robo" : "active robo";
  if (roboactivated == true) {
    // speak(" Hii how may i help you");
    active();
    wishme();
    // console.log(roboactivated + "after");
  }else{
    deactivate();
  }

//   roboactivated = roboactivated === true ? false : true;
});


function active(){
    roboactivated = false;
    talk.textContent = "deactivate robo";
}
function deactivate(){
    roboactivated=true;
    talk.textContent = "active robo";
   content.textContent= "Click here to speak";


}
function wishme() {
  const day = new Date();
  const hours = day.getHours();

  if (hours >= 0 && hours < 12) {
    speak("good morning , how may i help you");
  } else if (hours > 12 && hours < 17) {
    speak("good afternoon  i am robo,how may i help you");
  } else {
    speak("good evening ,how may i help you ");
  }
}

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();

// transcript handling onresult is triggered when speech is recognized.
recognition.onresult = (event) => {

  console.log(event) 
  const currentIndex = event.resultIndex;
  // this is nothing but the transcript that we have spoken that is available in
  //  speeachrecognitionAlternative that can be placed in event . results [0][0]
  const transcript = event.results[currentIndex][0].transcript;
  console.log( event.results[currentIndex][0].transcript);
  content.textContent = transcript;
  
  // takeCommand(transcript.toLowerCase());
  takeCommand(content.textContent.toLowerCase());
};



btn.addEventListener('click', ()=>{
     if(roboactivated ===  false){
        content.textContent = "Listening...."
        recognition.start();
     }
   
})

function takeCommand(message){
 
    if( message === 'hey robo'  || message === 'hello robo' || message === 'hi robo'){
        speak("ah ahaan welcome!! "); 
        // console.log("this is called");
    }
    else if(message.includes('about yourself')){
      speak("I am your assistant , i can help you to know about anything as soon as possible!!!") 
    }
    else if(message.includes('open google')){
        window.open("http://google.com","_blank_");
        speak("opening google");
    }
    else if(message.includes('open whatsapp')){
        window.open("https://web.whatsapp.com/","_blank_");
        speak("opening whatsapp");
    }
   
    else if(message.includes('open facebook')){
        window.open("http://facebook.com","_blank_");
        speak("opening faceboook");
    }
    else if(message.includes('what is') || message.includes('who is') || message.includes('what are')) {
      window.open(`https://www.google.com/search?q=${message}`, "_blank");
     
      const finalText = "This is what i found on internet regarding " + message;
    
    speak(finalText);

  }

  else if(message.includes('wikipedia')) {
      // window.open(`https://en.wikipedia.org/wiki/${message.replace("wikipedia", "")}`, "_blank");
      window.open(`https://en.wikipedia.org/wiki/${message.replace("wikipedia","")} `,'_blank_');
      const finalText = "This is what i found on wikipedia regarding " + message;
      speak(finalText);
  }

  else if(message.includes('time')) {
      const time = new Date().toLocaleString(undefined, {hour: "numeric", minute: "numeric"})
      const finalText = time;
      speak(finalText);
  }

  else if(message.includes('date')) {
      const date = new Date().toLocaleString(undefined, {month: "short", day: "numeric"})
      const finalText = date;
      speak(finalText);
  }

  else if(message.includes('calculator')) {
      window.open('Calculator:///')
      const finalText = "Opening Calculator";
      speak(finalText);
  }
  



  else {
      window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
      const finalText = "I found some information for " + message + " on google";
      speak(finalText);
  }

}