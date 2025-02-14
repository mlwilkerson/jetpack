/**
 * This is a workaround for a feature not available in ESLint, yet.
 *
 * @see https://github.com/eslint/eslint/issues/3458
 * @todo Remove this when the above feature is natively available in ESLint
 */
require( '@rushstack/eslint-patch/modern-module-resolution' );

/**
 * @type {import("eslint").Linter.Config}
 */
module.exports = {
	extends: [ './base', 'plugin:jest/recommended' ],
	env: { jest: true },
	rules: {
		'jsdoc/check-tag-names': [
			1, // Recommended
			{ definedTags: [ 'jest-environment' ] },
		],
	},
};
