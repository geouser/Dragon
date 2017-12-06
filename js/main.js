// Global parameters
window.params = {
    isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
    isIOS: /iPhone|iPad|iPod/i.test(navigator.userAgent)
};


/**
     *
     * Check if element exist on page
     *
     * @param el {string} jQuery object (#popup)
     *
     * @return {bool}
     *
*/
function exist(el){
    if ( $(el).length > 0 ) {
        return true;
    } else {
        return false;
    }
}


jQuery(document).ready(function($) {

    wow = new WOW(
        {
          offset:       200,         
          mobile:       false       
        }
    )
    wow.init();

    var mi = 0;
    $('.hidden-menu__nav li').each(function(index, el) {
      $(this).css({
        '-webkit-transition-delay': mi+'s',
        '-o-transition-delay': mi+'s',
        '-moz-transition-delay': mi+'s',
        'transition-delay': mi+'s'
      });
      var link = $(this).find('a');
      link.attr( 'data-letters', link.text() );
      mi += 0.1;
    });

     // parallax
    var initialLeft = '',
        initialTop = '';

    $('.parallax').mouseenter(function(event) {
        initialLeft = event.pageX;
        initialTop = event.pageY;
    });

    $('.parallax').mouseleave(function() {
        $(this).addClass('notActive').find('.layer').css({
            transform:'translateX(0px) translateY(0px)'
        });
    });

    $('.parallax').mousemove(function(e) {
        var leftDif = initialLeft - e.pageX,
            topDif = initialTop - e.pageY;

        $(this).removeClass('notActive').find('.layer-1').css({
            transform:'translateX(' + leftDif / 60 + 'px) translateY(' + topDif / 20 + 'px)'
        });
        $(this).find('.layer-2').css({
            transform:'translateX(' + leftDif / 120 + 'px) translateY(' + topDif / 40 + 'px)'
        });
        $(this).find('.layer-3').css({
            transform:'translateX(' + (leftDif / 140) * -1 + 'px) translateY(' + (topDif / 80)  * -1 + 'px)'
        });

    });
    // ========== end parallax
    
    /*---------------------------
                                  ADD CLASS ON SCROLL
    ---------------------------*/
    $(function() { 
        var $document = $(document),
            $element = $('.toggle-menu'),
            $element2 = $('header'),
            className = 'hasScrolled';

        $document.scroll(function() {
            $element.toggleClass(className, $document.scrollTop() >= 1);
            $element2.toggleClass(className, $document.scrollTop() >= 1);
        });
    });


    /*---------------------------
                                  File input logic
    ---------------------------*/
    $('input[type=file]').each(function(index, el) {
        $(this).on('change', function(event) {
            event.preventDefault();
            var placeholder = $(this).siblings('.placeholder');
        
            if ( this.files.length > 0 ) {
                if ( this.files[0].size < 5000000 ) {
                    var filename = $(this).val().split('/').pop().split('\\').pop();
                    if ( filename == '' ) {
                        filename = placeholder.attr('data-label');
                    }
                    placeholder.text(filename);
                } else {
                    alert('Maximum file size is 5Mb');
                }    
            } else {
                placeholder.text( placeholder.attr('data-label') );
            }
            
        });
    });
    
    /*---------------------------
                                PAGE ANCHORS
    ---------------------------*/
    $('.page-menu a, .anchor').click(function() {
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top - 50
        }, 800);
        return false;
    });

    /*---------------------------
                                  MENU TOGGLE
    ---------------------------*/
    $('.js-toggle-menu').on('click', function(event) {
        event.preventDefault();
        $(this).toggleClass('is-active');
        $('.hidden-menu').toggleClass('open');
    });



    /*---------------------------
                                  Fancybox
    ---------------------------*/
    $('.fancybox').fancybox({
        
    });


    /**
     *
     * Open popup
     *
     * @param popup {String} jQuery object (#popup)
     *
     * @return n/a
     *
    */
    function openPopup(popup){
        $.fancybox.open([
            {
                src  : popup,
                type: 'inline',
                opts : {}
            }
        ], {
            loop : false
        });
    }



    $('.video-slider').slick({
        arrows: true,
        dots: false
    })


    var time = new Date();
    var time = new Date( $('.presale-timer').attr('data-end') );
    $('.presale-timer').countdown({
        until: time,
        padZeroes: true
    }); 





    i=$("path#line1"),
    d=$("path#line2"),
    r=$("path#line3");

    $('.svg-lines').onScreen({
       container: window,
       direction: 'vertical',
       doIn: function() {
            var c=(new TimelineMax).add(TweenMax.to(i, .9, {strokeDashoffset:2e3, ease:Linear.easeNone})).
                                    add(TweenMax.to(d, .9, {strokeDashoffset:2e3, ease:Linear.easeNone})).
                                    add(TweenMax.to(r, .9, {strokeDashoffset:2e3, ease:Linear.easeNone})).
                                    add(TweenMax.from("path", 0, {strokeDashoffset:0, stroke:"#BD8E41", ease:Linear.easeNone}), 0);
       },
       doOut: function() {
            var c=(new TimelineMax).add(TweenMax.to(i, 0, {strokeDashoffset:1e3, ease:Linear.easeNone})).
                                    add(TweenMax.to(d, 0, {strokeDashoffset:1e3, ease:Linear.easeNone})).
                                    add(TweenMax.to(r, 0, {strokeDashoffset:1e3, ease:Linear.easeNone})).
                                    add(TweenMax.from("path", 0, {strokeDashoffset:0, stroke:"#BD8E41", ease:Linear.easeNone}), 0);
       },
       tolerance: 0,
       throttle: 50,
       toggleClass: 'onScreen',
       lazyAttr: null,
       debug: false
    });



    /*---------------------------
                                  Form submit
    ---------------------------*/
    $('.ajax-form').on('submit', function(event) {
        event.preventDefault();
        var data = new FormData(this);
        $(this).find('button').prop('disabled', true);
        $.ajax({
            url: theme.url + '/forms.php',
            type: 'POST',
            data: data,
            cache: false,
            contentType: false,
            processData: false,
            success: function(result) {
                if (result.status == 'ok') {
                    openPopup('#modal-popup-ok')
                } else {
                    openPopup('#modal-popup-error')
                }
            },
            error: function(result) {
                openPopup('#modal-popup-error');
            }
        }).always(function() {
            $('form').each(function(index, el) {
                $(this)[0].reset();
                $(this).find('button').prop('disabled', false);
            });
        });
    });


}); // end file