let container = document.querySelector(".container");
const divRow = [];
const divSquare = [];
let size=16;

function createGrid() {
    for(let i=0;i<size;i++) {
        divRow[i] = document.createElement("div");
        container.appendChild(divRow[i]);
        divRow[i].classList.add("gridRows");
        for(let j=0;j<size;j++) {
            divSquare[j] = document.createElement("div");
            divRow[i].appendChild(divSquare[j]);
            divSquare[j].classList.add("gridBoxes");
            divSquare[j].addEventListener('mouseenter', (Event) => {
                let x = Event.target.style.opacity;
                if(x<1) {
                    x = (x-0) + 0.2;
                }
                else {
                    x=1;
                } 
                Event.target.style.opacity = `${x}`;
            });
            divSquare[j].addEventListener('click', (Event) => {
                Event.target.style.opacity = `0`;
            });
        }    
    }
}
createGrid();
document.querySelector("button").addEventListener('click', ()=> {
    removeGrid();
    size = prompt("Enter the required resolution(Min:1 Max:100):")-0;
    if(size<0) {
        size = 1;
    }
    if(size>100) {
        size = 100;
    }
    createGrid();
});

function removeGrid() {
    for(let i=0;i<size;i++) {
        container.removeChild(divRow[i]);
    }
}
