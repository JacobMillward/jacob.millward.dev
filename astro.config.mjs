import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import shikiConfig from './shiki.config';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
	site: 'https://jacob.millward.dev',
	integrations: [mdx(), sitemap()],
	markdown: {
		shikiConfig: {
			theme: shikiConfig.theme,
		}
	}
});
