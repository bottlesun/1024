import { describe, expect } from "@jest/globals";
import axios from "axios";

const http = require("utils/public/http");
const { parse } = require("url");
const next = require("next");

describe("httpClient Module Test", () => {
  it("HealthApiMock Test", async () => {
    //const a = await axios.get("https://fakerapi.it/api/v1/addresses?_quantity=1");
    const a = await axios.get("http://localhost:3000/api/health");

    console.dir(a);

    expect(a.status).toBe(200);
  });

  it("HealthApiMock2 Test", async () => {});
});
