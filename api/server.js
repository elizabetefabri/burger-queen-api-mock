const path = require("path");
const fs = require("fs");
const jsonServer = require("json-server");
const auth = require("json-server-auth");

const app = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, "..", "db.json"));
const middlewares = jsonServer.defaults();

const rules = auth.rewriter(
  JSON.parse(fs.readFileSync(path.join(__dirname, "..", "routes.json")))
);

app.db = router.db;
app.use(middlewares);
app.use(rules);
app.use(auth);
app.use(router);

module.exports = (req, res) => app(req, res);
