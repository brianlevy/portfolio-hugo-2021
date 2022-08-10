/* Yeah yeah yeah, don't laugh. I'm not a programmer */


$(document).ready(function(){
    setAOSdata();
    $("#rotating-text").Morphext({
        // The [in] animation type. Refer to Animate.css for a list of available animations.
        animation: "fadeIn",
        // An array of phrases to rotate are created based on this separator. Change it if you wish to separate the phrases differently (e.g. So Simple | Very Doge | Much Wow | Such Cool).
        separator: ";",
        // The delay between the changing of each phrase in milliseconds.
        speed: 2000,
        complete: function () {
            // Called after the entrance animation is executed.
        }
    });
    
    AOS.init({
        easing: 'ease-out-back',
        duration: 500
    });

/* Set AOS offsets and delays */


    function setAOSdata(){
        var width = $(window).width();

        //delays the offset when multiple images within grid items and project hilite images
        function AOSdata(offset, delay, $this) {
            var el = $($this);
            var aosOffset = offset;
            var aosDelay = delay;
            $(el).find(".grid-item-img, .project-img" ).each(function( index ) {
                $(this).attr('data-aos-offset', aosOffset);
                aosOffset += aosDelay;
            });
        };

        //Smaller offset on smaller device
        if (width < 568) { 
            $(".grid-item, .project-image").each(function( index ) {
                AOSdata(120, 30, this );
            });
            $(".img-gallery").each(function( index ) {
                $(this).find( "figure" ).filter(function( index ) {
                    return index % 2 === 0;    
                    }).each(function( index ){
                        AOSdata(120, 0, this);
                    });
                $(this).find( "figure" ).filter(function( index ) {
                    return index % 2 === 1;    
                        }).each(function( index ){
                        AOSdata(150, 0, this);
                    });
            });

        } else if (width > 568) {
            $(".grid-item, .project-image").each(function( index ) {
                AOSdata(240, 60, this);
            });
            //delays the offset for each row in gallery (3 across)
            $(".img-gallery").each(function( index ) {
                $(this).find( "figure" ).filter(function( index ) {
                    return index % 3 === 0;    
                    }).each(function( index ){
                        AOSdata(240, 0, this);
                    });
                $(this).find( "figure" ).filter(function( index ) {
                    return index % 3 === 1;    
                    }).each(function( index ){
                        AOSdata(306, 0, this);
                    });
                $(this).find( "figure" ).filter(function( index ) {
                    return index % 3 === 2;    
                    }).each(function( index ){
                        AOSdata(366, 0, this);
                    });
            });
        };
        //alert(width);
    };
    //Make sure offsets are correct if window is resized
    $(window).resize(function() {
        setAOSdata();
    });
});