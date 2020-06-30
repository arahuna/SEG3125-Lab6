$(document).ready(function() {

    $('form').on('submit', function() {
        $.ajax({
            type: 'POST',
            url:'/niceSurvey',
            data: $(this).serializeArray(),
            success: function(data) {
                $("#submitBtn").css("background-color", "#1E4716");
                $("#submitBtn").prop("disabled", "true");
                $("#submitBtn").text("Thank you!");
                $('#success').css('display', 'block')
            }
        });
        return false;
    })


});