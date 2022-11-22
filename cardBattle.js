//------------------------------- INI
let P1= {
    "name" : "Gerard",
    "class" : "Elegant Knight",
    "hp" : 100,
"forceMin" : 50,
"forceMax" : 100,
"HealMin" :2,
"HealMax" : 6
}

let P2= {
    "name" : "Eveline",
    "class" : "Conservative elve",
    "hp" : 100,
"forceMin" : 2,
"forceMax" : 12,
"HealMin" :2,
"HealMax" : 6
}

let turn = 1;
let Players = [P1,P2]

//------------------------------- GRAB
let btnsAtk= document.querySelectorAll(".btn_attack")
let btnsHeal= document.querySelectorAll(".btn_heal")
let playerName = document.querySelectorAll("h3")
let lifeStrings = document.querySelectorAll("span")
let gauges = document.querySelectorAll("progress")
let historicPosition = document.querySelector(".historic")
let cardsPlayer =  document.querySelectorAll(".mainCard")
const btnReplay = document.querySelector(".replay > button")

EndTurn();

//------------------------------- EVENTS
btnReplay.addEventListener("click",Reset);
//--------------ATTK
for(i=0;i<btnsAtk.length;i++){

    btnsAtk[i].addEventListener("click",function (){

Attack()
EndTurn()
EndGame()

})//End function
}

//---------------HEAL
for(i=0;i<btnsHeal.length;i++){

    btnsHeal[i].addEventListener("click",function (){
Heal()
EndTurn()

})//End function
}


//Starting settings
LoadCharacter(P1,0)
LoadCharacter(P2,1)
btnReplay.classList.add("hide")
 
function EndGame()  {
    for (i = 0; i < Players.length; i++)
        if (Players[i].hp <= 0) {
            CreateDiv(Players[i].name + " est mort ! Paix à son âme :(", "red");
            playerName[i].style.color = "red"
            playerName[GetEnnemy()].style.color = " green"
            EndOfGame();
        }
}

//-------------------------------  Functions

function CreateDiv(message,className)
{
let myDiv = document.createElement("div");

myDiv.style = " color : white;"
myDiv.classList.add(className);

myDiv.textContent = message;
historicPosition.prepend(myDiv);
}

function EndTurn() {
if (turn == 0) {
 //Player 2 turn
 turn = 1;
 btnsAtk[0].disabled=true;
 btnsHeal[0].disabled=true;
 btnsAtk[1].disabled=false;
 btnsHeal[1].disabled=false;

} else {
    //Player 1 turn
    turn =0;
    btnsAtk[1].disabled=true;
    btnsHeal[1].disabled=true;
    btnsAtk[0].disabled=false;
    btnsHeal[0].disabled=false;
}
}

function EndOfGame(){
    btnsAtk[1].disabled=true;
    btnsHeal[1].disabled=true;
    btnsAtk[0].disabled=true;
    btnsHeal[0].disabled=true;
    btnReplay.classList.toggle("hide")
}

function LoadCharacter(char,player)
{
//Name
playerName[player].textContent = char.name
//HP
GaugeLifeUpdate(char.hp,player)
}

function GaugeLifeUpdate(hp,nbPlayer)
{
lifeStrings[nbPlayer].textContent =  hp+ "/100"
gauges[nbPlayer].value = hp;
}

function Attack( )
{
let ennemy = GetEnnemy();
cardsPlayer[ennemy].classList.remove("shake") 
//Redraw
cardsPlayer[ennemy].offsetWidth; //Forcer le remove
let valueAttk = RollDice(Players[turn].forceMin,Players[turn].forceMax);
Players[ennemy].hp  = Math.max(Players[ennemy].hp -  valueAttk,0);
GaugeLifeUpdate(Players[ennemy].hp  ,ennemy)
cardsPlayer[ennemy].classList.add("shake")
CreateDiv( Players[turn].name +" attaque et touche "+ Players[ennemy].name + " de "+ valueAttk +" dégats !","red")
}

function Heal( )
{
    let valueHeal = RollDice(Players[turn].HealMin,Players[turn].HealMax);
    CreateDiv(Players[turn].name +" se soigne de "+valueHeal +" points de vie.","green")
    Players[turn].hp = Math.min(Players[turn].hp+valueHeal,100);
    GaugeLifeUpdate(Players[turn].hp  ,turn)
}

function RollDice(min,max)
{
 return Math.round(Math.max(Math.random()*max,min));
}

 function GetEnnemy(){
    if(turn==0){
        return 1;
    }else{
     return 0;
    }
 }

 function Reset()
 {
    historicPosition.remove();
    turn = 1;
    P1.hp=100;
    P2.hp=100;
    //Starting settings
    LoadCharacter(P1,0)
    LoadCharacter(P2,1)
    btnReplay.classList.toggle("hide")
    playerName[0].style.color = "white"
    playerName[1].style.color = "white"
 }