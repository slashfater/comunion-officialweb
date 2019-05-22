export default {
  computed: {
    mobile() {
      return isMobile.any;
    }
  },

  methods: {
    leave(el, done) {
      return new TimelineMax({
        tweens: [
          TweenMax.to(this.$el, 1, { autoAlpha: 0, ease: Cubic.easeOut })
        ],
        onComplete: done
      });
    },

    enter(el, done) {
      return new TimelineMax({
        tweens: [
          TweenMax.from(this.$el, 1, { autoAlpha: 0, ease: Cubic.easeOut })
        ],
        onComplete: done
      });
    }
  }
};
