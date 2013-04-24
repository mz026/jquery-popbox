(function(){

  $.fn.popbox = function(options){
    var selector = this.selector;

    return this.each(function(){
      var settings = $.extend({
        selector      : selector,
        open          : '.open',
        box           : '.box',
        arrow         : '.arrow',
        arrow_border  : '.arrow-border',
        close         : '.close',
        // if popbox float when resizing window, will alter container width
        dynamic_width: false,
        placement: 'bottom'
      }, options);

      var box = $(this).find(settings['box']);
      var arrowStyle, arrowBorderStyle;
      var element = $(this);

      var methods = {
        open: function(event){
          event.preventDefault();

          var openElement = $(this) 
            , parent = openElement.parent()
            , normalLeftOffset = (box.width() - parent.width()) / 2
            , parentLeftOffset = parent.offset().left
            , parentRightOffset = $(window).width() 
              - parentLeftOffset - parent.outerWidth()
            , boxCss, topOffset;

          if ( settings.placement === 'top' ) {
            topOffset = box.height() * (-1) - $(this).height() - 8;
          } else {
            topOffset = 10;
          }

          boxCss = {
            "display": "block"
            , "top": topOffset
          };

          if(box.css('display') == 'block'){
            methods.close();
          } else {
            if ( parentLeftOffset < normalLeftOffset ) {
              boxCss["left"] = parentLeftOffset < 0 ? 0 : - parentLeftOffset;
            } else if ( parentRightOffset < normalLeftOffset ) {
              boxCss["right"] = parentRightOffset < 0 ? 0 : - parentRightOffset;
            } else {
              boxCss["left"] = - normalLeftOffset;
            }
            box.css(boxCss);
            setupArrow();
          }
        },

        close: function(){
          box.fadeOut("fast");
        }
      };

      $(document).bind('keyup', function(event){
        if(event.keyCode == 27){
          methods.close();
        }
      });

      $(document).bind('click', function(event){
        //TODO fix this if no selector
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

      arrowStyle = {
        "width": "0",
        "height": "0",
        "border-left": "11px solid transparent",
        "border-right": "11px solid transparent",
        "position": "absolute",
        "z-index": "1001"
      };
      arrowBorderStyle = {
        "width": "0",
        "height": "0",
        "border-left": "11px solid transparent",
        "border-right": "11px solid transparent",
        "position":"absolute",
        "z-index":"1000"
      };

      function setupArrow () {
        arrowStyle["left"] = box.width() / 2 - 10;
        arrowBorderStyle["left"] = box.width() / 2 - 10;
        if ( settings.placement === "top" ) {
          arrowStyle["border-top-style"] = "solid";
          arrowStyle["border-top-width"] = "11px";
          arrowStyle["top"] = box.height() - 1;

          arrowBorderStyle["border-top-style"] = "solid";
          arrowBorderStyle["border-top-width"] = "11px";
          arrowBorderStyle["top"] = box.height() + 1;
        } else {
          arrowStyle["border-bottom-style"] = "solid";
          arrowStyle["border-bottom-width"] = "11px";
          arrowStyle["top"] = "-10px";

          arrowBorderStyle["border-bottom-style"] = "solid";
          arrowBorderStyle["border-bottom-width"] = "11px";
          arrowBorderStyle["top"] = "-12px";
        }
        element.find(settings["arrow"]).css(arrowStyle);
        element.find(settings["arrow_border"]).css(arrowBorderStyle);
      }

      if ( settings['dynamic_width'] ) {
        // Width needs to be set otherwise popbox will not move when window resized.
        $(this).css({'width': box.width()}); 
      }
      $(settings['open'], this).bind('click', methods.open);
      $(settings['open'], this).parent().find(settings['close']).bind('click', function(event){
        event.preventDefault();
        methods.close();
      });
    });
  }

}).call(this);
