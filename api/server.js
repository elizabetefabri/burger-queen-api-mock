const path = require("path");
const fs = require("fs");
const jsonServer = require("json-server");
const auth = require("json-server-auth");

const app = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, "db.json"));
const middlewares = jsonServer.defaults();

const rules = auth.rewriter(
  JSON.parse(fs.readFileSync(path.join(__dirname, "routes.json")))
);

// 🔹 Habilitar CORS para funcionar no Vercel
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.db = router.db;
app.use(middlewares);
app.use(rules);
app.use(auth);
app.use(router);

// 🔹 NUNCA usar app.listen() no Vercel
module.exports = (req, res) => app(req, res);
