
      export interface IntrospectionResultData {
        __schema: {
          types: {
            kind: string;
            name: string;
            possibleTypes: {
              name: string;
            }[];
          }[];
        };
      }

      const result: IntrospectionResultData = {
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
        "name": "TmdbMedia",
        "possibleTypes": [
          {
            "name": "TmdbMovie"
          },
          {
            "name": "TmdbTv"
          },
          {
            "name": "TmdbPerson"
          }
        ]
      }
    ]
  }
};

      export default result;
    