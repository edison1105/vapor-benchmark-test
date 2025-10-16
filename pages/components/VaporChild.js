/* Analyzed bindings: {
  "item": "props",
  "ref": "setup-const",
  "msg": "setup-ref",
  "show": "setup-ref"
} */
import {
  txt as _txt,
  toDisplayString as _toDisplayString,
  setText as _setText,
  renderEffect as _renderEffect,
  createIf as _createIf,
  createFor as _createFor,
  createSlot as _createSlot,
  applyTextModel as _applyTextModel,
  template as _template,
  ref,
} from "../libs/vue.runtime-with-vapor.esm-browser.prod.js";
const t0 = _template("<h1> </h1>");
const t1 = _template("<input>");
const t2 = _template("<div> </div>");
const t3 = _template("<span></span>");

const __sfc__ = {
  __name: "Comp",
  props: ["item"],
  __vapor: true,
  setup(__props) {
    const msg = ref("Hello World!");
    const show = ref(true);

    const n0 = _createIf(
      () => show.value,
      () => {
        const n2 = t0();
        const x2 = _txt(n2);
        _renderEffect(() =>
          _setText(
            x2,
            _toDisplayString(msg.value) + " " + _toDisplayString(__props.item)
          )
        );
        return n2;
      }
    );
    const n3 = t1();
    const n4 = _createFor(
      () => 5,
      (_for_item0) => {
        const n6 = t2();
        const x6 = _txt(n6);
        _renderEffect(() => _setText(x6, _toDisplayString(_for_item0.value)));
        return n6;
      },
      undefined,
      4
    );
    const n7 = _createSlot("default", null);
    const n8 = t3();
    _applyTextModel(
      n3,
      () => msg.value,
      (_value) => (msg.value = _value)
    );
    return [n0, n3, n4, n7, n8];
  },
};
__sfc__.__file = "src/Comp.vue";
export default __sfc__;
