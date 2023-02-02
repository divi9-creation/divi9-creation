declare const plausible: (
  eventName: string,
  options?: { props: Record<string, any> }
) => void;

interface Window {
  plausible: any;
}
