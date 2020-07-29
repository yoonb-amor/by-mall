<template>
  <div
    class="flyui-folder"
    :class="{'open-left': open === 'left', 'open-right': open !== 'left', 'closed': isClosed}"
  >
    <div class="flyui-folder__bar">
      <div class="flyui-folder__bar-icon" @click="toggleCloseStatus"></div>
    </div>
    <div class="flyui-folder__head"></div>
    <div class="flyui-folder__body">
      <slot></slot>
    </div>
  </div>
</template>

<script>
// import FlyUITile from "./flyui-tile";
export default {
  name: "flyui-folder",
  components: {
    // FlyUITile
  },
  props: {
    open: {
      type: String
    }
  },
  data() {
    return {
      isClosed: false
    }
  },
  methods: {
    toggleCloseStatus() {
      this.isClosed = !this.isClosed
    }
  },
  computed: {
    title() {
      return this.$attrs.title
    },
    restArgs() {
      const { title, ...restArgs } = this.$attrs
    }
  }
}
</script>

<style lang="less" scoped>
.arrow-left {
  margin-right: 4px;
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAJCAYAAAALpr0TAAAAeUlEQVQYlY3QMRGAMAyF4Z86wEIrAQt0qQD2TkioBTSw1EUXNCChtYAFFoY014FseffdvVxATS41qX3NpS5GhQdwSARcwGwUSgMEwDRCgJcI8FMu1QJVndoAK6GJwTVgV3ADHhkYgBjcKXEM7v7qnw7+wd17PryN8AsEbC6G9ArZcwAAAABJRU5ErkJggg==)
    no-repeat left;
}
.arrow-right {
  margin-left: 4px;
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAJCAYAAADgkQYQAAAAe0lEQVQYlXXOsRGDMAyF4R9vkBVghKxAGnrSUzGCVyAr0GiA9GqYgRGUVZLGxYvuUKN78neSMY+KlHlU87jprACbeWwyG4FDYWm9JnhX2JnHVx5fDYwtn8Cj8F8V6NPGOaMV+Eh+L9OwK1qXadgTeOrHLwEA5jHrvZwBfsT6Ko8UYWCGAAAAAElFTkSuQmCC)
    no-repeat left;
}
.flyui-folder {
  display: inline-block;
  overflow: hidden;
  transition: max-width 0.2s ease;
  max-width: 100%;
  &__bar {
    background: #d6e4fb;
    height: 14px;
    &-icon {
      cursor: pointer;
      width: 14px;
      height: 14px;
      display: inline-block;
    }
  }
  &__head {
    background: #f9fbfd;
  }
  &__body {
    text-align: left;
  }
  &.open-left {
    border-top-right-radius: 8px;
  }
  &.open-left &__bar {
    text-align: left;
  }
  &.open-right {
    border-top-left-radius: 8px;
  }
  &.open-right &__bar {
    text-align: right;
  }
  &.open-left &__bar-icon,
  &.open-right.closed &__bar-icon {
    &:extend(.arrow-right);
  }
  &.open-right &__bar-icon,
  &.open-left.closed &__bar-icon {
    &:extend(.arrow-left);
  }
  &.open-left.closed,
  &.open-right.closed {
    max-width: 20px;
    background: #d6e4fb;
    .flyui-folder {
      &__head,
      &__body {
        visibility: hidden;
      }
    }
  }
}
</style>
