import express from 'express';
const app = express();
app.use(express.json());
app.use(express.static('public'));

const CC_BASE_URL = process.env.CC_BASE_URL || 'https://computecommunity.com/sundai-server/v1';
const CC_MODEL = process.env.CC_MODEL || 'MiniMaxAI/MiniMax-M2.5';
const CC_API_KEY = process.env.CC_API_KEY;

app.post('/api/analyze', async (req, res) => {
  try {
    if (!CC_API_KEY) return res.status(500).json({ error: 'Missing CC_API_KEY' });
    const { plan = '' } = req.body || {};
    const prompt = `You are a safety analyst for autonomous agents. Analyze this plan and return STRICT JSON with keys: risk_score (0-100), risky_steps (string[]), safer_rewrite (string), stoplight (GREEN|YELLOW|RED). Plan:\n${plan}`;
    const response = await fetch(`${CC_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${CC_API_KEY}`
      },
      body: JSON.stringify({
        model: CC_MODEL,
        temperature: 0.2,
        response_format: { type: 'json_object' },
        messages: [
          { role: 'system', content: 'Return valid minified JSON only.' },
          { role: 'user', content: prompt }
        ]
      })
    });
    const data = await response.json();
    const content = data?.choices?.[0]?.message?.content || '{}';
    let parsed;
    try { parsed = JSON.parse(content); } catch { parsed = { raw: content }; }
    res.json({ ok: true, result: parsed, model: CC_MODEL });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`SafeLoop Radar running on ${port}`));
