/**
 * parses a cookie string
 * @param {string} cookieStr
 * @returns {{[cookieName: string]: string}|{}}
 */
export function cookieParse(cookieStr?: string): {} | {
    [cookieName: string]: string;
};
export function cookieSerialize(name: any, value: any, options: any): string;
