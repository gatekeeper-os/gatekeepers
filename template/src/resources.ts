import type { SupportedResource } from "@gatekeeper-os/shared";

export const itemResource: SupportedResource = {
  type: "item", urlPattern: "https://example.invalid/items/:id", title: "Example Item",
  description: "One introduced item.", grantable: true, observerStrategy: "private-only",
  tools: ["gk_example_item_get", "gk_example_item_put"],
};
export const resources: SupportedResource[] = [itemResource];
