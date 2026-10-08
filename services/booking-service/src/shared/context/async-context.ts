import { AsyncLocalStorage } from "node:async_hooks";

type RequestContext = {
  correlationId: string;
};

export const asyncLocalStorage = new AsyncLocalStorage<RequestContext>();

/**
 * Create a small helper, for accessing the correlationId from the async local storage.
 */
export function getCorrelationId(): string {
  return asyncLocalStorage.getStore()?.correlationId || "unknown";
}
