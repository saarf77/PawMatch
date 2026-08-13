// Simple key-value storage using expo-file-system (works in Expo Go without native rebuild)
import * as FileSystem from "expo-file-system/legacy"
import { Platform } from "react-native"

const BASE = (FileSystem.documentDirectory ?? "") + "kv/"

function getWebStorage(): Storage | null {
  if (Platform.OS !== "web") return null
  try {
    return globalThis.localStorage
  } catch {
    return null
  }
}

async function ensureDir() {
  const info = await FileSystem.getInfoAsync(BASE)
  if (!info.exists) await FileSystem.makeDirectoryAsync(BASE, { intermediates: true })
}

function keyPath(key: string): string {
  return BASE + key.replace(/[^a-zA-Z0-9_-]/g, "_") + ".json"
}

export async function storageGet(key: string): Promise<string | null> {
  try {
    const webStorage = getWebStorage()
    if (webStorage) return webStorage.getItem(key)
    await ensureDir()
    const path = keyPath(key)
    const info = await FileSystem.getInfoAsync(path)
    if (!info.exists) return null
    return await FileSystem.readAsStringAsync(path)
  } catch {
    return null
  }
}

export async function storageSet(key: string, value: string): Promise<void> {
  try {
    const webStorage = getWebStorage()
    if (webStorage) {
      webStorage.setItem(key, value)
      return
    }
    await ensureDir()
    await FileSystem.writeAsStringAsync(keyPath(key), value)
  } catch (e) {
    console.error("storageSet error:", e)
  }
}

export async function storageRemove(key: string): Promise<void> {
  try {
    const webStorage = getWebStorage()
    if (webStorage) {
      webStorage.removeItem(key)
      return
    }
    const path = keyPath(key)
    const info = await FileSystem.getInfoAsync(path)
    if (info.exists) await FileSystem.deleteAsync(path)
  } catch {
    // ignore
  }
}
