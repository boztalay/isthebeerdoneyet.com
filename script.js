window.onload = displayBeers

function displayBeers() {
    currentBeersList = document.getElementById("current-beers-list")
    pastBeersList = document.getElementById("past-beers-list")

    for(beerIndex in beers) {
        beer = beers[beerIndex]

        newRow = null
        if(!beer.done) {
            newRow = currentBeersList.insertRow()
        } else {
            newRow = pastBeersList.insertRow()
        }

        nameCell = newRow.insertCell()
        nameCell.className = "cell-left"
        nameCell.innerHTML = beer.name

        statusCell = newRow.insertCell()
        statusCell.className = "cell-right"
        statusCell.innerHTML = beer.state
    }
}
