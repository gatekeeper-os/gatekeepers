import type { GatekeeperAccount, GatekeeperVendor } from "@gatekeeper-os/shared";
import type { VendorContext } from "@gatekeeper-os/gatekeeper-kit";
import { resources } from "./resources.js";
import { tools } from "./tools.js";

export class ExampleVendor implements GatekeeperVendor {
  readonly vendor = "example";
  readonly apiVersion = 1;
  constructor(_ctx: VendorContext) {} // No I/O, credentials or registration API.
  async describe() { return { title: "Example", description: "Disconnected driver starter." }; }
  async connectAccount(_operatorId: string): Promise<{ url: string }> {
    throw new Error("Example driver is not implemented.");
  }
  async getAccount(_operatorId: string): Promise<GatekeeperAccount | null> { return null; }
  async getSupportedResources() { return resources; }
  async getTools() { return tools; }
}
