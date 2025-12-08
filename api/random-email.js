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

function randomDigits(len) {
  let out = "";
  for (let i = 0; i < len; i++) out += Math.floor(Math.random() * 10);
  return out;
}

function generateEmail() {
  const digits = randomDigits(3 + Math.floor(Math.random() * 3));
  return `test_case_${digits}@test.case`;
}

module.exports = (req, res) => {
  res.status(200).send(generateEmail());
};
