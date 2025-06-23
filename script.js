let container = document.querySelector(".container");
const divRow = [];
const divSquare = [];
let size = 16;
let color = '#000000';

function drawline(Event) {
    Event.target.style.backgroundImage = `none`;
    Event.target.style.opacity = `1`;
    Event.target.style.backgroundColor = `${color}`;
}

function createGrid() {
    for(let i=0;i<size;i++) {
        divRow[i] = document.createElement("div");
        container.appendChild(divRow[i]);
        divRow[i].classList.add("gridRows");
        for(let j=0;j<size;j++) {
            divSquare[j] = document.createElement("div");
            divRow[i].appendChild(divSquare[j]);
            divSquare[j].classList.add("gridBoxes");
            divSquare[j].addEventListener('click', (Event) => {
                let x = Event.target.style.opacity;
                if(x==1) {
                    x = 0.6;
                }
                else if (x==0.6){
                    x = 0.4;
                } 
                else if (x==0.4) {
                    x = 1;
                }
                else {
                    x = 1;
                    Event.target.style.backgroundImage = `none`;
                    Event.target.style.backgroundColor = `${color}`;
                }
                Event.target.style.opacity = `${x}`;
            }, false);
            divSquare[j].addEventListener('contextmenu', (Event) => {
                Event.preventDefault();
                Event.target.style.backgroundImage = `radial-gradient(black, white)`;
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
document.querySelector(".resetButton").addEventListener('click', setResolution);
document.querySelector("select").addEventListener('change', setResolution);
document.querySelector("input").addEventListener('change', () => {
    color = document.querySelector('input').value;
});

function removeGrid() {
    for(let i=0;i<size;i++) {
        container.removeChild(divRow[i]);
    }
}

function downloadFile(content, filename, contentType) {
    const blob = new Blob([content], { type: contentType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

document.querySelector(".downloadButton").addEventListener('click', () => {
    let fileContent = `<svg width = "${size}" height = "${size-1}" xmlns = "http://www.w3.org/2000/svg">`;
    const grid = document.querySelectorAll('.gridBoxes');
    let start, end, currentColor, currentOpacity;
    for(let i=0; i < size; i++) {
        for(let j=0; j < size; j++) {
            let k = i * size + j;
            if(grid[k].style.opacity == '1' || grid[k].style.opacity == '0.6' || grid[k].style.opacity == '0.2') {
                currentColor = grid[k].style.backgroundColor;
                currentOpacity = grid[k].style.opacity;
                start = j;
                while ((k != size * size - 1) && currentOpacity == grid[i * size + j + 1].style.opacity && 
                    currentColor == grid[i * size + j + 1].style.backgroundColor && (j != (size - 1))) {
                    j += 1;
                    k += 1;
                }
                end = j;
                fileContent += `<line x1="${start}" y1="${i}" x2="${end + 1}" y2="${i}" stroke="${currentColor}" opacity="${currentOpacity}"/>` ;
            }
        }
    }
    fileContent += '</svg>';
    const fileName = "PicArt.svg";
    downloadFile(fileContent, fileName, "text/plain");
});

document.querySelector(".OKButton").addEventListener('click', () => {
    document.querySelector(".intro").style.display = 'none';
});
