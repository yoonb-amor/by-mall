<template>
  <div class="fly-folder">
    <div class="inner" :class="{'close': isClose}">
      <div class="main">
        <slot></slot>
        <div class="opener" @click="toggleClose(true)"></div>
      </div>
      <div class="closer" @click="toggleClose(false)"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "fly-folder",
  data() {
    return {
      isClose: false
    }
  },
  methods: {
    toggleClose(is) {
      this.isClose = is
      if (is) {
        this.$emit("close")
      } else {
        this.$emit("open")
      }
    }
  }
}
</script>

<style lang="less" scoped>
@space: 10px;
.fly-folder {
  width: 100%;
  height: 100%;
  .inner {
    width: 100%;
    height: 100%;
    .main {
      position: relative;
      width: 100%;
      height: 100%;
      .opener {
        cursor: pointer;
        position: absolute;
        top: @space * 1.5;
        right: @space;
        width: @space;
        height: @space;
        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAJCAYAAAALpr0TAAAAeUlEQVQYlY3QMRGAMAyF4Z86wEIrAQt0qQD2TkioBTSw1EUXNCChtYAFFoY014FseffdvVxATS41qX3NpS5GhQdwSARcwGwUSgMEwDRCgJcI8FMu1QJVndoAK6GJwTVgV3ADHhkYgBjcKXEM7v7qnw7+wd17PryN8AsEbC6G9ArZcwAAAABJRU5ErkJggg==)
          no-repeat left;
      }
    }
    .closer {
      cursor: pointer;
      display: none;
      position: absolute;
      left: 0;
      top: @space * 1.5;
      width: @space;
      height: @space;
      background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAJCAYAAADgkQYQAAAAe0lEQVQYlXXOsRGDMAyF4R9vkBVghKxAGnrSUzGCVyAr0GiA9GqYgRGUVZLGxYvuUKN78neSMY+KlHlU87jprACbeWwyG4FDYWm9JnhX2JnHVx5fDYwtn8Cj8F8V6NPGOaMV+Eh+L9OwK1qXadgTeOrHLwEA5jHrvZwBfsT6Ko8UYWCGAAAAAElFTkSuQmCC)
        no-repeat left;
    }
    &.close {
      .main {
        display: none;
      }
      .closer {
        display: block;
      }
    }
  }
}
</style>