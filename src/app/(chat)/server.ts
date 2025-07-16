export interface ChatSession {
  session_id: string
  chat_history: [string, string][]
  user_id: string
}

export async function fetchSessions(token: string): Promise<ChatSession[]> {
  const res = await fetch('http://127.0.0.1:8000/sessions', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}))
    throw new Error(errorData.detail || 'Failed to fetch sessions');
  }

  const sessions: ChatSession[] = await res.json();
  return sessions;
}


export async function loadChatHistory(token: string, session_id: string): Promise<ChatSession>{
  const res = await fetch(`http://127.0.0.1:8000/sessions/${session_id}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });


  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}))
    throw new Error(errorData.detail || 'Failed to fetch chats history');
  }

  const sessions: ChatSession = await res.json();
  return sessions;

}


interface agentPrompt {
  query: string;
  session_id: string;
  token: string;
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
      'Authorization': `Bearer ${params.token}`,
    },
    body: JSON.stringify(params),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.detail?.[0]?.msg || 'Failed to get response from agent');
  }

  return await res.json();
}



export async function deleteSession(token: string, session_id: string): Promise<string> {
  const res = await fetch(`http://127.0.0.1:8000/sessions/${session_id}`, {

    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },

  });

  if(!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.detail || 'Failed to delete session')
  }
  
  return JSON.stringify(res)
}


