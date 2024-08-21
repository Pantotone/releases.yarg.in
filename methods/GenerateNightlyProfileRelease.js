import { GetSortedReleases } from "../utils/Github.js";
import { ContainsReleaseTag, GenerateRelease, GenerateReleaseList } from "../utils/ProfileReleases.js";

const profileUUID = "35dc0e7e-e9b5-49f3-881d-8dbed8678dc7";

const data = await GetSortedReleases("YARC-Official", "YARG-BleedingEdge", 1);
const releases = data.repository.releases.nodes;
if (releases.length < 1) {
    console.log("::error Less than one releases received");
    process.exit(1);
}

const latestRelease = releases[0];

if (!await ContainsReleaseTag(profileUUID, latestRelease.tagName)) {
    await GenerateRelease(profileUUID, latestRelease.tagName, latestRelease.publishedAt);
    await GenerateReleaseList(profileUUID);
}
