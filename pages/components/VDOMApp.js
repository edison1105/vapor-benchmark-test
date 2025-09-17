
import {
  ref,
  renderList as _renderList,
  Fragment as _Fragment,
  openBlock as _openBlock,
  createElementBlock as _createElementBlock,
  createElementVNode as _createElementVNode,
  toDisplayString as _toDisplayString,
} from "../libs/vue.runtime-with-vapor.esm-browser.prod.js";

const _hoisted_1 = ["value"];

const __sfc__ = {
  __name: "App",
  setup(__props) {
    const msg = ref("Rendering");

    return (_ctx, _cache) => {
      return (
        _openBlock(),
        _createElementBlock(
          _Fragment,
          null,
          _renderList(window.ITEM_COUNT, (item) => {
            return _createElementVNode("div", null, [
              _createElementVNode(
                "input",
                {
                  value: msg.value,
                  onInput:
                    _cache[0] ||
                    (_cache[0] = ($event) => (msg.value = $event.target.value)),
                },
                null,
                40 /* PROPS, NEED_HYDRATION */,
                _hoisted_1
              ),
              _createElementVNode(
                "h1",
                null,
                _toDisplayString(msg.value),
                1 /* TEXT */
              ),
            ]);
          }),
          64 /* STABLE_FRAGMENT */
        )
      );
    };
  },
};
__sfc__.__file = "src/App.vue";
export default __sfc__;
