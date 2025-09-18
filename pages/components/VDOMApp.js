/* Analyzed bindings: {
  "Comp": "setup-const",
  "ref": "setup-const",
  "msg": "setup-ref",
  "show": "setup-ref"
} */
import {
  ref,
  createElementVNode as _createElementVNode,
  renderList as _renderList,
  Fragment as _Fragment,
  openBlock as _openBlock,
  createElementBlock as _createElementBlock,
  toDisplayString as _toDisplayString,
  withCtx as _withCtx,
  createVNode as _createVNode,
  createCommentVNode as _createCommentVNode,
} from "../libs/vue.runtime-with-vapor.esm-browser.prod.js";

import Comp from "./VDOMChild.js";

const __sfc__ = {
  __name: "App",
  setup(__props) {
    const msg = ref("hi");
    const show = ref(true);

    return (_ctx, _cache) => {
      return (
        _openBlock(),
        _createElementBlock(
          _Fragment,
          null,
          [
            _createElementVNode(
              "button",
              {
                onClick:
                  _cache[0] ||
                  (_cache[0] = ($event) => (show.value = !show.value)),
              },
              "toggle"
            ),
            show.value
              ? (_openBlock(),
                _createElementBlock(
                  _Fragment,
                  { key: 0 },
                  _renderList(window.ITEM_COUNT, (item) => {
                    return _createElementVNode("div", null, [
                      _createVNode(
                        Comp,
                        { item: item },
                        {
                          default: _withCtx(() => [
                            _createElementVNode(
                              "span",
                              null,
                              _toDisplayString(msg.value),
                              1 /* TEXT */
                            ),
                          ]),
                          _: 2 /* DYNAMIC */,
                        },
                        1032 /* PROPS, DYNAMIC_SLOTS */,
                        ["item"]
                      ),
                    ]);
                  }),
                  64 /* STABLE_FRAGMENT */
                ))
              : _createCommentVNode("v-if", true),
          ],
          64 /* STABLE_FRAGMENT */
        )
      );
    };
  },
};
__sfc__.__file = "src/App.vue";
export default __sfc__;
