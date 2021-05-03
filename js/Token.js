class Token{
    constructor(owner, index){
        this.owner = owner;
        this.id = `token-${index}-${owner.id}`;
        this.dropped = false;
        this.columnLocation = 0;
    }

    drawHTMLToken(){
        let tokenDiv = document.createElement('div');
        document.querySelector('#game-board-underlay').appendChild(tokenDiv);
        tokenDiv.setAttribute('id',this.id);
        tokenDiv.setAttribute('class','token');
        tokenDiv.style.backgroundColor = this.owner.color;
    }

    get htmlToken(){
        return document.getElementById(this.id);
    }

    get offsetLeft(){
        return this.htmlToken.offsetLeft;
    }

    moveLeft(){
        if(this.columnLocation > 0){
            this.htmlToken.style.left = this.offsetLeft - 76;
            this.columnLocation -= 1;
        }
    }

    moveRight(){
        if(this.columnLocation < 6){
            this.htmlToken.style.left = this.offsetLeft + 76;
            this.columnLocation += 1;
        }
    }

    drop(target, reset){
        this.dropped = true;
        
        $(this.htmlToken).animate({
            top: (target.y * target.diameter)
        }, 750, 'easeOutBounce', reset);
    }

}