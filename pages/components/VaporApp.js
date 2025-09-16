/* Analyzed bindings: {
  "Comp": "setup-const",
  "ref": "setup-const",
  "msg": "setup-ref"
} */
import {
  ref,
  txt as _txt,
  toDisplayString as _toDisplayString,
  setText as _setText,
  renderEffect as _renderEffect,
  createComponent as _createComponent,
  createFor as _createFor,
  template as _template,
} from "../libs/vue.runtime-with-vapor.esm-browser.prod.js"


const t0 = _template("<span> </span>");
import Comp from "./VaporChild.js";

const __sfc__ = {
  __name: "App",
  __vapor: true,
  setup(__props) {
    const msg = ref("hi");

    const n0 = _createFor(
      () => window.ITEM_COUNT,
      (_for_item0) => {
        const n3 = _createComponent(
          Comp,
          { item: () => _for_item0.value },
          {
            default: () => {
              const n2 = t0();
              const x2 = _txt(n2);
              _renderEffect(() => _setText(x2, _toDisplayString(msg.value)));
              return n2;
            },
          }
        );
        return n3;
      },
      undefined,
      4
    );
    return n0;
  },
};
__sfc__.__file = "src/App.vue";
export default __sfc__;
