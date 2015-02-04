window.onload = displayBeers

beerColors = ["#746af4", "#55f855", "#5bc1f2"]

var startOfThisWeek
var endOfThisPeriod

function displayBeers() {
    startOfThisWeek = new Date()
    startOfThisWeek.setDate(startOfThisWeek.getDate() - startOfThisWeek.getDay())
    startOfThisWeek.setHours(0, 0, 0, 0)

    endOfThisPeriod = new Date()
    endOfThisPeriod.setDate(startOfThisWeek.getDate() + 14)
    endOfThisPeriod.setHours(0, 0, 0, 0)

    fillSchedule()
    fillBeerLists()
}

function fillSchedule() {
    setUpSchedule()
    sortedBeers = sortBeersByContentInThisTimePeriod()
    scheduleTable = document.getElementById("schedule-table")

    for(beerIndex in sortedBeers) {
        beer = sortedBeers[beerIndex]

        for(stepIndex in beer.steps) {
            step = beer.steps[stepIndex]
            stepStart = new Date(step.start)
            stepEnd = new Date(step.end)
            stepEnd.setDate(stepEnd.getDate() + 1)

            if(step.overlap > 0) {
                startDay = Math.max(0, (stepStart - startOfThisWeek)) / (1000 * 60 * 60 * 24)
                for(var i = startDay; i < startDay + step.overlap; i++) {
                    weekIndex = Math.floor(i / 7.0)
                    dayIndex = i % 7
                    cell = scheduleTable.rows[weekIndex].cells[dayIndex]

                    stepDiv = document.createElement("div")
                    stepDiv.className = "beer-step"
                    stepDiv.style.backgroundColor = beerColors[beerIndex % beerColors.length]

                    if(i == startDay) {
                        stepDiv.innerHTML = beer.shortName + " - " + step.name
                        stepDiv.style.marginLeft = "0px"
                    } else {
                        stepDiv.innerHTML = "&nbsp;"
                    }

                    if(i == startDay + step.overlap - 1) {
                        stepDiv.style.marginRight = "0px"
                    }

                    cell.appendChild(stepDiv)
                }
            }
        }
    }
}

function setUpSchedule() {
    scheduleTable = document.getElementById("schedule-table")

    for(var i = 0; i < 2; i++) {
        row = scheduleTable.rows[i]

        for(var j = 0; j < 7; j++) {
            cell = row.cells[j]
            cellDate = startOfThisWeek.getDate() + (i * 7) + j

            lastDayOfMonth = (new Date(startOfThisWeek.getYear(), startOfThisWeek.getMonth() + 1, 0)).getDate()
            if(cellDate > lastDayOfMonth) {
                cellDate = cellDate - lastDayOfMonth
            }

            dateDiv = document.createElement("div")
            dateDiv.innerHTML = cellDate
            dateDiv.className = "date-number"
            cell.appendChild(dateDiv)
        }
    }
}

function sortBeersByContentInThisTimePeriod() {
    for(beerIndex in beers) {
        beer = beers[beerIndex]
        numDays = 0

        for(stepIndex in beer.steps) {
            step = beer.steps[stepIndex]
            stepStart = new Date(step.start)
            stepEnd = new Date(step.end)
            stepEnd.setDate(stepEnd.getDate() + 1)

            stepOverlapWithPeriodMillis = Math.max(0, Math.min(stepEnd.getTime(), endOfThisPeriod.getTime()) - Math.max(stepStart.getTime(), startOfThisWeek.getTime()))
            stepOverlapWithPeriod = (stepOverlapWithPeriodMillis / (1000 * 60 * 60 * 24))
            step.overlap = stepOverlapWithPeriod
            numDays += stepOverlapWithPeriod
        }

        beer.overlap = numDays
    }

    sortedBeers = beers
    sortedBeers.sort(function(a, b) { return b.overlap - a.overlap })

    return sortedBeers
}

function fillBeerLists() {
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
