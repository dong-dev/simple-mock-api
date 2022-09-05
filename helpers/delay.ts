export const delay = async (millisecond: number) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(millisecond);
        }, millisecond);
    })
}
