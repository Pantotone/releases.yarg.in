import path from "path";
import { PROFILES_FOLDER } from "./const.js";
import fs from "fs/promises";
import { existsSync } from "fs";
import { glob } from "glob";

/**
 * @param {string} profileUUID
 * @param {string} releaseTag
 * @param {string} releaseDate
 */
export async function GenerateRelease(profileUUID, releaseTag, releaseDate) {
    const profilePath = path.join(PROFILES_FOLDER, profileUUID);

    const uuid = crypto.randomUUID();

    const template = await fs.readFile(path.join(profilePath, "template.json"), { encoding: "utf-8" });
    const output = template
        .replaceAll("{{uuid}}", uuid)
        .replaceAll("{{tag}}", releaseTag)
        .replaceAll("{{release}}", releaseDate);

    await fs.mkdir(path.join(profilePath, "releases"), { recursive: true });
    await fs.writeFile(path.join(profilePath, "releases", `${uuid}.json`), output);
}

/**
 * @param {string} profileUUID
 */
export async function GenerateReleaseList(profileUUID) {
    const profilePath = path.join(PROFILES_FOLDER, profileUUID);

    const releasesGlobPath = path.join(profilePath, "releases", "*.json");
    const releasesGlob = await glob(releasesGlobPath, { windowsPathsNoEscape: true });
    let releases = [];

    for (const releaseFile of releasesGlob) {
        const release = JSON.parse(await fs.readFile(releaseFile, { encoding: "utf-8" }));
        releases.push({
            uuid: release.uuid,
            url: `https://releases.yarg.in/profiles/${profileUUID}/releases/${release.uuid}.json`,
            tag: release.tag,
            release: release.release
        });
    }

    // Sort based on release date, newest first
    releases = releases.sort((a, b) => Date.parse(b.release) - Date.parse(a.release));

    await fs.writeFile(path.join(profilePath, "releases.json"), JSON.stringify(releases, null, 4));
}

/**
 * @param {string} profileUUID
 * @param {string} tag
 */
export async function ContainsReleaseTag(profileUUID, tag) {
    const releasesPath = path.join(PROFILES_FOLDER, profileUUID, "releases.json");
    if (!existsSync(releasesPath)) {
        return false;
    }

    const releases = JSON.parse(await fs.readFile(releasesPath, { encoding: "utf-8" }));

    for (const release of releases) {
        if (release.tag === tag) {
            return true;
        }
    }

    return false;
}
