/** 1.0.0 | www.phoxer.com */
import { isNil } from "ramda"

// A wrapper for "JSON.parse()"" to support "undefined" and "null"
export const parseJSON = (value: string | null): any => {
    try {
      return (isNil(value)) ? value : JSON.parse(value);
    } catch {
      console.log('parsing error on', { value });
      return null;
    }
}