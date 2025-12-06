const numberWords = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
  "ten",
];

function generateName() {
  function pick() {
    return numberWords[Math.floor(Math.random() * numberWords.length)];
  }
  return "testcase" + pick() + pick() + pick();
}

module.exports = (req, res) => {
  res.status(200).send(generateName());
};
