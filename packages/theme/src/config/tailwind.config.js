{
  "source": [
    "/Users/yg/GitHub/vue3-monorepo-template/packages/theme/src/tokens/__tokens.json"
  ],
  "hooks": {
    "formats": {}
  },
  "platforms": {
    "tailwind": {
      "transforms": [
        "attribute/cti",
        "name/kebab"
      ],
      "buildPath": "build/web/",
      "files": [
        {
          "destination": "tailwind.config.js",
          "format": "tailwindFormat"
        }
      ]
    }
  }
}