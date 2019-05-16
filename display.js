class Display{
    constructor(){
        this.accuracy = '0.00%';
    }

    display_stats(attempts, matchcounter, games_played){
        this.calculate_stats(attempts, matchcounter);
        $('.attempts').find('.value').text(attempts);
        $('.accuracy').find('.value').text(this.accuracy);
        $('.gamePlayed').find('.value').text(games_played);
    }

    calculate_stats(attempts,matchcounter){
        if( attempts === 0){
            return 0;
        } else {
        this.accuracy = (matchcounter / attempts *100).toFixed(2) +'%';
            return this.accuracy;
        }
    }

    show_matchText(){
        $('.popuptext').addClass('showMatch');
        setTimeout(function(){
        $('.popuptext').removeClass('showMatch');
        },2500); 
    }

    add_rabbitEggs(){
        var rabbitEggs = $('<img>',{
            attr:{
                src: 'images/rabbitegg.png'
            },
            class: 'rabbiteggs'
        });
        $('.rabbiteggsdiv').append(rabbitEggs);
    }

    display_win(){
        $('.winModal').css('display','block');
        setTimeout(function(){
            $('.winningText').text('Happy Easter!')
            $('.giftegg').attr('src','images/rabbit_in_egg.png').css('animation','rotatemove 2s infinite');
        },4500)
    }

    close_modal(){
        $('.winModal').css('display','none');
        $('.giftegg').attr('src','images/giftegg.png').css('animation','giftegg 0.5s infinite');
    }
}