const fs = require("fs").promises;

async function mkdir(dirpath) {
    try {
      await fs.mkdir(dirpath, { recursive: true });
    } catch (err) {
      if (err.code !== "EEXIST") throw err;
    }
  }

  module.exports.newdir=mkdir