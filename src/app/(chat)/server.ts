// export async function fetchSessions(token: string): Promise<any[]> {
//   const res = await fetch('http://127.0.0.1:8000/sessions', {
//     method: 'GET',
//     headers: {
//       'Authorization': `Bearer ${token}`, // ✅ Send token in header
//       'Content-Type': 'application/json',
//     },
//   });

//   if (!res.ok) {
//     const errorData = await res.json();
//     throw new Error(errorData.detail || 'Failed to fetch sessions');
//   }

//   return await res.json();
// }
