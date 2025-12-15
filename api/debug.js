let STORE = {}

export default function handler(req, res) {
  const { action, key, value } =
    req.method === 'POST' ? req.body : req.query

  if (!action || !key) {
    return res.status(400).json({
      error: 'action and key are required'
    })
  }

  if (action === 'save') {
    STORE[key] = value
    return res.json({
      action: 'saved',
      key,
      value
    })
  }

  if (action === 'get') {
    return res.json({
      action: 'read',
      key,
      value: STORE[key]
    })
  }

  return res.status(400).json({
    error: 'invalid action'
  })
}