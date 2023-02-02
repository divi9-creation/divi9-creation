export namespace AnalyticsTypes {
  export type Identify = (userId: string, traits?: Traits) => void;

  export interface Traits {
    address?: {
      city: string;
      state: string;
      zipCode: string;
      country: string;
    };
    email?: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
  }

  export type Init = () => void;

  export type Page = () => void;

  export type Track = (
    eventName: string,
    properties?: Record<string, any>
  ) => void;

  export interface Integration {
    init: Init;
  }
}
