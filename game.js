class MemoryMatchGame{
    constructor(cardsdata){
        this.frontCardsData= cardsdata.front;
        this.backCardData = cardsdata.back;
        this.matchForWin = this.frontCardsData.length;
        this.first_card_clicked = null;
        this.second_card_clicked = null;
        this.match_counter = null;
        this.attempts = 0;
        this.games_played = 0;
        this.clickedCard = [];
        this.checking = false;
        this.autoOn = false;

        this.display = new Display();
        this.backgroundAudio = new Audio('audio/twodots.mp3');
        this.matchAudio = new Audio('audio/suspension.mp3');
        this.winAudio= new Audio('audio/Cartoon_Bank_Heist_Sting.mp3');

        this.generate_cards = this.generate_cards.bind(this);
        this.click_handler = this.click_handler.bind(this);
        this.reset_stats = this.reset_stats.bind(this);
        this.game_won = this.game_won.bind(this);
        this.play_audio = this.play_audio.bind(this);
        this.reset_checking = this.reset_checking.bind(this);
    }

    generate_cards(){
        $('.openModal').remove();
        $('.cardContainer').remove();
        $('.rabbiteggs').remove();
        var copyArr = this.frontCardsData.concat(this.frontCardsData);
        var copyArrLength =  copyArr.length;
        while(copyArrLength--){
            var index = Math.floor(Math.random()* copyArrLength);
            var cards = new Cards(copyArr[index],this.backCardData,this.click_handler);
            var cardContainerDiv = cards.create_cards();
            $('.game-area').append(cardContainerDiv);
            copyArr.splice(index,1);
        }
    }

    add_eventListener(){
        $('.openModal').on('click',this.generate_cards);  
        $('.close').on('click',this.display.close_modal); 
        $('.reset').on('click', this.reset_stats);
        $('.chocolateeggdiv').on('click', this.play_audio);   
    }

    click_handler(card){
        if(!this.checking){
            card.flip_card();            
            if( !this.first_card_clicked){ 
                this.first_card_clicked = card.get_clickedCard();
                this.clickedCard.push(card);
                card.first = true;
            } else {
                this.second_card_clicked = card.get_clickedCard();
                this.clickedCard.push(card);
                this.checking = true;
                this.check_if_match(card);
                this.disable_cards();
                this.first_card_clicked = null;
                this.attempts++;
                this.render_status();
            } 
        }
    }

    disable_cards(){
        $('.card').off('click', this.click_handler);
    }

    disable_clickForMatch(){
        $('.match').off('click');
    } 

    check_if_match(card){
        if(this.first_card_clicked === this.second_card_clicked){
            this.card_match();  
        } else { 
            setTimeout(card.flip_back, 1200);
            this.clickedCard[0].first = false;
        }
        setTimeout(this.reset_checking, 1200);
        this.clickedCard =[];
    }

    reset_checking(){
        this.checking = false;
    }

    card_match(){
        if(this.autoOn){
            this.matchAudio.play(); 
        }
        this.clickedCard[0].domElement.parent.addClass('match');
        this.clickedCard[1].domElement.parent.addClass('match');
        this.clickedCard[0].domElement.back.remove();
        this.clickedCard[1].domElement.back.remove();
        this.disable_clickForMatch();
        this.display.add_rabbitEggs();
        this.display.show_matchText();
        this.match_counter++;
    
        if(this.match_counter === this.matchForWin){ 
           setTimeout(this.game_won, 500);
        }
    }

    game_won(){
        if(this.autoOn){
            this.backgroundAudio.pause();
            this.winAudio.volume = 0.3;
            this.winAudio.play();
        }
        this.display.display_win();
    }

    play_audio(){
        this.autoOn = !this.autoOn;
        if(this.autoOn){
            this.backgroundAudio.play(); 
        } else {
            this.backgroundAudio.pause();
        }
    }

    reset_stats(){
        this.games_played++;
        this.attempts = 0;
        this.match_counter = null;
        this.display.accuracy ='0.00%';
        this.render_status();
        this.generate_cards();
    }
    
    render_status(){
        this.display.display_stats(this.attempts, this.match_counter, this.games_played);
    }
}