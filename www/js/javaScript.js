var wordType = document.getElementById("wordType");
var wordTypetest = document.getElementById("wordTypetest");
var listWord = document.getElementsByClassName("listWord");
var mode;
var correctAnswers = 0;
var currentQuestion = 0;
var numberOfQuestions = 2;
document.getElementById("numberOfQuestions").innerHTML = numberOfQuestions;
var addedSelectedClass = false;
function test(){
    
    if (numberOfQuestions > currentQuestion){
        reset(); //ifall någon är selected så blir den de-selected, verkar bugga då och då annars.
        console.log("test");
        mode ="test";
        console.log(mode);
        currentQuestion++;
        document.getElementById("currentQuestion").innerHTML = currentQuestion;
        document.getElementById("menu").style.display="none";
        document.getElementById("test").style.display="block";
        var ord = ["substantiv", "verb", "adjektiv"];
        rand = Math.floor(Math.random() * 3);

        wordTypetest.innerHTML = ord[rand];
        createList("test");
   }
   if(currentQuestion == numberOfQuestions){
        document.getElementById("testNextQuestion").style.display = "none";
        document.getElementById("testResultButton").style.display = "inline-block";
        console.log("Last question");   
        console.log(correctAnswers);
    }
}

function showResult(){
    resultsMessage = document.getElementById("resultsMessage");
    resultsMessage.innerHTML ="Resultat:" + correctAnswers + "/" +numberOfQuestions;
    resultsMessage.classList.toggle("show");
    //alert("resultat: " + correctAnswers + "/" +numberOfQuestions );
}


function practice() {
reset();

console.log("practice");
mode = "practice";
console.log(mode);
document.getElementById("menu").style.display="none";
document.getElementById("practice").style.display="block";    
    
    
var ord = ["substantiv", "verb", "adjektiv"];
rand = Math.floor(Math.random() * 3);

wordType.innerHTML = ord[rand];
createList("practice");
}
function createList(x){
    addedSelectedClass = false;
    for (var i = 0; i < listWord.length; i++) {
        listWord[i].addEventListener('click', changeClass, false);
    }
    
    if(addedSelectedClass == true){
        document.querySelector(".selected").classList.remove("selected");
    }
     substantiv = ["Äpple", "Päron", "Bordskiva",
                    "Stege", "Boll","Dator",
                    "Hus", "Bil", "Cykel"];
     verb = ["Leka", "Äta", "Spela",
                "Klättra", "Studsa", "Hoppa",
                "Måla", "Sjunga", "Prata"];
     adjektiv = ["Grön","Stark","Rolig",
                    "Snäll", "Elak", "Mjuk",
                    "Varm", "Kall", "Lång"];
            
    for(i=0; i<3; i++){
        rand = Math.floor(Math.random() * substantiv.length);
        var randomList = [substantiv[rand], verb[rand], adjektiv[rand]];
    }
    
    //Blanda listan, sen ges ett värde.
    randomList.sort(function(a, b){return 0.5 - Math.random()}); 
    for(i = 1; i<4; i++){
        rand = Math.floor(Math.random() * 3);
        if(x=="practice"){
            listWord = document.getElementById("listWord" + i);      
            listWord.innerHTML = randomList[i - 1];
        }
        else if(x=="test"){
                listWord = document.getElementById("listWordtest" + i);      
                listWord.innerHTML = randomList[i - 1];
                }
        
    }
}

function changeClass() {
    selectedId = document.getElementById(this.id);
    
    
    if (!selectedId.classList.contains("selected")){
        //Ifall det är andra element som är selected, ta bort deras selected.
        if(addedSelectedClass == true){
        document.querySelector(".selected").classList.remove("selected");
        }
        document.getElementById(this.id).className += " selected";
        addedSelectedClass = true;
        
    } 
    
}
function checkAnswer() {
    
    //Kolla vilket id som har klass "selected".
    answer = document.querySelector(".selected");
    
    
    //Jämför wordType med listWords array-parent(alltså vilken array den är i.)
    //kolla array.indexOf, se ifall ordet finns i det. Ifall inte, kolla nästa osv.
    //indexOf ger -1  ifall det inte hittar ordet.
    
    if(substantiv.indexOf(answer.innerHTML) >= 0){
        
        //kolla ifall det är rätt
        if(wordType.innerHTML =="substantiv"){
            alertMessage(answer = "right");
            
        }
        else{
            alertMessage(answer = "wrong");
            
        }
        
    }
    else if(verb.indexOf(answer.innerHTML) >= 0){
        
        if(wordType.innerHTML =="verb"){
            alertMessage(answer = "right");
            
        }
        else{
            alertMessage(answer = "wrong");
            
        }
        
    }    
    else if(adjektiv.indexOf(answer.innerHTML) >= 0){
        
        if(wordType.innerHTML =="adjektiv"){
            alertMessage(answer = "right");
            
        }
        else{
            alertMessage(answer = "wrong");
            
        }
    }
    
}
function checkAnswertest() {
    console.log("checkAnswertest");
    //Kolla vilket id som har klass "selected".
    answer = document.querySelector(".selected");
    
    
    //Jämför wordType med listWords array-parent(alltså vilken array den är i.)
    //kolla array.indexOf, se ifall ordet finns i det. Ifall inte, kolla nästa osv.
    //indexOf ger -1  ifall det inte hittar ordet.
    
    if(substantiv.indexOf(answer.innerHTML) >= 0){
        
        //kolla ifall det är rätt
        if(wordTypetest.innerHTML =="substantiv"){
            //alertMessage(answer = "right");
            console.log("correct answer");
            correctAnswers++;
            
        }
        else{
            //alertMessage(answer = "wrong");
            console.log("wrong answer");
        }
        
    }
    else if(verb.indexOf(answer.innerHTML) >= 0){
        
        if(wordTypetest.innerHTML =="verb"){
            //alertMessage(answer = "right");
            console.log("correct answer");
            correctAnswers++;
        }
        else{
            //alertMessage(answer = "wrong");
            console.log("wrong answer");
            
        }
        
    }    
    else if(adjektiv.indexOf(answer.innerHTML) >= 0){
        
        if(wordTypetest.innerHTML =="adjektiv"){
            //alertMessage(answer = "right");
            console.log("correct answer");
            correctAnswers++;
            
        }
        else{
            //alertMessage(answer = "wrong");
            console.log("wrong answer");
            
        }
    }
    
}



function alertMessage(answer){
    
    if(answer=="right") {
        document.querySelector(".selected").classList.remove("selected");
        if(mode=="practice"){
            message = document.getElementById("success");
        }
        else if(mode=="test"){
            //message = document.getElementById("successtest");
            
        }
        message.classList.toggle("show");
    }
    else if(answer=="wrong"){
        if(mode=="practice"){
            message = document.getElementById("wrong");
        }
        else if(mode=="test"){
            //message = document.getElementById("wrongtest");
        }
        message.classList.toggle("show");
    }
}
//Visa/dölja rätt/fel-meddelande on click.
document.getElementById("success").addEventListener("click", myFunction);
document.getElementById("wrong").addEventListener("click", myFunction);
function myFunction() {
    var popup = document.getElementById(this.id);
    popup.classList.toggle("show");
}

function showMenu(){
    reset();
    resetValues();
    document.getElementById("practice").style.display="none";
    document.getElementById("test").style.display="none";
    document.getElementById("menu").style.display="block";
    document.getElementById("testResultButton").style.display = "none";
    document.getElementById("testNextQuestion").style.display = "inline-block";
    
}
function reset(){

//för att lösa bugg som gjorde att det ibland var en eller flera selected. kanske jag kan ta bort addedSelectedClass-grejen och använda denna istället?
    if(document.querySelector(".selected")){
        document.querySelector(".selected").classList.remove("selected");
    }
}
function resetValues(){
    correctAnswers = 0;
    currentQuestion = 0;
}