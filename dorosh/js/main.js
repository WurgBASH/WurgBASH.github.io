jQuery(document).ready(function ($) {
    $('.video-reviews__slider').slick({
        speed: 1400,
        dots: false,
        adaptiveHeight: false,
        // prevArrow: '<button type="button" class="slick-home-control slick-home-control-prev"><img src="../icons/video_slider_left_arrow.svg" alt="arrow_right"></button>',
        // nextArrow: '<button type="button" class="slick-home-control slick-home-control-next"><img src="../icons/video_slider_right_arrow.svg" alt="arrow_left"></button>',
        infinite: true,
        autoplay: false,
        prevArrow: $('.video-reviews-arrow-prev'),
        nextArrow: $('.video-reviews-arrow-next'),
    });


    // Inline popups
    $('#success-stories-popups').magnificPopup({
        delegate: 'a',
        showCloseBtn: false,
        removalDelay: 500, //delay removal by X to allow out-animation
        callbacks: {
            beforeOpen: function () {
                this.st.mainClass = this.st.el.attr('data-effect');
            },
            open: function () {
                $('#close-btn').on('click', function (event) {
                    event.preventDefault();
                    $.magnificPopup.close();
                });
            }
        },
        midClick: true // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
    });


    // Hinge effect popup
    $('a.hinge').magnificPopup({
        mainClass: 'mfp-with-fade',
        removalDelay: 1000, //delay removal by X to allow out-animation
        callbacks: {
            beforeClose: function () {
                this.content.addClass('hinge');
            },
            close: function () {
                this.content.removeClass('hinge');
            }
        },
        midClick: true
    });
});