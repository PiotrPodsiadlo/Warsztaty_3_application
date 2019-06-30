$(function(){

    $.ajax({
        url: 'http://localhost:8282/books/',
        method: 'GET'
    }).done(function (response) {
        renderTitles(response);
        printInfo(response)
    }).fail(function(){
        console.log("failed to connect API");
    })

})
divApp = $("#app");

renderTitles = function(resp) {
    Object.values(resp).forEach(function (obj) {                // biore wartości ze zmienna odpowiedzi response (która jest obiektem i dla kazdego jej elementu dodaję paragraf z tą wartością do html
        let newP = $(`<p>Tytuł książki ${obj.id} to</p> <section class="book-title" id="${obj.id}"><h3>"${obj.title}"<h3><div class="info"></div></section>`);    //tworzę paragraf z z sekcją w której trzymam tytuł, nagłówek ma id zgodne z id ksiażki, ktorej tytul tam wyświetlam a w sekcji daję jeszcze div na dodatkowe informacje
        divApp.append(newP)
    })
}
printInfo = function(resp) {
    let h3Titles = document.querySelectorAll(".book-title");            // znajduje wszystkie sekcje zawierające tytuły ksiażek
    h3Titles.forEach(function (elem) {                                  //dla każdej z nich zakladam event na klikniecie
        // console.log(elem.id);
        $(elem).on("click", function (event) {
            let thisDiv = $(this).find("div");
            $(thisDiv).fadeIn("slow");                                          // event działa dla diva, które jest potomkiem kliknietej sekcji - rozwija go
            // console.log(thisDiv);

            $.ajax({                                                            // do diva zostaną wpisane pobrane z api szczegółowe informacje
                url: `http://localhost:8282/books/${elem.id}`,                  // dla ksiazki o id zgodnym z kliknietą
                method: 'GET'
            }).done(function (response) {
                console.log(response);
                $.each( response, function( key, value ) {
                    console.log( key + ": " + value );
                });
            }).fail(function(){
                console.log("failed to connect API");
            })

        })
    })
}






