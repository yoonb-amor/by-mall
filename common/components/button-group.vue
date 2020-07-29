

<script>
import { Popover, Button } from "element-ui"
export default {
  name: "fly-button-group",
  components: { Popover, Button },
  props: {
    threshold: { type: Number, default: 3 }
  },
  computed: {
    slots() {
      return this.$slots.default.filter(button => !(!button || !button.data))
    },
    buttons() {
      return this.slots.slice(0, this.threshold)
    },
    restButtons() {
      return this.slots.slice(this.threshold)
    }
  },
  render() {
    return (
      <div>
        {this.buttons}
        {this.slots.length > this.threshold ? (
          <Popover
            placement="bottom"
            trigger="hover"
            popper-class="fly-button-group-popper"
            style={{ display: "inline-block", verticalAlign: "bottom" }}
          >
            {this.restButtons.map(button => (
              <div class="fly-button-group-popper-button">{button}</div>
            ))}
            <Button
              class="fly-button-group-popper-more"
              slot="reference"
              size="mini"
              circle
              icon="el-icon-more"
            ></Button>
          </Popover>
        ) : null}
      </div>
    )
  }
}
</script>

<style lang="less">
@space: 10px;
.fly-button-group-popper {
  min-width: 0px !important;
  text-align: center !important;
  padding: @space !important;
  &-button {
    display: block;
  }
  &-button + &-button {
    margin-top: @space;
  }
  &-more {
    transform: scale(0.6) translateX(@space / 2);
  }
}
</style>