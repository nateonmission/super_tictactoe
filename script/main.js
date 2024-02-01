

var places_taken = []
var games = {
    "0": {"O": [], "X": [], "winner":""},
    "1": {"O": [], "X": [], "winner":""},
    "2": {"O": [], "X": [], "winner":""},
    "3": {"O": [], "X": [], "winner":""},
    "4": {"O": [], "X": [], "winner":""},
    "5": {"O": [], "X": [], "winner":""},
    "6": {"O": [], "X": [], "winner":""},
    "7": {"O": [], "X": [], "winner":""},
    "8": {"O": [], "X": [], "winner":""},
}

turn = 1
function placeToken(square) {
    var game = square.slice(10,11)
    var place = square.slice(12)
    var coord = (game,place)
    var token = (turn%2 === 0) ? 'O' : 'X'
    if (games[game]["X"].includes(place) || games[game]["O"].includes(place)){
        console.log("Move Taken")
    } else {
        places_taken.push(coord);
        games[game][token].push(place);

        console.log(game, place)
        
        console.log(`Click ${token} => #${square}`)
        var this_square = document.querySelector(`#${square}`)
        var span = document.createElement('span')
        span.classList.add('sub-token')
        span.innerHTML = token
        this_square.appendChild(span)
        win = checkForMiniWin(games[game][token])
        if (win){
            games[game]["winner"] = token
            gameSquare = document.querySelector(`#game${game}`);
            // gameSquare.classList.add('overlay')
            gameSquare.innerHTML = `<span class="won">${token}</span>`
        }
        bigWin = checkForWin(token)
        if (bigWin){
            console.log('BIG WIN RETURNED!!!!!!!!!!!!!!')
        }
        turn++
    }
}

function checkForMiniWin(gameArray) {
    console.log(gameArray)
    if (
        (gameArray.includes('0') && gameArray.includes('1') && gameArray.includes('2')) || 
        (gameArray.includes('3') && gameArray.includes('4') && gameArray.includes('5')) || 
        (gameArray.includes('6') && gameArray.includes('7') && gameArray.includes('8')) ||
        (gameArray.includes('0') && gameArray.includes('3') && gameArray.includes('6')) ||
        (gameArray.includes('1') && gameArray.includes('4') && gameArray.includes('7')) ||
        (gameArray.includes('2') && gameArray.includes('5') && gameArray.includes('8')) ||
        (gameArray.includes('0') && gameArray.includes('4') && gameArray.includes('8')) ||
        (gameArray.includes('2') && gameArray.includes('4') && gameArray.includes('6'))
        ){
            console.log('MINI-WIN')
            return true;
        } 
    console.log('no win')
    return false
}

function checkForWin(token) {
    console.log(games)
    if (
        (games['0']['winner'] === token && games['1']['winner'] === token && games['2']['winner'] === token) || 
        (games['3']['winner'] === token && games['4']['winner'] === token && games['5']['winner'] === token) || 
        (games['6']['winner'] === token && games['7']['winner'] === token && games['8']['winner'] === token) ||
        (games['0']['winner'] === token && games['3']['winner'] === token && games['6']['winner'] === token) ||
        (games['1']['winner'] === token && games['4']['winner'] === token && games['7']['winner'] === token) ||
        (games['2']['winner'] === token && games['5']['winner'] === token && games['8']['winner'] === token) ||
        (games['0']['winner'] === token && games['4']['winner'] === token && games['8']['winner'] === token) ||
        (games['2']['winner'] === token && games['4']['winner'] === token && games['6']['winner'] === token)
        ){
            console.log('!!! BIG-WIN !!!')
            return true;
        } 
    console.log('no big win')
    return false
}