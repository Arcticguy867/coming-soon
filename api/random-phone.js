function randomDigits(len) {
  let out = "";
  for (let i = 0; i < len; i++) out += Math.floor(Math.random() * 10);
  return out;
}

function generatePhone() {
  return randomDigits(10);
}

module.exports = (req, res) => {
  res.status(200).send({ phone: generatePhone() });
};
