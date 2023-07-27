import fs from "fs/promises";
import { LAUNCHER_UPDATE_ORIGIN_URL, LAUNCHER_UPDATE_PATH } from "../utils/const.js";

const raw = await fetch(LAUNCHER_UPDATE_ORIGIN_URL).then(res => res.text());

await fs.writeFile(LAUNCHER_UPDATE_PATH, raw);