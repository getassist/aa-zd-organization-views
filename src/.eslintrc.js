module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        // 'airbnb',
        'plugin:react/recommended',
    ],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: [
        'react',
    ],
    rules: {
        quotes: [1, 'single'],
        semi: [1, 'never'],
        'object-curly-spacing': 'off',
        'quote-props': 'off',
        // indent: [1, 4],
        // 'react/jsx-indent': [1, 4],
        // 'react/jsx-indent-props': [1, 4],
        'jsx-quotes': [1, 'prefer-single'],
        // 'jsx-quotes': 'off',
        'react/jsx-filename-extension': [1, { 'extensions': ['.js', '.jsx'] }],
        'react/function-component-definition': [1, { 'namedComponents': 'arrow-function' }],
        'no-unused-expressions': [1, { 'allowShortCircuit': true, 'allowTernary': true }],
        'max-len': [1, 180],
        'arrow-body-style': [0],
        'react/jsx-props-no-spreading': [0],
        'no-array-index-key': 0,
        'import/prefer-default-export': 0,
        'react/jsx-fragments': 0,
        'react/jsx-no-useless-fragment': 0,
        'react/forbid-prop-types': 0,
        'no-underscore-dangle': 0,
        'react/jsx-one-expression-per-line': [1, {'allow': 'single-child'}],
        'react/require-default-props': 0,
        // 'import/no-extraneous-dependencies': ['error', {'devDependencies': false}],
        'no-param-reassign': ['error', { 'props': false }],
    },
    settings: {
        'import/resolver': {
            node: {
                extensions: ['.js', '.jsx', '.ts', '.tsx'],
                moduleDirectory: ['node_modules', 'src/'],
            },
        },
    },
}
