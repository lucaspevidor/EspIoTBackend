module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": [
        "plugin:@typescript-eslint/recommended",
        "prettier/@typescript-eslint",
        "standard"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": 2017,
        "sourceType": "module"
    },
    "plugins": [
        "@typescript-eslint"
    ],
    "rules": {
        // Sets indentation tab
        "indent": ["error", "tab"],        
        // Disable no-tab rule
        "no-tabs": "off",
        // Requires semicolon on end of line
        "semi": ["error", "always"],
    }
};