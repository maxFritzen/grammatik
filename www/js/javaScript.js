var wordType = document.getElementById("wordType");
var wordTypetest = document.getElementById("wordTypetest");
var listWord = document.getElementsByClassName("listWord");
var word = ["substantiv", "verb", "adjektiv"];
var correctAnswers = 0;
var correctTypeOfWord;
var currentQuestion = 0;
var numberOfQuestions = 2;
var correctWord = []; //för att se de rätta svaren på test, inte de användaren valde.
var userAnswers = []; //för att kunna visa/lagra användarens svar.
var randomList = []; //väljer orden som användaren kan välja mellan.
document.getElementById("numberOfQuestions").innerHTML = numberOfQuestions;
var addedSelectedClass = false;
function test(){
    
    if (numberOfQuestions > currentQuestion){
        reset(); //ifall någon är selected så blir den de-selected.
        console.log("test");
        currentQuestion++;
        document.getElementById("currentQuestion").innerHTML = currentQuestion;
        document.getElementById("menu").style.display="none";
        document.getElementById("test").style.display="block";
        createList("test");
   }
   if(currentQuestion == numberOfQuestions){
        document.getElementById("testNextQuestion").style.display = "none";
        document.getElementById("testResultButton").style.display = "inline-block";
        console.log("Last question");   
        console.log(correctAnswers);
    }
}
function checkAnswertest() {
    //för test.
    console.log("checkAnswertest");
    //Kolla vilket ord som har klass "selected".
    answer = document.querySelector(".selected");
    storeUserAnswers(answer.innerHTML);
    
}

function storeUserAnswers(currentAnswer){
    userAnswers[currentQuestion-1] = currentAnswer;
    console.log("usersAnswer : " + userAnswers);
}

function compareTwoArrays(array1,array2){
    //Jämför rätta svaren med användarens svar.
    //ifall rätt svar == användarens svar, plussa på correctAnwsers  
    for(i = 0; i < array1.length; i++){
        if(array1[i] == array2[i]){
            console.log("index" + i +" is the same");
            correctAnswers++;
        }
        else{
            console.log("index " + i +" is NOT the same");
        }
    }
}
function pickOneWordFromMultipleArrays(x,y,z){
    //först välj en random av de 3 arrayerna
    //sedan välj ett random ord ur den valda arrayen
    arrays = [x,y,z]
    rand = Math.floor(Math.random() * 3);
    chosenArray = arrays[rand];
    rand = Math.floor(Math.random() * x.length);
    chosenWord = chosenArray[rand];
    console.log("Randomly Chosen Word will now be:" +chosenWord);
}
function decideWordType(randomWord){
    //parameter tar in ett random ord av subjektiv,adjektiv eller verb (chosenWord)
    //loopa igenom och kolla ifall indexOf är större än -1 dvs ordet finns i arrayen
    //är det det, display den sortens wordType
    //lagra specifika ordet som correctWord.
    if(substantiv.indexOf(randomWord) > -1){
        
        console.log("ordet är ett substantiv:" + randomWord );
        randomList[0] = randomWord; //istället för att använda index 0 kan jag ju söka igenom och hitta rätt, men funkar for now.
        correctWord[currentQuestion -1] = randomWord; //-1 för att hamna på index 0
        wordTypetest.innerHTML = "substantiv";
    }
    else if(adjektiv.indexOf(randomWord) > -1){
       
        console.log("ordet är ett adjektiv:" + randomWord );
        randomList[2] = randomWord;
        correctWord[currentQuestion -1] = randomWord;
        wordTypetest.innerHTML = "adjektiv";
    }
    else if(verb.indexOf(randomWord) > -1){
        
        console.log("ordet är ett verb:" + randomWord );
        randomList[1] = randomWord;
        correctWord[currentQuestion -1] = randomWord;
        wordTypetest.innerHTML = "verb";
    }
    else{
        console.log("Ordet hittas inte alls, någonting har gått snett...");
    }
    
}
function showResults(){
    compareTwoArrays(correctWord,userAnswers);
    resultsMessage = document.getElementById("resultsMessage");
    resultsMessage.innerHTML ="Resultat:" + correctAnswers + "/" +numberOfQuestions;
    resultsMessage.classList.toggle("show");
    
}

function resetResults(){
    correctAnswers = 0;
    resultsMessage.innerHTML = null; //kanske överflödigt med denna när jag ändå döljer det. 
    resultsMessage.classList.remove("show");
}


function practice() {
reset();
console.log("practice");
document.getElementById("menu").style.display="none";
document.getElementById("practice").style.display="block";    

rand = Math.floor(Math.random() * 3);

wordType.innerHTML = word[rand];
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
    //Det här borde ju flyttas utanför funktionen, men funkar för prototyp
    
     substantiv = ["Äpple", "Päron", "Bordskiva",
                    "Stege", "Boll","Dator",
                    "Hus", "Bil", "Cykel"];
     verb = ["Leka", "Äta", "Spela",
                "Klättra", "Studsa", "Hoppa",
                "Måla", "Sjunga", "Prata"];
     adjektiv = ["Grön","Stark","Rolig",
                    "Snäll", "Elak", "Mjuk",
                    "Varm", "Kall", "Lång"];
    
     
        rand = Math.floor(Math.random() * substantiv.length);
        randomList = [substantiv[rand], verb[rand], adjektiv[rand]];
        
        if(x =="test"){
            //för test, gör jag här ett rätt svar. Kan bygga om övning att följa detta sedan också, om det blir bra.
            //kolla vilken array ordet är i.
            pickOneWordFromMultipleArrays(substantiv, verb, adjektiv);
            decideWordType(chosenWord);
            console.log("correctWords : " +correctWord);
            }
    
    //Blanda listan
    randomList.sort(function(a, b){return 0.5 - Math.random()}); 
    //Sedan ges ett värde.
    if(x=="practice"){
        for(i = 1; i<4; i++){
                rand = Math.floor(Math.random() * 3);
                listWord = document.getElementById("listWord" + i);      
                listWord.innerHTML = randomList[i - 1];
            }
        }
    else if(x=="test"){
        for(i = 1; i<4; i++){
                rand = Math.floor(Math.random() * 3);
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
    //För practice.
    //Kolla vilket ord som har klass "selected".
    answer = document.querySelector(".selected");
    //Använd array.indexOf, se ifall ordet finns i den arrayen
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




function alertMessage(answer){
    
    if(answer=="right") {
        document.querySelector(".selected").classList.remove("selected");
        message = document.getElementById("success");
        message.classList.toggle("show");
    }
    else if(answer=="wrong"){
        message = document.getElementById("wrong");
        message.classList.toggle("show");
    }
}
//Visa/dölja rätt/fel-meddelande on click.
document.getElementById("success").addEventListener("click", popUpFunction);
document.getElementById("wrong").addEventListener("click", popUpFunction);
function popUpFunction() {
    var popup = document.getElementById(this.id);
    popup.classList.toggle("show");
}

function showMenu(){
    reset();
    resetValues();
    resetResults();
    document.getElementById("practice").style.display="none";
    document.getElementById("test").style.display="none";
    document.getElementById("menu").style.display="block";
    document.getElementById("testResultButton").style.display = "none";
    document.getElementById("testNextQuestion").style.display = "inline-block";
    
}
function reset(){

//för att det ibland var en eller flera selected.
    if(document.querySelector(".selected")){
        document.querySelector(".selected").classList.remove("selected");
    }
}
function resetValues(){
    currentQuestion = 0;
}