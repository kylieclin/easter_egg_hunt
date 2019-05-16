class Cards{
    constructor(card , back, gamecallback){
        this.front = card;
        this.back = back
        this.callback = {
            click : gamecallback
        }
        this.domElement= {
            parent: null,
            front: null,
            back: null
        }
        this.first = false;
        this.handle_click = this.handle_click.bind( this );
    }

    handle_click(){
        if(!this.first){
          this.callback.click(this);  
        }
    }

    create_cards(){            
        this.domElement.parent = $('<div>').addClass('card');
        this.domElement.parent.click(this.handle_click);
        this.domElement.front = $('<img>',{
            attr: {
                'src': this.front
            },
            class: 'frontimg'
        });
        this.domElement.back = $('<img>',{
            attr:{
                'src': this.back,
            },
            class: 'backimg'
        });
        
        var frontDiv = $('<div>').addClass('front');
        var backDiv = $('<div>').addClass('back');
        var cardDiv = $('<div>').addClass('cardContainer');
        $(backDiv).append(this.domElement.back);
        $(frontDiv).append(this.domElement.front);
        $(this.domElement.parent).append(frontDiv, backDiv);
        var card = $(cardDiv).append(this.domElement.parent);
        return card;
    }

    flip_card(){
        this.domElement.back.hide(); 
    }

    flip_back(){
        $('.backimg').show();
    }
    
    get_clickedCard(){
        return this.front;  
    }
}