import type { GatekeeperAccount } from "@gatekeeper-os/shared";
import { resources } from "./resources.js";

// Deliberately disconnected. A real account must bind credentials privately, validate
// the URL and the operator's access, and only then construct a resource instance.
export class ExampleAccount implements GatekeeperAccount {
  async describe() { return { displayName: "Disconnected example" }; }
  async getSupportedResources() { return resources; }
  async getGatekeeperFor(_url: string): ReturnType<GatekeeperAccount["getGatekeeperFor"]> {
    throw new Error("Example driver is not implemented.");
  }
  async getVerifier(): ReturnType<GatekeeperAccount["getVerifier"]> {
    throw new Error("Shared access is unavailable.");
  }
  async revoke(): Promise<void> {} // No credentials or live handles exist in this starter.
  async reconnect(): Promise<{ url: string }> { throw new Error("Example driver is not implemented."); }
}
