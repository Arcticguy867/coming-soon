let DEBUG_STORE = {}

export default function handler(req, res) {
  const { key, value } = req.method === 'POST' ? req.body : req.query

  if (!key) {
    return res.status(400).json({
      error: 'key is required'
    })
  }

  DEBUG_STORE[key] = value

  return res.status(200).json({
    saved: true,
    store: DEBUG_STORE
  })
}