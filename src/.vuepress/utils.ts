import { existsSync, readdirSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

/** 定位 docsDir（含 notes 的源目录），兼容 esbuild 重定位 config 的情况。 */
function findSrcDir(): string | null {
	const candidates: string[] = []
	try {
		candidates.push(fileURLToPath(new URL('..', import.meta.url)))
	} catch {
		/* ignore */
	}
	candidates.push(join(process.cwd(), 'src'), join(process.cwd(), 'docs'))
	for (const dir of candidates) if (existsSync(join(dir, 'notes'))) return dir
	return null
}

/**
 * 收集 src/notes 下所有页面在站点中的路径，
 * 用于把私人笔记排除出 sitemap（留在站内但不主动公开、不被搜索引擎收录）。
 */
export function collectNotePaths(sub = 'notes'): string[] {
	const srcDir = findSrcDir()
	if (!srcDir) return []
	const root = join(srcDir, sub)
	if (!existsSync(root)) return []
	const out: string[] = []
	const walk = (dir: string): void => {
		for (const name of readdirSync(dir)) {
			const full = join(dir, name)
			if (statSync(full).isDirectory()) walk(full)
			else if (name.endsWith('.md')) {
				const rel = relative(srcDir, full).split('\\').join('/')
				const pagePath = rel.endsWith('README.md')
					? `/${rel.slice(0, -'README.md'.length)}`
					: `/${rel.slice(0, -3)}.html`
				// VuePress 去掉文件名开头的下划线、并可能保留百分号编码，三种形态都排除
				const noUnder = pagePath.replace(/\/_+(?=[^/]*$)/, '/')
				out.push(pagePath, noUnder, encodeURI(pagePath), encodeURI(noUnder))
			}
		}
	}
	walk(root)
	return out
}
