import React, { useState } from 'react';

// Read BACKEND_URL from Vite environment variable with the provided fallback.
const BACKEND_URL = (import.meta?.env?.VITE_BACKEND_URL) ?? 'https://script.google.com/macros/s/AKfycbxqGXE35dRylHw-6_BWh8_mkpIOSDTIWa_Rv4PWMdDmt4vfdQByZO5CnCj994QwExMTPw/exec';

export default function DriverPickupDemo() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  async function handlePing() {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch(BACKEND_URL, { method: 'GET' });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      setError(err?.message ?? String(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', padding: 16 }}>
      <h2>Driver Pickup Demo</h2>
      <p>
        Backend URL: <code>{BACKEND_URL}</code>
      </p>
      <button onClick={handlePing} disabled={loading}>
        {loading ? 'Pinging...' : 'Ping Backend'}
      </button>

      {error && (
        <div style={{ marginTop: 12, color: 'crimson' }}>
          <strong>Error:</strong> {error}
        </div>
      )}

      {result && (
        <div style={{ marginTop: 12 }}>
          <strong>Response:</strong>
          <pre style={{ whiteSpace: 'pre-wrap', background: '#f6f8fa', padding: 8 }}>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
