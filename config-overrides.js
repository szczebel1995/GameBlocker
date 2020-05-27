// module.exports = function override(config) {
//   config.target = "electron-renderer";
//   return config;
// };

module.exports = {
  jest: function (config) {
    config.setupFilesAfterEnv = ["./jest.setup.js"];
    // config.target = "electron-renderer";
    return config;
  },
};
