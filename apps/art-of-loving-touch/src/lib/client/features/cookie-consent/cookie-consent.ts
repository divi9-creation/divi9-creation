interface Props {
  siteId: string;
}

const getScriptUrl = (siteId: string) =>
  `https://cdn-cookieyes.com/client_data/${siteId}/script.js`;

const isSiteIdPresent = (siteId: string) => siteId || siteId.trim().length;

export const useCookieConsent = ({ siteId }: Props) => {
  if (!isSiteIdPresent(siteId)) {
    throw new Error(`siteId is required for CookieYes`);
  }

  const scriptUrl = getScriptUrl(siteId);

  return {
    scriptUrl,
  };
};
