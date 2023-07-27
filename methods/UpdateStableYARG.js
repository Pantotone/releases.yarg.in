import fs from "fs/promises";
import { GetSortedReleases } from "../utils/GetReleases.js";
import { STABLEYARG_RELEASES_PATH } from "../utils/const.js";

const data = await GetSortedReleases("YARC-Official", "YARG");
const releases = data.repository.releases.nodes;

await fs.writeFile(STABLEYARG_RELEASES_PATH, JSON.stringify(releases, null, 2));