import { readFile, writeFile, mkdir } from 'fs/promises'
import path from 'path'

const DATA_DIR = path.join(process.cwd(), 'data')

async function ensureDataDir() {
  try {
    await mkdir(DATA_DIR, { recursive: true })
  } catch {
    // Already exists
  }
}

export async function readJsonFile<T>(filename: string, fallback: T): Promise<T> {
  try {
    await ensureDataDir()
    const content = await readFile(path.join(DATA_DIR, filename), 'utf-8')
    return JSON.parse(content) as T
  } catch {
    return fallback
  }
}

export async function writeJsonFile<T>(filename: string, data: T): Promise<void> {
  try {
    await ensureDataDir()
    await writeFile(
      path.join(DATA_DIR, filename),
      JSON.stringify(data, null, 2),
      'utf-8'
    )
  } catch (e) {
    console.error(`[JSON Store] Failed to write ${filename}:`, e)
  }
}
