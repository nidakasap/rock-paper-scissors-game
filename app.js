//selectors
const yourChoiceDiv = document.getElementById('your-choice')
const pcChoiseDiv = document.getElementById('pc-choice')
const selectionArticle = document.querySelector('.selection')
const messagePar = document.querySelector('.message')

//score selectors
const scoreCardSection = document.querySelector('.score-card')
const yourScoreSpan = document.getElementById('your-score')
const pcScoreSpan = document.getElementById('pc-score')
const domTopScore = document.getElementById('top-score')


//variables
let userSelection;
let pcRandom;
let pcArr = ['rock', 'paper', 'scissor','rock', 'paper', 'scissor'];
const userSelectImg = document.createElement('img');
const pcSelectImg = document.createElement('img');

//colors
const YELLOW = "#FAB20E";
const RED = "#e64457";
const GREEN = "#5ab7ac";

//modal
const modalCardSection = document.querySelector('.modal-card')
const finalMessagePar = document.getElementById('final-message')
const playAgainButton = document.getElementById('play-again')


//event listeners
selectionArticle.addEventListener('click', (e)=>{
    userSelection = e.target.id;
    if(userSelection && !(yourScoreSpan.textContent === '10'|| pcScoreSpan.textContent === '10')){
        userSelectImg.src = `./assets/${userSelection}.png`
        userSelectImg.id = `you`
        yourChoiceDiv.appendChild(userSelectImg); 
        createPcSelection();
    }
   
})
playAgainButton.addEventListener('click', ()=>{
    window.location.reload()
})
//functions
const createPcSelection =()=>{
    pcRandom = pcArr[Math.trunc(Math.random() * 6)];
    pcSelectImg.src = `./assets/${pcRandom}.png`
    pcSelectImg.id = `pc`
    pcChoiseDiv.appendChild(pcSelectImg);    
    calculateResult();
}

const calculateResult =()=>{
   if(userSelection == pcRandom){
    draw()   
   }
   else{
    if(userSelection === 'rock'){
        pcRandom === 'paper' ? youLost(pcRandom) : youWin(userSelection)
    }else if(userSelection === 'paper'){
        pcRandom === 'scissor' ? youLost(pcRandom) : youWin(userSelection)
    }else if(userSelection === 'scissor'){
        pcRandom === 'rock' ? youLost(pcRandom) : youWin(userSelection)
    }
   }
   if(yourScoreSpan.textContent === '10'|| pcScoreSpan.textContent === '10'){
    openModal();
   }
}

const draw =()=>{
    messagePar.textContent = 'It is a draw!'
    messagePar.style.backgroundColor = YELLOW;
    scoreCardSection.style.color = YELLOW;
}

const youWin =(winner)=>{
    messagePar.textContent = 'You win! Keep going.'
    messagePar.style.backgroundColor = GREEN;
    scoreCardSection.style.color = GREEN;
    yourScoreSpan.textContent++;
    document.getElementById('you').setAttribute('src',`./assets/${winner}l.png`)
}

const youLost =(winner)=>{
    messagePar.textContent = 'You lost! Maybe next time...'
    messagePar.style.backgroundColor = RED;
    scoreCardSection.style.color = RED;
    pcScoreSpan.textContent++;
    // document.getElementById('you').getAttribute('src') //attirubute check
    document.getElementById('pc').setAttribute('src',`./assets/${winner}l.png`)
}

const openModal =()=>{
   modalCardSection.classList.add('show');
   document.querySelector('.modal-section-blur').style.display='block';
   if(yourScoreSpan.textContent==='10'){
    finalMessagePar.textContent= 'You Win!'
    document.getElementById('ghost').setAttribute('src',`./assets/happy.png`)
    playAgainButton.style.color = GREEN
    document.querySelector('.modal').style.backgroundColor=GREEN;
    updateTopScore();
   }
}


//top score
const storedScore = localStorage.getItem('highScore');
const topScore = storedScore ? `10 : ${storedScore}` : '0 : 0'
 //at the beginning if high score exist then print it if it is not print 0:0 
 domTopScore.textContent = topScore

 const updateTopScore = () => {
    if(!storedScore || storedScore > +pcScoreSpan.textContent){
        localStorage.setItem('highScore', pcScoreSpan.textContent)
    }
 }

 domTopScore.addEventListener('dblclick',()=>{
    if(domTopScore.textContent != '0 : 0'){
        if(confirm('Are you sure you want to reset Top Score?')){
            localStorage.removeItem('highScore');
            domTopScore.textContent= '0 : 0'
        }
    }
 })