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



module.exports = {
    storeWords ,
}