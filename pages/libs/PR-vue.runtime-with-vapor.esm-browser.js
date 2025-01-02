// packages/shared/src/makeMap.ts
// @__NO_SIDE_EFFECTS__
function makeMap(str) {
    const map2 = /* @__PURE__ */
    Object.create(null);
    for (const key of str.split(","))
        map2[key] = 1;
    return (val) => val in map2;
}

// packages/shared/src/general.ts
var EMPTY_OBJ = true ? Object.freeze({}) : {};
var EMPTY_ARR = true ? Object.freeze([]) : [];
var NOOP = () => {}
;
var YES = () => true;
var NO = () => false;
var isOn = (key) => key.charCodeAt(0) === 111 && key.charCodeAt(1) === 110 && // uppercase letter
(key.charCodeAt(2) > 122 || key.charCodeAt(2) < 97);
var isNativeOn = (key) => key.charCodeAt(0) === 111 && key.charCodeAt(1) === 110 && // lowercase letter
key.charCodeAt(2) > 96 && key.charCodeAt(2) < 123;
var isModelListener = (key) => key.startsWith("onUpdate:");
var extend = Object.assign;
var remove = (arr, el) => {
    const i = arr.indexOf(el);
    if (i > -1) {
        arr.splice(i, 1);
    }
}
;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var hasOwn = (val, key) => hasOwnProperty.call(val, key);
var isArray = Array.isArray;
var isMap = (val) => toTypeString(val) === "[object Map]";
var isSet = (val) => toTypeString(val) === "[object Set]";
var isDate = (val) => toTypeString(val) === "[object Date]";
var isRegExp = (val) => toTypeString(val) === "[object RegExp]";
var isFunction = (val) => typeof val === "function";
var isString = (val) => typeof val === "string";
var isSymbol = (val) => typeof val === "symbol";
var isObject = (val) => val !== null && typeof val === "object";
var isPromise = (val) => {
    return (isObject(val) || isFunction(val)) && isFunction(val.then) && isFunction(val.catch);
}
;
var objectToString = Object.prototype.toString;
var toTypeString = (value) => objectToString.call(value);
var toRawType = (value) => {
    return toTypeString(value).slice(8, -1);
}
;
var isPlainObject = (val) => toTypeString(val) === "[object Object]";
var isIntegerKey = (key) => isString(key) && key !== "NaN" && key[0] !== "-" && "" + parseInt(key, 10) === key;
var isReservedProp = /* @__PURE__ */
makeMap(// the leading comma is intentional so empty string "" is also included
",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted");
var isBuiltInTag = /* @__PURE__ */
makeMap("slot,component");
var isBuiltInDirective = /* @__PURE__ */
makeMap("bind,cloak,else-if,else,for,html,if,model,on,once,pre,show,slot,text,memo");
var cacheStringFunction = (fn) => {
    const cache = /* @__PURE__ */
    Object.create(null);
    return (str) => {
        const hit = cache[str];
        return hit || (cache[str] = fn(str));
    }
    ;
}
;
var camelizeRE = /-(\w)/g;
var camelizeReplacer = (_, c) => c ? c.toUpperCase() : "";
var camelize = cacheStringFunction( (str) => str.replace(camelizeRE, camelizeReplacer));
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cacheStringFunction( (str) => str.replace(hyphenateRE, "-$1").toLowerCase());
var capitalize = cacheStringFunction( (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
);
var toHandlerKey = cacheStringFunction( (str) => {
    const s = str ? `on${capitalize(str)}` : ``;
    return s;
}
);
var hasChanged = (value, oldValue) => !Object.is(value, oldValue);
var invokeArrayFns = (fns, ...arg) => {
    for (let i = 0; i < fns.length; i++) {
        fns[i](...arg);
    }
}
;
var def = (obj, key, value, writable=false) => {
    Object.defineProperty(obj, key, {
        configurable: true,
        enumerable: false,
        writable,
        value
    });
}
;
var looseToNumber = (val) => {
    const n = parseFloat(val);
    return isNaN(n) ? val : n;
}
;
var toNumber = (val) => {
    const n = isString(val) ? Number(val) : NaN;
    return isNaN(n) ? val : n;
}
;
var _globalThis;
var getGlobalThis = () => {
    return _globalThis || (_globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {});
}
;
function canSetValueDirectly(tagName) {
    return tagName !== "PROGRESS" && // custom elements may use _value internally
    !tagName.includes("-");
}

// packages/shared/src/globalsAllowList.ts
var GLOBALS_ALLOWED = "Infinity,undefined,NaN,isFinite,isNaN,parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,BigInt,console,Error,Symbol";
var isGloballyAllowed = /* @__PURE__ */
makeMap(GLOBALS_ALLOWED);

// packages/shared/src/normalizeProp.ts
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
var listDelimiterRE = /;(?![^(]*\))/g;
var propertyDelimiterRE = /:([^]+)/;
var styleCommentRE = /\/\*[^]*?\*\//g;
function parseStringStyle(cssText) {
    const ret = {};
    cssText.replace(styleCommentRE, "").split(listDelimiterRE).forEach( (item) => {
        if (item) {
            const tmp = item.split(propertyDelimiterRE);
            tmp.length > 1 && (ret[tmp[0].trim()] = tmp[1].trim());
        }
    }
    );
    return ret;
}
function stringifyStyle(styles) {
    if (!styles)
        return "";
    if (isString(styles))
        return styles;
    let ret = "";
    for (const key in styles) {
        const value = styles[key];
        if (isString(value) || typeof value === "number") {
            const normalizedKey = key.startsWith(`--`) ? key : hyphenate(key);
            ret += `${normalizedKey}:${value};`;
        }
    }
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
    if (!props)
        return null;
    let {class: klass, style} = props;
    if (klass && !isString(klass)) {
        props.class = normalizeClass(klass);
    }
    if (style) {
        props.style = normalizeStyle(style);
    }
    return props;
}

// packages/shared/src/domTagConfig.ts
var HTML_TAGS = "html,body,base,head,link,meta,style,title,address,article,aside,footer,header,hgroup,h1,h2,h3,h4,h5,h6,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,summary,template,blockquote,iframe,tfoot";
var SVG_TAGS = "svg,animate,animateMotion,animateTransform,circle,clipPath,color-profile,defs,desc,discard,ellipse,feBlend,feColorMatrix,feComponentTransfer,feComposite,feConvolveMatrix,feDiffuseLighting,feDisplacementMap,feDistantLight,feDropShadow,feFlood,feFuncA,feFuncB,feFuncG,feFuncR,feGaussianBlur,feImage,feMerge,feMergeNode,feMorphology,feOffset,fePointLight,feSpecularLighting,feSpotLight,feTile,feTurbulence,filter,foreignObject,g,hatch,hatchpath,image,line,linearGradient,marker,mask,mesh,meshgradient,meshpatch,meshrow,metadata,mpath,path,pattern,polygon,polyline,radialGradient,rect,set,solidcolor,stop,switch,symbol,text,textPath,title,tspan,unknown,use,view";
var MATH_TAGS = "annotation,annotation-xml,maction,maligngroup,malignmark,math,menclose,merror,mfenced,mfrac,mfraction,mglyph,mi,mlabeledtr,mlongdiv,mmultiscripts,mn,mo,mover,mpadded,mphantom,mprescripts,mroot,mrow,ms,mscarries,mscarry,msgroup,msline,mspace,msqrt,msrow,mstack,mstyle,msub,msubsup,msup,mtable,mtd,mtext,mtr,munder,munderover,none,semantics";
var isHTMLTag = /* @__PURE__ */
makeMap(HTML_TAGS);
var isSVGTag = /* @__PURE__ */
makeMap(SVG_TAGS);
var isMathMLTag = /* @__PURE__ */
makeMap(MATH_TAGS);

// packages/shared/src/domAttrConfig.ts
var specialBooleanAttrs = `itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly`;
var isSpecialBooleanAttr = /* @__PURE__ */
makeMap(specialBooleanAttrs);
var isBooleanAttr = /* @__PURE__ */
makeMap(specialBooleanAttrs + `,async,autofocus,autoplay,controls,default,defer,disabled,hidden,inert,loop,open,required,reversed,scoped,seamless,checked,muted,multiple,selected`);
function includeBooleanAttr(value) {
    return !!value || value === "";
}
var isKnownHtmlAttr = /* @__PURE__ */
makeMap(`accept,accept-charset,accesskey,action,align,allow,alt,async,autocapitalize,autocomplete,autofocus,autoplay,background,bgcolor,border,buffered,capture,challenge,charset,checked,cite,class,code,codebase,color,cols,colspan,content,contenteditable,contextmenu,controls,coords,crossorigin,csp,data,datetime,decoding,default,defer,dir,dirname,disabled,download,draggable,dropzone,enctype,enterkeyhint,for,form,formaction,formenctype,formmethod,formnovalidate,formtarget,headers,height,hidden,high,href,hreflang,http-equiv,icon,id,importance,inert,integrity,ismap,itemprop,keytype,kind,label,lang,language,loading,list,loop,low,manifest,max,maxlength,minlength,media,min,multiple,muted,name,novalidate,open,optimum,pattern,ping,placeholder,poster,preload,radiogroup,readonly,referrerpolicy,rel,required,reversed,rows,rowspan,sandbox,scope,scoped,selected,shape,size,sizes,slot,span,spellcheck,src,srcdoc,srclang,srcset,start,step,style,summary,tabindex,target,title,translate,type,usemap,value,width,wrap`);
var isKnownSvgAttr = /* @__PURE__ */
makeMap(`xmlns,accent-height,accumulate,additive,alignment-baseline,alphabetic,amplitude,arabic-form,ascent,attributeName,attributeType,azimuth,baseFrequency,baseline-shift,baseProfile,bbox,begin,bias,by,calcMode,cap-height,class,clip,clipPathUnits,clip-path,clip-rule,color,color-interpolation,color-interpolation-filters,color-profile,color-rendering,contentScriptType,contentStyleType,crossorigin,cursor,cx,cy,d,decelerate,descent,diffuseConstant,direction,display,divisor,dominant-baseline,dur,dx,dy,edgeMode,elevation,enable-background,end,exponent,fill,fill-opacity,fill-rule,filter,filterRes,filterUnits,flood-color,flood-opacity,font-family,font-size,font-size-adjust,font-stretch,font-style,font-variant,font-weight,format,from,fr,fx,fy,g1,g2,glyph-name,glyph-orientation-horizontal,glyph-orientation-vertical,glyphRef,gradientTransform,gradientUnits,hanging,height,href,hreflang,horiz-adv-x,horiz-origin-x,id,ideographic,image-rendering,in,in2,intercept,k,k1,k2,k3,k4,kernelMatrix,kernelUnitLength,kerning,keyPoints,keySplines,keyTimes,lang,lengthAdjust,letter-spacing,lighting-color,limitingConeAngle,local,marker-end,marker-mid,marker-start,markerHeight,markerUnits,markerWidth,mask,maskContentUnits,maskUnits,mathematical,max,media,method,min,mode,name,numOctaves,offset,opacity,operator,order,orient,orientation,origin,overflow,overline-position,overline-thickness,panose-1,paint-order,path,pathLength,patternContentUnits,patternTransform,patternUnits,ping,pointer-events,points,pointsAtX,pointsAtY,pointsAtZ,preserveAlpha,preserveAspectRatio,primitiveUnits,r,radius,referrerPolicy,refX,refY,rel,rendering-intent,repeatCount,repeatDur,requiredExtensions,requiredFeatures,restart,result,rotate,rx,ry,scale,seed,shape-rendering,slope,spacing,specularConstant,specularExponent,speed,spreadMethod,startOffset,stdDeviation,stemh,stemv,stitchTiles,stop-color,stop-opacity,strikethrough-position,strikethrough-thickness,string,stroke,stroke-dasharray,stroke-dashoffset,stroke-linecap,stroke-linejoin,stroke-miterlimit,stroke-opacity,stroke-width,style,surfaceScale,systemLanguage,tabindex,tableValues,target,targetX,targetY,text-anchor,text-decoration,text-rendering,textLength,to,transform,transform-origin,type,u1,u2,underline-position,underline-thickness,unicode,unicode-bidi,unicode-range,units-per-em,v-alphabetic,v-hanging,v-ideographic,v-mathematical,values,vector-effect,version,vert-adv-y,vert-origin-x,vert-origin-y,viewBox,viewTarget,visibility,width,widths,word-spacing,writing-mode,x,x-height,x1,x2,xChannelSelector,xlink:actuate,xlink:arcrole,xlink:href,xlink:role,xlink:show,xlink:title,xlink:type,xmlns:xlink,xml:base,xml:lang,xml:space,y,y1,y2,yChannelSelector,z,zoomAndPan`);
function isRenderableAttrValue(value) {
    if (value == null) {
        return false;
    }
    const type = typeof value;
    return type === "string" || type === "number" || type === "boolean";
}
function shouldSetAsAttr(tagName, key) {
    if (key === "spellcheck" || key === "draggable" || key === "translate") {
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

// packages/shared/src/escapeHtml.ts
var cssVarNameEscapeSymbolsRE = /[ !"#$%&'()*+,./:;<=>?@[\\\]^`{|}~]/g;
function getEscapedCssVarName(key, doubleEscape) {
    return key.replace(cssVarNameEscapeSymbolsRE, (s) => doubleEscape ? s === '"' ? '\\\\\\"' : `\\\\${s}` : `\\${s}`);
}

// packages/shared/src/looseEqual.ts
function looseCompareArrays(a, b) {
    if (a.length !== b.length)
        return false;
    let equal = true;
    for (let i = 0; equal && i < a.length; i++) {
        equal = looseEqual(a[i], b[i]);
    }
    return equal;
}
function looseEqual(a, b) {
    if (a === b)
        return true;
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
    return arr.findIndex( (item) => looseEqual(item, val));
}

// packages/reactivity/src/constants.ts
var TrackOpTypes = /* @__PURE__ */
( (TrackOpTypes2) => {
    TrackOpTypes2["GET"] = "get";
    TrackOpTypes2["HAS"] = "has";
    TrackOpTypes2["ITERATE"] = "iterate";
    return TrackOpTypes2;
}
)(TrackOpTypes || {});
var TriggerOpTypes = /* @__PURE__ */
( (TriggerOpTypes2) => {
    TriggerOpTypes2["SET"] = "set";
    TriggerOpTypes2["ADD"] = "add";
    TriggerOpTypes2["DELETE"] = "delete";
    TriggerOpTypes2["CLEAR"] = "clear";
    return TriggerOpTypes2;
}
)(TriggerOpTypes || {});

// packages/reactivity/src/warning.ts
function warn(msg, ...args) {
    console.warn(`[Vue warn] ${msg}`, ...args);
}

// packages/reactivity/src/effectScope.ts
var activeEffectScope;
var EffectScope = class {
    constructor(detached=false, parent=activeEffectScope) {
        this.detached = detached;
        /**
     * @internal
     */
        this._active = true;
        /**
     * @internal
     */
        this.effects = [];
        /**
     * @internal
     */
        this.cleanups = [];
        this._isPaused = false;
        this.parent = parent;
        if (!detached && parent) {
            this.index = (parent.scopes || (parent.scopes = [])).push(this) - 1;
        }
    }
    get active() {
        return this._active;
    }
    pause() {
        if (this._active) {
            this._isPaused = true;
            let i, l;
            if (this.scopes) {
                for (i = 0,
                l = this.scopes.length; i < l; i++) {
                    this.scopes[i].pause();
                }
            }
            for (i = 0,
            l = this.effects.length; i < l; i++) {
                this.effects[i].pause();
            }
        }
    }
    /**
   * Resumes the effect scope, including all child scopes and effects.
   */
    resume() {
        if (this._active) {
            if (this._isPaused) {
                this._isPaused = false;
                let i, l;
                if (this.scopes) {
                    for (i = 0,
                    l = this.scopes.length; i < l; i++) {
                        this.scopes[i].resume();
                    }
                }
                for (i = 0,
                l = this.effects.length; i < l; i++) {
                    this.effects[i].resume();
                }
            }
        }
    }
    run(fn) {
        if (this._active) {
            const currentEffectScope = activeEffectScope;
            try {
                activeEffectScope = this;
                return fn();
            } finally {
                activeEffectScope = currentEffectScope;
            }
        } else if (true) {
            warn(`cannot run an inactive effect scope.`);
        }
    }
    /**
   * This should only be called on non-detached scopes
   * @internal
   */
    on() {
        this.prevScope = activeEffectScope;
        activeEffectScope = this;
    }
    /**
   * This should only be called on non-detached scopes
   * @internal
   */
    off() {
        activeEffectScope = this.prevScope;
    }
    stop(fromParent) {
        if (this._active) {
            this._active = false;
            let i, l;
            for (i = 0,
            l = this.effects.length; i < l; i++) {
                this.effects[i].stop();
            }
            this.effects.length = 0;
            for (i = 0,
            l = this.cleanups.length; i < l; i++) {
                this.cleanups[i]();
            }
            this.cleanups.length = 0;
            if (this.scopes) {
                for (i = 0,
                l = this.scopes.length; i < l; i++) {
                    this.scopes[i].stop(true);
                }
                this.scopes.length = 0;
            }
            if (!this.detached && this.parent && !fromParent) {
                const last = this.parent.scopes.pop();
                if (last && last !== this) {
                    this.parent.scopes[this.index] = last;
                    last.index = this.index;
                }
            }
            this.parent = void 0;
        }
    }
}
;
function effectScope(detached) {
    return new EffectScope(detached);
}
function getCurrentScope() {
    return activeEffectScope;
}
function onScopeDispose(fn, failSilently=false) {
    if (activeEffectScope) {
        activeEffectScope.cleanups.push(fn);
    } else if (!failSilently) {
        warn(`onScopeDispose() is called when there is no active effect scope to be associated with.`);
    }
}

// packages/reactivity/src/effect.ts
var activeSub;
var pausedQueueEffects = /* @__PURE__ */
new WeakSet();
var ReactiveEffect = class {
    constructor(fn) {
        this.fn = fn;
        /**
     * @internal
     */
        this.deps = void 0;
        /**
     * @internal
     */
        this.depsTail = void 0;
        /**
     * @internal
     */
        this.flags = 1 /* ACTIVE */
        | 4 /* TRACKING */
        ;
        /**
     * @internal
     */
        this.next = void 0;
        /**
     * @internal
     */
        this.cleanup = void 0;
        this.scheduler = void 0;
        if (activeEffectScope && activeEffectScope.active) {
            activeEffectScope.effects.push(this);
        }
    }
    pause() {
        this.flags |= 64 /* PAUSED */
        ;
    }
    resume() {
        if (this.flags & 64 /* PAUSED */
        ) {
            this.flags &= ~64 /* PAUSED */
            ;
            if (pausedQueueEffects.has(this)) {
                pausedQueueEffects.delete(this);
                this.trigger();
            }
        }
    }
    /**
   * @internal
   */
    notify() {
        if (this.flags & 2 /* RUNNING */
        && !(this.flags & 32 /* ALLOW_RECURSE */
        )) {
            return;
        }
        if (!(this.flags & 8 /* NOTIFIED */
        )) {
            batch(this);
        }
    }
    run() {
        if (!(this.flags & 1 /* ACTIVE */
        )) {
            return this.fn();
        }
        this.flags |= 2 /* RUNNING */
        ;
        cleanupEffect(this);
        prepareDeps(this);
        const prevEffect = activeSub;
        const prevShouldTrack = shouldTrack;
        activeSub = this;
        shouldTrack = true;
        try {
            return this.fn();
        } finally {
            if (activeSub !== this) {
                warn("Active effect was not restored correctly - this is likely a Vue internal bug.");
            }
            cleanupDeps(this);
            activeSub = prevEffect;
            shouldTrack = prevShouldTrack;
            this.flags &= ~2 /* RUNNING */
            ;
        }
    }
    stop() {
        if (this.flags & 1 /* ACTIVE */
        ) {
            for (let link = this.deps; link; link = link.nextDep) {
                removeSub(link);
            }
            this.deps = this.depsTail = void 0;
            cleanupEffect(this);
            this.onStop && this.onStop();
            this.flags &= ~1 /* ACTIVE */
            ;
        }
    }
    trigger() {
        if (this.flags & 64 /* PAUSED */
        ) {
            pausedQueueEffects.add(this);
        } else if (this.scheduler) {
            this.scheduler();
        } else {
            this.runIfDirty();
        }
    }
    /**
   * @internal
   */
    runIfDirty() {
        if (isDirty(this)) {
            this.run();
        }
    }
    get dirty() {
        return isDirty(this);
    }
}
;
var batchDepth = 0;
var batchedSub;
var batchedComputed;
function batch(sub, isComputed=false) {
    sub.flags |= 8 /* NOTIFIED */
    ;
    if (isComputed) {
        sub.next = batchedComputed;
        batchedComputed = sub;
        return;
    }
    sub.next = batchedSub;
    batchedSub = sub;
}
function startBatch() {
    batchDepth++;
}
function endBatch() {
    if (--batchDepth > 0) {
        return;
    }
    if (batchedComputed) {
        let e = batchedComputed;
        batchedComputed = void 0;
        while (e) {
            const next2 = e.next;
            e.next = void 0;
            e.flags &= ~8 /* NOTIFIED */
            ;
            e = next2;
        }
    }
    let error;
    while (batchedSub) {
        let e = batchedSub;
        batchedSub = void 0;
        while (e) {
            const next2 = e.next;
            e.next = void 0;
            e.flags &= ~8 /* NOTIFIED */
            ;
            if (e.flags & 1 /* ACTIVE */
            ) {
                try {
                    ;e.trigger();
                } catch (err) {
                    if (!error)
                        error = err;
                }
            }
            e = next2;
        }
    }
    if (error)
        throw error;
}
function prepareDeps(sub) {
    for (let link = sub.deps; link; link = link.nextDep) {
        link.version = -1;
        link.prevActiveLink = link.dep.activeLink;
        link.dep.activeLink = link;
    }
}
function cleanupDeps(sub) {
    let head;
    let tail = sub.depsTail;
    let link = tail;
    while (link) {
        const prev = link.prevDep;
        if (link.version === -1) {
            if (link === tail)
                tail = prev;
            removeSub(link);
            removeDep(link);
        } else {
            head = link;
        }
        link.dep.activeLink = link.prevActiveLink;
        link.prevActiveLink = void 0;
        link = prev;
    }
    sub.deps = head;
    sub.depsTail = tail;
}
function isDirty(sub) {
    for (let link = sub.deps; link; link = link.nextDep) {
        if (link.dep.version !== link.version || link.dep.computed && (refreshComputed(link.dep.computed) || link.dep.version !== link.version)) {
            return true;
        }
    }
    if (sub._dirty) {
        return true;
    }
    return false;
}
function refreshComputed(computed3) {
    if (computed3.flags & 4 /* TRACKING */
    && !(computed3.flags & 16 /* DIRTY */
    )) {
        return;
    }
    computed3.flags &= ~16 /* DIRTY */
    ;
    if (computed3.globalVersion === globalVersion) {
        return;
    }
    computed3.globalVersion = globalVersion;
    const dep = computed3.dep;
    computed3.flags |= 2 /* RUNNING */
    ;
    if (dep.version > 0 && !computed3.isSSR && computed3.deps && !isDirty(computed3)) {
        computed3.flags &= ~2 /* RUNNING */
        ;
        return;
    }
    const prevSub = activeSub;
    const prevShouldTrack = shouldTrack;
    activeSub = computed3;
    shouldTrack = true;
    try {
        prepareDeps(computed3);
        const value = computed3.fn(computed3._value);
        if (dep.version === 0 || hasChanged(value, computed3._value)) {
            computed3._value = value;
            dep.version++;
        }
    } catch (err) {
        dep.version++;
        throw err;
    } finally {
        activeSub = prevSub;
        shouldTrack = prevShouldTrack;
        cleanupDeps(computed3);
        computed3.flags &= ~2 /* RUNNING */
        ;
    }
}
function removeSub(link, soft=false) {
    const {dep, prevSub, nextSub} = link;
    if (prevSub) {
        prevSub.nextSub = nextSub;
        link.prevSub = void 0;
    }
    if (nextSub) {
        nextSub.prevSub = prevSub;
        link.nextSub = void 0;
    }
    if (dep.subsHead === link) {
        dep.subsHead = nextSub;
    }
    if (dep.subs === link) {
        dep.subs = prevSub;
        if (!prevSub && dep.computed) {
            dep.computed.flags &= ~4 /* TRACKING */
            ;
            for (let l = dep.computed.deps; l; l = l.nextDep) {
                removeSub(l, true);
            }
        }
    }
    if (!soft && !--dep.sc && dep.map) {
        dep.map.delete(dep.key);
    }
}
function removeDep(link) {
    const {prevDep, nextDep} = link;
    if (prevDep) {
        prevDep.nextDep = nextDep;
        link.prevDep = void 0;
    }
    if (nextDep) {
        nextDep.prevDep = prevDep;
        link.nextDep = void 0;
    }
}
function effect(fn, options) {
    if (fn.effect instanceof ReactiveEffect) {
        fn = fn.effect.fn;
    }
    const e = new ReactiveEffect(fn);
    if (options) {
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
var shouldTrack = true;
var trackStack = [];
function pauseTracking() {
    trackStack.push(shouldTrack);
    shouldTrack = false;
}
function resetTracking() {
    const last = trackStack.pop();
    shouldTrack = last === void 0 ? true : last;
}
function onEffectCleanup(fn, failSilently=false) {
    if (activeSub instanceof ReactiveEffect) {
        activeSub.cleanup = fn;
    } else if (!failSilently) {
        warn(`onEffectCleanup() was called when there was no active effect to associate with.`);
    }
}
function cleanupEffect(e) {
    const {cleanup} = e;
    e.cleanup = void 0;
    if (cleanup) {
        const prevSub = activeSub;
        activeSub = void 0;
        try {
            cleanup();
        } finally {
            activeSub = prevSub;
        }
    }
}

// packages/reactivity/src/dep.ts
var globalVersion = 0;
var Link = class {
    constructor(sub, dep) {
        this.sub = sub;
        this.dep = dep;
        this.version = dep.version;
        this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
    }
}
;
var Dep = class {
    constructor(computed3) {
        this.computed = computed3;
        this.version = 0;
        /**
     * Link between this dep and the current active effect
     */
        this.activeLink = void 0;
        /**
     * Doubly linked list representing the subscribing effects (tail)
     */
        this.subs = void 0;
        /**
     * For object property deps cleanup
     */
        this.map = void 0;
        this.key = void 0;
        /**
     * Subscriber counter
     */
        this.sc = 0;
        if (true) {
            this.subsHead = void 0;
        }
    }
    track(debugInfo) {
        if (!activeSub || !shouldTrack || activeSub === this.computed) {
            return;
        }
        let link = this.activeLink;
        if (link === void 0 || link.sub !== activeSub) {
            link = this.activeLink = new Link(activeSub,this);
            if (!activeSub.deps) {
                activeSub.deps = activeSub.depsTail = link;
            } else {
                link.prevDep = activeSub.depsTail;
                activeSub.depsTail.nextDep = link;
                activeSub.depsTail = link;
            }
            addSub(link);
        } else if (link.version === -1) {
            link.version = this.version;
            if (link.nextDep) {
                const next2 = link.nextDep;
                next2.prevDep = link.prevDep;
                if (link.prevDep) {
                    link.prevDep.nextDep = next2;
                }
                link.prevDep = activeSub.depsTail;
                link.nextDep = void 0;
                activeSub.depsTail.nextDep = link;
                activeSub.depsTail = link;
                if (activeSub.deps === link) {
                    activeSub.deps = next2;
                }
            }
        }
        if (activeSub.onTrack) {
            activeSub.onTrack(extend({
                effect: activeSub
            }, debugInfo));
        }
        return link;
    }
    trigger(debugInfo) {
        this.version++;
        globalVersion++;
        this.notify(debugInfo);
    }
    notify(debugInfo) {
        startBatch();
        try {
            if (true) {
                for (let head = this.subsHead; head; head = head.nextSub) {
                    if (head.sub.onTrigger && !(head.sub.flags & 8 /* NOTIFIED */
                    )) {
                        head.sub.onTrigger(extend({
                            effect: head.sub
                        }, debugInfo));
                    }
                }
            }
            for (let link = this.subs; link; link = link.prevSub) {
                if (link.sub.notify()) {
                    ;link.sub.dep.notify();
                }
            }
        } finally {
            endBatch();
        }
    }
}
;
function addSub(link) {
    link.dep.sc++;
    if (link.sub.flags & 4 /* TRACKING */
    ) {
        const computed3 = link.dep.computed;
        if (computed3 && !link.dep.subs) {
            computed3.flags |= 4 /* TRACKING */
            | 16 /* DIRTY */
            ;
            for (let l = computed3.deps; l; l = l.nextDep) {
                addSub(l);
            }
        }
        const currentTail = link.dep.subs;
        if (currentTail !== link) {
            link.prevSub = currentTail;
            if (currentTail)
                currentTail.nextSub = link;
        }
        if (link.dep.subsHead === void 0) {
            link.dep.subsHead = link;
        }
        link.dep.subs = link;
    }
}
var targetMap = /* @__PURE__ */
new WeakMap();
var ITERATE_KEY = Symbol(true ? "Object iterate" : "");
var MAP_KEY_ITERATE_KEY = Symbol(true ? "Map keys iterate" : "");
var ARRAY_ITERATE_KEY = Symbol(true ? "Array iterate" : "");
function track(target, type, key) {
    if (shouldTrack && activeSub) {
        let depsMap = targetMap.get(target);
        if (!depsMap) {
            targetMap.set(target, depsMap = /* @__PURE__ */
            new Map());
        }
        let dep = depsMap.get(key);
        if (!dep) {
            depsMap.set(key, dep = new Dep());
            dep.map = depsMap;
            dep.key = key;
        }
        if (true) {
            dep.track({
                target,
                type,
                key
            });
        } else {
            dep.track();
        }
    }
}
function trigger(target, type, key, newValue, oldValue, oldTarget) {
    const depsMap = targetMap.get(target);
    if (!depsMap) {
        globalVersion++;
        return;
    }
    const run = (dep) => {
        if (dep) {
            if (true) {
                dep.trigger({
                    target,
                    type,
                    key,
                    newValue,
                    oldValue,
                    oldTarget
                });
            } else {
                dep.trigger();
            }
        }
    }
    ;
    startBatch();
    if (type === "clear"/* CLEAR */
    ) {
        depsMap.forEach(run);
    } else {
        const targetIsArray = isArray(target);
        const isArrayIndex = targetIsArray && isIntegerKey(key);
        if (targetIsArray && key === "length") {
            const newLength = Number(newValue);
            depsMap.forEach( (dep, key2) => {
                if (key2 === "length" || key2 === ARRAY_ITERATE_KEY || !isSymbol(key2) && key2 >= newLength) {
                    run(dep);
                }
            }
            );
        } else {
            if (key !== void 0 || depsMap.has(void 0)) {
                run(depsMap.get(key));
            }
            if (isArrayIndex) {
                run(depsMap.get(ARRAY_ITERATE_KEY));
            }
            switch (type) {
            case "add"/* ADD */
            :
                if (!targetIsArray) {
                    run(depsMap.get(ITERATE_KEY));
                    if (isMap(target)) {
                        run(depsMap.get(MAP_KEY_ITERATE_KEY));
                    }
                } else if (isArrayIndex) {
                    run(depsMap.get("length"));
                }
                break;
            case "delete"/* DELETE */
            :
                if (!targetIsArray) {
                    run(depsMap.get(ITERATE_KEY));
                    if (isMap(target)) {
                        run(depsMap.get(MAP_KEY_ITERATE_KEY));
                    }
                }
                break;
            case "set"/* SET */
            :
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

// packages/reactivity/src/arrayInstrumentations.ts
function reactiveReadArray(array) {
    const raw = toRaw(array);
    if (raw === array)
        return raw;
    track(raw, "iterate"/* ITERATE */
    , ARRAY_ITERATE_KEY);
    return isShallow(array) ? raw : raw.map(toReactive);
}
function shallowReadArray(arr) {
    track(arr = toRaw(arr), "iterate"/* ITERATE */
    , ARRAY_ITERATE_KEY);
    return arr;
}
var arrayInstrumentations = {
    __proto__: null,
    [Symbol.iterator]() {
        return iterator(this, Symbol.iterator, toReactive);
    },
    concat(...args) {
        return reactiveReadArray(this).concat(...args.map( (x) => isArray(x) ? reactiveReadArray(x) : x));
    },
    entries() {
        return iterator(this, "entries", (value) => {
            value[1] = toReactive(value[1]);
            return value;
        }
        );
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
function iterator(self2, method, wrapValue) {
    const arr = shallowReadArray(self2);
    const iter = arr[method]();
    if (arr !== self2 && !isShallow(self2)) {
        iter._next = iter.next;
        iter.next = () => {
            const result = iter._next();
            if (result.value) {
                result.value = wrapValue(result.value);
            }
            return result;
        }
        ;
    }
    return iter;
}
var arrayProto = Array.prototype;
function apply(self2, method, fn, thisArg, wrappedRetFn, args) {
    const arr = shallowReadArray(self2);
    const needsWrap = arr !== self2 && !isShallow(self2);
    const methodFn = arr[method];
    if (methodFn !== arrayProto[method]) {
        const result2 = methodFn.apply(self2, args);
        return needsWrap ? toReactive(result2) : result2;
    }
    let wrappedFn = fn;
    if (arr !== self2) {
        if (needsWrap) {
            wrappedFn = function(item, index) {
                return fn.call(this, toReactive(item), index, self2);
            }
            ;
        } else if (fn.length > 2) {
            wrappedFn = function(item, index) {
                return fn.call(this, item, index, self2);
            }
            ;
        }
    }
    const result = methodFn.call(arr, wrappedFn, thisArg);
    return needsWrap && wrappedRetFn ? wrappedRetFn(result) : result;
}
function reduce(self2, method, fn, args) {
    const arr = shallowReadArray(self2);
    let wrappedFn = fn;
    if (arr !== self2) {
        if (!isShallow(self2)) {
            wrappedFn = function(acc, item, index) {
                return fn.call(this, acc, toReactive(item), index, self2);
            }
            ;
        } else if (fn.length > 3) {
            wrappedFn = function(acc, item, index) {
                return fn.call(this, acc, item, index, self2);
            }
            ;
        }
    }
    return arr[method](wrappedFn, ...args);
}
function searchProxy(self2, method, args) {
    const arr = toRaw(self2);
    track(arr, "iterate"/* ITERATE */
    , ARRAY_ITERATE_KEY);
    const res = arr[method](...args);
    if ((res === -1 || res === false) && isProxy(args[0])) {
        args[0] = toRaw(args[0]);
        return arr[method](...args);
    }
    return res;
}
function noTracking(self2, method, args=[]) {
    pauseTracking();
    startBatch();
    const res = toRaw(self2)[method].apply(self2, args);
    endBatch();
    resetTracking();
    return res;
}

// packages/reactivity/src/baseHandlers.ts
var isNonTrackableKeys = /* @__PURE__ */
makeMap(`__proto__,__v_isRef,__isVue`);
var builtInSymbols = new Set(/* @__PURE__ */
Object.getOwnPropertyNames(Symbol).filter( (key) => key !== "arguments" && key !== "caller").map( (key) => Symbol[key]).filter(isSymbol));
function hasOwnProperty2(key) {
    if (!isSymbol(key))
        key = String(key);
    const obj = toRaw(this);
    track(obj, "has"/* HAS */
    , key);
    return obj.hasOwnProperty(key);
}
var BaseReactiveHandler = class {
    constructor(_isReadonly=false, _isShallow=false) {
        this._isReadonly = _isReadonly;
        this._isShallow = _isShallow;
    }
    get(target, key, receiver) {
        if (key === "__v_skip"/* SKIP */
        )
            return target["__v_skip"/* SKIP */
            ];
        const isReadonly2 = this._isReadonly
          , isShallow2 = this._isShallow;
        if (key === "__v_isReactive"/* IS_REACTIVE */
        ) {
            return !isReadonly2;
        } else if (key === "__v_isReadonly"/* IS_READONLY */
        ) {
            return isReadonly2;
        } else if (key === "__v_isShallow"/* IS_SHALLOW */
        ) {
            return isShallow2;
        } else if (key === "__v_raw"/* RAW */
        ) {
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
                return hasOwnProperty2;
            }
        }
        const res = Reflect.get(target, key, // if this is a proxy wrapping a ref, return methods using the raw ref
        // as receiver so that we don't have to call `toRaw` on the ref in all
        // its class methods
        isRef(target) ? target : receiver);
        if (isSymbol(key) ? builtInSymbols.has(key) : isNonTrackableKeys(key)) {
            return res;
        }
        if (!isReadonly2) {
            track(target, "get"/* GET */
            , key);
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
;
var MutableReactiveHandler = class extends BaseReactiveHandler {
    constructor(isShallow2=false) {
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
                    return false;
                } else {
                    oldValue.value = value;
                    return true;
                }
            }
        } else {}
        const hadKey = isArray(target) && isIntegerKey(key) ? Number(key) < target.length : hasOwn(target, key);
        const result = Reflect.set(target, key, value, isRef(target) ? target : receiver);
        if (target === toRaw(receiver)) {
            if (!hadKey) {
                trigger(target, "add"/* ADD */
                , key, value);
            } else if (hasChanged(value, oldValue)) {
                trigger(target, "set"/* SET */
                , key, value, oldValue);
            }
        }
        return result;
    }
    deleteProperty(target, key) {
        const hadKey = hasOwn(target, key);
        const oldValue = target[key];
        const result = Reflect.deleteProperty(target, key);
        if (result && hadKey) {
            trigger(target, "delete"/* DELETE */
            , key, void 0, oldValue);
        }
        return result;
    }
    has(target, key) {
        const result = Reflect.has(target, key);
        if (!isSymbol(key) || !builtInSymbols.has(key)) {
            track(target, "has"/* HAS */
            , key);
        }
        return result;
    }
    ownKeys(target) {
        track(target, "iterate"/* ITERATE */
        , isArray(target) ? "length" : ITERATE_KEY);
        return Reflect.ownKeys(target);
    }
}
;
var ReadonlyReactiveHandler = class extends BaseReactiveHandler {
    constructor(isShallow2=false) {
        super(true, isShallow2);
    }
    set(target, key) {
        if (true) {
            warn(`Set operation on key "${String(key)}" failed: target is readonly.`, target);
        }
        return true;
    }
    deleteProperty(target, key) {
        if (true) {
            warn(`Delete operation on key "${String(key)}" failed: target is readonly.`, target);
        }
        return true;
    }
}
;
var mutableHandlers = /* @__PURE__ */
new MutableReactiveHandler();
var readonlyHandlers = /* @__PURE__ */
new ReadonlyReactiveHandler();
var shallowReactiveHandlers = /* @__PURE__ */
new MutableReactiveHandler(true);
var shallowReadonlyHandlers = /* @__PURE__ */
new ReadonlyReactiveHandler(true);

// packages/reactivity/src/collectionHandlers.ts
var toShallow = (value) => value;
var getProto = (v) => Reflect.getPrototypeOf(v);
function createIterableMethod(method, isReadonly2, isShallow2) {
    return function(...args) {
        const target = this["__v_raw"/* RAW */
        ];
        const rawTarget = toRaw(target);
        const targetIsMap = isMap(rawTarget);
        const isPair = method === "entries" || method === Symbol.iterator && targetIsMap;
        const isKeyOnly = method === "keys" && targetIsMap;
        const innerIterator = target[method](...args);
        const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
        !isReadonly2 && track(rawTarget, "iterate"/* ITERATE */
        , isKeyOnly ? MAP_KEY_ITERATE_KEY : ITERATE_KEY);
        return {
            // iterator protocol
            next() {
                const {value, done} = innerIterator.next();
                return done ? {
                    value,
                    done
                } : {
                    value: isPair ? [wrap(value[0]), wrap(value[1])] : wrap(value),
                    done
                };
            },
            // iterable protocol
            [Symbol.iterator]() {
                return this;
            }
        };
    }
    ;
}
function createReadonlyMethod(type) {
    return function(...args) {
        if (true) {
            const key = args[0] ? `on key "${args[0]}" ` : ``;
            warn(`${capitalize(type)} operation ${key}failed: target is readonly.`, toRaw(this));
        }
        return type === "delete"/* DELETE */
        ? false : type === "clear"/* CLEAR */
        ? void 0 : this;
    }
    ;
}
function createInstrumentations(readonly2, shallow) {
    const instrumentations = {
        get(key) {
            const target = this["__v_raw"/* RAW */
            ];
            const rawTarget = toRaw(target);
            const rawKey = toRaw(key);
            if (!readonly2) {
                if (hasChanged(key, rawKey)) {
                    track(rawTarget, "get"/* GET */
                    , key);
                }
                track(rawTarget, "get"/* GET */
                , rawKey);
            }
            const {has} = getProto(rawTarget);
            const wrap = shallow ? toShallow : readonly2 ? toReadonly : toReactive;
            if (has.call(rawTarget, key)) {
                return wrap(target.get(key));
            } else if (has.call(rawTarget, rawKey)) {
                return wrap(target.get(rawKey));
            } else if (target !== rawTarget) {
                target.get(key);
            }
        },
        get size() {
            const target = this["__v_raw"/* RAW */
            ];
            !readonly2 && track(toRaw(target), "iterate"/* ITERATE */
            , ITERATE_KEY);
            return Reflect.get(target, "size", target);
        },
        has(key) {
            const target = this["__v_raw"/* RAW */
            ];
            const rawTarget = toRaw(target);
            const rawKey = toRaw(key);
            if (!readonly2) {
                if (hasChanged(key, rawKey)) {
                    track(rawTarget, "has"/* HAS */
                    , key);
                }
                track(rawTarget, "has"/* HAS */
                , rawKey);
            }
            return key === rawKey ? target.has(key) : target.has(key) || target.has(rawKey);
        },
        forEach(callback, thisArg) {
            const observed = this;
            const target = observed["__v_raw"/* RAW */
            ];
            const rawTarget = toRaw(target);
            const wrap = shallow ? toShallow : readonly2 ? toReadonly : toReactive;
            !readonly2 && track(rawTarget, "iterate"/* ITERATE */
            , ITERATE_KEY);
            return target.forEach( (value, key) => {
                return callback.call(thisArg, wrap(value), wrap(key), observed);
            }
            );
        }
    };
    extend(instrumentations, readonly2 ? {
        add: createReadonlyMethod("add"/* ADD */
        ),
        set: createReadonlyMethod("set"/* SET */
        ),
        delete: createReadonlyMethod("delete"/* DELETE */
        ),
        clear: createReadonlyMethod("clear"/* CLEAR */
        )
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
                trigger(target, "add"/* ADD */
                , value, value);
            }
            return this;
        },
        set(key, value) {
            if (!shallow && !isShallow(value) && !isReadonly(value)) {
                value = toRaw(value);
            }
            const target = toRaw(this);
            const {has, get} = getProto(target);
            let hadKey = has.call(target, key);
            if (!hadKey) {
                key = toRaw(key);
                hadKey = has.call(target, key);
            } else if (true) {
                checkIdentityKeys(target, has, key);
            }
            const oldValue = get.call(target, key);
            target.set(key, value);
            if (!hadKey) {
                trigger(target, "add"/* ADD */
                , key, value);
            } else if (hasChanged(value, oldValue)) {
                trigger(target, "set"/* SET */
                , key, value, oldValue);
            }
            return this;
        },
        delete(key) {
            const target = toRaw(this);
            const {has, get} = getProto(target);
            let hadKey = has.call(target, key);
            if (!hadKey) {
                key = toRaw(key);
                hadKey = has.call(target, key);
            } else if (true) {
                checkIdentityKeys(target, has, key);
            }
            const oldValue = get ? get.call(target, key) : void 0;
            const result = target.delete(key);
            if (hadKey) {
                trigger(target, "delete"/* DELETE */
                , key, void 0, oldValue);
            }
            return result;
        },
        clear() {
            const target = toRaw(this);
            const hadItems = target.size !== 0;
            const oldTarget = true ? isMap(target) ? new Map(target) : new Set(target) : void 0;
            const result = target.clear();
            if (hadItems) {
                trigger(target, "clear"/* CLEAR */
                , void 0, void 0, oldTarget);
            }
            return result;
        }
    });
    const iteratorMethods = ["keys", "values", "entries", Symbol.iterator];
    iteratorMethods.forEach( (method) => {
        instrumentations[method] = createIterableMethod(method, readonly2, shallow);
    }
    );
    return instrumentations;
}
function createInstrumentationGetter(isReadonly2, shallow) {
    const instrumentations = createInstrumentations(isReadonly2, shallow);
    return (target, key, receiver) => {
        if (key === "__v_isReactive"/* IS_REACTIVE */
        ) {
            return !isReadonly2;
        } else if (key === "__v_isReadonly"/* IS_READONLY */
        ) {
            return isReadonly2;
        } else if (key === "__v_raw"/* RAW */
        ) {
            return target;
        }
        return Reflect.get(hasOwn(instrumentations, key) && key in target ? instrumentations : target, key, receiver);
    }
    ;
}
var mutableCollectionHandlers = {
    get: /* @__PURE__ */
    createInstrumentationGetter(false, false)
};
var shallowCollectionHandlers = {
    get: /* @__PURE__ */
    createInstrumentationGetter(false, true)
};
var readonlyCollectionHandlers = {
    get: /* @__PURE__ */
    createInstrumentationGetter(true, false)
};
var shallowReadonlyCollectionHandlers = {
    get: /* @__PURE__ */
    createInstrumentationGetter(true, true)
};
function checkIdentityKeys(target, has, key) {
    const rawKey = toRaw(key);
    if (rawKey !== key && has.call(target, rawKey)) {
        const type = toRawType(target);
        warn(`Reactive ${type} contains both the raw and reactive versions of the same object${type === `Map` ? ` as keys` : ``}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`);
    }
}

// packages/reactivity/src/reactive.ts
var reactiveMap = /* @__PURE__ */
new WeakMap();
var shallowReactiveMap = /* @__PURE__ */
new WeakMap();
var readonlyMap = /* @__PURE__ */
new WeakMap();
var shallowReadonlyMap = /* @__PURE__ */
new WeakMap();
function targetTypeMap(rawType) {
    switch (rawType) {
    case "Object":
    case "Array":
        return 1 /* COMMON */
        ;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
        return 2 /* COLLECTION */
        ;
    default:
        return 0 /* INVALID */
        ;
    }
}
function getTargetType(value) {
    return value["__v_skip"/* SKIP */
    ] || !Object.isExtensible(value) ? 0 /* INVALID */
    : targetTypeMap(toRawType(value));
}
function reactive(target) {
    if (isReadonly(target)) {
        return target;
    }
    return createReactiveObject(target, false, mutableHandlers, mutableCollectionHandlers, reactiveMap);
}
function shallowReactive(target) {
    return createReactiveObject(target, false, shallowReactiveHandlers, shallowCollectionHandlers, shallowReactiveMap);
}
function readonly(target) {
    return createReactiveObject(target, true, readonlyHandlers, readonlyCollectionHandlers, readonlyMap);
}
function shallowReadonly(target) {
    return createReactiveObject(target, true, shallowReadonlyHandlers, shallowReadonlyCollectionHandlers, shallowReadonlyMap);
}
function createReactiveObject(target, isReadonly2, baseHandlers, collectionHandlers, proxyMap) {
    if (!isObject(target)) {
        if (true) {
            warn(`value cannot be made ${isReadonly2 ? "readonly" : "reactive"}: ${String(target)}`);
        }
        return target;
    }
    if (target["__v_raw"/* RAW */
    ] && !(isReadonly2 && target["__v_isReactive"/* IS_REACTIVE */
    ])) {
        return target;
    }
    const existingProxy = proxyMap.get(target);
    if (existingProxy) {
        return existingProxy;
    }
    const targetType = getTargetType(target);
    if (targetType === 0 /* INVALID */
    ) {
        return target;
    }
    const proxy = new Proxy(target,targetType === 2 /* COLLECTION */
    ? collectionHandlers : baseHandlers);
    proxyMap.set(target, proxy);
    return proxy;
}
function isReactive(value) {
    if (isReadonly(value)) {
        return isReactive(value["__v_raw"/* RAW */
        ]);
    }
    return !!(value && value["__v_isReactive"/* IS_REACTIVE */
    ]);
}
function isReadonly(value) {
    return !!(value && value["__v_isReadonly"/* IS_READONLY */
    ]);
}
function isShallow(value) {
    return !!(value && value["__v_isShallow"/* IS_SHALLOW */
    ]);
}
function isProxy(value) {
    return value ? !!value["__v_raw"/* RAW */
    ] : false;
}
function toRaw(observed) {
    const raw = observed && observed["__v_raw"/* RAW */
    ];
    return raw ? toRaw(raw) : observed;
}
function markRaw(value) {
    if (!hasOwn(value, "__v_skip"/* SKIP */
    ) && Object.isExtensible(value)) {
        def(value, "__v_skip"/* SKIP */
        , true);
    }
    return value;
}
var toReactive = (value) => isObject(value) ? reactive(value) : value;
var toReadonly = (value) => isObject(value) ? readonly(value) : value;

// packages/reactivity/src/ref.ts
function isRef(r) {
    return r ? r["__v_isRef"/* IS_REF */
    ] === true : false;
}
function ref(value) {
    return createRef(value, false);
}
function shallowRef(value) {
    return createRef(value, true);
}
function createRef(rawValue, shallow) {
    if (isRef(rawValue)) {
        return rawValue;
    }
    return new RefImpl(rawValue,shallow);
}
var _a, _b;
_b = "__v_isRef"/* IS_REF */
,
_a = "__v_isShallow"/* IS_SHALLOW */
;
var RefImpl = class {
    constructor(value, isShallow2) {
        this.dep = new Dep();
        this[_b] = true;
        this[_a] = false;
        this._rawValue = isShallow2 ? value : toRaw(value);
        this._value = isShallow2 ? value : toReactive(value);
        this["__v_isShallow"/* IS_SHALLOW */
        ] = isShallow2;
    }
    get value() {
        if (true) {
            this.dep.track({
                target: this,
                type: "get"/* GET */
                ,
                key: "value"
            });
        } else {
            this.dep.track();
        }
        return this._value;
    }
    set value(newValue) {
        const oldValue = this._rawValue;
        const useDirectValue = this["__v_isShallow"/* IS_SHALLOW */
        ] || isShallow(newValue) || isReadonly(newValue);
        newValue = useDirectValue ? newValue : toRaw(newValue);
        if (hasChanged(newValue, oldValue)) {
            this._rawValue = newValue;
            this._value = useDirectValue ? newValue : toReactive(newValue);
            if (true) {
                this.dep.trigger({
                    target: this,
                    type: "set"/* SET */
                    ,
                    key: "value",
                    newValue,
                    oldValue
                });
            } else {
                this.dep.trigger();
            }
        }
    }
}
;
function triggerRef(ref2) {
    if (ref2.dep) {
        if (true) {
            ;ref2.dep.trigger({
                target: ref2,
                type: "set"/* SET */
                ,
                key: "value",
                newValue: ref2._value
            });
        } else {
            ;ref2.dep.trigger();
        }
    }
}
function unref(ref2) {
    return isRef(ref2) ? ref2.value : ref2;
}
function toValue(source) {
    return isFunction(source) ? source() : unref(source);
}
var shallowUnwrapHandlers = {
    get: (target, key, receiver) => key === "__v_raw"/* RAW */
    ? target : unref(Reflect.get(target, key, receiver)),
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
    return isReactive(objectWithRefs) ? objectWithRefs : new Proxy(objectWithRefs,shallowUnwrapHandlers);
}
var _a2;
_a2 = "__v_isRef"/* IS_REF */
;
var CustomRefImpl = class {
    constructor(factory) {
        this[_a2] = true;
        this._value = void 0;
        const dep = this.dep = new Dep();
        const {get, set} = factory(dep.track.bind(dep), dep.trigger.bind(dep));
        this._get = get;
        this._set = set;
    }
    get value() {
        return this._value = this._get();
    }
    set value(newVal) {
        this._set(newVal);
    }
}
;
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
var _a3;
_a3 = "__v_isRef"/* IS_REF */
;
var ObjectRefImpl = class {
    constructor(_object, _key, _defaultValue) {
        this._object = _object;
        this._key = _key;
        this._defaultValue = _defaultValue;
        this[_a3] = true;
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
;
var _a4, _b2;
_b2 = "__v_isRef"/* IS_REF */
,
_a4 = "__v_isReadonly"/* IS_READONLY */
;
var GetterRefImpl = class {
    constructor(_getter) {
        this._getter = _getter;
        this[_b2] = true;
        this[_a4] = true;
        this._value = void 0;
    }
    get value() {
        return this._value = this._getter();
    }
}
;
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
    return isRef(val) ? val : new ObjectRefImpl(source,key,defaultValue);
}

// packages/reactivity/src/computed.ts
var ComputedRefImpl = class {
    constructor(fn, setter, isSSR) {
        this.fn = fn;
        this.setter = setter;
        /**
     * @internal
     */
        this._value = void 0;
        /**
     * @internal
     */
        this.dep = new Dep(this);
        /**
     * @internal
     */
        this.__v_isRef = true;
        // TODO isolatedDeclarations ReactiveFlags.IS_READONLY
        // A computed is also a subscriber that tracks other deps
        /**
     * @internal
     */
        this.deps = void 0;
        /**
     * @internal
     */
        this.depsTail = void 0;
        /**
     * @internal
     */
        this.flags = 16 /* DIRTY */
        ;
        /**
     * @internal
     */
        this.globalVersion = globalVersion - 1;
        /**
     * @internal
     */
        this.next = void 0;
        // for backwards compat
        this.effect = this;
        this["__v_isReadonly"/* IS_READONLY */
        ] = !setter;
        this.isSSR = isSSR;
    }
    /**
   * @internal
   */
    notify() {
        this.flags |= 16 /* DIRTY */
        ;
        if (!(this.flags & 8 /* NOTIFIED */
        ) && // avoid infinite self recursion
        activeSub !== this) {
            batch(this, true);
            return true;
        } else if (true) {}
    }
    get value() {
        const link = true ? this.dep.track({
            target: this,
            type: "get"/* GET */
            ,
            key: "value"
        }) : this.dep.track();
        refreshComputed(this);
        if (link) {
            link.version = this.dep.version;
        }
        return this._value;
    }
    set value(newValue) {
        if (this.setter) {
            this.setter(newValue);
        } else if (true) {
            warn("Write operation failed: computed value is readonly");
        }
    }
}
;
function computed(getterOrOptions, debugOptions, isSSR=false) {
    let getter;
    let setter;
    if (isFunction(getterOrOptions)) {
        getter = getterOrOptions;
    } else {
        getter = getterOrOptions.get;
        setter = getterOrOptions.set;
    }
    const cRef = new ComputedRefImpl(getter,setter,isSSR);
    if (debugOptions && !isSSR) {
        cRef.onTrack = debugOptions.onTrack;
        cRef.onTrigger = debugOptions.onTrigger;
    }
    return cRef;
}

// packages/reactivity/src/watch.ts
var INITIAL_WATCHER_VALUE = {};
var cleanupMap = /* @__PURE__ */
new WeakMap();
var activeWatcher = void 0;
function getCurrentWatcher() {
    return activeWatcher;
}
function onWatcherCleanup(cleanupFn, failSilently=false, owner=activeWatcher) {
    if (owner) {
        let cleanups = cleanupMap.get(owner);
        if (!cleanups)
            cleanupMap.set(owner, cleanups = []);
        cleanups.push(cleanupFn);
    } else if (!failSilently) {
        warn(`onWatcherCleanup() was called when there was no active watcher to associate with.`);
    }
}
function watch(source, cb, options=EMPTY_OBJ) {
    const {immediate, deep, once, scheduler, augmentJob, call} = options;
    const warnInvalidSource = (s) => {
        ;(options.onWarn || warn)(`Invalid watch source: `, s, `A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types.`);
    }
    ;
    const reactiveGetter = (source2) => {
        if (deep)
            return source2;
        if (isShallow(source2) || deep === false || deep === 0)
            return traverse(source2, 1);
        return traverse(source2);
    }
    ;
    let effect2;
    let getter;
    let cleanup;
    let boundCleanup;
    let forceTrigger = false;
    let isMultiSource = false;
    if (isRef(source)) {
        getter = () => source.value;
        forceTrigger = isShallow(source);
    } else if (isReactive(source)) {
        getter = () => reactiveGetter(source);
        forceTrigger = true;
    } else if (isArray(source)) {
        isMultiSource = true;
        forceTrigger = source.some( (s) => isReactive(s) || isShallow(s));
        getter = () => source.map( (s) => {
            if (isRef(s)) {
                return s.value;
            } else if (isReactive(s)) {
                return reactiveGetter(s);
            } else if (isFunction(s)) {
                return call ? call(s, 2 /* WATCH_GETTER */
                ) : s();
            } else {
                warnInvalidSource(s);
            }
        }
        );
    } else if (isFunction(source)) {
        if (cb) {
            getter = call ? () => call(source, 2 /* WATCH_GETTER */
            ) : source;
        } else {
            getter = () => {
                if (cleanup) {
                    pauseTracking();
                    try {
                        cleanup();
                    } finally {
                        resetTracking();
                    }
                }
                const currentEffect = activeWatcher;
                activeWatcher = effect2;
                try {
                    return call ? call(source, 3 /* WATCH_CALLBACK */
                    , [boundCleanup]) : source(boundCleanup);
                } finally {
                    activeWatcher = currentEffect;
                }
            }
            ;
        }
    } else {
        getter = NOOP;
        warnInvalidSource(source);
    }
    if (cb && deep) {
        const baseGetter = getter;
        const depth = deep === true ? Infinity : deep;
        getter = () => traverse(baseGetter(), depth);
    }
    const scope = getCurrentScope();
    const watchHandle = () => {
        effect2.stop();
        if (scope && scope.active) {
            remove(scope.effects, effect2);
        }
    }
    ;
    if (once && cb) {
        const _cb = cb;
        cb = (...args) => {
            _cb(...args);
            watchHandle();
        }
        ;
    }
    let oldValue = isMultiSource ? new Array(source.length).fill(INITIAL_WATCHER_VALUE) : INITIAL_WATCHER_VALUE;
    const job = (immediateFirstRun) => {
        if (!(effect2.flags & 1 /* ACTIVE */
        ) || !effect2.dirty && !immediateFirstRun) {
            return;
        }
        if (cb) {
            const newValue = effect2.run();
            if (deep || forceTrigger || (isMultiSource ? newValue.some( (v, i) => hasChanged(v, oldValue[i])) : hasChanged(newValue, oldValue))) {
                if (cleanup) {
                    cleanup();
                }
                const currentWatcher = activeWatcher;
                activeWatcher = effect2;
                try {
                    const args = [newValue, // pass undefined as the old value when it's changed for the first time
                    oldValue === INITIAL_WATCHER_VALUE ? void 0 : isMultiSource && oldValue[0] === INITIAL_WATCHER_VALUE ? [] : oldValue, boundCleanup];
                    call ? call(cb, 3 /* WATCH_CALLBACK */
                    , args) : (// @ts-expect-error
                    cb(...args));
                    oldValue = newValue;
                } finally {
                    activeWatcher = currentWatcher;
                }
            }
        } else {
            effect2.run();
        }
    }
    ;
    if (augmentJob) {
        augmentJob(job);
    }
    effect2 = new ReactiveEffect(getter);
    effect2.scheduler = scheduler ? () => scheduler(job, false) : job;
    boundCleanup = (fn) => onWatcherCleanup(fn, false, effect2);
    cleanup = effect2.onStop = () => {
        const cleanups = cleanupMap.get(effect2);
        if (cleanups) {
            if (call) {
                call(cleanups, 4 /* WATCH_CLEANUP */
                );
            } else {
                for (const cleanup2 of cleanups)
                    cleanup2();
            }
            cleanupMap.delete(effect2);
        }
    }
    ;
    if (true) {
        effect2.onTrack = options.onTrack;
        effect2.onTrigger = options.onTrigger;
    }
    if (cb) {
        if (immediate) {
            job(true);
        } else {
            oldValue = effect2.run();
        }
    } else if (scheduler) {
        scheduler(job.bind(null, true), true);
    } else {
        effect2.run();
    }
    watchHandle.pause = effect2.pause.bind(effect2);
    watchHandle.resume = effect2.resume.bind(effect2);
    watchHandle.stop = watchHandle;
    return watchHandle;
}
function traverse(value, depth=Infinity, seen) {
    if (depth <= 0 || !isObject(value) || value["__v_skip"/* SKIP */
    ]) {
        return value;
    }
    seen = seen || /* @__PURE__ */
    new Set();
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
        value.forEach( (v) => {
            traverse(v, depth, seen);
        }
        );
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

// packages/shared/src/toDisplayString.ts
var isRef2 = (val) => {
    return !!(val && val["__v_isRef"/* IS_REF */
    ] === true);
}
;
var toDisplayString = (val) => {
    return isString(val) ? val : val == null ? "" : isArray(val) || isObject(val) && (val.toString === objectToString || !isFunction(val.toString)) ? isRef2(val) ? toDisplayString(val.value) : JSON.stringify(val, replacer, 2) : String(val);
}
;
var replacer = (_key, val) => {
    if (isRef2(val)) {
        return replacer(_key, val.value);
    } else if (isMap(val)) {
        return {
            [`Map(${val.size})`]: [...val.entries()].reduce( (entries, [key,val2], i) => {
                entries[stringifySymbol(key, i) + " =>"] = val2;
                return entries;
            }
            , {})
        };
    } else if (isSet(val)) {
        return {
            [`Set(${val.size})`]: [...val.values()].map( (v) => stringifySymbol(v))
        };
    } else if (isSymbol(val)) {
        return stringifySymbol(val);
    } else if (isObject(val) && !isArray(val) && !isPlainObject(val)) {
        return String(val);
    }
    return val;
}
;
var stringifySymbol = (v, i="") => (// Symbol.description in es2019+ so we need to cast here to pass
// the lib: es2016 check
isSymbol(v) ? `Symbol(${v.description ?? i})` : v);

// packages/runtime-core/src/warning.ts
var stack = [];
function pushWarningContext(ctx) {
    stack.push(ctx);
}
function popWarningContext() {
    stack.pop();
}
var isWarning = false;
function warn2(msg, ...args) {
    if (isWarning)
        return;
    isWarning = true;
    pauseTracking();
    const entry = stack.length ? stack[stack.length - 1] : null;
    const instance = isVNode(entry) ? entry.component : entry;
    const appWarnHandler = instance && instance.appContext.config.warnHandler;
    const trace = getComponentTrace();
    if (appWarnHandler) {
        callWithErrorHandling(appWarnHandler, instance, 11 /* APP_WARN_HANDLER */
        , [// eslint-disable-next-line no-restricted-syntax
        msg + args.map( (a) => a.toString?.() ?? JSON.stringify(a)).join(""), instance && instance.proxy || instance, trace.map( ({ctx}) => `at <${formatComponentName(instance, ctx.type)}>`).join("\n"), trace]);
    } else {
        const warnArgs = [`[Vue warn]: ${msg}`, ...args];
        if (trace.length && // avoid spamming console during tests
        true) {
            warnArgs.push(`
`, ...formatTrace(trace));
        }
        console.warn(...warnArgs);
    }
    resetTracking();
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
            currentCtx = parent && parent.vnode;
        } else {
            currentCtx = currentCtx.parent;
        }
    }
    return normalizedStack;
}
function formatTrace(trace) {
    const logs = [];
    trace.forEach( (entry, i) => {
        logs.push(...i === 0 ? [] : [`
`], ...formatTraceEntry(entry));
    }
    );
    return logs;
}
function formatTraceEntry({ctx, recurseCount}) {
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
    keys.slice(0, 3).forEach( (key) => {
        res.push(...formatProp(key, props[key]));
    }
    );
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
    if (false)
        return;
    if (val === void 0) {
        return;
    } else if (typeof val !== "number") {
        warn2(`${type} is not a valid number - got ${JSON.stringify(val)}.`);
    } else if (isNaN(val)) {
        warn2(`${type} is NaN - the duration expression might be incorrect.`);
    }
}

// packages/runtime-core/src/errorHandling.ts
var ErrorCodes = /* @__PURE__ */
( (ErrorCodes2) => {
    ErrorCodes2[ErrorCodes2["SETUP_FUNCTION"] = 0] = "SETUP_FUNCTION";
    ErrorCodes2[ErrorCodes2["RENDER_FUNCTION"] = 1] = "RENDER_FUNCTION";
    ErrorCodes2[ErrorCodes2["NATIVE_EVENT_HANDLER"] = 5] = "NATIVE_EVENT_HANDLER";
    ErrorCodes2[ErrorCodes2["COMPONENT_EVENT_HANDLER"] = 6] = "COMPONENT_EVENT_HANDLER";
    ErrorCodes2[ErrorCodes2["VNODE_HOOK"] = 7] = "VNODE_HOOK";
    ErrorCodes2[ErrorCodes2["DIRECTIVE_HOOK"] = 8] = "DIRECTIVE_HOOK";
    ErrorCodes2[ErrorCodes2["TRANSITION_HOOK"] = 9] = "TRANSITION_HOOK";
    ErrorCodes2[ErrorCodes2["APP_ERROR_HANDLER"] = 10] = "APP_ERROR_HANDLER";
    ErrorCodes2[ErrorCodes2["APP_WARN_HANDLER"] = 11] = "APP_WARN_HANDLER";
    ErrorCodes2[ErrorCodes2["FUNCTION_REF"] = 12] = "FUNCTION_REF";
    ErrorCodes2[ErrorCodes2["ASYNC_COMPONENT_LOADER"] = 13] = "ASYNC_COMPONENT_LOADER";
    ErrorCodes2[ErrorCodes2["SCHEDULER"] = 14] = "SCHEDULER";
    ErrorCodes2[ErrorCodes2["COMPONENT_UPDATE"] = 15] = "COMPONENT_UPDATE";
    ErrorCodes2[ErrorCodes2["APP_UNMOUNT_CLEANUP"] = 16] = "APP_UNMOUNT_CLEANUP";
    return ErrorCodes2;
}
)(ErrorCodes || {});
var ErrorTypeStrings = {
    ["sp"/* SERVER_PREFETCH */
    ]: "serverPrefetch hook",
    ["bc"/* BEFORE_CREATE */
    ]: "beforeCreate hook",
    ["c"/* CREATED */
    ]: "created hook",
    ["bm"/* BEFORE_MOUNT */
    ]: "beforeMount hook",
    ["m"/* MOUNTED */
    ]: "mounted hook",
    ["bu"/* BEFORE_UPDATE */
    ]: "beforeUpdate hook",
    ["u"/* UPDATED */
    ]: "updated",
    ["bum"/* BEFORE_UNMOUNT */
    ]: "beforeUnmount hook",
    ["um"/* UNMOUNTED */
    ]: "unmounted hook",
    ["a"/* ACTIVATED */
    ]: "activated hook",
    ["da"/* DEACTIVATED */
    ]: "deactivated hook",
    ["ec"/* ERROR_CAPTURED */
    ]: "errorCaptured hook",
    ["rtc"/* RENDER_TRACKED */
    ]: "renderTracked hook",
    ["rtg"/* RENDER_TRIGGERED */
    ]: "renderTriggered hook",
    [0 /* SETUP_FUNCTION */
    ]: "setup function",
    [1 /* RENDER_FUNCTION */
    ]: "render function",
    [2 /* WATCH_GETTER */
    ]: "watcher getter",
    [3 /* WATCH_CALLBACK */
    ]: "watcher callback",
    [4 /* WATCH_CLEANUP */
    ]: "watcher cleanup function",
    [5 /* NATIVE_EVENT_HANDLER */
    ]: "native event handler",
    [6 /* COMPONENT_EVENT_HANDLER */
    ]: "component event handler",
    [7 /* VNODE_HOOK */
    ]: "vnode hook",
    [8 /* DIRECTIVE_HOOK */
    ]: "directive hook",
    [9 /* TRANSITION_HOOK */
    ]: "transition hook",
    [10 /* APP_ERROR_HANDLER */
    ]: "app errorHandler",
    [11 /* APP_WARN_HANDLER */
    ]: "app warnHandler",
    [12 /* FUNCTION_REF */
    ]: "ref function",
    [13 /* ASYNC_COMPONENT_LOADER */
    ]: "async component loader",
    [14 /* SCHEDULER */
    ]: "scheduler flush",
    [15 /* COMPONENT_UPDATE */
    ]: "component update",
    [16 /* APP_UNMOUNT_CLEANUP */
    ]: "app unmount cleanup function"
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
            res.catch( (err) => {
                handleError(err, instance, type);
            }
            );
        }
        return res;
    }
    if (isArray(fn)) {
        const values = [];
        for (let i = 0; i < fn.length; i++) {
            values.push(callWithAsyncErrorHandling(fn[i], instance, type, args));
        }
        return values;
    } else if (true) {
        warn2(`Invalid value type passed to callWithAsyncErrorHandling(): ${typeof fn}`);
    }
}
function handleError(err, instance, type, throwInDev=true) {
    const {errorHandler, throwUnhandledErrorInProduction} = instance && instance.appContext.config || EMPTY_OBJ;
    if (instance) {
        let cur = instance.parent;
        const exposedInstance = instance.proxy || instance;
        const errorInfo = true ? ErrorTypeStrings[type] : `https://vuejs.org/error-reference/#runtime-${type}`;
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
            pauseTracking();
            callWithErrorHandling(errorHandler, null, 10 /* APP_ERROR_HANDLER */
            , [err, exposedInstance, errorInfo]);
            resetTracking();
            return;
        }
    }
    logError(err, type, instance, throwInDev, throwUnhandledErrorInProduction);
}
function logError(err, type, instance, throwInDev=true, throwInProd=false) {
    if (true) {
        const info = ErrorTypeStrings[type];
        if (instance) {
            pushWarningContext(instance);
        }
        warn2(`Unhandled error${info ? ` during execution of ${info}` : ``}`);
        if (instance) {
            popWarningContext();
        }
        if (throwInDev) {
            throw err;
        } else if (true) {
            console.error(err);
        }
    } else if (throwInProd) {
        throw err;
    } else {
        console.error(err);
    }
}

// packages/runtime-core/src/scheduler.ts
var queue = [];
var flushIndex = -1;
var pendingPostFlushCbs = [];
var activePostFlushCbs = null;
var postFlushIndex = 0;
var resolvedPromise = /* @__PURE__ */
Promise.resolve();
var currentFlushPromise = null;
var RECURSION_LIMIT = 100;
function nextTick(fn) {
    const p2 = currentFlushPromise || resolvedPromise;
    return fn ? p2.then(this ? fn.bind(this) : fn) : p2;
}
function findInsertionIndex(id) {
    let start = flushIndex + 1;
    let end = queue.length;
    while (start < end) {
        const middle = start + end >>> 1;
        const middleJob = queue[middle];
        const middleJobId = getId(middleJob);
        if (middleJobId < id || middleJobId === id && middleJob.flags & 2 /* PRE */
        ) {
            start = middle + 1;
        } else {
            end = middle;
        }
    }
    return start;
}
function queueJob(job) {
    if (!(job.flags & 1 /* QUEUED */
    )) {
        const jobId = getId(job);
        const lastJob = queue[queue.length - 1];
        if (!lastJob || // fast path when the job id is larger than the tail
        !(job.flags & 2 /* PRE */
        ) && jobId >= getId(lastJob)) {
            queue.push(job);
        } else {
            queue.splice(findInsertionIndex(jobId), 0, job);
        }
        job.flags |= 1 /* QUEUED */
        ;
        queueFlush();
    }
}
function queueFlush() {
    if (!currentFlushPromise) {
        currentFlushPromise = resolvedPromise.then(flushJobs).catch( (e) => {
            currentFlushPromise = null;
            throw e;
        }
        );
    }
}
function queuePostFlushCb(cb) {
    if (!isArray(cb)) {
        if (activePostFlushCbs && cb.id === -1) {
            activePostFlushCbs.splice(postFlushIndex + 1, 0, cb);
        } else if (!(cb.flags & 1 /* QUEUED */
        )) {
            pendingPostFlushCbs.push(cb);
            cb.flags |= 1 /* QUEUED */
            ;
        }
    } else {
        pendingPostFlushCbs.push(...cb);
    }
    queueFlush();
}
function flushPreFlushCbs(instance, seen, i=flushIndex + 1) {
    if (true) {
        seen = seen || /* @__PURE__ */
        new Map();
    }
    for (; i < queue.length; i++) {
        const cb = queue[i];
        if (cb && cb.flags & 2 /* PRE */
        ) {
            if (instance && cb.id !== instance.uid) {
                continue;
            }
            if (checkRecursiveUpdates(seen, cb)) {
                continue;
            }
            queue.splice(i, 1);
            i--;
            if (cb.flags & 4 /* ALLOW_RECURSE */
            ) {
                cb.flags &= ~1 /* QUEUED */
                ;
            }
            cb();
            if (!(cb.flags & 4 /* ALLOW_RECURSE */
            )) {
                cb.flags &= ~1 /* QUEUED */
                ;
            }
        }
    }
}
function flushPostFlushCbs(seen) {
    if (pendingPostFlushCbs.length) {
        const deduped = [...new Set(pendingPostFlushCbs)].sort( (a, b) => getId(a) - getId(b));
        pendingPostFlushCbs.length = 0;
        if (activePostFlushCbs) {
            activePostFlushCbs.push(...deduped);
            return;
        }
        activePostFlushCbs = deduped;
        if (true) {
            seen = seen || /* @__PURE__ */
            new Map();
        }
        for (postFlushIndex = 0; postFlushIndex < activePostFlushCbs.length; postFlushIndex++) {
            const cb = activePostFlushCbs[postFlushIndex];
            if (checkRecursiveUpdates(seen, cb)) {
                continue;
            }
            if (cb.flags & 4 /* ALLOW_RECURSE */
            ) {
                cb.flags &= ~1 /* QUEUED */
                ;
            }
            if (!(cb.flags & 8 /* DISPOSED */
            )) {
                try {
                    cb();
                } finally {
                    cb.flags &= ~1 /* QUEUED */
                    ;
                }
            }
        }
        activePostFlushCbs = null;
        postFlushIndex = 0;
    }
}
var isFlushing = false;
function flushOnAppMount() {
    if (!isFlushing) {
        isFlushing = true;
        flushPreFlushCbs();
        flushPostFlushCbs();
        isFlushing = false;
    }
}
var getId = (job) => job.id == null ? job.flags & 2 /* PRE */
? -1 : Infinity : job.id;
function flushJobs(seen) {
    if (true) {
        seen = seen || /* @__PURE__ */
        new Map();
    }
    const check = true ? (job) => checkRecursiveUpdates(seen, job) : NOOP2;
    try {
        for (flushIndex = 0; flushIndex < queue.length; flushIndex++) {
            const job = queue[flushIndex];
            if (job && !(job.flags & 8 /* DISPOSED */
            )) {
                if (check(job)) {
                    continue;
                }
                if (job.flags & 4 /* ALLOW_RECURSE */
                ) {
                    job.flags &= ~1 /* QUEUED */
                    ;
                }
                callWithErrorHandling(job, job.i, job.i ? 15 /* COMPONENT_UPDATE */
                : 14 /* SCHEDULER */
                );
                if (!(job.flags & 4 /* ALLOW_RECURSE */
                )) {
                    job.flags &= ~1 /* QUEUED */
                    ;
                }
            }
        }
    } finally {
        for (; flushIndex < queue.length; flushIndex++) {
            const job = queue[flushIndex];
            if (job) {
                job.flags &= ~1 /* QUEUED */
                ;
            }
        }
        flushIndex = -1;
        queue.length = 0;
        flushPostFlushCbs(seen);
        currentFlushPromise = null;
        if (queue.length || pendingPostFlushCbs.length) {
            flushJobs(seen);
        }
    }
}
function checkRecursiveUpdates(seen, fn) {
    const count = seen.get(fn) || 0;
    if (count > RECURSION_LIMIT) {
        const instance = fn.i;
        const componentName = instance && getComponentName(instance.type);
        handleError(`Maximum recursive updates exceeded${componentName ? ` in component <${componentName}>` : ``}. This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function.`, null, 10 /* APP_ERROR_HANDLER */
        );
        return true;
    }
    seen.set(fn, count + 1);
    return false;
}

// packages/runtime-core/src/hmr.ts
var isHmrUpdating = false;
var hmrDirtyComponents = /* @__PURE__ */
new Map();
if (true) {
    getGlobalThis().__VUE_HMR_RUNTIME__ = {
        createRecord: tryWrap(createRecord),
        rerender: tryWrap(rerender),
        reload: tryWrap(reload)
    };
}
var map = /* @__PURE__ */
new Map();
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
        instances: /* @__PURE__ */
        new Set()
    });
    return true;
}
function normalizeClassComponent(component) {
    return isClassComponent(component) ? component.__vccOpts : component;
}
function rerender(id, newRender) {
    const record = map.get(id);
    if (!record) {
        return;
    }
    record.initialDef.render = newRender;
    [...record.instances].forEach( (instance) => {
        if (newRender) {
            instance.render = newRender;
            normalizeClassComponent(instance.type).render = newRender;
        }
        isHmrUpdating = true;
        if (instance.vapor) {
            instance.hmrRerender();
        } else {
            const i = instance;
            i.renderCache = [];
            i.update();
        }
        isHmrUpdating = false;
    }
    );
}
function reload(id, newComp) {
    const record = map.get(id);
    if (!record)
        return;
    newComp = normalizeClassComponent(newComp);
    updateComponentDef(record.initialDef, newComp);
    const instances = [...record.instances];
    if (newComp.vapor) {
        for (const instance of instances) {
            instance.hmrReload(newComp);
        }
    } else {
        for (const instance of instances) {
            const oldComp = normalizeClassComponent(instance.type);
            let dirtyInstances = hmrDirtyComponents.get(oldComp);
            if (!dirtyInstances) {
                if (oldComp !== record.initialDef) {
                    updateComponentDef(oldComp, newComp);
                }
                hmrDirtyComponents.set(oldComp, dirtyInstances = /* @__PURE__ */
                new Set());
            }
            dirtyInstances.add(instance);
            instance.appContext.propsCache.delete(instance.type);
            instance.appContext.emitsCache.delete(instance.type);
            instance.appContext.optionsCache.delete(instance.type);
            if (instance.ceReload) {
                dirtyInstances.add(instance);
                instance.ceReload(newComp.styles);
                dirtyInstances.delete(instance);
            } else if (instance.parent) {
                queueJob( () => {
                    isHmrUpdating = true;
                    instance.parent.update();
                    isHmrUpdating = false;
                    dirtyInstances.delete(instance);
                }
                );
            } else if (instance.appContext.reload) {
                instance.appContext.reload();
            } else if (typeof window !== "undefined") {
                window.location.reload();
            } else {
                console.warn("[HMR] Root or manually mounted instance modified. Full reload required.");
            }
            if (instance.root.ce && instance !== instance.root) {
                instance.root.ce._removeChildStyle(oldComp);
            }
        }
    }
    queuePostFlushCb( () => {
        hmrDirtyComponents.clear();
    }
    );
}
function updateComponentDef(oldComp, newComp) {
    extend(oldComp, newComp);
    for (const key in oldComp) {
        if (key !== "__file" && !(key in newComp)) {
            delete oldComp[key];
        }
    }
}
function tryWrap(fn) {
    return (id, arg) => {
        try {
            return fn(id, arg);
        } catch (e) {
            console.error(e);
            console.warn(`[HMR] Something went wrong during Vue component hot-reload. Full reload required.`);
        }
    }
    ;
}

// packages/runtime-core/src/devtools.ts
var devtools;
var buffer = [];
var devtoolsNotInstalled = false;
function emit(event, ...args) {
    if (devtools) {
        devtools.emit(event, ...args);
    } else if (!devtoolsNotInstalled) {
        buffer.push({
            event,
            args
        });
    }
}
var queued = false;
function setDevtoolsHook(hook, target) {
    if (devtoolsNotInstalled || queued) {
        return;
    }
    devtools = hook;
    if (devtools) {
        devtools.enabled = true;
        buffer.forEach( ({event, args}) => devtools.emit(event, ...args));
        buffer = [];
    } else if (// handle late devtools injection - only do this if we are in an actual
    // browser environment to avoid the timer handle stalling test runner exit
    // (#4815)
    typeof window !== "undefined" && // some envs mock window but not fully
    window.HTMLElement && // also exclude jsdom
    // eslint-disable-next-line no-restricted-syntax
    !window.navigator?.userAgent?.includes("jsdom")) {
        queued = true;
        const replay = target.__VUE_DEVTOOLS_HOOK_REPLAY__ = target.__VUE_DEVTOOLS_HOOK_REPLAY__ || [];
        replay.push( (newHook) => {
            setDevtoolsHook(newHook, target);
        }
        );
        setTimeout( () => {
            if (!devtools) {
                target.__VUE_DEVTOOLS_HOOK_REPLAY__ = null;
                devtoolsNotInstalled = true;
                buffer = [];
            }
        }
        , 3e3);
    } else {
        devtoolsNotInstalled = true;
        buffer = [];
    }
}
function devtoolsInitApp(app, version2) {
    emit("app:init"/* APP_INIT */
    , app, version2, {
        Fragment,
        Text,
        Comment: Comment2,
        Static
    });
}
function devtoolsUnmountApp(app) {
    emit("app:unmount"/* APP_UNMOUNT */
    , app);
}
var devtoolsComponentAdded = /* @__PURE__ */
createDevtoolsComponentHook("component:added"/* COMPONENT_ADDED */
);
var devtoolsComponentUpdated = /* @__PURE__ */
createDevtoolsComponentHook("component:updated"/* COMPONENT_UPDATED */
);
var _devtoolsComponentRemoved = /* @__PURE__ */
createDevtoolsComponentHook("component:removed"/* COMPONENT_REMOVED */
);
var devtoolsComponentRemoved = (component) => {
    if (devtools && typeof devtools.cleanupBuffer === "function" && // remove the component if it wasn't buffered
    !devtools.cleanupBuffer(component)) {
        _devtoolsComponentRemoved(component);
    }
}
;
// @__NO_SIDE_EFFECTS__
function createDevtoolsComponentHook(hook) {
    return (component) => {
        emit(hook, component.appContext.app, component.uid, component.parent ? component.parent.uid : void 0, component);
    }
    ;
}
var devtoolsPerfStart = /* @__PURE__ */
createDevtoolsPerformanceHook("perf:start"/* PERFORMANCE_START */
);
var devtoolsPerfEnd = /* @__PURE__ */
createDevtoolsPerformanceHook("perf:end"/* PERFORMANCE_END */
);
function createDevtoolsPerformanceHook(hook) {
    return (component, type, time) => {
        emit(hook, component.appContext.app, component.uid, component, type, time);
    }
    ;
}
function devtoolsComponentEmit(component, event, params) {
    emit("component:emit"/* COMPONENT_EMIT */
    , component.appContext.app, component, event, params);
}

// packages/runtime-core/src/componentRenderContext.ts
var currentRenderingInstance = null;
var currentScopeId = null;
function setCurrentRenderingInstance(instance) {
    const prev = currentRenderingInstance;
    currentRenderingInstance = instance;
    currentScopeId = instance && instance.type.__scopeId || null;
    if (false) {
        currentScopeId = instance && instance.type._scopeId || null;
    }
    return prev;
}
function pushScopeId(id) {
    currentScopeId = id;
}
function popScopeId() {
    currentScopeId = null;
}
var withScopeId = (_id) => withCtx;
function withCtx(fn, ctx=currentRenderingInstance, isNonScopedSlot) {
    if (!ctx)
        return fn;
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
        if (true) {
            devtoolsComponentUpdated(ctx);
        }
        return res;
    }
    ;
    renderFnWithContext._n = true;
    renderFnWithContext._c = true;
    renderFnWithContext._d = true;
    if (false) {
        renderFnWithContext._ns = true;
    }
    return renderFnWithContext;
}

// packages/runtime-core/src/directives.ts
function validateDirectiveName(name) {
    if (isBuiltInDirective(name)) {
        warn2("Do not use built-in directive ids as custom directive id: " + name);
    }
}
function withDirectives(vnode, directives) {
    if (currentRenderingInstance === null) {
        warn2(`withDirectives can only be used inside render functions.`);
        return vnode;
    }
    const instance = getComponentPublicInstance(currentRenderingInstance);
    const bindings = vnode.dirs || (vnode.dirs = []);
    for (let i = 0; i < directives.length; i++) {
        let[dir,value,arg,modifiers=EMPTY_OBJ] = directives[i];
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
        if (false) {
            hook = mapCompatDirectiveHook(name, binding.dir, instance);
        }
        if (hook) {
            pauseTracking();
            callWithAsyncErrorHandling(hook, instance, 8 /* DIRECTIVE_HOOK */
            , [vnode.el, binding, vnode, prevVNode]);
            resetTracking();
        }
    }
}

// packages/runtime-core/src/components/Teleport.ts
var TeleportEndKey = Symbol("_vte");
var isTeleport = (type) => type.__isTeleport;
var isTeleportDisabled = (props) => props && (props.disabled || props.disabled === "");
var isTeleportDeferred = (props) => props && (props.defer || props.defer === "");
var isTargetSVG = (target) => typeof SVGElement !== "undefined" && target instanceof SVGElement;
var isTargetMathML = (target) => typeof MathMLElement === "function" && target instanceof MathMLElement;
var resolveTarget = (props, select) => {
    const targetSelector = props && props.to;
    if (isString(targetSelector)) {
        if (!select) {
            warn2(`Current renderer does not support string target for Teleports. (missing querySelector renderer option)`);
            return null;
        } else {
            const target = select(targetSelector);
            if (!target && !isTeleportDisabled(props)) {
                warn2(`Failed to locate Teleport target with selector "${targetSelector}". Note the target element must exist before the component is mounted - i.e. the target cannot be rendered by the component itself, and ideally should be outside of the entire Vue component tree.`);
            }
            return target;
        }
    } else {
        if (!targetSelector && !isTeleportDisabled(props)) {
            warn2(`Invalid Teleport target: ${targetSelector}`);
        }
        return targetSelector;
    }
}
;
var TeleportImpl = {
    name: "Teleport",
    __isTeleport: true,
    process(n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized, internals) {
        const {mc: mountChildren, pc: patchChildren, pbc: patchBlockChildren, o: {insert: insert2, querySelector, createText, createComment: createComment2}} = internals;
        const disabled = isTeleportDisabled(n2.props);
        let {shapeFlag, children: children2, dynamicChildren} = n2;
        if (isHmrUpdating) {
            optimized = false;
            dynamicChildren = null;
        }
        if (n1 == null) {
            const placeholder = n2.el = true ? createComment2("teleport start") : createText("");
            const mainAnchor = n2.anchor = true ? createComment2("teleport end") : createText("");
            insert2(placeholder, container, anchor);
            insert2(mainAnchor, container, anchor);
            const mount = (container2, anchor2) => {
                if (shapeFlag & 16 /* ARRAY_CHILDREN */
                ) {
                    if (parentComponent && parentComponent.isCE) {
                        parentComponent.ce._teleportTarget = container2;
                    }
                    mountChildren(children2, container2, anchor2, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
                }
            }
            ;
            const mountToTarget = () => {
                const target = n2.target = resolveTarget(n2.props, querySelector);
                const targetAnchor = prepareAnchor(target, n2, createText, insert2);
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
                } else if (!disabled) {
                    warn2("Invalid Teleport target on mount:", target, `(${typeof target})`);
                }
            }
            ;
            if (disabled) {
                mount(container, mainAnchor);
                updateCssVars(n2, true);
            }
            if (isTeleportDeferred(n2.props)) {
                queuePostRenderEffect( () => {
                    mountToTarget();
                    n2.el.__isMounted = true;
                }
                , parentSuspense);
            } else {
                mountToTarget();
            }
        } else {
            if (isTeleportDeferred(n2.props) && !n1.el.__isMounted) {
                queuePostRenderEffect( () => {
                    TeleportImpl.process(n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized, internals);
                    delete n1.el.__isMounted;
                }
                , parentSuspense);
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
                patchBlockChildren(n1.dynamicChildren, dynamicChildren, currentContainer, parentComponent, parentSuspense, namespace, slotScopeIds);
                traverseStaticChildren(n1, n2, true);
            } else if (!optimized) {
                patchChildren(n1, n2, currentContainer, currentAnchor, parentComponent, parentSuspense, namespace, slotScopeIds, false);
            }
            if (disabled) {
                if (!wasDisabled) {
                    moveTeleport(n2, container, mainAnchor, internals, 1 /* TOGGLE */
                    );
                } else {
                    if (n2.props && n1.props && n2.props.to !== n1.props.to) {
                        n2.props.to = n1.props.to;
                    }
                }
            } else {
                if ((n2.props && n2.props.to) !== (n1.props && n1.props.to)) {
                    const nextTarget = n2.target = resolveTarget(n2.props, querySelector);
                    if (nextTarget) {
                        moveTeleport(n2, nextTarget, null, internals, 0 /* TARGET_CHANGE */
                        );
                    } else if (true) {
                        warn2("Invalid Teleport target on update:", target, `(${typeof target})`);
                    }
                } else if (wasDisabled) {
                    moveTeleport(n2, target, targetAnchor, internals, 1 /* TOGGLE */
                    );
                }
            }
            updateCssVars(n2, disabled);
        }
    },
    remove(vnode, parentComponent, parentSuspense, {um: unmount, o: {remove: hostRemove}}, doRemove) {
        const {shapeFlag, children: children2, anchor, targetStart, targetAnchor, target, props} = vnode;
        if (target) {
            hostRemove(targetStart);
            hostRemove(targetAnchor);
        }
        doRemove && hostRemove(anchor);
        if (shapeFlag & 16 /* ARRAY_CHILDREN */
        ) {
            const shouldRemove = doRemove || !isTeleportDisabled(props);
            for (let i = 0; i < children2.length; i++) {
                const child = children2[i];
                unmount(child, parentComponent, parentSuspense, shouldRemove, !!child.dynamicChildren);
            }
        }
    },
    move: moveTeleport,
    hydrate: hydrateTeleport
};
function moveTeleport(vnode, container, parentAnchor, {o: {insert: insert2}, m: move}, moveType=2 /* REORDER */
) {
    if (moveType === 0 /* TARGET_CHANGE */
    ) {
        insert2(vnode.targetAnchor, container, parentAnchor);
    }
    const {el, anchor, shapeFlag, children: children2, props} = vnode;
    const isReorder = moveType === 2 /* REORDER */
    ;
    if (isReorder) {
        insert2(el, container, parentAnchor);
    }
    if (!isReorder || isTeleportDisabled(props)) {
        if (shapeFlag & 16 /* ARRAY_CHILDREN */
        ) {
            for (let i = 0; i < children2.length; i++) {
                move(children2[i], container, parentAnchor, 2 /* REORDER */
                );
            }
        }
    }
    if (isReorder) {
        insert2(anchor, container, parentAnchor);
    }
}
function hydrateTeleport(node, vnode, parentComponent, parentSuspense, slotScopeIds, optimized, {o: {nextSibling, parentNode, querySelector, insert: insert2, createText}}, hydrateChildren) {
    const target = vnode.target = resolveTarget(vnode.props, querySelector);
    if (target) {
        const disabled = isTeleportDisabled(vnode.props);
        const targetNode = target._lpa || target.firstChild;
        if (vnode.shapeFlag & 16 /* ARRAY_CHILDREN */
        ) {
            if (disabled) {
                vnode.anchor = hydrateChildren(nextSibling(node), vnode, parentNode(node), parentComponent, parentSuspense, slotScopeIds, optimized);
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
                    prepareAnchor(target, vnode, createText, insert2);
                }
                hydrateChildren(targetNode && nextSibling(targetNode), vnode, target, parentComponent, parentSuspense, slotScopeIds, optimized);
            }
        }
        updateCssVars(vnode, disabled);
    }
    return vnode.anchor && nextSibling(vnode.anchor);
}
var Teleport = TeleportImpl;
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
            if (node.nodeType === 1)
                node.setAttribute("data-v-owner", ctx.uid);
            node = node.nextSibling;
        }
        ctx.ut();
    }
}
function prepareAnchor(target, vnode, createText, insert2) {
    const targetStart = vnode.targetStart = createText("");
    const targetAnchor = vnode.targetAnchor = createText("");
    targetStart[TeleportEndKey] = targetAnchor;
    if (target) {
        insert2(targetStart, target);
        insert2(targetAnchor, target);
    }
    return targetAnchor;
}

// packages/runtime-core/src/components/BaseTransition.ts
var leaveCbKey = Symbol("_leaveCb");
var enterCbKey = Symbol("_enterCb");
function useTransitionState() {
    const state = {
        isMounted: false,
        isLeaving: false,
        isUnmounting: false,
        leavingVNodes: /* @__PURE__ */
        new Map()
    };
    onMounted( () => {
        state.isMounted = true;
    }
    );
    onBeforeUnmount( () => {
        state.isUnmounting = true;
    }
    );
    return state;
}
var TransitionHookValidator = [Function, Array];
var BaseTransitionPropsValidators = {
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
var recursiveGetSubtree = (instance) => {
    const subTree = instance.subTree;
    return subTree.component ? recursiveGetSubtree(subTree.component) : subTree;
}
;
var BaseTransitionImpl = {
    name: `BaseTransition`,
    props: BaseTransitionPropsValidators,
    setup(props, {slots}) {
        const instance = getCurrentInstance();
        const state = useTransitionState();
        return () => {
            const children2 = slots.default && getTransitionRawChildren(slots.default(), true);
            if (!children2 || !children2.length) {
                return;
            }
            const child = findNonCommentChild(children2);
            const rawProps = toRaw(props);
            const {mode} = rawProps;
            if (mode && mode !== "in-out" && mode !== "out-in" && mode !== "default") {
                warn2(`invalid <transition> mode: ${mode}`);
            }
            if (state.isLeaving) {
                return emptyPlaceholder(child);
            }
            const innerChild = getInnerChild(child);
            if (!innerChild) {
                return emptyPlaceholder(child);
            }
            let enterHooks = resolveTransitionHooks(innerChild, rawProps, state, instance, // #11061, ensure enterHooks is fresh after clone
            (hooks) => enterHooks = hooks);
            if (innerChild.type !== Comment2) {
                setTransitionHooks(innerChild, enterHooks);
            }
            let oldInnerChild = instance.subTree && getInnerChild(instance.subTree);
            if (oldInnerChild && oldInnerChild.type !== Comment2 && !isSameVNodeType(innerChild, oldInnerChild) && recursiveGetSubtree(instance).type !== Comment2) {
                let leavingHooks = resolveTransitionHooks(oldInnerChild, rawProps, state, instance);
                setTransitionHooks(oldInnerChild, leavingHooks);
                if (mode === "out-in" && innerChild.type !== Comment2) {
                    state.isLeaving = true;
                    leavingHooks.afterLeave = () => {
                        state.isLeaving = false;
                        if (!(instance.job.flags & 8 /* DISPOSED */
                        )) {
                            instance.update();
                        }
                        delete leavingHooks.afterLeave;
                        oldInnerChild = void 0;
                    }
                    ;
                    return emptyPlaceholder(child);
                } else if (mode === "in-out" && innerChild.type !== Comment2) {
                    leavingHooks.delayLeave = (el, earlyRemove, delayedLeave) => {
                        const leavingVNodesCache = getLeavingNodesForType(state, oldInnerChild);
                        leavingVNodesCache[String(oldInnerChild.key)] = oldInnerChild;
                        el[leaveCbKey] = () => {
                            earlyRemove();
                            el[leaveCbKey] = void 0;
                            delete enterHooks.delayedLeave;
                            oldInnerChild = void 0;
                        }
                        ;
                        enterHooks.delayedLeave = () => {
                            delayedLeave();
                            delete enterHooks.delayedLeave;
                            oldInnerChild = void 0;
                        }
                        ;
                    }
                    ;
                } else {
                    oldInnerChild = void 0;
                }
            } else if (oldInnerChild) {
                oldInnerChild = void 0;
            }
            return child;
        }
        ;
    }
};
if (false) {
    BaseTransitionImpl.__isBuiltIn = true;
}
function findNonCommentChild(children2) {
    let child = children2[0];
    if (children2.length > 1) {
        let hasFound = false;
        for (const c of children2) {
            if (c.type !== Comment2) {
                if (hasFound) {
                    warn2("<transition> can only be used on a single element or component. Use <transition-group> for lists.");
                    break;
                }
                child = c;
                hasFound = true;
                if (false)
                    break;
            }
        }
    }
    return child;
}
var BaseTransition = BaseTransitionImpl;
function getLeavingNodesForType(state, vnode) {
    const {leavingVNodes} = state;
    let leavingVNodesCache = leavingVNodes.get(vnode.type);
    if (!leavingVNodesCache) {
        leavingVNodesCache = /* @__PURE__ */
        Object.create(null);
        leavingVNodes.set(vnode.type, leavingVNodesCache);
    }
    return leavingVNodesCache;
}
function resolveTransitionHooks(vnode, props, state, instance, postClone) {
    const {appear, mode, persisted=false, onBeforeEnter, onEnter, onAfterEnter, onEnterCancelled, onBeforeLeave, onLeave, onAfterLeave, onLeaveCancelled, onBeforeAppear, onAppear, onAfterAppear, onAppearCancelled} = props;
    const key = String(vnode.key);
    const leavingVNodesCache = getLeavingNodesForType(state, vnode);
    const callHook3 = (hook, args) => {
        hook && callWithAsyncErrorHandling(hook, instance, 9 /* TRANSITION_HOOK */
        , args);
    }
    ;
    const callAsyncHook = (hook, args) => {
        const done = args[1];
        callHook3(hook, args);
        if (isArray(hook)) {
            if (hook.every( (hook2) => hook2.length <= 1))
                done();
        } else if (hook.length <= 1) {
            done();
        }
    }
    ;
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
                el[leaveCbKey](true /* cancelled */
                );
            }
            const leavingVNode = leavingVNodesCache[key];
            if (leavingVNode && isSameVNodeType(vnode, leavingVNode) && leavingVNode.el[leaveCbKey]) {
                ;leavingVNode.el[leaveCbKey]();
            }
            callHook3(hook, [el]);
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
            const done = el[enterCbKey] = (cancelled) => {
                if (called)
                    return;
                called = true;
                if (cancelled) {
                    callHook3(cancelHook, [el]);
                } else {
                    callHook3(afterHook, [el]);
                }
                if (hooks.delayedLeave) {
                    hooks.delayedLeave();
                }
                el[enterCbKey] = void 0;
            }
            ;
            if (hook) {
                callAsyncHook(hook, [el, done]);
            } else {
                done();
            }
        },
        leave(el, remove3) {
            const key2 = String(vnode.key);
            if (el[enterCbKey]) {
                el[enterCbKey](true /* cancelled */
                );
            }
            if (state.isUnmounting) {
                return remove3();
            }
            callHook3(onBeforeLeave, [el]);
            let called = false;
            const done = el[leaveCbKey] = (cancelled) => {
                if (called)
                    return;
                called = true;
                remove3();
                if (cancelled) {
                    callHook3(onLeaveCancelled, [el]);
                } else {
                    callHook3(onAfterLeave, [el]);
                }
                el[leaveCbKey] = void 0;
                if (leavingVNodesCache[key2] === vnode) {
                    delete leavingVNodesCache[key2];
                }
            }
            ;
            leavingVNodesCache[key2] = vnode;
            if (onLeave) {
                callAsyncHook(onLeave, [el, done]);
            } else {
                done();
            }
        },
        clone(vnode2) {
            const hooks2 = resolveTransitionHooks(vnode2, props, state, instance, postClone);
            if (postClone)
                postClone(hooks2);
            return hooks2;
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
function getInnerChild(vnode) {
    if (!isKeepAlive(vnode)) {
        if (isTeleport(vnode.type) && vnode.children) {
            return findNonCommentChild(vnode.children);
        }
        return vnode;
    }
    if (vnode.component) {
        return vnode.component.subTree;
    }
    const {shapeFlag, children: children2} = vnode;
    if (children2) {
        if (shapeFlag & 16 /* ARRAY_CHILDREN */
        ) {
            return children2[0];
        }
        if (shapeFlag & 32 /* SLOTS_CHILDREN */
        && isFunction(children2.default)) {
            return children2.default();
        }
    }
}
function setTransitionHooks(vnode, hooks) {
    if (vnode.shapeFlag & 6 /* COMPONENT */
    && vnode.component) {
        vnode.transition = hooks;
        setTransitionHooks(vnode.component.subTree, hooks);
    } else if (vnode.shapeFlag & 128 /* SUSPENSE */
    ) {
        vnode.ssContent.transition = hooks.clone(vnode.ssContent);
        vnode.ssFallback.transition = hooks.clone(vnode.ssFallback);
    } else {
        vnode.transition = hooks;
    }
}
function getTransitionRawChildren(children2, keepComment=false, parentKey) {
    let ret = [];
    let keyedFragmentCount = 0;
    for (let i = 0; i < children2.length; i++) {
        let child = children2[i];
        const key = parentKey == null ? child.key : String(parentKey) + String(child.key != null ? child.key : i);
        if (child.type === Fragment) {
            if (child.patchFlag & 128 /* KEYED_FRAGMENT */
            )
                keyedFragmentCount++;
            ret = ret.concat(getTransitionRawChildren(child.children, keepComment, key));
        } else if (keepComment || child.type !== Comment2) {
            ret.push(key != null ? cloneVNode(child, {
                key
            }) : child);
        }
    }
    if (keyedFragmentCount > 1) {
        for (let i = 0; i < ret.length; i++) {
            ret[i].patchFlag = -2 /* BAIL */
            ;
        }
    }
    return ret;
}

// packages/runtime-core/src/apiDefineComponent.ts
// @__NO_SIDE_EFFECTS__
function defineComponent(options, extraOptions) {
    return isFunction(options) ? (// #8236: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    /* @__PURE__ */
    ( () => extend({
        name: options.name
    }, extraOptions, {
        setup: options
    }))()) : options;
}

// packages/runtime-core/src/helpers/useId.ts
function useId() {
    const i = getCurrentGenericInstance();
    if (i) {
        return (i.appContext.config.idPrefix || "v") + "-" + i.ids[0] + i.ids[1]++;
    } else if (true) {
        warn2(`useId() is called when there is no active component instance to be associated with.`);
    }
    return "";
}
function markAsyncBoundary(instance) {
    instance.ids = [instance.ids[0] + instance.ids[2]++ + "-", 0, 0];
}

// packages/runtime-core/src/helpers/useTemplateRef.ts
var knownTemplateRefs = /* @__PURE__ */
new WeakSet();
function useTemplateRef(key) {
    const i = getCurrentGenericInstance();
    const r = shallowRef(null);
    if (i) {
        const refs = i.refs === EMPTY_OBJ ? i.refs = {} : i.refs;
        let desc;
        if ((desc = Object.getOwnPropertyDescriptor(refs, key)) && !desc.configurable) {
            warn2(`useTemplateRef('${key}') already exists.`);
        } else {
            Object.defineProperty(refs, key, {
                enumerable: true,
                get: () => r.value,
                set: (val) => r.value = val
            });
        }
    } else if (true) {
        warn2(`useTemplateRef() is called when there is no active component instance to be associated with.`);
    }
    const ret = true ? readonly(r) : r;
    if (true) {
        knownTemplateRefs.add(ret);
    }
    return ret;
}

// packages/runtime-core/src/rendererTemplateRef.ts
function setRef(rawRef, oldRawRef, parentSuspense, vnode, isUnmount=false) {
    if (isArray(rawRef)) {
        rawRef.forEach( (r, i) => setRef(r, oldRawRef && (isArray(oldRawRef) ? oldRawRef[i] : oldRawRef), parentSuspense, vnode, isUnmount));
        return;
    }
    if (isAsyncWrapper(vnode) && !isUnmount) {
        if (vnode.shapeFlag & 512 /* COMPONENT_KEPT_ALIVE */
        && vnode.type.__asyncResolved && vnode.component.subTree.component) {
            setRef(rawRef, oldRawRef, parentSuspense, vnode.component.subTree);
        }
        return;
    }
    const refValue = vnode.shapeFlag & 4 /* STATEFUL_COMPONENT */
    ? getComponentPublicInstance(vnode.component) : vnode.el;
    const value = isUnmount ? null : refValue;
    const {i: owner, r: ref2} = rawRef;
    if (!owner) {
        warn2(`Missing ref owner context. ref cannot be used on hoisted vnodes. A vnode with ref must be created inside the render function.`);
        return;
    }
    const oldRef = oldRawRef && oldRawRef.r;
    const refs = owner.refs === EMPTY_OBJ ? owner.refs = {} : owner.refs;
    const setupState = owner.setupState;
    const rawSetupState = toRaw(setupState);
    const canSetSetupRef = setupState === EMPTY_OBJ ? () => false : (key) => {
        if (true) {
            if (hasOwn(rawSetupState, key) && !isRef(rawSetupState[key])) {
                warn2(`Template ref "${key}" used on a non-ref value. It will not work in the production build.`);
            }
            if (knownTemplateRefs.has(rawSetupState[key])) {
                return false;
            }
        }
        return hasOwn(rawSetupState, key);
    }
    ;
    if (oldRef != null && oldRef !== ref2) {
        if (isString(oldRef)) {
            refs[oldRef] = null;
            if (canSetSetupRef(oldRef)) {
                setupState[oldRef] = null;
            }
        } else if (isRef(oldRef)) {
            oldRef.value = null;
        }
    }
    if (isFunction(ref2)) {
        callWithErrorHandling(ref2, owner, 12 /* FUNCTION_REF */
        , [value, refs]);
    } else {
        const _isString = isString(ref2);
        const _isRef = isRef(ref2);
        if (_isString || _isRef) {
            const doSet = () => {
                if (rawRef.f) {
                    const existing = _isString ? canSetSetupRef(ref2) ? setupState[ref2] : refs[ref2] : ref2.value;
                    if (isUnmount) {
                        isArray(existing) && remove(existing, refValue);
                    } else {
                        if (!isArray(existing)) {
                            if (_isString) {
                                refs[ref2] = [refValue];
                                if (canSetSetupRef(ref2)) {
                                    setupState[ref2] = refs[ref2];
                                }
                            } else {
                                ref2.value = [refValue];
                                if (rawRef.k)
                                    refs[rawRef.k] = ref2.value;
                            }
                        } else if (!existing.includes(refValue)) {
                            existing.push(refValue);
                        }
                    }
                } else if (_isString) {
                    refs[ref2] = value;
                    if (canSetSetupRef(ref2)) {
                        setupState[ref2] = value;
                    }
                } else if (_isRef) {
                    ref2.value = value;
                    if (rawRef.k)
                        refs[rawRef.k] = value;
                } else if (true) {
                    warn2("Invalid template ref type:", ref2, `(${typeof ref2})`);
                }
            }
            ;
            if (value) {
                ;doSet.id = -1;
                queuePostRenderEffect(doSet, parentSuspense);
            } else {
                doSet();
            }
        } else if (true) {
            warn2("Invalid template ref type:", ref2, `(${typeof ref2})`);
        }
    }
}

// packages/runtime-core/src/hydration.ts
var hasLoggedMismatchError = false;
var logMismatchError = () => {
    if (hasLoggedMismatchError) {
        return;
    }
    console.error("Hydration completed but contains mismatches.");
    hasLoggedMismatchError = true;
}
;
var isSVGContainer = (container) => container.namespaceURI.includes("svg") && container.tagName !== "foreignObject";
var isMathMLContainer = (container) => container.namespaceURI.includes("MathML");
var getContainerType = (container) => {
    if (container.nodeType !== 1 /* ELEMENT */
    )
        return void 0;
    if (isSVGContainer(container))
        return "svg";
    if (isMathMLContainer(container))
        return "mathml";
    return void 0;
}
;
var isComment = (node) => node.nodeType === 8 /* COMMENT */
;
function createHydrationFunctions(rendererInternals) {
    const {mt: mountComponent2, p: patch, o: {patchProp: patchProp2, createText, nextSibling, parentNode, remove: remove3, insert: insert2, createComment: createComment2}} = rendererInternals;
    const hydrate2 = (vnode, container) => {
        if (!container.hasChildNodes()) {
            ;warn2(`Attempting to hydrate existing markup but container is empty. Performing full mount instead.`);
            patch(null, vnode, container);
            flushPostFlushCbs();
            container._vnode = vnode;
            return;
        }
        hydrateNode(container.firstChild, vnode, null, null, null);
        flushPostFlushCbs();
        container._vnode = vnode;
    }
    ;
    const hydrateNode = (node, vnode, parentComponent, parentSuspense, slotScopeIds, optimized=false) => {
        optimized = optimized || !!vnode.dynamicChildren;
        const isFragmentStart = isComment(node) && node.data === "[";
        const onMismatch = () => handleMismatch(node, vnode, parentComponent, parentSuspense, slotScopeIds, isFragmentStart);
        const {type, ref: ref2, shapeFlag, patchFlag} = vnode;
        let domType = node.nodeType;
        vnode.el = node;
        if (true) {
            def(node, "__vnode", vnode, true);
            def(node, "__vueParentComponent", parentComponent, true);
        }
        if (patchFlag === -2 /* BAIL */
        ) {
            optimized = false;
            vnode.dynamicChildren = null;
        }
        let nextNode = null;
        switch (type) {
        case Text:
            if (domType !== 3 /* TEXT */
            ) {
                if (vnode.children === "") {
                    insert2(vnode.el = createText(""), parentNode(node), node);
                    nextNode = node;
                } else {
                    nextNode = onMismatch();
                }
            } else {
                if (node.data !== vnode.children) {
                    ;warn2(`Hydration text mismatch in`, node.parentNode, `
  - rendered on server: ${JSON.stringify(node.data)}
  - expected on client: ${JSON.stringify(vnode.children)}`);
                    logMismatchError();
                    node.data = vnode.children;
                }
                nextNode = nextSibling(node);
            }
            break;
        case Comment2:
            if (isTemplateNode(node)) {
                nextNode = nextSibling(node);
                replaceNode(vnode.el = node.content.firstChild, node, parentComponent);
            } else if (domType !== 8 /* COMMENT */
            || isFragmentStart) {
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
            if (domType === 1 /* ELEMENT */
            || domType === 3 /* TEXT */
            ) {
                nextNode = node;
                const needToAdoptContent = !vnode.children.length;
                for (let i = 0; i < vnode.staticCount; i++) {
                    if (needToAdoptContent)
                        vnode.children += nextNode.nodeType === 1 /* ELEMENT */
                        ? nextNode.outerHTML : nextNode.data;
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
                nextNode = hydrateFragment(node, vnode, parentComponent, parentSuspense, slotScopeIds, optimized);
            }
            break;
        default:
            if (shapeFlag & 1 /* ELEMENT */
            ) {
                if ((domType !== 1 /* ELEMENT */
                || vnode.type.toLowerCase() !== node.tagName.toLowerCase()) && !isTemplateNode(node)) {
                    nextNode = onMismatch();
                } else {
                    nextNode = hydrateElement(node, vnode, parentComponent, parentSuspense, slotScopeIds, optimized);
                }
            } else if (shapeFlag & 6 /* COMPONENT */
            ) {
                vnode.slotScopeIds = slotScopeIds;
                const container = parentNode(node);
                if (isFragmentStart) {
                    nextNode = locateClosingAnchor(node);
                } else if (isComment(node) && node.data === "teleport start") {
                    nextNode = locateClosingAnchor(node, node.data, "teleport end");
                } else {
                    nextNode = nextSibling(node);
                }
                mountComponent2(vnode, container, null, parentComponent, parentSuspense, getContainerType(container), optimized);
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
            } else if (shapeFlag & 64 /* TELEPORT */
            ) {
                if (domType !== 8 /* COMMENT */
                ) {
                    nextNode = onMismatch();
                } else {
                    nextNode = vnode.type.hydrate(node, vnode, parentComponent, parentSuspense, slotScopeIds, optimized, rendererInternals, hydrateChildren);
                }
            } else if (shapeFlag & 128 /* SUSPENSE */
            ) {
                nextNode = vnode.type.hydrate(node, vnode, parentComponent, parentSuspense, getContainerType(parentNode(node)), slotScopeIds, optimized, rendererInternals, hydrateNode);
            } else if (true) {
                warn2("Invalid HostVNode type:", type, `(${typeof type})`);
            }
        }
        if (ref2 != null) {
            setRef(ref2, null, parentSuspense, vnode);
        }
        return nextNode;
    }
    ;
    const hydrateElement = (el, vnode, parentComponent, parentSuspense, slotScopeIds, optimized) => {
        optimized = optimized || !!vnode.dynamicChildren;
        const {type, props, patchFlag, shapeFlag, dirs, transition} = vnode;
        const forcePatch = type === "input" || type === "option";
        if (true) {
            if (dirs) {
                invokeDirectiveHook(vnode, null, parentComponent, "created");
            }
            let needCallTransitionHooks = false;
            if (isTemplateNode(el)) {
                needCallTransitionHooks = needTransition(null, // no need check parentSuspense in hydration
                transition) && parentComponent && parentComponent.vnode.props && parentComponent.vnode.props.appear;
                const content = el.content.firstChild;
                if (needCallTransitionHooks) {
                    transition.beforeEnter(content);
                }
                replaceNode(content, el, parentComponent);
                vnode.el = el = content;
            }
            if (shapeFlag & 16 /* ARRAY_CHILDREN */
            && // skip if element has innerHTML / textContent
            !(props && (props.innerHTML || props.textContent))) {
                let next2 = hydrateChildren(el.firstChild, vnode, el, parentComponent, parentSuspense, slotScopeIds, optimized);
                let hasWarned2 = false;
                while (next2) {
                    if (!isMismatchAllowed(el, 1 /* CHILDREN */
                    )) {
                        if (!hasWarned2) {
                            warn2(`Hydration children mismatch on`, el, `
Server rendered element contains more child nodes than client vdom.`);
                            hasWarned2 = true;
                        }
                        logMismatchError();
                    }
                    const cur = next2;
                    next2 = next2.nextSibling;
                    remove3(cur);
                }
            } else if (shapeFlag & 8 /* TEXT_CHILDREN */
            ) {
                let clientText = vnode.children;
                if (clientText[0] === "\n" && (el.tagName === "PRE" || el.tagName === "TEXTAREA")) {
                    clientText = clientText.slice(1);
                }
                if (el.textContent !== clientText) {
                    if (!isMismatchAllowed(el, 0 /* TEXT */
                    )) {
                        ;warn2(`Hydration text content mismatch on`, el, `
  - rendered on server: ${el.textContent}
  - expected on client: ${vnode.children}`);
                        logMismatchError();
                    }
                    el.textContent = vnode.children;
                }
            }
            if (props) {
                if (true) {
                    const isCustomElement = el.tagName.includes("-");
                    for (const key in props) {
                        if (// #11189 skip if this node has directives that have created hooks
                        // as it could have mutated the DOM in any possible way
                        !(dirs && dirs.some( (d) => d.dir.created)) && propHasMismatch(el, key, props[key], vnode, parentComponent)) {
                            logMismatchError();
                        }
                        if (forcePatch && (key.endsWith("value") || key === "indeterminate") || isOn(key) && !isReservedProp(key) || // force hydrate v-bind with .prop modifiers
                        key[0] === "." || isCustomElement) {
                            patchProp2(el, key, null, props[key], void 0, parentComponent);
                        }
                    }
                } else if (props.onClick) {
                    patchProp2(el, "onClick", null, props.onClick, void 0, parentComponent);
                } else if (patchFlag & 4 /* STYLE */
                && isReactive(props.style)) {
                    for (const key in props.style)
                        props.style[key];
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
                queueEffectWithSuspense( () => {
                    vnodeHooks && invokeVNodeHook(vnodeHooks, parentComponent, vnode);
                    needCallTransitionHooks && transition.enter(el);
                    dirs && invokeDirectiveHook(vnode, null, parentComponent, "mounted");
                }
                , parentSuspense);
            }
        }
        return el.nextSibling;
    }
    ;
    const hydrateChildren = (node, parentVNode, container, parentComponent, parentSuspense, slotScopeIds, optimized) => {
        optimized = optimized || !!parentVNode.dynamicChildren;
        const children2 = parentVNode.children;
        const l = children2.length;
        let hasWarned2 = false;
        for (let i = 0; i < l; i++) {
            const vnode = optimized ? children2[i] : children2[i] = normalizeVNode(children2[i]);
            const isText = vnode.type === Text;
            if (node) {
                if (isText && !optimized) {
                    if (i + 1 < l && normalizeVNode(children2[i + 1]).type === Text) {
                        insert2(createText(node.data.slice(vnode.children.length)), container, nextSibling(node));
                        node.data = vnode.children;
                    }
                }
                node = hydrateNode(node, vnode, parentComponent, parentSuspense, slotScopeIds, optimized);
            } else if (isText && !vnode.children) {
                insert2(vnode.el = createText(""), container);
            } else {
                if (!isMismatchAllowed(container, 1 /* CHILDREN */
                )) {
                    if (!hasWarned2) {
                        warn2(`Hydration children mismatch on`, container, `
Server rendered element contains fewer child nodes than client vdom.`);
                        hasWarned2 = true;
                    }
                    logMismatchError();
                }
                patch(null, vnode, container, null, parentComponent, parentSuspense, getContainerType(container), slotScopeIds);
            }
        }
        return node;
    }
    ;
    const hydrateFragment = (node, vnode, parentComponent, parentSuspense, slotScopeIds, optimized) => {
        const {slotScopeIds: fragmentSlotScopeIds} = vnode;
        if (fragmentSlotScopeIds) {
            slotScopeIds = slotScopeIds ? slotScopeIds.concat(fragmentSlotScopeIds) : fragmentSlotScopeIds;
        }
        const container = parentNode(node);
        const next2 = hydrateChildren(nextSibling(node), vnode, container, parentComponent, parentSuspense, slotScopeIds, optimized);
        if (next2 && isComment(next2) && next2.data === "]") {
            return nextSibling(vnode.anchor = next2);
        } else {
            logMismatchError();
            insert2(vnode.anchor = createComment2(`]`), container, next2);
            return next2;
        }
    }
    ;
    const handleMismatch = (node, vnode, parentComponent, parentSuspense, slotScopeIds, isFragment2) => {
        if (!isMismatchAllowed(node.parentElement, 1 /* CHILDREN */
        )) {
            ;warn2(`Hydration node mismatch:
- rendered on server:`, node, node.nodeType === 3/* TEXT */
            ? `(text)` : isComment(node) && node.data === "[" ? `(start of fragment)` : ``, `
- expected on client:`, vnode.type);
            logMismatchError();
        }
        vnode.el = null;
        if (isFragment2) {
            const end = locateClosingAnchor(node);
            while (true) {
                const next3 = nextSibling(node);
                if (next3 && next3 !== end) {
                    remove3(next3);
                } else {
                    break;
                }
            }
        }
        const next2 = nextSibling(node);
        const container = parentNode(node);
        remove3(node);
        patch(null, vnode, container, next2, parentComponent, parentSuspense, getContainerType(container), slotScopeIds);
        if (parentComponent) {
            parentComponent.vnode.el = vnode.el;
            updateHOCHostEl(parentComponent, vnode.el);
        }
        return next2;
    }
    ;
    const locateClosingAnchor = (node, open="[", close="]") => {
        let match = 0;
        while (node) {
            node = nextSibling(node);
            if (node && isComment(node)) {
                if (node.data === open)
                    match++;
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
    }
    ;
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
    }
    ;
    const isTemplateNode = (node) => {
        return node.nodeType === 1 /* ELEMENT */
        && node.tagName === "TEMPLATE";
    }
    ;
    return [hydrate2, hydrateNode];
}
function propHasMismatch(el, key, clientValue, vnode, instance) {
    let mismatchType;
    let mismatchKey;
    let actual;
    let expected;
    if (key === "class") {
        actual = el.getAttribute("class");
        expected = normalizeClass(clientValue);
        if (!isSetEqual(toClassSet(actual || ""), toClassSet(expected))) {
            mismatchType = 2 /* CLASS */
            ;
            mismatchKey = `class`;
        }
    } else if (key === "style") {
        actual = el.getAttribute("style") || "";
        expected = isString(clientValue) ? clientValue : stringifyStyle(normalizeStyle(clientValue));
        const actualMap = toStyleMap(actual);
        const expectedMap = toStyleMap(expected);
        if (vnode.dirs) {
            for (const {dir, value} of vnode.dirs) {
                if (dir.name === "show" && !value) {
                    expectedMap.set("display", "none");
                }
            }
        }
        if (instance) {
            resolveCssVars(instance, vnode, expectedMap);
        }
        if (!isMapEqual(actualMap, expectedMap)) {
            mismatchType = 3 /* STYLE */
            ;
            mismatchKey = "style";
        }
    } else if (el instanceof SVGElement && isKnownSvgAttr(key) || el instanceof HTMLElement && (isBooleanAttr(key) || isKnownHtmlAttr(key))) {
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
        if (actual !== expected) {
            mismatchType = 4 /* ATTRIBUTE */
            ;
            mismatchKey = key;
        }
    }
    if (mismatchType != null && !isMismatchAllowed(el, mismatchType)) {
        const format = (v) => v === false ? `(not rendered)` : `${mismatchKey}="${v}"`;
        const preSegment = `Hydration ${MismatchTypeString[mismatchType]} mismatch on`;
        const postSegment = `
  - rendered on server: ${format(actual)}
  - expected on client: ${format(expected)}
  Note: this mismatch is check-only. The DOM will not be rectified in production due to performance overhead.
  You should fix the source of the mismatch.`;
        if (false) {
            warn2(`${preSegment} ${el.tagName}${postSegment}`);
        } else {
            warn2(preSegment, el, postSegment);
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
    const styleMap = /* @__PURE__ */
    new Map();
    for (const item of str.split(";")) {
        let[key,value] = item.split(":");
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
    for (const [key,value] of a) {
        if (value !== b.get(key)) {
            return false;
        }
    }
    return true;
}
function resolveCssVars(instance, vnode, expectedMap) {
    const root = instance.subTree;
    if (instance.getCssVars && (vnode === root || root && root.type === Fragment && root.children.includes(vnode))) {
        const cssVars = instance.getCssVars();
        for (const key in cssVars) {
            expectedMap.set(`--${getEscapedCssVarName(key, false)}`, String(cssVars[key]));
        }
    }
    if (vnode === root && instance.parent) {
        resolveCssVars(instance.parent, instance.vnode, expectedMap);
    }
}
var allowMismatchAttr = "data-allow-mismatch";
var MismatchTypeString = {
    [0 /* TEXT */
    ]: "text",
    [1 /* CHILDREN */
    ]: "children",
    [2 /* CLASS */
    ]: "class",
    [3 /* STYLE */
    ]: "style",
    [4 /* ATTRIBUTE */
    ]: "attribute"
};
function isMismatchAllowed(el, allowedType) {
    if (allowedType === 0 /* TEXT */
    || allowedType === 1 /* CHILDREN */
    ) {
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
        if (allowedType === 0 /* TEXT */
        && list.includes("children")) {
            return true;
        }
        return allowedAttr.split(",").includes(MismatchTypeString[allowedType]);
    }
}

// packages/runtime-core/src/hydrationStrategies.ts
var requestIdleCallback = getGlobalThis().requestIdleCallback || ( (cb) => setTimeout(cb, 1));
var cancelIdleCallback = getGlobalThis().cancelIdleCallback || ( (id) => clearTimeout(id));
var hydrateOnIdle = (timeout=1e4) => (hydrate2) => {
    const id = requestIdleCallback(hydrate2, {
        timeout
    });
    return () => cancelIdleCallback(id);
}
;
function elementIsVisibleInViewport(el) {
    const {top, left, bottom, right} = el.getBoundingClientRect();
    const {innerHeight, innerWidth} = window;
    return (top > 0 && top < innerHeight || bottom > 0 && bottom < innerHeight) && (left > 0 && left < innerWidth || right > 0 && right < innerWidth);
}
var hydrateOnVisible = (opts) => (hydrate2, forEach) => {
    const ob = new IntersectionObserver( (entries) => {
        for (const e of entries) {
            if (!e.isIntersecting)
                continue;
            ob.disconnect();
            hydrate2();
            break;
        }
    }
    ,opts);
    forEach( (el) => {
        if (!(el instanceof Element))
            return;
        if (elementIsVisibleInViewport(el)) {
            hydrate2();
            ob.disconnect();
            return false;
        }
        ob.observe(el);
    }
    );
    return () => ob.disconnect();
}
;
var hydrateOnMediaQuery = (query) => (hydrate2) => {
    if (query) {
        const mql = matchMedia(query);
        if (mql.matches) {
            hydrate2();
        } else {
            mql.addEventListener("change", hydrate2, {
                once: true
            });
            return () => mql.removeEventListener("change", hydrate2);
        }
    }
}
;
var hydrateOnInteraction = (interactions=[]) => (hydrate2, forEach) => {
    if (isString(interactions))
        interactions = [interactions];
    let hasHydrated = false;
    const doHydrate = (e) => {
        if (!hasHydrated) {
            hasHydrated = true;
            teardown();
            hydrate2();
            e.target.dispatchEvent(new e.constructor(e.type,e));
        }
    }
    ;
    const teardown = () => {
        forEach( (el) => {
            for (const i of interactions) {
                el.removeEventListener(i, doHydrate);
            }
        }
        );
    }
    ;
    forEach( (el) => {
        for (const i of interactions) {
            el.addEventListener(i, doHydrate, {
                once: true
            });
        }
    }
    );
    return teardown;
}
;
function forEachElement(node, cb) {
    if (isComment(node) && node.data === "[") {
        let depth = 1;
        let next2 = node.nextSibling;
        while (next2) {
            if (next2.nodeType === 1 /* ELEMENT */
            ) {
                const result = cb(next2);
                if (result === false) {
                    break;
                }
            } else if (isComment(next2)) {
                if (next2.data === "]") {
                    if (--depth === 0)
                        break;
                } else if (next2.data === "[") {
                    depth++;
                }
            }
            next2 = next2.nextSibling;
        }
    } else {
        cb(node);
    }
}

// packages/runtime-core/src/apiAsyncComponent.ts
var isAsyncWrapper = (i) => !!i.type.__asyncLoader;
// @__NO_SIDE_EFFECTS__
function defineAsyncComponent(source) {
    if (isFunction(source)) {
        source = {
            loader: source
        };
    }
    const {loader, loadingComponent, errorComponent, delay=200, hydrate: hydrateStrategy, timeout, // undefined = never times out
    suspensible=true, onError: userOnError} = source;
    let pendingRequest = null;
    let resolvedComp;
    let retries = 0;
    const retry = () => {
        retries++;
        pendingRequest = null;
        return load();
    }
    ;
    const load = () => {
        let thisRequest;
        return pendingRequest || (thisRequest = pendingRequest = loader().catch( (err) => {
            err = err instanceof Error ? err : new Error(String(err));
            if (userOnError) {
                return new Promise( (resolve2, reject) => {
                    const userRetry = () => resolve2(retry());
                    const userFail = () => reject(err);
                    userOnError(err, userRetry, userFail, retries + 1);
                }
                );
            } else {
                throw err;
            }
        }
        ).then( (comp) => {
            if (thisRequest !== pendingRequest && pendingRequest) {
                return pendingRequest;
            }
            if (!comp) {
                warn2(`Async component loader resolved to undefined. If you are using retry(), make sure to return its return value.`);
            }
            if (comp && (comp.__esModule || comp[Symbol.toStringTag] === "Module")) {
                comp = comp.default;
            }
            if (comp && !isObject(comp) && !isFunction(comp)) {
                throw new Error(`Invalid async component load result: ${comp}`);
            }
            resolvedComp = comp;
            return comp;
        }
        ));
    }
    ;
    return defineComponent({
        name: "AsyncComponentWrapper",
        __asyncLoader: load,
        __asyncHydrate(el, instance, hydrate2) {
            const doHydrate = hydrateStrategy ? () => {
                const teardown = hydrateStrategy(hydrate2, (cb) => forEachElement(el, cb));
                if (teardown) {
                    ;(instance.bum || (instance.bum = [])).push(teardown);
                }
            }
            : hydrate2;
            if (resolvedComp) {
                doHydrate();
            } else {
                load().then( () => !instance.isUnmounted && doHydrate());
            }
        },
        get __asyncResolved() {
            return resolvedComp;
        },
        setup() {
            const instance = currentInstance;
            markAsyncBoundary(instance);
            if (resolvedComp) {
                return () => createInnerComp(resolvedComp, instance);
            }
            const onError = (err) => {
                pendingRequest = null;
                handleError(err, instance, 13 /* ASYNC_COMPONENT_LOADER */
                , !errorComponent);
            }
            ;
            if (suspensible && instance.suspense || isInSSRComponentSetup) {
                return load().then( (comp) => {
                    return () => createInnerComp(comp, instance);
                }
                ).catch( (err) => {
                    onError(err);
                    return () => errorComponent ? createVNode(errorComponent, {
                        error: err
                    }) : null;
                }
                );
            }
            const loaded = ref(false);
            const error = ref();
            const delayed = ref(!!delay);
            if (delay) {
                setTimeout( () => {
                    delayed.value = false;
                }
                , delay);
            }
            if (timeout != null) {
                setTimeout( () => {
                    if (!loaded.value && !error.value) {
                        const err = new Error(`Async component timed out after ${timeout}ms.`);
                        onError(err);
                        error.value = err;
                    }
                }
                , timeout);
            }
            load().then( () => {
                loaded.value = true;
                if (instance.parent && isKeepAlive(instance.parent.vnode)) {
                    instance.parent.update();
                }
            }
            ).catch( (err) => {
                onError(err);
                error.value = err;
            }
            );
            return () => {
                if (loaded.value && resolvedComp) {
                    return createInnerComp(resolvedComp, instance);
                } else if (error.value && errorComponent) {
                    return createVNode(errorComponent, {
                        error: error.value
                    });
                } else if (loadingComponent && !delayed.value) {
                    return createVNode(loadingComponent);
                }
            }
            ;
        }
    });
}
function createInnerComp(comp, parent) {
    const {ref: ref2, props, children: children2, ce} = parent.vnode;
    const vnode = createVNode(comp, props, children2);
    vnode.ref = ref2;
    vnode.ce = ce;
    delete parent.vnode.ce;
    return vnode;
}

// packages/runtime-core/src/components/KeepAlive.ts
var isKeepAlive = (vnode) => vnode.type.__isKeepAlive;
var KeepAliveImpl = {
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
    setup(props, {slots}) {
        const instance = getCurrentInstance();
        const sharedContext = instance.ctx;
        if (!sharedContext.renderer) {
            return () => {
                const children2 = slots.default && slots.default();
                return children2 && children2.length === 1 ? children2[0] : children2;
            }
            ;
        }
        const cache = /* @__PURE__ */
        new Map();
        const keys = /* @__PURE__ */
        new Set();
        let current = null;
        if (true) {
            ;instance.__v_cache = cache;
        }
        const parentSuspense = instance.suspense;
        const {renderer: {p: patch, m: move, um: _unmount, o: {createElement}}} = sharedContext;
        const storageContainer = createElement("div");
        sharedContext.activate = (vnode, container, anchor, namespace, optimized) => {
            const instance2 = vnode.component;
            move(vnode, container, anchor, 0 /* ENTER */
            , parentSuspense);
            patch(instance2.vnode, vnode, container, anchor, instance2, parentSuspense, namespace, vnode.slotScopeIds, optimized);
            queuePostRenderEffect( () => {
                instance2.isDeactivated = false;
                if (instance2.a) {
                    invokeArrayFns(instance2.a);
                }
                const vnodeHook = vnode.props && vnode.props.onVnodeMounted;
                if (vnodeHook) {
                    invokeVNodeHook(vnodeHook, instance2.parent, vnode);
                }
            }
            , parentSuspense);
            if (true) {
                devtoolsComponentAdded(instance2);
            }
        }
        ;
        sharedContext.deactivate = (vnode) => {
            const instance2 = vnode.component;
            invalidateMount(instance2.m);
            invalidateMount(instance2.a);
            move(vnode, storageContainer, null, 1 /* LEAVE */
            , parentSuspense);
            queuePostRenderEffect( () => {
                if (instance2.da) {
                    invokeArrayFns(instance2.da);
                }
                const vnodeHook = vnode.props && vnode.props.onVnodeUnmounted;
                if (vnodeHook) {
                    invokeVNodeHook(vnodeHook, instance2.parent, vnode);
                }
                instance2.isDeactivated = true;
            }
            , parentSuspense);
            if (true) {
                devtoolsComponentAdded(instance2);
            }
        }
        ;
        function unmount(vnode) {
            resetShapeFlag(vnode);
            _unmount(vnode, instance, parentSuspense, true);
        }
        function pruneCache(filter) {
            cache.forEach( (vnode, key) => {
                const name = getComponentName(vnode.type);
                if (name && !filter(name)) {
                    pruneCacheEntry(key);
                }
            }
            );
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
        watch2( () => [props.include, props.exclude], ([include,exclude]) => {
            include && pruneCache( (name) => matches(include, name));
            exclude && pruneCache( (name) => !matches(exclude, name));
        }
        , // prune post-render after `current` has been updated
        {
            flush: "post",
            deep: true
        });
        let pendingCacheKey = null;
        const cacheSubtree = () => {
            if (pendingCacheKey != null) {
                if (isSuspense(instance.subTree.type)) {
                    queuePostRenderEffect( () => {
                        cache.set(pendingCacheKey, getInnerChild2(instance.subTree));
                    }
                    , instance.subTree.suspense);
                } else {
                    cache.set(pendingCacheKey, getInnerChild2(instance.subTree));
                }
            }
        }
        ;
        onMounted(cacheSubtree);
        onUpdated(cacheSubtree);
        onBeforeUnmount( () => {
            cache.forEach( (cached) => {
                const {subTree, suspense} = instance;
                const vnode = getInnerChild2(subTree);
                if (cached.type === vnode.type && cached.key === vnode.key) {
                    resetShapeFlag(vnode);
                    const da = vnode.component.da;
                    da && queuePostRenderEffect(da, suspense);
                    return;
                }
                unmount(cached);
            }
            );
        }
        );
        return () => {
            pendingCacheKey = null;
            if (!slots.default) {
                return current = null;
            }
            const children2 = slots.default();
            const rawVNode = children2[0];
            if (children2.length > 1) {
                if (true) {
                    warn2(`KeepAlive should contain exactly one component child.`);
                }
                current = null;
                return children2;
            } else if (!isVNode(rawVNode) || !(rawVNode.shapeFlag & 4 /* STATEFUL_COMPONENT */
            ) && !(rawVNode.shapeFlag & 128 /* SUSPENSE */
            )) {
                current = null;
                return rawVNode;
            }
            let vnode = getInnerChild2(rawVNode);
            if (vnode.type === Comment2) {
                current = null;
                return vnode;
            }
            const comp = vnode.type;
            const name = getComponentName(isAsyncWrapper(vnode) ? vnode.type.__asyncResolved || {} : comp);
            const {include, exclude, max} = props;
            if (include && (!name || !matches(include, name)) || exclude && name && matches(exclude, name)) {
                vnode.shapeFlag &= ~256 /* COMPONENT_SHOULD_KEEP_ALIVE */
                ;
                current = vnode;
                return rawVNode;
            }
            const key = vnode.key == null ? comp : vnode.key;
            const cachedVNode = cache.get(key);
            if (vnode.el) {
                vnode = cloneVNode(vnode);
                if (rawVNode.shapeFlag & 128 /* SUSPENSE */
                ) {
                    rawVNode.ssContent = vnode;
                }
            }
            pendingCacheKey = key;
            if (cachedVNode) {
                vnode.el = cachedVNode.el;
                vnode.component = cachedVNode.component;
                if (vnode.transition) {
                    setTransitionHooks(vnode, vnode.transition);
                }
                vnode.shapeFlag |= 512 /* COMPONENT_KEPT_ALIVE */
                ;
                keys.delete(key);
                keys.add(key);
            } else {
                keys.add(key);
                if (max && keys.size > parseInt(max, 10)) {
                    pruneCacheEntry(keys.values().next().value);
                }
            }
            vnode.shapeFlag |= 256 /* COMPONENT_SHOULD_KEEP_ALIVE */
            ;
            current = vnode;
            return isSuspense(rawVNode.type) ? rawVNode : vnode;
        }
        ;
    }
};
var KeepAlive = false ? /* @__PURE__ */
decorate(KeepAliveImpl) : KeepAliveImpl;
function matches(pattern, name) {
    if (isArray(pattern)) {
        return pattern.some( (p2) => matches(p2, name));
    } else if (isString(pattern)) {
        return pattern.split(",").includes(name);
    } else if (isRegExp(pattern)) {
        pattern.lastIndex = 0;
        return pattern.test(name);
    }
    return false;
}
function onActivated(hook, target) {
    registerKeepAliveHook(hook, "a"/* ACTIVATED */
    , target);
}
function onDeactivated(hook, target) {
    registerKeepAliveHook(hook, "da"/* DEACTIVATED */
    , target);
}
function registerKeepAliveHook(hook, type, target=getCurrentInstance()) {
    const wrappedHook = hook.__wdc || (hook.__wdc = () => {
        let current = target;
        while (current) {
            if (current.isDeactivated) {
                return;
            }
            current = current.parent;
        }
        return hook();
    }
    );
    injectHook(type, wrappedHook, target);
    if (target) {
        let current = target.parent;
        while (current && current.parent) {
            if (isKeepAlive(current.parent.vnode)) {
                injectToKeepAliveRoot(wrappedHook, type, target, current);
            }
            current = current.parent;
        }
    }
}
function injectToKeepAliveRoot(hook, type, target, keepAliveRoot) {
    const injected = injectHook(type, hook, keepAliveRoot, true /* prepend */
    );
    onUnmounted( () => {
        remove(keepAliveRoot[type], injected);
    }
    , target);
}
function resetShapeFlag(vnode) {
    vnode.shapeFlag &= ~256 /* COMPONENT_SHOULD_KEEP_ALIVE */
    ;
    vnode.shapeFlag &= ~512 /* COMPONENT_KEPT_ALIVE */
    ;
}
function getInnerChild2(vnode) {
    return vnode.shapeFlag & 128 /* SUSPENSE */
    ? vnode.ssContent : vnode;
}

// packages/runtime-core/src/apiLifecycle.ts
function injectHook(type, hook, target=currentInstance, prepend2=false) {
    if (target) {
        const hooks = target[type] || (target[type] = []);
        const wrappedHook = hook.__weh || (hook.__weh = (...args) => {
            pauseTracking();
            const reset = setCurrentInstance(target);
            const res = callWithAsyncErrorHandling(hook, target, type, args);
            reset();
            resetTracking();
            return res;
        }
        );
        if (prepend2) {
            hooks.unshift(wrappedHook);
        } else {
            hooks.push(wrappedHook);
        }
        return wrappedHook;
    } else if (true) {
        const apiName = toHandlerKey(ErrorTypeStrings[type].replace(/ hook$/, ""));
        warn2(`${apiName} is called when there is no active component instance to be associated with. Lifecycle injection APIs can only be used during execution of setup().` + (true ? ` If you are using async setup(), make sure to register lifecycle hooks before the first await statement.` : ``));
    }
}
var createHook = (lifecycle) => (hook, target=currentInstance) => {
    if (!isInSSRComponentSetup || lifecycle === "sp"/* SERVER_PREFETCH */
    ) {
        injectHook(lifecycle, (...args) => hook(...args), target);
    }
}
;
var onBeforeMount = createHook("bm"/* BEFORE_MOUNT */
);
var onMounted = createHook("m"/* MOUNTED */
);
var onBeforeUpdate = createHook("bu"/* BEFORE_UPDATE */
);
var onUpdated = createHook("u"/* UPDATED */
);
var onBeforeUnmount = createHook("bum"/* BEFORE_UNMOUNT */
);
var onUnmounted = createHook("um"/* UNMOUNTED */
);
var onServerPrefetch = createHook("sp"/* SERVER_PREFETCH */
);
var onRenderTriggered = createHook("rtg"/* RENDER_TRIGGERED */
);
var onRenderTracked = createHook("rtc"/* RENDER_TRACKED */
);
function onErrorCaptured(hook, target=currentInstance) {
    injectHook("ec"/* ERROR_CAPTURED */
    , hook, target);
}

// packages/runtime-core/src/helpers/resolveAssets.ts
var COMPONENTS = "components";
var DIRECTIVES = "directives";
function resolveComponent(name, maybeSelfReference) {
    return resolveAsset(COMPONENTS, name, true, maybeSelfReference) || name;
}
var NULL_DYNAMIC_COMPONENT = Symbol.for("v-ndc");
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
function resolveAsset(type, name, warnMissing=true, maybeSelfReference=false) {
    const instance = currentRenderingInstance || currentInstance;
    if (instance) {
        const Component = instance.type;
        if (type === COMPONENTS) {
            const selfName = getComponentName(Component, false);
            if (selfName && (selfName === name || selfName === camelize(name) || selfName === capitalize(camelize(name)))) {
                return Component;
            }
        }
        const res = (// local registration
        // check instance[type] first which is resolved for options API
        resolve(instance[type] || Component[type], name) || // global registration
        // @ts-expect-error filters only exist in compat mode
        resolve(instance.appContext[type], name));
        if (!res && maybeSelfReference) {
            return Component;
        }
        if (warnMissing && !res) {
            const extra = type === COMPONENTS ? `
If this is a native custom element, make sure to exclude it from component resolution via compilerOptions.isCustomElement.` : ``;
            warn2(`Failed to resolve ${type.slice(0, -1)}: ${name}${extra}`);
        }
        return res;
    } else if (true) {
        warn2(`resolve${capitalize(type.slice(0, -1))} can only be used in render() or setup().`);
    }
}
function resolve(registry, name) {
    return registry && (registry[name] || registry[camelize(name)] || registry[capitalize(camelize(name))]);
}

// packages/runtime-core/src/helpers/renderList.ts
function renderList(source, renderItem, cache, index) {
    let ret;
    const cached = cache && cache[index];
    const sourceIsArray = isArray(source);
    if (sourceIsArray || isString(source)) {
        const sourceIsReactiveArray = sourceIsArray && isReactive(source);
        let needsWrap = false;
        if (sourceIsReactiveArray) {
            needsWrap = !isShallow(source);
            source = shallowReadArray(source);
        }
        ret = new Array(source.length);
        for (let i = 0, l = source.length; i < l; i++) {
            ret[i] = renderItem(needsWrap ? toReactive(source[i]) : source[i], i, void 0, cached && cached[i]);
        }
    } else if (typeof source === "number") {
        if (!Number.isInteger(source)) {
            warn2(`The v-for range expect an integer value but got ${source}.`);
        }
        ret = new Array(source);
        for (let i = 0; i < source; i++) {
            ret[i] = renderItem(i + 1, i, void 0, cached && cached[i]);
        }
    } else if (isObject(source)) {
        if (source[Symbol.iterator]) {
            ret = Array.from(source, (item, i) => renderItem(item, i, void 0, cached && cached[i]));
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

// packages/runtime-core/src/helpers/createSlots.ts
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
                if (res)
                    res.key = slot.key;
                return res;
            }
            : slot.fn;
        }
    }
    return slots;
}

// packages/runtime-core/src/helpers/renderSlot.ts
function renderSlot(slots, name, props={}, fallback, noSlotted) {
    if (currentRenderingInstance.ce || currentRenderingInstance.parent && isAsyncWrapper(currentRenderingInstance.parent) && currentRenderingInstance.parent.ce) {
        if (name !== "default")
            props.name = name;
        return openBlock(),
        createBlock(Fragment, null, [createVNode("slot", props, fallback && fallback())], 64 /* STABLE_FRAGMENT */
        );
    }
    let slot = slots[name];
    if (slot && slot.length > 1) {
        warn2(`SSR-optimized slot function detected in a non-SSR-optimized render function. You need to mark this component with $dynamic-slots in the parent template.`);
        slot = () => [];
    }
    if (slot && slot._c) {
        ;slot._d = false;
    }
    openBlock();
    const validSlotContent = slot && ensureValidVNode(slot(props));
    const slotKey = props.key || // slot content array of a dynamic conditional slot may have a branch
    // key attached in the `createSlots` helper, respect that
    validSlotContent && validSlotContent.key;
    const rendered = createBlock(Fragment, {
        key: (slotKey && !isSymbol(slotKey) ? slotKey : `_${name}`) + // #7256 force differentiate fallback content from actual content
        (!validSlotContent && fallback ? "_fb" : "")
    }, validSlotContent || (fallback ? fallback() : []), validSlotContent && slots._ === 1 /* STABLE */
    ? 64 /* STABLE_FRAGMENT */
    : -2 /* BAIL */
    );
    if (!noSlotted && rendered.scopeId) {
        rendered.slotScopeIds = [rendered.scopeId + "-s"];
    }
    if (slot && slot._c) {
        ;slot._d = true;
    }
    return rendered;
}
function ensureValidVNode(vnodes) {
    return vnodes.some( (child) => {
        if (!isVNode(child))
            return true;
        if (child.type === Comment2)
            return false;
        if (child.type === Fragment && !ensureValidVNode(child.children))
            return false;
        return true;
    }
    ) ? vnodes : null;
}

// packages/runtime-core/src/helpers/toHandlers.ts
function toHandlers(obj, preserveCaseIfNecessary) {
    const ret = {};
    if (!isObject(obj)) {
        warn2(`v-on with no argument expects an object value.`);
        return ret;
    }
    for (const key in obj) {
        ret[preserveCaseIfNecessary && /[A-Z]/.test(key) ? `on:${key}` : toHandlerKey(key)] = obj[key];
    }
    return ret;
}

// packages/runtime-core/src/componentPublicInstance.ts
var getPublicInstance = (i) => {
    if (!i)
        return null;
    if (isStatefulComponent(i))
        return getComponentPublicInstance(i);
    return getPublicInstance(i.parent);
}
;
var publicPropertiesMap = (// Move PURE marker to new line to workaround compiler discarding it
// due to type annotation
/* @__PURE__ */
extend(/* @__PURE__ */
Object.create(null), {
    $: (i) => i,
    $el: (i) => i.vnode.el,
    $data: (i) => i.data,
    $props: (i) => true ? shallowReadonly(i.props) : i.props,
    $attrs: (i) => true ? shallowReadonly(i.attrs) : i.attrs,
    $slots: (i) => true ? shallowReadonly(i.slots) : i.slots,
    $refs: (i) => true ? shallowReadonly(i.refs) : i.refs,
    $parent: (i) => getPublicInstance(i.parent),
    $root: (i) => getPublicInstance(i.root),
    $host: (i) => i.ce,
    $emit: (i) => i.emit,
    $options: (i) => true ? resolveMergedOptions(i) : i.type,
    $forceUpdate: (i) => i.f || (i.f = () => {
        queueJob(i.update);
    }
    ),
    $nextTick: (i) => i.n || (i.n = nextTick.bind(i.proxy)),
    $watch: (i) => true ? instanceWatch.bind(i) : NOOP
}));
if (false) {
    installCompatInstanceProperties(publicPropertiesMap);
}
var isReservedPrefix = (key) => key === "_" || key === "$";
var hasSetupBinding = (state, key) => state !== EMPTY_OBJ && !state.__isScriptSetup && hasOwn(state, key);
var PublicInstanceProxyHandlers = {
    get({_: instance}, key) {
        if (key === "__v_skip"/* SKIP */
        ) {
            return true;
        }
        const {ctx, setupState, data, props, accessCache, type, appContext} = instance;
        if (key === "__isVue") {
            return true;
        }
        let normalizedProps;
        if (key[0] !== "$") {
            const n = accessCache[key];
            if (n !== void 0) {
                switch (n) {
                case 1 /* SETUP */
                :
                    return setupState[key];
                case 2 /* DATA */
                :
                    return data[key];
                case 4 /* CONTEXT */
                :
                    return ctx[key];
                case 3 /* PROPS */
                :
                    return props[key];
                }
            } else if (hasSetupBinding(setupState, key)) {
                accessCache[key] = 1 /* SETUP */
                ;
                return setupState[key];
            } else if (data !== EMPTY_OBJ && hasOwn(data, key)) {
                accessCache[key] = 2 /* DATA */
                ;
                return data[key];
            } else if (// only cache other properties when instance has declared (thus stable)
            // props
            (normalizedProps = instance.propsOptions[0]) && hasOwn(normalizedProps, key)) {
                accessCache[key] = 3 /* PROPS */
                ;
                return props[key];
            } else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
                accessCache[key] = 4 /* CONTEXT */
                ;
                return ctx[key];
            } else if (shouldCacheAccess) {
                accessCache[key] = 0 /* OTHER */
                ;
            }
        }
        const publicGetter = publicPropertiesMap[key];
        let cssModule, globalProperties;
        if (publicGetter) {
            if (key === "$attrs") {
                track(instance.attrs, "get"/* GET */
                , "");
                markAttrsAccessed();
            } else if (key === "$slots") {
                track(instance, "get"/* GET */
                , key);
            }
            return publicGetter(instance);
        } else if (// css module (injected by vue-loader)
        (cssModule = type.__cssModules) && (cssModule = cssModule[key])) {
            return cssModule;
        } else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
            accessCache[key] = 4 /* CONTEXT */
            ;
            return ctx[key];
        } else if (// global properties
        globalProperties = appContext.config.globalProperties,
        hasOwn(globalProperties, key)) {
            if (false) {
                const desc = Object.getOwnPropertyDescriptor(globalProperties, key);
                if (desc.get) {
                    return desc.get.call(instance.proxy);
                } else {
                    const val = globalProperties[key];
                    return isFunction2(val) ? extend(val.bind(instance.proxy), val) : val;
                }
            } else {
                return globalProperties[key];
            }
        } else if (currentRenderingInstance && (!isString(key) || // #1091 avoid internal isRef/isVNode checks on component instance leading
        // to infinite warning loop
        key.indexOf("__v") !== 0)) {
            if (data !== EMPTY_OBJ && isReservedPrefix(key[0]) && hasOwn(data, key)) {
                warn2(`Property ${JSON.stringify(key)} must be accessed via $data because it starts with a reserved character ("$" or "_") and is not proxied on the render context.`);
            } else if (instance === currentRenderingInstance) {
                warn2(`Property ${JSON.stringify(key)} was accessed during render but is not defined on instance.`);
            }
        }
    },
    set({_: instance}, key, value) {
        const {data, setupState, ctx} = instance;
        if (hasSetupBinding(setupState, key)) {
            setupState[key] = value;
            return true;
        } else if (setupState.__isScriptSetup && hasOwn(setupState, key)) {
            warn2(`Cannot mutate <script setup> binding "${key}" from Options API.`);
            return false;
        } else if (data !== EMPTY_OBJ && hasOwn(data, key)) {
            data[key] = value;
            return true;
        } else if (hasOwn(instance.props, key)) {
            warn2(`Attempting to mutate prop "${key}". Props are readonly.`);
            return false;
        }
        if (key[0] === "$" && key.slice(1)in instance) {
            warn2(`Attempting to mutate public property "${key}". Properties starting with $ are reserved and readonly.`);
            return false;
        } else {
            if (key in instance.appContext.config.globalProperties) {
                Object.defineProperty(ctx, key, {
                    enumerable: true,
                    configurable: true,
                    value
                });
            } else {
                ctx[key] = value;
            }
        }
        return true;
    },
    has({_: {data, setupState, accessCache, ctx, appContext, propsOptions}}, key) {
        let normalizedProps;
        return !!accessCache[key] || data !== EMPTY_OBJ && hasOwn(data, key) || hasSetupBinding(setupState, key) || (normalizedProps = propsOptions[0]) && hasOwn(normalizedProps, key) || hasOwn(ctx, key) || hasOwn(publicPropertiesMap, key) || hasOwn(appContext.config.globalProperties, key);
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
if (true) {
    PublicInstanceProxyHandlers.ownKeys = (target) => {
        warn2(`Avoid app logic that relies on enumerating keys on a component instance. The keys will be empty in production mode to avoid performance overhead.`);
        return Reflect.ownKeys(target);
    }
    ;
}
var RuntimeCompiledPublicInstanceProxyHandlers = /* @__PURE__ */
extend({}, PublicInstanceProxyHandlers, {
    get(target, key) {
        if (key === Symbol.unscopables) {
            return;
        }
        return PublicInstanceProxyHandlers.get(target, key, target);
    },
    has(_, key) {
        const has = key[0] !== "_" && !isGloballyAllowed(key);
        if (!has && PublicInstanceProxyHandlers.has(_, key)) {
            warn2(`Property ${JSON.stringify(key)} should not start with _ which is a reserved prefix for Vue internals.`);
        }
        return has;
    }
});
function createDevRenderContext(instance) {
    const target = {};
    Object.defineProperty(target, `_`, {
        configurable: true,
        enumerable: false,
        get: () => instance
    });
    Object.keys(publicPropertiesMap).forEach( (key) => {
        Object.defineProperty(target, key, {
            configurable: true,
            enumerable: false,
            get: () => publicPropertiesMap[key](instance),
            // intercepted by the proxy so no need for implementation,
            // but needed to prevent set errors
            set: NOOP
        });
    }
    );
    return target;
}
function exposePropsOnRenderContext(instance) {
    const {ctx, propsOptions: [propsOptions]} = instance;
    if (propsOptions) {
        Object.keys(propsOptions).forEach( (key) => {
            Object.defineProperty(ctx, key, {
                enumerable: true,
                configurable: true,
                get: () => instance.props[key],
                set: NOOP
            });
        }
        );
    }
}
function exposeSetupStateOnRenderContext(instance) {
    const {ctx, setupState} = instance;
    Object.keys(toRaw(setupState)).forEach( (key) => {
        if (!setupState.__isScriptSetup) {
            if (isReservedPrefix(key[0])) {
                warn2(`setup() return property ${JSON.stringify(key)} should not start with "$" or "_" which are reserved prefixes for Vue internals.`);
                return;
            }
            Object.defineProperty(ctx, key, {
                enumerable: true,
                configurable: true,
                get: () => setupState[key],
                set: NOOP
            });
        }
    }
    );
}

// packages/runtime-core/src/apiSetupHelpers.ts
var warnRuntimeUsage = (method) => warn2(`${method}() is a compiler-hint helper that is only usable inside <script setup> of a single file component. Its arguments should be compiled away and passing it at runtime has no effect.`);
function defineProps() {
    if (true) {
        warnRuntimeUsage(`defineProps`);
    }
    return null;
}
function defineEmits() {
    if (true) {
        warnRuntimeUsage(`defineEmits`);
    }
    return null;
}
function defineExpose(exposed) {
    if (true) {
        warnRuntimeUsage(`defineExpose`);
    }
}
function defineOptions(options) {
    if (true) {
        warnRuntimeUsage(`defineOptions`);
    }
}
function defineSlots() {
    if (true) {
        warnRuntimeUsage(`defineSlots`);
    }
    return null;
}
function defineModel() {
    if (true) {
        warnRuntimeUsage("defineModel");
    }
}
function withDefaults(props, defaults) {
    if (true) {
        warnRuntimeUsage(`withDefaults`);
    }
    return null;
}
function useSlots() {
    return getContext().slots;
}
function useAttrs() {
    return getContext().attrs;
}
function getContext() {
    const i = getCurrentInstance();
    if (!i) {
        warn2(`useContext() called without active instance.`);
    }
    return i.setupContext || (i.setupContext = createSetupContext(i));
}
function normalizePropsOrEmits(props) {
    return isArray(props) ? props.reduce( (normalized, p2) => (normalized[p2] = null,
    normalized), {}) : props;
}
function mergeDefaults(raw, defaults) {
    const props = normalizePropsOrEmits(raw);
    for (const key in defaults) {
        if (key.startsWith("__skip"))
            continue;
        let opt = props[key];
        if (opt) {
            if (isArray(opt) || isFunction(opt)) {
                opt = props[key] = {
                    type: opt,
                    default: defaults[key]
                };
            } else {
                opt.default = defaults[key];
            }
        } else if (opt === null) {
            opt = props[key] = {
                default: defaults[key]
            };
        } else if (true) {
            warn2(`props default key "${key}" has no corresponding declaration.`);
        }
        if (opt && defaults[`__skip_${key}`]) {
            opt.skipFactory = true;
        }
    }
    return props;
}
function mergeModels(a, b) {
    if (!a || !b)
        return a || b;
    if (isArray(a) && isArray(b))
        return a.concat(b);
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
    const ctx = getCurrentInstance();
    if (!ctx) {
        warn2(`withAsyncContext called without active current instance. This is likely a bug.`);
    }
    let awaitable = getAwaitable();
    unsetCurrentInstance();
    if (isPromise(awaitable)) {
        awaitable = awaitable.catch( (e) => {
            setCurrentInstance(ctx);
            throw e;
        }
        );
    }
    return [awaitable, () => setCurrentInstance(ctx)];
}

// packages/runtime-core/src/componentOptions.ts
function createDuplicateChecker() {
    const cache = /* @__PURE__ */
    Object.create(null);
    return (type, key) => {
        if (cache[key]) {
            warn2(`${type} property "${key}" is already defined in ${cache[key]}.`);
        } else {
            cache[key] = type;
        }
    }
    ;
}
var shouldCacheAccess = true;
function applyOptions(instance) {
    const options = resolveMergedOptions(instance);
    const publicThis = instance.proxy;
    const ctx = instance.ctx;
    shouldCacheAccess = false;
    if (options.beforeCreate) {
        callHook(options.beforeCreate, instance, "bc"/* BEFORE_CREATE */
        );
    }
    const {// state
    data: dataOptions, computed: computedOptions, methods, watch: watchOptions, provide: provideOptions, inject: injectOptions, // lifecycle
    created, beforeMount, mounted, beforeUpdate, updated, activated, deactivated, beforeDestroy, beforeUnmount, destroyed, unmounted, render: render2, renderTracked, renderTriggered, errorCaptured, serverPrefetch, // public API
    expose: expose2, inheritAttrs, // assets
    components, directives, filters} = options;
    const checkDuplicateProperties = true ? createDuplicateChecker() : null;
    if (true) {
        const [propsOptions] = instance.propsOptions;
        if (propsOptions) {
            for (const key in propsOptions) {
                checkDuplicateProperties("Props"/* PROPS */
                , key);
            }
        }
    }
    if (injectOptions) {
        resolveInjections(injectOptions, ctx, checkDuplicateProperties);
    }
    if (methods) {
        for (const key in methods) {
            const methodHandler = methods[key];
            if (isFunction(methodHandler)) {
                if (true) {
                    Object.defineProperty(ctx, key, {
                        value: methodHandler.bind(publicThis),
                        configurable: true,
                        enumerable: true,
                        writable: true
                    });
                } else {
                    ctx[key] = methodHandler.bind(publicThis);
                }
                if (true) {
                    checkDuplicateProperties("Methods"/* METHODS */
                    , key);
                }
            } else if (true) {
                warn2(`Method "${key}" has type "${typeof methodHandler}" in the component definition. Did you reference the function correctly?`);
            }
        }
    }
    if (dataOptions) {
        if (!isFunction(dataOptions)) {
            warn2(`The data option must be a function. Plain object usage is no longer supported.`);
        }
        const data = dataOptions.call(publicThis, publicThis);
        if (isPromise(data)) {
            warn2(`data() returned a Promise - note data() cannot be async; If you intend to perform data fetching before component renders, use async setup() + <Suspense>.`);
        }
        if (!isObject(data)) {
            warn2(`data() should return an object.`);
        } else {
            instance.data = reactive(data);
            if (true) {
                for (const key in data) {
                    checkDuplicateProperties("Data"/* DATA */
                    , key);
                    if (!isReservedPrefix(key[0])) {
                        Object.defineProperty(ctx, key, {
                            configurable: true,
                            enumerable: true,
                            get: () => data[key],
                            set: NOOP
                        });
                    }
                }
            }
        }
    }
    shouldCacheAccess = true;
    if (computedOptions) {
        for (const key in computedOptions) {
            const opt = computedOptions[key];
            const get = isFunction(opt) ? opt.bind(publicThis, publicThis) : isFunction(opt.get) ? opt.get.bind(publicThis, publicThis) : NOOP;
            if (get === NOOP) {
                warn2(`Computed property "${key}" has no getter.`);
            }
            const set = !isFunction(opt) && isFunction(opt.set) ? opt.set.bind(publicThis) : true ? () => {
                warn2(`Write operation failed: computed property "${key}" is readonly.`);
            }
            : NOOP;
            const c = computed2({
                get,
                set
            });
            Object.defineProperty(ctx, key, {
                enumerable: true,
                configurable: true,
                get: () => c.value,
                set: (v) => c.value = v
            });
            if (true) {
                checkDuplicateProperties("Computed"/* COMPUTED */
                , key);
            }
        }
    }
    if (watchOptions) {
        for (const key in watchOptions) {
            createWatcher(watchOptions[key], ctx, publicThis, key);
        }
    }
    if (provideOptions) {
        const provides = isFunction(provideOptions) ? provideOptions.call(publicThis) : provideOptions;
        Reflect.ownKeys(provides).forEach( (key) => {
            provide(key, provides[key]);
        }
        );
    }
    if (created) {
        callHook(created, instance, "c"/* CREATED */
        );
    }
    function registerLifecycleHook(register, hook) {
        if (isArray(hook)) {
            hook.forEach( (_hook) => register(_hook.bind(publicThis)));
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
    if (false) {
        if (beforeDestroy && softAssertCompatEnabled(DeprecationTypes.OPTIONS_BEFORE_DESTROY, instance)) {
            registerLifecycleHook(onBeforeUnmount, beforeDestroy);
        }
        if (destroyed && softAssertCompatEnabled(DeprecationTypes.OPTIONS_DESTROYED, instance)) {
            registerLifecycleHook(onUnmounted, destroyed);
        }
    }
    if (isArray(expose2)) {
        if (expose2.length) {
            const exposed = instance.exposed || (instance.exposed = {});
            expose2.forEach( (key) => {
                Object.defineProperty(exposed, key, {
                    get: () => publicThis[key],
                    set: (val) => publicThis[key] = val
                });
            }
            );
        } else if (!instance.exposed) {
            instance.exposed = {};
        }
    }
    if (render2 && instance.render === NOOP) {
        instance.render = render2;
    }
    if (inheritAttrs != null) {
        instance.inheritAttrs = inheritAttrs;
    }
    if (components)
        instance.components = components;
    if (directives)
        instance.directives = directives;
    if (false) {
        instance.filters = filters;
    }
    if (serverPrefetch) {
        markAsyncBoundary(instance);
    }
}
function resolveInjections(injectOptions, ctx, checkDuplicateProperties=NOOP) {
    if (isArray(injectOptions)) {
        injectOptions = normalizeInject(injectOptions);
    }
    for (const key in injectOptions) {
        const opt = injectOptions[key];
        let injected;
        if (isObject(opt)) {
            if ("default"in opt) {
                injected = inject(opt.from || key, opt.default, true);
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
        if (true) {
            checkDuplicateProperties("Inject"/* INJECT */
            , key);
        }
    }
}
function callHook(hook, instance, type) {
    callWithAsyncErrorHandling(isArray(hook) ? hook.map( (h2) => h2.bind(instance.proxy)) : hook.bind(instance.proxy), instance, type);
}
function createWatcher(raw, ctx, publicThis, key) {
    let getter = key.includes(".") ? createPathGetter(publicThis, key) : () => publicThis[key];
    const options = {};
    if (false) {
        const cur = getCurrentInstance();
        const instance = cur && getCurrentScope2() === cur.scope ? cur : null;
        const newValue = getter();
        if (isArray(newValue) && isCompatEnabled(DeprecationTypes.WATCH_ARRAY, instance)) {
            options.deep = true;
        }
        const baseGetter = getter;
        getter = () => {
            const val = baseGetter();
            if (isArray(val) && checkCompatEnabled(DeprecationTypes.WATCH_ARRAY, instance)) {
                traverse2(val);
            }
            return val;
        }
        ;
    }
    if (isString(raw)) {
        const handler = ctx[raw];
        if (isFunction(handler)) {
            if (false) {
                watch2(getter, handler, options);
            } else {
                watch2(getter, handler);
            }
        } else if (true) {
            warn2(`Invalid watch handler specified by key "${raw}"`, handler);
        }
    } else if (isFunction(raw)) {
        if (false) {
            watch2(getter, raw.bind(publicThis), options);
        } else {
            watch2(getter, raw.bind(publicThis));
        }
    } else if (isObject(raw)) {
        if (isArray(raw)) {
            raw.forEach( (r) => createWatcher(r, ctx, publicThis, key));
        } else {
            const handler = isFunction(raw.handler) ? raw.handler.bind(publicThis) : ctx[raw.handler];
            if (isFunction(handler)) {
                watch2(getter, handler, false ? extend(raw, options) : raw);
            } else if (true) {
                warn2(`Invalid watch handler specified by key "${raw.handler}"`, handler);
            }
        }
    } else if (true) {
        warn2(`Invalid watch option: "${key}"`, raw);
    }
}
function resolveMergedOptions(instance) {
    const base = instance.type;
    const {mixins, extends: extendsOptions} = base;
    const {mixins: globalMixins, optionsCache: cache, config: {optionMergeStrategies}} = instance.appContext;
    const cached = cache.get(base);
    let resolved;
    if (cached) {
        resolved = cached;
    } else if (!globalMixins.length && !mixins && !extendsOptions) {
        if (false) {
            resolved = extend({}, base);
            resolved.parent = instance.parent && instance.parent.proxy;
            resolved.propsData = instance.vnode.props;
        } else {
            resolved = base;
        }
    } else {
        resolved = {};
        if (globalMixins.length) {
            globalMixins.forEach( (m) => mergeOptions(resolved, m, optionMergeStrategies, true));
        }
        mergeOptions(resolved, base, optionMergeStrategies);
    }
    if (isObject(base)) {
        cache.set(base, resolved);
    }
    return resolved;
}
function mergeOptions(to, from, strats, asMixin=false) {
    if (false) {
        from = from.options;
    }
    const {mixins, extends: extendsOptions} = from;
    if (extendsOptions) {
        mergeOptions(to, extendsOptions, strats, true);
    }
    if (mixins) {
        mixins.forEach( (m) => mergeOptions(to, m, strats, true));
    }
    for (const key in from) {
        if (asMixin && key === "expose") {
            warn2(`"expose" option is ignored when declared in mixins or extends. It should only be declared in the base component itself.`);
        } else {
            const strat = internalOptionMergeStrats[key] || strats && strats[key];
            to[key] = strat ? strat(to[key], from[key]) : from[key];
        }
    }
    return to;
}
var internalOptionMergeStrats = {
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
if (false) {
    internalOptionMergeStrats.filters = mergeObjectOptions;
}
function mergeDataFn(to, from) {
    if (!from) {
        return to;
    }
    if (!to) {
        return from;
    }
    return function mergedDataFn() {
        return (false ? deepMergeData : extend)(isFunction(to) ? to.call(this, this) : to, isFunction(from) ? from.call(this, this) : from);
    }
    ;
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
    return to ? extend(/* @__PURE__ */
    Object.create(null), to, from) : from;
}
function mergeEmitsOrPropsOptions(to, from) {
    if (to) {
        if (isArray(to) && isArray(from)) {
            return [.../* @__PURE__ */
            new Set([...to, ...from])];
        }
        return extend(/* @__PURE__ */
        Object.create(null), normalizePropsOrEmits(to), normalizePropsOrEmits(from ?? {}));
    } else {
        return from;
    }
}
function mergeWatchOptions(to, from) {
    if (!to)
        return from;
    if (!from)
        return to;
    const merged = extend(/* @__PURE__ */
    Object.create(null), to);
    for (const key in from) {
        merged[key] = mergeAsArray(to[key], from[key]);
    }
    return merged;
}

// packages/runtime-core/src/apiCreateApp.ts
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
        provides: /* @__PURE__ */
        Object.create(null),
        optionsCache: /* @__PURE__ */
        new WeakMap(),
        propsCache: /* @__PURE__ */
        new WeakMap(),
        emitsCache: /* @__PURE__ */
        new WeakMap()
    };
}
var uid = 0;
function createAppAPI(mount, unmount, getPublicInstance2, render2) {
    return function createApp2(rootComponent, rootProps=null) {
        if (!isFunction(rootComponent)) {
            rootComponent = extend({}, rootComponent);
        }
        if (rootProps != null && !isObject(rootProps)) {
            warn2(`root props passed to app.mount() must be an object.`);
            rootProps = null;
        }
        const context = createAppContext();
        const installedPlugins = /* @__PURE__ */
        new WeakSet();
        const pluginCleanupFns = [];
        let isMounted = false;
        const app = context.app = {
            _uid: uid++,
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
                if (true) {
                    warn2(`app.config cannot be replaced. Modify individual options instead.`);
                }
            },
            use(plugin, ...options) {
                if (installedPlugins.has(plugin)) {
                    warn2(`Plugin has already been applied to target app.`);
                } else if (plugin && isFunction(plugin.install)) {
                    installedPlugins.add(plugin);
                    plugin.install(app, ...options);
                } else if (isFunction(plugin)) {
                    installedPlugins.add(plugin);
                    plugin(app, ...options);
                } else if (true) {
                    warn2(`A plugin must either be a function or an object with an "install" function.`);
                }
                return app;
            },
            mixin(mixin) {
                if (true) {
                    if (!context.mixins.includes(mixin)) {
                        context.mixins.push(mixin);
                    } else if (true) {
                        warn2("Mixin has already been applied to target app" + (mixin.name ? `: ${mixin.name}` : ""));
                    }
                } else if (true) {
                    warn2("Mixins are only available in builds supporting Options API");
                }
                return app;
            },
            component(name, component) {
                if (true) {
                    validateComponentName(name, context.config);
                }
                if (!component) {
                    return context.components[name];
                }
                if (context.components[name]) {
                    warn2(`Component "${name}" has already been registered in target app.`);
                }
                context.components[name] = component;
                return app;
            },
            directive(name, directive) {
                if (true) {
                    validateDirectiveName(name);
                }
                if (!directive) {
                    return context.directives[name];
                }
                if (context.directives[name]) {
                    warn2(`Directive "${name}" has already been registered in target app.`);
                }
                context.directives[name] = directive;
                return app;
            },
            mount(rootContainer, isHydrate, namespace) {
                if (!isMounted) {
                    if (rootContainer.__vue_app__) {
                        warn2(`There is already an app instance mounted on the host container.
 If you want to mount another app on the same host container, you need to unmount the previous app by calling \`app.unmount()\` first.`);
                    }
                    const instance = mount(app, rootContainer, isHydrate, namespace);
                    if (true) {
                        app._instance = instance;
                        devtoolsInitApp(app, version);
                    }
                    isMounted = true;
                    app._container = rootContainer;
                    rootContainer.__vue_app__ = app;
                    return getPublicInstance2(instance);
                } else if (true) {
                    warn2(`App has already been mounted.
If you want to remount the same app, move your app creation logic into a factory function and create fresh app instances for each mount - e.g. \`const createMyApp = () => createApp(App)\``);
                }
            },
            onUnmount(cleanupFn) {
                if (typeof cleanupFn !== "function") {
                    warn2(`Expected function as first argument to app.onUnmount(), but got ${typeof cleanupFn}`);
                }
                pluginCleanupFns.push(cleanupFn);
            },
            unmount() {
                if (isMounted) {
                    callWithAsyncErrorHandling(pluginCleanupFns, app._instance, 16 /* APP_UNMOUNT_CLEANUP */
                    );
                    unmount(app);
                    if (true) {
                        app._instance = null;
                        devtoolsUnmountApp(app);
                    }
                    delete app._container.__vue_app__;
                } else if (true) {
                    warn2(`Cannot unmount an app that is not mounted.`);
                }
            },
            provide(key, value) {
                if (key in context.provides) {
                    warn2(`App already provides property with key "${String(key)}". It will be overwritten with the new value.`);
                }
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
        if (false) {
            installAppCompatProperties(app, context, // vapor doesn't have compat mode so this is always passed
            render2);
        }
        return app;
    }
    ;
}
var currentApp = null;

// packages/runtime-core/src/apiInject.ts
function provide(key, value) {
    const currentInstance2 = getCurrentGenericInstance();
    if (!currentInstance2) {
        if (true) {
            warn2(`provide() can only be used inside setup().`);
        }
    } else {
        let provides = currentInstance2.provides;
        const parentProvides = currentInstance2.parent && currentInstance2.parent.provides;
        if (parentProvides === provides) {
            provides = currentInstance2.provides = Object.create(parentProvides);
        }
        provides[key] = value;
    }
}
function inject(key, defaultValue, treatDefaultAsFactory=false) {
    const instance = getCurrentGenericInstance();
    if (instance || currentApp) {
        const provides = currentApp ? currentApp._context.provides : instance ? instance.parent == null ? instance.appContext && instance.appContext.provides : instance.parent.provides : void 0;
        if (provides && key in provides) {
            return provides[key];
        } else if (arguments.length > 1) {
            return treatDefaultAsFactory && isFunction(defaultValue) ? defaultValue.call(instance && instance.proxy) : defaultValue;
        } else if (true) {
            warn2(`injection "${String(key)}" not found.`);
        }
    } else if (true) {
        warn2(`inject() can only be used inside setup() or functional components.`);
    }
}
function hasInjectionContext() {
    return !!(getCurrentGenericInstance() || currentApp);
}

// packages/runtime-core/src/helpers/useSsrContext.ts
var ssrContextKey = Symbol.for("v-scx");
var useSSRContext = () => {
    if (true) {
        const ctx = inject(ssrContextKey);
        if (!ctx) {
            warn2(`Server rendering context not provided. Make sure to only call useSSRContext() conditionally in the server build.`);
        }
        return ctx;
    } else if (true) {
        warn2(`useSSRContext() is not supported in the global build.`);
    }
}
;

// packages/runtime-core/src/apiWatch.ts
function watchEffect(effect2, options) {
    return doWatch(effect2, null, options);
}
function watchPostEffect(effect2, options) {
    return doWatch(effect2, null, true ? extend({}, options, {
        flush: "post"
    }) : {
        flush: "post"
    });
}
function watchSyncEffect(effect2, options) {
    return doWatch(effect2, null, true ? extend({}, options, {
        flush: "sync"
    }) : {
        flush: "sync"
    });
}
function watch2(source, cb, options) {
    if (!isFunction(cb)) {
        warn2(`\`watch(fn, options?)\` signature has been moved to a separate API. Use \`watchEffect(fn, options?)\` instead. \`watch\` now only supports \`watch(source, cb, options?) signature.`);
    }
    return doWatch(source, cb, options);
}
function doWatch(source, cb, options=EMPTY_OBJ) {
    const {immediate, deep, flush, once} = options;
    if (!cb) {
        if (immediate !== void 0) {
            warn2(`watch() "immediate" option is only respected when using the watch(source, callback, options?) signature.`);
        }
        if (deep !== void 0) {
            warn2(`watch() "deep" option is only respected when using the watch(source, callback, options?) signature.`);
        }
        if (once !== void 0) {
            warn2(`watch() "once" option is only respected when using the watch(source, callback, options?) signature.`);
        }
    }
    const baseWatchOptions = extend({}, options);
    if (true)
        baseWatchOptions.onWarn = warn2;
    const runsImmediately = cb && immediate || !cb && flush !== "post";
    let ssrCleanup;
    if (isInSSRComponentSetup) {
        if (flush === "sync") {
            const ctx = useSSRContext();
            ssrCleanup = ctx.__watcherHandles || (ctx.__watcherHandles = []);
        } else if (!runsImmediately) {
            const watchStopHandle = () => {}
            ;
            watchStopHandle.stop = NOOP;
            watchStopHandle.resume = NOOP;
            watchStopHandle.pause = NOOP;
            return watchStopHandle;
        }
    }
    const instance = currentInstance;
    baseWatchOptions.call = (fn, type, args) => callWithAsyncErrorHandling(fn, instance, type, args);
    let isPre = false;
    if (flush === "post") {
        baseWatchOptions.scheduler = (job) => {
            queuePostRenderEffect(job, instance && instance.suspense);
        }
        ;
    } else if (flush !== "sync") {
        isPre = true;
        baseWatchOptions.scheduler = (job, isFirstRun) => {
            if (isFirstRun) {
                job();
            } else {
                queueJob(job);
            }
        }
        ;
    }
    baseWatchOptions.augmentJob = (job) => {
        if (cb) {
            job.flags |= 4 /* ALLOW_RECURSE */
            ;
        }
        if (isPre) {
            job.flags |= 2 /* PRE */
            ;
            if (instance) {
                job.id = instance.uid;
                job.i = instance;
            }
        }
    }
    ;
    const watchHandle = watch(source, cb, baseWatchOptions);
    if (isInSSRComponentSetup) {
        if (ssrCleanup) {
            ssrCleanup.push(watchHandle);
        } else if (runsImmediately) {
            watchHandle();
        }
    }
    return watchHandle;
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
    const reset = setCurrentInstance(this);
    const res = doWatch(getter, cb.bind(publicThis), options);
    reset();
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
    }
    ;
}

// packages/runtime-core/src/helpers/useModel.ts
function useModel(props, name, options=EMPTY_OBJ) {
    const i = getCurrentInstance();
    if (!i) {
        warn2(`useModel() called without active instance.`);
        return ref();
    }
    const camelizedName = camelize(name);
    if (!i.propsOptions[0][camelizedName]) {
        warn2(`useModel() called with prop "${name}" which is not declared.`);
        return ref();
    }
    const hyphenatedName = hyphenate(name);
    const modifiers = getModelModifiers(props, camelizedName, defaultPropGetter);
    const res = customRef( (track2, trigger2) => {
        let localValue;
        let prevSetValue = EMPTY_OBJ;
        let prevEmittedValue;
        watchSyncEffect( () => {
            const propValue = props[camelizedName];
            if (hasChanged(localValue, propValue)) {
                localValue = propValue;
                trigger2();
            }
        }
        );
        return {
            get() {
                track2();
                return options.get ? options.get(localValue) : localValue;
            },
            set(value) {
                const emittedValue = options.set ? options.set(value) : value;
                if (!hasChanged(emittedValue, localValue) && !(prevSetValue !== EMPTY_OBJ && hasChanged(value, prevSetValue))) {
                    return;
                }
                const rawProps = i.vnode.props;
                if (!(rawProps && // check if parent has passed v-model
                (name in rawProps || camelizedName in rawProps || hyphenatedName in rawProps) && (`onUpdate:${name}`in rawProps || `onUpdate:${camelizedName}`in rawProps || `onUpdate:${hyphenatedName}`in rawProps))) {
                    localValue = value;
                    trigger2();
                }
                i.emit(`update:${name}`, emittedValue);
                if (hasChanged(value, emittedValue) && hasChanged(value, prevSetValue) && !hasChanged(emittedValue, prevEmittedValue)) {
                    trigger2();
                }
                prevSetValue = value;
                prevEmittedValue = emittedValue;
            }
        };
    }
    );
    res[Symbol.iterator] = () => {
        let i2 = 0;
        return {
            next() {
                if (i2 < 2) {
                    return {
                        value: i2++ ? modifiers || EMPTY_OBJ : res,
                        done: false
                    };
                } else {
                    return {
                        done: true
                    };
                }
            }
        };
    }
    ;
    return res;
}
var getModelModifiers = (props, modelName, getter) => {
    return modelName === "modelValue" || modelName === "model-value" ? getter(props, "modelModifiers") : getter(props, `${modelName}Modifiers`) || getter(props, `${camelize(modelName)}Modifiers`) || getter(props, `${hyphenate(modelName)}Modifiers`);
}
;

// packages/runtime-core/src/componentEmits.ts
function emit2(instance, event, ...rawArgs) {
    return baseEmit(instance, instance.vnode.props || EMPTY_OBJ, defaultPropGetter, event, ...rawArgs);
}
function baseEmit(instance, props, getter, event, ...rawArgs) {
    if (instance.isUnmounted)
        return;
    if (true) {
        const {emitsOptions, propsOptions} = instance;
        if (emitsOptions) {
            if (!(event in emitsOptions) && true) {
                if (!propsOptions || !propsOptions[0] || !(toHandlerKey(camelize(event))in propsOptions[0])) {
                    warn2(`Component emitted event "${event}" but it is neither declared in the emits option nor as an "${toHandlerKey(camelize(event))}" prop.`);
                }
            } else {
                const validator = emitsOptions[event];
                if (isFunction(validator)) {
                    const isValid = validator(...rawArgs);
                    if (!isValid) {
                        warn2(`Invalid event arguments: event validation failed for event "${event}".`);
                    }
                }
            }
        }
    }
    let args = rawArgs;
    const isModelListener2 = event.startsWith("update:");
    const modifiers = isModelListener2 && getModelModifiers(props, event.slice(7), getter);
    if (modifiers) {
        if (modifiers.trim) {
            args = rawArgs.map( (a) => isString(a) ? a.trim() : a);
        }
        if (modifiers.number) {
            args = rawArgs.map(looseToNumber);
        }
    }
    if (true) {
        devtoolsComponentEmit(instance, event, args);
    }
    if (true) {
        const lowerCaseEvent = event.toLowerCase();
        if (lowerCaseEvent !== event && getter(props, toHandlerKey(lowerCaseEvent))) {
            warn2(`Event "${lowerCaseEvent}" is emitted in component ${formatComponentName(instance, instance.type)} but the handler is registered for "${event}". Note that HTML attributes are case-insensitive and you cannot use v-on to listen to camelCase events when using in-DOM templates. You should probably use "${hyphenate(event)}" instead of "${event}".`);
        }
    }
    let handlerName;
    let handler = getter(props, handlerName = toHandlerKey(event)) || // also try camelCase event handler (#2249)
    getter(props, handlerName = toHandlerKey(camelize(event)));
    if (!handler && isModelListener2) {
        handler = getter(props, handlerName = toHandlerKey(hyphenate(event)));
    }
    if (handler) {
        callWithAsyncErrorHandling(handler, instance, 6 /* COMPONENT_EVENT_HANDLER */
        , args);
    }
    const onceHandler = getter(props, handlerName + `Once`);
    if (onceHandler) {
        if (!instance.emitted) {
            instance.emitted = {};
        } else if (instance.emitted[handlerName]) {
            return;
        }
        instance.emitted[handlerName] = true;
        callWithAsyncErrorHandling(onceHandler, instance, 6 /* COMPONENT_EVENT_HANDLER */
        , args);
    }
    if (false) {
        compatModelEmit(instance, event, args);
        return compatInstanceEmit(instance, event, args);
    }
}
function defaultPropGetter(props, key) {
    return props[key];
}
function normalizeEmitsOptions(comp, appContext, asMixin=false) {
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
            const normalizedFromExtend = normalizeEmitsOptions(raw2, appContext, true);
            if (normalizedFromExtend) {
                hasExtends = true;
                extend(normalized, normalizedFromExtend);
            }
        }
        ;
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
        raw.forEach( (key) => normalized[key] = null);
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
    if (false) {
        return true;
    }
    key = key.slice(2).replace(/Once$/, "");
    return hasOwn(options, key[0].toLowerCase() + key.slice(1)) || hasOwn(options, hyphenate(key)) || hasOwn(options, key);
}

// packages/runtime-core/src/componentRenderUtils.ts
var accessedAttrs = false;
function markAttrsAccessed() {
    accessedAttrs = true;
}
function renderComponentRoot(instance) {
    const {type: Component, vnode, proxy, withProxy, propsOptions: [propsOptions], slots, attrs, emit: emit4, render: render2, renderCache, props, data, setupState, ctx, inheritAttrs} = instance;
    const prev = setCurrentRenderingInstance(instance);
    let result;
    let fallthroughAttrs;
    if (true) {
        accessedAttrs = false;
    }
    try {
        if (vnode.shapeFlag & 4 /* STATEFUL_COMPONENT */
        ) {
            const proxyToUse = withProxy || proxy;
            const thisProxy = setupState.__isScriptSetup ? new Proxy(proxyToUse,{
                get(target, key, receiver) {
                    warn2(`Property '${String(key)}' was accessed via 'this'. Avoid using 'this' in templates.`);
                    return Reflect.get(target, key, receiver);
                }
            }) : proxyToUse;
            result = normalizeVNode(render2.call(thisProxy, proxyToUse, renderCache, true ? shallowReadonly(props) : props, setupState, data, ctx));
            fallthroughAttrs = attrs;
        } else {
            const render3 = Component;
            if (attrs === props) {
                markAttrsAccessed();
            }
            result = normalizeVNode(render3.length > 1 ? render3(true ? shallowReadonly(props) : props, true ? {
                get attrs() {
                    markAttrsAccessed();
                    return shallowReadonly(attrs);
                },
                slots,
                emit: emit4
            } : {
                attrs,
                slots,
                emit: emit4
            }) : render3(true ? shallowReadonly(props) : props, null));
            fallthroughAttrs = Component.props ? attrs : getFunctionalFallthrough(attrs);
        }
    } catch (err) {
        blockStack.length = 0;
        handleError(err, instance, 1 /* RENDER_FUNCTION */
        );
        result = createVNode(Comment2);
    }
    let root = result;
    let setRoot = void 0;
    if (result.patchFlag > 0 && result.patchFlag & 2048 /* DEV_ROOT_FRAGMENT */
    ) {
        ;[root,setRoot] = getChildRoot(result);
    }
    if (fallthroughAttrs && inheritAttrs !== false) {
        const keys = Object.keys(fallthroughAttrs);
        const {shapeFlag} = root;
        if (keys.length) {
            if (shapeFlag & (1 /* ELEMENT */
            | 6 /* COMPONENT */
            )) {
                if (propsOptions && keys.some(isModelListener)) {
                    fallthroughAttrs = filterModelListeners(fallthroughAttrs, propsOptions);
                }
                root = cloneVNode(root, fallthroughAttrs, false, true);
            } else if (!accessedAttrs && root.type !== Comment2) {
                const allAttrs = Object.keys(attrs);
                const eventAttrs = [];
                const extraAttrs = [];
                for (let i = 0, l = allAttrs.length; i < l; i++) {
                    const key = allAttrs[i];
                    if (isOn(key)) {
                        if (!isModelListener(key)) {
                            eventAttrs.push(key[2].toLowerCase() + key.slice(3));
                        }
                    } else {
                        extraAttrs.push(key);
                    }
                }
                if (extraAttrs.length) {
                    warn2(`Extraneous non-props attributes (${extraAttrs.join(", ")}) were passed to component but could not be automatically inherited because component renders fragment or text or teleport root nodes.`);
                }
                if (eventAttrs.length) {
                    warn2(`Extraneous non-emits event listeners (${eventAttrs.join(", ")}) were passed to component but could not be automatically inherited because component renders fragment or text root nodes. If the listener is intended to be a component custom event listener only, declare it using the "emits" option.`);
                }
            }
        }
    }
    if (false) {
        const {class: cls, style} = vnode.props || {};
        if (cls || style) {
            if (inheritAttrs === false) {
                warnDeprecation(DeprecationTypes.INSTANCE_ATTRS_CLASS_STYLE, instance, getComponentName(instance.type));
            }
            root = cloneVNode(root, {
                class: cls,
                style
            }, false, true);
        }
    }
    if (vnode.dirs) {
        if (!isElementRoot(root)) {
            warn2(`Runtime directive used on component with non-element root node. The directives will not function as intended.`);
        }
        root = cloneVNode(root, null, false, true);
        root.dirs = root.dirs ? root.dirs.concat(vnode.dirs) : vnode.dirs;
    }
    if (vnode.transition) {
        if (!isElementRoot(root)) {
            warn2(`Component inside <Transition> renders non-element root node that cannot be animated.`);
        }
        setTransitionHooks(root, vnode.transition);
    }
    if (setRoot) {
        setRoot(root);
    } else {
        result = root;
    }
    setCurrentRenderingInstance(prev);
    return result;
}
var getChildRoot = (vnode) => {
    const rawChildren = vnode.children;
    const dynamicChildren = vnode.dynamicChildren;
    const childRoot = filterSingleRoot(rawChildren, false);
    if (!childRoot) {
        return [vnode, void 0];
    } else if (childRoot.patchFlag > 0 && childRoot.patchFlag & 2048 /* DEV_ROOT_FRAGMENT */
    ) {
        return getChildRoot(childRoot);
    }
    const index = rawChildren.indexOf(childRoot);
    const dynamicIndex = dynamicChildren ? dynamicChildren.indexOf(childRoot) : -1;
    const setRoot = (updatedRoot) => {
        rawChildren[index] = updatedRoot;
        if (dynamicChildren) {
            if (dynamicIndex > -1) {
                dynamicChildren[dynamicIndex] = updatedRoot;
            } else if (updatedRoot.patchFlag > 0) {
                vnode.dynamicChildren = [...dynamicChildren, updatedRoot];
            }
        }
    }
    ;
    return [normalizeVNode(childRoot), setRoot];
}
;
function filterSingleRoot(children2, recurse=true) {
    let singleRoot;
    for (let i = 0; i < children2.length; i++) {
        const child = children2[i];
        if (isVNode(child)) {
            if (child.type !== Comment2 || child.children === "v-if") {
                if (singleRoot) {
                    return;
                } else {
                    singleRoot = child;
                    if (recurse && singleRoot.patchFlag > 0 && singleRoot.patchFlag & 2048 /* DEV_ROOT_FRAGMENT */
                    ) {
                        return filterSingleRoot(singleRoot.children);
                    }
                }
            }
        } else {
            return;
        }
    }
    return singleRoot;
}
var getFunctionalFallthrough = (attrs) => {
    let res;
    for (const key in attrs) {
        if (key === "class" || key === "style" || isOn(key)) {
            ;(res || (res = {}))[key] = attrs[key];
        }
    }
    return res;
}
;
var filterModelListeners = (attrs, props) => {
    const res = {};
    for (const key in attrs) {
        if (!isModelListener(key) || !(key.slice(9)in props)) {
            res[key] = attrs[key];
        }
    }
    return res;
}
;
var isElementRoot = (vnode) => {
    return vnode.shapeFlag & (6 /* COMPONENT */
    | 1 /* ELEMENT */
    ) || vnode.type === Comment2;
}
;
function shouldUpdateComponent(prevVNode, nextVNode, optimized) {
    const {props: prevProps, children: prevChildren, component} = prevVNode;
    const {props: nextProps, children: nextChildren, patchFlag} = nextVNode;
    const emits = component.emitsOptions;
    if ((prevChildren || nextChildren) && isHmrUpdating) {
        return true;
    }
    if (nextVNode.dirs || nextVNode.transition) {
        return true;
    }
    if (optimized && patchFlag >= 0) {
        if (patchFlag & 1024 /* DYNAMIC_SLOTS */
        ) {
            return true;
        }
        if (patchFlag & 16 /* FULL_PROPS */
        ) {
            if (!prevProps) {
                return !!nextProps;
            }
            return hasPropsChanged(prevProps, nextProps, emits);
        } else if (patchFlag & 8 /* PROPS */
        ) {
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
function updateHOCHostEl({vnode, parent}, el) {
    while (parent) {
        const root = parent.subTree;
        if (root.suspense && root.suspense.activeBranch === vnode) {
            root.el = vnode.el;
        }
        if (root === vnode) {
            ;(vnode = parent.vnode).el = el;
            parent = parent.parent;
        } else {
            break;
        }
    }
}

// packages/runtime-core/src/internalObject.ts
var internalObjectProto = {};
var createInternalObject = () => Object.create(internalObjectProto);
var isInternalObject = (obj) => Object.getPrototypeOf(obj) === internalObjectProto;

// packages/runtime-core/src/componentProps.ts
function initProps(instance, rawProps, isStateful, isSSR=false) {
    const props = instance.props = {};
    const attrs = createInternalObject();
    instance.propsDefaults = /* @__PURE__ */
    Object.create(null);
    setFullProps(instance, rawProps, props, attrs);
    for (const key in instance.propsOptions[0]) {
        if (!(key in props)) {
            props[key] = void 0;
        }
    }
    if (true) {
        validateProps(rawProps || {}, props, instance.propsOptions[0]);
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
function isInHmrContext(instance) {
    while (instance) {
        if (instance.type.__hmrId)
            return true;
        instance = instance.parent;
    }
}
function updateProps(instance, rawProps, rawPrevProps, optimized) {
    const {props, attrs, vnode: {patchFlag}} = instance;
    const rawCurrentProps = toRaw(props);
    const [options] = instance.propsOptions;
    let hasAttrsChanged = false;
    if (// always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    !isInHmrContext(instance) && (optimized || patchFlag > 0) && !(patchFlag & 16 /* FULL_PROPS */
    )) {
        if (patchFlag & 8 /* PROPS */
        ) {
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
                        props[camelizedKey] = resolvePropValue(options, camelizedKey, value, instance, baseResolveDefault);
                    }
                } else {
                    if (false) {
                        if (isOn2(key) && key.endsWith("Native")) {
                            key = key.slice(0, -6);
                        } else if (shouldSkipAttr(key, instance)) {
                            continue;
                        }
                    }
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
                        props[key] = resolvePropValue(options, key, void 0, instance, baseResolveDefault, true);
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
        trigger(instance.attrs, "set"/* SET */
        , "");
    }
    if (true) {
        validateProps(rawProps || {}, props, instance.propsOptions[0]);
    }
}
function setFullProps(instance, rawProps, props, attrs) {
    const [options,needCastKeys] = instance.propsOptions;
    let hasAttrsChanged = false;
    let rawCastValues;
    if (rawProps) {
        for (let key in rawProps) {
            if (isReservedProp(key)) {
                continue;
            }
            if (false) {
                if (key.startsWith("onHook:")) {
                    softAssertCompatEnabled(DeprecationTypes.INSTANCE_EVENT_HOOKS, instance, key.slice(2).toLowerCase());
                }
                if (key === "inline-template") {
                    continue;
                }
            }
            const value = rawProps[key];
            let camelKey;
            if (options && hasOwn(options, camelKey = camelize(key))) {
                if (!needCastKeys || !needCastKeys.includes(camelKey)) {
                    props[camelKey] = value;
                } else {
                    ;(rawCastValues || (rawCastValues = {}))[camelKey] = value;
                }
            } else if (!isEmitListener(instance.emitsOptions, key)) {
                if (false) {
                    if (isOn2(key) && key.endsWith("Native")) {
                        key = key.slice(0, -6);
                    } else if (shouldSkipAttr(key, instance)) {
                        continue;
                    }
                }
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
            props[key] = resolvePropValue(options, key, castValues[key], instance, baseResolveDefault, !hasOwn(castValues, key));
        }
    }
    return hasAttrsChanged;
}
function resolvePropValue(options, key, value, instance, resolveDefault2, isAbsent=false) {
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
                    value = cachedDefaults[key] = resolveDefault2(defaultValue, instance, key);
                }
            } else {
                value = defaultValue;
            }
            if (instance.ce) {
                instance.ce._setProp(key, value);
            }
        }
        if (opt[0 /* shouldCast */
        ]) {
            if (isAbsent && !hasDefault) {
                value = false;
            } else if (opt[1 /* shouldCastTrue */
            ] && (value === "" || value === hyphenate(key))) {
                value = true;
            }
        }
    }
    return value;
}
function baseResolveDefault(factory, instance, key) {
    let value;
    const reset = setCurrentInstance(instance);
    const props = toRaw(instance.props);
    value = factory.call(false ? createPropsDefaultThis(instance, props, key) : null, props);
    reset();
    return value;
}
var mixinPropsCache = /* @__PURE__ */
new WeakMap();
function normalizePropsOptions(comp, appContext, asMixin=false) {
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
            if (false) {
                raw2 = raw2.options;
            }
            hasExtends = true;
            const [props,keys] = normalizePropsOptions(raw2, appContext, true);
            extend(normalized, props);
            if (keys)
                needCastKeys.push(...keys);
        }
        ;
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
            if (!isString(raw[i])) {
                warn2(`props must be strings when using array syntax.`, raw[i]);
            }
            const normalizedKey = camelize(raw[i]);
            if (validatePropName(normalizedKey)) {
                normalized[normalizedKey] = EMPTY_OBJ;
            }
        }
    } else if (raw) {
        if (!isObject(raw)) {
            warn2(`invalid props options`, raw);
        }
        for (const key in raw) {
            const normalizedKey = camelize(key);
            if (validatePropName(normalizedKey)) {
                const opt = raw[key];
                const prop = normalized[normalizedKey] = isArray(opt) || isFunction(opt) ? {
                    type: opt
                } : extend({}, opt);
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
                prop[0 /* shouldCast */
                ] = shouldCast;
                prop[1 /* shouldCastTrue */
                ] = shouldCastTrue;
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
    } else if (true) {
        warn2(`Invalid prop name: "${key}" is a reserved property.`);
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
    const camelizePropsKey = Object.keys(rawProps).map( (key) => camelize(key));
    for (const key in options) {
        const opt = options[key];
        if (opt != null) {
            validateProp(key, resolvedProps[key], opt, resolvedProps, !camelizePropsKey.includes(key));
        }
    }
}
function validateProp(key, value, propOptions, resolvedProps, isAbsent) {
    const {type, required, validator, skipCheck} = propOptions;
    if (required && isAbsent) {
        warn2('Missing required prop: "' + key + '"');
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
            const {valid, expectedType} = assertType(value, types[i]);
            expectedTypes.push(expectedType || "");
            isValid = valid;
        }
        if (!isValid) {
            warn2(getInvalidTypeMessage(key, value, expectedTypes));
            return;
        }
    }
    if (validator && !validator(value, true ? shallowReadonly(resolvedProps) : resolvedProps)) {
        warn2('Invalid prop: custom validator check failed for prop "' + key + '".');
    }
}
var isSimpleType = /* @__PURE__ */
makeMap("String,Number,Boolean,Function,Symbol,BigInt");
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
    return explicitTypes.some( (elem) => type.toLowerCase() === elem);
}
function isBoolean(...args) {
    return args.some( (elem) => elem.toLowerCase() === "boolean");
}

// packages/runtime-core/src/componentSlots.ts
var isInternalKey = (key) => key[0] === "_" || key === "$stable";
var normalizeSlotValue = (value) => isArray(value) ? value.map(normalizeVNode) : [normalizeVNode(value)];
var normalizeSlot = (key, rawSlot, ctx) => {
    if (rawSlot._n) {
        return rawSlot;
    }
    const normalized = withCtx( (...args) => {
        if (currentInstance && !currentInstance.vapor && (!ctx || ctx.root === currentInstance.root)) {
            warn2(`Slot "${key}" invoked outside of the render function: this will not track dependencies used in the slot. Invoke the slot function inside the render function instead.`);
        }
        return normalizeSlotValue(rawSlot(...args));
    }
    , ctx);
    normalized._c = false;
    return normalized;
}
;
var normalizeObjectSlots = (rawSlots, slots, instance) => {
    const ctx = rawSlots._ctx;
    for (const key in rawSlots) {
        if (isInternalKey(key))
            continue;
        const value = rawSlots[key];
        if (isFunction(value)) {
            slots[key] = normalizeSlot(key, value, ctx);
        } else if (value != null) {
            if (true) {
                warn2(`Non-function value encountered for slot "${key}". Prefer function slots for better performance.`);
            }
            const normalized = normalizeSlotValue(value);
            slots[key] = () => normalized;
        }
    }
}
;
var normalizeVNodeSlots = (instance, children2) => {
    if (!isKeepAlive(instance.vnode) && true) {
        warn2(`Non-function value encountered for default slot. Prefer function slots for better performance.`);
    }
    const normalized = normalizeSlotValue(children2);
    instance.slots.default = () => normalized;
}
;
var assignSlots = (slots, children2, optimized) => {
    for (const key in children2) {
        if (optimized || key !== "_") {
            slots[key] = children2[key];
        }
    }
}
;
var initSlots = (instance, children2, optimized) => {
    const slots = instance.slots = createInternalObject();
    if (instance.vnode.shapeFlag & 32 /* SLOTS_CHILDREN */
    ) {
        const type = children2._;
        if (type) {
            assignSlots(slots, children2, optimized);
            if (optimized) {
                def(slots, "_", type, true);
            }
        } else {
            normalizeObjectSlots(children2, slots, instance);
        }
    } else if (children2) {
        normalizeVNodeSlots(instance, children2);
    }
}
;
var updateSlots = (instance, children2, optimized) => {
    const {vnode, slots} = instance;
    let needDeletionCheck = true;
    let deletionComparisonTarget = EMPTY_OBJ;
    if (vnode.shapeFlag & 32 /* SLOTS_CHILDREN */
    ) {
        const type = children2._;
        if (type) {
            if (isHmrUpdating) {
                assignSlots(slots, children2, optimized);
                trigger(instance, "set"/* SET */
                , "$slots");
            } else if (optimized && type === 1 /* STABLE */
            ) {
                needDeletionCheck = false;
            } else {
                assignSlots(slots, children2, optimized);
            }
        } else {
            needDeletionCheck = !children2.$stable;
            normalizeObjectSlots(children2, slots, instance);
        }
        deletionComparisonTarget = children2;
    } else if (children2) {
        normalizeVNodeSlots(instance, children2);
        deletionComparisonTarget = {
            default: 1
        };
    }
    if (needDeletionCheck) {
        for (const key in slots) {
            if (!isInternalKey(key) && deletionComparisonTarget[key] == null) {
                delete slots[key];
            }
        }
    }
}
;

// packages/runtime-core/src/profiling.ts
var supported;
var perf;
function startMeasure(instance, type) {
    if (instance.appContext.config.performance && isSupported()) {
        perf.mark(`vue-${type}-${instance.uid}`);
    }
    if (true) {
        devtoolsPerfStart(instance, type, isSupported() ? perf.now() : Date.now());
    }
}
function endMeasure(instance, type) {
    if (instance.appContext.config.performance && isSupported()) {
        const startTag = `vue-${type}-${instance.uid}`;
        const endTag = startTag + `:end`;
        perf.mark(endTag);
        perf.measure(`<${formatComponentName(instance, instance.type)}> ${type}`, startTag, endTag);
        perf.clearMarks(startTag);
        perf.clearMarks(endTag);
    }
    if (true) {
        devtoolsPerfEnd(instance, type, isSupported() ? perf.now() : Date.now());
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

// packages/runtime-core/src/featureFlags.ts
var initialized = false;
function initFeatureFlags() {
    if (initialized)
        return;
    const needWarn = [];
    if (false) {
        needWarn.push(`__VUE_OPTIONS_API__`);
        getGlobalThis().__VUE_OPTIONS_API__ = true;
    }
    if (false) {
        needWarn.push(`__VUE_PROD_DEVTOOLS__`);
        getGlobalThis().__VUE_PROD_DEVTOOLS__ = false;
    }
    if (false) {
        needWarn.push(`__VUE_PROD_HYDRATION_MISMATCH_DETAILS__`);
        getGlobalThis().__VUE_PROD_HYDRATION_MISMATCH_DETAILS__ = false;
    }
    if (needWarn.length) {
        const multi = needWarn.length > 1;
        console.warn(`Feature flag${multi ? `s` : ``} ${needWarn.join(", ")} ${multi ? `are` : `is`} not explicitly defined. You are running the esm-bundler build of Vue, which expects these compile-time feature flags to be globally injected via the bundler config in order to get better tree-shaking in the production bundle.

For more details, see https://link.vuejs.org/feature-flags.`);
    }
    initialized = true;
}

// packages/runtime-core/src/renderer.ts
var queuePostRenderEffect = true ? false ? (// vitest can't seem to handle eager circular dependency
(fn, suspense) => queueEffectWithSuspense(fn, suspense)) : queueEffectWithSuspense : queuePostFlushCb2;
function createRenderer(options) {
    return baseCreateRenderer(options);
}
function createHydrationRenderer(options) {
    return baseCreateRenderer(options, createHydrationFunctions);
}
function baseCreateRenderer(options, createHydrationFns) {
    if (false) {
        initFeatureFlags();
    }
    const target = getGlobalThis();
    target.__VUE__ = true;
    if (true) {
        setDevtoolsHook(target.__VUE_DEVTOOLS_GLOBAL_HOOK__, target);
    }
    const {insert: hostInsert, remove: hostRemove, patchProp: hostPatchProp, createElement: hostCreateElement, createText: hostCreateText, createComment: hostCreateComment, setText: hostSetText, setElementText: hostSetElementText, parentNode: hostParentNode, nextSibling: hostNextSibling, setScopeId: hostSetScopeId=NOOP, insertStaticContent: hostInsertStaticContent} = options;
    const patch = (n1, n2, container, anchor=null, parentComponent=null, parentSuspense=null, namespace=void 0, slotScopeIds=null, optimized=isHmrUpdating ? false : !!n2.dynamicChildren) => {
        if (n1 === n2) {
            return;
        }
        if (n1 && !isSameVNodeType(n1, n2)) {
            anchor = getNextHostNode(n1);
            unmount(n1, parentComponent, parentSuspense, true);
            n1 = null;
        }
        if (n2.patchFlag === -2 /* BAIL */
        ) {
            optimized = false;
            n2.dynamicChildren = null;
        }
        const {type, ref: ref2, shapeFlag} = n2;
        switch (type) {
        case Text:
            processText(n1, n2, container, anchor);
            break;
        case Comment2:
            processCommentNode(n1, n2, container, anchor);
            break;
        case Static:
            if (n1 == null) {
                mountStaticNode(n2, container, anchor, namespace);
            } else if (true) {
                patchStaticNode(n1, n2, container, namespace);
            }
            break;
        case Fragment:
            processFragment(n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
            break;
        default:
            if (shapeFlag & 1 /* ELEMENT */
            ) {
                processElement(n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
            } else if (shapeFlag & 6 /* COMPONENT */
            ) {
                processComponent(n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
            } else if (shapeFlag & 64 /* TELEPORT */
            ) {
                ;type.process(n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized, internals);
            } else if (shapeFlag & 128 /* SUSPENSE */
            ) {
                ;type.process(n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized, internals);
            } else if (true) {
                warn2("Invalid VNode type:", type, `(${typeof type})`);
            }
        }
        if (ref2 != null && parentComponent) {
            setRef(ref2, n1 && n1.ref, parentSuspense, n2 || n1, !n2);
        }
    }
    ;
    const processText = (n1, n2, container, anchor) => {
        if (n1 == null) {
            hostInsert(n2.el = hostCreateText(n2.children), container, anchor);
        } else {
            const el = n2.el = n1.el;
            if (n2.children !== n1.children) {
                hostSetText(el, n2.children);
            }
        }
    }
    ;
    const processCommentNode = (n1, n2, container, anchor) => {
        if (n1 == null) {
            hostInsert(n2.el = hostCreateComment(n2.children || ""), container, anchor);
        } else {
            n2.el = n1.el;
        }
    }
    ;
    const mountStaticNode = (n2, container, anchor, namespace) => {
        ;[n2.el,n2.anchor] = hostInsertStaticContent(n2.children, container, anchor, namespace, n2.el, n2.anchor);
    }
    ;
    const patchStaticNode = (n1, n2, container, namespace) => {
        if (n2.children !== n1.children) {
            const anchor = hostNextSibling(n1.anchor);
            removeStaticNode(n1);
            [n2.el,n2.anchor] = hostInsertStaticContent(n2.children, container, anchor, namespace);
        } else {
            n2.el = n1.el;
            n2.anchor = n1.anchor;
        }
    }
    ;
    const moveStaticNode = ({el, anchor}, container, nextSibling) => {
        let next2;
        while (el && el !== anchor) {
            next2 = hostNextSibling(el);
            hostInsert(el, container, nextSibling);
            el = next2;
        }
        hostInsert(anchor, container, nextSibling);
    }
    ;
    const removeStaticNode = ({el, anchor}) => {
        let next2;
        while (el && el !== anchor) {
            next2 = hostNextSibling(el);
            hostRemove(el);
            el = next2;
        }
        hostRemove(anchor);
    }
    ;
    const processElement = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
        if (n2.type === "svg") {
            namespace = "svg";
        } else if (n2.type === "math") {
            namespace = "mathml";
        }
        if (n1 == null) {
            mountElement(n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
        } else {
            patchElement(n1, n2, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
        }
    }
    ;
    const mountElement = (vnode, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
        let el;
        let vnodeHook;
        const {props, shapeFlag, transition, dirs} = vnode;
        el = vnode.el = hostCreateElement(vnode.type, namespace, props && props.is, props);
        if (shapeFlag & 8 /* TEXT_CHILDREN */
        ) {
            hostSetElementText(el, vnode.children);
        } else if (shapeFlag & 16 /* ARRAY_CHILDREN */
        ) {
            mountChildren(vnode.children, el, null, parentComponent, parentSuspense, resolveChildrenNamespace(vnode, namespace), slotScopeIds, optimized);
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
            if ("value"in props) {
                hostPatchProp(el, "value", null, props.value, namespace);
            }
            if (vnodeHook = props.onVnodeBeforeMount) {
                invokeVNodeHook(vnodeHook, parentComponent, vnode);
            }
        }
        if (true) {
            def(el, "__vnode", vnode, true);
            def(el, "__vueParentComponent", parentComponent, true);
        }
        if (dirs) {
            invokeDirectiveHook(vnode, null, parentComponent, "beforeMount");
        }
        const needCallTransitionHooks = needTransition(parentSuspense, transition);
        if (needCallTransitionHooks) {
            transition.beforeEnter(el);
        }
        hostInsert(el, container, anchor);
        if ((vnodeHook = props && props.onVnodeMounted) || needCallTransitionHooks || dirs) {
            queuePostRenderEffect( () => {
                vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
                needCallTransitionHooks && transition.enter(el);
                dirs && invokeDirectiveHook(vnode, null, parentComponent, "mounted");
            }
            , parentSuspense);
        }
    }
    ;
    const setScopeId = (el, vnode, scopeId, slotScopeIds, parentComponent) => {
        if (scopeId) {
            hostSetScopeId(el, scopeId);
        }
        if (slotScopeIds) {
            for (let i = 0; i < slotScopeIds.length; i++) {
                hostSetScopeId(el, slotScopeIds[i]);
            }
        }
        if (parentComponent) {
            let subTree = parentComponent.subTree;
            if (subTree.patchFlag > 0 && subTree.patchFlag & 2048 /* DEV_ROOT_FRAGMENT */
            ) {
                subTree = filterSingleRoot(subTree.children) || subTree;
            }
            if (vnode === subTree || isSuspense(subTree.type) && (subTree.ssContent === vnode || subTree.ssFallback === vnode)) {
                const parentVNode = parentComponent.vnode;
                setScopeId(el, parentVNode, parentVNode.scopeId, parentVNode.slotScopeIds, parentComponent.parent);
            }
        }
    }
    ;
    const mountChildren = (children2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized, start=0) => {
        for (let i = start; i < children2.length; i++) {
            const child = children2[i] = optimized ? cloneIfMounted(children2[i]) : normalizeVNode(children2[i]);
            patch(null, child, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
        }
    }
    ;
    const patchElement = (n1, n2, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
        const el = n2.el = n1.el;
        if (true) {
            el.__vnode = n2;
        }
        let {patchFlag, dynamicChildren, dirs} = n2;
        patchFlag |= n1.patchFlag & 16 /* FULL_PROPS */
        ;
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
        if (isHmrUpdating) {
            patchFlag = 0;
            optimized = false;
            dynamicChildren = null;
        }
        if (oldProps.innerHTML && newProps.innerHTML == null || oldProps.textContent && newProps.textContent == null) {
            hostSetElementText(el, "");
        }
        if (dynamicChildren) {
            patchBlockChildren(n1.dynamicChildren, dynamicChildren, el, parentComponent, parentSuspense, resolveChildrenNamespace(n2, namespace), slotScopeIds);
            if (true) {
                traverseStaticChildren(n1, n2);
            }
        } else if (!optimized) {
            patchChildren(n1, n2, el, null, parentComponent, parentSuspense, resolveChildrenNamespace(n2, namespace), slotScopeIds, false);
        }
        if (patchFlag > 0) {
            if (patchFlag & 16 /* FULL_PROPS */
            ) {
                patchProps(el, oldProps, newProps, parentComponent, namespace);
            } else {
                if (patchFlag & 2 /* CLASS */
                ) {
                    if (oldProps.class !== newProps.class) {
                        hostPatchProp(el, "class", null, newProps.class, namespace);
                    }
                }
                if (patchFlag & 4 /* STYLE */
                ) {
                    hostPatchProp(el, "style", oldProps.style, newProps.style, namespace);
                }
                if (patchFlag & 8 /* PROPS */
                ) {
                    const propsToUpdate = n2.dynamicProps;
                    for (let i = 0; i < propsToUpdate.length; i++) {
                        const key = propsToUpdate[i];
                        const prev = oldProps[key];
                        const next2 = newProps[key];
                        if (next2 !== prev || key === "value") {
                            hostPatchProp(el, key, prev, next2, namespace, parentComponent);
                        }
                    }
                }
            }
            if (patchFlag & 1 /* TEXT */
            ) {
                if (n1.children !== n2.children) {
                    hostSetElementText(el, n2.children);
                }
            }
        } else if (!optimized && dynamicChildren == null) {
            patchProps(el, oldProps, newProps, parentComponent, namespace);
        }
        if ((vnodeHook = newProps.onVnodeUpdated) || dirs) {
            queuePostRenderEffect( () => {
                vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
                dirs && invokeDirectiveHook(n2, n1, parentComponent, "updated");
            }
            , parentSuspense);
        }
    }
    ;
    const patchBlockChildren = (oldChildren, newChildren, fallbackContainer, parentComponent, parentSuspense, namespace, slotScopeIds) => {
        for (let i = 0; i < newChildren.length; i++) {
            const oldVNode = oldChildren[i];
            const newVNode = newChildren[i];
            const container = (// oldVNode may be an errored async setup() component inside Suspense
            // which will not have a mounted element
            oldVNode.el && // - In the case of a Fragment, we need to provide the actual parent
            // of the Fragment itself so it can move its children.
            (oldVNode.type === Fragment || // - In the case of different nodes, there is going to be a replacement
            // which also requires the correct parent container
            !isSameVNodeType(oldVNode, newVNode) || // - In the case of a component, it could contain anything.
            oldVNode.shapeFlag & (6 /* COMPONENT */
            | 64 /* TELEPORT */
            )) ? hostParentNode(oldVNode.el) : (// In other cases, the parent container is not actually used so we
            // just pass the block element here to avoid a DOM parentNode call.
            fallbackContainer));
            patch(oldVNode, newVNode, container, null, parentComponent, parentSuspense, namespace, slotScopeIds, true);
        }
    }
    ;
    const patchProps = (el, oldProps, newProps, parentComponent, namespace) => {
        if (oldProps !== newProps) {
            if (oldProps !== EMPTY_OBJ) {
                for (const key in oldProps) {
                    if (!isReservedProp(key) && !(key in newProps)) {
                        hostPatchProp(el, key, oldProps[key], null, namespace, parentComponent);
                    }
                }
            }
            for (const key in newProps) {
                if (isReservedProp(key))
                    continue;
                const next2 = newProps[key];
                const prev = oldProps[key];
                if (next2 !== prev && key !== "value") {
                    hostPatchProp(el, key, prev, next2, namespace, parentComponent);
                }
            }
            if ("value"in newProps) {
                hostPatchProp(el, "value", oldProps.value, newProps.value, namespace);
            }
        }
    }
    ;
    const processFragment = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
        const fragmentStartAnchor = n2.el = n1 ? n1.el : hostCreateText("");
        const fragmentEndAnchor = n2.anchor = n1 ? n1.anchor : hostCreateText("");
        let {patchFlag, dynamicChildren, slotScopeIds: fragmentSlotScopeIds} = n2;
        if (// #5523 dev root fragment may inherit directives
        isHmrUpdating || patchFlag & 2048 /* DEV_ROOT_FRAGMENT */
        ) {
            patchFlag = 0;
            optimized = false;
            dynamicChildren = null;
        }
        if (fragmentSlotScopeIds) {
            slotScopeIds = slotScopeIds ? slotScopeIds.concat(fragmentSlotScopeIds) : fragmentSlotScopeIds;
        }
        if (n1 == null) {
            hostInsert(fragmentStartAnchor, container, anchor);
            hostInsert(fragmentEndAnchor, container, anchor);
            mountChildren(// #10007
            // such fragment like `<></>` will be compiled into
            // a fragment which doesn't have a children.
            // In this case fallback to an empty array
            n2.children || [], container, fragmentEndAnchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
        } else {
            if (patchFlag > 0 && patchFlag & 64 /* STABLE_FRAGMENT */
            && dynamicChildren && // #2715 the previous fragment could've been a BAILed one as a result
            // of renderSlot() with no valid children
            n1.dynamicChildren) {
                patchBlockChildren(n1.dynamicChildren, dynamicChildren, container, parentComponent, parentSuspense, namespace, slotScopeIds);
                if (true) {
                    traverseStaticChildren(n1, n2);
                } else if (// #2080 if the stable fragment has a key, it's a <template v-for> that may
                //  get moved around. Make sure all root level vnodes inherit el.
                // #2134 or if it's a component root, it may also get moved around
                // as the component is being moved.
                n2.key != null || parentComponent && n2 === parentComponent.subTree) {
                    traverseStaticChildren(n1, n2, true /* shallow */
                    );
                }
            } else {
                patchChildren(n1, n2, container, fragmentEndAnchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
            }
        }
    }
    ;
    const processComponent = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
        n2.slotScopeIds = slotScopeIds;
        if (n1 == null) {
            if (n2.shapeFlag & 512 /* COMPONENT_KEPT_ALIVE */
            ) {
                ;parentComponent.ctx.activate(n2, container, anchor, namespace, optimized);
            } else {
                mountComponent2(n2, container, anchor, parentComponent, parentSuspense, namespace, optimized);
            }
        } else {
            updateComponent(n1, n2, optimized);
        }
    }
    ;
    const mountComponent2 = (initialVNode, container, anchor, parentComponent, parentSuspense, namespace, optimized) => {
        const compatMountInstance = false;
        const instance = compatMountInstance || (initialVNode.component = createComponentInstance(initialVNode, parentComponent, parentSuspense));
        if (instance.type.__hmrId) {
            registerHMR(instance);
        }
        if (true) {
            pushWarningContext(initialVNode);
            startMeasure(instance, `mount`);
        }
        if (isKeepAlive(initialVNode)) {
            ;instance.ctx.renderer = internals;
        }
        if (true) {
            if (true) {
                startMeasure(instance, `init`);
            }
            setupComponent(instance, false, optimized);
            if (true) {
                endMeasure(instance, `init`);
            }
        }
        if (instance.asyncDep) {
            if (isHmrUpdating)
                initialVNode.el = null;
            parentSuspense && parentSuspense.registerDep(instance, setupRenderEffect, optimized);
            if (!initialVNode.el) {
                const placeholder = instance.subTree = createVNode(Comment2);
                processCommentNode(null, placeholder, container, anchor);
            }
        } else {
            setupRenderEffect(instance, initialVNode, container, anchor, parentSuspense, namespace, optimized);
        }
        if (true) {
            popWarningContext();
            endMeasure(instance, `mount`);
        }
    }
    ;
    const updateComponent = (n1, n2, optimized) => {
        const instance = n2.component = n1.component;
        if (shouldUpdateComponent(n1, n2, optimized)) {
            if (instance.asyncDep && !instance.asyncResolved) {
                if (true) {
                    pushWarningContext(n2);
                }
                updateComponentPreRender(instance, n2, optimized);
                if (true) {
                    popWarningContext();
                }
                return;
            } else {
                instance.next = n2;
                instance.update();
            }
        } else {
            n2.el = n1.el;
            instance.vnode = n2;
        }
    }
    ;
    const setupRenderEffect = (instance, initialVNode, container, anchor, parentSuspense, namespace, optimized) => {
        const componentUpdateFn = () => {
            if (!instance.isMounted) {
                let vnodeHook;
                const {el, props} = initialVNode;
                const {bm, m, parent, root, type} = instance;
                const isAsyncWrapperVNode = isAsyncWrapper(initialVNode);
                toggleRecurse(instance, false);
                if (bm) {
                    invokeArrayFns(bm);
                }
                if (!isAsyncWrapperVNode && (vnodeHook = props && props.onVnodeBeforeMount)) {
                    invokeVNodeHook(vnodeHook, parent, initialVNode);
                }
                if (false) {
                    instance.emit("hook:beforeMount");
                }
                toggleRecurse(instance, true);
                if (el && hydrateNode) {
                    const hydrateSubTree = () => {
                        if (true) {
                            startMeasure(instance, `render`);
                        }
                        instance.subTree = renderComponentRoot(instance);
                        if (true) {
                            endMeasure(instance, `render`);
                        }
                        if (true) {
                            startMeasure(instance, `hydrate`);
                        }
                        hydrateNode(el, instance.subTree, instance, parentSuspense, null);
                        if (true) {
                            endMeasure(instance, `hydrate`);
                        }
                    }
                    ;
                    if (isAsyncWrapperVNode && type.__asyncHydrate) {
                        ;type.__asyncHydrate(el, instance, hydrateSubTree);
                    } else {
                        hydrateSubTree();
                    }
                } else {
                    if (root.ce) {
                        root.ce._injectChildStyle(type);
                    }
                    if (true) {
                        startMeasure(instance, `render`);
                    }
                    const subTree = instance.subTree = renderComponentRoot(instance);
                    if (true) {
                        endMeasure(instance, `render`);
                    }
                    if (true) {
                        startMeasure(instance, `patch`);
                    }
                    patch(null, subTree, container, anchor, instance, parentSuspense, namespace);
                    if (true) {
                        endMeasure(instance, `patch`);
                    }
                    initialVNode.el = subTree.el;
                }
                if (m) {
                    queuePostRenderEffect(m, parentSuspense);
                }
                if (!isAsyncWrapperVNode && (vnodeHook = props && props.onVnodeMounted)) {
                    const scopedInitialVNode = initialVNode;
                    queuePostRenderEffect( () => invokeVNodeHook(vnodeHook, parent, scopedInitialVNode), parentSuspense);
                }
                if (false) {
                    queuePostRenderEffect( () => instance.emit("hook:mounted"), parentSuspense);
                }
                if (initialVNode.shapeFlag & 256 /* COMPONENT_SHOULD_KEEP_ALIVE */
                || parent && isAsyncWrapper(parent.vnode) && parent.vnode.shapeFlag & 256 /* COMPONENT_SHOULD_KEEP_ALIVE */
                ) {
                    instance.a && queuePostRenderEffect(instance.a, parentSuspense);
                    if (false) {
                        queuePostRenderEffect( () => instance.emit("hook:activated"), parentSuspense);
                    }
                }
                instance.isMounted = true;
                if (true) {
                    devtoolsComponentAdded(instance);
                }
                initialVNode = container = anchor = null;
            } else {
                let {next: next2, bu, u, parent, vnode} = instance;
                if (true) {
                    const nonHydratedAsyncRoot = locateNonHydratedAsyncRoot(instance);
                    if (nonHydratedAsyncRoot) {
                        if (next2) {
                            next2.el = vnode.el;
                            updateComponentPreRender(instance, next2, optimized);
                        }
                        nonHydratedAsyncRoot.asyncDep.then( () => {
                            if (!instance.isUnmounted) {
                                componentUpdateFn();
                            }
                        }
                        );
                        return;
                    }
                }
                let originNext = next2;
                let vnodeHook;
                if (true) {
                    pushWarningContext(next2 || instance.vnode);
                }
                toggleRecurse(instance, false);
                if (next2) {
                    next2.el = vnode.el;
                    updateComponentPreRender(instance, next2, optimized);
                } else {
                    next2 = vnode;
                }
                if (bu) {
                    invokeArrayFns(bu);
                }
                if (vnodeHook = next2.props && next2.props.onVnodeBeforeUpdate) {
                    invokeVNodeHook(vnodeHook, parent, next2, vnode);
                }
                if (false) {
                    instance.emit("hook:beforeUpdate");
                }
                toggleRecurse(instance, true);
                if (true) {
                    startMeasure(instance, `render`);
                }
                const nextTree = renderComponentRoot(instance);
                if (true) {
                    endMeasure(instance, `render`);
                }
                const prevTree = instance.subTree;
                instance.subTree = nextTree;
                if (true) {
                    startMeasure(instance, `patch`);
                }
                patch(prevTree, nextTree, // parent may have changed if it's in a teleport
                hostParentNode(prevTree.el), // anchor may have changed if it's in a fragment
                getNextHostNode(prevTree), instance, parentSuspense, namespace);
                if (true) {
                    endMeasure(instance, `patch`);
                }
                next2.el = nextTree.el;
                if (originNext === null) {
                    updateHOCHostEl(instance, nextTree.el);
                }
                if (u) {
                    queuePostRenderEffect(u, parentSuspense);
                }
                if (vnodeHook = next2.props && next2.props.onVnodeUpdated) {
                    queuePostRenderEffect( () => invokeVNodeHook(vnodeHook, parent, next2, vnode), parentSuspense);
                }
                if (false) {
                    queuePostRenderEffect( () => instance.emit("hook:updated"), parentSuspense);
                }
                if (true) {
                    devtoolsComponentUpdated(instance);
                }
                if (true) {
                    popWarningContext();
                }
            }
        }
        ;
        instance.scope.on();
        const effect2 = instance.effect = new ReactiveEffect(componentUpdateFn);
        instance.scope.off();
        const update = instance.update = effect2.run.bind(effect2);
        const job = instance.job = effect2.runIfDirty.bind(effect2);
        job.i = instance;
        job.id = instance.uid;
        effect2.scheduler = () => queueJob(job);
        toggleRecurse(instance, true);
        if (true) {
            effect2.onTrack = instance.rtc ? (e) => invokeArrayFns(instance.rtc, e) : void 0;
            effect2.onTrigger = instance.rtg ? (e) => invokeArrayFns(instance.rtg, e) : void 0;
        }
        update();
    }
    ;
    const updateComponentPreRender = (instance, nextVNode, optimized) => {
        nextVNode.component = instance;
        const prevProps = instance.vnode.props;
        instance.vnode = nextVNode;
        instance.next = null;
        updateProps(instance, nextVNode.props, prevProps, optimized);
        updateSlots(instance, nextVNode.children, optimized);
        pauseTracking();
        flushPreFlushCbs(instance);
        resetTracking();
    }
    ;
    const patchChildren = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized=false) => {
        const c1 = n1 && n1.children;
        const prevShapeFlag = n1 ? n1.shapeFlag : 0;
        const c2 = n2.children;
        const {patchFlag, shapeFlag} = n2;
        if (patchFlag > 0) {
            if (patchFlag & 128 /* KEYED_FRAGMENT */
            ) {
                patchKeyedChildren(c1, c2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
                return;
            } else if (patchFlag & 256 /* UNKEYED_FRAGMENT */
            ) {
                patchUnkeyedChildren(c1, c2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
                return;
            }
        }
        if (shapeFlag & 8 /* TEXT_CHILDREN */
        ) {
            if (prevShapeFlag & 16 /* ARRAY_CHILDREN */
            ) {
                unmountChildren(c1, parentComponent, parentSuspense);
            }
            if (c2 !== c1) {
                hostSetElementText(container, c2);
            }
        } else {
            if (prevShapeFlag & 16 /* ARRAY_CHILDREN */
            ) {
                if (shapeFlag & 16 /* ARRAY_CHILDREN */
                ) {
                    patchKeyedChildren(c1, c2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
                } else {
                    unmountChildren(c1, parentComponent, parentSuspense, true);
                }
            } else {
                if (prevShapeFlag & 8 /* TEXT_CHILDREN */
                ) {
                    hostSetElementText(container, "");
                }
                if (shapeFlag & 16 /* ARRAY_CHILDREN */
                ) {
                    mountChildren(c2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
                }
            }
        }
    }
    ;
    const patchUnkeyedChildren = (c1, c2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
        c1 = c1 || EMPTY_ARR;
        c2 = c2 || EMPTY_ARR;
        const oldLength = c1.length;
        const newLength = c2.length;
        const commonLength = Math.min(oldLength, newLength);
        let i;
        for (i = 0; i < commonLength; i++) {
            const nextChild = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
            patch(c1[i], nextChild, container, null, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
        }
        if (oldLength > newLength) {
            unmountChildren(c1, parentComponent, parentSuspense, true, false, commonLength);
        } else {
            mountChildren(c2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized, commonLength);
        }
    }
    ;
    const patchKeyedChildren = (c1, c2, container, parentAnchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
        let i = 0;
        const l2 = c2.length;
        let e1 = c1.length - 1;
        let e2 = l2 - 1;
        while (i <= e1 && i <= e2) {
            const n1 = c1[i];
            const n2 = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
            if (isSameVNodeType(n1, n2)) {
                patch(n1, n2, container, null, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
            } else {
                break;
            }
            i++;
        }
        while (i <= e1 && i <= e2) {
            const n1 = c1[e1];
            const n2 = c2[e2] = optimized ? cloneIfMounted(c2[e2]) : normalizeVNode(c2[e2]);
            if (isSameVNodeType(n1, n2)) {
                patch(n1, n2, container, null, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
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
                    patch(null, c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]), container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
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
            const keyToNewIndexMap = /* @__PURE__ */
            new Map();
            for (i = s2; i <= e2; i++) {
                const nextChild = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
                if (nextChild.key != null) {
                    if (keyToNewIndexMap.has(nextChild.key)) {
                        warn2(`Duplicate keys found during update:`, JSON.stringify(nextChild.key), `Make sure keys are unique.`);
                    }
                    keyToNewIndexMap.set(nextChild.key, i);
                }
            }
            let j;
            let patched = 0;
            const toBePatched = e2 - s2 + 1;
            let moved = false;
            let maxNewIndexSoFar = 0;
            const newIndexToOldIndexMap = new Array(toBePatched);
            for (i = 0; i < toBePatched; i++)
                newIndexToOldIndexMap[i] = 0;
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
                    patch(prevChild, c2[newIndex], container, null, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
                    patched++;
                }
            }
            const increasingNewIndexSequence = moved ? getSequence(newIndexToOldIndexMap) : EMPTY_ARR;
            j = increasingNewIndexSequence.length - 1;
            for (i = toBePatched - 1; i >= 0; i--) {
                const nextIndex = s2 + i;
                const nextChild = c2[nextIndex];
                const anchor = nextIndex + 1 < l2 ? c2[nextIndex + 1].el : parentAnchor;
                if (newIndexToOldIndexMap[i] === 0) {
                    patch(null, nextChild, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
                } else if (moved) {
                    if (j < 0 || i !== increasingNewIndexSequence[j]) {
                        move(nextChild, container, anchor, 2 /* REORDER */
                        );
                    } else {
                        j--;
                    }
                }
            }
        }
    }
    ;
    const move = (vnode, container, anchor, moveType, parentSuspense=null) => {
        const {el, type, transition, children: children2, shapeFlag} = vnode;
        if (shapeFlag & 6 /* COMPONENT */
        ) {
            move(vnode.component.subTree, container, anchor, moveType);
            return;
        }
        if (shapeFlag & 128 /* SUSPENSE */
        ) {
            vnode.suspense.move(container, anchor, moveType);
            return;
        }
        if (shapeFlag & 64 /* TELEPORT */
        ) {
            ;type.move(vnode, container, anchor, internals);
            return;
        }
        if (type === Fragment) {
            hostInsert(el, container, anchor);
            for (let i = 0; i < children2.length; i++) {
                move(children2[i], container, anchor, moveType);
            }
            hostInsert(vnode.anchor, container, anchor);
            return;
        }
        if (type === Static) {
            moveStaticNode(vnode, container, anchor);
            return;
        }
        const needTransition2 = moveType !== 2 /* REORDER */
        && shapeFlag & 1 /* ELEMENT */
        && transition;
        if (needTransition2) {
            if (moveType === 0 /* ENTER */
            ) {
                transition.beforeEnter(el);
                hostInsert(el, container, anchor);
                queuePostRenderEffect( () => transition.enter(el), parentSuspense);
            } else {
                const {leave, delayLeave, afterLeave} = transition;
                const remove4 = () => hostInsert(el, container, anchor);
                const performLeave = () => {
                    leave(el, () => {
                        remove4();
                        afterLeave && afterLeave();
                    }
                    );
                }
                ;
                if (delayLeave) {
                    delayLeave(el, remove4, performLeave);
                } else {
                    performLeave();
                }
            }
        } else {
            hostInsert(el, container, anchor);
        }
    }
    ;
    const unmount = (vnode, parentComponent, parentSuspense, doRemove=false, optimized=false) => {
        const {type, props, ref: ref2, children: children2, dynamicChildren, shapeFlag, patchFlag, dirs, cacheIndex} = vnode;
        if (patchFlag === -2 /* BAIL */
        ) {
            optimized = false;
        }
        if (ref2 != null) {
            setRef(ref2, null, parentSuspense, vnode, true);
        }
        if (cacheIndex != null) {
            parentComponent.renderCache[cacheIndex] = void 0;
        }
        if (shapeFlag & 256 /* COMPONENT_SHOULD_KEEP_ALIVE */
        ) {
            ;parentComponent.ctx.deactivate(vnode);
            return;
        }
        const shouldInvokeDirs = shapeFlag & 1 /* ELEMENT */
        && dirs;
        const shouldInvokeVnodeHook = !isAsyncWrapper(vnode);
        let vnodeHook;
        if (shouldInvokeVnodeHook && (vnodeHook = props && props.onVnodeBeforeUnmount)) {
            invokeVNodeHook(vnodeHook, parentComponent, vnode);
        }
        if (shapeFlag & 6 /* COMPONENT */
        ) {
            unmountComponent2(vnode.component, parentSuspense, doRemove);
        } else {
            if (shapeFlag & 128 /* SUSPENSE */
            ) {
                vnode.suspense.unmount(parentSuspense, doRemove);
                return;
            }
            if (shouldInvokeDirs) {
                invokeDirectiveHook(vnode, null, parentComponent, "beforeUnmount");
            }
            if (shapeFlag & 64 /* TELEPORT */
            ) {
                ;vnode.type.remove(vnode, parentComponent, parentSuspense, internals, doRemove);
            } else if (dynamicChildren && // #5154
            // when v-once is used inside a block, setBlockTracking(-1) marks the
            // parent block with hasOnce: true
            // so that it doesn't take the fast path during unmount - otherwise
            // components nested in v-once are never unmounted.
            !dynamicChildren.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
            (type !== Fragment || patchFlag > 0 && patchFlag & 64 /* STABLE_FRAGMENT */
            )) {
                unmountChildren(dynamicChildren, parentComponent, parentSuspense, false, true);
            } else if (type === Fragment && patchFlag & (128 /* KEYED_FRAGMENT */
            | 256 /* UNKEYED_FRAGMENT */
            ) || !optimized && shapeFlag & 16 /* ARRAY_CHILDREN */
            ) {
                unmountChildren(children2, parentComponent, parentSuspense);
            }
            if (doRemove) {
                remove3(vnode);
            }
        }
        if (shouldInvokeVnodeHook && (vnodeHook = props && props.onVnodeUnmounted) || shouldInvokeDirs) {
            queuePostRenderEffect( () => {
                vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
                shouldInvokeDirs && invokeDirectiveHook(vnode, null, parentComponent, "unmounted");
            }
            , parentSuspense);
        }
    }
    ;
    const remove3 = (vnode) => {
        const {type, el, anchor, transition} = vnode;
        if (type === Fragment) {
            if (vnode.patchFlag > 0 && vnode.patchFlag & 2048 /* DEV_ROOT_FRAGMENT */
            && transition && !transition.persisted) {
                ;vnode.children.forEach( (child) => {
                    if (child.type === Comment2) {
                        hostRemove(child.el);
                    } else {
                        remove3(child);
                    }
                }
                );
            } else {
                removeFragment(el, anchor);
            }
            return;
        }
        if (type === Static) {
            removeStaticNode(vnode);
            return;
        }
        const performRemove = () => {
            hostRemove(el);
            if (transition && !transition.persisted && transition.afterLeave) {
                transition.afterLeave();
            }
        }
        ;
        if (vnode.shapeFlag & 1 /* ELEMENT */
        && transition && !transition.persisted) {
            const {leave, delayLeave} = transition;
            const performLeave = () => leave(el, performRemove);
            if (delayLeave) {
                delayLeave(vnode.el, performRemove, performLeave);
            } else {
                performLeave();
            }
        } else {
            performRemove();
        }
    }
    ;
    const removeFragment = (cur, end) => {
        let next2;
        while (cur !== end) {
            next2 = hostNextSibling(cur);
            hostRemove(cur);
            cur = next2;
        }
        hostRemove(end);
    }
    ;
    const unmountComponent2 = (instance, parentSuspense, doRemove) => {
        if (instance.type.__hmrId) {
            unregisterHMR(instance);
        }
        const {bum, scope, job, subTree, um, m, a} = instance;
        invalidateMount(m);
        invalidateMount(a);
        if (bum) {
            invokeArrayFns(bum);
        }
        if (false) {
            instance.emit("hook:beforeDestroy");
        }
        scope.stop();
        if (job) {
            job.flags |= 8 /* DISPOSED */
            ;
            unmount(subTree, instance, parentSuspense, doRemove);
        }
        if (um) {
            queuePostRenderEffect(um, parentSuspense);
        }
        if (false) {
            queuePostRenderEffect( () => instance.emit("hook:destroyed"), parentSuspense);
        }
        queuePostRenderEffect( () => {
            instance.isUnmounted = true;
        }
        , parentSuspense);
        if (parentSuspense && parentSuspense.pendingBranch && !parentSuspense.isUnmounted && instance.asyncDep && !instance.asyncResolved && instance.suspenseId === parentSuspense.pendingId) {
            parentSuspense.deps--;
            if (parentSuspense.deps === 0) {
                parentSuspense.resolve();
            }
        }
        if (true) {
            devtoolsComponentRemoved(instance);
        }
    }
    ;
    const unmountChildren = (children2, parentComponent, parentSuspense, doRemove=false, optimized=false, start=0) => {
        for (let i = start; i < children2.length; i++) {
            unmount(children2[i], parentComponent, parentSuspense, doRemove, optimized);
        }
    }
    ;
    const getNextHostNode = (vnode) => {
        if (vnode.shapeFlag & 6 /* COMPONENT */
        ) {
            return getNextHostNode(vnode.component.subTree);
        }
        if (vnode.shapeFlag & 128 /* SUSPENSE */
        ) {
            return vnode.suspense.next();
        }
        const el = hostNextSibling(vnode.anchor || vnode.el);
        const teleportEnd = el && el[TeleportEndKey];
        return teleportEnd ? hostNextSibling(teleportEnd) : el;
    }
    ;
    const render2 = (vnode, container, namespace) => {
        if (vnode == null) {
            if (container._vnode) {
                unmount(container._vnode, null, null, true);
            }
        } else {
            patch(container._vnode || null, vnode, container, null, null, null, namespace);
        }
        container._vnode = vnode;
        flushOnAppMount();
    }
    ;
    const internals = {
        p: patch,
        um: unmount,
        m: move,
        r: remove3,
        mt: mountComponent2,
        mc: mountChildren,
        pc: patchChildren,
        pbc: patchBlockChildren,
        n: getNextHostNode,
        o: options
    };
    let hydrate2;
    let hydrateNode;
    if (createHydrationFns) {
        ;[hydrate2,hydrateNode] = createHydrationFns(internals);
    }
    const mountApp2 = (app, container, isHydrate, namespace) => {
        const vnode = app._ceVNode || createVNode(app._component, app._props);
        vnode.appContext = app._context;
        if (namespace === true) {
            namespace = "svg";
        } else if (namespace === false) {
            namespace = void 0;
        }
        if (true) {
            app._context.reload = () => {
                render2(cloneVNode(vnode), container, namespace);
            }
            ;
        }
        if (isHydrate && hydrate2) {
            hydrate2(vnode, container);
        } else {
            render2(vnode, container, namespace);
        }
        return vnode.component;
    }
    ;
    const unmountApp2 = (app) => {
        render2(null, app._container);
    }
    ;
    return {
        render: render2,
        hydrate: hydrate2,
        createApp: createAppAPI(mountApp2, unmountApp2, getComponentPublicInstance, render2)
    };
}
function resolveChildrenNamespace({type, props}, currentNamespace) {
    return currentNamespace === "svg" && type === "foreignObject" || currentNamespace === "mathml" && type === "annotation-xml" && props && props.encoding && props.encoding.includes("html") ? void 0 : currentNamespace;
}
function toggleRecurse({effect: effect2, job}, allowed) {
    if (allowed) {
        effect2.flags |= 32 /* ALLOW_RECURSE */
        ;
        job.flags |= 4 /* ALLOW_RECURSE */
        ;
    } else {
        effect2.flags &= ~32 /* ALLOW_RECURSE */
        ;
        job.flags &= ~4 /* ALLOW_RECURSE */
        ;
    }
}
function needTransition(parentSuspense, transition) {
    return (!parentSuspense || parentSuspense && !parentSuspense.pendingBranch) && transition && !transition.persisted;
}
function traverseStaticChildren(n1, n2, shallow=false) {
    const ch1 = n1.children;
    const ch2 = n2.children;
    if (isArray(ch1) && isArray(ch2)) {
        for (let i = 0; i < ch1.length; i++) {
            const c1 = ch1[i];
            let c2 = ch2[i];
            if (c2.shapeFlag & 1 /* ELEMENT */
            && !c2.dynamicChildren) {
                if (c2.patchFlag <= 0 || c2.patchFlag === 32 /* NEED_HYDRATION */
                ) {
                    c2 = ch2[i] = cloneIfMounted(ch2[i]);
                    c2.el = c1.el;
                }
                if (!shallow && c2.patchFlag !== -2 /* BAIL */
                )
                    traverseStaticChildren(c1, c2);
            }
            if (c2.type === Text) {
                c2.el = c1.el;
            }
            if (c2.type === Comment2 && !c2.el) {
                c2.el = c1.el;
            }
        }
    }
}
function getSequence(arr) {
    const p2 = arr.slice();
    const result = [0];
    let i, j, u, v, c;
    const len = arr.length;
    for (i = 0; i < len; i++) {
        const arrI = arr[i];
        if (arrI !== 0) {
            j = result[result.length - 1];
            if (arr[j] < arrI) {
                p2[i] = j;
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
                    p2[i] = result[u - 1];
                }
                result[u] = i;
            }
        }
    }
    u = result.length;
    v = result[u - 1];
    while (u-- > 0) {
        result[u] = v;
        v = p2[v];
    }
    return result;
}
function locateNonHydratedAsyncRoot(instance) {
    const subComponent = instance.subTree.component;
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
            hooks[i].flags |= 8 /* DISPOSED */
            ;
    }
}

// packages/runtime-core/src/components/Suspense.ts
var isSuspense = (type) => type.__isSuspense;
var suspenseId = 0;
var SuspenseImpl = {
    name: "Suspense",
    // In order to make Suspense tree-shakable, we need to avoid importing it
    // directly in the renderer. The renderer checks for the __isSuspense flag
    // on a vnode's type and calls the `process` method, passing in renderer
    // internals.
    __isSuspense: true,
    process(n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized, rendererInternals) {
        if (n1 == null) {
            mountSuspense(n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized, rendererInternals);
        } else {
            if (parentSuspense && parentSuspense.deps > 0 && !n1.suspense.isInFallback) {
                n2.suspense = n1.suspense;
                n2.suspense.vnode = n2;
                n2.el = n1.el;
                return;
            }
            patchSuspense(n1, n2, container, anchor, parentComponent, namespace, slotScopeIds, optimized, rendererInternals);
        }
    },
    hydrate: hydrateSuspense,
    normalize: normalizeSuspenseChildren
};
var Suspense = true ? SuspenseImpl : null;
function triggerEvent(vnode, name) {
    const eventListener = vnode.props && vnode.props[name];
    if (isFunction(eventListener)) {
        eventListener();
    }
}
function mountSuspense(vnode, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized, rendererInternals) {
    const {p: patch, o: {createElement}} = rendererInternals;
    const hiddenContainer = createElement("div");
    const suspense = vnode.suspense = createSuspenseBoundary(vnode, parentSuspense, parentComponent, container, hiddenContainer, anchor, namespace, slotScopeIds, optimized, rendererInternals);
    patch(null, suspense.pendingBranch = vnode.ssContent, hiddenContainer, null, parentComponent, suspense, namespace, slotScopeIds);
    if (suspense.deps > 0) {
        triggerEvent(vnode, "onPending");
        triggerEvent(vnode, "onFallback");
        patch(null, vnode.ssFallback, container, anchor, parentComponent, null, // fallback tree will not have suspense context
        namespace, slotScopeIds);
        setActiveBranch(suspense, vnode.ssFallback);
    } else {
        suspense.resolve(false, true);
    }
}
function patchSuspense(n1, n2, container, anchor, parentComponent, namespace, slotScopeIds, optimized, {p: patch, um: unmount, o: {createElement}}) {
    const suspense = n2.suspense = n1.suspense;
    suspense.vnode = n2;
    n2.el = n1.el;
    const newBranch = n2.ssContent;
    const newFallback = n2.ssFallback;
    const {activeBranch, pendingBranch, isInFallback, isHydrating} = suspense;
    if (pendingBranch) {
        suspense.pendingBranch = newBranch;
        if (isSameVNodeType(newBranch, pendingBranch)) {
            patch(pendingBranch, newBranch, suspense.hiddenContainer, null, parentComponent, suspense, namespace, slotScopeIds, optimized);
            if (suspense.deps <= 0) {
                suspense.resolve();
            } else if (isInFallback) {
                if (!isHydrating) {
                    patch(activeBranch, newFallback, container, anchor, parentComponent, null, // fallback tree will not have suspense context
                    namespace, slotScopeIds, optimized);
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
                patch(null, newBranch, suspense.hiddenContainer, null, parentComponent, suspense, namespace, slotScopeIds, optimized);
                if (suspense.deps <= 0) {
                    suspense.resolve();
                } else {
                    patch(activeBranch, newFallback, container, anchor, parentComponent, null, // fallback tree will not have suspense context
                    namespace, slotScopeIds, optimized);
                    setActiveBranch(suspense, newFallback);
                }
            } else if (activeBranch && isSameVNodeType(newBranch, activeBranch)) {
                patch(activeBranch, newBranch, container, anchor, parentComponent, suspense, namespace, slotScopeIds, optimized);
                suspense.resolve(true);
            } else {
                patch(null, newBranch, suspense.hiddenContainer, null, parentComponent, suspense, namespace, slotScopeIds, optimized);
                if (suspense.deps <= 0) {
                    suspense.resolve();
                }
            }
        }
    } else {
        if (activeBranch && isSameVNodeType(newBranch, activeBranch)) {
            patch(activeBranch, newBranch, container, anchor, parentComponent, suspense, namespace, slotScopeIds, optimized);
            setActiveBranch(suspense, newBranch);
        } else {
            triggerEvent(n2, "onPending");
            suspense.pendingBranch = newBranch;
            if (newBranch.shapeFlag & 512 /* COMPONENT_KEPT_ALIVE */
            ) {
                suspense.pendingId = newBranch.component.suspenseId;
            } else {
                suspense.pendingId = suspenseId++;
            }
            patch(null, newBranch, suspense.hiddenContainer, null, parentComponent, suspense, namespace, slotScopeIds, optimized);
            if (suspense.deps <= 0) {
                suspense.resolve();
            } else {
                const {timeout, pendingId} = suspense;
                if (timeout > 0) {
                    setTimeout( () => {
                        if (suspense.pendingId === pendingId) {
                            suspense.fallback(newFallback);
                        }
                    }
                    , timeout);
                } else if (timeout === 0) {
                    suspense.fallback(newFallback);
                }
            }
        }
    }
}
var hasWarned = false;
function createSuspenseBoundary(vnode, parentSuspense, parentComponent, container, hiddenContainer, anchor, namespace, slotScopeIds, optimized, rendererInternals, isHydrating=false) {
    if (!hasWarned) {
        hasWarned = true;
        console[console.info ? "info" : "log"](`<Suspense> is an experimental feature and its API will likely change.`);
    }
    const {p: patch, m: move, um: unmount, n: next2, o: {parentNode, remove: remove3}} = rendererInternals;
    let parentSuspenseId;
    const isSuspensible = isVNodeSuspensible(vnode);
    if (isSuspensible) {
        if (parentSuspense && parentSuspense.pendingBranch) {
            parentSuspenseId = parentSuspense.pendingId;
            parentSuspense.deps++;
        }
    }
    const timeout = vnode.props ? toNumber(vnode.props.timeout) : void 0;
    if (true) {
        assertNumber(timeout, `Suspense timeout`);
    }
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
        resolve(resume=false, sync=false) {
            if (true) {
                if (!resume && !suspense.pendingBranch) {
                    throw new Error(`suspense.resolve() is called without a pending branch.`);
                }
                if (suspense.isUnmounted) {
                    throw new Error(`suspense.resolve() is called on an already unmounted suspense boundary.`);
                }
            }
            const {vnode: vnode2, activeBranch, pendingBranch, pendingId, effects, parentComponent: parentComponent2, container: container2} = suspense;
            let delayEnter = false;
            if (suspense.isHydrating) {
                suspense.isHydrating = false;
            } else if (!resume) {
                delayEnter = activeBranch && pendingBranch.transition && pendingBranch.transition.mode === "out-in";
                if (delayEnter) {
                    activeBranch.transition.afterLeave = () => {
                        if (pendingId === suspense.pendingId) {
                            move(pendingBranch, container2, anchor === initialAnchor ? next2(activeBranch) : anchor, 0 /* ENTER */
                            );
                            queuePostFlushCb(effects);
                        }
                    }
                    ;
                }
                if (activeBranch) {
                    if (parentNode(activeBranch.el) === container2) {
                        anchor = next2(activeBranch);
                    }
                    unmount(activeBranch, parentComponent2, suspense, true);
                }
                if (!delayEnter) {
                    move(pendingBranch, container2, anchor, 0 /* ENTER */
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
            const {vnode: vnode2, activeBranch, parentComponent: parentComponent2, container: container2, namespace: namespace2} = suspense;
            triggerEvent(vnode2, "onFallback");
            const anchor2 = next2(activeBranch);
            const mountFallback = () => {
                if (!suspense.isInFallback) {
                    return;
                }
                patch(null, fallbackVNode, container2, anchor2, parentComponent2, null, // fallback tree will not have suspense context
                namespace2, slotScopeIds, optimized);
                setActiveBranch(suspense, fallbackVNode);
            }
            ;
            const delayEnter = fallbackVNode.transition && fallbackVNode.transition.mode === "out-in";
            if (delayEnter) {
                activeBranch.transition.afterLeave = mountFallback;
            }
            suspense.isInFallback = true;
            unmount(activeBranch, parentComponent2, null, // no suspense so unmount hooks fire now
            true // shouldRemove
            );
            if (!delayEnter) {
                mountFallback();
            }
        },
        move(container2, anchor2, type) {
            suspense.activeBranch && move(suspense.activeBranch, container2, anchor2, type);
            suspense.container = container2;
        },
        next() {
            return suspense.activeBranch && next2(suspense.activeBranch);
        },
        registerDep(instance, setupRenderEffect, optimized2) {
            const isInPendingSuspense = !!suspense.pendingBranch;
            if (isInPendingSuspense) {
                suspense.deps++;
            }
            const hydratedEl = instance.vnode.el;
            instance.asyncDep.catch( (err) => {
                handleError(err, instance, 0 /* SETUP_FUNCTION */
                );
            }
            ).then( (asyncSetupResult) => {
                if (instance.isUnmounted || suspense.isUnmounted || suspense.pendingId !== instance.suspenseId) {
                    return;
                }
                instance.asyncResolved = true;
                const {vnode: vnode2} = instance;
                if (true) {
                    pushWarningContext(vnode2);
                }
                handleSetupResult(instance, asyncSetupResult, false);
                if (hydratedEl) {
                    vnode2.el = hydratedEl;
                }
                const placeholder = !hydratedEl && instance.subTree.el;
                setupRenderEffect(instance, vnode2, // component may have been moved before resolve.
                // if this is not a hydration, instance.subTree will be the comment
                // placeholder.
                parentNode(hydratedEl || instance.subTree.el), // anchor will not be used if this is hydration, so only need to
                // consider the comment placeholder case.
                hydratedEl ? null : next2(instance.subTree), suspense, namespace, optimized2);
                if (placeholder) {
                    remove3(placeholder);
                }
                updateHOCHostEl(instance, vnode2.el);
                if (true) {
                    popWarningContext();
                }
                if (isInPendingSuspense && --suspense.deps === 0) {
                    suspense.resolve();
                }
            }
            );
        },
        unmount(parentSuspense2, doRemove) {
            suspense.isUnmounted = true;
            if (suspense.activeBranch) {
                unmount(suspense.activeBranch, parentComponent, parentSuspense2, doRemove);
            }
            if (suspense.pendingBranch) {
                unmount(suspense.pendingBranch, parentComponent, parentSuspense2, doRemove);
            }
        }
    };
    return suspense;
}
function hydrateSuspense(node, vnode, parentComponent, parentSuspense, namespace, slotScopeIds, optimized, rendererInternals, hydrateNode) {
    const suspense = vnode.suspense = createSuspenseBoundary(vnode, parentSuspense, parentComponent, node.parentNode, // eslint-disable-next-line no-restricted-globals
    document.createElement("div"), null, namespace, slotScopeIds, optimized, rendererInternals, true);
    const result = hydrateNode(node, suspense.pendingBranch = vnode.ssContent, parentComponent, suspense, slotScopeIds, optimized);
    if (suspense.deps === 0) {
        suspense.resolve(false, true);
    }
    return result;
}
function normalizeSuspenseChildren(vnode) {
    const {shapeFlag, children: children2} = vnode;
    const isSlotChildren = shapeFlag & 32 /* SLOTS_CHILDREN */
    ;
    vnode.ssContent = normalizeSuspenseSlot(isSlotChildren ? children2.default : children2);
    vnode.ssFallback = isSlotChildren ? normalizeSuspenseSlot(children2.fallback) : createVNode(Comment2);
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
        if (!singleChild && s.filter( (child) => child !== NULL_DYNAMIC_COMPONENT).length > 0) {
            warn2(`<Suspense> slots expect a single root node.`);
        }
        s = singleChild;
    }
    s = normalizeVNode(s);
    if (block && !s.dynamicChildren) {
        s.dynamicChildren = block.filter( (c) => c !== s);
    }
    return s;
}
function queueEffectWithSuspense(fn, suspense) {
    if (suspense && suspense.pendingBranch) {
        if (isArray(fn)) {
            suspense.effects.push(...fn);
        } else {
            suspense.effects.push(fn);
        }
    } else {
        queuePostFlushCb(fn);
    }
}
function setActiveBranch(suspense, branch) {
    suspense.activeBranch = branch;
    const {vnode, parentComponent} = suspense;
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

// packages/runtime-core/src/vnode.ts
var Fragment = Symbol.for("v-fgt");
var Text = Symbol.for("v-txt");
var Comment2 = Symbol.for("v-cmt");
var Static = Symbol.for("v-stc");
var blockStack = [];
var currentBlock = null;
function openBlock(disableTracking=false) {
    blockStack.push(currentBlock = disableTracking ? null : []);
}
function closeBlock() {
    blockStack.pop();
    currentBlock = blockStack[blockStack.length - 1] || null;
}
var isBlockTreeEnabled = 1;
function setBlockTracking(value, inVOnce=false) {
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
function createElementBlock(type, props, children2, patchFlag, dynamicProps, shapeFlag) {
    return setupBlock(createBaseVNode(type, props, children2, patchFlag, dynamicProps, shapeFlag, true));
}
function createBlock(type, props, children2, patchFlag, dynamicProps) {
    return setupBlock(createVNode(type, props, children2, patchFlag, dynamicProps, true));
}
function isVNode(value) {
    return value ? value.__v_isVNode === true : false;
}
function isSameVNodeType(n1, n2) {
    if (n2.shapeFlag & 6 /* COMPONENT */
    && n1.component) {
        const dirtyInstances = hmrDirtyComponents.get(n2.type);
        if (dirtyInstances && dirtyInstances.has(n1.component)) {
            n1.shapeFlag &= ~256 /* COMPONENT_SHOULD_KEEP_ALIVE */
            ;
            n2.shapeFlag &= ~512 /* COMPONENT_KEPT_ALIVE */
            ;
            return false;
        }
    }
    return n1.type === n2.type && n1.key === n2.key;
}
var vnodeArgsTransformer;
function transformVNodeArgs(transformer) {
    vnodeArgsTransformer = transformer;
}
var createVNodeWithArgsTransform = (...args) => {
    return _createVNode(...vnodeArgsTransformer ? vnodeArgsTransformer(args, currentRenderingInstance) : args);
}
;
var normalizeKey = ({key}) => key != null ? key : null;
var normalizeRef = ({ref: ref2, ref_key, ref_for}) => {
    if (typeof ref2 === "number") {
        ref2 = "" + ref2;
    }
    return ref2 != null ? isString(ref2) || isRef(ref2) || isFunction(ref2) ? {
        i: currentRenderingInstance,
        r: ref2,
        k: ref_key,
        f: !!ref_for
    } : ref2 : null;
}
;
function createBaseVNode(type, props=null, children2=null, patchFlag=0, dynamicProps=null, shapeFlag=type === Fragment ? 0 : 1 /* ELEMENT */
, isBlockNode=false, needFullChildrenNormalization=false) {
    const vnode = {
        __v_isVNode: true,
        __v_skip: true,
        type,
        props,
        key: props && normalizeKey(props),
        ref: props && normalizeRef(props),
        scopeId: currentScopeId,
        slotScopeIds: null,
        children: children2,
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
        normalizeChildren(vnode, children2);
        if (shapeFlag & 128 /* SUSPENSE */
        ) {
            ;type.normalize(vnode);
        }
    } else if (children2) {
        vnode.shapeFlag |= isString(children2) ? 8 /* TEXT_CHILDREN */
        : 16 /* ARRAY_CHILDREN */
        ;
    }
    if (vnode.key !== vnode.key) {
        warn2(`VNode created with invalid key (NaN). VNode type:`, vnode.type);
    }
    if (isBlockTreeEnabled > 0 && // avoid a block node from tracking itself
    !isBlockNode && // has current parent block
    currentBlock && // presence of a patch flag indicates this node needs patching on updates.
    // component nodes also should always be patched, because even if the
    // component doesn't need to update, it needs to persist the instance on to
    // the next vnode so that it can be properly unmounted later.
    (vnode.patchFlag > 0 || shapeFlag & 6 /* COMPONENT */
    ) && // the EVENTS flag is only for hydration and if it is the only flag, the
    // vnode should not be considered dynamic due to handler caching.
    vnode.patchFlag !== 32 /* NEED_HYDRATION */
    ) {
        currentBlock.push(vnode);
    }
    if (false) {
        convertLegacyVModelProps(vnode);
        defineLegacyVNodeProperties(vnode);
    }
    return vnode;
}
var createVNode = true ? createVNodeWithArgsTransform : _createVNode;
function _createVNode(type, props=null, children2=null, patchFlag=0, dynamicProps=null, isBlockNode=false) {
    if (!type || type === NULL_DYNAMIC_COMPONENT) {
        if (!type) {
            warn2(`Invalid vnode type when creating vnode: ${type}.`);
        }
        type = Comment2;
    }
    if (isVNode(type)) {
        const cloned = cloneVNode(type, props, true /* mergeRef: true */
        );
        if (children2) {
            normalizeChildren(cloned, children2);
        }
        if (isBlockTreeEnabled > 0 && !isBlockNode && currentBlock) {
            if (cloned.shapeFlag & 6 /* COMPONENT */
            ) {
                currentBlock[currentBlock.indexOf(type)] = cloned;
            } else {
                currentBlock.push(cloned);
            }
        }
        cloned.patchFlag = -2 /* BAIL */
        ;
        return cloned;
    }
    if (isClassComponent(type)) {
        type = type.__vccOpts;
    }
    if (false) {
        type = convertLegacyComponent(type, currentRenderingInstance);
    }
    if (props) {
        props = guardReactiveProps(props);
        let {class: klass, style} = props;
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
    const shapeFlag = isString(type) ? 1 /* ELEMENT */
    : isSuspense(type) ? 128 /* SUSPENSE */
    : isTeleport(type) ? 64 /* TELEPORT */
    : isObject(type) ? 4 /* STATEFUL_COMPONENT */
    : isFunction(type) ? 2 /* FUNCTIONAL_COMPONENT */
    : 0;
    if (shapeFlag & 4 /* STATEFUL_COMPONENT */
    && isProxy(type)) {
        type = toRaw(type);
        warn2(`Vue received a Component that was made a reactive object. This can lead to unnecessary performance overhead and should be avoided by marking the component with \`markRaw\` or using \`shallowRef\` instead of \`ref\`.`, `
Component that was made reactive: `, type);
    }
    return createBaseVNode(type, props, children2, patchFlag, dynamicProps, shapeFlag, isBlockNode, true);
}
function guardReactiveProps(props) {
    if (!props)
        return null;
    return isProxy(props) || isInternalObject(props) ? extend({}, props) : props;
}
function cloneVNode(vnode, extraProps, mergeRef=false, cloneTransition=false) {
    const {props, ref: ref2, patchFlag, children: children2, transition} = vnode;
    const mergedProps = extraProps ? mergeProps(props || {}, extraProps) : props;
    const cloned = {
        __v_isVNode: true,
        __v_skip: true,
        type: vnode.type,
        props: mergedProps,
        key: mergedProps && normalizeKey(mergedProps),
        ref: extraProps && extraProps.ref ? (// #2078 in the case of <component :is="vnode" ref="extra"/>
        // if the vnode itself already has a ref, cloneVNode will need to merge
        // the refs so the single vnode can be set on multiple refs
        mergeRef && ref2 ? isArray(ref2) ? ref2.concat(normalizeRef(extraProps)) : [ref2, normalizeRef(extraProps)] : normalizeRef(extraProps)) : ref2,
        scopeId: vnode.scopeId,
        slotScopeIds: vnode.slotScopeIds,
        children: patchFlag === -1 /* CACHED */
        && isArray(children2) ? children2.map(deepCloneVNode) : children2,
        target: vnode.target,
        targetStart: vnode.targetStart,
        targetAnchor: vnode.targetAnchor,
        staticCount: vnode.staticCount,
        shapeFlag: vnode.shapeFlag,
        // if the vnode is cloned with extra props, we can no longer assume its
        // existing patch flag to be reliable and need to add the FULL_PROPS flag.
        // note: preserve flag for fragments since they use the flag for children
        // fast paths only.
        patchFlag: extraProps && vnode.type !== Fragment ? patchFlag === -1 /* CACHED */
        ? 16 /* FULL_PROPS */
        : patchFlag | 16 /* FULL_PROPS */
        : patchFlag,
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
        el: vnode.el,
        anchor: vnode.anchor,
        ctx: vnode.ctx,
        ce: vnode.ce
    };
    if (transition && cloneTransition) {
        setTransitionHooks(cloned, transition.clone(cloned));
    }
    if (false) {
        defineLegacyVNodeProperties(cloned);
    }
    return cloned;
}
function deepCloneVNode(vnode) {
    const cloned = cloneVNode(vnode);
    if (isArray(vnode.children)) {
        cloned.children = vnode.children.map(deepCloneVNode);
    }
    return cloned;
}
function createTextVNode(text=" ", flag=0) {
    return createVNode(Text, null, text, flag);
}
function createStaticVNode(content, numberOfNodes) {
    const vnode = createVNode(Static, null, content);
    vnode.staticCount = numberOfNodes;
    return vnode;
}
function createCommentVNode(text="", asBlock=false) {
    return asBlock ? (openBlock(),
    createBlock(Comment2, null, text)) : createVNode(Comment2, null, text);
}
function normalizeVNode(child) {
    if (child == null || typeof child === "boolean") {
        return createVNode(Comment2);
    } else if (isArray(child)) {
        return createVNode(Fragment, null, // #3666, avoid reference pollution when reusing vnode
        child.slice());
    } else if (isVNode(child)) {
        return cloneIfMounted(child);
    } else {
        return createVNode(Text, null, String(child));
    }
}
function cloneIfMounted(child) {
    return child.el === null && child.patchFlag !== -1 /* CACHED */
    || child.memo ? child : cloneVNode(child);
}
function normalizeChildren(vnode, children2) {
    let type = 0;
    const {shapeFlag} = vnode;
    if (children2 == null) {
        children2 = null;
    } else if (isArray(children2)) {
        type = 16 /* ARRAY_CHILDREN */
        ;
    } else if (typeof children2 === "object") {
        if (shapeFlag & (1 /* ELEMENT */
        | 64 /* TELEPORT */
        )) {
            const slot = children2.default;
            if (slot) {
                slot._c && (slot._d = false);
                normalizeChildren(vnode, slot());
                slot._c && (slot._d = true);
            }
            return;
        } else {
            type = 32 /* SLOTS_CHILDREN */
            ;
            const slotFlag = children2._;
            if (!slotFlag && !isInternalObject(children2)) {
                ;children2._ctx = currentRenderingInstance;
            } else if (slotFlag === 3 /* FORWARDED */
            && currentRenderingInstance) {
                if (currentRenderingInstance.slots._ === 1 /* STABLE */
                ) {
                    ;children2._ = 1 /* STABLE */
                    ;
                } else {
                    ;children2._ = 2 /* DYNAMIC */
                    ;
                    vnode.patchFlag |= 1024 /* DYNAMIC_SLOTS */
                    ;
                }
            }
        }
    } else if (isFunction(children2)) {
        children2 = {
            default: children2,
            _ctx: currentRenderingInstance
        };
        type = 32 /* SLOTS_CHILDREN */
        ;
    } else {
        children2 = String(children2);
        if (shapeFlag & 64 /* TELEPORT */
        ) {
            type = 16 /* ARRAY_CHILDREN */
            ;
            children2 = [createTextVNode(children2)];
        } else {
            type = 8 /* TEXT_CHILDREN */
            ;
        }
    }
    vnode.children = children2;
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
function invokeVNodeHook(hook, instance, vnode, prevVNode=null) {
    callWithAsyncErrorHandling(hook, instance, 7 /* VNODE_HOOK */
    , [vnode, prevVNode]);
}

// packages/runtime-core/src/componentCurrentInstance.ts
var currentInstance = null;
var getCurrentGenericInstance = () => currentInstance || currentRenderingInstance;
var getCurrentInstance = () => currentInstance && !currentInstance.vapor ? currentInstance : currentRenderingInstance;
var isInSSRComponentSetup = false;
var setInSSRSetupState;
var internalSetCurrentInstance;
if (true) {
    const g = getGlobalThis();
    const registerGlobalSetter = (key, setter) => {
        let setters;
        if (!(setters = g[key]))
            setters = g[key] = [];
        setters.push(setter);
        return (v) => {
            if (setters.length > 1)
                setters.forEach( (set) => set(v));
            else
                setters[0](v);
        }
        ;
    }
    ;
    internalSetCurrentInstance = registerGlobalSetter(`__VUE_INSTANCE_SETTERS__`, (v) => currentInstance = v);
    setInSSRSetupState = registerGlobalSetter(`__VUE_SSR_SETTERS__`, (v) => isInSSRComponentSetup = v);
} else {
    internalSetCurrentInstance = (i) => {
        currentInstance = i;
    }
    ;
    setInSSRSetupState = (v) => {
        isInSSRComponentSetup = v;
    }
    ;
}
var setCurrentInstance = (instance) => {
    const prev = currentInstance;
    internalSetCurrentInstance(instance);
    instance.scope.on();
    return () => {
        instance.scope.off();
        internalSetCurrentInstance(prev);
    }
    ;
}
;
var unsetCurrentInstance = () => {
    currentInstance && currentInstance.scope.off();
    internalSetCurrentInstance(null);
}
;
var simpleSetCurrentInstance = (i, unset) => {
    currentInstance = i;
    if (unset) {
        unset.scope.off();
    } else if (i) {
        i.scope.on();
    }
}
;

// packages/runtime-core/src/component.ts
var emptyAppContext = createAppContext();
var uid2 = 0;
function nextUid() {
    return uid2++;
}
function createComponentInstance(vnode, parent, suspense) {
    const type = vnode.type;
    const appContext = (parent ? parent.appContext : vnode.appContext) || emptyAppContext;
    const instance = {
        uid: uid2++,
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
        scope: new EffectScope(true /* detached */
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
        propsOptions: normalizePropsOptions(type, appContext),
        emitsOptions: normalizeEmitsOptions(type, appContext),
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
    if (true) {
        instance.ctx = createDevRenderContext(instance);
    } else {
        instance.ctx = {
            _: instance
        };
    }
    instance.root = parent ? parent.root : instance;
    instance.emit = emit2.bind(null, instance);
    if (vnode.ce) {
        vnode.ce(instance);
    }
    return instance;
}
function validateComponentName(name, {isNativeTag}) {
    if (isBuiltInTag(name) || isNativeTag(name)) {
        warn2("Do not use built-in or reserved HTML elements as component id: " + name);
    }
}
function isStatefulComponent(instance) {
    return instance.vnode.shapeFlag & 4 /* STATEFUL_COMPONENT */
    ;
}
function setupComponent(instance, isSSR=false, optimized=false) {
    isSSR && setInSSRSetupState(isSSR);
    const {props, children: children2} = instance.vnode;
    const isStateful = isStatefulComponent(instance);
    initProps(instance, props, isStateful, isSSR);
    initSlots(instance, children2, optimized);
    const setupResult = isStateful ? setupStatefulComponent(instance, isSSR) : void 0;
    isSSR && setInSSRSetupState(false);
    return setupResult;
}
function setupStatefulComponent(instance, isSSR) {
    const Component = instance.type;
    if (true) {
        if (Component.name) {
            validateComponentName(Component.name, instance.appContext.config);
        }
        if (Component.components) {
            const names = Object.keys(Component.components);
            for (let i = 0; i < names.length; i++) {
                validateComponentName(names[i], instance.appContext.config);
            }
        }
        if (Component.directives) {
            const names = Object.keys(Component.directives);
            for (let i = 0; i < names.length; i++) {
                validateDirectiveName(names[i]);
            }
        }
        if (Component.compilerOptions && isRuntimeOnly()) {
            warn2(`"compilerOptions" is only supported when using a build of Vue that includes the runtime compiler. Since you are using a runtime-only build, the options should be passed via your build tool config instead.`);
        }
    }
    instance.accessCache = /* @__PURE__ */
    Object.create(null);
    instance.proxy = new Proxy(instance.ctx,PublicInstanceProxyHandlers);
    if (true) {
        exposePropsOnRenderContext(instance);
    }
    const {setup} = Component;
    if (setup) {
        pauseTracking();
        const setupContext = instance.setupContext = setup.length > 1 ? createSetupContext(instance) : null;
        const reset = setCurrentInstance(instance);
        const setupResult = callWithErrorHandling(setup, instance, 0 /* SETUP_FUNCTION */
        , [true ? shallowReadonly(instance.props) : instance.props, setupContext]);
        const isAsyncSetup = isPromise(setupResult);
        resetTracking();
        reset();
        if ((isAsyncSetup || instance.sp) && !isAsyncWrapper(instance)) {
            markAsyncBoundary(instance);
        }
        if (isAsyncSetup) {
            setupResult.then(unsetCurrentInstance, unsetCurrentInstance);
            if (isSSR) {
                return setupResult.then( (resolvedResult) => {
                    handleSetupResult(instance, resolvedResult, isSSR);
                }
                ).catch( (e) => {
                    handleError(e, instance, 0 /* SETUP_FUNCTION */
                    );
                }
                );
            } else if (true) {
                instance.asyncDep = setupResult;
                if (!instance.suspense) {
                    const name = Component.name ?? "Anonymous";
                    warn2(`Component <${name}>: setup function returned a promise, but no <Suspense> boundary was found in the parent component tree. A component with async setup() must be nested in a <Suspense> in order to be rendered.`);
                }
            } else if (true) {
                warn2(`setup() returned a Promise, but the version of Vue you are using does not support it yet.`);
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
        if (isVNode(setupResult)) {
            warn2(`setup() should not return VNodes directly - return a render function instead.`);
        }
        if (true) {
            instance.devtoolsRawSetupState = setupResult;
        }
        instance.setupState = proxyRefs(setupResult);
        if (true) {
            exposeSetupStateOnRenderContext(instance);
        }
    } else if (setupResult !== void 0) {
        warn2(`setup() should return an object. Received: ${setupResult === null ? "null" : typeof setupResult}`);
    }
    finishComponentSetup(instance, isSSR);
}
var compile;
var installWithProxy;
function registerRuntimeCompiler(_compile) {
    compile = _compile;
    installWithProxy = (i) => {
        if (i.render._rc) {
            i.withProxy = new Proxy(i.ctx,RuntimeCompiledPublicInstanceProxyHandlers);
        }
    }
    ;
}
var isRuntimeOnly = () => !compile;
function finishComponentSetup(instance, isSSR, skipOptions) {
    const Component = instance.type;
    if (false) {
        convertLegacyRenderFn(instance);
        if (Component.compatConfig) {
            validateCompatConfig(Component.compatConfig);
        }
    }
    if (!instance.render) {
        if (!isSSR && compile && !Component.render) {
            const template2 = Component.template || resolveMergedOptions(instance).template;
            if (template2) {
                if (true) {
                    startMeasure(instance, `compile`);
                }
                const {isCustomElement, compilerOptions} = instance.appContext.config;
                const {delimiters, compilerOptions: componentCompilerOptions} = Component;
                const finalCompilerOptions = extend(extend({
                    isCustomElement,
                    delimiters
                }, compilerOptions), componentCompilerOptions);
                if (false) {
                    finalCompilerOptions.compatConfig = Object.create(globalCompatConfig);
                    if (Component.compatConfig) {
                        extend(finalCompilerOptions.compatConfig, Component.compatConfig);
                    }
                }
                Component.render = compile(template2, finalCompilerOptions);
                if (true) {
                    endMeasure(instance, `compile`);
                }
            }
        }
        instance.render = Component.render || NOOP;
        if (installWithProxy) {
            installWithProxy(instance);
        }
    }
    if (true) {
        const reset = setCurrentInstance(instance);
        pauseTracking();
        try {
            applyOptions(instance);
        } finally {
            resetTracking();
            reset();
        }
    }
    if (!Component.render && instance.render === NOOP && !isSSR) {
        if (!compile && Component.template) {
            warn2(`Component provided template option but runtime compilation is not supported in this build of Vue.` + (false ? ` Configure your bundler to alias "vue" to "vue/dist/vue.esm-bundler.js".` : false ? ` Use "vue.esm-browser.js" instead.` : false ? ` Use "vue.global.js" instead.` : ``));
        } else {
            warn2(`Component is missing template or render function: `, Component);
        }
    }
}
var attrsProxyHandlers = true ? {
    get(target, key) {
        markAttrsAccessed();
        track(target, "get"/* GET */
        , "");
        return target[key];
    },
    set() {
        warn2(`setupContext.attrs is readonly.`);
        return false;
    },
    deleteProperty() {
        warn2(`setupContext.attrs is readonly.`);
        return false;
    }
} : {
    get(target, key) {
        track(target, "get"/* GET */
        , "");
        return target[key];
    }
};
function getSlotsProxy(instance) {
    return new Proxy(instance.slots,{
        get(target, key) {
            track(instance, "get"/* GET */
            , "$slots");
            return target[key];
        }
    });
}
function createSetupContext(instance) {
    if (true) {
        let attrsProxy;
        let slotsProxy;
        return Object.freeze({
            get attrs() {
                return attrsProxy || (attrsProxy = new Proxy(instance.attrs,attrsProxyHandlers));
            },
            get slots() {
                return slotsProxy || (slotsProxy = getSlotsProxy(instance));
            },
            get emit() {
                return (event, ...args) => instance.emit(event, ...args);
            },
            expose: (exposed) => expose(instance, exposed)
        });
    } else {
        return {
            attrs: new Proxy(instance.attrs,attrsProxyHandlers),
            slots: instance.slots,
            emit: instance.emit,
            expose: (exposed) => expose(instance, exposed)
        };
    }
}
function expose(instance, exposed) {
    if (true) {
        if (instance.exposed) {
            warn2(`expose() should be called only once per setup().`);
        }
        if (exposed != null) {
            let exposedType = typeof exposed;
            if (exposedType === "object") {
                if (isArray(exposed)) {
                    exposedType = "array";
                } else if (isRef(exposed)) {
                    exposedType = "ref";
                }
            }
            if (exposedType !== "object") {
                warn2(`expose() should be passed a plain object, received ${exposedType}.`);
            }
        }
    }
    instance.exposed = exposed || {};
}
function getComponentPublicInstance(instance) {
    if (instance.exposed) {
        return instance.exposeProxy || (instance.exposeProxy = new Proxy(proxyRefs(markRaw(instance.exposed)),{
            get(target, key) {
                if (key in target) {
                    return target[key];
                } else if (key in publicPropertiesMap) {
                    return publicPropertiesMap[key](instance);
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
var classifyRE = /(?:^|[-_])(\w)/g;
var classify = (str) => str.replace(classifyRE, (c) => c.toUpperCase()).replace(/[-_]/g, "");
function getComponentName(Component, includeInferred=true) {
    return isFunction(Component) ? Component.displayName || Component.name : Component.name || includeInferred && Component.__name;
}
function formatComponentName(instance, Component, isRoot=false) {
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
        }
        ;
        name = inferFromRegistry(instance.components || instance.parent.type.components) || inferFromRegistry(instance.appContext.components);
    }
    return name ? classify(name) : isRoot ? `App` : `Anonymous`;
}
function isClassComponent(value) {
    return isFunction(value) && "__vccOpts"in value;
}

// packages/runtime-core/src/apiComputed.ts
var computed2 = (getterOrOptions, debugOptions) => {
    const c = computed(getterOrOptions, debugOptions, isInSSRComponentSetup);
    if (true) {
        const i = getCurrentInstance();
        if (i && i.appContext.config.warnRecursiveComputed) {
            ;c._warnRecursive = true;
        }
    }
    return c;
}
;

// packages/runtime-core/src/h.ts
function h(type, propsOrChildren, children2) {
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
            children2 = Array.prototype.slice.call(arguments, 2);
        } else if (l === 3 && isVNode(children2)) {
            children2 = [children2];
        }
        return createVNode(type, propsOrChildren, children2);
    }
}

// packages/runtime-core/src/customFormatter.ts
function initCustomFormatter() {
    if (typeof window === "undefined") {
        return;
    }
    const vueStyle = {
        style: "color:#3ba776"
    };
    const numberStyle = {
        style: "color:#1677ff"
    };
    const stringStyle = {
        style: "color:#f5222d"
    };
    const keywordStyle = {
        style: "color:#eb2f96"
    };
    const formatter = {
        __vue_custom_formatter: true,
        header(obj) {
            if (!isObject(obj)) {
                return null;
            }
            if (obj.__isVue) {
                return ["div", vueStyle, `VueInstance`];
            } else if (isRef(obj)) {
                return ["div", {}, ["span", vueStyle, genRefFlag(obj)], "<", // avoid debugger accessing value affecting behavior
                formatValue("_value"in obj ? obj._value : obj), `>`];
            } else if (isReactive(obj)) {
                return ["div", {}, ["span", vueStyle, isShallow(obj) ? "ShallowReactive" : "Reactive"], "<", formatValue(obj), `>${isReadonly(obj) ? ` (readonly)` : ``}`];
            } else if (isReadonly(obj)) {
                return ["div", {}, ["span", vueStyle, isShallow(obj) ? "ShallowReadonly" : "Readonly"], "<", formatValue(obj), ">"];
            }
            return null;
        },
        hasBody(obj) {
            return obj && obj.__isVue;
        },
        body(obj) {
            if (obj && obj.__isVue) {
                return ["div", {}, ...formatInstance(obj.$)];
            }
        }
    };
    function formatInstance(instance) {
        const blocks = [];
        if (instance.type.props && instance.props) {
            blocks.push(createInstanceBlock("props", toRaw(instance.props)));
        }
        if (instance.setupState !== EMPTY_OBJ) {
            blocks.push(createInstanceBlock("setup", instance.setupState));
        }
        if (instance.data !== EMPTY_OBJ) {
            blocks.push(createInstanceBlock("data", toRaw(instance.data)));
        }
        const computed3 = extractKeys(instance, "computed");
        if (computed3) {
            blocks.push(createInstanceBlock("computed", computed3));
        }
        const injected = extractKeys(instance, "inject");
        if (injected) {
            blocks.push(createInstanceBlock("injected", injected));
        }
        blocks.push(["div", {}, ["span", {
            style: keywordStyle.style + ";opacity:0.66"
        }, "$ (internal): "], ["object", {
            object: instance
        }]]);
        return blocks;
    }
    function createInstanceBlock(type, target) {
        target = extend({}, target);
        if (!Object.keys(target).length) {
            return ["span", {}];
        }
        return ["div", {
            style: "line-height:1.25em;margin-bottom:0.6em"
        }, ["div", {
            style: "color:#476582"
        }, type], ["div", {
            style: "padding-left:1.25em"
        }, ...Object.keys(target).map( (key) => {
            return ["div", {}, ["span", keywordStyle, key + ": "], formatValue(target[key], false)];
        }
        )]];
    }
    function formatValue(v, asRaw=true) {
        if (typeof v === "number") {
            return ["span", numberStyle, v];
        } else if (typeof v === "string") {
            return ["span", stringStyle, JSON.stringify(v)];
        } else if (typeof v === "boolean") {
            return ["span", keywordStyle, v];
        } else if (isObject(v)) {
            return ["object", {
                object: asRaw ? toRaw(v) : v
            }];
        } else {
            return ["span", stringStyle, String(v)];
        }
    }
    function extractKeys(instance, type) {
        const Comp = instance.type;
        if (isFunction(Comp)) {
            return;
        }
        const extracted = {};
        for (const key in instance.ctx) {
            if (isKeyOfType(Comp, key, type)) {
                extracted[key] = instance.ctx[key];
            }
        }
        return extracted;
    }
    function isKeyOfType(Comp, key, type) {
        const opts = Comp[type];
        if (isArray(opts) && opts.includes(key) || isObject(opts) && key in opts) {
            return true;
        }
        if (Comp.extends && isKeyOfType(Comp.extends, key, type)) {
            return true;
        }
        if (Comp.mixins && Comp.mixins.some( (m) => isKeyOfType(m, key, type))) {
            return true;
        }
    }
    function genRefFlag(v) {
        if (isShallow(v)) {
            return `ShallowRef`;
        }
        if (v.effect) {
            return `ComputedRef`;
        }
        return `Ref`;
    }
    if (window.devtoolsFormatters) {
        ;window.devtoolsFormatters.push(formatter);
    } else {
        ;window.devtoolsFormatters = [formatter];
    }
}

// packages/runtime-core/src/helpers/withMemo.ts
function withMemo(memo, render2, cache, index) {
    const cached = cache[index];
    if (cached && isMemoSame(cached, memo)) {
        return cached;
    }
    const ret = render2();
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

// packages/runtime-core/src/index.ts
var version = "3.5.13";
var warn3 = true ? warn2 : NOOP;
var ErrorTypeStrings2 = true ? ErrorTypeStrings : null;
var devtools2 = true ? devtools : void 0;
var setDevtoolsHook2 = true ? setDevtoolsHook : NOOP;
var _ssrUtils = {
    createComponentInstance,
    setupComponent,
    renderComponentRoot,
    setCurrentRenderingInstance,
    isVNode,
    normalizeVNode,
    getComponentPublicInstance,
    ensureValidVNode,
    pushWarningContext,
    popWarningContext
};
var ssrUtils = true ? _ssrUtils : null;
var resolveFilter = false ? _resolveFilter : null;
var compatUtils = false ? _compatUtils : null;
var DeprecationTypes = false ? _DeprecationTypes : null;

// packages/runtime-dom/src/nodeOps.ts
var policy = void 0;
var tt = typeof window !== "undefined" && window.trustedTypes;
if (tt) {
    try {
        policy = /* @__PURE__ */
        tt.createPolicy("vue", {
            createHTML: (val) => val
        });
    } catch (e) {
        warn3(`Error creating trusted types policy: ${e}`);
    }
}
var unsafeToTrustedHTML = policy ? (val) => policy.createHTML(val) : (val) => val;
var svgNS = "http://www.w3.org/2000/svg";
var mathmlNS = "http://www.w3.org/1998/Math/MathML";
var doc = typeof document !== "undefined" ? document : null;
var templateContainer = doc && /* @__PURE__ */
doc.createElement("template");
var nodeOps = {
    insert: (child, parent, anchor) => {
        parent.insertBefore(child, anchor || null);
    }
    ,
    remove: (child) => {
        const parent = child.parentNode;
        if (parent) {
            parent.removeChild(child);
        }
    }
    ,
    createElement: (tag, namespace, is, props) => {
        const el = namespace === "svg" ? doc.createElementNS(svgNS, tag) : namespace === "mathml" ? doc.createElementNS(mathmlNS, tag) : is ? doc.createElement(tag, {
            is
        }) : doc.createElement(tag);
        if (tag === "select" && props && props.multiple != null) {
            ;el.setAttribute("multiple", props.multiple);
        }
        return el;
    }
    ,
    createText: (text) => doc.createTextNode(text),
    createComment: (text) => doc.createComment(text),
    setText: (node, text) => {
        node.nodeValue = text;
    }
    ,
    setElementText: (el, text) => {
        el.textContent = text;
    }
    ,
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
                if (start === end || !(start = start.nextSibling))
                    break;
            }
        } else {
            templateContainer.innerHTML = unsafeToTrustedHTML(namespace === "svg" ? `<svg>${content}</svg>` : namespace === "mathml" ? `<math>${content}</math>` : content);
            const template2 = templateContainer.content;
            if (namespace === "svg" || namespace === "mathml") {
                const wrapper = template2.firstChild;
                while (wrapper.firstChild) {
                    template2.appendChild(wrapper.firstChild);
                }
                template2.removeChild(wrapper);
            }
            parent.insertBefore(template2, anchor);
        }
        return [// first
        before ? before.nextSibling : parent.firstChild, // last
        anchor ? anchor.previousSibling : parent.lastChild];
    }
};

// packages/runtime-dom/src/components/Transition.ts
var TRANSITION = "transition";
var ANIMATION = "animation";
var vtcKey = Symbol("_vtc");
var DOMTransitionPropsValidators = {
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
var TransitionPropsValidators = /* @__PURE__ */
extend({}, BaseTransitionPropsValidators, DOMTransitionPropsValidators);
var decorate = (t) => {
    t.displayName = "Transition";
    t.props = TransitionPropsValidators;
    if (false) {
        t.__isBuiltIn = true;
    }
    return t;
}
;
var Transition = /* @__PURE__ */
decorate( (props, {slots}) => h(BaseTransition, resolveTransitionProps(props), slots));
var callHook2 = (hook, args=[]) => {
    if (isArray(hook)) {
        hook.forEach( (h2) => h2(...args));
    } else if (hook) {
        hook(...args);
    }
}
;
var hasExplicitCallback = (hook) => {
    return hook ? isArray(hook) ? hook.some( (h2) => h2.length > 1) : hook.length > 1 : false;
}
;
function resolveTransitionProps(rawProps) {
    const baseProps = {};
    for (const key in rawProps) {
        if (!(key in DOMTransitionPropsValidators)) {
            ;baseProps[key] = rawProps[key];
        }
    }
    if (rawProps.css === false) {
        return baseProps;
    }
    const {name="v", type, duration, enterFromClass=`${name}-enter-from`, enterActiveClass=`${name}-enter-active`, enterToClass=`${name}-enter-to`, appearFromClass=enterFromClass, appearActiveClass=enterActiveClass, appearToClass=enterToClass, leaveFromClass=`${name}-leave-from`, leaveActiveClass=`${name}-leave-active`, leaveToClass=`${name}-leave-to`} = rawProps;
    const legacyClassEnabled = false;
    let legacyEnterFromClass;
    let legacyAppearFromClass;
    let legacyLeaveFromClass;
    if (false) {
        const toLegacyClass = (cls) => cls.replace(/-from$/, "");
        if (!rawProps.enterFromClass) {
            legacyEnterFromClass = toLegacyClass(enterFromClass);
        }
        if (!rawProps.appearFromClass) {
            legacyAppearFromClass = toLegacyClass(appearFromClass);
        }
        if (!rawProps.leaveFromClass) {
            legacyLeaveFromClass = toLegacyClass(leaveFromClass);
        }
    }
    const durations = normalizeDuration(duration);
    const enterDuration = durations && durations[0];
    const leaveDuration = durations && durations[1];
    const {onBeforeEnter, onEnter, onEnterCancelled, onLeave, onLeaveCancelled, onBeforeAppear=onBeforeEnter, onAppear=onEnter, onAppearCancelled=onEnterCancelled} = baseProps;
    const finishEnter = (el, isAppear, done, isCancelled) => {
        el._enterCancelled = isCancelled;
        removeTransitionClass(el, isAppear ? appearToClass : enterToClass);
        removeTransitionClass(el, isAppear ? appearActiveClass : enterActiveClass);
        done && done();
    }
    ;
    const finishLeave = (el, done) => {
        el._isLeaving = false;
        removeTransitionClass(el, leaveFromClass);
        removeTransitionClass(el, leaveToClass);
        removeTransitionClass(el, leaveActiveClass);
        done && done();
    }
    ;
    const makeEnterHook = (isAppear) => {
        return (el, done) => {
            const hook = isAppear ? onAppear : onEnter;
            const resolve2 = () => finishEnter(el, isAppear, done);
            callHook2(hook, [el, resolve2]);
            nextFrame( () => {
                removeTransitionClass(el, isAppear ? appearFromClass : enterFromClass);
                if (false) {
                    const legacyClass = isAppear ? legacyAppearFromClass : legacyEnterFromClass;
                    if (legacyClass) {
                        removeTransitionClass(el, legacyClass);
                    }
                }
                addTransitionClass(el, isAppear ? appearToClass : enterToClass);
                if (!hasExplicitCallback(hook)) {
                    whenTransitionEnds(el, type, enterDuration, resolve2);
                }
            }
            );
        }
        ;
    }
    ;
    return extend(baseProps, {
        onBeforeEnter(el) {
            callHook2(onBeforeEnter, [el]);
            addTransitionClass(el, enterFromClass);
            if (false) {
                addTransitionClass(el, legacyEnterFromClass);
            }
            addTransitionClass(el, enterActiveClass);
        },
        onBeforeAppear(el) {
            callHook2(onBeforeAppear, [el]);
            addTransitionClass(el, appearFromClass);
            if (false) {
                addTransitionClass(el, legacyAppearFromClass);
            }
            addTransitionClass(el, appearActiveClass);
        },
        onEnter: makeEnterHook(false),
        onAppear: makeEnterHook(true),
        onLeave(el, done) {
            el._isLeaving = true;
            const resolve2 = () => finishLeave(el, done);
            addTransitionClass(el, leaveFromClass);
            if (false) {
                addTransitionClass(el, legacyLeaveFromClass);
            }
            if (!el._enterCancelled) {
                forceReflow();
                addTransitionClass(el, leaveActiveClass);
            } else {
                addTransitionClass(el, leaveActiveClass);
                forceReflow();
            }
            nextFrame( () => {
                if (!el._isLeaving) {
                    return;
                }
                removeTransitionClass(el, leaveFromClass);
                if (false) {
                    removeTransitionClass(el, legacyLeaveFromClass);
                }
                addTransitionClass(el, leaveToClass);
                if (!hasExplicitCallback(onLeave)) {
                    whenTransitionEnds(el, type, leaveDuration, resolve2);
                }
            }
            );
            callHook2(onLeave, [el, resolve2]);
        },
        onEnterCancelled(el) {
            finishEnter(el, false, void 0, true);
            callHook2(onEnterCancelled, [el]);
        },
        onAppearCancelled(el) {
            finishEnter(el, true, void 0, true);
            callHook2(onAppearCancelled, [el]);
        },
        onLeaveCancelled(el) {
            finishLeave(el);
            callHook2(onLeaveCancelled, [el]);
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
    if (true) {
        assertNumber(res, "<transition> explicit duration");
    }
    return res;
}
function addTransitionClass(el, cls) {
    cls.split(/\s+/).forEach( (c) => c && el.classList.add(c));
    (el[vtcKey] || (el[vtcKey] = /* @__PURE__ */
    new Set())).add(cls);
}
function removeTransitionClass(el, cls) {
    cls.split(/\s+/).forEach( (c) => c && el.classList.remove(c));
    const _vtc = el[vtcKey];
    if (_vtc) {
        _vtc.delete(cls);
        if (!_vtc.size) {
            ;el[vtcKey] = void 0;
        }
    }
}
function nextFrame(cb) {
    requestAnimationFrame( () => {
        requestAnimationFrame(cb);
    }
    );
}
var endId = 0;
function whenTransitionEnds(el, expectedType, explicitTimeout, resolve2) {
    const id = el._endId = ++endId;
    const resolveIfNotStale = () => {
        if (id === el._endId) {
            resolve2();
        }
    }
    ;
    if (explicitTimeout != null) {
        return setTimeout(resolveIfNotStale, explicitTimeout);
    }
    const {type, timeout, propCount} = getTransitionInfo(el, expectedType);
    if (!type) {
        return resolve2();
    }
    const endEvent = type + "end";
    let ended = 0;
    const end = () => {
        el.removeEventListener(endEvent, onEnd);
        resolveIfNotStale();
    }
    ;
    const onEnd = (e) => {
        if (e.target === el && ++ended >= propCount) {
            end();
        }
    }
    ;
    setTimeout( () => {
        if (ended < propCount) {
            end();
        }
    }
    , timeout + 1);
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
    const hasTransform = type === TRANSITION && /\b(transform|all)(,|$)/.test(getStyleProperties(`${TRANSITION}Property`).toString());
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
    return Math.max(...durations.map( (d, i) => toMs(d) + toMs(delays[i])));
}
function toMs(s) {
    if (s === "auto")
        return 0;
    return Number(s.slice(0, -1).replace(",", ".")) * 1e3;
}
function forceReflow() {
    return document.body.offsetHeight;
}

// packages/runtime-dom/src/modules/class.ts
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

// packages/runtime-dom/src/directives/vShow.ts
var vShowOriginalDisplay = Symbol("_vod");
var vShowHidden = Symbol("_vsh");
var vShow = {
    beforeMount(el, {value}, {transition}) {
        el[vShowOriginalDisplay] = el.style.display === "none" ? "" : el.style.display;
        if (transition && value) {
            transition.beforeEnter(el);
        } else {
            setDisplay(el, value);
        }
    },
    mounted(el, {value}, {transition}) {
        if (transition && value) {
            transition.enter(el);
        }
    },
    updated(el, {value, oldValue}, {transition}) {
        if (!value === !oldValue)
            return;
        if (transition) {
            if (value) {
                transition.beforeEnter(el);
                setDisplay(el, true);
                transition.enter(el);
            } else {
                transition.leave(el, () => {
                    setDisplay(el, false);
                }
                );
            }
        } else {
            setDisplay(el, value);
        }
    },
    beforeUnmount(el, {value}) {
        setDisplay(el, value);
    }
};
if (true) {
    vShow.name = "show";
}
function setDisplay(el, value) {
    el.style.display = value ? el[vShowOriginalDisplay] : "none";
    el[vShowHidden] = !value;
}
function initVShowForSSR() {
    vShow.getSSRProps = ({value}) => {
        if (!value) {
            return {
                style: {
                    display: "none"
                }
            };
        }
    }
    ;
}

// packages/runtime-dom/src/helpers/useCssVars.ts
var CSS_VAR_TEXT = Symbol(true ? "CSS_VAR_TEXT" : "");
function useCssVars(getter) {
    if (false)
        return;
    const instance = getCurrentInstance();
    if (!instance) {
        warn3(`useCssVars is called without current active component instance.`);
        return;
    }
    const updateTeleports = instance.ut = (vars=getter(instance.proxy)) => {
        Array.from(document.querySelectorAll(`[data-v-owner="${instance.uid}"]`)).forEach( (node) => setVarsOnNode(node, vars));
    }
    ;
    if (true) {
        instance.getCssVars = () => getter(instance.proxy);
    }
    const setVars = () => {
        const vars = getter(instance.proxy);
        if (instance.ce) {
            setVarsOnNode(instance.ce, vars);
        } else {
            setVarsOnVNode(instance.subTree, vars);
        }
        updateTeleports(vars);
    }
    ;
    onBeforeUpdate( () => {
        queuePostFlushCb(setVars);
    }
    );
    onMounted( () => {
        watch2(setVars, NOOP, {
            flush: "post"
        });
        const ob = new MutationObserver(setVars);
        ob.observe(instance.subTree.el.parentNode, {
            childList: true
        });
        onUnmounted( () => ob.disconnect());
    }
    );
}
function setVarsOnVNode(vnode, vars) {
    if (vnode.shapeFlag & 128 /* SUSPENSE */
    ) {
        const suspense = vnode.suspense;
        vnode = suspense.activeBranch;
        if (suspense.pendingBranch && !suspense.isHydrating) {
            suspense.effects.push( () => {
                setVarsOnVNode(suspense.activeBranch, vars);
            }
            );
        }
    }
    while (vnode.component) {
        vnode = vnode.component.subTree;
    }
    if (vnode.shapeFlag & 1 /* ELEMENT */
    && vnode.el) {
        setVarsOnNode(vnode.el, vars);
    } else if (vnode.type === Fragment) {
        ;vnode.children.forEach( (c) => setVarsOnVNode(c, vars));
    } else if (vnode.type === Static) {
        let {el, anchor} = vnode;
        while (el) {
            setVarsOnNode(el, vars);
            if (el === anchor)
                break;
            el = el.nextSibling;
        }
    }
}
function setVarsOnNode(el, vars) {
    if (el.nodeType === 1) {
        const style = el.style;
        let cssText = "";
        for (const key in vars) {
            style.setProperty(`--${key}`, vars[key]);
            cssText += `--${key}: ${vars[key]};`;
        }
        ;style[CSS_VAR_TEXT] = cssText;
    }
}

// packages/runtime-dom/src/modules/style.ts
var displayRE = /(^|;)\s*display\s*:/;
function patchStyle(el, prev, next2) {
    const style = el.style;
    const isCssString = isString(next2);
    let hasControlledDisplay = false;
    if (next2 && !isCssString) {
        if (prev) {
            if (!isString(prev)) {
                for (const key in prev) {
                    if (next2[key] == null) {
                        setStyle(style, key, "");
                    }
                }
            } else {
                for (const prevStyle of prev.split(";")) {
                    const key = prevStyle.slice(0, prevStyle.indexOf(":")).trim();
                    if (next2[key] == null) {
                        setStyle(style, key, "");
                    }
                }
            }
        }
        for (const key in next2) {
            if (key === "display") {
                hasControlledDisplay = true;
            }
            setStyle(style, key, next2[key]);
        }
    } else {
        if (isCssString) {
            if (prev !== next2) {
                const cssVarText = style[CSS_VAR_TEXT];
                if (cssVarText) {
                    ;next2 += ";" + cssVarText;
                }
                style.cssText = next2;
                hasControlledDisplay = displayRE.test(next2);
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
var semicolonRE = /[^\\];\s*$/;
var importantRE = /\s*!important$/;
function setStyle(style, name, val) {
    if (isArray(val)) {
        val.forEach( (v) => setStyle(style, name, v));
    } else {
        if (val == null)
            val = "";
        if (true) {
            if (semicolonRE.test(val)) {
                warn3(`Unexpected semicolon at the end of '${name}' style value: '${val}'`);
            }
        }
        if (name.startsWith("--")) {
            style.setProperty(name, val);
        } else {
            const prefixed = autoPrefix(style, name);
            if (importantRE.test(val)) {
                style.setProperty(hyphenate(prefixed), val.replace(importantRE, ""), "important");
            } else {
                style[prefixed] = val;
            }
        }
    }
}
var prefixes = ["Webkit", "Moz", "ms"];
var prefixCache = {};
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

// packages/runtime-dom/src/modules/attrs.ts
var xlinkNS = "http://www.w3.org/1999/xlink";
function patchAttr(el, key, value, isSVG, instance, isBoolean2=isSpecialBooleanAttr(key)) {
    if (isSVG && key.startsWith("xlink:")) {
        if (value == null) {
            el.removeAttributeNS(xlinkNS, key.slice(6, key.length));
        } else {
            el.setAttributeNS(xlinkNS, key, value);
        }
    } else {
        if (false) {
            return;
        }
        if (value == null || isBoolean2 && !includeBooleanAttr(value)) {
            el.removeAttribute(key);
        } else {
            el.setAttribute(key, isBoolean2 ? "" : isSymbol(value) ? String(value) : value);
        }
    }
}

// packages/runtime-dom/src/modules/props.ts
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
        const newValue = value == null ? (// #11647: value should be set as empty string for null and undefined,
        // but <input type="checkbox"> should be set as 'on'.
        el.type === "checkbox" ? "on" : "") : String(value);
        if (oldValue !== newValue || !("_value"in el)) {
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
    } else {
        if (false) {
            const type = typeof el[key];
            if (type === "string" || type === "number") {
                compatUtils3.warnDeprecation(DeprecationTypes3.ATTR_FALSE_VALUE, parentComponent, key);
                value = type === "number" ? 0 : "";
                needRemove = true;
            }
        }
    }
    try {
        el[key] = value;
    } catch (e) {
        if (!needRemove) {
            warn3(`Failed setting prop "${key}" on <${tag.toLowerCase()}>: value ${value} is invalid.`, e);
        }
    }
    needRemove && el.removeAttribute(attrName || key);
}

// packages/runtime-dom/src/modules/events.ts
function addEventListener(el, event, handler, options) {
    el.addEventListener(event, handler, options);
}
function removeEventListener(el, event, handler, options) {
    el.removeEventListener(event, handler, options);
}
var veiKey = Symbol("_vei");
function patchEvent(el, rawName, prevValue, nextValue, instance=null) {
    const invokers = el[veiKey] || (el[veiKey] = {});
    const existingInvoker = invokers[rawName];
    if (nextValue && existingInvoker) {
        existingInvoker.value = true ? sanitizeEventValue(nextValue, rawName) : nextValue;
    } else {
        const [name,options] = parseName(rawName);
        if (nextValue) {
            const invoker = invokers[rawName] = createInvoker(true ? sanitizeEventValue(nextValue, rawName) : nextValue, instance);
            addEventListener(el, name, invoker, options);
        } else if (existingInvoker) {
            removeEventListener(el, name, existingInvoker, options);
            invokers[rawName] = void 0;
        }
    }
}
var optionsModifierRE = /(?:Once|Passive|Capture)$/;
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
var cachedNow = 0;
var p = /* @__PURE__ */
Promise.resolve();
var getNow = () => cachedNow || (p.then( () => cachedNow = 0),
cachedNow = Date.now());
function createInvoker(initialValue, instance) {
    const invoker = (e) => {
        if (!e._vts) {
            e._vts = Date.now();
        } else if (e._vts <= invoker.attached) {
            return;
        }
        callWithAsyncErrorHandling(patchStopImmediatePropagation(e, invoker.value), instance, 5 /* NATIVE_EVENT_HANDLER */
        , [e]);
    }
    ;
    invoker.value = initialValue;
    invoker.attached = getNow();
    return invoker;
}
function sanitizeEventValue(value, propName) {
    if (isFunction(value) || isArray(value)) {
        return value;
    }
    warn3(`Wrong type passed as event handler to ${propName} - did you forget @ or : in front of your prop?
Expected function or array of functions, received type ${typeof value}.`);
    return NOOP;
}
function patchStopImmediatePropagation(e, value) {
    if (isArray(value)) {
        const originalStop = e.stopImmediatePropagation;
        e.stopImmediatePropagation = () => {
            originalStop.call(e);
            e._stopped = true;
        }
        ;
        return value.map( (fn) => (e2) => !e2._stopped && fn && fn(e2));
    } else {
        return value;
    }
}

// packages/runtime-dom/src/patchProp.ts
var patchProp = (el, key, prevValue, nextValue, namespace, parentComponent) => {
    const isSVG = namespace === "svg";
    if (key === "class") {
        patchClass(el, nextValue, isSVG);
    } else if (key === "style") {
        patchStyle(el, prevValue, nextValue);
    } else if (isOn(key)) {
        if (!isModelListener(key)) {
            patchEvent(el, key, prevValue, nextValue, parentComponent);
        }
    } else if (key[0] === "." ? (key = key.slice(1),
    true) : key[0] === "^" ? (key = key.slice(1),
    false) : shouldSetAsProp(el, key, nextValue, isSVG)) {
        patchDOMProp(el, key, nextValue, parentComponent);
        if (!el.tagName.includes("-") && (key === "value" || key === "checked" || key === "selected")) {
            patchAttr(el, key, nextValue, isSVG, parentComponent, key !== "value");
        }
    } else if (// #11081 force set props for possible async custom element
    el._isVueCE && (/[A-Z]/.test(key) || !isString(nextValue))) {
        patchDOMProp(el, camelize(key), nextValue, parentComponent, key);
    } else {
        if (key === "true-value") {
            ;el._trueValue = nextValue;
        } else if (key === "false-value") {
            ;el._falseValue = nextValue;
        }
        patchAttr(el, key, nextValue, isSVG, parentComponent);
    }
}
;
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

// packages/runtime-dom/src/apiCustomElement.ts
var REMOVAL = {};
// @__NO_SIDE_EFFECTS__
function defineCustomElement(options, extraOptions, _createApp2) {
    const Comp = defineComponent(options, extraOptions);
    if (isPlainObject(Comp))
        extend(Comp, extraOptions);
    class VueCustomElement extends VueElement {
        static{this.def = Comp;
        }constructor(initialProps) {
            super(Comp, initialProps, _createApp2);
        }
    }
    return VueCustomElement;
}
var defineSSRCustomElement = /* @__NO_SIDE_EFFECTS__ */
(options, extraOptions) => {
    return /* @__PURE__ */
    defineCustomElement(options, extraOptions, createSSRApp);
}
;
var BaseClass = typeof HTMLElement !== "undefined" ? HTMLElement : class {
}
;
var VueElement = class _VueElement extends BaseClass {
    constructor(_def, _props={}, _createApp2=createApp) {
        super();
        this._def = _def;
        this._props = _props;
        this._createApp = _createApp2;
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
        this._styleChildren = /* @__PURE__ */
        new WeakSet();
        this._ob = null;
        if (this.shadowRoot && _createApp2 !== createApp) {
            this._root = this.shadowRoot;
        } else {
            if (this.shadowRoot) {
                warn3(`Custom element has pre-rendered declarative shadow root but is not defined as hydratable. Use \`defineSSRCustomElement\`.`);
            }
            if (_def.shadowRoot !== false) {
                this.attachShadow({
                    mode: "open"
                });
                this._root = this.shadowRoot;
            } else {
                this._root = this;
            }
        }
        if (!this._def.__asyncLoader) {
            this._resolveProps(this._def);
        }
    }
    connectedCallback() {
        if (!this.isConnected)
            return;
        if (!this.shadowRoot) {
            this._parseSlots();
        }
        this._connected = true;
        let parent = this;
        while (parent = parent && (parent.parentNode || parent.host)) {
            if (parent instanceof _VueElement) {
                this._parent = parent;
                break;
            }
        }
        if (!this._instance) {
            if (this._resolved) {
                this._setParent();
                this._update();
            } else {
                if (parent && parent._pendingResolve) {
                    this._pendingResolve = parent._pendingResolve.then( () => {
                        this._pendingResolve = void 0;
                        this._resolveDef();
                    }
                    );
                } else {
                    this._resolveDef();
                }
            }
        }
    }
    _setParent(parent=this._parent) {
        if (parent) {
            this._instance.parent = parent._instance;
            this._instance.provides = parent._instance.provides;
        }
    }
    disconnectedCallback() {
        this._connected = false;
        nextTick( () => {
            if (!this._connected) {
                if (this._ob) {
                    this._ob.disconnect();
                    this._ob = null;
                }
                this._app && this._app.unmount();
                if (this._instance)
                    this._instance.ce = void 0;
                this._app = this._instance = null;
            }
        }
        );
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
        this._ob = new MutationObserver( (mutations) => {
            for (const m of mutations) {
                this._setAttr(m.attributeName);
            }
        }
        );
        this._ob.observe(this, {
            attributes: true
        });
        const resolve2 = (def2, isAsync=false) => {
            this._resolved = true;
            this._pendingResolve = void 0;
            const {props, styles} = def2;
            let numberProps;
            if (props && !isArray(props)) {
                for (const key in props) {
                    const opt = props[key];
                    if (opt === Number || opt && opt.type === Number) {
                        if (key in this._props) {
                            this._props[key] = toNumber(this._props[key]);
                        }
                        ;(numberProps || (numberProps = /* @__PURE__ */
                        Object.create(null)))[camelize(key)] = true;
                    }
                }
            }
            this._numberProps = numberProps;
            if (isAsync) {
                this._resolveProps(def2);
            }
            if (this.shadowRoot) {
                this._applyStyles(styles);
            } else if (styles) {
                warn3("Custom element style injection is not supported when using shadowRoot: false");
            }
            this._mount(def2);
        }
        ;
        const asyncDef = this._def.__asyncLoader;
        if (asyncDef) {
            this._pendingResolve = asyncDef().then( (def2) => resolve2(this._def = def2, true));
        } else {
            resolve2(this._def);
        }
    }
    _mount(def2) {
        if (!def2.name) {
            def2.name = "VueElement";
        }
        this._app = this._createApp(def2);
        if (def2.configureApp) {
            def2.configureApp(this._app);
        }
        this._app._ceVNode = this._createVNode();
        this._app.mount(this._root);
        const exposed = this._instance && this._instance.exposed;
        if (!exposed)
            return;
        for (const key in exposed) {
            if (!hasOwn(this, key)) {
                Object.defineProperty(this, key, {
                    // unwrap ref to be consistent with public instance behavior
                    get: () => unref(exposed[key])
                });
            } else if (true) {
                warn3(`Exposed property "${key}" already exists on custom element.`);
            }
        }
    }
    _resolveProps(def2) {
        const {props} = def2;
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
        if (key.startsWith("data-v-"))
            return;
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
    _setProp(key, val, shouldReflect=true, shouldUpdate=false) {
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
                ob && ob.observe(this, {
                    attributes: true
                });
            }
        }
    }
    _update() {
        render(this._createVNode(), this._root);
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
                if (true) {
                    instance.ceReload = (newStyles) => {
                        if (this._styles) {
                            this._styles.forEach( (s) => this._root.removeChild(s));
                            this._styles.length = 0;
                        }
                        this._applyStyles(newStyles);
                        this._instance = null;
                        this._update();
                    }
                    ;
                }
                const dispatch = (event, args) => {
                    this.dispatchEvent(new CustomEvent(event,isPlainObject(args[0]) ? extend({
                        detail: args
                    }, args[0]) : {
                        detail: args
                    }));
                }
                ;
                instance.emit = (event, ...args) => {
                    dispatch(event, args);
                    if (hyphenate(event) !== event) {
                        dispatch(hyphenate(event), args);
                    }
                }
                ;
                this._setParent();
            }
            ;
        }
        return vnode;
    }
    _applyStyles(styles, owner) {
        if (!styles)
            return;
        if (owner) {
            if (owner === this._def || this._styleChildren.has(owner)) {
                return;
            }
            this._styleChildren.add(owner);
        }
        const nonce = this._nonce;
        for (let i = styles.length - 1; i >= 0; i--) {
            const s = document.createElement("style");
            if (nonce)
                s.setAttribute("nonce", nonce);
            s.textContent = styles[i];
            this.shadowRoot.prepend(s);
            if (true) {
                if (owner) {
                    if (owner.__hmrId) {
                        if (!this._childStyles)
                            this._childStyles = /* @__PURE__ */
                            new Map();
                        let entry = this._childStyles.get(owner.__hmrId);
                        if (!entry) {
                            this._childStyles.set(owner.__hmrId, entry = []);
                        }
                        entry.push(s);
                    }
                } else {
                    ;(this._styles || (this._styles = [])).push(s);
                }
            }
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
                            ;child.setAttribute(id, "");
                        }
                    }
                    parent.insertBefore(n, o);
                }
            } else {
                while (o.firstChild)
                    parent.insertBefore(o.firstChild, o);
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
        if (true) {
            this._styleChildren.delete(comp);
            if (this._childStyles && comp.__hmrId) {
                const oldStyles = this._childStyles.get(comp.__hmrId);
                if (oldStyles) {
                    oldStyles.forEach( (s) => this._root.removeChild(s));
                    oldStyles.length = 0;
                }
            }
        }
    }
}
;
function useHost(caller) {
    const instance = getCurrentInstance();
    const el = instance && instance.ce;
    if (el) {
        return el;
    } else if (true) {
        if (!instance) {
            warn3(`${caller || "useHost"} called without an active component instance.`);
        } else {
            warn3(`${caller || "useHost"} can only be used in components defined via defineCustomElement.`);
        }
    }
    return null;
}
function useShadowRoot() {
    const el = true ? useHost("useShadowRoot") : useHost();
    return el && el.shadowRoot;
}

// packages/runtime-dom/src/helpers/useCssModule.ts
function useCssModule(name="$style") {
    if (true) {
        const instance = getCurrentInstance();
        if (!instance) {
            warn3(`useCssModule must be called inside setup()`);
            return EMPTY_OBJ;
        }
        const modules = instance.type.__cssModules;
        if (!modules) {
            warn3(`Current instance does not have CSS modules injected.`);
            return EMPTY_OBJ;
        }
        const mod = modules[name];
        if (!mod) {
            warn3(`Current instance does not have CSS module named "${name}".`);
            return EMPTY_OBJ;
        }
        return mod;
    } else {
        if (true) {
            warn3(`useCssModule() is not supported in the global build.`);
        }
        return EMPTY_OBJ;
    }
}

// packages/runtime-dom/src/components/TransitionGroup.ts
var positionMap = /* @__PURE__ */
new WeakMap();
var newPositionMap = /* @__PURE__ */
new WeakMap();
var moveCbKey = Symbol("_moveCb");
var enterCbKey2 = Symbol("_enterCb");
var decorate2 = (t) => {
    delete t.props.mode;
    if (false) {
        t.__isBuiltIn = true;
    }
    return t;
}
;
var TransitionGroupImpl = /* @__PURE__ */
decorate2({
    name: "TransitionGroup",
    props: /* @__PURE__ */
    extend({}, TransitionPropsValidators, {
        tag: String,
        moveClass: String
    }),
    setup(props, {slots}) {
        const instance = getCurrentInstance();
        const state = useTransitionState();
        let prevChildren;
        let children2;
        onUpdated( () => {
            if (!prevChildren.length) {
                return;
            }
            const moveClass = props.moveClass || `${props.name || "v"}-move`;
            if (!hasCSSTransform(prevChildren[0].el, instance.vnode.el, moveClass)) {
                return;
            }
            prevChildren.forEach(callPendingCbs);
            prevChildren.forEach(recordPosition);
            const movedChildren = prevChildren.filter(applyTranslation);
            forceReflow();
            movedChildren.forEach( (c) => {
                const el = c.el;
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
                }
                ;
                el.addEventListener("transitionend", cb);
            }
            );
        }
        );
        return () => {
            const rawProps = toRaw(props);
            const cssTransitionProps = resolveTransitionProps(rawProps);
            let tag = rawProps.tag || Fragment;
            if (false) {
                tag = "span";
            }
            prevChildren = [];
            if (children2) {
                for (let i = 0; i < children2.length; i++) {
                    const child = children2[i];
                    if (child.el && child.el instanceof Element) {
                        prevChildren.push(child);
                        setTransitionHooks(child, resolveTransitionHooks(child, cssTransitionProps, state, instance));
                        positionMap.set(child, child.el.getBoundingClientRect());
                    }
                }
            }
            children2 = slots.default ? getTransitionRawChildren(slots.default()) : [];
            for (let i = 0; i < children2.length; i++) {
                const child = children2[i];
                if (child.key != null) {
                    setTransitionHooks(child, resolveTransitionHooks(child, cssTransitionProps, state, instance));
                } else if (child.type !== Text) {
                    warn3(`<TransitionGroup> children must be keyed.`);
                }
            }
            return createVNode(tag, null, children2);
        }
        ;
    }
});
var TransitionGroup = TransitionGroupImpl;
function callPendingCbs(c) {
    const el = c.el;
    if (el[moveCbKey]) {
        el[moveCbKey]();
    }
    if (el[enterCbKey2]) {
        el[enterCbKey2]();
    }
}
function recordPosition(c) {
    newPositionMap.set(c, c.el.getBoundingClientRect());
}
function applyTranslation(c) {
    const oldPos = positionMap.get(c);
    const newPos = newPositionMap.get(c);
    const dx = oldPos.left - newPos.left;
    const dy = oldPos.top - newPos.top;
    if (dx || dy) {
        const s = c.el.style;
        s.transform = s.webkitTransform = `translate(${dx}px,${dy}px)`;
        s.transitionDuration = "0s";
        return c;
    }
}
function hasCSSTransform(el, root, moveClass) {
    const clone = el.cloneNode();
    const _vtc = el[vtcKey];
    if (_vtc) {
        _vtc.forEach( (cls) => {
            cls.split(/\s+/).forEach( (c) => c && clone.classList.remove(c));
        }
        );
    }
    moveClass.split(/\s+/).forEach( (c) => c && clone.classList.add(c));
    clone.style.display = "none";
    const container = root.nodeType === 1 ? root : root.parentNode;
    container.appendChild(clone);
    const {hasTransform} = getTransitionInfo(clone);
    container.removeChild(clone);
    return hasTransform;
}

// packages/runtime-dom/src/directives/vModel.ts
var getModelAssigner = (vnode) => {
    const fn = vnode.props["onUpdate:modelValue"] || false;
    return isArray(fn) ? (value) => invokeArrayFns(fn, value) : fn;
}
;
function onCompositionStart(e) {
    ;e.target.composing = true;
}
function onCompositionEnd(e) {
    const target = e.target;
    if (target.composing) {
        target.composing = false;
        target.dispatchEvent(new Event("input"));
    }
}
var assignKey = Symbol("_assign");
var vModelText = {
    created(el, {modifiers: {lazy, trim, number}}, vnode) {
        el[assignKey] = getModelAssigner(vnode);
        const castToNumber = number || vnode.props && vnode.props.type === "number";
        addEventListener(el, lazy ? "change" : "input", (e) => {
            if (e.target.composing)
                return;
            let domValue = el.value;
            if (trim) {
                domValue = domValue.trim();
            }
            if (castToNumber) {
                domValue = looseToNumber(domValue);
            }
            el[assignKey](domValue);
        }
        );
        if (trim) {
            addEventListener(el, "change", () => {
                el.value = el.value.trim();
            }
            );
        }
        if (!lazy) {
            addEventListener(el, "compositionstart", onCompositionStart);
            addEventListener(el, "compositionend", onCompositionEnd);
            addEventListener(el, "change", onCompositionEnd);
        }
    },
    // set value on mounted so it's after min/max for type="range"
    mounted(el, {value}) {
        el.value = value == null ? "" : value;
    },
    beforeUpdate(el, {value, oldValue, modifiers: {lazy, trim, number}}, vnode) {
        el[assignKey] = getModelAssigner(vnode);
        if (el.composing)
            return;
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
    }
};
var vModelCheckbox = {
    // #4096 array checkboxes need to be deep traversed
    deep: true,
    created(el, _, vnode) {
        el[assignKey] = getModelAssigner(vnode);
        addEventListener(el, "change", () => {
            const modelValue = el._modelValue;
            const elementValue = getValue(el);
            const checked = el.checked;
            const assign = el[assignKey];
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
        }
        );
    },
    // set initial checked on mount to wait for true-value/false-value
    mounted: setChecked,
    beforeUpdate(el, binding, vnode) {
        el[assignKey] = getModelAssigner(vnode);
        setChecked(el, binding, vnode);
    }
};
function setChecked(el, {value, oldValue}, vnode) {
    ;el._modelValue = value;
    let checked;
    if (isArray(value)) {
        checked = looseIndexOf(value, vnode.props.value) > -1;
    } else if (isSet(value)) {
        checked = value.has(vnode.props.value);
    } else {
        if (value === oldValue)
            return;
        checked = looseEqual(value, getCheckboxValue(el, true));
    }
    if (el.checked !== checked) {
        el.checked = checked;
    }
}
var vModelRadio = {
    created(el, {value}, vnode) {
        el.checked = looseEqual(value, vnode.props.value);
        el[assignKey] = getModelAssigner(vnode);
        addEventListener(el, "change", () => {
            el[assignKey](getValue(el));
        }
        );
    },
    beforeUpdate(el, {value, oldValue}, vnode) {
        el[assignKey] = getModelAssigner(vnode);
        if (value !== oldValue) {
            el.checked = looseEqual(value, vnode.props.value);
        }
    }
};
var vModelSelect = {
    // <select multiple> value need to be deep traversed
    deep: true,
    created(el, {value, modifiers: {number}}, vnode) {
        const isSetModel = isSet(value);
        addEventListener(el, "change", () => {
            const selectedVal = Array.prototype.filter.call(el.options, (o) => o.selected).map( (o) => number ? looseToNumber(getValue(o)) : getValue(o));
            el[assignKey](el.multiple ? isSetModel ? new Set(selectedVal) : selectedVal : selectedVal[0]);
            el._assigning = true;
            nextTick( () => {
                el._assigning = false;
            }
            );
        }
        );
        el[assignKey] = getModelAssigner(vnode);
    },
    // set value in mounted & updated because <select> relies on its children
    // <option>s.
    mounted(el, {value}) {
        setSelected(el, value);
    },
    beforeUpdate(el, _binding, vnode) {
        el[assignKey] = getModelAssigner(vnode);
    },
    updated(el, {value}) {
        if (!el._assigning) {
            setSelected(el, value);
        }
    }
};
function setSelected(el, value) {
    const isMultiple = el.multiple;
    const isArrayValue = isArray(value);
    if (isMultiple && !isArrayValue && !isSet(value)) {
        warn3(`<select multiple v-model> expects an Array or Set value for its binding, but got ${Object.prototype.toString.call(value).slice(8, -1)}.`);
        return;
    }
    for (let i = 0, l = el.options.length; i < l; i++) {
        const option = el.options[i];
        const optionValue = getValue(option);
        if (isMultiple) {
            if (isArrayValue) {
                const optionType = typeof optionValue;
                if (optionType === "string" || optionType === "number") {
                    option.selected = value.some( (v) => String(v) === String(optionValue));
                } else {
                    option.selected = looseIndexOf(value, optionValue) > -1;
                }
            } else {
                option.selected = value.has(optionValue);
            }
        } else if (looseEqual(getValue(option), value)) {
            if (el.selectedIndex !== i)
                el.selectedIndex = i;
            return;
        }
    }
    if (!isMultiple && el.selectedIndex !== -1) {
        el.selectedIndex = -1;
    }
}
function getValue(el) {
    return "_value"in el ? el._value : el.value;
}
function getCheckboxValue(el, checked) {
    const key = checked ? "_trueValue" : "_falseValue";
    return key in el ? el[key] : checked;
}
var vModelDynamic = {
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
    const modelToUse = resolveDynamicModel(el.tagName, vnode.props && vnode.props.type);
    const fn = modelToUse[hook];
    fn && fn(el, binding, vnode, prevVNode);
}
function initVModelForSSR() {
    vModelText.getSSRProps = ({value}) => ({
        value
    });
    vModelRadio.getSSRProps = ({value}, vnode) => {
        if (vnode.props && looseEqual(vnode.props.value, value)) {
            return {
                checked: true
            };
        }
    }
    ;
    vModelCheckbox.getSSRProps = ({value}, vnode) => {
        if (isArray(value)) {
            if (vnode.props && looseIndexOf(value, vnode.props.value) > -1) {
                return {
                    checked: true
                };
            }
        } else if (isSet(value)) {
            if (vnode.props && value.has(vnode.props.value)) {
                return {
                    checked: true
                };
            }
        } else if (value) {
            return {
                checked: true
            };
        }
    }
    ;
    vModelDynamic.getSSRProps = (binding, vnode) => {
        if (typeof vnode.type !== "string") {
            return;
        }
        const modelToUse = resolveDynamicModel(// resolveDynamicModel expects an uppercase tag name, but vnode.type is lowercase
        vnode.type.toUpperCase(), vnode.props && vnode.props.type);
        if (modelToUse.getSSRProps) {
            return modelToUse.getSSRProps(binding, vnode);
        }
    }
    ;
}

// packages/runtime-dom/src/directives/vOn.ts
var systemModifiers = ["ctrl", "shift", "alt", "meta"];
var modifierGuards = {
    stop: (e) => e.stopPropagation(),
    prevent: (e) => e.preventDefault(),
    self: (e) => e.target !== e.currentTarget,
    ctrl: (e) => !e.ctrlKey,
    shift: (e) => !e.shiftKey,
    alt: (e) => !e.altKey,
    meta: (e) => !e.metaKey,
    left: (e) => "button"in e && e.button !== 0,
    middle: (e) => "button"in e && e.button !== 1,
    right: (e) => "button"in e && e.button !== 2,
    exact: (e, modifiers) => systemModifiers.some( (m) => e[`${m}Key`] && !modifiers.includes(m))
};
var withModifiers = (fn, modifiers) => {
    const cache = fn._withMods || (fn._withMods = {});
    const cacheKey = modifiers.join(".");
    return cache[cacheKey] || (cache[cacheKey] = (event, ...args) => {
        for (let i = 0; i < modifiers.length; i++) {
            const guard = modifierGuards[modifiers[i]];
            if (guard && guard(event, modifiers))
                return;
        }
        return fn(event, ...args);
    }
    );
}
;
var keyNames = {
    esc: "escape",
    space: " ",
    up: "arrow-up",
    left: "arrow-left",
    right: "arrow-right",
    down: "arrow-down",
    delete: "backspace"
};
var withKeys = (fn, modifiers) => {
    let globalKeyCodes;
    let instance = null;
    if (false) {
        instance = getCurrentInstance();
        if (compatUtils.isCompatEnabled(DeprecationTypes.CONFIG_KEY_CODES, instance)) {
            if (instance) {
                globalKeyCodes = instance.appContext.config.keyCodes;
            }
        }
        if (modifiers.some( (m) => /^\d+$/.test(m))) {
            compatUtils.warnDeprecation(DeprecationTypes.V_ON_KEYCODE_MODIFIER, instance);
        }
    }
    const cache = fn._withKeys || (fn._withKeys = {});
    const cacheKey = modifiers.join(".");
    return cache[cacheKey] || (cache[cacheKey] = (event) => {
        if (!("key"in event)) {
            return;
        }
        const eventKey = hyphenate(event.key);
        if (modifiers.some( (k) => k === eventKey || keyNames[k] === eventKey)) {
            return fn(event);
        }
        if (false) {
            const keyCode = String(event.keyCode);
            if (compatUtils.isCompatEnabled(DeprecationTypes.V_ON_KEYCODE_MODIFIER, instance) && modifiers.some( (mod) => mod == keyCode)) {
                return fn(event);
            }
            if (globalKeyCodes) {
                for (const mod of modifiers) {
                    const codes = globalKeyCodes[mod];
                    if (codes) {
                        const matches2 = isArray2(codes) ? codes.some( (code) => String(code) === keyCode) : String(codes) === keyCode;
                        if (matches2) {
                            return fn(event);
                        }
                    }
                }
            }
        }
    }
    );
}
;

// packages/runtime-dom/src/index.ts
var rendererOptions = /* @__PURE__ */
extend({
    patchProp
}, nodeOps);
var renderer;
var enabledHydration = false;
function ensureRenderer() {
    return renderer || (renderer = createRenderer(rendererOptions));
}
function ensureHydrationRenderer() {
    renderer = enabledHydration ? renderer : createHydrationRenderer(rendererOptions);
    enabledHydration = true;
    return renderer;
}
var render = (...args) => {
    ensureRenderer().render(...args);
}
;
var hydrate = (...args) => {
    ensureHydrationRenderer().hydrate(...args);
}
;
var createApp = (...args) => {
    const app = ensureRenderer().createApp(...args);
    if (true) {
        injectNativeTagCheck(app);
        injectCompilerOptionsCheck(app);
    }
    const {mount} = app;
    app.mount = (containerOrSelector) => {
        const container = normalizeContainer(containerOrSelector);
        if (!container)
            return;
        const component = app._component;
        if (!isFunction(component) && !component.render && !component.template) {
            component.template = container.innerHTML;
            if (false) {
                for (let i = 0; i < container.attributes.length; i++) {
                    const attr = container.attributes[i];
                    if (attr.name !== "v-cloak" && /^(v-|:|@)/.test(attr.name)) {
                        compatUtils5.warnDeprecation(DeprecationTypes5.GLOBAL_MOUNT_CONTAINER, null);
                        break;
                    }
                }
            }
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
    }
    ;
    return app;
}
;
var createSSRApp = (...args) => {
    const app = ensureHydrationRenderer().createApp(...args);
    if (true) {
        injectNativeTagCheck(app);
        injectCompilerOptionsCheck(app);
    }
    const {mount} = app;
    app.mount = (containerOrSelector) => {
        const container = normalizeContainer(containerOrSelector);
        if (container) {
            return mount(container, true, resolveRootNamespace(container));
        }
    }
    ;
    return app;
}
;
function resolveRootNamespace(container) {
    if (container instanceof SVGElement) {
        return "svg";
    }
    if (typeof MathMLElement === "function" && container instanceof MathMLElement) {
        return "mathml";
    }
}
function injectNativeTagCheck(app) {
    Object.defineProperty(app.config, "isNativeTag", {
        value: (tag) => isHTMLTag(tag) || isSVGTag(tag) || isMathMLTag(tag),
        writable: false
    });
}
function injectCompilerOptionsCheck(app) {
    if (isRuntimeOnly()) {
        const isCustomElement = app.config.isCustomElement;
        Object.defineProperty(app.config, "isCustomElement", {
            get() {
                return isCustomElement;
            },
            set() {
                warn3(`The \`isCustomElement\` config option is deprecated. Use \`compilerOptions.isCustomElement\` instead.`);
            }
        });
        const compilerOptions = app.config.compilerOptions;
        const msg = `The \`compilerOptions\` config option is only respected when using a build of Vue.js that includes the runtime compiler (aka "full build"). Since you are using the runtime-only build, \`compilerOptions\` must be passed to \`@vue/compiler-dom\` in the build setup instead.
- For vue-loader: pass it via vue-loader's \`compilerOptions\` loader option.
- For vue-cli: see https://cli.vuejs.org/guide/webpack.html#modifying-options-of-a-loader
- For vite: pass it via @vitejs/plugin-vue options. See https://github.com/vitejs/vite-plugin-vue/tree/main/packages/plugin-vue#example-for-passing-options-to-vuecompiler-sfc`;
        Object.defineProperty(app.config, "compilerOptions", {
            get() {
                warn3(msg);
                return compilerOptions;
            },
            set() {
                warn3(msg);
            }
        });
    }
}
function normalizeContainer(container) {
    if (isString(container)) {
        const res = document.querySelector(container);
        if (!res) {
            warn3(`Failed to mount app: mount target selector "${container}" returned null.`);
        }
        return res;
    }
    if (window.ShadowRoot && container instanceof window.ShadowRoot && container.mode === "closed") {
        warn3(`mounting on a ShadowRoot with \`{mode: "closed"}\` may lead to unpredictable bugs`);
    }
    return container;
}
var ssrDirectiveInitialized = false;
var initDirectivesForSSR = true ? () => {
    if (!ssrDirectiveInitialized) {
        ssrDirectiveInitialized = true;
        initVModelForSSR();
        initVShowForSSR();
    }
}
: NOOP3;

// packages/vue/src/dev.ts
function initDev() {
    if (true) {
        if (true) {
            console.info(`You are running a development build of Vue.
Make sure to use the production build (*.prod.js) when deploying for production.`);
        }
        initCustomFormatter();
    }
}

// packages/vue/src/runtime.ts
if (true) {
    initDev();
}
var compile2 = (_template) => {
    if (true) {
        warn3(`Runtime compilation is not supported in this build of Vue.` + (false ? ` Configure your bundler to alias "vue" to "vue/dist/vue.esm-bundler.js".` : false ? ` Use "vue.esm-browser.js" instead.` : false ? ` Use "vue.global.js" instead.` : ``));
    }
    return NOOP;
}
;

// packages/runtime-vapor/src/renderEffect.ts
function renderEffect(fn, noLifecycle=true) {
    const instance = currentInstance;
    const scope = getCurrentScope();
    if (!isVaporComponent(instance)) {
        warn3("renderEffect called without active vapor instance.");
    }
    const hasUpdateHooks = instance && (instance.bu || instance.u);
    const renderEffectFn = noLifecycle ? fn : () => {
        if (instance) {
            startMeasure(instance, `renderEffect`);
        }
        const prev = currentInstance;
        simpleSetCurrentInstance(instance);
        if (scope)
            scope.on();
        if (hasUpdateHooks && instance.isMounted && !instance.isUpdating) {
            instance.isUpdating = true;
            instance.bu && invokeArrayFns(instance.bu);
            fn();
            queuePostFlushCb( () => {
                instance.isUpdating = false;
                instance.u && invokeArrayFns(instance.u);
            }
            );
        } else {
            fn();
        }
        if (scope)
            scope.off();
        simpleSetCurrentInstance(prev, instance);
        if (instance) {
            startMeasure(instance, `renderEffect`);
        }
    }
    ;
    const effect2 = new ReactiveEffect(renderEffectFn);
    const job = effect2.runIfDirty.bind(effect2);
    if (instance) {
        if (true) {
            effect2.onTrack = instance.rtc ? (e) => invokeArrayFns(instance.rtc, e) : void 0;
            effect2.onTrigger = instance.rtg ? (e) => invokeArrayFns(instance.rtg, e) : void 0;
        }
        job.i = instance;
        job.id = instance.uid;
    }
    effect2.scheduler = () => queueJob(job);
    effect2.run();
}

// packages/runtime-vapor/src/componentMetadata.ts
function getMetadata(el) {
    return el.$$metadata || (el.$$metadata = [{}, {}]);
}
function recordEventMetadata(el, key, value) {
    const metadata = getMetadata(el)[1 /* event */
    ];
    const handlers = metadata[key] ||= [];
    handlers.push(value);
    return () => remove(handlers, value);
}

// packages/runtime-vapor/src/dom/event.ts
function addEventListener2(el, event, handler, options) {
    el.addEventListener(event, handler, options);
    return () => el.removeEventListener(event, handler, options);
}
function on(el, event, handlerGetter, options={}) {
    const handler = eventHandler(handlerGetter);
    let cleanupEvent;
    queuePostFlushCb( () => {
        cleanupEvent = addEventListener2(el, event, handler, options);
    }
    );
    if (options.effect) {
        onEffectCleanup(cleanup);
    } else if (getCurrentScope()) {
        onScopeDispose(cleanup);
    }
    function cleanup() {
        cleanupEvent && cleanupEvent();
    }
}
function delegate(el, event, handlerGetter) {
    const handler = eventHandler(handlerGetter);
    handler.delegate = true;
    recordEventMetadata(el, event, handler);
}
function eventHandler(getter) {
    return (...args) => {
        let handler = getter();
        if (!handler)
            return;
        handler && handler(...args);
    }
    ;
}
var delegatedEvents = /* @__PURE__ */
Object.create(null);
var delegateEvents = (...names) => {
    for (const name of names) {
        if (!delegatedEvents[name]) {
            delegatedEvents[name] = true;
            document.addEventListener(name, delegatedEventHandler);
        }
    }
}
;
var delegatedEventHandler = (e) => {
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
        const handlers = getMetadata(node)[1 /* event */
        ][e.type];
        if (handlers) {
            for (const handler of handlers) {
                if (handler.delegate && !node.disabled) {
                    handler(e);
                    if (e.cancelBubble)
                        return;
                }
            }
        }
        node = node.host && node.host !== node && node.host instanceof Node ? node.host : node.parentNode;
    }
}
;
function setDynamicEvents(el, events) {
    for (const name in events) {
        on(el, name, () => events[name], {
            effect: true
        });
    }
}

// packages/runtime-vapor/src/dom/prop.ts
var hasFallthroughKey = (key) => currentInstance.hasFallthrough && key in currentInstance.attrs;
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
    if (value !== el[`$${key}`]) {
        el[`$${key}`] = value;
        if (value != null) {
            el.setAttribute(key, value);
        } else {
            el.removeAttribute(key);
        }
    }
}
function setDOMProp(el, key, value) {
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
        if (value == null && type === "string") {
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
        if (!needRemove) {
            warn3(`Failed setting prop "${key}" on <${el.tagName.toLowerCase()}>: value ${value} is invalid.`, e);
        }
    }
    needRemove && el.removeAttribute(key);
}
function setClass(el, value) {
    if (el.$root) {
        setClassIncremental(el, value);
    } else if ((value = normalizeClass(value)) !== el.$cls) {
        el.className = el.$cls = value;
    }
}
function setClassIncremental(el, value) {
    const cacheKey = `$clsi${isApplyingFallthroughProps ? "$" : ""}`;
    const prev = el[cacheKey];
    if ((value = el[cacheKey] = normalizeClass(value)) !== prev) {
        const nextList = value.split(/\s+/);
        el.classList.add(...nextList);
        if (prev) {
            for (const cls of prev.split(/\s+/)) {
                if (!nextList.includes(cls))
                    el.classList.remove(cls);
            }
        }
    }
}
function setStyle2(el, value) {
    if (el.$root) {
        setStyleIncremental(el, value);
    } else {
        const prev = el.$sty;
        value = el.$sty = normalizeStyle(value);
        patchStyle(el, prev, value);
    }
}
function setStyleIncremental(el, value) {
    const cacheKey = `$styi${isApplyingFallthroughProps ? "$" : ""}`;
    const prev = el[cacheKey];
    value = el[cacheKey] = isString(value) ? parseStringStyle(value) : normalizeStyle(value);
    patchStyle(el, prev, value);
    return value;
}
function setValue(el, value) {
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
function setText(el, ...values) {
    const value = values.length > 1 ? values.map(toDisplayString).join("") : toDisplayString(values[0]);
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
    if (key === "class") {
        setClass(el, value);
    } else if (key === "style") {
        setStyle2(el, value);
    } else if (isOn(key)) {
        on(el, key[2].toLowerCase() + key.slice(3), () => value, {
            effect: true
        });
    } else if (key[0] === "." ? (key = key.slice(1),
    true) : key[0] === "^" ? (key = key.slice(1),
    false) : shouldSetAsProp(el, key, value, isSVG)) {
        if (key === "innerHTML") {
            setHtml(el, value);
        } else if (key === "textContent") {
            setText(el, value);
        } else if (key === "value" && canSetValueDirectly(el.tagName)) {
            setValue(el, value);
        } else {
            setDOMProp(el, key, value);
        }
    } else {
        setAttr(el, key, value);
    }
    return value;
}

// packages/runtime-vapor/src/dom/node.ts
function createTextNode(values) {
    const node = document.createTextNode("");
    if (values) {
        if (isArray(values)) {
            setText(node, ...values);
        } else {
            renderEffect( () => setText(node, ...values()));
        }
    }
    return node;
}
// @__NO_SIDE_EFFECTS__
function createComment(data) {
    return document.createComment(data);
}

// packages/runtime-vapor/src/block.ts
var Fragment2 = class {
    constructor(nodes) {
        this.nodes = nodes;
    }
}
;
var DynamicFragment = class extends Fragment2 {
    constructor(anchorLabel) {
        super([]);
        this.anchor = anchorLabel ? createComment(anchorLabel) : (// eslint-disable-next-line no-restricted-globals
        document.createTextNode(""));
    }
    update(render2) {
        if (render2 === this.current) {
            return;
        }
        this.current = render2;
        pauseTracking();
        const parent = this.anchor.parentNode;
        if (this.scope) {
            this.scope.stop();
            parent && remove2(this.nodes, parent);
        }
        if (render2) {
            this.scope = new EffectScope();
            this.nodes = this.scope.run(render2) || [];
            if (parent)
                insert(this.nodes, parent, this.anchor);
        } else {
            this.scope = void 0;
            this.nodes = [];
        }
        if (this.fallback && !isValidBlock(this.nodes)) {
            parent && remove2(this.nodes, parent);
            this.nodes = (this.scope || (this.scope = new EffectScope())).run(this.fallback) || [];
            parent && insert(this.nodes, parent, this.anchor);
        }
        resetTracking();
    }
}
;
function isFragment(val) {
    return val instanceof Fragment2;
}
function isBlock(val) {
    return val instanceof Node || isArray(val) || isVaporComponent(val) || isFragment(val);
}
function isValidBlock(block) {
    if (block instanceof Node) {
        return !(block instanceof Comment);
    } else if (isVaporComponent(block)) {
        return isValidBlock(block.block);
    } else if (isArray(block)) {
        return block.length > 0 && block.every(isValidBlock);
    } else {
        return isValidBlock(block.nodes);
    }
}
function insert(block, parent, anchor=null) {
    anchor = anchor === 0 ? parent.firstChild : anchor;
    if (block instanceof Node) {
        parent.insertBefore(block, anchor);
    } else if (isVaporComponent(block)) {
        mountComponent(block, parent, anchor);
    } else if (isArray(block)) {
        for (let i = 0; i < block.length; i++) {
            insert(block[i], parent, anchor);
        }
    } else {
        insert(block.nodes, parent, anchor);
        if (block.anchor)
            insert(block.anchor, parent, anchor);
    }
}
function prepend(parent, ...blocks) {
    let i = blocks.length;
    while (i--)
        insert(blocks[i], parent, 0);
}
var parentsWithUnmountedChildren = null;
function remove2(block, parent) {
    const isRoot = !parentsWithUnmountedChildren;
    if (isRoot) {
        parentsWithUnmountedChildren = /* @__PURE__ */
        new Set();
    }
    if (block instanceof Node) {
        parent.removeChild(block);
    } else if (isVaporComponent(block)) {
        unmountComponent(block, parent);
    } else if (isArray(block)) {
        for (let i = 0; i < block.length; i++) {
            remove2(block[i], parent);
        }
    } else {
        remove2(block.nodes, parent);
        if (block.anchor)
            remove2(block.anchor, parent);
        if (block.scope) {
            ;block.scope.stop();
        }
    }
    if (isRoot) {
        for (const i of parentsWithUnmountedChildren) {
            i.children = i.children.filter( (n) => !n.isUnmounted);
        }
        parentsWithUnmountedChildren = null;
    }
}
function normalizeBlock(block) {
    if (false) {
        throw new Error("normalizeBlock should not be used in production code paths");
    }
    const nodes = [];
    if (block instanceof Node) {
        nodes.push(block);
    } else if (isArray(block)) {
        block.forEach( (child) => nodes.push(...normalizeBlock(child)));
    } else if (isVaporComponent(block)) {
        nodes.push(...normalizeBlock(block.block));
    } else {
        nodes.push(...normalizeBlock(block.nodes));
        block.anchor && nodes.push(block.anchor);
    }
    return nodes;
}

// packages/runtime-vapor/src/componentEmits.ts
function normalizeEmitsOptions2(comp) {
    const cached = comp.__emitsOptions;
    if (cached)
        return cached;
    const raw = comp.emits;
    if (!raw)
        return null;
    let normalized;
    if (isArray(raw)) {
        normalized = {};
        for (const key in raw)
            normalized[key] = null;
    } else {
        normalized = raw;
    }
    return comp.__emitsOptions = normalized;
}
function emit3(instance, event, ...rawArgs) {
    baseEmit(instance, instance.rawProps || EMPTY_OBJ, propGetter, event, ...rawArgs);
}
function propGetter(rawProps, key) {
    const dynamicSources = rawProps.$;
    if (dynamicSources) {
        let i = dynamicSources.length;
        while (i--) {
            const source = resolveSource(dynamicSources[i]);
            if (hasOwn(source, key))
                return source[key];
        }
    }
    return rawProps[key] && resolveSource(rawProps[key]);
}

// packages/runtime-vapor/src/componentProps.ts
function resolveSource(source) {
    return isFunction(source) ? source() : source;
}
function getPropsProxyHandlers(comp) {
    if (comp.__propsHandlers) {
        return comp.__propsHandlers;
    }
    const propsOptions = normalizePropsOptions2(comp)[0];
    const emitsOptions = normalizeEmitsOptions2(comp);
    const isProp = propsOptions ? (key) => isString(key) && hasOwn(propsOptions, camelize(key)) : NO;
    const isAttr = propsOptions ? (key) => key !== "$" && !isProp(key) && !isEmitListener(emitsOptions, key) : YES;
    const getProp = (instance, key) => {
        if (!isProp(key))
            return;
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
                        return resolvePropValue(propsOptions, key, isDynamic ? source[rawKey] : source[rawKey](), instance, resolveDefault);
                    }
                }
            }
        }
        for (const rawKey in rawProps) {
            if (camelize(rawKey) === key) {
                return resolvePropValue(propsOptions, key, rawProps[rawKey](), instance, resolveDefault);
            }
        }
        return resolvePropValue(propsOptions, key, void 0, instance, resolveDefault, true);
    }
    ;
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
    if (propsOptions) {
        Object.assign(propsHandlers, {
            set: propsSetDevTrap,
            deleteProperty: propsDeleteDevTrap
        });
    }
    const getAttr = (target, key) => {
        if (!isProp(key) && !isEmitListener(emitsOptions, key)) {
            return getAttrFromRawProps(target, key);
        }
    }
    ;
    const hasAttr = (target, key) => {
        if (isAttr(key)) {
            return hasAttrFromRawProps(target, key);
        } else {
            return false;
        }
    }
    ;
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
    if (true) {
        Object.assign(attrsHandlers, {
            set: propsSetDevTrap,
            deleteProperty: propsDeleteDevTrap
        });
    }
    return comp.__propsHandlers = [propsHandlers, attrsHandlers];
}
function getAttrFromRawProps(rawProps, key) {
    if (key === "$")
        return;
    const merged = key === "class" || key === "style" ? [] : void 0;
    const dynamicSources = rawProps.$;
    if (dynamicSources) {
        let i = dynamicSources.length;
        let source, isDynamic;
        while (i--) {
            source = dynamicSources[i];
            isDynamic = isFunction(source);
            source = isDynamic ? source() : source;
            if (hasOwn(source, key)) {
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
    return merged;
}
function hasAttrFromRawProps(rawProps, key) {
    if (key === "$")
        return false;
    const dynamicSources = rawProps.$;
    if (dynamicSources) {
        let i = dynamicSources.length;
        while (i--) {
            if (hasOwn(resolveSource(dynamicSources[i]), key)) {
                return true;
            }
        }
    }
    return hasOwn(rawProps, key);
}
function getKeysFromRawProps(rawProps) {
    const keys = [];
    for (const key in rawProps) {
        if (key !== "$")
            keys.push(key);
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
function normalizePropsOptions2(comp) {
    const cached = comp.__propsOptions;
    if (cached)
        return cached;
    const raw = comp.props;
    if (!raw)
        return EMPTY_ARR;
    const normalized = {};
    const needCastKeys = [];
    baseNormalizePropsOptions(raw, normalized, needCastKeys);
    return comp.__propsOptions = [normalized, needCastKeys];
}
function resolveDefault(factory, instance) {
    const prev = currentInstance;
    simpleSetCurrentInstance(instance);
    const res = factory.call(null, instance.props);
    simpleSetCurrentInstance(prev, instance);
    return res;
}
function hasFallthroughAttrs(comp, rawProps) {
    if (rawProps) {
        if (rawProps.$ || !comp.props) {
            return true;
        } else {
            const propsOptions = normalizePropsOptions2(comp)[0];
            for (const key in rawProps) {
                if (!hasOwn(propsOptions, camelize(key))) {
                    return true;
                }
            }
        }
    }
    return false;
}
function setupPropsValidation(instance) {
    const rawProps = instance.rawProps;
    if (!rawProps)
        return;
    renderEffect( () => {
        pushWarningContext(instance);
        validateProps(resolveDynamicProps(rawProps), instance.props, normalizePropsOptions2(instance.type)[0]);
        popWarningContext();
    }
    , true /* noLifecycle */
    );
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
function propsSetDevTrap(_, key) {
    warn3(`Attempt to mutate prop ${JSON.stringify(key)} failed. Props are readonly.`);
    return true;
}
function propsDeleteDevTrap(_, key) {
    warn3(`Attempt to delete prop ${JSON.stringify(key)} failed. Props are readonly.`);
    return true;
}

// packages/runtime-vapor/src/componentSlots.ts
var dynamicSlotsProxyHandlers = {
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
        const keys = Object.keys(target);
        const dynamicSources = target.$;
        if (dynamicSources) {
            for (const source of dynamicSources) {
                if (isFunction(source)) {
                    const slot = source();
                    if (isArray(slot)) {
                        for (const s of slot)
                            keys.push(s.name);
                    } else {
                        keys.push(slot.name);
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
    if (key === "$")
        return;
    const dynamicSources = target.$;
    if (dynamicSources) {
        let i = dynamicSources.length;
        let source;
        while (i--) {
            source = dynamicSources[i];
            if (isFunction(source)) {
                const slot = source();
                if (isArray(slot)) {
                    for (const s of slot) {
                        if (s.name === key)
                            return s.fn;
                    }
                } else if (slot.name === key) {
                    return slot.fn;
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
var dynamicSlotsPropsProxyHandlers = {
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
function createSlot(name, rawProps, fallback) {
    const instance = currentInstance;
    const rawSlots = instance.rawSlots;
    const isDynamicName = isFunction(name);
    const fragment = true ? new DynamicFragment("slot") : new DynamicFragment();
    const slotProps = rawProps ? new Proxy(rawProps,dynamicSlotsPropsProxyHandlers) : EMPTY_OBJ;
    const renderSlot2 = () => {
        const slot = getSlot(rawSlots, isFunction(name) ? name() : name);
        if (slot) {
            fragment.update(slot._bound || (slot._bound = () => {
                const slotContent = slot(slotProps);
                if (slotContent instanceof DynamicFragment) {
                    slotContent.fallback = fallback;
                }
                return slotContent;
            }
            ));
        } else {
            fragment.update(fallback);
        }
    }
    ;
    if (isDynamicName || rawSlots.$) {
        renderEffect(renderSlot2);
    } else {
        renderSlot2();
    }
    return fragment;
}
function createForSlots() {}

// packages/runtime-vapor/src/hmr.ts
function hmrRerender(instance) {
    const normalized = normalizeBlock(instance.block);
    const parent = normalized[0].parentNode;
    const anchor = normalized[normalized.length - 1].nextSibling;
    remove2(instance.block, parent);
    const prev = currentInstance;
    simpleSetCurrentInstance(instance);
    pushWarningContext(instance);
    devRender(instance);
    popWarningContext();
    simpleSetCurrentInstance(prev, instance);
    insert(instance.block, parent, anchor);
}
function hmrReload(instance, newComp) {
    const normalized = normalizeBlock(instance.block);
    const parent = normalized[0].parentNode;
    const anchor = normalized[normalized.length - 1].nextSibling;
    unmountComponent(instance, parent);
    const prev = currentInstance;
    simpleSetCurrentInstance(instance.parent);
    const newInstance = createComponent(newComp, instance.rawProps, instance.rawSlots, instance.isSingleRoot);
    simpleSetCurrentInstance(prev, instance.parent);
    mountComponent(newInstance, parent, anchor);
}

// packages/runtime-vapor/src/component.ts
function createComponent(component, rawProps, rawSlots, isSingleRoot, appContext) {
    if (isSingleRoot && component.inheritAttrs !== false && isVaporComponent(currentInstance) && currentInstance.hasFallthrough) {
        const attrs = currentInstance.attrs;
        if (rawProps) {
            ;(rawProps.$ || (rawProps.$ = [])).push( () => attrs);
        } else {
            rawProps = {
                $: [ () => attrs]
            };
        }
    }
    const instance = new VaporComponentInstance(component,rawProps,rawSlots,appContext);
    if (true) {
        pushWarningContext(instance);
        startMeasure(instance, `init`);
    }
    const prev = currentInstance;
    simpleSetCurrentInstance(instance);
    pauseTracking();
    const setupFn = isFunction(component) ? component : component.setup;
    const setupResult = setupFn ? callWithErrorHandling(setupFn, instance, 0 /* SETUP_FUNCTION */
    , [instance.props, instance]) || EMPTY_OBJ : EMPTY_OBJ;
    if (!isBlock(setupResult)) {
        if (isFunction(component)) {
            warn3(`Functional vapor component must return a block directly.`);
            instance.block = [];
        } else if (!component.render) {
            warn3(`Vapor component setup() returned non-block value, and has no render function.`);
            instance.block = [];
        } else {
            instance.devtoolsRawSetupState = setupResult;
            instance.setupState = proxyRefs(setupResult);
            devRender(instance);
            if (component.__hmrId) {
                registerHMR(instance);
                instance.isSingleRoot = isSingleRoot;
                instance.hmrRerender = hmrRerender.bind(null, instance);
                instance.hmrReload = hmrReload.bind(null, instance);
            }
        }
    } else {
        instance.block = setupResult;
    }
    if (instance.hasFallthrough && component.inheritAttrs !== false && instance.block instanceof Element && Object.keys(instance.attrs).length) {
        renderEffect( () => {
            isApplyingFallthroughProps = true;
            setDynamicProps(instance.block, [instance.attrs]);
            isApplyingFallthroughProps = false;
        }
        );
    }
    resetTracking();
    simpleSetCurrentInstance(prev, instance);
    if (true) {
        popWarningContext();
        endMeasure(instance, "init");
    }
    return instance;
}
var isApplyingFallthroughProps = false;
function devRender(instance) {
    instance.block = callWithErrorHandling(instance.type.render, instance, 1 /* RENDER_FUNCTION */
    , [instance.setupState, instance.props, instance.emit, instance.attrs, instance.slots]) || [];
}
var emptyContext = {
    app: null,
    config: {},
    provides: /* @__PURE__ */
    Object.create(null)
};
var VaporComponentInstance = class {
    constructor(comp, rawProps, rawSlots, appContext) {
        this.vapor = true;
        this.uid = nextUid();
        this.type = comp;
        this.parent = currentInstance;
        this.children = [];
        if (currentInstance) {
            if (isVaporComponent(currentInstance)) {
                currentInstance.children.push(this);
            }
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
        this.emit = emit3.bind(null, this);
        this.expose = expose.bind(null, this);
        this.refs = EMPTY_OBJ;
        this.emitted = this.exposed = this.exposeProxy = this.propsDefaults = this.suspense = null;
        this.isMounted = this.isUnmounted = this.isUpdating = this.isDeactivated = false;
        this.rawProps = rawProps || EMPTY_OBJ;
        this.hasFallthrough = hasFallthroughAttrs(comp, rawProps);
        if (rawProps || comp.props) {
            const [propsHandlers,attrsHandlers] = getPropsProxyHandlers(comp);
            this.attrs = new Proxy(this,attrsHandlers);
            this.props = comp.props ? new Proxy(this,propsHandlers) : isFunction(comp) ? this.attrs : EMPTY_OBJ;
        } else {
            this.props = this.attrs = EMPTY_OBJ;
        }
        this.rawSlots = rawSlots || EMPTY_OBJ;
        this.slots = rawSlots ? rawSlots.$ ? new Proxy(rawSlots,dynamicSlotsProxyHandlers) : rawSlots : EMPTY_OBJ;
        if (true) {
            if (rawProps)
                setupPropsValidation(this);
            this.propsOptions = normalizePropsOptions2(comp);
            this.emitsOptions = normalizeEmitsOptions2(comp);
        }
    }
}
;
function isVaporComponent(value) {
    return value instanceof VaporComponentInstance;
}
function createComponentWithFallback(comp, rawProps, rawSlots, isSingleRoot) {
    if (!isString(comp)) {
        return createComponent(comp, rawProps, rawSlots, isSingleRoot);
    }
    const el = document.createElement(comp);
    el.$root = isSingleRoot;
    if (rawProps) {
        renderEffect( () => {
            setDynamicProps(el, [resolveDynamicProps(rawProps)]);
        }
        );
    }
    if (rawSlots) {
        if (rawSlots.$) {} else {
            insert(getSlot(rawSlots, "default")(), el);
        }
    }
    return el;
}
function mountComponent(instance, parent, anchor) {
    if (true) {
        startMeasure(instance, `mount`);
    }
    if (!instance.isMounted) {
        if (instance.bm)
            invokeArrayFns(instance.bm);
        insert(instance.block, parent, anchor);
        if (instance.m)
            queuePostFlushCb( () => invokeArrayFns(instance.m));
        instance.isMounted = true;
    } else {
        insert(instance.block, parent, anchor);
    }
    if (true) {
        endMeasure(instance, `mount`);
    }
}
function unmountComponent(instance, parentNode) {
    if (instance.isMounted && !instance.isUnmounted) {
        if (instance.type.__hmrId) {
            unregisterHMR(instance);
        }
        if (instance.bum) {
            invokeArrayFns(instance.bum);
        }
        instance.scope.stop();
        for (const c of instance.children) {
            unmountComponent(c);
        }
        instance.children = EMPTY_ARR;
        if (parentNode) {
            remove2(instance.block, parentNode);
            const parentInstance = instance.parent;
            if (isVaporComponent(parentInstance)) {
                if (parentsWithUnmountedChildren) {
                    parentsWithUnmountedChildren.add(parentInstance);
                } else {
                    remove(parentInstance.children, instance);
                }
                instance.parent = null;
            }
        }
        if (instance.um) {
            queuePostFlushCb( () => invokeArrayFns(instance.um));
        }
        instance.isUnmounted = true;
    } else if (parentNode) {
        remove2(instance.block, parentNode);
    }
}
function getExposed(instance) {
    if (instance.exposed) {
        return instance.exposeProxy || (instance.exposeProxy = new Proxy(markRaw(instance.exposed),{
            get: (target, key) => unref(target[key])
        }));
    }
}

// packages/runtime-vapor/src/apiCreateApp.ts
var _createApp;
var mountApp = (app, container) => {
    if (container.nodeType === 1) {
        container.textContent = "";
    }
    const instance = createComponent(app._component, app._props, null, false, app._context);
    mountComponent(instance, container);
    flushOnAppMount();
    return instance;
}
;
var unmountApp = (app) => {
    unmountComponent(app._instance, app._container);
}
;
var createVaporApp = (comp, props) => {
    if (false) {
        initFeatureFlags2();
    }
    const target = getGlobalThis();
    target.__VUE__ = true;
    if (true) {
        setDevtoolsHook2(target.__VUE_DEVTOOLS_GLOBAL_HOOK__, target);
    }
    if (!_createApp)
        _createApp = createAppAPI(mountApp, unmountApp, getExposed);
    const app = _createApp(comp, props);
    if (true) {
        app.config.globalProperties = new Proxy({},{
            set() {
                warn3(`app.config.globalProperties is not supported in vapor mode.`);
                return false;
            }
        });
    }
    const mount = app.mount;
    app.mount = (container, ...args) => {
        container = normalizeContainer(container);
        return mount(container, ...args);
    }
    ;
    return app;
}
;

// packages/runtime-vapor/src/apiDefineComponent.ts
// @__NO_SIDE_EFFECTS__
function defineVaporComponent(comp) {
    return comp;
}

// packages/runtime-vapor/src/dom/template.ts
// @__NO_SIDE_EFFECTS__
function template(html, root) {
    let node;
    const create = () => {
        const t = document.createElement("template");
        t.innerHTML = html;
        return t.content.firstChild;
    }
    ;
    return () => {
        const ret = (node || (node = create())).cloneNode(true);
        if (root)
            ret.$root = true;
        return ret;
    }
    ;
}
// @__NO_SIDE_EFFECTS__
function children(node, ...paths) {
    for (const idx of paths) {
        node = idx === 0 ? node.firstChild : idx === 1 ? node.firstChild.nextSibling : node.childNodes[idx];
    }
    return node;
}
// @__NO_SIDE_EFFECTS__
function next(node, offset) {
    for (let i = 0; i < offset; i++) {
        node = node.nextSibling;
    }
    return node;
}

// packages/runtime-vapor/src/apiCreateIf.ts
function createIf(ifBlockGetter, once) {
    const frag = true ? new DynamicFragment("if") : new DynamicFragment();
    if (once) {
        frag.update(ifBlockGetter());
    } else {
        renderEffect( () => frag.update(ifBlockGetter()));
    }
    return frag;
}

// packages/runtime-vapor/src/apiCreateFor.ts
var createFor = (src, renderItem, getKey, container, hydrationNode, once) => {
    return [];
}
;

// packages/runtime-vapor/src/apiTemplateRef.ts
function createTemplateRefSetter() {
    const instance = currentInstance;
    return (...args) => setRef2(instance, ...args);
}
function setRef2(instance, el, ref2, oldRef, refFor=false) {
    if (!instance || instance.isUnmounted)
        return;
    const setupState = true ? instance.setupState || {} : null;
    const refValue = isVaporComponent(el) ? getExposed(el) || el : el;
    const refs = instance.refs === EMPTY_OBJ ? instance.refs = {} : instance.refs;
    if (oldRef != null && oldRef !== ref2) {
        if (isString(oldRef)) {
            refs[oldRef] = null;
            if (hasOwn(setupState, oldRef)) {
                setupState[oldRef] = null;
            }
        } else if (isRef(oldRef)) {
            oldRef.value = null;
        }
    }
    if (isFunction(ref2)) {
        const invokeRefSetter = (value) => {
            callWithErrorHandling(ref2, currentInstance, // @ts-expect-error
            null, [value, refs]);
        }
        ;
        invokeRefSetter(refValue);
        onScopeDispose( () => invokeRefSetter());
    } else {
        const _isString = isString(ref2);
        const _isRef = isRef(ref2);
        let existing;
        if (_isString || _isRef) {
            const doSet = () => {
                if (refFor) {
                    existing = _isString ? hasOwn(setupState, ref2) ? setupState[ref2] : refs[ref2] : ref2.value;
                    if (!isArray(existing)) {
                        existing = [refValue];
                        if (_isString) {
                            refs[ref2] = existing;
                            if (hasOwn(setupState, ref2)) {
                                setupState[ref2] = refs[ref2];
                                existing = setupState[ref2];
                            }
                        } else {
                            ref2.value = existing;
                        }
                    } else if (!existing.includes(refValue)) {
                        existing.push(refValue);
                    }
                } else if (_isString) {
                    refs[ref2] = refValue;
                    if (hasOwn(setupState, ref2)) {
                        setupState[ref2] = refValue;
                    }
                } else if (_isRef) {
                    ref2.value = refValue;
                } else if (true) {
                    warn3("Invalid template ref type:", ref2, `(${typeof ref2})`);
                }
            }
            ;
            doSet.id = -1;
            queuePostFlushCb(doSet);
            onScopeDispose( () => {
                queuePostFlushCb( () => {
                    if (isArray(existing)) {
                        remove(existing, refValue);
                    } else if (_isString) {
                        refs[ref2] = null;
                        if (hasOwn(setupState, ref2)) {
                            setupState[ref2] = null;
                        }
                    } else if (_isRef) {
                        ref2.value = null;
                    }
                }
                );
            }
            );
        } else if (true) {
            warn3("Invalid template ref type:", ref2, `(${typeof ref2})`);
        }
    }
    return ref2;
}
export {BaseTransition, BaseTransitionPropsValidators, Comment2 as Comment, DeprecationTypes, EffectScope, ErrorCodes, ErrorTypeStrings2 as ErrorTypeStrings, Fragment, KeepAlive, ReactiveEffect, Static, Suspense, Teleport, Text, TrackOpTypes, Transition, TransitionGroup, TriggerOpTypes, VueElement, assertNumber, baseEmit, baseNormalizePropsOptions, callWithAsyncErrorHandling, callWithErrorHandling, camelize, capitalize, children, cloneVNode, compatUtils, compile2 as compile, computed2 as computed, createApp, createAppAPI, createBlock, createCommentVNode, createComponent, createComponentWithFallback, createElementBlock, createBaseVNode as createElementVNode, createFor, createForSlots, createHydrationRenderer, createIf, createPropsRestProxy, createRenderer, createSSRApp, createSlot, createSlots, createStaticVNode, createTemplateRefSetter, createTextNode, createTextVNode, createVNode, createVaporApp, currentInstance, customRef, defineAsyncComponent, defineComponent, defineCustomElement, defineEmits, defineExpose, defineModel, defineOptions, defineProps, defineSSRCustomElement, defineSlots, defineVaporComponent, delegate, delegateEvents, devtools2 as devtools, effect, effectScope, endMeasure, expose, flushOnAppMount, getCurrentInstance, getCurrentScope, getCurrentWatcher, getTransitionRawChildren, guardReactiveProps, h, handleError, hasInjectionContext, hydrate, hydrateOnIdle, hydrateOnInteraction, hydrateOnMediaQuery, hydrateOnVisible, initCustomFormatter, initDirectivesForSSR, initFeatureFlags, inject, insert, isEmitListener, isMemoSame, isProxy, isReactive, isReadonly, isRef, isRuntimeOnly, isShallow, isVNode, markRaw, mergeDefaults, mergeModels, mergeProps, next, nextTick, nextUid, normalizeClass, normalizeContainer, normalizeProps, normalizeStyle, on, onActivated, onBeforeMount, onBeforeUnmount, onBeforeUpdate, onDeactivated, onErrorCaptured, onMounted, onRenderTracked, onRenderTriggered, onScopeDispose, onServerPrefetch, onUnmounted, onUpdated, onWatcherCleanup, openBlock, patchStyle, popScopeId, popWarningContext, prepend, provide, proxyRefs, pushScopeId, pushWarningContext, queueJob, queuePostFlushCb, reactive, readonly, ref, registerHMR, registerRuntimeCompiler, remove2 as remove, render, renderEffect, renderList, renderSlot, resolveComponent, resolveDirective, resolveDynamicComponent, resolveFilter, resolvePropValue, resolveTransitionHooks, setAttr, setBlockTracking, setClass, setDOMProp, setDevtoolsHook2 as setDevtoolsHook, setDynamicEvents, setDynamicProps, setHtml, setProp, setStyle2 as setStyle, setText, setTransitionHooks, setValue, shallowReactive, shallowReadonly, shallowRef, shouldSetAsProp, simpleSetCurrentInstance, ssrContextKey, ssrUtils, startMeasure, stop, template, toDisplayString, toHandlerKey, toHandlers, toRaw, toRef, toRefs, toValue, transformVNodeArgs, triggerRef, unref, unregisterHMR, useAttrs, useCssModule, useCssVars, useHost, useId, useModel, useSSRContext, useShadowRoot, useSlots, useTemplateRef, useTransitionState, vModelCheckbox, vModelDynamic, vModelRadio, vModelSelect, vModelText, vShow, validateComponentName, validateProps, version, warn3 as warn, watch2 as watch, watchEffect, watchPostEffect, watchSyncEffect, withAsyncContext, withCtx, withDefaults, withDirectives, withKeys, withMemo, withModifiers, withScopeId};
/*! #__NO_SIDE_EFFECTS__ */