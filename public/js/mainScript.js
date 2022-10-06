$(document).ready(function () {


    /*-------------------------------
        Accordion toggle script
    ---------------------------------*/
    $(".accordion_tab").click(function () {
        $(this).parent().toggleClass("active");
        $(this).toggleClass("active");
    });


    /*-------------------------------
             Calender script
    ---------------------------------*/
    $(".false").each(function () {
        var count = 0
        $(this).click(function () {
            count++;
            console.log(count);
            if (count == 1) {
                $(this).toggleClass("present");
                $(this).toggleClass("true");
            } else if (count == 2) {
                $(this).toggleClass("present");
                $(this).toggleClass("absent");
            } else if (count == 3) {
                $(this).toggleClass("absent");
                $(this).toggleClass("holiday");
            } else if (count == 4) {
                $(this).toggleClass("holiday");
                $(this).toggleClass("true");
                count = 0;
            }
        });
    });


    /*-------------------------------
        Attendance logic script
    ---------------------------------*/
    $(".accordion").each(function () {
        var present = 0, absent = 0, holiday = 0, percent = 0;
        $(this).click(function () {
            present = $('.accordion .accordion_content:eq(0) .present').length;
            absent = $('.accordion .accordion_content:eq(0) .absent').length;
            holiday = $('.accordion .accordion_content:eq(0) .holiday').length;
            console.log("present = " + present + " , absent = " + absent + " , holidays = " + holiday);
            percent = (present / (present + absent)) * 100;

            $('#present').html(present);
            $('#absent').html(absent);
            $('#total').html(present + absent);
            console.log("percent = " + percent);
            $('#percent').html(percent);

        });

    });


    /*-------------------------------
             Slick Slider script
    ---------------------------------*/
    $('.slider').slick({
        dots: true,
        infinite: false,
        // speed: 3000,
        slidesToShow: 1,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });


});