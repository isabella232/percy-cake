#!/usr/bin/env node

/**
 *    Copyright 2019 T-Mobile
 *
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 */

/**
 * Script for processing YAML configuration files and converting it to environment specific JSON configuration
 */
import * as config from "config";
import * as commandLineArgs from "minimist";
import {logger} from "./lib/common";
import {Hydrate} from "./lib/hydrate.lib";

// Define command line arguments

const minimistOptions = {
    alias: {
        a: "app",
        f: "file",
        o: "out",
        r: "root",
    },
    boolean: ["root", "app", "file"],
    default: {
        app: false,
        file: false,
        root: false,
    },
    string: ["out"],
};

const getNumberOfOptionsSet = (opts: string[]) => opts.filter((o) => o).length;
const options = commandLineArgs(process.argv.slice(2), minimistOptions);
options.path = options._[0];
if (getNumberOfOptionsSet([options.root, options.app, options.file]) !== 1) {
    logger.error("You should choose one of these options --root, --app, --file");
} else if (!options.path) {
    logger.error("--path is required");
} else if (!options.out) {
    logger.error("--out option is required");
} else {
        main().catch((e) => {
            logger.error(e.message);
        });
    }

async function main() {
    const hydrate = new Hydrate({
        DEFAULT_PERCY_CONFIG: config.get("DEFAULT_PERCY_CONFIG"),
        ENVIRONMENT_FILE_NAME: config.get("ENVIRONMENT_FILE_NAME"),
        LOG_LEVEL: config.get("LOG_LEVEL"),
        PERCY_CONFIG_FILE_NAME: config.get("PERCY_CONFIG_FILE_NAME"),
    });

    if (options.root) {
        return hydrate.hydrateAllApps(options.path, options.out);
    }
    if (options.app) {
        return hydrate.hydrateApp(options.path, undefined, options.out);
    }
    if (options.file) {
        return hydrate.hydrateFile(options.path, undefined, undefined, options.out);
    }
}