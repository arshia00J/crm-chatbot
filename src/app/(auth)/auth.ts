export interface LoginPayload {
    username: string;
    password: string;
}

export interface LoginResponse {
    token: string;
}
// Login 
export async function login(payload :LoginPayload): Promise<LoginResponse> {

    try {
        const res = await fetch("/signin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload)
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || "Login failed");
        }

        const data: LoginResponse = await res.json();
        return data;
    } catch (err) {
        throw err
    }
    
}

// Signup
export async function signup(payload: LoginPayload): Promise<{ message: string}> {

    try {
        const res = await fetch("/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || "Signup failed");
        }

        const data = await res.json();
        return data;
    } catch (err) {
        throw err;
    }
    
}

