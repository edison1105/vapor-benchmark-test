/* Analyzed bindings: {
  "item": "props",
  "ref": "setup-const",
  "msg": "setup-ref",
  "show": "setup-ref"
} */
import {
  ref,
  setInsertionState as _setInsertionState,
  txt as _txt,
  toDisplayString as _toDisplayString,
  setText as _setText,
  renderEffect as _renderEffect,
  createIf as _createIf,
  nthChild as _nthChild,
  next as _next,
  createFor as _createFor,
  createSlot as _createSlot,
  applyTextModel as _applyTextModel,
  template as _template,
  child as _child,
} from "../libs/vue.runtime-with-vapor.esm-browser.prod.js";
const t0 = _template("<h1> </h1>");
const t1 = _template("<h2>foo</h2>");
const t2 = _template("<div> </div>");
const t3 = _template("<div><input><!><span>1</span></div>", true);

const __sfc__ = {
  __name: "Comp",
  props: ["item"],
  __vapor: true,
  setup(__props) {
    const msg = ref("Hello World!");
    const show = ref(true);

    const n10 = t3();
    const n5 = _child(n10, 1)
    const n11 = _next(n5, 2);
    _setInsertionState(n10, 0);
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
      },
      () => {
        const n4 = t1();
        return n4;
      }
    );
    _setInsertionState(n10, n11);
    const n6 = _createFor(
      () => 5,
      (_for_item0) => {
        const n8 = t2();
        const x8 = _txt(n8);
        _renderEffect(() => _setText(x8, _toDisplayString(_for_item0.value)));
        return n8;
      },
      undefined,
      4
    );
    _setInsertionState(n10, 2);
    const n9 = _createSlot("default", null);
    _applyTextModel(
      n5,
      () => msg.value,
      (_value) => (msg.value = _value)
    );
    return n10;
  },
};
__sfc__.__file = "src/Comp.vue";
export default __sfc__;
