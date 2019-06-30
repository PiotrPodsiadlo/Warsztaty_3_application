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

    let inputs = document.querySelectorAll("input");
    let submit = $(".btn-primary");
    // console.log(inputs);
    // console.log(inputs[0].value);
    submit.on("click", function(event){
        event.preventDefault();
        console.log(submit);
        $.ajax({
            url: 'http://localhost:8282/books/',
            // data: `{"id":"${inputs[0].value}","isbn":"${inputs[1].value}", "title":"${inputs[2].value}"}`,
            //contentType: "application/json",
            method: 'POST'
        }).done(function (response) {
            renderTitles(response);
            printInfo(response)
        }).fail(function(){
            console.log("failed to connect API");
        })
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
        // console.log(elem);
        $(elem).one("click", function (event) {                                 // "one" zamiast "on", zeby nie mozna było otwierac szszegółów wielokrotnie
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
                    bookDetails = $(`<h7 class="key">${key}: </h7><h7 class="value">${value} | </h7>`);
                    thisDiv.append(bookDetails)
                });
            }).fail(function(){
                console.log("failed to connect API");
            })

        })
    })
}






