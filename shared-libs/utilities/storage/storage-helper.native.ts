import { PERMANENT_STORAGE_KEY_WHITELIST } from './storage-constants'
import AsyncStorage from '@react-native-async-storage/async-storage'

export class StorageControllerHelper {
  public static async clearAllButWhitelist() {
    const allKeys = await AsyncStorage.getAllKeys()
    const keysToRemove = allKeys.filter((key) => !PERMANENT_STORAGE_KEY_WHITELIST.includes(key))
    await AsyncStorage.multiRemove(keysToRemove)
  }
}
