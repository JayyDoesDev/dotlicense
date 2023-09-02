/**
 * Copyright (c) 2023 J_DDev
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a cop
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

const path = require("path");
const license = require("./license.json");
const fs = require("fs");

const licenseAgurments = "MIT" | "Apache";
const licenceNames = [];
for (let i = 0; i < license.length; i++) {
  licenceNames.push(license[i].name);
}

const getLicense = (ln = licenseAgurments) => {
  if (typeof ln !== "string") {
    throw new ReferenceError(
      `License name must be valid. Here is a list of licenses: ${license
        .map((x) => x.name)
        .join(",")}`
    );
  } else if (!licenceNames.includes(ln)) {
    throw new ReferenceError(
      `License name must be valid. Here is a list of licenses: ${license
        .map((x) => x.name)
        .join(",")}`
    );
  }
  const _ = searchAndReturn(ln);
  return {
    name: _.name,
    location: _.location,
    data: _.data,
  };
};

const searchAndReturn = (ln = licenseAgurments) => {
  const findIndex = license.find((x) => x.name == ln);
  const getIndex = findIndex;
  const data = {
    name: getIndex.name,
    location: getIndex.location,
  };
  const directory = formatDirname(data.location);
  const textFile = fs.readFileSync(directory, "utf-8");
  return {
    name: data.name,
    location: data.location,
    data: textFile.toString(),
  };
};

const formatDirname = (dirname) => {
  return path.join(dirname.replace("{dirname}", __dirname));
};

const generateLicence = (
  ln = licenseAgurments,
  options = { author: "", date: null }
) => {
  const license = getLicense(ln);
  fs.writeFile(
    `./LICENSE`,
    license.data
      .replace("{author}", options.author)
      .replace("{date}", options.date),
    {},
    (err) => {}
  );
};

module.exports = function (
  ln = licenseAgurments,
  options = { author: "", date: null }
) {
  generateLicence(ln, {
    author: options.author,
    date: options.date
  });
};
