import languageDetector from "next-language-detector";
import i18nextConfig from "../../next-i18next.config";

export default languageDetector({
  supportedLngs: i18nextConfig.i18n.locales,
  fallbackLng: i18nextConfig.i18n.defaultLocale,
});

export function navigatorLangDetector() {
  return navigator.language.substring(0, 2) || "en";
}
