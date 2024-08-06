// Creating an interface for the certificate fields.

export interface ICertData {
  jobTitle: string;
  name: string;
  certHeader: string;
  certBody: string;
  certBody1: string;
  certBody2: string;
  certDates: [];
  language: string;
  uniqueId?: string;
  memberId?: string;
  country?: string;
  isManyataUser?:boolean;

}
