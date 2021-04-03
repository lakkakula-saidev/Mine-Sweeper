let gridNums 
let innerValue 
let totalBombs = 0
let totalValue1 = 0
let totalValue2 = 0
let totalValue3 = 0
let Score 
let gridSize
let nClicks

function createGrid(){

    innerValue = 0
    let newGrid = document.createElement('div')
    newGrid.className= 'mainDiv'
    newGrid.style.marginBottom = '50px'
    document.body.appendChild(newGrid)
        for(let i=1; i<=gridSize; i++){

        for(let j=1; j<=gridSize;j++){

            let gridElement = document.createElement('div')
            gridElement.id = `${innerValue}`
            gridElement.className = 'gridDiv'
            gridElement.style.display = 'inline-block'
            gridElement.style.height = '50px'
            gridElement.style.width= '50px'
            gridElement.style.textAlign = 'center'
            gridElement.style.borderStyle = "solid"
            gridElement.style.borderWidth = '1px'
            
            newGrid.appendChild(gridElement)
            innerValue +=1
        }
        newGrid.innerHTML+='<br>'
    }
    document.body.appendChild(newGrid)
    createOnclick()
    randomMatrix()
    
}

function createScoreBox(){
    let scoreDiv = document.createElement('div')
    scoreDiv.innerHTML = `<p><h3>Score: <p id='score'>${Score}</p> </h3></p>
      <p><h3>Number of clicks remaining: <p id ='clicks'> ${nClicks}</p></h3></p>`
      
      scoreDiv.style.maxWidth = `${gridSize*50 + (gridSize*2) }px`
    document.body.appendChild(scoreDiv)

}

function createOnclick(){

        let idValue = 0
        for(let i=1; i<=gridSize; i++){

        for(let j=1; j<=gridSize;j++){

            document.getElementById(`${idValue}`).addEventListener('click',function(element){
                
            displayElementValue(element)
            })

            idValue += 1
        }
    }
}

function displayElementValue(element){

    let ElementId = parseInt(element.target.id)
    let gridElement = document.getElementById(`${ElementId}`)
    let gridNumsIndex = gridNums.indexOf(ElementId)

    if(0<= gridNumsIndex && gridNumsIndex < totalBombs){
        gridElement.innerHTML = `<img src="bomb.jpg" height='50' width='50' alt="">`
        Score = Score-10
        let scoreElement = document.getElementById('score')
        scoreElement.innerHTML = Score

    }else if(totalBombs<= gridNumsIndex && gridNumsIndex < totalBombs+totalValue3){
        nClicks -=1
        gridElement.innerHTML = `<p>3</p>`
        gridElement.style.backgroundColor = 'white'

    }else if(totalBombs+totalValue3<= gridNumsIndex && gridNumsIndex < totalBombs+totalValue3+totalValue2){
        nClicks -=1
        gridElement.innerHTML = `<p>2</p>`
        gridElement.style.backgroundColor = 'white'
    }else{
        nClicks -=1
        gridElement.innerHTML = `<p>1</p>`
        gridElement.style.backgroundColor = 'white'
    }
        
        if(Score <= 0 ){
            Score = Math.floor((gridSize*gridSize)/2.5) * 10
            nClicks = Math.floor((gridSize*gridSize)/2.5)
            let scoreElement = document.getElementById('score')
            scoreElement.innerHTML = Score
            let mainDiv = document.getElementsByClassName('mainDiv')[0]
            console.log(mainDiv)
            document.body.removeChild(mainDiv)
            createGrid()
            randomMatrix()
            
        }else if(nClicks ===0){

            document.body.innerHTML = `<h1 style='text-align= center;'>You WON!!!</h1>`
        }
    let clicksElement = document.getElementById('clicks')
    clicksElement.innerHTML = nClicks

}


  function shuffle(a) {
    for (let k = a.length - 1; k > 0; k--) {
      const j = Math.floor(Math.random() * (k + 1));
      [a[k], a[j]] = [a[j], a[k]];
    }
    return a;
  }


function randomMatrix(){
    gridNums= []
    for(let i=0; i< innerValue; i++){
        gridNums.push(i)
    }
    gridNums = shuffle(gridNums)
 
    totalBombs = Math.floor(innerValue/2.5)
    totalValue1 = Math.floor(innerValue/4)
    totalValue2 = Math.floor(innerValue/4)
    totalValue3 = innerValue- totalBombs-totalValue2-totalValue3

}

function createNewHeading(){
    let newHeading = document.createElement('h1')
    newHeading.innerHTML = 'Mine Sweepers'
    document.body.appendChild(newHeading)
    createScoreBox()
    createGrid()
}


function instructionFunction(){
     gridSize = parseInt(document.getElementById('fsize').value)
     Score = Math.floor((gridSize*gridSize)/2.5) * 10
     nClicks = Math.floor((gridSize*gridSize)/2.5)
    document.body.removeChild(document.getElementById('initial'))
    let instructionElement = document.createElement('div')
    instructionElement.innerHTML = `<div id="instructions">
      <h3>Below are the instructions of the MineSweeper game</h3>
      <ol>
        <li>There are <strong>${Math.floor((gridSize*gridSize)/2.5)}</strong> mines placed randomly in the grid.<br> You are allowed to click on the cells of the board randomly</li>
        <li>You are awarded <strong>${Math.floor((gridSize*gridSize)/2.5)}</strong>  x 10 points at the start of the game</li>
        <li>
          Your scored will be reduced by 10 points if any of the mines planted
          are clicked
        </li>
        <li>
          You need to click the board <strong>${Math.floor((gridSize*gridSize)/2.5)}</strong> -times without mines before your score is reduced to
          ZERO
        </li>
        <li>Click the <b>'Start Game'</b> button to start the play</li>
      </ol>
      <input type="button" onclick='startGame()' id="start" value="Start Game" />
    </div>`
    document.body.appendChild(instructionElement)
    
}

 function startGame(){
    let heading = document.getElementsByTagName('h1')
    let introDiv = document.getElementById('instructions')
    heading[0].remove()
    introDiv.remove()
    createNewHeading()
}

