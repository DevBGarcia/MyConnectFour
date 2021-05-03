class Game{
    constructor(){
        this.board = new Board();
        this.players = this.createPlayers();
        this.ready = false;
    }
    
    createPlayers(){
        let players = [
            new Player("Byron", 1,'#e15258',true),
            new Player("Brianne", 2, '#e59a13')];
        return players;
    }

    startGame(){
        this.board.drawHTMLBoard();
        this.activePlayer.activeToken.drawHTMLToken();
        this.ready = true;
    }

    handleKeydown(keydownEvent){
        if(this.ready){
            console.log(keydownEvent.key);
            if(keydownEvent.key === "ArrowLeft"){
                this.activePlayer.activeToken.moveLeft();
            }else if(keydownEvent.key === "ArrowRight"){
                this.activePlayer.activeToken.moveRight();
            }else if(keydownEvent.key === "ArrowDown"){
                this.playToken(this.activePlayer.activeToken);
            }
        }else{
            console.log("Game is Not Ready!");
        }
                
    }

    get activePlayer(){
        return this.players.find( (player) => player.active);  
    }

    playToken(token){     
        let spaces = this.board.spaces;
        let targetColumn = spaces[token.columnLocation];
        let targetSpace = null;

        for(let space of targetColumn){
            if(space.token === null){
                targetSpace = space;
            }
        }

        if(targetSpace !== null){
            const game = this;
            game.ready = false;

            token.drop(targetSpace, function(){
                game.updateGameState(token, targetSpace);
            });
        }
    }

    checkForWin(target){
        const owner = target.token.owner;
        let win = false;
    
        // vertical
        for (let x = 0; x < this.board.columns; x++ ){
            for (let y = 0; y < this.board.rows - 3; y++){
                if (this.board.spaces[x][y].owner === owner && 
                    this.board.spaces[x][y+1].owner === owner && 
                    this.board.spaces[x][y+2].owner === owner && 
                    this.board.spaces[x][y+3].owner === owner) {
                        win = true;
                }           
            }
        }
    
        // horizontal
        for (let x = 0; x < this.board.columns - 3; x++ ){
            for (let y = 0; y < this.board.rows; y++){
                if (this.board.spaces[x][y].owner === owner && 
                    this.board.spaces[x+1][y].owner === owner && 
                    this.board.spaces[x+2][y].owner === owner && 
                    this.board.spaces[x+3][y].owner === owner) {
                        win = true;
                }           
            }
        }
    
        // diagonal
        for (let x = 3; x < this.board.columns; x++ ){
            for (let y = 0; y < this.board.rows - 3; y++){
                if (this.board.spaces[x][y].owner === owner && 
                    this.board.spaces[x-1][y+1].owner === owner && 
                    this.board.spaces[x-2][y+2].owner === owner && 
                    this.board.spaces[x-3][y+3].owner === owner) {
                        win = true;
                }           
            }
        }
    
        // diagonal
        for (let x = 3; x < this.board.columns; x++ ){
            for (let y = 3; y < this.board.rows; y++){
                if (this.board.spaces[x][y].owner === owner && 
                    this.board.spaces[x-1][y-1].owner === owner && 
                    this.board.spaces[x-2][y-2].owner === owner && 
                    this.board.spaces[x-3][y-3].owner === owner) {
                        win = true;
                }           
            }
        }
    
        return win;
    }

    switchPlayers(){
        for(let player of this.players){
            player.active = (player.active === true ? false : true);
        }
    }

    gameOver(message){
        document.getElementById("game-over").style.display = "block";
        document.getElementById("game-over").textContent = message;
    }

    updateGameState(token, target){
        target.mark(token);

        if(!this.checkForWin(target)) {
            this.switchPlayers();

            if(this.activePlayer.checkTokens()){
                this.activePlayer.activeToken.drawHTMLToken();
                this.ready = true;
            } else {
                this.gameOver("No more tokens");
            }
        } else {
            this.gameOver(`${target.owner.name} wins!`);
        }
        
    }
    

}