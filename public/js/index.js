
$(document).ready(function() {
    $('#submitComment').on("click", (e) => {
        e.preventDefault();
        console.log("Submit Button Clicked")
        let commentData = $("#textarea2").val().trim();
        let buttonData = $("#submitComment").data("id");
        let routeUrl = `/submit/${buttonData}`; 
        console.log(commentData);
        console.log(routeUrl);
        $.ajax({
            method: "PUT",
            url: routeUrl, 
            data: commentData,
        })
        .then((res) => {
            window.location.href = "/getall"
        })
      
      
    });
  
});



// $.ajax({
//     type: "POST",
//     url: url,
//     data: data,
//     success: success,
//     dataType: dataType
//   });