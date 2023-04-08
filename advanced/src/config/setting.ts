import path from "path";

(async () => {
  (await import("dotenv")).config({ path: path.join(__dirname, "../.env") });
})();

export default {
  jwt: {
    secret: "DAF857A1240D46FED4FDEA13016F2FC126C4D4C1C84056B082A176238C166BD7",
    ttl: 60 * 60, // 1 hour
  },
};
