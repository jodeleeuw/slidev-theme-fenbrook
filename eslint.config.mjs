import pluginVue from 'eslint-plugin-vue'
import tseslint from 'typescript-eslint'

// `essential` = correctness rules only, no stylistic churn on existing code.
export default tseslint.config(
  { ignores: ['node_modules/', 'dist/', 'demo/'] },
  ...pluginVue.configs['flat/essential'],
  {
    files: ['**/*.vue'],
    languageOptions: {
      parserOptions: { parser: tseslint.parser },
    },
    rules: {
      'vue/no-v-html': 'warn',
      // Layout and component files are referenced by name from slides
      // (e.g. `layout: cover`), so single-word names are intentional.
      'vue/multi-word-component-names': 'off',
    },
  },
)
