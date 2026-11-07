// Prints the addresses to open the website from this computer and from other
// devices on the same Wi-Fi. Runs automatically before `npm run dev` / `npm start`.
import os from "node:os";

const PORT = process.env.PORT || "7000";
const lan = Object.values(os.networkInterfaces())
  .flat()
  .filter((n) => n && n.family === "IPv4" && !n.internal)
  .map((n) => n.address);

console.log("\n  Enerceon website");
console.log(`  This computer:   http://localhost:${PORT}`);
if (lan.length) {
  for (const ip of lan) console.log(`  Phone / network: http://${ip}:${PORT}`);
} else {
  console.log("  Phone / network: no network connection found");
}
console.log("  (If the phone cannot connect, allow TCP port " + PORT + " in the firewall — see README.)\n");
