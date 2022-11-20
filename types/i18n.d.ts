export class I18n {
    /**
     * @param {I18nOptions} options
     */
    constructor(options?: I18nOptions);
    options: {
        backendPath: string;
        log?: Function | undefined;
        supportedLngs: string[] | undefined;
        version: string;
        ns: string[];
        cookie: {
            name: string;
            path: string;
        };
    };
    defaultNs: string;
    fallbackLng: string;
    language: string;
    languages: string[];
    resources: {
        [lng: string]: {
            [ns: string]: {
                [label: string]: string;
            };
        };
    };
    /**
     * @param {string} label
     * @param {object} values
     * @returns {string}
     */
    t(label: string, values?: object): string;
    /**
     * @param {string} lng
     * @returns {string[]}
     */
    getLanguages(lng: string): string[];
    /**
     * @returns {string}
     */
    getUserLanguage(): string;
    resetUserLanguage(): void;
    /**
     * @private
     * @returns {[cookieLng:string, browserLng:string]}
     */
    private _getSettings;
    _setCookie(): void;
    /**
     * @private
     * @param {string} [lng]
     * @returns {string[]}
     */
    private _setLanguage;
    /**
     * changes the language
     * @param {string} [lng]
     * @return {Promise<void>}
     */
    changeLanguage(lng?: string | undefined): Promise<void>;
    /**
     * @param {string} ns
     * @return {Promise<void>}
     */
    changeNamespace(ns: string): Promise<void>;
    /**
     * @param {string[]} lngs
     * @param {string[]} [ns]
     * @return {Promise<void>}
     */
    loadLanguages(lngs?: string[], ns?: string[] | undefined): Promise<void>;
    /**
     * @private
     * @param {{
     *  lng: string
     *  ns: string
     * }} param0
     * @return {Promise<void>}
     */
    private _load;
}
export function createInstance(options: any): I18n;
export type I18nOptions = import('./types').I18nOptions;
