import { GetSortedReleases } from "../utils/Github.js";
import { ContainsReleaseTag, GenerateRelease, GenerateReleaseList } from "../utils/ProfileReleases.js";

const profileUUID = "2d78800c-1397-496a-83c1-50759607999a";

const data = await GetSortedReleases("YARC-Official", "YARG", 1);
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
