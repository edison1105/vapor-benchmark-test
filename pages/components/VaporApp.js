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
  createIf as _createIf,
  delegateEvents as _delegateEvents,
  applyTextModel as _applyTextModel,
  createSlot as _createSlot,
  setValue as _setValue,
  next as _next,
  child as _child,
} from "../libs/vue.runtime-with-vapor.esm-browser.prod.js"
const t0 = _template("<div><input><h1> </h1></div>", true)
_delegateEvents("input")


const __sfc__ = {
  __name: 'App',
  __vapor: true,
  setup(__props) {

const msg = ref('Rendering')


  const n0 = _createFor(() => (window.ITEM_COUNT), (_for_item0) => {
    const n4 = t0()
    const n2 = _child(n4)
    const n3 = _next(n2)
    n2.$evtinput = $event => (msg.value = $event.target.value)
    const x3 = _txt(n3)
    _renderEffect(() => {
      const _msg = msg.value
      _setValue(n2, _msg)
      _setText(x3, _toDisplayString(_msg))
    })
    return n4
  }, undefined, 4)
  return n0

}

}
__sfc__.__file = "src/App.vue"
export default __sfc__