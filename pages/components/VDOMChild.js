/* Analyzed bindings: {
  "item": "props",
  "ref": "setup-const",
  "msg": "setup-ref",
  "show": "setup-ref"
} */
import {
  ref,
  toDisplayString as _toDisplayString,
  openBlock as _openBlock,
  createElementBlock as _createElementBlock,
  createCommentVNode as _createCommentVNode,
  vModelText as _vModelText,
  createElementVNode as _createElementVNode,
  withDirectives as _withDirectives,
  renderList as _renderList,
  Fragment as _Fragment,
  renderSlot as _renderSlot,
} from "../libs/vue.runtime-with-vapor.esm-browser.prod.js";

const _hoisted_1 = { key: 0 };
const _hoisted_2 = { key: 1 };


const __sfc__ = {
  __name: "Comp",
  props: ["item"],
  setup(__props) {
    const msg = ref("Hello World!");
    const show = ref(true);

    return (_ctx, _cache) => {
      return (
        _openBlock(),
        _createElementBlock("div", null, [
          show.value
            ? (_openBlock(),
              _createElementBlock(
                "h1",
                _hoisted_1,
                _toDisplayString(msg.value) +
                  " " +
                  _toDisplayString(__props.item),
                1 /* TEXT */
              ))
            : (_openBlock(), _createElementBlock("h2", _hoisted_2, "foo")),
          _withDirectives(
            _createElementVNode(
              "input",
              {
                "onUpdate:modelValue":
                  _cache[0] || (_cache[0] = ($event) => (msg.value = $event)),
              },
              null,
              512 /* NEED_PATCH */
            ),
            [[_vModelText, msg.value]]
          ),
          (_openBlock(),
          _createElementBlock(
            _Fragment,
            null,
            _renderList(5, (item) => {
              return _createElementVNode(
                "div",
                null,
                _toDisplayString(item),
                1 /* TEXT */
              );
            }),
            64 /* STABLE_FRAGMENT */
          )),
          _cache[1] ||
            (_cache[1] = _createElementVNode(
              "span",
              null,
              "1",
              -1 /* CACHED */
            )),
          _renderSlot(_ctx.$slots, "default"),
        ])
      );
    };
  },
};
__sfc__.__file = "src/Comp.vue";
export default __sfc__;
