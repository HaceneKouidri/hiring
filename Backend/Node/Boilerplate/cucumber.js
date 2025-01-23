module.exports = {
    default: {
      // Charge ts-node/register pour compiler TS => JS CommonJS
      requireModule: ["ts-node/register"],
      // On utilise "require" pour pointer vers les step definitions
      require: [
        "src/features/World/cucumber-world.ts",
        "src/features/step_definitions/**/*.ts"],
      publishQuiet: true,
      paths: ["src/features/*.feature"]
    }
 };
  