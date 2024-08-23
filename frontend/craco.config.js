const path = require("path");

module.exports = {
  webpack: {
    alias: {
      "@": path.resolve(__dirname, "src/"),
    },
  },
  jest: {
    configure: {
      verbose: true,
      transform: {
        "^.+\\.[tj]sx?$": "babel-jest",
      },
      transformIgnorePatterns: ["/node_modules/(?!(axios)/)"],
      moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1",
      },
    },
  },
  typescript: {
    enableTypeChecking: true /* (default value) */,
  },
};
