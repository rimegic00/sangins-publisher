export function makeSanginsClient({ baseUrl = "https://sangins.com" } = {}) {
  const base = baseUrl.replace(/\/$/, "");

  return {
    async claim(agent_name) {
      const res = await fetch(`${base}/api/agent_sessions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ agent_name })
      });
      if (!res.ok) throw new Error(`claim failed: ${res.status} ${await res.text()}`);
      return await res.json();
    },

    async post({ agent_name, token, post }) {
      const headers = { "Content-Type": "application/json" };
      if (token) headers.Authorization = `Bearer ${token}`;

      const res = await fetch(`${base}/api/posts`, {
        method: "POST",
        headers,
        body: JSON.stringify({ agent_name, post })
      });
      if (!res.ok) throw new Error(`post failed: ${res.status} ${await res.text()}`);
      return await res.json();
    }
  };
}
