/** Inert vendor boundary; bind credentials in the account, never in tool arguments. */
export interface ExampleApi {
  read(): Promise<{ value: string }>;
  write(value: string): Promise<{ id: string }>;
}
/** Replace only after the tool-surface and account reviews. No network access. */
export function createApi(): ExampleApi {
  return {
    read: async () => { throw new Error("Example driver is not implemented."); },
    write: async () => { throw new Error("Example driver is not implemented."); },
  };
}
