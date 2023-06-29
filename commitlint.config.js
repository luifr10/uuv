module.exports = {
    extends: ['@commitlint/config-conventional', '@commitlint/config-nx-scopes'],
    rules: {
        "footer-max-line-length": [1, "always", 100],
        "body-max-line-length": [1, "always", 100],
        "type-enum": [2, "always", [
            "build",
            "chore",
            "ci",
            "docs",
            "feat",
            "fix",
            "perf",
            "refactor",
            "revert",
            "style",
            "test",
            "release"
        ]],
    }
};