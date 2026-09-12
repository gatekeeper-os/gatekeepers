import { defineGatekeeper } from "@clawkeepers/gatekeeper-kit";
import { resources } from "./resources.js";
import { tools } from "./tools.js";
import { describeWrite } from "./resource.js";
import { ExampleVendor } from "./vendor.js";

export default defineGatekeeper({
  id: "gatekeeper-example", vendor: "example", apiVersion: 1,
  name: "Example Gatekeeper", description: "Disconnected driver starter.",
  resources, tools, actions: { gk_example_item_put: { describe: describeWrite } },
  createVendor: ctx => new ExampleVendor(ctx),
});
