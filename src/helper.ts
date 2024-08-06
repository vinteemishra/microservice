import * as moment from "moment";

// Formatting the date in the DD.MM.YYYY Format
export const prettyPrintCertDate = (ts: number) =>
  moment(ts).format("DD.MM.YYYY");

// Check if the input is an empty string or it is null or anything other than a string
export function nonEmptyString(s: any): s is string {
  return s && s !== null && typeof s === "string" && s.trim() !== "";
}

const prettyPrintValidDate = (ts: number) =>
  moment(ts).add(1, "year").format("Do MMMM YYYY");
