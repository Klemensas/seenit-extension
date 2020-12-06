"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const result = {
    "__schema": {
        "types": [
            {
                "kind": "UNION",
                "name": "Item",
                "possibleTypes": [
                    {
                        "name": "Movie"
                    },
                    {
                        "name": "Tv"
                    }
                ]
            },
            {
                "kind": "UNION",
                "name": "TvItem",
                "possibleTypes": [
                    {
                        "name": "Season"
                    },
                    {
                        "name": "Episode"
                    }
                ]
            },
            {
                "kind": "UNION",
                "name": "TmdbMedia",
                "possibleTypes": [
                    {
                        "name": "TmdbMovie"
                    },
                    {
                        "name": "TmdbTv"
                    }
                ]
            }
        ]
    }
};
exports.default = result;
//# sourceMappingURL=fragments.js.map