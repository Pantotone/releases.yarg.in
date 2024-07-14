import fs from "fs/promises";
import path from "path";

import { APPLICATIONS_PROFILES_FOLDER } from "../utils/const.js";
import { GetSortedReleases } from "../utils/Github.js";

const data = await GetSortedReleases("YARC-Official", "YARG-BleedingEdge", 1);
const releases = data.repository.releases.nodes;

if (releases.length < 1) {
  console.log("::error Less then one releases received");
  process.exit(1);
}

const latestRelease = releases[0];
const currentTag = latestRelease.tagName;

const uuid = crypto.randomUUID();

const output = {
  type: "application",
  uuid,
  version: currentTag,

  metadata: {
    locales: {
      "en-US": {
        name: "YARG",
        releaseName: "Nightly",

        description: "This is the nightly verison of YARG",

        iconUrl: "",
        bannerBackUrl: "",
      },
    },

    releaseDate: latestRelease.publishedAt,
    websiteUrl: `https://yarg.in/changelogs/nightly/${currentTag}`,
  },

  content: [
    {
      name: "YARG Nightly - Windows",
      platforms: ["windows"],
      files: [
        {
          url: `https://github.com/YARC-Official/YARG-BleedingEdge/releases/download/${currentTag}/YARG_${currentTag}-Windows-x64.zip`,
          fileType: "zip",
        },
      ],
    },
    {
      name: "YARG Nightly - MacOS",
      platforms: ["macos"],
      files: [
        {
          url: `https://github.com/YARC-Official/YARG-BleedingEdge/releases/download/${currentTag}/YARG_${currentTag}-MacOS-Universal.zip`,
          fileType: "zip",
        },
      ],
    },
    {
      name: "YARG Nightly - Linux",
      platforms: ["linux"],
      files: [
        {
          url: `https://github.com/YARC-Official/YARG-BleedingEdge/releases/download/${currentTag}/YARG_${currentTag}-Linux-x64.zip`,
          fileType: "zip",
        },
      ],
    },
  ],

  launchOptions: {
    windows: {
      executablePath: "./YARG.exe",
      arguments: [],
    },
    macos: {
      executablePath: "./YARG.app/Contents/MacOS/YARG",
      arguments: [],
    },
    linux: {
      executablePath: "./YARG",
      arguments: [],
    },
  },
};

await fs.mkdir(APPLICATIONS_PROFILES_FOLDER, { recursive: true });

const savePath = path.join(APPLICATIONS_PROFILES_FOLDER, uuid);
await fs.writeFile(savePath, JSON.stringify(output, null, 2));
