(function(){

  $.fn.popbox = function(options){
    var settings = $.extend({
      selector      : this.selector,
      open          : '.open',
      box           : '.box',
      arrow         : '.arrow',
      arrow_border  : '.arrow-border',
      close         : '.close',
      // if popbox float when resizing window, will alter container width
      dynamic_width: false
    }, options);

    var methods = {
      open: function(event){
        event.preventDefault();

        var pop = $(this);
        var box = $(this).parent().find(settings['box']);

        box.find(settings['arrow']).css({'left': box.width()/2 - 10});
        box.find(settings['arrow_border']).css({'left': box.width()/2 - 10});

        if(box.css('display') == 'block'){
          methods.close();
        } else {
          box.css({'display': 'block', 'top': 10, 'left': ((pop.parent().width() * 0.5) -box.width() * 0.5 )});
        }
      },

      close: function(){
        $(settings['box']).fadeOut("fast");
      }
    };

    $(document).bind('keyup', function(event){
      if(event.keyCode == 27){
        methods.close();
      }
    });

    $(document).bind('click', function(event){
      if(!$(event.target).closest(settings['selector']).length){
        methods.close();
      }
    });

    // setup css
    $(this).find(".collapse").css({
      position: "relative" 
    });

    $(this).find(settings["box"]).css({
      display: "none",
      position: "absolute" 
    });

    $(this).find(settings["arrow"]).css({
      "width": "0",
      "height": "0",
      "border-left": "11px solid transparent",
      "border-right": "11px solid transparent",
      "border-bottom-width": "11px",
      "border-bottom-style": "solid",
      "position": "absolute",
      "left": "1px",
      "top": "-10px",
      "z-index": "1001"
    });

    $(this).find(settings["arrow_border"]).css({
      "width": "0",
      "height": "0",
      "border-left": "11px solid transparent",
      "border-right": "11px solid transparent",
      "border-bottom-width": "11px",
      "border-bottom-style": "solid",
      "position":"absolute",
      "top": "-12px",
      "z-index":"1000"
    });


    return this.each(function(){
      if ( settings['dynamic_width'] ) {
        // Width needs to be set otherwise popbox will not move when window resized.
        $(this).css({'width': $(settings['box']).width()}); 
      }
      $(settings['open'], this).bind('click', methods.open);
      $(settings['open'], this).parent().find(settings['close']).bind('click', function(event){
        event.preventDefault();
        methods.close();
      });
    });
  }

}).call(this);
