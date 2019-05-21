const fs = require("fs-extra");

async function mkdir(dirpath) {
    try {
      await fs.mkdir(dirpath, { recursive: true });
    } catch (err) {
      if (err.code !== "EEXIST") throw err;
    }
  }

  async function remove(path){
   try {
     await fs.remove(path)
   } catch (err) {
    if (err.code !== "EEXIST") throw err;
   }

  }

  module.exports.newdir=mkdir
  module.exports.deletedir=remove
  