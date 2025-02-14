# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.3.0] - 2022-04-12
### Added
- Added hooks for generating the rules.php file, and improved functionality and class names.

## [0.2.0] - 2022-04-06
### Added
- Added Jetpack WAF standalone mode.

### Fixed
- Fix normalizing nested array targets, like with query strings.

## [0.1.1] - 2022-03-29
### Fixed
- Fixed instance of normalizeHeaderName that wasn't renamed; fixed header parsing; removed unused compiler file.

## 0.1.0 - 2022-02-16
### Added
- Added executing the WAF as part of the Jetpack plugin.
- Added Initial version

### Changed
- Core: do not ship .phpcs.dir.xml in production builds.

[0.3.0]: https://github.com/Automattic/jetpack-waf/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/Automattic/jetpack-waf/compare/v0.1.1...v0.2.0
[0.1.1]: https://github.com/Automattic/jetpack-waf/compare/v0.1.0...v0.1.1
