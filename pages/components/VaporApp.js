/* Analyzed bindings: {
  "Comp": "setup-const",
  "ref": "setup-const",
  "msg": "setup-ref",
  "show": "setup-ref"
} */
import {
  child as _child,
  setInsertionState as _setInsertionState,
  txt as _txt,
  toDisplayString as _toDisplayString,
  setText as _setText,
  renderEffect as _renderEffect,
  createComponent as _createComponent,
  createFor as _createFor,
  createIf as _createIf,
  delegateEvents as _delegateEvents,
  template as _template,
  ref,
} from "../libs/vue.runtime-with-vapor.esm-browser.prod.js";
const t0 = _template("<span> </span>");
const t1 = _template("<div></div>");
const t2 = _template("<div><button>toggle</button></div>", true);
_delegateEvents("click");
import Comp from "./VaporChild.js";

const __sfc__ = {
  __name: "App",
  __vapor: true,
  setup(__props) {
    const msg = ref("hi");
    const show = ref(true);

    const n9 = t2();
    const n0 = _child(n9, 0);
    _setInsertionState(n9, 1, true);
    const n1 = _createIf(
      () => show.value,
      () => {
        const n8 = t1();
        _setInsertionState(n8, null, true);
        const n3 = _createFor(
          () => ITEM_COUNT,
          (_for_item0) => {
            const n7 = t1();
            _setInsertionState(n7, null, true);
            const n6 = _createComponent(
              Comp,
              { item: () => _for_item0.value },
              {
                default: () => {
                  const n5 = t0();
                  const x5 = _txt(n5);
                  _renderEffect(() =>
                    _setText(x5, _toDisplayString(msg.value))
                  );
                  return n5;
                },
              }
            );
            return n7;
          },
          undefined,
          5
        );
        return n8;
      }
    );
    n0.$evtclick = () => (show.value = !show.value);
    return n9;
  },
};
__sfc__.__file = "src/App.vue";
export default __sfc__;
