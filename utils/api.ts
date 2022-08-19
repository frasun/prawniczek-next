interface ApiType {
    [name: string]: string
}

const API: ApiType = {
    category: `${process.env.API_URL}/category`,
    forms: `${process.env.API_URL}/forms`,
    form: `${process.env.API_URL}/form`,
    login: `${process.env.API_URL}/auth/login`,
    user: `${process.env.API_URL}/auth/me`,
    document: `${process.env.API_URL}/document`,
    signup: `${process.env.API_URL}/auth/verify_email/signup`,
    magicLogin: `${process.env.API_URL}/auth/verify_email/magic_login`,
    signin: '/api/login',
}

export async function getFromApi(
    endpoint: string,
    params?: string | string[],
    token?: string
) {
    const url = params ? `${API[endpoint]}/${params}` : API[endpoint]
    const request = await fetch(url, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })

    const { status, ok } = request
    const response = {
        ...(await request.json()),
        status,
        ok,
    }

    return response
}

export async function postToApi<T>(
    endpoint: string,
    params: T,
    token?: string
) {
    const request = await fetch(API[endpoint], {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: params ? JSON.stringify(params) : undefined,
    })

    const { status, ok } = request
    const response = {
        ...(await request.json()),
        status,
        ok,
    }

    return response
}

export async function putToApi<T>(endpoint: string, params: T, token?: string) {
    const response = await fetch(API[endpoint], {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: params ? JSON.stringify(params) : undefined,
    })

    return await response.json()
}
