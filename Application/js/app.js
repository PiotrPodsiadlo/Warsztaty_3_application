$(function(){

    $.ajax({
        url: 'http://localhost:8282/books/',
        method: 'GET'
    }).done(function (response) {
        renderTitles(response);



    }).fail(function(){
        console.log("failed to connect API");
    })

})

divApp = $("#app");

renderTitles = function(resp) {
    Object.values(resp).forEach(function (obj) {                // biore wartości ze zmienna odpowiedzi response (która jest obiektem i dla kazdego jej elementu dodaję paragraf z tą wartością do html
        let newP = $(`<p>Tytuł książki ${obj.id} to</p> <h3 class="book-title">"${obj.title}"<div class="info"></div></h3>`);
        divApp.append(newP)
    })


    let h3Titles = document.querySelectorAll(".book-title");
    // let infoDivs = $('.info')
    h3Titles.forEach(function (elem) {
        console.log(elem);
        $(elem).on("click", function(event){
            let thisDiv = $(this).find("div");
            // $(thisDiv).css("visibility", "visible");
            $(thisDiv).fadeIn("slow");
            console.log(thisDiv);
        })
    })




}



