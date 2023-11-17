import path from "path";

export const LAUNCHER_UPDATE_ORIGIN_URL = "https://gist.githubusercontent.com/EliteAsian123/7f0525ad6c1a8496b52ede4e41690fb7/raw/update.json";

export const STATIC_PATH = "publish/";
export const STABLEYARG_RELEASES_PATH = path.join(STATIC_PATH, "StableYARG", "releases.json");
export const NIGHTLYYARG_RELEASES_PATH = path.join(STATIC_PATH, "NightlyYARG", "releases.json");
export const NEWENGINEYARG_RELEASES_PATH = path.join(STATIC_PATH, "NewEngine", "releases.json");
export const LAUNCHER_UPDATE_PATH = path.join(STATIC_PATH, "launcher", "update.json");
