/** @type {import('next').NextConfig} */
const withTM = require("next-transpile-modules")(["react-data-grid"]); // or whatever library giving trouble

module.exports = withTM({
  reactStrictMode: true,
});
