type LoadOptions = {
  async?: boolean;
  dataset?: { key: string; value: string }[];
  id: string;
};

const getElement = (selector: string) =>
  document.querySelector(selector) ?? undefined;

export const load = (src: string, options: LoadOptions) => {
  const { async = true, dataset = [], id } = options;

  const scriptExists = document.getElementById(id);

  if (scriptExists) {
    return;
  }

  const script = document.createElement('script');

  script.src = src;
  script.async = async;
  script.type = 'text/javascript';
  script.id = id;

  dataset.forEach((attribute) => {
    const { key, value } = attribute;
    script.dataset[key] = value;
  });

  const headElementSelector = 'head';
  const headElement = getElement(headElementSelector);

  if (headElement) {
    headElement.insertBefore(script, headElement.lastChild);
    return;
  }

  const scriptSelector = 'script';
  const firstAvailableScript = getElement(scriptSelector);

  firstAvailableScript?.parentNode?.insertBefore(script, firstAvailableScript);
};
