/**
 * @param {object} props
 * @param {AnyComponent} props.children
 * @param {AnyComponent} [props.fallback] fallback component which is rendered while new language settings are loading
 * @param {I18nOptions} [props.options]
 * @param {string[]} [props.lngs] languages to preload
 * @param {string[]} [props.ns] namespaces to preload
 * @returns {VNode}
 */
export function IntlProvider(props: {
    children: AnyComponent;
    fallback?: AnyComponent | undefined;
    options?: import("./types").I18nOptions | undefined;
    lngs?: string[] | undefined;
    ns?: string[] | undefined;
}): VNode;
/**
 * @returns {IntlProviderContext}
 */
export function useTranslation(): IntlProviderContext;
export type IntlProviderContext = import('./types').IntlProviderContext;
export type I18nOptions = import('./types').I18nOptions;
export type AnyComponent = import('./types').AnyComponent;
export type VNode = import('./types').VNode;
