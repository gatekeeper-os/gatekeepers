import { KitGatekeeper, OverlayStore, type ActionImpl, type ObservationImpl } from "@clawkeepers/gatekeeper-kit";
import type { ActionDescription } from "@clawkeepers/shared";
import { itemResource } from "./resources.js";

// Shared pure descriptor for registration and the resource. No simulation or revert is implemented.
export function describeWrite(_params: Record<string, unknown>): ActionDescription {
  return { title: "Replace item value", description: "Replace the introduced item's value.",
    awaitDecision: true, implementsRevert: false };
}

// Not connected by the starter. Replace stubs only after the authoring reviews.
export class ExampleItem extends KitGatekeeper {
  override resource = itemResource;
  protected override overlay = new OverlayStore(); // Explicitly ephemeral; not production persistence.
  override observations: Record<string, ObservationImpl> = {
    gk_example_item_get: {
      describe: () => ({ title: "Read item", description: "Read the introduced item.", prohibitAllSharing: true }),
      read: async () => { throw new Error("Example driver is not implemented."); },
    },
  };
  override actions: Record<string, ActionImpl> = {
    gk_example_item_put: {
      describe: describeWrite,
      apply: async () => { throw new Error("Example driver is not implemented."); },
    },
  };
}
