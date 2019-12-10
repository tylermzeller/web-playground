import * as classUtils from '../utils/class.js'

export default class User {
  constructor (username, thumbnailUrl, bio) {
    this.setUsername(newUsername)
    this.setThumbnailUrl(thumbnailUrl)
    this.setBio(bio)
  }

  setUsername (newUsername) {
    this._username = newUsername
  }

  setThumbnailUrl (newThumbnailUrl) {
    classUtils.defaultStringSetter(this, '_thumbnailUrl', newThumbnailUrl, '')
  }

  setBio (newBio) {
    classUtils.defaultStringSetter(this, '_bio', newBio, '')
  }

  get username () {
    return this._username
  }

  get thumbnailUrl () {
    return this._thumbnailUrl
  }

  set thumbnailUrl (newThumbnailUrl) {
    this.setThumbnailUrl(newThumbnailUrl)
  }

  get bio () {
    return this._bio
  }

  set bio (newBio) {
    this.setBio(newBio)
  }
}
