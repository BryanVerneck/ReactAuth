interface Response {
    token: string;
    user: {
        name: string;
        email: string;
    };
}

export function signIn(): Promise<Response> {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({
                token: '34545276fg278rgfb478r22876wif37846',
                user: {
                    name: 'Bryan',
                    email: 'Bryan@gmail.com'
                }
            });
        }, 1000);
    })
}