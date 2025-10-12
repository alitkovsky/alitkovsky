export const localStorageSupported = () => {
    try { 
      const x = "__storage_test__"
      localStorage.setItem(x, x)
      localStorage.removeItem(x)
      return true
    } catch {
      console.warn('localStorage is unsupported or unavailable')
      return false
    }
}