import fs from "fs/promises";
import { GetSortedReleases } from "../utils/Github.js";
import { NIGHTLYYARG_RELEASES_PATH } from "../utils/const.js";

const data = await GetSortedReleases("YARC-Official", "YARG-BleedingEdge");
const releases = data.repository.releases.nodes;

await fs.writeFile(NIGHTLYYARG_RELEASES_PATH, JSON.stringify(releases, null, 2));
