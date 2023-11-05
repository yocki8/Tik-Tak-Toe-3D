'use strict'

let won = false;
let completed = true;
let active = 0;
let gridArr = Array(4).fill().map((arr)=> Array(4).fill('_'));
const body = document.querySelector("body");
const cells = document.querySelectorAll('.cell');
const center = document.querySelector('.center');
const win = document.querySelector('.win');
const cellContainer = document.querySelector('.container');
const stickContainer = document.querySelector('.stickContainer');
const reset = document.querySelector('.reset');
const winner = function(){
    cells.forEach((cell) => cell.style.cursor = 'default');
    cellContainer.style.cursor = 'default';
    win.style.padding = '100%';
    center.style.padding = '230px 10px';
    center.style.border = '3px outset whitesmoke';
}
reset.addEventListener('click',resetGame);

function resetGame() {
    won = false;
    completed = false;
    active = 0;
    gridArr = Array(4).fill().map((arr) => Array(4).fill('_'));
    cells.forEach((cell) => {
        cell.style.cursor = 'url(images/cross-cursor.svg),auto';
        const img = cell.querySelector('img');
        img.style.transition = 'opacity 1s';
        img.style.opacity = 0;
    });
    win.style.padding = '0';
    center.style.padding = '0';
    body.style.background = 'rgb(255,0,0,0.7)';
    
    setTimeout(()=>{
        center.style.border = 'none';
        cells.forEach((cell) => {
            const img = cell.querySelector('img');
            img.style.transition = '';
            img.style.opacity = 1;
            img.src='';
          });
        completed=true;
        center.classList.remove('dia--1', 'dia--2', 'row--1', 'row--2', 'row--3', 'col--1', 'col--2', 'col--3');
    },1000);
}

body.addEventListener('click',(e)=>{
    let i,j;

    if(won)
    {   
        resetGame();
    }

    if(gridArr[2][2]!='_' && (gridArr[1][1]===gridArr[2][2] && gridArr[2][2]===gridArr[3][3]))
    {
        center.classList.add('dia--1');
        won=1;
    }

    if(gridArr[2][2]!='_' && (gridArr[1][3]===gridArr[2][2] && gridArr[2][2]===gridArr[3][1]))
    {
        center.classList.add('dia--2');
        won=1;
    }


    for(i=1;i<=3;i++)
    {
        if(gridArr[i][i]!='_'){

            if(gridArr[i][1]===gridArr[i][2] && gridArr[i][2]===gridArr[i][3])
            {
                center.classList.add(`row--${i}`);
                won = 1;
            }
            
            else if(gridArr[1][i]===gridArr[2][i] && gridArr[2][i]===gridArr[3][i])
            {
                center.classList.add(`col--${i}`);
                won = 1;
            }
        }
    }

    if(!won){

        let flag=1;
        for(i=1;i<=3;i++)
        {
            for(j=1;j<=3;j++)
            {
                if(gridArr[i][j]==='_') flag=0;
            }
        }

        if(flag) resetGame();
    }
    if(won)
    {
        winner();
    };


})

const changePlayer = function(e,p){

        body.style.background = p[0];
        cells.forEach((cell)=> cell.style.cursor = p[1]);
        const img = e.target.closest('.cell').querySelector('img');
        img.style.opacity=1;
        img.src = p[2];

}

cells.forEach((cell)=>{
    
    cell.addEventListener("click", (e) => {
        
        const x = Number(e.target.closest('.cell').dataset.x);
        const y = Number(e.target.closest('.cell').dataset.y);
        
        if(gridArr[x][y]==='_' && !won && completed){
        active = !active;
        if(active){
            const background = "rgb(85, 136, 255,0.7)";
            const cursorType = "url(images/zero-cursor.svg),auto";
            const svg = "images/cross.svg";
            gridArr[x][y] = 'X';
            changePlayer(e,[background,cursorType,svg]);
        }
        
        else{
            const background ="rgb(255,0,0,0.7)";
            const cursorType = "url(images/cross-cursor.svg),auto";
            const svg = "images/zero.svg";
            gridArr[x][y] = 'O';
            changePlayer(e,[background,cursorType,svg]);
        }
    }
});
    
    cell.addEventListener('mouseenter',(e)=>{

        const x = Number(e.target.closest('.cell').dataset.x);
        const y = Number(e.target.closest('.cell').dataset.y);

        if(gridArr[x][y]==='_' && !won && completed){
            const img = e.target.closest('.cell').querySelector('img');
            img.src = active ? 'images/zero.svg' :'images/cross.svg';
            img.style.opacity = 0.2;
        }
    })

    cell.addEventListener('mouseleave',(e)=>{
        
        const x = Number(e.target.closest('.cell').dataset.x);
        const y = Number(e.target.closest('.cell').dataset.y);
        
        if(gridArr[x][y]==='_' && !won && completed){
            const img = e.target.closest('.cell').querySelector('img');
            img.src = '';
            img.style.opacity = 1;
        }
    })
})




