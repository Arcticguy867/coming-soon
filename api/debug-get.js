let DEBUG_STORE = {}

export default function handler(req, res) {
  const { key } = req.query

  if (!key) {
    return res.status(400).json({
      error: 'key is required'
    })
  }

  return res.status(200).json({
    key,
    value: DEBUG_STORE[key]
  })
}