(function( $ ) {
    var settings;
    var currentCard;
    var prevCard = [];
    
    // Plugin definition.
    $.fn.decisionTree = function( options ) {
        var elem = $( this );
        settings = $.extend( {}, $.fn.decisionTree.defaults, options );
        
        elem.addClass(settings.containerClass);
        renderRecursive(settings.data, elem, "dctree-first");
        
        $('.dctree-prev').on('click', function() {
            showCard(prevCard.pop(), true);
        });

        currentCard = $('#dctree-first');
        currentCard.show();
    };
    
    
    $.fn.decisionTree.defaults = {
        data: null,
        animationSpeed: "slow",
        animation: "slide-left",
        containerClass: "dc-tree",
        cardClass: "dctree-card",
        messageClass: "dctree-message"
    };
    
    function renderRecursive(data, elem, id) {
        var container = $('<div></div>')
            .addClass(settings.cardClass)
            .addClass('col-xs-12');
        var message = $('<div></div>').addClass(settings.messageClass).append(data.message);
        container.append(message);
        
        if (id != null) {
            container.attr('id', id)
        }
        
        if (typeof data.decisions != "undefined") {
            var decisions = $('<div></div>').addClass('dctree-decisions');
            for(var i=0; data.decisions.length > i; i++) {
                var decision = data.decisions[i];
                var genId = guid();
                var grid = $('<div></div>').addClass('col-md-6');
                var answer = $('<div></div>')
                    .addClass("dctree-answer-" + i)
                    .append(decision.answer)
                    .on('click', function() {
                        getNextCard(this);
                    })
                    .attr('data-dctree-targetid', genId);
                if (typeof decision.class != "undefined") {
                    answer.addClass(decision.class);
                }
                grid.append(answer);
                decisions.append(grid);
                renderRecursive(decision, elem, genId);
            }
            container.append(decisions);
        }
        
            
        if (id != 'dctree-first') {
            var controls = $('<div></div>').addClass('dctree-controls col-md-12');
            controls.append($('<a href="javascrip:;" class="dctree-prev">< Back</a>'));
            container.append(controls);
        }
        
        elem.append(container);
    }
    
    function getNextCard(elem)
    {
        var e = $(elem);
        currentCard = e.parents('.' + settings.cardClass)[0];
        prevCard.push(currentCard.id);
        var nextCard = e.attr('data-dctree-targetid');    
        showCard(nextCard);
    }
    
    function showCard(id, backward)
    {
        var nextCard = $("#" + id);
        
        if (settings.animation == 'slide') {
            $(currentCard).slideUp(settings.animationSpeed, function(){
                nextCard.slideDown(settings.animationSpeed);
            });
        } else if (settings.animation == 'fade') {
            $(currentCard).fadeOut(settings.animationSpeed, function(){
                nextCard.fadeIn(settings.animationSpeed);
            });
        } else if (settings.animation == 'slide-left') {
            var left = {left: "-100%"};
            var card = $(currentCard);

            if (backward) {
                left = {left: "100%"};
            }
            card.animate(left, settings.animationSpeed, function(){
                card.hide();
            });

            if (nextCard.css('left') == "-100%" || nextCard.css('left') == "100%") {
                left.left = 0;
                nextCard.show().animate(left, settings.animationSpeed);
            } else {
                nextCard.fadeIn(settings.animationSpeed);
            }
        }
        
        currentCard = nextCard;
    }
    
    function guid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        });
    }
 
// End of closure.
 
})( jQuery );
