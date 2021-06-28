const TOKEN_NAME = 'AUTH_TOKEN';

class TokenUtil {
    removeToken(): void {
        localStorage.removeItem(TOKEN_NAME);
    }

    setToken(token: string): void {
        localStorage.setItem(TOKEN_NAME, token);
    }

    getToken(): string {
        let value = localStorage.getItem(TOKEN_NAME);
        return  value ? value : '';
    }
}

export default new TokenUtil();
