/* Analyzed bindings: {
  "Comp": "setup-const",
  "ref": "setup-const",
  "msg": "setup-ref"
} */
import {
  renderList as _renderList,
  Fragment as _Fragment,
  openBlock as _openBlock,
  createElementBlock as _createElementBlock,
  toDisplayString as _toDisplayString,
  createElementVNode as _createElementVNode,
  withCtx as _withCtx,
  createVNode as _createVNode,
  ref,
} from "../libs/vue.runtime-with-vapor.esm-browser.prod.js";

import Comp from "./VDOMChild.js";

const __sfc__ = {
  __name: "App",
  setup(__props) {
    const msg = ref("hi");

    return (_ctx, _cache) => {
      return (
        _openBlock(),
        _createElementBlock(
          _Fragment,
          null,
          _renderList(ITEM_COUNT, (item) => {
            return _createVNode(
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
            );
          }),
          64 /* STABLE_FRAGMENT */
        )
      );
    };
  },
};
__sfc__.__file = "src/App.vue";
export default __sfc__;
