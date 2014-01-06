/**
 * @overview NPM Module index: include all the core modules, I18n files will be loaded on the fly.
 * @author Gregory Wild-Smith <gregory@wild-smith.com>
 */
require("./src/core/i18n.js");
require("./src/core/core.js");
require("./src/core/parser.js");
require("./src/core/sugarpak.js");
require("./src/core/extras.js");
require("./src/core/time.js");
/*
 * Notice that there is no model.export or exports. This is not required as it modifies the Date object and it's prototypes.
 */