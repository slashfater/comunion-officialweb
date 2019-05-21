class Mixer {
  constructor (options) {
    this._name = 'Mixer'

    this._mobile = isMobile.any

    this._muted = false

    this._silent = false

    this._active = true

    this._hidden = null

    this._channels = {}

    this._collection = {
      ambient: {
        src: 'audio/ambient.mp3',
        type: 'audio/mpeg',
        loop: true,
        volume: 0.75
      },

      section: {
        src: 'audio/sections.mp3',
        type: 'audio/mpeg',
        loop: false,
        volume: 1
      },

      swipe: {
        src: 'audio/scroll-fx.mp3',
        type: 'audio/mpeg',
        loop: false,
        volume: 1
      },

      hover: {
        src: 'audio/hover-button.mp3',
        type: 'audio/mpeg',
        loop: false,
        volume: 0.1
      },

      menu: {
        src: 'audio/menu-in-out.mp3',
        type: 'audio/mpeg',
        loop: false,
        volume: 1
      },

      tic: { src: 'audio/tic.mp3', type: 'audio/mpeg', loop: false, volume: 1 }
    }

    this.setup()
  }

  setup () {
    for (let key in this._collection) {
      let track = document.createElement('audio')
      let model = this._collection[key]

      track.volume = model.volume

      track.type = model.type

      track.loop = model.loop

      track.src = model.src

      this._channels[key] = track
    }

    if (typeof document.hidden !== 'undefined') {
      let hidden, visibilityChange

      if (typeof document.hidden !== 'undefined') {
        // Opera 12.10 and Firefox 18 and later support

        hidden = 'hidden'

        visibilityChange = 'visibilitychange'
      } else if (typeof document.msHidden !== 'undefined') {
        hidden = 'msHidden'

        visibilityChange = 'msvisibilitychange'
      } else if (typeof document.webkitHidden !== 'undefined') {
        hidden = 'webkitHidden'

        visibilityChange = 'webkitvisibilitychange'
      }

      this._hidden = hidden

      document.addEventListener(
        visibilityChange,
        this.visibility.bind(this),
        false
      )
    }

    if (/* @cc_on!@ */ false) {
      // check for Internet Explorer
      // document.onfocusin = this.focus.bind( this )
      // document.onfocusout = this.blur.bind( this )
    } else {
      // window.onfocus = this.focus.bind( this )
      // window.onblur = this.blur.bind( this )
    }
  }

  visibility () {
    let hidden = document[this._hidden]

    if (hidden) {
      for (let key in this._channels) {
        let track = this._channels[key]

        TweenMax.set(track, { volume: 0 })
      }
    } else this.update(this._muted, this._silent)
  }

  play (track) {
    if (this._mobile) return

    this._channels[track].currentTime = 0

    // this._channels[track] &&
    //   this._channels[track].play &&
    //   this._channels[track].play();
  }

  toggle () {
    if (this._muted) this.unmute()
    else this.mute()
  }

  mute () {
    this._muted = true

    this.update(this._muted, this._silent)
  }

  unmute () {
    this._muted = false

    this.update(this._muted, this._silent)
  }

  quiet () {
    this._silent = true

    this.update(this._muted, this._silent)
  }

  resume () {
    this._silent = false

    this.update(this._muted, this._silent)
  }

  update (muted, silent) {
    for (let key in this._channels) {
      let track = this._channels[key]
      let volume = !muted && !silent ? this._collection[key].volume : 0

      TweenMax.to(track, 1, { volume, ease: Cubic.easeInOut })
    }
  }
}

export default {
  install (Vue) {
    let mixer = new Mixer()

    Object.defineProperty(Vue.prototype, '$mixer', {
      get () {
        return mixer
      }
    })
  }
}
