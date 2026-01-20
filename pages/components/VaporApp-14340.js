/* Analyzed bindings: {
  "Comp": "setup-const",
  "ref": "setup-const",
  "msg": "setup-ref",
  "show": "setup-ref"
} */
import {
  setInsertionState as _setInsertionState,
  txt as _txt,
  toDisplayString as _toDisplayString,
  setText as _setText,
  renderEffect as _renderEffect,
  createComponent as _createComponent,
  createFor as _createFor,
  createIf as _createIf,
  createInvoker as _createInvoker,
  delegateEvents as _delegateEvents,
  template as _template,
  ref,
} from "../libs/vue.runtime-with-vapor.esm-browser-14340.prod.js";
const t0 = _template("<button>toggle");
const t1 = _template("<span> ");
const t2 = _template("<div>");
_delegateEvents("click");
import Comp from "./VaporChild-14340.js";

const __sfc__ = {
  __name: "App",
  __vapor: true,
  setup(__props) {
    const msg = ref("hi");
    const show = ref(true);

    const n0 = t0();
    const n1 = _createIf(
      () => show.value,
      () => {
        const n8 = t2();
        _setInsertionState(n8, null, 0, true);
        const n3 = _createFor(
          () => ITEM_COUNT,
          (_for_item0) => {
            const n7 = t2();
            _setInsertionState(n7, null, 0, true);
            const n6 = _createComponent(
              Comp,
              { item: () => _for_item0.value },
              {
                default: () => {
                  const n5 = t1();
                  const x5 = _txt(n5);
                  _renderEffect(() =>
                    _setText(x5, _toDisplayString(msg.value)),
                  );
                  return n5;
                },
              },
            );
            return n7;
          },
          undefined,
          5,
        );
        return n8;
      },
    );
    n0.$evtclick = _createInvoker(() => (show.value = !show.value));
    return [n0, n1];
  },
};
__sfc__.__file = "src/App.vue";
export default __sfc__;
