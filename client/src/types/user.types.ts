
export type User = {
    id: string,
    name: string,
    email: string,
    phone: string,
    password: string
}
export type AuthUser={
    user: User,
    token: string
}