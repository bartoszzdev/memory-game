const grid = document.getElementById("grid")
const attempt = document.getElementById("attempt")
const playAgain = document.getElementById("btn")
let cardsChosen = []
let cardsChosenIds = []
let cardsMatched = []
let attempts = []
let timeout = ''
const cards = [
    {
        name: "Fries",
        img: "images/fries.png"
    },
    {
        name: "Cheeseburger",
        img: "images/cheeseburger.png"
    },
    {
        name: "Hotdog",
        img: "images/hotdog.png"
    },
    {
        name: "Ice-cream",
        img: "images/ice-cream.png"
    },
    {
        name: "Milkshake",
        img: "images/milkshake.png"
    },
    {
        name: "Pizza",
        img: "images/pizza.png"
    },
    {
        name: "Fries",
        img: "images/fries.png"
    },
    {
        name: "Cheeseburger",
        img: "images/cheeseburger.png"
    },
    {
        name: "Hotdog",
        img: "images/hotdog.png"
    },
    {
        name: "Ice-cream",
        img: "images/ice-cream.png"
    },
    {
        name: "Milkshake",
        img: "images/milkshake.png"
    },
    {
        name: "Pizza",
        img: "images/pizza.png"
    }
]

cards.sort(() => 0.5 - Math.random())
timeout = setInterval(initTimeout, 1000)

/* grid.addEventListener('click', () => {
    timeout = setInterval(initTimeout, 1000)
}) */

function createBoard() {
    for (let i = 0; i < cards.length; i++) {
        const card = document.createElement("img")
        card.setAttribute("src", "images/blank.png")
        card.setAttribute("data-id", i)
        card.addEventListener("click", flipCard)
        grid.appendChild(card)
    }
}

createBoard()

function flipCard() {
    const cardId = this.getAttribute("data-id")
    cardsChosen.push(cards[cardId].name)
    cardsChosenIds.push(cardId)
    this.setAttribute("src", cards[cardId].img)

    if (cardsChosen.length === 2) {
        setTimeout(checkForMatch, 500)
    }
}

function checkForMatch() {
    const result = document.getElementById("result")
    const message = document.getElementById("message")
    const cardsImg = document.querySelectorAll("img")
    const firstCardId = cardsChosenIds[0]
    const secondCardId = cardsChosenIds[1]

    if (firstCardId === secondCardId) {
        message.innerText = "You have clicked the same card!"
        cardsImg[firstCardId].setAttribute("src", "images/blank.png")
        cardsImg[secondCardId].setAttribute("src", "images/blank.png")
    } else if (cardsChosen[0] === cardsChosen[1]) {
        message.innerText = "Great, you have found a match!"
        cardsImg[firstCardId].setAttribute("src", "images/white.png")
        cardsImg[secondCardId].setAttribute("src", "images/white.png")
        cardsImg[firstCardId].removeEventListener("click", flipCard)
        cardsImg[secondCardId].removeEventListener("click", flipCard)
        cardsMatched.push(cardsChosen)
    } else {
        message.innerText = "Sorry, try again!"
        cardsImg[firstCardId].setAttribute("src", "images/blank.png")
        cardsImg[secondCardId].setAttribute("src", "images/blank.png")
        attempts.push(cardsChosen)
        attempt.innerText = attempts.length
    }

    cardsChosen = []
    cardsChosenIds = []

    result.innerText = cardsMatched.length
    if (cardsMatched.length === cards.length / 2) {
        clearInterval(timeout)
        grid.style.display = 'none'
        playAgain.style.display = 'inline-block'
        message.innerText = `Congratulations, you have won the game with ${attempts.length} attempts by the time of ${minute}:${second}...`
    }
}

let minute = 0
let second = 0

function initTimeout() {
    const displayMin = document.getElementById("minute")
    const displaySec = document.getElementById("second")
    let sec = ''

    second += 1

    if (second === 60) {
        minute += 1
        second = 0
    }

    if (second < 10) {
        sec = '0' + second
    } else {
        sec = second
    }

    displayMin.innerText = minute
    displaySec.innerText = sec
}

playAgain.addEventListener('click', () => {
    document.location.reload(true)
})
