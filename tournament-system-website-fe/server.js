const { createServer: https } = require("https");
const { createServer: http } = require("http");
const { parse } = require("url");
const next = require("next");
const fs = require("fs");

const dev = process.env.NODE_ENV !== "production";
const hostName = "localhost.wannasgame.io";
const app = next({ dev: dev, hostname: hostName });
const handle = app.getRequestHandler();

const ports = {
  http: 80,
  https: 443
};

const httpsOptions = {
  key: fs.readFileSync("./__tls/STAR.1024corp.xyz_key.txt"),
  cert: fs.readFileSync("./__tls/nginx_bundle_6ed398dc2f48.crt")
};

app.prepare().then(() => {
  http((req, res) => {
    const parsedUrl = parse(req.url, true);
    return handle(req, res, parsedUrl);
  }).listen(ports.http, (err) => {
    if (err) throw err;
    console.log(`> HTTP: Ready on http://${hostName}:${ports.http}`);
  });

  https(httpsOptions, (req, res) => {
    const parsedUrl = parse(req.url, true);
    return handle(req, res, parsedUrl);
  }).listen(ports.https, (err) => {
    if (err) throw err;
    console.log(`> HTTPS: Ready on https://${hostName}:${ports.https}`);
  });
});
