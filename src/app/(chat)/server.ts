export async function fetchSessions(token: string): Promise<any[]> {
  const res = await fetch('http://127.0.0.1:8000/sessions', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.detail || 'Failed to fetch sessions');
  }

  return await res.json();
}


interface agentPrompt {
  query: string;
  session_id: string;
}

interface agentResponse {
  agent: string;
  response: string;
}

export async function askAgent(params: agentPrompt): Promise<agentResponse> {
  const res = await fetch('http://127.0.0.1:8000/ask', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(params),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.detail?.[0]?.msg || 'Failed to get response from agent');
  }

  return await res.json();
}
