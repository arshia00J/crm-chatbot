const baseUrl = process.env.NEXT_PUBLIC_API_URL;


export interface LoginPayload {
  username: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
}

function toFormUrlEncoded(payload: LoginPayload): string {
  const form = new URLSearchParams();
  form.append("grant_type", "password");
  form.append("username", payload.username);
  form.append("password", payload.password);
  return form.toString();
}

// LOGIN
export async function login(payload: LoginPayload): Promise<LoginResponse> {
  try {
    const res = await fetch(`${baseUrl}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: toFormUrlEncoded(payload),
    });

    if (!res.ok) {
        const errorData = await res.json();
        const errorMsg = errorData.detail || "Login failed";
        throw new Error(errorMsg);
    }


    const data: LoginResponse = await res.json();
    return data;
  } catch (err) {
    throw err;
  }
}


// SIGNUP
export async function signup(payload: LoginPayload): Promise<{ message: string }> {
  try {
    const res = await fetch(`${baseUrl}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: toFormUrlEncoded(payload),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.detail || "Signup failed");
    }

    const data = await res.json();
    return { message: data.message };
  } catch (err) {
    throw err;
  }
}

