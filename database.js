const { DatabaseSync } = require("node:sqlite");
const { randomUUID } = require("node:crypto");
const { join } = require("node:path");
const { pathways } = require("./pathways");

const db = new DatabaseSync(process.env.PATHWAYS_DB || join(__dirname, "pathways.sqlite"));
db.exec(`
  PRAGMA journal_mode = WAL;
  CREATE TABLE IF NOT EXISTS roles (
    name TEXT PRIMARY KEY, major TEXT NOT NULL, data TEXT NOT NULL
  );
  CREATE TABLE IF NOT EXISTS students (
    id TEXT PRIMARY KEY, profile TEXT
  );
`);
const seed = db.prepare("INSERT OR REPLACE INTO roles VALUES (?, ?, ?)");
db.exec("BEGIN");
try {
  db.exec("DELETE FROM roles");
  for (const role of pathways) seed.run(role.name, role.major, JSON.stringify(role));
  db.exec("COMMIT");
} catch (error) {
  db.exec("ROLLBACK");
  throw error;
}

const findStudent = db.prepare("SELECT profile FROM students WHERE id = ?");
const createStudent = db.prepare("INSERT INTO students (id) VALUES (?)");
const saveStudent = db.prepare("UPDATE students SET profile = ? WHERE id = ?");
const allRoles = db.prepare("SELECT data FROM roles ORDER BY rowid");
const majorRoles = db.prepare("SELECT data FROM roles WHERE major = ? ORDER BY rowid");

function session(request, response) {
  let id = /(?:^|;\s*)pathways_session=([a-f0-9-]{36})(?:;|$)/.exec(request.headers.cookie ?? "")?.[1];
  let record = id && findStudent.get(id);
  if (!record) {
    id = randomUUID();
    createStudent.run(id);
    response.setHeader("Set-Cookie", `pathways_session=${id}; Path=/; HttpOnly; SameSite=Strict; Max-Age=31536000`);
    record = { profile: null };
  }
  return { id, profile: JSON.parse(record.profile) };
}

module.exports = {
  session,
  saveProfile: (id, profile) => saveStudent.run(JSON.stringify(profile), id),
  listRoles: (major) => (major ? majorRoles.all(major) : allRoles.all()).map(({ data }) => JSON.parse(data))
};
