
$(document).ready(function() {
    $('#submitComment').on("click", (e) => {
        e.preventDefault();
        console.log("Submit Button Clicked")
        let textComments = $("#textarea2").val().trim();
        let buttonData = $("#submitComment").data("id");
        let routeUrl = `/articles/${buttonData}`; 
        console.log(textComments);
        console.log(routeUrl);
        $.ajax({
            type: "POST",
            url: routeUrl, 
            data: {
                body: textComments,
                article: buttonData
            }
         })
        .then((res) => {
            window.location.href = "/articles"
         })
    });
});



