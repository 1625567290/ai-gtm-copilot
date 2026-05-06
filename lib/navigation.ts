import type { Locale } from "./i18n";
import { withLocale } from "./i18n";

export function analysisResultPath(campaignId: string, locale: Locale) {
  return withLocale(`/radar?campaignId=${campaignId}`, locale);
}
