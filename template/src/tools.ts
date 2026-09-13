import { Type } from "typebox";
import type { GatekeeperToolDef } from "@gatekeeper-os/shared";

// Illustrative metadata only; real service surfaces require STOP 1 review.
export const tools: GatekeeperToolDef[] = [
  { name: "gk_example_item_get", resourceType: "item", kind: "observation",
    description: "Read the introduced item.",
    parameters: Type.Object({ grant: Type.String() }, { additionalProperties: false }) },
  { name: "gk_example_item_put", resourceType: "item", kind: "action",
    description: "Replace the introduced item's value.",
    parameters: Type.Object({ grant: Type.String(), value: Type.String() }, { additionalProperties: false }) },
];
