# SafeLoop Radar

AI risk radar for agent tool-call plans.

## What it does

SafeLoop Radar analyzes an autonomous agent execution plan, scores operational/safety risk, flags risky steps, and proposes a safer rewrite using Compute Community LLM inference.

## How to Run (from zero)

1. Prerequisites
   - Node.js 18+
   - A `CC_API_KEY` from Compute Community
2. `git clone https://github.com/sundaiclaw/sundai-safeloop-radar.git`
3. `cd sundai-safeloop-radar`
4. Install dependencies: `npm install`
5. Run: `CC_API_KEY=your_key CC_BASE_URL=https://computecommunity.com/sundai-server/v1 CC_MODEL=MiniMaxAI/MiniMax-M2.5 npm start`
6. Open local URL: `http://localhost:3000`

## Limitations / known gaps

- Single-page MVP with minimal auth/rate-limit protection.
- Prompting is tuned for concise JSON, but model outputs can still vary.
- No persistent project history yet.

Build on Sundai Club on March 8, 2026.  
Sundai Project: https://www.sundai.club/projects/f467e5fc-0742-4d24-99cd-dcb409f05f05
