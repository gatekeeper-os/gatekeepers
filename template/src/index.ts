import { defineGatekeeper } from "@gatekeeper-os/gatekeeper-kit";
import { resources } from "./resources.js";
import { tools } from "./tools.js";
import { describeWrite } from "./resource.js";
import { ExampleVendor } from "./vendor.js";

export default defineGatekeeper({
  id: "gkos-gatekeeper-example", vendor: "example", apiVersion: 1,
  name: "GatekeeperOS Example Gatekeeper", description: "Disconnected GatekeeperOS driver starter.",
  resources, tools, actions: { gk_example_item_put: { describe: describeWrite } },
  createVendor: ctx => new ExampleVendor(ctx),
});
