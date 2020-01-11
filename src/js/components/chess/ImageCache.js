import {defaultdict} from '../../utils/javascript'

export default class ImageCache {
  /**
   * @param imageMap e.g. {'wQ': '../assets/white-queen.jpg'}
   */
  constructor (imageMap) {
    this._imageCache = defaultdict(k => {
      const imgPath = imageMap[k]
      const img = new Image()
      img.loaded = false
      img.onload = () => {
        img.loaded = true
      }
      img.src = imgPath
      return img
    })
  }

  getImage (name) {
    return this._imageCache.get(name)
  }
}