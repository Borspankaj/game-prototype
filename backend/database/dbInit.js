const randomWords = [
    "apple",
    "banana",
    "orange",
    "grape",
    "kiwi",
    "pineapple",
    "strawberry",
    "watermelon",
    "blueberry",
    "peach",
    "mango",
    "pear",
    "cherry",
    "plum",
    "lemon",
    "lime",
    "papaya",
    "fig",
    "raspberry",
    "blackberry"
  ];

function storeWords(firebaseApp) {

    firebaseApp.ref("words").push(randomWords)

}

function extractRandom(firebaseApp) {
    var randomWord = ''
    firebaseApp.ref("words").once('value' , (snapshot) => {
        
        const words = []
        snapshot.forEach((childSnap => {
            words.push(childSnap.val())
        }))
        const randomIndex = Math.floor(Math.random() * words[0].length); 
        randomWord =  words[0][randomIndex]
    })
    return randomWord
}

module.exports = {
    storeWords ,
    extractRandom
}