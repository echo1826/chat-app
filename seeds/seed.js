const db = require("../config/connection");
const { User } = require("../models");

db.once("open", async () => {
    await User.create({ username: "test", password: "123456qwe" });
    db.close();
    process.exit(0);
});
