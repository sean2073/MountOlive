    (function(window){
        $.fn.stopAtTop= function () {
            var $this = this,
                $window = $(window),
                thisPos = $this.offset().top,
                setPosition,
                under,
                over;
        
            under = function(){
                if ($window.scrollTop() < thisPos) {
                    $this.css({
                        position: 'absolute',
                        top: ""
                    });
                    setPosition = over;
                }
            };
            
            over = function(){
                if (!($window.scrollTop() < thisPos)){
                    $this.css({
                        position: 'fixed',
                        top: 0
                    });
                    setPosition = under;
                }
            };
            
            setPosition = over;
            
            $window.resize(function()
            {
                bumperPos = pos.offset().top;
                thisHeight = $this.outerHeight();
                setPosition();
            });
            
            $window.scroll(function(){setPosition();});
            setPosition();
        };
        })(window);
        $('#home-p1').stopAtTop();
        $('#home-p2').stopAtTop();
        $('#home-p3').stopAtTop();
       /* $('#home-p3').stopAtTop();*/
        
