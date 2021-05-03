class Board{

    constructor(){
        this.rows = 6;
        this.columns = 7;
        this.spaces = this.createSpaces();
    } 

    createSpaces(){
        let spacesArray = [];

        for(let x = 0; x < this.columns; x++){
            let row = [];
            for(let y = 0; y < this.rows; y++){
                row.push(new Space(x, y));
            }
            spacesArray.push(row);
        }
        return spacesArray;
    }

    drawHTMLBoard(){

        for(let x = 0; x < this.columns; x++){
            for(let y = 0; y < this.rows; y++){
                this.spaces[x][y].drawSVGSpace();
            }
        }  
              
    }

}