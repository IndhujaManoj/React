export const ukey = () => {
    const date = Date.now().toString(36);
    const randomNumber = Math.random().toString(36);
    return date + randomNumber;
}