import { UserModify, UserIncidental, UsernameAndPassword } from '../../store/user/user.types';

type ResponseType = UserIncidental | { err: string };

export const userSignInAsync = async (passport: UsernameAndPassword): Promise<UserIncidental | Error> => {
    const url = "http://localhost:3001/api/user/sign-in";

    try {
        const response: Response = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(passport)
        })
        const result: ResponseType = await response.json();

        if (!response.ok) {
            throw new Error((result as { err: string }).err);
        }

        return result as UserIncidental;
    } catch (error) {
        return error as Error;
    }
}

export const userSignUpAsync = async (passport: UsernameAndPassword): Promise<null | Error> => {
    const url = "http://localhost:3001/api/user/sign-up";

    try {
        const response: Response = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(passport)
        });

        const result: null | {
            err: string;
        } = await response.json();

        if (!response.ok) {
            throw new Error((result as { err: string }).err);
        }

        return null;
    } catch (error) {
        return error as Error;
    }
}

export const userSignOutAsync = async (id: number): Promise<{ success: string } | Error> => {
    const url = "http://localhost:3001/api/user/sign-out";

    try {
        const response: Response = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `id=${encodeURIComponent(id)}`
        });

        const result: { success: string } | { err: string } = await response.json();

        if (!response.ok) {
            throw new Error((result as { err: string }).err);
        }

        return result as { success: string };
    } catch (error) {
        return error as Error;
    }
}

export const fetchUserAsync = async (uid: string): Promise<UserIncidental | null> => {
    const url = `http://localhost:3001/api/user/fetch-user?uid=${uid}`;

    try {
        const response = await fetch(url, { method: 'GET' });
        const data: { err: string } | UserIncidental = await response.json();
        if (!response.ok) {
            throw new Error(`${(data as { err: string }).err}`);
        }
        return data as UserIncidental;
    } catch (error) {
        // Log the error and throw it
        console.error('Error fetching user:', error);
        return null;
    }
}

export const updateUserAsync = async (upload: { id: number } & UserModify): Promise<UserIncidental | Error> => {
    const url = "http://localhost:3001/api/user/update-user";

    const formData = new FormData();
    formData.append('id', upload.id.toString());
    formData.append('name', upload.name);
    formData.append('bio', upload.bio);
    formData.append('profile', upload.profile);

    try {
        const response = await fetch(url, {
            method: 'PUT',
            body: formData
        });
        const result: { err: string } | UserIncidental = await response.json();
        if (!response.ok) {
            throw new Error(`${(result as { err: string }).err}`);
        }
        return result as UserIncidental;
    } catch (error) {
        return error as Error;
    }
}