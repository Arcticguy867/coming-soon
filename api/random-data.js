function randomDigits(len) {
  let out = "";
  for (let i = 0; i < len; i++) out += Math.floor(Math.random() * 10);
  return out;
}

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
  const w1 = numberWords[Math.floor(Math.random() * numberWords.length)];
  const w2 = numberWords[Math.floor(Math.random() * numberWords.length)];
  const w3 = numberWords[Math.floor(Math.random() * numberWords.length)];
  return "testcase" + w1 + w2 + w3;
}

function generateEmail() {
  const digits = randomDigits(3 + Math.floor(Math.random() * 3)); // 3–5 digits
  return `test_case_${digits}@test.case`;
}

function generatePhone() {
  return randomDigits(10);
}

export default function handler(req, res) {
  res.status(200).json({
    phone: generatePhone(),
    name: generateName(),
    email: generateEmail(),
  });
}
