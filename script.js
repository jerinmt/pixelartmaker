let container = document.querySelector(".container");
const divRow = [];
const divSquare = [];
let size=8;
let color = '#000000';

function drawline(Event) {
    Event.target.style.opacity = `1`;
    Event.target.style.backgroundColor = `${color}`;
    Event.target.style.color = `${color}`;
}

function createGrid() {
    for(let i=0;i<size;i++) {
        divRow[i] = document.createElement("div");
        container.appendChild(divRow[i]);
        divRow[i].classList.add("gridRows");
        for(let j=0;j<size;j++) {
            divSquare[j] = document.createElement("div");
            divSquare[j].textContent = '.';
            divRow[i].appendChild(divSquare[j]);
            divSquare[j].classList.add("gridBoxes");
            divSquare[j].addEventListener('click', (Event) => {
                let x = Event.target.style.opacity;
                if(x==1) {
                    x = 0.6;
                }
                else if (x==0.6){
                    x = 0.2;
                } 
                else if (x==0.2) {
                    x = 1;
                }
                else {
                    x = 1;
                    Event.target.style.backgroundColor = `${color}`;
                    Event.target.style.color = `${color}`;
                }
                Event.target.style.opacity = `${x}`;
            }, false);
            divSquare[j].addEventListener('contextmenu', (Event) => {
                Event.preventDefault();
                Event.target.style.color = `black`;
                Event.target.style.backgroundColor = `white`;
                Event.target.style.opacity = 0.9;
            }, false);
        }
    }
    container.addEventListener('mousedown',() => {
        container.addEventListener('mouseover', drawline, false);
    }, false);            
    container.addEventListener('mouseup',() => {
        container.removeEventListener('mouseover', drawline, false);
    }, false);
}
createGrid();
function setResolution () {
    removeGrid();
    size = document.querySelector('select').value-0;
    if(size<0) {
        size = 1;
    }
    if(size>100) {
        size = 100;
    }
    createGrid();
}
document.querySelector("button").addEventListener('click', setResolution);
document.querySelector("select").addEventListener('change', setResolution);
document.querySelector("input").addEventListener('change', () => {
    color = document.querySelector('input').value;
});

function removeGrid() {
    for(let i=0;i<size;i++) {
        container.removeChild(divRow[i]);
    }
}
