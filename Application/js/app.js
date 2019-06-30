$(function(){

    $.ajax({
        url: 'http://localhost:8282/books/',
        method: 'GET'
    }).done(function (response) {
        renderTitles(response);
        console.log(response);


    }).fail(function(){
        console.log("failed to connect API");
    })

})

divApp = $("#app");

renderTitles = function(resp) {
    Object.values(resp).forEach(function (obj) {                // biore wartości ze zmienna odpowiedzi response (która jest obiektem i dla kazdego jej elementu dodaję paragraf z tą wartością do html

        let newP = $(`<p>Tytuł książki ${obj.id} to <h3 id="book-title">"${obj.title}"</h3></p><div id="info"></div>`);
        divApp.append(newP)
    })

}