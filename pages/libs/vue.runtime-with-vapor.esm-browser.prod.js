/**
* vue v3.6.0-alpha.2
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function makeMap(str) {
  const map = /* @__PURE__ */ Object.create(null);
  for (const key of str.split(",")) map[key] = 1;
  return (val) => val in map;
}

const EMPTY_OBJ = {};
const EMPTY_ARR = [];
const NOOP = () => {
};
const YES = () => true;
const NO = () => false;
const isOn = (key) => key.charCodeAt(0) === 111 && key.charCodeAt(1) === 110 && // uppercase letter
(key.charCodeAt(2) > 122 || key.charCodeAt(2) < 97);
const isNativeOn = (key) => key.charCodeAt(0) === 111 && key.charCodeAt(1) === 110 && // lowercase letter
key.charCodeAt(2) > 96 && key.charCodeAt(2) < 123;
const isModelListener = (key) => key.startsWith("onUpdate:");
const extend = Object.assign;
const remove$1 = (arr, el) => {
  const i = arr.indexOf(el);
  if (i > -1) {
    arr.splice(i, 1);
  }
};
const hasOwnProperty$1 = Object.prototype.hasOwnProperty;
const hasOwn = (val, key) => hasOwnProperty$1.call(val, key);
const isArray = Array.isArray;
const isMap = (val) => toTypeString(val) === "[object Map]";
const isSet = (val) => toTypeString(val) === "[object Set]";
const isDate = (val) => toTypeString(val) === "[object Date]";
const isRegExp = (val) => toTypeString(val) === "[object RegExp]";
const isFunction = (val) => typeof val === "function";
const isString = (val) => typeof val === "string";
const isSymbol = (val) => typeof val === "symbol";
const isObject = (val) => val !== null && typeof val === "object";
const isPromise = (val) => {
  return (isObject(val) || isFunction(val)) && isFunction(val.then) && isFunction(val.catch);
};
const objectToString = Object.prototype.toString;
const toTypeString = (value) => objectToString.call(value);
const toRawType = (value) => {
  return toTypeString(value).slice(8, -1);
};
const isPlainObject = (val) => toTypeString(val) === "[object Object]";
const isIntegerKey = (key) => isString(key) && key !== "NaN" && key[0] !== "-" && "" + parseInt(key, 10) === key;
const isReservedProp = /* @__PURE__ */ makeMap(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
);
const isBuiltInTag = /* @__PURE__ */ makeMap("slot,component");
const cacheStringFunction = (fn) => {
  const cache = /* @__PURE__ */ Object.create(null);
  return ((str) => {
    const hit = cache[str];
    return hit || (cache[str] = fn(str));
  });
};
const camelizeRE = /-(\w)/g;
const camelizeReplacer = (_, c) => c ? c.toUpperCase() : "";
const camelize = cacheStringFunction(
  (str) => str.replace(camelizeRE, camelizeReplacer)
);
const hyphenateRE = /\B([A-Z])/g;
const hyphenate = cacheStringFunction(
  (str) => str.replace(hyphenateRE, "-$1").toLowerCase()
);
const capitalize = cacheStringFunction((str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
});
const toHandlerKey = cacheStringFunction(
  (str) => {
    const s = str ? `on${capitalize(str)}` : ``;
    return s;
  }
);
const hasChanged = (value, oldValue) => !Object.is(value, oldValue);
const invokeArrayFns = (fns, ...arg) => {
  for (let i = 0; i < fns.length; i++) {
    fns[i](...arg);
  }
};
const def = (obj, key, value, writable = false) => {
  Object.defineProperty(obj, key, {
    configurable: true,
    enumerable: false,
    writable,
    value
  });
};
const looseToNumber = (val) => {
  const n = parseFloat(val);
  return isNaN(n) ? val : n;
};
const toNumber = (val) => {
  const n = isString(val) ? Number(val) : NaN;
  return isNaN(n) ? val : n;
};
let _globalThis;
const getGlobalThis = () => {
  return _globalThis || (_globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {});
};
function canSetValueDirectly(tagName) {
  return tagName !== "PROGRESS" && // custom elements may use _value internally
  !tagName.includes("-");
}

const GLOBALS_ALLOWED = "Infinity,undefined,NaN,isFinite,isNaN,parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,BigInt,console,Error,Symbol";
const isGloballyAllowed = /* @__PURE__ */ makeMap(GLOBALS_ALLOWED);

function normalizeStyle(value) {
  if (isArray(value)) {
    const res = {};
    for (let i = 0; i < value.length; i++) {
      const item = value[i];
      const normalized = isString(item) ? parseStringStyle(item) : normalizeStyle(item);
      if (normalized) {
        for (const key in normalized) {
          res[key] = normalized[key];
        }
      }
    }
    return res;
  } else if (isString(value) || isObject(value)) {
    return value;
  }
}
const listDelimiterRE = /;(?![^(]*\))/g;
const propertyDelimiterRE = /:([^]+)/;
const styleCommentRE = /\/\*[^]*?\*\//g;
function parseStringStyle(cssText) {
  const ret = {};
  cssText.replace(styleCommentRE, "").split(listDelimiterRE).forEach((item) => {
    if (item) {
      const tmp = item.split(propertyDelimiterRE);
      tmp.length > 1 && (ret[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return ret;
}
function normalizeClass(value) {
  let res = "";
  if (isString(value)) {
    res = value;
  } else if (isArray(value)) {
    for (let i = 0; i < value.length; i++) {
      const normalized = normalizeClass(value[i]);
      if (normalized) {
        res += normalized + " ";
      }
    }
  } else if (isObject(value)) {
    for (const name in value) {
      if (value[name]) {
        res += name + " ";
      }
    }
  }
  return res.trim();
}
function normalizeProps(props) {
  if (!props) return null;
  let { class: klass, style } = props;
  if (klass && !isString(klass)) {
    props.class = normalizeClass(klass);
  }
  if (style) {
    props.style = normalizeStyle(style);
  }
  return props;
}

const specialBooleanAttrs = `itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly`;
const isSpecialBooleanAttr = /* @__PURE__ */ makeMap(specialBooleanAttrs);
const isBooleanAttr = /* @__PURE__ */ makeMap(
  specialBooleanAttrs + `,async,autofocus,autoplay,controls,default,defer,disabled,hidden,inert,loop,open,required,reversed,scoped,seamless,checked,muted,multiple,selected`
);
function includeBooleanAttr(value) {
  return !!value || value === "";
}
const isKnownHtmlAttr = /* @__PURE__ */ makeMap(
  `accept,accept-charset,accesskey,action,align,allow,alt,async,autocapitalize,autocomplete,autofocus,autoplay,background,bgcolor,border,buffered,capture,challenge,charset,checked,cite,class,code,codebase,color,cols,colspan,content,contenteditable,contextmenu,controls,coords,crossorigin,csp,data,datetime,decoding,default,defer,dir,dirname,disabled,download,draggable,dropzone,enctype,enterkeyhint,for,form,formaction,formenctype,formmethod,formnovalidate,formtarget,headers,height,hidden,high,href,hreflang,http-equiv,icon,id,importance,inert,integrity,ismap,itemprop,keytype,kind,label,lang,language,loading,list,loop,low,manifest,max,maxlength,minlength,media,min,multiple,muted,name,novalidate,open,optimum,pattern,ping,placeholder,poster,preload,radiogroup,readonly,referrerpolicy,rel,required,reversed,rows,rowspan,sandbox,scope,scoped,selected,shape,size,sizes,slot,span,spellcheck,src,srcdoc,srclang,srcset,start,step,style,summary,tabindex,target,title,translate,type,usemap,value,width,wrap`
);
const isKnownSvgAttr = /* @__PURE__ */ makeMap(
  `xmlns,accent-height,accumulate,additive,alignment-baseline,alphabetic,amplitude,arabic-form,ascent,attributeName,attributeType,azimuth,baseFrequency,baseline-shift,baseProfile,bbox,begin,bias,by,calcMode,cap-height,class,clip,clipPathUnits,clip-path,clip-rule,color,color-interpolation,color-interpolation-filters,color-profile,color-rendering,contentScriptType,contentStyleType,crossorigin,cursor,cx,cy,d,decelerate,descent,diffuseConstant,direction,display,divisor,dominant-baseline,dur,dx,dy,edgeMode,elevation,enable-background,end,exponent,fill,fill-opacity,fill-rule,filter,filterRes,filterUnits,flood-color,flood-opacity,font-family,font-size,font-size-adjust,font-stretch,font-style,font-variant,font-weight,format,from,fr,fx,fy,g1,g2,glyph-name,glyph-orientation-horizontal,glyph-orientation-vertical,glyphRef,gradientTransform,gradientUnits,hanging,height,href,hreflang,horiz-adv-x,horiz-origin-x,id,ideographic,image-rendering,in,in2,intercept,k,k1,k2,k3,k4,kernelMatrix,kernelUnitLength,kerning,keyPoints,keySplines,keyTimes,lang,lengthAdjust,letter-spacing,lighting-color,limitingConeAngle,local,marker-end,marker-mid,marker-start,markerHeight,markerUnits,markerWidth,mask,maskContentUnits,maskUnits,mathematical,max,media,method,min,mode,name,numOctaves,offset,opacity,operator,order,orient,orientation,origin,overflow,overline-position,overline-thickness,panose-1,paint-order,path,pathLength,patternContentUnits,patternTransform,patternUnits,ping,pointer-events,points,pointsAtX,pointsAtY,pointsAtZ,preserveAlpha,preserveAspectRatio,primitiveUnits,r,radius,referrerPolicy,refX,refY,rel,rendering-intent,repeatCount,repeatDur,requiredExtensions,requiredFeatures,restart,result,rotate,rx,ry,scale,seed,shape-rendering,slope,spacing,specularConstant,specularExponent,speed,spreadMethod,startOffset,stdDeviation,stemh,stemv,stitchTiles,stop-color,stop-opacity,strikethrough-position,strikethrough-thickness,string,stroke,stroke-dasharray,stroke-dashoffset,stroke-linecap,stroke-linejoin,stroke-miterlimit,stroke-opacity,stroke-width,style,surfaceScale,systemLanguage,tabindex,tableValues,target,targetX,targetY,text-anchor,text-decoration,text-rendering,textLength,to,transform,transform-origin,type,u1,u2,underline-position,underline-thickness,unicode,unicode-bidi,unicode-range,units-per-em,v-alphabetic,v-hanging,v-ideographic,v-mathematical,values,vector-effect,version,vert-adv-y,vert-origin-x,vert-origin-y,viewBox,viewTarget,visibility,width,widths,word-spacing,writing-mode,x,x-height,x1,x2,xChannelSelector,xlink:actuate,xlink:arcrole,xlink:href,xlink:role,xlink:show,xlink:title,xlink:type,xmlns:xlink,xml:base,xml:lang,xml:space,y,y1,y2,yChannelSelector,z,zoomAndPan`
);
function isRenderableAttrValue(value) {
  if (value == null) {
    return false;
  }
  const type = typeof value;
  return type === "string" || type === "number" || type === "boolean";
}
function shouldSetAsAttr(tagName, key) {
  if (key === "spellcheck" || key === "draggable" || key === "translate" || key === "autocorrect") {
    return true;
  }
  if (key === "form") {
    return true;
  }
  if (key === "list" && tagName === "INPUT") {
    return true;
  }
  if (key === "type" && tagName === "TEXTAREA") {
    return true;
  }
  if ((key === "width" || key === "height") && (tagName === "IMG" || tagName === "VIDEO" || tagName === "CANVAS" || tagName === "SOURCE")) {
    return true;
  }
  return false;
}

function looseCompareArrays(a, b) {
  if (a.length !== b.length) return false;
  let equal = true;
  for (let i = 0; equal && i < a.length; i++) {
    equal = looseEqual(a[i], b[i]);
  }
  return equal;
}
function looseEqual(a, b) {
  if (a === b) return true;
  let aValidType = isDate(a);
  let bValidType = isDate(b);
  if (aValidType || bValidType) {
    return aValidType && bValidType ? a.getTime() === b.getTime() : false;
  }
  aValidType = isSymbol(a);
  bValidType = isSymbol(b);
  if (aValidType || bValidType) {
    return a === b;
  }
  aValidType = isArray(a);
  bValidType = isArray(b);
  if (aValidType || bValidType) {
    return aValidType && bValidType ? looseCompareArrays(a, b) : false;
  }
  aValidType = isObject(a);
  bValidType = isObject(b);
  if (aValidType || bValidType) {
    if (!aValidType || !bValidType) {
      return false;
    }
    const aKeysCount = Object.keys(a).length;
    const bKeysCount = Object.keys(b).length;
    if (aKeysCount !== bKeysCount) {
      return false;
    }
    for (const key in a) {
      const aHasKey = a.hasOwnProperty(key);
      const bHasKey = b.hasOwnProperty(key);
      if (aHasKey && !bHasKey || !aHasKey && bHasKey || !looseEqual(a[key], b[key])) {
        return false;
      }
    }
  }
  return String(a) === String(b);
}
function looseIndexOf(arr, val) {
  return arr.findIndex((item) => looseEqual(item, val));
}

const isRef$1 = (val) => {
  return !!(val && val["__v_isRef"] === true);
};
const toDisplayString = (val) => {
  switch (typeof val) {
    case "string":
      return val;
    case "object":
      if (val) {
        if (isRef$1(val)) {
          return toDisplayString(val.value);
        } else if (isArray(val) || val.toString === objectToString || !isFunction(val.toString)) {
          return JSON.stringify(val, replacer, 2);
        }
      }
    default:
      return val == null ? "" : String(val);
  }
};
const replacer = (_key, val) => {
  if (isRef$1(val)) {
    return replacer(_key, val.value);
  } else if (isMap(val)) {
    return {
      [`Map(${val.size})`]: [...val.entries()].reduce(
        (entries, [key, val2], i) => {
          entries[stringifySymbol(key, i) + " =>"] = val2;
          return entries;
        },
        {}
      )
    };
  } else if (isSet(val)) {
    return {
      [`Set(${val.size})`]: [...val.values()].map((v) => stringifySymbol(v))
    };
  } else if (isSymbol(val)) {
    return stringifySymbol(val);
  } else if (isObject(val) && !isArray(val) && !isPlainObject(val)) {
    return String(val);
  }
  return val;
};
const stringifySymbol = (v, i = "") => {
  var _a;
  return (
    // Symbol.description in es2019+ so we need to cast here to pass
    // the lib: es2016 check
    isSymbol(v) ? `Symbol(${(_a = v.description) != null ? _a : i})` : v
  );
};

function getSequence(arr) {
  const p = arr.slice();
  const result = [0];
  let i, j, u, v, c;
  const len = arr.length;
  for (i = 0; i < len; i++) {
    const arrI = arr[i];
    if (arrI !== 0) {
      j = result[result.length - 1];
      if (arr[j] < arrI) {
        p[i] = j;
        result.push(i);
        continue;
      }
      u = 0;
      v = result.length - 1;
      while (u < v) {
        c = u + v >> 1;
        if (arr[result[c]] < arrI) {
          u = c + 1;
        } else {
          v = c;
        }
      }
      if (arrI < arr[result[u]]) {
        if (u > 0) {
          p[i] = result[u - 1];
        }
        result[u] = i;
      }
    }
  }
  u = result.length;
  v = result[u - 1];
  while (u-- > 0) {
    result[u] = v;
    v = p[v];
  }
  return result;
}

function normalizeCssVarValue(value) {
  if (value == null) {
    return "initial";
  }
  if (typeof value === "string") {
    return value === "" ? " " : value;
  }
  return String(value);
}

var ReactiveFlags = /* @__PURE__ */ ((ReactiveFlags2) => {
  ReactiveFlags2[ReactiveFlags2["None"] = 0] = "None";
  ReactiveFlags2[ReactiveFlags2["Mutable"] = 1] = "Mutable";
  ReactiveFlags2[ReactiveFlags2["Watching"] = 2] = "Watching";
  ReactiveFlags2[ReactiveFlags2["RecursedCheck"] = 4] = "RecursedCheck";
  ReactiveFlags2[ReactiveFlags2["Recursed"] = 8] = "Recursed";
  ReactiveFlags2[ReactiveFlags2["Dirty"] = 16] = "Dirty";
  ReactiveFlags2[ReactiveFlags2["Pending"] = 32] = "Pending";
  return ReactiveFlags2;
})(ReactiveFlags || {});
const notifyBuffer = [];
let batchDepth = 0;
let activeSub = void 0;
let notifyIndex = 0;
let notifyBufferLength = 0;
function setActiveSub(sub) {
  try {
    return activeSub;
  } finally {
    activeSub = sub;
  }
}
function startBatch() {
  ++batchDepth;
}
function endBatch() {
  if (!--batchDepth && notifyBufferLength) {
    flush();
  }
}
function link(dep, sub) {
  const prevDep = sub.depsTail;
  if (prevDep !== void 0 && prevDep.dep === dep) {
    return;
  }
  let nextDep = void 0;
  const recursedCheck = sub.flags & 4 /* RecursedCheck */;
  if (recursedCheck) {
    nextDep = prevDep !== void 0 ? prevDep.nextDep : sub.deps;
    if (nextDep !== void 0 && nextDep.dep === dep) {
      sub.depsTail = nextDep;
      return;
    }
  }
  const prevSub = dep.subsTail;
  const newLink = sub.depsTail = dep.subsTail = {
    dep,
    sub,
    prevDep,
    nextDep,
    prevSub,
    nextSub: void 0
  };
  if (nextDep !== void 0) {
    nextDep.prevDep = newLink;
  }
  if (prevDep !== void 0) {
    prevDep.nextDep = newLink;
  } else {
    sub.deps = newLink;
  }
  if (prevSub !== void 0) {
    prevSub.nextSub = newLink;
  } else {
    dep.subs = newLink;
  }
}
function unlink(link2, sub = link2.sub) {
  const dep = link2.dep;
  const prevDep = link2.prevDep;
  const nextDep = link2.nextDep;
  const nextSub = link2.nextSub;
  const prevSub = link2.prevSub;
  if (nextDep !== void 0) {
    nextDep.prevDep = prevDep;
  } else {
    sub.depsTail = prevDep;
  }
  if (prevDep !== void 0) {
    prevDep.nextDep = nextDep;
  } else {
    sub.deps = nextDep;
  }
  if (nextSub !== void 0) {
    nextSub.prevSub = prevSub;
  } else {
    dep.subsTail = prevSub;
  }
  if (prevSub !== void 0) {
    prevSub.nextSub = nextSub;
  } else if ((dep.subs = nextSub) === void 0) {
    let toRemove = dep.deps;
    if (toRemove !== void 0) {
      do {
        toRemove = unlink(toRemove, dep);
      } while (toRemove !== void 0);
      dep.flags |= 16 /* Dirty */;
    }
  }
  return nextDep;
}
function propagate(link2) {
  let next = link2.nextSub;
  let stack;
  top: do {
    const sub = link2.sub;
    let flags = sub.flags;
    if (flags & (1 /* Mutable */ | 2 /* Watching */)) {
      if (!(flags & (4 /* RecursedCheck */ | 8 /* Recursed */ | 16 /* Dirty */ | 32 /* Pending */))) {
        sub.flags = flags | 32 /* Pending */;
      } else if (!(flags & (4 /* RecursedCheck */ | 8 /* Recursed */))) {
        flags = 0 /* None */;
      } else if (!(flags & 4 /* RecursedCheck */)) {
        sub.flags = flags & -9 /* Recursed */ | 32 /* Pending */;
      } else if (!(flags & (16 /* Dirty */ | 32 /* Pending */)) && isValidLink(link2, sub)) {
        sub.flags = flags | 8 /* Recursed */ | 32 /* Pending */;
        flags &= 1 /* Mutable */;
      } else {
        flags = 0 /* None */;
      }
      if (flags & 2 /* Watching */) {
        notifyBuffer[notifyBufferLength++] = sub;
      }
      if (flags & 1 /* Mutable */) {
        const subSubs = sub.subs;
        if (subSubs !== void 0) {
          link2 = subSubs;
          if (subSubs.nextSub !== void 0) {
            stack = { value: next, prev: stack };
            next = link2.nextSub;
          }
          continue;
        }
      }
    }
    if ((link2 = next) !== void 0) {
      next = link2.nextSub;
      continue;
    }
    while (stack !== void 0) {
      link2 = stack.value;
      stack = stack.prev;
      if (link2 !== void 0) {
        next = link2.nextSub;
        continue top;
      }
    }
    break;
  } while (true);
}
function startTracking(sub) {
  sub.depsTail = void 0;
  sub.flags = sub.flags & -57 | 4 /* RecursedCheck */;
  return setActiveSub(sub);
}
function endTracking(sub, prevSub) {
  activeSub = prevSub;
  const depsTail = sub.depsTail;
  let toRemove = depsTail !== void 0 ? depsTail.nextDep : sub.deps;
  while (toRemove !== void 0) {
    toRemove = unlink(toRemove, sub);
  }
  sub.flags &= -5 /* RecursedCheck */;
}
function flush() {
  while (notifyIndex < notifyBufferLength) {
    const effect = notifyBuffer[notifyIndex];
    notifyBuffer[notifyIndex++] = void 0;
    effect.notify();
  }
  notifyIndex = 0;
  notifyBufferLength = 0;
}
function checkDirty(link2, sub) {
  let stack;
  let checkDepth = 0;
  top: do {
    const dep = link2.dep;
    const depFlags = dep.flags;
    let dirty = false;
    if (sub.flags & 16 /* Dirty */) {
      dirty = true;
    } else if ((depFlags & (1 /* Mutable */ | 16 /* Dirty */)) === (1 /* Mutable */ | 16 /* Dirty */)) {
      if (dep.update()) {
        const subs = dep.subs;
        if (subs.nextSub !== void 0) {
          shallowPropagate(subs);
        }
        dirty = true;
      }
    } else if ((depFlags & (1 /* Mutable */ | 32 /* Pending */)) === (1 /* Mutable */ | 32 /* Pending */)) {
      if (link2.nextSub !== void 0 || link2.prevSub !== void 0) {
        stack = { value: link2, prev: stack };
      }
      link2 = dep.deps;
      sub = dep;
      ++checkDepth;
      continue;
    }
    if (!dirty && link2.nextDep !== void 0) {
      link2 = link2.nextDep;
      continue;
    }
    while (checkDepth) {
      --checkDepth;
      const firstSub = sub.subs;
      const hasMultipleSubs = firstSub.nextSub !== void 0;
      if (hasMultipleSubs) {
        link2 = stack.value;
        stack = stack.prev;
      } else {
        link2 = firstSub;
      }
      if (dirty) {
        if (sub.update()) {
          if (hasMultipleSubs) {
            shallowPropagate(firstSub);
          }
          sub = link2.sub;
          continue;
        }
      } else {
        sub.flags &= -33 /* Pending */;
      }
      sub = link2.sub;
      if (link2.nextDep !== void 0) {
        link2 = link2.nextDep;
        continue top;
      }
      dirty = false;
    }
    return dirty;
  } while (true);
}
function shallowPropagate(link2) {
  do {
    const sub = link2.sub;
    const nextSub = link2.nextSub;
    const subFlags = sub.flags;
    if ((subFlags & (32 /* Pending */ | 16 /* Dirty */)) === 32 /* Pending */) {
      sub.flags = subFlags | 16 /* Dirty */;
    }
    link2 = nextSub;
  } while (link2 !== void 0);
}
function isValidLink(checkLink, sub) {
  const depsTail = sub.depsTail;
  if (depsTail !== void 0) {
    let link2 = sub.deps;
    do {
      if (link2 === checkLink) {
        return true;
      }
      if (link2 === depsTail) {
        break;
      }
      link2 = link2.nextDep;
    } while (link2 !== void 0);
  }
  return false;
}

class Dep {
  constructor(map, key) {
    this.map = map;
    this.key = key;
    this._subs = void 0;
    this.subsTail = void 0;
    this.flags = ReactiveFlags.None;
  }
  get subs() {
    return this._subs;
  }
  set subs(value) {
    this._subs = value;
    if (value === void 0) {
      this.map.delete(this.key);
    }
  }
}
const targetMap = /* @__PURE__ */ new WeakMap();
const ITERATE_KEY = Symbol(
  ""
);
const MAP_KEY_ITERATE_KEY = Symbol(
  ""
);
const ARRAY_ITERATE_KEY = Symbol(
  ""
);
function track(target, type, key) {
  if (activeSub !== void 0) {
    let depsMap = targetMap.get(target);
    if (!depsMap) {
      targetMap.set(target, depsMap = /* @__PURE__ */ new Map());
    }
    let dep = depsMap.get(key);
    if (!dep) {
      depsMap.set(key, dep = new Dep(depsMap, key));
    }
    link(dep, activeSub);
  }
}
function trigger(target, type, key, newValue, oldValue, oldTarget) {
  const depsMap = targetMap.get(target);
  if (!depsMap) {
    return;
  }
  const run = (dep) => {
    if (dep !== void 0 && dep.subs !== void 0) {
      propagate(dep.subs);
      shallowPropagate(dep.subs);
    }
  };
  startBatch();
  if (type === "clear") {
    depsMap.forEach(run);
  } else {
    const targetIsArray = isArray(target);
    const isArrayIndex = targetIsArray && isIntegerKey(key);
    if (targetIsArray && key === "length") {
      const newLength = Number(newValue);
      depsMap.forEach((dep, key2) => {
        if (key2 === "length" || key2 === ARRAY_ITERATE_KEY || !isSymbol(key2) && key2 >= newLength) {
          run(dep);
        }
      });
    } else {
      if (key !== void 0 || depsMap.has(void 0)) {
        run(depsMap.get(key));
      }
      if (isArrayIndex) {
        run(depsMap.get(ARRAY_ITERATE_KEY));
      }
      switch (type) {
        case "add":
          if (!targetIsArray) {
            run(depsMap.get(ITERATE_KEY));
            if (isMap(target)) {
              run(depsMap.get(MAP_KEY_ITERATE_KEY));
            }
          } else if (isArrayIndex) {
            run(depsMap.get("length"));
          }
          break;
        case "delete":
          if (!targetIsArray) {
            run(depsMap.get(ITERATE_KEY));
            if (isMap(target)) {
              run(depsMap.get(MAP_KEY_ITERATE_KEY));
            }
          }
          break;
        case "set":
          if (isMap(target)) {
            run(depsMap.get(ITERATE_KEY));
          }
          break;
      }
    }
  }
  endBatch();
}
function getDepFromReactive(object, key) {
  const depMap = targetMap.get(object);
  return depMap && depMap.get(key);
}

function reactiveReadArray(array) {
  const raw = toRaw(array);
  if (raw === array) return raw;
  track(raw, "iterate", ARRAY_ITERATE_KEY);
  return isShallow(array) ? raw : raw.map(toReactive);
}
function shallowReadArray(arr) {
  track(arr = toRaw(arr), "iterate", ARRAY_ITERATE_KEY);
  return arr;
}
const arrayInstrumentations = {
  __proto__: null,
  [Symbol.iterator]() {
    return iterator(this, Symbol.iterator, toReactive);
  },
  concat(...args) {
    return reactiveReadArray(this).concat(
      ...args.map((x) => isArray(x) ? reactiveReadArray(x) : x)
    );
  },
  entries() {
    return iterator(this, "entries", (value) => {
      value[1] = toReactive(value[1]);
      return value;
    });
  },
  every(fn, thisArg) {
    return apply(this, "every", fn, thisArg, void 0, arguments);
  },
  filter(fn, thisArg) {
    return apply(this, "filter", fn, thisArg, (v) => v.map(toReactive), arguments);
  },
  find(fn, thisArg) {
    return apply(this, "find", fn, thisArg, toReactive, arguments);
  },
  findIndex(fn, thisArg) {
    return apply(this, "findIndex", fn, thisArg, void 0, arguments);
  },
  findLast(fn, thisArg) {
    return apply(this, "findLast", fn, thisArg, toReactive, arguments);
  },
  findLastIndex(fn, thisArg) {
    return apply(this, "findLastIndex", fn, thisArg, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(fn, thisArg) {
    return apply(this, "forEach", fn, thisArg, void 0, arguments);
  },
  includes(...args) {
    return searchProxy(this, "includes", args);
  },
  indexOf(...args) {
    return searchProxy(this, "indexOf", args);
  },
  join(separator) {
    return reactiveReadArray(this).join(separator);
  },
  // keys() iterator only reads `length`, no optimisation required
  lastIndexOf(...args) {
    return searchProxy(this, "lastIndexOf", args);
  },
  map(fn, thisArg) {
    return apply(this, "map", fn, thisArg, void 0, arguments);
  },
  pop() {
    return noTracking(this, "pop");
  },
  push(...args) {
    return noTracking(this, "push", args);
  },
  reduce(fn, ...args) {
    return reduce(this, "reduce", fn, args);
  },
  reduceRight(fn, ...args) {
    return reduce(this, "reduceRight", fn, args);
  },
  shift() {
    return noTracking(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(fn, thisArg) {
    return apply(this, "some", fn, thisArg, void 0, arguments);
  },
  splice(...args) {
    return noTracking(this, "splice", args);
  },
  toReversed() {
    return reactiveReadArray(this).toReversed();
  },
  toSorted(comparer) {
    return reactiveReadArray(this).toSorted(comparer);
  },
  toSpliced(...args) {
    return reactiveReadArray(this).toSpliced(...args);
  },
  unshift(...args) {
    return noTracking(this, "unshift", args);
  },
  values() {
    return iterator(this, "values", toReactive);
  }
};
function iterator(self, method, wrapValue) {
  const arr = shallowReadArray(self);
  const iter = arr[method]();
  if (arr !== self && !isShallow(self)) {
    iter._next = iter.next;
    iter.next = () => {
      const result = iter._next();
      if (result.value) {
        result.value = wrapValue(result.value);
      }
      return result;
    };
  }
  return iter;
}
const arrayProto = Array.prototype;
function apply(self, method, fn, thisArg, wrappedRetFn, args) {
  const arr = shallowReadArray(self);
  const needsWrap = arr !== self && !isShallow(self);
  const methodFn = arr[method];
  if (methodFn !== arrayProto[method]) {
    const result2 = methodFn.apply(self, args);
    return needsWrap ? toReactive(result2) : result2;
  }
  let wrappedFn = fn;
  if (arr !== self) {
    if (needsWrap) {
      wrappedFn = function(item, index) {
        return fn.call(this, toReactive(item), index, self);
      };
    } else if (fn.length > 2) {
      wrappedFn = function(item, index) {
        return fn.call(this, item, index, self);
      };
    }
  }
  const result = methodFn.call(arr, wrappedFn, thisArg);
  return needsWrap && wrappedRetFn ? wrappedRetFn(result) : result;
}
function reduce(self, method, fn, args) {
  const arr = shallowReadArray(self);
  let wrappedFn = fn;
  if (arr !== self) {
    if (!isShallow(self)) {
      wrappedFn = function(acc, item, index) {
        return fn.call(this, acc, toReactive(item), index, self);
      };
    } else if (fn.length > 3) {
      wrappedFn = function(acc, item, index) {
        return fn.call(this, acc, item, index, self);
      };
    }
  }
  return arr[method](wrappedFn, ...args);
}
function searchProxy(self, method, args) {
  const arr = toRaw(self);
  track(arr, "iterate", ARRAY_ITERATE_KEY);
  const res = arr[method](...args);
  if ((res === -1 || res === false) && isProxy(args[0])) {
    args[0] = toRaw(args[0]);
    return arr[method](...args);
  }
  return res;
}
function noTracking(self, method, args = []) {
  startBatch();
  const prevSub = setActiveSub();
  const res = toRaw(self)[method].apply(self, args);
  setActiveSub(prevSub);
  endBatch();
  return res;
}

const isNonTrackableKeys = /* @__PURE__ */ makeMap(`__proto__,__v_isRef,__isVue`);
const builtInSymbols = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((key) => key !== "arguments" && key !== "caller").map((key) => Symbol[key]).filter(isSymbol)
);
function hasOwnProperty(key) {
  if (!isSymbol(key)) key = String(key);
  const obj = toRaw(this);
  track(obj, "has", key);
  return obj.hasOwnProperty(key);
}
class BaseReactiveHandler {
  constructor(_isReadonly = false, _isShallow = false) {
    this._isReadonly = _isReadonly;
    this._isShallow = _isShallow;
  }
  get(target, key, receiver) {
    if (key === "__v_skip") return target["__v_skip"];
    const isReadonly2 = this._isReadonly, isShallow2 = this._isShallow;
    if (key === "__v_isReactive") {
      return !isReadonly2;
    } else if (key === "__v_isReadonly") {
      return isReadonly2;
    } else if (key === "__v_isShallow") {
      return isShallow2;
    } else if (key === "__v_raw") {
      if (receiver === (isReadonly2 ? isShallow2 ? shallowReadonlyMap : readonlyMap : isShallow2 ? shallowReactiveMap : reactiveMap).get(target) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(target) === Object.getPrototypeOf(receiver)) {
        return target;
      }
      return;
    }
    const targetIsArray = isArray(target);
    if (!isReadonly2) {
      let fn;
      if (targetIsArray && (fn = arrayInstrumentations[key])) {
        return fn;
      }
      if (key === "hasOwnProperty") {
        return hasOwnProperty;
      }
    }
    const wasRef = isRef(target);
    const res = Reflect.get(
      target,
      key,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      wasRef ? target : receiver
    );
    if (wasRef && key !== "value") {
      return res;
    }
    if (isSymbol(key) ? builtInSymbols.has(key) : isNonTrackableKeys(key)) {
      return res;
    }
    if (!isReadonly2) {
      track(target, "get", key);
    }
    if (isShallow2) {
      return res;
    }
    if (isRef(res)) {
      return targetIsArray && isIntegerKey(key) ? res : res.value;
    }
    if (isObject(res)) {
      return isReadonly2 ? readonly(res) : reactive(res);
    }
    return res;
  }
}
class MutableReactiveHandler extends BaseReactiveHandler {
  constructor(isShallow2 = false) {
    super(false, isShallow2);
  }
  set(target, key, value, receiver) {
    let oldValue = target[key];
    if (!this._isShallow) {
      const isOldValueReadonly = isReadonly(oldValue);
      if (!isShallow(value) && !isReadonly(value)) {
        oldValue = toRaw(oldValue);
        value = toRaw(value);
      }
      if (!isArray(target) && isRef(oldValue) && !isRef(value)) {
        if (isOldValueReadonly) {
          return true;
        } else {
          oldValue.value = value;
          return true;
        }
      }
    }
    const hadKey = isArray(target) && isIntegerKey(key) ? Number(key) < target.length : hasOwn(target, key);
    const result = Reflect.set(
      target,
      key,
      value,
      isRef(target) ? target : receiver
    );
    if (target === toRaw(receiver)) {
      if (!hadKey) {
        trigger(target, "add", key, value);
      } else if (hasChanged(value, oldValue)) {
        trigger(target, "set", key, value);
      }
    }
    return result;
  }
  deleteProperty(target, key) {
    const hadKey = hasOwn(target, key);
    target[key];
    const result = Reflect.deleteProperty(target, key);
    if (result && hadKey) {
      trigger(target, "delete", key, void 0);
    }
    return result;
  }
  has(target, key) {
    const result = Reflect.has(target, key);
    if (!isSymbol(key) || !builtInSymbols.has(key)) {
      track(target, "has", key);
    }
    return result;
  }
  ownKeys(target) {
    track(
      target,
      "iterate",
      isArray(target) ? "length" : ITERATE_KEY
    );
    return Reflect.ownKeys(target);
  }
}
class ReadonlyReactiveHandler extends BaseReactiveHandler {
  constructor(isShallow2 = false) {
    super(true, isShallow2);
  }
  set(target, key) {
    return true;
  }
  deleteProperty(target, key) {
    return true;
  }
}
const mutableHandlers = /* @__PURE__ */ new MutableReactiveHandler();
const readonlyHandlers = /* @__PURE__ */ new ReadonlyReactiveHandler();
const shallowReactiveHandlers = /* @__PURE__ */ new MutableReactiveHandler(true);
const shallowReadonlyHandlers = /* @__PURE__ */ new ReadonlyReactiveHandler(true);

const toShallow = (value) => value;
const getProto = (v) => Reflect.getPrototypeOf(v);
function createIterableMethod(method, isReadonly2, isShallow2) {
  return function(...args) {
    const target = this["__v_raw"];
    const rawTarget = toRaw(target);
    const targetIsMap = isMap(rawTarget);
    const isPair = method === "entries" || method === Symbol.iterator && targetIsMap;
    const isKeyOnly = method === "keys" && targetIsMap;
    const innerIterator = target[method](...args);
    const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
    !isReadonly2 && track(
      rawTarget,
      "iterate",
      isKeyOnly ? MAP_KEY_ITERATE_KEY : ITERATE_KEY
    );
    return {
      // iterator protocol
      next() {
        const { value, done } = innerIterator.next();
        return done ? { value, done } : {
          value: isPair ? [wrap(value[0]), wrap(value[1])] : wrap(value),
          done
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function createReadonlyMethod(type) {
  return function(...args) {
    return type === "delete" ? false : type === "clear" ? void 0 : this;
  };
}
function createInstrumentations(readonly, shallow) {
  const instrumentations = {
    get(key) {
      const target = this["__v_raw"];
      const rawTarget = toRaw(target);
      const rawKey = toRaw(key);
      if (!readonly) {
        if (hasChanged(key, rawKey)) {
          track(rawTarget, "get", key);
        }
        track(rawTarget, "get", rawKey);
      }
      const { has } = getProto(rawTarget);
      const wrap = shallow ? toShallow : readonly ? toReadonly : toReactive;
      if (has.call(rawTarget, key)) {
        return wrap(target.get(key));
      } else if (has.call(rawTarget, rawKey)) {
        return wrap(target.get(rawKey));
      } else if (target !== rawTarget) {
        target.get(key);
      }
    },
    get size() {
      const target = this["__v_raw"];
      !readonly && track(toRaw(target), "iterate", ITERATE_KEY);
      return Reflect.get(target, "size", target);
    },
    has(key) {
      const target = this["__v_raw"];
      const rawTarget = toRaw(target);
      const rawKey = toRaw(key);
      if (!readonly) {
        if (hasChanged(key, rawKey)) {
          track(rawTarget, "has", key);
        }
        track(rawTarget, "has", rawKey);
      }
      return key === rawKey ? target.has(key) : target.has(key) || target.has(rawKey);
    },
    forEach(callback, thisArg) {
      const observed = this;
      const target = observed["__v_raw"];
      const rawTarget = toRaw(target);
      const wrap = shallow ? toShallow : readonly ? toReadonly : toReactive;
      !readonly && track(rawTarget, "iterate", ITERATE_KEY);
      return target.forEach((value, key) => {
        return callback.call(thisArg, wrap(value), wrap(key), observed);
      });
    }
  };
  extend(
    instrumentations,
    readonly ? {
      add: createReadonlyMethod("add"),
      set: createReadonlyMethod("set"),
      delete: createReadonlyMethod("delete"),
      clear: createReadonlyMethod("clear")
    } : {
      add(value) {
        if (!shallow && !isShallow(value) && !isReadonly(value)) {
          value = toRaw(value);
        }
        const target = toRaw(this);
        const proto = getProto(target);
        const hadKey = proto.has.call(target, value);
        if (!hadKey) {
          target.add(value);
          trigger(target, "add", value, value);
        }
        return this;
      },
      set(key, value) {
        if (!shallow && !isShallow(value) && !isReadonly(value)) {
          value = toRaw(value);
        }
        const target = toRaw(this);
        const { has, get } = getProto(target);
        let hadKey = has.call(target, key);
        if (!hadKey) {
          key = toRaw(key);
          hadKey = has.call(target, key);
        }
        const oldValue = get.call(target, key);
        target.set(key, value);
        if (!hadKey) {
          trigger(target, "add", key, value);
        } else if (hasChanged(value, oldValue)) {
          trigger(target, "set", key, value);
        }
        return this;
      },
      delete(key) {
        const target = toRaw(this);
        const { has, get } = getProto(target);
        let hadKey = has.call(target, key);
        if (!hadKey) {
          key = toRaw(key);
          hadKey = has.call(target, key);
        }
        get ? get.call(target, key) : void 0;
        const result = target.delete(key);
        if (hadKey) {
          trigger(target, "delete", key, void 0);
        }
        return result;
      },
      clear() {
        const target = toRaw(this);
        const hadItems = target.size !== 0;
        const result = target.clear();
        if (hadItems) {
          trigger(
            target,
            "clear",
            void 0,
            void 0);
        }
        return result;
      }
    }
  );
  const iteratorMethods = [
    "keys",
    "values",
    "entries",
    Symbol.iterator
  ];
  iteratorMethods.forEach((method) => {
    instrumentations[method] = createIterableMethod(method, readonly, shallow);
  });
  return instrumentations;
}
function createInstrumentationGetter(isReadonly2, shallow) {
  const instrumentations = createInstrumentations(isReadonly2, shallow);
  return (target, key, receiver) => {
    if (key === "__v_isReactive") {
      return !isReadonly2;
    } else if (key === "__v_isReadonly") {
      return isReadonly2;
    } else if (key === "__v_raw") {
      return target;
    }
    return Reflect.get(
      hasOwn(instrumentations, key) && key in target ? instrumentations : target,
      key,
      receiver
    );
  };
}
const mutableCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(false, false)
};
const shallowCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(false, true)
};
const readonlyCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(true, false)
};
const shallowReadonlyCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(true, true)
};

const reactiveMap = /* @__PURE__ */ new WeakMap();
const shallowReactiveMap = /* @__PURE__ */ new WeakMap();
const readonlyMap = /* @__PURE__ */ new WeakMap();
const shallowReadonlyMap = /* @__PURE__ */ new WeakMap();
function targetTypeMap(rawType) {
  switch (rawType) {
    case "Object":
    case "Array":
      return 1 /* COMMON */;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2 /* COLLECTION */;
    default:
      return 0 /* INVALID */;
  }
}
function getTargetType(value) {
  return value["__v_skip"] || !Object.isExtensible(value) ? 0 /* INVALID */ : targetTypeMap(toRawType(value));
}
function reactive(target) {
  if (isReadonly(target)) {
    return target;
  }
  return createReactiveObject(
    target,
    false,
    mutableHandlers,
    mutableCollectionHandlers,
    reactiveMap
  );
}
function shallowReactive(target) {
  return createReactiveObject(
    target,
    false,
    shallowReactiveHandlers,
    shallowCollectionHandlers,
    shallowReactiveMap
  );
}
function readonly(target) {
  return createReactiveObject(
    target,
    true,
    readonlyHandlers,
    readonlyCollectionHandlers,
    readonlyMap
  );
}
function shallowReadonly$1(target) {
  return createReactiveObject(
    target,
    true,
    shallowReadonlyHandlers,
    shallowReadonlyCollectionHandlers,
    shallowReadonlyMap
  );
}
function createReactiveObject(target, isReadonly2, baseHandlers, collectionHandlers, proxyMap) {
  if (!isObject(target)) {
    return target;
  }
  if (target["__v_raw"] && !(isReadonly2 && target["__v_isReactive"])) {
    return target;
  }
  const targetType = getTargetType(target);
  if (targetType === 0 /* INVALID */) {
    return target;
  }
  const existingProxy = proxyMap.get(target);
  if (existingProxy) {
    return existingProxy;
  }
  const proxy = new Proxy(
    target,
    targetType === 2 /* COLLECTION */ ? collectionHandlers : baseHandlers
  );
  proxyMap.set(target, proxy);
  return proxy;
}
function isReactive(value) {
  if (isReadonly(value)) {
    return isReactive(value["__v_raw"]);
  }
  return !!(value && value["__v_isReactive"]);
}
function isReadonly(value) {
  return !!(value && value["__v_isReadonly"]);
}
function isShallow(value) {
  return !!(value && value["__v_isShallow"]);
}
function isProxy(value) {
  return value ? !!value["__v_raw"] : false;
}
function toRaw(observed) {
  const raw = observed && observed["__v_raw"];
  return raw ? toRaw(raw) : observed;
}
function markRaw(value) {
  if (!hasOwn(value, "__v_skip") && Object.isExtensible(value)) {
    def(value, "__v_skip", true);
  }
  return value;
}
const toReactive = (value) => isObject(value) ? reactive(value) : value;
const toReadonly = (value) => isObject(value) ? readonly(value) : value;

function isRef(r) {
  return r ? r["__v_isRef"] === true : false;
}
function ref(value) {
  return createRef(value, toReactive);
}
function shallowRef(value) {
  return createRef(value);
}
function createRef(rawValue, wrap) {
  if (isRef(rawValue)) {
    return rawValue;
  }
  return new RefImpl(rawValue, wrap);
}
class RefImpl {
  // TODO isolatedDeclarations "__v_isShallow"
  constructor(value, wrap) {
    this.subs = void 0;
    this.subsTail = void 0;
    this.flags = ReactiveFlags.Mutable;
    /**
     * @internal
     */
    this.__v_isRef = true;
    // TODO isolatedDeclarations "__v_isRef"
    /**
     * @internal
     */
    this.__v_isShallow = false;
    this._oldValue = this._rawValue = wrap ? toRaw(value) : value;
    this._value = wrap ? wrap(value) : value;
    this._wrap = wrap;
    this["__v_isShallow"] = !wrap;
  }
  get dep() {
    return this;
  }
  get value() {
    trackRef(this);
    if (this.flags & ReactiveFlags.Dirty && this.update()) {
      const subs = this.subs;
      if (subs !== void 0) {
        shallowPropagate(subs);
      }
    }
    return this._value;
  }
  set value(newValue) {
    const oldValue = this._rawValue;
    const useDirectValue = this["__v_isShallow"] || isShallow(newValue) || isReadonly(newValue);
    newValue = useDirectValue ? newValue : toRaw(newValue);
    if (hasChanged(newValue, oldValue)) {
      this.flags |= ReactiveFlags.Dirty;
      this._rawValue = newValue;
      this._value = !useDirectValue && this._wrap ? this._wrap(newValue) : newValue;
      const subs = this.subs;
      if (subs !== void 0) {
        propagate(subs);
        if (!batchDepth) {
          flush();
        }
      }
    }
  }
  update() {
    this.flags &= ~ReactiveFlags.Dirty;
    return hasChanged(this._oldValue, this._oldValue = this._rawValue);
  }
}
function triggerRef(ref2) {
  const dep = ref2.dep;
  if (dep !== void 0 && dep.subs !== void 0) {
    propagate(dep.subs);
    shallowPropagate(dep.subs);
    if (!batchDepth) {
      flush();
    }
  }
}
function trackRef(dep) {
  if (activeSub !== void 0) {
    link(dep, activeSub);
  }
}
function unref(ref2) {
  return isRef(ref2) ? ref2.value : ref2;
}
function toValue(source) {
  return isFunction(source) ? source() : unref(source);
}
const shallowUnwrapHandlers = {
  get: (target, key, receiver) => key === "__v_raw" ? target : unref(Reflect.get(target, key, receiver)),
  set: (target, key, value, receiver) => {
    const oldValue = target[key];
    if (isRef(oldValue) && !isRef(value)) {
      oldValue.value = value;
      return true;
    } else {
      return Reflect.set(target, key, value, receiver);
    }
  }
};
function proxyRefs(objectWithRefs) {
  return isReactive(objectWithRefs) ? objectWithRefs : new Proxy(objectWithRefs, shallowUnwrapHandlers);
}
class CustomRefImpl {
  constructor(factory) {
    this.subs = void 0;
    this.subsTail = void 0;
    this.flags = ReactiveFlags.None;
    this["__v_isRef"] = true;
    this._value = void 0;
    const { get, set } = factory(
      () => trackRef(this),
      () => triggerRef(this)
    );
    this._get = get;
    this._set = set;
  }
  get dep() {
    return this;
  }
  get value() {
    return this._value = this._get();
  }
  set value(newVal) {
    this._set(newVal);
  }
}
function customRef(factory) {
  return new CustomRefImpl(factory);
}
function toRefs(object) {
  const ret = isArray(object) ? new Array(object.length) : {};
  for (const key in object) {
    ret[key] = propertyToRef(object, key);
  }
  return ret;
}
class ObjectRefImpl {
  constructor(_object, _key, _defaultValue) {
    this._object = _object;
    this._key = _key;
    this._defaultValue = _defaultValue;
    this["__v_isRef"] = true;
    this._value = void 0;
  }
  get value() {
    const val = this._object[this._key];
    return this._value = val === void 0 ? this._defaultValue : val;
  }
  set value(newVal) {
    this._object[this._key] = newVal;
  }
  get dep() {
    return getDepFromReactive(toRaw(this._object), this._key);
  }
}
class GetterRefImpl {
  constructor(_getter) {
    this._getter = _getter;
    this["__v_isRef"] = true;
    this["__v_isReadonly"] = true;
    this._value = void 0;
  }
  get value() {
    return this._value = this._getter();
  }
}
function toRef(source, key, defaultValue) {
  if (isRef(source)) {
    return source;
  } else if (isFunction(source)) {
    return new GetterRefImpl(source);
  } else if (isObject(source) && arguments.length > 1) {
    return propertyToRef(source, key, defaultValue);
  } else {
    return ref(source);
  }
}
function propertyToRef(source, key, defaultValue) {
  const val = source[key];
  return isRef(val) ? val : new ObjectRefImpl(source, key, defaultValue);
}

class ReactiveEffect {
  constructor(fn) {
    this.deps = void 0;
    this.depsTail = void 0;
    this.subs = void 0;
    this.subsTail = void 0;
    this.flags = ReactiveFlags.Watching | ReactiveFlags.Dirty;
    /**
     * @internal
     */
    this.cleanups = [];
    /**
     * @internal
     */
    this.cleanupsLength = 0;
    if (fn !== void 0) {
      this.fn = fn;
    }
    if (activeEffectScope) {
      link(this, activeEffectScope);
    }
  }
  // @ts-expect-error
  fn() {
  }
  get active() {
    return !(this.flags & 1024);
  }
  pause() {
    this.flags |= 256;
  }
  resume() {
    const flags = this.flags &= -257;
    if (flags & (ReactiveFlags.Dirty | ReactiveFlags.Pending)) {
      this.notify();
    }
  }
  notify() {
    if (!(this.flags & 256) && this.dirty) {
      this.run();
    }
  }
  run() {
    if (!this.active) {
      return this.fn();
    }
    cleanup(this);
    const prevSub = startTracking(this);
    try {
      return this.fn();
    } finally {
      endTracking(this, prevSub);
      const flags = this.flags;
      if ((flags & (ReactiveFlags.Recursed | 128)) === (ReactiveFlags.Recursed | 128)) {
        this.flags = flags & ~ReactiveFlags.Recursed;
        this.notify();
      }
    }
  }
  stop() {
    if (!this.active) {
      return;
    }
    this.flags = 1024;
    let dep = this.deps;
    while (dep !== void 0) {
      dep = unlink(dep, this);
    }
    const sub = this.subs;
    if (sub !== void 0) {
      unlink(sub);
    }
    cleanup(this);
  }
  get dirty() {
    const flags = this.flags;
    if (flags & ReactiveFlags.Dirty) {
      return true;
    }
    if (flags & ReactiveFlags.Pending) {
      if (checkDirty(this.deps, this)) {
        this.flags = flags | ReactiveFlags.Dirty;
        return true;
      } else {
        this.flags = flags & ~ReactiveFlags.Pending;
      }
    }
    return false;
  }
}
function effect(fn, options) {
  if (fn.effect instanceof ReactiveEffect) {
    fn = fn.effect.fn;
  }
  const e = new ReactiveEffect(fn);
  if (options) {
    const { onStop, scheduler } = options;
    if (onStop) {
      options.onStop = void 0;
      const stop2 = e.stop.bind(e);
      e.stop = () => {
        stop2();
        onStop();
      };
    }
    if (scheduler) {
      options.scheduler = void 0;
      e.notify = () => {
        if (!(e.flags & 256)) {
          scheduler();
        }
      };
    }
    extend(e, options);
  }
  try {
    e.run();
  } catch (err) {
    e.stop();
    throw err;
  }
  const runner = e.run.bind(e);
  runner.effect = e;
  return runner;
}
function stop(runner) {
  runner.effect.stop();
}
function cleanup(sub) {
  const l = sub.cleanupsLength;
  if (l) {
    for (let i = 0; i < l; i++) {
      sub.cleanups[i]();
    }
    sub.cleanupsLength = 0;
  }
}
function onEffectCleanup(fn, failSilently = false) {
  if (activeSub instanceof ReactiveEffect) {
    activeSub.cleanups[activeSub.cleanupsLength++] = () => cleanupEffect(fn);
  }
}
function cleanupEffect(fn) {
  const prevSub = setActiveSub();
  try {
    fn();
  } finally {
    setActiveSub(prevSub);
  }
}

let activeEffectScope;
class EffectScope {
  constructor(detached = false) {
    this.deps = void 0;
    this.depsTail = void 0;
    this.subs = void 0;
    this.subsTail = void 0;
    this.flags = 0;
    /**
     * @internal
     */
    this.cleanups = [];
    /**
     * @internal
     */
    this.cleanupsLength = 0;
    if (!detached && activeEffectScope) {
      link(this, activeEffectScope);
    }
  }
  get active() {
    return !(this.flags & 1024);
  }
  pause() {
    if (!(this.flags & 256)) {
      this.flags |= 256;
      for (let link2 = this.deps; link2 !== void 0; link2 = link2.nextDep) {
        const dep = link2.dep;
        if ("pause" in dep) {
          dep.pause();
        }
      }
    }
  }
  /**
   * Resumes the effect scope, including all child scopes and effects.
   */
  resume() {
    const flags = this.flags;
    if (flags & 256) {
      this.flags = flags & -257;
      for (let link2 = this.deps; link2 !== void 0; link2 = link2.nextDep) {
        const dep = link2.dep;
        if ("resume" in dep) {
          dep.resume();
        }
      }
    }
  }
  run(fn) {
    const prevScope = activeEffectScope;
    try {
      activeEffectScope = this;
      return fn();
    } finally {
      activeEffectScope = prevScope;
    }
  }
  stop() {
    if (!this.active) {
      return;
    }
    this.flags = 1024;
    let dep = this.deps;
    while (dep !== void 0) {
      const node = dep.dep;
      if ("stop" in node) {
        dep = dep.nextDep;
        node.stop();
      } else {
        dep = unlink(dep, this);
      }
    }
    const sub = this.subs;
    if (sub !== void 0) {
      unlink(sub);
    }
    cleanup(this);
  }
}
function effectScope(detached) {
  return new EffectScope(detached);
}
function getCurrentScope() {
  return activeEffectScope;
}
function setCurrentScope(scope) {
  try {
    return activeEffectScope;
  } finally {
    activeEffectScope = scope;
  }
}
function onScopeDispose(fn, failSilently = false) {
  if (activeEffectScope !== void 0) {
    activeEffectScope.cleanups[activeEffectScope.cleanupsLength++] = fn;
  }
}

class ComputedRefImpl {
  constructor(fn, setter) {
    this.fn = fn;
    this.setter = setter;
    /**
     * @internal
     */
    this._value = void 0;
    this.subs = void 0;
    this.subsTail = void 0;
    this.deps = void 0;
    this.depsTail = void 0;
    this.flags = ReactiveFlags.Mutable | ReactiveFlags.Dirty;
    /**
     * @internal
     */
    this.__v_isRef = true;
    this["__v_isReadonly"] = !setter;
  }
  // TODO isolatedDeclarations "__v_isReadonly"
  // for backwards compat
  get effect() {
    return this;
  }
  // for backwards compat
  get dep() {
    return this;
  }
  /**
   * @internal
   * for backwards compat
   */
  get _dirty() {
    const flags = this.flags;
    if (flags & ReactiveFlags.Dirty) {
      return true;
    }
    if (flags & ReactiveFlags.Pending) {
      if (checkDirty(this.deps, this)) {
        this.flags = flags | ReactiveFlags.Dirty;
        return true;
      } else {
        this.flags = flags & ~ReactiveFlags.Pending;
      }
    }
    return false;
  }
  /**
   * @internal
   * for backwards compat
   */
  set _dirty(v) {
    if (v) {
      this.flags |= ReactiveFlags.Dirty;
    } else {
      this.flags &= ~(ReactiveFlags.Dirty | ReactiveFlags.Pending);
    }
  }
  get value() {
    const flags = this.flags;
    if (flags & ReactiveFlags.Dirty || flags & ReactiveFlags.Pending && checkDirty(this.deps, this)) {
      if (this.update()) {
        const subs = this.subs;
        if (subs !== void 0) {
          shallowPropagate(subs);
        }
      }
    } else if (flags & ReactiveFlags.Pending) {
      this.flags = flags & ~ReactiveFlags.Pending;
    }
    if (activeSub !== void 0) {
      link(this, activeSub);
    } else if (activeEffectScope !== void 0) {
      link(this, activeEffectScope);
    }
    return this._value;
  }
  set value(newValue) {
    if (this.setter) {
      this.setter(newValue);
    }
  }
  update() {
    const prevSub = startTracking(this);
    try {
      const oldValue = this._value;
      const newValue = this.fn(oldValue);
      if (hasChanged(oldValue, newValue)) {
        this._value = newValue;
        return true;
      }
      return false;
    } finally {
      endTracking(this, prevSub);
    }
  }
}
function computed$1(getterOrOptions, debugOptions, isSSR = false) {
  let getter;
  let setter;
  if (isFunction(getterOrOptions)) {
    getter = getterOrOptions;
  } else {
    getter = getterOrOptions.get;
    setter = getterOrOptions.set;
  }
  const cRef = new ComputedRefImpl(getter, setter);
  return cRef;
}

const TrackOpTypes = {
  "GET": "get",
  "HAS": "has",
  "ITERATE": "iterate"
};
const TriggerOpTypes = {
  "SET": "set",
  "ADD": "add",
  "DELETE": "delete",
  "CLEAR": "clear"
};

const INITIAL_WATCHER_VALUE = {};
let activeWatcher = void 0;
function getCurrentWatcher() {
  return activeWatcher;
}
function onWatcherCleanup(cleanupFn, failSilently = false, owner = activeWatcher) {
  if (owner) {
    const { call } = owner.options;
    if (call) {
      owner.cleanups[owner.cleanupsLength++] = () => call(cleanupFn, 4);
    } else {
      owner.cleanups[owner.cleanupsLength++] = cleanupFn;
    }
  }
}
class WatcherEffect extends ReactiveEffect {
  constructor(source, cb, options = EMPTY_OBJ) {
    const { deep, once, call, onWarn } = options;
    let getter;
    let forceTrigger = false;
    let isMultiSource = false;
    if (isRef(source)) {
      getter = () => source.value;
      forceTrigger = isShallow(source);
    } else if (isReactive(source)) {
      getter = () => reactiveGetter(source, deep);
      forceTrigger = true;
    } else if (isArray(source)) {
      isMultiSource = true;
      forceTrigger = source.some((s) => isReactive(s) || isShallow(s));
      getter = () => source.map((s) => {
        if (isRef(s)) {
          return s.value;
        } else if (isReactive(s)) {
          return reactiveGetter(s, deep);
        } else if (isFunction(s)) {
          return call ? call(s, 2) : s();
        } else ;
      });
    } else if (isFunction(source)) {
      if (cb) {
        getter = call ? () => call(source, 2) : source;
      } else {
        getter = () => {
          if (this.cleanupsLength) {
            const prevSub = setActiveSub();
            try {
              cleanup(this);
            } finally {
              setActiveSub(prevSub);
            }
          }
          const currentEffect = activeWatcher;
          activeWatcher = this;
          try {
            return call ? call(source, 3, [
              this.boundCleanup
            ]) : source(this.boundCleanup);
          } finally {
            activeWatcher = currentEffect;
          }
        };
      }
    } else {
      getter = NOOP;
    }
    if (cb && deep) {
      const baseGetter = getter;
      const depth = deep === true ? Infinity : deep;
      getter = () => traverse(baseGetter(), depth);
    }
    super(getter);
    this.cb = cb;
    this.options = options;
    this.boundCleanup = (fn) => onWatcherCleanup(fn, false, this);
    this.forceTrigger = forceTrigger;
    this.isMultiSource = isMultiSource;
    if (once && cb) {
      const _cb = cb;
      cb = (...args) => {
        _cb(...args);
        this.stop();
      };
    }
    this.cb = cb;
    this.oldValue = isMultiSource ? new Array(source.length).fill(INITIAL_WATCHER_VALUE) : INITIAL_WATCHER_VALUE;
  }
  run(initialRun = false) {
    const oldValue = this.oldValue;
    const newValue = this.oldValue = super.run();
    if (!this.cb) {
      return;
    }
    const { immediate, deep, call } = this.options;
    if (initialRun && !immediate) {
      return;
    }
    if (deep || this.forceTrigger || (this.isMultiSource ? newValue.some((v, i) => hasChanged(v, oldValue[i])) : hasChanged(newValue, oldValue))) {
      cleanup(this);
      const currentWatcher = activeWatcher;
      activeWatcher = this;
      try {
        const args = [
          newValue,
          // pass undefined as the old value when it's changed for the first time
          oldValue === INITIAL_WATCHER_VALUE ? void 0 : this.isMultiSource && oldValue[0] === INITIAL_WATCHER_VALUE ? [] : oldValue,
          this.boundCleanup
        ];
        call ? call(this.cb, 3, args) : (
          // @ts-expect-error
          this.cb(...args)
        );
      } finally {
        activeWatcher = currentWatcher;
      }
    }
  }
}
function reactiveGetter(source, deep) {
  if (deep) return source;
  if (isShallow(source) || deep === false || deep === 0)
    return traverse(source, 1);
  return traverse(source);
}
function watch$1(source, cb, options = EMPTY_OBJ) {
  const effect = new WatcherEffect(source, cb, options);
  effect.run(true);
  const stop = effect.stop.bind(effect);
  stop.pause = effect.pause.bind(effect);
  stop.resume = effect.resume.bind(effect);
  stop.stop = stop;
  return stop;
}
function traverse(value, depth = Infinity, seen) {
  if (depth <= 0 || !isObject(value) || value["__v_skip"]) {
    return value;
  }
  seen = seen || /* @__PURE__ */ new Set();
  if (seen.has(value)) {
    return value;
  }
  seen.add(value);
  depth--;
  if (isRef(value)) {
    traverse(value.value, depth, seen);
  } else if (isArray(value)) {
    for (let i = 0; i < value.length; i++) {
      traverse(value[i], depth, seen);
    }
  } else if (isSet(value) || isMap(value)) {
    value.forEach((v) => {
      traverse(v, depth, seen);
    });
  } else if (isPlainObject(value)) {
    for (const key in value) {
      traverse(value[key], depth, seen);
    }
    for (const key of Object.getOwnPropertySymbols(value)) {
      if (Object.prototype.propertyIsEnumerable.call(value, key)) {
        traverse(value[key], depth, seen);
      }
    }
  }
  return value;
}

const stack = [];
function pushWarningContext(ctx) {
  stack.push(ctx);
}
function popWarningContext() {
  stack.pop();
}
let isWarning = false;
function warn$2(msg, ...args) {
  if (isWarning) return;
  isWarning = true;
  const prevSub = setActiveSub();
  const entry = stack.length ? stack[stack.length - 1] : null;
  const instance = isVNode(entry) ? entry.component : entry;
  const appWarnHandler = instance && instance.appContext.config.warnHandler;
  const trace = getComponentTrace();
  if (appWarnHandler) {
    callWithErrorHandling(
      appWarnHandler,
      instance,
      11,
      [
        // eslint-disable-next-line no-restricted-syntax
        msg + args.map((a) => {
          var _a, _b;
          return (_b = (_a = a.toString) == null ? void 0 : _a.call(a)) != null ? _b : JSON.stringify(a);
        }).join(""),
        instance && instance.proxy || instance,
        trace.map(
          ({ ctx }) => `at <${formatComponentName(instance, ctx.type)}>`
        ).join("\n"),
        trace
      ]
    );
  } else {
    const warnArgs = [`[Vue warn]: ${msg}`, ...args];
    if (trace.length && // avoid spamming console during tests
    true) {
      warnArgs.push(`
`, ...formatTrace(trace));
    }
    console.warn(...warnArgs);
  }
  setActiveSub(prevSub);
  isWarning = false;
}
function getComponentTrace() {
  let currentCtx = stack[stack.length - 1];
  if (!currentCtx) {
    return [];
  }
  const normalizedStack = [];
  while (currentCtx) {
    const last = normalizedStack[0];
    if (last && last.ctx === currentCtx) {
      last.recurseCount++;
    } else {
      normalizedStack.push({
        ctx: currentCtx,
        recurseCount: 0
      });
    }
    if (isVNode(currentCtx)) {
      const parent = currentCtx.component && currentCtx.component.parent;
      currentCtx = parent && parent.vnode || parent;
    } else {
      currentCtx = currentCtx.parent;
    }
  }
  return normalizedStack;
}
function formatTrace(trace) {
  const logs = [];
  trace.forEach((entry, i) => {
    logs.push(...i === 0 ? [] : [`
`], ...formatTraceEntry(entry));
  });
  return logs;
}
function formatTraceEntry({ ctx, recurseCount }) {
  const postfix = recurseCount > 0 ? `... (${recurseCount} recursive calls)` : ``;
  const instance = isVNode(ctx) ? ctx.component : ctx;
  const isRoot = instance ? instance.parent == null : false;
  const open = ` at <${formatComponentName(instance, ctx.type, isRoot)}`;
  const close = `>` + postfix;
  return ctx.props ? [open, ...formatProps(ctx.props), close] : [open + close];
}
function formatProps(props) {
  const res = [];
  const keys = Object.keys(props);
  keys.slice(0, 3).forEach((key) => {
    res.push(...formatProp(key, props[key]));
  });
  if (keys.length > 3) {
    res.push(` ...`);
  }
  return res;
}
function formatProp(key, value, raw) {
  if (isString(value)) {
    value = JSON.stringify(value);
    return raw ? value : [`${key}=${value}`];
  } else if (typeof value === "number" || typeof value === "boolean" || value == null) {
    return raw ? value : [`${key}=${value}`];
  } else if (isRef(value)) {
    value = formatProp(key, toRaw(value.value), true);
    return raw ? value : [`${key}=Ref<`, value, `>`];
  } else if (isFunction(value)) {
    return [`${key}=fn${value.name ? `<${value.name}>` : ``}`];
  } else {
    value = toRaw(value);
    return raw ? value : [`${key}=`, value];
  }
}
function assertNumber(val, type) {
  return;
}

const ErrorCodes = {
  "SETUP_FUNCTION": 0,
  "0": "SETUP_FUNCTION",
  "RENDER_FUNCTION": 1,
  "1": "RENDER_FUNCTION",
  "NATIVE_EVENT_HANDLER": 5,
  "5": "NATIVE_EVENT_HANDLER",
  "COMPONENT_EVENT_HANDLER": 6,
  "6": "COMPONENT_EVENT_HANDLER",
  "VNODE_HOOK": 7,
  "7": "VNODE_HOOK",
  "DIRECTIVE_HOOK": 8,
  "8": "DIRECTIVE_HOOK",
  "TRANSITION_HOOK": 9,
  "9": "TRANSITION_HOOK",
  "APP_ERROR_HANDLER": 10,
  "10": "APP_ERROR_HANDLER",
  "APP_WARN_HANDLER": 11,
  "11": "APP_WARN_HANDLER",
  "FUNCTION_REF": 12,
  "12": "FUNCTION_REF",
  "ASYNC_COMPONENT_LOADER": 13,
  "13": "ASYNC_COMPONENT_LOADER",
  "SCHEDULER": 14,
  "14": "SCHEDULER",
  "COMPONENT_UPDATE": 15,
  "15": "COMPONENT_UPDATE",
  "APP_UNMOUNT_CLEANUP": 16,
  "16": "APP_UNMOUNT_CLEANUP"
};
function callWithErrorHandling(fn, instance, type, args) {
  try {
    return args ? fn(...args) : fn();
  } catch (err) {
    handleError(err, instance, type);
  }
}
function callWithAsyncErrorHandling(fn, instance, type, args) {
  if (isFunction(fn)) {
    const res = callWithErrorHandling(fn, instance, type, args);
    if (res && isPromise(res)) {
      res.catch((err) => {
        handleError(err, instance, type);
      });
    }
    return res;
  }
  if (isArray(fn)) {
    const values = [];
    for (let i = 0; i < fn.length; i++) {
      values.push(callWithAsyncErrorHandling(fn[i], instance, type, args));
    }
    return values;
  }
}
function handleError(err, instance, type, throwInDev = true) {
  const { errorHandler, throwUnhandledErrorInProduction } = instance && instance.appContext.config || EMPTY_OBJ;
  if (instance) {
    let cur = instance.parent;
    const exposedInstance = instance.proxy || instance;
    const errorInfo = `https://vuejs.org/error-reference/#runtime-${type}`;
    while (cur) {
      const errorCapturedHooks = cur.ec;
      if (errorCapturedHooks) {
        for (let i = 0; i < errorCapturedHooks.length; i++) {
          if (errorCapturedHooks[i](err, exposedInstance, errorInfo) === false) {
            return;
          }
        }
      }
      cur = cur.parent;
    }
    if (errorHandler) {
      const prevSub = setActiveSub();
      callWithErrorHandling(errorHandler, null, 10, [
        err,
        exposedInstance,
        errorInfo
      ]);
      setActiveSub(prevSub);
      return;
    }
  }
  logError(err, type, instance, throwInDev, throwUnhandledErrorInProduction);
}
function logError(err, type, instance, throwInDev = true, throwInProd = false) {
  if (throwInProd) {
    throw err;
  } else {
    console.error(err);
  }
}

const jobs = [];
let postJobs = [];
let activePostJobs = null;
let currentFlushPromise = null;
let jobsLength = 0;
let flushIndex = 0;
let postFlushIndex = 0;
const resolvedPromise = /* @__PURE__ */ Promise.resolve();
function nextTick(fn) {
  const p = currentFlushPromise || resolvedPromise;
  return fn ? p.then(this ? fn.bind(this) : fn) : p;
}
function findInsertionIndex(order, queue, start, end) {
  while (start < end) {
    const middle = start + end >>> 1;
    if (queue[middle].order <= order) {
      start = middle + 1;
    } else {
      end = middle;
    }
  }
  return start;
}
function queueJob(job, id, isPre = false) {
  if (queueJobWorker(
    job,
    id === void 0 ? isPre ? -2 : Infinity : isPre ? id * 2 : id * 2 + 1,
    jobs,
    jobsLength,
    flushIndex
  )) {
    jobsLength++;
    queueFlush();
  }
}
function queueJobWorker(job, order, queue, length, flushIndex2) {
  const flags = job.flags;
  if (!(flags & 1)) {
    job.flags = flags | 1;
    job.order = order;
    if (flushIndex2 === length || // fast path when the job id is larger than the tail
    order >= queue[length - 1].order) {
      queue[length] = job;
    } else {
      queue.splice(findInsertionIndex(order, queue, flushIndex2, length), 0, job);
    }
    return true;
  }
  return false;
}
const doFlushJobs = () => {
  try {
    flushJobs();
  } catch (e) {
    currentFlushPromise = null;
    throw e;
  }
};
function queueFlush() {
  if (!currentFlushPromise) {
    currentFlushPromise = resolvedPromise.then(doFlushJobs);
  }
}
function queuePostFlushCb(jobs2, id = Infinity) {
  if (!isArray(jobs2)) {
    if (activePostJobs && id === -1) {
      activePostJobs.splice(postFlushIndex, 0, jobs2);
    } else {
      queueJobWorker(jobs2, id, postJobs, postJobs.length, 0);
    }
  } else {
    for (const job of jobs2) {
      queueJobWorker(job, id, postJobs, postJobs.length, 0);
    }
  }
  queueFlush();
}
function flushPreFlushCbs(instance, seen) {
  for (let i = flushIndex; i < jobsLength; i++) {
    const cb = jobs[i];
    if (cb.order & 1 || cb.order === Infinity) {
      continue;
    }
    if (instance && cb.order !== instance.uid * 2) {
      continue;
    }
    jobs.splice(i, 1);
    i--;
    jobsLength--;
    if (cb.flags & 2) {
      cb.flags &= -2;
    }
    cb();
    if (!(cb.flags & 2)) {
      cb.flags &= -2;
    }
  }
}
function flushPostFlushCbs(seen) {
  if (postJobs.length) {
    if (activePostJobs) {
      activePostJobs.push(...postJobs);
      postJobs.length = 0;
      return;
    }
    activePostJobs = postJobs;
    postJobs = [];
    while (postFlushIndex < activePostJobs.length) {
      const cb = activePostJobs[postFlushIndex++];
      if (cb.flags & 2) {
        cb.flags &= -2;
      }
      if (!(cb.flags & 4)) {
        try {
          cb();
        } finally {
          cb.flags &= -2;
        }
      }
    }
    activePostJobs = null;
    postFlushIndex = 0;
  }
}
let isFlushing = false;
function flushOnAppMount() {
  if (!isFlushing) {
    isFlushing = true;
    flushPreFlushCbs();
    flushPostFlushCbs();
    isFlushing = false;
  }
}
function flushJobs(seen) {
  try {
    while (flushIndex < jobsLength) {
      const job = jobs[flushIndex];
      jobs[flushIndex++] = void 0;
      if (!(job.flags & 4)) {
        if (false) ;
        if (job.flags & 2) {
          job.flags &= ~1;
        }
        try {
          job();
        } catch (err) {
          handleError(
            err,
            job.i,
            job.i ? 15 : 14
          );
        } finally {
          if (!(job.flags & 2)) {
            job.flags &= ~1;
          }
        }
      }
    }
  } finally {
    while (flushIndex < jobsLength) {
      jobs[flushIndex].flags &= -2;
      jobs[flushIndex++] = void 0;
    }
    flushIndex = 0;
    jobsLength = 0;
    flushPostFlushCbs();
    currentFlushPromise = null;
    if (jobsLength || postJobs.length) {
      flushJobs();
    }
  }
}

const map = /* @__PURE__ */ new Map();
function registerHMR(instance) {
  const id = instance.type.__hmrId;
  let record = map.get(id);
  if (!record) {
    createRecord(id, instance.type);
    record = map.get(id);
  }
  record.instances.add(instance);
}
function unregisterHMR(instance) {
  map.get(instance.type.__hmrId).instances.delete(instance);
}
function createRecord(id, initialDef) {
  if (map.has(id)) {
    return false;
  }
  map.set(id, {
    initialDef: normalizeClassComponent(initialDef),
    instances: /* @__PURE__ */ new Set()
  });
  return true;
}
function normalizeClassComponent(component) {
  return isClassComponent(component) ? component.__vccOpts : component;
}

let currentRenderingInstance = null;
let currentScopeId = null;
function setCurrentRenderingInstance(instance) {
  const prev = currentRenderingInstance;
  currentRenderingInstance = instance;
  currentScopeId = instance && instance.type.__scopeId || null;
  return prev;
}
function pushScopeId(id) {
  currentScopeId = id;
}
function popScopeId() {
  currentScopeId = null;
}
const withScopeId = (_id) => withCtx;
function withCtx(fn, ctx = currentRenderingInstance, isNonScopedSlot) {
  if (!ctx) return fn;
  if (fn._n) {
    return fn;
  }
  const renderFnWithContext = (...args) => {
    if (renderFnWithContext._d) {
      setBlockTracking(-1);
    }
    const prevInstance = setCurrentRenderingInstance(ctx);
    let res;
    try {
      res = fn(...args);
    } finally {
      setCurrentRenderingInstance(prevInstance);
      if (renderFnWithContext._d) {
        setBlockTracking(1);
      }
    }
    return res;
  };
  renderFnWithContext._n = true;
  renderFnWithContext._c = true;
  renderFnWithContext._d = true;
  return renderFnWithContext;
}

function withDirectives(vnode, directives) {
  if (currentRenderingInstance === null) {
    return vnode;
  }
  const instance = getComponentPublicInstance(currentRenderingInstance);
  const bindings = vnode.dirs || (vnode.dirs = []);
  for (let i = 0; i < directives.length; i++) {
    let [dir, value, arg, modifiers = EMPTY_OBJ] = directives[i];
    if (dir) {
      if (isFunction(dir)) {
        dir = {
          mounted: dir,
          updated: dir
        };
      }
      if (dir.deep) {
        traverse(value);
      }
      bindings.push({
        dir,
        instance,
        value,
        oldValue: void 0,
        arg,
        modifiers
      });
    }
  }
  return vnode;
}
function invokeDirectiveHook(vnode, prevVNode, instance, name) {
  const bindings = vnode.dirs;
  const oldBindings = prevVNode && prevVNode.dirs;
  for (let i = 0; i < bindings.length; i++) {
    const binding = bindings[i];
    if (oldBindings) {
      binding.oldValue = oldBindings[i].value;
    }
    let hook = binding.dir[name];
    if (hook) {
      const prevSub = setActiveSub();
      callWithAsyncErrorHandling(hook, instance, 8, [
        vnode.el,
        binding,
        vnode,
        prevVNode
      ]);
      setActiveSub(prevSub);
    }
  }
}

const TeleportEndKey = Symbol("_vte");
const isTeleport = (type) => type.__isTeleport;
const isTeleportDisabled = (props) => props && (props.disabled || props.disabled === "");
const isTeleportDeferred = (props) => props && (props.defer || props.defer === "");
const isTargetSVG = (target) => typeof SVGElement !== "undefined" && target instanceof SVGElement;
const isTargetMathML = (target) => typeof MathMLElement === "function" && target instanceof MathMLElement;
const resolveTarget = (props, select) => {
  const targetSelector = props && props.to;
  if (isString(targetSelector)) {
    if (!select) {
      return null;
    } else {
      const target = select(targetSelector);
      return target;
    }
  } else {
    return targetSelector;
  }
};
const TeleportImpl = {
  name: "Teleport",
  __isTeleport: true,
  process(n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized, internals) {
    const {
      mc: mountChildren,
      pc: patchChildren,
      pbc: patchBlockChildren,
      o: { insert, querySelector, createText, createComment }
    } = internals;
    const disabled = isTeleportDisabled(n2.props);
    let { shapeFlag, children, dynamicChildren } = n2;
    if (n1 == null) {
      const placeholder = n2.el = createText("");
      const mainAnchor = n2.anchor = createText("");
      insert(placeholder, container, anchor);
      insert(mainAnchor, container, anchor);
      const mount = (container2, anchor2) => {
        if (shapeFlag & 16) {
          if (parentComponent && parentComponent.isCE) {
            parentComponent.ce._teleportTarget = container2;
          }
          mountChildren(
            children,
            container2,
            anchor2,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
        }
      };
      const mountToTarget = () => {
        const target = n2.target = resolveTarget(n2.props, querySelector);
        const targetAnchor = prepareAnchor(target, n2, createText, insert);
        if (target) {
          if (namespace !== "svg" && isTargetSVG(target)) {
            namespace = "svg";
          } else if (namespace !== "mathml" && isTargetMathML(target)) {
            namespace = "mathml";
          }
          if (!disabled) {
            mount(target, targetAnchor);
            updateCssVars(n2, false);
          }
        }
      };
      if (disabled) {
        mount(container, mainAnchor);
        updateCssVars(n2, true);
      }
      if (isTeleportDeferred(n2.props)) {
        n2.el.__isMounted = false;
        queuePostRenderEffect(
          () => {
            mountToTarget();
            delete n2.el.__isMounted;
          },
          void 0,
          parentSuspense
        );
      } else {
        mountToTarget();
      }
    } else {
      if (isTeleportDeferred(n2.props) && n1.el.__isMounted === false) {
        queuePostRenderEffect(
          () => {
            TeleportImpl.process(
              n1,
              n2,
              container,
              anchor,
              parentComponent,
              parentSuspense,
              namespace,
              slotScopeIds,
              optimized,
              internals
            );
          },
          void 0,
          parentSuspense
        );
        return;
      }
      n2.el = n1.el;
      n2.targetStart = n1.targetStart;
      const mainAnchor = n2.anchor = n1.anchor;
      const target = n2.target = n1.target;
      const targetAnchor = n2.targetAnchor = n1.targetAnchor;
      const wasDisabled = isTeleportDisabled(n1.props);
      const currentContainer = wasDisabled ? container : target;
      const currentAnchor = wasDisabled ? mainAnchor : targetAnchor;
      if (namespace === "svg" || isTargetSVG(target)) {
        namespace = "svg";
      } else if (namespace === "mathml" || isTargetMathML(target)) {
        namespace = "mathml";
      }
      if (dynamicChildren) {
        patchBlockChildren(
          n1.dynamicChildren,
          dynamicChildren,
          currentContainer,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds
        );
        traverseStaticChildren(n1, n2, true);
      } else if (!optimized) {
        patchChildren(
          n1,
          n2,
          currentContainer,
          currentAnchor,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          false
        );
      }
      if (disabled) {
        if (!wasDisabled) {
          moveTeleport(
            n2,
            container,
            mainAnchor,
            internals,
            parentComponent,
            1
          );
        } else {
          if (n2.props && n1.props && n2.props.to !== n1.props.to) {
            n2.props.to = n1.props.to;
          }
        }
      } else {
        if ((n2.props && n2.props.to) !== (n1.props && n1.props.to)) {
          const nextTarget = n2.target = resolveTarget(
            n2.props,
            querySelector
          );
          if (nextTarget) {
            moveTeleport(
              n2,
              nextTarget,
              null,
              internals,
              parentComponent,
              0
            );
          }
        } else if (wasDisabled) {
          moveTeleport(
            n2,
            target,
            targetAnchor,
            internals,
            parentComponent,
            1
          );
        }
      }
      updateCssVars(n2, disabled);
    }
  },
  remove(vnode, parentComponent, parentSuspense, { um: unmount, o: { remove: hostRemove } }, doRemove) {
    const {
      shapeFlag,
      children,
      anchor,
      targetStart,
      targetAnchor,
      target,
      props
    } = vnode;
    if (target) {
      hostRemove(targetStart);
      hostRemove(targetAnchor);
    }
    doRemove && hostRemove(anchor);
    if (shapeFlag & 16) {
      const shouldRemove = doRemove || !isTeleportDisabled(props);
      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        unmount(
          child,
          parentComponent,
          parentSuspense,
          shouldRemove,
          !!child.dynamicChildren
        );
      }
    }
  },
  move: moveTeleport,
  hydrate: hydrateTeleport
};
function moveTeleport(vnode, container, parentAnchor, { o: { insert }, m: move }, parentComponent, moveType = 2) {
  if (moveType === 0) {
    insert(vnode.targetAnchor, container, parentAnchor);
  }
  const { el, anchor, shapeFlag, children, props } = vnode;
  const isReorder = moveType === 2;
  if (isReorder) {
    insert(el, container, parentAnchor);
  }
  if (!isReorder || isTeleportDisabled(props)) {
    if (shapeFlag & 16) {
      for (let i = 0; i < children.length; i++) {
        move(
          children[i],
          container,
          parentAnchor,
          2,
          parentComponent
        );
      }
    }
  }
  if (isReorder) {
    insert(anchor, container, parentAnchor);
  }
}
function hydrateTeleport(node, vnode, parentComponent, parentSuspense, slotScopeIds, optimized, {
  o: { nextSibling, parentNode, querySelector, insert, createText }
}, hydrateChildren) {
  const target = vnode.target = resolveTarget(
    vnode.props,
    querySelector
  );
  if (target) {
    const disabled = isTeleportDisabled(vnode.props);
    const targetNode = target._lpa || target.firstChild;
    if (vnode.shapeFlag & 16) {
      if (disabled) {
        vnode.anchor = hydrateChildren(
          nextSibling(node),
          vnode,
          parentNode(node),
          parentComponent,
          parentSuspense,
          slotScopeIds,
          optimized
        );
        vnode.targetStart = targetNode;
        vnode.targetAnchor = targetNode && nextSibling(targetNode);
      } else {
        vnode.anchor = nextSibling(node);
        let targetAnchor = targetNode;
        while (targetAnchor) {
          if (targetAnchor && targetAnchor.nodeType === 8) {
            if (targetAnchor.data === "teleport start anchor") {
              vnode.targetStart = targetAnchor;
            } else if (targetAnchor.data === "teleport anchor") {
              vnode.targetAnchor = targetAnchor;
              target._lpa = vnode.targetAnchor && nextSibling(vnode.targetAnchor);
              break;
            }
          }
          targetAnchor = nextSibling(targetAnchor);
        }
        if (!vnode.targetAnchor) {
          prepareAnchor(target, vnode, createText, insert);
        }
        hydrateChildren(
          targetNode && nextSibling(targetNode),
          vnode,
          target,
          parentComponent,
          parentSuspense,
          slotScopeIds,
          optimized
        );
      }
    }
    updateCssVars(vnode, disabled);
  }
  return vnode.anchor && nextSibling(vnode.anchor);
}
const Teleport = TeleportImpl;
function updateCssVars(vnode, isDisabled) {
  const ctx = vnode.ctx;
  if (ctx && ctx.ut) {
    let node, anchor;
    if (isDisabled) {
      node = vnode.el;
      anchor = vnode.anchor;
    } else {
      node = vnode.targetStart;
      anchor = vnode.targetAnchor;
    }
    while (node && node !== anchor) {
      if (node.nodeType === 1) node.setAttribute("data-v-owner", ctx.uid);
      node = node.nextSibling;
    }
    ctx.ut();
  }
}
function prepareAnchor(target, vnode, createText, insert) {
  const targetStart = vnode.targetStart = createText("");
  const targetAnchor = vnode.targetAnchor = createText("");
  targetStart[TeleportEndKey] = targetAnchor;
  if (target) {
    insert(targetStart, target);
    insert(targetAnchor, target);
  }
  return targetAnchor;
}

const leaveCbKey = Symbol("_leaveCb");
const enterCbKey$1 = Symbol("_enterCb");
function useTransitionState() {
  const state = {
    isMounted: false,
    isLeaving: false,
    isUnmounting: false,
    leavingNodes: /* @__PURE__ */ new Map()
  };
  onMounted(() => {
    state.isMounted = true;
  });
  onBeforeUnmount(() => {
    state.isUnmounting = true;
  });
  return state;
}
const TransitionHookValidator = [Function, Array];
const BaseTransitionPropsValidators = {
  mode: String,
  appear: Boolean,
  persisted: Boolean,
  // enter
  onBeforeEnter: TransitionHookValidator,
  onEnter: TransitionHookValidator,
  onAfterEnter: TransitionHookValidator,
  onEnterCancelled: TransitionHookValidator,
  // leave
  onBeforeLeave: TransitionHookValidator,
  onLeave: TransitionHookValidator,
  onAfterLeave: TransitionHookValidator,
  onLeaveCancelled: TransitionHookValidator,
  // appear
  onBeforeAppear: TransitionHookValidator,
  onAppear: TransitionHookValidator,
  onAfterAppear: TransitionHookValidator,
  onAppearCancelled: TransitionHookValidator
};
const recursiveGetSubtree = (instance) => {
  const subTree = instance.type.__vapor ? instance.block : instance.subTree;
  return subTree.component ? recursiveGetSubtree(subTree.component) : subTree;
};
const BaseTransitionImpl = {
  name: `BaseTransition`,
  props: BaseTransitionPropsValidators,
  setup(props, { slots }) {
    const instance = getCurrentInstance();
    const state = useTransitionState();
    return () => {
      const children = slots.default && getTransitionRawChildren(slots.default(), true);
      if (!children || !children.length) {
        return;
      }
      const child = findNonCommentChild(children);
      const rawProps = toRaw(props);
      const { mode } = rawProps;
      if (state.isLeaving) {
        return emptyPlaceholder(child);
      }
      const innerChild = getInnerChild$1(child);
      if (!innerChild) {
        return emptyPlaceholder(child);
      }
      let enterHooks = resolveTransitionHooks$1(
        innerChild,
        rawProps,
        state,
        instance,
        // #11061, ensure enterHooks is fresh after clone
        (hooks) => enterHooks = hooks
      );
      if (innerChild.type !== Comment$1) {
        setTransitionHooks$1(innerChild, enterHooks);
      }
      let oldInnerChild = instance.subTree && getInnerChild$1(instance.subTree);
      if (oldInnerChild && oldInnerChild.type !== Comment$1 && !isSameVNodeType(innerChild, oldInnerChild) && recursiveGetSubtree(instance).type !== Comment$1) {
        let leavingHooks = resolveTransitionHooks$1(
          oldInnerChild,
          rawProps,
          state,
          instance
        );
        setTransitionHooks$1(oldInnerChild, leavingHooks);
        if (mode === "out-in" && innerChild.type !== Comment$1) {
          state.isLeaving = true;
          leavingHooks.afterLeave = () => {
            state.isLeaving = false;
            if (!(instance.job.flags & 4)) {
              instance.update();
            }
            delete leavingHooks.afterLeave;
            oldInnerChild = void 0;
          };
          return emptyPlaceholder(child);
        } else if (mode === "in-out" && innerChild.type !== Comment$1) {
          leavingHooks.delayLeave = (el, earlyRemove, delayedLeave) => {
            const leavingVNodesCache = getLeavingNodesForType(
              state,
              oldInnerChild
            );
            leavingVNodesCache[String(oldInnerChild.key)] = oldInnerChild;
            el[leaveCbKey] = () => {
              earlyRemove();
              el[leaveCbKey] = void 0;
              delete enterHooks.delayedLeave;
              oldInnerChild = void 0;
            };
            enterHooks.delayedLeave = () => {
              delayedLeave();
              delete enterHooks.delayedLeave;
              oldInnerChild = void 0;
            };
          };
        } else {
          oldInnerChild = void 0;
        }
      } else if (oldInnerChild) {
        oldInnerChild = void 0;
      }
      return child;
    };
  }
};
function findNonCommentChild(children) {
  let child = children[0];
  if (children.length > 1) {
    for (const c of children) {
      if (c.type !== Comment$1) {
        child = c;
        break;
      }
    }
  }
  return child;
}
const BaseTransition = BaseTransitionImpl;
function getLeavingNodesForType(state, vnode) {
  const { leavingNodes } = state;
  let leavingVNodesCache = leavingNodes.get(vnode.type);
  if (!leavingVNodesCache) {
    leavingVNodesCache = /* @__PURE__ */ Object.create(null);
    leavingNodes.set(vnode.type, leavingVNodesCache);
  }
  return leavingVNodesCache;
}
function resolveTransitionHooks$1(vnode, props, state, instance, postClone) {
  const key = String(vnode.key);
  const leavingVNodesCache = getLeavingNodesForType(state, vnode);
  const context = {
    setLeavingNodeCache: () => {
      leavingVNodesCache[key] = vnode;
    },
    unsetLeavingNodeCache: () => {
      if (leavingVNodesCache[key] === vnode) {
        delete leavingVNodesCache[key];
      }
    },
    earlyRemove: () => {
      const leavingVNode = leavingVNodesCache[key];
      if (leavingVNode && isSameVNodeType(vnode, leavingVNode) && leavingVNode.el[leaveCbKey]) {
        leavingVNode.el[leaveCbKey]();
      }
    },
    cloneHooks: (vnode2) => {
      const hooks = resolveTransitionHooks$1(
        vnode2,
        props,
        state,
        instance,
        postClone
      );
      if (postClone) postClone(hooks);
      return hooks;
    }
  };
  return baseResolveTransitionHooks(context, props, state, instance);
}
function baseResolveTransitionHooks(context, props, state, instance) {
  const {
    setLeavingNodeCache,
    unsetLeavingNodeCache,
    earlyRemove,
    cloneHooks
  } = context;
  const {
    appear,
    mode,
    persisted = false,
    onBeforeEnter,
    onEnter,
    onAfterEnter,
    onEnterCancelled,
    onBeforeLeave,
    onLeave,
    onAfterLeave,
    onLeaveCancelled,
    onBeforeAppear,
    onAppear,
    onAfterAppear,
    onAppearCancelled
  } = props;
  const callHook = (hook, args) => {
    hook && callWithAsyncErrorHandling(
      hook,
      instance,
      9,
      args
    );
  };
  const callAsyncHook = (hook, args) => {
    const done = args[1];
    callHook(hook, args);
    if (isArray(hook)) {
      if (hook.every((hook2) => hook2.length <= 1)) done();
    } else if (hook.length <= 1) {
      done();
    }
  };
  const hooks = {
    mode,
    persisted,
    beforeEnter(el) {
      let hook = onBeforeEnter;
      if (!state.isMounted) {
        if (appear) {
          hook = onBeforeAppear || onBeforeEnter;
        } else {
          return;
        }
      }
      if (el[leaveCbKey]) {
        el[leaveCbKey](
          true
          /* cancelled */
        );
      }
      earlyRemove();
      callHook(hook, [el]);
    },
    enter(el) {
      let hook = onEnter;
      let afterHook = onAfterEnter;
      let cancelHook = onEnterCancelled;
      if (!state.isMounted) {
        if (appear) {
          hook = onAppear || onEnter;
          afterHook = onAfterAppear || onAfterEnter;
          cancelHook = onAppearCancelled || onEnterCancelled;
        } else {
          return;
        }
      }
      let called = false;
      const done = el[enterCbKey$1] = (cancelled) => {
        if (called) return;
        called = true;
        if (cancelled) {
          callHook(cancelHook, [el]);
        } else {
          callHook(afterHook, [el]);
        }
        if (hooks.delayedLeave) {
          hooks.delayedLeave();
        }
        el[enterCbKey$1] = void 0;
      };
      if (hook) {
        callAsyncHook(hook, [el, done]);
      } else {
        done();
      }
    },
    leave(el, remove) {
      if (el[enterCbKey$1]) {
        el[enterCbKey$1](
          true
          /* cancelled */
        );
      }
      if (state.isUnmounting) {
        return remove();
      }
      callHook(onBeforeLeave, [el]);
      let called = false;
      const done = el[leaveCbKey] = (cancelled) => {
        if (called) return;
        called = true;
        remove();
        if (cancelled) {
          callHook(onLeaveCancelled, [el]);
        } else {
          callHook(onAfterLeave, [el]);
        }
        el[leaveCbKey] = void 0;
        unsetLeavingNodeCache(el);
      };
      setLeavingNodeCache(el);
      if (onLeave) {
        callAsyncHook(onLeave, [el, done]);
      } else {
        done();
      }
    },
    clone(node) {
      return cloneHooks(node);
    }
  };
  return hooks;
}
function emptyPlaceholder(vnode) {
  if (isKeepAlive(vnode)) {
    vnode = cloneVNode(vnode);
    vnode.children = null;
    return vnode;
  }
}
function getInnerChild$1(vnode) {
  if (!isKeepAlive(vnode)) {
    if (isTeleport(vnode.type) && vnode.children) {
      return findNonCommentChild(vnode.children);
    }
    return vnode;
  }
  if (vnode.component) {
    return vnode.component.subTree;
  }
  const { shapeFlag, children } = vnode;
  if (children) {
    if (shapeFlag & 16) {
      return children[0];
    }
    if (shapeFlag & 32 && isFunction(children.default)) {
      return children.default();
    }
  }
}
function setTransitionHooks$1(vnode, hooks) {
  if (vnode.shapeFlag & 6 && vnode.component) {
    if (vnode.type.__vapor) {
      getVaporInterface(vnode.component, vnode).setTransitionHooks(
        vnode.component,
        hooks
      );
    } else {
      vnode.transition = hooks;
      setTransitionHooks$1(vnode.component.subTree, hooks);
    }
  } else if (vnode.shapeFlag & 128) {
    vnode.ssContent.transition = hooks.clone(vnode.ssContent);
    vnode.ssFallback.transition = hooks.clone(vnode.ssFallback);
  } else {
    vnode.transition = hooks;
  }
}
function getTransitionRawChildren(children, keepComment = false, parentKey) {
  let ret = [];
  let keyedFragmentCount = 0;
  for (let i = 0; i < children.length; i++) {
    let child = children[i];
    const key = parentKey == null ? child.key : String(parentKey) + String(child.key != null ? child.key : i);
    if (child.type === Fragment) {
      if (child.patchFlag & 128) keyedFragmentCount++;
      ret = ret.concat(
        getTransitionRawChildren(child.children, keepComment, key)
      );
    } else if (keepComment || child.type !== Comment$1) {
      ret.push(key != null ? cloneVNode(child, { key }) : child);
    }
  }
  if (keyedFragmentCount > 1) {
    for (let i = 0; i < ret.length; i++) {
      ret[i].patchFlag = -2;
    }
  }
  return ret;
}
function checkTransitionMode(mode) {
}

/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function defineComponent(options, extraOptions) {
  return isFunction(options) ? (
    // #8236: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    /* @__PURE__ */ (() => extend({ name: options.name }, extraOptions, { setup: options }))()
  ) : options;
}

function useId() {
  const i = getCurrentGenericInstance();
  if (i) {
    return (i.appContext.config.idPrefix || "v") + "-" + i.ids[0] + i.ids[1]++;
  }
  return "";
}
function markAsyncBoundary(instance) {
  instance.ids = [instance.ids[0] + instance.ids[2]++ + "-", 0, 0];
}

function useTemplateRef(key) {
  const i = getCurrentGenericInstance();
  const r = shallowRef(null);
  if (i) {
    const refs = i.refs === EMPTY_OBJ ? i.refs = {} : i.refs;
    {
      Object.defineProperty(refs, key, {
        enumerable: true,
        get: () => r.value,
        set: (val) => r.value = val
      });
    }
  }
  const ret = r;
  return ret;
}

function setRef$1(rawRef, oldRawRef, parentSuspense, vnode, isUnmount = false) {
  if (isArray(rawRef)) {
    rawRef.forEach(
      (r, i) => setRef$1(
        r,
        oldRawRef && (isArray(oldRawRef) ? oldRawRef[i] : oldRawRef),
        parentSuspense,
        vnode,
        isUnmount
      )
    );
    return;
  }
  if (isAsyncWrapper(vnode) && !isUnmount) {
    if (vnode.shapeFlag & 512 && vnode.type.__asyncResolved && vnode.component.subTree.component) {
      setRef$1(rawRef, oldRawRef, parentSuspense, vnode.component.subTree);
    }
    return;
  }
  const refValue = vnode.shapeFlag & 4 ? getComponentPublicInstance(vnode.component) : vnode.el;
  const value = isUnmount ? null : refValue;
  const { i: owner, r: ref } = rawRef;
  const oldRef = oldRawRef && oldRawRef.r;
  const refs = owner.refs === EMPTY_OBJ ? owner.refs = {} : owner.refs;
  const setupState = owner.setupState;
  const canSetSetupRef = createCanSetSetupRefChecker(setupState);
  if (oldRef != null && oldRef !== ref) {
    if (isString(oldRef)) {
      refs[oldRef] = null;
      if (canSetSetupRef(oldRef)) {
        setupState[oldRef] = null;
      }
    } else if (isRef(oldRef)) {
      {
        oldRef.value = null;
      }
      const oldRawRefAtom = oldRawRef;
      if (oldRawRefAtom.k) refs[oldRawRefAtom.k] = null;
    }
  }
  if (isFunction(ref)) {
    callWithErrorHandling(ref, owner, 12, [value, refs]);
  } else {
    const _isString = isString(ref);
    const _isRef = isRef(ref);
    if (_isString || _isRef) {
      const doSet = () => {
        if (rawRef.f) {
          const existing = _isString ? canSetSetupRef(ref) ? setupState[ref] : refs[ref] : ref.value ;
          if (isUnmount) {
            isArray(existing) && remove$1(existing, refValue);
          } else {
            if (!isArray(existing)) {
              if (_isString) {
                refs[ref] = [refValue];
                if (canSetSetupRef(ref)) {
                  setupState[ref] = refs[ref];
                }
              } else {
                const newVal = [refValue];
                {
                  ref.value = newVal;
                }
                if (rawRef.k) refs[rawRef.k] = newVal;
              }
            } else if (!existing.includes(refValue)) {
              existing.push(refValue);
            }
          }
        } else if (_isString) {
          refs[ref] = value;
          if (canSetSetupRef(ref)) {
            setupState[ref] = value;
          }
        } else if (_isRef) {
          {
            ref.value = value;
          }
          if (rawRef.k) refs[rawRef.k] = value;
        } else ;
      };
      if (value) {
        queuePostRenderEffect(doSet, -1, parentSuspense);
      } else {
        doSet();
      }
    }
  }
}
function createCanSetSetupRefChecker(setupState) {
  const rawSetupState = toRaw(setupState);
  return setupState === EMPTY_OBJ ? NO : (key) => {
    return hasOwn(rawSetupState, key);
  };
}

let hasLoggedMismatchError$1 = false;
const logMismatchError$1 = () => {
  if (hasLoggedMismatchError$1) {
    return;
  }
  console.error("Hydration completed but contains mismatches.");
  hasLoggedMismatchError$1 = true;
};
const isSVGContainer = (container) => container.namespaceURI.includes("svg") && container.tagName !== "foreignObject";
const isMathMLContainer = (container) => container.namespaceURI.includes("MathML");
const getContainerType = (container) => {
  if (container.nodeType !== 1) return void 0;
  if (isSVGContainer(container)) return "svg";
  if (isMathMLContainer(container)) return "mathml";
  return void 0;
};
const isComment$1 = (node) => node.nodeType === 8;
function createHydrationFunctions(rendererInternals) {
  const {
    mt: mountComponent,
    p: patch,
    o: {
      patchProp,
      createText,
      nextSibling,
      parentNode,
      remove,
      insert,
      createComment
    }
  } = rendererInternals;
  const hydrate = (vnode, container) => {
    if (!container.hasChildNodes()) {
      patch(null, vnode, container);
      flushPostFlushCbs();
      container._vnode = vnode;
      return;
    }
    hydrateNode(container.firstChild, vnode, null, null, null);
    flushPostFlushCbs();
    container._vnode = vnode;
  };
  const hydrateNode = (node, vnode, parentComponent, parentSuspense, slotScopeIds, optimized = false) => {
    optimized = optimized || !!vnode.dynamicChildren;
    const isFragmentStart = isComment$1(node) && node.data === "[";
    const onMismatch = () => handleMismatch(
      node,
      vnode,
      parentComponent,
      parentSuspense,
      slotScopeIds,
      isFragmentStart
    );
    const { type, ref, shapeFlag, patchFlag } = vnode;
    let domType = node.nodeType;
    vnode.el = node;
    if (patchFlag === -2) {
      optimized = false;
      vnode.dynamicChildren = null;
    }
    let nextNode = null;
    switch (type) {
      case Text$1:
        if (domType !== 3) {
          if (vnode.children === "") {
            insert(vnode.el = createText(""), parentNode(node), node);
            nextNode = node;
          } else {
            nextNode = onMismatch();
          }
        } else {
          if (node.data !== vnode.children) {
            logMismatchError$1();
            node.data = vnode.children;
          }
          nextNode = nextSibling(node);
        }
        break;
      case Comment$1:
        if (isTemplateNode(node)) {
          nextNode = nextSibling(node);
          replaceNode(
            vnode.el = node.content.firstChild,
            node,
            parentComponent
          );
        } else if (domType !== 8 || isFragmentStart) {
          nextNode = onMismatch();
        } else {
          nextNode = nextSibling(node);
        }
        break;
      case Static:
        if (isFragmentStart) {
          node = nextSibling(node);
          domType = node.nodeType;
        }
        if (domType === 1 || domType === 3) {
          nextNode = node;
          const needToAdoptContent = !vnode.children.length;
          for (let i = 0; i < vnode.staticCount; i++) {
            if (needToAdoptContent)
              vnode.children += nextNode.nodeType === 1 ? nextNode.outerHTML : nextNode.data;
            if (i === vnode.staticCount - 1) {
              vnode.anchor = nextNode;
            }
            nextNode = nextSibling(nextNode);
          }
          return isFragmentStart ? nextSibling(nextNode) : nextNode;
        } else {
          onMismatch();
        }
        break;
      case Fragment:
        if (!isFragmentStart) {
          nextNode = onMismatch();
        } else {
          nextNode = hydrateFragment(
            node,
            vnode,
            parentComponent,
            parentSuspense,
            slotScopeIds,
            optimized
          );
        }
        break;
      case VaporSlot:
        nextNode = getVaporInterface(parentComponent, vnode).hydrateSlot(
          vnode,
          node
        );
        break;
      default:
        if (shapeFlag & 1) {
          if ((domType !== 1 || vnode.type.toLowerCase() !== node.tagName.toLowerCase()) && !isTemplateNode(node)) {
            nextNode = onMismatch();
          } else {
            nextNode = hydrateElement(
              node,
              vnode,
              parentComponent,
              parentSuspense,
              slotScopeIds,
              optimized
            );
          }
        } else if (shapeFlag & 6) {
          vnode.slotScopeIds = slotScopeIds;
          const container = parentNode(node);
          if (isFragmentStart) {
            nextNode = locateClosingAnchor(node);
          } else if (isComment$1(node) && node.data === "teleport start") {
            nextNode = locateClosingAnchor(node, node.data, "teleport end");
          } else {
            nextNode = nextSibling(node);
          }
          if (vnode.type.__vapor) {
            nextNode = getVaporInterface(parentComponent, vnode).hydrate(
              vnode,
              node,
              container,
              null,
              parentComponent
            );
          } else {
            mountComponent(
              vnode,
              container,
              null,
              parentComponent,
              parentSuspense,
              getContainerType(container),
              optimized
            );
          }
          if (isAsyncWrapper(vnode) && !vnode.type.__asyncResolved) {
            let subTree;
            if (isFragmentStart) {
              subTree = createVNode(Fragment);
              subTree.anchor = nextNode ? nextNode.previousSibling : container.lastChild;
            } else {
              subTree = node.nodeType === 3 ? createTextVNode("") : createVNode("div");
            }
            subTree.el = node;
            vnode.component.subTree = subTree;
          }
        } else if (shapeFlag & 64) {
          if (domType !== 8) {
            nextNode = onMismatch();
          } else {
            nextNode = vnode.type.hydrate(
              node,
              vnode,
              parentComponent,
              parentSuspense,
              slotScopeIds,
              optimized,
              rendererInternals,
              hydrateChildren
            );
          }
        } else if (shapeFlag & 128) {
          nextNode = vnode.type.hydrate(
            node,
            vnode,
            parentComponent,
            parentSuspense,
            getContainerType(parentNode(node)),
            slotScopeIds,
            optimized,
            rendererInternals,
            hydrateNode
          );
        } else ;
    }
    if (ref != null) {
      setRef$1(ref, null, parentSuspense, vnode);
    }
    return nextNode;
  };
  const hydrateElement = (el, vnode, parentComponent, parentSuspense, slotScopeIds, optimized) => {
    optimized = optimized || !!vnode.dynamicChildren;
    const { type, props, patchFlag, shapeFlag, dirs, transition } = vnode;
    const forcePatch = type === "input" || type === "option";
    if (forcePatch || patchFlag !== -1) {
      if (dirs) {
        invokeDirectiveHook(vnode, null, parentComponent, "created");
      }
      let needCallTransitionHooks = false;
      if (isTemplateNode(el)) {
        needCallTransitionHooks = needTransition(
          null,
          // no need check parentSuspense in hydration
          transition
        ) && parentComponent && parentComponent.vnode.props && parentComponent.vnode.props.appear;
        const content = el.content.firstChild;
        if (needCallTransitionHooks) {
          const cls = content.getAttribute("class");
          if (cls) content.$cls = cls;
          transition.beforeEnter(content);
        }
        replaceNode(content, el, parentComponent);
        vnode.el = el = content;
      }
      if (shapeFlag & 16 && // skip if element has innerHTML / textContent
      !(props && (props.innerHTML || props.textContent))) {
        let next = hydrateChildren(
          el.firstChild,
          vnode,
          el,
          parentComponent,
          parentSuspense,
          slotScopeIds,
          optimized
        );
        while (next) {
          if (!isMismatchAllowed(el, 1)) {
            logMismatchError$1();
          }
          const cur = next;
          next = next.nextSibling;
          remove(cur);
        }
      } else if (shapeFlag & 8) {
        let clientText = vnode.children;
        if (clientText[0] === "\n" && (el.tagName === "PRE" || el.tagName === "TEXTAREA")) {
          clientText = clientText.slice(1);
        }
        if (el.textContent !== clientText) {
          if (!isMismatchAllowed(el, 0)) {
            logMismatchError$1();
          }
          el.textContent = vnode.children;
        }
      }
      if (props) {
        if (forcePatch || !optimized || patchFlag & (16 | 32)) {
          const isCustomElement = el.tagName.includes("-");
          for (const key in props) {
            if (forcePatch && (key.endsWith("value") || key === "indeterminate") || isOn(key) && !isReservedProp(key) || // force hydrate v-bind with .prop modifiers
            key[0] === "." || isCustomElement) {
              patchProp(el, key, null, props[key], void 0, parentComponent);
            }
          }
        } else if (props.onClick) {
          patchProp(
            el,
            "onClick",
            null,
            props.onClick,
            void 0,
            parentComponent
          );
        } else if (patchFlag & 4 && isReactive(props.style)) {
          for (const key in props.style) props.style[key];
        }
      }
      let vnodeHooks;
      if (vnodeHooks = props && props.onVnodeBeforeMount) {
        invokeVNodeHook(vnodeHooks, parentComponent, vnode);
      }
      if (dirs) {
        invokeDirectiveHook(vnode, null, parentComponent, "beforeMount");
      }
      if ((vnodeHooks = props && props.onVnodeMounted) || dirs || needCallTransitionHooks) {
        queueEffectWithSuspense(
          () => {
            vnodeHooks && invokeVNodeHook(vnodeHooks, parentComponent, vnode);
            needCallTransitionHooks && transition.enter(el);
            dirs && invokeDirectiveHook(vnode, null, parentComponent, "mounted");
          },
          void 0,
          parentSuspense
        );
      }
    }
    return el.nextSibling;
  };
  const hydrateChildren = (node, parentVNode, container, parentComponent, parentSuspense, slotScopeIds, optimized) => {
    optimized = optimized || !!parentVNode.dynamicChildren;
    const children = parentVNode.children;
    const l = children.length;
    for (let i = 0; i < l; i++) {
      const vnode = optimized ? children[i] : children[i] = normalizeVNode(children[i]);
      const isText = vnode.type === Text$1;
      if (node) {
        if (isText && !optimized) {
          if (i + 1 < l && normalizeVNode(children[i + 1]).type === Text$1) {
            insert(
              createText(
                node.data.slice(vnode.children.length)
              ),
              container,
              nextSibling(node)
            );
            node.data = vnode.children;
          }
        }
        node = hydrateNode(
          node,
          vnode,
          parentComponent,
          parentSuspense,
          slotScopeIds,
          optimized
        );
      } else if (isText && !vnode.children) {
        insert(vnode.el = createText(""), container);
      } else {
        if (!isMismatchAllowed(container, 1)) {
          logMismatchError$1();
        }
        patch(
          null,
          vnode,
          container,
          null,
          parentComponent,
          parentSuspense,
          getContainerType(container),
          slotScopeIds
        );
      }
    }
    return node;
  };
  const hydrateFragment = (node, vnode, parentComponent, parentSuspense, slotScopeIds, optimized) => {
    const { slotScopeIds: fragmentSlotScopeIds } = vnode;
    if (fragmentSlotScopeIds) {
      slotScopeIds = slotScopeIds ? slotScopeIds.concat(fragmentSlotScopeIds) : fragmentSlotScopeIds;
    }
    const container = parentNode(node);
    const next = hydrateChildren(
      nextSibling(node),
      vnode,
      container,
      parentComponent,
      parentSuspense,
      slotScopeIds,
      optimized
    );
    if (next && isComment$1(next) && next.data === "]") {
      return nextSibling(vnode.anchor = next);
    } else {
      logMismatchError$1();
      insert(vnode.anchor = createComment(`]`), container, next);
      return next;
    }
  };
  const handleMismatch = (node, vnode, parentComponent, parentSuspense, slotScopeIds, isFragment) => {
    if (!isMismatchAllowed(node.parentElement, 1)) {
      logMismatchError$1();
    }
    vnode.el = null;
    if (isFragment) {
      const end = locateClosingAnchor(node);
      while (true) {
        const next2 = nextSibling(node);
        if (next2 && next2 !== end) {
          remove(next2);
        } else {
          break;
        }
      }
    }
    const next = nextSibling(node);
    const container = parentNode(node);
    remove(node);
    patch(
      null,
      vnode,
      container,
      next,
      parentComponent,
      parentSuspense,
      getContainerType(container),
      slotScopeIds
    );
    if (parentComponent) {
      parentComponent.vnode.el = vnode.el;
      updateHOCHostEl(parentComponent, vnode.el);
    }
    return next;
  };
  const locateClosingAnchor = (node, open = "[", close = "]") => {
    let match = 0;
    while (node) {
      node = nextSibling(node);
      if (node && isComment$1(node)) {
        if (node.data === open) match++;
        if (node.data === close) {
          if (match === 0) {
            return nextSibling(node);
          } else {
            match--;
          }
        }
      }
    }
    return node;
  };
  const replaceNode = (newNode, oldNode, parentComponent) => {
    const parentNode2 = oldNode.parentNode;
    if (parentNode2) {
      parentNode2.replaceChild(newNode, oldNode);
    }
    let parent = parentComponent;
    while (parent) {
      if (parent.vnode.el === oldNode) {
        parent.vnode.el = parent.subTree.el = newNode;
      }
      parent = parent.parent;
    }
  };
  return [hydrate, hydrateNode];
}
const isTemplateNode = (node) => {
  return node.nodeType === 1 && node.tagName === "TEMPLATE";
};
function getAttributeMismatch(el, key, clientValue) {
  let actual;
  let expected;
  if (isBooleanAttr(key)) {
    actual = el.hasAttribute(key);
    expected = includeBooleanAttr(clientValue);
  } else if (clientValue == null) {
    actual = el.hasAttribute(key);
    expected = false;
  } else {
    if (el.hasAttribute(key)) {
      actual = el.getAttribute(key);
    } else if (key === "value" && el.tagName === "TEXTAREA") {
      actual = el.value;
    } else {
      actual = false;
    }
    expected = isRenderableAttrValue(clientValue) ? String(clientValue) : false;
  }
  return { actual, expected };
}
function isValidHtmlOrSvgAttribute(el, key) {
  return el instanceof SVGElement && isKnownSvgAttr(key) || el instanceof HTMLElement && (isBooleanAttr(key) || isKnownHtmlAttr(key));
}
function warnPropMismatch(el, mismatchKey, mismatchType, actual, expected) {
  if (mismatchType != null && !isMismatchAllowed(el, mismatchType)) {
    const format = (v) => v === false ? `(not rendered)` : `${mismatchKey}="${v}"`;
    const preSegment = `Hydration ${MismatchTypeString[mismatchType]} mismatch on`;
    const postSegment = `
  - rendered on server: ${format(actual)}
  - expected on client: ${format(expected)}
  Note: this mismatch is check-only. The DOM will not be rectified in production due to performance overhead.
  You should fix the source of the mismatch.`;
    {
      warn$2(preSegment, el, postSegment);
    }
    return true;
  }
  return false;
}
function toClassSet(str) {
  return new Set(str.trim().split(/\s+/));
}
function isSetEqual(a, b) {
  if (a.size !== b.size) {
    return false;
  }
  for (const s of a) {
    if (!b.has(s)) {
      return false;
    }
  }
  return true;
}
function toStyleMap(str) {
  const styleMap = /* @__PURE__ */ new Map();
  for (const item of str.split(";")) {
    let [key, value] = item.split(":");
    key = key.trim();
    value = value && value.trim();
    if (key && value) {
      styleMap.set(key, value);
    }
  }
  return styleMap;
}
function isMapEqual(a, b) {
  if (a.size !== b.size) {
    return false;
  }
  for (const [key, value] of a) {
    if (value !== b.get(key)) {
      return false;
    }
  }
  return true;
}
const allowMismatchAttr = "data-allow-mismatch";
const MismatchTypes = {
  "TEXT": 0,
  "0": "TEXT",
  "CHILDREN": 1,
  "1": "CHILDREN",
  "CLASS": 2,
  "2": "CLASS",
  "STYLE": 3,
  "3": "STYLE",
  "ATTRIBUTE": 4,
  "4": "ATTRIBUTE"
};
const MismatchTypeString = {
  [0]: "text",
  [1]: "children",
  [2]: "class",
  [3]: "style",
  [4]: "attribute"
};
function isMismatchAllowed(el, allowedType) {
  if (allowedType === 0 || allowedType === 1) {
    while (el && !el.hasAttribute(allowMismatchAttr)) {
      el = el.parentElement;
    }
  }
  const allowedAttr = el && el.getAttribute(allowMismatchAttr);
  if (allowedAttr == null) {
    return false;
  } else if (allowedAttr === "") {
    return true;
  } else {
    const list = allowedAttr.split(",");
    if (allowedType === 0 && list.includes("children")) {
      return true;
    }
    return list.includes(MismatchTypeString[allowedType]);
  }
}

const requestIdleCallback = getGlobalThis().requestIdleCallback || ((cb) => setTimeout(cb, 1));
const cancelIdleCallback = getGlobalThis().cancelIdleCallback || ((id) => clearTimeout(id));
const hydrateOnIdle = (timeout = 1e4) => (hydrate) => {
  const id = requestIdleCallback(hydrate, { timeout });
  return () => cancelIdleCallback(id);
};
function elementIsVisibleInViewport(el) {
  const { top, left, bottom, right } = el.getBoundingClientRect();
  const { innerHeight, innerWidth } = window;
  return (top > 0 && top < innerHeight || bottom > 0 && bottom < innerHeight) && (left > 0 && left < innerWidth || right > 0 && right < innerWidth);
}
const hydrateOnVisible = (opts) => (hydrate, forEach) => {
  const ob = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      ob.disconnect();
      hydrate();
      break;
    }
  }, opts);
  forEach((el) => {
    if (!(el instanceof Element)) return;
    if (elementIsVisibleInViewport(el)) {
      hydrate();
      ob.disconnect();
      return false;
    }
    ob.observe(el);
  });
  return () => ob.disconnect();
};
const hydrateOnMediaQuery = (query) => (hydrate) => {
  if (query) {
    const mql = matchMedia(query);
    if (mql.matches) {
      hydrate();
    } else {
      mql.addEventListener("change", hydrate, { once: true });
      return () => mql.removeEventListener("change", hydrate);
    }
  }
};
const hydrateOnInteraction = (interactions = []) => (hydrate, forEach) => {
  if (isString(interactions)) interactions = [interactions];
  let hasHydrated = false;
  const doHydrate = (e) => {
    if (!hasHydrated) {
      hasHydrated = true;
      teardown();
      hydrate();
      e.target.dispatchEvent(new e.constructor(e.type, e));
    }
  };
  const teardown = () => {
    forEach((el) => {
      for (const i of interactions) {
        el.removeEventListener(i, doHydrate);
      }
    });
  };
  forEach((el) => {
    for (const i of interactions) {
      el.addEventListener(i, doHydrate, { once: true });
    }
  });
  return teardown;
};
function forEachElement(node, cb) {
  if (isComment$1(node) && node.data === "[") {
    let depth = 1;
    let next = node.nextSibling;
    while (next) {
      if (next.nodeType === 1) {
        const result = cb(next);
        if (result === false) {
          break;
        }
      } else if (isComment$1(next)) {
        if (next.data === "]") {
          if (--depth === 0) break;
        } else if (next.data === "[") {
          depth++;
        }
      }
      next = next.nextSibling;
    }
  } else {
    cb(node);
  }
}

const isAsyncWrapper = (i) => !!i.type.__asyncLoader;
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function defineAsyncComponent(source) {
  const {
    load,
    getResolvedComp,
    setPendingRequest,
    source: {
      loadingComponent,
      errorComponent,
      delay,
      hydrate: hydrateStrategy,
      timeout,
      suspensible = true
    }
  } = createAsyncComponentContext(source);
  return defineComponent({
    name: "AsyncComponentWrapper",
    __asyncLoader: load,
    __asyncHydrate(el, instance, hydrate) {
      performAsyncHydrate(
        el,
        instance,
        hydrate,
        getResolvedComp,
        load,
        hydrateStrategy
      );
    },
    get __asyncResolved() {
      return getResolvedComp();
    },
    setup() {
      const instance = currentInstance;
      markAsyncBoundary(instance);
      let resolvedComp = getResolvedComp();
      if (resolvedComp) {
        return () => createInnerComp$1(resolvedComp, instance);
      }
      const onError = (err) => {
        setPendingRequest(null);
        handleError(
          err,
          instance,
          13,
          !errorComponent
        );
      };
      if (suspensible && instance.suspense || isInSSRComponentSetup) {
        return loadInnerComponent(instance, load, onError, errorComponent);
      }
      const { loaded, error, delayed } = useAsyncComponentState(
        delay,
        timeout,
        onError
      );
      load().then(() => {
        loaded.value = true;
        if (instance.parent && instance.parent.vnode && isKeepAlive(instance.parent.vnode)) {
          instance.parent.update();
        }
      }).catch((err) => {
        onError(err);
        error.value = err;
      });
      return () => {
        resolvedComp = getResolvedComp();
        if (loaded.value && resolvedComp) {
          return createInnerComp$1(resolvedComp, instance);
        } else if (error.value && errorComponent) {
          return createVNode(errorComponent, {
            error: error.value
          });
        } else if (loadingComponent && !delayed.value) {
          return createVNode(loadingComponent);
        }
      };
    }
  });
}
function createInnerComp$1(comp, parent) {
  const { ref: ref2, props, children, ce } = parent.vnode;
  const vnode = createVNode(comp, props, children);
  vnode.ref = ref2;
  vnode.ce = ce;
  delete parent.vnode.ce;
  return vnode;
}
function createAsyncComponentContext(source) {
  if (isFunction(source)) {
    source = { loader: source };
  }
  const { loader, onError: userOnError } = source;
  let pendingRequest = null;
  let resolvedComp;
  let retries = 0;
  const retry = () => {
    retries++;
    pendingRequest = null;
    return load();
  };
  const load = () => {
    let thisRequest;
    return pendingRequest || (thisRequest = pendingRequest = loader().catch((err) => {
      err = err instanceof Error ? err : new Error(String(err));
      if (userOnError) {
        return new Promise((resolve, reject) => {
          const userRetry = () => resolve(retry());
          const userFail = () => reject(err);
          userOnError(err, userRetry, userFail, retries + 1);
        });
      } else {
        throw err;
      }
    }).then((comp) => {
      if (thisRequest !== pendingRequest && pendingRequest) {
        return pendingRequest;
      }
      if (comp && (comp.__esModule || comp[Symbol.toStringTag] === "Module")) {
        comp = comp.default;
      }
      resolvedComp = comp;
      return comp;
    }));
  };
  return {
    load,
    source,
    getResolvedComp: () => resolvedComp,
    setPendingRequest: (request) => pendingRequest = request
  };
}
const useAsyncComponentState = (delay, timeout, onError) => {
  const loaded = ref(false);
  const error = ref();
  const delayed = ref(!!delay);
  if (delay) {
    setTimeout(() => {
      delayed.value = false;
    }, delay);
  }
  if (timeout != null) {
    setTimeout(() => {
      if (!loaded.value && !error.value) {
        const err = new Error(`Async component timed out after ${timeout}ms.`);
        onError(err);
        error.value = err;
      }
    }, timeout);
  }
  return { loaded, error, delayed };
};
function loadInnerComponent(instance, load, onError, errorComponent) {
  return load().then((comp) => {
    return () => createInnerComp$1(comp, instance);
  }).catch((err) => {
    onError(err);
    return () => errorComponent ? createVNode(errorComponent, {
      error: err
    }) : null;
  });
}
function performAsyncHydrate(el, instance, hydrate, getResolvedComp, load, hydrateStrategy) {
  let patched = false;
  (instance.bu || (instance.bu = [])).push(() => patched = true);
  const performHydrate = () => {
    if (patched) {
      return;
    }
    hydrate();
  };
  const doHydrate = hydrateStrategy ? () => {
    const teardown = hydrateStrategy(
      performHydrate,
      (cb) => forEachElement(el, cb)
    );
    if (teardown) {
      (instance.bum || (instance.bum = [])).push(teardown);
    }
  } : performHydrate;
  if (getResolvedComp()) {
    doHydrate();
  } else {
    load().then(() => !instance.isUnmounted && doHydrate());
  }
}

const isKeepAlive = (vnode) => vnode.type.__isKeepAlive;
const KeepAliveImpl = {
  name: `KeepAlive`,
  // Marker for special handling inside the renderer. We are not using a ===
  // check directly on KeepAlive in the renderer, because importing it directly
  // would prevent it from being tree-shaken.
  __isKeepAlive: true,
  props: {
    include: [String, RegExp, Array],
    exclude: [String, RegExp, Array],
    max: [String, Number]
  },
  setup(props, { slots }) {
    const keepAliveInstance = getCurrentInstance();
    const sharedContext = keepAliveInstance.ctx;
    if (!sharedContext.renderer) {
      return () => {
        const children = slots.default && slots.default();
        return children && children.length === 1 ? children[0] : children;
      };
    }
    const cache = /* @__PURE__ */ new Map();
    const keys = /* @__PURE__ */ new Set();
    let current = null;
    const parentSuspense = keepAliveInstance.suspense;
    const {
      renderer: {
        p: patch,
        m: move,
        um: _unmount,
        o: { createElement }
      }
    } = sharedContext;
    const storageContainer = createElement("div");
    sharedContext.activate = (vnode, container, anchor, namespace, optimized) => {
      const instance = vnode.component;
      move(
        vnode,
        container,
        anchor,
        0,
        keepAliveInstance,
        parentSuspense
      );
      patch(
        instance.vnode,
        vnode,
        container,
        anchor,
        instance,
        parentSuspense,
        namespace,
        vnode.slotScopeIds,
        optimized
      );
      queuePostRenderEffect(
        () => {
          instance.isDeactivated = false;
          if (instance.a) {
            invokeArrayFns(instance.a);
          }
          const vnodeHook = vnode.props && vnode.props.onVnodeMounted;
          if (vnodeHook) {
            invokeVNodeHook(vnodeHook, instance.parent, vnode);
          }
        },
        void 0,
        parentSuspense
      );
    };
    sharedContext.deactivate = (vnode) => {
      const instance = vnode.component;
      invalidateMount(instance.m);
      invalidateMount(instance.a);
      move(
        vnode,
        storageContainer,
        null,
        1,
        keepAliveInstance,
        parentSuspense
      );
      queuePostRenderEffect(
        () => {
          if (instance.da) {
            invokeArrayFns(instance.da);
          }
          const vnodeHook = vnode.props && vnode.props.onVnodeUnmounted;
          if (vnodeHook) {
            invokeVNodeHook(vnodeHook, instance.parent, vnode);
          }
          instance.isDeactivated = true;
        },
        void 0,
        parentSuspense
      );
    };
    function unmount(vnode) {
      resetShapeFlag(vnode);
      _unmount(vnode, keepAliveInstance, parentSuspense, true);
    }
    function pruneCache(filter) {
      cache.forEach((vnode, key) => {
        const name = getComponentName(vnode.type);
        if (name && !filter(name)) {
          pruneCacheEntry(key);
        }
      });
    }
    function pruneCacheEntry(key) {
      const cached = cache.get(key);
      if (cached && (!current || !isSameVNodeType(cached, current))) {
        unmount(cached);
      } else if (current) {
        resetShapeFlag(current);
      }
      cache.delete(key);
      keys.delete(key);
    }
    watch(
      () => [props.include, props.exclude],
      ([include, exclude]) => {
        include && pruneCache((name) => matches(include, name));
        exclude && pruneCache((name) => !matches(exclude, name));
      },
      // prune post-render after `current` has been updated
      { flush: "post", deep: true }
    );
    let pendingCacheKey = null;
    const cacheSubtree = () => {
      if (pendingCacheKey != null) {
        if (isSuspense(keepAliveInstance.subTree.type)) {
          queuePostRenderEffect(
            () => {
              cache.set(
                pendingCacheKey,
                getInnerChild(keepAliveInstance.subTree)
              );
            },
            void 0,
            keepAliveInstance.subTree.suspense
          );
        } else {
          cache.set(pendingCacheKey, getInnerChild(keepAliveInstance.subTree));
        }
      }
    };
    onMounted(cacheSubtree);
    onUpdated(cacheSubtree);
    onBeforeUnmount(() => {
      cache.forEach((cached) => {
        const { subTree, suspense } = keepAliveInstance;
        const vnode = getInnerChild(subTree);
        if (cached.type === vnode.type && cached.key === vnode.key) {
          resetShapeFlag(vnode);
          const da = vnode.component.da;
          da && queuePostRenderEffect(da, void 0, suspense);
          return;
        }
        unmount(cached);
      });
    });
    return () => {
      pendingCacheKey = null;
      if (!slots.default) {
        return current = null;
      }
      const children = slots.default();
      const rawVNode = children[0];
      if (children.length > 1) {
        current = null;
        return children;
      } else if (!isVNode(rawVNode) || !(rawVNode.shapeFlag & 4) && !(rawVNode.shapeFlag & 128)) {
        current = null;
        return rawVNode;
      }
      let vnode = getInnerChild(rawVNode);
      if (vnode.type === Comment$1) {
        current = null;
        return vnode;
      }
      const comp = vnode.type;
      const name = getComponentName(
        isAsyncWrapper(vnode) ? vnode.type.__asyncResolved || {} : comp
      );
      const { include, exclude, max } = props;
      if (include && (!name || !matches(include, name)) || exclude && name && matches(exclude, name)) {
        vnode.shapeFlag &= -257;
        current = vnode;
        return rawVNode;
      }
      const key = vnode.key == null ? comp : vnode.key;
      const cachedVNode = cache.get(key);
      if (vnode.el) {
        vnode = cloneVNode(vnode);
        if (rawVNode.shapeFlag & 128) {
          rawVNode.ssContent = vnode;
        }
      }
      pendingCacheKey = key;
      if (cachedVNode) {
        vnode.el = cachedVNode.el;
        vnode.component = cachedVNode.component;
        if (vnode.transition) {
          setTransitionHooks$1(vnode, vnode.transition);
        }
        vnode.shapeFlag |= 512;
        keys.delete(key);
        keys.add(key);
      } else {
        keys.add(key);
        if (max && keys.size > parseInt(max, 10)) {
          pruneCacheEntry(keys.values().next().value);
        }
      }
      vnode.shapeFlag |= 256;
      current = vnode;
      return isSuspense(rawVNode.type) ? rawVNode : vnode;
    };
  }
};
const KeepAlive = KeepAliveImpl;
function matches(pattern, name) {
  if (isArray(pattern)) {
    return pattern.some((p) => matches(p, name));
  } else if (isString(pattern)) {
    return pattern.split(",").includes(name);
  } else if (isRegExp(pattern)) {
    pattern.lastIndex = 0;
    return pattern.test(name);
  }
  return false;
}
function onActivated(hook, target) {
  registerKeepAliveHook(hook, "a", target);
}
function onDeactivated(hook, target) {
  registerKeepAliveHook(hook, "da", target);
}
function registerKeepAliveHook(hook, type, target = getCurrentInstance()) {
  const wrappedHook = hook.__wdc || (hook.__wdc = () => {
    let current = target;
    while (current) {
      if (current.isDeactivated) {
        return;
      }
      current = current.parent;
    }
    return hook();
  });
  injectHook(type, wrappedHook, target);
  if (target) {
    let current = target.parent;
    while (current && current.parent && current.parent.vnode) {
      if (isKeepAlive(current.parent.vnode)) {
        injectToKeepAliveRoot(wrappedHook, type, target, current);
      }
      current = current.parent;
    }
  }
}
function injectToKeepAliveRoot(hook, type, target, keepAliveRoot) {
  const injected = injectHook(
    type,
    hook,
    keepAliveRoot,
    true
    /* prepend */
  );
  onUnmounted(() => {
    remove$1(keepAliveRoot[type], injected);
  }, target);
}
function resetShapeFlag(vnode) {
  vnode.shapeFlag &= -257;
  vnode.shapeFlag &= -513;
}
function getInnerChild(vnode) {
  return vnode.shapeFlag & 128 ? vnode.ssContent : vnode;
}

function injectHook(type, hook, target = currentInstance, prepend = false) {
  if (target) {
    const hooks = target[type] || (target[type] = []);
    const wrappedHook = hook.__weh || (hook.__weh = (...args) => {
      const prevSub = setActiveSub();
      const prev = setCurrentInstance(target);
      try {
        return callWithAsyncErrorHandling(hook, target, type, args);
      } finally {
        setCurrentInstance(...prev);
        setActiveSub(prevSub);
      }
    });
    if (prepend) {
      hooks.unshift(wrappedHook);
    } else {
      hooks.push(wrappedHook);
    }
    return wrappedHook;
  }
}
const createHook = (lifecycle) => (hook, target = currentInstance) => {
  if (!isInSSRComponentSetup || lifecycle === "sp") {
    injectHook(lifecycle, (...args) => hook(...args), target);
  }
};
const onBeforeMount = createHook("bm");
const onMounted = createHook("m");
const onBeforeUpdate = createHook(
  "bu"
);
const onUpdated = createHook("u");
const onBeforeUnmount = createHook(
  "bum"
);
const onUnmounted = createHook("um");
const onServerPrefetch = createHook(
  "sp"
);
const onRenderTriggered = createHook("rtg");
const onRenderTracked = createHook("rtc");
function onErrorCaptured(hook, target = currentInstance) {
  injectHook("ec", hook, target);
}

const COMPONENTS = "components";
const DIRECTIVES = "directives";
function resolveComponent(name, maybeSelfReference) {
  return resolveAsset(COMPONENTS, name, true, maybeSelfReference) || name;
}
const NULL_DYNAMIC_COMPONENT = Symbol.for("v-ndc");
function resolveDynamicComponent(component) {
  if (isString(component)) {
    return resolveAsset(COMPONENTS, component, false) || component;
  } else {
    return component || NULL_DYNAMIC_COMPONENT;
  }
}
function resolveDirective(name) {
  return resolveAsset(DIRECTIVES, name);
}
function resolveAsset(type, name, warnMissing = true, maybeSelfReference = false) {
  const instance = currentRenderingInstance || currentInstance;
  if (instance) {
    const Component = instance.type;
    if (type === COMPONENTS) {
      const selfName = getComponentName(
        Component,
        false
      );
      if (selfName && (selfName === name || selfName === camelize(name) || selfName === capitalize(camelize(name)))) {
        return Component;
      }
    }
    const res = (
      // local registration
      // check instance[type] first which is resolved for options API
      resolve(
        instance[type] || Component[type],
        name
      ) || // global registration
      // @ts-expect-error filters only exist in compat mode
      resolve(instance.appContext[type], name)
    );
    if (!res && maybeSelfReference) {
      return Component;
    }
    return res;
  }
}
function resolve(registry, name) {
  return registry && (registry[name] || registry[camelize(name)] || registry[capitalize(camelize(name))]);
}

function renderList(source, renderItem, cache, index) {
  let ret;
  const cached = cache && cache[index];
  const sourceIsArray = isArray(source);
  if (sourceIsArray || isString(source)) {
    const sourceIsReactiveArray = sourceIsArray && isReactive(source);
    let needsWrap = false;
    let isReadonlySource = false;
    if (sourceIsReactiveArray) {
      needsWrap = !isShallow(source);
      isReadonlySource = isReadonly(source);
      source = shallowReadArray(source);
    }
    ret = new Array(source.length);
    for (let i = 0, l = source.length; i < l; i++) {
      ret[i] = renderItem(
        needsWrap ? isReadonlySource ? toReadonly(toReactive(source[i])) : toReactive(source[i]) : source[i],
        i,
        void 0,
        cached && cached[i]
      );
    }
  } else if (typeof source === "number") {
    ret = new Array(source);
    for (let i = 0; i < source; i++) {
      ret[i] = renderItem(i + 1, i, void 0, cached && cached[i]);
    }
  } else if (isObject(source)) {
    if (source[Symbol.iterator]) {
      ret = Array.from(
        source,
        (item, i) => renderItem(item, i, void 0, cached && cached[i])
      );
    } else {
      const keys = Object.keys(source);
      ret = new Array(keys.length);
      for (let i = 0, l = keys.length; i < l; i++) {
        const key = keys[i];
        ret[i] = renderItem(source[key], key, i, cached && cached[i]);
      }
    }
  } else {
    ret = [];
  }
  if (cache) {
    cache[index] = ret;
  }
  return ret;
}

function createSlots(slots, dynamicSlots) {
  for (let i = 0; i < dynamicSlots.length; i++) {
    const slot = dynamicSlots[i];
    if (isArray(slot)) {
      for (let j = 0; j < slot.length; j++) {
        slots[slot[j].name] = slot[j].fn;
      }
    } else if (slot) {
      slots[slot.name] = slot.key ? (...args) => {
        const res = slot.fn(...args);
        if (res) res.key = slot.key;
        return res;
      } : slot.fn;
    }
  }
  return slots;
}

function renderSlot(slots, name, props = {}, fallback, noSlotted) {
  let slot = slots[name];
  if (slot && slot.__vapor) {
    const ret = (openBlock(), createBlock(VaporSlot, props));
    ret.vs = { slot, fallback };
    return ret;
  }
  if (currentRenderingInstance && (currentRenderingInstance.ce || currentRenderingInstance.parent && isAsyncWrapper(currentRenderingInstance.parent) && currentRenderingInstance.parent.ce)) {
    if (name !== "default") props.name = name;
    return openBlock(), createBlock(
      Fragment,
      null,
      [createVNode("slot", props, fallback && fallback())],
      64
    );
  }
  if (slot && slot._c) {
    slot._d = false;
  }
  openBlock();
  const validSlotContent = slot && ensureValidVNode(slot(props));
  ensureVaporSlotFallback(validSlotContent, fallback);
  const slotKey = props.key || // slot content array of a dynamic conditional slot may have a branch
  // key attached in the `createSlots` helper, respect that
  validSlotContent && validSlotContent.key;
  const rendered = createBlock(
    Fragment,
    {
      key: (slotKey && !isSymbol(slotKey) ? slotKey : `_${name}`) + // #7256 force differentiate fallback content from actual content
      (!validSlotContent && fallback ? "_fb" : "")
    },
    validSlotContent || (fallback ? fallback() : []),
    validSlotContent && slots._ === 1 ? 64 : -2
  );
  if (!noSlotted && rendered.scopeId) {
    rendered.slotScopeIds = [rendered.scopeId + "-s"];
  }
  if (slot && slot._c) {
    slot._d = true;
  }
  return rendered;
}
function ensureValidVNode(vnodes) {
  return vnodes.some((child) => {
    if (!isVNode(child)) return true;
    if (child.type === Comment$1) return false;
    if (child.type === Fragment && !ensureValidVNode(child.children))
      return false;
    return true;
  }) ? vnodes : null;
}
function ensureVaporSlotFallback(vnodes, fallback) {
  let vaporSlot;
  if (vnodes && vnodes.length === 1 && isVNode(vnodes[0]) && (vaporSlot = vnodes[0].vs)) {
    if (!vaporSlot.fallback && fallback) {
      vaporSlot.fallback = fallback;
    }
  }
}

function toHandlers(obj, preserveCaseIfNecessary) {
  const ret = {};
  for (const key in obj) {
    ret[preserveCaseIfNecessary && /[A-Z]/.test(key) ? `on:${key}` : toHandlerKey(key)] = obj[key];
  }
  return ret;
}

const getPublicInstance = (i) => {
  if (!i || i.vapor) return null;
  if (isStatefulComponent(i))
    return getComponentPublicInstance(i);
  return getPublicInstance(i.parent);
};
const publicPropertiesMap = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ extend(/* @__PURE__ */ Object.create(null), {
    $: (i) => i,
    $el: (i) => i.vnode.el,
    $data: (i) => i.data,
    $props: (i) => i.props,
    $attrs: (i) => i.attrs,
    $slots: (i) => i.slots,
    $refs: (i) => i.refs,
    $parent: (i) => getPublicInstance(i.parent),
    $root: (i) => getPublicInstance(i.root),
    $host: (i) => i.ce,
    $emit: (i) => i.emit,
    $options: (i) => resolveMergedOptions(i) ,
    $forceUpdate: (i) => i.f || (i.f = () => {
      queueJob(i.update);
    }),
    $nextTick: (i) => i.n || (i.n = nextTick.bind(i.proxy)),
    $watch: (i) => instanceWatch.bind(i) 
  })
);
const hasSetupBinding = (state, key) => state !== EMPTY_OBJ && !state.__isScriptSetup && hasOwn(state, key);
const PublicInstanceProxyHandlers = {
  get({ _: instance }, key) {
    if (key === "__v_skip") {
      return true;
    }
    const { ctx, setupState, data, props, accessCache, type, appContext } = instance;
    let normalizedProps;
    if (key[0] !== "$") {
      const n = accessCache[key];
      if (n !== void 0) {
        switch (n) {
          case 1 /* SETUP */:
            return setupState[key];
          case 2 /* DATA */:
            return data[key];
          case 4 /* CONTEXT */:
            return ctx[key];
          case 3 /* PROPS */:
            return props[key];
        }
      } else if (hasSetupBinding(setupState, key)) {
        accessCache[key] = 1 /* SETUP */;
        return setupState[key];
      } else if (data !== EMPTY_OBJ && hasOwn(data, key)) {
        accessCache[key] = 2 /* DATA */;
        return data[key];
      } else if (
        // only cache other properties when instance has declared (thus stable)
        // props
        (normalizedProps = instance.propsOptions[0]) && hasOwn(normalizedProps, key)
      ) {
        accessCache[key] = 3 /* PROPS */;
        return props[key];
      } else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
        accessCache[key] = 4 /* CONTEXT */;
        return ctx[key];
      } else if (shouldCacheAccess) {
        accessCache[key] = 0 /* OTHER */;
      }
    }
    const publicGetter = publicPropertiesMap[key];
    let cssModule, globalProperties;
    if (publicGetter) {
      if (key === "$attrs") {
        track(instance.attrs, "get", "");
      }
      return publicGetter(instance);
    } else if (
      // css module (injected by vue-loader)
      (cssModule = type.__cssModules) && (cssModule = cssModule[key])
    ) {
      return cssModule;
    } else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
      accessCache[key] = 4 /* CONTEXT */;
      return ctx[key];
    } else if (
      // global properties
      globalProperties = appContext.config.globalProperties, hasOwn(globalProperties, key)
    ) {
      {
        return globalProperties[key];
      }
    } else ;
  },
  set({ _: instance }, key, value) {
    const { data, setupState, ctx } = instance;
    if (hasSetupBinding(setupState, key)) {
      setupState[key] = value;
      return true;
    } else if (data !== EMPTY_OBJ && hasOwn(data, key)) {
      data[key] = value;
      return true;
    } else if (hasOwn(instance.props, key)) {
      return false;
    }
    if (key[0] === "$" && key.slice(1) in instance) {
      return false;
    } else {
      {
        ctx[key] = value;
      }
    }
    return true;
  },
  has({
    _: { data, setupState, accessCache, ctx, appContext, propsOptions, type }
  }, key) {
    let normalizedProps, cssModules;
    return !!(accessCache[key] || data !== EMPTY_OBJ && key[0] !== "$" && hasOwn(data, key) || hasSetupBinding(setupState, key) || (normalizedProps = propsOptions[0]) && hasOwn(normalizedProps, key) || hasOwn(ctx, key) || hasOwn(publicPropertiesMap, key) || hasOwn(appContext.config.globalProperties, key) || (cssModules = type.__cssModules) && cssModules[key]);
  },
  defineProperty(target, key, descriptor) {
    if (descriptor.get != null) {
      target._.accessCache[key] = 0;
    } else if (hasOwn(descriptor, "value")) {
      this.set(target, key, descriptor.value, null);
    }
    return Reflect.defineProperty(target, key, descriptor);
  }
};
const RuntimeCompiledPublicInstanceProxyHandlers = /* @__PURE__ */ extend({}, PublicInstanceProxyHandlers, {
  get(target, key) {
    if (key === Symbol.unscopables) {
      return;
    }
    return PublicInstanceProxyHandlers.get(target, key, target);
  },
  has(_, key) {
    const has = key[0] !== "_" && !isGloballyAllowed(key);
    return has;
  }
});

function defineProps() {
  return null;
}
function defineEmits() {
  return null;
}
function defineExpose(exposed) {
}
function defineOptions(options) {
}
function defineSlots() {
  return null;
}
function defineModel() {
}
function withDefaults(props, defaults) {
  return null;
}
function useSlots() {
  return getContext().slots;
}
function useAttrs() {
  return getContext().attrs;
}
function getContext(calledFunctionName) {
  const i = getCurrentGenericInstance();
  if (i.vapor) {
    return i;
  } else {
    const ii = i;
    return ii.setupContext || (ii.setupContext = createSetupContext(ii));
  }
}
function normalizePropsOrEmits(props) {
  return isArray(props) ? props.reduce(
    (normalized, p) => (normalized[p] = null, normalized),
    {}
  ) : props;
}
function mergeDefaults(raw, defaults) {
  const props = normalizePropsOrEmits(raw);
  for (const key in defaults) {
    if (key.startsWith("__skip")) continue;
    let opt = props[key];
    if (opt) {
      if (isArray(opt) || isFunction(opt)) {
        opt = props[key] = { type: opt, default: defaults[key] };
      } else {
        opt.default = defaults[key];
      }
    } else if (opt === null) {
      opt = props[key] = { default: defaults[key] };
    } else ;
    if (opt && defaults[`__skip_${key}`]) {
      opt.skipFactory = true;
    }
  }
  return props;
}
function mergeModels(a, b) {
  if (!a || !b) return a || b;
  if (isArray(a) && isArray(b)) return a.concat(b);
  return extend({}, normalizePropsOrEmits(a), normalizePropsOrEmits(b));
}
function createPropsRestProxy(props, excludedKeys) {
  const ret = {};
  for (const key in props) {
    if (!excludedKeys.includes(key)) {
      Object.defineProperty(ret, key, {
        enumerable: true,
        get: () => props[key]
      });
    }
  }
  return ret;
}
function withAsyncContext(getAwaitable) {
  const ctx = getCurrentGenericInstance();
  let awaitable = getAwaitable();
  setCurrentInstance(null, void 0);
  if (isPromise(awaitable)) {
    awaitable = awaitable.catch((e) => {
      setCurrentInstance(ctx);
      throw e;
    });
  }
  return [awaitable, () => setCurrentInstance(ctx)];
}

let shouldCacheAccess = true;
function applyOptions(instance) {
  const options = resolveMergedOptions(instance);
  const publicThis = instance.proxy;
  const ctx = instance.ctx;
  shouldCacheAccess = false;
  if (options.beforeCreate) {
    callHook$1(options.beforeCreate, instance, "bc");
  }
  const {
    // state
    data: dataOptions,
    computed: computedOptions,
    methods,
    watch: watchOptions,
    provide: provideOptions,
    inject: injectOptions,
    // lifecycle
    created,
    beforeMount,
    mounted,
    beforeUpdate,
    updated,
    activated,
    deactivated,
    beforeDestroy,
    beforeUnmount,
    destroyed,
    unmounted,
    render,
    renderTracked,
    renderTriggered,
    errorCaptured,
    serverPrefetch,
    // public API
    expose,
    inheritAttrs,
    // assets
    components,
    directives,
    filters
  } = options;
  const checkDuplicateProperties = null;
  if (injectOptions) {
    resolveInjections(injectOptions, ctx, checkDuplicateProperties);
  }
  if (methods) {
    for (const key in methods) {
      const methodHandler = methods[key];
      if (isFunction(methodHandler)) {
        {
          ctx[key] = methodHandler.bind(publicThis);
        }
      }
    }
  }
  if (dataOptions) {
    const data = dataOptions.call(publicThis, publicThis);
    if (!isObject(data)) ; else {
      instance.data = reactive(data);
    }
  }
  shouldCacheAccess = true;
  if (computedOptions) {
    for (const key in computedOptions) {
      const opt = computedOptions[key];
      const get = isFunction(opt) ? opt.bind(publicThis, publicThis) : isFunction(opt.get) ? opt.get.bind(publicThis, publicThis) : NOOP;
      const set = !isFunction(opt) && isFunction(opt.set) ? opt.set.bind(publicThis) : NOOP;
      const c = computed({
        get,
        set
      });
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => c.value,
        set: (v) => c.value = v
      });
    }
  }
  if (watchOptions) {
    for (const key in watchOptions) {
      createWatcher(watchOptions[key], ctx, publicThis, key);
    }
  }
  if (provideOptions) {
    const provides = isFunction(provideOptions) ? provideOptions.call(publicThis) : provideOptions;
    Reflect.ownKeys(provides).forEach((key) => {
      provide(key, provides[key]);
    });
  }
  if (created) {
    callHook$1(created, instance, "c");
  }
  function registerLifecycleHook(register, hook) {
    if (isArray(hook)) {
      hook.forEach((_hook) => register(_hook.bind(publicThis)));
    } else if (hook) {
      register(hook.bind(publicThis));
    }
  }
  registerLifecycleHook(onBeforeMount, beforeMount);
  registerLifecycleHook(onMounted, mounted);
  registerLifecycleHook(onBeforeUpdate, beforeUpdate);
  registerLifecycleHook(onUpdated, updated);
  registerLifecycleHook(onActivated, activated);
  registerLifecycleHook(onDeactivated, deactivated);
  registerLifecycleHook(onErrorCaptured, errorCaptured);
  registerLifecycleHook(onRenderTracked, renderTracked);
  registerLifecycleHook(onRenderTriggered, renderTriggered);
  registerLifecycleHook(onBeforeUnmount, beforeUnmount);
  registerLifecycleHook(onUnmounted, unmounted);
  registerLifecycleHook(onServerPrefetch, serverPrefetch);
  if (isArray(expose)) {
    if (expose.length) {
      const exposed = instance.exposed || (instance.exposed = {});
      expose.forEach((key) => {
        Object.defineProperty(exposed, key, {
          get: () => publicThis[key],
          set: (val) => publicThis[key] = val,
          enumerable: true
        });
      });
    } else if (!instance.exposed) {
      instance.exposed = {};
    }
  }
  if (render && instance.render === NOOP) {
    instance.render = render;
  }
  if (inheritAttrs != null) {
    instance.inheritAttrs = inheritAttrs;
  }
  if (components) instance.components = components;
  if (directives) instance.directives = directives;
  if (serverPrefetch) {
    markAsyncBoundary(instance);
  }
}
function resolveInjections(injectOptions, ctx, checkDuplicateProperties = NOOP) {
  if (isArray(injectOptions)) {
    injectOptions = normalizeInject(injectOptions);
  }
  for (const key in injectOptions) {
    const opt = injectOptions[key];
    let injected;
    if (isObject(opt)) {
      if ("default" in opt) {
        injected = inject(
          opt.from || key,
          opt.default,
          true
        );
      } else {
        injected = inject(opt.from || key);
      }
    } else {
      injected = inject(opt);
    }
    if (isRef(injected)) {
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => injected.value,
        set: (v) => injected.value = v
      });
    } else {
      ctx[key] = injected;
    }
  }
}
function callHook$1(hook, instance, type) {
  callWithAsyncErrorHandling(
    isArray(hook) ? hook.map((h) => h.bind(instance.proxy)) : hook.bind(instance.proxy),
    instance,
    type
  );
}
function createWatcher(raw, ctx, publicThis, key) {
  let getter = key.includes(".") ? createPathGetter(publicThis, key) : () => publicThis[key];
  if (isString(raw)) {
    const handler = ctx[raw];
    if (isFunction(handler)) {
      {
        watch(getter, handler);
      }
    }
  } else if (isFunction(raw)) {
    {
      watch(getter, raw.bind(publicThis));
    }
  } else if (isObject(raw)) {
    if (isArray(raw)) {
      raw.forEach((r) => createWatcher(r, ctx, publicThis, key));
    } else {
      const handler = isFunction(raw.handler) ? raw.handler.bind(publicThis) : ctx[raw.handler];
      if (isFunction(handler)) {
        watch(getter, handler, raw);
      }
    }
  } else ;
}
function resolveMergedOptions(instance) {
  const base = instance.type;
  const { mixins, extends: extendsOptions } = base;
  const {
    mixins: globalMixins,
    optionsCache: cache,
    config: { optionMergeStrategies }
  } = instance.appContext;
  const cached = cache.get(base);
  let resolved;
  if (cached) {
    resolved = cached;
  } else if (!globalMixins.length && !mixins && !extendsOptions) {
    {
      resolved = base;
    }
  } else {
    resolved = {};
    if (globalMixins.length) {
      globalMixins.forEach(
        (m) => mergeOptions(resolved, m, optionMergeStrategies, true)
      );
    }
    mergeOptions(resolved, base, optionMergeStrategies);
  }
  if (isObject(base)) {
    cache.set(base, resolved);
  }
  return resolved;
}
function mergeOptions(to, from, strats, asMixin = false) {
  const { mixins, extends: extendsOptions } = from;
  if (extendsOptions) {
    mergeOptions(to, extendsOptions, strats, true);
  }
  if (mixins) {
    mixins.forEach(
      (m) => mergeOptions(to, m, strats, true)
    );
  }
  for (const key in from) {
    if (asMixin && key === "expose") ; else {
      const strat = internalOptionMergeStrats[key] || strats && strats[key];
      to[key] = strat ? strat(to[key], from[key]) : from[key];
    }
  }
  return to;
}
const internalOptionMergeStrats = {
  data: mergeDataFn,
  props: mergeEmitsOrPropsOptions,
  emits: mergeEmitsOrPropsOptions,
  // objects
  methods: mergeObjectOptions,
  computed: mergeObjectOptions,
  // lifecycle
  beforeCreate: mergeAsArray,
  created: mergeAsArray,
  beforeMount: mergeAsArray,
  mounted: mergeAsArray,
  beforeUpdate: mergeAsArray,
  updated: mergeAsArray,
  beforeDestroy: mergeAsArray,
  beforeUnmount: mergeAsArray,
  destroyed: mergeAsArray,
  unmounted: mergeAsArray,
  activated: mergeAsArray,
  deactivated: mergeAsArray,
  errorCaptured: mergeAsArray,
  serverPrefetch: mergeAsArray,
  // assets
  components: mergeObjectOptions,
  directives: mergeObjectOptions,
  // watch
  watch: mergeWatchOptions,
  // provide / inject
  provide: mergeDataFn,
  inject: mergeInject
};
function mergeDataFn(to, from) {
  if (!from) {
    return to;
  }
  if (!to) {
    return from;
  }
  return function mergedDataFn() {
    return (extend)(
      isFunction(to) ? to.call(this, this) : to,
      isFunction(from) ? from.call(this, this) : from
    );
  };
}
function mergeInject(to, from) {
  return mergeObjectOptions(normalizeInject(to), normalizeInject(from));
}
function normalizeInject(raw) {
  if (isArray(raw)) {
    const res = {};
    for (let i = 0; i < raw.length; i++) {
      res[raw[i]] = raw[i];
    }
    return res;
  }
  return raw;
}
function mergeAsArray(to, from) {
  return to ? [...new Set([].concat(to, from))] : from;
}
function mergeObjectOptions(to, from) {
  return to ? extend(/* @__PURE__ */ Object.create(null), to, from) : from;
}
function mergeEmitsOrPropsOptions(to, from) {
  if (to) {
    if (isArray(to) && isArray(from)) {
      return [.../* @__PURE__ */ new Set([...to, ...from])];
    }
    return extend(
      /* @__PURE__ */ Object.create(null),
      normalizePropsOrEmits(to),
      normalizePropsOrEmits(from != null ? from : {})
    );
  } else {
    return from;
  }
}
function mergeWatchOptions(to, from) {
  if (!to) return from;
  if (!from) return to;
  const merged = extend(/* @__PURE__ */ Object.create(null), to);
  for (const key in from) {
    merged[key] = mergeAsArray(to[key], from[key]);
  }
  return merged;
}

function createAppContext() {
  return {
    app: null,
    config: {
      isNativeTag: NO,
      performance: false,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: /* @__PURE__ */ Object.create(null),
    optionsCache: /* @__PURE__ */ new WeakMap(),
    propsCache: /* @__PURE__ */ new WeakMap(),
    emitsCache: /* @__PURE__ */ new WeakMap()
  };
}
let uid$1 = 0;
function createAppAPI(mount, unmount, getPublicInstance, render) {
  return function createApp(rootComponent, rootProps = null) {
    if (!isFunction(rootComponent)) {
      rootComponent = extend({}, rootComponent);
    }
    if (rootProps != null && !isObject(rootProps)) {
      rootProps = null;
    }
    const context = createAppContext();
    const installedPlugins = /* @__PURE__ */ new WeakSet();
    const pluginCleanupFns = [];
    let isMounted = false;
    const app = context.app = {
      _uid: uid$1++,
      _component: rootComponent,
      _props: rootProps,
      _container: null,
      _context: context,
      _instance: null,
      version,
      get config() {
        return context.config;
      },
      set config(v) {
      },
      use(plugin, ...options) {
        if (installedPlugins.has(plugin)) ; else if (plugin && isFunction(plugin.install)) {
          installedPlugins.add(plugin);
          plugin.install(app, ...options);
        } else if (isFunction(plugin)) {
          installedPlugins.add(plugin);
          plugin(app, ...options);
        } else ;
        return app;
      },
      mixin(mixin) {
        {
          if (!context.mixins.includes(mixin)) {
            context.mixins.push(mixin);
          }
        }
        return app;
      },
      component(name, component) {
        if (!component) {
          return context.components[name];
        }
        context.components[name] = component;
        return app;
      },
      directive(name, directive) {
        if (!directive) {
          return context.directives[name];
        }
        context.directives[name] = directive;
        return app;
      },
      mount(rootContainer, isHydrate, namespace) {
        if (!isMounted) {
          const instance = mount(app, rootContainer, isHydrate, namespace);
          isMounted = true;
          app._container = rootContainer;
          rootContainer.__vue_app__ = app;
          return getPublicInstance(instance);
        }
      },
      onUnmount(cleanupFn) {
        pluginCleanupFns.push(cleanupFn);
      },
      unmount() {
        if (isMounted) {
          callWithAsyncErrorHandling(
            pluginCleanupFns,
            app._instance,
            16
          );
          unmount(app);
          delete app._container.__vue_app__;
        }
      },
      provide(key, value) {
        context.provides[key] = value;
        return app;
      },
      runWithContext(fn) {
        const lastApp = currentApp;
        currentApp = app;
        try {
          return fn();
        } finally {
          currentApp = lastApp;
        }
      }
    };
    return app;
  };
}
let currentApp = null;

function provide(key, value) {
  const currentInstance = getCurrentGenericInstance();
  if (!currentInstance) ; else {
    let provides = currentInstance.provides;
    const parentProvides = currentInstance.parent && currentInstance.parent.provides;
    if (parentProvides === provides) {
      provides = currentInstance.provides = Object.create(parentProvides);
    }
    provides[key] = value;
  }
}
function inject(key, defaultValue, treatDefaultAsFactory = false) {
  const instance = getCurrentGenericInstance();
  if (instance || currentApp) {
    let provides = currentApp ? currentApp._context.provides : instance ? instance.parent == null || instance.ce ? instance.appContext && instance.appContext.provides : instance.parent.provides : void 0;
    if (provides && key in provides) {
      return provides[key];
    } else if (arguments.length > 1) {
      return treatDefaultAsFactory && isFunction(defaultValue) ? defaultValue.call(instance && instance.proxy) : defaultValue;
    } else ;
  }
}
function hasInjectionContext() {
  return !!(getCurrentGenericInstance() || currentApp);
}

const internalObjectProto = {};
const createInternalObject = () => Object.create(internalObjectProto);
const isInternalObject = (obj) => Object.getPrototypeOf(obj) === internalObjectProto;

function initProps(instance, rawProps, isStateful, isSSR = false) {
  const props = instance.props = {};
  const attrs = createInternalObject();
  instance.propsDefaults = /* @__PURE__ */ Object.create(null);
  setFullProps(instance, rawProps, props, attrs);
  for (const key in instance.propsOptions[0]) {
    if (!(key in props)) {
      props[key] = void 0;
    }
  }
  if (isStateful) {
    instance.props = isSSR ? props : shallowReactive(props);
  } else {
    if (!instance.type.props) {
      instance.props = attrs;
    } else {
      instance.props = props;
    }
  }
  instance.attrs = attrs;
}
function updateProps(instance, rawProps, rawPrevProps, optimized) {
  const {
    props,
    attrs,
    vnode: { patchFlag }
  } = instance;
  const rawCurrentProps = toRaw(props);
  const [options] = instance.propsOptions;
  let hasAttrsChanged = false;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    (optimized || patchFlag > 0) && !(patchFlag & 16)
  ) {
    if (patchFlag & 8) {
      const propsToUpdate = instance.vnode.dynamicProps;
      for (let i = 0; i < propsToUpdate.length; i++) {
        let key = propsToUpdate[i];
        if (isEmitListener(instance.emitsOptions, key)) {
          continue;
        }
        const value = rawProps[key];
        if (options) {
          if (hasOwn(attrs, key)) {
            if (value !== attrs[key]) {
              attrs[key] = value;
              hasAttrsChanged = true;
            }
          } else {
            const camelizedKey = camelize(key);
            props[camelizedKey] = resolvePropValue(
              options,
              camelizedKey,
              value,
              instance,
              baseResolveDefault
            );
          }
        } else {
          if (value !== attrs[key]) {
            attrs[key] = value;
            hasAttrsChanged = true;
          }
        }
      }
    }
  } else {
    if (setFullProps(instance, rawProps, props, attrs)) {
      hasAttrsChanged = true;
    }
    let kebabKey;
    for (const key in rawCurrentProps) {
      if (!rawProps || // for camelCase
      !hasOwn(rawProps, key) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((kebabKey = hyphenate(key)) === key || !hasOwn(rawProps, kebabKey))) {
        if (options) {
          if (rawPrevProps && // for camelCase
          (rawPrevProps[key] !== void 0 || // for kebab-case
          rawPrevProps[kebabKey] !== void 0)) {
            props[key] = resolvePropValue(
              options,
              key,
              void 0,
              instance,
              baseResolveDefault,
              true
            );
          }
        } else {
          delete props[key];
        }
      }
    }
    if (attrs !== rawCurrentProps) {
      for (const key in attrs) {
        if (!rawProps || !hasOwn(rawProps, key) && true) {
          delete attrs[key];
          hasAttrsChanged = true;
        }
      }
    }
  }
  if (hasAttrsChanged) {
    trigger(instance.attrs, "set", "");
  }
}
function setFullProps(instance, rawProps, props, attrs) {
  const [options, needCastKeys] = instance.propsOptions;
  let hasAttrsChanged = false;
  let rawCastValues;
  if (rawProps) {
    for (let key in rawProps) {
      if (isReservedProp(key)) {
        continue;
      }
      const value = rawProps[key];
      let camelKey;
      if (options && hasOwn(options, camelKey = camelize(key))) {
        if (!needCastKeys || !needCastKeys.includes(camelKey)) {
          props[camelKey] = value;
        } else {
          (rawCastValues || (rawCastValues = {}))[camelKey] = value;
        }
      } else if (!isEmitListener(instance.emitsOptions, key)) {
        if (!(key in attrs) || value !== attrs[key]) {
          attrs[key] = value;
          hasAttrsChanged = true;
        }
      }
    }
  }
  if (needCastKeys) {
    const castValues = rawCastValues || EMPTY_OBJ;
    for (let i = 0; i < needCastKeys.length; i++) {
      const key = needCastKeys[i];
      props[key] = resolvePropValue(
        options,
        key,
        castValues[key],
        instance,
        baseResolveDefault,
        !hasOwn(castValues, key)
      );
    }
  }
  return hasAttrsChanged;
}
function resolvePropValue(options, key, value, instance, resolveDefault, isAbsent = false) {
  const opt = options[key];
  if (opt != null) {
    const hasDefault = hasOwn(opt, "default");
    if (hasDefault && value === void 0) {
      const defaultValue = opt.default;
      if (opt.type !== Function && !opt.skipFactory && isFunction(defaultValue)) {
        const cachedDefaults = instance.propsDefaults || (instance.propsDefaults = {});
        if (hasOwn(cachedDefaults, key)) {
          value = cachedDefaults[key];
        } else {
          value = cachedDefaults[key] = resolveDefault(
            defaultValue,
            instance,
            key
          );
        }
      } else {
        value = defaultValue;
      }
      if (instance.ce) {
        instance.ce._setProp(key, value);
      }
    }
    if (opt[0 /* shouldCast */]) {
      if (isAbsent && !hasDefault) {
        value = false;
      } else if (opt[1 /* shouldCastTrue */] && (value === "" || value === hyphenate(key))) {
        value = true;
      }
    }
  }
  return value;
}
function baseResolveDefault(factory, instance, key) {
  let value;
  const prev = setCurrentInstance(instance);
  const props = toRaw(instance.props);
  value = factory.call(
    null,
    props
  );
  setCurrentInstance(...prev);
  return value;
}
const mixinPropsCache = /* @__PURE__ */ new WeakMap();
function normalizePropsOptions$1(comp, appContext, asMixin = false) {
  const cache = asMixin ? mixinPropsCache : appContext.propsCache;
  const cached = cache.get(comp);
  if (cached) {
    return cached;
  }
  const raw = comp.props;
  const normalized = {};
  const needCastKeys = [];
  let hasExtends = false;
  if (!isFunction(comp)) {
    const extendProps = (raw2) => {
      hasExtends = true;
      const [props, keys] = normalizePropsOptions$1(raw2, appContext, true);
      extend(normalized, props);
      if (keys) needCastKeys.push(...keys);
    };
    if (!asMixin && appContext.mixins.length) {
      appContext.mixins.forEach(extendProps);
    }
    if (comp.extends) {
      extendProps(comp.extends);
    }
    if (comp.mixins) {
      comp.mixins.forEach(extendProps);
    }
  }
  if (!raw && !hasExtends) {
    if (isObject(comp)) {
      cache.set(comp, EMPTY_ARR);
    }
    return EMPTY_ARR;
  }
  baseNormalizePropsOptions(raw, normalized, needCastKeys);
  const res = [normalized, needCastKeys];
  if (isObject(comp)) {
    cache.set(comp, res);
  }
  return res;
}
function baseNormalizePropsOptions(raw, normalized, needCastKeys) {
  if (isArray(raw)) {
    for (let i = 0; i < raw.length; i++) {
      const normalizedKey = camelize(raw[i]);
      if (validatePropName(normalizedKey)) {
        normalized[normalizedKey] = EMPTY_OBJ;
      }
    }
  } else if (raw) {
    for (const key in raw) {
      const normalizedKey = camelize(key);
      if (validatePropName(normalizedKey)) {
        const opt = raw[key];
        const prop = normalized[normalizedKey] = isArray(opt) || isFunction(opt) ? { type: opt } : extend({}, opt);
        const propType = prop.type;
        let shouldCast = false;
        let shouldCastTrue = true;
        if (isArray(propType)) {
          for (let index = 0; index < propType.length; ++index) {
            const type = propType[index];
            const typeName = isFunction(type) && type.name;
            if (typeName === "Boolean") {
              shouldCast = true;
              break;
            } else if (typeName === "String") {
              shouldCastTrue = false;
            }
          }
        } else {
          shouldCast = isFunction(propType) && propType.name === "Boolean";
        }
        prop[0 /* shouldCast */] = shouldCast;
        prop[1 /* shouldCastTrue */] = shouldCastTrue;
        if (shouldCast || hasOwn(prop, "default")) {
          needCastKeys.push(normalizedKey);
        }
      }
    }
  }
}
function validatePropName(key) {
  if (key[0] !== "$" && !isReservedProp(key)) {
    return true;
  }
  return false;
}
function getType(ctor) {
  if (ctor === null) {
    return "null";
  }
  if (typeof ctor === "function") {
    return ctor.name || "";
  } else if (typeof ctor === "object") {
    const name = ctor.constructor && ctor.constructor.name;
    return name || "";
  }
  return "";
}
function validateProps(rawProps, resolvedProps, options) {
  resolvedProps = toRaw(resolvedProps);
  const camelizePropsKey = Object.keys(rawProps).map((key) => camelize(key));
  for (const key in options) {
    const opt = options[key];
    if (opt != null) {
      validateProp(
        key,
        resolvedProps[key],
        opt,
        resolvedProps,
        !camelizePropsKey.includes(key)
      );
    }
  }
}
function validateProp(key, value, propOptions, resolvedProps, isAbsent) {
  const { type, required, validator, skipCheck } = propOptions;
  if (required && isAbsent) {
    warn$2('Missing required prop: "' + key + '"');
    return;
  }
  if (value == null && !required) {
    return;
  }
  if (type != null && type !== true && !skipCheck) {
    let isValid = false;
    const types = isArray(type) ? type : [type];
    const expectedTypes = [];
    for (let i = 0; i < types.length && !isValid; i++) {
      const { valid, expectedType } = assertType(value, types[i]);
      expectedTypes.push(expectedType || "");
      isValid = valid;
    }
    if (!isValid) {
      warn$2(getInvalidTypeMessage(key, value, expectedTypes));
      return;
    }
  }
  if (validator && !validator(value, resolvedProps)) {
    warn$2('Invalid prop: custom validator check failed for prop "' + key + '".');
  }
}
const isSimpleType = /* @__PURE__ */ makeMap(
  "String,Number,Boolean,Function,Symbol,BigInt"
);
function assertType(value, type) {
  let valid;
  const expectedType = getType(type);
  if (expectedType === "null") {
    valid = value === null;
  } else if (isSimpleType(expectedType)) {
    const t = typeof value;
    valid = t === expectedType.toLowerCase();
    if (!valid && t === "object") {
      valid = value instanceof type;
    }
  } else if (expectedType === "Object") {
    valid = isObject(value);
  } else if (expectedType === "Array") {
    valid = isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid,
    expectedType
  };
}
function getInvalidTypeMessage(name, value, expectedTypes) {
  if (expectedTypes.length === 0) {
    return `Prop type [] for prop "${name}" won't match anything. Did you mean to use type Array instead?`;
  }
  let message = `Invalid prop: type check failed for prop "${name}". Expected ${expectedTypes.map(capitalize).join(" | ")}`;
  const expectedType = expectedTypes[0];
  const receivedType = toRawType(value);
  const expectedValue = styleValue(value, expectedType);
  const receivedValue = styleValue(value, receivedType);
  if (expectedTypes.length === 1 && isExplicable(expectedType) && !isBoolean(expectedType, receivedType)) {
    message += ` with value ${expectedValue}`;
  }
  message += `, got ${receivedType} `;
  if (isExplicable(receivedType)) {
    message += `with value ${receivedValue}.`;
  }
  return message;
}
function styleValue(value, type) {
  if (type === "String") {
    return `"${value}"`;
  } else if (type === "Number") {
    return `${Number(value)}`;
  } else {
    return `${value}`;
  }
}
function isExplicable(type) {
  const explicitTypes = ["string", "number", "boolean"];
  return explicitTypes.some((elem) => type.toLowerCase() === elem);
}
function isBoolean(...args) {
  return args.some((elem) => elem.toLowerCase() === "boolean");
}

const isInternalKey = (key) => key === "_" || key === "_ctx" || key === "$stable";
const normalizeSlotValue = (value) => isArray(value) ? value.map(normalizeVNode) : [normalizeVNode(value)];
const normalizeSlot = (key, rawSlot, ctx) => {
  if (rawSlot._n) {
    return rawSlot;
  }
  const normalized = withCtx((...args) => {
    if (false) ;
    return normalizeSlotValue(rawSlot(...args));
  }, ctx);
  normalized._c = false;
  return normalized;
};
const normalizeObjectSlots = (rawSlots, slots, instance) => {
  const ctx = rawSlots._ctx;
  for (const key in rawSlots) {
    if (isInternalKey(key)) continue;
    const value = rawSlots[key];
    if (isFunction(value)) {
      slots[key] = normalizeSlot(key, value, ctx);
    } else if (value != null) {
      const normalized = normalizeSlotValue(value);
      slots[key] = () => normalized;
    }
  }
};
const normalizeVNodeSlots = (instance, children) => {
  const normalized = normalizeSlotValue(children);
  instance.slots.default = () => normalized;
};
const assignSlots = (slots, children, optimized) => {
  for (const key in children) {
    if (optimized || !isInternalKey(key)) {
      slots[key] = children[key];
    }
  }
};
const initSlots = (instance, children, optimized) => {
  const slots = instance.slots = createInternalObject();
  if (instance.vnode.shapeFlag & 32) {
    const type = children._;
    if (type) {
      assignSlots(slots, children, optimized);
      if (optimized) {
        def(slots, "_", type, true);
      }
    } else {
      normalizeObjectSlots(children, slots);
    }
  } else if (children) {
    normalizeVNodeSlots(instance, children);
  }
};
const updateSlots = (instance, children, optimized) => {
  const { vnode, slots } = instance;
  let needDeletionCheck = true;
  let deletionComparisonTarget = EMPTY_OBJ;
  if (vnode.shapeFlag & 32) {
    const type = children._;
    if (type) {
      if (optimized && type === 1) {
        needDeletionCheck = false;
      } else {
        assignSlots(slots, children, optimized);
      }
    } else {
      needDeletionCheck = !children.$stable;
      normalizeObjectSlots(children, slots);
    }
    deletionComparisonTarget = children;
  } else if (children) {
    normalizeVNodeSlots(instance, children);
    deletionComparisonTarget = { default: 1 };
  }
  if (needDeletionCheck) {
    for (const key in slots) {
      if (!isInternalKey(key) && deletionComparisonTarget[key] == null) {
        delete slots[key];
      }
    }
  }
};

let supported;
let perf;
function startMeasure(instance, type) {
  if (instance.appContext.config.performance && isSupported()) {
    perf.mark(`vue-${type}-${instance.uid}`);
  }
}
function endMeasure(instance, type) {
  if (instance.appContext.config.performance && isSupported()) {
    const startTag = `vue-${type}-${instance.uid}`;
    const endTag = startTag + `:end`;
    const measureName = `<${formatComponentName(instance, instance.type)}> ${type}`;
    perf.mark(endTag);
    perf.measure(measureName, startTag, endTag);
    perf.clearMeasures(measureName);
    perf.clearMarks(startTag);
    perf.clearMarks(endTag);
  }
}
function isSupported() {
  if (supported !== void 0) {
    return supported;
  }
  if (typeof window !== "undefined" && window.performance) {
    supported = true;
    perf = window.performance;
  } else {
    supported = false;
  }
  return supported;
}

let initialized = false;
function initFeatureFlags() {
  if (initialized) return;
  initialized = true;
}

const MoveType = {
  "ENTER": 0,
  "0": "ENTER",
  "LEAVE": 1,
  "1": "LEAVE",
  "REORDER": 2,
  "2": "REORDER"
};
const queuePostRenderEffect = queueEffectWithSuspense ;
function createRenderer(options) {
  return baseCreateRenderer(options);
}
function createHydrationRenderer(options) {
  return baseCreateRenderer(options, createHydrationFunctions);
}
function baseCreateRenderer(options, createHydrationFns) {
  const target = getGlobalThis();
  target.__VUE__ = true;
  const {
    insert: hostInsert,
    remove: hostRemove,
    patchProp: hostPatchProp,
    createElement: hostCreateElement,
    createText: hostCreateText,
    createComment: hostCreateComment,
    setText: hostSetText,
    setElementText: hostSetElementText,
    parentNode: hostParentNode,
    nextSibling: hostNextSibling,
    setScopeId: hostSetScopeId = NOOP,
    insertStaticContent: hostInsertStaticContent
  } = options;
  const patch = (n1, n2, container, anchor = null, parentComponent = null, parentSuspense = null, namespace = void 0, slotScopeIds = null, optimized = !!n2.dynamicChildren) => {
    if (n1 === n2) {
      return;
    }
    if (n1 && !isSameVNodeType(n1, n2)) {
      anchor = getNextHostNode(n1);
      unmount(n1, parentComponent, parentSuspense, true);
      n1 = null;
    }
    if (n2.patchFlag === -2) {
      optimized = false;
      n2.dynamicChildren = null;
    }
    const { type, ref, shapeFlag } = n2;
    switch (type) {
      case Text$1:
        processText(n1, n2, container, anchor);
        break;
      case Comment$1:
        processCommentNode(n1, n2, container, anchor);
        break;
      case Static:
        if (n1 == null) {
          mountStaticNode(n2, container, anchor, namespace);
        }
        break;
      case Fragment:
        processFragment(
          n1,
          n2,
          container,
          anchor,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          optimized
        );
        break;
      case VaporSlot:
        getVaporInterface(parentComponent, n2).slot(n1, n2, container, anchor);
        break;
      default:
        if (shapeFlag & 1) {
          processElement(
            n1,
            n2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
        } else if (shapeFlag & 6) {
          processComponent(
            n1,
            n2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
        } else if (shapeFlag & 64) {
          type.process(
            n1,
            n2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized,
            internals
          );
        } else if (shapeFlag & 128) {
          type.process(
            n1,
            n2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized,
            internals
          );
        } else ;
    }
    if (ref != null && parentComponent) {
      setRef$1(ref, n1 && n1.ref, parentSuspense, n2 || n1, !n2);
    } else if (ref == null && n1 && n1.ref != null) {
      setRef$1(n1.ref, null, parentSuspense, n1, true);
    }
  };
  const processText = (n1, n2, container, anchor) => {
    if (n1 == null) {
      hostInsert(
        n2.el = hostCreateText(n2.children),
        container,
        anchor
      );
    } else {
      const el = n2.el = n1.el;
      if (n2.children !== n1.children) {
        hostSetText(el, n2.children);
      }
    }
  };
  const processCommentNode = (n1, n2, container, anchor) => {
    if (n1 == null) {
      hostInsert(
        n2.el = hostCreateComment(n2.children || ""),
        container,
        anchor
      );
    } else {
      n2.el = n1.el;
    }
  };
  const mountStaticNode = (n2, container, anchor, namespace) => {
    [n2.el, n2.anchor] = hostInsertStaticContent(
      n2.children,
      container,
      anchor,
      namespace,
      n2.el,
      n2.anchor
    );
  };
  const moveStaticNode = ({ el, anchor }, container, nextSibling) => {
    let next;
    while (el && el !== anchor) {
      next = hostNextSibling(el);
      hostInsert(el, container, nextSibling);
      el = next;
    }
    hostInsert(anchor, container, nextSibling);
  };
  const removeStaticNode = ({ el, anchor }) => {
    let next;
    while (el && el !== anchor) {
      next = hostNextSibling(el);
      hostRemove(el);
      el = next;
    }
    hostRemove(anchor);
  };
  const processElement = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
    if (n2.type === "svg") {
      namespace = "svg";
    } else if (n2.type === "math") {
      namespace = "mathml";
    }
    if (n1 == null) {
      mountElement(
        n2,
        container,
        anchor,
        parentComponent,
        parentSuspense,
        namespace,
        slotScopeIds,
        optimized
      );
    } else {
      patchElement(
        n1,
        n2,
        parentComponent,
        parentSuspense,
        namespace,
        slotScopeIds,
        optimized
      );
    }
  };
  const mountElement = (vnode, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
    let el;
    let vnodeHook;
    const { props, shapeFlag, transition, dirs } = vnode;
    el = vnode.el = hostCreateElement(
      vnode.type,
      namespace,
      props && props.is,
      props
    );
    if (shapeFlag & 8) {
      hostSetElementText(el, vnode.children);
    } else if (shapeFlag & 16) {
      mountChildren(
        vnode.children,
        el,
        null,
        parentComponent,
        parentSuspense,
        resolveChildrenNamespace(vnode, namespace),
        slotScopeIds,
        optimized
      );
    }
    if (dirs) {
      invokeDirectiveHook(vnode, null, parentComponent, "created");
    }
    setScopeId(el, vnode, vnode.scopeId, slotScopeIds, parentComponent);
    if (props) {
      for (const key in props) {
        if (key !== "value" && !isReservedProp(key)) {
          hostPatchProp(el, key, null, props[key], namespace, parentComponent);
        }
      }
      if ("value" in props) {
        hostPatchProp(el, "value", null, props.value, namespace);
      }
      if (vnodeHook = props.onVnodeBeforeMount) {
        invokeVNodeHook(vnodeHook, parentComponent, vnode);
      }
    }
    if (dirs) {
      invokeDirectiveHook(vnode, null, parentComponent, "beforeMount");
    }
    if (transition) {
      performTransitionEnter(
        el,
        transition,
        () => hostInsert(el, container, anchor),
        parentSuspense
      );
    } else {
      hostInsert(el, container, anchor);
    }
    if ((vnodeHook = props && props.onVnodeMounted) || dirs) {
      queuePostRenderEffect(
        () => {
          vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
          dirs && invokeDirectiveHook(vnode, null, parentComponent, "mounted");
        },
        void 0,
        parentSuspense
      );
    }
  };
  const setScopeId = (el, vnode, scopeId, slotScopeIds, parentComponent) => {
    if (scopeId) {
      hostSetScopeId(el, scopeId);
    }
    if (slotScopeIds) {
      for (let i = 0; i < slotScopeIds.length; i++) {
        hostSetScopeId(el, slotScopeIds[i]);
      }
    }
    const inheritedScopeIds = getInheritedScopeIds(vnode, parentComponent);
    for (let i = 0; i < inheritedScopeIds.length; i++) {
      hostSetScopeId(el, inheritedScopeIds[i]);
    }
  };
  const mountChildren = (children, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized, start = 0) => {
    for (let i = start; i < children.length; i++) {
      const child = children[i] = optimized ? cloneIfMounted(children[i]) : normalizeVNode(children[i]);
      patch(
        null,
        child,
        container,
        anchor,
        parentComponent,
        parentSuspense,
        namespace,
        slotScopeIds,
        optimized
      );
    }
  };
  const patchElement = (n1, n2, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
    const el = n2.el = n1.el;
    let { patchFlag, dynamicChildren, dirs } = n2;
    patchFlag |= n1.patchFlag & 16;
    const oldProps = n1.props || EMPTY_OBJ;
    const newProps = n2.props || EMPTY_OBJ;
    let vnodeHook;
    parentComponent && toggleRecurse(parentComponent, false);
    if (vnodeHook = newProps.onVnodeBeforeUpdate) {
      invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
    }
    if (dirs) {
      invokeDirectiveHook(n2, n1, parentComponent, "beforeUpdate");
    }
    parentComponent && toggleRecurse(parentComponent, true);
    if (oldProps.innerHTML && newProps.innerHTML == null || oldProps.textContent && newProps.textContent == null) {
      hostSetElementText(el, "");
    }
    if (dynamicChildren) {
      patchBlockChildren(
        n1.dynamicChildren,
        dynamicChildren,
        el,
        parentComponent,
        parentSuspense,
        resolveChildrenNamespace(n2, namespace),
        slotScopeIds
      );
    } else if (!optimized) {
      patchChildren(
        n1,
        n2,
        el,
        null,
        parentComponent,
        parentSuspense,
        resolveChildrenNamespace(n2, namespace),
        slotScopeIds,
        false
      );
    }
    if (patchFlag > 0) {
      if (patchFlag & 16) {
        patchProps(el, oldProps, newProps, parentComponent, namespace);
      } else {
        if (patchFlag & 2) {
          if (oldProps.class !== newProps.class) {
            hostPatchProp(el, "class", null, newProps.class, namespace);
          }
        }
        if (patchFlag & 4) {
          hostPatchProp(el, "style", oldProps.style, newProps.style, namespace);
        }
        if (patchFlag & 8) {
          const propsToUpdate = n2.dynamicProps;
          for (let i = 0; i < propsToUpdate.length; i++) {
            const key = propsToUpdate[i];
            const prev = oldProps[key];
            const next = newProps[key];
            if (next !== prev || key === "value") {
              hostPatchProp(el, key, prev, next, namespace, parentComponent);
            }
          }
        }
      }
      if (patchFlag & 1) {
        if (n1.children !== n2.children) {
          hostSetElementText(el, n2.children);
        }
      }
    } else if (!optimized && dynamicChildren == null) {
      patchProps(el, oldProps, newProps, parentComponent, namespace);
    }
    if ((vnodeHook = newProps.onVnodeUpdated) || dirs) {
      queuePostRenderEffect(
        () => {
          vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
          dirs && invokeDirectiveHook(n2, n1, parentComponent, "updated");
        },
        void 0,
        parentSuspense
      );
    }
  };
  const patchBlockChildren = (oldChildren, newChildren, fallbackContainer, parentComponent, parentSuspense, namespace, slotScopeIds) => {
    for (let i = 0; i < newChildren.length; i++) {
      const oldVNode = oldChildren[i];
      const newVNode = newChildren[i];
      const container = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        oldVNode.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (oldVNode.type === Fragment || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !isSameVNodeType(oldVNode, newVNode) || // - In the case of a component, it could contain anything.
        oldVNode.shapeFlag & (6 | 64 | 128)) ? hostParentNode(oldVNode.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          fallbackContainer
        )
      );
      patch(
        oldVNode,
        newVNode,
        container,
        null,
        parentComponent,
        parentSuspense,
        namespace,
        slotScopeIds,
        true
      );
    }
  };
  const patchProps = (el, oldProps, newProps, parentComponent, namespace) => {
    if (oldProps !== newProps) {
      if (oldProps !== EMPTY_OBJ) {
        for (const key in oldProps) {
          if (!isReservedProp(key) && !(key in newProps)) {
            hostPatchProp(
              el,
              key,
              oldProps[key],
              null,
              namespace,
              parentComponent
            );
          }
        }
      }
      for (const key in newProps) {
        if (isReservedProp(key)) continue;
        const next = newProps[key];
        const prev = oldProps[key];
        if (next !== prev && key !== "value") {
          hostPatchProp(el, key, prev, next, namespace, parentComponent);
        }
      }
      if ("value" in newProps) {
        hostPatchProp(el, "value", oldProps.value, newProps.value, namespace);
      }
    }
  };
  const processFragment = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
    const fragmentStartAnchor = n2.el = n1 ? n1.el : hostCreateText("");
    const fragmentEndAnchor = n2.anchor = n1 ? n1.anchor : hostCreateText("");
    let { patchFlag, dynamicChildren, slotScopeIds: fragmentSlotScopeIds } = n2;
    if (fragmentSlotScopeIds) {
      slotScopeIds = slotScopeIds ? slotScopeIds.concat(fragmentSlotScopeIds) : fragmentSlotScopeIds;
    }
    if (n1 == null) {
      hostInsert(fragmentStartAnchor, container, anchor);
      hostInsert(fragmentEndAnchor, container, anchor);
      mountChildren(
        // #10007
        // such fragment like `<></>` will be compiled into
        // a fragment which doesn't have a children.
        // In this case fallback to an empty array
        n2.children || [],
        container,
        fragmentEndAnchor,
        parentComponent,
        parentSuspense,
        namespace,
        slotScopeIds,
        optimized
      );
    } else {
      if (patchFlag > 0 && patchFlag & 64 && dynamicChildren && // #2715 the previous fragment could've been a BAILed one as a result
      // of renderSlot() with no valid children
      n1.dynamicChildren) {
        patchBlockChildren(
          n1.dynamicChildren,
          dynamicChildren,
          container,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds
        );
        if (
          // #2080 if the stable fragment has a key, it's a <template v-for> that may
          //  get moved around. Make sure all root level vnodes inherit el.
          // #2134 or if it's a component root, it may also get moved around
          // as the component is being moved.
          n2.key != null || parentComponent && n2 === parentComponent.subTree
        ) {
          traverseStaticChildren(
            n1,
            n2,
            true
            /* shallow */
          );
        }
      } else {
        patchChildren(
          n1,
          n2,
          container,
          fragmentEndAnchor,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          optimized
        );
      }
    }
  };
  const processComponent = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
    n2.slotScopeIds = slotScopeIds;
    if (n2.type.__vapor) {
      if (n1 == null) {
        getVaporInterface(parentComponent, n2).mount(
          n2,
          container,
          anchor,
          parentComponent
        );
      } else {
        getVaporInterface(parentComponent, n2).update(
          n1,
          n2,
          shouldUpdateComponent(n1, n2, optimized)
        );
      }
    } else if (n1 == null) {
      if (n2.shapeFlag & 512) {
        parentComponent.ctx.activate(
          n2,
          container,
          anchor,
          namespace,
          optimized
        );
      } else {
        mountComponent(
          n2,
          container,
          anchor,
          parentComponent,
          parentSuspense,
          namespace,
          optimized
        );
      }
    } else {
      updateComponent(n1, n2, optimized);
    }
  };
  const mountComponent = (initialVNode, container, anchor, parentComponent, parentSuspense, namespace, optimized) => {
    const instance = (initialVNode.component = createComponentInstance(
      initialVNode,
      parentComponent,
      parentSuspense
    ));
    if (isKeepAlive(initialVNode)) {
      instance.ctx.renderer = internals;
    }
    {
      setupComponent$1(instance, false, optimized);
    }
    if (instance.asyncDep) {
      parentSuspense && parentSuspense.registerDep(instance, setupRenderEffect, optimized);
      if (!initialVNode.el) {
        const placeholder = instance.subTree = createVNode(Comment$1);
        processCommentNode(null, placeholder, container, anchor);
        initialVNode.placeholder = placeholder.el;
      }
    } else {
      setupRenderEffect(
        instance,
        initialVNode,
        container,
        anchor,
        parentSuspense,
        namespace,
        optimized
      );
    }
  };
  const updateComponent = (n1, n2, optimized) => {
    const instance = n2.component = n1.component;
    if (shouldUpdateComponent(n1, n2, optimized)) {
      if (instance.asyncDep && !instance.asyncResolved) {
        updateComponentPreRender(instance, n2, optimized);
        return;
      } else {
        instance.next = n2;
        instance.effect.run();
      }
    } else {
      n2.el = n1.el;
      instance.vnode = n2;
    }
  };
  class SetupRenderEffect extends ReactiveEffect {
    constructor(instance, initialVNode, container, anchor, parentSuspense, namespace, optimized) {
      const prevScope = setCurrentScope(instance.scope);
      super();
      this.instance = instance;
      this.initialVNode = initialVNode;
      this.container = container;
      this.anchor = anchor;
      this.parentSuspense = parentSuspense;
      this.namespace = namespace;
      this.optimized = optimized;
      setCurrentScope(prevScope);
      this.job = instance.job = () => {
        if (this.dirty) {
          this.run();
        }
      };
      this.job.i = instance;
    }
    notify() {
      if (!(this.flags & 256)) {
        const job = this.job;
        queueJob(job, job.i.uid);
      }
    }
    fn() {
      const {
        instance,
        initialVNode,
        container,
        anchor,
        parentSuspense,
        namespace,
        optimized
      } = this;
      if (!instance.isMounted) {
        let vnodeHook;
        const { el, props } = initialVNode;
        const { bm, m, parent, root, type } = instance;
        const isAsyncWrapperVNode = isAsyncWrapper(initialVNode);
        toggleRecurse(instance, false);
        if (bm) {
          invokeArrayFns(bm);
        }
        if (!isAsyncWrapperVNode && (vnodeHook = props && props.onVnodeBeforeMount)) {
          invokeVNodeHook(vnodeHook, parent, initialVNode);
        }
        toggleRecurse(instance, true);
        if (el && hydrateNode) {
          const hydrateSubTree = () => {
            instance.subTree = renderComponentRoot(instance);
            hydrateNode(
              el,
              instance.subTree,
              instance,
              parentSuspense,
              null
            );
          };
          if (isAsyncWrapperVNode && type.__asyncHydrate) {
            type.__asyncHydrate(
              el,
              instance,
              hydrateSubTree
            );
          } else {
            hydrateSubTree();
          }
        } else {
          if (root.ce && // @ts-expect-error _def is private
          root.ce._def.shadowRoot !== false) {
            root.ce._injectChildStyle(type);
          }
          const subTree = instance.subTree = renderComponentRoot(instance);
          patch(
            null,
            subTree,
            container,
            anchor,
            instance,
            parentSuspense,
            namespace
          );
          initialVNode.el = subTree.el;
        }
        if (m) {
          queuePostRenderEffect(m, void 0, parentSuspense);
        }
        if (!isAsyncWrapperVNode && (vnodeHook = props && props.onVnodeMounted)) {
          const scopedInitialVNode = initialVNode;
          queuePostRenderEffect(
            () => invokeVNodeHook(vnodeHook, parent, scopedInitialVNode),
            void 0,
            parentSuspense
          );
        }
        if (initialVNode.shapeFlag & 256 || parent && parent.vnode && isAsyncWrapper(parent.vnode) && parent.vnode.shapeFlag & 256) {
          instance.a && queuePostRenderEffect(instance.a, void 0, parentSuspense);
        }
        instance.isMounted = true;
        this.initialVNode = this.container = this.anchor = null;
      } else {
        let { next, bu, u, parent, vnode } = instance;
        {
          const nonHydratedAsyncRoot = locateNonHydratedAsyncRoot(instance);
          if (nonHydratedAsyncRoot) {
            if (next) {
              next.el = vnode.el;
              updateComponentPreRender(instance, next, optimized);
            }
            nonHydratedAsyncRoot.asyncDep.then(() => {
              if (!instance.isUnmounted) {
                this.fn();
              }
            });
            return;
          }
        }
        let originNext = next;
        let vnodeHook;
        toggleRecurse(instance, false);
        if (next) {
          next.el = vnode.el;
          updateComponentPreRender(instance, next, optimized);
        } else {
          next = vnode;
        }
        if (bu) {
          invokeArrayFns(bu);
        }
        if (vnodeHook = next.props && next.props.onVnodeBeforeUpdate) {
          invokeVNodeHook(vnodeHook, parent, next, vnode);
        }
        toggleRecurse(instance, true);
        const nextTree = renderComponentRoot(instance);
        const prevTree = instance.subTree;
        instance.subTree = nextTree;
        patch(
          prevTree,
          nextTree,
          // parent may have changed if it's in a teleport
          hostParentNode(prevTree.el),
          // anchor may have changed if it's in a fragment
          getNextHostNode(prevTree),
          instance,
          parentSuspense,
          namespace
        );
        next.el = nextTree.el;
        if (originNext === null) {
          updateHOCHostEl(instance, nextTree.el);
        }
        if (u) {
          queuePostRenderEffect(u, void 0, parentSuspense);
        }
        if (vnodeHook = next.props && next.props.onVnodeUpdated) {
          queuePostRenderEffect(
            () => invokeVNodeHook(vnodeHook, parent, next, vnode),
            void 0,
            parentSuspense
          );
        }
      }
    }
  }
  const setupRenderEffect = (instance, initialVNode, container, anchor, parentSuspense, namespace, optimized) => {
    const effect = instance.effect = new SetupRenderEffect(
      instance,
      initialVNode,
      container,
      anchor,
      parentSuspense,
      namespace,
      optimized
    );
    instance.update = effect.run.bind(effect);
    toggleRecurse(instance, true);
    effect.run();
  };
  const updateComponentPreRender = (instance, nextVNode, optimized) => {
    nextVNode.component = instance;
    const prevProps = instance.vnode.props;
    instance.vnode = nextVNode;
    instance.next = null;
    updateProps(instance, nextVNode.props, prevProps, optimized);
    updateSlots(instance, nextVNode.children, optimized);
    const prevSub = setActiveSub();
    flushPreFlushCbs(instance);
    setActiveSub(prevSub);
  };
  const patchChildren = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized = false) => {
    const c1 = n1 && n1.children;
    const prevShapeFlag = n1 ? n1.shapeFlag : 0;
    const c2 = n2.children;
    const { patchFlag, shapeFlag } = n2;
    if (patchFlag > 0) {
      if (patchFlag & 128) {
        patchKeyedChildren(
          c1,
          c2,
          container,
          anchor,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          optimized
        );
        return;
      } else if (patchFlag & 256) {
        patchUnkeyedChildren(
          c1,
          c2,
          container,
          anchor,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          optimized
        );
        return;
      }
    }
    if (shapeFlag & 8) {
      if (prevShapeFlag & 16) {
        unmountChildren(c1, parentComponent, parentSuspense);
      }
      if (c2 !== c1) {
        hostSetElementText(container, c2);
      }
    } else {
      if (prevShapeFlag & 16) {
        if (shapeFlag & 16) {
          patchKeyedChildren(
            c1,
            c2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
        } else {
          unmountChildren(c1, parentComponent, parentSuspense, true);
        }
      } else {
        if (prevShapeFlag & 8) {
          hostSetElementText(container, "");
        }
        if (shapeFlag & 16) {
          mountChildren(
            c2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
        }
      }
    }
  };
  const patchUnkeyedChildren = (c1, c2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
    c1 = c1 || EMPTY_ARR;
    c2 = c2 || EMPTY_ARR;
    const oldLength = c1.length;
    const newLength = c2.length;
    const commonLength = Math.min(oldLength, newLength);
    let i;
    for (i = 0; i < commonLength; i++) {
      const nextChild = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
      patch(
        c1[i],
        nextChild,
        container,
        null,
        parentComponent,
        parentSuspense,
        namespace,
        slotScopeIds,
        optimized
      );
    }
    if (oldLength > newLength) {
      unmountChildren(
        c1,
        parentComponent,
        parentSuspense,
        true,
        false,
        commonLength
      );
    } else {
      mountChildren(
        c2,
        container,
        anchor,
        parentComponent,
        parentSuspense,
        namespace,
        slotScopeIds,
        optimized,
        commonLength
      );
    }
  };
  const patchKeyedChildren = (c1, c2, container, parentAnchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
    let i = 0;
    const l2 = c2.length;
    let e1 = c1.length - 1;
    let e2 = l2 - 1;
    while (i <= e1 && i <= e2) {
      const n1 = c1[i];
      const n2 = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
      if (isSameVNodeType(n1, n2)) {
        patch(
          n1,
          n2,
          container,
          null,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          optimized
        );
      } else {
        break;
      }
      i++;
    }
    while (i <= e1 && i <= e2) {
      const n1 = c1[e1];
      const n2 = c2[e2] = optimized ? cloneIfMounted(c2[e2]) : normalizeVNode(c2[e2]);
      if (isSameVNodeType(n1, n2)) {
        patch(
          n1,
          n2,
          container,
          null,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          optimized
        );
      } else {
        break;
      }
      e1--;
      e2--;
    }
    if (i > e1) {
      if (i <= e2) {
        const nextPos = e2 + 1;
        const anchor = nextPos < l2 ? c2[nextPos].el : parentAnchor;
        while (i <= e2) {
          patch(
            null,
            c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]),
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
          i++;
        }
      }
    } else if (i > e2) {
      while (i <= e1) {
        unmount(c1[i], parentComponent, parentSuspense, true);
        i++;
      }
    } else {
      const s1 = i;
      const s2 = i;
      const keyToNewIndexMap = /* @__PURE__ */ new Map();
      for (i = s2; i <= e2; i++) {
        const nextChild = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
        if (nextChild.key != null) {
          keyToNewIndexMap.set(nextChild.key, i);
        }
      }
      let j;
      let patched = 0;
      const toBePatched = e2 - s2 + 1;
      let moved = false;
      let maxNewIndexSoFar = 0;
      const newIndexToOldIndexMap = new Array(toBePatched);
      for (i = 0; i < toBePatched; i++) newIndexToOldIndexMap[i] = 0;
      for (i = s1; i <= e1; i++) {
        const prevChild = c1[i];
        if (patched >= toBePatched) {
          unmount(prevChild, parentComponent, parentSuspense, true);
          continue;
        }
        let newIndex;
        if (prevChild.key != null) {
          newIndex = keyToNewIndexMap.get(prevChild.key);
        } else {
          for (j = s2; j <= e2; j++) {
            if (newIndexToOldIndexMap[j - s2] === 0 && isSameVNodeType(prevChild, c2[j])) {
              newIndex = j;
              break;
            }
          }
        }
        if (newIndex === void 0) {
          unmount(prevChild, parentComponent, parentSuspense, true);
        } else {
          newIndexToOldIndexMap[newIndex - s2] = i + 1;
          if (newIndex >= maxNewIndexSoFar) {
            maxNewIndexSoFar = newIndex;
          } else {
            moved = true;
          }
          patch(
            prevChild,
            c2[newIndex],
            container,
            null,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
          patched++;
        }
      }
      const increasingNewIndexSequence = moved ? getSequence(newIndexToOldIndexMap) : EMPTY_ARR;
      j = increasingNewIndexSequence.length - 1;
      for (i = toBePatched - 1; i >= 0; i--) {
        const nextIndex = s2 + i;
        const nextChild = c2[nextIndex];
        const anchorVNode = c2[nextIndex + 1];
        const anchor = nextIndex + 1 < l2 ? (
          // #13559, fallback to el placeholder for unresolved async component
          anchorVNode.el || anchorVNode.placeholder
        ) : parentAnchor;
        if (newIndexToOldIndexMap[i] === 0) {
          patch(
            null,
            nextChild,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
        } else if (moved) {
          if (j < 0 || i !== increasingNewIndexSequence[j]) {
            move(
              nextChild,
              container,
              anchor,
              2,
              parentComponent
            );
          } else {
            j--;
          }
        }
      }
    }
  };
  const move = (vnode, container, anchor, moveType, parentComponent, parentSuspense = null) => {
    const { el, type, transition, children, shapeFlag } = vnode;
    if (shapeFlag & 6) {
      if (type.__vapor) {
        getVaporInterface(parentComponent, vnode).move(vnode, container, anchor);
      } else {
        move(
          vnode.component.subTree,
          container,
          anchor,
          moveType,
          parentComponent
        );
      }
      return;
    }
    if (shapeFlag & 128) {
      vnode.suspense.move(container, anchor, moveType);
      return;
    }
    if (shapeFlag & 64) {
      type.move(
        vnode,
        container,
        anchor,
        internals,
        parentComponent
      );
      return;
    }
    if (type === Fragment) {
      hostInsert(el, container, anchor);
      for (let i = 0; i < children.length; i++) {
        move(
          children[i],
          container,
          anchor,
          moveType,
          parentComponent
        );
      }
      hostInsert(vnode.anchor, container, anchor);
      return;
    }
    if (type === Static) {
      moveStaticNode(vnode, container, anchor);
      return;
    }
    const needTransition2 = moveType !== 2 && shapeFlag & 1 && transition;
    if (needTransition2) {
      if (moveType === 0) {
        performTransitionEnter(
          el,
          transition,
          () => hostInsert(el, container, anchor),
          parentSuspense,
          true
        );
      } else {
        const { leave, delayLeave, afterLeave } = transition;
        const remove2 = () => {
          if (vnode.ctx.isUnmounted) {
            hostRemove(el);
          } else {
            hostInsert(el, container, anchor);
          }
        };
        const performLeave = () => {
          if (el._isLeaving) {
            el[leaveCbKey](
              true
              /* cancelled */
            );
          }
          leave(el, () => {
            remove2();
            afterLeave && afterLeave();
          });
        };
        if (delayLeave) {
          delayLeave(el, remove2, performLeave);
        } else {
          performLeave();
        }
      }
    } else {
      hostInsert(el, container, anchor);
    }
  };
  const unmount = (vnode, parentComponent, parentSuspense, doRemove = false, optimized = false) => {
    const {
      type,
      props,
      ref,
      children,
      dynamicChildren,
      shapeFlag,
      patchFlag,
      dirs,
      cacheIndex
    } = vnode;
    if (patchFlag === -2) {
      optimized = false;
    }
    if (ref != null) {
      const prevSub = setActiveSub();
      setRef$1(ref, null, parentSuspense, vnode, true);
      setActiveSub(prevSub);
    }
    if (cacheIndex != null) {
      parentComponent.renderCache[cacheIndex] = void 0;
    }
    if (shapeFlag & 256) {
      parentComponent.ctx.deactivate(vnode);
      return;
    }
    const shouldInvokeDirs = shapeFlag & 1 && dirs;
    const shouldInvokeVnodeHook = !isAsyncWrapper(vnode);
    let vnodeHook;
    if (shouldInvokeVnodeHook && (vnodeHook = props && props.onVnodeBeforeUnmount)) {
      invokeVNodeHook(vnodeHook, parentComponent, vnode);
    }
    if (shapeFlag & 6) {
      if (type.__vapor) {
        getVaporInterface(parentComponent, vnode).unmount(vnode, doRemove);
        return;
      } else {
        unmountComponent(vnode.component, parentSuspense, doRemove);
      }
    } else {
      if (shapeFlag & 128) {
        vnode.suspense.unmount(parentSuspense, doRemove);
        return;
      }
      if (shouldInvokeDirs) {
        invokeDirectiveHook(vnode, null, parentComponent, "beforeUnmount");
      }
      if (shapeFlag & 64) {
        vnode.type.remove(
          vnode,
          parentComponent,
          parentSuspense,
          internals,
          doRemove
        );
      } else if (dynamicChildren && // #5154
      // when v-once is used inside a block, setBlockTracking(-1) marks the
      // parent block with hasOnce: true
      // so that it doesn't take the fast path during unmount - otherwise
      // components nested in v-once are never unmounted.
      !dynamicChildren.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (type !== Fragment || patchFlag > 0 && patchFlag & 64)) {
        unmountChildren(
          dynamicChildren,
          parentComponent,
          parentSuspense,
          false,
          true
        );
      } else if (type === Fragment && patchFlag & (128 | 256) || !optimized && shapeFlag & 16) {
        unmountChildren(children, parentComponent, parentSuspense);
      }
      if (type === VaporSlot) {
        getVaporInterface(parentComponent, vnode).unmount(vnode, doRemove);
        return;
      }
      if (doRemove) {
        remove(vnode);
      }
    }
    if (shouldInvokeVnodeHook && (vnodeHook = props && props.onVnodeUnmounted) || shouldInvokeDirs) {
      queuePostRenderEffect(
        () => {
          vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
          shouldInvokeDirs && invokeDirectiveHook(vnode, null, parentComponent, "unmounted");
        },
        void 0,
        parentSuspense
      );
    }
  };
  const remove = (vnode) => {
    const { type, el, anchor, transition } = vnode;
    if (type === Fragment) {
      {
        removeFragment(el, anchor);
      }
      return;
    }
    if (type === Static) {
      removeStaticNode(vnode);
      return;
    }
    if (transition) {
      performTransitionLeave(
        el,
        transition,
        () => hostRemove(el),
        !!(vnode.shapeFlag & 1)
      );
    } else {
      hostRemove(el);
    }
  };
  const removeFragment = (cur, end) => {
    let next;
    while (cur !== end) {
      next = hostNextSibling(cur);
      hostRemove(cur);
      cur = next;
    }
    hostRemove(end);
  };
  const unmountComponent = (instance, parentSuspense, doRemove) => {
    const { bum, scope, effect, subTree, um, m, a } = instance;
    invalidateMount(m);
    invalidateMount(a);
    if (bum) {
      invokeArrayFns(bum);
    }
    scope.stop();
    if (effect) {
      effect.stop();
      unmount(subTree, instance, parentSuspense, doRemove);
    }
    if (um) {
      queuePostRenderEffect(um, void 0, parentSuspense);
    }
    queuePostRenderEffect(
      () => instance.isUnmounted = true,
      void 0,
      parentSuspense
    );
  };
  const unmountChildren = (children, parentComponent, parentSuspense, doRemove = false, optimized = false, start = 0) => {
    for (let i = start; i < children.length; i++) {
      unmount(children[i], parentComponent, parentSuspense, doRemove, optimized);
    }
  };
  const getNextHostNode = (vnode) => {
    if (vnode.shapeFlag & 6) {
      if (vnode.type.__vapor) {
        return hostNextSibling(vnode.anchor);
      }
      return getNextHostNode(vnode.component.subTree);
    }
    if (vnode.shapeFlag & 128) {
      return vnode.suspense.next();
    }
    const el = hostNextSibling(vnode.anchor || vnode.el);
    const teleportEnd = el && el[TeleportEndKey];
    return teleportEnd ? hostNextSibling(teleportEnd) : el;
  };
  const render = (vnode, container, namespace) => {
    if (vnode == null) {
      if (container._vnode) {
        unmount(container._vnode, null, null, true);
      }
    } else {
      patch(
        container._vnode || null,
        vnode,
        container,
        null,
        null,
        null,
        namespace
      );
    }
    container._vnode = vnode;
    flushOnAppMount();
  };
  const internals = {
    p: patch,
    um: unmount,
    m: move,
    r: remove,
    mt: mountComponent,
    umt: unmountComponent,
    mc: mountChildren,
    pc: patchChildren,
    pbc: patchBlockChildren,
    n: getNextHostNode,
    o: options
  };
  let hydrate;
  let hydrateNode;
  if (createHydrationFns) {
    [hydrate, hydrateNode] = createHydrationFns(
      internals
    );
  }
  const mountApp = (app, container, isHydrate, namespace) => {
    const vnode = app._ceVNode || createVNode(app._component, app._props);
    vnode.appContext = app._context;
    if (namespace === true) {
      namespace = "svg";
    } else if (namespace === false) {
      namespace = void 0;
    }
    if (isHydrate && hydrate) {
      hydrate(vnode, container);
    } else {
      render(vnode, container, namespace);
    }
    return vnode.component;
  };
  const unmountApp = (app) => {
    render(null, app._container);
  };
  return {
    render,
    hydrate,
    hydrateNode,
    internals,
    createApp: createAppAPI(
      mountApp,
      unmountApp,
      getComponentPublicInstance)
  };
}
function resolveChildrenNamespace({ type, props }, currentNamespace) {
  return currentNamespace === "svg" && type === "foreignObject" || currentNamespace === "mathml" && type === "annotation-xml" && props && props.encoding && props.encoding.includes("html") ? void 0 : currentNamespace;
}
function toggleRecurse({ effect, job, vapor }, allowed) {
  if (!vapor) {
    if (allowed) {
      effect.flags |= 128;
      job.flags |= 2;
    } else {
      effect.flags &= -129;
      job.flags &= -3;
    }
  }
}
function needTransition(parentSuspense, transition) {
  return (!parentSuspense || parentSuspense && !parentSuspense.pendingBranch) && transition && !transition.persisted;
}
function traverseStaticChildren(n1, n2, shallow = false) {
  const ch1 = n1.children;
  const ch2 = n2.children;
  if (isArray(ch1) && isArray(ch2)) {
    for (let i = 0; i < ch1.length; i++) {
      const c1 = ch1[i];
      let c2 = ch2[i];
      if (c2.shapeFlag & 1 && !c2.dynamicChildren) {
        if (c2.patchFlag <= 0 || c2.patchFlag === 32) {
          c2 = ch2[i] = cloneIfMounted(ch2[i]);
          c2.el = c1.el;
        }
        if (!shallow && c2.patchFlag !== -2)
          traverseStaticChildren(c1, c2);
      }
      if (c2.type === Text$1 && // avoid cached text nodes retaining detached dom nodes
      c2.patchFlag !== -1) {
        c2.el = c1.el;
      }
      if (c2.type === Comment$1 && !c2.el) {
        c2.el = c1.el;
      }
    }
  }
}
function locateNonHydratedAsyncRoot(instance) {
  const subComponent = instance.vapor ? null : instance.subTree.component;
  if (subComponent) {
    if (subComponent.asyncDep && !subComponent.asyncResolved) {
      return subComponent;
    } else {
      return locateNonHydratedAsyncRoot(subComponent);
    }
  }
}
function invalidateMount(hooks) {
  if (hooks) {
    for (let i = 0; i < hooks.length; i++)
      hooks[i].flags |= 4;
  }
}
function performTransitionEnter(el, transition, insert, parentSuspense, force = false) {
  if (force || needTransition(parentSuspense, transition)) {
    transition.beforeEnter(el);
    insert();
    queuePostRenderEffect(() => transition.enter(el), void 0, parentSuspense);
  } else {
    insert();
  }
}
function performTransitionLeave(el, transition, remove, isElement = true) {
  const performRemove = () => {
    remove();
    if (transition && !transition.persisted && transition.afterLeave) {
      transition.afterLeave();
    }
  };
  if (isElement && transition && !transition.persisted) {
    const { leave, delayLeave } = transition;
    const performLeave = () => leave(el, performRemove);
    if (delayLeave) {
      delayLeave(el, performRemove, performLeave);
    } else {
      performLeave();
    }
  } else {
    performRemove();
  }
}
function getVaporInterface(instance, vnode) {
  const ctx = instance ? instance.appContext : vnode.appContext;
  const res = ctx && ctx.vapor;
  return res;
}
function getInheritedScopeIds(vnode, parentComponent) {
  const inheritedScopeIds = [];
  let currentParent = parentComponent;
  let currentVNode = vnode;
  while (currentParent) {
    let subTree = currentParent.subTree;
    if (!subTree) break;
    if (currentVNode === subTree || isSuspense(subTree.type) && (subTree.ssContent === currentVNode || subTree.ssFallback === currentVNode)) {
      const parentVNode = currentParent.vnode;
      if (parentVNode.scopeId) {
        inheritedScopeIds.push(parentVNode.scopeId);
      }
      if (parentVNode.slotScopeIds) {
        inheritedScopeIds.push(...parentVNode.slotScopeIds);
      }
      currentVNode = parentVNode;
      currentParent = currentParent.parent;
    } else {
      break;
    }
  }
  return inheritedScopeIds;
}

const ssrContextKey = Symbol.for("v-scx");
const useSSRContext = () => {
  {
    const ctx = inject(ssrContextKey);
    return ctx;
  }
};

function watchEffect(effect, options) {
  return doWatch(effect, null, options);
}
function watchPostEffect(effect, options) {
  return doWatch(
    effect,
    null,
    { flush: "post" }
  );
}
function watchSyncEffect(effect, options) {
  return doWatch(
    effect,
    null,
    { flush: "sync" }
  );
}
function watch(source, cb, options) {
  return doWatch(source, cb, options);
}
class RenderWatcherEffect extends WatcherEffect {
  constructor(instance, source, cb, options, flush) {
    super(source, cb, options);
    this.flush = flush;
    const job = () => {
      if (this.dirty) {
        this.run();
      }
    };
    if (cb) {
      this.flags |= 128;
      job.flags |= 2;
    }
    if (instance) {
      job.i = instance;
    }
    this.job = job;
  }
  notify() {
    const flags = this.flags;
    if (!(flags & 256)) {
      const flush = this.flush;
      const job = this.job;
      if (flush === "post") {
        queuePostRenderEffect(job, void 0, job.i ? job.i.suspense : null);
      } else if (flush === "pre") {
        queueJob(job, job.i ? job.i.uid : void 0, true);
      } else {
        job();
      }
    }
  }
}
function doWatch(source, cb, options = EMPTY_OBJ) {
  const { immediate, deep, flush = "pre", once } = options;
  const baseWatchOptions = extend({}, options);
  const runsImmediately = cb && immediate || !cb && flush !== "post";
  let ssrCleanup;
  if (isInSSRComponentSetup) {
    if (flush === "sync") {
      const ctx = useSSRContext();
      ssrCleanup = ctx.__watcherHandles || (ctx.__watcherHandles = []);
    } else if (!runsImmediately) {
      const watchStopHandle = () => {
      };
      watchStopHandle.stop = NOOP;
      watchStopHandle.resume = NOOP;
      watchStopHandle.pause = NOOP;
      return watchStopHandle;
    }
  }
  const instance = currentInstance;
  baseWatchOptions.call = (fn, type, args) => callWithAsyncErrorHandling(fn, instance, type, args);
  const effect = new RenderWatcherEffect(
    instance,
    source,
    cb,
    baseWatchOptions,
    flush
  );
  if (cb) {
    effect.run(true);
  } else if (flush === "post") {
    queuePostRenderEffect(effect.job, void 0, instance && instance.suspense);
  } else {
    effect.run(true);
  }
  const stop = effect.stop.bind(effect);
  stop.pause = effect.pause.bind(effect);
  stop.resume = effect.resume.bind(effect);
  stop.stop = stop;
  if (isInSSRComponentSetup) {
    if (ssrCleanup) {
      ssrCleanup.push(stop);
    } else if (runsImmediately) {
      stop();
    }
  }
  return stop;
}
function instanceWatch(source, value, options) {
  const publicThis = this.proxy;
  const getter = isString(source) ? source.includes(".") ? createPathGetter(publicThis, source) : () => publicThis[source] : source.bind(publicThis, publicThis);
  let cb;
  if (isFunction(value)) {
    cb = value;
  } else {
    cb = value.handler;
    options = value;
  }
  const prev = setCurrentInstance(this);
  const res = doWatch(getter, cb.bind(publicThis), options);
  setCurrentInstance(...prev);
  return res;
}
function createPathGetter(ctx, path) {
  const segments = path.split(".");
  return () => {
    let cur = ctx;
    for (let i = 0; i < segments.length && cur; i++) {
      cur = cur[segments[i]];
    }
    return cur;
  };
}

function useModel(props, name, options = EMPTY_OBJ) {
  const i = getCurrentGenericInstance();
  const camelizedName = camelize(name);
  const hyphenatedName = hyphenate(name);
  const modifiers = getModelModifiers(props, camelizedName, defaultPropGetter);
  const res = customRef((track, trigger) => {
    let localValue;
    let prevSetValue = EMPTY_OBJ;
    let prevEmittedValue;
    watchSyncEffect(() => {
      const propValue = props[camelizedName];
      if (hasChanged(localValue, propValue)) {
        localValue = propValue;
        trigger();
      }
    });
    return {
      get() {
        track();
        return options.get ? options.get(localValue) : localValue;
      },
      set(value) {
        const emittedValue = options.set ? options.set(value) : value;
        if (!hasChanged(emittedValue, localValue) && !(prevSetValue !== EMPTY_OBJ && hasChanged(value, prevSetValue))) {
          return;
        }
        let rawPropKeys;
        let parentPassedModelValue = false;
        let parentPassedModelUpdater = false;
        if (i.rawKeys) {
          rawPropKeys = i.rawKeys();
        } else {
          const rawProps = i.vnode.props;
          rawPropKeys = rawProps && Object.keys(rawProps);
        }
        if (rawPropKeys) {
          for (const key of rawPropKeys) {
            if (key === name || key === camelizedName || key === hyphenatedName) {
              parentPassedModelValue = true;
            } else if (key === `onUpdate:${name}` || key === `onUpdate:${camelizedName}` || key === `onUpdate:${hyphenatedName}`) {
              parentPassedModelUpdater = true;
            }
          }
        }
        if (!parentPassedModelValue || !parentPassedModelUpdater) {
          localValue = value;
          trigger();
        }
        i.emit(`update:${name}`, emittedValue);
        if (hasChanged(value, emittedValue) && hasChanged(value, prevSetValue) && !hasChanged(emittedValue, prevEmittedValue)) {
          trigger();
        }
        prevSetValue = value;
        prevEmittedValue = emittedValue;
      }
    };
  });
  res[Symbol.iterator] = () => {
    let i2 = 0;
    return {
      next() {
        if (i2 < 2) {
          return { value: i2++ ? modifiers || EMPTY_OBJ : res, done: false };
        } else {
          return { done: true };
        }
      }
    };
  };
  return res;
}
const getModelModifiers = (props, modelName, getter) => {
  return modelName === "modelValue" || modelName === "model-value" ? getter(props, "modelModifiers") : getter(props, `${modelName}Modifiers`) || getter(props, `${camelize(modelName)}Modifiers`) || getter(props, `${hyphenate(modelName)}Modifiers`);
};

function emit$1(instance, event, ...rawArgs) {
  return baseEmit(
    instance,
    instance.vnode.props || EMPTY_OBJ,
    defaultPropGetter,
    event,
    ...rawArgs
  );
}
function baseEmit(instance, props, getter, event, ...rawArgs) {
  if (instance.isUnmounted) return;
  let args = rawArgs;
  const isModelListener = event.startsWith("update:");
  const modifiers = isModelListener && getModelModifiers(props, event.slice(7), getter);
  if (modifiers) {
    if (modifiers.trim) {
      args = rawArgs.map((a) => isString(a) ? a.trim() : a);
    }
    if (modifiers.number) {
      args = rawArgs.map(looseToNumber);
    }
  }
  let handlerName;
  let handler = getter(props, handlerName = toHandlerKey(event)) || // also try camelCase event handler (#2249)
  getter(props, handlerName = toHandlerKey(camelize(event)));
  if (!handler && isModelListener) {
    handler = getter(props, handlerName = toHandlerKey(hyphenate(event)));
  }
  if (handler) {
    callWithAsyncErrorHandling(
      handler,
      instance,
      6,
      args
    );
  }
  const onceHandler = getter(props, handlerName + `Once`);
  if (onceHandler) {
    if (!instance.emitted) {
      instance.emitted = {};
    } else if (instance.emitted[handlerName]) {
      return;
    }
    instance.emitted[handlerName] = true;
    callWithAsyncErrorHandling(
      onceHandler,
      instance,
      6,
      args
    );
  }
}
function defaultPropGetter(props, key) {
  return props[key];
}
function normalizeEmitsOptions$1(comp, appContext, asMixin = false) {
  const cache = appContext.emitsCache;
  const cached = cache.get(comp);
  if (cached !== void 0) {
    return cached;
  }
  const raw = comp.emits;
  let normalized = {};
  let hasExtends = false;
  if (!isFunction(comp)) {
    const extendEmits = (raw2) => {
      const normalizedFromExtend = normalizeEmitsOptions$1(raw2, appContext, true);
      if (normalizedFromExtend) {
        hasExtends = true;
        extend(normalized, normalizedFromExtend);
      }
    };
    if (!asMixin && appContext.mixins.length) {
      appContext.mixins.forEach(extendEmits);
    }
    if (comp.extends) {
      extendEmits(comp.extends);
    }
    if (comp.mixins) {
      comp.mixins.forEach(extendEmits);
    }
  }
  if (!raw && !hasExtends) {
    if (isObject(comp)) {
      cache.set(comp, null);
    }
    return null;
  }
  if (isArray(raw)) {
    raw.forEach((key) => normalized[key] = null);
  } else {
    extend(normalized, raw);
  }
  if (isObject(comp)) {
    cache.set(comp, normalized);
  }
  return normalized;
}
function isEmitListener(options, key) {
  if (!options || !isOn(key)) {
    return false;
  }
  key = key.slice(2).replace(/Once$/, "");
  return hasOwn(options, key[0].toLowerCase() + key.slice(1)) || hasOwn(options, hyphenate(key)) || hasOwn(options, key);
}

function markAttrsAccessed() {
}
function renderComponentRoot(instance) {
  const {
    type: Component,
    vnode,
    proxy,
    withProxy,
    propsOptions: [propsOptions],
    slots,
    attrs,
    emit,
    render,
    renderCache,
    props,
    data,
    setupState,
    ctx,
    inheritAttrs
  } = instance;
  const prev = setCurrentRenderingInstance(instance);
  let result;
  let fallthroughAttrs;
  try {
    if (vnode.shapeFlag & 4) {
      const proxyToUse = withProxy || proxy;
      const thisProxy = false ? new Proxy(proxyToUse, {
        get(target, key, receiver) {
          warn(
            `Property '${String(
              key
            )}' was accessed via 'this'. Avoid using 'this' in templates.`
          );
          return Reflect.get(target, key, receiver);
        }
      }) : proxyToUse;
      result = normalizeVNode(
        render.call(
          thisProxy,
          proxyToUse,
          renderCache,
          false ? shallowReadonly(props) : props,
          setupState,
          data,
          ctx
        )
      );
      fallthroughAttrs = attrs;
    } else {
      const render2 = Component;
      if (false) ;
      result = normalizeVNode(
        render2.length > 1 ? render2(
          false ? shallowReadonly(props) : props,
          false ? {
            get attrs() {
              markAttrsAccessed();
              return shallowReadonly(attrs);
            },
            slots,
            emit
          } : { attrs, slots, emit }
        ) : render2(
          false ? shallowReadonly(props) : props,
          null
        )
      );
      fallthroughAttrs = Component.props ? attrs : getFunctionalFallthrough(attrs);
    }
  } catch (err) {
    blockStack.length = 0;
    handleError(err, instance, 1);
    result = createVNode(Comment$1);
  }
  let root = result;
  if (fallthroughAttrs && inheritAttrs !== false) {
    const keys = Object.keys(fallthroughAttrs);
    const { shapeFlag } = root;
    if (keys.length) {
      if (shapeFlag & (1 | 6)) {
        if (propsOptions && keys.some(isModelListener)) {
          fallthroughAttrs = filterModelListeners(
            fallthroughAttrs,
            propsOptions
          );
        }
        root = cloneVNode(root, fallthroughAttrs, false, true);
      }
    }
  }
  if (vnode.dirs) {
    root = cloneVNode(root, null, false, true);
    root.dirs = root.dirs ? root.dirs.concat(vnode.dirs) : vnode.dirs;
  }
  if (vnode.transition) {
    setTransitionHooks$1(root, vnode.transition);
  }
  {
    result = root;
  }
  setCurrentRenderingInstance(prev);
  return result;
}
function filterSingleRoot(children, recurse = true) {
  let singleRoot;
  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    if (isVNode(child)) {
      if (child.type !== Comment$1 || child.children === "v-if") {
        if (singleRoot) {
          return;
        } else {
          singleRoot = child;
        }
      }
    } else {
      return;
    }
  }
  return singleRoot;
}
const getFunctionalFallthrough = (attrs) => {
  let res;
  for (const key in attrs) {
    if (key === "class" || key === "style" || isOn(key)) {
      (res || (res = {}))[key] = attrs[key];
    }
  }
  return res;
};
const filterModelListeners = (attrs, props) => {
  const res = {};
  for (const key in attrs) {
    if (!isModelListener(key) || !(key.slice(9) in props)) {
      res[key] = attrs[key];
    }
  }
  return res;
};
function shouldUpdateComponent(prevVNode, nextVNode, optimized) {
  const { props: prevProps, children: prevChildren, component } = prevVNode;
  const { props: nextProps, children: nextChildren, patchFlag } = nextVNode;
  const emits = component.emitsOptions;
  if (nextVNode.dirs || nextVNode.transition) {
    return true;
  }
  if (optimized && patchFlag >= 0) {
    if (patchFlag & 1024) {
      return true;
    }
    if (patchFlag & 16) {
      if (!prevProps) {
        return !!nextProps;
      }
      return hasPropsChanged(prevProps, nextProps, emits);
    } else if (patchFlag & 8) {
      const dynamicProps = nextVNode.dynamicProps;
      for (let i = 0; i < dynamicProps.length; i++) {
        const key = dynamicProps[i];
        if (nextProps[key] !== prevProps[key] && !isEmitListener(emits, key)) {
          return true;
        }
      }
    }
  } else {
    if (prevChildren || nextChildren) {
      if (!nextChildren || !nextChildren.$stable) {
        return true;
      }
    }
    if (prevProps === nextProps) {
      return false;
    }
    if (!prevProps) {
      return !!nextProps;
    }
    if (!nextProps) {
      return true;
    }
    return hasPropsChanged(prevProps, nextProps, emits);
  }
  return false;
}
function hasPropsChanged(prevProps, nextProps, emitsOptions) {
  const nextKeys = Object.keys(nextProps);
  if (nextKeys.length !== Object.keys(prevProps).length) {
    return true;
  }
  for (let i = 0; i < nextKeys.length; i++) {
    const key = nextKeys[i];
    if (nextProps[key] !== prevProps[key] && !isEmitListener(emitsOptions, key)) {
      return true;
    }
  }
  return false;
}
function updateHOCHostEl({ vnode, parent }, el) {
  while (parent && !parent.vapor) {
    const root = parent.subTree;
    if (root.suspense && root.suspense.activeBranch === vnode) {
      root.el = vnode.el;
    }
    if (root === vnode) {
      (vnode = parent.vnode).el = el;
      parent = parent.parent;
    } else {
      break;
    }
  }
}

const isSuspense = (type) => type.__isSuspense;
let suspenseId = 0;
const SuspenseImpl = {
  name: "Suspense",
  // In order to make Suspense tree-shakable, we need to avoid importing it
  // directly in the renderer. The renderer checks for the __isSuspense flag
  // on a vnode's type and calls the `process` method, passing in renderer
  // internals.
  __isSuspense: true,
  process(n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized, rendererInternals) {
    if (n1 == null) {
      mountSuspense(
        n2,
        container,
        anchor,
        parentComponent,
        parentSuspense,
        namespace,
        slotScopeIds,
        optimized,
        rendererInternals
      );
    } else {
      if (parentSuspense && parentSuspense.deps > 0 && !n1.suspense.isInFallback) {
        n2.suspense = n1.suspense;
        n2.suspense.vnode = n2;
        n2.el = n1.el;
        return;
      }
      patchSuspense(
        n1,
        n2,
        container,
        anchor,
        parentComponent,
        namespace,
        slotScopeIds,
        optimized,
        rendererInternals
      );
    }
  },
  hydrate: hydrateSuspense,
  normalize: normalizeSuspenseChildren
};
const Suspense = SuspenseImpl ;
function triggerEvent(vnode, name) {
  const eventListener = vnode.props && vnode.props[name];
  if (isFunction(eventListener)) {
    eventListener();
  }
}
function mountSuspense(vnode, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized, rendererInternals) {
  const {
    p: patch,
    o: { createElement }
  } = rendererInternals;
  const hiddenContainer = createElement("div");
  const suspense = vnode.suspense = createSuspenseBoundary(
    vnode,
    parentSuspense,
    parentComponent,
    container,
    hiddenContainer,
    anchor,
    namespace,
    slotScopeIds,
    optimized,
    rendererInternals
  );
  patch(
    null,
    suspense.pendingBranch = vnode.ssContent,
    hiddenContainer,
    null,
    parentComponent,
    suspense,
    namespace,
    slotScopeIds
  );
  if (suspense.deps > 0) {
    triggerEvent(vnode, "onPending");
    triggerEvent(vnode, "onFallback");
    patch(
      null,
      vnode.ssFallback,
      container,
      anchor,
      parentComponent,
      null,
      // fallback tree will not have suspense context
      namespace,
      slotScopeIds
    );
    setActiveBranch(suspense, vnode.ssFallback);
  } else {
    suspense.resolve(false, true);
  }
}
function patchSuspense(n1, n2, container, anchor, parentComponent, namespace, slotScopeIds, optimized, { p: patch, um: unmount, o: { createElement } }) {
  const suspense = n2.suspense = n1.suspense;
  suspense.vnode = n2;
  n2.el = n1.el;
  const newBranch = n2.ssContent;
  const newFallback = n2.ssFallback;
  const { activeBranch, pendingBranch, isInFallback, isHydrating } = suspense;
  if (pendingBranch) {
    suspense.pendingBranch = newBranch;
    if (isSameVNodeType(newBranch, pendingBranch)) {
      patch(
        pendingBranch,
        newBranch,
        suspense.hiddenContainer,
        null,
        parentComponent,
        suspense,
        namespace,
        slotScopeIds,
        optimized
      );
      if (suspense.deps <= 0) {
        suspense.resolve();
      } else if (isInFallback) {
        if (!isHydrating) {
          patch(
            activeBranch,
            newFallback,
            container,
            anchor,
            parentComponent,
            null,
            // fallback tree will not have suspense context
            namespace,
            slotScopeIds,
            optimized
          );
          setActiveBranch(suspense, newFallback);
        }
      }
    } else {
      suspense.pendingId = suspenseId++;
      if (isHydrating) {
        suspense.isHydrating = false;
        suspense.activeBranch = pendingBranch;
      } else {
        unmount(pendingBranch, parentComponent, suspense);
      }
      suspense.deps = 0;
      suspense.effects.length = 0;
      suspense.hiddenContainer = createElement("div");
      if (isInFallback) {
        patch(
          null,
          newBranch,
          suspense.hiddenContainer,
          null,
          parentComponent,
          suspense,
          namespace,
          slotScopeIds,
          optimized
        );
        if (suspense.deps <= 0) {
          suspense.resolve();
        } else {
          patch(
            activeBranch,
            newFallback,
            container,
            anchor,
            parentComponent,
            null,
            // fallback tree will not have suspense context
            namespace,
            slotScopeIds,
            optimized
          );
          setActiveBranch(suspense, newFallback);
        }
      } else if (activeBranch && isSameVNodeType(newBranch, activeBranch)) {
        patch(
          activeBranch,
          newBranch,
          container,
          anchor,
          parentComponent,
          suspense,
          namespace,
          slotScopeIds,
          optimized
        );
        suspense.resolve(true);
      } else {
        patch(
          null,
          newBranch,
          suspense.hiddenContainer,
          null,
          parentComponent,
          suspense,
          namespace,
          slotScopeIds,
          optimized
        );
        if (suspense.deps <= 0) {
          suspense.resolve();
        }
      }
    }
  } else {
    if (activeBranch && isSameVNodeType(newBranch, activeBranch)) {
      patch(
        activeBranch,
        newBranch,
        container,
        anchor,
        parentComponent,
        suspense,
        namespace,
        slotScopeIds,
        optimized
      );
      setActiveBranch(suspense, newBranch);
    } else {
      triggerEvent(n2, "onPending");
      suspense.pendingBranch = newBranch;
      if (newBranch.shapeFlag & 512) {
        suspense.pendingId = newBranch.component.suspenseId;
      } else {
        suspense.pendingId = suspenseId++;
      }
      patch(
        null,
        newBranch,
        suspense.hiddenContainer,
        null,
        parentComponent,
        suspense,
        namespace,
        slotScopeIds,
        optimized
      );
      if (suspense.deps <= 0) {
        suspense.resolve();
      } else {
        const { timeout, pendingId } = suspense;
        if (timeout > 0) {
          setTimeout(() => {
            if (suspense.pendingId === pendingId) {
              suspense.fallback(newFallback);
            }
          }, timeout);
        } else if (timeout === 0) {
          suspense.fallback(newFallback);
        }
      }
    }
  }
}
function createSuspenseBoundary(vnode, parentSuspense, parentComponent, container, hiddenContainer, anchor, namespace, slotScopeIds, optimized, rendererInternals, isHydrating = false) {
  const {
    p: patch,
    m: move,
    um: unmount,
    n: next,
    o: { parentNode, remove }
  } = rendererInternals;
  let parentSuspenseId;
  const isSuspensible = isVNodeSuspensible(vnode);
  if (isSuspensible) {
    if (parentSuspense && parentSuspense.pendingBranch) {
      parentSuspenseId = parentSuspense.pendingId;
      parentSuspense.deps++;
    }
  }
  const timeout = vnode.props ? toNumber(vnode.props.timeout) : void 0;
  const initialAnchor = anchor;
  const suspense = {
    vnode,
    parent: parentSuspense,
    parentComponent,
    namespace,
    container,
    hiddenContainer,
    deps: 0,
    pendingId: suspenseId++,
    timeout: typeof timeout === "number" ? timeout : -1,
    activeBranch: null,
    pendingBranch: null,
    isInFallback: !isHydrating,
    isHydrating,
    isUnmounted: false,
    effects: [],
    resolve(resume = false, sync = false) {
      const {
        vnode: vnode2,
        activeBranch,
        pendingBranch,
        pendingId,
        effects,
        parentComponent: parentComponent2,
        container: container2
      } = suspense;
      let delayEnter = false;
      if (suspense.isHydrating) {
        suspense.isHydrating = false;
      } else if (!resume) {
        delayEnter = activeBranch && pendingBranch.transition && pendingBranch.transition.mode === "out-in";
        if (delayEnter) {
          activeBranch.transition.afterLeave = () => {
            if (pendingId === suspense.pendingId) {
              move(
                pendingBranch,
                container2,
                anchor === initialAnchor ? next(activeBranch) : anchor,
                0,
                parentComponent2
              );
              queuePostFlushCb(effects);
            }
          };
        }
        if (activeBranch) {
          if (parentNode(activeBranch.el) === container2) {
            anchor = next(activeBranch);
          }
          unmount(activeBranch, parentComponent2, suspense, true);
        }
        if (!delayEnter) {
          move(
            pendingBranch,
            container2,
            anchor,
            0,
            parentComponent2
          );
        }
      }
      setActiveBranch(suspense, pendingBranch);
      suspense.pendingBranch = null;
      suspense.isInFallback = false;
      let parent = suspense.parent;
      let hasUnresolvedAncestor = false;
      while (parent) {
        if (parent.pendingBranch) {
          parent.effects.push(...effects);
          hasUnresolvedAncestor = true;
          break;
        }
        parent = parent.parent;
      }
      if (!hasUnresolvedAncestor && !delayEnter) {
        queuePostFlushCb(effects);
      }
      suspense.effects = [];
      if (isSuspensible) {
        if (parentSuspense && parentSuspense.pendingBranch && parentSuspenseId === parentSuspense.pendingId) {
          parentSuspense.deps--;
          if (parentSuspense.deps === 0 && !sync) {
            parentSuspense.resolve();
          }
        }
      }
      triggerEvent(vnode2, "onResolve");
    },
    fallback(fallbackVNode) {
      if (!suspense.pendingBranch) {
        return;
      }
      const { vnode: vnode2, activeBranch, parentComponent: parentComponent2, container: container2, namespace: namespace2 } = suspense;
      triggerEvent(vnode2, "onFallback");
      const anchor2 = next(activeBranch);
      const mountFallback = () => {
        if (!suspense.isInFallback) {
          return;
        }
        patch(
          null,
          fallbackVNode,
          container2,
          anchor2,
          parentComponent2,
          null,
          // fallback tree will not have suspense context
          namespace2,
          slotScopeIds,
          optimized
        );
        setActiveBranch(suspense, fallbackVNode);
      };
      const delayEnter = fallbackVNode.transition && fallbackVNode.transition.mode === "out-in";
      if (delayEnter) {
        activeBranch.transition.afterLeave = mountFallback;
      }
      suspense.isInFallback = true;
      unmount(
        activeBranch,
        parentComponent2,
        null,
        // no suspense so unmount hooks fire now
        true
        // shouldRemove
      );
      if (!delayEnter) {
        mountFallback();
      }
    },
    move(container2, anchor2, type) {
      suspense.activeBranch && move(suspense.activeBranch, container2, anchor2, type, parentComponent);
      suspense.container = container2;
    },
    next() {
      return suspense.activeBranch && next(suspense.activeBranch);
    },
    registerDep(instance, setupRenderEffect, optimized2) {
      const isInPendingSuspense = !!suspense.pendingBranch;
      if (isInPendingSuspense) {
        suspense.deps++;
      }
      const hydratedEl = instance.vnode.el;
      instance.asyncDep.catch((err) => {
        handleError(err, instance, 0);
      }).then((asyncSetupResult) => {
        if (instance.isUnmounted || suspense.isUnmounted || suspense.pendingId !== instance.suspenseId) {
          return;
        }
        instance.asyncResolved = true;
        const { vnode: vnode2 } = instance;
        handleSetupResult(instance, asyncSetupResult, false);
        if (hydratedEl) {
          vnode2.el = hydratedEl;
        }
        const placeholder = !hydratedEl && instance.subTree.el;
        setupRenderEffect(
          instance,
          vnode2,
          // component may have been moved before resolve.
          // if this is not a hydration, instance.subTree will be the comment
          // placeholder.
          parentNode(hydratedEl || instance.subTree.el),
          // anchor will not be used if this is hydration, so only need to
          // consider the comment placeholder case.
          hydratedEl ? null : next(instance.subTree),
          suspense,
          namespace,
          optimized2
        );
        if (placeholder) {
          remove(placeholder);
        }
        updateHOCHostEl(instance, vnode2.el);
        if (isInPendingSuspense && --suspense.deps === 0) {
          suspense.resolve();
        }
      });
    },
    unmount(parentSuspense2, doRemove) {
      suspense.isUnmounted = true;
      if (suspense.activeBranch) {
        unmount(
          suspense.activeBranch,
          parentComponent,
          parentSuspense2,
          doRemove
        );
      }
      if (suspense.pendingBranch) {
        unmount(
          suspense.pendingBranch,
          parentComponent,
          parentSuspense2,
          doRemove
        );
      }
    }
  };
  return suspense;
}
function hydrateSuspense(node, vnode, parentComponent, parentSuspense, namespace, slotScopeIds, optimized, rendererInternals, hydrateNode) {
  const suspense = vnode.suspense = createSuspenseBoundary(
    vnode,
    parentSuspense,
    parentComponent,
    node.parentNode,
    // eslint-disable-next-line no-restricted-globals
    document.createElement("div"),
    null,
    namespace,
    slotScopeIds,
    optimized,
    rendererInternals,
    true
  );
  const result = hydrateNode(
    node,
    suspense.pendingBranch = vnode.ssContent,
    parentComponent,
    suspense,
    slotScopeIds,
    optimized
  );
  if (suspense.deps === 0) {
    suspense.resolve(false, true);
  }
  return result;
}
function normalizeSuspenseChildren(vnode) {
  const { shapeFlag, children } = vnode;
  const isSlotChildren = shapeFlag & 32;
  vnode.ssContent = normalizeSuspenseSlot(
    isSlotChildren ? children.default : children
  );
  vnode.ssFallback = isSlotChildren ? normalizeSuspenseSlot(children.fallback) : createVNode(Comment$1);
}
function normalizeSuspenseSlot(s) {
  let block;
  if (isFunction(s)) {
    const trackBlock = isBlockTreeEnabled && s._c;
    if (trackBlock) {
      s._d = false;
      openBlock();
    }
    s = s();
    if (trackBlock) {
      s._d = true;
      block = currentBlock;
      closeBlock();
    }
  }
  if (isArray(s)) {
    const singleChild = filterSingleRoot(s);
    s = singleChild;
  }
  s = normalizeVNode(s);
  if (block && !s.dynamicChildren) {
    s.dynamicChildren = block.filter((c) => c !== s);
  }
  return s;
}
function queueEffectWithSuspense(fn, id, suspense) {
  if (suspense && suspense.pendingBranch) {
    if (isArray(fn)) {
      suspense.effects.push(...fn);
    } else {
      suspense.effects.push(fn);
    }
  } else {
    queuePostFlushCb(fn, id);
  }
}
function setActiveBranch(suspense, branch) {
  suspense.activeBranch = branch;
  const { vnode, parentComponent } = suspense;
  let el = branch.el;
  while (!el && branch.component) {
    branch = branch.component.subTree;
    el = branch.el;
  }
  vnode.el = el;
  if (parentComponent && parentComponent.subTree === vnode) {
    parentComponent.vnode.el = el;
    updateHOCHostEl(parentComponent, el);
  }
}
function isVNodeSuspensible(vnode) {
  const suspensible = vnode.props && vnode.props.suspensible;
  return suspensible != null && suspensible !== false;
}

const Fragment = Symbol.for("v-fgt");
const Text$1 = Symbol.for("v-txt");
const Comment$1 = Symbol.for("v-cmt");
const Static = Symbol.for("v-stc");
const VaporSlot = Symbol.for("v-vps");
const blockStack = [];
let currentBlock = null;
function openBlock(disableTracking = false) {
  blockStack.push(currentBlock = disableTracking ? null : []);
}
function closeBlock() {
  blockStack.pop();
  currentBlock = blockStack[blockStack.length - 1] || null;
}
let isBlockTreeEnabled = 1;
function setBlockTracking(value, inVOnce = false) {
  isBlockTreeEnabled += value;
  if (value < 0 && currentBlock && inVOnce) {
    currentBlock.hasOnce = true;
  }
}
function setupBlock(vnode) {
  vnode.dynamicChildren = isBlockTreeEnabled > 0 ? currentBlock || EMPTY_ARR : null;
  closeBlock();
  if (isBlockTreeEnabled > 0 && currentBlock) {
    currentBlock.push(vnode);
  }
  return vnode;
}
function createElementBlock(type, props, children, patchFlag, dynamicProps, shapeFlag) {
  return setupBlock(
    createBaseVNode(
      type,
      props,
      children,
      patchFlag,
      dynamicProps,
      shapeFlag,
      true
    )
  );
}
function createBlock(type, props, children, patchFlag, dynamicProps) {
  return setupBlock(
    createVNode(
      type,
      props,
      children,
      patchFlag,
      dynamicProps,
      true
    )
  );
}
function isVNode(value) {
  return value ? value.__v_isVNode === true : false;
}
function isSameVNodeType(n1, n2) {
  return n1.type === n2.type && n1.key === n2.key;
}
function transformVNodeArgs(transformer) {
}
const normalizeKey = ({ key }) => key != null ? key : null;
const normalizeRef = ({
  ref,
  ref_key,
  ref_for
}) => {
  if (typeof ref === "number") {
    ref = "" + ref;
  }
  return ref != null ? isString(ref) || isRef(ref) || isFunction(ref) ? { i: currentRenderingInstance, r: ref, k: ref_key, f: !!ref_for } : ref : null;
};
function createBaseVNode(type, props = null, children = null, patchFlag = 0, dynamicProps = null, shapeFlag = type === Fragment ? 0 : 1, isBlockNode = false, needFullChildrenNormalization = false) {
  const vnode = {
    __v_isVNode: true,
    __v_skip: true,
    type,
    props,
    key: props && normalizeKey(props),
    ref: props && normalizeRef(props),
    scopeId: currentScopeId,
    slotScopeIds: null,
    children,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetStart: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag,
    patchFlag,
    dynamicProps,
    dynamicChildren: null,
    appContext: null,
    ctx: currentRenderingInstance
  };
  if (needFullChildrenNormalization) {
    normalizeChildren(vnode, children);
    if (shapeFlag & 128) {
      type.normalize(vnode);
    }
  } else if (children) {
    vnode.shapeFlag |= isString(children) ? 8 : 16;
  }
  if (isBlockTreeEnabled > 0 && // avoid a block node from tracking itself
  !isBlockNode && // has current parent block
  currentBlock && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (vnode.patchFlag > 0 || shapeFlag & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  vnode.patchFlag !== 32) {
    currentBlock.push(vnode);
  }
  return vnode;
}
const createVNode = _createVNode;
function _createVNode(type, props = null, children = null, patchFlag = 0, dynamicProps = null, isBlockNode = false) {
  if (!type || type === NULL_DYNAMIC_COMPONENT) {
    type = Comment$1;
  }
  if (isVNode(type)) {
    const cloned = cloneVNode(
      type,
      props,
      true
      /* mergeRef: true */
    );
    if (children) {
      normalizeChildren(cloned, children);
    }
    if (isBlockTreeEnabled > 0 && !isBlockNode && currentBlock) {
      if (cloned.shapeFlag & 6) {
        currentBlock[currentBlock.indexOf(type)] = cloned;
      } else {
        currentBlock.push(cloned);
      }
    }
    cloned.patchFlag = -2;
    return cloned;
  }
  if (isClassComponent(type)) {
    type = type.__vccOpts;
  }
  if (props) {
    props = guardReactiveProps(props);
    let { class: klass, style } = props;
    if (klass && !isString(klass)) {
      props.class = normalizeClass(klass);
    }
    if (isObject(style)) {
      if (isProxy(style) && !isArray(style)) {
        style = extend({}, style);
      }
      props.style = normalizeStyle(style);
    }
  }
  const shapeFlag = isString(type) ? 1 : isSuspense(type) ? 128 : isTeleport(type) ? 64 : isObject(type) ? 4 : isFunction(type) ? 2 : 0;
  return createBaseVNode(
    type,
    props,
    children,
    patchFlag,
    dynamicProps,
    shapeFlag,
    isBlockNode,
    true
  );
}
function guardReactiveProps(props) {
  if (!props) return null;
  return isProxy(props) || isInternalObject(props) ? extend({}, props) : props;
}
function cloneVNode(vnode, extraProps, mergeRef = false, cloneTransition = false) {
  const { props, ref, patchFlag, children, transition } = vnode;
  const mergedProps = extraProps ? mergeProps(props || {}, extraProps) : props;
  const cloned = {
    __v_isVNode: true,
    __v_skip: true,
    type: vnode.type,
    props: mergedProps,
    key: mergedProps && normalizeKey(mergedProps),
    ref: extraProps && extraProps.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      mergeRef && ref ? isArray(ref) ? ref.concat(normalizeRef(extraProps)) : [ref, normalizeRef(extraProps)] : normalizeRef(extraProps)
    ) : ref,
    scopeId: vnode.scopeId,
    slotScopeIds: vnode.slotScopeIds,
    children: children,
    target: vnode.target,
    targetStart: vnode.targetStart,
    targetAnchor: vnode.targetAnchor,
    staticCount: vnode.staticCount,
    shapeFlag: vnode.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: extraProps && vnode.type !== Fragment ? patchFlag === -1 ? 16 : patchFlag | 16 : patchFlag,
    dynamicProps: vnode.dynamicProps,
    dynamicChildren: vnode.dynamicChildren,
    appContext: vnode.appContext,
    dirs: vnode.dirs,
    transition,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: vnode.component,
    suspense: vnode.suspense,
    ssContent: vnode.ssContent && cloneVNode(vnode.ssContent),
    ssFallback: vnode.ssFallback && cloneVNode(vnode.ssFallback),
    placeholder: vnode.placeholder,
    el: vnode.el,
    anchor: vnode.anchor,
    ctx: vnode.ctx,
    ce: vnode.ce
  };
  if (transition && cloneTransition) {
    setTransitionHooks$1(
      cloned,
      transition.clone(cloned)
    );
  }
  return cloned;
}
function createTextVNode(text = " ", flag = 0) {
  return createVNode(Text$1, null, text, flag);
}
function createStaticVNode(content, numberOfNodes) {
  const vnode = createVNode(Static, null, content);
  vnode.staticCount = numberOfNodes;
  return vnode;
}
function createCommentVNode(text = "", asBlock = false) {
  return asBlock ? (openBlock(), createBlock(Comment$1, null, text)) : createVNode(Comment$1, null, text);
}
function normalizeVNode(child) {
  if (child == null || typeof child === "boolean") {
    return createVNode(Comment$1);
  } else if (isArray(child)) {
    return createVNode(
      Fragment,
      null,
      // #3666, avoid reference pollution when reusing vnode
      child.slice()
    );
  } else if (isVNode(child)) {
    return cloneIfMounted(child);
  } else {
    return createVNode(Text$1, null, String(child));
  }
}
function cloneIfMounted(child) {
  return child.el === null && child.patchFlag !== -1 || child.memo ? child : cloneVNode(child);
}
function normalizeChildren(vnode, children) {
  let type = 0;
  const { shapeFlag } = vnode;
  if (children == null) {
    children = null;
  } else if (isArray(children)) {
    type = 16;
  } else if (typeof children === "object") {
    if (shapeFlag & (1 | 64)) {
      const slot = children.default;
      if (slot) {
        slot._c && (slot._d = false);
        normalizeChildren(vnode, slot());
        slot._c && (slot._d = true);
      }
      return;
    } else {
      type = 32;
      const slotFlag = children._;
      if (!slotFlag && !isInternalObject(children)) {
        children._ctx = currentRenderingInstance;
      } else if (slotFlag === 3 && currentRenderingInstance) {
        if (currentRenderingInstance.slots._ === 1) {
          children._ = 1;
        } else {
          children._ = 2;
          vnode.patchFlag |= 1024;
        }
      }
    }
  } else if (isFunction(children)) {
    children = { default: children, _ctx: currentRenderingInstance };
    type = 32;
  } else {
    children = String(children);
    if (shapeFlag & 64) {
      type = 16;
      children = [createTextVNode(children)];
    } else {
      type = 8;
    }
  }
  vnode.children = children;
  vnode.shapeFlag |= type;
}
function mergeProps(...args) {
  const ret = {};
  for (let i = 0; i < args.length; i++) {
    const toMerge = args[i];
    for (const key in toMerge) {
      if (key === "class") {
        if (ret.class !== toMerge.class) {
          ret.class = normalizeClass([ret.class, toMerge.class]);
        }
      } else if (key === "style") {
        ret.style = normalizeStyle([ret.style, toMerge.style]);
      } else if (isOn(key)) {
        const existing = ret[key];
        const incoming = toMerge[key];
        if (incoming && existing !== incoming && !(isArray(existing) && existing.includes(incoming))) {
          ret[key] = existing ? [].concat(existing, incoming) : incoming;
        }
      } else if (key !== "") {
        ret[key] = toMerge[key];
      }
    }
  }
  return ret;
}
function invokeVNodeHook(hook, instance, vnode, prevVNode = null) {
  callWithAsyncErrorHandling(hook, instance, 7, [
    vnode,
    prevVNode
  ]);
}

let currentInstance = null;
const getCurrentGenericInstance = () => currentInstance || currentRenderingInstance;
const getCurrentInstance = () => currentInstance && !currentInstance.vapor ? currentInstance : currentRenderingInstance;
let isInSSRComponentSetup = false;
let setInSSRSetupState;
let simpleSetCurrentInstance;
{
  const g = getGlobalThis();
  const registerGlobalSetter = (key, setter) => {
    let setters;
    if (!(setters = g[key])) setters = g[key] = [];
    setters.push(setter);
    return (v) => {
      if (setters.length > 1) setters.forEach((set) => set(v));
      else setters[0](v);
    };
  };
  simpleSetCurrentInstance = registerGlobalSetter(
    `__VUE_INSTANCE_SETTERS__`,
    (v) => currentInstance = v
  );
  setInSSRSetupState = registerGlobalSetter(
    `__VUE_SSR_SETTERS__`,
    (v) => isInSSRComponentSetup = v
  );
}
const setCurrentInstance = (instance, scope = instance !== null ? instance.scope : void 0) => {
  try {
    return [currentInstance, setCurrentScope(scope)];
  } finally {
    simpleSetCurrentInstance(instance);
  }
};

const emptyAppContext = createAppContext();
let uid = 0;
function nextUid() {
  return uid++;
}
function createComponentInstance(vnode, parent, suspense) {
  const type = vnode.type;
  const appContext = (parent ? parent.appContext : vnode.appContext) || emptyAppContext;
  const instance = {
    uid: uid++,
    vnode,
    type,
    parent,
    appContext,
    root: null,
    // to be immediately set
    next: null,
    subTree: null,
    // will be set synchronously right after creation
    effect: null,
    update: null,
    // will be set synchronously right after creation
    job: null,
    scope: new EffectScope(
      true
      /* detached */
    ),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: parent ? parent.provides : Object.create(appContext.provides),
    ids: parent ? parent.ids : ["", 0, 0],
    accessCache: null,
    renderCache: [],
    // local resolved assets
    components: null,
    directives: null,
    // resolved props and emits options
    propsOptions: normalizePropsOptions$1(type, appContext),
    emitsOptions: normalizeEmitsOptions$1(type, appContext),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: null,
    // inheritAttrs
    inheritAttrs: type.inheritAttrs,
    // state
    ctx: EMPTY_OBJ,
    data: EMPTY_OBJ,
    props: EMPTY_OBJ,
    attrs: EMPTY_OBJ,
    slots: EMPTY_OBJ,
    refs: EMPTY_OBJ,
    setupState: EMPTY_OBJ,
    setupContext: null,
    // suspense related
    suspense,
    suspenseId: suspense ? suspense.pendingId : 0,
    asyncDep: null,
    asyncResolved: false,
    // lifecycle hooks
    // not using enums here because it results in computed properties
    isMounted: false,
    isUnmounted: false,
    isDeactivated: false,
    bc: null,
    c: null,
    bm: null,
    m: null,
    bu: null,
    u: null,
    um: null,
    bum: null,
    da: null,
    a: null,
    rtg: null,
    rtc: null,
    ec: null,
    sp: null
  };
  {
    instance.ctx = { _: instance };
  }
  instance.root = parent ? parent.root : instance;
  instance.emit = emit$1.bind(null, instance);
  if (vnode.ce) {
    vnode.ce(instance);
  }
  return instance;
}
function validateComponentName(name, { isNativeTag }) {
  if (isBuiltInTag(name) || isNativeTag(name)) {
    warn$2(
      "Do not use built-in or reserved HTML elements as component id: " + name
    );
  }
}
function isStatefulComponent(instance) {
  return instance.vnode.shapeFlag & 4;
}
function setupComponent$1(instance, isSSR = false, optimized = false) {
  isSSR && setInSSRSetupState(isSSR);
  const { props, children, vi } = instance.vnode;
  const isStateful = isStatefulComponent(instance);
  if (vi) {
    vi(instance);
  } else {
    initProps(instance, props, isStateful, isSSR);
    initSlots(instance, children, optimized || isSSR);
  }
  const setupResult = isStateful ? setupStatefulComponent(instance, isSSR) : void 0;
  isSSR && setInSSRSetupState(false);
  return setupResult;
}
function setupStatefulComponent(instance, isSSR) {
  const Component = instance.type;
  instance.accessCache = /* @__PURE__ */ Object.create(null);
  instance.proxy = new Proxy(instance.ctx, PublicInstanceProxyHandlers);
  const { setup } = Component;
  if (setup) {
    const prevSub = setActiveSub();
    const setupContext = instance.setupContext = setup.length > 1 ? createSetupContext(instance) : null;
    const prev = setCurrentInstance(instance);
    const setupResult = callWithErrorHandling(
      setup,
      instance,
      0,
      [
        instance.props,
        setupContext
      ]
    );
    const isAsyncSetup = isPromise(setupResult);
    setActiveSub(prevSub);
    setCurrentInstance(...prev);
    if ((isAsyncSetup || instance.sp) && !isAsyncWrapper(instance)) {
      markAsyncBoundary(instance);
    }
    if (isAsyncSetup) {
      const unsetCurrentInstance = () => {
        setCurrentInstance(null, void 0);
      };
      setupResult.then(unsetCurrentInstance, unsetCurrentInstance);
      if (isSSR) {
        return setupResult.then((resolvedResult) => {
          handleSetupResult(instance, resolvedResult, isSSR);
        }).catch((e) => {
          handleError(e, instance, 0);
        });
      } else {
        instance.asyncDep = setupResult;
      }
    } else {
      handleSetupResult(instance, setupResult, isSSR);
    }
  } else {
    finishComponentSetup(instance, isSSR);
  }
}
function handleSetupResult(instance, setupResult, isSSR) {
  if (isFunction(setupResult)) {
    if (instance.type.__ssrInlineRender) {
      instance.ssrRender = setupResult;
    } else {
      instance.render = setupResult;
    }
  } else if (isObject(setupResult)) {
    instance.setupState = proxyRefs(setupResult);
  } else ;
  finishComponentSetup(instance, isSSR);
}
let compile$1;
let installWithProxy;
function registerRuntimeCompiler(_compile) {
  compile$1 = _compile;
  installWithProxy = (i) => {
    if (i.render._rc) {
      i.withProxy = new Proxy(i.ctx, RuntimeCompiledPublicInstanceProxyHandlers);
    }
  };
}
const isRuntimeOnly = () => !compile$1;
function finishComponentSetup(instance, isSSR, skipOptions) {
  const Component = instance.type;
  if (!instance.render) {
    if (!isSSR && compile$1 && !Component.render) {
      const template = Component.template || resolveMergedOptions(instance).template;
      if (template) {
        const { isCustomElement, compilerOptions } = instance.appContext.config;
        const { delimiters, compilerOptions: componentCompilerOptions } = Component;
        const finalCompilerOptions = extend(
          extend(
            {
              isCustomElement,
              delimiters
            },
            compilerOptions
          ),
          componentCompilerOptions
        );
        Component.render = compile$1(template, finalCompilerOptions);
      }
    }
    instance.render = Component.render || NOOP;
    if (installWithProxy) {
      installWithProxy(instance);
    }
  }
  {
    const prevInstance = setCurrentInstance(instance);
    const prevSub = setActiveSub();
    try {
      applyOptions(instance);
    } finally {
      setActiveSub(prevSub);
      setCurrentInstance(...prevInstance);
    }
  }
}
const attrsProxyHandlers = {
  get(target, key) {
    track(target, "get", "");
    return target[key];
  }
};
function createSetupContext(instance) {
  {
    return {
      attrs: new Proxy(instance.attrs, attrsProxyHandlers),
      slots: instance.slots,
      emit: instance.emit,
      expose: (exposed) => expose(instance, exposed)
    };
  }
}
function expose(instance, exposed) {
  instance.exposed = exposed || {};
}
function getComponentPublicInstance(instance) {
  if (instance.exposed) {
    return instance.exposeProxy || (instance.exposeProxy = new Proxy(proxyRefs(markRaw(instance.exposed)), {
      get(target, key) {
        if (key in target) {
          return target[key];
        } else if (key in publicPropertiesMap) {
          return publicPropertiesMap[key](
            instance
          );
        }
      },
      has(target, key) {
        return key in target || key in publicPropertiesMap;
      }
    }));
  } else {
    return instance.proxy;
  }
}
const classifyRE = /(?:^|[-_])(\w)/g;
const classify = (str) => str.replace(classifyRE, (c) => c.toUpperCase()).replace(/[-_]/g, "");
function getComponentName(Component, includeInferred = true) {
  return isFunction(Component) ? Component.displayName || Component.name : Component.name || includeInferred && Component.__name;
}
function formatComponentName(instance, Component, isRoot = false) {
  let name = getComponentName(Component);
  if (!name && Component.__file) {
    const match = Component.__file.match(/([^/\\]+)\.\w+$/);
    if (match) {
      name = match[1];
    }
  }
  if (!name && instance && instance.parent) {
    const inferFromRegistry = (registry) => {
      for (const key in registry) {
        if (registry[key] === Component) {
          return key;
        }
      }
    };
    name = inferFromRegistry(
      instance.components || instance.parent.type.components
    ) || inferFromRegistry(instance.appContext.components);
  }
  return name ? classify(name) : isRoot ? `App` : `Anonymous`;
}
function isClassComponent(value) {
  return isFunction(value) && "__vccOpts" in value;
}

const computed = (getterOrOptions, debugOptions) => {
  return computed$1(getterOrOptions, debugOptions, isInSSRComponentSetup);
};

function h(type, propsOrChildren, children) {
  const l = arguments.length;
  if (l === 2) {
    if (isObject(propsOrChildren) && !isArray(propsOrChildren)) {
      if (isVNode(propsOrChildren)) {
        return createVNode(type, null, [propsOrChildren]);
      }
      return createVNode(type, propsOrChildren);
    } else {
      return createVNode(type, null, propsOrChildren);
    }
  } else {
    if (l > 3) {
      children = Array.prototype.slice.call(arguments, 2);
    } else if (l === 3 && isVNode(children)) {
      children = [children];
    }
    return createVNode(type, propsOrChildren, children);
  }
}

function initCustomFormatter() {
  {
    return;
  }
}

function withMemo(memo, render, cache, index) {
  const cached = cache[index];
  if (cached && isMemoSame(cached, memo)) {
    return cached;
  }
  const ret = render();
  ret.memo = memo.slice();
  ret.cacheIndex = index;
  return cache[index] = ret;
}
function isMemoSame(cached, memo) {
  const prev = cached.memo;
  if (prev.length != memo.length) {
    return false;
  }
  for (let i = 0; i < prev.length; i++) {
    if (hasChanged(prev[i], memo[i])) {
      return false;
    }
  }
  if (isBlockTreeEnabled > 0 && currentBlock) {
    currentBlock.push(cached);
  }
  return true;
}

const version = "3.6.0-alpha.2";
const warn$1 = NOOP;
const ErrorTypeStrings = null;
const devtools = void 0;
const setDevtoolsHook = NOOP;
const _ssrUtils = {
  createComponentInstance,
  setupComponent: setupComponent$1,
  renderComponentRoot,
  setCurrentRenderingInstance,
  isVNode: isVNode,
  normalizeVNode,
  getComponentPublicInstance,
  ensureValidVNode,
  pushWarningContext,
  popWarningContext
};
const ssrUtils = _ssrUtils ;
const resolveFilter = null;
const compatUtils = null;
const DeprecationTypes = null;

let policy = void 0;
const tt = typeof window !== "undefined" && window.trustedTypes;
if (tt) {
  try {
    policy = /* @__PURE__ */ tt.createPolicy("vue", {
      createHTML: (val) => val
    });
  } catch (e) {
  }
}
const unsafeToTrustedHTML = policy ? (val) => policy.createHTML(val) : (val) => val;
const svgNS = "http://www.w3.org/2000/svg";
const mathmlNS = "http://www.w3.org/1998/Math/MathML";
const doc = typeof document !== "undefined" ? document : null;
const templateContainer = doc && /* @__PURE__ */ doc.createElement("template");
const nodeOps = {
  insert: (child, parent, anchor) => {
    parent.insertBefore(child, anchor || null);
  },
  remove: (child) => {
    const parent = child.parentNode;
    if (parent) {
      parent.removeChild(child);
    }
  },
  createElement: (tag, namespace, is, props) => {
    const el = namespace === "svg" ? doc.createElementNS(svgNS, tag) : namespace === "mathml" ? doc.createElementNS(mathmlNS, tag) : is ? doc.createElement(tag, { is }) : doc.createElement(tag);
    if (tag === "select" && props && props.multiple != null) {
      el.setAttribute("multiple", props.multiple);
    }
    return el;
  },
  createText: (text) => doc.createTextNode(text),
  createComment: (text) => doc.createComment(text),
  setText: (node, text) => {
    node.nodeValue = text;
  },
  setElementText: (el, text) => {
    el.textContent = text;
  },
  parentNode: (node) => node.parentNode,
  nextSibling: (node) => node.nextSibling,
  querySelector: (selector) => doc.querySelector(selector),
  setScopeId(el, id) {
    el.setAttribute(id, "");
  },
  // __UNSAFE__
  // Reason: innerHTML.
  // Static content here can only come from compiled templates.
  // As long as the user only uses trusted templates, this is safe.
  insertStaticContent(content, parent, anchor, namespace, start, end) {
    const before = anchor ? anchor.previousSibling : parent.lastChild;
    if (start && (start === end || start.nextSibling)) {
      while (true) {
        parent.insertBefore(start.cloneNode(true), anchor);
        if (start === end || !(start = start.nextSibling)) break;
      }
    } else {
      templateContainer.innerHTML = unsafeToTrustedHTML(
        namespace === "svg" ? `<svg>${content}</svg>` : namespace === "mathml" ? `<math>${content}</math>` : content
      );
      const template = templateContainer.content;
      if (namespace === "svg" || namespace === "mathml") {
        const wrapper = template.firstChild;
        while (wrapper.firstChild) {
          template.appendChild(wrapper.firstChild);
        }
        template.removeChild(wrapper);
      }
      parent.insertBefore(template, anchor);
    }
    return [
      // first
      before ? before.nextSibling : parent.firstChild,
      // last
      anchor ? anchor.previousSibling : parent.lastChild
    ];
  }
};

const TRANSITION = "transition";
const ANIMATION = "animation";
const vtcKey = Symbol("_vtc");
const DOMTransitionPropsValidators = {
  name: String,
  type: String,
  css: {
    type: Boolean,
    default: true
  },
  duration: [String, Number, Object],
  enterFromClass: String,
  enterActiveClass: String,
  enterToClass: String,
  appearFromClass: String,
  appearActiveClass: String,
  appearToClass: String,
  leaveFromClass: String,
  leaveActiveClass: String,
  leaveToClass: String
};
const TransitionPropsValidators = /* @__PURE__ */ extend(
  {},
  BaseTransitionPropsValidators,
  DOMTransitionPropsValidators
);
const decorate$3 = (t) => {
  t.displayName = "Transition";
  t.props = TransitionPropsValidators;
  return t;
};
const Transition = /* @__PURE__ */ decorate$3(
  (props, { slots }) => h(BaseTransition, resolveTransitionProps(props), slots)
);
const callHook = (hook, args = []) => {
  if (isArray(hook)) {
    hook.forEach((h2) => h2(...args));
  } else if (hook) {
    hook(...args);
  }
};
const hasExplicitCallback = (hook) => {
  return hook ? isArray(hook) ? hook.some((h2) => h2.length > 1) : hook.length > 1 : false;
};
function resolveTransitionProps(rawProps) {
  const baseProps = {};
  for (const key in rawProps) {
    if (!(key in DOMTransitionPropsValidators)) {
      baseProps[key] = rawProps[key];
    }
  }
  if (rawProps.css === false) {
    return baseProps;
  }
  const {
    name = "v",
    type,
    duration,
    enterFromClass = `${name}-enter-from`,
    enterActiveClass = `${name}-enter-active`,
    enterToClass = `${name}-enter-to`,
    appearFromClass = enterFromClass,
    appearActiveClass = enterActiveClass,
    appearToClass = enterToClass,
    leaveFromClass = `${name}-leave-from`,
    leaveActiveClass = `${name}-leave-active`,
    leaveToClass = `${name}-leave-to`
  } = rawProps;
  const durations = normalizeDuration(duration);
  const enterDuration = durations && durations[0];
  const leaveDuration = durations && durations[1];
  const {
    onBeforeEnter,
    onEnter,
    onEnterCancelled,
    onLeave,
    onLeaveCancelled,
    onBeforeAppear = onBeforeEnter,
    onAppear = onEnter,
    onAppearCancelled = onEnterCancelled
  } = baseProps;
  const finishEnter = (el, isAppear, done, isCancelled) => {
    el._enterCancelled = isCancelled;
    removeTransitionClass(el, isAppear ? appearToClass : enterToClass);
    removeTransitionClass(el, isAppear ? appearActiveClass : enterActiveClass);
    done && done();
  };
  const finishLeave = (el, done) => {
    el._isLeaving = false;
    removeTransitionClass(el, leaveFromClass);
    removeTransitionClass(el, leaveToClass);
    removeTransitionClass(el, leaveActiveClass);
    done && done();
  };
  const makeEnterHook = (isAppear) => {
    return (el, done) => {
      const hook = isAppear ? onAppear : onEnter;
      const resolve = () => finishEnter(el, isAppear, done);
      callHook(hook, [el, resolve]);
      nextFrame(() => {
        removeTransitionClass(el, isAppear ? appearFromClass : enterFromClass);
        addTransitionClass(el, isAppear ? appearToClass : enterToClass);
        if (!hasExplicitCallback(hook)) {
          whenTransitionEnds(el, type, enterDuration, resolve);
        }
      });
    };
  };
  return extend(baseProps, {
    onBeforeEnter(el) {
      callHook(onBeforeEnter, [el]);
      addTransitionClass(el, enterFromClass);
      addTransitionClass(el, enterActiveClass);
    },
    onBeforeAppear(el) {
      callHook(onBeforeAppear, [el]);
      addTransitionClass(el, appearFromClass);
      addTransitionClass(el, appearActiveClass);
    },
    onEnter: makeEnterHook(false),
    onAppear: makeEnterHook(true),
    onLeave(el, done) {
      el._isLeaving = true;
      const resolve = () => finishLeave(el, done);
      addTransitionClass(el, leaveFromClass);
      if (!el._enterCancelled) {
        forceReflow();
        addTransitionClass(el, leaveActiveClass);
      } else {
        addTransitionClass(el, leaveActiveClass);
        forceReflow();
      }
      nextFrame(() => {
        if (!el._isLeaving) {
          return;
        }
        removeTransitionClass(el, leaveFromClass);
        addTransitionClass(el, leaveToClass);
        if (!hasExplicitCallback(onLeave)) {
          whenTransitionEnds(el, type, leaveDuration, resolve);
        }
      });
      callHook(onLeave, [el, resolve]);
    },
    onEnterCancelled(el) {
      finishEnter(el, false, void 0, true);
      callHook(onEnterCancelled, [el]);
    },
    onAppearCancelled(el) {
      finishEnter(el, true, void 0, true);
      callHook(onAppearCancelled, [el]);
    },
    onLeaveCancelled(el) {
      finishLeave(el);
      callHook(onLeaveCancelled, [el]);
    }
  });
}
function normalizeDuration(duration) {
  if (duration == null) {
    return null;
  } else if (isObject(duration)) {
    return [NumberOf(duration.enter), NumberOf(duration.leave)];
  } else {
    const n = NumberOf(duration);
    return [n, n];
  }
}
function NumberOf(val) {
  const res = toNumber(val);
  return res;
}
function addTransitionClass(el, cls) {
  cls.split(/\s+/).forEach((c) => c && el.classList.add(c));
  (el[vtcKey] || (el[vtcKey] = /* @__PURE__ */ new Set())).add(cls);
}
function removeTransitionClass(el, cls) {
  cls.split(/\s+/).forEach((c) => c && el.classList.remove(c));
  const _vtc = el[vtcKey];
  if (_vtc) {
    _vtc.delete(cls);
    if (!_vtc.size) {
      el[vtcKey] = void 0;
    }
  }
}
function nextFrame(cb) {
  requestAnimationFrame(() => {
    requestAnimationFrame(cb);
  });
}
let endId = 0;
function whenTransitionEnds(el, expectedType, explicitTimeout, resolve) {
  const id = el._endId = ++endId;
  const resolveIfNotStale = () => {
    if (id === el._endId) {
      resolve();
    }
  };
  if (explicitTimeout != null) {
    return setTimeout(resolveIfNotStale, explicitTimeout);
  }
  const { type, timeout, propCount } = getTransitionInfo(el, expectedType);
  if (!type) {
    return resolve();
  }
  const endEvent = type + "end";
  let ended = 0;
  const end = () => {
    el.removeEventListener(endEvent, onEnd);
    resolveIfNotStale();
  };
  const onEnd = (e) => {
    if (e.target === el && ++ended >= propCount) {
      end();
    }
  };
  setTimeout(() => {
    if (ended < propCount) {
      end();
    }
  }, timeout + 1);
  el.addEventListener(endEvent, onEnd);
}
function getTransitionInfo(el, expectedType) {
  const styles = window.getComputedStyle(el);
  const getStyleProperties = (key) => (styles[key] || "").split(", ");
  const transitionDelays = getStyleProperties(`${TRANSITION}Delay`);
  const transitionDurations = getStyleProperties(`${TRANSITION}Duration`);
  const transitionTimeout = getTimeout(transitionDelays, transitionDurations);
  const animationDelays = getStyleProperties(`${ANIMATION}Delay`);
  const animationDurations = getStyleProperties(`${ANIMATION}Duration`);
  const animationTimeout = getTimeout(animationDelays, animationDurations);
  let type = null;
  let timeout = 0;
  let propCount = 0;
  if (expectedType === TRANSITION) {
    if (transitionTimeout > 0) {
      type = TRANSITION;
      timeout = transitionTimeout;
      propCount = transitionDurations.length;
    }
  } else if (expectedType === ANIMATION) {
    if (animationTimeout > 0) {
      type = ANIMATION;
      timeout = animationTimeout;
      propCount = animationDurations.length;
    }
  } else {
    timeout = Math.max(transitionTimeout, animationTimeout);
    type = timeout > 0 ? transitionTimeout > animationTimeout ? TRANSITION : ANIMATION : null;
    propCount = type ? type === TRANSITION ? transitionDurations.length : animationDurations.length : 0;
  }
  const hasTransform = type === TRANSITION && /\b(transform|all)(,|$)/.test(
    getStyleProperties(`${TRANSITION}Property`).toString()
  );
  return {
    type,
    timeout,
    propCount,
    hasTransform
  };
}
function getTimeout(delays, durations) {
  while (delays.length < durations.length) {
    delays = delays.concat(delays);
  }
  return Math.max(...durations.map((d, i) => toMs(d) + toMs(delays[i])));
}
function toMs(s) {
  if (s === "auto") return 0;
  return Number(s.slice(0, -1).replace(",", ".")) * 1e3;
}
function forceReflow() {
  return document.body.offsetHeight;
}

function patchClass(el, value, isSVG) {
  const transitionClasses = el[vtcKey];
  if (transitionClasses) {
    value = (value ? [value, ...transitionClasses] : [...transitionClasses]).join(" ");
  }
  if (value == null) {
    el.removeAttribute("class");
  } else if (isSVG) {
    el.setAttribute("class", value);
  } else {
    el.className = value;
  }
}

const vShowOriginalDisplay = Symbol("_vod");
const vShowHidden = Symbol("_vsh");
const vShow = {
  beforeMount(el, { value }, { transition }) {
    el[vShowOriginalDisplay] = el.style.display === "none" ? "" : el.style.display;
    if (transition && value) {
      transition.beforeEnter(el);
    } else {
      setDisplay$1(el, value);
    }
  },
  mounted(el, { value }, { transition }) {
    if (transition && value) {
      transition.enter(el);
    }
  },
  updated(el, { value, oldValue }, { transition }) {
    if (!value === !oldValue) return;
    if (transition) {
      if (value) {
        transition.beforeEnter(el);
        setDisplay$1(el, true);
        transition.enter(el);
      } else {
        transition.leave(el, () => {
          setDisplay$1(el, false);
        });
      }
    } else {
      setDisplay$1(el, value);
    }
  },
  beforeUnmount(el, { value }) {
    setDisplay$1(el, value);
  }
};
function setDisplay$1(el, value) {
  el.style.display = value ? el[vShowOriginalDisplay] : "none";
  el[vShowHidden] = !value;
}
function initVShowForSSR() {
  vShow.getSSRProps = ({ value }) => {
    if (!value) {
      return { style: { display: "none" } };
    }
  };
}

const CSS_VAR_TEXT = Symbol("");
function useCssVars(getter) {
  const instance = getCurrentInstance();
  if (!instance) {
    return;
  }
  const updateTeleports = instance.ut = (vars = getter(instance.proxy)) => {
    Array.from(
      document.querySelectorAll(`[data-v-owner="${instance.uid}"]`)
    ).forEach((node) => setVarsOnNode(node, vars));
  };
  const setVars = () => {
    const vars = getter(instance.proxy);
    if (instance.ce) {
      setVarsOnNode(instance.ce, vars);
    } else {
      setVarsOnVNode(instance.subTree, vars);
    }
    updateTeleports(vars);
  };
  onBeforeUpdate(() => {
    queuePostFlushCb(setVars);
  });
  onMounted(() => {
    watch(setVars, NOOP, { flush: "post" });
    const ob = new MutationObserver(setVars);
    ob.observe(instance.subTree.el.parentNode, { childList: true });
    onUnmounted(() => ob.disconnect());
  });
}
function setVarsOnVNode(vnode, vars) {
  if (vnode.shapeFlag & 128) {
    const suspense = vnode.suspense;
    vnode = suspense.activeBranch;
    if (suspense.pendingBranch && !suspense.isHydrating) {
      suspense.effects.push(() => {
        setVarsOnVNode(suspense.activeBranch, vars);
      });
    }
  }
  while (vnode.component) {
    vnode = vnode.component.subTree;
  }
  if (vnode.shapeFlag & 1 && vnode.el) {
    setVarsOnNode(vnode.el, vars);
  } else if (vnode.type === Fragment) {
    vnode.children.forEach((c) => setVarsOnVNode(c, vars));
  } else if (vnode.type === Static) {
    let { el, anchor } = vnode;
    while (el) {
      setVarsOnNode(el, vars);
      if (el === anchor) break;
      el = el.nextSibling;
    }
  }
}
function setVarsOnNode(el, vars) {
  if (el.nodeType === 1) {
    const style = el.style;
    let cssText = "";
    for (const key in vars) {
      const value = normalizeCssVarValue(vars[key]);
      style.setProperty(`--${key}`, value);
      cssText += `--${key}: ${value};`;
    }
    style[CSS_VAR_TEXT] = cssText;
  }
}

const displayRE = /(^|;)\s*display\s*:/;
function patchStyle(el, prev, next) {
  const style = el.style;
  const isCssString = isString(next);
  let hasControlledDisplay = false;
  if (next && !isCssString) {
    if (prev) {
      if (!isString(prev)) {
        for (const key in prev) {
          if (next[key] == null) {
            setStyle$1(style, key, "");
          }
        }
      } else {
        for (const prevStyle of prev.split(";")) {
          const key = prevStyle.slice(0, prevStyle.indexOf(":")).trim();
          if (next[key] == null) {
            setStyle$1(style, key, "");
          }
        }
      }
    }
    for (const key in next) {
      if (key === "display") {
        hasControlledDisplay = true;
      }
      setStyle$1(style, key, next[key]);
    }
  } else {
    if (isCssString) {
      if (prev !== next) {
        const cssVarText = style[CSS_VAR_TEXT];
        if (cssVarText) {
          next += ";" + cssVarText;
        }
        style.cssText = next;
        hasControlledDisplay = displayRE.test(next);
      }
    } else if (prev) {
      el.removeAttribute("style");
    }
  }
  if (vShowOriginalDisplay in el) {
    el[vShowOriginalDisplay] = hasControlledDisplay ? style.display : "";
    if (el[vShowHidden]) {
      style.display = "none";
    }
  }
}
const importantRE = /\s*!important$/;
function setStyle$1(style, name, rawVal) {
  if (isArray(rawVal)) {
    rawVal.forEach((v) => setStyle$1(style, name, v));
  } else {
    const val = rawVal == null ? "" : String(rawVal);
    if (name.startsWith("--")) {
      style.setProperty(name, val);
    } else {
      const prefixed = autoPrefix(style, name);
      if (importantRE.test(val)) {
        style.setProperty(
          hyphenate(prefixed),
          val.replace(importantRE, ""),
          "important"
        );
      } else {
        style[prefixed] = val;
      }
    }
  }
}
const prefixes = ["Webkit", "Moz", "ms"];
const prefixCache = {};
function autoPrefix(style, rawName) {
  const cached = prefixCache[rawName];
  if (cached) {
    return cached;
  }
  let name = camelize(rawName);
  if (name !== "filter" && name in style) {
    return prefixCache[rawName] = name;
  }
  name = capitalize(name);
  for (let i = 0; i < prefixes.length; i++) {
    const prefixed = prefixes[i] + name;
    if (prefixed in style) {
      return prefixCache[rawName] = prefixed;
    }
  }
  return rawName;
}

const xlinkNS = "http://www.w3.org/1999/xlink";
function patchAttr(el, key, value, isSVG, instance, isBoolean = isSpecialBooleanAttr(key)) {
  if (isSVG && key.startsWith("xlink:")) {
    if (value == null) {
      el.removeAttributeNS(xlinkNS, key.slice(6, key.length));
    } else {
      el.setAttributeNS(xlinkNS, key, value);
    }
  } else {
    if (value == null || isBoolean && !includeBooleanAttr(value)) {
      el.removeAttribute(key);
    } else {
      el.setAttribute(
        key,
        isBoolean ? "" : isSymbol(value) ? String(value) : value
      );
    }
  }
}

function patchDOMProp(el, key, value, parentComponent, attrName) {
  if (key === "innerHTML" || key === "textContent") {
    if (value != null) {
      el[key] = key === "innerHTML" ? unsafeToTrustedHTML(value) : value;
    }
    return;
  }
  const tag = el.tagName;
  if (key === "value" && canSetValueDirectly(tag)) {
    const oldValue = tag === "OPTION" ? el.getAttribute("value") || "" : el.value;
    const newValue = value == null ? (
      // #11647: value should be set as empty string for null and undefined,
      // but <input type="checkbox"> should be set as 'on'.
      el.type === "checkbox" ? "on" : ""
    ) : String(value);
    if (oldValue !== newValue || !("_value" in el)) {
      el.value = newValue;
    }
    if (value == null) {
      el.removeAttribute(key);
    }
    el._value = value;
    return;
  }
  let needRemove = false;
  if (value === "" || value == null) {
    const type = typeof el[key];
    if (type === "boolean") {
      value = includeBooleanAttr(value);
    } else if (value == null && type === "string") {
      value = "";
      needRemove = true;
    } else if (type === "number") {
      value = 0;
      needRemove = true;
    }
  }
  try {
    el[key] = value;
  } catch (e) {
  }
  needRemove && el.removeAttribute(attrName || key);
}

function addEventListener$1(el, event, handler, options) {
  el.addEventListener(event, handler, options);
}
function removeEventListener(el, event, handler, options) {
  el.removeEventListener(event, handler, options);
}
const veiKey = Symbol("_vei");
function patchEvent(el, rawName, prevValue, nextValue, instance = null) {
  const invokers = el[veiKey] || (el[veiKey] = {});
  const existingInvoker = invokers[rawName];
  if (nextValue && existingInvoker) {
    existingInvoker.value = nextValue;
  } else {
    const [name, options] = parseName(rawName);
    if (nextValue) {
      const invoker = invokers[rawName] = createInvoker(
        nextValue,
        instance
      );
      addEventListener$1(el, name, invoker, options);
    } else if (existingInvoker) {
      removeEventListener(el, name, existingInvoker, options);
      invokers[rawName] = void 0;
    }
  }
}
const optionsModifierRE = /(?:Once|Passive|Capture)$/;
function parseName(name) {
  let options;
  if (optionsModifierRE.test(name)) {
    options = {};
    let m;
    while (m = name.match(optionsModifierRE)) {
      name = name.slice(0, name.length - m[0].length);
      options[m[0].toLowerCase()] = true;
    }
  }
  const event = name[2] === ":" ? name.slice(3) : hyphenate(name.slice(2));
  return [event, options];
}
let cachedNow = 0;
const p = /* @__PURE__ */ Promise.resolve();
const getNow = () => cachedNow || (p.then(() => cachedNow = 0), cachedNow = Date.now());
function createInvoker(initialValue, instance) {
  const invoker = (e) => {
    if (!e._vts) {
      e._vts = Date.now();
    } else if (e._vts <= invoker.attached) {
      return;
    }
    callWithAsyncErrorHandling(
      patchStopImmediatePropagation(e, invoker.value),
      instance,
      5,
      [e]
    );
  };
  invoker.value = initialValue;
  invoker.attached = getNow();
  return invoker;
}
function patchStopImmediatePropagation(e, value) {
  if (isArray(value)) {
    const originalStop = e.stopImmediatePropagation;
    e.stopImmediatePropagation = () => {
      originalStop.call(e);
      e._stopped = true;
    };
    return value.map(
      (fn) => (e2) => !e2._stopped && fn && fn(e2)
    );
  } else {
    return value;
  }
}

const patchProp = (el, key, prevValue, nextValue, namespace, parentComponent) => {
  const isSVG = namespace === "svg";
  if (key === "class") {
    patchClass(el, nextValue, isSVG);
  } else if (key === "style") {
    patchStyle(el, prevValue, nextValue);
  } else if (isOn(key)) {
    if (!isModelListener(key)) {
      patchEvent(el, key, prevValue, nextValue, parentComponent);
    }
  } else if (key[0] === "." ? (key = key.slice(1), true) : key[0] === "^" ? (key = key.slice(1), false) : shouldSetAsProp(el, key, nextValue, isSVG)) {
    patchDOMProp(el, key, nextValue);
    if (!el.tagName.includes("-") && (key === "value" || key === "checked" || key === "selected")) {
      patchAttr(el, key, nextValue, isSVG, parentComponent, key !== "value");
    }
  } else if (
    // #11081 force set props for possible async custom element
    el._isVueCE && (/[A-Z]/.test(key) || !isString(nextValue))
  ) {
    patchDOMProp(el, camelize(key), nextValue, parentComponent, key);
  } else {
    if (key === "true-value") {
      el._trueValue = nextValue;
    } else if (key === "false-value") {
      el._falseValue = nextValue;
    }
    patchAttr(el, key, nextValue, isSVG);
  }
};
function shouldSetAsProp(el, key, value, isSVG) {
  if (isSVG) {
    if (key === "innerHTML" || key === "textContent") {
      return true;
    }
    if (key in el && isNativeOn(key) && isFunction(value)) {
      return true;
    }
    return false;
  }
  if (shouldSetAsAttr(el.tagName, key)) {
    return false;
  }
  if (isNativeOn(key) && isString(value)) {
    return false;
  }
  return key in el;
}

const REMOVAL = {};
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function defineCustomElement(options, extraOptions, _createApp) {
  const Comp = defineComponent(options, extraOptions);
  if (isPlainObject(Comp)) extend(Comp, extraOptions);
  class VueCustomElement extends VueElement {
    constructor(initialProps) {
      super(Comp, initialProps, _createApp);
    }
  }
  VueCustomElement.def = Comp;
  return VueCustomElement;
}

const defineSSRCustomElement = (/* @__NO_SIDE_EFFECTS__ */ (options, extraOptions) => {
  return /* @__PURE__ */ defineCustomElement(options, extraOptions, createSSRApp);
});
const BaseClass = typeof HTMLElement !== "undefined" ? HTMLElement : class {
};
class VueElement extends BaseClass {
  constructor(_def, _props = {}, _createApp = createApp) {
    super();
    this._def = _def;
    this._props = _props;
    this._createApp = _createApp;
    this._isVueCE = true;
    /**
     * @internal
     */
    this._instance = null;
    /**
     * @internal
     */
    this._app = null;
    /**
     * @internal
     */
    this._nonce = this._def.nonce;
    this._connected = false;
    this._resolved = false;
    this._numberProps = null;
    this._styleChildren = /* @__PURE__ */ new WeakSet();
    this._ob = null;
    if (this.shadowRoot && _createApp !== createApp) {
      this._root = this.shadowRoot;
    } else {
      if (_def.shadowRoot !== false) {
        this.attachShadow({ mode: "open" });
        this._root = this.shadowRoot;
      } else {
        this._root = this;
      }
    }
  }
  connectedCallback() {
    if (!this.isConnected) return;
    if (!this.shadowRoot && !this._resolved) {
      this._parseSlots();
    }
    this._connected = true;
    let parent = this;
    while (parent = parent && (parent.parentNode || parent.host)) {
      if (parent instanceof VueElement) {
        this._parent = parent;
        break;
      }
    }
    if (!this._instance) {
      if (this._resolved) {
        this._mount(this._def);
      } else {
        if (parent && parent._pendingResolve) {
          this._pendingResolve = parent._pendingResolve.then(() => {
            this._pendingResolve = void 0;
            this._resolveDef();
          });
        } else {
          this._resolveDef();
        }
      }
    }
  }
  _setParent(parent = this._parent) {
    if (parent) {
      this._instance.parent = parent._instance;
      this._inheritParentContext(parent);
    }
  }
  _inheritParentContext(parent = this._parent) {
    if (parent && this._app) {
      Object.setPrototypeOf(
        this._app._context.provides,
        parent._instance.provides
      );
    }
  }
  disconnectedCallback() {
    this._connected = false;
    nextTick(() => {
      if (!this._connected) {
        if (this._ob) {
          this._ob.disconnect();
          this._ob = null;
        }
        this._app && this._app.unmount();
        if (this._instance) this._instance.ce = void 0;
        this._app = this._instance = null;
      }
    });
  }
  /**
   * resolve inner component definition (handle possible async component)
   */
  _resolveDef() {
    if (this._pendingResolve) {
      return;
    }
    for (let i = 0; i < this.attributes.length; i++) {
      this._setAttr(this.attributes[i].name);
    }
    this._ob = new MutationObserver((mutations) => {
      for (const m of mutations) {
        this._setAttr(m.attributeName);
      }
    });
    this._ob.observe(this, { attributes: true });
    const resolve = (def, isAsync = false) => {
      this._resolved = true;
      this._pendingResolve = void 0;
      const { props, styles } = def;
      let numberProps;
      if (props && !isArray(props)) {
        for (const key in props) {
          const opt = props[key];
          if (opt === Number || opt && opt.type === Number) {
            if (key in this._props) {
              this._props[key] = toNumber(this._props[key]);
            }
            (numberProps || (numberProps = /* @__PURE__ */ Object.create(null)))[camelize(key)] = true;
          }
        }
      }
      this._numberProps = numberProps;
      this._resolveProps(def);
      if (this.shadowRoot) {
        this._applyStyles(styles);
      }
      this._mount(def);
    };
    const asyncDef = this._def.__asyncLoader;
    if (asyncDef) {
      this._pendingResolve = asyncDef().then((def) => {
        def.configureApp = this._def.configureApp;
        resolve(this._def = def, true);
      });
    } else {
      resolve(this._def);
    }
  }
  _mount(def) {
    this._app = this._createApp(def);
    this._inheritParentContext();
    if (def.configureApp) {
      def.configureApp(this._app);
    }
    this._app._ceVNode = this._createVNode();
    this._app.mount(this._root);
    const exposed = this._instance && this._instance.exposed;
    if (!exposed) return;
    for (const key in exposed) {
      if (!hasOwn(this, key)) {
        Object.defineProperty(this, key, {
          // unwrap ref to be consistent with public instance behavior
          get: () => unref(exposed[key])
        });
      }
    }
  }
  _resolveProps(def) {
    const { props } = def;
    const declaredPropKeys = isArray(props) ? props : Object.keys(props || {});
    for (const key of Object.keys(this)) {
      if (key[0] !== "_" && declaredPropKeys.includes(key)) {
        this._setProp(key, this[key]);
      }
    }
    for (const key of declaredPropKeys.map(camelize)) {
      Object.defineProperty(this, key, {
        get() {
          return this._getProp(key);
        },
        set(val) {
          this._setProp(key, val, true, true);
        }
      });
    }
  }
  _setAttr(key) {
    if (key.startsWith("data-v-")) return;
    const has = this.hasAttribute(key);
    let value = has ? this.getAttribute(key) : REMOVAL;
    const camelKey = camelize(key);
    if (has && this._numberProps && this._numberProps[camelKey]) {
      value = toNumber(value);
    }
    this._setProp(camelKey, value, false, true);
  }
  /**
   * @internal
   */
  _getProp(key) {
    return this._props[key];
  }
  /**
   * @internal
   */
  _setProp(key, val, shouldReflect = true, shouldUpdate = false) {
    if (val !== this._props[key]) {
      if (val === REMOVAL) {
        delete this._props[key];
      } else {
        this._props[key] = val;
        if (key === "key" && this._app) {
          this._app._ceVNode.key = val;
        }
      }
      if (shouldUpdate && this._instance) {
        this._update();
      }
      if (shouldReflect) {
        const ob = this._ob;
        ob && ob.disconnect();
        if (val === true) {
          this.setAttribute(hyphenate(key), "");
        } else if (typeof val === "string" || typeof val === "number") {
          this.setAttribute(hyphenate(key), val + "");
        } else if (!val) {
          this.removeAttribute(hyphenate(key));
        }
        ob && ob.observe(this, { attributes: true });
      }
    }
  }
  _update() {
    const vnode = this._createVNode();
    if (this._app) vnode.appContext = this._app._context;
    render(vnode, this._root);
  }
  _createVNode() {
    const baseProps = {};
    if (!this.shadowRoot) {
      baseProps.onVnodeMounted = baseProps.onVnodeUpdated = this._renderSlots.bind(this);
    }
    const vnode = createVNode(this._def, extend(baseProps, this._props));
    if (!this._instance) {
      vnode.ce = (instance) => {
        this._instance = instance;
        instance.ce = this;
        instance.isCE = true;
        const dispatch = (event, args) => {
          this.dispatchEvent(
            new CustomEvent(
              event,
              isPlainObject(args[0]) ? extend({ detail: args }, args[0]) : { detail: args }
            )
          );
        };
        instance.emit = (event, ...args) => {
          dispatch(event, args);
          if (hyphenate(event) !== event) {
            dispatch(hyphenate(event), args);
          }
        };
        this._setParent();
      };
    }
    return vnode;
  }
  _applyStyles(styles, owner) {
    if (!styles) return;
    if (owner) {
      if (owner === this._def || this._styleChildren.has(owner)) {
        return;
      }
      this._styleChildren.add(owner);
    }
    const nonce = this._nonce;
    for (let i = styles.length - 1; i >= 0; i--) {
      const s = document.createElement("style");
      if (nonce) s.setAttribute("nonce", nonce);
      s.textContent = styles[i];
      this.shadowRoot.prepend(s);
    }
  }
  /**
   * Only called when shadowRoot is false
   */
  _parseSlots() {
    const slots = this._slots = {};
    let n;
    while (n = this.firstChild) {
      const slotName = n.nodeType === 1 && n.getAttribute("slot") || "default";
      (slots[slotName] || (slots[slotName] = [])).push(n);
      this.removeChild(n);
    }
  }
  /**
   * Only called when shadowRoot is false
   */
  _renderSlots() {
    const outlets = (this._teleportTarget || this).querySelectorAll("slot");
    const scopeId = this._instance.type.__scopeId;
    for (let i = 0; i < outlets.length; i++) {
      const o = outlets[i];
      const slotName = o.getAttribute("name") || "default";
      const content = this._slots[slotName];
      const parent = o.parentNode;
      if (content) {
        for (const n of content) {
          if (scopeId && n.nodeType === 1) {
            const id = scopeId + "-s";
            const walker = document.createTreeWalker(n, 1);
            n.setAttribute(id, "");
            let child;
            while (child = walker.nextNode()) {
              child.setAttribute(id, "");
            }
          }
          parent.insertBefore(n, o);
        }
      } else {
        while (o.firstChild) parent.insertBefore(o.firstChild, o);
      }
      parent.removeChild(o);
    }
  }
  /**
   * @internal
   */
  _injectChildStyle(comp) {
    this._applyStyles(comp.styles, comp);
  }
  /**
   * @internal
   */
  _removeChildStyle(comp) {
  }
}
function useHost(caller) {
  const instance = getCurrentInstance();
  const el = instance && instance.ce;
  if (el) {
    return el;
  }
  return null;
}
function useShadowRoot() {
  const el = useHost();
  return el && el.shadowRoot;
}

function useCssModule(name = "$style") {
  {
    const instance = getCurrentInstance();
    if (!instance) {
      return EMPTY_OBJ;
    }
    const modules = instance.type.__cssModules;
    if (!modules) {
      return EMPTY_OBJ;
    }
    const mod = modules[name];
    if (!mod) {
      return EMPTY_OBJ;
    }
    return mod;
  }
}

const positionMap$1 = /* @__PURE__ */ new WeakMap();
const newPositionMap$1 = /* @__PURE__ */ new WeakMap();
const moveCbKey = Symbol("_moveCb");
const enterCbKey = Symbol("_enterCb");
const decorate$2 = (t) => {
  delete t.props.mode;
  return t;
};
const TransitionGroupImpl = /* @__PURE__ */ decorate$2({
  name: "TransitionGroup",
  props: /* @__PURE__ */ extend({}, TransitionPropsValidators, {
    tag: String,
    moveClass: String
  }),
  setup(props, { slots }) {
    const instance = getCurrentInstance();
    const state = useTransitionState();
    let prevChildren;
    let children;
    onUpdated(() => {
      if (!prevChildren.length) {
        return;
      }
      const moveClass = props.moveClass || `${props.name || "v"}-move`;
      if (!hasCSSTransform(
        prevChildren[0].el,
        instance.vnode.el,
        moveClass
      )) {
        prevChildren = [];
        return;
      }
      prevChildren.forEach((vnode) => callPendingCbs(vnode.el));
      prevChildren.forEach(recordPosition$1);
      const movedChildren = prevChildren.filter(applyTranslation$1);
      forceReflow();
      movedChildren.forEach((c) => {
        const el = c.el;
        handleMovedChildren(el, moveClass);
      });
      prevChildren = [];
    });
    return () => {
      const rawProps = toRaw(props);
      const cssTransitionProps = resolveTransitionProps(rawProps);
      let tag = rawProps.tag || Fragment;
      prevChildren = [];
      if (children) {
        for (let i = 0; i < children.length; i++) {
          const child = children[i];
          if (child.el && child.el instanceof Element) {
            prevChildren.push(child);
            setTransitionHooks$1(
              child,
              resolveTransitionHooks$1(
                child,
                cssTransitionProps,
                state,
                instance
              )
            );
            positionMap$1.set(
              child,
              child.el.getBoundingClientRect()
            );
          }
        }
      }
      children = slots.default ? getTransitionRawChildren(slots.default()) : [];
      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        if (child.key != null) {
          setTransitionHooks$1(
            child,
            resolveTransitionHooks$1(child, cssTransitionProps, state, instance)
          );
        }
      }
      return createVNode(tag, null, children);
    };
  }
});
const TransitionGroup = TransitionGroupImpl;
function callPendingCbs(el) {
  if (el[moveCbKey]) {
    el[moveCbKey]();
  }
  if (el[enterCbKey]) {
    el[enterCbKey]();
  }
}
function recordPosition$1(c) {
  newPositionMap$1.set(c, c.el.getBoundingClientRect());
}
function applyTranslation$1(c) {
  if (baseApplyTranslation(
    positionMap$1.get(c),
    newPositionMap$1.get(c),
    c.el
  )) {
    return c;
  }
}
function baseApplyTranslation(oldPos, newPos, el) {
  const dx = oldPos.left - newPos.left;
  const dy = oldPos.top - newPos.top;
  if (dx || dy) {
    const s = el.style;
    s.transform = s.webkitTransform = `translate(${dx}px,${dy}px)`;
    s.transitionDuration = "0s";
    return true;
  }
  return false;
}
function hasCSSTransform(el, root, moveClass) {
  const clone = el.cloneNode();
  const _vtc = el[vtcKey];
  if (_vtc) {
    _vtc.forEach((cls) => {
      cls.split(/\s+/).forEach((c) => c && clone.classList.remove(c));
    });
  }
  moveClass.split(/\s+/).forEach((c) => c && clone.classList.add(c));
  clone.style.display = "none";
  const container = root.nodeType === 1 ? root : root.parentNode;
  container.appendChild(clone);
  const { hasTransform } = getTransitionInfo(clone);
  container.removeChild(clone);
  return hasTransform;
}
const handleMovedChildren = (el, moveClass) => {
  const style = el.style;
  addTransitionClass(el, moveClass);
  style.transform = style.webkitTransform = style.transitionDuration = "";
  const cb = el[moveCbKey] = (e) => {
    if (e && e.target !== el) {
      return;
    }
    if (!e || /transform$/.test(e.propertyName)) {
      el.removeEventListener("transitionend", cb);
      el[moveCbKey] = null;
      removeTransitionClass(el, moveClass);
    }
  };
  el.addEventListener("transitionend", cb);
};

const getModelAssigner = (vnode) => {
  const fn = vnode.props["onUpdate:modelValue"] || false;
  return isArray(fn) ? (value) => invokeArrayFns(fn, value) : fn;
};
function onCompositionStart(e) {
  e.target.composing = true;
}
function onCompositionEnd(e) {
  const target = e.target;
  if (target.composing) {
    target.composing = false;
    target.dispatchEvent(new Event("input"));
  }
}
const assignKey = Symbol("_assign");
const vModelText = {
  created(el, { modifiers: { lazy, trim, number } }, vnode) {
    el[assignKey] = getModelAssigner(vnode);
    vModelTextInit(
      el,
      trim,
      number || !!(vnode.props && vnode.props.type === "number"),
      lazy
    );
  },
  // set value on mounted so it's after min/max for type="range"
  mounted(el, { value }) {
    el.value = value == null ? "" : value;
  },
  beforeUpdate(el, { value, oldValue, modifiers: { lazy, trim, number } }, vnode) {
    el[assignKey] = getModelAssigner(vnode);
    vModelTextUpdate(el, oldValue, value, trim, number, lazy);
  }
};
const vModelTextInit = (el, trim, number, lazy, set) => {
  addEventListener$1(el, lazy ? "change" : "input", (e) => {
    if (e.target.composing) return;
    let domValue = el.value;
    if (trim) {
      domValue = domValue.trim();
    }
    if (number || el.type === "number") {
      domValue = looseToNumber(domValue);
    }
    (set || el[assignKey])(domValue);
  });
  if (trim) {
    addEventListener$1(el, "change", () => {
      el.value = el.value.trim();
    });
  }
  if (!lazy) {
    addEventListener$1(el, "compositionstart", onCompositionStart);
    addEventListener$1(el, "compositionend", onCompositionEnd);
    addEventListener$1(el, "change", onCompositionEnd);
  }
};
const vModelTextUpdate = (el, oldValue, value, trim, number, lazy) => {
  if (el.composing) return;
  const elValue = (number || el.type === "number") && !/^0\d/.test(el.value) ? looseToNumber(el.value) : el.value;
  const newValue = value == null ? "" : value;
  if (elValue === newValue) {
    return;
  }
  if (document.activeElement === el && el.type !== "range") {
    if (lazy && value === oldValue) {
      return;
    }
    if (trim && el.value.trim() === newValue) {
      return;
    }
  }
  el.value = newValue;
};
const vModelCheckbox = {
  // #4096 array checkboxes need to be deep traversed
  deep: true,
  created(el, _, vnode) {
    el[assignKey] = getModelAssigner(vnode);
    vModelCheckboxInit(el);
  },
  // set initial checked on mount to wait for true-value/false-value
  mounted(el, binding, vnode) {
    vModelCheckboxUpdate(
      el,
      binding.oldValue,
      binding.value,
      vnode.props.value
    );
  },
  beforeUpdate(el, binding, vnode) {
    el[assignKey] = getModelAssigner(vnode);
    vModelCheckboxUpdate(
      el,
      binding.oldValue,
      binding.value,
      vnode.props.value
    );
  }
};
const vModelCheckboxInit = (el, set) => {
  addEventListener$1(el, "change", () => {
    const assign = set || el[assignKey];
    const modelValue = el._modelValue;
    const elementValue = getValue(el);
    const checked = el.checked;
    if (isArray(modelValue)) {
      const index = looseIndexOf(modelValue, elementValue);
      const found = index !== -1;
      if (checked && !found) {
        assign(modelValue.concat(elementValue));
      } else if (!checked && found) {
        const filtered = [...modelValue];
        filtered.splice(index, 1);
        assign(filtered);
      }
    } else if (isSet(modelValue)) {
      const cloned = new Set(modelValue);
      if (checked) {
        cloned.add(elementValue);
      } else {
        cloned.delete(elementValue);
      }
      assign(cloned);
    } else {
      assign(getCheckboxValue(el, checked));
    }
  });
};
const vModelCheckboxUpdate = (el, oldValue, value, rawValue = getValue(el)) => {
  el._modelValue = value;
  let checked;
  if (isArray(value)) {
    checked = looseIndexOf(value, rawValue) > -1;
  } else if (isSet(value)) {
    checked = value.has(rawValue);
  } else {
    if (value === oldValue) return;
    checked = looseEqual(value, getCheckboxValue(el, true));
  }
  if (el.checked !== checked) {
    el.checked = checked;
  }
};
const vModelRadio = {
  created(el, { value }, vnode) {
    el.checked = looseEqual(value, vnode.props.value);
    el[assignKey] = getModelAssigner(vnode);
    addEventListener$1(el, "change", () => {
      el[assignKey](getValue(el));
    });
  },
  beforeUpdate(el, { value, oldValue }, vnode) {
    el[assignKey] = getModelAssigner(vnode);
    if (value !== oldValue) {
      el.checked = looseEqual(value, vnode.props.value);
    }
  }
};
const vModelSelect = {
  // <select multiple> value need to be deep traversed
  deep: true,
  created(el, { value, modifiers: { number } }, vnode) {
    vModelSelectInit(el, value, number);
    el[assignKey] = getModelAssigner(vnode);
  },
  // set value in mounted & updated because <select> relies on its children
  // <option>s.
  mounted(el, { value }) {
    vModelSetSelected(el, value);
  },
  beforeUpdate(el, _binding, vnode) {
    el[assignKey] = getModelAssigner(vnode);
  },
  updated(el, { value }) {
    vModelSetSelected(el, value);
  }
};
const vModelSelectInit = (el, value, number, set) => {
  const isSetModel = isSet(value);
  addEventListener$1(el, "change", () => {
    const selectedVal = Array.prototype.filter.call(el.options, (o) => o.selected).map(
      (o) => number ? looseToNumber(getValue(o)) : getValue(o)
    );
    (set || el[assignKey])(
      el.multiple ? isSetModel ? new Set(selectedVal) : selectedVal : selectedVal[0]
    );
    el._assigning = true;
    nextTick(() => {
      el._assigning = false;
    });
  });
};
const vModelSetSelected = (el, value) => {
  if (el._assigning) return;
  const isMultiple = el.multiple;
  const isArrayValue = isArray(value);
  if (isMultiple && !isArrayValue && !isSet(value)) {
    return;
  }
  for (let i = 0, l = el.options.length; i < l; i++) {
    const option = el.options[i];
    const optionValue = getValue(option);
    if (isMultiple) {
      if (isArrayValue) {
        const optionType = typeof optionValue;
        if (optionType === "string" || optionType === "number") {
          option.selected = value.some((v) => String(v) === String(optionValue));
        } else {
          option.selected = looseIndexOf(value, optionValue) > -1;
        }
      } else {
        option.selected = value.has(optionValue);
      }
    } else if (looseEqual(getValue(option), value)) {
      if (el.selectedIndex !== i) el.selectedIndex = i;
      return;
    }
  }
  if (!isMultiple && el.selectedIndex !== -1) {
    el.selectedIndex = -1;
  }
};
function getValue(el) {
  return "_value" in el ? el._value : el.value;
}
function getCheckboxValue(el, checked) {
  const key = checked ? "_trueValue" : "_falseValue";
  if (key in el) {
    return el[key];
  }
  const attr = checked ? "true-value" : "false-value";
  if (el.hasAttribute(attr)) {
    return el.getAttribute(attr);
  }
  return checked;
}
const vModelDynamic = {
  created(el, binding, vnode) {
    callModelHook(el, binding, vnode, null, "created");
  },
  mounted(el, binding, vnode) {
    callModelHook(el, binding, vnode, null, "mounted");
  },
  beforeUpdate(el, binding, vnode, prevVNode) {
    callModelHook(el, binding, vnode, prevVNode, "beforeUpdate");
  },
  updated(el, binding, vnode, prevVNode) {
    callModelHook(el, binding, vnode, prevVNode, "updated");
  }
};
function resolveDynamicModel(tagName, type) {
  switch (tagName) {
    case "SELECT":
      return vModelSelect;
    case "TEXTAREA":
      return vModelText;
    default:
      switch (type) {
        case "checkbox":
          return vModelCheckbox;
        case "radio":
          return vModelRadio;
        default:
          return vModelText;
      }
  }
}
function callModelHook(el, binding, vnode, prevVNode, hook) {
  const modelToUse = resolveDynamicModel(
    el.tagName,
    vnode.props && vnode.props.type
  );
  const fn = modelToUse[hook];
  fn && fn(el, binding, vnode, prevVNode);
}
function initVModelForSSR() {
  vModelText.getSSRProps = ({ value }) => ({ value });
  vModelRadio.getSSRProps = ({ value }, vnode) => {
    if (vnode.props && looseEqual(vnode.props.value, value)) {
      return { checked: true };
    }
  };
  vModelCheckbox.getSSRProps = ({ value }, vnode) => {
    if (isArray(value)) {
      if (vnode.props && looseIndexOf(value, vnode.props.value) > -1) {
        return { checked: true };
      }
    } else if (isSet(value)) {
      if (vnode.props && value.has(vnode.props.value)) {
        return { checked: true };
      }
    } else if (value) {
      return { checked: true };
    }
  };
  vModelDynamic.getSSRProps = (binding, vnode) => {
    if (typeof vnode.type !== "string") {
      return;
    }
    const modelToUse = resolveDynamicModel(
      // resolveDynamicModel expects an uppercase tag name, but vnode.type is lowercase
      vnode.type.toUpperCase(),
      vnode.props && vnode.props.type
    );
    if (modelToUse.getSSRProps) {
      return modelToUse.getSSRProps(binding, vnode);
    }
  };
}

const systemModifiers = ["ctrl", "shift", "alt", "meta"];
const modifierGuards = {
  stop: (e) => e.stopPropagation(),
  prevent: (e) => e.preventDefault(),
  self: (e) => e.target !== e.currentTarget,
  ctrl: (e) => !e.ctrlKey,
  shift: (e) => !e.shiftKey,
  alt: (e) => !e.altKey,
  meta: (e) => !e.metaKey,
  left: (e) => "button" in e && e.button !== 0,
  middle: (e) => "button" in e && e.button !== 1,
  right: (e) => "button" in e && e.button !== 2,
  exact: (e, modifiers) => systemModifiers.some((m) => e[`${m}Key`] && !modifiers.includes(m))
};
const withModifiers = (fn, modifiers) => {
  const cache = fn._withMods || (fn._withMods = {});
  const cacheKey = modifiers.join(".");
  return cache[cacheKey] || (cache[cacheKey] = ((event, ...args) => {
    for (let i = 0; i < modifiers.length; i++) {
      const guard = modifierGuards[modifiers[i]];
      if (guard && guard(event, modifiers)) return;
    }
    return fn(event, ...args);
  }));
};
const keyNames = {
  esc: "escape",
  space: " ",
  up: "arrow-up",
  left: "arrow-left",
  right: "arrow-right",
  down: "arrow-down",
  delete: "backspace"
};
const withKeys = (fn, modifiers) => {
  const cache = fn._withKeys || (fn._withKeys = {});
  const cacheKey = modifiers.join(".");
  return cache[cacheKey] || (cache[cacheKey] = ((event) => {
    if (!("key" in event)) {
      return;
    }
    const eventKey = hyphenate(event.key);
    if (modifiers.some(
      (k) => k === eventKey || keyNames[k] === eventKey
    )) {
      return fn(event);
    }
  }));
};

const rendererOptions = /* @__PURE__ */ extend({ patchProp }, nodeOps);
let renderer;
let enabledHydration = false;
function ensureRenderer() {
  return renderer || (renderer = createRenderer(rendererOptions));
}
function ensureHydrationRenderer() {
  renderer = enabledHydration ? renderer : createHydrationRenderer(rendererOptions);
  enabledHydration = true;
  return renderer;
}
const render = ((...args) => {
  ensureRenderer().render(...args);
});
const hydrate = ((...args) => {
  ensureHydrationRenderer().hydrate(...args);
});
const createApp = ((...args) => {
  const app = ensureRenderer().createApp(...args);
  const { mount } = app;
  app.mount = (containerOrSelector) => {
    const container = normalizeContainer(containerOrSelector);
    if (!container) return;
    const component = app._component;
    if (!isFunction(component) && !component.render && !component.template) {
      component.template = container.innerHTML;
    }
    if (container.nodeType === 1) {
      container.textContent = "";
    }
    const proxy = mount(container, false, resolveRootNamespace(container));
    if (container instanceof Element) {
      container.removeAttribute("v-cloak");
      container.setAttribute("data-v-app", "");
    }
    return proxy;
  };
  return app;
});
const createSSRApp = ((...args) => {
  const app = ensureHydrationRenderer().createApp(...args);
  const { mount } = app;
  app.mount = (containerOrSelector) => {
    const container = normalizeContainer(containerOrSelector);
    if (container) {
      return mount(container, true, resolveRootNamespace(container));
    }
  };
  return app;
});
function resolveRootNamespace(container) {
  if (container instanceof SVGElement) {
    return "svg";
  }
  if (typeof MathMLElement === "function" && container instanceof MathMLElement) {
    return "mathml";
  }
}
function normalizeContainer(container) {
  if (isString(container)) {
    const res = document.querySelector(container);
    return res;
  }
  return container;
}
let ssrDirectiveInitialized = false;
const initDirectivesForSSR = () => {
  if (!ssrDirectiveInitialized) {
    ssrDirectiveInitialized = true;
    initVModelForSSR();
    initVShowForSSR();
  }
} ;

const compile = (_template) => {
  return NOOP;
};

let insertionParent;
let insertionAnchor;
function setInsertionState(parent, anchor) {
  insertionParent = parent;
  if (anchor !== void 0) {
    if (isHydrating) {
      insertionAnchor = anchor;
    } else {
      insertionAnchor = typeof anchor === "number" && anchor > 0 ? null : anchor;
      if (anchor === 0 && !parent.$fc) {
        parent.$fc = parent.firstChild;
      }
    }
  } else {
    insertionAnchor = void 0;
  }
}
function resetInsertionState() {
  insertionParent = insertionAnchor = void 0;
}

function createElement(tagName) {
  return document.createElement(tagName);
}
// @__NO_SIDE_EFFECTS__
function createTextNode(value = "") {
  return document.createTextNode(value);
}
// @__NO_SIDE_EFFECTS__
function querySelector(selectors) {
  return document.querySelector(selectors);
}
/*! @__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function parentNode(node) {
  return node.parentNode;
}
const _txt = _child;
const __txt = /* @__NO_SIDE_EFFECTS__ */ (node) => {
  let n = node.firstChild;
  if (!n) {
    return node.appendChild(/* @__PURE__ */ createTextNode());
  }
  return n;
};
// @__NO_SIDE_EFFECTS__
function _child(node) {
  return node.firstChild;
}
// @__NO_SIDE_EFFECTS__
function __child(node, logicalIndex = 0) {
  return locateChildByLogicalIndex(node, logicalIndex);
}
// @__NO_SIDE_EFFECTS__
function _nthChild(node, i) {
  return node.childNodes[i];
}
// @__NO_SIDE_EFFECTS__
function __nthChild(node, logicalIndex) {
  return locateChildByLogicalIndex(node, logicalIndex);
}
// @__NO_SIDE_EFFECTS__
function _next(node) {
  return node.nextSibling;
}
// @__NO_SIDE_EFFECTS__
function __next(node, logicalIndex) {
  return locateChildByLogicalIndex(
    node.parentNode,
    logicalIndex
  );
}
const txt = /* @__NO_SIDE_EFFECTS__ */ (...args) => {
  return txt.impl(...args);
};
txt.impl = _txt;
const child = /* @__NO_SIDE_EFFECTS__ */ (...args) => {
  return child.impl(...args);
};
child.impl = _child;
const next = /* @__NO_SIDE_EFFECTS__ */ (...args) => {
  return next.impl(...args);
};
next.impl = _next;
const nthChild = /* @__NO_SIDE_EFFECTS__ */ (...args) => {
  return nthChild.impl(...args);
};
nthChild.impl = _nthChild;
function enableHydrationNodeLookup() {
  txt.impl = __txt;
  child.impl = __child;
  next.impl = __next;
  nthChild.impl = __nthChild;
}
function disableHydrationNodeLookup() {
  txt.impl = _txt;
  child.impl = _child;
  next.impl = _next;
  nthChild.impl = _nthChild;
}
function locateChildByLogicalIndex(parent, logicalIndex) {
  let child2 = parent.$llc || parent.firstChild;
  let fromIndex = child2.$idx || 0;
  while (child2) {
    if (fromIndex === logicalIndex) {
      child2.$idx = logicalIndex;
      return parent.$llc = child2;
    }
    child2 = isComment(child2, "[") ? (
      // fragment start: jump to the node after the matching end anchor
      locateEndAnchor(child2).nextSibling
    ) : child2.nextSibling;
    fromIndex++;
  }
  return null;
}

const isHydratingStack = [];
let isHydrating = false;
let currentHydrationNode = null;
function pushIsHydrating(value) {
  isHydratingStack.push(isHydrating = value);
}
function popIsHydrating() {
  isHydratingStack.pop();
  isHydrating = isHydratingStack[isHydratingStack.length - 1] || false;
}
function runWithoutHydration(fn) {
  try {
    pushIsHydrating(false);
    return fn();
  } finally {
    popIsHydrating();
  }
}
let isOptimized$1 = false;
function performHydration(fn, setup, cleanup) {
  if (!isOptimized$1) {
    adoptTemplate = adoptTemplateImpl;
    locateHydrationNode = locateHydrationNodeImpl;
    Comment.prototype.$fe = void 0;
    Node.prototype.$pns = void 0;
    Node.prototype.$idx = void 0;
    Node.prototype.$llc = void 0;
    Node.prototype.$lpn = void 0;
    Node.prototype.$lan = void 0;
    Node.prototype.$lin = void 0;
    isOptimized$1 = true;
  }
  enableHydrationNodeLookup();
  pushIsHydrating(true);
  setup();
  const res = fn();
  cleanup();
  currentHydrationNode = null;
  popIsHydrating();
  if (!isHydrating) disableHydrationNodeLookup();
  return res;
}
function withHydration(container, fn) {
  const setup = () => setInsertionState(container);
  const cleanup = () => resetInsertionState();
  return performHydration(fn, setup, cleanup);
}
function hydrateNode(node, fn) {
  const setup = () => currentHydrationNode = node;
  const cleanup = () => {
  };
  return performHydration(fn, setup, cleanup);
}
let adoptTemplate;
let locateHydrationNode;
const isComment = (node, data) => node.nodeType === 8 && node.data === data;
function setCurrentHydrationNode(node) {
  currentHydrationNode = node;
}
function locateNextSiblingOfParent(n) {
  if (!n.parentNode) return null;
  return n.parentNode.nextSibling || locateNextSiblingOfParent(n.parentNode);
}
function advanceHydrationNode(node) {
  const ret = node.nextSibling || // pns is short for "parent next sibling"
  node.$pns || (node.$pns = locateNextSiblingOfParent(node));
  if (ret) setCurrentHydrationNode(ret);
}
function adoptTemplateImpl(node, template) {
  if (!(template[0] === "<" && template[1] === "!")) {
    while (node.nodeType === 8) {
      node = node.nextSibling;
      if (template.trim() === "" && isComment(node, "]") && isComment(node.previousSibling, "[")) {
        node.before(node = createTextNode());
        break;
      }
    }
  }
  const type = node.nodeType;
  if (
    // comment node
    type === 8 && !template.startsWith("<!") || // element node
    type === 1 && !template.startsWith(`<` + node.tagName.toLowerCase())
  ) {
    node = handleMismatch(node, template);
  }
  currentHydrationNode = node.nextSibling;
  return node;
}
function nextNode(node) {
  return isComment(node, "[") ? locateEndAnchor(node).nextSibling : node.nextSibling;
}
function locateHydrationNodeImpl() {
  let node;
  if (insertionAnchor !== void 0) {
    const { $lpn: lastPrepend, $lan: lastAppend, firstChild } = insertionParent;
    if (insertionAnchor === 0) {
      node = insertionParent.$lpn = lastPrepend ? nextNode(lastPrepend) : firstChild;
    } else if (insertionAnchor instanceof Node) {
      const { $lin: lastInsertedNode } = insertionAnchor;
      node = insertionAnchor.$lin = lastInsertedNode ? nextNode(lastInsertedNode) : insertionAnchor;
    } else {
      node = insertionParent.$lan = lastAppend ? nextNode(lastAppend) : insertionAnchor === null ? firstChild : locateChildByLogicalIndex(insertionParent, insertionAnchor);
    }
  } else {
    node = currentHydrationNode;
    if (insertionParent && (!node || node.parentNode !== insertionParent)) {
      node = insertionParent.firstChild;
    }
  }
  resetInsertionState();
  currentHydrationNode = node;
}
function locateEndAnchor(node, open = "[", close = "]") {
  if (node.$fe) {
    return node.$fe;
  }
  const stack = [node];
  while ((node = node.nextSibling) && stack.length > 0) {
    if (node.nodeType === 8) {
      if (node.data === open) {
        stack.push(node);
      } else if (node.data === close) {
        const matchingOpen = stack.pop();
        matchingOpen.$fe = node;
        if (stack.length === 0) return node;
      }
    }
  }
  return null;
}
function handleMismatch(node, template) {
  if (!isMismatchAllowed(node.parentElement, 1)) {
    logMismatchError();
  }
  if (isComment(node, "[")) {
    const end = locateEndAnchor(node);
    while (true) {
      const next2 = _next(node);
      if (next2 && next2 !== end) {
        remove(next2, parentNode(node));
      } else {
        break;
      }
    }
  }
  const next = _next(node);
  const container = parentNode(node);
  remove(node, container);
  if (template[0] !== "<") {
    return container.insertBefore(createTextNode(template), next);
  }
  const t = createElement("template");
  t.innerHTML = template;
  const newNode = _child(t.content).cloneNode(true);
  newNode.innerHTML = node.innerHTML;
  Array.from(node.attributes).forEach((attr) => {
    newNode.setAttribute(attr.name, attr.value);
  });
  container.insertBefore(newNode, next);
  return newNode;
}
let hasLoggedMismatchError = false;
const logMismatchError = () => {
  if (hasLoggedMismatchError) {
    return;
  }
  console.error("Hydration completed but contains mismatches.");
  hasLoggedMismatchError = true;
};

class RenderEffect extends ReactiveEffect {
  constructor(render) {
    super();
    this.render = render;
    const instance = currentInstance;
    const job = () => {
      if (this.dirty) {
        this.run();
      }
    };
    this.updateJob = () => {
      instance.isUpdating = false;
      instance.u && invokeArrayFns(instance.u);
    };
    if (instance) {
      job.i = instance;
    }
    this.job = job;
    this.i = instance;
  }
  fn() {
    const instance = this.i;
    const scope = this.subs ? this.subs.sub : void 0;
    const hasUpdateHooks = instance && (instance.bu || instance.u);
    const prev = setCurrentInstance(instance, scope);
    if (hasUpdateHooks && instance.isMounted && !instance.isUpdating) {
      instance.isUpdating = true;
      instance.bu && invokeArrayFns(instance.bu);
      this.render();
      queuePostFlushCb(this.updateJob);
    } else {
      this.render();
    }
    setCurrentInstance(...prev);
  }
  notify() {
    const flags = this.flags;
    if (!(flags & 256)) {
      queueJob(this.job, this.i ? this.i.uid : void 0);
    }
  }
}
function renderEffect(fn, noLifecycle = false) {
  const effect = new RenderEffect(fn);
  if (noLifecycle) {
    effect.fn = fn;
  }
  effect.run();
}

const decorate$1 = (t) => {
  t.displayName = "VaporTransition";
  t.props = TransitionPropsValidators;
  t.__vapor = true;
  return t;
};
const VaporTransition = /* @__PURE__ */ decorate$1(
  (props, { slots, attrs }) => {
    let resetDisplay;
    if (isHydrating && currentHydrationNode && isTemplateNode(currentHydrationNode)) {
      const {
        content: { firstChild },
        parentNode
      } = currentHydrationNode;
      if (firstChild) {
        if (firstChild instanceof HTMLElement || firstChild instanceof SVGElement) {
          const originalDisplay = firstChild.style.display;
          firstChild.style.display = "none";
          resetDisplay = () => firstChild.style.display = originalDisplay;
        }
        parentNode.replaceChild(firstChild, currentHydrationNode);
        setCurrentHydrationNode(firstChild);
      }
    }
    const children = slots.default && slots.default();
    if (!children) return;
    const instance = currentInstance;
    const { mode } = props;
    let resolvedProps;
    let isMounted = false;
    renderEffect(() => {
      resolvedProps = resolveTransitionProps(props);
      if (isMounted) {
        if (isFragment(children)) {
          children.$transition.props = resolvedProps;
        } else {
          const child = findTransitionBlock(children);
          if (child) {
            child.$transition.props = resolvedProps;
            applyTransitionHooks(child, child.$transition);
          }
        }
      } else {
        isMounted = true;
      }
    });
    let fallthroughAttrs = true;
    if (instance.hasFallthrough) {
      renderEffect(() => {
        const resolvedAttrs = extend({}, attrs);
        const child = findTransitionBlock(children);
        if (child) {
          child.$root = true;
          applyFallthroughProps(child, resolvedAttrs);
          fallthroughAttrs = false;
        }
      });
    }
    const hooks = applyTransitionHooks(
      children,
      {
        state: useTransitionState(),
        props: resolvedProps,
        instance
      },
      fallthroughAttrs
    );
    if (resetDisplay && resolvedProps.appear) {
      const child = findTransitionBlock(children);
      hooks.beforeEnter(child);
      resetDisplay();
      queuePostFlushCb(() => hooks.enter(child));
    }
    return children;
  }
);
const getTransitionHooksContext = (key, props, state, instance, postClone) => {
  const { leavingNodes } = state;
  const context = {
    setLeavingNodeCache: (el) => {
      leavingNodes.set(key, el);
    },
    unsetLeavingNodeCache: (el) => {
      const leavingNode = leavingNodes.get(key);
      if (leavingNode === el) {
        leavingNodes.delete(key);
      }
    },
    earlyRemove: () => {
      const leavingNode = leavingNodes.get(key);
      if (leavingNode && leavingNode[leaveCbKey]) {
        leavingNode[leaveCbKey]();
      }
    },
    cloneHooks: (block) => {
      const hooks = resolveTransitionHooks(
        block,
        props,
        state,
        instance,
        postClone
      );
      if (postClone) postClone(hooks);
      return hooks;
    }
  };
  return context;
};
function resolveTransitionHooks(block, props, state, instance, postClone) {
  const context = getTransitionHooksContext(
    String(block.$key),
    props,
    state,
    instance,
    postClone
  );
  const hooks = baseResolveTransitionHooks(
    context,
    props,
    state,
    instance
  );
  hooks.state = state;
  hooks.props = props;
  hooks.instance = instance;
  return hooks;
}
function applyTransitionHooks(block, hooks, fallthroughAttrs = true) {
  const isFrag = isFragment(block);
  const child = findTransitionBlock(block);
  if (!child) {
    if (isFrag) setTransitionHooksOnFragment(block, hooks);
    return hooks;
  }
  const { props, instance, state, delayedLeave } = hooks;
  let resolvedHooks = resolveTransitionHooks(
    child,
    props,
    state,
    instance,
    (hooks2) => resolvedHooks = hooks2
  );
  resolvedHooks.delayedLeave = delayedLeave;
  setTransitionHooks(child, resolvedHooks);
  if (isFrag) setTransitionHooksOnFragment(block, resolvedHooks);
  if (fallthroughAttrs && instance.hasFallthrough) {
    child.$root = true;
    renderEffect(() => applyFallthroughProps(child, instance.attrs));
  }
  return resolvedHooks;
}
function applyTransitionLeaveHooks(block, enterHooks, afterLeaveCb) {
  const leavingBlock = findTransitionBlock(block);
  if (!leavingBlock) return void 0;
  const { props, state, instance } = enterHooks;
  const leavingHooks = resolveTransitionHooks(
    leavingBlock,
    props,
    state,
    instance
  );
  setTransitionHooks(leavingBlock, leavingHooks);
  const { mode } = props;
  if (mode === "out-in") {
    state.isLeaving = true;
    leavingHooks.afterLeave = () => {
      state.isLeaving = false;
      afterLeaveCb();
      leavingBlock.$transition = void 0;
      delete leavingHooks.afterLeave;
    };
  } else if (mode === "in-out") {
    leavingHooks.delayLeave = (block2, earlyRemove, delayedLeave) => {
      state.leavingNodes.set(String(leavingBlock.$key), leavingBlock);
      block2[leaveCbKey] = () => {
        earlyRemove();
        block2[leaveCbKey] = void 0;
        leavingBlock.$transition = void 0;
        delete enterHooks.delayedLeave;
      };
      enterHooks.delayedLeave = () => {
        delayedLeave();
        leavingBlock.$transition = void 0;
        delete enterHooks.delayedLeave;
      };
    };
  }
}
const transitionBlockCache = /* @__PURE__ */ new WeakMap();
function findTransitionBlock(block, inFragment = false) {
  if (transitionBlockCache.has(block)) {
    return transitionBlockCache.get(block);
  }
  let child;
  if (block instanceof Node) {
    if (block instanceof Element) child = block;
  } else if (isVaporComponent(block)) {
    child = findTransitionBlock(block.block);
    if (child && child.$key === void 0) child.$key = block.uid;
  } else if (isArray(block)) {
    child = block[0];
    for (const c of block) {
      const item = findTransitionBlock(c);
      if (item instanceof Element) {
        child = item;
        break;
      }
    }
  } else if (isFragment(block)) {
    if (block.insert) {
      child = block;
    } else {
      child = findTransitionBlock(block.nodes, true);
    }
  }
  return child;
}
function setTransitionHooksOnFragment(block, hooks) {
  if (isFragment(block)) {
    setTransitionHooks(block, hooks);
  } else if (isArray(block)) {
    for (let i = 0; i < block.length; i++) {
      setTransitionHooksOnFragment(block[i], hooks);
    }
  }
}
function setTransitionHooks(block, hooks) {
  if (isVaporComponent(block)) {
    block = findTransitionBlock(block.block);
    if (!block) return;
  }
  block.$transition = hooks;
}

class VaporFragment {
  constructor(nodes) {
    this.nodes = nodes;
  }
}
class DynamicFragment extends VaporFragment {
  constructor(anchorLabel) {
    super([]);
    this.hydrate = (isEmpty = false) => {
      if (this.anchor) return;
      if (this.anchorLabel === "if" && isEmpty) {
        this.anchor = currentHydrationNode;
        if (!this.anchor) {
          throw new Error("Failed to locate if anchor");
        } else {
          return;
        }
      }
      if (this.anchorLabel === "slot") {
        if (isEmpty && isComment(currentHydrationNode, "")) {
          this.anchor = currentHydrationNode;
          return;
        }
        this.anchor = currentHydrationNode;
        if (!this.anchor) {
          throw new Error("Failed to locate slot anchor");
        } else {
          return;
        }
      }
      const { parentNode, nextSibling } = findLastChild(this);
      queuePostFlushCb(() => {
        parentNode.insertBefore(
          this.anchor = createTextNode(),
          nextSibling
        );
      });
    };
    if (isHydrating) {
      locateHydrationNode();
      this.anchorLabel = anchorLabel;
    } else {
      this.anchor = createTextNode();
    }
  }
  update(render, key = render) {
    if (key === this.current) {
      if (isHydrating) this.hydrate(true);
      return;
    }
    this.current = key;
    const prevSub = setActiveSub();
    const parent = isHydrating ? null : this.anchor.parentNode;
    const transition = this.$transition;
    const renderBranch = () => {
      if (render) {
        this.scope = new EffectScope();
        this.nodes = this.scope.run(render) || [];
        if (transition) {
          this.$transition = applyTransitionHooks(this.nodes, transition);
        }
        if (parent) insert(this.nodes, parent, this.anchor);
      } else {
        this.scope = void 0;
        this.nodes = [];
      }
    };
    if (this.scope) {
      this.scope.stop();
      const mode = transition && transition.mode;
      if (mode) {
        applyTransitionLeaveHooks(this.nodes, transition, renderBranch);
        parent && remove(this.nodes, parent);
        if (mode === "out-in") {
          setActiveSub(prevSub);
          return;
        }
      } else {
        parent && remove(this.nodes, parent);
      }
    }
    renderBranch();
    if (this.fallback) {
      const hasNestedFragment = isFragment(this.nodes);
      if (hasNestedFragment) {
        setFragmentFallback(this.nodes, this.fallback);
      }
      const invalidFragment = findInvalidFragment(this);
      if (invalidFragment) {
        parent && remove(this.nodes, parent);
        const scope = this.scope || (this.scope = new EffectScope());
        scope.run(() => {
          if (hasNestedFragment) {
            renderFragmentFallback(invalidFragment);
          } else {
            this.nodes = this.fallback() || [];
          }
        });
        parent && insert(this.nodes, parent, this.anchor);
      }
    }
    setActiveSub(prevSub);
    if (isHydrating) this.hydrate();
  }
}
class ForFragment extends VaporFragment {
  constructor(nodes) {
    super(nodes);
  }
}
function isFragment(val) {
  return val instanceof VaporFragment;
}
function setFragmentFallback(fragment, fallback) {
  if (fragment.fallback) {
    const originalFallback = fragment.fallback;
    fragment.fallback = () => {
      const fallbackNodes = originalFallback();
      if (isValidBlock(fallbackNodes)) {
        return fallbackNodes;
      }
      return fallback();
    };
  } else {
    fragment.fallback = fallback;
  }
  if (isFragment(fragment.nodes)) {
    setFragmentFallback(fragment.nodes, fragment.fallback);
  }
}
function renderFragmentFallback(fragment) {
  if (fragment instanceof ForFragment) {
    fragment.nodes[0] = [fragment.fallback() || []];
  } else if (fragment instanceof DynamicFragment) {
    fragment.update(fragment.fallback);
  } else ;
}
function findInvalidFragment(fragment) {
  if (isValidBlock(fragment.nodes)) return null;
  return isFragment(fragment.nodes) ? findInvalidFragment(fragment.nodes) || fragment : fragment;
}
function findLastChild(node) {
  if (node && node instanceof Node) {
    return node;
  } else if (isArray(node)) {
    return findLastChild(node[node.length - 1]);
  } else if (isVaporComponent(node)) {
    return findLastChild(node.block);
  } else {
    if (node.anchor) return node.anchor;
    return findLastChild(node.nodes);
  }
}

function addEventListener(el, event, handler, options) {
  el.addEventListener(event, handler, options);
  return () => el.removeEventListener(event, handler, options);
}
function on(el, event, handler, options = {}) {
  addEventListener(el, event, handler, options);
  if (options.effect) {
    onEffectCleanup(() => {
      el.removeEventListener(event, handler, options);
    });
  }
}
function delegate(el, event, handler) {
  const key = `$evt${event}`;
  const existing = el[key];
  if (existing) {
    if (isArray(existing)) {
      existing.push(handler);
    } else {
      el[key] = [existing, handler];
    }
  } else {
    el[key] = handler;
  }
}
const delegatedEvents = /* @__PURE__ */ Object.create(null);
const delegateEvents = (...names) => {
  for (const name of names) {
    if (!delegatedEvents[name]) {
      delegatedEvents[name] = true;
      document.addEventListener(name, delegatedEventHandler);
    }
  }
};
const delegatedEventHandler = (e) => {
  let node = e.composedPath && e.composedPath()[0] || e.target;
  if (e.target !== node) {
    Object.defineProperty(e, "target", {
      configurable: true,
      value: node
    });
  }
  Object.defineProperty(e, "currentTarget", {
    configurable: true,
    get() {
      return node || document;
    }
  });
  while (node !== null) {
    const handlers = node[`$evt${e.type}`];
    if (handlers) {
      if (isArray(handlers)) {
        for (const handler of handlers) {
          if (!node.disabled) {
            handler(e);
            if (e.cancelBubble) return;
          }
        }
      } else {
        handlers(e);
        if (e.cancelBubble) return;
      }
    }
    node = node.host && node.host !== node && node.host instanceof Node ? node.host : node.parentNode;
  }
};
function setDynamicEvents(el, events) {
  for (const name in events) {
    on(el, name, events[name], { effect: true });
  }
}

const hasFallthroughKey = (key) => currentInstance.hasFallthrough && key in currentInstance.attrs;
function setProp(el, key, value) {
  if (key in el) {
    setDOMProp(el, key, value);
  } else {
    setAttr(el, key, value);
  }
}
function setAttr(el, key, value) {
  if (!isApplyingFallthroughProps && el.$root && hasFallthroughKey(key)) {
    return;
  }
  if (key === "true-value") {
    el._trueValue = value;
  } else if (key === "false-value") {
    el._falseValue = value;
  }
  if (value !== el[`$${key}`]) {
    el[`$${key}`] = value;
    if (value != null) {
      el.setAttribute(key, value);
    } else {
      el.removeAttribute(key);
    }
  }
}
function setDOMProp(el, key, value, forceHydrate = false) {
  if (!isApplyingFallthroughProps && el.$root && hasFallthroughKey(key)) {
    return;
  }
  const prev = el[key];
  if (value === prev) {
    return;
  }
  let needRemove = false;
  if (value === "" || value == null) {
    const type = typeof prev;
    if (type === "boolean") {
      value = includeBooleanAttr(value);
    } else if (value == null && type === "string") {
      value = "";
      needRemove = true;
    } else if (type === "number") {
      value = 0;
      needRemove = true;
    }
  }
  try {
    el[key] = value;
  } catch (e) {
  }
  needRemove && el.removeAttribute(key);
}
function setClass(el, value) {
  if (el.$root) {
    setClassIncremental(el, value);
  } else {
    value = normalizeClass(value);
    if (value !== el.$cls) {
      el.className = el.$cls = value;
    }
  }
}
function setClassIncremental(el, value) {
  const cacheKey = `$clsi${isApplyingFallthroughProps ? "$" : ""}`;
  const normalizedValue = normalizeClass(value);
  const prev = el[cacheKey];
  if ((value = el[cacheKey] = normalizedValue) !== prev) {
    const nextList = value.split(/\s+/);
    if (value) {
      el.classList.add(...nextList);
    }
    if (prev) {
      for (const cls of prev.split(/\s+/)) {
        if (!nextList.includes(cls)) el.classList.remove(cls);
      }
    }
  }
}
function setStyle(el, value) {
  if (el.$root) {
    setStyleIncremental(el, value);
  } else {
    const normalizedValue = normalizeStyle(value);
    patchStyle(el, el.$sty, el.$sty = normalizedValue);
  }
}
function setStyleIncremental(el, value) {
  const cacheKey = `$styi${isApplyingFallthroughProps ? "$" : ""}`;
  const normalizedValue = isString(value) ? parseStringStyle(value) : normalizeStyle(value);
  patchStyle(el, el[cacheKey], el[cacheKey] = normalizedValue);
}
function setValue(el, value, forceHydrate = false) {
  if (!isApplyingFallthroughProps && el.$root && hasFallthroughKey("value")) {
    return;
  }
  el._value = value;
  const oldValue = el.tagName === "OPTION" ? el.getAttribute("value") : el.value;
  const newValue = value == null ? "" : value;
  if (oldValue !== newValue) {
    el.value = newValue;
  }
  if (value == null) {
    el.removeAttribute("value");
  }
}
function setText(el, value) {
  if (isHydrating) {
    const clientText = getClientText(el.parentNode, value);
    if (el.nodeValue == clientText) {
      el.$txt = clientText;
      return;
    }
    logMismatchError();
  }
  if (el.$txt !== value) {
    el.nodeValue = el.$txt = value;
  }
}
function setElementText(el, value) {
  value = toDisplayString(value);
  if (isHydrating) {
    let clientText = getClientText(el, value);
    if (el.textContent === clientText) {
      el.$txt = clientText;
      return;
    }
    if (!isMismatchAllowed(el, 0)) {
      logMismatchError();
    }
  }
  if (el.$txt !== value) {
    el.textContent = el.$txt = value;
  }
}
function setHtml(el, value) {
  value = value == null ? "" : value;
  if (el.$html !== value) {
    el.innerHTML = el.$html = value;
  }
}
function setDynamicProps(el, args) {
  const props = args.length > 1 ? mergeProps(...args) : args[0];
  const cacheKey = `$dprops${isApplyingFallthroughProps ? "$" : ""}`;
  const prevKeys = el[cacheKey];
  if (prevKeys) {
    for (const key of prevKeys) {
      if (!(key in props)) {
        setDynamicProp(el, key, null);
      }
    }
  }
  for (const key of el[cacheKey] = Object.keys(props)) {
    setDynamicProp(el, key, props[key]);
  }
}
function setDynamicProp(el, key, value) {
  const isSVG = false;
  let forceHydrate = false;
  if (key === "class") {
    setClass(el, value);
  } else if (key === "style") {
    setStyle(el, value);
  } else if (isOn(key)) {
    on(el, key[2].toLowerCase() + key.slice(3), value, { effect: true });
  } else if (
    // force hydrate v-bind with .prop modifiers
    (forceHydrate = key[0] === ".") ? (key = key.slice(1), true) : key[0] === "^" ? (key = key.slice(1), false) : shouldSetAsProp(el, key, value, isSVG)
  ) {
    if (key === "innerHTML") {
      setHtml(el, value);
    } else if (key === "textContent") {
      setElementText(el, value);
    } else if (key === "value" && canSetValueDirectly(el.tagName)) {
      setValue(el, value, forceHydrate);
    } else {
      setDOMProp(el, key, value, forceHydrate);
    }
  } else {
    setAttr(el, key, value);
  }
  return value;
}
let isOptimized = false;
function optimizePropertyLookup() {
  if (isOptimized) return;
  isOptimized = true;
  const proto = Element.prototype;
  proto.$transition = void 0;
  proto.$key = void 0;
  proto.$fc = proto.$evtclick = void 0;
  proto.$root = false;
  proto.$html = proto.$txt = proto.$cls = proto.$sty = Text.prototype.$txt = "";
}
function getClientText(el, value) {
  if (value[0] === "\n" && (el.tagName === "PRE" || el.tagName === "TEXTAREA")) {
    value = value.slice(1);
  }
  return value;
}

const interopKey = Symbol(`interop`);
const vaporInteropImpl = {
  mount(vnode, container, anchor, parentComponent) {
    let selfAnchor = vnode.el = vnode.anchor = createTextNode();
    if (isHydrating) {
      queuePostFlushCb(() => container.insertBefore(selfAnchor, anchor));
    } else {
      container.insertBefore(selfAnchor, anchor);
    }
    const prev = currentInstance;
    simpleSetCurrentInstance(parentComponent);
    const props = {};
    for (const key in vnode.props) {
      if (!isReservedProp(key)) {
        props[key] = vnode.props[key];
      }
    }
    const propsRef = shallowRef(props);
    const slotsRef = shallowRef(vnode.children);
    const dynamicPropSource = [
      () => propsRef.value
    ];
    dynamicPropSource[interopKey] = true;
    const instance = vnode.component = createComponent(
      vnode.type,
      {
        $: dynamicPropSource
      },
      {
        _: slotsRef
        // pass the slots ref
      },
      void 0,
      void 0,
      void 0,
      parentComponent ? parentComponent.appContext : vnode.appContext
    );
    instance.rawPropsRef = propsRef;
    instance.rawSlotsRef = slotsRef;
    if (vnode.transition) {
      setTransitionHooks(
        instance,
        vnode.transition
      );
    }
    mountComponent(instance, container, selfAnchor);
    simpleSetCurrentInstance(prev);
    return instance;
  },
  update(n1, n2, shouldUpdate) {
    n2.component = n1.component;
    n2.el = n2.anchor = n1.anchor;
    if (shouldUpdate) {
      const instance = n2.component;
      instance.rawPropsRef.value = n2.props;
      instance.rawSlotsRef.value = n2.children;
    }
  },
  unmount(vnode, doRemove) {
    const container = doRemove ? vnode.anchor.parentNode : void 0;
    if (vnode.component) {
      unmountComponent(vnode.component, container);
    } else if (vnode.vb) {
      remove(vnode.vb, container);
    }
    remove(vnode.anchor, container);
  },
  /**
   * vapor slot in vdom
   */
  slot(n1, n2, container, anchor) {
    if (!n1) {
      let selfAnchor;
      const { slot, fallback } = n2.vs;
      const propsRef = n2.vs.ref = shallowRef(n2.props);
      const slotBlock = slot(new Proxy(propsRef, vaporSlotPropsProxyHandler));
      if (fallback && isFragment(slotBlock)) {
        setFragmentFallback(slotBlock, createFallback(fallback));
        selfAnchor = slotBlock.anchor;
      }
      if (!selfAnchor) selfAnchor = createTextNode();
      insert(n2.el = n2.anchor = selfAnchor, container, anchor);
      insert(n2.vb = slotBlock, container, selfAnchor);
    } else {
      n2.el = n2.anchor = n1.anchor;
      n2.vb = n1.vb;
      (n2.vs.ref = n1.vs.ref).value = n2.props;
    }
  },
  move(vnode, container, anchor) {
    insert(vnode.vb || vnode.component, container, anchor);
    insert(vnode.anchor, container, anchor);
  },
  setTransitionHooks(component, hooks) {
    setTransitionHooks(component, hooks);
  },
  hydrate(vnode, node, container, anchor, parentComponent) {
    hydrateNode(
      node,
      () => this.mount(vnode, container, anchor, parentComponent)
    );
    return _next(node);
  },
  hydrateSlot(vnode, node) {
    const { slot } = vnode.vs;
    const propsRef = vnode.vs.ref = shallowRef(vnode.props);
    hydrateNode(node, () => {
      vnode.vb = slot(new Proxy(propsRef, vaporSlotPropsProxyHandler));
      vnode.anchor = vnode.el = currentHydrationNode;
    });
    return _next(vnode.anchor);
  }
};
const vaporSlotPropsProxyHandler = {
  get(target, key) {
    return target.value[key];
  },
  has(target, key) {
    return target.value[key];
  },
  ownKeys(target) {
    return Object.keys(target.value);
  }
};
const vaporSlotsProxyHandler = {
  get(target, key) {
    const slot = target[key];
    if (isFunction(slot)) {
      slot.__vapor = true;
    }
    return slot;
  }
};
let vdomHydrateNode;
function createVDOMComponent(internals, component, rawProps, rawSlots, scopeId) {
  const frag = new VaporFragment([]);
  const vnode = createVNode(
    component,
    rawProps && extend({}, new Proxy(rawProps, rawPropsProxyHandlers))
  );
  const wrapper = new VaporComponentInstance(
    { props: component.props },
    rawProps,
    rawSlots
  );
  vnode.vi = (instance) => {
    instance.props = shallowReactive(wrapper.props);
    const attrs = instance.attrs = createInternalObject();
    for (const key in wrapper.attrs) {
      if (!isEmitListener(instance.emitsOptions, key)) {
        attrs[key] = wrapper.attrs[key];
      }
    }
    instance.slots = wrapper.slots === EMPTY_OBJ ? EMPTY_OBJ : new Proxy(wrapper.slots, vaporSlotsProxyHandler);
  };
  let isMounted = false;
  const parentInstance = currentInstance;
  const unmount = (parentNode, transition) => {
    if (transition) setTransitionHooks$1(vnode, transition);
    internals.umt(vnode.component, null, !!parentNode);
  };
  vnode.scopeId = parentInstance && parentInstance.type.__scopeId;
  frag.hydrate = () => {
    hydrateVNode(vnode, parentInstance);
    onScopeDispose(unmount, true);
    isMounted = true;
    frag.nodes = [vnode.el];
  };
  frag.insert = (parentNode, anchor, transition) => {
    if (isHydrating) return;
    const prev = currentInstance;
    simpleSetCurrentInstance(parentInstance);
    if (!isMounted) {
      if (transition) setTransitionHooks$1(vnode, transition);
      internals.mt(
        vnode,
        parentNode,
        anchor,
        parentInstance,
        null,
        void 0,
        false
      );
      onScopeDispose(unmount, true);
      isMounted = true;
    } else {
      internals.m(
        vnode,
        parentNode,
        anchor,
        2,
        parentInstance
      );
    }
    frag.nodes = [vnode.el];
    simpleSetCurrentInstance(prev);
  };
  frag.remove = unmount;
  return frag;
}
function renderVDOMSlot(internals, slotsRef, name, props, parentComponent, fallback) {
  const frag = new VaporFragment([]);
  let isMounted = false;
  let fallbackNodes;
  let oldVNode = null;
  frag.fallback = fallback;
  frag.insert = (parentNode, anchor) => {
    if (isHydrating) return;
    if (!isMounted) {
      render(parentNode, anchor);
      isMounted = true;
    } else {
      if (oldVNode) {
        internals.m(
          oldVNode,
          parentNode,
          anchor,
          2,
          parentComponent
        );
      }
    }
    frag.remove = (parentNode2) => {
      if (fallbackNodes) {
        remove(fallbackNodes, parentNode2);
      } else if (oldVNode) {
        internals.um(oldVNode, parentComponent, null);
      }
    };
  };
  const render = (parentNode, anchor) => {
    renderEffect(() => {
      let vnode;
      let isValidSlot = false;
      if (slotsRef.value) {
        vnode = renderSlot(
          slotsRef.value,
          isFunction(name) ? name() : name,
          props
        );
        let children = vnode.children;
        ensureVaporSlotFallback(children, fallback);
        isValidSlot = children.length > 0;
      }
      if (isValidSlot) {
        if (isHydrating) {
          if (isVNode(vnode)) {
            hydrateVNode(vnode, parentComponent);
          }
        } else {
          if (fallbackNodes) {
            remove(fallbackNodes, parentNode);
            fallbackNodes = void 0;
          }
          internals.p(
            oldVNode,
            vnode,
            parentNode,
            anchor,
            parentComponent,
            null,
            void 0,
            null,
            false
          );
        }
        oldVNode = vnode;
      } else {
        fallback = frag.fallback;
        if (fallback && !fallbackNodes) {
          fallbackNodes = fallback(internals, parentComponent);
          if (isHydrating) {
            if (isVNode(vnode)) {
              hydrateVNode(fallbackNodes, parentComponent);
            }
          } else {
            if (oldVNode) {
              internals.um(oldVNode, parentComponent, null, true);
            }
            insert(fallbackNodes, parentNode, anchor);
          }
        }
        oldVNode = null;
      }
    });
  };
  frag.hydrate = () => {
    render();
    isMounted = true;
  };
  return frag;
}
const vaporInteropPlugin = (app) => {
  const internals = ensureRenderer().internals;
  app._context.vapor = extend(vaporInteropImpl, {
    vdomMount: createVDOMComponent.bind(null, internals),
    vdomUnmount: internals.umt,
    vdomSlot: renderVDOMSlot.bind(null, internals)
  });
  const mount = app.mount;
  app.mount = ((...args) => {
    optimizePropertyLookup();
    return mount(...args);
  });
};
const createFallback = (fallback) => (internals, parentComponent) => {
  const fallbackNodes = fallback();
  if (isArray(fallbackNodes) && fallbackNodes.every(isVNode)) {
    const frag = new VaporFragment([]);
    frag.insert = (parentNode, anchor) => {
      fallbackNodes.forEach((vnode) => {
        if (isHydrating) {
          hydrateVNode(vnode, parentComponent);
        } else {
          internals.p(null, vnode, parentNode, anchor, parentComponent);
        }
      });
    };
    frag.remove = (parentNode) => {
      fallbackNodes.forEach((vnode) => {
        internals.um(vnode, parentComponent, null, true);
      });
    };
    return frag;
  }
  return fallbackNodes;
};
function hydrateVNode(vnode, parentComponent) {
  locateHydrationNode();
  let node = currentHydrationNode;
  while (isComment(node, "[") && // vnode is not a fragment
  vnode.type !== Fragment && // not inside vdom slot
  !(isVaporComponent(parentComponent) && isRef(parentComponent.rawSlots._))) {
    node = node.nextSibling;
  }
  if (currentHydrationNode !== node) setCurrentHydrationNode(node);
  if (!vdomHydrateNode) vdomHydrateNode = ensureHydrationRenderer().hydrateNode;
  const nextNode = vdomHydrateNode(
    currentHydrationNode,
    vnode,
    parentComponent,
    null,
    null,
    false
  );
  if (nextNode) setCurrentHydrationNode(nextNode);
  else advanceHydrationNode(node);
}

function normalizeEmitsOptions(comp) {
  const cached = comp.__emitsOptions;
  if (cached) return cached;
  const raw = comp.emits;
  if (!raw) return null;
  let normalized;
  if (isArray(raw)) {
    normalized = {};
    for (const key of raw) normalized[key] = null;
  } else {
    normalized = raw;
  }
  return comp.__emitsOptions = normalized;
}
function emit(instance, event, ...rawArgs) {
  baseEmit(
    instance,
    instance.rawProps || EMPTY_OBJ,
    propGetter,
    event,
    ...rawArgs
  );
}
function propGetter(rawProps, key) {
  const dynamicSources = rawProps.$;
  if (dynamicSources) {
    let i = dynamicSources.length;
    while (i--) {
      const source = resolveSource(dynamicSources[i]);
      if (hasOwn(source, key))
        return dynamicSources[interopKey] ? source[key] : resolveSource(source[key]);
    }
  }
  return rawProps[key] && resolveSource(rawProps[key]);
}

function resolveSource(source) {
  return isFunction(source) ? source() : source;
}
function getPropsProxyHandlers(comp) {
  if (comp.__propsHandlers) {
    return comp.__propsHandlers;
  }
  const propsOptions = normalizePropsOptions(comp)[0];
  const emitsOptions = normalizeEmitsOptions(comp);
  const isProp = propsOptions ? (key) => isString(key) && hasOwn(propsOptions, camelize(key)) : NO;
  const isAttr = propsOptions ? (key) => key !== "$" && !isProp(key) && !isEmitListener(emitsOptions, key) : YES;
  const getProp = (instance, key) => {
    if (key === "__v_isReactive") return true;
    if (!isProp(key)) return;
    const rawProps = instance.rawProps;
    const dynamicSources = rawProps.$;
    if (dynamicSources) {
      let i = dynamicSources.length;
      let source, isDynamic, rawKey;
      while (i--) {
        source = dynamicSources[i];
        isDynamic = isFunction(source);
        source = isDynamic ? source() : source;
        for (rawKey in source) {
          if (camelize(rawKey) === key) {
            return resolvePropValue(
              propsOptions,
              key,
              isDynamic ? source[rawKey] : source[rawKey](),
              instance,
              resolveDefault
            );
          }
        }
      }
    }
    for (const rawKey in rawProps) {
      if (camelize(rawKey) === key) {
        return resolvePropValue(
          propsOptions,
          key,
          rawProps[rawKey](),
          instance,
          resolveDefault
        );
      }
    }
    return resolvePropValue(
      propsOptions,
      key,
      void 0,
      instance,
      resolveDefault,
      true
    );
  };
  const propsHandlers = propsOptions ? {
    get: (target, key) => getProp(target, key),
    has: (_, key) => isProp(key),
    ownKeys: () => Object.keys(propsOptions),
    getOwnPropertyDescriptor(target, key) {
      if (isProp(key)) {
        return {
          configurable: true,
          enumerable: true,
          get: () => getProp(target, key)
        };
      }
    }
  } : null;
  const getAttr = (target, key) => {
    if (!isProp(key) && !isEmitListener(emitsOptions, key)) {
      return getAttrFromRawProps(target, key);
    }
  };
  const hasAttr = (target, key) => {
    if (isAttr(key)) {
      return hasAttrFromRawProps(target, key);
    } else {
      return false;
    }
  };
  const attrsHandlers = {
    get: (target, key) => getAttr(target.rawProps, key),
    has: (target, key) => hasAttr(target.rawProps, key),
    ownKeys: (target) => getKeysFromRawProps(target.rawProps).filter(isAttr),
    getOwnPropertyDescriptor(target, key) {
      if (hasAttr(target.rawProps, key)) {
        return {
          configurable: true,
          enumerable: true,
          get: () => getAttr(target.rawProps, key)
        };
      }
    }
  };
  return comp.__propsHandlers = [propsHandlers, attrsHandlers];
}
function getAttrFromRawProps(rawProps, key) {
  if (key === "$") return;
  const merged = key === "class" || key === "style" ? [] : void 0;
  const dynamicSources = rawProps.$;
  if (dynamicSources) {
    let i = dynamicSources.length;
    let source, isDynamic;
    while (i--) {
      source = dynamicSources[i];
      isDynamic = isFunction(source);
      source = isDynamic ? source() : source;
      if (source && hasOwn(source, key)) {
        const value = isDynamic ? source[key] : source[key]();
        if (merged) {
          merged.push(value);
        } else {
          return value;
        }
      }
    }
  }
  if (hasOwn(rawProps, key)) {
    if (merged) {
      merged.push(rawProps[key]());
    } else {
      return rawProps[key]();
    }
  }
  if (merged && merged.length) {
    return merged;
  }
}
function hasAttrFromRawProps(rawProps, key) {
  if (key === "$") return false;
  const dynamicSources = rawProps.$;
  if (dynamicSources) {
    let i = dynamicSources.length;
    while (i--) {
      const source = resolveSource(dynamicSources[i]);
      if (source && hasOwn(source, key)) {
        return true;
      }
    }
  }
  return hasOwn(rawProps, key);
}
function getKeysFromRawProps(rawProps) {
  const keys = [];
  for (const key in rawProps) {
    if (key !== "$") keys.push(key);
  }
  const dynamicSources = rawProps.$;
  if (dynamicSources) {
    let i = dynamicSources.length;
    let source;
    while (i--) {
      source = resolveSource(dynamicSources[i]);
      for (const key in source) {
        keys.push(key);
      }
    }
  }
  return Array.from(new Set(keys));
}
function normalizePropsOptions(comp) {
  const cached = comp.__propsOptions;
  if (cached) return cached;
  const raw = comp.props;
  if (!raw) return EMPTY_ARR;
  const normalized = {};
  const needCastKeys = [];
  baseNormalizePropsOptions(raw, normalized, needCastKeys);
  return comp.__propsOptions = [normalized, needCastKeys];
}
function resolveDefault(factory, instance) {
  const prev = setCurrentInstance(instance);
  const res = factory.call(null, instance.props);
  setCurrentInstance(...prev);
  return res;
}
function hasFallthroughAttrs(comp, rawProps) {
  if (rawProps) {
    if (rawProps.$ || !comp.props) {
      return true;
    } else {
      const propsOptions = normalizePropsOptions(comp)[0];
      for (const key in rawProps) {
        if (!hasOwn(propsOptions, camelize(key))) {
          return true;
        }
      }
    }
  }
  return false;
}
function resolveDynamicProps(props) {
  const mergedRawProps = {};
  for (const key in props) {
    if (key !== "$") {
      mergedRawProps[key] = props[key]();
    }
  }
  if (props.$) {
    for (const source of props.$) {
      const isDynamic = isFunction(source);
      const resolved = isDynamic ? source() : source;
      for (const key in resolved) {
        const value = isDynamic ? resolved[key] : resolved[key]();
        if (key === "class" || key === "style") {
          const existing = mergedRawProps[key];
          if (isArray(existing)) {
            existing.push(value);
          } else {
            mergedRawProps[key] = [existing, value];
          }
        } else {
          mergedRawProps[key] = value;
        }
      }
    }
  }
  return mergedRawProps;
}
const rawPropsProxyHandlers = {
  get: getAttrFromRawProps,
  has: hasAttrFromRawProps,
  ownKeys: getKeysFromRawProps,
  getOwnPropertyDescriptor(target, key) {
    if (hasAttrFromRawProps(target, key)) {
      return {
        configurable: true,
        enumerable: true,
        get: () => getAttrFromRawProps(target, key)
      };
    }
  }
};

const VaporTeleportImpl = {
  name: "VaporTeleport",
  __isTeleport: true,
  __vapor: true,
  process(props, slots) {
    return new TeleportFragment(props, slots);
  }
};
class TeleportFragment extends VaporFragment {
  constructor(props, slots) {
    super([]);
    this.insert = (container, anchor) => {
      if (isHydrating) return;
      this.placeholder = createTextNode();
      insert(this.placeholder, container, anchor);
      insert(this.anchor, container, anchor);
      this.handlePropsUpdate();
    };
    this.remove = (parent = this.parent) => {
      if (this.nodes) {
        remove(this.nodes, this.mountContainer);
        this.nodes = [];
      }
      if (this.targetStart) {
        remove(this.targetStart, this.target);
        this.targetStart = void 0;
        remove(this.targetAnchor, this.target);
        this.targetAnchor = void 0;
      }
      if (this.anchor) {
        remove(this.anchor, this.anchor.parentNode);
        this.anchor = void 0;
      }
      if (this.placeholder) {
        remove(this.placeholder, parent);
        this.placeholder = void 0;
      }
      this.mountContainer = void 0;
      this.mountAnchor = void 0;
    };
    this.hydrate = () => {
      const target = this.target = resolveTarget(
        this.resolvedProps,
        querySelector
      );
      const disabled = isTeleportDisabled(this.resolvedProps);
      this.placeholder = currentHydrationNode;
      if (target) {
        const targetNode = target._lpa || target.firstChild;
        if (disabled) {
          this.hydrateDisabledTeleport(targetNode);
        } else {
          this.anchor = locateTeleportEndAnchor();
          this.mountContainer = target;
          let targetAnchor = targetNode;
          while (targetAnchor) {
            if (targetAnchor && targetAnchor.nodeType === 8) {
              if (targetAnchor.data === "teleport start anchor") {
                this.targetStart = targetAnchor;
              } else if (targetAnchor.data === "teleport anchor") {
                this.mountAnchor = this.targetAnchor = targetAnchor;
                target._lpa = this.targetAnchor && this.targetAnchor.nextSibling;
                break;
              }
            }
            targetAnchor = targetAnchor.nextSibling;
          }
          if (targetNode) {
            setCurrentHydrationNode(targetNode.nextSibling);
          }
          if (!this.targetAnchor) {
            this.mount(target);
          } else {
            this.initChildren();
          }
        }
      } else if (disabled) {
        this.hydrateDisabledTeleport(currentHydrationNode);
      }
      advanceHydrationNode(this.anchor);
    };
    this.rawProps = props;
    this.rawSlots = slots;
    this.anchor = isHydrating ? void 0 : createTextNode();
    renderEffect(() => {
      this.resolvedProps = extend(
        {},
        new Proxy(
          this.rawProps,
          rawPropsProxyHandlers
        )
      );
      this.handlePropsUpdate();
    });
    if (!isHydrating) {
      this.initChildren();
    }
  }
  get parent() {
    return this.anchor ? this.anchor.parentNode : null;
  }
  initChildren() {
    renderEffect(() => {
      this.handleChildrenUpdate(
        this.rawSlots.default && this.rawSlots.default()
      );
    });
  }
  handleChildrenUpdate(children) {
    if (!this.parent || isHydrating) {
      this.nodes = children;
      return;
    }
    remove(this.nodes, this.mountContainer);
    insert(this.nodes = children, this.mountContainer, this.mountAnchor);
  }
  handlePropsUpdate() {
    if (!this.parent || isHydrating) return;
    const mount = (parent, anchor) => {
      insert(
        this.nodes,
        this.mountContainer = parent,
        this.mountAnchor = anchor
      );
    };
    const mountToTarget = () => {
      const target = this.target = resolveTarget(
        this.resolvedProps,
        querySelector
      );
      if (target) {
        if (
          // initial mount into target
          !this.targetAnchor || // target changed
          this.targetAnchor.parentNode !== target
        ) {
          insert(this.targetStart = createTextNode(""), target);
          insert(this.targetAnchor = createTextNode(""), target);
        }
        mount(target, this.targetAnchor);
      }
    };
    if (isTeleportDisabled(this.resolvedProps)) {
      mount(this.parent, this.anchor);
    } else {
      if (isTeleportDeferred(this.resolvedProps)) {
        queuePostFlushCb(mountToTarget);
      } else {
        mountToTarget();
      }
    }
  }
  hydrateDisabledTeleport(targetNode) {
    let nextNode = this.placeholder.nextSibling;
    setCurrentHydrationNode(nextNode);
    this.mountAnchor = this.anchor = locateTeleportEndAnchor(nextNode);
    this.mountContainer = this.anchor.parentNode;
    this.targetStart = targetNode;
    this.targetAnchor = targetNode && targetNode.nextSibling;
    this.initChildren();
  }
  mount(target) {
    target.appendChild(this.targetStart = createTextNode(""));
    target.appendChild(
      this.mountAnchor = this.targetAnchor = createTextNode("")
    );
    if (!isMismatchAllowed(target, 1)) {
      logMismatchError();
    }
    runWithoutHydration(this.initChildren.bind(this));
  }
}
function isVaporTeleport(value) {
  return value === VaporTeleportImpl;
}
function locateTeleportEndAnchor(node = currentHydrationNode) {
  while (node) {
    if (isComment(node, "teleport end")) {
      return node;
    }
    node = node.nextSibling;
  }
  return null;
}

function isValidBlock(block) {
  if (block instanceof Node) {
    return !(block instanceof Comment);
  } else if (isVaporComponent(block)) {
    return isValidBlock(block.block);
  } else if (isArray(block)) {
    return block.length > 0 && block.some(isValidBlock);
  } else {
    return isValidBlock(block.nodes);
  }
}
function insert(block, parent, anchor = null, parentSuspense) {
  anchor = anchor === 0 ? parent.$fc || _child(parent) : anchor;
  if (block instanceof Node) {
    if (!isHydrating) {
      if (block instanceof Element && block.$transition && !block.$transition.disabled) {
        performTransitionEnter(
          block,
          block.$transition,
          () => parent.insertBefore(block, anchor),
          parentSuspense
        );
      } else {
        parent.insertBefore(block, anchor);
      }
    }
  } else if (isVaporComponent(block)) {
    if (block.isMounted) {
      insert(block.block, parent, anchor);
    } else {
      mountComponent(block, parent, anchor);
    }
  } else if (isArray(block)) {
    for (const b of block) {
      insert(b, parent, anchor);
    }
  } else {
    if (block.anchor) {
      insert(block.anchor, parent, anchor);
      anchor = block.anchor;
    }
    if (block.insert) {
      block.insert(parent, anchor, block.$transition);
    } else {
      insert(block.nodes, parent, anchor, parentSuspense);
    }
  }
}
function prepend(parent, ...blocks) {
  let i = blocks.length;
  while (i--) insert(blocks[i], parent, 0);
}
function remove(block, parent) {
  if (block instanceof Node) {
    if (block.$transition && block instanceof Element) {
      performTransitionLeave(
        block,
        block.$transition,
        () => parent && parent.removeChild(block)
      );
    } else {
      parent && parent.removeChild(block);
    }
  } else if (isVaporComponent(block)) {
    unmountComponent(block, parent);
  } else if (isArray(block)) {
    for (let i = 0; i < block.length; i++) {
      remove(block[i], parent);
    }
  } else {
    if (block.remove) {
      block.remove(parent, block.$transition);
    } else {
      remove(block.nodes, parent);
    }
    if (block.anchor) remove(block.anchor, parent);
    if (block.scope) {
      block.scope.stop();
    }
  }
}
function normalizeAnchor(node) {
  if (node && node instanceof Node) {
    return node;
  } else if (isArray(node)) {
    return normalizeAnchor(node[0]);
  } else if (isVaporComponent(node)) {
    return normalizeAnchor(node.block);
  } else {
    return normalizeAnchor(node.nodes);
  }
}
function setScopeId(block, scopeId) {
  if (block instanceof Element) {
    block.setAttribute(scopeId, "");
  } else if (isVaporComponent(block)) {
    setScopeId(block.block, scopeId);
  } else if (isArray(block)) {
    for (const b of block) {
      setScopeId(b, scopeId);
    }
  } else if (isFragment(block)) {
    setScopeId(block.nodes, scopeId);
  }
}
function setComponentScopeId(instance) {
  const parent = instance.parent;
  if (!parent) return;
  if (isArray(instance.block) && instance.block.length > 1) return;
  const scopeId = parent.type.__scopeId;
  if (scopeId) {
    setScopeId(instance.block, scopeId);
  }
  if (parent.subTree && parent.subTree.component === instance && parent.vnode.scopeId) {
    setScopeId(instance.block, parent.vnode.scopeId);
    const scopeIds = getInheritedScopeIds(parent.vnode, parent.parent);
    for (const id of scopeIds) {
      setScopeId(instance.block, id);
    }
  }
}

const dynamicSlotsProxyHandlers = {
  get: getSlot,
  has: (target, key) => !!getSlot(target, key),
  getOwnPropertyDescriptor(target, key) {
    const slot = getSlot(target, key);
    if (slot) {
      return {
        configurable: true,
        enumerable: true,
        value: slot
      };
    }
  },
  ownKeys(target) {
    let keys = Object.keys(target);
    const dynamicSources = target.$;
    if (dynamicSources) {
      keys = keys.filter((k) => k !== "$");
      for (const source of dynamicSources) {
        if (isFunction(source)) {
          const slot = source();
          if (isArray(slot)) {
            for (const s of slot) keys.push(String(s.name));
          } else {
            keys.push(String(slot.name));
          }
        } else {
          keys.push(...Object.keys(source));
        }
      }
    }
    return keys;
  },
  set: NO,
  deleteProperty: NO
};
function getSlot(target, key) {
  if (key === "$") return;
  const dynamicSources = target.$;
  if (dynamicSources) {
    let i = dynamicSources.length;
    let source;
    while (i--) {
      source = dynamicSources[i];
      if (isFunction(source)) {
        const slot = source();
        if (slot) {
          if (isArray(slot)) {
            for (const s of slot) {
              if (String(s.name) === key) return s.fn;
            }
          } else if (String(slot.name) === key) {
            return slot.fn;
          }
        }
      } else if (hasOwn(source, key)) {
        return source[key];
      }
    }
  }
  if (hasOwn(target, key)) {
    return target[key];
  }
}
function forwardedSlotCreator() {
  const instance = currentInstance;
  return (name, rawProps, fallback) => createSlot(name, rawProps, fallback, instance);
}
function createSlot(name, rawProps, fallback, i) {
  const _insertionParent = insertionParent;
  const _insertionAnchor = insertionAnchor;
  if (!isHydrating) resetInsertionState();
  const instance = i || currentInstance;
  const rawSlots = instance.rawSlots;
  const slotProps = rawProps ? new Proxy(rawProps, rawPropsProxyHandlers) : EMPTY_OBJ;
  let fragment;
  if (isRef(rawSlots._)) {
    if (isHydrating) locateHydrationNode();
    fragment = instance.appContext.vapor.vdomSlot(
      rawSlots._,
      name,
      slotProps,
      instance,
      fallback
    );
  } else {
    fragment = isHydrating || false ? new DynamicFragment("slot") : new DynamicFragment();
    const isDynamicName = isFunction(name);
    const renderSlot = () => {
      const slot = getSlot(rawSlots, isFunction(name) ? name() : name);
      if (slot) {
        fragment.fallback = fallback;
        fragment.update(slot._bound || (slot._bound = () => slot(slotProps)));
      } else {
        fragment.update(fallback);
      }
    };
    if (isDynamicName || rawSlots.$) {
      renderEffect(renderSlot);
    } else {
      renderSlot();
    }
  }
  if (i) fragment.forwarded = true;
  if (i || !hasForwardedSlot(fragment.nodes)) {
    const scopeId = instance.type.__scopeId;
    if (scopeId) setScopeId(fragment, `${scopeId}-s`);
  }
  if (!isHydrating) {
    if (_insertionParent) insert(fragment, _insertionParent, _insertionAnchor);
  } else {
    if (fragment.insert) {
      fragment.hydrate();
    }
    if (_insertionAnchor !== void 0) {
      advanceHydrationNode(_insertionParent);
    }
  }
  return fragment;
}
function isForwardedSlot(block) {
  return block instanceof DynamicFragment && !!block.forwarded;
}
function hasForwardedSlot(block) {
  if (isArray(block)) {
    return block.some(isForwardedSlot);
  } else {
    return isForwardedSlot(block);
  }
}

function createComponent(component, rawProps, rawSlots, isSingleRoot, once, scopeId, appContext = currentInstance && currentInstance.appContext || emptyContext) {
  const _insertionParent = insertionParent;
  const _insertionAnchor = insertionAnchor;
  if (isHydrating) {
    locateHydrationNode();
  } else {
    resetInsertionState();
  }
  if (isSingleRoot && component.inheritAttrs !== false && isVaporComponent(currentInstance) && currentInstance.hasFallthrough) {
    const attrs = currentInstance.attrs;
    if (rawProps) {
      (rawProps.$ || (rawProps.$ = [])).push(
        () => attrs
      );
    } else {
      rawProps = { $: [() => attrs] };
    }
  }
  if (appContext.vapor && !component.__vapor) {
    const frag = appContext.vapor.vdomMount(
      component,
      rawProps,
      rawSlots,
      scopeId
    );
    if (!isHydrating) {
      if (_insertionParent) insert(frag, _insertionParent, _insertionAnchor);
    } else {
      frag.hydrate();
      if (_insertionAnchor !== void 0) {
        advanceHydrationNode(_insertionParent);
      }
    }
    return frag;
  }
  if (isVaporTeleport(component)) {
    const frag = component.process(rawProps, rawSlots);
    if (!isHydrating) {
      if (_insertionParent) insert(frag, _insertionParent, _insertionAnchor);
    } else {
      frag.hydrate();
      if (_insertionAnchor !== void 0) {
        advanceHydrationNode(_insertionParent);
      }
    }
    return frag;
  }
  const instance = new VaporComponentInstance(
    component,
    rawProps,
    rawSlots,
    appContext
  );
  if (isHydrating && isAsyncWrapper(instance) && component.__asyncHydrate && !component.__asyncResolved) {
    const el = instance.block = currentHydrationNode;
    instance.isMounted = true;
    setCurrentHydrationNode(
      isComment(el, "[") ? locateEndAnchor(el) : el.nextSibling
    );
    component.__asyncHydrate(
      el,
      instance,
      () => setupComponent(instance, component, scopeId)
    );
  } else {
    setupComponent(instance, component, scopeId);
  }
  onScopeDispose(() => unmountComponent(instance), true);
  if (_insertionParent || isHydrating) {
    mountComponent(instance, _insertionParent, _insertionAnchor);
  }
  if (isHydrating && _insertionAnchor !== void 0) {
    advanceHydrationNode(_insertionParent);
  }
  return instance;
}
function setupComponent(instance, component, scopeId) {
  const prevInstance = setCurrentInstance(instance);
  const prevSub = setActiveSub();
  const setupFn = isFunction(component) ? component : component.setup;
  const setupResult = setupFn ? callWithErrorHandling(setupFn, instance, 0, [
    instance.props,
    instance
  ]) || EMPTY_OBJ : EMPTY_OBJ;
  {
    if (!setupFn && component.render) {
      instance.block = callWithErrorHandling(
        component.render,
        instance,
        1
      );
    } else {
      instance.block = setupResult;
    }
  }
  if (instance.hasFallthrough && component.inheritAttrs !== false && Object.keys(instance.attrs).length) {
    const el = getRootElement(instance);
    if (el) {
      renderEffect(() => applyFallthroughProps(el, instance.attrs));
    }
  }
  if (scopeId) setScopeId(instance.block, scopeId);
  setActiveSub(prevSub);
  setCurrentInstance(...prevInstance);
}
let isApplyingFallthroughProps = false;
function applyFallthroughProps(block, attrs) {
  isApplyingFallthroughProps = true;
  setDynamicProps(block, [attrs]);
  isApplyingFallthroughProps = false;
}
const emptyContext = {
  app: null,
  config: {},
  provides: /* @__PURE__ */ Object.create(null)
};
class VaporComponentInstance {
  constructor(comp, rawProps, rawSlots, appContext) {
    this.vapor = true;
    this.uid = nextUid();
    this.type = comp;
    this.parent = currentInstance;
    this.root = currentInstance ? currentInstance.root : this;
    if (currentInstance) {
      this.appContext = currentInstance.appContext;
      this.provides = currentInstance.provides;
      this.ids = currentInstance.ids;
    } else {
      this.appContext = appContext || emptyContext;
      this.provides = Object.create(this.appContext.provides);
      this.ids = ["", 0, 0];
    }
    this.block = null;
    this.scope = new EffectScope(true);
    this.emit = emit.bind(null, this);
    this.expose = expose.bind(null, this);
    this.refs = EMPTY_OBJ;
    this.emitted = this.exposed = this.exposeProxy = this.propsDefaults = this.suspense = null;
    this.isMounted = this.isUnmounted = this.isUpdating = this.isDeactivated = false;
    this.rawProps = rawProps || EMPTY_OBJ;
    this.hasFallthrough = hasFallthroughAttrs(comp, rawProps);
    if (rawProps || comp.props) {
      const [propsHandlers, attrsHandlers] = getPropsProxyHandlers(comp);
      this.attrs = new Proxy(this, attrsHandlers);
      this.props = comp.props ? new Proxy(this, propsHandlers) : isFunction(comp) ? this.attrs : EMPTY_OBJ;
    } else {
      this.props = this.attrs = EMPTY_OBJ;
    }
    this.rawSlots = rawSlots || EMPTY_OBJ;
    this.slots = rawSlots ? rawSlots.$ ? new Proxy(rawSlots, dynamicSlotsProxyHandlers) : rawSlots : EMPTY_OBJ;
  }
  /**
   * Expose `getKeysFromRawProps` on the instance so it can be used in code
   * paths where it's needed, e.g. `useModel`
   */
  rawKeys() {
    return getKeysFromRawProps(this.rawProps);
  }
}
function isVaporComponent(value) {
  return value instanceof VaporComponentInstance;
}
function createComponentWithFallback(comp, rawProps, rawSlots, isSingleRoot, once, scopeId, appContext) {
  if (!isString(comp)) {
    return createComponent(
      comp,
      rawProps,
      rawSlots,
      isSingleRoot,
      once,
      scopeId,
      appContext
    );
  }
  const _insertionParent = insertionParent;
  const _insertionAnchor = insertionAnchor;
  if (isHydrating) {
    locateHydrationNode();
  } else {
    resetInsertionState();
  }
  const el = isHydrating ? adoptTemplate(currentHydrationNode, `<${comp}/>`) : createElement(comp);
  el.$root = isSingleRoot;
  scopeId = scopeId || currentInstance.type.__scopeId;
  if (scopeId) setScopeId(el, scopeId);
  if (rawProps) {
    renderEffect(() => {
      setDynamicProps(el, [resolveDynamicProps(rawProps)]);
    });
  }
  if (rawSlots) {
    let prev;
    if (isHydrating) {
      prev = currentHydrationNode;
      setCurrentHydrationNode(el.firstChild);
    }
    if (rawSlots.$) ; else {
      insert(getSlot(rawSlots, "default")(), el);
    }
    if (isHydrating) {
      setCurrentHydrationNode(prev);
    }
  }
  if (!isHydrating) {
    if (_insertionParent) insert(el, _insertionParent, _insertionAnchor);
  } else {
    if (_insertionAnchor !== void 0) {
      advanceHydrationNode(_insertionParent);
    }
  }
  return el;
}
function mountComponent(instance, parent, anchor) {
  if (instance.bm) invokeArrayFns(instance.bm);
  if (!isHydrating) {
    insert(instance.block, parent, anchor);
    setComponentScopeId(instance);
  }
  if (instance.m) queuePostFlushCb(() => invokeArrayFns(instance.m));
  instance.isMounted = true;
}
function unmountComponent(instance, parentNode) {
  if (instance.isMounted && !instance.isUnmounted) {
    if (instance.bum) {
      invokeArrayFns(instance.bum);
    }
    instance.scope.stop();
    if (instance.um) {
      queuePostFlushCb(() => invokeArrayFns(instance.um));
    }
    instance.isUnmounted = true;
  }
  if (parentNode) {
    remove(instance.block, parentNode);
  }
}
function getExposed(instance) {
  if (instance.exposed) {
    return instance.exposeProxy || (instance.exposeProxy = new Proxy(markRaw(instance.exposed), {
      get: (target, key) => unref(target[key])
    }));
  }
}
function getRootElement({
  block
}) {
  if (block instanceof Element) {
    return block;
  }
  if (block instanceof DynamicFragment) {
    const { nodes } = block;
    if (nodes instanceof Element && nodes.$root) {
      return nodes;
    }
  }
}

let _createApp;
const mountApp = (app, container) => {
  optimizePropertyLookup();
  if (container.nodeType === 1) {
    container.textContent = "";
  }
  const instance = createComponent(
    app._component,
    app._props,
    null,
    false,
    false,
    void 0,
    app._context
  );
  mountComponent(instance, container);
  flushOnAppMount();
  return instance;
};
let _hydrateApp;
const hydrateApp = (app, container) => {
  optimizePropertyLookup();
  let instance;
  withHydration(container, () => {
    instance = createComponent(
      app._component,
      app._props,
      null,
      false,
      false,
      void 0,
      app._context
    );
    mountComponent(instance, container);
    flushOnAppMount();
  });
  return instance;
};
const unmountApp = (app) => {
  unmountComponent(app._instance, app._container);
};
function prepareApp() {
  const target = getGlobalThis();
  target.__VUE__ = true;
}
function postPrepareApp(app) {
  app.vapor = true;
  const mount = app.mount;
  app.mount = (container, ...args) => {
    container = normalizeContainer(container);
    return mount(container, ...args);
  };
}
const createVaporApp = (comp, props) => {
  prepareApp();
  if (!_createApp) _createApp = createAppAPI(mountApp, unmountApp, getExposed);
  const app = _createApp(comp, props);
  postPrepareApp(app);
  return app;
};
const createVaporSSRApp = (comp, props) => {
  prepareApp();
  if (!_hydrateApp)
    _hydrateApp = createAppAPI(hydrateApp, unmountApp, getExposed);
  const app = _hydrateApp(comp, props);
  postPrepareApp(app);
  return app;
};

/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function defineVaporComponent(comp, extraOptions) {
  if (isFunction(comp)) {
    return /* @__PURE__ */ (() => extend({ name: comp.name }, extraOptions, {
      setup: comp,
      __vapor: true
    }))();
  }
  comp.__vapor = true;
  return comp;
}

function defineVaporAsyncComponent(source) {
  const {
    load,
    getResolvedComp,
    setPendingRequest,
    source: {
      loadingComponent,
      errorComponent,
      delay,
      hydrate: hydrateStrategy,
      timeout,
      suspensible = true
    }
  } = createAsyncComponentContext(source);
  return defineVaporComponent({
    name: "VaporAsyncComponentWrapper",
    __asyncLoader: load,
    __asyncHydrate(el, instance, hydrate) {
      let isHydrated = false;
      watch(
        () => instance.attrs,
        () => {
          if (isHydrated) return;
          instance.bu && invokeArrayFns(instance.bu);
          const parent = parentNode(el);
          load().then(() => {
            if (instance.isUnmounted) return;
            hydrate();
            insert(instance.block, parent, el);
            remove(el, parent);
          });
        },
        { deep: true, once: true }
      );
      performAsyncHydrate(
        el,
        instance,
        () => {
          hydrateNode(el, () => {
            hydrate();
            insert(instance.block, parentNode(el), el);
            isHydrated = true;
          });
        },
        getResolvedComp,
        load,
        hydrateStrategy
      );
    },
    get __asyncResolved() {
      return getResolvedComp();
    },
    setup() {
      const instance = currentInstance;
      markAsyncBoundary(instance);
      const frag = isHydrating ? new DynamicFragment("async component") : new DynamicFragment();
      let resolvedComp = getResolvedComp();
      if (resolvedComp) {
        if (isInSSRComponentSetup) {
          return () => createInnerComp$1(resolvedComp, instance);
        }
        frag.update(() => createInnerComp(resolvedComp, instance));
        return frag;
      }
      const onError = (err) => {
        setPendingRequest(null);
        handleError(
          err,
          instance,
          13,
          !errorComponent
        );
      };
      if (suspensible && instance.suspense) ;
      if (isInSSRComponentSetup) {
        return loadInnerComponent(
          instance,
          load,
          onError,
          errorComponent
        );
      }
      const { loaded, error, delayed } = useAsyncComponentState(
        delay,
        timeout,
        onError
      );
      load().then(() => {
        loaded.value = true;
      }).catch((err) => {
        onError(err);
        error.value = err;
      });
      renderEffect(() => {
        resolvedComp = getResolvedComp();
        let render;
        if (loaded.value && resolvedComp) {
          render = () => createInnerComp(resolvedComp, instance, frag);
        } else if (error.value && errorComponent) {
          render = () => createComponent(errorComponent, { error: () => error.value });
        } else if (loadingComponent && !delayed.value) {
          render = () => createComponent(loadingComponent);
        }
        frag.update(render);
      });
      return frag;
    }
  });
}
function createInnerComp(comp, parent, frag) {
  const { rawProps, rawSlots, isSingleRoot, appContext } = parent;
  const instance = createComponent(
    comp,
    rawProps,
    rawSlots,
    isSingleRoot,
    void 0,
    void 0,
    appContext
  );
  frag && frag.setRef && frag.setRef(instance);
  return instance;
}

let t;
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function template(html, root) {
  let node;
  return () => {
    if (isHydrating) {
      const adopted = adoptTemplate(currentHydrationNode, html);
      if (root) adopted.$root = true;
      return adopted;
    }
    if (html[0] !== "<") {
      return createTextNode(html);
    }
    if (!node) {
      t = t || createElement("template");
      t.innerHTML = html;
      node = _child(t.content);
    }
    const ret = node.cloneNode(true);
    if (root) ret.$root = true;
    return ret;
  };
}

function createIf(condition, b1, b2, once) {
  const _insertionParent = insertionParent;
  const _insertionAnchor = insertionAnchor;
  if (!isHydrating) resetInsertionState();
  let frag;
  if (once) {
    frag = condition() ? b1() : b2 ? b2() : [];
  } else {
    frag = isHydrating || false ? new DynamicFragment("if") : new DynamicFragment();
    renderEffect(() => frag.update(condition() ? b1 : b2));
  }
  if (!isHydrating) {
    if (_insertionParent) insert(frag, _insertionParent, _insertionAnchor);
  } else {
    if (_insertionAnchor !== void 0) {
      advanceHydrationNode(_insertionParent);
    }
  }
  return frag;
}

function createKeyedFragment(key, render) {
  const frag = new DynamicFragment();
  renderEffect(() => {
    frag.update(render, key());
  });
  return frag;
}

class ForBlock extends VaporFragment {
  constructor(nodes, scope, item, key, index, renderKey) {
    super(nodes);
    this.scope = scope;
    this.itemRef = item;
    this.keyRef = key;
    this.indexRef = index;
    this.key = renderKey;
  }
}
const createFor = (src, renderItem, getKey, flags = 0, setup) => {
  const _insertionParent = insertionParent;
  const _insertionAnchor = insertionAnchor;
  if (isHydrating) {
    locateHydrationNode();
  } else {
    resetInsertionState();
  }
  let isMounted = false;
  let oldBlocks = [];
  let newBlocks;
  let parent;
  let currentKey;
  let parentAnchor;
  if (!isHydrating) {
    parentAnchor = createTextNode();
  }
  const frag = new ForFragment(oldBlocks);
  const canUseFastRemove = !!(flags & 1);
  const isComponent = !!(flags & 2);
  const selectors = [];
  const renderList = () => {
    const source = normalizeSource(src());
    const newLength = source.values.length;
    const oldLength = oldBlocks.length;
    newBlocks = new Array(newLength);
    let isFallback = false;
    const prevSub = setActiveSub();
    if (!isMounted) {
      isMounted = true;
      let prevNodes;
      for (let i = 0; i < newLength; i++) {
        if (isHydrating && isComponent && i > 0) {
          setCurrentHydrationNode(findLastChild(prevNodes).nextSibling);
        }
        prevNodes = mount(source, i).nodes;
      }
      if (isHydrating) {
        if (isComponent) {
          setCurrentHydrationNode(findLastChild(prevNodes).nextSibling);
        }
        parentAnchor = newLength === 0 ? currentHydrationNode.nextSibling : currentHydrationNode;
        if (!parentAnchor || parentAnchor && !isComment(parentAnchor, "]")) {
          throw new Error(`v-for fragment anchor node was not found.`);
        }
        if (_insertionParent && _insertionParent.$llc) {
          parentAnchor.$idx = _insertionParent.$llc.$idx;
          _insertionParent.$llc = parentAnchor;
        }
      }
    } else {
      parent = parent || parentAnchor.parentNode;
      if (!oldLength) {
        if (frag.fallback && frag.nodes[0].length > 0) {
          remove(frag.nodes[0], parent);
        }
        for (let i = 0; i < newLength; i++) {
          mount(source, i);
        }
      } else if (!newLength) {
        for (const selector of selectors) {
          selector.cleanup();
        }
        const doRemove = !canUseFastRemove;
        for (let i = 0; i < oldLength; i++) {
          unmount(oldBlocks[i], doRemove, false);
        }
        if (canUseFastRemove) {
          parent.textContent = "";
          parent.appendChild(parentAnchor);
        }
        if (frag.fallback) {
          insert(frag.nodes[0] = frag.fallback(), parent, parentAnchor);
          isFallback = true;
        }
      } else if (!getKey) {
        const commonLength = Math.min(newLength, oldLength);
        for (let i = 0; i < commonLength; i++) {
          update(newBlocks[i] = oldBlocks[i], getItem(source, i)[0]);
        }
        for (let i = oldLength; i < newLength; i++) {
          mount(source, i);
        }
        for (let i = newLength; i < oldLength; i++) {
          unmount(oldBlocks[i]);
        }
      } else {
        const sharedBlockCount = Math.min(oldLength, newLength);
        const previousKeyIndexPairs = new Array(oldLength);
        const queuedBlocks = new Array(newLength);
        let anchorFallback = parentAnchor;
        let endOffset = 0;
        let startOffset = 0;
        let queuedBlocksInsertIndex = 0;
        let previousKeyIndexInsertIndex = 0;
        while (endOffset < sharedBlockCount) {
          const currentIndex = newLength - endOffset - 1;
          const currentItem = getItem(source, currentIndex);
          const currentKey2 = getKey(...currentItem);
          const existingBlock = oldBlocks[oldLength - endOffset - 1];
          if (existingBlock.key === currentKey2) {
            update(existingBlock, ...currentItem);
            newBlocks[currentIndex] = existingBlock;
            endOffset++;
            continue;
          }
          break;
        }
        if (endOffset !== 0) {
          anchorFallback = normalizeAnchor(
            newBlocks[newLength - endOffset].nodes
          );
        }
        while (startOffset < sharedBlockCount - endOffset) {
          const currentItem = getItem(source, startOffset);
          const currentKey2 = getKey(...currentItem);
          const previousBlock = oldBlocks[startOffset];
          const previousKey = previousBlock.key;
          if (previousKey === currentKey2) {
            update(newBlocks[startOffset] = previousBlock, currentItem[0]);
          } else {
            queuedBlocks[queuedBlocksInsertIndex++] = [
              startOffset,
              currentItem,
              currentKey2
            ];
            previousKeyIndexPairs[previousKeyIndexInsertIndex++] = [
              previousKey,
              startOffset
            ];
          }
          startOffset++;
        }
        for (let i = startOffset; i < oldLength - endOffset; i++) {
          previousKeyIndexPairs[previousKeyIndexInsertIndex++] = [
            oldBlocks[i].key,
            i
          ];
        }
        const preparationBlockCount = Math.min(
          newLength - endOffset,
          sharedBlockCount
        );
        for (let i = startOffset; i < preparationBlockCount; i++) {
          const blockItem = getItem(source, i);
          const blockKey = getKey(...blockItem);
          queuedBlocks[queuedBlocksInsertIndex++] = [i, blockItem, blockKey];
        }
        if (!queuedBlocksInsertIndex && !previousKeyIndexInsertIndex) {
          for (let i = preparationBlockCount; i < newLength - endOffset; i++) {
            const blockItem = getItem(source, i);
            const blockKey = getKey(...blockItem);
            mount(source, i, anchorFallback, blockItem, blockKey);
          }
        } else {
          queuedBlocks.length = queuedBlocksInsertIndex;
          previousKeyIndexPairs.length = previousKeyIndexInsertIndex;
          const previousKeyIndexMap = new Map(previousKeyIndexPairs);
          const operations = [];
          let mountCounter = 0;
          const relocateOrMountBlock = (blockIndex, blockItem, blockKey, anchorOffset) => {
            const previousIndex = previousKeyIndexMap.get(blockKey);
            if (previousIndex !== void 0) {
              const reusedBlock = newBlocks[blockIndex] = oldBlocks[previousIndex];
              update(reusedBlock, ...blockItem);
              previousKeyIndexMap.delete(blockKey);
              if (previousIndex !== blockIndex) {
                operations.push(
                  () => insert(
                    reusedBlock,
                    parent,
                    anchorOffset === -1 ? anchorFallback : normalizeAnchor(newBlocks[anchorOffset].nodes)
                  )
                );
              }
            } else {
              mountCounter++;
              operations.push(
                () => mount(
                  source,
                  blockIndex,
                  anchorOffset === -1 ? anchorFallback : normalizeAnchor(newBlocks[anchorOffset].nodes),
                  blockItem,
                  blockKey
                )
              );
            }
          };
          for (let i = queuedBlocks.length - 1; i >= 0; i--) {
            const [blockIndex, blockItem, blockKey] = queuedBlocks[i];
            relocateOrMountBlock(
              blockIndex,
              blockItem,
              blockKey,
              blockIndex < preparationBlockCount - 1 ? blockIndex + 1 : -1
            );
          }
          for (let i = preparationBlockCount; i < newLength - endOffset; i++) {
            const blockItem = getItem(source, i);
            const blockKey = getKey(...blockItem);
            relocateOrMountBlock(i, blockItem, blockKey, -1);
          }
          const useFastRemove = mountCounter === newLength;
          for (const leftoverIndex of previousKeyIndexMap.values()) {
            unmount(
              oldBlocks[leftoverIndex],
              !(useFastRemove && canUseFastRemove),
              !useFastRemove
            );
          }
          if (useFastRemove) {
            for (const selector of selectors) {
              selector.cleanup();
            }
            if (canUseFastRemove) {
              parent.textContent = "";
              parent.appendChild(parentAnchor);
            }
          }
          for (const action of operations) {
            action();
          }
        }
      }
    }
    if (!isFallback) {
      frag.nodes = [oldBlocks = newBlocks];
      if (parentAnchor) frag.nodes.push(parentAnchor);
    } else {
      oldBlocks = [];
    }
    setActiveSub(prevSub);
  };
  const needKey = renderItem.length > 1;
  const needIndex = renderItem.length > 2;
  const mount = (source, idx, anchor = parentAnchor, [item, key, index] = getItem(source, idx), key2 = getKey && getKey(item, key, index)) => {
    const itemRef = shallowRef(item);
    const keyRef = needKey ? shallowRef(key) : void 0;
    const indexRef = needIndex ? shallowRef(index) : void 0;
    currentKey = key2;
    let nodes;
    let scope;
    if (isComponent) {
      nodes = renderItem(itemRef, keyRef, indexRef);
    } else {
      scope = new EffectScope();
      nodes = scope.run(
        () => renderItem(itemRef, keyRef, indexRef)
      );
    }
    const block = newBlocks[idx] = new ForBlock(
      nodes,
      scope,
      itemRef,
      keyRef,
      indexRef,
      key2
    );
    if (frag.$transition) {
      applyTransitionHooks(block.nodes, frag.$transition, false);
    }
    if (parent) insert(block.nodes, parent, anchor);
    return block;
  };
  const update = ({ itemRef, keyRef, indexRef }, newItem, newKey, newIndex) => {
    if (newItem !== itemRef.value) {
      itemRef.value = newItem;
    }
    if (keyRef && newKey !== void 0 && newKey !== keyRef.value) {
      keyRef.value = newKey;
    }
    if (indexRef && newIndex !== void 0 && newIndex !== indexRef.value) {
      indexRef.value = newIndex;
    }
  };
  const unmount = (block, doRemove = true, doDeregister = true) => {
    if (!isComponent) {
      block.scope.stop();
    }
    if (doRemove) {
      remove(block.nodes, parent);
    }
    if (doDeregister) {
      for (const selector of selectors) {
        selector.deregister(block.key);
      }
    }
  };
  if (setup) {
    setup({ createSelector });
  }
  if (flags & 4) {
    renderList();
  } else {
    renderEffect(renderList);
  }
  if (!isHydrating) {
    if (_insertionParent) insert(frag, _insertionParent, _insertionAnchor);
  } else {
    advanceHydrationNode(
      _insertionAnchor !== void 0 ? _insertionParent : parentAnchor
    );
  }
  return frag;
  function createSelector(source) {
    let operMap = /* @__PURE__ */ new Map();
    let activeKey = source();
    let activeOpers;
    watch$1(source, (newValue) => {
      if (activeOpers !== void 0) {
        for (const oper of activeOpers) {
          oper();
        }
      }
      activeOpers = operMap.get(newValue);
      if (activeOpers !== void 0) {
        for (const oper of activeOpers) {
          oper();
        }
      }
    });
    selectors.push({ deregister, cleanup });
    return register;
    function cleanup() {
      operMap = /* @__PURE__ */ new Map();
      activeOpers = void 0;
    }
    function register(oper) {
      oper();
      let opers = operMap.get(currentKey);
      if (opers !== void 0) {
        opers.push(oper);
      } else {
        opers = [oper];
        operMap.set(currentKey, opers);
        if (currentKey === activeKey) {
          activeOpers = opers;
        }
      }
    }
    function deregister(key) {
      operMap.delete(key);
      if (key === activeKey) {
        activeOpers = void 0;
      }
    }
  }
};
function createForSlots(rawSource, getSlot) {
  const source = normalizeSource(rawSource);
  const sourceLength = source.values.length;
  const slots = new Array(sourceLength);
  for (let i = 0; i < sourceLength; i++) {
    slots[i] = getSlot(...getItem(source, i));
  }
  return slots;
}
function normalizeSource(source) {
  let values = source;
  let needsWrap = false;
  let isReadonlySource = false;
  let keys;
  if (isArray(source)) {
    if (isReactive(source)) {
      needsWrap = !isShallow(source);
      values = shallowReadArray(source);
      isReadonlySource = isReadonly(source);
    }
  } else if (isString(source)) {
    values = source.split("");
  } else if (typeof source === "number") {
    values = new Array(source);
    for (let i = 0; i < source; i++) values[i] = i + 1;
  } else if (isObject(source)) {
    if (source[Symbol.iterator]) {
      values = Array.from(source);
    } else {
      keys = Object.keys(source);
      values = new Array(keys.length);
      for (let i = 0, l = keys.length; i < l; i++) {
        values[i] = source[keys[i]];
      }
    }
  }
  return {
    values,
    needsWrap,
    isReadonlySource,
    keys
  };
}
function getItem({ keys, values, needsWrap, isReadonlySource }, idx) {
  const value = needsWrap ? isReadonlySource ? toReadonly(toReactive(values[idx])) : toReactive(values[idx]) : values[idx];
  if (keys) {
    return [value, keys[idx], idx];
  } else {
    return [value, idx, void 0];
  }
}
function getRestElement(val, keys) {
  const res = {};
  for (const key in val) {
    if (!keys.includes(key)) res[key] = val[key];
  }
  return res;
}
function getDefaultValue(val, defaultVal) {
  return val === void 0 ? defaultVal : val;
}
function isForBlock(block) {
  return block instanceof ForBlock;
}

function createTemplateRefSetter() {
  const instance = currentInstance;
  return (...args) => setRef(instance, ...args);
}
function setRef(instance, el, ref, oldRef, refFor = false) {
  if (!instance || instance.isUnmounted) return;
  const isVaporComp = isVaporComponent(el);
  if (isVaporComp && isAsyncWrapper(el)) {
    const i = el;
    const frag = i.block;
    if (!i.type.__asyncResolved) {
      frag.setRef = (i2) => setRef(instance, i2, ref, oldRef, refFor);
      return;
    }
    el = frag.nodes;
  }
  const setupState = null;
  const refValue = getRefValue(el);
  const refs = instance.refs === EMPTY_OBJ ? instance.refs = {} : instance.refs;
  createCanSetSetupRefChecker(setupState);
  if (oldRef != null && oldRef !== ref) {
    if (isString(oldRef)) {
      refs[oldRef] = null;
    } else if (isRef(oldRef)) {
      oldRef.value = null;
    }
  }
  if (isFunction(ref)) {
    const invokeRefSetter = (value) => {
      callWithErrorHandling(ref, currentInstance, 12, [
        value,
        refs
      ]);
    };
    invokeRefSetter(refValue);
    onScopeDispose(() => invokeRefSetter());
  } else {
    const _isString = isString(ref);
    const _isRef = isRef(ref);
    let existing;
    if (_isString || _isRef) {
      const doSet = () => {
        if (refFor) {
          existing = _isString ? refs[ref] : ref.value;
          if (!isArray(existing)) {
            existing = [refValue];
            if (_isString) {
              refs[ref] = existing;
            } else {
              ref.value = existing;
            }
          } else if (!existing.includes(refValue)) {
            existing.push(refValue);
          }
        } else if (_isString) {
          refs[ref] = refValue;
        } else if (_isRef) {
          ref.value = refValue;
        } else ;
      };
      queuePostFlushCb(doSet, -1);
      onScopeDispose(() => {
        queuePostFlushCb(() => {
          if (isArray(existing)) {
            remove$1(existing, refValue);
          } else if (_isString) {
            refs[ref] = null;
          } else if (_isRef) {
            ref.value = null;
          }
        });
      });
    }
  }
  return ref;
}
const getRefValue = (el) => {
  if (isVaporComponent(el)) {
    return getExposed(el) || el;
  } else if (el instanceof DynamicFragment) {
    return getRefValue(el.nodes);
  }
  return el;
};

function createDynamicComponent(getter, rawProps, rawSlots, isSingleRoot, once, scopeId) {
  const _insertionParent = insertionParent;
  const _insertionAnchor = insertionAnchor;
  if (!isHydrating) resetInsertionState();
  const frag = isHydrating || false ? new DynamicFragment("dynamic-component") : new DynamicFragment();
  renderEffect(() => {
    const value = getter();
    const appContext = currentInstance && currentInstance.appContext || emptyContext;
    frag.update(
      () => createComponentWithFallback(
        resolveDynamicComponent(value),
        rawProps,
        rawSlots,
        isSingleRoot,
        once,
        scopeId,
        appContext
      ),
      value
    );
  });
  if (!isHydrating) {
    if (_insertionParent) insert(frag, _insertionParent, _insertionAnchor);
  } else {
    if (_insertionAnchor !== void 0) {
      advanceHydrationNode(_insertionParent);
    }
  }
  return frag;
}

function applyVShow(target, source) {
  if (isVaporComponent(target)) {
    return applyVShow(target.block, source);
  }
  if (isArray(target) && target.length === 1) {
    return applyVShow(target[0], source);
  }
  if (target instanceof DynamicFragment) {
    const update = target.update;
    target.update = (render, key) => {
      update.call(target, render, key);
      setDisplay(target, source());
    };
  } else if (target instanceof VaporFragment && target.insert) {
    const insert = target.insert;
    target.insert = (parent, anchor) => {
      insert.call(target, parent, anchor);
      setDisplay(target, source());
    };
  }
  renderEffect(() => setDisplay(target, source()));
}
function setDisplay(target, value) {
  if (isVaporComponent(target)) {
    return setDisplay(target, value);
  }
  if (isArray(target)) {
    if (target.length === 0) return;
    if (target.length === 1) return setDisplay(target[0], value);
  }
  if (target instanceof DynamicFragment) {
    return setDisplay(target.nodes, value);
  }
  const { $transition } = target;
  if (target instanceof VaporFragment && target.insert) {
    return setDisplay(target.nodes, value);
  }
  if (target instanceof Element) {
    const el = target;
    if (!(vShowOriginalDisplay in el)) {
      el[vShowOriginalDisplay] = el.style.display === "none" ? "" : el.style.display;
    }
    if ($transition) {
      if (value) {
        $transition.beforeEnter(target);
        el.style.display = el[vShowOriginalDisplay];
        $transition.enter(target);
      } else {
        if (target.isConnected) {
          $transition.leave(target, () => {
            el.style.display = "none";
          });
        } else {
          el.style.display = "none";
        }
      }
    } else {
      {
        el.style.display = value ? el[vShowOriginalDisplay] : "none";
      }
      el[vShowHidden] = !value;
    }
  }
}

function ensureMounted(cb) {
  if (currentInstance.isMounted) {
    cb();
  } else {
    onMounted(cb);
  }
}
const applyTextModel = (el, get, set, { trim, number, lazy } = {}) => {
  vModelTextInit(el, trim, number, lazy, set);
  ensureMounted(() => {
    let value;
    renderEffect(() => {
      vModelTextUpdate(el, value, value = get(), trim, number, lazy);
    });
  });
};
const applyCheckboxModel = (el, get, set) => {
  vModelCheckboxInit(el, set);
  ensureMounted(() => {
    let value;
    renderEffect(() => {
      vModelCheckboxUpdate(
        el,
        value,
        // #4096 array checkboxes need to be deep traversed
        traverse(value = get())
      );
    });
  });
};
const applyRadioModel = (el, get, set) => {
  addEventListener(el, "change", () => set(getValue(el)));
  ensureMounted(() => {
    let value;
    renderEffect(() => {
      if (value !== (value = get())) {
        el.checked = looseEqual(value, getValue(el));
      }
    });
  });
};
const applySelectModel = (el, get, set, modifiers) => {
  vModelSelectInit(el, get(), modifiers && modifiers.number, set);
  ensureMounted(() => {
    renderEffect(() => vModelSetSelected(el, traverse(get())));
  });
};
const applyDynamicModel = (el, get, set, modifiers) => {
  let apply = applyTextModel;
  if (el.tagName === "SELECT") {
    apply = applySelectModel;
  } else if (el.tagName === "TEXTAREA") {
    apply = applyTextModel;
  } else if (el.type === "checkbox") {
    apply = applyCheckboxModel;
  } else if (el.type === "radio") {
    apply = applyRadioModel;
  }
  apply(el, get, set, modifiers);
};

function withVaporDirectives(node, dirs) {
  for (const [dir, value, argument, modifiers] of dirs) {
    if (dir) {
      const ret = dir(node, value, argument, modifiers);
      if (ret) onScopeDispose(ret);
    }
  }
}

const positionMap = /* @__PURE__ */ new WeakMap();
const newPositionMap = /* @__PURE__ */ new WeakMap();
const decorate = (t) => {
  delete t.props.mode;
  t.__vapor = true;
  return t;
};
const VaporTransitionGroup = decorate({
  name: "VaporTransitionGroup",
  props: /* @__PURE__ */ extend({}, TransitionPropsValidators, {
    tag: String,
    moveClass: String
  }),
  setup(props, { slots }) {
    const instance = currentInstance;
    const state = useTransitionState();
    const cssTransitionProps = resolveTransitionProps(props);
    let prevChildren;
    let children;
    let slottedBlock;
    onBeforeUpdate(() => {
      prevChildren = [];
      children = getTransitionBlocks(slottedBlock);
      if (children) {
        for (let i = 0; i < children.length; i++) {
          const child = children[i];
          if (isValidTransitionBlock(child)) {
            prevChildren.push(child);
            child.$transition.disabled = true;
            positionMap.set(
              child,
              getTransitionElement(child).getBoundingClientRect()
            );
          }
        }
      }
    });
    onUpdated(() => {
      if (!prevChildren.length) {
        return;
      }
      const moveClass = props.moveClass || `${props.name || "v"}-move`;
      const firstChild = getFirstConnectedChild(prevChildren);
      if (!firstChild || !hasCSSTransform(
        firstChild,
        firstChild.parentNode,
        moveClass
      )) {
        prevChildren = [];
        return;
      }
      prevChildren.forEach(callPendingCbs);
      prevChildren.forEach((child) => {
        child.$transition.disabled = false;
        recordPosition(child);
      });
      const movedChildren = prevChildren.filter(applyTranslation);
      forceReflow();
      movedChildren.forEach(
        (c) => handleMovedChildren(
          getTransitionElement(c),
          moveClass
        )
      );
      prevChildren = [];
    });
    slottedBlock = slots.default && slots.default();
    setTransitionHooksOnFragment(slottedBlock, {
      props: cssTransitionProps,
      state,
      instance
    });
    children = getTransitionBlocks(slottedBlock);
    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      if (isValidTransitionBlock(child)) {
        if (child.$key != null) {
          setTransitionHooks(
            child,
            resolveTransitionHooks(child, cssTransitionProps, state, instance)
          );
        }
      }
    }
    const tag = props.tag;
    if (tag) {
      const container = createElement(tag);
      insert(slottedBlock, container);
      if (instance.hasFallthrough) {
        container.$root = true;
        renderEffect(() => applyFallthroughProps(container, instance.attrs));
      }
      return container;
    } else {
      const frag = new DynamicFragment();
      renderEffect(() => frag.update(() => slottedBlock));
      return frag;
    }
  }
});
function getTransitionBlocks(block) {
  let children = [];
  if (block instanceof Node) {
    children.push(block);
  } else if (isVaporComponent(block)) {
    children.push(...getTransitionBlocks(block.block));
  } else if (isArray(block)) {
    for (let i = 0; i < block.length; i++) {
      const b = block[i];
      const blocks = getTransitionBlocks(b);
      if (isForBlock(b)) blocks.forEach((block2) => block2.$key = b.key);
      children.push(...blocks);
    }
  } else if (isFragment(block)) {
    if (block.insert) {
      children.push(block);
    } else {
      children.push(...getTransitionBlocks(block.nodes));
    }
  }
  return children;
}
function isValidTransitionBlock(block) {
  return !!(block instanceof Element || isFragment(block) && block.insert);
}
function getTransitionElement(c) {
  return isFragment(c) ? c.nodes[0] : c;
}
function recordPosition(c) {
  newPositionMap.set(c, getTransitionElement(c).getBoundingClientRect());
}
function applyTranslation(c) {
  if (baseApplyTranslation(
    positionMap.get(c),
    newPositionMap.get(c),
    getTransitionElement(c)
  )) {
    return c;
  }
}
function getFirstConnectedChild(children) {
  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    const el = getTransitionElement(child);
    if (el.isConnected) return el;
  }
}

export { BaseTransition, BaseTransitionPropsValidators, Comment$1 as Comment, DeprecationTypes, EffectScope, ErrorCodes, ErrorTypeStrings, Fragment, KeepAlive, MismatchTypes, MoveType, ReactiveEffect, Static, Suspense, Teleport, Text$1 as Text, TrackOpTypes, Transition, TransitionGroup, TransitionPropsValidators, TriggerOpTypes, VaporFragment, VaporTeleportImpl as VaporTeleport, VaporTransition, VaporTransitionGroup, VueElement, addTransitionClass, applyCheckboxModel, applyDynamicModel, applyRadioModel, applySelectModel, applyTextModel, applyVShow, assertNumber, baseApplyTranslation, baseEmit, baseNormalizePropsOptions, baseResolveTransitionHooks, callPendingCbs, callWithAsyncErrorHandling, callWithErrorHandling, camelize, capitalize, checkTransitionMode, child, cloneVNode, compatUtils, compile, computed, createApp, createAppAPI, createAsyncComponentContext, createBlock, createCanSetSetupRefChecker, createCommentVNode, createComponent, createComponentWithFallback, createDynamicComponent, createElementBlock, createBaseVNode as createElementVNode, createFor, createForSlots, createHydrationRenderer, createIf, createInnerComp$1 as createInnerComp, createInternalObject, createKeyedFragment, createPropsRestProxy, createRenderer, createSSRApp, createSlot, createSlots, createStaticVNode, createTemplateRefSetter, createTextNode, createTextVNode, createVNode, createVaporApp, createVaporSSRApp, currentInstance, customRef, defineAsyncComponent, defineComponent, defineCustomElement, defineEmits, defineExpose, defineModel, defineOptions, defineProps, defineSSRCustomElement, defineSlots, defineVaporAsyncComponent, defineVaporComponent, delegate, delegateEvents, devtools, effect, effectScope, endMeasure, ensureHydrationRenderer, ensureRenderer, ensureVaporSlotFallback, expose, flushOnAppMount, forceReflow, forwardedSlotCreator, getAttributeMismatch, getCurrentInstance, getCurrentScope, getCurrentWatcher, getDefaultValue, getInheritedScopeIds, getRestElement, getTransitionRawChildren, guardReactiveProps, h, handleError, handleMovedChildren, hasCSSTransform, hasInjectionContext, hydrate, hydrateOnIdle, hydrateOnInteraction, hydrateOnMediaQuery, hydrateOnVisible, initCustomFormatter, initDirectivesForSSR, initFeatureFlags, inject, insert, isAsyncWrapper, isEmitListener, isFragment, isInSSRComponentSetup, isMapEqual, isMemoSame, isMismatchAllowed, isProxy, isReactive, isReadonly, isRef, isRuntimeOnly, isSetEqual, isShallow, isTeleportDeferred, isTeleportDisabled, isTemplateNode, isVNode, isValidHtmlOrSvgAttribute, isVaporComponent, leaveCbKey, loadInnerComponent, markAsyncBoundary, markRaw, mergeDefaults, mergeModels, mergeProps, moveCbKey, next, nextTick, nextUid, normalizeClass, normalizeContainer, normalizeProps, normalizeStyle, nthChild, on, onActivated, onBeforeMount, onBeforeUnmount, onBeforeUpdate, onDeactivated, onErrorCaptured, onMounted, onRenderTracked, onRenderTriggered, onScopeDispose, onServerPrefetch, onUnmounted, onUpdated, onWatcherCleanup, openBlock, patchStyle, performAsyncHydrate, performTransitionEnter, performTransitionLeave, popScopeId, popWarningContext, prepend, provide, proxyRefs, pushScopeId, pushWarningContext, queueJob, queuePostFlushCb, reactive, readonly, ref, registerHMR, registerRuntimeCompiler, remove, removeTransitionClass, render, renderEffect, renderList, renderSlot, resolveComponent, resolveDirective, resolveDynamicComponent, resolveFilter, resolvePropValue, resolveTarget as resolveTeleportTarget, resolveTransitionHooks$1 as resolveTransitionHooks, resolveTransitionProps, setAttr, setBlockTracking, setClass, setCurrentInstance, setDOMProp, setDevtoolsHook, setDynamicEvents, setDynamicProps, setElementText, setHtml, setInsertionState, setProp, setStyle, setText, setTransitionHooks$1 as setTransitionHooks, setValue, shallowReactive, shallowReadonly$1 as shallowReadonly, shallowRef, shouldSetAsProp, simpleSetCurrentInstance, ssrContextKey, ssrUtils, startMeasure, stop, template, toClassSet, toDisplayString, toHandlerKey, toHandlers, toRaw, toRef, toRefs, toStyleMap, toValue, transformVNodeArgs, triggerRef, txt, unref, unregisterHMR, useAsyncComponentState, useAttrs, useCssModule, useCssVars, useHost, useId, useModel, useSSRContext, useShadowRoot, useSlots, useTemplateRef, useTransitionState, vModelCheckbox, vModelCheckboxInit, vModelCheckboxUpdate, vModelDynamic, getValue as vModelGetValue, vModelRadio, vModelSelect, vModelSelectInit, vModelSetSelected, vModelText, vModelTextInit, vModelTextUpdate, vShow, vShowHidden, vShowOriginalDisplay, validateComponentName, validateProps, vaporInteropPlugin, version, warn$1 as warn, warnPropMismatch, watch, watchEffect, watchPostEffect, watchSyncEffect, withAsyncContext, withCtx, withDefaults, withDirectives, withKeys, withMemo, withModifiers, withScopeId, withVaporDirectives };
