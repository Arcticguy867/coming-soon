let STORE = {}

export default function handler(req, res) {
  const { key } = req.query

  if (!key) {
    return res.status(400).json({ error: 'key is required' })
  }

  res.json({
    action: 'read',
    key,
    value: STORE[key]
  })
}