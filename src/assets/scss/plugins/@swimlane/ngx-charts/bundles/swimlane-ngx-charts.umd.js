(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('@angular/cdk/portal'), require('rxjs'), require('rxjs/operators'), require('@angular/animations'), require('d3-selection'), require('d3-brush'), require('d3-scale'), require('d3-shape'), require('d3-array'), require('d3-interpolate'), require('d3-ease'), require('clone-deep'), require('d3-format'), require('d3-color'), require('d3-hierarchy'), require('d3-time-format')) :
    typeof define === 'function' && define.amd ? define('@swimlane/ngx-charts', ['exports', '@angular/core', '@angular/common', '@angular/cdk/portal', 'rxjs', 'rxjs/operators', '@angular/animations', 'd3-selection', 'd3-brush', 'd3-scale', 'd3-shape', 'd3-array', 'd3-interpolate', 'd3-ease', 'clone-deep', 'd3-format', 'd3-color', 'd3-hierarchy', 'd3-time-format'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.swimlane = global.swimlane || {}, global.swimlane['ngx-charts'] = {}), global.ng.core, global.ng.common, global.ng.cdk.portal, global.rxjs, global.rxjs.operators, global.ng.animations, global['d3-selection'], global['d3-brush'], global['d3-scale'], global['d3-shape'], global['d3-array'], global['d3-interpolate'], global.d3Ease, global.cloneDeep, global['d3-format'], global['d3-color'], global['d3-hierarchy'], global['d3-time-format']));
}(this, (function (exports, core, common, portal, rxjs, operators, animations, d3Selection, d3Brush, d3Scale, d3Shape, d3Array, d3Interpolate, d3Ease, cloneDeep, d3Format, d3_color, d3Hierarchy, d3TimeFormat) { 'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    function _interopNamespace(e) {
        if (e && e.__esModule) return e;
        var n = Object.create(null);
        if (e) {
            Object.keys(e).forEach(function (k) {
                if (k !== 'default') {
                    var d = Object.getOwnPropertyDescriptor(e, k);
                    Object.defineProperty(n, k, d.get ? d : {
                        enumerable: true,
                        get: function () {
                            return e[k];
                        }
                    });
                }
            });
        }
        n['default'] = e;
        return Object.freeze(n);
    }

    var cloneDeep__default = /*#__PURE__*/_interopDefaultLegacy(cloneDeep);
    var d3_color__namespace = /*#__PURE__*/_interopNamespace(d3_color);

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (Object.prototype.hasOwnProperty.call(b, p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    var __assign = function () {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    function __rest(s, e) {
        var t = {};
        for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
                t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }
    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }
    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); };
    }
    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(metadataKey, metadataValue);
    }
    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try {
                step(generator.next(value));
            }
            catch (e) {
                reject(e);
            } }
            function rejected(value) { try {
                step(generator["throw"](value));
            }
            catch (e) {
                reject(e);
            } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }
    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function () { if (t[0] & 1)
                throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f)
                throw new TypeError("Generator is already executing.");
            while (_)
                try {
                    if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                        return t;
                    if (y = 0, t)
                        op = [op[0] & 2, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _.label++;
                            return { value: op[1], done: false };
                        case 5:
                            _.label++;
                            y = op[1];
                            op = [0];
                            continue;
                        case 7:
                            op = _.ops.pop();
                            _.trys.pop();
                            continue;
                        default:
                            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                                _ = 0;
                                continue;
                            }
                            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                _.label = op[1];
                                break;
                            }
                            if (op[0] === 6 && _.label < t[1]) {
                                _.label = t[1];
                                t = op;
                                break;
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2];
                                _.ops.push(op);
                                break;
                            }
                            if (t[2])
                                _.ops.pop();
                            _.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _);
                }
                catch (e) {
                    op = [6, e];
                    y = 0;
                }
                finally {
                    f = t = 0;
                }
            if (op[0] & 5)
                throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
        }
    }
    var __createBinding = Object.create ? (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        Object.defineProperty(o, k2, { enumerable: true, get: function () { return m[k]; } });
    }) : (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        o[k2] = m[k];
    });
    function __exportStar(m, o) {
        for (var p in m)
            if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p))
                __createBinding(o, m, p);
    }
    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m)
            return m.call(o);
        if (o && typeof o.length === "number")
            return {
                next: function () {
                    if (o && i >= o.length)
                        o = void 0;
                    return { value: o && o[i++], done: !o };
                }
            };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    /** @deprecated */
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }
    /** @deprecated */
    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++)
            s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    }
    function __spreadArray(to, from, pack) {
        if (pack || arguments.length === 2)
            for (var i = 0, l = from.length, ar; i < l; i++) {
                if (ar || !(i in from)) {
                    if (!ar)
                        ar = Array.prototype.slice.call(from, 0, i);
                    ar[i] = from[i];
                }
            }
        return to.concat(ar || Array.prototype.slice.call(from));
    }
    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }
    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n])
            i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try {
            step(g[n](v));
        }
        catch (e) {
            settle(q[0][3], e);
        } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length)
            resume(q[0][0], q[0][1]); }
    }
    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }
    function __asyncValues(o) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function (v) { resolve({ value: v, done: d }); }, reject); }
    }
    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) {
            Object.defineProperty(cooked, "raw", { value: raw });
        }
        else {
            cooked.raw = raw;
        }
        return cooked;
    }
    ;
    var __setModuleDefault = Object.create ? (function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function (o, v) {
        o["default"] = v;
    };
    function __importStar(mod) {
        if (mod && mod.__esModule)
            return mod;
        var result = {};
        if (mod != null)
            for (var k in mod)
                if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
                    __createBinding(result, mod, k);
        __setModuleDefault(result, mod);
        return result;
    }
    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }
    function __classPrivateFieldGet(receiver, state, kind, f) {
        if (kind === "a" && !f)
            throw new TypeError("Private accessor was defined without a getter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
            throw new TypeError("Cannot read private member from an object whose class did not declare it");
        return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
    }
    function __classPrivateFieldSet(receiver, state, value, kind, f) {
        if (kind === "m")
            throw new TypeError("Private method is not writable");
        if (kind === "a" && !f)
            throw new TypeError("Private accessor was defined without a setter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
            throw new TypeError("Cannot write private member to an object whose class did not declare it");
        return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
    }

    function isViewContainerRef(x) {
        return x.element;
    }
    /**
     * Injection service is a helper to append components
     * dynamically to a known location in the DOM, most
     * noteably for dialogs/tooltips appending to body.
     *
     * @export
     */
    var InjectionService = /** @class */ (function () {
        function InjectionService(applicationRef, componentFactoryResolver, injector) {
            this.applicationRef = applicationRef;
            this.componentFactoryResolver = componentFactoryResolver;
            this.injector = injector;
        }
        /**
         * Sets a default global root view container. This is useful for
         * things like ngUpgrade that doesn't have a ApplicationRef root.
         *
         * @param container
         */
        InjectionService.setGlobalRootViewContainer = function (container) {
            InjectionService.globalRootViewContainer = container;
        };
        /**
         * Gets the root view container to inject the component to.
         *
         * @memberOf InjectionService
         */
        InjectionService.prototype.getRootViewContainer = function () {
            if (this._container)
                return this._container;
            if (InjectionService.globalRootViewContainer)
                return InjectionService.globalRootViewContainer;
            if (this.applicationRef.components.length)
                return this.applicationRef.components[0];
            throw new Error('View Container not found! ngUpgrade needs to manually set this via setRootViewContainer or setGlobalRootViewContainer.');
        };
        /**
         * Overrides the default root view container. This is useful for
         * things like ngUpgrade that doesn't have a ApplicationRef root.
         *
         * @param container
         *
         * @memberOf InjectionService
         */
        InjectionService.prototype.setRootViewContainer = function (container) {
            this._container = container;
        };
        /**
         * Gets the html element for a component ref.
         *
         * @param componentRef
         *
         * @memberOf InjectionService
         */
        InjectionService.prototype.getComponentRootNode = function (component) {
            if (isViewContainerRef(component)) {
                return component.element.nativeElement;
            }
            if (component.hostView && component.hostView.rootNodes.length > 0) {
                return component.hostView.rootNodes[0];
            }
            // the top most component root node has no `hostView`
            return component.location.nativeElement;
        };
        /**
         * Gets the root component container html element.
         *
         * @memberOf InjectionService
         */
        InjectionService.prototype.getRootViewContainerNode = function (component) {
            return this.getComponentRootNode(component);
        };
        /**
         * Projects the bindings onto the component
         *
         * @param component
         * @param options
         *
         * @memberOf InjectionService
         */
        InjectionService.prototype.projectComponentBindings = function (component, bindings) {
            var e_1, _a, e_2, _b;
            if (bindings) {
                if (bindings.inputs !== undefined) {
                    var bindingKeys = Object.getOwnPropertyNames(bindings.inputs);
                    try {
                        for (var bindingKeys_1 = __values(bindingKeys), bindingKeys_1_1 = bindingKeys_1.next(); !bindingKeys_1_1.done; bindingKeys_1_1 = bindingKeys_1.next()) {
                            var bindingName = bindingKeys_1_1.value;
                            component.instance[bindingName] = bindings.inputs[bindingName];
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (bindingKeys_1_1 && !bindingKeys_1_1.done && (_a = bindingKeys_1.return)) _a.call(bindingKeys_1);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                }
                if (bindings.outputs !== undefined) {
                    var eventKeys = Object.getOwnPropertyNames(bindings.outputs);
                    try {
                        for (var eventKeys_1 = __values(eventKeys), eventKeys_1_1 = eventKeys_1.next(); !eventKeys_1_1.done; eventKeys_1_1 = eventKeys_1.next()) {
                            var eventName = eventKeys_1_1.value;
                            component.instance[eventName] = bindings.outputs[eventName];
                        }
                    }
                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                    finally {
                        try {
                            if (eventKeys_1_1 && !eventKeys_1_1.done && (_b = eventKeys_1.return)) _b.call(eventKeys_1);
                        }
                        finally { if (e_2) throw e_2.error; }
                    }
                }
            }
            return component;
        };
        /**
         * Appends a component to a adjacent location
         *
         * @param componentClass
         * @param [options={}]
         * @param [location]
         *
         * @memberOf InjectionService
         */
        InjectionService.prototype.appendComponent = function (componentClass, bindings, location) {
            if (bindings === void 0) { bindings = {}; }
            if (!location)
                location = this.getRootViewContainer();
            var appendLocation = this.getComponentRootNode(location);
            var portalHost = new portal.DomPortalOutlet(appendLocation, this.componentFactoryResolver, this.applicationRef, this.injector);
            var portal$1 = new portal.ComponentPortal(componentClass);
            var componentRef = portalHost.attach(portal$1);
            this.projectComponentBindings(componentRef, bindings);
            return componentRef;
        };
        return InjectionService;
    }());
    InjectionService.globalRootViewContainer = null;
    InjectionService.decorators = [
        { type: core.Injectable }
    ];
    InjectionService.ctorParameters = function () { return [
        { type: core.ApplicationRef },
        { type: core.ComponentFactoryResolver },
        { type: core.Injector }
    ]; };

    /**
     * Throttle a function
     *
     */
    function throttle(func, wait, options) {
        options = options || {};
        var context;
        var args;
        var result;
        var timeout = null;
        var previous = 0;
        function later() {
            previous = options.leading === false ? 0 : +new Date();
            timeout = null;
            result = func.apply(context, args);
        }
        return function () {
            var now = +new Date();
            if (!previous && options.leading === false) {
                previous = now;
            }
            var remaining = wait - (now - previous);
            context = this;
            args = arguments;
            if (remaining <= 0) {
                clearTimeout(timeout);
                timeout = null;
                previous = now;
                result = func.apply(context, args);
            }
            else if (!timeout && options.trailing !== false) {
                timeout = setTimeout(later, remaining);
            }
            return result;
        };
    }
    /**
     * Throttle decorator
     *
     *  class MyClass {
     *    throttleable(10)
     *    myFn() { ... }
     *  }
     */
    function throttleable(duration, options) {
        return function innerDecorator(target, key, descriptor) {
            return {
                configurable: true,
                enumerable: descriptor.enumerable,
                get: function getter() {
                    Object.defineProperty(this, key, {
                        configurable: true,
                        enumerable: descriptor.enumerable,
                        value: throttle(descriptor.value, duration, options)
                    });
                    return this[key];
                }
            };
        };
    }

    exports.PlacementTypes = void 0;
    (function (PlacementTypes) {
        PlacementTypes["Top"] = "top";
        PlacementTypes["Bottom"] = "bottom";
        PlacementTypes["Left"] = "left";
        PlacementTypes["Right"] = "right";
        PlacementTypes["Center"] = "center";
    })(exports.PlacementTypes || (exports.PlacementTypes = {}));

    var caretOffset = 7;
    function verticalPosition(elDimensions, popoverDimensions, alignment) {
        if (alignment === exports.PlacementTypes.Top) {
            return elDimensions.top - caretOffset;
        }
        if (alignment === exports.PlacementTypes.Bottom) {
            return elDimensions.top + elDimensions.height - popoverDimensions.height + caretOffset;
        }
        if (alignment === exports.PlacementTypes.Center) {
            return elDimensions.top + elDimensions.height / 2 - popoverDimensions.height / 2;
        }
        return undefined;
    }
    function horizontalPosition(elDimensions, popoverDimensions, alignment) {
        if (alignment === exports.PlacementTypes.Left) {
            return elDimensions.left - caretOffset;
        }
        if (alignment === exports.PlacementTypes.Right) {
            return elDimensions.left + elDimensions.width - popoverDimensions.width + caretOffset;
        }
        if (alignment === exports.PlacementTypes.Center) {
            return elDimensions.left + elDimensions.width / 2 - popoverDimensions.width / 2;
        }
        return undefined;
    }
    /**
     * Position helper for the popover directive.
     *
     * @export
     */
    var PositionHelper = /** @class */ (function () {
        function PositionHelper() {
        }
        /**
         * Calculate vertical alignment position
         *
         * @memberOf PositionHelper
         */
        PositionHelper.calculateVerticalAlignment = function (elDimensions, popoverDimensions, alignment) {
            var result = verticalPosition(elDimensions, popoverDimensions, alignment);
            if (result + popoverDimensions.height > window.innerHeight) {
                result = window.innerHeight - popoverDimensions.height;
            }
            return result;
        };
        /**
         * Calculate vertical caret position
         *
         * @memberOf PositionHelper
         */
        PositionHelper.calculateVerticalCaret = function (elDimensions, popoverDimensions, caretDimensions, alignment) {
            var result;
            if (alignment === exports.PlacementTypes.Top) {
                result = elDimensions.height / 2 - caretDimensions.height / 2 + caretOffset;
            }
            if (alignment === exports.PlacementTypes.Bottom) {
                result = popoverDimensions.height - elDimensions.height / 2 - caretDimensions.height / 2 - caretOffset;
            }
            if (alignment === exports.PlacementTypes.Center) {
                result = popoverDimensions.height / 2 - caretDimensions.height / 2;
            }
            var popoverPosition = verticalPosition(elDimensions, popoverDimensions, alignment);
            if (popoverPosition + popoverDimensions.height > window.innerHeight) {
                result += popoverPosition + popoverDimensions.height - window.innerHeight;
            }
            return result;
        };
        /**
         * Calculate horz alignment position
         *
         * @memberOf PositionHelper
         */
        PositionHelper.calculateHorizontalAlignment = function (elDimensions, popoverDimensions, alignment) {
            var result = horizontalPosition(elDimensions, popoverDimensions, alignment);
            if (result + popoverDimensions.width > window.innerWidth) {
                result = window.innerWidth - popoverDimensions.width;
            }
            return result;
        };
        /**
         * Calculate horz caret position
         *
         * @memberOf PositionHelper
         */
        PositionHelper.calculateHorizontalCaret = function (elDimensions, popoverDimensions, caretDimensions, alignment) {
            var result;
            if (alignment === exports.PlacementTypes.Left) {
                result = elDimensions.width / 2 - caretDimensions.width / 2 + caretOffset;
            }
            if (alignment === exports.PlacementTypes.Right) {
                result = popoverDimensions.width - elDimensions.width / 2 - caretDimensions.width / 2 - caretOffset;
            }
            if (alignment === exports.PlacementTypes.Center) {
                result = popoverDimensions.width / 2 - caretDimensions.width / 2;
            }
            var popoverPosition = horizontalPosition(elDimensions, popoverDimensions, alignment);
            if (popoverPosition + popoverDimensions.width > window.innerWidth) {
                result += popoverPosition + popoverDimensions.width - window.innerWidth;
            }
            return result;
        };
        /**
         * Checks if the element's position should be flipped
         *
         * @memberOf PositionHelper
         */
        PositionHelper.shouldFlip = function (elDimensions, popoverDimensions, placement, spacing) {
            var flip = false;
            if (placement === exports.PlacementTypes.Right) {
                if (elDimensions.left + elDimensions.width + popoverDimensions.width + spacing > window.innerWidth) {
                    flip = true;
                }
            }
            if (placement === exports.PlacementTypes.Left) {
                if (elDimensions.left - popoverDimensions.width - spacing < 0) {
                    flip = true;
                }
            }
            if (placement === exports.PlacementTypes.Top) {
                if (elDimensions.top - popoverDimensions.height - spacing < 0) {
                    flip = true;
                }
            }
            if (placement === exports.PlacementTypes.Bottom) {
                if (elDimensions.top + elDimensions.height + popoverDimensions.height + spacing > window.innerHeight) {
                    flip = true;
                }
            }
            return flip;
        };
        /**
         * Position caret
         *
         * @memberOf PositionHelper
         */
        PositionHelper.positionCaret = function (placement, elmDim, hostDim, caretDimensions, alignment) {
            var top = 0;
            var left = 0;
            if (placement === exports.PlacementTypes.Right) {
                left = -7;
                top = PositionHelper.calculateVerticalCaret(hostDim, elmDim, caretDimensions, alignment);
            }
            else if (placement === exports.PlacementTypes.Left) {
                left = elmDim.width;
                top = PositionHelper.calculateVerticalCaret(hostDim, elmDim, caretDimensions, alignment);
            }
            else if (placement === exports.PlacementTypes.Top) {
                top = elmDim.height;
                left = PositionHelper.calculateHorizontalCaret(hostDim, elmDim, caretDimensions, alignment);
            }
            else if (placement === exports.PlacementTypes.Bottom) {
                top = -7;
                left = PositionHelper.calculateHorizontalCaret(hostDim, elmDim, caretDimensions, alignment);
            }
            return { top: top, left: left };
        };
        /**
         * Position content
         *
         * @memberOf PositionHelper
         */
        PositionHelper.positionContent = function (placement, elmDim, hostDim, spacing, alignment) {
            var top = 0;
            var left = 0;
            if (placement === exports.PlacementTypes.Right) {
                left = hostDim.left + hostDim.width + spacing;
                top = PositionHelper.calculateVerticalAlignment(hostDim, elmDim, alignment);
            }
            else if (placement === exports.PlacementTypes.Left) {
                left = hostDim.left - elmDim.width - spacing;
                top = PositionHelper.calculateVerticalAlignment(hostDim, elmDim, alignment);
            }
            else if (placement === exports.PlacementTypes.Top) {
                top = hostDim.top - elmDim.height - spacing;
                left = PositionHelper.calculateHorizontalAlignment(hostDim, elmDim, alignment);
            }
            else if (placement === exports.PlacementTypes.Bottom) {
                top = hostDim.top + hostDim.height + spacing;
                left = PositionHelper.calculateHorizontalAlignment(hostDim, elmDim, alignment);
            }
            return { top: top, left: left };
        };
        /**
         * Determine placement based on flip
         *
         * @memberOf PositionHelper
         */
        PositionHelper.determinePlacement = function (placement, elmDim, hostDim, spacing) {
            var shouldFlip = PositionHelper.shouldFlip(hostDim, elmDim, placement, spacing);
            if (shouldFlip) {
                if (placement === exports.PlacementTypes.Right) {
                    return exports.PlacementTypes.Left;
                }
                else if (placement === exports.PlacementTypes.Left) {
                    return exports.PlacementTypes.Right;
                }
                else if (placement === exports.PlacementTypes.Top) {
                    return exports.PlacementTypes.Bottom;
                }
                else if (placement === exports.PlacementTypes.Bottom) {
                    return exports.PlacementTypes.Top;
                }
            }
            return placement;
        };
        return PositionHelper;
    }());

    var TooltipContentComponent = /** @class */ (function () {
        function TooltipContentComponent(element, renderer, platformId) {
            this.element = element;
            this.renderer = renderer;
            this.platformId = platformId;
        }
        Object.defineProperty(TooltipContentComponent.prototype, "cssClasses", {
            get: function () {
                var clz = 'ngx-charts-tooltip-content';
                clz += " position-" + this.placement;
                clz += " type-" + this.type;
                clz += " " + this.cssClass;
                return clz;
            },
            enumerable: false,
            configurable: true
        });
        TooltipContentComponent.prototype.ngAfterViewInit = function () {
            setTimeout(this.position.bind(this));
        };
        TooltipContentComponent.prototype.position = function () {
            var _this = this;
            if (!common.isPlatformBrowser(this.platformId)) {
                return;
            }
            var nativeElm = this.element.nativeElement;
            var hostDim = this.host.nativeElement.getBoundingClientRect();
            // if no dims were found, never show
            if (!hostDim.height && !hostDim.width)
                return;
            var elmDim = nativeElm.getBoundingClientRect();
            this.checkFlip(hostDim, elmDim);
            this.positionContent(nativeElm, hostDim, elmDim);
            if (this.showCaret) {
                this.positionCaret(hostDim, elmDim);
            }
            // animate its entry
            setTimeout(function () { return _this.renderer.addClass(nativeElm, 'animate'); }, 1);
        };
        TooltipContentComponent.prototype.positionContent = function (nativeElm, hostDim, elmDim) {
            var _a = PositionHelper.positionContent(this.placement, elmDim, hostDim, this.spacing, this.alignment), top = _a.top, left = _a.left;
            this.renderer.setStyle(nativeElm, 'top', top + "px");
            this.renderer.setStyle(nativeElm, 'left', left + "px");
        };
        TooltipContentComponent.prototype.positionCaret = function (hostDim, elmDim) {
            var caretElm = this.caretElm.nativeElement;
            var caretDimensions = caretElm.getBoundingClientRect();
            var _a = PositionHelper.positionCaret(this.placement, elmDim, hostDim, caretDimensions, this.alignment), top = _a.top, left = _a.left;
            this.renderer.setStyle(caretElm, 'top', top + "px");
            this.renderer.setStyle(caretElm, 'left', left + "px");
        };
        TooltipContentComponent.prototype.checkFlip = function (hostDim, elmDim) {
            this.placement = PositionHelper.determinePlacement(this.placement, elmDim, hostDim, this.spacing);
        };
        TooltipContentComponent.prototype.onWindowResize = function () {
            this.position();
        };
        return TooltipContentComponent;
    }());
    TooltipContentComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'ngx-tooltip-content',
                    template: "\n    <div>\n      <span #caretElm [hidden]=\"!showCaret\" class=\"tooltip-caret position-{{ this.placement }}\"> </span>\n      <div class=\"tooltip-content\">\n        <span *ngIf=\"!title\">\n          <ng-template [ngTemplateOutlet]=\"template\" [ngTemplateOutletContext]=\"{ model: context }\"> </ng-template>\n        </span>\n        <span *ngIf=\"title\" [innerHTML]=\"title\"> </span>\n      </div>\n    </div>\n  ",
                    encapsulation: core.ViewEncapsulation.None,
                    styles: [".ngx-charts-tooltip-content{position:fixed;border-radius:3px;z-index:5000;display:block;font-weight:normal;opacity:0;pointer-events:none!important}.ngx-charts-tooltip-content.type-popover{background:#fff;color:#060709;border:1px solid #72809b;box-shadow:0 1px 3px #0003,0 1px 1px #00000024,0 2px 1px -1px #0000001f;font-size:13px;padding:4px}.ngx-charts-tooltip-content.type-popover .tooltip-caret{position:absolute;z-index:5001;width:0;height:0}.ngx-charts-tooltip-content.type-popover .tooltip-caret.position-left{border-top:7px solid transparent;border-bottom:7px solid transparent;border-left:7px solid #fff}.ngx-charts-tooltip-content.type-popover .tooltip-caret.position-top{border-left:7px solid transparent;border-right:7px solid transparent;border-top:7px solid #fff}.ngx-charts-tooltip-content.type-popover .tooltip-caret.position-right{border-top:7px solid transparent;border-bottom:7px solid transparent;border-right:7px solid #fff}.ngx-charts-tooltip-content.type-popover .tooltip-caret.position-bottom{border-left:7px solid transparent;border-right:7px solid transparent;border-bottom:7px solid #fff}.ngx-charts-tooltip-content.type-tooltip{color:#fff;background:rgba(0,0,0,.75);font-size:12px;padding:0 10px;text-align:center;pointer-events:auto}.ngx-charts-tooltip-content.type-tooltip .tooltip-caret.position-left{border-top:7px solid transparent;border-bottom:7px solid transparent;border-left:7px solid rgba(0,0,0,.75)}.ngx-charts-tooltip-content.type-tooltip .tooltip-caret.position-top{border-left:7px solid transparent;border-right:7px solid transparent;border-top:7px solid rgba(0,0,0,.75)}.ngx-charts-tooltip-content.type-tooltip .tooltip-caret.position-right{border-top:7px solid transparent;border-bottom:7px solid transparent;border-right:7px solid rgba(0,0,0,.75)}.ngx-charts-tooltip-content.type-tooltip .tooltip-caret.position-bottom{border-left:7px solid transparent;border-right:7px solid transparent;border-bottom:7px solid rgba(0,0,0,.75)}.ngx-charts-tooltip-content .tooltip-label{display:block;line-height:1em;padding:8px 5px 5px;font-size:1em}.ngx-charts-tooltip-content .tooltip-val{display:block;font-size:1.3em;line-height:1em;padding:0 5px 8px}.ngx-charts-tooltip-content .tooltip-caret{position:absolute;z-index:5001;width:0;height:0}.ngx-charts-tooltip-content.position-right{transform:translate(10px)}.ngx-charts-tooltip-content.position-left{transform:translate(-10px)}.ngx-charts-tooltip-content.position-top{transform:translateY(-10px)}.ngx-charts-tooltip-content.position-bottom{transform:translateY(10px)}.ngx-charts-tooltip-content.animate{opacity:1;transition:opacity .3s,transform .3s;transform:translate(0);pointer-events:auto}.area-tooltip-container{padding:5px 0;pointer-events:none}.tooltip-item{text-align:left;line-height:1.2em;padding:5px 0}.tooltip-item .tooltip-item-color{display:inline-block;height:12px;width:12px;margin-right:5px;color:#5b646b;border-radius:3px}\n"]
                },] }
    ];
    TooltipContentComponent.ctorParameters = function () { return [
        { type: core.ElementRef },
        { type: core.Renderer2 },
        { type: undefined, decorators: [{ type: core.Inject, args: [core.PLATFORM_ID,] }] }
    ]; };
    TooltipContentComponent.propDecorators = {
        host: [{ type: core.Input }],
        showCaret: [{ type: core.Input }],
        type: [{ type: core.Input }],
        placement: [{ type: core.Input }],
        alignment: [{ type: core.Input }],
        spacing: [{ type: core.Input }],
        cssClass: [{ type: core.Input }],
        title: [{ type: core.Input }],
        template: [{ type: core.Input }],
        context: [{ type: core.Input }],
        caretElm: [{ type: core.ViewChild, args: ['caretElm',] }],
        cssClasses: [{ type: core.HostBinding, args: ['class',] }],
        onWindowResize: [{ type: core.HostListener, args: ['window:resize',] }]
    };
    __decorate([
        throttleable(100)
    ], TooltipContentComponent.prototype, "onWindowResize", null);

    var InjectionRegisteryService = /** @class */ (function () {
        function InjectionRegisteryService(injectionService) {
            this.injectionService = injectionService;
            this.defaults = {};
            this.components = new Map();
        }
        InjectionRegisteryService.prototype.getByType = function (type) {
            if (type === void 0) { type = this.type; }
            return this.components.get(type);
        };
        InjectionRegisteryService.prototype.create = function (bindings) {
            return this.createByType(this.type, bindings);
        };
        InjectionRegisteryService.prototype.createByType = function (type, bindings) {
            bindings = this.assignDefaults(bindings);
            var component = this.injectComponent(type, bindings);
            this.register(type, component);
            return component;
        };
        InjectionRegisteryService.prototype.destroy = function (instance) {
            var compsByType = this.components.get(instance.componentType);
            if (compsByType && compsByType.length) {
                var idx = compsByType.indexOf(instance);
                if (idx > -1) {
                    var component = compsByType[idx];
                    component.destroy();
                    compsByType.splice(idx, 1);
                }
            }
        };
        InjectionRegisteryService.prototype.destroyAll = function () {
            this.destroyByType(this.type);
        };
        InjectionRegisteryService.prototype.destroyByType = function (type) {
            var comps = this.components.get(type);
            if (comps && comps.length) {
                var i = comps.length - 1;
                while (i >= 0) {
                    this.destroy(comps[i--]);
                }
            }
        };
        InjectionRegisteryService.prototype.injectComponent = function (type, bindings) {
            return this.injectionService.appendComponent(type, bindings);
        };
        InjectionRegisteryService.prototype.assignDefaults = function (bindings) {
            var inputs = Object.assign({}, this.defaults.inputs);
            var outputs = Object.assign({}, this.defaults.outputs);
            if (!bindings.inputs && !bindings.outputs) {
                bindings = { inputs: bindings };
            }
            if (inputs) {
                bindings.inputs = Object.assign(Object.assign({}, inputs), bindings.inputs);
            }
            if (outputs) {
                bindings.outputs = Object.assign(Object.assign({}, outputs), bindings.outputs);
            }
            return bindings;
        };
        InjectionRegisteryService.prototype.register = function (type, component) {
            if (!this.components.has(type)) {
                this.components.set(type, []);
            }
            var types = this.components.get(type);
            types.push(component);
        };
        return InjectionRegisteryService;
    }());

    var TooltipService = /** @class */ (function (_super) {
        __extends(TooltipService, _super);
        function TooltipService(injectionService) {
            var _this = _super.call(this, injectionService) || this;
            _this.type = TooltipContentComponent;
            return _this;
        }
        return TooltipService;
    }(InjectionRegisteryService));
    TooltipService.decorators = [
        { type: core.Injectable }
    ];
    TooltipService.ctorParameters = function () { return [
        { type: InjectionService }
    ]; };

    exports.LegendPosition = void 0;
    (function (LegendPosition) {
        LegendPosition["Right"] = "right";
        LegendPosition["Below"] = "below";
    })(exports.LegendPosition || (exports.LegendPosition = {}));
    exports.LegendType = void 0;
    (function (LegendType) {
        LegendType["ScaleLegend"] = "scaleLegend";
        LegendType["Legend"] = "legend";
    })(exports.LegendType || (exports.LegendType = {}));

    exports.ScaleType = void 0;
    (function (ScaleType) {
        ScaleType["Time"] = "time";
        ScaleType["Linear"] = "linear";
        ScaleType["Ordinal"] = "ordinal";
        ScaleType["Quantile"] = "quantile";
    })(exports.ScaleType || (exports.ScaleType = {}));

    var ChartComponent = /** @class */ (function () {
        function ChartComponent() {
            this.showLegend = false;
            this.animations = true;
            this.legendLabelClick = new core.EventEmitter();
            this.legendLabelActivate = new core.EventEmitter();
            this.legendLabelDeactivate = new core.EventEmitter();
            this.LegendPosition = exports.LegendPosition;
            this.LegendType = exports.LegendType;
        }
        ChartComponent.prototype.ngOnChanges = function (changes) {
            this.update();
        };
        ChartComponent.prototype.update = function () {
            var legendColumns = 0;
            if (this.showLegend) {
                this.legendType = this.getLegendType();
                if (!this.legendOptions || this.legendOptions.position === exports.LegendPosition.Right) {
                    if (this.legendType === exports.LegendType.ScaleLegend) {
                        legendColumns = 1;
                    }
                    else {
                        legendColumns = 2;
                    }
                }
            }
            var chartColumns = 12 - legendColumns;
            this.chartWidth = Math.floor((this.view[0] * chartColumns) / 12.0);
            this.legendWidth =
                !this.legendOptions || this.legendOptions.position === exports.LegendPosition.Right
                    ? Math.floor((this.view[0] * legendColumns) / 12.0)
                    : this.chartWidth;
        };
        ChartComponent.prototype.getLegendType = function () {
            return this.legendOptions.scaleType === exports.ScaleType.Linear ? exports.LegendType.ScaleLegend : exports.LegendType.Legend;
        };
        return ChartComponent;
    }());
    ChartComponent.decorators = [
        { type: core.Component, args: [{
                    providers: [TooltipService],
                    selector: 'ngx-charts-chart',
                    template: "\n    <div class=\"ngx-charts-outer\" [style.width.px]=\"view[0]\">\n      <svg class=\"ngx-charts\" [attr.width]=\"chartWidth\" [attr.height]=\"view[1]\">\n        <ng-content></ng-content>\n      </svg>\n      <ngx-charts-scale-legend\n        *ngIf=\"showLegend && legendType === LegendType.ScaleLegend\"\n        class=\"chart-legend\"\n        [horizontal]=\"legendOptions && legendOptions.position === LegendPosition.Below\"\n        [valueRange]=\"legendOptions.domain\"\n        [colors]=\"legendOptions.colors\"\n        [height]=\"view[1]\"\n        [width]=\"legendWidth\"\n      >\n      </ngx-charts-scale-legend>\n      <ngx-charts-legend\n        *ngIf=\"showLegend && legendType === LegendType.Legend\"\n        class=\"chart-legend\"\n        [horizontal]=\"legendOptions && legendOptions.position === LegendPosition.Below\"\n        [data]=\"legendOptions.domain\"\n        [title]=\"legendOptions.title\"\n        [colors]=\"legendOptions.colors\"\n        [height]=\"view[1]\"\n        [width]=\"legendWidth\"\n        [activeEntries]=\"activeEntries\"\n        (labelClick)=\"legendLabelClick.emit($event)\"\n        (labelActivate)=\"legendLabelActivate.emit($event)\"\n        (labelDeactivate)=\"legendLabelDeactivate.emit($event)\"\n      >\n      </ngx-charts-legend>\n    </div>\n  ",
                    changeDetection: core.ChangeDetectionStrategy.OnPush
                },] }
    ];
    ChartComponent.propDecorators = {
        view: [{ type: core.Input }],
        showLegend: [{ type: core.Input }],
        legendOptions: [{ type: core.Input }],
        legendType: [{ type: core.Input }],
        activeEntries: [{ type: core.Input }],
        animations: [{ type: core.Input }],
        legendLabelClick: [{ type: core.Output }],
        legendLabelActivate: [{ type: core.Output }],
        legendLabelDeactivate: [{ type: core.Output }]
    };

    /**
     * Visibility Observer
     */
    var VisibilityObserver = /** @class */ (function () {
        function VisibilityObserver(element, zone) {
            this.element = element;
            this.zone = zone;
            this.visible = new core.EventEmitter();
            this.isVisible = false;
            this.runCheck();
        }
        VisibilityObserver.prototype.destroy = function () {
            clearTimeout(this.timeout);
        };
        VisibilityObserver.prototype.onVisibilityChange = function () {
            var _this = this;
            // trigger zone recalc for columns
            this.zone.run(function () {
                _this.isVisible = true;
                _this.visible.emit(true);
            });
        };
        VisibilityObserver.prototype.runCheck = function () {
            var _this = this;
            var check = function () {
                if (!_this.element) {
                    return;
                }
                // https://davidwalsh.name/offsetheight-visibility
                var _a = _this.element.nativeElement, offsetHeight = _a.offsetHeight, offsetWidth = _a.offsetWidth;
                if (offsetHeight && offsetWidth) {
                    clearTimeout(_this.timeout);
                    _this.onVisibilityChange();
                }
                else {
                    clearTimeout(_this.timeout);
                    _this.zone.runOutsideAngular(function () {
                        _this.timeout = setTimeout(function () { return check(); }, 100);
                    });
                }
            };
            this.zone.runOutsideAngular(function () {
                _this.timeout = setTimeout(function () { return check(); });
            });
        };
        return VisibilityObserver;
    }());
    VisibilityObserver.decorators = [
        { type: core.Directive, args: [{
                    selector: 'visibility-observer'
                },] }
    ];
    VisibilityObserver.ctorParameters = function () { return [
        { type: core.ElementRef },
        { type: core.NgZone }
    ]; };
    VisibilityObserver.propDecorators = {
        visible: [{ type: core.Output }]
    };

    function isDate(value) {
        return toString.call(value) === '[object Date]';
    }
    function isNumber(value) {
        return typeof value === 'number';
    }

    var BaseChartComponent = /** @class */ (function () {
        function BaseChartComponent(chartElement, zone, cd, platformId) {
            this.chartElement = chartElement;
            this.zone = zone;
            this.cd = cd;
            this.platformId = platformId;
            this.scheme = 'cool';
            this.schemeType = exports.ScaleType.Ordinal;
            this.animations = true;
            this.select = new core.EventEmitter();
        }
        BaseChartComponent.prototype.ngOnInit = function () {
            if (common.isPlatformServer(this.platformId)) {
                this.animations = false;
            }
        };
        BaseChartComponent.prototype.ngAfterViewInit = function () {
            this.bindWindowResizeEvent();
            // listen for visibility of the element for hidden by default scenario
            this.visibilityObserver = new VisibilityObserver(this.chartElement, this.zone);
            this.visibilityObserver.visible.subscribe(this.update.bind(this));
        };
        BaseChartComponent.prototype.ngOnDestroy = function () {
            this.unbindEvents();
            if (this.visibilityObserver) {
                this.visibilityObserver.visible.unsubscribe();
                this.visibilityObserver.destroy();
            }
        };
        BaseChartComponent.prototype.ngOnChanges = function (changes) {
            this.update();
        };
        BaseChartComponent.prototype.update = function () {
            if (this.results) {
                this.results = this.cloneData(this.results);
            }
            else {
                this.results = [];
            }
            if (this.view) {
                this.width = this.view[0];
                this.height = this.view[1];
            }
            else {
                var dims = this.getContainerDims();
                if (dims) {
                    this.width = dims.width;
                    this.height = dims.height;
                }
            }
            // default values if width or height are 0 or undefined
            if (!this.width) {
                this.width = 600;
            }
            if (!this.height) {
                this.height = 400;
            }
            this.width = Math.floor(this.width);
            this.height = Math.floor(this.height);
            if (this.cd) {
                this.cd.markForCheck();
            }
        };
        BaseChartComponent.prototype.getContainerDims = function () {
            var width;
            var height;
            var hostElem = this.chartElement.nativeElement;
            if (common.isPlatformBrowser(this.platformId) && hostElem.parentNode !== null) {
                // Get the container dimensions
                var dims = hostElem.parentNode.getBoundingClientRect();
                width = dims.width;
                height = dims.height;
            }
            if (width && height) {
                return { width: width, height: height };
            }
            return null;
        };
        /**
         * Converts all date objects that appear as name
         * into formatted date strings
         */
        BaseChartComponent.prototype.formatDates = function () {
            for (var i = 0; i < this.results.length; i++) {
                var g = this.results[i];
                g.label = g.name;
                if (isDate(g.label)) {
                    g.label = g.label.toLocaleDateString();
                }
                if (g.series) {
                    for (var j = 0; j < g.series.length; j++) {
                        var d = g.series[j];
                        d.label = d.name;
                        if (isDate(d.label)) {
                            d.label = d.label.toLocaleDateString();
                        }
                    }
                }
            }
        };
        BaseChartComponent.prototype.unbindEvents = function () {
            if (this.resizeSubscription) {
                this.resizeSubscription.unsubscribe();
            }
        };
        BaseChartComponent.prototype.bindWindowResizeEvent = function () {
            var _this = this;
            if (!common.isPlatformBrowser(this.platformId)) {
                return;
            }
            var source = rxjs.fromEvent(window, 'resize');
            var subscription = source.pipe(operators.debounceTime(200)).subscribe(function (e) {
                _this.update();
                if (_this.cd) {
                    _this.cd.markForCheck();
                }
            });
            this.resizeSubscription = subscription;
        };
        /**
         * Clones the data into a new object
         *
         * @memberOf BaseChart
         */
        BaseChartComponent.prototype.cloneData = function (data) {
            var e_1, _a, e_2, _b;
            var results = [];
            try {
                for (var data_1 = __values(data), data_1_1 = data_1.next(); !data_1_1.done; data_1_1 = data_1.next()) {
                    var item = data_1_1.value;
                    var copy = {
                        name: item['name']
                    };
                    if (item['value'] !== undefined) {
                        copy['value'] = item['value'];
                    }
                    if (item['series'] !== undefined) {
                        copy['series'] = [];
                        try {
                            for (var _c = (e_2 = void 0, __values(item['series'])), _d = _c.next(); !_d.done; _d = _c.next()) {
                                var seriesItem = _d.value;
                                var seriesItemCopy = Object.assign({}, seriesItem);
                                copy['series'].push(seriesItemCopy);
                            }
                        }
                        catch (e_2_1) { e_2 = { error: e_2_1 }; }
                        finally {
                            try {
                                if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
                            }
                            finally { if (e_2) throw e_2.error; }
                        }
                    }
                    if (item['extra'] !== undefined) {
                        copy['extra'] = JSON.parse(JSON.stringify(item['extra']));
                    }
                    results.push(copy);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (data_1_1 && !data_1_1.done && (_a = data_1.return)) _a.call(data_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return results;
        };
        return BaseChartComponent;
    }());
    BaseChartComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'base-chart',
                    template: " <div></div> "
                },] }
    ];
    BaseChartComponent.ctorParameters = function () { return [
        { type: core.ElementRef },
        { type: core.NgZone },
        { type: core.ChangeDetectorRef },
        { type: undefined, decorators: [{ type: core.Inject, args: [core.PLATFORM_ID,] }] }
    ]; };
    BaseChartComponent.propDecorators = {
        results: [{ type: core.Input }],
        view: [{ type: core.Input }],
        scheme: [{ type: core.Input }],
        schemeType: [{ type: core.Input }],
        customColors: [{ type: core.Input }],
        animations: [{ type: core.Input }],
        select: [{ type: core.Output }]
    };

    exports.Orientation = void 0;
    (function (Orientation) {
        Orientation["Top"] = "top";
        Orientation["Bottom"] = "bottom";
        Orientation["Left"] = "left";
        Orientation["Right"] = "right";
    })(exports.Orientation || (exports.Orientation = {}));

    var AxisLabelComponent = /** @class */ (function () {
        function AxisLabelComponent(element) {
            this.textHeight = 25;
            this.margin = 5;
            this.element = element.nativeElement;
        }
        AxisLabelComponent.prototype.ngOnChanges = function (changes) {
            this.update();
        };
        AxisLabelComponent.prototype.update = function () {
            this.strokeWidth = '0.01';
            this.textAnchor = 'middle';
            this.transform = '';
            switch (this.orient) {
                case exports.Orientation.Top:
                    this.y = this.offset;
                    this.x = this.width / 2;
                    break;
                case exports.Orientation.Bottom:
                    this.y = this.offset;
                    this.x = this.width / 2;
                    break;
                case exports.Orientation.Left:
                    this.y = -(this.offset + this.textHeight + this.margin);
                    this.x = -this.height / 2;
                    this.transform = 'rotate(270)';
                    break;
                case exports.Orientation.Right:
                    this.y = this.offset + this.margin;
                    this.x = -this.height / 2;
                    this.transform = 'rotate(270)';
                    break;
                default:
            }
        };
        return AxisLabelComponent;
    }());
    AxisLabelComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'g[ngx-charts-axis-label]',
                    template: "\n    <svg:text\n      [attr.stroke-width]=\"strokeWidth\"\n      [attr.x]=\"x\"\n      [attr.y]=\"y\"\n      [attr.text-anchor]=\"textAnchor\"\n      [attr.transform]=\"transform\"\n    >\n      {{ label }}\n    </svg:text>\n  ",
                    changeDetection: core.ChangeDetectionStrategy.OnPush
                },] }
    ];
    AxisLabelComponent.ctorParameters = function () { return [
        { type: core.ElementRef }
    ]; };
    AxisLabelComponent.propDecorators = {
        orient: [{ type: core.Input }],
        label: [{ type: core.Input }],
        offset: [{ type: core.Input }],
        width: [{ type: core.Input }],
        height: [{ type: core.Input }]
    };

    function trimLabel(s, max) {
        if (max === void 0) { max = 16; }
        if (typeof s !== 'string') {
            if (typeof s === 'number') {
                return s + '';
            }
            else {
                return '';
            }
        }
        s = s.trim();
        if (s.length <= max) {
            return s;
        }
        else {
            return s.slice(0, max) + "...";
        }
    }

    function reduceTicks(ticks, maxTicks) {
        if (ticks.length > maxTicks) {
            var reduced = [];
            var modulus = Math.floor(ticks.length / maxTicks);
            for (var i = 0; i < ticks.length; i++) {
                if (i % modulus === 0) {
                    reduced.push(ticks[i]);
                }
            }
            ticks = reduced;
        }
        return ticks;
    }

    exports.TextAnchor = void 0;
    (function (TextAnchor) {
        TextAnchor["Start"] = "start";
        TextAnchor["Middle"] = "middle";
        TextAnchor["End"] = "end";
    })(exports.TextAnchor || (exports.TextAnchor = {}));

    var XAxisTicksComponent = /** @class */ (function () {
        function XAxisTicksComponent(platformId) {
            this.platformId = platformId;
            this.tickArguments = [5];
            this.tickStroke = '#ccc';
            this.trimTicks = true;
            this.maxTickLength = 16;
            this.showGridLines = false;
            this.rotateTicks = true;
            this.dimensionsChanged = new core.EventEmitter();
            this.verticalSpacing = 20;
            this.rotateLabels = false;
            this.innerTickSize = 6;
            this.outerTickSize = 6;
            this.tickPadding = 3;
            this.textAnchor = exports.TextAnchor.Middle;
            this.maxTicksLength = 0;
            this.maxAllowedLength = 16;
            this.height = 0;
            this.approxHeight = 10;
        }
        XAxisTicksComponent.prototype.ngOnChanges = function (changes) {
            this.update();
        };
        XAxisTicksComponent.prototype.ngAfterViewInit = function () {
            var _this = this;
            setTimeout(function () { return _this.updateDims(); });
        };
        XAxisTicksComponent.prototype.updateDims = function () {
            var _this = this;
            if (!common.isPlatformBrowser(this.platformId)) {
                // for SSR, use approximate value instead of measured
                this.dimensionsChanged.emit({ height: this.approxHeight });
                return;
            }
            var height = parseInt(this.ticksElement.nativeElement.getBoundingClientRect().height, 10);
            if (height !== this.height) {
                this.height = height;
                this.dimensionsChanged.emit({ height: this.height });
                setTimeout(function () { return _this.updateDims(); });
            }
        };
        XAxisTicksComponent.prototype.update = function () {
            var _this = this;
            var scale = this.scale;
            this.ticks = this.getTicks();
            if (this.tickFormatting) {
                this.tickFormat = this.tickFormatting;
            }
            else if (scale.tickFormat) {
                this.tickFormat = scale.tickFormat.apply(scale, this.tickArguments);
            }
            else {
                this.tickFormat = function (d) {
                    if (d.constructor.name === 'Date') {
                        return d.toLocaleDateString();
                    }
                    return d.toLocaleString();
                };
            }
            var angle = this.rotateTicks ? this.getRotationAngle(this.ticks) : null;
            this.adjustedScale = this.scale.bandwidth
                ? function (d) {
                    return this.scale(d) + this.scale.bandwidth() * 0.5;
                }
                : this.scale;
            this.textTransform = '';
            if (angle && angle !== 0) {
                this.textTransform = "rotate(" + angle + ")";
                this.textAnchor = exports.TextAnchor.End;
                this.verticalSpacing = 10;
            }
            else {
                this.textAnchor = exports.TextAnchor.Middle;
            }
            setTimeout(function () { return _this.updateDims(); });
        };
        XAxisTicksComponent.prototype.getRotationAngle = function (ticks) {
            var angle = 0;
            this.maxTicksLength = 0;
            for (var i = 0; i < ticks.length; i++) {
                var tick = this.tickFormat(ticks[i]).toString();
                var tickLength = tick.length;
                if (this.trimTicks) {
                    tickLength = this.tickTrim(tick).length;
                }
                if (tickLength > this.maxTicksLength) {
                    this.maxTicksLength = tickLength;
                }
            }
            var len = Math.min(this.maxTicksLength, this.maxAllowedLength);
            var charWidth = 7; // need to measure this
            var wordWidth = len * charWidth;
            var baseWidth = wordWidth;
            var maxBaseWidth = Math.floor(this.width / ticks.length);
            // calculate optimal angle
            while (baseWidth > maxBaseWidth && angle > -90) {
                angle -= 30;
                baseWidth = Math.cos(angle * (Math.PI / 180)) * wordWidth;
            }
            this.approxHeight = Math.max(Math.abs(Math.sin(angle * (Math.PI / 180)) * wordWidth), 10);
            return angle;
        };
        XAxisTicksComponent.prototype.getTicks = function () {
            var ticks;
            var maxTicks = this.getMaxTicks(20);
            var maxScaleTicks = this.getMaxTicks(100);
            if (this.tickValues) {
                ticks = this.tickValues;
            }
            else if (this.scale.ticks) {
                ticks = this.scale.ticks.apply(this.scale, [maxScaleTicks]);
            }
            else {
                ticks = this.scale.domain();
                ticks = reduceTicks(ticks, maxTicks);
            }
            return ticks;
        };
        XAxisTicksComponent.prototype.getMaxTicks = function (tickWidth) {
            return Math.floor(this.width / tickWidth);
        };
        XAxisTicksComponent.prototype.tickTransform = function (tick) {
            return 'translate(' + this.adjustedScale(tick) + ',' + this.verticalSpacing + ')';
        };
        XAxisTicksComponent.prototype.gridLineTransform = function () {
            return "translate(0," + (-this.verticalSpacing - 5) + ")";
        };
        XAxisTicksComponent.prototype.tickTrim = function (label) {
            return this.trimTicks ? trimLabel(label, this.maxTickLength) : label;
        };
        return XAxisTicksComponent;
    }());
    XAxisTicksComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'g[ngx-charts-x-axis-ticks]',
                    template: "\n    <svg:g #ticksel>\n      <svg:g *ngFor=\"let tick of ticks\" class=\"tick\" [attr.transform]=\"tickTransform(tick)\">\n        <title>{{ tickFormat(tick) }}</title>\n        <svg:text\n          stroke-width=\"0.01\"\n          [attr.text-anchor]=\"textAnchor\"\n          [attr.transform]=\"textTransform\"\n          [style.font-size]=\"'12px'\"\n        >\n          {{ tickTrim(tickFormat(tick)) }}\n        </svg:text>\n      </svg:g>\n    </svg:g>\n\n    <svg:g *ngFor=\"let tick of ticks\" [attr.transform]=\"tickTransform(tick)\">\n      <svg:g *ngIf=\"showGridLines\" [attr.transform]=\"gridLineTransform()\">\n        <svg:line class=\"gridline-path gridline-path-vertical\" [attr.y1]=\"-gridLineHeight\" y2=\"0\" />\n      </svg:g>\n    </svg:g>\n  ",
                    changeDetection: core.ChangeDetectionStrategy.OnPush
                },] }
    ];
    XAxisTicksComponent.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: core.Inject, args: [core.PLATFORM_ID,] }] }
    ]; };
    XAxisTicksComponent.propDecorators = {
        scale: [{ type: core.Input }],
        orient: [{ type: core.Input }],
        tickArguments: [{ type: core.Input }],
        tickValues: [{ type: core.Input }],
        tickStroke: [{ type: core.Input }],
        trimTicks: [{ type: core.Input }],
        maxTickLength: [{ type: core.Input }],
        tickFormatting: [{ type: core.Input }],
        showGridLines: [{ type: core.Input }],
        gridLineHeight: [{ type: core.Input }],
        width: [{ type: core.Input }],
        rotateTicks: [{ type: core.Input }],
        dimensionsChanged: [{ type: core.Output }],
        ticksElement: [{ type: core.ViewChild, args: ['ticksel',] }]
    };

    var XAxisComponent = /** @class */ (function () {
        function XAxisComponent() {
            this.rotateTicks = true;
            this.showGridLines = false;
            this.xOrient = exports.Orientation.Bottom;
            this.xAxisOffset = 0;
            this.dimensionsChanged = new core.EventEmitter();
            this.xAxisClassName = 'x axis';
            this.labelOffset = 0;
            this.fill = 'none';
            this.stroke = 'stroke';
            this.tickStroke = '#ccc';
            this.strokeWidth = 'none';
            this.padding = 5;
            this.orientation = exports.Orientation;
        }
        XAxisComponent.prototype.ngOnChanges = function (changes) {
            this.update();
        };
        XAxisComponent.prototype.update = function () {
            this.transform = "translate(0," + (this.xAxisOffset + this.padding + this.dims.height) + ")";
            if (typeof this.xAxisTickCount !== 'undefined') {
                this.tickArguments = [this.xAxisTickCount];
            }
        };
        XAxisComponent.prototype.emitTicksHeight = function (_a) {
            var _this = this;
            var height = _a.height;
            var newLabelOffset = height + 25 + 5;
            if (newLabelOffset !== this.labelOffset) {
                this.labelOffset = newLabelOffset;
                setTimeout(function () {
                    _this.dimensionsChanged.emit({ height: height });
                }, 0);
            }
        };
        return XAxisComponent;
    }());
    XAxisComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'g[ngx-charts-x-axis]',
                    template: "\n    <svg:g [attr.class]=\"xAxisClassName\" [attr.transform]=\"transform\">\n      <svg:g\n        ngx-charts-x-axis-ticks\n        *ngIf=\"xScale\"\n        [trimTicks]=\"trimTicks\"\n        [rotateTicks]=\"rotateTicks\"\n        [maxTickLength]=\"maxTickLength\"\n        [tickFormatting]=\"tickFormatting\"\n        [tickArguments]=\"tickArguments\"\n        [tickStroke]=\"tickStroke\"\n        [scale]=\"xScale\"\n        [orient]=\"xOrient\"\n        [showGridLines]=\"showGridLines\"\n        [gridLineHeight]=\"dims.height\"\n        [width]=\"dims.width\"\n        [tickValues]=\"ticks\"\n        (dimensionsChanged)=\"emitTicksHeight($event)\"\n      />\n      <svg:g\n        ngx-charts-axis-label\n        *ngIf=\"showLabel\"\n        [label]=\"labelText\"\n        [offset]=\"labelOffset\"\n        [orient]=\"orientation.Bottom\"\n        [height]=\"dims.height\"\n        [width]=\"dims.width\"\n      ></svg:g>\n    </svg:g>\n  ",
                    changeDetection: core.ChangeDetectionStrategy.OnPush
                },] }
    ];
    XAxisComponent.propDecorators = {
        xScale: [{ type: core.Input }],
        dims: [{ type: core.Input }],
        trimTicks: [{ type: core.Input }],
        rotateTicks: [{ type: core.Input }],
        maxTickLength: [{ type: core.Input }],
        tickFormatting: [{ type: core.Input }],
        showGridLines: [{ type: core.Input }],
        showLabel: [{ type: core.Input }],
        labelText: [{ type: core.Input }],
        ticks: [{ type: core.Input }],
        xAxisTickCount: [{ type: core.Input }],
        xOrient: [{ type: core.Input }],
        xAxisOffset: [{ type: core.Input }],
        dimensionsChanged: [{ type: core.Output }],
        ticksComponent: [{ type: core.ViewChild, args: [XAxisTicksComponent,] }]
    };

    /**
     * Generates a rounded rectanglar path
     *
     * @export
     * @param x, y, w, h, r, tl, tr, bl, br
     */
    function roundedRect(x, y, w, h, r, _a) {
        var _b = __read(_a, 4), tl = _b[0], tr = _b[1], bl = _b[2], br = _b[3];
        var retval = '';
        w = Math.floor(w);
        h = Math.floor(h);
        w = w === 0 ? 1 : w;
        h = h === 0 ? 1 : h;
        retval = "M" + [x + r, y];
        retval += "h" + (w - 2 * r);
        if (tr) {
            retval += "a" + [r, r] + " 0 0 1 " + [r, r];
        }
        else {
            retval += "h" + r + "v" + r;
        }
        retval += "v" + (h - 2 * r);
        if (br) {
            retval += "a" + [r, r] + " 0 0 1 " + [-r, r];
        }
        else {
            retval += "v" + r + "h" + -r;
        }
        retval += "h" + (2 * r - w);
        if (bl) {
            retval += "a" + [r, r] + " 0 0 1 " + [-r, -r];
        }
        else {
            retval += "h" + -r + "v" + -r;
        }
        retval += "v" + (2 * r - h);
        if (tl) {
            retval += "a" + [r, r] + " 0 0 1 " + [r, -r];
        }
        else {
            retval += "v" + -r + "h" + r;
        }
        retval += "z";
        return retval;
    }

    var YAxisTicksComponent = /** @class */ (function () {
        function YAxisTicksComponent(platformId) {
            this.platformId = platformId;
            this.tickArguments = [5];
            this.tickStroke = '#ccc';
            this.trimTicks = true;
            this.maxTickLength = 16;
            this.showGridLines = false;
            this.showRefLabels = false;
            this.showRefLines = false;
            this.dimensionsChanged = new core.EventEmitter();
            this.innerTickSize = 6;
            this.tickPadding = 3;
            this.verticalSpacing = 20;
            this.textAnchor = exports.TextAnchor.Middle;
            this.width = 0;
            this.outerTickSize = 6;
            this.rotateLabels = false;
            this.referenceLineLength = 0;
            this.Orientation = exports.Orientation;
        }
        YAxisTicksComponent.prototype.ngOnChanges = function (changes) {
            this.update();
        };
        YAxisTicksComponent.prototype.ngAfterViewInit = function () {
            var _this = this;
            setTimeout(function () { return _this.updateDims(); });
        };
        YAxisTicksComponent.prototype.updateDims = function () {
            var _this = this;
            if (!common.isPlatformBrowser(this.platformId)) {
                // for SSR, use approximate value instead of measured
                this.width = this.getApproximateAxisWidth();
                this.dimensionsChanged.emit({ width: this.width });
                return;
            }
            var width = parseInt(this.ticksElement.nativeElement.getBoundingClientRect().width, 10);
            if (width !== this.width) {
                this.width = width;
                this.dimensionsChanged.emit({ width: width });
                setTimeout(function () { return _this.updateDims(); });
            }
        };
        YAxisTicksComponent.prototype.update = function () {
            var _this = this;
            var scale;
            var sign = this.orient === exports.Orientation.Top || this.orient === exports.Orientation.Right ? -1 : 1;
            this.tickSpacing = Math.max(this.innerTickSize, 0) + this.tickPadding;
            scale = this.scale;
            this.ticks = this.getTicks();
            if (this.tickFormatting) {
                this.tickFormat = this.tickFormatting;
            }
            else if (scale.tickFormat) {
                this.tickFormat = scale.tickFormat.apply(scale, this.tickArguments);
            }
            else {
                this.tickFormat = function (d) {
                    if (d.constructor.name === 'Date') {
                        return d.toLocaleDateString();
                    }
                    return d.toLocaleString();
                };
            }
            this.adjustedScale = scale.bandwidth
                ? function (d) {
                    return scale(d) + scale.bandwidth() * 0.5;
                }
                : scale;
            if (this.showRefLines && this.referenceLines) {
                this.setReferencelines();
            }
            switch (this.orient) {
                case exports.Orientation.Top:
                    this.transform = function (tick) {
                        return 'translate(' + this.adjustedScale(tick) + ',0)';
                    };
                    this.textAnchor = exports.TextAnchor.Middle;
                    this.y2 = this.innerTickSize * sign;
                    this.y1 = this.tickSpacing * sign;
                    this.dy = sign < 0 ? '0em' : '.71em';
                    break;
                case exports.Orientation.Bottom:
                    this.transform = function (tick) {
                        return 'translate(' + this.adjustedScale(tick) + ',0)';
                    };
                    this.textAnchor = exports.TextAnchor.Middle;
                    this.y2 = this.innerTickSize * sign;
                    this.y1 = this.tickSpacing * sign;
                    this.dy = sign < 0 ? '0em' : '.71em';
                    break;
                case exports.Orientation.Left:
                    this.transform = function (tick) {
                        return 'translate(0,' + this.adjustedScale(tick) + ')';
                    };
                    this.textAnchor = exports.TextAnchor.End;
                    this.x2 = this.innerTickSize * -sign;
                    this.x1 = this.tickSpacing * -sign;
                    this.dy = '.32em';
                    break;
                case exports.Orientation.Right:
                    this.transform = function (tick) {
                        return 'translate(0,' + this.adjustedScale(tick) + ')';
                    };
                    this.textAnchor = exports.TextAnchor.Start;
                    this.x2 = this.innerTickSize * -sign;
                    this.x1 = this.tickSpacing * -sign;
                    this.dy = '.32em';
                    break;
                default:
            }
            setTimeout(function () { return _this.updateDims(); });
        };
        YAxisTicksComponent.prototype.setReferencelines = function () {
            this.refMin = this.adjustedScale(Math.min.apply(null, this.referenceLines.map(function (item) { return item.value; })));
            this.refMax = this.adjustedScale(Math.max.apply(null, this.referenceLines.map(function (item) { return item.value; })));
            this.referenceLineLength = this.referenceLines.length;
            this.referenceAreaPath = roundedRect(0, this.refMax, this.gridLineWidth, this.refMin - this.refMax, 0, [
                false,
                false,
                false,
                false
            ]);
        };
        YAxisTicksComponent.prototype.getTicks = function () {
            var ticks;
            var maxTicks = this.getMaxTicks(20);
            var maxScaleTicks = this.getMaxTicks(50);
            if (this.tickValues) {
                ticks = this.tickValues;
            }
            else if (this.scale.ticks) {
                ticks = this.scale.ticks.apply(this.scale, [maxScaleTicks]);
            }
            else {
                ticks = this.scale.domain();
                ticks = reduceTicks(ticks, maxTicks);
            }
            return ticks;
        };
        YAxisTicksComponent.prototype.getMaxTicks = function (tickHeight) {
            return Math.floor(this.height / tickHeight);
        };
        YAxisTicksComponent.prototype.tickTransform = function (tick) {
            return "translate(" + this.adjustedScale(tick) + "," + this.verticalSpacing + ")";
        };
        YAxisTicksComponent.prototype.gridLineTransform = function () {
            return "translate(5,0)";
        };
        YAxisTicksComponent.prototype.tickTrim = function (label) {
            return this.trimTicks ? trimLabel(label, this.maxTickLength) : label;
        };
        YAxisTicksComponent.prototype.getApproximateAxisWidth = function () {
            var _this = this;
            var maxChars = Math.max.apply(Math, __spreadArray([], __read(this.ticks.map(function (t) { return _this.tickTrim(_this.tickFormat(t)).length; }))));
            var charWidth = 7;
            return maxChars * charWidth;
        };
        return YAxisTicksComponent;
    }());
    YAxisTicksComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'g[ngx-charts-y-axis-ticks]',
                    template: "\n    <svg:g #ticksel>\n      <svg:g *ngFor=\"let tick of ticks\" class=\"tick\" [attr.transform]=\"transform(tick)\">\n        <title>{{ tickFormat(tick) }}</title>\n        <svg:text\n          stroke-width=\"0.01\"\n          [attr.dy]=\"dy\"\n          [attr.x]=\"x1\"\n          [attr.y]=\"y1\"\n          [attr.text-anchor]=\"textAnchor\"\n          [style.font-size]=\"'12px'\"\n        >\n          {{ tickTrim(tickFormat(tick)) }}\n        </svg:text>\n      </svg:g>\n    </svg:g>\n\n    <svg:path\n      *ngIf=\"referenceLineLength > 1 && refMax && refMin && showRefLines\"\n      class=\"reference-area\"\n      [attr.d]=\"referenceAreaPath\"\n      [attr.transform]=\"gridLineTransform()\"\n    />\n    <svg:g *ngFor=\"let tick of ticks\" [attr.transform]=\"transform(tick)\">\n      <svg:g *ngIf=\"showGridLines\" [attr.transform]=\"gridLineTransform()\">\n        <svg:line\n          *ngIf=\"orient === Orientation.Left\"\n          class=\"gridline-path gridline-path-horizontal\"\n          x1=\"0\"\n          [attr.x2]=\"gridLineWidth\"\n        />\n        <svg:line\n          *ngIf=\"orient === Orientation.Right\"\n          class=\"gridline-path gridline-path-horizontal\"\n          x1=\"0\"\n          [attr.x2]=\"-gridLineWidth\"\n        />\n      </svg:g>\n    </svg:g>\n\n    <svg:g *ngFor=\"let refLine of referenceLines\">\n      <svg:g *ngIf=\"showRefLines\" [attr.transform]=\"transform(refLine.value)\">\n        <svg:line\n          class=\"refline-path gridline-path-horizontal\"\n          x1=\"0\"\n          [attr.x2]=\"gridLineWidth\"\n          [attr.transform]=\"gridLineTransform()\"\n        />\n        <svg:g *ngIf=\"showRefLabels\">\n          <title>{{ tickTrim(tickFormat(refLine.value)) }}</title>\n          <svg:text\n            class=\"refline-label\"\n            [attr.dy]=\"dy\"\n            [attr.y]=\"-6\"\n            [attr.x]=\"gridLineWidth\"\n            [attr.text-anchor]=\"textAnchor\"\n          >\n            {{ refLine.name }}\n          </svg:text>\n        </svg:g>\n      </svg:g>\n    </svg:g>\n  ",
                    changeDetection: core.ChangeDetectionStrategy.OnPush
                },] }
    ];
    YAxisTicksComponent.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: core.Inject, args: [core.PLATFORM_ID,] }] }
    ]; };
    YAxisTicksComponent.propDecorators = {
        scale: [{ type: core.Input }],
        orient: [{ type: core.Input }],
        tickArguments: [{ type: core.Input }],
        tickValues: [{ type: core.Input }],
        tickStroke: [{ type: core.Input }],
        trimTicks: [{ type: core.Input }],
        maxTickLength: [{ type: core.Input }],
        tickFormatting: [{ type: core.Input }],
        showGridLines: [{ type: core.Input }],
        gridLineWidth: [{ type: core.Input }],
        height: [{ type: core.Input }],
        referenceLines: [{ type: core.Input }],
        showRefLabels: [{ type: core.Input }],
        showRefLines: [{ type: core.Input }],
        dimensionsChanged: [{ type: core.Output }],
        ticksElement: [{ type: core.ViewChild, args: ['ticksel',] }]
    };

    var YAxisComponent = /** @class */ (function () {
        function YAxisComponent() {
            this.showGridLines = false;
            this.yOrient = exports.Orientation.Left;
            this.yAxisOffset = 0;
            this.dimensionsChanged = new core.EventEmitter();
            this.yAxisClassName = 'y axis';
            this.labelOffset = 15;
            this.fill = 'none';
            this.stroke = '#CCC';
            this.tickStroke = '#CCC';
            this.strokeWidth = 1;
            this.padding = 5;
        }
        YAxisComponent.prototype.ngOnChanges = function (changes) {
            this.update();
        };
        YAxisComponent.prototype.update = function () {
            this.offset = -(this.yAxisOffset + this.padding);
            if (this.yOrient === exports.Orientation.Right) {
                this.labelOffset = 65;
                this.transform = "translate(" + (this.offset + this.dims.width) + " , 0)";
            }
            else {
                this.offset = this.offset;
                this.transform = "translate(" + this.offset + " , 0)";
            }
            if (this.yAxisTickCount !== undefined) {
                this.tickArguments = [this.yAxisTickCount];
            }
        };
        YAxisComponent.prototype.emitTicksWidth = function (_a) {
            var _this = this;
            var width = _a.width;
            if (width !== this.labelOffset && this.yOrient === exports.Orientation.Right) {
                this.labelOffset = width + this.labelOffset;
                setTimeout(function () {
                    _this.dimensionsChanged.emit({ width: width });
                }, 0);
            }
            else if (width !== this.labelOffset) {
                this.labelOffset = width;
                setTimeout(function () {
                    _this.dimensionsChanged.emit({ width: width });
                }, 0);
            }
        };
        return YAxisComponent;
    }());
    YAxisComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'g[ngx-charts-y-axis]',
                    template: "\n    <svg:g [attr.class]=\"yAxisClassName\" [attr.transform]=\"transform\">\n      <svg:g\n        ngx-charts-y-axis-ticks\n        *ngIf=\"yScale\"\n        [trimTicks]=\"trimTicks\"\n        [maxTickLength]=\"maxTickLength\"\n        [tickFormatting]=\"tickFormatting\"\n        [tickArguments]=\"tickArguments\"\n        [tickValues]=\"ticks\"\n        [tickStroke]=\"tickStroke\"\n        [scale]=\"yScale\"\n        [orient]=\"yOrient\"\n        [showGridLines]=\"showGridLines\"\n        [gridLineWidth]=\"dims.width\"\n        [referenceLines]=\"referenceLines\"\n        [showRefLines]=\"showRefLines\"\n        [showRefLabels]=\"showRefLabels\"\n        [height]=\"dims.height\"\n        (dimensionsChanged)=\"emitTicksWidth($event)\"\n      />\n\n      <svg:g\n        ngx-charts-axis-label\n        *ngIf=\"showLabel\"\n        [label]=\"labelText\"\n        [offset]=\"labelOffset\"\n        [orient]=\"yOrient\"\n        [height]=\"dims.height\"\n        [width]=\"dims.width\"\n      ></svg:g>\n    </svg:g>\n  ",
                    changeDetection: core.ChangeDetectionStrategy.OnPush
                },] }
    ];
    YAxisComponent.propDecorators = {
        yScale: [{ type: core.Input }],
        dims: [{ type: core.Input }],
        trimTicks: [{ type: core.Input }],
        maxTickLength: [{ type: core.Input }],
        tickFormatting: [{ type: core.Input }],
        ticks: [{ type: core.Input }],
        showGridLines: [{ type: core.Input }],
        showLabel: [{ type: core.Input }],
        labelText: [{ type: core.Input }],
        yAxisTickCount: [{ type: core.Input }],
        yOrient: [{ type: core.Input }],
        referenceLines: [{ type: core.Input }],
        showRefLines: [{ type: core.Input }],
        showRefLabels: [{ type: core.Input }],
        yAxisOffset: [{ type: core.Input }],
        dimensionsChanged: [{ type: core.Output }],
        ticksComponent: [{ type: core.ViewChild, args: [YAxisTicksComponent,] }]
    };

    var AxesModule = /** @class */ (function () {
        function AxesModule() {
        }
        return AxesModule;
    }());
    AxesModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [common.CommonModule],
                    declarations: [AxisLabelComponent, XAxisComponent, XAxisTicksComponent, YAxisComponent, YAxisTicksComponent],
                    exports: [AxisLabelComponent, XAxisComponent, XAxisTicksComponent, YAxisComponent, YAxisTicksComponent]
                },] }
    ];

    exports.StyleTypes = void 0;
    (function (StyleTypes) {
        StyleTypes["popover"] = "popover";
        StyleTypes["tooltip"] = "tooltip";
    })(exports.StyleTypes || (exports.StyleTypes = {}));

    exports.ShowTypes = void 0;
    (function (ShowTypes) {
        ShowTypes[ShowTypes["all"] = 'all'] = "all";
        ShowTypes[ShowTypes["focus"] = 'focus'] = "focus";
        ShowTypes[ShowTypes["mouseover"] = 'mouseover'] = "mouseover";
    })(exports.ShowTypes || (exports.ShowTypes = {}));

    var TooltipDirective = /** @class */ (function () {
        function TooltipDirective(tooltipService, viewContainerRef, renderer) {
            this.tooltipService = tooltipService;
            this.viewContainerRef = viewContainerRef;
            this.renderer = renderer;
            this.tooltipCssClass = '';
            this.tooltipAppendToBody = true;
            this.tooltipSpacing = 10;
            this.tooltipDisabled = false;
            this.tooltipShowCaret = true;
            this.tooltipPlacement = exports.PlacementTypes.Top;
            this.tooltipAlignment = exports.PlacementTypes.Center;
            this.tooltipType = exports.StyleTypes.popover;
            this.tooltipCloseOnClickOutside = true;
            this.tooltipCloseOnMouseLeave = true;
            this.tooltipHideTimeout = 300;
            this.tooltipShowTimeout = 100;
            this.tooltipShowEvent = exports.ShowTypes.all;
            this.tooltipImmediateExit = false;
            this.show = new core.EventEmitter();
            this.hide = new core.EventEmitter();
        }
        Object.defineProperty(TooltipDirective.prototype, "listensForFocus", {
            get: function () {
                return this.tooltipShowEvent === exports.ShowTypes.all || this.tooltipShowEvent === exports.ShowTypes.focus;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TooltipDirective.prototype, "listensForHover", {
            get: function () {
                return this.tooltipShowEvent === exports.ShowTypes.all || this.tooltipShowEvent === exports.ShowTypes.mouseover;
            },
            enumerable: false,
            configurable: true
        });
        TooltipDirective.prototype.ngOnDestroy = function () {
            this.hideTooltip(true);
        };
        TooltipDirective.prototype.onFocus = function () {
            if (this.listensForFocus) {
                this.showTooltip();
            }
        };
        TooltipDirective.prototype.onBlur = function () {
            if (this.listensForFocus) {
                this.hideTooltip(true);
            }
        };
        TooltipDirective.prototype.onMouseEnter = function () {
            if (this.listensForHover) {
                this.showTooltip();
            }
        };
        TooltipDirective.prototype.onMouseLeave = function (target) {
            if (this.listensForHover && this.tooltipCloseOnMouseLeave) {
                clearTimeout(this.timeout);
                if (this.component) {
                    var contentDom = this.component.instance.element.nativeElement;
                    var contains = contentDom.contains(target);
                    if (contains)
                        return;
                }
                this.hideTooltip(this.tooltipImmediateExit);
            }
        };
        TooltipDirective.prototype.onMouseClick = function () {
            if (this.listensForHover) {
                this.hideTooltip(true);
            }
        };
        TooltipDirective.prototype.showTooltip = function (immediate) {
            var _this = this;
            if (this.component || this.tooltipDisabled)
                return;
            var time = immediate
                ? 0
                : this.tooltipShowTimeout + (navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) ? 300 : 0);
            clearTimeout(this.timeout);
            this.timeout = setTimeout(function () {
                _this.tooltipService.destroyAll();
                var options = _this.createBoundOptions();
                _this.component = _this.tooltipService.create(options);
                // add a tiny timeout to avoid event re-triggers
                setTimeout(function () {
                    if (_this.component) {
                        _this.addHideListeners(_this.component.instance.element.nativeElement);
                    }
                }, 10);
                _this.show.emit(true);
            }, time);
        };
        TooltipDirective.prototype.addHideListeners = function (tooltip) {
            var _this = this;
            // on mouse enter, cancel the hide triggered by the leave
            this.mouseEnterContentEvent = this.renderer.listen(tooltip, 'mouseenter', function () {
                clearTimeout(_this.timeout);
            });
            // content mouse leave listener
            if (this.tooltipCloseOnMouseLeave) {
                this.mouseLeaveContentEvent = this.renderer.listen(tooltip, 'mouseleave', function () {
                    _this.hideTooltip(_this.tooltipImmediateExit);
                });
            }
            // content close on click outside
            if (this.tooltipCloseOnClickOutside) {
                this.documentClickEvent = this.renderer.listen('window', 'click', function (event) {
                    var contains = tooltip.contains(event.target);
                    if (!contains)
                        _this.hideTooltip();
                });
            }
        };
        TooltipDirective.prototype.hideTooltip = function (immediate) {
            var _this = this;
            if (immediate === void 0) { immediate = false; }
            if (!this.component)
                return;
            var destroyFn = function () {
                // remove events
                if (_this.mouseLeaveContentEvent)
                    _this.mouseLeaveContentEvent();
                if (_this.mouseEnterContentEvent)
                    _this.mouseEnterContentEvent();
                if (_this.documentClickEvent)
                    _this.documentClickEvent();
                // emit events
                _this.hide.emit(true);
                // destroy component
                _this.tooltipService.destroy(_this.component);
                _this.component = undefined;
            };
            clearTimeout(this.timeout);
            if (!immediate) {
                this.timeout = setTimeout(destroyFn, this.tooltipHideTimeout);
            }
            else {
                destroyFn();
            }
        };
        TooltipDirective.prototype.createBoundOptions = function () {
            return {
                title: this.tooltipTitle,
                template: this.tooltipTemplate,
                host: this.viewContainerRef.element,
                placement: this.tooltipPlacement,
                alignment: this.tooltipAlignment,
                type: this.tooltipType,
                showCaret: this.tooltipShowCaret,
                cssClass: this.tooltipCssClass,
                spacing: this.tooltipSpacing,
                context: this.tooltipContext
            };
        };
        return TooltipDirective;
    }());
    TooltipDirective.decorators = [
        { type: core.Directive, args: [{ selector: '[ngx-tooltip]' },] }
    ];
    TooltipDirective.ctorParameters = function () { return [
        { type: TooltipService },
        { type: core.ViewContainerRef },
        { type: core.Renderer2 }
    ]; };
    TooltipDirective.propDecorators = {
        tooltipCssClass: [{ type: core.Input }],
        tooltipTitle: [{ type: core.Input }],
        tooltipAppendToBody: [{ type: core.Input }],
        tooltipSpacing: [{ type: core.Input }],
        tooltipDisabled: [{ type: core.Input }],
        tooltipShowCaret: [{ type: core.Input }],
        tooltipPlacement: [{ type: core.Input }],
        tooltipAlignment: [{ type: core.Input }],
        tooltipType: [{ type: core.Input }],
        tooltipCloseOnClickOutside: [{ type: core.Input }],
        tooltipCloseOnMouseLeave: [{ type: core.Input }],
        tooltipHideTimeout: [{ type: core.Input }],
        tooltipShowTimeout: [{ type: core.Input }],
        tooltipTemplate: [{ type: core.Input }],
        tooltipShowEvent: [{ type: core.Input }],
        tooltipContext: [{ type: core.Input }],
        tooltipImmediateExit: [{ type: core.Input }],
        show: [{ type: core.Output }],
        hide: [{ type: core.Output }],
        onFocus: [{ type: core.HostListener, args: ['focusin',] }],
        onBlur: [{ type: core.HostListener, args: ['blur',] }],
        onMouseEnter: [{ type: core.HostListener, args: ['mouseenter',] }],
        onMouseLeave: [{ type: core.HostListener, args: ['mouseleave', ['$event.target'],] }],
        onMouseClick: [{ type: core.HostListener, args: ['click',] }]
    };

    var TooltipModule = /** @class */ (function () {
        function TooltipModule() {
        }
        return TooltipModule;
    }());
    TooltipModule.decorators = [
        { type: core.NgModule, args: [{
                    declarations: [TooltipContentComponent, TooltipDirective],
                    providers: [InjectionService, TooltipService],
                    exports: [TooltipContentComponent, TooltipDirective],
                    imports: [common.CommonModule],
                    entryComponents: [TooltipContentComponent]
                },] }
    ];

    /**
     * Formats a label given a date, number or string.
     *
     * @export
     */
    function formatLabel(label) {
        if (label instanceof Date) {
            label = label.toLocaleDateString();
        }
        else {
            label = label.toLocaleString();
        }
        return label;
    }
    /**
     * Escapes a label.
     *
     * @export
     */
    function escapeLabel(label) {
        return label.toLocaleString().replace(/[&'`"<>]/g, function (match) {
            return {
                '&': '&amp;',
                // tslint:disable-next-line: quotemark
                "'": '&#x27;',
                '`': '&#x60;',
                '"': '&quot;',
                '<': '&lt;',
                '>': '&gt;'
            }[match];
        });
    }

    var cache = {};
    /**
     * Generates a short id.
     *
     * Description:
     *   A 4-character alphanumeric sequence (364 = 1.6 million)
     *   This should only be used for JavaScript specific models.
     *   http://stackoverflow.com/questions/6248666/how-to-generate-short-uid-like-ax4j9z-in-js
     *
     *   Example: `ebgf`
     */
    function id() {
        var newId = ('0000' + ((Math.random() * Math.pow(36, 4)) << 0).toString(36)).slice(-4);
        // append a 'a' because neo gets mad
        newId = "a" + newId;
        // ensure not already used
        if (!cache[newId]) {
            cache[newId] = true;
            return newId;
        }
        return id();
    }

    exports.BarOrientation = void 0;
    (function (BarOrientation) {
        BarOrientation["Vertical"] = "vertical";
        BarOrientation["Horizontal"] = "horizontal";
    })(exports.BarOrientation || (exports.BarOrientation = {}));

    exports.SeriesType = void 0;
    (function (SeriesType) {
        SeriesType["Standard"] = "standard";
        SeriesType["Stacked"] = "stacked";
    })(exports.SeriesType || (exports.SeriesType = {}));
    var CircleSeriesComponent = /** @class */ (function () {
        function CircleSeriesComponent() {
            this.type = exports.SeriesType.Standard;
            this.tooltipDisabled = false;
            this.select = new core.EventEmitter();
            this.activate = new core.EventEmitter();
            this.deactivate = new core.EventEmitter();
            this.barVisible = false;
            this.barOrientation = exports.BarOrientation;
            this.placementTypes = exports.PlacementTypes;
            this.styleTypes = exports.StyleTypes;
        }
        CircleSeriesComponent.prototype.ngOnInit = function () {
            this.gradientId = 'grad' + id().toString();
            this.gradientFill = "url(#" + this.gradientId + ")";
        };
        CircleSeriesComponent.prototype.ngOnChanges = function () {
            this.update();
        };
        CircleSeriesComponent.prototype.update = function () {
            this.circle = this.getActiveCircle();
        };
        CircleSeriesComponent.prototype.getActiveCircle = function () {
            var _this = this;
            var indexActiveDataPoint = this.data.series.findIndex(function (d) {
                var label = d.name;
                return label && _this.visibleValue && label.toString() === _this.visibleValue.toString() && d.value !== undefined;
            });
            if (indexActiveDataPoint === -1) {
                // No valid point is 'active/hovered over' at this moment.
                return undefined;
            }
            return this.mapDataPointToCircle(this.data.series[indexActiveDataPoint], indexActiveDataPoint);
        };
        CircleSeriesComponent.prototype.mapDataPointToCircle = function (d, i) {
            var seriesName = this.data.name;
            var value = d.value;
            var label = d.name;
            var tooltipLabel = formatLabel(label);
            var cx;
            if (this.scaleType === exports.ScaleType.Time) {
                cx = this.xScale(label);
            }
            else if (this.scaleType === exports.ScaleType.Linear) {
                cx = this.xScale(Number(label));
            }
            else {
                cx = this.xScale(label);
            }
            var cy = this.yScale(this.type === exports.SeriesType.Standard ? value : d.d1);
            var radius = 5;
            var height = this.yScale.range()[0] - cy;
            var opacity = 1;
            var color;
            if (this.colors.scaleType === exports.ScaleType.Linear) {
                if (this.type === exports.SeriesType.Standard) {
                    color = this.colors.getColor(value);
                }
                else {
                    color = this.colors.getColor(d.d1);
                }
            }
            else {
                color = this.colors.getColor(seriesName);
            }
            var data = Object.assign({}, d, {
                series: seriesName,
                value: value,
                name: label
            });
            return {
                classNames: ["circle-data-" + i],
                value: value,
                label: label,
                data: data,
                cx: cx,
                cy: cy,
                radius: radius,
                height: height,
                tooltipLabel: tooltipLabel,
                color: color,
                opacity: opacity,
                seriesName: seriesName,
                gradientStops: this.getGradientStops(color),
                min: d.min,
                max: d.max
            };
        };
        CircleSeriesComponent.prototype.getTooltipText = function (_a) {
            var tooltipLabel = _a.tooltipLabel, value = _a.value, seriesName = _a.seriesName, min = _a.min, max = _a.max;
            return "\n      <span class=\"tooltip-label\">" + escapeLabel(seriesName) + " \u2022 " + escapeLabel(tooltipLabel) + "</span>\n      <span class=\"tooltip-val\">" + value.toLocaleString() + this.getTooltipMinMaxText(min, max) + "</span>\n    ";
        };
        CircleSeriesComponent.prototype.getTooltipMinMaxText = function (min, max) {
            if (min !== undefined || max !== undefined) {
                var result = ' (';
                if (min !== undefined) {
                    if (max === undefined) {
                        result += '≥';
                    }
                    result += min.toLocaleString();
                    if (max !== undefined) {
                        result += ' - ';
                    }
                }
                else if (max !== undefined) {
                    result += '≤';
                }
                if (max !== undefined) {
                    result += max.toLocaleString();
                }
                result += ')';
                return result;
            }
            else {
                return '';
            }
        };
        CircleSeriesComponent.prototype.getGradientStops = function (color) {
            return [
                {
                    offset: 0,
                    color: color,
                    opacity: 0.2
                },
                {
                    offset: 100,
                    color: color,
                    opacity: 1
                }
            ];
        };
        CircleSeriesComponent.prototype.onClick = function (data) {
            this.select.emit(data);
        };
        CircleSeriesComponent.prototype.isActive = function (entry) {
            if (!this.activeEntries)
                return false;
            var item = this.activeEntries.find(function (d) {
                return entry.name === d.name;
            });
            return item !== undefined;
        };
        CircleSeriesComponent.prototype.activateCircle = function () {
            this.barVisible = true;
            this.activate.emit({ name: this.data.name });
        };
        CircleSeriesComponent.prototype.deactivateCircle = function () {
            this.barVisible = false;
            this.circle.opacity = 0;
            this.deactivate.emit({ name: this.data.name });
        };
        return CircleSeriesComponent;
    }());
    CircleSeriesComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'g[ngx-charts-circle-series]',
                    template: "\n    <svg:g *ngIf=\"circle\">\n      <defs>\n        <svg:g\n          ngx-charts-svg-linear-gradient\n          [orientation]=\"barOrientation.Vertical\"\n          [name]=\"gradientId\"\n          [stops]=\"circle.gradientStops\"\n        />\n      </defs>\n      <svg:rect\n        *ngIf=\"barVisible && type === 'standard'\"\n        [@animationState]=\"'active'\"\n        [attr.x]=\"circle.cx - circle.radius\"\n        [attr.y]=\"circle.cy\"\n        [attr.width]=\"circle.radius * 2\"\n        [attr.height]=\"circle.height\"\n        [attr.fill]=\"gradientFill\"\n        class=\"tooltip-bar\"\n      />\n      <svg:g\n        ngx-charts-circle\n        class=\"circle\"\n        [cx]=\"circle.cx\"\n        [cy]=\"circle.cy\"\n        [r]=\"circle.radius\"\n        [fill]=\"circle.color\"\n        [class.active]=\"isActive({ name: circle.seriesName })\"\n        [pointerEvents]=\"circle.value === 0 ? 'none' : 'all'\"\n        [data]=\"circle.value\"\n        [classNames]=\"circle.classNames\"\n        (select)=\"onClick(circle.data)\"\n        (activate)=\"activateCircle()\"\n        (deactivate)=\"deactivateCircle()\"\n        ngx-tooltip\n        [tooltipDisabled]=\"tooltipDisabled\"\n        [tooltipPlacement]=\"placementTypes.Top\"\n        [tooltipType]=\"styleTypes.tooltip\"\n        [tooltipTitle]=\"tooltipTemplate ? undefined : getTooltipText(circle)\"\n        [tooltipTemplate]=\"tooltipTemplate\"\n        [tooltipContext]=\"circle.data\"\n      />\n    </svg:g>\n  ",
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    animations: [
                        animations.trigger('animationState', [
                            animations.transition(':enter', [
                                animations.style({
                                    opacity: 0
                                }),
                                animations.animate(250, animations.style({ opacity: 1 }))
                            ])
                        ])
                    ]
                },] }
    ];
    CircleSeriesComponent.propDecorators = {
        data: [{ type: core.Input }],
        type: [{ type: core.Input }],
        xScale: [{ type: core.Input }],
        yScale: [{ type: core.Input }],
        colors: [{ type: core.Input }],
        scaleType: [{ type: core.Input }],
        visibleValue: [{ type: core.Input }],
        activeEntries: [{ type: core.Input }],
        tooltipDisabled: [{ type: core.Input }],
        tooltipTemplate: [{ type: core.Input }],
        select: [{ type: core.Output }],
        activate: [{ type: core.Output }],
        deactivate: [{ type: core.Output }]
    };

    var CircleComponent = /** @class */ (function () {
        function CircleComponent() {
            this.select = new core.EventEmitter();
            this.activate = new core.EventEmitter();
            this.deactivate = new core.EventEmitter();
        }
        CircleComponent.prototype.onClick = function () {
            this.select.emit(this.data);
        };
        CircleComponent.prototype.onMouseEnter = function () {
            this.activate.emit(this.data);
        };
        CircleComponent.prototype.onMouseLeave = function () {
            this.deactivate.emit(this.data);
        };
        CircleComponent.prototype.ngOnChanges = function (changes) {
            this.classNames = Array.isArray(this.classNames) ? this.classNames.join(' ') : '';
            this.classNames += 'circle';
        };
        return CircleComponent;
    }());
    CircleComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'g[ngx-charts-circle]',
                    template: "\n    <svg:circle\n      [attr.cx]=\"cx\"\n      [attr.cy]=\"cy\"\n      [attr.r]=\"r\"\n      [attr.fill]=\"fill\"\n      [attr.stroke]=\"stroke\"\n      [attr.opacity]=\"circleOpacity\"\n      [attr.class]=\"classNames\"\n      [attr.pointer-events]=\"pointerEvents\"\n    />\n  ",
                    changeDetection: core.ChangeDetectionStrategy.OnPush
                },] }
    ];
    CircleComponent.propDecorators = {
        cx: [{ type: core.Input }],
        cy: [{ type: core.Input }],
        r: [{ type: core.Input }],
        fill: [{ type: core.Input }],
        stroke: [{ type: core.Input }],
        data: [{ type: core.Input }],
        classNames: [{ type: core.Input }],
        circleOpacity: [{ type: core.Input }],
        pointerEvents: [{ type: core.Input }],
        select: [{ type: core.Output }],
        activate: [{ type: core.Output }],
        deactivate: [{ type: core.Output }],
        onClick: [{ type: core.HostListener, args: ['click',] }],
        onMouseEnter: [{ type: core.HostListener, args: ['mouseenter',] }],
        onMouseLeave: [{ type: core.HostListener, args: ['mouseleave',] }]
    };

    var GridPanelComponent = /** @class */ (function () {
        function GridPanelComponent() {
        }
        return GridPanelComponent;
    }());
    GridPanelComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'g[ngx-charts-grid-panel]',
                    template: "\n    <svg:rect [attr.height]=\"height\" [attr.width]=\"width\" [attr.x]=\"x\" [attr.y]=\"y\" stroke=\"none\" class=\"gridpanel\" />\n  ",
                    changeDetection: core.ChangeDetectionStrategy.OnPush
                },] }
    ];
    GridPanelComponent.propDecorators = {
        width: [{ type: core.Input }],
        height: [{ type: core.Input }],
        x: [{ type: core.Input }],
        y: [{ type: core.Input }]
    };

    var ClassEnum;
    (function (ClassEnum) {
        ClassEnum["Odd"] = "odd";
        ClassEnum["Even"] = "even";
    })(ClassEnum || (ClassEnum = {}));
    var GridPanelSeriesComponent = /** @class */ (function () {
        function GridPanelSeriesComponent() {
        }
        GridPanelSeriesComponent.prototype.ngOnChanges = function (changes) {
            this.update();
        };
        GridPanelSeriesComponent.prototype.update = function () {
            this.gridPanels = this.getGridPanels();
        };
        GridPanelSeriesComponent.prototype.getGridPanels = function () {
            var _this = this;
            return this.data.map(function (d) {
                var offset;
                var width;
                var height;
                var x;
                var y;
                var className = ClassEnum.Odd;
                if (_this.orient === exports.BarOrientation.Vertical) {
                    var position = _this.xScale(d.name);
                    var positionIndex = Number.parseInt((position / _this.xScale.step()).toString(), 10);
                    if (positionIndex % 2 === 1) {
                        className = ClassEnum.Even;
                    }
                    offset = _this.xScale.bandwidth() * _this.xScale.paddingInner();
                    width = _this.xScale.bandwidth() + offset;
                    height = _this.dims.height;
                    x = _this.xScale(d.name) - offset / 2;
                    y = 0;
                }
                else if (_this.orient === exports.BarOrientation.Horizontal) {
                    var position = _this.yScale(d.name);
                    var positionIndex = Number.parseInt((position / _this.yScale.step()).toString(), 10);
                    if (positionIndex % 2 === 1) {
                        className = ClassEnum.Even;
                    }
                    offset = _this.yScale.bandwidth() * _this.yScale.paddingInner();
                    width = _this.dims.width;
                    height = _this.yScale.bandwidth() + offset;
                    x = 0;
                    y = _this.yScale(d.name) - offset / 2;
                }
                return {
                    name: d.name,
                    class: className,
                    height: height,
                    width: width,
                    x: x,
                    y: y
                };
            });
        };
        return GridPanelSeriesComponent;
    }());
    GridPanelSeriesComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'g[ngx-charts-grid-panel-series]',
                    template: "\n    <svg:g\n      ngx-charts-grid-panel\n      *ngFor=\"let gridPanel of gridPanels\"\n      [height]=\"gridPanel.height\"\n      [width]=\"gridPanel.width\"\n      [x]=\"gridPanel.x\"\n      [y]=\"gridPanel.y\"\n      [class.grid-panel]=\"true\"\n      [class.odd]=\"gridPanel.class === 'odd'\"\n      [class.even]=\"gridPanel.class === 'even'\"\n    ></svg:g>\n  ",
                    changeDetection: core.ChangeDetectionStrategy.OnPush
                },] }
    ];
    GridPanelSeriesComponent.propDecorators = {
        data: [{ type: core.Input }],
        dims: [{ type: core.Input }],
        xScale: [{ type: core.Input }],
        yScale: [{ type: core.Input }],
        orient: [{ type: core.Input }]
    };

    var SvgLinearGradientComponent = /** @class */ (function () {
        function SvgLinearGradientComponent() {
            this.orientation = exports.BarOrientation.Vertical;
        }
        SvgLinearGradientComponent.prototype.ngOnChanges = function (changes) {
            this.x1 = '0%';
            this.x2 = '0%';
            this.y1 = '0%';
            this.y2 = '0%';
            if (this.orientation === exports.BarOrientation.Horizontal) {
                this.x2 = '100%';
            }
            else if (this.orientation === exports.BarOrientation.Vertical) {
                this.y1 = '100%';
            }
        };
        return SvgLinearGradientComponent;
    }());
    SvgLinearGradientComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'g[ngx-charts-svg-linear-gradient]',
                    template: "\n    <svg:linearGradient [id]=\"name\" [attr.x1]=\"x1\" [attr.y1]=\"y1\" [attr.x2]=\"x2\" [attr.y2]=\"y2\">\n      <svg:stop\n        *ngFor=\"let stop of stops\"\n        [attr.offset]=\"stop.offset + '%'\"\n        [style.stop-color]=\"stop.color\"\n        [style.stop-opacity]=\"stop.opacity\"\n      />\n    </svg:linearGradient>\n  ",
                    changeDetection: core.ChangeDetectionStrategy.OnPush
                },] }
    ];
    SvgLinearGradientComponent.propDecorators = {
        orientation: [{ type: core.Input }],
        name: [{ type: core.Input }],
        stops: [{ type: core.Input }]
    };

    var SvgRadialGradientComponent = /** @class */ (function () {
        function SvgRadialGradientComponent() {
            this.endOpacity = 1;
            this.cx = 0;
            this.cy = 0;
        }
        Object.defineProperty(SvgRadialGradientComponent.prototype, "stops", {
            get: function () {
                return this.stopsInput || this.stopsDefault;
            },
            set: function (value) {
                this.stopsInput = value;
            },
            enumerable: false,
            configurable: true
        });
        SvgRadialGradientComponent.prototype.ngOnChanges = function (changes) {
            this.r = '30%';
            if ('color' in changes || 'startOpacity' in changes || 'endOpacity' in changes) {
                this.stopsDefault = [
                    {
                        offset: 0,
                        color: this.color,
                        opacity: this.startOpacity
                    },
                    {
                        offset: 100,
                        color: this.color,
                        opacity: this.endOpacity
                    }
                ];
            }
        };
        return SvgRadialGradientComponent;
    }());
    SvgRadialGradientComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'g[ngx-charts-svg-radial-gradient]',
                    template: "\n    <svg:radialGradient [id]=\"name\" [attr.cx]=\"cx\" [attr.cy]=\"cy\" [attr.r]=\"r\" gradientUnits=\"userSpaceOnUse\">\n      <svg:stop\n        *ngFor=\"let stop of stops\"\n        [attr.offset]=\"stop.offset + '%'\"\n        [style.stop-color]=\"stop.color\"\n        [style.stop-opacity]=\"stop.opacity\"\n      />\n    </svg:radialGradient>\n  ",
                    changeDetection: core.ChangeDetectionStrategy.OnPush
                },] }
    ];
    SvgRadialGradientComponent.propDecorators = {
        color: [{ type: core.Input }],
        name: [{ type: core.Input }],
        startOpacity: [{ type: core.Input }],
        endOpacity: [{ type: core.Input }],
        cx: [{ type: core.Input }],
        cy: [{ type: core.Input }],
        stops: [{ type: core.Input }]
    };

    var AreaComponent = /** @class */ (function () {
        function AreaComponent(element) {
            this.opacity = 1;
            this.startOpacity = 0.5;
            this.endOpacity = 1;
            this.gradient = false;
            this.animations = true;
            this.select = new core.EventEmitter();
            this.animationsLoaded = false;
            this.hasGradient = false;
            this.barOrientation = exports.BarOrientation;
            this.element = element.nativeElement;
        }
        AreaComponent.prototype.ngOnChanges = function () {
            this.update();
            if (!this.animationsLoaded) {
                this.loadAnimation();
                this.animationsLoaded = true;
            }
        };
        AreaComponent.prototype.update = function () {
            this.gradientId = 'grad' + id().toString();
            this.gradientFill = "url(#" + this.gradientId + ")";
            if (this.gradient || this.stops) {
                this.gradientStops = this.getGradient();
                this.hasGradient = true;
            }
            else {
                this.hasGradient = false;
            }
            this.updatePathEl();
        };
        AreaComponent.prototype.loadAnimation = function () {
            this.areaPath = this.startingPath;
            setTimeout(this.updatePathEl.bind(this), 100);
        };
        AreaComponent.prototype.updatePathEl = function () {
            var node = d3Selection.select(this.element).select('.area');
            if (this.animations) {
                node.transition().duration(750).attr('d', this.path);
            }
            else {
                node.attr('d', this.path);
            }
        };
        AreaComponent.prototype.getGradient = function () {
            if (this.stops) {
                return this.stops;
            }
            return [
                {
                    offset: 0,
                    color: this.fill,
                    opacity: this.startOpacity
                },
                {
                    offset: 100,
                    color: this.fill,
                    opacity: this.endOpacity
                }
            ];
        };
        return AreaComponent;
    }());
    AreaComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'g[ngx-charts-area]',
                    template: "\n    <svg:defs *ngIf=\"gradient\">\n      <svg:g\n        ngx-charts-svg-linear-gradient\n        [orientation]=\"barOrientation.Vertical\"\n        [name]=\"gradientId\"\n        [stops]=\"gradientStops\"\n      />\n    </svg:defs>\n    <svg:path class=\"area\" [attr.d]=\"areaPath\" [attr.fill]=\"gradient ? gradientFill : fill\" [style.opacity]=\"opacity\" />\n  ",
                    changeDetection: core.ChangeDetectionStrategy.OnPush
                },] }
    ];
    AreaComponent.ctorParameters = function () { return [
        { type: core.ElementRef }
    ]; };
    AreaComponent.propDecorators = {
        data: [{ type: core.Input }],
        path: [{ type: core.Input }],
        startingPath: [{ type: core.Input }],
        fill: [{ type: core.Input }],
        opacity: [{ type: core.Input }],
        startOpacity: [{ type: core.Input }],
        endOpacity: [{ type: core.Input }],
        gradient: [{ type: core.Input }],
        stops: [{ type: core.Input }],
        animations: [{ type: core.Input }],
        select: [{ type: core.Output }]
    };

    // Robert Penner's easeOutExpo
    function easeOutExpo(t, b, c, d) {
        return (c * (-Math.pow(2, (-10 * t) / d) + 1) * 1024) / 1023 + b;
    }
    /**
     * Counts from a number to the end incrementally.
     */
    function count(countFrom, countTo, countDecimals, countDuration, callback) {
        var startVal = Number(countFrom);
        var endVal = Number(countTo);
        var countDown = startVal > endVal;
        var decimals = Math.max(0, countDecimals);
        var dec = Math.pow(10, decimals);
        var duration = Number(countDuration) * 1000;
        var startTime;
        function runCount(timestamp) {
            var frameVal;
            var progress = timestamp - startTime;
            if (countDown) {
                frameVal = startVal - easeOutExpo(progress, 0, startVal - endVal, duration);
            }
            else {
                frameVal = easeOutExpo(progress, startVal, endVal - startVal, duration);
            }
            if (countDown) {
                frameVal = frameVal < endVal ? endVal : frameVal;
            }
            else {
                frameVal = frameVal > endVal ? endVal : frameVal;
            }
            frameVal = Math.round(frameVal * dec) / dec;
            var tick = progress < duration;
            callback({
                value: frameVal,
                progress: progress,
                timestamp: timestamp,
                finished: !tick
            });
            if (tick) {
                return requestAnimationFrame(function (val) { return runCount(val); });
            }
        }
        return requestAnimationFrame(function (timestamp) {
            startTime = timestamp;
            return runCount(timestamp);
        });
    }
    /**
     * Determine decimals places
     *
     * @export
     */
    function decimalChecker(countTo) {
        var endVal = Number(countTo);
        if (endVal % 1 !== 0 && Math.abs(endVal) <= 10) {
            return 2;
        }
        return 0;
    }

    /**
     * Count up component
     *
     * Loosely inspired by:
     *  - https://github.com/izupet/angular2-counto
     *  - https://inorganik.github.io/countUp.js/
     *
     * @export
     */
    var CountUpDirective = /** @class */ (function () {
        function CountUpDirective(cd, element) {
            this.cd = cd;
            this.countDuration = 1;
            this.countPrefix = '';
            this.countSuffix = '';
            this.countChange = new core.EventEmitter();
            this.countFinish = new core.EventEmitter();
            this.value = '';
            this._countDecimals = 0;
            this._countTo = 0;
            this._countFrom = 0;
            this.nativeElement = element.nativeElement;
        }
        Object.defineProperty(CountUpDirective.prototype, "countDecimals", {
            get: function () {
                if (this._countDecimals)
                    return this._countDecimals;
                return decimalChecker(this.countTo);
            },
            set: function (val) {
                this._countDecimals = val;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(CountUpDirective.prototype, "countTo", {
            get: function () {
                return this._countTo;
            },
            set: function (val) {
                this._countTo = parseFloat(val);
                this.start();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(CountUpDirective.prototype, "countFrom", {
            get: function () {
                return this._countFrom;
            },
            set: function (val) {
                this._countFrom = parseFloat(val);
                this.start();
            },
            enumerable: false,
            configurable: true
        });
        CountUpDirective.prototype.ngOnDestroy = function () {
            cancelAnimationFrame(this.animationReq);
        };
        CountUpDirective.prototype.start = function () {
            var _this = this;
            cancelAnimationFrame(this.animationReq);
            var valueFormatting = this.valueFormatting || (function (value) { return "" + _this.countPrefix + value.toLocaleString() + _this.countSuffix; });
            var callback = function (_a) {
                var value = _a.value, progress = _a.progress, finished = _a.finished;
                _this.value = valueFormatting(value);
                _this.cd.markForCheck();
                if (!finished)
                    _this.countChange.emit({ value: _this.value, progress: progress });
                if (finished)
                    _this.countFinish.emit({ value: _this.value, progress: progress });
            };
            this.animationReq = count(this.countFrom, this.countTo, this.countDecimals, this.countDuration, callback);
        };
        return CountUpDirective;
    }());
    CountUpDirective.decorators = [
        { type: core.Component, args: [{
                    selector: '[ngx-charts-count-up]',
                    template: " {{ value }} "
                },] }
    ];
    CountUpDirective.ctorParameters = function () { return [
        { type: core.ChangeDetectorRef },
        { type: core.ElementRef }
    ]; };
    CountUpDirective.propDecorators = {
        countDuration: [{ type: core.Input }],
        countPrefix: [{ type: core.Input }],
        countSuffix: [{ type: core.Input }],
        valueFormatting: [{ type: core.Input }],
        countDecimals: [{ type: core.Input }],
        countTo: [{ type: core.Input }],
        countFrom: [{ type: core.Input }],
        countChange: [{ type: core.Output }],
        countFinish: [{ type: core.Output }]
    };

    // If we don't check whether 'window' and 'global' variables are defined,
    // code will fail in browser/node with 'variable is undefined' error.
    var root;
    if (typeof window !== 'undefined') {
        root = window;
    }
    else if (typeof global !== 'undefined') {
        root = global;
    }
    // tslint:disable-next-line:variable-name
    var MouseEvent = root.MouseEvent;
    function createMouseEvent(name, bubbles, cancelable) {
        if (bubbles === void 0) { bubbles = false; }
        if (cancelable === void 0) { cancelable = true; }
        // Calling new of an event does not work correctly on IE. The following is a tested workaround
        // See https://stackoverflow.com/questions/27176983/dispatchevent-not-working-in-ie11
        if (typeof MouseEvent === 'function') {
            // Sane browsers
            return new MouseEvent(name, { bubbles: bubbles, cancelable: cancelable });
        }
        else {
            // IE
            var event = document.createEvent('MouseEvent');
            event.initEvent(name, bubbles, cancelable);
            return event;
        }
    }

    var TooltipArea = /** @class */ (function () {
        function TooltipArea(platformId) {
            this.platformId = platformId;
            this.anchorOpacity = 0;
            this.anchorPos = -1;
            this.anchorValues = [];
            this.placementTypes = exports.PlacementTypes;
            this.styleTypes = exports.StyleTypes;
            this.showPercentage = false;
            this.tooltipDisabled = false;
            this.hover = new core.EventEmitter();
        }
        TooltipArea.prototype.getValues = function (xVal) {
            var e_1, _a;
            var results = [];
            try {
                for (var _b = __values(this.results), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var group = _c.value;
                    var item = group.series.find(function (d) { return d.name.toString() === xVal.toString(); });
                    var groupName = group.name;
                    if (groupName instanceof Date) {
                        groupName = groupName.toLocaleDateString();
                    }
                    if (item) {
                        var label = item.name;
                        var val = item.value;
                        if (this.showPercentage) {
                            val = (item.d1 - item.d0).toFixed(2) + '%';
                        }
                        var color = void 0;
                        if (this.colors.scaleType === exports.ScaleType.Linear) {
                            var v = val;
                            if (item.d1) {
                                v = item.d1;
                            }
                            color = this.colors.getColor(v);
                        }
                        else {
                            color = this.colors.getColor(group.name);
                        }
                        var data = Object.assign({}, item, {
                            value: val,
                            name: label,
                            series: groupName,
                            min: item.min,
                            max: item.max,
                            color: color
                        });
                        results.push(data);
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return results;
        };
        TooltipArea.prototype.mouseMove = function (event) {
            if (!common.isPlatformBrowser(this.platformId)) {
                return;
            }
            var xPos = event.pageX - event.target.getBoundingClientRect().left;
            var closestIndex = this.findClosestPointIndex(xPos);
            var closestPoint = this.xSet[closestIndex];
            this.anchorPos = this.xScale(closestPoint);
            this.anchorPos = Math.max(0, this.anchorPos);
            this.anchorPos = Math.min(this.dims.width, this.anchorPos);
            this.anchorValues = this.getValues(closestPoint);
            if (this.anchorPos !== this.lastAnchorPos) {
                var ev = createMouseEvent('mouseleave');
                this.tooltipAnchor.nativeElement.dispatchEvent(ev);
                this.anchorOpacity = 0.7;
                this.hover.emit({
                    value: closestPoint
                });
                this.showTooltip();
                this.lastAnchorPos = this.anchorPos;
            }
        };
        TooltipArea.prototype.findClosestPointIndex = function (xPos) {
            var minIndex = 0;
            var maxIndex = this.xSet.length - 1;
            var minDiff = Number.MAX_VALUE;
            var closestIndex = 0;
            while (minIndex <= maxIndex) {
                var currentIndex = ((minIndex + maxIndex) / 2) | 0;
                var currentElement = this.xScale(this.xSet[currentIndex]);
                var curDiff = Math.abs(currentElement - xPos);
                if (curDiff < minDiff) {
                    minDiff = curDiff;
                    closestIndex = currentIndex;
                }
                if (currentElement < xPos) {
                    minIndex = currentIndex + 1;
                }
                else if (currentElement > xPos) {
                    maxIndex = currentIndex - 1;
                }
                else {
                    minDiff = 0;
                    closestIndex = currentIndex;
                    break;
                }
            }
            return closestIndex;
        };
        TooltipArea.prototype.showTooltip = function () {
            var event = createMouseEvent('mouseenter');
            this.tooltipAnchor.nativeElement.dispatchEvent(event);
        };
        TooltipArea.prototype.hideTooltip = function () {
            var event = createMouseEvent('mouseleave');
            this.tooltipAnchor.nativeElement.dispatchEvent(event);
            this.anchorOpacity = 0;
            this.lastAnchorPos = -1;
        };
        TooltipArea.prototype.getToolTipText = function (tooltipItem) {
            var result = '';
            if (tooltipItem.series !== undefined) {
                result += tooltipItem.series;
            }
            else {
                result += '???';
            }
            result += ': ';
            if (tooltipItem.value !== undefined) {
                result += tooltipItem.value.toLocaleString();
            }
            if (tooltipItem.min !== undefined || tooltipItem.max !== undefined) {
                result += ' (';
                if (tooltipItem.min !== undefined) {
                    if (tooltipItem.max === undefined) {
                        result += '≥';
                    }
                    result += tooltipItem.min.toLocaleString();
                    if (tooltipItem.max !== undefined) {
                        result += ' - ';
                    }
                }
                else if (tooltipItem.max !== undefined) {
                    result += '≤';
                }
                if (tooltipItem.max !== undefined) {
                    result += tooltipItem.max.toLocaleString();
                }
                result += ')';
            }
            return result;
        };
        return TooltipArea;
    }());
    TooltipArea.decorators = [
        { type: core.Component, args: [{
                    selector: 'g[ngx-charts-tooltip-area]',
                    template: "\n    <svg:g>\n      <svg:rect\n        class=\"tooltip-area\"\n        [attr.x]=\"0\"\n        y=\"0\"\n        [attr.width]=\"dims.width\"\n        [attr.height]=\"dims.height\"\n        style=\"opacity: 0; cursor: 'auto';\"\n        (mousemove)=\"mouseMove($event)\"\n        (mouseleave)=\"hideTooltip()\"\n      />\n      <ng-template #defaultTooltipTemplate let-model=\"model\">\n        <xhtml:div class=\"area-tooltip-container\">\n          <xhtml:div *ngFor=\"let tooltipItem of model\" class=\"tooltip-item\">\n            <xhtml:span class=\"tooltip-item-color\" [style.background-color]=\"tooltipItem.color\"></xhtml:span>\n            {{ getToolTipText(tooltipItem) }}\n          </xhtml:div>\n        </xhtml:div>\n      </ng-template>\n      <svg:rect\n        #tooltipAnchor\n        [@animationState]=\"anchorOpacity !== 0 ? 'active' : 'inactive'\"\n        class=\"tooltip-anchor\"\n        [attr.x]=\"anchorPos\"\n        y=\"0\"\n        [attr.width]=\"1\"\n        [attr.height]=\"dims.height\"\n        [style.opacity]=\"anchorOpacity\"\n        [style.pointer-events]=\"'none'\"\n        ngx-tooltip\n        [tooltipDisabled]=\"tooltipDisabled\"\n        [tooltipPlacement]=\"placementTypes.Right\"\n        [tooltipType]=\"styleTypes.tooltip\"\n        [tooltipSpacing]=\"15\"\n        [tooltipTemplate]=\"tooltipTemplate ? tooltipTemplate : defaultTooltipTemplate\"\n        [tooltipContext]=\"anchorValues\"\n        [tooltipImmediateExit]=\"true\"\n      />\n    </svg:g>\n  ",
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    animations: [
                        animations.trigger('animationState', [
                            animations.transition('inactive => active', [
                                animations.style({
                                    opacity: 0
                                }),
                                animations.animate(250, animations.style({ opacity: 0.7 }))
                            ]),
                            animations.transition('active => inactive', [
                                animations.style({
                                    opacity: 0.7
                                }),
                                animations.animate(250, animations.style({ opacity: 0 }))
                            ])
                        ])
                    ]
                },] }
    ];
    TooltipArea.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: core.Inject, args: [core.PLATFORM_ID,] }] }
    ]; };
    TooltipArea.propDecorators = {
        dims: [{ type: core.Input }],
        xSet: [{ type: core.Input }],
        xScale: [{ type: core.Input }],
        yScale: [{ type: core.Input }],
        results: [{ type: core.Input }],
        colors: [{ type: core.Input }],
        showPercentage: [{ type: core.Input }],
        tooltipDisabled: [{ type: core.Input }],
        tooltipTemplate: [{ type: core.Input }],
        hover: [{ type: core.Output }],
        tooltipAnchor: [{ type: core.ViewChild, args: ['tooltipAnchor', { static: false },] }]
    };

    var Timeline = /** @class */ (function () {
        function Timeline(element, cd) {
            this.cd = cd;
            this.height = 50;
            this.select = new core.EventEmitter();
            this.onDomainChange = new core.EventEmitter();
            this.initialized = false;
            this.element = element.nativeElement;
        }
        Timeline.prototype.ngOnChanges = function (changes) {
            this.update();
            if (!this.initialized) {
                this.addBrush();
                this.initialized = true;
            }
        };
        Timeline.prototype.update = function () {
            this.dims = this.getDims();
            this.height = this.dims.height;
            var offsetY = this.view[1] - this.height;
            this.xDomain = this.getXDomain();
            this.xScale = this.getXScale();
            if (this.brush) {
                this.updateBrush();
            }
            this.transform = "translate(0 , " + offsetY + ")";
            this.filterId = 'filter' + id().toString();
            this.filter = "url(#" + this.filterId + ")";
            this.cd.markForCheck();
        };
        Timeline.prototype.getXDomain = function () {
            var e_1, _a, e_2, _b;
            var values = [];
            try {
                for (var _c = __values(this.results), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var results = _d.value;
                    try {
                        for (var _e = (e_2 = void 0, __values(results.series)), _f = _e.next(); !_f.done; _f = _e.next()) {
                            var d = _f.value;
                            if (!values.includes(d.name)) {
                                values.push(d.name);
                            }
                        }
                    }
                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                    finally {
                        try {
                            if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                        }
                        finally { if (e_2) throw e_2.error; }
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                }
                finally { if (e_1) throw e_1.error; }
            }
            var domain = [];
            if (this.scaleType === exports.ScaleType.Time) {
                var min = Math.min.apply(Math, __spreadArray([], __read(values)));
                var max = Math.max.apply(Math, __spreadArray([], __read(values)));
                domain = [min, max];
            }
            else if (this.scaleType === exports.ScaleType.Linear) {
                values = values.map(function (v) { return Number(v); });
                var min = Math.min.apply(Math, __spreadArray([], __read(values)));
                var max = Math.max.apply(Math, __spreadArray([], __read(values)));
                domain = [min, max];
            }
            else {
                domain = values;
            }
            return domain;
        };
        Timeline.prototype.getXScale = function () {
            var scale;
            if (this.scaleType === exports.ScaleType.Time) {
                scale = d3Scale.scaleTime().range([0, this.dims.width]).domain(this.xDomain);
            }
            else if (this.scaleType === exports.ScaleType.Linear) {
                scale = d3Scale.scaleLinear().range([0, this.dims.width]).domain(this.xDomain);
            }
            else if (this.scaleType === exports.ScaleType.Ordinal) {
                scale = d3Scale.scalePoint().range([0, this.dims.width]).padding(0.1).domain(this.xDomain);
            }
            return scale;
        };
        Timeline.prototype.addBrush = function () {
            var _this = this;
            if (this.brush)
                return;
            var height = this.height;
            var width = this.view[0];
            this.brush = d3Brush.brushX()
                .extent([
                [0, 0],
                [width, height]
            ])
                .on('brush end', function (_a) {
                var selection = _a.selection;
                var newSelection = selection || _this.xScale.range();
                var newDomain = newSelection.map(_this.xScale.invert);
                _this.onDomainChange.emit(newDomain);
                _this.cd.markForCheck();
            });
            d3Selection.select(this.element).select('.brush').call(this.brush);
        };
        Timeline.prototype.updateBrush = function () {
            if (!this.brush)
                return;
            var height = this.height;
            var width = this.view[0];
            this.brush.extent([
                [0, 0],
                [width, height]
            ]);
            d3Selection.select(this.element).select('.brush').call(this.brush);
            // clear hardcoded properties so they can be defined by CSS
            d3Selection.select(this.element)
                .select('.selection')
                .attr('fill', undefined)
                .attr('stroke', undefined)
                .attr('fill-opacity', undefined);
            this.cd.markForCheck();
        };
        Timeline.prototype.getDims = function () {
            var width = this.view[0];
            var dims = {
                width: width,
                height: this.height
            };
            return dims;
        };
        return Timeline;
    }());
    Timeline.decorators = [
        { type: core.Component, args: [{
                    selector: 'g[ngx-charts-timeline]',
                    template: "\n    <svg:g class=\"timeline\" [attr.transform]=\"transform\">\n      <svg:filter [attr.id]=\"filterId\">\n        <svg:feColorMatrix\n          in=\"SourceGraphic\"\n          type=\"matrix\"\n          values=\"0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0\"\n        />\n      </svg:filter>\n      <svg:g class=\"embedded-chart\">\n        <ng-content></ng-content>\n      </svg:g>\n      <svg:rect x=\"0\" [attr.width]=\"view[0]\" y=\"0\" [attr.height]=\"height\" class=\"brush-background\" />\n      <svg:g class=\"brush\"></svg:g>\n    </svg:g>\n  ",
                    encapsulation: core.ViewEncapsulation.None,
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    styles: [".timeline .brush-background{fill:#0000000d}.timeline .brush .selection{fill:#0000001a;stroke-width:1px;stroke:#888}.timeline .brush .handle{fill-opacity:0}.timeline .embedded-chart{opacity:.6}\n"]
                },] }
    ];
    Timeline.ctorParameters = function () { return [
        { type: core.ElementRef },
        { type: core.ChangeDetectorRef }
    ]; };
    Timeline.propDecorators = {
        view: [{ type: core.Input }],
        results: [{ type: core.Input }],
        scheme: [{ type: core.Input }],
        customColors: [{ type: core.Input }],
        legend: [{ type: core.Input }],
        autoScale: [{ type: core.Input }],
        scaleType: [{ type: core.Input }],
        height: [{ type: core.Input }],
        select: [{ type: core.Output }],
        onDomainChange: [{ type: core.Output }]
    };

    var LegendComponent = /** @class */ (function () {
        function LegendComponent(cd) {
            this.cd = cd;
            this.horizontal = false;
            this.labelClick = new core.EventEmitter();
            this.labelActivate = new core.EventEmitter();
            this.labelDeactivate = new core.EventEmitter();
            this.legendEntries = [];
        }
        LegendComponent.prototype.ngOnChanges = function (changes) {
            this.update();
        };
        LegendComponent.prototype.update = function () {
            this.cd.markForCheck();
            this.legendEntries = this.getLegendEntries();
        };
        LegendComponent.prototype.getLegendEntries = function () {
            var e_1, _a;
            var items = [];
            var _loop_1 = function (label) {
                var formattedLabel = formatLabel(label);
                var idx = items.findIndex(function (i) {
                    return i.label === formattedLabel;
                });
                if (idx === -1) {
                    items.push({
                        label: label,
                        formattedLabel: formattedLabel,
                        color: this_1.colors.getColor(label)
                    });
                }
            };
            var this_1 = this;
            try {
                for (var _b = __values(this.data), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var label = _c.value;
                    _loop_1(label);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return items;
        };
        LegendComponent.prototype.isActive = function (entry) {
            if (!this.activeEntries)
                return false;
            var item = this.activeEntries.find(function (d) {
                return entry.label === d.name;
            });
            return item !== undefined;
        };
        LegendComponent.prototype.activate = function (item) {
            this.labelActivate.emit(item);
        };
        LegendComponent.prototype.deactivate = function (item) {
            this.labelDeactivate.emit(item);
        };
        LegendComponent.prototype.trackBy = function (index, item) {
            return item.label;
        };
        return LegendComponent;
    }());
    LegendComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'ngx-charts-legend',
                    template: "\n    <div [style.width.px]=\"width\">\n      <header class=\"legend-title\" *ngIf=\"title?.length > 0\">\n        <span class=\"legend-title-text\">{{ title }}</span>\n      </header>\n      <div class=\"legend-wrap\">\n        <ul class=\"legend-labels\" [class.horizontal-legend]=\"horizontal\" [style.max-height.px]=\"height - 45\">\n          <li *ngFor=\"let entry of legendEntries; trackBy: trackBy\" class=\"legend-label\">\n            <ngx-charts-legend-entry\n              [label]=\"entry.label\"\n              [formattedLabel]=\"entry.formattedLabel\"\n              [color]=\"entry.color\"\n              [isActive]=\"isActive(entry)\"\n              (select)=\"labelClick.emit($event)\"\n              (activate)=\"activate($event)\"\n              (deactivate)=\"deactivate($event)\"\n            >\n            </ngx-charts-legend-entry>\n          </li>\n        </ul>\n      </div>\n    </div>\n  ",
                    encapsulation: core.ViewEncapsulation.None,
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    styles: [".chart-legend{display:inline-block;padding:0;width:auto!important}.chart-legend .legend-title{white-space:nowrap;overflow:hidden;margin-left:10px;margin-bottom:5px;font-size:14px;font-weight:bold}.chart-legend ul,.chart-legend li{padding:0;margin:0;list-style:none}.chart-legend .horizontal-legend li{display:inline-block}.chart-legend .legend-wrap{width:calc(100% - 10px)}.chart-legend .legend-labels{line-height:85%;list-style:none;text-align:left;float:left;width:100%;border-radius:3px;overflow-y:auto;overflow-x:hidden;white-space:nowrap;background:rgba(0,0,0,.05)}.chart-legend .legend-label{cursor:pointer;font-size:90%;margin:8px;color:#afb7c8}.chart-legend .legend-label:hover{color:#000;transition:.2s}.chart-legend .legend-label .active .legend-label-text{color:#000}.chart-legend .legend-label-color{display:inline-block;height:15px;width:15px;margin-right:5px;color:#5b646b;border-radius:3px}.chart-legend .legend-label-text{display:inline-block;vertical-align:top;line-height:15px;font-size:12px;width:calc(100% - 20px);text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.chart-legend .legend-title-text{vertical-align:bottom;display:inline-block;line-height:16px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}\n"]
                },] }
    ];
    LegendComponent.ctorParameters = function () { return [
        { type: core.ChangeDetectorRef }
    ]; };
    LegendComponent.propDecorators = {
        data: [{ type: core.Input }],
        title: [{ type: core.Input }],
        colors: [{ type: core.Input }],
        height: [{ type: core.Input }],
        width: [{ type: core.Input }],
        activeEntries: [{ type: core.Input }],
        horizontal: [{ type: core.Input }],
        labelClick: [{ type: core.Output }],
        labelActivate: [{ type: core.Output }],
        labelDeactivate: [{ type: core.Output }]
    };

    var LegendEntryComponent = /** @class */ (function () {
        function LegendEntryComponent() {
            this.isActive = false;
            this.select = new core.EventEmitter();
            this.activate = new core.EventEmitter();
            this.deactivate = new core.EventEmitter();
            this.toggle = new core.EventEmitter();
        }
        Object.defineProperty(LegendEntryComponent.prototype, "trimmedLabel", {
            get: function () {
                return this.formattedLabel || '(empty)';
            },
            enumerable: false,
            configurable: true
        });
        LegendEntryComponent.prototype.onMouseEnter = function () {
            this.activate.emit({ name: this.label });
        };
        LegendEntryComponent.prototype.onMouseLeave = function () {
            this.deactivate.emit({ name: this.label });
        };
        return LegendEntryComponent;
    }());
    LegendEntryComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'ngx-charts-legend-entry',
                    template: "\n    <span [title]=\"formattedLabel\" tabindex=\"-1\" [class.active]=\"isActive\" (click)=\"select.emit(formattedLabel)\">\n      <span class=\"legend-label-color\" [style.background-color]=\"color\" (click)=\"toggle.emit(formattedLabel)\"> </span>\n      <span class=\"legend-label-text\">\n        {{ trimmedLabel }}\n      </span>\n    </span>\n  ",
                    changeDetection: core.ChangeDetectionStrategy.OnPush
                },] }
    ];
    LegendEntryComponent.propDecorators = {
        color: [{ type: core.Input }],
        label: [{ type: core.Input }],
        formattedLabel: [{ type: core.Input }],
        isActive: [{ type: core.Input }],
        select: [{ type: core.Output }],
        activate: [{ type: core.Output }],
        deactivate: [{ type: core.Output }],
        toggle: [{ type: core.Output }],
        onMouseEnter: [{ type: core.HostListener, args: ['mouseenter',] }],
        onMouseLeave: [{ type: core.HostListener, args: ['mouseleave',] }]
    };

    var ScaleLegendComponent = /** @class */ (function () {
        function ScaleLegendComponent() {
            this.horizontal = false;
        }
        ScaleLegendComponent.prototype.ngOnChanges = function (changes) {
            var gradientValues = this.gradientString(this.colors.range(), this.colors.domain());
            var direction = this.horizontal ? 'right' : 'bottom';
            this.gradient = "linear-gradient(to " + direction + ", " + gradientValues + ")";
        };
        /**
         * Generates the string used in the gradient stylesheet properties
         * @param colors array of colors
         * @param splits array of splits on a scale of (0, 1)
         */
        ScaleLegendComponent.prototype.gradientString = function (colors, splits) {
            // add the 100%
            splits.push(1);
            var pairs = [];
            colors.reverse().forEach(function (c, i) {
                pairs.push(c + " " + Math.round(splits[i] * 100) + "%");
            });
            return pairs.join(', ');
        };
        return ScaleLegendComponent;
    }());
    ScaleLegendComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'ngx-charts-scale-legend',
                    template: "\n    <div\n      class=\"scale-legend\"\n      [class.horizontal-legend]=\"horizontal\"\n      [style.height.px]=\"horizontal ? undefined : height\"\n      [style.width.px]=\"width\"\n    >\n      <div class=\"scale-legend-label\">\n        <span>{{ valueRange[1].toLocaleString() }}</span>\n      </div>\n      <div class=\"scale-legend-wrap\" [style.background]=\"gradient\"></div>\n      <div class=\"scale-legend-label\">\n        <span>{{ valueRange[0].toLocaleString() }}</span>\n      </div>\n    </div>\n  ",
                    encapsulation: core.ViewEncapsulation.None,
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    styles: [".chart-legend{display:inline-block;padding:0;width:auto!important}.chart-legend .scale-legend{text-align:center;display:flex;flex-direction:column}.chart-legend .scale-legend-wrap{display:inline-block;flex:1;width:30px;border-radius:5px;margin:0 auto}.chart-legend .scale-legend-label{font-size:12px}.chart-legend .horizontal-legend.scale-legend{flex-direction:row}.chart-legend .horizontal-legend .scale-legend-wrap{width:auto;height:30px;margin:0 16px}\n"]
                },] }
    ];
    ScaleLegendComponent.propDecorators = {
        valueRange: [{ type: core.Input }],
        colors: [{ type: core.Input }],
        height: [{ type: core.Input }],
        width: [{ type: core.Input }],
        horizontal: [{ type: core.Input }]
    };

    var AdvancedLegendComponent = /** @class */ (function () {
        function AdvancedLegendComponent() {
            this.label = 'Total';
            this.animations = true;
            this.select = new core.EventEmitter();
            this.activate = new core.EventEmitter();
            this.deactivate = new core.EventEmitter();
            this.legendItems = [];
            this.labelFormatting = function (label) { return label; };
            this.percentageFormatting = function (percentage) { return percentage; };
            this.defaultValueFormatting = function (value) { return value.toLocaleString(); };
        }
        AdvancedLegendComponent.prototype.ngOnChanges = function (changes) {
            this.update();
        };
        AdvancedLegendComponent.prototype.getTotal = function () {
            return this.data.map(function (d) { return Number(d.value); }).reduce(function (sum, d) { return sum + d; }, 0);
        };
        AdvancedLegendComponent.prototype.update = function () {
            this.total = this.getTotal();
            this.roundedTotal = this.total;
            this.legendItems = this.getLegendItems();
        };
        AdvancedLegendComponent.prototype.getLegendItems = function () {
            var _this = this;
            return this.data.map(function (d) {
                var label = formatLabel(d.name);
                var value = d.value;
                var color = _this.colors.getColor(label);
                var percentage = _this.total > 0 ? (value / _this.total) * 100 : 0;
                var formattedLabel = typeof _this.labelFormatting === 'function' ? _this.labelFormatting(label) : label;
                return {
                    _value: value,
                    data: d,
                    value: value,
                    color: color,
                    label: formattedLabel,
                    displayLabel: trimLabel(formattedLabel, 20),
                    origialLabel: d.name,
                    percentage: _this.percentageFormatting ? _this.percentageFormatting(percentage) : percentage.toLocaleString()
                };
            });
        };
        AdvancedLegendComponent.prototype.trackBy = function (index, item) {
            return item.label;
        };
        return AdvancedLegendComponent;
    }());
    AdvancedLegendComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'ngx-charts-advanced-legend',
                    template: "\n    <div class=\"advanced-pie-legend\" [style.width.px]=\"width\">\n      <div\n        *ngIf=\"animations\"\n        class=\"total-value\"\n        ngx-charts-count-up\n        [countTo]=\"roundedTotal\"\n        [valueFormatting]=\"valueFormatting\"\n      ></div>\n      <div class=\"total-value\" *ngIf=\"!animations\">\n        {{ valueFormatting ? valueFormatting(roundedTotal) : defaultValueFormatting(roundedTotal) }}\n      </div>\n      <div class=\"total-label\">\n        {{ label }}\n      </div>\n      <div class=\"legend-items-container\">\n        <div class=\"legend-items\">\n          <div\n            *ngFor=\"let legendItem of legendItems; trackBy: trackBy\"\n            tabindex=\"-1\"\n            class=\"legend-item\"\n            (mouseenter)=\"activate.emit(legendItem.data)\"\n            (mouseleave)=\"deactivate.emit(legendItem.data)\"\n            (click)=\"select.emit(legendItem.data)\"\n          >\n            <div class=\"item-color\" [style.border-left-color]=\"legendItem.color\"></div>\n            <div\n              *ngIf=\"animations\"\n              class=\"item-value\"\n              ngx-charts-count-up\n              [countTo]=\"legendItem._value\"\n              [valueFormatting]=\"valueFormatting\"\n            ></div>\n            <div *ngIf=\"!animations\" class=\"item-value\">\n              {{ valueFormatting ? valueFormatting(legendItem.value) : defaultValueFormatting(legendItem.value) }}\n            </div>\n            <div class=\"item-label\">{{ legendItem.displayLabel }}</div>\n            <div\n              *ngIf=\"animations\"\n              class=\"item-percent\"\n              ngx-charts-count-up\n              [countTo]=\"legendItem.percentage\"\n              [countSuffix]=\"'%'\"\n            ></div>\n            <div *ngIf=\"!animations\" class=\"item-percent\">{{ legendItem.percentage.toLocaleString() }}%</div>\n          </div>\n        </div>\n      </div>\n    </div>\n  ",
                    encapsulation: core.ViewEncapsulation.None,
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    styles: [".advanced-pie-legend{float:left;position:relative;top:50%;transform:translateY(-50%)}.advanced-pie-legend .total-value{font-size:36px}.advanced-pie-legend .total-label{font-size:24px;margin-bottom:19px}.advanced-pie-legend .legend-items-container{width:100%}.advanced-pie-legend .legend-items-container .legend-items{white-space:nowrap;overflow:auto}.advanced-pie-legend .legend-items-container .legend-items .legend-item{margin-right:20px;display:inline-block;cursor:pointer}.advanced-pie-legend .legend-items-container .legend-items .legend-item:focus{outline:none}.advanced-pie-legend .legend-items-container .legend-items .legend-item:hover{color:#000;transition:.2s}.advanced-pie-legend .legend-items-container .legend-items .legend-item .item-value{font-size:24px;margin-top:-6px;margin-left:11px}.advanced-pie-legend .legend-items-container .legend-items .legend-item .item-label{font-size:14px;opacity:.7;margin-left:11px;margin-top:-6px}.advanced-pie-legend .legend-items-container .legend-items .legend-item .item-percent{font-size:24px;opacity:.7;margin-left:11px}.advanced-pie-legend .legend-items-container .legend-items .legend-item .item-color{border-left:4px solid;width:4px;height:42px;float:left;margin-right:7px}\n"]
                },] }
    ];
    AdvancedLegendComponent.propDecorators = {
        width: [{ type: core.Input }],
        data: [{ type: core.Input }],
        colors: [{ type: core.Input }],
        label: [{ type: core.Input }],
        animations: [{ type: core.Input }],
        select: [{ type: core.Output }],
        activate: [{ type: core.Output }],
        deactivate: [{ type: core.Output }],
        valueFormatting: [{ type: core.Input }],
        labelFormatting: [{ type: core.Input }],
        percentageFormatting: [{ type: core.Input }]
    };

    var COMPONENTS = [
        AreaComponent,
        BaseChartComponent,
        CountUpDirective,
        TooltipArea,
        ChartComponent,
        LegendComponent,
        LegendEntryComponent,
        ScaleLegendComponent,
        CircleComponent,
        CircleSeriesComponent,
        GridPanelComponent,
        GridPanelSeriesComponent,
        SvgLinearGradientComponent,
        SvgRadialGradientComponent,
        Timeline,
        AdvancedLegendComponent
    ];
    var ChartCommonModule = /** @class */ (function () {
        function ChartCommonModule() {
        }
        return ChartCommonModule;
    }());
    ChartCommonModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [common.CommonModule, AxesModule, TooltipModule],
                    declarations: __spreadArray(__spreadArray([], __read(COMPONENTS)), [VisibilityObserver]),
                    exports: __spreadArray(__spreadArray([common.CommonModule, AxesModule, TooltipModule], __read(COMPONENTS)), [VisibilityObserver])
                },] }
    ];

    function calculateViewDimensions(_a) {
        var width = _a.width, height = _a.height, margins = _a.margins, _b = _a.showXAxis, showXAxis = _b === void 0 ? false : _b, _c = _a.showYAxis, showYAxis = _c === void 0 ? false : _c, _d = _a.xAxisHeight, xAxisHeight = _d === void 0 ? 0 : _d, _e = _a.yAxisWidth, yAxisWidth = _e === void 0 ? 0 : _e, _f = _a.showXLabel, showXLabel = _f === void 0 ? false : _f, _g = _a.showYLabel, showYLabel = _g === void 0 ? false : _g, _h = _a.showLegend, showLegend = _h === void 0 ? false : _h, _j = _a.legendType, legendType = _j === void 0 ? exports.ScaleType.Ordinal : _j, _k = _a.legendPosition, legendPosition = _k === void 0 ? exports.LegendPosition.Right : _k, _l = _a.columns, columns = _l === void 0 ? 12 : _l;
        var xOffset = margins[3];
        var chartWidth = width;
        var chartHeight = height - margins[0] - margins[2];
        if (showLegend && legendPosition === exports.LegendPosition.Right) {
            if (legendType === exports.ScaleType.Ordinal) {
                columns -= 2;
            }
            else {
                columns -= 1;
            }
        }
        chartWidth = (chartWidth * columns) / 12;
        chartWidth = chartWidth - margins[1] - margins[3];
        if (showXAxis) {
            chartHeight -= 5;
            chartHeight -= xAxisHeight;
            if (showXLabel) {
                // text height + spacing between axis label and tick labels
                var offset = 25 + 5;
                chartHeight -= offset;
            }
        }
        if (showYAxis) {
            chartWidth -= 5;
            chartWidth -= yAxisWidth;
            xOffset += yAxisWidth;
            xOffset += 10;
            if (showYLabel) {
                // text height + spacing between axis label and tick labels
                var offset = 25 + 5;
                chartWidth -= offset;
                xOffset += offset;
            }
        }
        chartWidth = Math.max(0, chartWidth);
        chartHeight = Math.max(0, chartHeight);
        return {
            width: Math.floor(chartWidth),
            height: Math.floor(chartHeight),
            xOffset: Math.floor(xOffset)
        };
    }

    var colorSets = [
        {
            name: 'vivid',
            selectable: true,
            group: exports.ScaleType.Ordinal,
            domain: [
                '#647c8a',
                '#3f51b5',
                '#2196f3',
                '#00b862',
                '#afdf0a',
                '#a7b61a',
                '#f3e562',
                '#ff9800',
                '#ff5722',
                '#ff4514'
            ]
        },
        {
            name: 'natural',
            selectable: true,
            group: exports.ScaleType.Ordinal,
            domain: [
                '#bf9d76',
                '#e99450',
                '#d89f59',
                '#f2dfa7',
                '#a5d7c6',
                '#7794b1',
                '#afafaf',
                '#707160',
                '#ba9383',
                '#d9d5c3'
            ]
        },
        {
            name: 'cool',
            selectable: true,
            group: exports.ScaleType.Ordinal,
            domain: [
                '#a8385d',
                '#7aa3e5',
                '#a27ea8',
                '#aae3f5',
                '#adcded',
                '#a95963',
                '#8796c0',
                '#7ed3ed',
                '#50abcc',
                '#ad6886'
            ]
        },
        {
            name: 'fire',
            selectable: true,
            group: exports.ScaleType.Ordinal,
            domain: ['#ff3d00', '#bf360c', '#ff8f00', '#ff6f00', '#ff5722', '#e65100', '#ffca28', '#ffab00']
        },
        {
            name: 'solar',
            selectable: true,
            group: exports.ScaleType.Linear,
            domain: [
                '#fff8e1',
                '#ffecb3',
                '#ffe082',
                '#ffd54f',
                '#ffca28',
                '#ffc107',
                '#ffb300',
                '#ffa000',
                '#ff8f00',
                '#ff6f00'
            ]
        },
        {
            name: 'air',
            selectable: true,
            group: exports.ScaleType.Linear,
            domain: [
                '#e1f5fe',
                '#b3e5fc',
                '#81d4fa',
                '#4fc3f7',
                '#29b6f6',
                '#03a9f4',
                '#039be5',
                '#0288d1',
                '#0277bd',
                '#01579b'
            ]
        },
        {
            name: 'aqua',
            selectable: true,
            group: exports.ScaleType.Linear,
            domain: [
                '#e0f7fa',
                '#b2ebf2',
                '#80deea',
                '#4dd0e1',
                '#26c6da',
                '#00bcd4',
                '#00acc1',
                '#0097a7',
                '#00838f',
                '#006064'
            ]
        },
        {
            name: 'flame',
            selectable: false,
            group: exports.ScaleType.Ordinal,
            domain: [
                '#A10A28',
                '#D3342D',
                '#EF6D49',
                '#FAAD67',
                '#FDDE90',
                '#DBED91',
                '#A9D770',
                '#6CBA67',
                '#2C9653',
                '#146738'
            ]
        },
        {
            name: 'ocean',
            selectable: false,
            group: exports.ScaleType.Ordinal,
            domain: [
                '#1D68FB',
                '#33C0FC',
                '#4AFFFE',
                '#AFFFFF',
                '#FFFC63',
                '#FDBD2D',
                '#FC8A25',
                '#FA4F1E',
                '#FA141B',
                '#BA38D1'
            ]
        },
        {
            name: 'forest',
            selectable: false,
            group: exports.ScaleType.Ordinal,
            domain: [
                '#55C22D',
                '#C1F33D',
                '#3CC099',
                '#AFFFFF',
                '#8CFC9D',
                '#76CFFA',
                '#BA60FB',
                '#EE6490',
                '#C42A1C',
                '#FC9F32'
            ]
        },
        {
            name: 'horizon',
            selectable: false,
            group: exports.ScaleType.Ordinal,
            domain: [
                '#2597FB',
                '#65EBFD',
                '#99FDD0',
                '#FCEE4B',
                '#FEFCFA',
                '#FDD6E3',
                '#FCB1A8',
                '#EF6F7B',
                '#CB96E8',
                '#EFDEE0'
            ]
        },
        {
            name: 'neons',
            selectable: false,
            group: exports.ScaleType.Ordinal,
            domain: [
                '#FF3333',
                '#FF33FF',
                '#CC33FF',
                '#0000FF',
                '#33CCFF',
                '#33FFFF',
                '#33FF66',
                '#CCFF33',
                '#FFCC00',
                '#FF6600'
            ]
        },
        {
            name: 'picnic',
            selectable: false,
            group: exports.ScaleType.Ordinal,
            domain: [
                '#FAC51D',
                '#66BD6D',
                '#FAA026',
                '#29BB9C',
                '#E96B56',
                '#55ACD2',
                '#B7332F',
                '#2C83C9',
                '#9166B8',
                '#92E7E8'
            ]
        },
        {
            name: 'night',
            selectable: false,
            group: exports.ScaleType.Ordinal,
            domain: [
                '#2B1B5A',
                '#501356',
                '#183356',
                '#28203F',
                '#391B3C',
                '#1E2B3C',
                '#120634',
                '#2D0432',
                '#051932',
                '#453080',
                '#75267D',
                '#2C507D',
                '#4B3880',
                '#752F7D',
                '#35547D'
            ]
        },
        {
            name: 'nightLights',
            selectable: false,
            group: exports.ScaleType.Ordinal,
            domain: [
                '#4e31a5',
                '#9c25a7',
                '#3065ab',
                '#57468b',
                '#904497',
                '#46648b',
                '#32118d',
                '#a00fb3',
                '#1052a2',
                '#6e51bd',
                '#b63cc3',
                '#6c97cb',
                '#8671c1',
                '#b455be',
                '#7496c3'
            ]
        }
    ];

    var ColorHelper = /** @class */ (function () {
        function ColorHelper(scheme, type, domain, customColors) {
            if (typeof scheme === 'string') {
                scheme = colorSets.find(function (cs) {
                    return cs.name === scheme;
                });
            }
            this.colorDomain = scheme.domain;
            this.scaleType = type;
            this.domain = domain;
            this.customColors = customColors;
            this.scale = this.generateColorScheme(scheme, type, this.domain);
        }
        ColorHelper.prototype.generateColorScheme = function (scheme, type, domain) {
            if (typeof scheme === 'string') {
                scheme = colorSets.find(function (cs) {
                    return cs.name === scheme;
                });
            }
            var colorScale;
            switch (type) {
                case exports.ScaleType.Quantile:
                    colorScale = d3Scale.scaleQuantile()
                        .range(scheme.domain)
                        .domain(domain);
                    break;
                case exports.ScaleType.Ordinal:
                    colorScale = d3Scale.scaleOrdinal()
                        .range(scheme.domain)
                        .domain(domain);
                    break;
                case exports.ScaleType.Linear:
                    {
                        var colorDomain = __spreadArray([], __read(scheme.domain));
                        if (colorDomain.length === 1) {
                            colorDomain.push(colorDomain[0]);
                            this.colorDomain = colorDomain;
                        }
                        var points = d3Array.range(0, 1, 1.0 / colorDomain.length);
                        colorScale = d3Scale.scaleLinear()
                            .range(colorDomain)
                            .domain(points);
                    }
                    break;
                default:
                    break;
            }
            return colorScale;
        };
        ColorHelper.prototype.getColor = function (value) {
            if (value === undefined || value === null) {
                throw new Error('Value can not be null');
            }
            if (this.scaleType === exports.ScaleType.Linear) {
                var valueScale = d3Scale.scaleLinear()
                    .domain(this.domain)
                    .range([0, 1]);
                return this.scale(valueScale(value));
            }
            else {
                if (typeof this.customColors === 'function') {
                    return this.customColors(value);
                }
                var formattedValue_1 = value.toString();
                var found = // todo type customColors
                 void 0; // todo type customColors
                if (this.customColors && this.customColors.length > 0) {
                    found = this.customColors.find(function (mapping) {
                        return mapping.name.toLowerCase() === formattedValue_1.toLowerCase();
                    });
                }
                if (found) {
                    return found.value;
                }
                else {
                    return this.scale(value);
                }
            }
        };
        ColorHelper.prototype.getLinearGradientStops = function (value, start) {
            var e_1, _a;
            if (start === undefined) {
                start = this.domain[0];
            }
            var valueScale = d3Scale.scaleLinear()
                .domain(this.domain)
                .range([0, 1]);
            var colorValueScale = d3Scale.scaleBand().domain(this.colorDomain).range([0, 1]);
            var endColor = this.getColor(value);
            // generate the stops
            var startVal = valueScale(start);
            var startColor = this.getColor(start);
            var endVal = valueScale(value);
            var i = 1;
            var currentVal = startVal;
            var stops = [];
            stops.push({
                color: startColor,
                offset: startVal,
                originalOffset: startVal,
                opacity: 1
            });
            while (currentVal < endVal && i < this.colorDomain.length) {
                var color = this.colorDomain[i];
                var offset = colorValueScale(color);
                if (offset <= startVal) {
                    i++;
                    continue;
                }
                if (offset.toFixed(4) >= (endVal - colorValueScale.bandwidth()).toFixed(4)) {
                    break;
                }
                stops.push({
                    color: color,
                    offset: offset,
                    opacity: 1
                });
                currentVal = offset;
                i++;
            }
            if (stops[stops.length - 1].offset < 100) {
                stops.push({
                    color: endColor,
                    offset: endVal,
                    opacity: 1
                });
            }
            if (endVal === startVal) {
                stops[0].offset = 0;
                stops[1].offset = 100;
            }
            else {
                // normalize the offsets into percentages
                if (stops[stops.length - 1].offset !== 100) {
                    try {
                        for (var stops_1 = __values(stops), stops_1_1 = stops_1.next(); !stops_1_1.done; stops_1_1 = stops_1.next()) {
                            var s = stops_1_1.value;
                            s.offset = ((s.offset - startVal) / (endVal - startVal)) * 100;
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (stops_1_1 && !stops_1_1.done && (_a = stops_1.return)) _a.call(stops_1);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                }
            }
            return stops;
        };
        return ColorHelper;
    }());

    /**
     * Based on the data, return an array with unique values.
     *
     * @export
     * @returns array
     */
    function getUniqueXDomainValues(results) {
        var e_1, _a, e_2, _b;
        var valueSet = new Set();
        try {
            for (var results_1 = __values(results), results_1_1 = results_1.next(); !results_1_1.done; results_1_1 = results_1.next()) {
                var result = results_1_1.value;
                try {
                    for (var _c = (e_2 = void 0, __values(result.series)), _d = _c.next(); !_d.done; _d = _c.next()) {
                        var d = _d.value;
                        valueSet.add(d.name);
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (results_1_1 && !results_1_1.done && (_a = results_1.return)) _a.call(results_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return Array.from(valueSet);
    }
    /**
     * Get the scaleType of enumerable of values.
     * @returns  'time', 'linear' or 'ordinal'
     */
    function getScaleType(values, checkDateType) {
        if (checkDateType === void 0) { checkDateType = true; }
        if (checkDateType) {
            var allDates = values.every(function (value) { return value instanceof Date; });
            if (allDates) {
                return exports.ScaleType.Time;
            }
        }
        var allNumbers = values.every(function (value) { return typeof value === 'number'; });
        if (allNumbers) {
            return exports.ScaleType.Linear;
        }
        return exports.ScaleType.Ordinal;
    }
    function getXDomainArray(values, xScaleMin, xScaleMax) {
        var scaleType = getScaleType(values);
        var xSet = [];
        var domain = [];
        if (scaleType === exports.ScaleType.Linear) {
            values = values.map(function (v) { return Number(v); });
        }
        var min;
        var max;
        if (scaleType === exports.ScaleType.Time || scaleType === exports.ScaleType.Linear) {
            var mappedValues = values.map(function (v) { return Number(v); });
            min = xScaleMin ? xScaleMin : Math.min.apply(Math, __spreadArray([], __read(mappedValues)));
            max = xScaleMax ? xScaleMax : Math.max.apply(Math, __spreadArray([], __read(mappedValues)));
        }
        if (scaleType === exports.ScaleType.Time) {
            domain = [new Date(min), new Date(max)];
            xSet = __spreadArray([], __read(values)).sort(function (a, b) {
                var aDate = a.getTime();
                var bDate = b.getTime();
                if (aDate > bDate)
                    return 1;
                if (bDate > aDate)
                    return -1;
                return 0;
            });
        }
        else if (scaleType === exports.ScaleType.Linear) {
            domain = [min, max];
            // Use compare function to sort numbers numerically
            xSet = __spreadArray([], __read(values)).sort(function (a, b) { return a - b; });
        }
        else {
            domain = values;
            xSet = values;
        }
        return { domain: domain, xSet: xSet, scaleType: scaleType };
    }

    var AreaChartComponent = /** @class */ (function (_super) {
        __extends(AreaChartComponent, _super);
        function AreaChartComponent() {
            var _this = _super.apply(this, __spreadArray([], __read(arguments))) || this;
            _this.legend = false;
            _this.legendTitle = 'Legend';
            _this.legendPosition = exports.LegendPosition.Right;
            _this.xAxis = false;
            _this.yAxis = false;
            _this.baseValue = 'auto';
            _this.autoScale = false;
            _this.timeline = false;
            _this.showGridLines = true;
            _this.curve = d3Shape.curveLinear;
            _this.activeEntries = [];
            _this.trimXAxisTicks = true;
            _this.trimYAxisTicks = true;
            _this.rotateXAxisTicks = true;
            _this.maxXAxisTickLength = 16;
            _this.maxYAxisTickLength = 16;
            _this.roundDomains = false;
            _this.tooltipDisabled = false;
            _this.activate = new core.EventEmitter();
            _this.deactivate = new core.EventEmitter();
            _this.margin = [10, 20, 10, 20];
            _this.xAxisHeight = 0;
            _this.yAxisWidth = 0;
            _this.timelineHeight = 50;
            _this.timelinePadding = 10;
            _this.trackBy = function (index, item) {
                return item.name;
            };
            return _this;
        }
        AreaChartComponent.prototype.update = function () {
            _super.prototype.update.call(this);
            this.dims = calculateViewDimensions({
                width: this.width,
                height: this.height,
                margins: this.margin,
                showXAxis: this.xAxis,
                showYAxis: this.yAxis,
                xAxisHeight: this.xAxisHeight,
                yAxisWidth: this.yAxisWidth,
                showXLabel: this.showXAxisLabel,
                showYLabel: this.showYAxisLabel,
                showLegend: this.legend,
                legendType: this.schemeType,
                legendPosition: this.legendPosition
            });
            if (this.timeline) {
                this.dims.height -= this.timelineHeight + this.margin[2] + this.timelinePadding;
            }
            this.xDomain = this.getXDomain();
            if (this.filteredDomain) {
                this.xDomain = this.filteredDomain;
            }
            this.yDomain = this.getYDomain();
            this.seriesDomain = this.getSeriesDomain();
            this.xScale = this.getXScale(this.xDomain, this.dims.width);
            this.yScale = this.getYScale(this.yDomain, this.dims.height);
            this.updateTimeline();
            this.setColors();
            this.legendOptions = this.getLegendOptions();
            this.transform = "translate(" + this.dims.xOffset + ", " + this.margin[0] + ")";
            this.clipPathId = 'clip' + id().toString();
            this.clipPath = "url(#" + this.clipPathId + ")";
        };
        AreaChartComponent.prototype.updateTimeline = function () {
            if (this.timeline) {
                this.timelineWidth = this.dims.width;
                this.timelineXDomain = this.getXDomain();
                this.timelineXScale = this.getXScale(this.timelineXDomain, this.timelineWidth);
                this.timelineYScale = this.getYScale(this.yDomain, this.timelineHeight);
                this.timelineTransform = "translate(" + this.dims.xOffset + ", " + -this.margin[2] + ")";
            }
        };
        AreaChartComponent.prototype.getXDomain = function () {
            var values = getUniqueXDomainValues(this.results);
            this.scaleType = getScaleType(values);
            var domain = [];
            if (this.scaleType === exports.ScaleType.Linear) {
                values = values.map(function (v) { return Number(v); });
            }
            var min;
            var max;
            if (this.scaleType === exports.ScaleType.Time || this.scaleType === exports.ScaleType.Linear) {
                min = this.xScaleMin ? this.xScaleMin : Math.min.apply(Math, __spreadArray([], __read(values)));
                max = this.xScaleMax ? this.xScaleMax : Math.max.apply(Math, __spreadArray([], __read(values)));
            }
            if (this.scaleType === exports.ScaleType.Time) {
                domain = [new Date(min), new Date(max)];
                this.xSet = __spreadArray([], __read(values)).sort(function (a, b) {
                    var aDate = a.getTime();
                    var bDate = b.getTime();
                    if (aDate > bDate)
                        return 1;
                    if (bDate > aDate)
                        return -1;
                    return 0;
                });
            }
            else if (this.scaleType === exports.ScaleType.Linear) {
                domain = [min, max];
                // Use compare function to sort numbers numerically
                this.xSet = __spreadArray([], __read(values)).sort(function (a, b) { return a - b; });
            }
            else {
                domain = values;
                this.xSet = values;
            }
            return domain;
        };
        AreaChartComponent.prototype.getYDomain = function () {
            var e_1, _a, e_2, _b;
            var domain = [];
            try {
                for (var _c = __values(this.results), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var results = _d.value;
                    try {
                        for (var _e = (e_2 = void 0, __values(results.series)), _f = _e.next(); !_f.done; _f = _e.next()) {
                            var d = _f.value;
                            if (!domain.includes(d.value)) {
                                domain.push(d.value);
                            }
                        }
                    }
                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                    finally {
                        try {
                            if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                        }
                        finally { if (e_2) throw e_2.error; }
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                }
                finally { if (e_1) throw e_1.error; }
            }
            var values = __spreadArray([], __read(domain));
            if (!this.autoScale) {
                values.push(0);
            }
            if (this.baseValue !== 'auto') {
                values.push(this.baseValue);
            }
            var min = this.yScaleMin ? this.yScaleMin : Math.min.apply(Math, __spreadArray([], __read(values)));
            var max = this.yScaleMax ? this.yScaleMax : Math.max.apply(Math, __spreadArray([], __read(values)));
            return [min, max];
        };
        AreaChartComponent.prototype.getSeriesDomain = function () {
            return this.results.map(function (d) { return d.name; });
        };
        AreaChartComponent.prototype.getXScale = function (domain, width) {
            var scale;
            if (this.scaleType === exports.ScaleType.Time) {
                scale = d3Scale.scaleTime();
            }
            else if (this.scaleType === exports.ScaleType.Linear) {
                scale = d3Scale.scaleLinear();
            }
            else if (this.scaleType === exports.ScaleType.Ordinal) {
                scale = d3Scale.scalePoint().padding(0.1);
            }
            scale.range([0, width]).domain(domain);
            return this.roundDomains ? scale.nice() : scale;
        };
        AreaChartComponent.prototype.getYScale = function (domain, height) {
            var scale = d3Scale.scaleLinear().range([height, 0]).domain(domain);
            return this.roundDomains ? scale.nice() : scale;
        };
        AreaChartComponent.prototype.getScaleType = function (values) {
            var e_3, _a;
            var date = true;
            var num = true;
            try {
                for (var values_1 = __values(values), values_1_1 = values_1.next(); !values_1_1.done; values_1_1 = values_1.next()) {
                    var value = values_1_1.value;
                    if (isDate(value)) {
                        date = false;
                    }
                    if (isNumber(value)) {
                        num = false;
                    }
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (values_1_1 && !values_1_1.done && (_a = values_1.return)) _a.call(values_1);
                }
                finally { if (e_3) throw e_3.error; }
            }
            if (date) {
                return exports.ScaleType.Time;
            }
            if (num) {
                return exports.ScaleType.Linear;
            }
            return exports.ScaleType.Ordinal;
        };
        AreaChartComponent.prototype.updateDomain = function (domain) {
            this.filteredDomain = domain;
            this.xDomain = this.filteredDomain;
            this.xScale = this.getXScale(this.xDomain, this.dims.width);
        };
        AreaChartComponent.prototype.updateHoveredVertical = function (item) {
            this.hoveredVertical = item.value;
            this.deactivateAll();
        };
        AreaChartComponent.prototype.hideCircles = function () {
            this.hoveredVertical = null;
            this.deactivateAll();
        };
        AreaChartComponent.prototype.onClick = function (data, series) {
            if (series) {
                data.series = series.name;
            }
            this.select.emit(data);
        };
        AreaChartComponent.prototype.setColors = function () {
            var domain;
            if (this.schemeType === exports.ScaleType.Ordinal) {
                domain = this.seriesDomain;
            }
            else {
                domain = this.yDomain;
            }
            this.colors = new ColorHelper(this.scheme, this.schemeType, domain, this.customColors);
        };
        AreaChartComponent.prototype.getLegendOptions = function () {
            var opts = {
                scaleType: this.schemeType,
                colors: undefined,
                domain: [],
                title: undefined,
                position: this.legendPosition
            };
            if (opts.scaleType === exports.ScaleType.Ordinal) {
                opts.domain = this.seriesDomain;
                opts.colors = this.colors;
                opts.title = this.legendTitle;
            }
            else {
                opts.domain = this.yDomain;
                opts.colors = this.colors.scale;
            }
            return opts;
        };
        AreaChartComponent.prototype.updateYAxisWidth = function (_a) {
            var width = _a.width;
            this.yAxisWidth = width;
            this.update();
        };
        AreaChartComponent.prototype.updateXAxisHeight = function (_a) {
            var height = _a.height;
            this.xAxisHeight = height;
            this.update();
        };
        AreaChartComponent.prototype.onActivate = function (item) {
            var idx = this.activeEntries.findIndex(function (d) {
                return d.name === item.name && d.value === item.value;
            });
            if (idx > -1) {
                return;
            }
            this.activeEntries = __spreadArray([item], __read(this.activeEntries));
            this.activate.emit({ value: item, entries: this.activeEntries });
        };
        AreaChartComponent.prototype.onDeactivate = function (item) {
            var idx = this.activeEntries.findIndex(function (d) {
                return d.name === item.name && d.value === item.value;
            });
            this.activeEntries.splice(idx, 1);
            this.activeEntries = __spreadArray([], __read(this.activeEntries));
            this.deactivate.emit({ value: item, entries: this.activeEntries });
        };
        AreaChartComponent.prototype.deactivateAll = function () {
            var e_4, _a;
            this.activeEntries = __spreadArray([], __read(this.activeEntries));
            try {
                for (var _b = __values(this.activeEntries), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var entry = _c.value;
                    this.deactivate.emit({ value: entry, entries: [] });
                }
            }
            catch (e_4_1) { e_4 = { error: e_4_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_4) throw e_4.error; }
            }
            this.activeEntries = [];
        };
        return AreaChartComponent;
    }(BaseChartComponent));
    AreaChartComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'ngx-charts-area-chart',
                    template: "\n    <ngx-charts-chart\n      [view]=\"[width, height]\"\n      [showLegend]=\"legend\"\n      [legendOptions]=\"legendOptions\"\n      [activeEntries]=\"activeEntries\"\n      [animations]=\"animations\"\n      (legendLabelClick)=\"onClick($event)\"\n      (legendLabelActivate)=\"onActivate($event)\"\n      (legendLabelDeactivate)=\"onDeactivate($event)\"\n    >\n      <svg:defs>\n        <svg:clipPath [attr.id]=\"clipPathId\">\n          <svg:rect\n            [attr.width]=\"dims.width + 10\"\n            [attr.height]=\"dims.height + 10\"\n            [attr.transform]=\"'translate(-5, -5)'\"\n          />\n        </svg:clipPath>\n      </svg:defs>\n      <svg:g [attr.transform]=\"transform\" class=\"area-chart chart\">\n        <svg:g\n          ngx-charts-x-axis\n          *ngIf=\"xAxis\"\n          [xScale]=\"xScale\"\n          [dims]=\"dims\"\n          [showGridLines]=\"showGridLines\"\n          [showLabel]=\"showXAxisLabel\"\n          [labelText]=\"xAxisLabel\"\n          [trimTicks]=\"trimXAxisTicks\"\n          [rotateTicks]=\"rotateXAxisTicks\"\n          [maxTickLength]=\"maxXAxisTickLength\"\n          [tickFormatting]=\"xAxisTickFormatting\"\n          [ticks]=\"xAxisTicks\"\n          (dimensionsChanged)=\"updateXAxisHeight($event)\"\n        ></svg:g>\n        <svg:g\n          ngx-charts-y-axis\n          *ngIf=\"yAxis\"\n          [yScale]=\"yScale\"\n          [dims]=\"dims\"\n          [showGridLines]=\"showGridLines\"\n          [showLabel]=\"showYAxisLabel\"\n          [labelText]=\"yAxisLabel\"\n          [trimTicks]=\"trimYAxisTicks\"\n          [maxTickLength]=\"maxYAxisTickLength\"\n          [tickFormatting]=\"yAxisTickFormatting\"\n          [ticks]=\"yAxisTicks\"\n          (dimensionsChanged)=\"updateYAxisWidth($event)\"\n        ></svg:g>\n        <svg:g [attr.clip-path]=\"clipPath\">\n          <svg:g *ngFor=\"let series of results; trackBy: trackBy\">\n            <svg:g\n              ngx-charts-area-series\n              [xScale]=\"xScale\"\n              [yScale]=\"yScale\"\n              [baseValue]=\"baseValue\"\n              [colors]=\"colors\"\n              [data]=\"series\"\n              [activeEntries]=\"activeEntries\"\n              [scaleType]=\"scaleType\"\n              [gradient]=\"gradient\"\n              [curve]=\"curve\"\n              [animations]=\"animations\"\n            />\n          </svg:g>\n\n          <svg:g *ngIf=\"!tooltipDisabled\" (mouseleave)=\"hideCircles()\">\n            <svg:g\n              ngx-charts-tooltip-area\n              [dims]=\"dims\"\n              [xSet]=\"xSet\"\n              [xScale]=\"xScale\"\n              [yScale]=\"yScale\"\n              [results]=\"results\"\n              [colors]=\"colors\"\n              [tooltipDisabled]=\"tooltipDisabled\"\n              [tooltipTemplate]=\"seriesTooltipTemplate\"\n              (hover)=\"updateHoveredVertical($event)\"\n            />\n\n            <svg:g *ngFor=\"let series of results\">\n              <svg:g\n                ngx-charts-circle-series\n                [xScale]=\"xScale\"\n                [yScale]=\"yScale\"\n                [colors]=\"colors\"\n                [activeEntries]=\"activeEntries\"\n                [data]=\"series\"\n                [scaleType]=\"scaleType\"\n                [visibleValue]=\"hoveredVertical\"\n                [tooltipDisabled]=\"tooltipDisabled\"\n                [tooltipTemplate]=\"tooltipTemplate\"\n                (select)=\"onClick($event, series)\"\n                (activate)=\"onActivate($event)\"\n                (deactivate)=\"onDeactivate($event)\"\n              />\n            </svg:g>\n          </svg:g>\n        </svg:g>\n      </svg:g>\n      <svg:g\n        ngx-charts-timeline\n        *ngIf=\"timeline && scaleType != 'ordinal'\"\n        [attr.transform]=\"timelineTransform\"\n        [results]=\"results\"\n        [view]=\"[timelineWidth, height]\"\n        [height]=\"timelineHeight\"\n        [scheme]=\"scheme\"\n        [customColors]=\"customColors\"\n        [legend]=\"legend\"\n        [scaleType]=\"scaleType\"\n        (onDomainChange)=\"updateDomain($event)\"\n      >\n        <svg:g *ngFor=\"let series of results; trackBy: trackBy\">\n          <svg:g\n            ngx-charts-area-series\n            [xScale]=\"timelineXScale\"\n            [yScale]=\"timelineYScale\"\n            [baseValue]=\"baseValue\"\n            [colors]=\"colors\"\n            [data]=\"series\"\n            [scaleType]=\"scaleType\"\n            [gradient]=\"gradient\"\n            [curve]=\"curve\"\n            [animations]=\"animations\"\n          />\n        </svg:g>\n      </svg:g>\n    </ngx-charts-chart>\n  ",
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    encapsulation: core.ViewEncapsulation.None,
                    styles: [".ngx-charts-outer{-webkit-animation:chartFadeIn linear .6s;animation:chartFadeIn linear .6s}@-webkit-keyframes chartFadeIn{0%{opacity:0}20%{opacity:0}to{opacity:1}}@keyframes chartFadeIn{0%{opacity:0}20%{opacity:0}to{opacity:1}}.ngx-charts{float:left;overflow:visible}.ngx-charts .circle,.ngx-charts .cell,.ngx-charts .bar,.ngx-charts .arc{cursor:pointer}.ngx-charts .bar.active,.ngx-charts .bar:hover,.ngx-charts .cell.active,.ngx-charts .cell:hover,.ngx-charts .arc.active,.ngx-charts .arc:hover,.ngx-charts .card.active,.ngx-charts .card:hover{opacity:.8;transition:opacity .1s ease-in-out}.ngx-charts .bar:focus,.ngx-charts .cell:focus,.ngx-charts .arc:focus,.ngx-charts .card:focus{outline:none}.ngx-charts .bar.hidden,.ngx-charts .cell.hidden,.ngx-charts .arc.hidden,.ngx-charts .card.hidden{display:none}.ngx-charts g:focus{outline:none}.ngx-charts .line-series.inactive,.ngx-charts .line-series-range.inactive,.ngx-charts .polar-series-path.inactive,.ngx-charts .polar-series-area.inactive,.ngx-charts .area-series.inactive{transition:opacity .1s ease-in-out;opacity:.2}.ngx-charts .line-highlight{display:none}.ngx-charts .line-highlight.active{display:block}.ngx-charts .area{opacity:.6}.ngx-charts .circle:hover{cursor:pointer}.ngx-charts .label{font-size:12px;font-weight:normal}.ngx-charts .tooltip-anchor{fill:#000}.ngx-charts .gridline-path{stroke:#ddd;stroke-width:1;fill:none}.ngx-charts .refline-path{stroke:#a8b2c7;stroke-width:1;stroke-dasharray:5;stroke-dashoffset:5}.ngx-charts .refline-label{font-size:9px}.ngx-charts .reference-area{fill-opacity:.05;fill:#000}.ngx-charts .gridline-path-dotted{stroke:#ddd;stroke-width:1;fill:none;stroke-dasharray:1,20;stroke-dashoffset:3}.ngx-charts .grid-panel rect{fill:none}.ngx-charts .grid-panel.odd rect{fill:#0000000d}\n"]
                },] }
    ];
    AreaChartComponent.propDecorators = {
        legend: [{ type: core.Input }],
        legendTitle: [{ type: core.Input }],
        legendPosition: [{ type: core.Input }],
        xAxis: [{ type: core.Input }],
        yAxis: [{ type: core.Input }],
        baseValue: [{ type: core.Input }],
        autoScale: [{ type: core.Input }],
        showXAxisLabel: [{ type: core.Input }],
        showYAxisLabel: [{ type: core.Input }],
        xAxisLabel: [{ type: core.Input }],
        yAxisLabel: [{ type: core.Input }],
        timeline: [{ type: core.Input }],
        gradient: [{ type: core.Input }],
        showGridLines: [{ type: core.Input }],
        curve: [{ type: core.Input }],
        activeEntries: [{ type: core.Input }],
        schemeType: [{ type: core.Input }],
        trimXAxisTicks: [{ type: core.Input }],
        trimYAxisTicks: [{ type: core.Input }],
        rotateXAxisTicks: [{ type: core.Input }],
        maxXAxisTickLength: [{ type: core.Input }],
        maxYAxisTickLength: [{ type: core.Input }],
        xAxisTickFormatting: [{ type: core.Input }],
        yAxisTickFormatting: [{ type: core.Input }],
        xAxisTicks: [{ type: core.Input }],
        yAxisTicks: [{ type: core.Input }],
        roundDomains: [{ type: core.Input }],
        tooltipDisabled: [{ type: core.Input }],
        xScaleMin: [{ type: core.Input }],
        xScaleMax: [{ type: core.Input }],
        yScaleMin: [{ type: core.Input }],
        yScaleMax: [{ type: core.Input }],
        activate: [{ type: core.Output }],
        deactivate: [{ type: core.Output }],
        tooltipTemplate: [{ type: core.ContentChild, args: ['tooltipTemplate',] }],
        seriesTooltipTemplate: [{ type: core.ContentChild, args: ['seriesTooltipTemplate',] }],
        hideCircles: [{ type: core.HostListener, args: ['mouseleave',] }]
    };

    var AreaChartNormalizedComponent = /** @class */ (function (_super) {
        __extends(AreaChartNormalizedComponent, _super);
        function AreaChartNormalizedComponent() {
            var _this = _super.apply(this, __spreadArray([], __read(arguments))) || this;
            _this.legend = false;
            _this.legendTitle = 'Legend';
            _this.legendPosition = exports.LegendPosition.Right;
            _this.showXAxisLabel = false;
            _this.showYAxisLabel = false;
            _this.showGridLines = true;
            _this.curve = d3Shape.curveLinear;
            _this.activeEntries = [];
            _this.trimXAxisTicks = true;
            _this.trimYAxisTicks = true;
            _this.rotateXAxisTicks = true;
            _this.maxXAxisTickLength = 16;
            _this.maxYAxisTickLength = 16;
            _this.roundDomains = false;
            _this.tooltipDisabled = false;
            _this.activate = new core.EventEmitter();
            _this.deactivate = new core.EventEmitter();
            _this.yDomain = [0, 100];
            _this.margin = [10, 20, 10, 20];
            _this.xAxisHeight = 0;
            _this.yAxisWidth = 0;
            _this.seriesType = exports.SeriesType;
            _this.timelineHeight = 50;
            _this.timelinePadding = 10;
            _this.trackBy = function (index, item) {
                return item.name;
            };
            return _this;
        }
        AreaChartNormalizedComponent.prototype.update = function () {
            var _this = this;
            _super.prototype.update.call(this);
            this.dims = calculateViewDimensions({
                width: this.width,
                height: this.height,
                margins: this.margin,
                showXAxis: this.xAxis,
                showYAxis: this.yAxis,
                xAxisHeight: this.xAxisHeight,
                yAxisWidth: this.yAxisWidth,
                showXLabel: this.showXAxisLabel,
                showYLabel: this.showYAxisLabel,
                showLegend: this.legend,
                legendType: this.schemeType,
                legendPosition: this.legendPosition
            });
            if (this.timeline) {
                this.dims.height -= this.timelineHeight + this.margin[2] + this.timelinePadding;
            }
            this.xDomain = this.getXDomain();
            if (this.filteredDomain) {
                this.xDomain = this.filteredDomain;
            }
            this.seriesDomain = this.getSeriesDomain();
            this.xScale = this.getXScale(this.xDomain, this.dims.width);
            this.yScale = this.getYScale(this.yDomain, this.dims.height);
            var _loop_1 = function (i) {
                var e_1, _a, e_2, _b;
                var val = this_1.xSet[i];
                var d0 = 0;
                var total = 0;
                try {
                    for (var _c = (e_1 = void 0, __values(this_1.results)), _d = _c.next(); !_d.done; _d = _c.next()) {
                        var group = _d.value;
                        var d = group.series.find(function (item) {
                            var a = item.name;
                            var b = val;
                            if (_this.scaleType === exports.ScaleType.Time) {
                                a = a.valueOf();
                                b = b.valueOf();
                            }
                            return a === b;
                        });
                        if (d) {
                            total += d.value;
                        }
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                try {
                    for (var _e = (e_2 = void 0, __values(this_1.results)), _f = _e.next(); !_f.done; _f = _e.next()) {
                        var group = _f.value;
                        var d = group.series.find(function (item) {
                            var a = item.name;
                            var b = val;
                            if (_this.scaleType === exports.ScaleType.Time) {
                                a = a.valueOf();
                                b = b.valueOf();
                            }
                            return a === b;
                        });
                        if (d) {
                            d.d0 = d0;
                            d.d1 = d0 + d.value;
                            d0 += d.value;
                        }
                        else {
                            d = {
                                name: val,
                                value: 0,
                                d0: d0,
                                d1: d0
                            };
                            group.series.push(d);
                        }
                        if (total > 0) {
                            d.d0 = (d.d0 * 100) / total;
                            d.d1 = (d.d1 * 100) / total;
                        }
                        else {
                            d.d0 = 0;
                            d.d1 = 0;
                        }
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            };
            var this_1 = this;
            for (var i = 0; i < this.xSet.length; i++) {
                _loop_1(i);
            }
            this.updateTimeline();
            this.setColors();
            this.legendOptions = this.getLegendOptions();
            this.transform = "translate(" + this.dims.xOffset + " , " + this.margin[0] + ")";
            this.clipPathId = 'clip' + id().toString();
            this.clipPath = "url(#" + this.clipPathId + ")";
        };
        AreaChartNormalizedComponent.prototype.updateTimeline = function () {
            if (this.timeline) {
                this.timelineWidth = this.dims.width;
                this.timelineXDomain = this.getXDomain();
                this.timelineXScale = this.getXScale(this.timelineXDomain, this.timelineWidth);
                this.timelineYScale = this.getYScale(this.yDomain, this.timelineHeight);
                this.timelineTransform = "translate(" + this.dims.xOffset + ", " + -this.margin[2] + ")";
            }
        };
        AreaChartNormalizedComponent.prototype.getXDomain = function () {
            var values = getUniqueXDomainValues(this.results);
            this.scaleType = getScaleType(values);
            var domain = [];
            if (this.scaleType === exports.ScaleType.Time) {
                var min = Math.min.apply(Math, __spreadArray([], __read(values)));
                var max = Math.max.apply(Math, __spreadArray([], __read(values)));
                domain = [new Date(min), new Date(max)];
                this.xSet = __spreadArray([], __read(values)).sort(function (a, b) {
                    var aDate = a.getTime();
                    var bDate = b.getTime();
                    if (aDate > bDate)
                        return 1;
                    if (bDate > aDate)
                        return -1;
                    return 0;
                });
            }
            else if (this.scaleType === exports.ScaleType.Linear) {
                values = values.map(function (v) { return Number(v); });
                var min = Math.min.apply(Math, __spreadArray([], __read(values)));
                var max = Math.max.apply(Math, __spreadArray([], __read(values)));
                domain = [min, max];
                // Use compare function to sort numbers numerically
                this.xSet = __spreadArray([], __read(values)).sort(function (a, b) { return a - b; });
            }
            else {
                domain = values;
                this.xSet = values;
            }
            return domain;
        };
        AreaChartNormalizedComponent.prototype.getSeriesDomain = function () {
            return this.results.map(function (d) { return d.name; });
        };
        AreaChartNormalizedComponent.prototype.getXScale = function (domain, width) {
            var scale;
            if (this.scaleType === exports.ScaleType.Time) {
                scale = d3Scale.scaleTime();
            }
            else if (this.scaleType === exports.ScaleType.Linear) {
                scale = d3Scale.scaleLinear();
            }
            else if (this.scaleType === exports.ScaleType.Ordinal) {
                scale = d3Scale.scalePoint().padding(0.1);
            }
            scale.range([0, width]).domain(domain);
            return this.roundDomains ? scale.nice() : scale;
        };
        AreaChartNormalizedComponent.prototype.getYScale = function (domain, height) {
            var scale = d3Scale.scaleLinear().range([height, 0]).domain(domain);
            return this.roundDomains ? scale.nice() : scale;
        };
        AreaChartNormalizedComponent.prototype.updateDomain = function (domain) {
            this.filteredDomain = domain;
            this.xDomain = this.filteredDomain;
            this.xScale = this.getXScale(this.xDomain, this.dims.width);
        };
        AreaChartNormalizedComponent.prototype.updateHoveredVertical = function (item) {
            this.hoveredVertical = item.value;
            this.deactivateAll();
        };
        AreaChartNormalizedComponent.prototype.hideCircles = function () {
            this.hoveredVertical = null;
            this.deactivateAll();
        };
        AreaChartNormalizedComponent.prototype.onClick = function (data, series) {
            if (series) {
                data.series = series.name;
            }
            this.select.emit(data);
        };
        AreaChartNormalizedComponent.prototype.setColors = function () {
            var domain;
            if (this.schemeType === exports.ScaleType.Ordinal) {
                domain = this.seriesDomain;
            }
            else {
                domain = this.yDomain;
            }
            this.colors = new ColorHelper(this.scheme, this.schemeType, domain, this.customColors);
        };
        AreaChartNormalizedComponent.prototype.getLegendOptions = function () {
            var opts = {
                scaleType: this.schemeType,
                colors: undefined,
                domain: [],
                title: undefined,
                position: this.legendPosition
            };
            if (opts.scaleType === exports.ScaleType.Ordinal) {
                opts.domain = this.seriesDomain;
                opts.colors = this.colors;
                opts.title = this.legendTitle;
            }
            else {
                opts.domain = this.yDomain;
                opts.colors = this.colors.scale;
            }
            return opts;
        };
        AreaChartNormalizedComponent.prototype.updateYAxisWidth = function (_a) {
            var width = _a.width;
            this.yAxisWidth = width;
            this.update();
        };
        AreaChartNormalizedComponent.prototype.updateXAxisHeight = function (_a) {
            var height = _a.height;
            this.xAxisHeight = height;
            this.update();
        };
        AreaChartNormalizedComponent.prototype.onActivate = function (item) {
            var idx = this.activeEntries.findIndex(function (d) {
                return d.name === item.name && d.value === item.value;
            });
            if (idx > -1) {
                return;
            }
            this.activeEntries = __spreadArray([item], __read(this.activeEntries));
            this.activate.emit({ value: item, entries: this.activeEntries });
        };
        AreaChartNormalizedComponent.prototype.onDeactivate = function (item) {
            var idx = this.activeEntries.findIndex(function (d) {
                return d.name === item.name && d.value === item.value;
            });
            this.activeEntries.splice(idx, 1);
            this.activeEntries = __spreadArray([], __read(this.activeEntries));
            this.deactivate.emit({ value: item, entries: this.activeEntries });
        };
        AreaChartNormalizedComponent.prototype.deactivateAll = function () {
            var e_3, _a;
            this.activeEntries = __spreadArray([], __read(this.activeEntries));
            try {
                for (var _b = __values(this.activeEntries), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var entry = _c.value;
                    this.deactivate.emit({ value: entry, entries: [] });
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_3) throw e_3.error; }
            }
            this.activeEntries = [];
        };
        return AreaChartNormalizedComponent;
    }(BaseChartComponent));
    AreaChartNormalizedComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'ngx-charts-area-chart-normalized',
                    template: "\n    <ngx-charts-chart\n      [view]=\"[width, height]\"\n      [showLegend]=\"legend\"\n      [legendOptions]=\"legendOptions\"\n      [activeEntries]=\"activeEntries\"\n      [animations]=\"animations\"\n      (legendLabelClick)=\"onClick($event)\"\n      (legendLabelActivate)=\"onActivate($event)\"\n      (legendLabelDeactivate)=\"onDeactivate($event)\"\n    >\n      <svg:defs>\n        <svg:clipPath [attr.id]=\"clipPathId\">\n          <svg:rect\n            [attr.width]=\"dims.width + 10\"\n            [attr.height]=\"dims.height + 10\"\n            [attr.transform]=\"'translate(-5, -5)'\"\n          />\n        </svg:clipPath>\n      </svg:defs>\n      <svg:g [attr.transform]=\"transform\" class=\"area-chart chart\">\n        <svg:g\n          ngx-charts-x-axis\n          *ngIf=\"xAxis\"\n          [xScale]=\"xScale\"\n          [dims]=\"dims\"\n          [showGridLines]=\"showGridLines\"\n          [showLabel]=\"showXAxisLabel\"\n          [labelText]=\"xAxisLabel\"\n          [trimTicks]=\"trimXAxisTicks\"\n          [rotateTicks]=\"rotateXAxisTicks\"\n          [maxTickLength]=\"maxXAxisTickLength\"\n          [tickFormatting]=\"xAxisTickFormatting\"\n          [ticks]=\"xAxisTicks\"\n          (dimensionsChanged)=\"updateXAxisHeight($event)\"\n        ></svg:g>\n        <svg:g\n          ngx-charts-y-axis\n          *ngIf=\"yAxis\"\n          [yScale]=\"yScale\"\n          [dims]=\"dims\"\n          [showGridLines]=\"showGridLines\"\n          [showLabel]=\"showYAxisLabel\"\n          [labelText]=\"yAxisLabel\"\n          [trimTicks]=\"trimYAxisTicks\"\n          [maxTickLength]=\"maxYAxisTickLength\"\n          [tickFormatting]=\"yAxisTickFormatting\"\n          [ticks]=\"yAxisTicks\"\n          (dimensionsChanged)=\"updateYAxisWidth($event)\"\n        ></svg:g>\n        <svg:g [attr.clip-path]=\"clipPath\">\n          <svg:g *ngFor=\"let series of results; trackBy: trackBy\">\n            <svg:g\n              ngx-charts-area-series\n              [xScale]=\"xScale\"\n              [yScale]=\"yScale\"\n              [colors]=\"colors\"\n              [data]=\"series\"\n              [scaleType]=\"scaleType\"\n              [activeEntries]=\"activeEntries\"\n              [gradient]=\"gradient\"\n              [normalized]=\"true\"\n              [curve]=\"curve\"\n              [animations]=\"animations\"\n            />\n          </svg:g>\n\n          <svg:g *ngIf=\"!tooltipDisabled\" (mouseleave)=\"hideCircles()\">\n            <svg:g\n              ngx-charts-tooltip-area\n              [dims]=\"dims\"\n              [xSet]=\"xSet\"\n              [xScale]=\"xScale\"\n              [yScale]=\"yScale\"\n              [results]=\"results\"\n              [colors]=\"colors\"\n              [showPercentage]=\"true\"\n              [tooltipDisabled]=\"tooltipDisabled\"\n              [tooltipTemplate]=\"seriesTooltipTemplate\"\n              (hover)=\"updateHoveredVertical($event)\"\n            />\n\n            <svg:g *ngFor=\"let series of results\">\n              <svg:g\n                ngx-charts-circle-series\n                [type]=\"seriesType.Stacked\"\n                [xScale]=\"xScale\"\n                [yScale]=\"yScale\"\n                [colors]=\"colors\"\n                [activeEntries]=\"activeEntries\"\n                [data]=\"series\"\n                [scaleType]=\"scaleType\"\n                [visibleValue]=\"hoveredVertical\"\n                [tooltipDisabled]=\"tooltipDisabled\"\n                [tooltipTemplate]=\"tooltipTemplate\"\n                (select)=\"onClick($event, series)\"\n                (activate)=\"onActivate($event)\"\n                (deactivate)=\"onDeactivate($event)\"\n              />\n            </svg:g>\n          </svg:g>\n        </svg:g>\n      </svg:g>\n      <svg:g\n        ngx-charts-timeline\n        *ngIf=\"timeline && scaleType != 'ordinal'\"\n        [attr.transform]=\"timelineTransform\"\n        [results]=\"results\"\n        [view]=\"[timelineWidth, height]\"\n        [height]=\"timelineHeight\"\n        [scheme]=\"scheme\"\n        [customColors]=\"customColors\"\n        [legend]=\"legend\"\n        [scaleType]=\"scaleType\"\n        (onDomainChange)=\"updateDomain($event)\"\n      >\n        <svg:g *ngFor=\"let series of results; trackBy: trackBy\">\n          <svg:g\n            ngx-charts-area-series\n            [xScale]=\"timelineXScale\"\n            [yScale]=\"timelineYScale\"\n            [colors]=\"colors\"\n            [data]=\"series\"\n            [scaleType]=\"scaleType\"\n            [gradient]=\"gradient\"\n            [normalized]=\"true\"\n            [curve]=\"curve\"\n            [animations]=\"animations\"\n          />\n        </svg:g>\n      </svg:g>\n    </ngx-charts-chart>\n  ",
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    encapsulation: core.ViewEncapsulation.None,
                    styles: [".ngx-charts-outer{-webkit-animation:chartFadeIn linear .6s;animation:chartFadeIn linear .6s}@-webkit-keyframes chartFadeIn{0%{opacity:0}20%{opacity:0}to{opacity:1}}@keyframes chartFadeIn{0%{opacity:0}20%{opacity:0}to{opacity:1}}.ngx-charts{float:left;overflow:visible}.ngx-charts .circle,.ngx-charts .cell,.ngx-charts .bar,.ngx-charts .arc{cursor:pointer}.ngx-charts .bar.active,.ngx-charts .bar:hover,.ngx-charts .cell.active,.ngx-charts .cell:hover,.ngx-charts .arc.active,.ngx-charts .arc:hover,.ngx-charts .card.active,.ngx-charts .card:hover{opacity:.8;transition:opacity .1s ease-in-out}.ngx-charts .bar:focus,.ngx-charts .cell:focus,.ngx-charts .arc:focus,.ngx-charts .card:focus{outline:none}.ngx-charts .bar.hidden,.ngx-charts .cell.hidden,.ngx-charts .arc.hidden,.ngx-charts .card.hidden{display:none}.ngx-charts g:focus{outline:none}.ngx-charts .line-series.inactive,.ngx-charts .line-series-range.inactive,.ngx-charts .polar-series-path.inactive,.ngx-charts .polar-series-area.inactive,.ngx-charts .area-series.inactive{transition:opacity .1s ease-in-out;opacity:.2}.ngx-charts .line-highlight{display:none}.ngx-charts .line-highlight.active{display:block}.ngx-charts .area{opacity:.6}.ngx-charts .circle:hover{cursor:pointer}.ngx-charts .label{font-size:12px;font-weight:normal}.ngx-charts .tooltip-anchor{fill:#000}.ngx-charts .gridline-path{stroke:#ddd;stroke-width:1;fill:none}.ngx-charts .refline-path{stroke:#a8b2c7;stroke-width:1;stroke-dasharray:5;stroke-dashoffset:5}.ngx-charts .refline-label{font-size:9px}.ngx-charts .reference-area{fill-opacity:.05;fill:#000}.ngx-charts .gridline-path-dotted{stroke:#ddd;stroke-width:1;fill:none;stroke-dasharray:1,20;stroke-dashoffset:3}.ngx-charts .grid-panel rect{fill:none}.ngx-charts .grid-panel.odd rect{fill:#0000000d}\n"]
                },] }
    ];
    AreaChartNormalizedComponent.propDecorators = {
        legend: [{ type: core.Input }],
        legendTitle: [{ type: core.Input }],
        legendPosition: [{ type: core.Input }],
        xAxis: [{ type: core.Input }],
        yAxis: [{ type: core.Input }],
        showXAxisLabel: [{ type: core.Input }],
        showYAxisLabel: [{ type: core.Input }],
        xAxisLabel: [{ type: core.Input }],
        yAxisLabel: [{ type: core.Input }],
        timeline: [{ type: core.Input }],
        gradient: [{ type: core.Input }],
        showGridLines: [{ type: core.Input }],
        curve: [{ type: core.Input }],
        activeEntries: [{ type: core.Input }],
        schemeType: [{ type: core.Input }],
        trimXAxisTicks: [{ type: core.Input }],
        trimYAxisTicks: [{ type: core.Input }],
        rotateXAxisTicks: [{ type: core.Input }],
        maxXAxisTickLength: [{ type: core.Input }],
        maxYAxisTickLength: [{ type: core.Input }],
        xAxisTickFormatting: [{ type: core.Input }],
        yAxisTickFormatting: [{ type: core.Input }],
        xAxisTicks: [{ type: core.Input }],
        yAxisTicks: [{ type: core.Input }],
        roundDomains: [{ type: core.Input }],
        tooltipDisabled: [{ type: core.Input }],
        activate: [{ type: core.Output }],
        deactivate: [{ type: core.Output }],
        tooltipTemplate: [{ type: core.ContentChild, args: ['tooltipTemplate',] }],
        seriesTooltipTemplate: [{ type: core.ContentChild, args: ['seriesTooltipTemplate',] }],
        hideCircles: [{ type: core.HostListener, args: ['mouseleave',] }]
    };

    var AreaChartStackedComponent = /** @class */ (function (_super) {
        __extends(AreaChartStackedComponent, _super);
        function AreaChartStackedComponent() {
            var _this = _super.apply(this, __spreadArray([], __read(arguments))) || this;
            _this.legend = false;
            _this.legendTitle = 'Legend';
            _this.legendPosition = exports.LegendPosition.Right;
            _this.xAxis = false;
            _this.yAxis = false;
            _this.timeline = false;
            _this.showGridLines = true;
            _this.curve = d3Shape.curveLinear;
            _this.activeEntries = [];
            _this.trimXAxisTicks = true;
            _this.trimYAxisTicks = true;
            _this.rotateXAxisTicks = true;
            _this.maxXAxisTickLength = 16;
            _this.maxYAxisTickLength = 16;
            _this.roundDomains = false;
            _this.tooltipDisabled = false;
            _this.activate = new core.EventEmitter();
            _this.deactivate = new core.EventEmitter();
            _this.margin = [10, 20, 10, 20];
            _this.xAxisHeight = 0;
            _this.yAxisWidth = 0;
            _this.timelineHeight = 50;
            _this.timelinePadding = 10;
            _this.seriesType = exports.SeriesType;
            return _this;
        }
        AreaChartStackedComponent.prototype.update = function () {
            var _this = this;
            _super.prototype.update.call(this);
            this.dims = calculateViewDimensions({
                width: this.width,
                height: this.height,
                margins: this.margin,
                showXAxis: this.xAxis,
                showYAxis: this.yAxis,
                xAxisHeight: this.xAxisHeight,
                yAxisWidth: this.yAxisWidth,
                showXLabel: this.showXAxisLabel,
                showYLabel: this.showYAxisLabel,
                showLegend: this.legend,
                legendType: this.schemeType,
                legendPosition: this.legendPosition
            });
            if (this.timeline) {
                this.dims.height -= this.timelineHeight + this.margin[2] + this.timelinePadding;
            }
            this.xDomain = this.getXDomain();
            if (this.filteredDomain) {
                this.xDomain = this.filteredDomain;
            }
            this.yDomain = this.getYDomain();
            this.seriesDomain = this.getSeriesDomain();
            this.xScale = this.getXScale(this.xDomain, this.dims.width);
            this.yScale = this.getYScale(this.yDomain, this.dims.height);
            var _loop_1 = function (i) {
                var e_1, _a;
                var val = this_1.xSet[i];
                var d0 = 0;
                try {
                    for (var _b = (e_1 = void 0, __values(this_1.results)), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var group = _c.value;
                        var d = group.series.find(function (item) {
                            var a = item.name;
                            var b = val;
                            if (_this.scaleType === exports.ScaleType.Time) {
                                a = a.valueOf();
                                b = b.valueOf();
                            }
                            return a === b;
                        });
                        if (d) {
                            d.d0 = d0;
                            d.d1 = d0 + d.value;
                            d0 += d.value;
                        }
                        else {
                            d = {
                                name: val,
                                value: 0,
                                d0: d0,
                                d1: d0
                            };
                            group.series.push(d);
                        }
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            };
            var this_1 = this;
            for (var i = 0; i < this.xSet.length; i++) {
                _loop_1(i);
            }
            this.updateTimeline();
            this.setColors();
            this.legendOptions = this.getLegendOptions();
            this.transform = "translate(" + this.dims.xOffset + " , " + this.margin[0] + ")";
            this.clipPathId = 'clip' + id().toString();
            this.clipPath = "url(#" + this.clipPathId + ")";
        };
        AreaChartStackedComponent.prototype.updateTimeline = function () {
            if (this.timeline) {
                this.timelineWidth = this.dims.width;
                this.timelineXDomain = this.getXDomain();
                this.timelineXScale = this.getXScale(this.timelineXDomain, this.timelineWidth);
                this.timelineYScale = this.getYScale(this.yDomain, this.timelineHeight);
                this.timelineTransform = "translate(" + this.dims.xOffset + ", " + -this.margin[2] + ")";
            }
        };
        AreaChartStackedComponent.prototype.getXDomain = function () {
            var values = getUniqueXDomainValues(this.results);
            this.scaleType = getScaleType(values);
            var domain = [];
            if (this.scaleType === exports.ScaleType.Linear) {
                values = values.map(function (v) { return Number(v); });
            }
            var min;
            var max;
            if (this.scaleType === exports.ScaleType.Time || this.scaleType === exports.ScaleType.Linear) {
                min = this.xScaleMin ? this.xScaleMin : Math.min.apply(Math, __spreadArray([], __read(values)));
                max = this.xScaleMax ? this.xScaleMax : Math.max.apply(Math, __spreadArray([], __read(values)));
            }
            if (this.scaleType === exports.ScaleType.Time) {
                domain = [new Date(min), new Date(max)];
                this.xSet = __spreadArray([], __read(values)).sort(function (a, b) {
                    var aDate = a.getTime();
                    var bDate = b.getTime();
                    if (aDate > bDate)
                        return 1;
                    if (bDate > aDate)
                        return -1;
                    return 0;
                });
            }
            else if (this.scaleType === exports.ScaleType.Linear) {
                domain = [min, max];
                // Use compare function to sort numbers numerically
                this.xSet = __spreadArray([], __read(values)).sort(function (a, b) { return a - b; });
            }
            else {
                domain = values;
                this.xSet = values;
            }
            return domain;
        };
        AreaChartStackedComponent.prototype.getYDomain = function () {
            var _this = this;
            var domain = [];
            var _loop_2 = function (i) {
                var e_2, _a;
                var val = this_2.xSet[i];
                var sum = 0;
                try {
                    for (var _b = (e_2 = void 0, __values(this_2.results)), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var group = _c.value;
                        var d = group.series.find(function (item) {
                            var a = item.name;
                            var b = val;
                            if (_this.scaleType === exports.ScaleType.Time) {
                                a = a.valueOf();
                                b = b.valueOf();
                            }
                            return a === b;
                        });
                        if (d) {
                            sum += d.value;
                        }
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
                domain.push(sum);
            };
            var this_2 = this;
            for (var i = 0; i < this.xSet.length; i++) {
                _loop_2(i);
            }
            var min = this.yScaleMin ? this.yScaleMin : Math.min.apply(Math, __spreadArray([0], __read(domain)));
            var max = this.yScaleMax ? this.yScaleMax : Math.max.apply(Math, __spreadArray([], __read(domain)));
            return [min, max];
        };
        AreaChartStackedComponent.prototype.getSeriesDomain = function () {
            return this.results.map(function (d) { return d.name; });
        };
        AreaChartStackedComponent.prototype.getXScale = function (domain, width) {
            var scale;
            if (this.scaleType === exports.ScaleType.Time) {
                scale = d3Scale.scaleTime();
            }
            else if (this.scaleType === exports.ScaleType.Linear) {
                scale = d3Scale.scaleLinear();
            }
            else if (this.scaleType === exports.ScaleType.Ordinal) {
                scale = d3Scale.scalePoint().padding(0.1);
            }
            scale.range([0, width]).domain(domain);
            return this.roundDomains ? scale.nice() : scale;
        };
        AreaChartStackedComponent.prototype.getYScale = function (domain, height) {
            var scale = d3Scale.scaleLinear().range([height, 0]).domain(domain);
            return this.roundDomains ? scale.nice() : scale;
        };
        AreaChartStackedComponent.prototype.updateDomain = function (domain) {
            this.filteredDomain = domain;
            this.xDomain = this.filteredDomain;
            this.xScale = this.getXScale(this.xDomain, this.dims.width);
        };
        AreaChartStackedComponent.prototype.updateHoveredVertical = function (item) {
            this.hoveredVertical = item.value;
            this.deactivateAll();
        };
        AreaChartStackedComponent.prototype.hideCircles = function () {
            this.hoveredVertical = null;
            this.deactivateAll();
        };
        AreaChartStackedComponent.prototype.onClick = function (data, series) {
            if (series) {
                data.series = series.name;
            }
            this.select.emit(data);
        };
        AreaChartStackedComponent.prototype.trackBy = function (index, item) {
            return "" + item.name;
        };
        AreaChartStackedComponent.prototype.setColors = function () {
            var domain;
            if (this.schemeType === exports.ScaleType.Ordinal) {
                domain = this.seriesDomain;
            }
            else {
                domain = this.yDomain;
            }
            this.colors = new ColorHelper(this.scheme, this.schemeType, domain, this.customColors);
        };
        AreaChartStackedComponent.prototype.getLegendOptions = function () {
            var opts = {
                scaleType: this.schemeType,
                colors: undefined,
                domain: [],
                title: undefined,
                position: this.legendPosition
            };
            if (opts.scaleType === exports.ScaleType.Ordinal) {
                opts.domain = this.seriesDomain;
                opts.colors = this.colors;
                opts.title = this.legendTitle;
            }
            else {
                opts.domain = this.yDomain;
                opts.colors = this.colors.scale;
            }
            return opts;
        };
        AreaChartStackedComponent.prototype.updateYAxisWidth = function (_a) {
            var width = _a.width;
            this.yAxisWidth = width;
            this.update();
        };
        AreaChartStackedComponent.prototype.updateXAxisHeight = function (_a) {
            var height = _a.height;
            this.xAxisHeight = height;
            this.update();
        };
        AreaChartStackedComponent.prototype.onActivate = function (item) {
            var idx = this.activeEntries.findIndex(function (d) {
                return d.name === item.name && d.value === item.value;
            });
            if (idx > -1) {
                return;
            }
            this.activeEntries = __spreadArray([item], __read(this.activeEntries));
            this.activate.emit({ value: item, entries: this.activeEntries });
        };
        AreaChartStackedComponent.prototype.onDeactivate = function (item) {
            var idx = this.activeEntries.findIndex(function (d) {
                return d.name === item.name && d.value === item.value;
            });
            this.activeEntries.splice(idx, 1);
            this.activeEntries = __spreadArray([], __read(this.activeEntries));
            this.deactivate.emit({ value: item, entries: this.activeEntries });
        };
        AreaChartStackedComponent.prototype.deactivateAll = function () {
            var e_3, _a;
            this.activeEntries = __spreadArray([], __read(this.activeEntries));
            try {
                for (var _b = __values(this.activeEntries), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var entry = _c.value;
                    this.deactivate.emit({ value: entry, entries: [] });
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_3) throw e_3.error; }
            }
            this.activeEntries = [];
        };
        return AreaChartStackedComponent;
    }(BaseChartComponent));
    AreaChartStackedComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'ngx-charts-area-chart-stacked',
                    template: "\n    <ngx-charts-chart\n      [view]=\"[width, height]\"\n      [showLegend]=\"legend\"\n      [legendOptions]=\"legendOptions\"\n      [activeEntries]=\"activeEntries\"\n      [animations]=\"animations\"\n      (legendLabelClick)=\"onClick($event)\"\n      (legendLabelActivate)=\"onActivate($event)\"\n      (legendLabelDeactivate)=\"onDeactivate($event)\"\n    >\n      <svg:defs>\n        <svg:clipPath [attr.id]=\"clipPathId\">\n          <svg:rect\n            [attr.width]=\"dims.width + 10\"\n            [attr.height]=\"dims.height + 10\"\n            [attr.transform]=\"'translate(-5, -5)'\"\n          />\n        </svg:clipPath>\n      </svg:defs>\n      <svg:g [attr.transform]=\"transform\" class=\"area-chart chart\">\n        <svg:g\n          ngx-charts-x-axis\n          *ngIf=\"xAxis\"\n          [xScale]=\"xScale\"\n          [dims]=\"dims\"\n          [showGridLines]=\"showGridLines\"\n          [showLabel]=\"showXAxisLabel\"\n          [labelText]=\"xAxisLabel\"\n          [trimTicks]=\"trimXAxisTicks\"\n          [rotateTicks]=\"rotateXAxisTicks\"\n          [maxTickLength]=\"maxXAxisTickLength\"\n          [tickFormatting]=\"xAxisTickFormatting\"\n          [ticks]=\"xAxisTicks\"\n          (dimensionsChanged)=\"updateXAxisHeight($event)\"\n        ></svg:g>\n        <svg:g\n          ngx-charts-y-axis\n          *ngIf=\"yAxis\"\n          [yScale]=\"yScale\"\n          [dims]=\"dims\"\n          [showGridLines]=\"showGridLines\"\n          [showLabel]=\"showYAxisLabel\"\n          [labelText]=\"yAxisLabel\"\n          [trimTicks]=\"trimYAxisTicks\"\n          [maxTickLength]=\"maxYAxisTickLength\"\n          [tickFormatting]=\"yAxisTickFormatting\"\n          [ticks]=\"yAxisTicks\"\n          (dimensionsChanged)=\"updateYAxisWidth($event)\"\n        ></svg:g>\n        <svg:g [attr.clip-path]=\"clipPath\">\n          <svg:g *ngFor=\"let series of results; trackBy: trackBy\">\n            <svg:g\n              ngx-charts-area-series\n              [xScale]=\"xScale\"\n              [yScale]=\"yScale\"\n              [colors]=\"colors\"\n              [data]=\"series\"\n              [scaleType]=\"scaleType\"\n              [gradient]=\"gradient\"\n              [activeEntries]=\"activeEntries\"\n              [stacked]=\"true\"\n              [curve]=\"curve\"\n              [animations]=\"animations\"\n            />\n          </svg:g>\n\n          <svg:g *ngIf=\"!tooltipDisabled\" (mouseleave)=\"hideCircles()\">\n            <svg:g\n              ngx-charts-tooltip-area\n              [dims]=\"dims\"\n              [xSet]=\"xSet\"\n              [xScale]=\"xScale\"\n              [yScale]=\"yScale\"\n              [results]=\"results\"\n              [colors]=\"colors\"\n              [tooltipDisabled]=\"tooltipDisabled\"\n              [tooltipTemplate]=\"seriesTooltipTemplate\"\n              (hover)=\"updateHoveredVertical($event)\"\n            />\n\n            <svg:g *ngFor=\"let series of results; trackBy: trackBy\">\n              <svg:g\n                ngx-charts-circle-series\n                [type]=\"seriesType.Stacked\"\n                [xScale]=\"xScale\"\n                [yScale]=\"yScale\"\n                [colors]=\"colors\"\n                [activeEntries]=\"activeEntries\"\n                [data]=\"series\"\n                [scaleType]=\"scaleType\"\n                [visibleValue]=\"hoveredVertical\"\n                [tooltipDisabled]=\"tooltipDisabled\"\n                [tooltipTemplate]=\"tooltipTemplate\"\n                (select)=\"onClick($event, series)\"\n                (activate)=\"onActivate($event)\"\n                (deactivate)=\"onDeactivate($event)\"\n              />\n            </svg:g>\n          </svg:g>\n        </svg:g>\n      </svg:g>\n      <svg:g\n        ngx-charts-timeline\n        *ngIf=\"timeline && scaleType != 'ordinal'\"\n        [attr.transform]=\"timelineTransform\"\n        [results]=\"results\"\n        [view]=\"[timelineWidth, height]\"\n        [height]=\"timelineHeight\"\n        [scheme]=\"scheme\"\n        [customColors]=\"customColors\"\n        [legend]=\"legend\"\n        [scaleType]=\"scaleType\"\n        (onDomainChange)=\"updateDomain($event)\"\n      >\n        <svg:g *ngFor=\"let series of results; trackBy: trackBy\">\n          <svg:g\n            ngx-charts-area-series\n            [xScale]=\"timelineXScale\"\n            [yScale]=\"timelineYScale\"\n            [colors]=\"colors\"\n            [data]=\"series\"\n            [scaleType]=\"scaleType\"\n            [gradient]=\"gradient\"\n            [stacked]=\"true\"\n            [curve]=\"curve\"\n            [animations]=\"animations\"\n          />\n        </svg:g>\n      </svg:g>\n    </ngx-charts-chart>\n  ",
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    encapsulation: core.ViewEncapsulation.None,
                    styles: [".ngx-charts-outer{-webkit-animation:chartFadeIn linear .6s;animation:chartFadeIn linear .6s}@-webkit-keyframes chartFadeIn{0%{opacity:0}20%{opacity:0}to{opacity:1}}@keyframes chartFadeIn{0%{opacity:0}20%{opacity:0}to{opacity:1}}.ngx-charts{float:left;overflow:visible}.ngx-charts .circle,.ngx-charts .cell,.ngx-charts .bar,.ngx-charts .arc{cursor:pointer}.ngx-charts .bar.active,.ngx-charts .bar:hover,.ngx-charts .cell.active,.ngx-charts .cell:hover,.ngx-charts .arc.active,.ngx-charts .arc:hover,.ngx-charts .card.active,.ngx-charts .card:hover{opacity:.8;transition:opacity .1s ease-in-out}.ngx-charts .bar:focus,.ngx-charts .cell:focus,.ngx-charts .arc:focus,.ngx-charts .card:focus{outline:none}.ngx-charts .bar.hidden,.ngx-charts .cell.hidden,.ngx-charts .arc.hidden,.ngx-charts .card.hidden{display:none}.ngx-charts g:focus{outline:none}.ngx-charts .line-series.inactive,.ngx-charts .line-series-range.inactive,.ngx-charts .polar-series-path.inactive,.ngx-charts .polar-series-area.inactive,.ngx-charts .area-series.inactive{transition:opacity .1s ease-in-out;opacity:.2}.ngx-charts .line-highlight{display:none}.ngx-charts .line-highlight.active{display:block}.ngx-charts .area{opacity:.6}.ngx-charts .circle:hover{cursor:pointer}.ngx-charts .label{font-size:12px;font-weight:normal}.ngx-charts .tooltip-anchor{fill:#000}.ngx-charts .gridline-path{stroke:#ddd;stroke-width:1;fill:none}.ngx-charts .refline-path{stroke:#a8b2c7;stroke-width:1;stroke-dasharray:5;stroke-dashoffset:5}.ngx-charts .refline-label{font-size:9px}.ngx-charts .reference-area{fill-opacity:.05;fill:#000}.ngx-charts .gridline-path-dotted{stroke:#ddd;stroke-width:1;fill:none;stroke-dasharray:1,20;stroke-dashoffset:3}.ngx-charts .grid-panel rect{fill:none}.ngx-charts .grid-panel.odd rect{fill:#0000000d}\n"]
                },] }
    ];
    AreaChartStackedComponent.propDecorators = {
        legend: [{ type: core.Input }],
        legendTitle: [{ type: core.Input }],
        legendPosition: [{ type: core.Input }],
        xAxis: [{ type: core.Input }],
        yAxis: [{ type: core.Input }],
        showXAxisLabel: [{ type: core.Input }],
        showYAxisLabel: [{ type: core.Input }],
        xAxisLabel: [{ type: core.Input }],
        yAxisLabel: [{ type: core.Input }],
        timeline: [{ type: core.Input }],
        gradient: [{ type: core.Input }],
        showGridLines: [{ type: core.Input }],
        curve: [{ type: core.Input }],
        activeEntries: [{ type: core.Input }],
        schemeType: [{ type: core.Input }],
        trimXAxisTicks: [{ type: core.Input }],
        trimYAxisTicks: [{ type: core.Input }],
        rotateXAxisTicks: [{ type: core.Input }],
        maxXAxisTickLength: [{ type: core.Input }],
        maxYAxisTickLength: [{ type: core.Input }],
        xAxisTickFormatting: [{ type: core.Input }],
        yAxisTickFormatting: [{ type: core.Input }],
        xAxisTicks: [{ type: core.Input }],
        yAxisTicks: [{ type: core.Input }],
        roundDomains: [{ type: core.Input }],
        tooltipDisabled: [{ type: core.Input }],
        xScaleMin: [{ type: core.Input }],
        xScaleMax: [{ type: core.Input }],
        yScaleMin: [{ type: core.Input }],
        yScaleMax: [{ type: core.Input }],
        activate: [{ type: core.Output }],
        deactivate: [{ type: core.Output }],
        tooltipTemplate: [{ type: core.ContentChild, args: ['tooltipTemplate',] }],
        seriesTooltipTemplate: [{ type: core.ContentChild, args: ['seriesTooltipTemplate',] }],
        hideCircles: [{ type: core.HostListener, args: ['mouseleave',] }]
    };

    function sortLinear(data, property, direction) {
        if (direction === void 0) { direction = 'asc'; }
        return data.sort(function (a, b) {
            if (direction === 'asc') {
                return a[property] - b[property];
            }
            else {
                return b[property] - a[property];
            }
        });
    }
    function sortByDomain(data, property, direction, domain) {
        if (direction === void 0) { direction = 'asc'; }
        return data.sort(function (a, b) {
            var aVal = a[property];
            var bVal = b[property];
            var aIdx = domain.indexOf(aVal);
            var bIdx = domain.indexOf(bVal);
            if (direction === 'asc') {
                return aIdx - bIdx;
            }
            else {
                return bIdx - aIdx;
            }
        });
    }
    function sortByTime(data, property, direction) {
        if (direction === void 0) { direction = 'asc'; }
        return data.sort(function (a, b) {
            var aDate = a[property].getTime();
            var bDate = b[property].getTime();
            if (direction === 'asc') {
                if (aDate > bDate)
                    return 1;
                if (bDate > aDate)
                    return -1;
                return 0;
            }
            else {
                if (aDate > bDate)
                    return -1;
                if (bDate > aDate)
                    return 1;
                return 0;
            }
        });
    }

    var AreaSeriesComponent = /** @class */ (function () {
        function AreaSeriesComponent() {
            this.baseValue = 'auto';
            this.stacked = false;
            this.normalized = false;
            this.animations = true;
            this.select = new core.EventEmitter();
        }
        AreaSeriesComponent.prototype.ngOnChanges = function (changes) {
            this.update();
        };
        AreaSeriesComponent.prototype.update = function () {
            var _this = this;
            this.updateGradient();
            var currentArea;
            var startingArea;
            var xProperty = function (d) {
                var label = d.name;
                return _this.xScale(label);
            };
            if (this.stacked || this.normalized) {
                currentArea = d3Shape.area()
                    .x(xProperty)
                    .y0(function (d, i) { return _this.yScale(d.d0); })
                    .y1(function (d, i) { return _this.yScale(d.d1); });
                startingArea = d3Shape.area()
                    .x(xProperty)
                    .y0(function (d) { return _this.yScale.range()[0]; })
                    .y1(function (d) { return _this.yScale.range()[0]; });
            }
            else {
                currentArea = d3Shape.area()
                    .x(xProperty)
                    .y0(function () { return (_this.baseValue === 'auto' ? _this.yScale.range()[0] : _this.yScale(_this.baseValue)); })
                    .y1(function (d) { return _this.yScale(d.value); });
                startingArea = d3Shape.area()
                    .x(xProperty)
                    .y0(function (d) { return (_this.baseValue === 'auto' ? _this.yScale.range()[0] : _this.yScale(_this.baseValue)); })
                    .y1(function (d) { return (_this.baseValue === 'auto' ? _this.yScale.range()[0] : _this.yScale(_this.baseValue)); });
            }
            currentArea.curve(this.curve);
            startingArea.curve(this.curve);
            this.opacity = 0.8;
            var data = this.data.series;
            if (this.scaleType === exports.ScaleType.Linear) {
                data = sortLinear(data, 'name');
            }
            else if (this.scaleType === exports.ScaleType.Time) {
                data = sortByTime(data, 'name');
            }
            else {
                data = sortByDomain(data, 'name', 'asc', this.xScale.domain());
            }
            this.path = currentArea(data);
            this.startingPath = startingArea(data);
        };
        AreaSeriesComponent.prototype.updateGradient = function () {
            if (this.colors.scaleType === exports.ScaleType.Linear) {
                this.hasGradient = true;
                if (this.stacked || this.normalized) {
                    var d0values = this.data.series.map(function (d) { return d.d0; });
                    var d1values = this.data.series.map(function (d) { return d.d1; });
                    var max = Math.max.apply(Math, __spreadArray([], __read(d1values)));
                    var min = Math.min.apply(Math, __spreadArray([], __read(d0values)));
                    this.gradientStops = this.colors.getLinearGradientStops(max, min);
                }
                else {
                    var values = this.data.series.map(function (d) { return d.value; });
                    var max = Math.max.apply(Math, __spreadArray([], __read(values)));
                    this.gradientStops = this.colors.getLinearGradientStops(max);
                }
            }
            else {
                this.hasGradient = false;
                this.gradientStops = undefined;
            }
        };
        AreaSeriesComponent.prototype.isActive = function (entry) {
            if (!this.activeEntries)
                return false;
            var item = this.activeEntries.find(function (d) {
                return entry.name === d.name;
            });
            return item !== undefined;
        };
        AreaSeriesComponent.prototype.isInactive = function (entry) {
            if (!this.activeEntries || this.activeEntries.length === 0)
                return false;
            var item = this.activeEntries.find(function (d) {
                return entry.name === d.name;
            });
            return item === undefined;
        };
        return AreaSeriesComponent;
    }());
    AreaSeriesComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'g[ngx-charts-area-series]',
                    template: "\n    <svg:g\n      ngx-charts-area\n      class=\"area-series\"\n      [data]=\"data\"\n      [path]=\"path\"\n      [fill]=\"colors.getColor(data.name)\"\n      [stops]=\"gradientStops\"\n      [startingPath]=\"startingPath\"\n      [opacity]=\"opacity\"\n      [gradient]=\"gradient || hasGradient\"\n      [animations]=\"animations\"\n      [class.active]=\"isActive(data)\"\n      [class.inactive]=\"isInactive(data)\"\n    />\n  ",
                    changeDetection: core.ChangeDetectionStrategy.OnPush
                },] }
    ];
    AreaSeriesComponent.propDecorators = {
        data: [{ type: core.Input }],
        xScale: [{ type: core.Input }],
        yScale: [{ type: core.Input }],
        baseValue: [{ type: core.Input }],
        colors: [{ type: core.Input }],
        scaleType: [{ type: core.Input }],
        stacked: [{ type: core.Input }],
        normalized: [{ type: core.Input }],
        gradient: [{ type: core.Input }],
        curve: [{ type: core.Input }],
        activeEntries: [{ type: core.Input }],
        animations: [{ type: core.Input }],
        select: [{ type: core.Output }]
    };

    var AreaChartModule = /** @class */ (function () {
        function AreaChartModule() {
        }
        return AreaChartModule;
    }());
    AreaChartModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [ChartCommonModule],
                    declarations: [AreaChartComponent, AreaChartNormalizedComponent, AreaChartStackedComponent, AreaSeriesComponent],
                    exports: [AreaChartComponent, AreaChartNormalizedComponent, AreaChartStackedComponent, AreaSeriesComponent]
                },] }
    ];

    var BarComponent = /** @class */ (function () {
        function BarComponent(element) {
            this.roundEdges = true;
            this.gradient = false;
            this.offset = 0;
            this.isActive = false;
            this.animations = true;
            this.noBarWhenZero = true;
            this.select = new core.EventEmitter();
            this.activate = new core.EventEmitter();
            this.deactivate = new core.EventEmitter();
            this.hasGradient = false;
            this.hideBar = false;
            this.element = element.nativeElement;
        }
        BarComponent.prototype.ngOnChanges = function (changes) {
            if (changes.roundEdges) {
                this.loadAnimation();
            }
            this.update();
        };
        BarComponent.prototype.update = function () {
            this.gradientId = 'grad' + id().toString();
            this.gradientFill = "url(#" + this.gradientId + ")";
            if (this.gradient || this.stops) {
                this.gradientStops = this.getGradient();
                this.hasGradient = true;
            }
            else {
                this.hasGradient = false;
            }
            this.updatePathEl();
            this.checkToHideBar();
        };
        BarComponent.prototype.loadAnimation = function () {
            this.path = this.getStartingPath();
            setTimeout(this.update.bind(this), 100);
        };
        BarComponent.prototype.updatePathEl = function () {
            var node = d3Selection.select(this.element).select('.bar');
            var path = this.getPath();
            if (this.animations) {
                node.transition().duration(500).attr('d', path);
            }
            else {
                node.attr('d', path);
            }
        };
        BarComponent.prototype.getGradient = function () {
            if (this.stops) {
                return this.stops;
            }
            return [
                {
                    offset: 0,
                    color: this.fill,
                    opacity: this.getStartOpacity()
                },
                {
                    offset: 100,
                    color: this.fill,
                    opacity: 1
                }
            ];
        };
        BarComponent.prototype.getStartingPath = function () {
            if (!this.animations) {
                return this.getPath();
            }
            var radius = this.getRadius();
            var path;
            if (this.roundEdges) {
                if (this.orientation === exports.BarOrientation.Vertical) {
                    radius = Math.min(this.height, radius);
                    path = roundedRect(this.x, this.y + this.height, this.width, 1, 0, this.edges);
                }
                else if (this.orientation === exports.BarOrientation.Horizontal) {
                    radius = Math.min(this.width, radius);
                    path = roundedRect(this.x, this.y, 1, this.height, 0, this.edges);
                }
            }
            else {
                if (this.orientation === exports.BarOrientation.Vertical) {
                    path = roundedRect(this.x, this.y + this.height, this.width, 1, 0, this.edges);
                }
                else if (this.orientation === exports.BarOrientation.Horizontal) {
                    path = roundedRect(this.x, this.y, 1, this.height, 0, this.edges);
                }
            }
            return path;
        };
        BarComponent.prototype.getPath = function () {
            var radius = this.getRadius();
            var path;
            if (this.roundEdges) {
                if (this.orientation === exports.BarOrientation.Vertical) {
                    radius = Math.min(this.height, radius);
                    path = roundedRect(this.x, this.y, this.width, this.height, radius, this.edges);
                }
                else if (this.orientation === exports.BarOrientation.Horizontal) {
                    radius = Math.min(this.width, radius);
                    path = roundedRect(this.x, this.y, this.width, this.height, radius, this.edges);
                }
            }
            else {
                path = roundedRect(this.x, this.y, this.width, this.height, radius, this.edges);
            }
            return path;
        };
        BarComponent.prototype.getRadius = function () {
            var radius = 0;
            if (this.roundEdges && this.height > 5 && this.width > 5) {
                radius = Math.floor(Math.min(5, this.height / 2, this.width / 2));
            }
            return radius;
        };
        BarComponent.prototype.getStartOpacity = function () {
            if (this.roundEdges) {
                return 0.2;
            }
            else {
                return 0.5;
            }
        };
        Object.defineProperty(BarComponent.prototype, "edges", {
            get: function () {
                var edges = [false, false, false, false];
                if (this.roundEdges) {
                    if (this.orientation === exports.BarOrientation.Vertical) {
                        if (this.data.value > 0) {
                            edges = [true, true, false, false];
                        }
                        else {
                            edges = [false, false, true, true];
                        }
                    }
                    else if (this.orientation === exports.BarOrientation.Horizontal) {
                        if (this.data.value > 0) {
                            edges = [false, true, false, true];
                        }
                        else {
                            edges = [true, false, true, false];
                        }
                    }
                }
                return edges;
            },
            enumerable: false,
            configurable: true
        });
        BarComponent.prototype.onMouseEnter = function () {
            this.activate.emit(this.data);
        };
        BarComponent.prototype.onMouseLeave = function () {
            this.deactivate.emit(this.data);
        };
        BarComponent.prototype.checkToHideBar = function () {
            this.hideBar =
                this.noBarWhenZero &&
                    ((this.orientation === exports.BarOrientation.Vertical && this.height === 0) ||
                        (this.orientation === exports.BarOrientation.Horizontal && this.width === 0));
        };
        return BarComponent;
    }());
    BarComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'g[ngx-charts-bar]',
                    template: "\n    <svg:defs *ngIf=\"hasGradient\">\n      <svg:g ngx-charts-svg-linear-gradient [orientation]=\"orientation\" [name]=\"gradientId\" [stops]=\"gradientStops\" />\n    </svg:defs>\n    <svg:path\n      class=\"bar\"\n      stroke=\"none\"\n      role=\"img\"\n      tabIndex=\"-1\"\n      [class.active]=\"isActive\"\n      [class.hidden]=\"hideBar\"\n      [attr.d]=\"path\"\n      [attr.aria-label]=\"ariaLabel\"\n      [attr.fill]=\"hasGradient ? gradientFill : fill\"\n      (click)=\"select.emit(data)\"\n    />\n  ",
                    changeDetection: core.ChangeDetectionStrategy.OnPush
                },] }
    ];
    BarComponent.ctorParameters = function () { return [
        { type: core.ElementRef }
    ]; };
    BarComponent.propDecorators = {
        fill: [{ type: core.Input }],
        data: [{ type: core.Input }],
        width: [{ type: core.Input }],
        height: [{ type: core.Input }],
        x: [{ type: core.Input }],
        y: [{ type: core.Input }],
        orientation: [{ type: core.Input }],
        roundEdges: [{ type: core.Input }],
        gradient: [{ type: core.Input }],
        offset: [{ type: core.Input }],
        isActive: [{ type: core.Input }],
        stops: [{ type: core.Input }],
        animations: [{ type: core.Input }],
        ariaLabel: [{ type: core.Input }],
        noBarWhenZero: [{ type: core.Input }],
        select: [{ type: core.Output }],
        activate: [{ type: core.Output }],
        deactivate: [{ type: core.Output }],
        onMouseEnter: [{ type: core.HostListener, args: ['mouseenter',] }],
        onMouseLeave: [{ type: core.HostListener, args: ['mouseleave',] }]
    };

    var BarHorizontalComponent = /** @class */ (function (_super) {
        __extends(BarHorizontalComponent, _super);
        function BarHorizontalComponent() {
            var _this = _super.apply(this, __spreadArray([], __read(arguments))) || this;
            _this.legend = false;
            _this.legendTitle = 'Legend';
            _this.legendPosition = exports.LegendPosition.Right;
            _this.tooltipDisabled = false;
            _this.showGridLines = true;
            _this.activeEntries = [];
            _this.trimXAxisTicks = true;
            _this.trimYAxisTicks = true;
            _this.rotateXAxisTicks = true;
            _this.maxXAxisTickLength = 16;
            _this.maxYAxisTickLength = 16;
            _this.barPadding = 8;
            _this.roundDomains = false;
            _this.roundEdges = true;
            _this.showDataLabel = false;
            _this.noBarWhenZero = true;
            _this.activate = new core.EventEmitter();
            _this.deactivate = new core.EventEmitter();
            _this.margin = [10, 20, 10, 20];
            _this.xAxisHeight = 0;
            _this.yAxisWidth = 0;
            _this.dataLabelMaxWidth = { negative: 0, positive: 0 };
            return _this;
        }
        BarHorizontalComponent.prototype.update = function () {
            _super.prototype.update.call(this);
            if (!this.showDataLabel) {
                this.dataLabelMaxWidth = { negative: 0, positive: 0 };
            }
            this.margin = [10, 20 + this.dataLabelMaxWidth.positive, 10, 20 + this.dataLabelMaxWidth.negative];
            this.dims = calculateViewDimensions({
                width: this.width,
                height: this.height,
                margins: this.margin,
                showXAxis: this.xAxis,
                showYAxis: this.yAxis,
                xAxisHeight: this.xAxisHeight,
                yAxisWidth: this.yAxisWidth,
                showXLabel: this.showXAxisLabel,
                showYLabel: this.showYAxisLabel,
                showLegend: this.legend,
                legendType: this.schemeType,
                legendPosition: this.legendPosition
            });
            this.formatDates();
            this.xScale = this.getXScale();
            this.yScale = this.getYScale();
            this.setColors();
            this.legendOptions = this.getLegendOptions();
            this.transform = "translate(" + this.dims.xOffset + " , " + this.margin[0] + ")";
        };
        BarHorizontalComponent.prototype.getXScale = function () {
            this.xDomain = this.getXDomain();
            var scale = d3Scale.scaleLinear().range([0, this.dims.width]).domain(this.xDomain);
            return this.roundDomains ? scale.nice() : scale;
        };
        BarHorizontalComponent.prototype.getYScale = function () {
            this.yDomain = this.getYDomain();
            var spacing = this.yDomain.length / (this.dims.height / this.barPadding + 1);
            return d3Scale.scaleBand().rangeRound([0, this.dims.height]).paddingInner(spacing).domain(this.yDomain);
        };
        BarHorizontalComponent.prototype.getXDomain = function () {
            var values = this.results.map(function (d) { return d.value; });
            var min = this.xScaleMin ? Math.min.apply(Math, __spreadArray([this.xScaleMin], __read(values))) : Math.min.apply(Math, __spreadArray([0], __read(values)));
            var max = this.xScaleMax ? Math.max.apply(Math, __spreadArray([this.xScaleMax], __read(values))) : Math.max.apply(Math, __spreadArray([0], __read(values)));
            return [min, max];
        };
        BarHorizontalComponent.prototype.getYDomain = function () {
            return this.results.map(function (d) { return d.label; });
        };
        BarHorizontalComponent.prototype.onClick = function (data) {
            this.select.emit(data);
        };
        BarHorizontalComponent.prototype.setColors = function () {
            var domain;
            if (this.schemeType === exports.ScaleType.Ordinal) {
                domain = this.yDomain;
            }
            else {
                domain = this.xDomain;
            }
            this.colors = new ColorHelper(this.scheme, this.schemeType, domain, this.customColors);
        };
        BarHorizontalComponent.prototype.getLegendOptions = function () {
            var opts = {
                scaleType: this.schemeType,
                colors: undefined,
                domain: [],
                title: undefined,
                position: this.legendPosition
            };
            if (opts.scaleType === 'ordinal') {
                opts.domain = this.yDomain;
                opts.colors = this.colors;
                opts.title = this.legendTitle;
            }
            else {
                opts.domain = this.xDomain;
                opts.colors = this.colors.scale;
            }
            return opts;
        };
        BarHorizontalComponent.prototype.updateYAxisWidth = function (_a) {
            var width = _a.width;
            this.yAxisWidth = width;
            this.update();
        };
        BarHorizontalComponent.prototype.updateXAxisHeight = function (_a) {
            var height = _a.height;
            this.xAxisHeight = height;
            this.update();
        };
        BarHorizontalComponent.prototype.onDataLabelMaxWidthChanged = function (event) {
            var _this = this;
            if (event.size.negative) {
                this.dataLabelMaxWidth.negative = Math.max(this.dataLabelMaxWidth.negative, event.size.width);
            }
            else {
                this.dataLabelMaxWidth.positive = Math.max(this.dataLabelMaxWidth.positive, event.size.width);
            }
            if (event.index === this.results.length - 1) {
                setTimeout(function () { return _this.update(); });
            }
        };
        BarHorizontalComponent.prototype.onActivate = function (item, fromLegend) {
            if (fromLegend === void 0) { fromLegend = false; }
            item = this.results.find(function (d) {
                if (fromLegend) {
                    return d.label === item.name;
                }
                else {
                    return d.name === item.name;
                }
            });
            var idx = this.activeEntries.findIndex(function (d) {
                return d.name === item.name && d.value === item.value && d.series === item.series;
            });
            if (idx > -1) {
                return;
            }
            this.activeEntries = __spreadArray([item], __read(this.activeEntries));
            this.activate.emit({ value: item, entries: this.activeEntries });
        };
        BarHorizontalComponent.prototype.onDeactivate = function (item, fromLegend) {
            if (fromLegend === void 0) { fromLegend = false; }
            item = this.results.find(function (d) {
                if (fromLegend) {
                    return d.label === item.name;
                }
                else {
                    return d.name === item.name;
                }
            });
            var idx = this.activeEntries.findIndex(function (d) {
                return d.name === item.name && d.value === item.value && d.series === item.series;
            });
            this.activeEntries.splice(idx, 1);
            this.activeEntries = __spreadArray([], __read(this.activeEntries));
            this.deactivate.emit({ value: item, entries: this.activeEntries });
        };
        return BarHorizontalComponent;
    }(BaseChartComponent));
    BarHorizontalComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'ngx-charts-bar-horizontal',
                    template: "\n    <ngx-charts-chart\n      [view]=\"[width, height]\"\n      [showLegend]=\"legend\"\n      [legendOptions]=\"legendOptions\"\n      [activeEntries]=\"activeEntries\"\n      [animations]=\"animations\"\n      (legendLabelClick)=\"onClick($event)\"\n      (legendLabelActivate)=\"onActivate($event, true)\"\n      (legendLabelDeactivate)=\"onDeactivate($event, true)\"\n    >\n      <svg:g [attr.transform]=\"transform\" class=\"bar-chart chart\">\n        <svg:g\n          ngx-charts-x-axis\n          *ngIf=\"xAxis\"\n          [xScale]=\"xScale\"\n          [dims]=\"dims\"\n          [showGridLines]=\"showGridLines\"\n          [showLabel]=\"showXAxisLabel\"\n          [labelText]=\"xAxisLabel\"\n          [trimTicks]=\"trimXAxisTicks\"\n          [rotateTicks]=\"rotateXAxisTicks\"\n          [maxTickLength]=\"maxXAxisTickLength\"\n          [tickFormatting]=\"xAxisTickFormatting\"\n          [ticks]=\"xAxisTicks\"\n          (dimensionsChanged)=\"updateXAxisHeight($event)\"\n        ></svg:g>\n        <svg:g\n          ngx-charts-y-axis\n          *ngIf=\"yAxis\"\n          [yScale]=\"yScale\"\n          [dims]=\"dims\"\n          [showLabel]=\"showYAxisLabel\"\n          [labelText]=\"yAxisLabel\"\n          [trimTicks]=\"trimYAxisTicks\"\n          [maxTickLength]=\"maxYAxisTickLength\"\n          [tickFormatting]=\"yAxisTickFormatting\"\n          [ticks]=\"yAxisTicks\"\n          [yAxisOffset]=\"dataLabelMaxWidth.negative\"\n          (dimensionsChanged)=\"updateYAxisWidth($event)\"\n        ></svg:g>\n        <svg:g\n          ngx-charts-series-horizontal\n          [xScale]=\"xScale\"\n          [yScale]=\"yScale\"\n          [colors]=\"colors\"\n          [series]=\"results\"\n          [dims]=\"dims\"\n          [gradient]=\"gradient\"\n          [tooltipDisabled]=\"tooltipDisabled\"\n          [tooltipTemplate]=\"tooltipTemplate\"\n          [activeEntries]=\"activeEntries\"\n          [roundEdges]=\"roundEdges\"\n          [animations]=\"animations\"\n          [showDataLabel]=\"showDataLabel\"\n          [dataLabelFormatting]=\"dataLabelFormatting\"\n          [noBarWhenZero]=\"noBarWhenZero\"\n          (select)=\"onClick($event)\"\n          (activate)=\"onActivate($event)\"\n          (deactivate)=\"onDeactivate($event)\"\n          (dataLabelWidthChanged)=\"onDataLabelMaxWidthChanged($event)\"\n        ></svg:g>\n      </svg:g>\n    </ngx-charts-chart>\n  ",
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    encapsulation: core.ViewEncapsulation.None,
                    styles: [".ngx-charts-outer{-webkit-animation:chartFadeIn linear .6s;animation:chartFadeIn linear .6s}@-webkit-keyframes chartFadeIn{0%{opacity:0}20%{opacity:0}to{opacity:1}}@keyframes chartFadeIn{0%{opacity:0}20%{opacity:0}to{opacity:1}}.ngx-charts{float:left;overflow:visible}.ngx-charts .circle,.ngx-charts .cell,.ngx-charts .bar,.ngx-charts .arc{cursor:pointer}.ngx-charts .bar.active,.ngx-charts .bar:hover,.ngx-charts .cell.active,.ngx-charts .cell:hover,.ngx-charts .arc.active,.ngx-charts .arc:hover,.ngx-charts .card.active,.ngx-charts .card:hover{opacity:.8;transition:opacity .1s ease-in-out}.ngx-charts .bar:focus,.ngx-charts .cell:focus,.ngx-charts .arc:focus,.ngx-charts .card:focus{outline:none}.ngx-charts .bar.hidden,.ngx-charts .cell.hidden,.ngx-charts .arc.hidden,.ngx-charts .card.hidden{display:none}.ngx-charts g:focus{outline:none}.ngx-charts .line-series.inactive,.ngx-charts .line-series-range.inactive,.ngx-charts .polar-series-path.inactive,.ngx-charts .polar-series-area.inactive,.ngx-charts .area-series.inactive{transition:opacity .1s ease-in-out;opacity:.2}.ngx-charts .line-highlight{display:none}.ngx-charts .line-highlight.active{display:block}.ngx-charts .area{opacity:.6}.ngx-charts .circle:hover{cursor:pointer}.ngx-charts .label{font-size:12px;font-weight:normal}.ngx-charts .tooltip-anchor{fill:#000}.ngx-charts .gridline-path{stroke:#ddd;stroke-width:1;fill:none}.ngx-charts .refline-path{stroke:#a8b2c7;stroke-width:1;stroke-dasharray:5;stroke-dashoffset:5}.ngx-charts .refline-label{font-size:9px}.ngx-charts .reference-area{fill-opacity:.05;fill:#000}.ngx-charts .gridline-path-dotted{stroke:#ddd;stroke-width:1;fill:none;stroke-dasharray:1,20;stroke-dashoffset:3}.ngx-charts .grid-panel rect{fill:none}.ngx-charts .grid-panel.odd rect{fill:#0000000d}\n"]
                },] }
    ];
    BarHorizontalComponent.propDecorators = {
        legend: [{ type: core.Input }],
        legendTitle: [{ type: core.Input }],
        legendPosition: [{ type: core.Input }],
        xAxis: [{ type: core.Input }],
        yAxis: [{ type: core.Input }],
        showXAxisLabel: [{ type: core.Input }],
        showYAxisLabel: [{ type: core.Input }],
        xAxisLabel: [{ type: core.Input }],
        yAxisLabel: [{ type: core.Input }],
        tooltipDisabled: [{ type: core.Input }],
        gradient: [{ type: core.Input }],
        showGridLines: [{ type: core.Input }],
        activeEntries: [{ type: core.Input }],
        schemeType: [{ type: core.Input }],
        trimXAxisTicks: [{ type: core.Input }],
        trimYAxisTicks: [{ type: core.Input }],
        rotateXAxisTicks: [{ type: core.Input }],
        maxXAxisTickLength: [{ type: core.Input }],
        maxYAxisTickLength: [{ type: core.Input }],
        xAxisTickFormatting: [{ type: core.Input }],
        yAxisTickFormatting: [{ type: core.Input }],
        xAxisTicks: [{ type: core.Input }],
        yAxisTicks: [{ type: core.Input }],
        barPadding: [{ type: core.Input }],
        roundDomains: [{ type: core.Input }],
        roundEdges: [{ type: core.Input }],
        xScaleMax: [{ type: core.Input }],
        xScaleMin: [{ type: core.Input }],
        showDataLabel: [{ type: core.Input }],
        dataLabelFormatting: [{ type: core.Input }],
        noBarWhenZero: [{ type: core.Input }],
        activate: [{ type: core.Output }],
        deactivate: [{ type: core.Output }],
        tooltipTemplate: [{ type: core.ContentChild, args: ['tooltipTemplate',] }]
    };

    var BarHorizontal2DComponent = /** @class */ (function (_super) {
        __extends(BarHorizontal2DComponent, _super);
        function BarHorizontal2DComponent() {
            var _this = _super.apply(this, __spreadArray([], __read(arguments))) || this;
            _this.legend = false;
            _this.legendTitle = 'Legend';
            _this.legendPosition = exports.LegendPosition.Right;
            _this.tooltipDisabled = false;
            _this.showGridLines = true;
            _this.activeEntries = [];
            _this.trimXAxisTicks = true;
            _this.trimYAxisTicks = true;
            _this.rotateXAxisTicks = true;
            _this.maxXAxisTickLength = 16;
            _this.maxYAxisTickLength = 16;
            _this.groupPadding = 16;
            _this.barPadding = 8;
            _this.roundDomains = false;
            _this.roundEdges = true;
            _this.showDataLabel = false;
            _this.noBarWhenZero = true;
            _this.activate = new core.EventEmitter();
            _this.deactivate = new core.EventEmitter();
            _this.margin = [10, 20, 10, 20];
            _this.xAxisHeight = 0;
            _this.yAxisWidth = 0;
            _this.dataLabelMaxWidth = { negative: 0, positive: 0 };
            _this.barOrientation = exports.BarOrientation;
            _this.trackBy = function (index, item) {
                return item.name;
            };
            return _this;
        }
        BarHorizontal2DComponent.prototype.update = function () {
            _super.prototype.update.call(this);
            if (!this.showDataLabel) {
                this.dataLabelMaxWidth = { negative: 0, positive: 0 };
            }
            this.margin = [10, 20 + this.dataLabelMaxWidth.positive, 10, 20 + this.dataLabelMaxWidth.negative];
            this.dims = calculateViewDimensions({
                width: this.width,
                height: this.height,
                margins: this.margin,
                showXAxis: this.xAxis,
                showYAxis: this.yAxis,
                xAxisHeight: this.xAxisHeight,
                yAxisWidth: this.yAxisWidth,
                showXLabel: this.showXAxisLabel,
                showYLabel: this.showYAxisLabel,
                showLegend: this.legend,
                legendType: this.schemeType,
                legendPosition: this.legendPosition
            });
            this.formatDates();
            this.groupDomain = this.getGroupDomain();
            this.innerDomain = this.getInnerDomain();
            this.valueDomain = this.getValueDomain();
            this.groupScale = this.getGroupScale();
            this.innerScale = this.getInnerScale();
            this.valueScale = this.getValueScale();
            this.setColors();
            this.legendOptions = this.getLegendOptions();
            this.transform = "translate(" + this.dims.xOffset + " , " + this.margin[0] + ")";
        };
        BarHorizontal2DComponent.prototype.getGroupScale = function () {
            var spacing = this.groupDomain.length / (this.dims.height / this.groupPadding + 1);
            return d3Scale.scaleBand()
                .rangeRound([0, this.dims.height])
                .paddingInner(spacing)
                .paddingOuter(spacing / 2)
                .domain(this.groupDomain);
        };
        BarHorizontal2DComponent.prototype.getInnerScale = function () {
            var height = this.groupScale.bandwidth();
            var spacing = this.innerDomain.length / (height / this.barPadding + 1);
            return d3Scale.scaleBand().rangeRound([0, height]).paddingInner(spacing).domain(this.innerDomain);
        };
        BarHorizontal2DComponent.prototype.getValueScale = function () {
            var scale = d3Scale.scaleLinear().range([0, this.dims.width]).domain(this.valueDomain);
            return this.roundDomains ? scale.nice() : scale;
        };
        BarHorizontal2DComponent.prototype.getGroupDomain = function () {
            var e_1, _a;
            var domain = [];
            try {
                for (var _b = __values(this.results), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var group = _c.value;
                    if (!domain.includes(group.label)) {
                        domain.push(group.label);
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return domain;
        };
        BarHorizontal2DComponent.prototype.getInnerDomain = function () {
            var e_2, _a, e_3, _b;
            var domain = [];
            try {
                for (var _c = __values(this.results), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var group = _d.value;
                    try {
                        for (var _e = (e_3 = void 0, __values(group.series)), _f = _e.next(); !_f.done; _f = _e.next()) {
                            var d = _f.value;
                            if (!domain.includes(d.label)) {
                                domain.push(d.label);
                            }
                        }
                    }
                    catch (e_3_1) { e_3 = { error: e_3_1 }; }
                    finally {
                        try {
                            if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                        }
                        finally { if (e_3) throw e_3.error; }
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                }
                finally { if (e_2) throw e_2.error; }
            }
            return domain;
        };
        BarHorizontal2DComponent.prototype.getValueDomain = function () {
            var e_4, _a, e_5, _b;
            var domain = [];
            try {
                for (var _c = __values(this.results), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var group = _d.value;
                    try {
                        for (var _e = (e_5 = void 0, __values(group.series)), _f = _e.next(); !_f.done; _f = _e.next()) {
                            var d = _f.value;
                            if (!domain.includes(d.value)) {
                                domain.push(d.value);
                            }
                        }
                    }
                    catch (e_5_1) { e_5 = { error: e_5_1 }; }
                    finally {
                        try {
                            if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                        }
                        finally { if (e_5) throw e_5.error; }
                    }
                }
            }
            catch (e_4_1) { e_4 = { error: e_4_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                }
                finally { if (e_4) throw e_4.error; }
            }
            var min = Math.min.apply(Math, __spreadArray([0], __read(domain)));
            var max = this.xScaleMax ? Math.max.apply(Math, __spreadArray([this.xScaleMax], __read(domain))) : Math.max.apply(Math, __spreadArray([0], __read(domain)));
            return [min, max];
        };
        BarHorizontal2DComponent.prototype.groupTransform = function (group) {
            return "translate(0, " + this.groupScale(group.label) + ")";
        };
        BarHorizontal2DComponent.prototype.onClick = function (data, group) {
            if (group) {
                data.series = group.name;
            }
            this.select.emit(data);
        };
        BarHorizontal2DComponent.prototype.setColors = function () {
            var domain;
            if (this.schemeType === exports.ScaleType.Ordinal) {
                domain = this.innerDomain;
            }
            else {
                domain = this.valueDomain;
            }
            this.colors = new ColorHelper(this.scheme, this.schemeType, domain, this.customColors);
        };
        BarHorizontal2DComponent.prototype.getLegendOptions = function () {
            var opts = {
                scaleType: this.schemeType,
                colors: undefined,
                domain: [],
                title: undefined,
                position: this.legendPosition
            };
            if (opts.scaleType === exports.ScaleType.Ordinal) {
                opts.domain = this.innerDomain;
                opts.colors = this.colors;
                opts.title = this.legendTitle;
            }
            else {
                opts.domain = this.valueDomain;
                opts.colors = this.colors.scale;
            }
            return opts;
        };
        BarHorizontal2DComponent.prototype.updateYAxisWidth = function (_a) {
            var width = _a.width;
            this.yAxisWidth = width;
            this.update();
        };
        BarHorizontal2DComponent.prototype.updateXAxisHeight = function (_a) {
            var height = _a.height;
            this.xAxisHeight = height;
            this.update();
        };
        BarHorizontal2DComponent.prototype.onDataLabelMaxWidthChanged = function (event, groupIndex) {
            var _this = this;
            if (event.size.negative) {
                this.dataLabelMaxWidth.negative = Math.max(this.dataLabelMaxWidth.negative, event.size.width);
            }
            else {
                this.dataLabelMaxWidth.positive = Math.max(this.dataLabelMaxWidth.positive, event.size.width);
            }
            if (groupIndex === this.results.length - 1) {
                setTimeout(function () { return _this.update(); });
            }
        };
        BarHorizontal2DComponent.prototype.onActivate = function (event, group, fromLegend) {
            if (fromLegend === void 0) { fromLegend = false; }
            var item = Object.assign({}, event);
            if (group) {
                item.series = group.name;
            }
            var items = this.results
                .map(function (g) { return g.series; })
                .flat()
                .filter(function (i) {
                if (fromLegend) {
                    return i.label === item.name;
                }
                else {
                    return i.name === item.name && i.series === item.series;
                }
            });
            this.activeEntries = __spreadArray([], __read(items));
            this.activate.emit({ value: item, entries: this.activeEntries });
        };
        BarHorizontal2DComponent.prototype.onDeactivate = function (event, group, fromLegend) {
            if (fromLegend === void 0) { fromLegend = false; }
            var item = Object.assign({}, event);
            if (group) {
                item.series = group.name;
            }
            this.activeEntries = this.activeEntries.filter(function (i) {
                if (fromLegend) {
                    return i.label !== item.name;
                }
                else {
                    return !(i.name === item.name && i.series === item.series);
                }
            });
            this.deactivate.emit({ value: item, entries: this.activeEntries });
        };
        return BarHorizontal2DComponent;
    }(BaseChartComponent));
    BarHorizontal2DComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'ngx-charts-bar-horizontal-2d',
                    template: "\n    <ngx-charts-chart\n      [view]=\"[width, height]\"\n      [showLegend]=\"legend\"\n      [legendOptions]=\"legendOptions\"\n      [activeEntries]=\"activeEntries\"\n      [animations]=\"animations\"\n      (legendLabelActivate)=\"onActivate($event, undefined, true)\"\n      (legendLabelDeactivate)=\"onDeactivate($event, undefined, true)\"\n      (legendLabelClick)=\"onClick($event)\"\n    >\n      <svg:g [attr.transform]=\"transform\" class=\"bar-chart chart\">\n        <svg:g\n          ngx-charts-grid-panel-series\n          [xScale]=\"valueScale\"\n          [yScale]=\"groupScale\"\n          [data]=\"results\"\n          [dims]=\"dims\"\n          [orient]=\"barOrientation.Horizontal\"\n        ></svg:g>\n        <svg:g\n          ngx-charts-x-axis\n          *ngIf=\"xAxis\"\n          [xScale]=\"valueScale\"\n          [dims]=\"dims\"\n          [showGridLines]=\"showGridLines\"\n          [showLabel]=\"showXAxisLabel\"\n          [labelText]=\"xAxisLabel\"\n          [trimTicks]=\"trimXAxisTicks\"\n          [rotateTicks]=\"rotateXAxisTicks\"\n          [maxTickLength]=\"maxXAxisTickLength\"\n          [tickFormatting]=\"xAxisTickFormatting\"\n          [ticks]=\"xAxisTicks\"\n          (dimensionsChanged)=\"updateXAxisHeight($event)\"\n        ></svg:g>\n        <svg:g\n          ngx-charts-y-axis\n          *ngIf=\"yAxis\"\n          [yScale]=\"groupScale\"\n          [dims]=\"dims\"\n          [showLabel]=\"showYAxisLabel\"\n          [labelText]=\"yAxisLabel\"\n          [trimTicks]=\"trimYAxisTicks\"\n          [maxTickLength]=\"maxYAxisTickLength\"\n          [tickFormatting]=\"yAxisTickFormatting\"\n          [ticks]=\"yAxisTicks\"\n          [yAxisOffset]=\"dataLabelMaxWidth.negative\"\n          (dimensionsChanged)=\"updateYAxisWidth($event)\"\n        ></svg:g>\n        <svg:g\n          *ngFor=\"let group of results; let index = index; trackBy: trackBy\"\n          [@animationState]=\"'active'\"\n          [attr.transform]=\"groupTransform(group)\"\n        >\n          <svg:g\n            ngx-charts-series-horizontal\n            [xScale]=\"valueScale\"\n            [activeEntries]=\"activeEntries\"\n            [yScale]=\"innerScale\"\n            [colors]=\"colors\"\n            [series]=\"group.series\"\n            [dims]=\"dims\"\n            [gradient]=\"gradient\"\n            [tooltipDisabled]=\"tooltipDisabled\"\n            [tooltipTemplate]=\"tooltipTemplate\"\n            [seriesName]=\"group.name\"\n            [roundEdges]=\"roundEdges\"\n            [animations]=\"animations\"\n            [showDataLabel]=\"showDataLabel\"\n            [dataLabelFormatting]=\"dataLabelFormatting\"\n            [noBarWhenZero]=\"noBarWhenZero\"\n            (select)=\"onClick($event, group)\"\n            (activate)=\"onActivate($event, group)\"\n            (deactivate)=\"onDeactivate($event, group)\"\n            (dataLabelWidthChanged)=\"onDataLabelMaxWidthChanged($event, index)\"\n          />\n        </svg:g>\n      </svg:g>\n    </ngx-charts-chart>\n  ",
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    encapsulation: core.ViewEncapsulation.None,
                    animations: [
                        animations.trigger('animationState', [
                            animations.transition(':leave', [
                                animations.style({
                                    opacity: 1,
                                    transform: '*'
                                }),
                                animations.animate(500, animations.style({ opacity: 0, transform: 'scale(0)' }))
                            ])
                        ])
                    ],
                    styles: [".ngx-charts-outer{-webkit-animation:chartFadeIn linear .6s;animation:chartFadeIn linear .6s}@-webkit-keyframes chartFadeIn{0%{opacity:0}20%{opacity:0}to{opacity:1}}@keyframes chartFadeIn{0%{opacity:0}20%{opacity:0}to{opacity:1}}.ngx-charts{float:left;overflow:visible}.ngx-charts .circle,.ngx-charts .cell,.ngx-charts .bar,.ngx-charts .arc{cursor:pointer}.ngx-charts .bar.active,.ngx-charts .bar:hover,.ngx-charts .cell.active,.ngx-charts .cell:hover,.ngx-charts .arc.active,.ngx-charts .arc:hover,.ngx-charts .card.active,.ngx-charts .card:hover{opacity:.8;transition:opacity .1s ease-in-out}.ngx-charts .bar:focus,.ngx-charts .cell:focus,.ngx-charts .arc:focus,.ngx-charts .card:focus{outline:none}.ngx-charts .bar.hidden,.ngx-charts .cell.hidden,.ngx-charts .arc.hidden,.ngx-charts .card.hidden{display:none}.ngx-charts g:focus{outline:none}.ngx-charts .line-series.inactive,.ngx-charts .line-series-range.inactive,.ngx-charts .polar-series-path.inactive,.ngx-charts .polar-series-area.inactive,.ngx-charts .area-series.inactive{transition:opacity .1s ease-in-out;opacity:.2}.ngx-charts .line-highlight{display:none}.ngx-charts .line-highlight.active{display:block}.ngx-charts .area{opacity:.6}.ngx-charts .circle:hover{cursor:pointer}.ngx-charts .label{font-size:12px;font-weight:normal}.ngx-charts .tooltip-anchor{fill:#000}.ngx-charts .gridline-path{stroke:#ddd;stroke-width:1;fill:none}.ngx-charts .refline-path{stroke:#a8b2c7;stroke-width:1;stroke-dasharray:5;stroke-dashoffset:5}.ngx-charts .refline-label{font-size:9px}.ngx-charts .reference-area{fill-opacity:.05;fill:#000}.ngx-charts .gridline-path-dotted{stroke:#ddd;stroke-width:1;fill:none;stroke-dasharray:1,20;stroke-dashoffset:3}.ngx-charts .grid-panel rect{fill:none}.ngx-charts .grid-panel.odd rect{fill:#0000000d}\n"]
                },] }
    ];
    BarHorizontal2DComponent.propDecorators = {
        legend: [{ type: core.Input }],
        legendTitle: [{ type: core.Input }],
        legendPosition: [{ type: core.Input }],
        xAxis: [{ type: core.Input }],
        yAxis: [{ type: core.Input }],
        showXAxisLabel: [{ type: core.Input }],
        showYAxisLabel: [{ type: core.Input }],
        xAxisLabel: [{ type: core.Input }],
        yAxisLabel: [{ type: core.Input }],
        tooltipDisabled: [{ type: core.Input }],
        gradient: [{ type: core.Input }],
        showGridLines: [{ type: core.Input }],
        activeEntries: [{ type: core.Input }],
        schemeType: [{ type: core.Input }],
        trimXAxisTicks: [{ type: core.Input }],
        trimYAxisTicks: [{ type: core.Input }],
        rotateXAxisTicks: [{ type: core.Input }],
        maxXAxisTickLength: [{ type: core.Input }],
        maxYAxisTickLength: [{ type: core.Input }],
        xAxisTickFormatting: [{ type: core.Input }],
        yAxisTickFormatting: [{ type: core.Input }],
        xAxisTicks: [{ type: core.Input }],
        yAxisTicks: [{ type: core.Input }],
        groupPadding: [{ type: core.Input }],
        barPadding: [{ type: core.Input }],
        roundDomains: [{ type: core.Input }],
        roundEdges: [{ type: core.Input }],
        xScaleMax: [{ type: core.Input }],
        showDataLabel: [{ type: core.Input }],
        dataLabelFormatting: [{ type: core.Input }],
        noBarWhenZero: [{ type: core.Input }],
        activate: [{ type: core.Output }],
        deactivate: [{ type: core.Output }],
        tooltipTemplate: [{ type: core.ContentChild, args: ['tooltipTemplate',] }]
    };

    exports.BarChartType = void 0;
    (function (BarChartType) {
        BarChartType["Standard"] = "standard";
        BarChartType["Normalized"] = "normalized";
        BarChartType["Stacked"] = "stacked";
    })(exports.BarChartType || (exports.BarChartType = {}));

    var BarHorizontalNormalizedComponent = /** @class */ (function (_super) {
        __extends(BarHorizontalNormalizedComponent, _super);
        function BarHorizontalNormalizedComponent() {
            var _this = _super.apply(this, __spreadArray([], __read(arguments))) || this;
            _this.legend = false;
            _this.legendTitle = 'Legend';
            _this.legendPosition = exports.LegendPosition.Right;
            _this.tooltipDisabled = false;
            _this.showGridLines = true;
            _this.activeEntries = [];
            _this.trimXAxisTicks = true;
            _this.trimYAxisTicks = true;
            _this.rotateXAxisTicks = true;
            _this.maxXAxisTickLength = 16;
            _this.maxYAxisTickLength = 16;
            _this.barPadding = 8;
            _this.roundDomains = false;
            _this.noBarWhenZero = true;
            _this.activate = new core.EventEmitter();
            _this.deactivate = new core.EventEmitter();
            _this.valueDomain = [0, 100];
            _this.margin = [10, 20, 10, 20];
            _this.xAxisHeight = 0;
            _this.yAxisWidth = 0;
            _this.barChartType = exports.BarChartType;
            _this.trackBy = function (index, item) {
                return item.name;
            };
            return _this;
        }
        BarHorizontalNormalizedComponent.prototype.update = function () {
            _super.prototype.update.call(this);
            this.dims = calculateViewDimensions({
                width: this.width,
                height: this.height,
                margins: this.margin,
                showXAxis: this.xAxis,
                showYAxis: this.yAxis,
                xAxisHeight: this.xAxisHeight,
                yAxisWidth: this.yAxisWidth,
                showXLabel: this.showXAxisLabel,
                showYLabel: this.showYAxisLabel,
                showLegend: this.legend,
                legendType: this.schemeType,
                legendPosition: this.legendPosition
            });
            this.formatDates();
            this.groupDomain = this.getGroupDomain();
            this.innerDomain = this.getInnerDomain();
            this.xScale = this.getXScale();
            this.yScale = this.getYScale();
            this.setColors();
            this.legendOptions = this.getLegendOptions();
            this.transform = "translate(" + this.dims.xOffset + " , " + this.margin[0] + ")";
        };
        BarHorizontalNormalizedComponent.prototype.getGroupDomain = function () {
            var e_1, _a;
            var domain = [];
            try {
                for (var _b = __values(this.results), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var group = _c.value;
                    if (!domain.includes(group.label)) {
                        domain.push(group.label);
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return domain;
        };
        BarHorizontalNormalizedComponent.prototype.getInnerDomain = function () {
            var e_2, _a, e_3, _b;
            var domain = [];
            try {
                for (var _c = __values(this.results), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var group = _d.value;
                    try {
                        for (var _e = (e_3 = void 0, __values(group.series)), _f = _e.next(); !_f.done; _f = _e.next()) {
                            var d = _f.value;
                            if (!domain.includes(d.label)) {
                                domain.push(d.label);
                            }
                        }
                    }
                    catch (e_3_1) { e_3 = { error: e_3_1 }; }
                    finally {
                        try {
                            if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                        }
                        finally { if (e_3) throw e_3.error; }
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                }
                finally { if (e_2) throw e_2.error; }
            }
            return domain;
        };
        BarHorizontalNormalizedComponent.prototype.getYScale = function () {
            var spacing = this.groupDomain.length / (this.dims.height / this.barPadding + 1);
            return d3Scale.scaleBand().rangeRound([0, this.dims.height]).paddingInner(spacing).domain(this.groupDomain);
        };
        BarHorizontalNormalizedComponent.prototype.getXScale = function () {
            var scale = d3Scale.scaleLinear().range([0, this.dims.width]).domain(this.valueDomain);
            return this.roundDomains ? scale.nice() : scale;
        };
        BarHorizontalNormalizedComponent.prototype.groupTransform = function (group) {
            return "translate(0, " + this.yScale(group.name) + ")";
        };
        BarHorizontalNormalizedComponent.prototype.onClick = function (data, group) {
            if (group) {
                data.series = group.name;
            }
            this.select.emit(data);
        };
        BarHorizontalNormalizedComponent.prototype.setColors = function () {
            var domain;
            if (this.schemeType === exports.ScaleType.Ordinal) {
                domain = this.innerDomain;
            }
            else {
                domain = this.valueDomain;
            }
            this.colors = new ColorHelper(this.scheme, this.schemeType, domain, this.customColors);
        };
        BarHorizontalNormalizedComponent.prototype.getLegendOptions = function () {
            var opts = {
                scaleType: this.schemeType,
                colors: undefined,
                domain: [],
                title: undefined,
                position: this.legendPosition
            };
            if (opts.scaleType === exports.ScaleType.Ordinal) {
                opts.domain = this.innerDomain;
                opts.colors = this.colors;
                opts.title = this.legendTitle;
            }
            else {
                opts.domain = this.valueDomain;
                opts.colors = this.colors.scale;
            }
            return opts;
        };
        BarHorizontalNormalizedComponent.prototype.updateYAxisWidth = function (_a) {
            var width = _a.width;
            this.yAxisWidth = width;
            this.update();
        };
        BarHorizontalNormalizedComponent.prototype.updateXAxisHeight = function (_a) {
            var height = _a.height;
            this.xAxisHeight = height;
            this.update();
        };
        BarHorizontalNormalizedComponent.prototype.onActivate = function (event, group, fromLegend) {
            if (fromLegend === void 0) { fromLegend = false; }
            var item = Object.assign({}, event);
            if (group) {
                item.series = group.name;
            }
            var items = this.results
                .map(function (g) { return g.series; })
                .flat()
                .filter(function (i) {
                if (fromLegend) {
                    return i.label === item.name;
                }
                else {
                    return i.name === item.name && i.series === item.series;
                }
            });
            this.activeEntries = __spreadArray([], __read(items));
            this.activate.emit({ value: item, entries: this.activeEntries });
        };
        BarHorizontalNormalizedComponent.prototype.onDeactivate = function (event, group, fromLegend) {
            if (fromLegend === void 0) { fromLegend = false; }
            var item = Object.assign({}, event);
            if (group) {
                item.series = group.name;
            }
            this.activeEntries = this.activeEntries.filter(function (i) {
                if (fromLegend) {
                    return i.label !== item.name;
                }
                else {
                    return !(i.name === item.name && i.series === item.series);
                }
            });
            this.deactivate.emit({ value: item, entries: this.activeEntries });
        };
        return BarHorizontalNormalizedComponent;
    }(BaseChartComponent));
    BarHorizontalNormalizedComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'ngx-charts-bar-horizontal-normalized',
                    template: "\n    <ngx-charts-chart\n      [view]=\"[width, height]\"\n      [showLegend]=\"legend\"\n      [legendOptions]=\"legendOptions\"\n      [activeEntries]=\"activeEntries\"\n      [animations]=\"animations\"\n      (legendLabelActivate)=\"onActivate($event, undefined, true)\"\n      (legendLabelDeactivate)=\"onDeactivate($event, undefined, true)\"\n      (legendLabelClick)=\"onClick($event)\"\n    >\n      <svg:g [attr.transform]=\"transform\" class=\"bar-chart chart\">\n        <svg:g\n          ngx-charts-x-axis\n          *ngIf=\"xAxis\"\n          [xScale]=\"xScale\"\n          [dims]=\"dims\"\n          [showGridLines]=\"showGridLines\"\n          [showLabel]=\"showXAxisLabel\"\n          [labelText]=\"xAxisLabel\"\n          [trimTicks]=\"trimXAxisTicks\"\n          [rotateTicks]=\"rotateXAxisTicks\"\n          [maxTickLength]=\"maxXAxisTickLength\"\n          [tickFormatting]=\"xAxisTickFormatting\"\n          [ticks]=\"xAxisTicks\"\n          (dimensionsChanged)=\"updateXAxisHeight($event)\"\n        ></svg:g>\n        <svg:g\n          ngx-charts-y-axis\n          *ngIf=\"yAxis\"\n          [yScale]=\"yScale\"\n          [dims]=\"dims\"\n          [showLabel]=\"showYAxisLabel\"\n          [labelText]=\"yAxisLabel\"\n          [trimTicks]=\"trimYAxisTicks\"\n          [maxTickLength]=\"maxYAxisTickLength\"\n          [tickFormatting]=\"yAxisTickFormatting\"\n          [ticks]=\"yAxisTicks\"\n          (dimensionsChanged)=\"updateYAxisWidth($event)\"\n        ></svg:g>\n        <svg:g\n          *ngFor=\"let group of results; trackBy: trackBy\"\n          [@animationState]=\"'active'\"\n          [attr.transform]=\"groupTransform(group)\"\n        >\n          <svg:g\n            ngx-charts-series-horizontal\n            [type]=\"barChartType.Normalized\"\n            [xScale]=\"xScale\"\n            [yScale]=\"yScale\"\n            [activeEntries]=\"activeEntries\"\n            [colors]=\"colors\"\n            [series]=\"group.series\"\n            [dims]=\"dims\"\n            [gradient]=\"gradient\"\n            [tooltipDisabled]=\"tooltipDisabled\"\n            [tooltipTemplate]=\"tooltipTemplate\"\n            [seriesName]=\"group.name\"\n            [animations]=\"animations\"\n            (select)=\"onClick($event, group)\"\n            (activate)=\"onActivate($event, group)\"\n            (deactivate)=\"onDeactivate($event, group)\"\n            [noBarWhenZero]=\"noBarWhenZero\"\n          />\n        </svg:g>\n      </svg:g>\n    </ngx-charts-chart>\n  ",
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    encapsulation: core.ViewEncapsulation.None,
                    animations: [
                        animations.trigger('animationState', [
                            animations.transition(':leave', [
                                animations.style({
                                    opacity: 1,
                                    transform: '*'
                                }),
                                animations.animate(500, animations.style({ opacity: 0, transform: 'scale(0)' }))
                            ])
                        ])
                    ],
                    styles: [".ngx-charts-outer{-webkit-animation:chartFadeIn linear .6s;animation:chartFadeIn linear .6s}@-webkit-keyframes chartFadeIn{0%{opacity:0}20%{opacity:0}to{opacity:1}}@keyframes chartFadeIn{0%{opacity:0}20%{opacity:0}to{opacity:1}}.ngx-charts{float:left;overflow:visible}.ngx-charts .circle,.ngx-charts .cell,.ngx-charts .bar,.ngx-charts .arc{cursor:pointer}.ngx-charts .bar.active,.ngx-charts .bar:hover,.ngx-charts .cell.active,.ngx-charts .cell:hover,.ngx-charts .arc.active,.ngx-charts .arc:hover,.ngx-charts .card.active,.ngx-charts .card:hover{opacity:.8;transition:opacity .1s ease-in-out}.ngx-charts .bar:focus,.ngx-charts .cell:focus,.ngx-charts .arc:focus,.ngx-charts .card:focus{outline:none}.ngx-charts .bar.hidden,.ngx-charts .cell.hidden,.ngx-charts .arc.hidden,.ngx-charts .card.hidden{display:none}.ngx-charts g:focus{outline:none}.ngx-charts .line-series.inactive,.ngx-charts .line-series-range.inactive,.ngx-charts .polar-series-path.inactive,.ngx-charts .polar-series-area.inactive,.ngx-charts .area-series.inactive{transition:opacity .1s ease-in-out;opacity:.2}.ngx-charts .line-highlight{display:none}.ngx-charts .line-highlight.active{display:block}.ngx-charts .area{opacity:.6}.ngx-charts .circle:hover{cursor:pointer}.ngx-charts .label{font-size:12px;font-weight:normal}.ngx-charts .tooltip-anchor{fill:#000}.ngx-charts .gridline-path{stroke:#ddd;stroke-width:1;fill:none}.ngx-charts .refline-path{stroke:#a8b2c7;stroke-width:1;stroke-dasharray:5;stroke-dashoffset:5}.ngx-charts .refline-label{font-size:9px}.ngx-charts .reference-area{fill-opacity:.05;fill:#000}.ngx-charts .gridline-path-dotted{stroke:#ddd;stroke-width:1;fill:none;stroke-dasharray:1,20;stroke-dashoffset:3}.ngx-charts .grid-panel rect{fill:none}.ngx-charts .grid-panel.odd rect{fill:#0000000d}\n"]
                },] }
    ];
    BarHorizontalNormalizedComponent.propDecorators = {
        legend: [{ type: core.Input }],
        legendTitle: [{ type: core.Input }],
        legendPosition: [{ type: core.Input }],
        xAxis: [{ type: core.Input }],
        yAxis: [{ type: core.Input }],
        showXAxisLabel: [{ type: core.Input }],
        showYAxisLabel: [{ type: core.Input }],
        xAxisLabel: [{ type: core.Input }],
        yAxisLabel: [{ type: core.Input }],
        tooltipDisabled: [{ type: core.Input }],
        gradient: [{ type: core.Input }],
        showGridLines: [{ type: core.Input }],
        activeEntries: [{ type: core.Input }],
        schemeType: [{ type: core.Input }],
        trimXAxisTicks: [{ type: core.Input }],
        trimYAxisTicks: [{ type: core.Input }],
        rotateXAxisTicks: [{ type: core.Input }],
        maxXAxisTickLength: [{ type: core.Input }],
        maxYAxisTickLength: [{ type: core.Input }],
        xAxisTickFormatting: [{ type: core.Input }],
        yAxisTickFormatting: [{ type: core.Input }],
        xAxisTicks: [{ type: core.Input }],
        yAxisTicks: [{ type: core.Input }],
        barPadding: [{ type: core.Input }],
        roundDomains: [{ type: core.Input }],
        noBarWhenZero: [{ type: core.Input }],
        activate: [{ type: core.Output }],
        deactivate: [{ type: core.Output }],
        tooltipTemplate: [{ type: core.ContentChild, args: ['tooltipTemplate',] }]
    };

    var BarHorizontalStackedComponent = /** @class */ (function (_super) {
        __extends(BarHorizontalStackedComponent, _super);
        function BarHorizontalStackedComponent() {
            var _this = _super.apply(this, __spreadArray([], __read(arguments))) || this;
            _this.legend = false;
            _this.legendTitle = 'Legend';
            _this.legendPosition = exports.LegendPosition.Right;
            _this.tooltipDisabled = false;
            _this.showGridLines = true;
            _this.activeEntries = [];
            _this.trimXAxisTicks = true;
            _this.trimYAxisTicks = true;
            _this.rotateXAxisTicks = true;
            _this.maxXAxisTickLength = 16;
            _this.maxYAxisTickLength = 16;
            _this.barPadding = 8;
            _this.roundDomains = false;
            _this.showDataLabel = false;
            _this.noBarWhenZero = true;
            _this.activate = new core.EventEmitter();
            _this.deactivate = new core.EventEmitter();
            _this.margin = [10, 20, 10, 20];
            _this.xAxisHeight = 0;
            _this.yAxisWidth = 0;
            _this.dataLabelMaxWidth = { negative: 0, positive: 0 };
            _this.barChartType = exports.BarChartType;
            _this.trackBy = function (index, item) {
                return item.name;
            };
            return _this;
        }
        BarHorizontalStackedComponent.prototype.update = function () {
            _super.prototype.update.call(this);
            if (!this.showDataLabel) {
                this.dataLabelMaxWidth = { negative: 0, positive: 0 };
            }
            this.margin = [10, 20 + this.dataLabelMaxWidth.positive, 10, 20 + this.dataLabelMaxWidth.negative];
            this.dims = calculateViewDimensions({
                width: this.width,
                height: this.height,
                margins: this.margin,
                showXAxis: this.xAxis,
                showYAxis: this.yAxis,
                xAxisHeight: this.xAxisHeight,
                yAxisWidth: this.yAxisWidth,
                showXLabel: this.showXAxisLabel,
                showYLabel: this.showYAxisLabel,
                showLegend: this.legend,
                legendType: this.schemeType,
                legendPosition: this.legendPosition
            });
            this.formatDates();
            this.groupDomain = this.getGroupDomain();
            this.innerDomain = this.getInnerDomain();
            this.valueDomain = this.getValueDomain();
            this.xScale = this.getXScale();
            this.yScale = this.getYScale();
            this.setColors();
            this.legendOptions = this.getLegendOptions();
            this.transform = "translate(" + this.dims.xOffset + " , " + this.margin[0] + ")";
        };
        BarHorizontalStackedComponent.prototype.getGroupDomain = function () {
            var e_1, _a;
            var domain = [];
            try {
                for (var _b = __values(this.results), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var group = _c.value;
                    if (!domain.includes(group.label)) {
                        domain.push(group.label);
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return domain;
        };
        BarHorizontalStackedComponent.prototype.getInnerDomain = function () {
            var e_2, _a, e_3, _b;
            var domain = [];
            try {
                for (var _c = __values(this.results), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var group = _d.value;
                    try {
                        for (var _e = (e_3 = void 0, __values(group.series)), _f = _e.next(); !_f.done; _f = _e.next()) {
                            var d = _f.value;
                            if (!domain.includes(d.label)) {
                                domain.push(d.label);
                            }
                        }
                    }
                    catch (e_3_1) { e_3 = { error: e_3_1 }; }
                    finally {
                        try {
                            if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                        }
                        finally { if (e_3) throw e_3.error; }
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                }
                finally { if (e_2) throw e_2.error; }
            }
            return domain;
        };
        BarHorizontalStackedComponent.prototype.getValueDomain = function () {
            var e_4, _a, e_5, _b;
            var domain = [];
            var smallest = 0;
            var biggest = 0;
            try {
                for (var _c = __values(this.results), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var group = _d.value;
                    var smallestSum = 0;
                    var biggestSum = 0;
                    try {
                        for (var _e = (e_5 = void 0, __values(group.series)), _f = _e.next(); !_f.done; _f = _e.next()) {
                            var d = _f.value;
                            if (d.value < 0) {
                                smallestSum += d.value;
                            }
                            else {
                                biggestSum += d.value;
                            }
                            smallest = d.value < smallest ? d.value : smallest;
                            biggest = d.value > biggest ? d.value : biggest;
                        }
                    }
                    catch (e_5_1) { e_5 = { error: e_5_1 }; }
                    finally {
                        try {
                            if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                        }
                        finally { if (e_5) throw e_5.error; }
                    }
                    domain.push(smallestSum);
                    domain.push(biggestSum);
                }
            }
            catch (e_4_1) { e_4 = { error: e_4_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                }
                finally { if (e_4) throw e_4.error; }
            }
            domain.push(smallest);
            domain.push(biggest);
            var min = Math.min.apply(Math, __spreadArray([0], __read(domain)));
            var max = this.xScaleMax ? Math.max.apply(Math, __spreadArray([this.xScaleMax], __read(domain))) : Math.max.apply(Math, __spreadArray([], __read(domain)));
            return [min, max];
        };
        BarHorizontalStackedComponent.prototype.getYScale = function () {
            var spacing = this.groupDomain.length / (this.dims.height / this.barPadding + 1);
            return d3Scale.scaleBand().rangeRound([0, this.dims.height]).paddingInner(spacing).domain(this.groupDomain);
        };
        BarHorizontalStackedComponent.prototype.getXScale = function () {
            var scale = d3Scale.scaleLinear().range([0, this.dims.width]).domain(this.valueDomain);
            return this.roundDomains ? scale.nice() : scale;
        };
        BarHorizontalStackedComponent.prototype.groupTransform = function (group) {
            return "translate(0, " + this.yScale(group.name) + ")";
        };
        BarHorizontalStackedComponent.prototype.onClick = function (data, group) {
            if (group) {
                data.series = group.name;
            }
            this.select.emit(data);
        };
        BarHorizontalStackedComponent.prototype.setColors = function () {
            var domain;
            if (this.schemeType === exports.ScaleType.Ordinal) {
                domain = this.innerDomain;
            }
            else {
                domain = this.valueDomain;
            }
            this.colors = new ColorHelper(this.scheme, this.schemeType, domain, this.customColors);
        };
        BarHorizontalStackedComponent.prototype.getLegendOptions = function () {
            var opts = {
                scaleType: this.schemeType,
                colors: undefined,
                domain: [],
                title: undefined,
                position: this.legendPosition
            };
            if (opts.scaleType === exports.ScaleType.Ordinal) {
                opts.domain = this.innerDomain;
                opts.colors = this.colors;
                opts.title = this.legendTitle;
            }
            else {
                opts.domain = this.valueDomain;
                opts.colors = this.colors.scale;
            }
            return opts;
        };
        BarHorizontalStackedComponent.prototype.updateYAxisWidth = function (_a) {
            var width = _a.width;
            this.yAxisWidth = width;
            this.update();
        };
        BarHorizontalStackedComponent.prototype.updateXAxisHeight = function (_a) {
            var height = _a.height;
            this.xAxisHeight = height;
            this.update();
        };
        BarHorizontalStackedComponent.prototype.onDataLabelMaxWidthChanged = function (event, groupIndex) {
            var _this = this;
            if (event.size.negative) {
                this.dataLabelMaxWidth.negative = Math.max(this.dataLabelMaxWidth.negative, event.size.width);
            }
            else {
                this.dataLabelMaxWidth.positive = Math.max(this.dataLabelMaxWidth.positive, event.size.width);
            }
            if (groupIndex === this.results.length - 1) {
                setTimeout(function () { return _this.update(); });
            }
        };
        BarHorizontalStackedComponent.prototype.onActivate = function (event, group, fromLegend) {
            if (fromLegend === void 0) { fromLegend = false; }
            var item = Object.assign({}, event);
            if (group) {
                item.series = group.name;
            }
            var items = this.results
                .map(function (g) { return g.series; })
                .flat()
                .filter(function (i) {
                if (fromLegend) {
                    return i.label === item.name;
                }
                else {
                    return i.name === item.name && i.series === item.series;
                }
            });
            this.activeEntries = __spreadArray([], __read(items));
            this.activate.emit({ value: item, entries: this.activeEntries });
        };
        BarHorizontalStackedComponent.prototype.onDeactivate = function (event, group, fromLegend) {
            if (fromLegend === void 0) { fromLegend = false; }
            var item = Object.assign({}, event);
            if (group) {
                item.series = group.name;
            }
            this.activeEntries = this.activeEntries.filter(function (i) {
                if (fromLegend) {
                    return i.label !== item.name;
                }
                else {
                    return !(i.name === item.name && i.series === item.series);
                }
            });
            this.deactivate.emit({ value: item, entries: this.activeEntries });
        };
        return BarHorizontalStackedComponent;
    }(BaseChartComponent));
    BarHorizontalStackedComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'ngx-charts-bar-horizontal-stacked',
                    template: "\n    <ngx-charts-chart\n      [view]=\"[width, height]\"\n      [showLegend]=\"legend\"\n      [legendOptions]=\"legendOptions\"\n      [activeEntries]=\"activeEntries\"\n      [animations]=\"animations\"\n      (legendLabelActivate)=\"onActivate($event, undefined, true)\"\n      (legendLabelDeactivate)=\"onDeactivate($event, undefined, true)\"\n      (legendLabelClick)=\"onClick($event)\"\n    >\n      <svg:g [attr.transform]=\"transform\" class=\"bar-chart chart\">\n        <svg:g\n          ngx-charts-x-axis\n          *ngIf=\"xAxis\"\n          [xScale]=\"xScale\"\n          [dims]=\"dims\"\n          [showGridLines]=\"showGridLines\"\n          [showLabel]=\"showXAxisLabel\"\n          [labelText]=\"xAxisLabel\"\n          [trimTicks]=\"trimXAxisTicks\"\n          [rotateTicks]=\"rotateXAxisTicks\"\n          [maxTickLength]=\"maxXAxisTickLength\"\n          [tickFormatting]=\"xAxisTickFormatting\"\n          [ticks]=\"xAxisTicks\"\n          (dimensionsChanged)=\"updateXAxisHeight($event)\"\n        ></svg:g>\n        <svg:g\n          ngx-charts-y-axis\n          *ngIf=\"yAxis\"\n          [yScale]=\"yScale\"\n          [dims]=\"dims\"\n          [showLabel]=\"showYAxisLabel\"\n          [labelText]=\"yAxisLabel\"\n          [trimTicks]=\"trimYAxisTicks\"\n          [maxTickLength]=\"maxYAxisTickLength\"\n          [tickFormatting]=\"yAxisTickFormatting\"\n          [ticks]=\"yAxisTicks\"\n          [yAxisOffset]=\"dataLabelMaxWidth.negative\"\n          (dimensionsChanged)=\"updateYAxisWidth($event)\"\n        ></svg:g>\n        <svg:g\n          *ngFor=\"let group of results; let index = index; trackBy: trackBy\"\n          [@animationState]=\"'active'\"\n          [attr.transform]=\"groupTransform(group)\"\n        >\n          <svg:g\n            ngx-charts-series-horizontal\n            [type]=\"barChartType.Stacked\"\n            [xScale]=\"xScale\"\n            [yScale]=\"yScale\"\n            [colors]=\"colors\"\n            [series]=\"group.series\"\n            [activeEntries]=\"activeEntries\"\n            [dims]=\"dims\"\n            [gradient]=\"gradient\"\n            [tooltipDisabled]=\"tooltipDisabled\"\n            [tooltipTemplate]=\"tooltipTemplate\"\n            [seriesName]=\"group.name\"\n            [animations]=\"animations\"\n            [showDataLabel]=\"showDataLabel\"\n            [dataLabelFormatting]=\"dataLabelFormatting\"\n            [noBarWhenZero]=\"noBarWhenZero\"\n            (select)=\"onClick($event, group)\"\n            (activate)=\"onActivate($event, group)\"\n            (deactivate)=\"onDeactivate($event, group)\"\n            (dataLabelWidthChanged)=\"onDataLabelMaxWidthChanged($event, index)\"\n          />\n        </svg:g>\n      </svg:g>\n    </ngx-charts-chart>\n  ",
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    encapsulation: core.ViewEncapsulation.None,
                    animations: [
                        animations.trigger('animationState', [
                            animations.transition(':leave', [
                                animations.style({
                                    opacity: 1,
                                    transform: '*'
                                }),
                                animations.animate(500, animations.style({ opacity: 0, transform: 'scale(0)' }))
                            ])
                        ])
                    ],
                    styles: [".ngx-charts-outer{-webkit-animation:chartFadeIn linear .6s;animation:chartFadeIn linear .6s}@-webkit-keyframes chartFadeIn{0%{opacity:0}20%{opacity:0}to{opacity:1}}@keyframes chartFadeIn{0%{opacity:0}20%{opacity:0}to{opacity:1}}.ngx-charts{float:left;overflow:visible}.ngx-charts .circle,.ngx-charts .cell,.ngx-charts .bar,.ngx-charts .arc{cursor:pointer}.ngx-charts .bar.active,.ngx-charts .bar:hover,.ngx-charts .cell.active,.ngx-charts .cell:hover,.ngx-charts .arc.active,.ngx-charts .arc:hover,.ngx-charts .card.active,.ngx-charts .card:hover{opacity:.8;transition:opacity .1s ease-in-out}.ngx-charts .bar:focus,.ngx-charts .cell:focus,.ngx-charts .arc:focus,.ngx-charts .card:focus{outline:none}.ngx-charts .bar.hidden,.ngx-charts .cell.hidden,.ngx-charts .arc.hidden,.ngx-charts .card.hidden{display:none}.ngx-charts g:focus{outline:none}.ngx-charts .line-series.inactive,.ngx-charts .line-series-range.inactive,.ngx-charts .polar-series-path.inactive,.ngx-charts .polar-series-area.inactive,.ngx-charts .area-series.inactive{transition:opacity .1s ease-in-out;opacity:.2}.ngx-charts .line-highlight{display:none}.ngx-charts .line-highlight.active{display:block}.ngx-charts .area{opacity:.6}.ngx-charts .circle:hover{cursor:pointer}.ngx-charts .label{font-size:12px;font-weight:normal}.ngx-charts .tooltip-anchor{fill:#000}.ngx-charts .gridline-path{stroke:#ddd;stroke-width:1;fill:none}.ngx-charts .refline-path{stroke:#a8b2c7;stroke-width:1;stroke-dasharray:5;stroke-dashoffset:5}.ngx-charts .refline-label{font-size:9px}.ngx-charts .reference-area{fill-opacity:.05;fill:#000}.ngx-charts .gridline-path-dotted{stroke:#ddd;stroke-width:1;fill:none;stroke-dasharray:1,20;stroke-dashoffset:3}.ngx-charts .grid-panel rect{fill:none}.ngx-charts .grid-panel.odd rect{fill:#0000000d}\n"]
                },] }
    ];
    BarHorizontalStackedComponent.propDecorators = {
        legend: [{ type: core.Input }],
        legendTitle: [{ type: core.Input }],
        legendPosition: [{ type: core.Input }],
        xAxis: [{ type: core.Input }],
        yAxis: [{ type: core.Input }],
        showXAxisLabel: [{ type: core.Input }],
        showYAxisLabel: [{ type: core.Input }],
        xAxisLabel: [{ type: core.Input }],
        yAxisLabel: [{ type: core.Input }],
        tooltipDisabled: [{ type: core.Input }],
        gradient: [{ type: core.Input }],
        showGridLines: [{ type: core.Input }],
        activeEntries: [{ type: core.Input }],
        schemeType: [{ type: core.Input }],
        trimXAxisTicks: [{ type: core.Input }],
        trimYAxisTicks: [{ type: core.Input }],
        rotateXAxisTicks: [{ type: core.Input }],
        maxXAxisTickLength: [{ type: core.Input }],
        maxYAxisTickLength: [{ type: core.Input }],
        xAxisTickFormatting: [{ type: core.Input }],
        yAxisTickFormatting: [{ type: core.Input }],
        xAxisTicks: [{ type: core.Input }],
        yAxisTicks: [{ type: core.Input }],
        barPadding: [{ type: core.Input }],
        roundDomains: [{ type: core.Input }],
        xScaleMax: [{ type: core.Input }],
        showDataLabel: [{ type: core.Input }],
        dataLabelFormatting: [{ type: core.Input }],
        noBarWhenZero: [{ type: core.Input }],
        activate: [{ type: core.Output }],
        deactivate: [{ type: core.Output }],
        tooltipTemplate: [{ type: core.ContentChild, args: ['tooltipTemplate',] }]
    };

    var BarVerticalComponent = /** @class */ (function (_super) {
        __extends(BarVerticalComponent, _super);
        function BarVerticalComponent() {
            var _this = _super.apply(this, __spreadArray([], __read(arguments))) || this;
            _this.legend = false;
            _this.legendTitle = 'Legend';
            _this.legendPosition = exports.LegendPosition.Right;
            _this.tooltipDisabled = false;
            _this.showGridLines = true;
            _this.activeEntries = [];
            _this.trimXAxisTicks = true;
            _this.trimYAxisTicks = true;
            _this.rotateXAxisTicks = true;
            _this.maxXAxisTickLength = 16;
            _this.maxYAxisTickLength = 16;
            _this.barPadding = 8;
            _this.roundDomains = false;
            _this.roundEdges = true;
            _this.showDataLabel = false;
            _this.noBarWhenZero = true;
            _this.activate = new core.EventEmitter();
            _this.deactivate = new core.EventEmitter();
            _this.margin = [10, 20, 10, 20];
            _this.xAxisHeight = 0;
            _this.yAxisWidth = 0;
            _this.dataLabelMaxHeight = { negative: 0, positive: 0 };
            return _this;
        }
        BarVerticalComponent.prototype.update = function () {
            _super.prototype.update.call(this);
            if (!this.showDataLabel) {
                this.dataLabelMaxHeight = { negative: 0, positive: 0 };
            }
            this.margin = [10 + this.dataLabelMaxHeight.positive, 20, 10 + this.dataLabelMaxHeight.negative, 20];
            this.dims = calculateViewDimensions({
                width: this.width,
                height: this.height,
                margins: this.margin,
                showXAxis: this.xAxis,
                showYAxis: this.yAxis,
                xAxisHeight: this.xAxisHeight,
                yAxisWidth: this.yAxisWidth,
                showXLabel: this.showXAxisLabel,
                showYLabel: this.showYAxisLabel,
                showLegend: this.legend,
                legendType: this.schemeType,
                legendPosition: this.legendPosition
            });
            this.formatDates();
            if (this.showDataLabel) {
                this.dims.height -= this.dataLabelMaxHeight.negative;
            }
            this.xScale = this.getXScale();
            this.yScale = this.getYScale();
            this.setColors();
            this.legendOptions = this.getLegendOptions();
            this.transform = "translate(" + this.dims.xOffset + " , " + (this.margin[0] + this.dataLabelMaxHeight.negative) + ")";
        };
        BarVerticalComponent.prototype.getXScale = function () {
            this.xDomain = this.getXDomain();
            var spacing = this.xDomain.length / (this.dims.width / this.barPadding + 1);
            return d3Scale.scaleBand().range([0, this.dims.width]).paddingInner(spacing).domain(this.xDomain);
        };
        BarVerticalComponent.prototype.getYScale = function () {
            this.yDomain = this.getYDomain();
            var scale = d3Scale.scaleLinear().range([this.dims.height, 0]).domain(this.yDomain);
            return this.roundDomains ? scale.nice() : scale;
        };
        BarVerticalComponent.prototype.getXDomain = function () {
            return this.results.map(function (d) { return d.label; });
        };
        BarVerticalComponent.prototype.getYDomain = function () {
            var values = this.results.map(function (d) { return d.value; });
            var min = this.yScaleMin ? Math.min.apply(Math, __spreadArray([this.yScaleMin], __read(values))) : Math.min.apply(Math, __spreadArray([0], __read(values)));
            if (this.yAxisTicks && !this.yAxisTicks.some(isNaN)) {
                min = Math.min.apply(Math, __spreadArray([min], __read(this.yAxisTicks)));
            }
            var max = this.yScaleMax ? Math.max.apply(Math, __spreadArray([this.yScaleMax], __read(values))) : Math.max.apply(Math, __spreadArray([0], __read(values)));
            if (this.yAxisTicks && !this.yAxisTicks.some(isNaN)) {
                max = Math.max.apply(Math, __spreadArray([max], __read(this.yAxisTicks)));
            }
            return [min, max];
        };
        BarVerticalComponent.prototype.onClick = function (data) {
            this.select.emit(data);
        };
        BarVerticalComponent.prototype.setColors = function () {
            var domain;
            if (this.schemeType === exports.ScaleType.Ordinal) {
                domain = this.xDomain;
            }
            else {
                domain = this.yDomain;
            }
            this.colors = new ColorHelper(this.scheme, this.schemeType, domain, this.customColors);
        };
        BarVerticalComponent.prototype.getLegendOptions = function () {
            var opts = {
                scaleType: this.schemeType,
                colors: undefined,
                domain: [],
                title: undefined,
                position: this.legendPosition
            };
            if (opts.scaleType === exports.ScaleType.Ordinal) {
                opts.domain = this.xDomain;
                opts.colors = this.colors;
                opts.title = this.legendTitle;
            }
            else {
                opts.domain = this.yDomain;
                opts.colors = this.colors.scale;
            }
            return opts;
        };
        BarVerticalComponent.prototype.updateYAxisWidth = function (_a) {
            var width = _a.width;
            this.yAxisWidth = width;
            this.update();
        };
        BarVerticalComponent.prototype.updateXAxisHeight = function (_a) {
            var height = _a.height;
            this.xAxisHeight = height;
            this.update();
        };
        BarVerticalComponent.prototype.onDataLabelMaxHeightChanged = function (event) {
            var _this = this;
            if (event.size.negative) {
                this.dataLabelMaxHeight.negative = Math.max(this.dataLabelMaxHeight.negative, event.size.height);
            }
            else {
                this.dataLabelMaxHeight.positive = Math.max(this.dataLabelMaxHeight.positive, event.size.height);
            }
            if (event.index === this.results.length - 1) {
                setTimeout(function () { return _this.update(); });
            }
        };
        BarVerticalComponent.prototype.onActivate = function (item, fromLegend) {
            if (fromLegend === void 0) { fromLegend = false; }
            item = this.results.find(function (d) {
                if (fromLegend) {
                    return d.label === item.name;
                }
                else {
                    return d.name === item.name;
                }
            });
            var idx = this.activeEntries.findIndex(function (d) {
                return d.name === item.name && d.value === item.value && d.series === item.series;
            });
            if (idx > -1) {
                return;
            }
            this.activeEntries = __spreadArray([item], __read(this.activeEntries));
            this.activate.emit({ value: item, entries: this.activeEntries });
        };
        BarVerticalComponent.prototype.onDeactivate = function (item, fromLegend) {
            if (fromLegend === void 0) { fromLegend = false; }
            item = this.results.find(function (d) {
                if (fromLegend) {
                    return d.label === item.name;
                }
                else {
                    return d.name === item.name;
                }
            });
            var idx = this.activeEntries.findIndex(function (d) {
                return d.name === item.name && d.value === item.value && d.series === item.series;
            });
            this.activeEntries.splice(idx, 1);
            this.activeEntries = __spreadArray([], __read(this.activeEntries));
            this.deactivate.emit({ value: item, entries: this.activeEntries });
        };
        return BarVerticalComponent;
    }(BaseChartComponent));
    BarVerticalComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'ngx-charts-bar-vertical',
                    template: "\n    <ngx-charts-chart\n      [view]=\"[width, height]\"\n      [showLegend]=\"legend\"\n      [legendOptions]=\"legendOptions\"\n      [activeEntries]=\"activeEntries\"\n      [animations]=\"animations\"\n      (legendLabelClick)=\"onClick($event)\"\n      (legendLabelActivate)=\"onActivate($event, true)\"\n      (legendLabelDeactivate)=\"onDeactivate($event, true)\"\n    >\n      <svg:g [attr.transform]=\"transform\" class=\"bar-chart chart\">\n        <svg:g\n          ngx-charts-x-axis\n          *ngIf=\"xAxis\"\n          [xScale]=\"xScale\"\n          [dims]=\"dims\"\n          [showGridLines]=\"showGridLines\"\n          [showLabel]=\"showXAxisLabel\"\n          [labelText]=\"xAxisLabel\"\n          [trimTicks]=\"trimXAxisTicks\"\n          [rotateTicks]=\"rotateXAxisTicks\"\n          [maxTickLength]=\"maxXAxisTickLength\"\n          [tickFormatting]=\"xAxisTickFormatting\"\n          [ticks]=\"xAxisTicks\"\n          [xAxisOffset]=\"dataLabelMaxHeight.negative\"\n          (dimensionsChanged)=\"updateXAxisHeight($event)\"\n        ></svg:g>\n        <svg:g\n          ngx-charts-y-axis\n          *ngIf=\"yAxis\"\n          [yScale]=\"yScale\"\n          [dims]=\"dims\"\n          [showGridLines]=\"showGridLines\"\n          [showLabel]=\"showYAxisLabel\"\n          [labelText]=\"yAxisLabel\"\n          [trimTicks]=\"trimYAxisTicks\"\n          [maxTickLength]=\"maxYAxisTickLength\"\n          [tickFormatting]=\"yAxisTickFormatting\"\n          [ticks]=\"yAxisTicks\"\n          (dimensionsChanged)=\"updateYAxisWidth($event)\"\n        ></svg:g>\n        <svg:g\n          ngx-charts-series-vertical\n          [xScale]=\"xScale\"\n          [yScale]=\"yScale\"\n          [colors]=\"colors\"\n          [series]=\"results\"\n          [dims]=\"dims\"\n          [gradient]=\"gradient\"\n          [tooltipDisabled]=\"tooltipDisabled\"\n          [tooltipTemplate]=\"tooltipTemplate\"\n          [showDataLabel]=\"showDataLabel\"\n          [dataLabelFormatting]=\"dataLabelFormatting\"\n          [activeEntries]=\"activeEntries\"\n          [roundEdges]=\"roundEdges\"\n          [animations]=\"animations\"\n          [noBarWhenZero]=\"noBarWhenZero\"\n          (activate)=\"onActivate($event)\"\n          (deactivate)=\"onDeactivate($event)\"\n          (select)=\"onClick($event)\"\n          (dataLabelHeightChanged)=\"onDataLabelMaxHeightChanged($event)\"\n        ></svg:g>\n      </svg:g>\n    </ngx-charts-chart>\n  ",
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    encapsulation: core.ViewEncapsulation.None,
                    styles: [".ngx-charts-outer{-webkit-animation:chartFadeIn linear .6s;animation:chartFadeIn linear .6s}@-webkit-keyframes chartFadeIn{0%{opacity:0}20%{opacity:0}to{opacity:1}}@keyframes chartFadeIn{0%{opacity:0}20%{opacity:0}to{opacity:1}}.ngx-charts{float:left;overflow:visible}.ngx-charts .circle,.ngx-charts .cell,.ngx-charts .bar,.ngx-charts .arc{cursor:pointer}.ngx-charts .bar.active,.ngx-charts .bar:hover,.ngx-charts .cell.active,.ngx-charts .cell:hover,.ngx-charts .arc.active,.ngx-charts .arc:hover,.ngx-charts .card.active,.ngx-charts .card:hover{opacity:.8;transition:opacity .1s ease-in-out}.ngx-charts .bar:focus,.ngx-charts .cell:focus,.ngx-charts .arc:focus,.ngx-charts .card:focus{outline:none}.ngx-charts .bar.hidden,.ngx-charts .cell.hidden,.ngx-charts .arc.hidden,.ngx-charts .card.hidden{display:none}.ngx-charts g:focus{outline:none}.ngx-charts .line-series.inactive,.ngx-charts .line-series-range.inactive,.ngx-charts .polar-series-path.inactive,.ngx-charts .polar-series-area.inactive,.ngx-charts .area-series.inactive{transition:opacity .1s ease-in-out;opacity:.2}.ngx-charts .line-highlight{display:none}.ngx-charts .line-highlight.active{display:block}.ngx-charts .area{opacity:.6}.ngx-charts .circle:hover{cursor:pointer}.ngx-charts .label{font-size:12px;font-weight:normal}.ngx-charts .tooltip-anchor{fill:#000}.ngx-charts .gridline-path{stroke:#ddd;stroke-width:1;fill:none}.ngx-charts .refline-path{stroke:#a8b2c7;stroke-width:1;stroke-dasharray:5;stroke-dashoffset:5}.ngx-charts .refline-label{font-size:9px}.ngx-charts .reference-area{fill-opacity:.05;fill:#000}.ngx-charts .gridline-path-dotted{stroke:#ddd;stroke-width:1;fill:none;stroke-dasharray:1,20;stroke-dashoffset:3}.ngx-charts .grid-panel rect{fill:none}.ngx-charts .grid-panel.odd rect{fill:#0000000d}\n"]
                },] }
    ];
    BarVerticalComponent.propDecorators = {
        legend: [{ type: core.Input }],
        legendTitle: [{ type: core.Input }],
        legendPosition: [{ type: core.Input }],
        xAxis: [{ type: core.Input }],
        yAxis: [{ type: core.Input }],
        showXAxisLabel: [{ type: core.Input }],
        showYAxisLabel: [{ type: core.Input }],
        xAxisLabel: [{ type: core.Input }],
        yAxisLabel: [{ type: core.Input }],
        tooltipDisabled: [{ type: core.Input }],
        gradient: [{ type: core.Input }],
        showGridLines: [{ type: core.Input }],
        activeEntries: [{ type: core.Input }],
        schemeType: [{ type: core.Input }],
        trimXAxisTicks: [{ type: core.Input }],
        trimYAxisTicks: [{ type: core.Input }],
        rotateXAxisTicks: [{ type: core.Input }],
        maxXAxisTickLength: [{ type: core.Input }],
        maxYAxisTickLength: [{ type: core.Input }],
        xAxisTickFormatting: [{ type: core.Input }],
        yAxisTickFormatting: [{ type: core.Input }],
        xAxisTicks: [{ type: core.Input }],
        yAxisTicks: [{ type: core.Input }],
        barPadding: [{ type: core.Input }],
        roundDomains: [{ type: core.Input }],
        roundEdges: [{ type: core.Input }],
        yScaleMax: [{ type: core.Input }],
        yScaleMin: [{ type: core.Input }],
        showDataLabel: [{ type: core.Input }],
        dataLabelFormatting: [{ type: core.Input }],
        noBarWhenZero: [{ type: core.Input }],
        activate: [{ type: core.Output }],
        deactivate: [{ type: core.Output }],
        tooltipTemplate: [{ type: core.ContentChild, args: ['tooltipTemplate',] }]
    };

    var BarVertical2DComponent = /** @class */ (function (_super) {
        __extends(BarVertical2DComponent, _super);
        function BarVertical2DComponent() {
            var _this = _super.apply(this, __spreadArray([], __read(arguments))) || this;
            _this.legend = false;
            _this.legendTitle = 'Legend';
            _this.legendPosition = exports.LegendPosition.Right;
            _this.tooltipDisabled = false;
            _this.scaleType = exports.ScaleType.Ordinal;
            _this.showGridLines = true;
            _this.activeEntries = [];
            _this.trimXAxisTicks = true;
            _this.trimYAxisTicks = true;
            _this.rotateXAxisTicks = true;
            _this.maxXAxisTickLength = 16;
            _this.maxYAxisTickLength = 16;
            _this.groupPadding = 16;
            _this.barPadding = 8;
            _this.roundDomains = false;
            _this.roundEdges = true;
            _this.showDataLabel = false;
            _this.noBarWhenZero = true;
            _this.activate = new core.EventEmitter();
            _this.deactivate = new core.EventEmitter();
            _this.margin = [10, 20, 10, 20];
            _this.xAxisHeight = 0;
            _this.yAxisWidth = 0;
            _this.dataLabelMaxHeight = { negative: 0, positive: 0 };
            _this.barOrientation = exports.BarOrientation;
            _this.trackBy = function (index, item) {
                return item.name;
            };
            return _this;
        }
        BarVertical2DComponent.prototype.update = function () {
            _super.prototype.update.call(this);
            if (!this.showDataLabel) {
                this.dataLabelMaxHeight = { negative: 0, positive: 0 };
            }
            this.margin = [10 + this.dataLabelMaxHeight.positive, 20, 10 + this.dataLabelMaxHeight.negative, 20];
            this.dims = calculateViewDimensions({
                width: this.width,
                height: this.height,
                margins: this.margin,
                showXAxis: this.xAxis,
                showYAxis: this.yAxis,
                xAxisHeight: this.xAxisHeight,
                yAxisWidth: this.yAxisWidth,
                showXLabel: this.showXAxisLabel,
                showYLabel: this.showYAxisLabel,
                showLegend: this.legend,
                legendType: this.schemeType,
                legendPosition: this.legendPosition
            });
            if (this.showDataLabel) {
                this.dims.height -= this.dataLabelMaxHeight.negative;
            }
            this.formatDates();
            this.groupDomain = this.getGroupDomain();
            this.innerDomain = this.getInnerDomain();
            this.valueDomain = this.getValueDomain();
            this.groupScale = this.getGroupScale();
            this.innerScale = this.getInnerScale();
            this.valueScale = this.getValueScale();
            this.setColors();
            this.legendOptions = this.getLegendOptions();
            this.transform = "translate(" + this.dims.xOffset + " , " + (this.margin[0] + this.dataLabelMaxHeight.negative) + ")";
        };
        BarVertical2DComponent.prototype.onDataLabelMaxHeightChanged = function (event, groupIndex) {
            var _this = this;
            if (event.size.negative) {
                this.dataLabelMaxHeight.negative = Math.max(this.dataLabelMaxHeight.negative, event.size.height);
            }
            else {
                this.dataLabelMaxHeight.positive = Math.max(this.dataLabelMaxHeight.positive, event.size.height);
            }
            if (groupIndex === this.results.length - 1) {
                setTimeout(function () { return _this.update(); });
            }
        };
        BarVertical2DComponent.prototype.getGroupScale = function () {
            var spacing = this.groupDomain.length / (this.dims.height / this.groupPadding + 1);
            return d3Scale.scaleBand()
                .rangeRound([0, this.dims.width])
                .paddingInner(spacing)
                .paddingOuter(spacing / 2)
                .domain(this.groupDomain);
        };
        BarVertical2DComponent.prototype.getInnerScale = function () {
            var width = this.groupScale.bandwidth();
            var spacing = this.innerDomain.length / (width / this.barPadding + 1);
            return d3Scale.scaleBand().rangeRound([0, width]).paddingInner(spacing).domain(this.innerDomain);
        };
        BarVertical2DComponent.prototype.getValueScale = function () {
            var scale = d3Scale.scaleLinear().range([this.dims.height, 0]).domain(this.valueDomain);
            return this.roundDomains ? scale.nice() : scale;
        };
        BarVertical2DComponent.prototype.getGroupDomain = function () {
            var e_1, _a;
            var domain = [];
            try {
                for (var _b = __values(this.results), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var group = _c.value;
                    if (!domain.includes(group.label)) {
                        domain.push(group.label);
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return domain;
        };
        BarVertical2DComponent.prototype.getInnerDomain = function () {
            var e_2, _a, e_3, _b;
            var domain = [];
            try {
                for (var _c = __values(this.results), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var group = _d.value;
                    try {
                        for (var _e = (e_3 = void 0, __values(group.series)), _f = _e.next(); !_f.done; _f = _e.next()) {
                            var d = _f.value;
                            if (!domain.includes(d.label)) {
                                domain.push(d.label);
                            }
                        }
                    }
                    catch (e_3_1) { e_3 = { error: e_3_1 }; }
                    finally {
                        try {
                            if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                        }
                        finally { if (e_3) throw e_3.error; }
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                }
                finally { if (e_2) throw e_2.error; }
            }
            return domain;
        };
        BarVertical2DComponent.prototype.getValueDomain = function () {
            var e_4, _a, e_5, _b;
            var domain = [];
            try {
                for (var _c = __values(this.results), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var group = _d.value;
                    try {
                        for (var _e = (e_5 = void 0, __values(group.series)), _f = _e.next(); !_f.done; _f = _e.next()) {
                            var d = _f.value;
                            if (!domain.includes(d.value)) {
                                domain.push(d.value);
                            }
                        }
                    }
                    catch (e_5_1) { e_5 = { error: e_5_1 }; }
                    finally {
                        try {
                            if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                        }
                        finally { if (e_5) throw e_5.error; }
                    }
                }
            }
            catch (e_4_1) { e_4 = { error: e_4_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                }
                finally { if (e_4) throw e_4.error; }
            }
            var min = Math.min.apply(Math, __spreadArray([0], __read(domain)));
            var max = this.yScaleMax ? Math.max.apply(Math, __spreadArray([this.yScaleMax], __read(domain))) : Math.max.apply(Math, __spreadArray([0], __read(domain)));
            return [min, max];
        };
        BarVertical2DComponent.prototype.groupTransform = function (group) {
            return "translate(" + this.groupScale(group.label) + ", 0)";
        };
        BarVertical2DComponent.prototype.onClick = function (data, group) {
            if (group) {
                data.series = group.name;
            }
            this.select.emit(data);
        };
        BarVertical2DComponent.prototype.setColors = function () {
            var domain;
            if (this.schemeType === exports.ScaleType.Ordinal) {
                domain = this.innerDomain;
            }
            else {
                domain = this.valueDomain;
            }
            this.colors = new ColorHelper(this.scheme, this.schemeType, domain, this.customColors);
        };
        BarVertical2DComponent.prototype.getLegendOptions = function () {
            var opts = {
                scaleType: this.schemeType,
                colors: undefined,
                domain: [],
                title: undefined,
                position: this.legendPosition
            };
            if (opts.scaleType === exports.ScaleType.Ordinal) {
                opts.domain = this.innerDomain;
                opts.colors = this.colors;
                opts.title = this.legendTitle;
            }
            else {
                opts.domain = this.valueDomain;
                opts.colors = this.colors.scale;
            }
            return opts;
        };
        BarVertical2DComponent.prototype.updateYAxisWidth = function (_a) {
            var width = _a.width;
            this.yAxisWidth = width;
            this.update();
        };
        BarVertical2DComponent.prototype.updateXAxisHeight = function (_a) {
            var height = _a.height;
            this.xAxisHeight = height;
            this.update();
        };
        BarVertical2DComponent.prototype.onActivate = function (event, group, fromLegend) {
            if (fromLegend === void 0) { fromLegend = false; }
            var item = Object.assign({}, event);
            if (group) {
                item.series = group.name;
            }
            var items = this.results
                .map(function (g) { return g.series; })
                .flat()
                .filter(function (i) {
                if (fromLegend) {
                    return i.label === item.name;
                }
                else {
                    return i.name === item.name && i.series === item.series;
                }
            });
            this.activeEntries = __spreadArray([], __read(items));
            this.activate.emit({ value: item, entries: this.activeEntries });
        };
        BarVertical2DComponent.prototype.onDeactivate = function (event, group, fromLegend) {
            if (fromLegend === void 0) { fromLegend = false; }
            var item = Object.assign({}, event);
            if (group) {
                item.series = group.name;
            }
            this.activeEntries = this.activeEntries.filter(function (i) {
                if (fromLegend) {
                    return i.label !== item.name;
                }
                else {
                    return !(i.name === item.name && i.series === item.series);
                }
            });
            this.deactivate.emit({ value: item, entries: this.activeEntries });
        };
        return BarVertical2DComponent;
    }(BaseChartComponent));
    BarVertical2DComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'ngx-charts-bar-vertical-2d',
                    template: "\n    <ngx-charts-chart\n      [view]=\"[width, height]\"\n      [showLegend]=\"legend\"\n      [legendOptions]=\"legendOptions\"\n      [activeEntries]=\"activeEntries\"\n      [animations]=\"animations\"\n      (legendLabelActivate)=\"onActivate($event, undefined, true)\"\n      (legendLabelDeactivate)=\"onDeactivate($event, undefined, true)\"\n      (legendLabelClick)=\"onClick($event)\"\n    >\n      <svg:g [attr.transform]=\"transform\" class=\"bar-chart chart\">\n        <svg:g\n          ngx-charts-grid-panel-series\n          [xScale]=\"groupScale\"\n          [yScale]=\"valueScale\"\n          [data]=\"results\"\n          [dims]=\"dims\"\n          [orient]=\"barOrientation.Vertical\"\n        ></svg:g>\n        <svg:g\n          ngx-charts-x-axis\n          *ngIf=\"xAxis\"\n          [xScale]=\"groupScale\"\n          [dims]=\"dims\"\n          [showLabel]=\"showXAxisLabel\"\n          [labelText]=\"xAxisLabel\"\n          [trimTicks]=\"trimXAxisTicks\"\n          [rotateTicks]=\"rotateXAxisTicks\"\n          [maxTickLength]=\"maxXAxisTickLength\"\n          [tickFormatting]=\"xAxisTickFormatting\"\n          [ticks]=\"xAxisTicks\"\n          [xAxisOffset]=\"dataLabelMaxHeight.negative\"\n          (dimensionsChanged)=\"updateXAxisHeight($event)\"\n        ></svg:g>\n        <svg:g\n          ngx-charts-y-axis\n          *ngIf=\"yAxis\"\n          [yScale]=\"valueScale\"\n          [dims]=\"dims\"\n          [showGridLines]=\"showGridLines\"\n          [showLabel]=\"showYAxisLabel\"\n          [labelText]=\"yAxisLabel\"\n          [trimTicks]=\"trimYAxisTicks\"\n          [maxTickLength]=\"maxYAxisTickLength\"\n          [tickFormatting]=\"yAxisTickFormatting\"\n          [ticks]=\"yAxisTicks\"\n          (dimensionsChanged)=\"updateYAxisWidth($event)\"\n        ></svg:g>\n        <svg:g\n          ngx-charts-series-vertical\n          *ngFor=\"let group of results; let index = index; trackBy: trackBy\"\n          [@animationState]=\"'active'\"\n          [attr.transform]=\"groupTransform(group)\"\n          [activeEntries]=\"activeEntries\"\n          [xScale]=\"innerScale\"\n          [yScale]=\"valueScale\"\n          [colors]=\"colors\"\n          [series]=\"group.series\"\n          [dims]=\"dims\"\n          [gradient]=\"gradient\"\n          [tooltipDisabled]=\"tooltipDisabled\"\n          [tooltipTemplate]=\"tooltipTemplate\"\n          [showDataLabel]=\"showDataLabel\"\n          [dataLabelFormatting]=\"dataLabelFormatting\"\n          [seriesName]=\"group.name\"\n          [roundEdges]=\"roundEdges\"\n          [animations]=\"animations\"\n          [noBarWhenZero]=\"noBarWhenZero\"\n          (select)=\"onClick($event, group)\"\n          (activate)=\"onActivate($event, group)\"\n          (deactivate)=\"onDeactivate($event, group)\"\n          (dataLabelHeightChanged)=\"onDataLabelMaxHeightChanged($event, index)\"\n        />\n      </svg:g>\n    </ngx-charts-chart>\n  ",
                    encapsulation: core.ViewEncapsulation.None,
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    animations: [
                        animations.trigger('animationState', [
                            animations.transition(':leave', [
                                animations.style({
                                    opacity: 1,
                                    transform: '*'
                                }),
                                animations.animate(500, animations.style({ opacity: 0, transform: 'scale(0)' }))
                            ])
                        ])
                    ],
                    styles: [".ngx-charts-outer{-webkit-animation:chartFadeIn linear .6s;animation:chartFadeIn linear .6s}@-webkit-keyframes chartFadeIn{0%{opacity:0}20%{opacity:0}to{opacity:1}}@keyframes chartFadeIn{0%{opacity:0}20%{opacity:0}to{opacity:1}}.ngx-charts{float:left;overflow:visible}.ngx-charts .circle,.ngx-charts .cell,.ngx-charts .bar,.ngx-charts .arc{cursor:pointer}.ngx-charts .bar.active,.ngx-charts .bar:hover,.ngx-charts .cell.active,.ngx-charts .cell:hover,.ngx-charts .arc.active,.ngx-charts .arc:hover,.ngx-charts .card.active,.ngx-charts .card:hover{opacity:.8;transition:opacity .1s ease-in-out}.ngx-charts .bar:focus,.ngx-charts .cell:focus,.ngx-charts .arc:focus,.ngx-charts .card:focus{outline:none}.ngx-charts .bar.hidden,.ngx-charts .cell.hidden,.ngx-charts .arc.hidden,.ngx-charts .card.hidden{display:none}.ngx-charts g:focus{outline:none}.ngx-charts .line-series.inactive,.ngx-charts .line-series-range.inactive,.ngx-charts .polar-series-path.inactive,.ngx-charts .polar-series-area.inactive,.ngx-charts .area-series.inactive{transition:opacity .1s ease-in-out;opacity:.2}.ngx-charts .line-highlight{display:none}.ngx-charts .line-highlight.active{display:block}.ngx-charts .area{opacity:.6}.ngx-charts .circle:hover{cursor:pointer}.ngx-charts .label{font-size:12px;font-weight:normal}.ngx-charts .tooltip-anchor{fill:#000}.ngx-charts .gridline-path{stroke:#ddd;stroke-width:1;fill:none}.ngx-charts .refline-path{stroke:#a8b2c7;stroke-width:1;stroke-dasharray:5;stroke-dashoffset:5}.ngx-charts .refline-label{font-size:9px}.ngx-charts .reference-area{fill-opacity:.05;fill:#000}.ngx-charts .gridline-path-dotted{stroke:#ddd;stroke-width:1;fill:none;stroke-dasharray:1,20;stroke-dashoffset:3}.ngx-charts .grid-panel rect{fill:none}.ngx-charts .grid-panel.odd rect{fill:#0000000d}\n"]
                },] }
    ];
    BarVertical2DComponent.propDecorators = {
        legend: [{ type: core.Input }],
        legendTitle: [{ type: core.Input }],
        legendPosition: [{ type: core.Input }],
        xAxis: [{ type: core.Input }],
        yAxis: [{ type: core.Input }],
        showXAxisLabel: [{ type: core.Input }],
        showYAxisLabel: [{ type: core.Input }],
        xAxisLabel: [{ type: core.Input }],
        yAxisLabel: [{ type: core.Input }],
        tooltipDisabled: [{ type: core.Input }],
        scaleType: [{ type: core.Input }],
        gradient: [{ type: core.Input }],
        showGridLines: [{ type: core.Input }],
        activeEntries: [{ type: core.Input }],
        schemeType: [{ type: core.Input }],
        trimXAxisTicks: [{ type: core.Input }],
        trimYAxisTicks: [{ type: core.Input }],
        rotateXAxisTicks: [{ type: core.Input }],
        maxXAxisTickLength: [{ type: core.Input }],
        maxYAxisTickLength: [{ type: core.Input }],
        xAxisTickFormatting: [{ type: core.Input }],
        yAxisTickFormatting: [{ type: core.Input }],
        xAxisTicks: [{ type: core.Input }],
        yAxisTicks: [{ type: core.Input }],
        groupPadding: [{ type: core.Input }],
        barPadding: [{ type: core.Input }],
        roundDomains: [{ type: core.Input }],
        roundEdges: [{ type: core.Input }],
        yScaleMax: [{ type: core.Input }],
        showDataLabel: [{ type: core.Input }],
        dataLabelFormatting: [{ type: core.Input }],
        noBarWhenZero: [{ type: core.Input }],
        activate: [{ type: core.Output }],
        deactivate: [{ type: core.Output }],
        tooltipTemplate: [{ type: core.ContentChild, args: ['tooltipTemplate',] }]
    };

    var BarVerticalNormalizedComponent = /** @class */ (function (_super) {
        __extends(BarVerticalNormalizedComponent, _super);
        function BarVerticalNormalizedComponent() {
            var _this = _super.apply(this, __spreadArray([], __read(arguments))) || this;
            _this.legend = false;
            _this.legendTitle = 'Legend';
            _this.legendPosition = exports.LegendPosition.Right;
            _this.tooltipDisabled = false;
            _this.showGridLines = true;
            _this.activeEntries = [];
            _this.trimXAxisTicks = true;
            _this.trimYAxisTicks = true;
            _this.rotateXAxisTicks = true;
            _this.maxXAxisTickLength = 16;
            _this.maxYAxisTickLength = 16;
            _this.barPadding = 8;
            _this.roundDomains = false;
            _this.noBarWhenZero = true;
            _this.activate = new core.EventEmitter();
            _this.deactivate = new core.EventEmitter();
            _this.valueDomain = [0, 100];
            _this.margin = [10, 20, 10, 20];
            _this.xAxisHeight = 0;
            _this.yAxisWidth = 0;
            _this.barChartType = exports.BarChartType;
            _this.trackBy = function (index, item) {
                return item.name;
            };
            return _this;
        }
        BarVerticalNormalizedComponent.prototype.update = function () {
            _super.prototype.update.call(this);
            this.dims = calculateViewDimensions({
                width: this.width,
                height: this.height,
                margins: this.margin,
                showXAxis: this.xAxis,
                showYAxis: this.yAxis,
                xAxisHeight: this.xAxisHeight,
                yAxisWidth: this.yAxisWidth,
                showXLabel: this.showXAxisLabel,
                showYLabel: this.showYAxisLabel,
                showLegend: this.legend,
                legendType: this.schemeType,
                legendPosition: this.legendPosition
            });
            this.formatDates();
            this.groupDomain = this.getGroupDomain();
            this.innerDomain = this.getInnerDomain();
            this.xScale = this.getXScale();
            this.yScale = this.getYScale();
            this.setColors();
            this.legendOptions = this.getLegendOptions();
            this.transform = "translate(" + this.dims.xOffset + " , " + this.margin[0] + ")";
        };
        BarVerticalNormalizedComponent.prototype.getGroupDomain = function () {
            var e_1, _a;
            var domain = [];
            try {
                for (var _b = __values(this.results), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var group = _c.value;
                    if (!domain.includes(group.label)) {
                        domain.push(group.label);
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return domain;
        };
        BarVerticalNormalizedComponent.prototype.getInnerDomain = function () {
            var e_2, _a, e_3, _b;
            var domain = [];
            try {
                for (var _c = __values(this.results), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var group = _d.value;
                    try {
                        for (var _e = (e_3 = void 0, __values(group.series)), _f = _e.next(); !_f.done; _f = _e.next()) {
                            var d = _f.value;
                            if (!domain.includes(d.label)) {
                                domain.push(d.label);
                            }
                        }
                    }
                    catch (e_3_1) { e_3 = { error: e_3_1 }; }
                    finally {
                        try {
                            if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                        }
                        finally { if (e_3) throw e_3.error; }
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                }
                finally { if (e_2) throw e_2.error; }
            }
            return domain;
        };
        BarVerticalNormalizedComponent.prototype.getXScale = function () {
            var spacing = this.groupDomain.length / (this.dims.width / this.barPadding + 1);
            return d3Scale.scaleBand().rangeRound([0, this.dims.width]).paddingInner(spacing).domain(this.groupDomain);
        };
        BarVerticalNormalizedComponent.prototype.getYScale = function () {
            var scale = d3Scale.scaleLinear().range([this.dims.height, 0]).domain(this.valueDomain);
            return this.roundDomains ? scale.nice() : scale;
        };
        BarVerticalNormalizedComponent.prototype.groupTransform = function (group) {
            return "translate(" + this.xScale(group.name) + ", 0)";
        };
        BarVerticalNormalizedComponent.prototype.onClick = function (data, group) {
            if (group) {
                data.series = group.name;
            }
            this.select.emit(data);
        };
        BarVerticalNormalizedComponent.prototype.setColors = function () {
            var domain;
            if (this.schemeType === exports.ScaleType.Ordinal) {
                domain = this.innerDomain;
            }
            else {
                domain = this.valueDomain;
            }
            this.colors = new ColorHelper(this.scheme, this.schemeType, domain, this.customColors);
        };
        BarVerticalNormalizedComponent.prototype.getLegendOptions = function () {
            var opts = {
                scaleType: this.schemeType,
                colors: undefined,
                domain: [],
                title: undefined,
                position: this.legendPosition
            };
            if (opts.scaleType === exports.ScaleType.Ordinal) {
                opts.domain = this.innerDomain;
                opts.colors = this.colors;
                opts.title = this.legendTitle;
            }
            else {
                opts.domain = this.valueDomain;
                opts.colors = this.colors.scale;
            }
            return opts;
        };
        BarVerticalNormalizedComponent.prototype.updateYAxisWidth = function (_a) {
            var width = _a.width;
            this.yAxisWidth = width;
            this.update();
        };
        BarVerticalNormalizedComponent.prototype.updateXAxisHeight = function (_a) {
            var height = _a.height;
            this.xAxisHeight = height;
            this.update();
        };
        BarVerticalNormalizedComponent.prototype.onActivate = function (event, group, fromLegend) {
            if (fromLegend === void 0) { fromLegend = false; }
            var item = Object.assign({}, event);
            if (group) {
                item.series = group.name;
            }
            var items = this.results
                .map(function (g) { return g.series; })
                .flat()
                .filter(function (i) {
                if (fromLegend) {
                    return i.label === item.name;
                }
                else {
                    return i.name === item.name && i.series === item.series;
                }
            });
            this.activeEntries = __spreadArray([], __read(items));
            this.activate.emit({ value: item, entries: this.activeEntries });
        };
        BarVerticalNormalizedComponent.prototype.onDeactivate = function (event, group, fromLegend) {
            if (fromLegend === void 0) { fromLegend = false; }
            var item = Object.assign({}, event);
            if (group) {
                item.series = group.name;
            }
            this.activeEntries = this.activeEntries.filter(function (i) {
                if (fromLegend) {
                    return i.label !== item.name;
                }
                else {
                    return !(i.name === item.name && i.series === item.series);
                }
            });
            this.deactivate.emit({ value: item, entries: this.activeEntries });
        };
        return BarVerticalNormalizedComponent;
    }(BaseChartComponent));
    BarVerticalNormalizedComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'ngx-charts-bar-vertical-normalized',
                    template: "\n    <ngx-charts-chart\n      [view]=\"[width, height]\"\n      [showLegend]=\"legend\"\n      [legendOptions]=\"legendOptions\"\n      [activeEntries]=\"activeEntries\"\n      [animations]=\"animations\"\n      (legendLabelActivate)=\"onActivate($event, undefined, true)\"\n      (legendLabelDeactivate)=\"onDeactivate($event, undefined, true)\"\n      (legendLabelClick)=\"onClick($event)\"\n    >\n      <svg:g [attr.transform]=\"transform\" class=\"bar-chart chart\">\n        <svg:g\n          ngx-charts-x-axis\n          *ngIf=\"xAxis\"\n          [xScale]=\"xScale\"\n          [dims]=\"dims\"\n          [showLabel]=\"showXAxisLabel\"\n          [labelText]=\"xAxisLabel\"\n          [trimTicks]=\"trimXAxisTicks\"\n          [rotateTicks]=\"rotateXAxisTicks\"\n          [maxTickLength]=\"maxXAxisTickLength\"\n          [tickFormatting]=\"xAxisTickFormatting\"\n          [ticks]=\"xAxisTicks\"\n          (dimensionsChanged)=\"updateXAxisHeight($event)\"\n        ></svg:g>\n        <svg:g\n          ngx-charts-y-axis\n          *ngIf=\"yAxis\"\n          [yScale]=\"yScale\"\n          [dims]=\"dims\"\n          [showGridLines]=\"showGridLines\"\n          [showLabel]=\"showYAxisLabel\"\n          [labelText]=\"yAxisLabel\"\n          [trimTicks]=\"trimYAxisTicks\"\n          [maxTickLength]=\"maxYAxisTickLength\"\n          [tickFormatting]=\"yAxisTickFormatting\"\n          [ticks]=\"yAxisTicks\"\n          (dimensionsChanged)=\"updateYAxisWidth($event)\"\n        ></svg:g>\n        <svg:g\n          *ngFor=\"let group of results; trackBy: trackBy\"\n          [@animationState]=\"'active'\"\n          [attr.transform]=\"groupTransform(group)\"\n        >\n          <svg:g\n            ngx-charts-series-vertical\n            [type]=\"barChartType.Normalized\"\n            [xScale]=\"xScale\"\n            [yScale]=\"yScale\"\n            [activeEntries]=\"activeEntries\"\n            [colors]=\"colors\"\n            [series]=\"group.series\"\n            [dims]=\"dims\"\n            [gradient]=\"gradient\"\n            [tooltipDisabled]=\"tooltipDisabled\"\n            [tooltipTemplate]=\"tooltipTemplate\"\n            [seriesName]=\"group.name\"\n            [animations]=\"animations\"\n            [noBarWhenZero]=\"noBarWhenZero\"\n            (select)=\"onClick($event, group)\"\n            (activate)=\"onActivate($event, group)\"\n            (deactivate)=\"onDeactivate($event, group)\"\n          />\n        </svg:g>\n      </svg:g>\n    </ngx-charts-chart>\n  ",
                    encapsulation: core.ViewEncapsulation.None,
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    animations: [
                        animations.trigger('animationState', [
                            animations.transition(':leave', [
                                animations.style({
                                    opacity: 1,
                                    transform: '*'
                                }),
                                animations.animate(500, animations.style({ opacity: 0, transform: 'scale(0)' }))
                            ])
                        ])
                    ],
                    styles: [".ngx-charts-outer{-webkit-animation:chartFadeIn linear .6s;animation:chartFadeIn linear .6s}@-webkit-keyframes chartFadeIn{0%{opacity:0}20%{opacity:0}to{opacity:1}}@keyframes chartFadeIn{0%{opacity:0}20%{opacity:0}to{opacity:1}}.ngx-charts{float:left;overflow:visible}.ngx-charts .circle,.ngx-charts .cell,.ngx-charts .bar,.ngx-charts .arc{cursor:pointer}.ngx-charts .bar.active,.ngx-charts .bar:hover,.ngx-charts .cell.active,.ngx-charts .cell:hover,.ngx-charts .arc.active,.ngx-charts .arc:hover,.ngx-charts .card.active,.ngx-charts .card:hover{opacity:.8;transition:opacity .1s ease-in-out}.ngx-charts .bar:focus,.ngx-charts .cell:focus,.ngx-charts .arc:focus,.ngx-charts .card:focus{outline:none}.ngx-charts .bar.hidden,.ngx-charts .cell.hidden,.ngx-charts .arc.hidden,.ngx-charts .card.hidden{display:none}.ngx-charts g:focus{outline:none}.ngx-charts .line-series.inactive,.ngx-charts .line-series-range.inactive,.ngx-charts .polar-series-path.inactive,.ngx-charts .polar-series-area.inactive,.ngx-charts .area-series.inactive{transition:opacity .1s ease-in-out;opacity:.2}.ngx-charts .line-highlight{display:none}.ngx-charts .line-highlight.active{display:block}.ngx-charts .area{opacity:.6}.ngx-charts .circle:hover{cursor:pointer}.ngx-charts .label{font-size:12px;font-weight:normal}.ngx-charts .tooltip-anchor{fill:#000}.ngx-charts .gridline-path{stroke:#ddd;stroke-width:1;fill:none}.ngx-charts .refline-path{stroke:#a8b2c7;stroke-width:1;stroke-dasharray:5;stroke-dashoffset:5}.ngx-charts .refline-label{font-size:9px}.ngx-charts .reference-area{fill-opacity:.05;fill:#000}.ngx-charts .gridline-path-dotted{stroke:#ddd;stroke-width:1;fill:none;stroke-dasharray:1,20;stroke-dashoffset:3}.ngx-charts .grid-panel rect{fill:none}.ngx-charts .grid-panel.odd rect{fill:#0000000d}\n"]
                },] }
    ];
    BarVerticalNormalizedComponent.propDecorators = {
        legend: [{ type: core.Input }],
        legendTitle: [{ type: core.Input }],
        legendPosition: [{ type: core.Input }],
        xAxis: [{ type: core.Input }],
        yAxis: [{ type: core.Input }],
        showXAxisLabel: [{ type: core.Input }],
        showYAxisLabel: [{ type: core.Input }],
        xAxisLabel: [{ type: core.Input }],
        yAxisLabel: [{ type: core.Input }],
        tooltipDisabled: [{ type: core.Input }],
        gradient: [{ type: core.Input }],
        showGridLines: [{ type: core.Input }],
        activeEntries: [{ type: core.Input }],
        schemeType: [{ type: core.Input }],
        trimXAxisTicks: [{ type: core.Input }],
        trimYAxisTicks: [{ type: core.Input }],
        rotateXAxisTicks: [{ type: core.Input }],
        maxXAxisTickLength: [{ type: core.Input }],
        maxYAxisTickLength: [{ type: core.Input }],
        xAxisTickFormatting: [{ type: core.Input }],
        yAxisTickFormatting: [{ type: core.Input }],
        xAxisTicks: [{ type: core.Input }],
        yAxisTicks: [{ type: core.Input }],
        barPadding: [{ type: core.Input }],
        roundDomains: [{ type: core.Input }],
        noBarWhenZero: [{ type: core.Input }],
        activate: [{ type: core.Output }],
        deactivate: [{ type: core.Output }],
        tooltipTemplate: [{ type: core.ContentChild, args: ['tooltipTemplate',] }]
    };

    var BarVerticalStackedComponent = /** @class */ (function (_super) {
        __extends(BarVerticalStackedComponent, _super);
        function BarVerticalStackedComponent() {
            var _this = _super.apply(this, __spreadArray([], __read(arguments))) || this;
            _this.legend = false;
            _this.legendTitle = 'Legend';
            _this.legendPosition = exports.LegendPosition.Right;
            _this.tooltipDisabled = false;
            _this.showGridLines = true;
            _this.activeEntries = [];
            _this.trimXAxisTicks = true;
            _this.trimYAxisTicks = true;
            _this.rotateXAxisTicks = true;
            _this.maxXAxisTickLength = 16;
            _this.maxYAxisTickLength = 16;
            _this.barPadding = 8;
            _this.roundDomains = false;
            _this.showDataLabel = false;
            _this.noBarWhenZero = true;
            _this.activate = new core.EventEmitter();
            _this.deactivate = new core.EventEmitter();
            _this.margin = [10, 20, 10, 20];
            _this.xAxisHeight = 0;
            _this.yAxisWidth = 0;
            _this.dataLabelMaxHeight = { negative: 0, positive: 0 };
            _this.barChartType = exports.BarChartType;
            _this.trackBy = function (index, item) {
                return item.name;
            };
            return _this;
        }
        BarVerticalStackedComponent.prototype.update = function () {
            _super.prototype.update.call(this);
            if (!this.showDataLabel) {
                this.dataLabelMaxHeight = { negative: 0, positive: 0 };
            }
            this.margin = [10 + this.dataLabelMaxHeight.positive, 20, 10 + this.dataLabelMaxHeight.negative, 20];
            this.dims = calculateViewDimensions({
                width: this.width,
                height: this.height,
                margins: this.margin,
                showXAxis: this.xAxis,
                showYAxis: this.yAxis,
                xAxisHeight: this.xAxisHeight,
                yAxisWidth: this.yAxisWidth,
                showXLabel: this.showXAxisLabel,
                showYLabel: this.showYAxisLabel,
                showLegend: this.legend,
                legendType: this.schemeType,
                legendPosition: this.legendPosition
            });
            if (this.showDataLabel) {
                this.dims.height -= this.dataLabelMaxHeight.negative;
            }
            this.formatDates();
            this.groupDomain = this.getGroupDomain();
            this.innerDomain = this.getInnerDomain();
            this.valueDomain = this.getValueDomain();
            this.xScale = this.getXScale();
            this.yScale = this.getYScale();
            this.setColors();
            this.legendOptions = this.getLegendOptions();
            this.transform = "translate(" + this.dims.xOffset + " , " + (this.margin[0] + this.dataLabelMaxHeight.negative) + ")";
        };
        BarVerticalStackedComponent.prototype.getGroupDomain = function () {
            var e_1, _a;
            var domain = [];
            try {
                for (var _b = __values(this.results), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var group = _c.value;
                    if (!domain.includes(group.label)) {
                        domain.push(group.label);
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return domain;
        };
        BarVerticalStackedComponent.prototype.getInnerDomain = function () {
            var e_2, _a, e_3, _b;
            var domain = [];
            try {
                for (var _c = __values(this.results), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var group = _d.value;
                    try {
                        for (var _e = (e_3 = void 0, __values(group.series)), _f = _e.next(); !_f.done; _f = _e.next()) {
                            var d = _f.value;
                            if (!domain.includes(d.label)) {
                                domain.push(d.label);
                            }
                        }
                    }
                    catch (e_3_1) { e_3 = { error: e_3_1 }; }
                    finally {
                        try {
                            if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                        }
                        finally { if (e_3) throw e_3.error; }
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                }
                finally { if (e_2) throw e_2.error; }
            }
            return domain;
        };
        BarVerticalStackedComponent.prototype.getValueDomain = function () {
            var e_4, _a, e_5, _b;
            var domain = [];
            var smallest = 0;
            var biggest = 0;
            try {
                for (var _c = __values(this.results), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var group = _d.value;
                    var smallestSum = 0;
                    var biggestSum = 0;
                    try {
                        for (var _e = (e_5 = void 0, __values(group.series)), _f = _e.next(); !_f.done; _f = _e.next()) {
                            var d = _f.value;
                            if (d.value < 0) {
                                smallestSum += d.value;
                            }
                            else {
                                biggestSum += d.value;
                            }
                            smallest = d.value < smallest ? d.value : smallest;
                            biggest = d.value > biggest ? d.value : biggest;
                        }
                    }
                    catch (e_5_1) { e_5 = { error: e_5_1 }; }
                    finally {
                        try {
                            if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                        }
                        finally { if (e_5) throw e_5.error; }
                    }
                    domain.push(smallestSum);
                    domain.push(biggestSum);
                }
            }
            catch (e_4_1) { e_4 = { error: e_4_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                }
                finally { if (e_4) throw e_4.error; }
            }
            domain.push(smallest);
            domain.push(biggest);
            var min = Math.min.apply(Math, __spreadArray([0], __read(domain)));
            var max = this.yScaleMax ? Math.max.apply(Math, __spreadArray([this.yScaleMax], __read(domain))) : Math.max.apply(Math, __spreadArray([], __read(domain)));
            return [min, max];
        };
        BarVerticalStackedComponent.prototype.getXScale = function () {
            var spacing = this.groupDomain.length / (this.dims.width / this.barPadding + 1);
            return d3Scale.scaleBand().rangeRound([0, this.dims.width]).paddingInner(spacing).domain(this.groupDomain);
        };
        BarVerticalStackedComponent.prototype.getYScale = function () {
            var scale = d3Scale.scaleLinear().range([this.dims.height, 0]).domain(this.valueDomain);
            return this.roundDomains ? scale.nice() : scale;
        };
        BarVerticalStackedComponent.prototype.onDataLabelMaxHeightChanged = function (event, groupIndex) {
            var _this = this;
            if (event.size.negative) {
                this.dataLabelMaxHeight.negative = Math.max(this.dataLabelMaxHeight.negative, event.size.height);
            }
            else {
                this.dataLabelMaxHeight.positive = Math.max(this.dataLabelMaxHeight.positive, event.size.height);
            }
            if (groupIndex === this.results.length - 1) {
                setTimeout(function () { return _this.update(); });
            }
        };
        BarVerticalStackedComponent.prototype.groupTransform = function (group) {
            return "translate(" + (this.xScale(group.name) || 0) + ", 0)";
        };
        BarVerticalStackedComponent.prototype.onClick = function (data, group) {
            if (group) {
                data.series = group.name;
            }
            this.select.emit(data);
        };
        BarVerticalStackedComponent.prototype.setColors = function () {
            var domain;
            if (this.schemeType === exports.ScaleType.Ordinal) {
                domain = this.innerDomain;
            }
            else {
                domain = this.valueDomain;
            }
            this.colors = new ColorHelper(this.scheme, this.schemeType, domain, this.customColors);
        };
        BarVerticalStackedComponent.prototype.getLegendOptions = function () {
            var opts = {
                scaleType: this.schemeType,
                colors: undefined,
                domain: [],
                title: undefined,
                position: this.legendPosition
            };
            if (opts.scaleType === exports.ScaleType.Ordinal) {
                opts.domain = this.innerDomain;
                opts.colors = this.colors;
                opts.title = this.legendTitle;
            }
            else {
                opts.domain = this.valueDomain;
                opts.colors = this.colors.scale;
            }
            return opts;
        };
        BarVerticalStackedComponent.prototype.updateYAxisWidth = function (_a) {
            var width = _a.width;
            this.yAxisWidth = width;
            this.update();
        };
        BarVerticalStackedComponent.prototype.updateXAxisHeight = function (_a) {
            var height = _a.height;
            this.xAxisHeight = height;
            this.update();
        };
        BarVerticalStackedComponent.prototype.onActivate = function (event, group, fromLegend) {
            if (fromLegend === void 0) { fromLegend = false; }
            var item = Object.assign({}, event);
            if (group) {
                item.series = group.name;
            }
            var items = this.results
                .map(function (g) { return g.series; })
                .flat()
                .filter(function (i) {
                if (fromLegend) {
                    return i.label === item.name;
                }
                else {
                    return i.name === item.name && i.series === item.series;
                }
            });
            this.activeEntries = __spreadArray([], __read(items));
            this.activate.emit({ value: item, entries: this.activeEntries });
        };
        BarVerticalStackedComponent.prototype.onDeactivate = function (event, group, fromLegend) {
            if (fromLegend === void 0) { fromLegend = false; }
            var item = Object.assign({}, event);
            if (group) {
                item.series = group.name;
            }
            this.activeEntries = this.activeEntries.filter(function (i) {
                if (fromLegend) {
                    return i.label !== item.name;
                }
                else {
                    return !(i.name === item.name && i.series === item.series);
                }
            });
            this.deactivate.emit({ value: item, entries: this.activeEntries });
        };
        return BarVerticalStackedComponent;
    }(BaseChartComponent));
    BarVerticalStackedComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'ngx-charts-bar-vertical-stacked',
                    template: "\n    <ngx-charts-chart\n      [view]=\"[width, height]\"\n      [showLegend]=\"legend\"\n      [legendOptions]=\"legendOptions\"\n      [activeEntries]=\"activeEntries\"\n      [animations]=\"animations\"\n      (legendLabelActivate)=\"onActivate($event, undefined, true)\"\n      (legendLabelDeactivate)=\"onDeactivate($event, undefined, true)\"\n      (legendLabelClick)=\"onClick($event)\"\n    >\n      <svg:g [attr.transform]=\"transform\" class=\"bar-chart chart\">\n        <svg:g\n          ngx-charts-x-axis\n          *ngIf=\"xAxis\"\n          [xScale]=\"xScale\"\n          [dims]=\"dims\"\n          [showLabel]=\"showXAxisLabel\"\n          [labelText]=\"xAxisLabel\"\n          [trimTicks]=\"trimXAxisTicks\"\n          [rotateTicks]=\"rotateXAxisTicks\"\n          [maxTickLength]=\"maxXAxisTickLength\"\n          [tickFormatting]=\"xAxisTickFormatting\"\n          [ticks]=\"xAxisTicks\"\n          [xAxisOffset]=\"dataLabelMaxHeight.negative\"\n          (dimensionsChanged)=\"updateXAxisHeight($event)\"\n        ></svg:g>\n        <svg:g\n          ngx-charts-y-axis\n          *ngIf=\"yAxis\"\n          [yScale]=\"yScale\"\n          [dims]=\"dims\"\n          [showGridLines]=\"showGridLines\"\n          [showLabel]=\"showYAxisLabel\"\n          [labelText]=\"yAxisLabel\"\n          [trimTicks]=\"trimYAxisTicks\"\n          [maxTickLength]=\"maxYAxisTickLength\"\n          [tickFormatting]=\"yAxisTickFormatting\"\n          [ticks]=\"yAxisTicks\"\n          (dimensionsChanged)=\"updateYAxisWidth($event)\"\n        ></svg:g>\n        <svg:g\n          *ngFor=\"let group of results; let index = index; trackBy: trackBy\"\n          [@animationState]=\"'active'\"\n          [attr.transform]=\"groupTransform(group)\"\n        >\n          <svg:g\n            ngx-charts-series-vertical\n            [type]=\"barChartType.Stacked\"\n            [xScale]=\"xScale\"\n            [yScale]=\"yScale\"\n            [activeEntries]=\"activeEntries\"\n            [colors]=\"colors\"\n            [series]=\"group.series\"\n            [dims]=\"dims\"\n            [gradient]=\"gradient\"\n            [tooltipDisabled]=\"tooltipDisabled\"\n            [tooltipTemplate]=\"tooltipTemplate\"\n            [showDataLabel]=\"showDataLabel\"\n            [dataLabelFormatting]=\"dataLabelFormatting\"\n            [seriesName]=\"group.name\"\n            [animations]=\"animations\"\n            [noBarWhenZero]=\"noBarWhenZero\"\n            (select)=\"onClick($event, group)\"\n            (activate)=\"onActivate($event, group)\"\n            (deactivate)=\"onDeactivate($event, group)\"\n            (dataLabelHeightChanged)=\"onDataLabelMaxHeightChanged($event, index)\"\n          />\n        </svg:g>\n      </svg:g>\n    </ngx-charts-chart>\n  ",
                    encapsulation: core.ViewEncapsulation.None,
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    animations: [
                        animations.trigger('animationState', [
                            animations.transition(':leave', [
                                animations.style({
                                    opacity: 1,
                                    transform: '*'
                                }),
                                animations.animate(500, animations.style({ opacity: 0, transform: 'scale(0)' }))
                            ])
                        ])
                    ],
                    styles: [".ngx-charts-outer{-webkit-animation:chartFadeIn linear .6s;animation:chartFadeIn linear .6s}@-webkit-keyframes chartFadeIn{0%{opacity:0}20%{opacity:0}to{opacity:1}}@keyframes chartFadeIn{0%{opacity:0}20%{opacity:0}to{opacity:1}}.ngx-charts{float:left;overflow:visible}.ngx-charts .circle,.ngx-charts .cell,.ngx-charts .bar,.ngx-charts .arc{cursor:pointer}.ngx-charts .bar.active,.ngx-charts .bar:hover,.ngx-charts .cell.active,.ngx-charts .cell:hover,.ngx-charts .arc.active,.ngx-charts .arc:hover,.ngx-charts .card.active,.ngx-charts .card:hover{opacity:.8;transition:opacity .1s ease-in-out}.ngx-charts .bar:focus,.ngx-charts .cell:focus,.ngx-charts .arc:focus,.ngx-charts .card:focus{outline:none}.ngx-charts .bar.hidden,.ngx-charts .cell.hidden,.ngx-charts .arc.hidden,.ngx-charts .card.hidden{display:none}.ngx-charts g:focus{outline:none}.ngx-charts .line-series.inactive,.ngx-charts .line-series-range.inactive,.ngx-charts .polar-series-path.inactive,.ngx-charts .polar-series-area.inactive,.ngx-charts .area-series.inactive{transition:opacity .1s ease-in-out;opacity:.2}.ngx-charts .line-highlight{display:none}.ngx-charts .line-highlight.active{display:block}.ngx-charts .area{opacity:.6}.ngx-charts .circle:hover{cursor:pointer}.ngx-charts .label{font-size:12px;font-weight:normal}.ngx-charts .tooltip-anchor{fill:#000}.ngx-charts .gridline-path{stroke:#ddd;stroke-width:1;fill:none}.ngx-charts .refline-path{stroke:#a8b2c7;stroke-width:1;stroke-dasharray:5;stroke-dashoffset:5}.ngx-charts .refline-label{font-size:9px}.ngx-charts .reference-area{fill-opacity:.05;fill:#000}.ngx-charts .gridline-path-dotted{stroke:#ddd;stroke-width:1;fill:none;stroke-dasharray:1,20;stroke-dashoffset:3}.ngx-charts .grid-panel rect{fill:none}.ngx-charts .grid-panel.odd rect{fill:#0000000d}\n"]
                },] }
    ];
    BarVerticalStackedComponent.propDecorators = {
        legend: [{ type: core.Input }],
        legendTitle: [{ type: core.Input }],
        legendPosition: [{ type: core.Input }],
        xAxis: [{ type: core.Input }],
        yAxis: [{ type: core.Input }],
        showXAxisLabel: [{ type: core.Input }],
        showYAxisLabel: [{ type: core.Input }],
        xAxisLabel: [{ type: core.Input }],
        yAxisLabel: [{ type: core.Input }],
        tooltipDisabled: [{ type: core.Input }],
        gradient: [{ type: core.Input }],
        showGridLines: [{ type: core.Input }],
        activeEntries: [{ type: core.Input }],
        schemeType: [{ type: core.Input }],
        trimXAxisTicks: [{ type: core.Input }],
        trimYAxisTicks: [{ type: core.Input }],
        rotateXAxisTicks: [{ type: core.Input }],
        maxXAxisTickLength: [{ type: core.Input }],
        maxYAxisTickLength: [{ type: core.Input }],
        xAxisTickFormatting: [{ type: core.Input }],
        yAxisTickFormatting: [{ type: core.Input }],
        xAxisTicks: [{ type: core.Input }],
        yAxisTicks: [{ type: core.Input }],
        barPadding: [{ type: core.Input }],
        roundDomains: [{ type: core.Input }],
        yScaleMax: [{ type: core.Input }],
        showDataLabel: [{ type: core.Input }],
        dataLabelFormatting: [{ type: core.Input }],
        noBarWhenZero: [{ type: core.Input }],
        activate: [{ type: core.Output }],
        deactivate: [{ type: core.Output }],
        tooltipTemplate: [{ type: core.ContentChild, args: ['tooltipTemplate',] }]
    };

    exports.D0Types = void 0;
    (function (D0Types) {
        D0Types["positive"] = "positive";
        D0Types["negative"] = "negative";
    })(exports.D0Types || (exports.D0Types = {}));

    var SeriesHorizontal = /** @class */ (function () {
        function SeriesHorizontal() {
            this.type = exports.BarChartType.Standard;
            this.tooltipDisabled = false;
            this.animations = true;
            this.showDataLabel = false;
            this.noBarWhenZero = true;
            this.select = new core.EventEmitter();
            this.activate = new core.EventEmitter();
            this.deactivate = new core.EventEmitter();
            this.dataLabelWidthChanged = new core.EventEmitter();
            this.barsForDataLabels = [];
            this.barOrientation = exports.BarOrientation;
        }
        SeriesHorizontal.prototype.ngOnChanges = function (changes) {
            this.update();
        };
        SeriesHorizontal.prototype.update = function () {
            var _b;
            var _this = this;
            this.updateTooltipSettings();
            var d0 = (_b = {},
                _b[exports.D0Types.positive] = 0,
                _b[exports.D0Types.negative] = 0,
                _b);
            var d0Type;
            d0Type = exports.D0Types.positive;
            var total;
            if (this.type === exports.BarChartType.Normalized) {
                total = this.series.map(function (d) { return d.value; }).reduce(function (sum, d) { return sum + d; }, 0);
            }
            var xScaleMin = Math.max(this.xScale.domain()[0], 0);
            this.bars = this.series.map(function (d) {
                var value = d.value;
                var label = _this.getLabel(d);
                var formattedLabel = formatLabel(label);
                var roundEdges = _this.roundEdges;
                d0Type = value > 0 ? exports.D0Types.positive : exports.D0Types.negative;
                var bar = {
                    value: value,
                    label: label,
                    roundEdges: roundEdges,
                    data: d,
                    formattedLabel: formattedLabel
                };
                bar.height = _this.yScale.bandwidth();
                if (_this.type === exports.BarChartType.Standard) {
                    bar.width = Math.abs(_this.xScale(value) - _this.xScale(xScaleMin));
                    if (value < 0) {
                        bar.x = _this.xScale(value);
                    }
                    else {
                        bar.x = _this.xScale(xScaleMin);
                    }
                    bar.y = _this.yScale(label);
                }
                else if (_this.type === exports.BarChartType.Stacked) {
                    var offset0 = d0[d0Type];
                    var offset1 = offset0 + value;
                    d0[d0Type] += value;
                    bar.width = _this.xScale(offset1) - _this.xScale(offset0);
                    bar.x = _this.xScale(offset0);
                    bar.y = 0;
                    bar.offset0 = offset0;
                    bar.offset1 = offset1;
                }
                else if (_this.type === exports.BarChartType.Normalized) {
                    var offset0 = d0[d0Type];
                    var offset1 = offset0 + value;
                    d0[d0Type] += value;
                    if (total > 0) {
                        offset0 = (offset0 * 100) / total;
                        offset1 = (offset1 * 100) / total;
                    }
                    else {
                        offset0 = 0;
                        offset1 = 0;
                    }
                    bar.width = _this.xScale(offset1) - _this.xScale(offset0);
                    bar.x = _this.xScale(offset0);
                    bar.y = 0;
                    bar.offset0 = offset0;
                    bar.offset1 = offset1;
                    value = (offset1 - offset0).toFixed(2) + '%';
                }
                if (_this.colors.scaleType === exports.ScaleType.Ordinal) {
                    bar.color = _this.colors.getColor(label);
                }
                else {
                    if (_this.type === exports.BarChartType.Standard) {
                        bar.color = _this.colors.getColor(value);
                        bar.gradientStops = _this.colors.getLinearGradientStops(value);
                    }
                    else {
                        bar.color = _this.colors.getColor(bar.offset1);
                        bar.gradientStops = _this.colors.getLinearGradientStops(bar.offset1, bar.offset0);
                    }
                }
                var tooltipLabel = formattedLabel;
                bar.ariaLabel = formattedLabel + ' ' + value.toLocaleString();
                if (_this.seriesName !== null && _this.seriesName !== undefined) {
                    tooltipLabel = _this.seriesName + " \u2022 " + formattedLabel;
                    bar.data.series = _this.seriesName;
                    bar.ariaLabel = _this.seriesName + ' ' + bar.ariaLabel;
                }
                bar.tooltipText = _this.tooltipDisabled
                    ? undefined
                    : "\n        <span class=\"tooltip-label\">" + escapeLabel(tooltipLabel) + "</span>\n        <span class=\"tooltip-val\">" + (_this.dataLabelFormatting ? _this.dataLabelFormatting(value) : value.toLocaleString()) + "</span>\n      ";
                return bar;
            });
            this.updateDataLabels();
        };
        SeriesHorizontal.prototype.updateDataLabels = function () {
            var _this = this;
            if (this.type === exports.BarChartType.Stacked) {
                this.barsForDataLabels = [];
                var section = {};
                section.series = this.seriesName;
                var totalPositive = this.series.map(function (d) { return d.value; }).reduce(function (sum, d) { return (d > 0 ? sum + d : sum); }, 0);
                var totalNegative = this.series.map(function (d) { return d.value; }).reduce(function (sum, d) { return (d < 0 ? sum + d : sum); }, 0);
                section.total = totalPositive + totalNegative;
                section.x = 0;
                section.y = 0;
                // if total is positive then we show it on the right, otherwise on the left
                if (section.total > 0) {
                    section.width = this.xScale(totalPositive);
                }
                else {
                    section.width = this.xScale(totalNegative);
                }
                section.height = this.yScale.bandwidth();
                this.barsForDataLabels.push(section);
            }
            else {
                this.barsForDataLabels = this.series.map(function (d) {
                    var _a;
                    var section = {};
                    section.series = (_a = _this.seriesName) !== null && _a !== void 0 ? _a : d.label;
                    section.total = d.value;
                    section.x = _this.xScale(0);
                    section.y = _this.yScale(d.label);
                    section.width = _this.xScale(section.total) - _this.xScale(0);
                    section.height = _this.yScale.bandwidth();
                    return section;
                });
            }
        };
        SeriesHorizontal.prototype.updateTooltipSettings = function () {
            this.tooltipPlacement = this.tooltipDisabled ? undefined : exports.PlacementTypes.Top;
            this.tooltipType = this.tooltipDisabled ? undefined : exports.StyleTypes.tooltip;
        };
        SeriesHorizontal.prototype.isActive = function (entry) {
            if (!this.activeEntries)
                return false;
            var item = this.activeEntries.find(function (active) {
                return entry.name === active.name && entry.value === active.value;
            });
            return item !== undefined;
        };
        SeriesHorizontal.prototype.getLabel = function (dataItem) {
            if (dataItem.label) {
                return dataItem.label;
            }
            return dataItem.name;
        };
        SeriesHorizontal.prototype.trackBy = function (index, bar) {
            return bar.label;
        };
        SeriesHorizontal.prototype.trackDataLabelBy = function (index, barLabel) {
            return index + '#' + barLabel.series + '#' + barLabel.total;
        };
        SeriesHorizontal.prototype.click = function (data) {
            this.select.emit(data);
        };
        return SeriesHorizontal;
    }());
    SeriesHorizontal.decorators = [
        { type: core.Component, args: [{
                    selector: 'g[ngx-charts-series-horizontal]',
                    template: "\n    <svg:g\n      ngx-charts-bar\n      *ngFor=\"let bar of bars; trackBy: trackBy\"\n      [@animationState]=\"'active'\"\n      [width]=\"bar.width\"\n      [height]=\"bar.height\"\n      [x]=\"bar.x\"\n      [y]=\"bar.y\"\n      [fill]=\"bar.color\"\n      [stops]=\"bar.gradientStops\"\n      [data]=\"bar.data\"\n      [orientation]=\"barOrientation.Horizontal\"\n      [roundEdges]=\"bar.roundEdges\"\n      (select)=\"click($event)\"\n      [gradient]=\"gradient\"\n      [isActive]=\"isActive(bar.data)\"\n      [ariaLabel]=\"bar.ariaLabel\"\n      [animations]=\"animations\"\n      (activate)=\"activate.emit($event)\"\n      (deactivate)=\"deactivate.emit($event)\"\n      ngx-tooltip\n      [tooltipDisabled]=\"tooltipDisabled\"\n      [tooltipPlacement]=\"tooltipPlacement\"\n      [tooltipType]=\"tooltipType\"\n      [tooltipTitle]=\"tooltipTemplate ? undefined : bar.tooltipText\"\n      [tooltipTemplate]=\"tooltipTemplate\"\n      [tooltipContext]=\"bar.data\"\n      [noBarWhenZero]=\"noBarWhenZero\"\n    ></svg:g>\n    <svg:g *ngIf=\"showDataLabel\">\n      <svg:g\n        ngx-charts-bar-label\n        *ngFor=\"let b of barsForDataLabels; let i = index; trackBy: trackDataLabelBy\"\n        [barX]=\"b.x\"\n        [barY]=\"b.y\"\n        [barWidth]=\"b.width\"\n        [barHeight]=\"b.height\"\n        [value]=\"b.total\"\n        [valueFormatting]=\"dataLabelFormatting\"\n        [orientation]=\"barOrientation.Horizontal\"\n        (dimensionsChanged)=\"dataLabelWidthChanged.emit({ size: $event, index: i })\"\n      />\n    </svg:g>\n  ",
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    animations: [
                        animations.trigger('animationState', [
                            animations.transition(':leave', [
                                animations.style({
                                    opacity: 1
                                }),
                                animations.animate(500, animations.style({ opacity: 0 }))
                            ])
                        ])
                    ]
                },] }
    ];
    SeriesHorizontal.propDecorators = {
        dims: [{ type: core.Input }],
        type: [{ type: core.Input }],
        series: [{ type: core.Input }],
        xScale: [{ type: core.Input }],
        yScale: [{ type: core.Input }],
        colors: [{ type: core.Input }],
        tooltipDisabled: [{ type: core.Input }],
        gradient: [{ type: core.Input }],
        activeEntries: [{ type: core.Input }],
        seriesName: [{ type: core.Input }],
        tooltipTemplate: [{ type: core.Input }],
        roundEdges: [{ type: core.Input }],
        animations: [{ type: core.Input }],
        showDataLabel: [{ type: core.Input }],
        dataLabelFormatting: [{ type: core.Input }],
        noBarWhenZero: [{ type: core.Input }],
        select: [{ type: core.Output }],
        activate: [{ type: core.Output }],
        deactivate: [{ type: core.Output }],
        dataLabelWidthChanged: [{ type: core.Output }]
    };

    var SeriesVerticalComponent = /** @class */ (function () {
        function SeriesVerticalComponent() {
            this.type = exports.BarChartType.Standard;
            this.tooltipDisabled = false;
            this.animations = true;
            this.showDataLabel = false;
            this.noBarWhenZero = true;
            this.select = new core.EventEmitter();
            this.activate = new core.EventEmitter();
            this.deactivate = new core.EventEmitter();
            this.dataLabelHeightChanged = new core.EventEmitter();
            this.barsForDataLabels = [];
            this.barOrientation = exports.BarOrientation;
        }
        SeriesVerticalComponent.prototype.ngOnChanges = function (changes) {
            this.update();
        };
        SeriesVerticalComponent.prototype.update = function () {
            var _b;
            var _this = this;
            this.updateTooltipSettings();
            var width;
            if (this.series.length) {
                width = this.xScale.bandwidth();
            }
            width = Math.round(width);
            var yScaleMin = Math.max(this.yScale.domain()[0], 0);
            var d0 = (_b = {},
                _b[exports.D0Types.positive] = 0,
                _b[exports.D0Types.negative] = 0,
                _b);
            var d0Type = exports.D0Types.positive;
            var total;
            if (this.type === exports.BarChartType.Normalized) {
                total = this.series.map(function (d) { return d.value; }).reduce(function (sum, d) { return sum + d; }, 0);
            }
            this.bars = this.series.map(function (d, index) {
                var value = d.value;
                var label = _this.getLabel(d);
                var formattedLabel = formatLabel(label);
                var roundEdges = _this.roundEdges;
                d0Type = value > 0 ? exports.D0Types.positive : exports.D0Types.negative;
                var bar = {
                    value: value,
                    label: label,
                    roundEdges: roundEdges,
                    data: d,
                    width: width,
                    formattedLabel: formattedLabel,
                    height: 0,
                    x: 0,
                    y: 0
                };
                if (_this.type === exports.BarChartType.Standard) {
                    bar.height = Math.abs(_this.yScale(value) - _this.yScale(yScaleMin));
                    bar.x = _this.xScale(label);
                    if (value < 0) {
                        bar.y = _this.yScale(0);
                    }
                    else {
                        bar.y = _this.yScale(value);
                    }
                }
                else if (_this.type === exports.BarChartType.Stacked) {
                    var offset0 = d0[d0Type];
                    var offset1 = offset0 + value;
                    d0[d0Type] += value;
                    bar.height = _this.yScale(offset0) - _this.yScale(offset1);
                    bar.x = 0;
                    bar.y = _this.yScale(offset1);
                    bar.offset0 = offset0;
                    bar.offset1 = offset1;
                }
                else if (_this.type === exports.BarChartType.Normalized) {
                    var offset0 = d0[d0Type];
                    var offset1 = offset0 + value;
                    d0[d0Type] += value;
                    if (total > 0) {
                        offset0 = (offset0 * 100) / total;
                        offset1 = (offset1 * 100) / total;
                    }
                    else {
                        offset0 = 0;
                        offset1 = 0;
                    }
                    bar.height = _this.yScale(offset0) - _this.yScale(offset1);
                    bar.x = 0;
                    bar.y = _this.yScale(offset1);
                    bar.offset0 = offset0;
                    bar.offset1 = offset1;
                    value = (offset1 - offset0).toFixed(2) + '%';
                }
                if (_this.colors.scaleType === exports.ScaleType.Ordinal) {
                    bar.color = _this.colors.getColor(label);
                }
                else {
                    if (_this.type === exports.BarChartType.Standard) {
                        bar.color = _this.colors.getColor(value);
                        bar.gradientStops = _this.colors.getLinearGradientStops(value);
                    }
                    else {
                        bar.color = _this.colors.getColor(bar.offset1);
                        bar.gradientStops = _this.colors.getLinearGradientStops(bar.offset1, bar.offset0);
                    }
                }
                var tooltipLabel = formattedLabel;
                bar.ariaLabel = formattedLabel + ' ' + value.toLocaleString();
                if (_this.seriesName !== null && _this.seriesName !== undefined) {
                    tooltipLabel = _this.seriesName + " \u2022 " + formattedLabel;
                    bar.data.series = _this.seriesName;
                    bar.ariaLabel = _this.seriesName + ' ' + bar.ariaLabel;
                }
                bar.tooltipText = _this.tooltipDisabled
                    ? undefined
                    : "\n        <span class=\"tooltip-label\">" + escapeLabel(tooltipLabel) + "</span>\n        <span class=\"tooltip-val\">" + (_this.dataLabelFormatting ? _this.dataLabelFormatting(value) : value.toLocaleString()) + "</span>\n      ";
                return bar;
            });
            this.updateDataLabels();
        };
        SeriesVerticalComponent.prototype.updateDataLabels = function () {
            var _this = this;
            if (this.type === exports.BarChartType.Stacked) {
                this.barsForDataLabels = [];
                var section = {};
                section.series = this.seriesName;
                var totalPositive = this.series.map(function (d) { return d.value; }).reduce(function (sum, d) { return (d > 0 ? sum + d : sum); }, 0);
                var totalNegative = this.series.map(function (d) { return d.value; }).reduce(function (sum, d) { return (d < 0 ? sum + d : sum); }, 0);
                section.total = totalPositive + totalNegative;
                section.x = 0;
                section.y = 0;
                if (section.total > 0) {
                    section.height = this.yScale(totalPositive);
                }
                else {
                    section.height = this.yScale(totalNegative);
                }
                section.width = this.xScale.bandwidth();
                this.barsForDataLabels.push(section);
            }
            else {
                this.barsForDataLabels = this.series.map(function (d) {
                    var _a;
                    var section = {};
                    section.series = (_a = _this.seriesName) !== null && _a !== void 0 ? _a : d.label;
                    section.total = d.value;
                    section.x = _this.xScale(d.label);
                    section.y = _this.yScale(0);
                    section.height = _this.yScale(section.total) - _this.yScale(0);
                    section.width = _this.xScale.bandwidth();
                    return section;
                });
            }
        };
        SeriesVerticalComponent.prototype.updateTooltipSettings = function () {
            this.tooltipPlacement = this.tooltipDisabled ? undefined : exports.PlacementTypes.Top;
            this.tooltipType = this.tooltipDisabled ? undefined : exports.StyleTypes.tooltip;
        };
        SeriesVerticalComponent.prototype.isActive = function (entry) {
            if (!this.activeEntries)
                return false;
            var item = this.activeEntries.find(function (active) {
                return entry.name === active.name && entry.value === active.value;
            });
            return item !== undefined;
        };
        SeriesVerticalComponent.prototype.onClick = function (data) {
            this.select.emit(data);
        };
        SeriesVerticalComponent.prototype.getLabel = function (dataItem) {
            if (dataItem.label) {
                return dataItem.label;
            }
            return dataItem.name;
        };
        SeriesVerticalComponent.prototype.trackBy = function (index, bar) {
            return bar.label;
        };
        SeriesVerticalComponent.prototype.trackDataLabelBy = function (index, barLabel) {
            return index + '#' + barLabel.series + '#' + barLabel.total;
        };
        return SeriesVerticalComponent;
    }());
    SeriesVerticalComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'g[ngx-charts-series-vertical]',
                    template: "\n    <svg:g\n      ngx-charts-bar\n      *ngFor=\"let bar of bars; trackBy: trackBy\"\n      [@animationState]=\"'active'\"\n      [@.disabled]=\"!animations\"\n      [width]=\"bar.width\"\n      [height]=\"bar.height\"\n      [x]=\"bar.x\"\n      [y]=\"bar.y\"\n      [fill]=\"bar.color\"\n      [stops]=\"bar.gradientStops\"\n      [data]=\"bar.data\"\n      [orientation]=\"barOrientation.Vertical\"\n      [roundEdges]=\"bar.roundEdges\"\n      [gradient]=\"gradient\"\n      [ariaLabel]=\"bar.ariaLabel\"\n      [isActive]=\"isActive(bar.data)\"\n      (select)=\"onClick($event)\"\n      (activate)=\"activate.emit($event)\"\n      (deactivate)=\"deactivate.emit($event)\"\n      ngx-tooltip\n      [tooltipDisabled]=\"tooltipDisabled\"\n      [tooltipPlacement]=\"tooltipPlacement\"\n      [tooltipType]=\"tooltipType\"\n      [tooltipTitle]=\"tooltipTemplate ? undefined : bar.tooltipText\"\n      [tooltipTemplate]=\"tooltipTemplate\"\n      [tooltipContext]=\"bar.data\"\n      [noBarWhenZero]=\"noBarWhenZero\"\n      [animations]=\"animations\"\n    ></svg:g>\n    <svg:g *ngIf=\"showDataLabel\">\n      <svg:g\n        ngx-charts-bar-label\n        *ngFor=\"let b of barsForDataLabels; let i = index; trackBy: trackDataLabelBy\"\n        [barX]=\"b.x\"\n        [barY]=\"b.y\"\n        [barWidth]=\"b.width\"\n        [barHeight]=\"b.height\"\n        [value]=\"b.total\"\n        [valueFormatting]=\"dataLabelFormatting\"\n        [orientation]=\"barOrientation.Vertical\"\n        (dimensionsChanged)=\"dataLabelHeightChanged.emit({ size: $event, index: i })\"\n      />\n    </svg:g>\n  ",
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    animations: [
                        animations.trigger('animationState', [
                            animations.transition(':leave', [
                                animations.style({
                                    opacity: 1
                                }),
                                animations.animate(500, animations.style({ opacity: 0 }))
                            ])
                        ])
                    ]
                },] }
    ];
    SeriesVerticalComponent.propDecorators = {
        dims: [{ type: core.Input }],
        type: [{ type: core.Input }],
        series: [{ type: core.Input }],
        xScale: [{ type: core.Input }],
        yScale: [{ type: core.Input }],
        colors: [{ type: core.Input }],
        gradient: [{ type: core.Input }],
        activeEntries: [{ type: core.Input }],
        seriesName: [{ type: core.Input }],
        tooltipDisabled: [{ type: core.Input }],
        tooltipTemplate: [{ type: core.Input }],
        roundEdges: [{ type: core.Input }],
        animations: [{ type: core.Input }],
        showDataLabel: [{ type: core.Input }],
        dataLabelFormatting: [{ type: core.Input }],
        noBarWhenZero: [{ type: core.Input }],
        select: [{ type: core.Output }],
        activate: [{ type: core.Output }],
        deactivate: [{ type: core.Output }],
        dataLabelHeightChanged: [{ type: core.Output }]
    };

    var BarLabelComponent = /** @class */ (function () {
        function BarLabelComponent(element) {
            this.dimensionsChanged = new core.EventEmitter();
            this.horizontalPadding = 2;
            this.verticalPadding = 5;
            this.element = element.nativeElement;
        }
        BarLabelComponent.prototype.ngOnChanges = function (changes) {
            this.update();
        };
        BarLabelComponent.prototype.getSize = function () {
            var h = this.element.getBoundingClientRect().height;
            var w = this.element.getBoundingClientRect().width;
            return { height: h, width: w, negative: this.value < 0 };
        };
        BarLabelComponent.prototype.ngAfterViewInit = function () {
            this.dimensionsChanged.emit(this.getSize());
        };
        BarLabelComponent.prototype.update = function () {
            if (this.valueFormatting) {
                this.formatedValue = this.valueFormatting(this.value);
            }
            else {
                this.formatedValue = formatLabel(this.value);
            }
            if (this.orientation === 'horizontal') {
                this.x = this.barX + this.barWidth;
                // if the value is negative then it's on the left of the x0.
                // we need to put the data label in front of the bar
                if (this.value < 0) {
                    this.x = this.x - this.horizontalPadding;
                    this.textAnchor = 'end';
                }
                else {
                    this.x = this.x + this.horizontalPadding;
                    this.textAnchor = 'start';
                }
                this.y = this.barY + this.barHeight / 2;
            }
            else {
                // orientation must be "vertical"
                this.x = this.barX + this.barWidth / 2;
                this.y = this.barY + this.barHeight;
                if (this.value < 0) {
                    this.y = this.y + this.verticalPadding;
                    this.textAnchor = 'end';
                }
                else {
                    this.y = this.y - this.verticalPadding;
                    this.textAnchor = 'start';
                }
                this.transform = "rotate(-45, " + this.x + " , " + this.y + ")";
            }
        };
        return BarLabelComponent;
    }());
    BarLabelComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'g[ngx-charts-bar-label]',
                    template: "\n    <svg:text\n      class=\"textDataLabel\"\n      alignment-baseline=\"middle\"\n      [attr.text-anchor]=\"textAnchor\"\n      [attr.transform]=\"transform\"\n      [attr.x]=\"x\"\n      [attr.y]=\"y\"\n    >\n      {{ formatedValue }}\n    </svg:text>\n  ",
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    styles: [".textDataLabel{font-size:11px}\n"]
                },] }
    ];
    BarLabelComponent.ctorParameters = function () { return [
        { type: core.ElementRef }
    ]; };
    BarLabelComponent.propDecorators = {
        value: [{ type: core.Input }],
        valueFormatting: [{ type: core.Input }],
        barX: [{ type: core.Input }],
        barY: [{ type: core.Input }],
        barWidth: [{ type: core.Input }],
        barHeight: [{ type: core.Input }],
        orientation: [{ type: core.Input }],
        dimensionsChanged: [{ type: core.Output }]
    };

    var BarChartModule = /** @class */ (function () {
        function BarChartModule() {
        }
        return BarChartModule;
    }());
    BarChartModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [ChartCommonModule],
                    declarations: [
                        BarComponent,
                        BarHorizontalComponent,
                        BarHorizontal2DComponent,
                        BarHorizontalNormalizedComponent,
                        BarHorizontalStackedComponent,
                        BarVerticalComponent,
                        BarVertical2DComponent,
                        BarVerticalNormalizedComponent,
                        BarVerticalStackedComponent,
                        BarLabelComponent,
                        SeriesHorizontal,
                        SeriesVerticalComponent
                    ],
                    exports: [
                        BarComponent,
                        BarHorizontalComponent,
                        BarHorizontal2DComponent,
                        BarHorizontalNormalizedComponent,
                        BarHorizontalStackedComponent,
                        BarVerticalComponent,
                        BarVertical2DComponent,
                        BarVerticalNormalizedComponent,
                        BarVerticalStackedComponent,
                        BarLabelComponent,
                        SeriesHorizontal,
                        SeriesVerticalComponent
                    ]
                },] }
    ];

    var BoxChartComponent = /** @class */ (function (_super) {
        __extends(BoxChartComponent, _super);
        function BoxChartComponent() {
            var _this = _super.apply(this, __spreadArray([], __read(arguments))) || this;
            /** Show or hide the legend. */
            _this.legend = false;
            _this.legendPosition = exports.LegendPosition.Right;
            _this.legendTitle = 'Legend';
            _this.showGridLines = true;
            _this.xAxis = true;
            _this.yAxis = true;
            _this.showXAxisLabel = true;
            _this.showYAxisLabel = true;
            _this.roundDomains = false;
            _this.roundEdges = true;
            _this.strokeColor = '#FFFFFF';
            _this.strokeWidth = 2;
            _this.tooltipDisabled = false;
            _this.select = new core.EventEmitter();
            _this.activate = new core.EventEmitter();
            _this.deactivate = new core.EventEmitter();
            /** Chart Margins (For each side, counterclock wise). */
            _this.margin = [10, 20, 10, 20];
            /** Chart X axis dimension. */
            _this.xAxisHeight = 0;
            /** Chart Y axis dimension. */
            _this.yAxisWidth = 0;
            return _this;
        }
        BoxChartComponent.prototype.trackBy = function (index, item) {
            return item.name;
        };
        BoxChartComponent.prototype.update = function () {
            _super.prototype.update.call(this);
            this.dims = calculateViewDimensions({
                width: this.width,
                height: this.height,
                margins: this.margin,
                showXAxis: this.xAxis,
                showYAxis: this.yAxis,
                xAxisHeight: this.xAxisHeight,
                yAxisWidth: this.yAxisWidth,
                showXLabel: this.showXAxisLabel,
                showYLabel: this.showYAxisLabel,
                showLegend: this.legend,
                legendPosition: this.legendPosition
            });
            this.xDomain = this.getXDomain();
            this.yDomain = this.getYDomain();
            this.seriesDomain = this.getSeriesDomain();
            this.setScales();
            this.setColors();
            this.legendOptions = this.getLegendOptions();
            this.transform = "translate(" + this.dims.xOffset + " , " + this.margin[0] + ")";
        };
        BoxChartComponent.prototype.setColors = function () {
            var domain = [];
            if (this.schemeType === exports.ScaleType.Ordinal) {
                domain = this.seriesDomain;
            }
            else {
                domain = this.yDomain;
            }
            this.colors = new ColorHelper(this.scheme, this.schemeType, domain, this.customColors);
        };
        BoxChartComponent.prototype.setScales = function () {
            this.xScale = this.getXScale(this.xDomain, this.dims.width);
            this.yScale = this.getYScale(this.yDomain, this.dims.height);
        };
        BoxChartComponent.prototype.getXScale = function (domain, width) {
            var scale = d3Scale.scaleBand()
                .domain(domain.map(function (d) { return d.toString(); }))
                .rangeRound([0, width])
                .padding(0.5);
            return scale;
        };
        BoxChartComponent.prototype.getYScale = function (domain, height) {
            var scale = d3Scale.scaleLinear().domain(domain).range([height, 0]);
            return this.roundDomains ? scale.nice() : scale;
        };
        BoxChartComponent.prototype.getUniqueBoxChartXDomainValues = function (results) {
            var e_1, _a;
            var valueSet = new Set();
            try {
                for (var results_1 = __values(results), results_1_1 = results_1.next(); !results_1_1.done; results_1_1 = results_1.next()) {
                    var result = results_1_1.value;
                    valueSet.add(result.name);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (results_1_1 && !results_1_1.done && (_a = results_1.return)) _a.call(results_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return Array.from(valueSet);
        };
        BoxChartComponent.prototype.getXDomain = function () {
            var domain = [];
            var values = this.getUniqueBoxChartXDomainValues(this.results);
            var min;
            var max;
            if (typeof values[0] === 'string') {
                domain = values.map(function (val) { return val.toString(); });
            }
            else if (typeof values[0] === 'number') {
                var mappedValues = values.map(function (v) { return Number(v); });
                min = Math.min.apply(Math, __spreadArray([], __read(mappedValues)));
                max = Math.max.apply(Math, __spreadArray([], __read(mappedValues)));
                domain = [min, max];
            }
            else {
                var mappedValues = values.map(function (v) { return Number(new Date(v)); });
                min = Math.min.apply(Math, __spreadArray([], __read(mappedValues)));
                max = Math.max.apply(Math, __spreadArray([], __read(mappedValues)));
                domain = [new Date(min), new Date(max)];
            }
            return domain;
        };
        BoxChartComponent.prototype.getYDomain = function () {
            var e_2, _a, e_3, _b;
            var domain = [];
            try {
                for (var _c = __values(this.results), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var results = _d.value;
                    try {
                        for (var _e = (e_3 = void 0, __values(results.series)), _f = _e.next(); !_f.done; _f = _e.next()) {
                            var d = _f.value;
                            if (domain.indexOf(d.value) < 0) {
                                domain.push(d.value);
                            }
                        }
                    }
                    catch (e_3_1) { e_3 = { error: e_3_1 }; }
                    finally {
                        try {
                            if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                        }
                        finally { if (e_3) throw e_3.error; }
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                }
                finally { if (e_2) throw e_2.error; }
            }
            var values = __spreadArray([], __read(domain));
            var mappedValues = values.map(function (v) { return Number(v); });
            var min = Math.min.apply(Math, __spreadArray([], __read(mappedValues)));
            var max = Math.max.apply(Math, __spreadArray([], __read(mappedValues)));
            return [min, max];
        };
        BoxChartComponent.prototype.getSeriesDomain = function () {
            return this.results.map(function (d) { return "" + d.name; });
        };
        BoxChartComponent.prototype.updateYAxisWidth = function (_a) {
            var width = _a.width;
            this.yAxisWidth = width;
            this.update();
        };
        BoxChartComponent.prototype.updateXAxisHeight = function (_a) {
            var height = _a.height;
            this.xAxisHeight = height;
            this.update();
        };
        BoxChartComponent.prototype.onClick = function (data) {
            this.select.emit(data);
        };
        BoxChartComponent.prototype.onActivate = function (data) {
            this.activate.emit(data);
        };
        BoxChartComponent.prototype.onDeactivate = function (data) {
            this.deactivate.emit(data);
        };
        BoxChartComponent.prototype.getLegendOptions = function () {
            var legendOpts = {
                scaleType: this.schemeType,
                colors: this.colors,
                domain: [],
                position: this.legendPosition,
                title: this.legendTitle
            };
            if (this.schemeType === exports.ScaleType.Ordinal) {
                legendOpts.domain = this.xDomain;
                legendOpts.colors = this.colors;
            }
            else {
                legendOpts.domain = this.yDomain;
                legendOpts.colors = this.colors.scale;
            }
            return legendOpts;
        };
        return BoxChartComponent;
    }(BaseChartComponent));
    BoxChartComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'ngx-charts-box-chart',
                    template: "\n    <ngx-charts-chart\n      [view]=\"[width, height]\"\n      [showLegend]=\"legend\"\n      [legendOptions]=\"legendOptions\"\n      [animations]=\"animations\"\n      (legendLabelClick)=\"onClick($event)\"\n      (legendLabelActivate)=\"onActivate($event)\"\n      (legendLabelDeactivate)=\"onDeactivate($event)\"\n    >\n      <svg:g [attr.transform]=\"transform\" class=\"box-chart chart\">\n        <svg:g\n          ngx-charts-x-axis\n          [showGridLines]=\"showGridLines\"\n          [dims]=\"dims\"\n          [xScale]=\"xScale\"\n          [showLabel]=\"showXAxisLabel\"\n          [labelText]=\"xAxisLabel\"\n          (dimensionsChanged)=\"updateXAxisHeight($event)\"\n        />\n        <svg:g\n          ngx-charts-y-axis\n          [showGridLines]=\"showGridLines\"\n          [dims]=\"dims\"\n          [yScale]=\"yScale\"\n          [showLabel]=\"showYAxisLabel\"\n          [labelText]=\"yAxisLabel\"\n          (dimensionsChanged)=\"updateYAxisWidth($event)\"\n        />\n      </svg:g>\n      <svg:g [attr.transform]=\"transform\">\n        <svg:g *ngFor=\"let result of results; trackBy: trackBy\">\n          <svg:g\n            ngx-charts-box-series\n            [xScale]=\"xScale\"\n            [yScale]=\"yScale\"\n            [colors]=\"colors\"\n            [roundEdges]=\"roundEdges\"\n            [strokeColor]=\"strokeColor\"\n            [strokeWidth]=\"strokeWidth\"\n            [tooltipDisabled]=\"tooltipDisabled\"\n            [tooltipTemplate]=\"tooltipTemplate\"\n            [series]=\"result\"\n            [dims]=\"dims\"\n            [animations]=\"animations\"\n            [gradient]=\"gradient\"\n            (activate)=\"onActivate($event)\"\n            (deactivate)=\"onDeactivate($event)\"\n            (select)=\"onClick($event)\"\n          />\n        </svg:g>\n      </svg:g>\n    </ngx-charts-chart>\n  ",
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    encapsulation: core.ViewEncapsulation.None,
                    styles: [".ngx-charts-outer{-webkit-animation:chartFadeIn linear .6s;animation:chartFadeIn linear .6s}@-webkit-keyframes chartFadeIn{0%{opacity:0}20%{opacity:0}to{opacity:1}}@keyframes chartFadeIn{0%{opacity:0}20%{opacity:0}to{opacity:1}}.ngx-charts{float:left;overflow:visible}.ngx-charts .circle,.ngx-charts .cell,.ngx-charts .bar,.ngx-charts .arc{cursor:pointer}.ngx-charts .bar.active,.ngx-charts .bar:hover,.ngx-charts .cell.active,.ngx-charts .cell:hover,.ngx-charts .arc.active,.ngx-charts .arc:hover,.ngx-charts .card.active,.ngx-charts .card:hover{opacity:.8;transition:opacity .1s ease-in-out}.ngx-charts .bar:focus,.ngx-charts .cell:focus,.ngx-charts .arc:focus,.ngx-charts .card:focus{outline:none}.ngx-charts .bar.hidden,.ngx-charts .cell.hidden,.ngx-charts .arc.hidden,.ngx-charts .card.hidden{display:none}.ngx-charts g:focus{outline:none}.ngx-charts .line-series.inactive,.ngx-charts .line-series-range.inactive,.ngx-charts .polar-series-path.inactive,.ngx-charts .polar-series-area.inactive,.ngx-charts .area-series.inactive{transition:opacity .1s ease-in-out;opacity:.2}.ngx-charts .line-highlight{display:none}.ngx-charts .line-highlight.active{display:block}.ngx-charts .area{opacity:.6}.ngx-charts .circle:hover{cursor:pointer}.ngx-charts .label{font-size:12px;font-weight:normal}.ngx-charts .tooltip-anchor{fill:#000}.ngx-charts .gridline-path{stroke:#ddd;stroke-width:1;fill:none}.ngx-charts .refline-path{stroke:#a8b2c7;stroke-width:1;stroke-dasharray:5;stroke-dashoffset:5}.ngx-charts .refline-label{font-size:9px}.ngx-charts .reference-area{fill-opacity:.05;fill:#000}.ngx-charts .gridline-path-dotted{stroke:#ddd;stroke-width:1;fill:none;stroke-dasharray:1,20;stroke-dashoffset:3}.ngx-charts .grid-panel rect{fill:none}.ngx-charts .grid-panel.odd rect{fill:#0000000d}\n"]
                },] }
    ];
    BoxChartComponent.propDecorators = {
        legend: [{ type: core.Input }],
        legendPosition: [{ type: core.Input }],
        legendTitle: [{ type: core.Input }],
        legendOptionsConfig: [{ type: core.Input }],
        showGridLines: [{ type: core.Input }],
        xAxis: [{ type: core.Input }],
        yAxis: [{ type: core.Input }],
        showXAxisLabel: [{ type: core.Input }],
        showYAxisLabel: [{ type: core.Input }],
        roundDomains: [{ type: core.Input }],
        xAxisLabel: [{ type: core.Input }],
        yAxisLabel: [{ type: core.Input }],
        roundEdges: [{ type: core.Input }],
        strokeColor: [{ type: core.Input }],
        strokeWidth: [{ type: core.Input }],
        tooltipDisabled: [{ type: core.Input }],
        gradient: [{ type: core.Input }],
        select: [{ type: core.Output }],
        activate: [{ type: core.Output }],
        deactivate: [{ type: core.Output }],
        tooltipTemplate: [{ type: core.ContentChild, args: ['tooltipTemplate', { static: false },] }]
    };

    var BoxSeriesComponent = /** @class */ (function () {
        function BoxSeriesComponent() {
            this.animations = true;
            this.tooltipDisabled = false;
            this.gradient = false;
            this.select = new core.EventEmitter();
            this.activate = new core.EventEmitter();
            this.deactivate = new core.EventEmitter();
        }
        BoxSeriesComponent.prototype.ngOnChanges = function (changes) {
            this.update();
        };
        BoxSeriesComponent.prototype.onClick = function (data) {
            this.select.emit(data);
        };
        BoxSeriesComponent.prototype.update = function () {
            this.updateTooltipSettings();
            var width = this.series && this.series.series.length ? Math.round(this.xScale.bandwidth()) : null;
            var seriesName = this.series.name;
            // Calculate Quantile and Whiskers for each box serie.
            this.counts = this.series.series;
            var mappedCounts = this.counts.map(function (serie) { return Number(serie.value); });
            this.whiskers = [d3Array.min(mappedCounts), d3Array.max(mappedCounts)];
            // We get the group count and must sort it in order to retrieve quantiles.
            var groupCounts = this.counts.map(function (item) { return item.value; }).sort(function (a, b) { return Number(a) - Number(b); });
            this.quartiles = this.getBoxQuantiles(groupCounts);
            this.lineCoordinates = this.getLinesCoordinates(seriesName.toString(), this.whiskers, this.quartiles, width);
            var value = this.quartiles[1];
            var formattedLabel = formatLabel(seriesName);
            var box = {
                value: value,
                data: this.counts,
                label: seriesName,
                formattedLabel: formattedLabel,
                width: width,
                height: 0,
                x: 0,
                y: 0,
                roundEdges: this.roundEdges,
                quartiles: this.quartiles,
                lineCoordinates: this.lineCoordinates
            };
            box.height = Math.abs(this.yScale(this.quartiles[0]) - this.yScale(this.quartiles[2]));
            box.x = this.xScale(seriesName.toString());
            box.y = this.yScale(this.quartiles[2]);
            box.ariaLabel = formattedLabel + ' - Median: ' + value.toLocaleString();
            if (this.colors.scaleType === exports.ScaleType.Ordinal) {
                box.color = this.colors.getColor(seriesName);
            }
            else {
                box.color = this.colors.getColor(this.quartiles[1]);
                box.gradientStops = this.colors.getLinearGradientStops(this.quartiles[0], this.quartiles[2]);
            }
            var tooltipLabel = formattedLabel;
            var formattedTooltipLabel = "\n    <span class=\"tooltip-label\">" + escapeLabel(tooltipLabel) + "</span>\n    <span class=\"tooltip-val\">\n      \u2022 Q1: " + this.quartiles[0] + " \u2022 Q2: " + this.quartiles[1] + " \u2022 Q3: " + this.quartiles[2] + "<br>\n      \u2022 Min: " + this.whiskers[0] + " \u2022 Max: " + this.whiskers[1] + "\n    </span>";
            box.tooltipText = this.tooltipDisabled ? undefined : formattedTooltipLabel;
            this.tooltipTitle = this.tooltipDisabled ? undefined : box.tooltipText;
            this.box = box;
        };
        BoxSeriesComponent.prototype.getBoxQuantiles = function (inputData) {
            return [d3Array.quantile(inputData, 0.25), d3Array.quantile(inputData, 0.5), d3Array.quantile(inputData, 0.75)];
        };
        BoxSeriesComponent.prototype.getLinesCoordinates = function (seriesName, whiskers, quartiles, barWidth) {
            // The X value is not being centered, so had to sum half the width to align it.
            var commonX = this.xScale(seriesName);
            var offsetX = commonX + barWidth / 2;
            var medianLineWidth = Math.max(barWidth + 4 * this.strokeWidth, 1);
            var whiskerLineWidth = Math.max(barWidth / 3, 1);
            var whiskerZero = this.yScale(whiskers[0]);
            var whiskerOne = this.yScale(whiskers[1]);
            var median = this.yScale(quartiles[1]);
            var topLine = {
                v1: { x: offsetX + whiskerLineWidth / 2, y: whiskerZero },
                v2: { x: offsetX - whiskerLineWidth / 2, y: whiskerZero }
            };
            var medianLine = {
                v1: { x: offsetX + medianLineWidth / 2, y: median },
                v2: { x: offsetX - medianLineWidth / 2, y: median }
            };
            var bottomLine = {
                v1: { x: offsetX + whiskerLineWidth / 2, y: whiskerOne },
                v2: { x: offsetX - whiskerLineWidth / 2, y: whiskerOne }
            };
            var verticalLine = {
                v1: { x: offsetX, y: whiskerZero },
                v2: { x: offsetX, y: whiskerOne }
            };
            return [verticalLine, topLine, medianLine, bottomLine];
        };
        BoxSeriesComponent.prototype.updateTooltipSettings = function () {
            if (this.tooltipDisabled) {
                this.tooltipPlacement = undefined;
                this.tooltipType = undefined;
            }
            else {
                if (!this.tooltipPlacement) {
                    this.tooltipPlacement = exports.PlacementTypes.Top;
                }
                if (!this.tooltipType) {
                    this.tooltipType = exports.StyleTypes.tooltip;
                }
            }
        };
        return BoxSeriesComponent;
    }());
    BoxSeriesComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'g[ngx-charts-box-series]',
                    template: "\n    <svg:g\n      ngx-charts-box\n      [@animationState]=\"'active'\"\n      [@.disabled]=\"!animations\"\n      [width]=\"box.width\"\n      [height]=\"box.height\"\n      [x]=\"box.x\"\n      [y]=\"box.y\"\n      [roundEdges]=\"box.roundEdges\"\n      [fill]=\"box.color\"\n      [gradientStops]=\"box.gradientStops\"\n      [strokeColor]=\"strokeColor\"\n      [strokeWidth]=\"strokeWidth\"\n      [data]=\"box.data\"\n      [lineCoordinates]=\"box.lineCoordinates\"\n      [gradient]=\"gradient\"\n      [ariaLabel]=\"box.ariaLabel\"\n      (select)=\"onClick($event)\"\n      (activate)=\"activate.emit($event)\"\n      (deactivate)=\"deactivate.emit($event)\"\n      ngx-tooltip\n      [tooltipDisabled]=\"tooltipDisabled\"\n      [tooltipPlacement]=\"tooltipPlacement\"\n      [tooltipType]=\"tooltipType\"\n      [tooltipTitle]=\"tooltipTitle\"\n      [tooltipTemplate]=\"tooltipTemplate\"\n      [tooltipContext]=\"box.data\"\n      [animations]=\"animations\"\n    ></svg:g>\n  ",
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    animations: [
                        animations.trigger('animationState', [
                            animations.transition(':leave', [
                                animations.style({
                                    opacity: 1
                                }),
                                animations.animate(500, animations.style({ opacity: 0 }))
                            ])
                        ])
                    ]
                },] }
    ];
    BoxSeriesComponent.propDecorators = {
        dims: [{ type: core.Input }],
        series: [{ type: core.Input }],
        xScale: [{ type: core.Input }],
        yScale: [{ type: core.Input }],
        colors: [{ type: core.Input }],
        animations: [{ type: core.Input }],
        strokeColor: [{ type: core.Input }],
        strokeWidth: [{ type: core.Input }],
        tooltipDisabled: [{ type: core.Input }],
        tooltipTemplate: [{ type: core.Input }],
        tooltipPlacement: [{ type: core.Input }],
        tooltipType: [{ type: core.Input }],
        roundEdges: [{ type: core.Input }],
        gradient: [{ type: core.Input }],
        select: [{ type: core.Output }],
        activate: [{ type: core.Output }],
        deactivate: [{ type: core.Output }]
    };

    var BoxComponent = /** @class */ (function () {
        function BoxComponent(element, cd) {
            this.cd = cd;
            this.roundEdges = true;
            this.gradient = false;
            this.offset = 0;
            this.isActive = false;
            this.animations = true;
            this.noBarWhenZero = true;
            this.select = new core.EventEmitter();
            this.activate = new core.EventEmitter();
            this.deactivate = new core.EventEmitter();
            this.BarOrientation = exports.BarOrientation;
            this.initialized = false;
            this.hasGradient = false;
            this.hideBar = false;
            this.nativeElm = element.nativeElement;
        }
        BoxComponent.prototype.ngOnChanges = function (changes) {
            if (!this.initialized) {
                this.loadAnimation();
                this.initialized = true;
            }
            else {
                this.update();
            }
        };
        BoxComponent.prototype.update = function () {
            this.boxStrokeWidth = Math.max(this.strokeWidth, 1);
            this.whiskerStrokeWidth = Math.max(this.strokeWidth / 2, 1);
            this.medianLineWidth = 1.5 * this.strokeWidth;
            this.gradientId = 'grad' + id().toString();
            this.gradientFill = "url(#" + this.gradientId + ")";
            if (this.gradient) {
                this.gradientStops = this.getGradient();
                this.hasGradient = true;
            }
            else {
                this.hasGradient = false;
            }
            this.updateLineEl();
            this.updatePathEl();
            this.checkToHideBar();
            this.maskLineId = 'mask' + id().toString();
            this.maskLine = "url(#" + this.maskLineId + ")";
            if (this.cd) {
                this.cd.markForCheck();
            }
        };
        BoxComponent.prototype.loadAnimation = function () {
            this.boxPath = this.oldPath = this.getStartingPath();
            this.oldLineCoordinates = this.getStartingLineCoordinates();
            setTimeout(this.update.bind(this), 100);
        };
        BoxComponent.prototype.updatePathEl = function () {
            var nodeBar = d3Selection.select(this.nativeElm).selectAll('.bar');
            var path = this.getPath();
            if (this.animations) {
                nodeBar
                    .attr('d', this.oldPath)
                    .transition()
                    .ease(d3Ease.easeSinInOut)
                    .duration(500)
                    .attrTween('d', this.pathTween(path, 4));
            }
            else {
                nodeBar.attr('d', path);
            }
            this.oldPath = path;
        };
        BoxComponent.prototype.updateLineEl = function () {
            var lineEl = d3Selection.select(this.nativeElm).selectAll('.bar-line');
            var lineCoordinates = this.lineCoordinates;
            var oldLineCoordinates = this.oldLineCoordinates;
            if (this.animations) {
                lineEl
                    .attr('x1', function (_, index) { return oldLineCoordinates[index].v1.x; })
                    .attr('y1', function (_, index) { return oldLineCoordinates[index].v1.y; })
                    .attr('x2', function (_, index) { return oldLineCoordinates[index].v2.x; })
                    .attr('y2', function (_, index) { return oldLineCoordinates[index].v2.y; })
                    .transition()
                    .ease(d3Ease.easeSinInOut)
                    .duration(500)
                    .attr('x1', function (_, index) { return lineCoordinates[index].v1.x; })
                    .attr('y1', function (_, index) { return lineCoordinates[index].v1.y; })
                    .attr('x2', function (_, index) { return lineCoordinates[index].v2.x; })
                    .attr('y2', function (_, index) { return lineCoordinates[index].v2.y; });
            }
            else {
                lineEl
                    .attr('x1', function (_, index) { return lineCoordinates[index].v1.x; })
                    .attr('y1', function (_, index) { return lineCoordinates[index].v1.y; })
                    .attr('x2', function (_, index) { return lineCoordinates[index].v2.x; })
                    .attr('y2', function (_, index) { return lineCoordinates[index].v2.y; });
            }
            this.oldLineCoordinates = __spreadArray([], __read(lineCoordinates));
        };
        /**
         * See [D3 Selections](https://www.d3indepth.com/selections/)
         * @param d The joined data.
         * @param index The index of the element within the selection
         * @param node The node element (Line).
         */
        BoxComponent.prototype.lineTween = function (attr, d, index, node) {
            var nodeLineEl = node[index];
            return nodeLineEl[attr].baseVal.value;
        };
        // TODO: Refactor into another .ts file if https://github.com/swimlane/ngx-charts/pull/1179 gets merged.
        BoxComponent.prototype.pathTween = function (d1, precision) {
            return function () {
                // tslint:disable-next-line: no-this-assignment
                var path0 = this;
                var path1 = this.cloneNode();
                path1.setAttribute('d', d1);
                var n0 = path0 === null || path0 === void 0 ? void 0 : path0.getTotalLength();
                var n1 = path1 === null || path1 === void 0 ? void 0 : path1.getTotalLength();
                // Uniform sampling of distance based on specified precision.
                var distances = [0];
                var i = 0;
                var dt = precision / Math.max(n0, n1);
                while (i < 1) {
                    distances.push(i);
                    i += dt;
                }
                distances.push(1);
                // Compute point-interpolators at each distance.
                var points = distances.map(function (t) {
                    var p0 = path0.getPointAtLength(t * n0);
                    var p1 = path1.getPointAtLength(t * n1);
                    return d3Interpolate.interpolate([p0.x, p0.y], [p1.x, p1.y]);
                });
                // 't': T is the fraction of time (between 0 and 1) since the transition began.
                return function (t) {
                    return t < 1 ? 'M' + points.map(function (p) { return p(t); }).join('L') : d1;
                };
            };
        };
        BoxComponent.prototype.getStartingPath = function () {
            if (!this.animations) {
                return this.getPath();
            }
            var radius = this.roundEdges ? 1 : 0;
            var _a = this.lineCoordinates[2].v1, x = _a.x, y = _a.y;
            return roundedRect(x - this.width, y - 1, this.width, 2, radius, this.edges);
        };
        BoxComponent.prototype.getPath = function () {
            var radius = this.getRadius();
            var path = '';
            path = roundedRect(this.x, this.y, this.width, this.height, Math.min(this.height, radius), this.edges);
            return path;
        };
        BoxComponent.prototype.getStartingLineCoordinates = function () {
            if (!this.animations) {
                return __spreadArray([], __read(this.lineCoordinates));
            }
            var lineCoordinates = cloneDeep__default['default'](this.lineCoordinates);
            lineCoordinates[1].v1.y = lineCoordinates[1].v2.y = lineCoordinates[3].v1.y = lineCoordinates[3].v2.y = lineCoordinates[0].v1.y = lineCoordinates[0].v2.y =
                lineCoordinates[2].v1.y;
            return lineCoordinates;
        };
        BoxComponent.prototype.getRadius = function () {
            var radius = 0;
            if (this.roundEdges && this.height > 5 && this.width > 5) {
                radius = Math.floor(Math.min(5, this.height / 2, this.width / 2));
            }
            return radius;
        };
        BoxComponent.prototype.getGradient = function () {
            return [
                {
                    offset: 0,
                    color: this.fill,
                    opacity: this.getStartOpacity()
                },
                {
                    offset: 100,
                    color: this.fill,
                    opacity: 1
                }
            ];
        };
        BoxComponent.prototype.getStartOpacity = function () {
            if (this.roundEdges) {
                return 0.2;
            }
            else {
                return 0.5;
            }
        };
        Object.defineProperty(BoxComponent.prototype, "edges", {
            get: function () {
                var edges = [false, false, false, false];
                if (this.roundEdges) {
                    edges = [true, true, true, true];
                }
                return edges;
            },
            enumerable: false,
            configurable: true
        });
        BoxComponent.prototype.onMouseEnter = function () {
            this.activate.emit(this.data);
        };
        BoxComponent.prototype.onMouseLeave = function () {
            this.deactivate.emit(this.data);
        };
        BoxComponent.prototype.checkToHideBar = function () {
            this.hideBar = this.noBarWhenZero && this.height === 0;
        };
        return BoxComponent;
    }());
    BoxComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'g[ngx-charts-box]',
                    template: "\n    <svg:defs>\n      <svg:g\n        *ngIf=\"hasGradient\"\n        ngx-charts-svg-linear-gradient\n        [orientation]=\"BarOrientation.Vertical\"\n        [name]=\"gradientId\"\n        [stops]=\"gradientStops\"\n      />\n      <svg:mask [attr.id]=\"maskLineId\">\n        <svg:g>\n          <rect height=\"100%\" width=\"100%\" fill=\"white\" fill-opacity=\"1\" />\n          <path class=\"bar\" [attr.d]=\"boxPath\" fill=\"black\" fill-opacity=\"1\" />\n        </svg:g>\n      </svg:mask>\n    </svg:defs>\n    <svg:g>\n      <svg:path\n        class=\"bar\"\n        role=\"img\"\n        tabIndex=\"-1\"\n        [class.active]=\"isActive\"\n        [class.hidden]=\"hideBar\"\n        [attr.d]=\"boxPath\"\n        [attr.stroke]=\"strokeColor\"\n        [attr.stroke-width]=\"boxStrokeWidth\"\n        [attr.aria-label]=\"ariaLabel\"\n        [attr.fill]=\"hasGradient ? gradientFill : fill\"\n        (click)=\"select.emit(data)\"\n      />\n      <svg:line\n        *ngFor=\"let line of lineCoordinates; let i = index\"\n        class=\"bar-line\"\n        [class.hidden]=\"hideBar\"\n        [attr.x1]=\"line.v1.x\"\n        [attr.y1]=\"line.v1.y\"\n        [attr.x2]=\"line.v2.x\"\n        [attr.y2]=\"line.v2.y\"\n        [attr.stroke]=\"strokeColor\"\n        [attr.stroke-width]=\"i === 2 ? medianLineWidth : whiskerStrokeWidth\"\n        [attr.mask]=\"i ? undefined : maskLine\"\n        fill=\"none\"\n      />\n    </svg:g>\n  ",
                    changeDetection: core.ChangeDetectionStrategy.OnPush
                },] }
    ];
    BoxComponent.ctorParameters = function () { return [
        { type: core.ElementRef },
        { type: core.ChangeDetectorRef }
    ]; };
    BoxComponent.propDecorators = {
        strokeColor: [{ type: core.Input }],
        strokeWidth: [{ type: core.Input }],
        fill: [{ type: core.Input }],
        data: [{ type: core.Input }],
        width: [{ type: core.Input }],
        height: [{ type: core.Input }],
        x: [{ type: core.Input }],
        y: [{ type: core.Input }],
        lineCoordinates: [{ type: core.Input }],
        roundEdges: [{ type: core.Input }],
        gradient: [{ type: core.Input }],
        gradientStops: [{ type: core.Input }],
        offset: [{ type: core.Input }],
        isActive: [{ type: core.Input }],
        animations: [{ type: core.Input }],
        ariaLabel: [{ type: core.Input }],
        noBarWhenZero: [{ type: core.Input }],
        select: [{ type: core.Output }],
        activate: [{ type: core.Output }],
        deactivate: [{ type: core.Output }],
        onMouseEnter: [{ type: core.HostListener, args: ['mouseenter',] }],
        onMouseLeave: [{ type: core.HostListener, args: ['mouseleave',] }]
    };

    var BoxChartModule = /** @class */ (function () {
        function BoxChartModule() {
        }
        return BoxChartModule;
    }());
    BoxChartModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [ChartCommonModule],
                    declarations: [BoxChartComponent, BoxSeriesComponent, BoxComponent],
                    exports: [BoxChartComponent, BoxSeriesComponent, BoxComponent]
                },] }
    ];

    function getDomain(values, scaleType, autoScale, minVal, maxVal) {
        var domain = [];
        if (scaleType === exports.ScaleType.Linear) {
            values = values.map(function (v) { return Number(v); });
            if (!autoScale) {
                values.push(0);
            }
        }
        if (scaleType === exports.ScaleType.Time || scaleType === exports.ScaleType.Linear) {
            var min = minVal ? minVal : Math.min.apply(Math, __spreadArray([], __read(values)));
            var max = maxVal ? maxVal : Math.max.apply(Math, __spreadArray([], __read(values)));
            domain = [min, max];
        }
        else {
            domain = values;
        }
        return domain;
    }
    function getScale(domain, range, scaleType, roundDomains) {
        switch (scaleType) {
            case exports.ScaleType.Time:
                return d3Scale.scaleTime().range(range).domain(domain);
            case exports.ScaleType.Linear: {
                var scale = d3Scale.scaleLinear().range(range).domain(domain);
                if (roundDomains) {
                    return scale.nice();
                }
                return scale;
            }
            case exports.ScaleType.Ordinal:
                return d3Scale.scalePoint()
                    .range([range[0], range[1]])
                    .domain(domain.map(function (r) { return r.toString(); }));
            default:
                return undefined;
        }
    }

    var BubbleChartComponent = /** @class */ (function (_super) {
        __extends(BubbleChartComponent, _super);
        function BubbleChartComponent() {
            var _this = _super.apply(this, __spreadArray([], __read(arguments))) || this;
            _this.showGridLines = true;
            _this.legend = false;
            _this.legendTitle = 'Legend';
            _this.legendPosition = exports.LegendPosition.Right;
            _this.xAxis = true;
            _this.yAxis = true;
            _this.trimXAxisTicks = true;
            _this.trimYAxisTicks = true;
            _this.rotateXAxisTicks = true;
            _this.maxXAxisTickLength = 16;
            _this.maxYAxisTickLength = 16;
            _this.roundDomains = false;
            _this.maxRadius = 10;
            _this.minRadius = 3;
            _this.schemeType = exports.ScaleType.Ordinal;
            _this.tooltipDisabled = false;
            _this.activate = new core.EventEmitter();
            _this.deactivate = new core.EventEmitter();
            _this.scaleType = exports.ScaleType.Linear;
            _this.margin = [10, 20, 10, 20];
            _this.bubblePadding = [0, 0, 0, 0];
            _this.xAxisHeight = 0;
            _this.yAxisWidth = 0;
            _this.activeEntries = [];
            return _this;
        }
        BubbleChartComponent.prototype.update = function () {
            _super.prototype.update.call(this);
            this.dims = calculateViewDimensions({
                width: this.width,
                height: this.height,
                margins: this.margin,
                showXAxis: this.xAxis,
                showYAxis: this.yAxis,
                xAxisHeight: this.xAxisHeight,
                yAxisWidth: this.yAxisWidth,
                showXLabel: this.showXAxisLabel,
                showYLabel: this.showYAxisLabel,
                showLegend: this.legend,
                legendType: this.schemeType,
                legendPosition: this.legendPosition
            });
            this.seriesDomain = this.results.map(function (d) { return d.name; });
            this.rDomain = this.getRDomain();
            this.xDomain = this.getXDomain();
            this.yDomain = this.getYDomain();
            this.transform = "translate(" + this.dims.xOffset + "," + this.margin[0] + ")";
            var colorDomain = this.schemeType === exports.ScaleType.Ordinal ? this.seriesDomain : this.rDomain;
            this.colors = new ColorHelper(this.scheme, this.schemeType, colorDomain, this.customColors);
            this.data = this.results;
            this.minRadius = Math.max(this.minRadius, 1);
            this.maxRadius = Math.max(this.maxRadius, 1);
            this.rScale = this.getRScale(this.rDomain, [this.minRadius, this.maxRadius]);
            this.bubblePadding = [0, 0, 0, 0];
            this.setScales();
            this.bubblePadding = this.getBubblePadding();
            this.setScales();
            this.legendOptions = this.getLegendOptions();
            this.clipPathId = 'clip' + id().toString();
            this.clipPath = "url(#" + this.clipPathId + ")";
        };
        BubbleChartComponent.prototype.hideCircles = function () {
            this.deactivateAll();
        };
        BubbleChartComponent.prototype.onClick = function (data, series) {
            if (series) {
                data.series = series.name;
            }
            this.select.emit(data);
        };
        BubbleChartComponent.prototype.getBubblePadding = function () {
            var e_1, _a, e_2, _b;
            var yMin = 0;
            var xMin = 0;
            var yMax = this.dims.height;
            var xMax = this.dims.width;
            try {
                for (var _c = __values(this.data), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var s = _d.value;
                    try {
                        for (var _e = (e_2 = void 0, __values(s.series)), _f = _e.next(); !_f.done; _f = _e.next()) {
                            var d = _f.value;
                            var r = this.rScale(d.r);
                            var cx = this.xScaleType === exports.ScaleType.Linear ? this.xScale(Number(d.x)) : this.xScale(d.x);
                            var cy = this.yScaleType === exports.ScaleType.Linear ? this.yScale(Number(d.y)) : this.yScale(d.y);
                            xMin = Math.max(r - cx, xMin);
                            yMin = Math.max(r - cy, yMin);
                            yMax = Math.max(cy + r, yMax);
                            xMax = Math.max(cx + r, xMax);
                        }
                    }
                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                    finally {
                        try {
                            if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                        }
                        finally { if (e_2) throw e_2.error; }
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                }
                finally { if (e_1) throw e_1.error; }
            }
            xMax = Math.max(xMax - this.dims.width, 0);
            yMax = Math.max(yMax - this.dims.height, 0);
            return [yMin, xMax, yMax, xMin];
        };
        BubbleChartComponent.prototype.setScales = function () {
            var width = this.dims.width;
            if (this.xScaleMin === undefined && this.xScaleMax === undefined) {
                width = width - this.bubblePadding[1];
            }
            var height = this.dims.height;
            if (this.yScaleMin === undefined && this.yScaleMax === undefined) {
                height = height - this.bubblePadding[2];
            }
            this.xScale = this.getXScale(this.xDomain, width);
            this.yScale = this.getYScale(this.yDomain, height);
        };
        BubbleChartComponent.prototype.getYScale = function (domain, height) {
            return getScale(domain, [height, this.bubblePadding[0]], this.yScaleType, this.roundDomains);
        };
        BubbleChartComponent.prototype.getXScale = function (domain, width) {
            return getScale(domain, [this.bubblePadding[3], width], this.xScaleType, this.roundDomains);
        };
        BubbleChartComponent.prototype.getRScale = function (domain, range) {
            var scale = d3Scale.scaleLinear().range(range).domain(domain);
            return this.roundDomains ? scale.nice() : scale;
        };
        BubbleChartComponent.prototype.getLegendOptions = function () {
            var opts = {
                scaleType: this.schemeType,
                colors: undefined,
                domain: [],
                position: this.legendPosition,
                title: undefined
            };
            if (opts.scaleType === exports.ScaleType.Ordinal) {
                opts.domain = this.seriesDomain;
                opts.colors = this.colors;
                opts.title = this.legendTitle;
            }
            else {
                opts.domain = this.rDomain;
                opts.colors = this.colors.scale;
            }
            return opts;
        };
        BubbleChartComponent.prototype.getXDomain = function () {
            var e_3, _a, e_4, _b;
            var values = [];
            try {
                for (var _c = __values(this.results), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var results = _d.value;
                    try {
                        for (var _e = (e_4 = void 0, __values(results.series)), _f = _e.next(); !_f.done; _f = _e.next()) {
                            var d = _f.value;
                            if (!values.includes(d.x)) {
                                values.push(d.x);
                            }
                        }
                    }
                    catch (e_4_1) { e_4 = { error: e_4_1 }; }
                    finally {
                        try {
                            if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                        }
                        finally { if (e_4) throw e_4.error; }
                    }
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                }
                finally { if (e_3) throw e_3.error; }
            }
            this.xScaleType = getScaleType(values);
            return getDomain(values, this.xScaleType, this.autoScale, this.xScaleMin, this.xScaleMax);
        };
        BubbleChartComponent.prototype.getYDomain = function () {
            var e_5, _a, e_6, _b;
            var values = [];
            try {
                for (var _c = __values(this.results), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var results = _d.value;
                    try {
                        for (var _e = (e_6 = void 0, __values(results.series)), _f = _e.next(); !_f.done; _f = _e.next()) {
                            var d = _f.value;
                            if (!values.includes(d.y)) {
                                values.push(d.y);
                            }
                        }
                    }
                    catch (e_6_1) { e_6 = { error: e_6_1 }; }
                    finally {
                        try {
                            if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                        }
                        finally { if (e_6) throw e_6.error; }
                    }
                }
            }
            catch (e_5_1) { e_5 = { error: e_5_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                }
                finally { if (e_5) throw e_5.error; }
            }
            this.yScaleType = getScaleType(values);
            return getDomain(values, this.yScaleType, this.autoScale, this.yScaleMin, this.yScaleMax);
        };
        BubbleChartComponent.prototype.getRDomain = function () {
            var e_7, _a, e_8, _b;
            var min = Infinity;
            var max = -Infinity;
            try {
                for (var _c = __values(this.results), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var results = _d.value;
                    try {
                        for (var _e = (e_8 = void 0, __values(results.series)), _f = _e.next(); !_f.done; _f = _e.next()) {
                            var d = _f.value;
                            var value = Number(d.r) || 1;
                            min = Math.min(min, value);
                            max = Math.max(max, value);
                        }
                    }
                    catch (e_8_1) { e_8 = { error: e_8_1 }; }
                    finally {
                        try {
                            if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                        }
                        finally { if (e_8) throw e_8.error; }
                    }
                }
            }
            catch (e_7_1) { e_7 = { error: e_7_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                }
                finally { if (e_7) throw e_7.error; }
            }
            return [min, max];
        };
        BubbleChartComponent.prototype.updateYAxisWidth = function (_a) {
            var width = _a.width;
            this.yAxisWidth = width;
            this.update();
        };
        BubbleChartComponent.prototype.updateXAxisHeight = function (_a) {
            var height = _a.height;
            this.xAxisHeight = height;
            this.update();
        };
        BubbleChartComponent.prototype.onActivate = function (item) {
            var idx = this.activeEntries.findIndex(function (d) {
                return d.name === item.name;
            });
            if (idx > -1) {
                return;
            }
            this.activeEntries = __spreadArray([item], __read(this.activeEntries));
            this.activate.emit({ value: item, entries: this.activeEntries });
        };
        BubbleChartComponent.prototype.onDeactivate = function (item) {
            var idx = this.activeEntries.findIndex(function (d) {
                return d.name === item.name;
            });
            this.activeEntries.splice(idx, 1);
            this.activeEntries = __spreadArray([], __read(this.activeEntries));
            this.deactivate.emit({ value: item, entries: this.activeEntries });
        };
        BubbleChartComponent.prototype.deactivateAll = function () {
            var e_9, _a;
            this.activeEntries = __spreadArray([], __read(this.activeEntries));
            try {
                for (var _b = __values(this.activeEntries), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var entry = _c.value;
                    this.deactivate.emit({ value: entry, entries: [] });
                }
            }
            catch (e_9_1) { e_9 = { error: e_9_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_9) throw e_9.error; }
            }
            this.activeEntries = [];
        };
        BubbleChartComponent.prototype.trackBy = function (index, item) {
            return "" + item.name;
        };
        return BubbleChartComponent;
    }(BaseChartComponent));
    BubbleChartComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'ngx-charts-bubble-chart',
                    template: "\n    <ngx-charts-chart\n      [view]=\"[width, height]\"\n      [showLegend]=\"legend\"\n      [activeEntries]=\"activeEntries\"\n      [legendOptions]=\"legendOptions\"\n      [animations]=\"animations\"\n      (legendLabelClick)=\"onClick($event)\"\n      (legendLabelActivate)=\"onActivate($event)\"\n      (legendLabelDeactivate)=\"onDeactivate($event)\"\n    >\n      <svg:defs>\n        <svg:clipPath [attr.id]=\"clipPathId\">\n          <svg:rect\n            [attr.width]=\"dims.width + 10\"\n            [attr.height]=\"dims.height + 10\"\n            [attr.transform]=\"'translate(-5, -5)'\"\n          />\n        </svg:clipPath>\n      </svg:defs>\n      <svg:g [attr.transform]=\"transform\" class=\"bubble-chart chart\">\n        <svg:g\n          ngx-charts-x-axis\n          *ngIf=\"xAxis\"\n          [showGridLines]=\"showGridLines\"\n          [dims]=\"dims\"\n          [xScale]=\"xScale\"\n          [showLabel]=\"showXAxisLabel\"\n          [labelText]=\"xAxisLabel\"\n          [trimTicks]=\"trimXAxisTicks\"\n          [rotateTicks]=\"rotateXAxisTicks\"\n          [maxTickLength]=\"maxXAxisTickLength\"\n          [tickFormatting]=\"xAxisTickFormatting\"\n          [ticks]=\"xAxisTicks\"\n          (dimensionsChanged)=\"updateXAxisHeight($event)\"\n        />\n        <svg:g\n          ngx-charts-y-axis\n          *ngIf=\"yAxis\"\n          [showGridLines]=\"showGridLines\"\n          [yScale]=\"yScale\"\n          [dims]=\"dims\"\n          [showLabel]=\"showYAxisLabel\"\n          [labelText]=\"yAxisLabel\"\n          [trimTicks]=\"trimYAxisTicks\"\n          [maxTickLength]=\"maxYAxisTickLength\"\n          [tickFormatting]=\"yAxisTickFormatting\"\n          [ticks]=\"yAxisTicks\"\n          (dimensionsChanged)=\"updateYAxisWidth($event)\"\n        />\n        <svg:rect\n          class=\"bubble-chart-area\"\n          x=\"0\"\n          y=\"0\"\n          [attr.width]=\"dims.width\"\n          [attr.height]=\"dims.height\"\n          style=\"fill: rgb(255, 0, 0); opacity: 0; cursor: 'auto';\"\n          (mouseenter)=\"deactivateAll()\"\n        />\n        <svg:g [attr.clip-path]=\"clipPath\">\n          <svg:g *ngFor=\"let series of data; trackBy: trackBy\" [@animationState]=\"'active'\">\n            <svg:g\n              ngx-charts-bubble-series\n              [xScale]=\"xScale\"\n              [yScale]=\"yScale\"\n              [rScale]=\"rScale\"\n              [xScaleType]=\"xScaleType\"\n              [yScaleType]=\"yScaleType\"\n              [xAxisLabel]=\"xAxisLabel\"\n              [yAxisLabel]=\"yAxisLabel\"\n              [colors]=\"colors\"\n              [data]=\"series\"\n              [activeEntries]=\"activeEntries\"\n              [tooltipDisabled]=\"tooltipDisabled\"\n              [tooltipTemplate]=\"tooltipTemplate\"\n              (select)=\"onClick($event, series)\"\n              (activate)=\"onActivate($event)\"\n              (deactivate)=\"onDeactivate($event)\"\n            />\n          </svg:g>\n        </svg:g>\n      </svg:g>\n    </ngx-charts-chart>\n  ",
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    encapsulation: core.ViewEncapsulation.None,
                    animations: [
                        animations.trigger('animationState', [
                            animations.transition(':leave', [
                                animations.style({
                                    opacity: 1
                                }),
                                animations.animate(500, animations.style({
                                    opacity: 0
                                }))
                            ])
                        ])
                    ],
                    styles: [".ngx-charts-outer{-webkit-animation:chartFadeIn linear .6s;animation:chartFadeIn linear .6s}@-webkit-keyframes chartFadeIn{0%{opacity:0}20%{opacity:0}to{opacity:1}}@keyframes chartFadeIn{0%{opacity:0}20%{opacity:0}to{opacity:1}}.ngx-charts{float:left;overflow:visible}.ngx-charts .circle,.ngx-charts .cell,.ngx-charts .bar,.ngx-charts .arc{cursor:pointer}.ngx-charts .bar.active,.ngx-charts .bar:hover,.ngx-charts .cell.active,.ngx-charts .cell:hover,.ngx-charts .arc.active,.ngx-charts .arc:hover,.ngx-charts .card.active,.ngx-charts .card:hover{opacity:.8;transition:opacity .1s ease-in-out}.ngx-charts .bar:focus,.ngx-charts .cell:focus,.ngx-charts .arc:focus,.ngx-charts .card:focus{outline:none}.ngx-charts .bar.hidden,.ngx-charts .cell.hidden,.ngx-charts .arc.hidden,.ngx-charts .card.hidden{display:none}.ngx-charts g:focus{outline:none}.ngx-charts .line-series.inactive,.ngx-charts .line-series-range.inactive,.ngx-charts .polar-series-path.inactive,.ngx-charts .polar-series-area.inactive,.ngx-charts .area-series.inactive{transition:opacity .1s ease-in-out;opacity:.2}.ngx-charts .line-highlight{display:none}.ngx-charts .line-highlight.active{display:block}.ngx-charts .area{opacity:.6}.ngx-charts .circle:hover{cursor:pointer}.ngx-charts .label{font-size:12px;font-weight:normal}.ngx-charts .tooltip-anchor{fill:#000}.ngx-charts .gridline-path{stroke:#ddd;stroke-width:1;fill:none}.ngx-charts .refline-path{stroke:#a8b2c7;stroke-width:1;stroke-dasharray:5;stroke-dashoffset:5}.ngx-charts .refline-label{font-size:9px}.ngx-charts .reference-area{fill-opacity:.05;fill:#000}.ngx-charts .gridline-path-dotted{stroke:#ddd;stroke-width:1;fill:none;stroke-dasharray:1,20;stroke-dashoffset:3}.ngx-charts .grid-panel rect{fill:none}.ngx-charts .grid-panel.odd rect{fill:#0000000d}\n"]
                },] }
    ];
    BubbleChartComponent.propDecorators = {
        showGridLines: [{ type: core.Input }],
        legend: [{ type: core.Input }],
        legendTitle: [{ type: core.Input }],
        legendPosition: [{ type: core.Input }],
        xAxis: [{ type: core.Input }],
        yAxis: [{ type: core.Input }],
        showXAxisLabel: [{ type: core.Input }],
        showYAxisLabel: [{ type: core.Input }],
        xAxisLabel: [{ type: core.Input }],
        yAxisLabel: [{ type: core.Input }],
        trimXAxisTicks: [{ type: core.Input }],
        trimYAxisTicks: [{ type: core.Input }],
        rotateXAxisTicks: [{ type: core.Input }],
        maxXAxisTickLength: [{ type: core.Input }],
        maxYAxisTickLength: [{ type: core.Input }],
        xAxisTickFormatting: [{ type: core.Input }],
        yAxisTickFormatting: [{ type: core.Input }],
        xAxisTicks: [{ type: core.Input }],
        yAxisTicks: [{ type: core.Input }],
        roundDomains: [{ type: core.Input }],
        maxRadius: [{ type: core.Input }],
        minRadius: [{ type: core.Input }],
        autoScale: [{ type: core.Input }],
        schemeType: [{ type: core.Input }],
        tooltipDisabled: [{ type: core.Input }],
        xScaleMin: [{ type: core.Input }],
        xScaleMax: [{ type: core.Input }],
        yScaleMin: [{ type: core.Input }],
        yScaleMax: [{ type: core.Input }],
        activate: [{ type: core.Output }],
        deactivate: [{ type: core.Output }],
        tooltipTemplate: [{ type: core.ContentChild, args: ['tooltipTemplate',] }],
        hideCircles: [{ type: core.HostListener, args: ['mouseleave',] }]
    };

    var BubbleSeriesComponent = /** @class */ (function () {
        function BubbleSeriesComponent() {
            this.tooltipDisabled = false;
            this.select = new core.EventEmitter();
            this.activate = new core.EventEmitter();
            this.deactivate = new core.EventEmitter();
            this.placementTypes = exports.PlacementTypes;
            this.styleTypes = exports.StyleTypes;
        }
        BubbleSeriesComponent.prototype.ngOnChanges = function (changes) {
            this.update();
        };
        BubbleSeriesComponent.prototype.update = function () {
            this.circles = this.getCircles();
        };
        BubbleSeriesComponent.prototype.getCircles = function () {
            var _this = this;
            var seriesName = this.data.name;
            return this.data.series
                .map(function (d, i) {
                if (typeof d.y !== 'undefined' && typeof d.x !== 'undefined') {
                    var y = d.y;
                    var x = d.x;
                    var r = d.r;
                    var radius = _this.rScale(r || 1);
                    var tooltipLabel = formatLabel(d.name);
                    var cx = _this.xScaleType === exports.ScaleType.Linear ? _this.xScale(Number(x)) : _this.xScale(x);
                    var cy = _this.yScaleType === exports.ScaleType.Linear ? _this.yScale(Number(y)) : _this.yScale(y);
                    var color = _this.colors.scaleType === exports.ScaleType.Linear ? _this.colors.getColor(r) : _this.colors.getColor(seriesName);
                    var isActive = !_this.activeEntries.length ? true : _this.isActive({ name: seriesName });
                    var opacity = isActive ? 1 : 0.3;
                    var data = Object.assign({}, d, {
                        series: seriesName,
                        name: d.name,
                        value: d.y,
                        x: d.x,
                        radius: d.r
                    });
                    return {
                        data: data,
                        x: x,
                        y: y,
                        r: r,
                        classNames: ["circle-data-" + i],
                        value: y,
                        label: x,
                        cx: cx,
                        cy: cy,
                        radius: radius,
                        tooltipLabel: tooltipLabel,
                        color: color,
                        opacity: opacity,
                        seriesName: seriesName,
                        isActive: isActive,
                        transform: "translate(" + cx + "," + cy + ")"
                    };
                }
            })
                .filter(function (circle) { return circle !== undefined; });
        };
        BubbleSeriesComponent.prototype.getTooltipText = function (circle) {
            var hasRadius = typeof circle.r !== 'undefined';
            var hasTooltipLabel = circle.tooltipLabel && circle.tooltipLabel.length;
            var hasSeriesName = circle.seriesName && circle.seriesName.length;
            var radiusValue = hasRadius ? formatLabel(circle.r) : '';
            var xAxisLabel = this.xAxisLabel && this.xAxisLabel !== '' ? this.xAxisLabel + ":" : '';
            var yAxisLabel = this.yAxisLabel && this.yAxisLabel !== '' ? this.yAxisLabel + ":" : '';
            var x = formatLabel(circle.x);
            var y = formatLabel(circle.y);
            var name = hasSeriesName && hasTooltipLabel
                ? circle.seriesName + " \u2022 " + circle.tooltipLabel
                : circle.seriesName + circle.tooltipLabel;
            var tooltipTitle = hasSeriesName || hasTooltipLabel ? "<span class=\"tooltip-label\">" + escapeLabel(name) + "</span>" : '';
            return "\n      " + tooltipTitle + "\n      <span class=\"tooltip-label\">\n        <label>" + escapeLabel(xAxisLabel) + "</label> " + escapeLabel(x) + "<br />\n        <label>" + escapeLabel(yAxisLabel) + "</label> " + escapeLabel(y) + "\n      </span>\n      <span class=\"tooltip-val\">\n        " + escapeLabel(radiusValue) + "\n      </span>\n    ";
        };
        BubbleSeriesComponent.prototype.onClick = function (data) {
            this.select.emit(data);
        };
        BubbleSeriesComponent.prototype.isActive = function (entry) {
            if (!this.activeEntries)
                return false;
            var item = this.activeEntries.find(function (d) {
                return entry.name === d.name;
            });
            return item !== undefined;
        };
        BubbleSeriesComponent.prototype.isVisible = function (circle) {
            if (this.activeEntries.length > 0) {
                return this.isActive({ name: circle.seriesName });
            }
            return circle.opacity !== 0;
        };
        BubbleSeriesComponent.prototype.activateCircle = function (circle) {
            circle.barVisible = true;
            this.activate.emit({ name: this.data.name });
        };
        BubbleSeriesComponent.prototype.deactivateCircle = function (circle) {
            circle.barVisible = false;
            this.deactivate.emit({ name: this.data.name });
        };
        BubbleSeriesComponent.prototype.trackBy = function (index, circle) {
            return circle.data.series + " " + circle.data.name;
        };
        return BubbleSeriesComponent;
    }());
    BubbleSeriesComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'g[ngx-charts-bubble-series]',
                    template: "\n    <svg:g *ngFor=\"let circle of circles; trackBy: trackBy\">\n      <svg:g [attr.transform]=\"circle.transform\">\n        <svg:g\n          ngx-charts-circle\n          [@animationState]=\"'active'\"\n          class=\"circle\"\n          [cx]=\"0\"\n          [cy]=\"0\"\n          [r]=\"circle.radius\"\n          [fill]=\"circle.color\"\n          [style.opacity]=\"circle.opacity\"\n          [class.active]=\"circle.isActive\"\n          [pointerEvents]=\"'all'\"\n          [data]=\"circle.value\"\n          [classNames]=\"circle.classNames\"\n          (select)=\"onClick(circle.data)\"\n          (activate)=\"activateCircle(circle)\"\n          (deactivate)=\"deactivateCircle(circle)\"\n          ngx-tooltip\n          [tooltipDisabled]=\"tooltipDisabled\"\n          [tooltipPlacement]=\"placementTypes.Top\"\n          [tooltipType]=\"styleTypes.tooltip\"\n          [tooltipTitle]=\"tooltipTemplate ? undefined : getTooltipText(circle)\"\n          [tooltipTemplate]=\"tooltipTemplate\"\n          [tooltipContext]=\"circle.data\"\n        />\n      </svg:g>\n    </svg:g>\n  ",
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    animations: [
                        animations.trigger('animationState', [
                            animations.transition(':enter', [
                                animations.style({
                                    opacity: 0,
                                    transform: 'scale(0)'
                                }),
                                animations.animate(250, animations.style({ opacity: 1, transform: 'scale(1)' }))
                            ])
                        ])
                    ]
                },] }
    ];
    BubbleSeriesComponent.propDecorators = {
        data: [{ type: core.Input }],
        xScale: [{ type: core.Input }],
        yScale: [{ type: core.Input }],
        rScale: [{ type: core.Input }],
        xScaleType: [{ type: core.Input }],
        yScaleType: [{ type: core.Input }],
        colors: [{ type: core.Input }],
        visibleValue: [{ type: core.Input }],
        activeEntries: [{ type: core.Input }],
        xAxisLabel: [{ type: core.Input }],
        yAxisLabel: [{ type: core.Input }],
        tooltipDisabled: [{ type: core.Input }],
        tooltipTemplate: [{ type: core.Input }],
        select: [{ type: core.Output }],
        activate: [{ type: core.Output }],
        deactivate: [{ type: core.Output }]
    };

    var BubbleChartModule = /** @class */ (function () {
        function BubbleChartModule() {
        }
        return BubbleChartModule;
    }());
    BubbleChartModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [ChartCommonModule],
                    declarations: [BubbleChartComponent, BubbleSeriesComponent],
                    exports: [BubbleChartComponent, BubbleSeriesComponent]
                },] }
    ];

    var HeatMapCellComponent = /** @class */ (function () {
        function HeatMapCellComponent(element) {
            this.gradient = false;
            this.animations = true;
            this.select = new core.EventEmitter();
            this.activate = new core.EventEmitter();
            this.deactivate = new core.EventEmitter();
            this.barOrientation = exports.BarOrientation;
            this.element = element.nativeElement;
        }
        HeatMapCellComponent.prototype.ngOnChanges = function (changes) {
            this.transform = "translate(" + this.x + " , " + this.y + ")";
            this.startOpacity = 0.3;
            this.gradientId = 'grad' + id().toString();
            this.gradientUrl = "url(#" + this.gradientId + ")";
            this.gradientStops = this.getGradientStops();
            if (this.animations) {
                this.loadAnimation();
            }
        };
        HeatMapCellComponent.prototype.getGradientStops = function () {
            return [
                {
                    offset: 0,
                    color: this.fill,
                    opacity: this.startOpacity
                },
                {
                    offset: 100,
                    color: this.fill,
                    opacity: 1
                }
            ];
        };
        HeatMapCellComponent.prototype.loadAnimation = function () {
            var node = d3Selection.select(this.element).select('.cell');
            node.attr('opacity', 0);
            this.animateToCurrentForm();
        };
        HeatMapCellComponent.prototype.animateToCurrentForm = function () {
            var node = d3Selection.select(this.element).select('.cell');
            node.transition().duration(750).attr('opacity', 1);
        };
        HeatMapCellComponent.prototype.onClick = function () {
            this.select.emit(this.data);
        };
        HeatMapCellComponent.prototype.onMouseEnter = function () {
            this.activate.emit(this.data);
        };
        HeatMapCellComponent.prototype.onMouseLeave = function () {
            this.deactivate.emit(this.data);
        };
        return HeatMapCellComponent;
    }());
    HeatMapCellComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'g[ngx-charts-heat-map-cell]',
                    template: "\n    <svg:g [attr.transform]=\"transform\" class=\"cell\">\n      <defs *ngIf=\"gradient\">\n        <svg:g\n          ngx-charts-svg-linear-gradient\n          [orientation]=\"barOrientation.Vertical\"\n          [name]=\"gradientId\"\n          [stops]=\"gradientStops\"\n        />\n      </defs>\n      <svg:rect\n        [attr.fill]=\"gradient ? gradientUrl : fill\"\n        rx=\"3\"\n        [attr.width]=\"width\"\n        [attr.height]=\"height\"\n        class=\"cell\"\n        (click)=\"onClick()\"\n      />\n    </svg:g>\n  ",
                    changeDetection: core.ChangeDetectionStrategy.OnPush
                },] }
    ];
    HeatMapCellComponent.ctorParameters = function () { return [
        { type: core.ElementRef }
    ]; };
    HeatMapCellComponent.propDecorators = {
        fill: [{ type: core.Input }],
        x: [{ type: core.Input }],
        y: [{ type: core.Input }],
        width: [{ type: core.Input }],
        height: [{ type: core.Input }],
        data: [{ type: core.Input }],
        gradient: [{ type: core.Input }],
        animations: [{ type: core.Input }],
        select: [{ type: core.Output }],
        activate: [{ type: core.Output }],
        deactivate: [{ type: core.Output }],
        onMouseEnter: [{ type: core.HostListener, args: ['mouseenter',] }],
        onMouseLeave: [{ type: core.HostListener, args: ['mouseleave',] }]
    };

    var HeatCellSeriesComponent = /** @class */ (function () {
        function HeatCellSeriesComponent() {
            this.tooltipDisabled = false;
            this.animations = true;
            this.select = new core.EventEmitter();
            this.activate = new core.EventEmitter();
            this.deactivate = new core.EventEmitter();
            this.placementTypes = exports.PlacementTypes;
            this.styleTypes = exports.StyleTypes;
        }
        HeatCellSeriesComponent.prototype.ngOnInit = function () {
            if (!this.tooltipText) {
                this.tooltipText = this.getTooltipText;
            }
        };
        HeatCellSeriesComponent.prototype.ngOnChanges = function (changes) {
            this.update();
        };
        HeatCellSeriesComponent.prototype.update = function () {
            this.cells = this.getCells();
        };
        HeatCellSeriesComponent.prototype.getCells = function () {
            var _this = this;
            var cells = [];
            this.data.map(function (row) {
                row.series.map(function (cell) {
                    var value = cell.value;
                    cell.series = row.name;
                    cells.push({
                        row: row,
                        cell: cell,
                        x: _this.xScale(row.name),
                        y: _this.yScale(cell.name),
                        width: _this.xScale.bandwidth(),
                        height: _this.yScale.bandwidth(),
                        fill: _this.colors.getColor(value),
                        data: value,
                        label: formatLabel(cell.name),
                        series: row.name
                    });
                });
            });
            return cells;
        };
        HeatCellSeriesComponent.prototype.getTooltipText = function (_a) {
            var label = _a.label, data = _a.data, series = _a.series;
            return "\n      <span class=\"tooltip-label\">" + escapeLabel(series) + " \u2022 " + escapeLabel(label) + "</span>\n      <span class=\"tooltip-val\">" + data.toLocaleString() + "</span>\n    ";
        };
        HeatCellSeriesComponent.prototype.trackBy = function (index, item) {
            return item.label;
        };
        HeatCellSeriesComponent.prototype.onClick = function (data) {
            this.select.emit(data);
        };
        return HeatCellSeriesComponent;
    }());
    HeatCellSeriesComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'g[ngx-charts-heat-map-cell-series]',
                    template: "\n    <svg:g\n      ngx-charts-heat-map-cell\n      *ngFor=\"let c of cells; trackBy: trackBy\"\n      [x]=\"c.x\"\n      [y]=\"c.y\"\n      [width]=\"c.width\"\n      [height]=\"c.height\"\n      [fill]=\"c.fill\"\n      [data]=\"c.data\"\n      (select)=\"onClick(c.cell)\"\n      (activate)=\"activate.emit(c.cell)\"\n      (deactivate)=\"deactivate.emit(c.cell)\"\n      [gradient]=\"gradient\"\n      [animations]=\"animations\"\n      ngx-tooltip\n      [tooltipDisabled]=\"tooltipDisabled\"\n      [tooltipPlacement]=\"placementTypes.Top\"\n      [tooltipType]=\"styleTypes.tooltip\"\n      [tooltipTitle]=\"tooltipTemplate ? undefined : tooltipText(c)\"\n      [tooltipTemplate]=\"tooltipTemplate\"\n      [tooltipContext]=\"{ series: c.series, name: c.label, value: c.data }\"\n    ></svg:g>\n  ",
                    changeDetection: core.ChangeDetectionStrategy.OnPush
                },] }
    ];
    HeatCellSeriesComponent.propDecorators = {
        data: [{ type: core.Input }],
        colors: [{ type: core.Input }],
        xScale: [{ type: core.Input }],
        yScale: [{ type: core.Input }],
        gradient: [{ type: core.Input }],
        tooltipDisabled: [{ type: core.Input }],
        tooltipText: [{ type: core.Input }],
        tooltipTemplate: [{ type: core.Input }],
        animations: [{ type: core.Input }],
        select: [{ type: core.Output }],
        activate: [{ type: core.Output }],
        deactivate: [{ type: core.Output }]
    };

    var HeatMapComponent = /** @class */ (function (_super) {
        __extends(HeatMapComponent, _super);
        function HeatMapComponent() {
            var _this = _super.apply(this, __spreadArray([], __read(arguments))) || this;
            _this.legendTitle = 'Legend';
            _this.legendPosition = exports.LegendPosition.Right;
            _this.innerPadding = 8;
            _this.trimXAxisTicks = true;
            _this.trimYAxisTicks = true;
            _this.rotateXAxisTicks = true;
            _this.maxXAxisTickLength = 16;
            _this.maxYAxisTickLength = 16;
            _this.tooltipDisabled = false;
            _this.activeEntries = [];
            _this.activate = new core.EventEmitter();
            _this.deactivate = new core.EventEmitter();
            _this.margin = [10, 20, 10, 20];
            _this.xAxisHeight = 0;
            _this.yAxisWidth = 0;
            _this.scaleType = exports.ScaleType.Linear;
            return _this;
        }
        HeatMapComponent.prototype.update = function () {
            _super.prototype.update.call(this);
            this.formatDates();
            this.xDomain = this.getXDomain();
            this.yDomain = this.getYDomain();
            this.valueDomain = this.getValueDomain();
            this.scaleType = getScaleType(this.valueDomain, false);
            this.dims = calculateViewDimensions({
                width: this.width,
                height: this.height,
                margins: this.margin,
                showXAxis: this.xAxis,
                showYAxis: this.yAxis,
                xAxisHeight: this.xAxisHeight,
                yAxisWidth: this.yAxisWidth,
                showXLabel: this.showXAxisLabel,
                showYLabel: this.showYAxisLabel,
                showLegend: this.legend,
                legendType: this.scaleType,
                legendPosition: this.legendPosition
            });
            if (this.scaleType === exports.ScaleType.Linear) {
                var min = this.min;
                var max = this.max;
                if (!this.min) {
                    min = Math.min.apply(Math, __spreadArray([0], __read(this.valueDomain)));
                }
                if (!this.max) {
                    max = Math.max.apply(Math, __spreadArray([], __read(this.valueDomain)));
                }
                this.valueDomain = [min, max];
            }
            this.xScale = this.getXScale();
            this.yScale = this.getYScale();
            this.setColors();
            this.legendOptions = this.getLegendOptions();
            this.transform = "translate(" + this.dims.xOffset + " , " + this.margin[0] + ")";
            this.rects = this.getRects();
        };
        HeatMapComponent.prototype.getXDomain = function () {
            var e_1, _a;
            var domain = [];
            try {
                for (var _b = __values(this.results), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var group = _c.value;
                    if (!domain.includes(group.name)) {
                        domain.push(group.name);
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return domain;
        };
        HeatMapComponent.prototype.getYDomain = function () {
            var e_2, _a, e_3, _b;
            var domain = [];
            try {
                for (var _c = __values(this.results), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var group = _d.value;
                    try {
                        for (var _e = (e_3 = void 0, __values(group.series)), _f = _e.next(); !_f.done; _f = _e.next()) {
                            var d = _f.value;
                            if (!domain.includes(d.name)) {
                                domain.push(d.name);
                            }
                        }
                    }
                    catch (e_3_1) { e_3 = { error: e_3_1 }; }
                    finally {
                        try {
                            if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                        }
                        finally { if (e_3) throw e_3.error; }
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                }
                finally { if (e_2) throw e_2.error; }
            }
            return domain;
        };
        HeatMapComponent.prototype.getValueDomain = function () {
            var e_4, _a, e_5, _b;
            var domain = [];
            try {
                for (var _c = __values(this.results), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var group = _d.value;
                    try {
                        for (var _e = (e_5 = void 0, __values(group.series)), _f = _e.next(); !_f.done; _f = _e.next()) {
                            var d = _f.value;
                            if (!domain.includes(d.value)) {
                                domain.push(d.value);
                            }
                        }
                    }
                    catch (e_5_1) { e_5 = { error: e_5_1 }; }
                    finally {
                        try {
                            if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                        }
                        finally { if (e_5) throw e_5.error; }
                    }
                }
            }
            catch (e_4_1) { e_4 = { error: e_4_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                }
                finally { if (e_4) throw e_4.error; }
            }
            return domain;
        };
        /**
         * Converts the input to gap paddingInner in fraction
         * Supports the following inputs:
         *    Numbers: 8
         *    Strings: "8", "8px", "8%"
         *    Arrays: [8,2], "8,2", "[8,2]"
         *    Mixed: [8,"2%"], ["8px","2%"], "8,2%", "[8,2%]"
         *
         * @memberOf HeatMapComponent
         */
        HeatMapComponent.prototype.getDimension = function (value, index, N, L) {
            if (index === void 0) { index = 0; }
            if (typeof value === 'string') {
                value = value
                    .replace('[', '')
                    .replace(']', '')
                    .replace('px', '')
                    // tslint:disable-next-line: quotemark
                    .replace("'", '');
                if (value.includes(',')) {
                    value = value.split(',');
                }
            }
            if (Array.isArray(value) && typeof index === 'number') {
                return this.getDimension(value[index], null, N, L);
            }
            if (typeof value === 'string' && value.includes('%')) {
                return +value.replace('%', '') / 100;
            }
            return N / (L / +value + 1);
        };
        HeatMapComponent.prototype.getXScale = function () {
            var f = this.getDimension(this.innerPadding, 0, this.xDomain.length, this.dims.width);
            return d3Scale.scaleBand().rangeRound([0, this.dims.width]).domain(this.xDomain).paddingInner(f);
        };
        HeatMapComponent.prototype.getYScale = function () {
            var f = this.getDimension(this.innerPadding, 1, this.yDomain.length, this.dims.height);
            return d3Scale.scaleBand().rangeRound([this.dims.height, 0]).domain(this.yDomain).paddingInner(f);
        };
        HeatMapComponent.prototype.getRects = function () {
            var _this = this;
            var rects = [];
            this.xDomain.map(function (xVal) {
                _this.yDomain.map(function (yVal) {
                    rects.push({
                        x: _this.xScale(xVal),
                        y: _this.yScale(yVal),
                        rx: 3,
                        width: _this.xScale.bandwidth(),
                        height: _this.yScale.bandwidth(),
                        fill: 'rgba(200,200,200,0.03)'
                    });
                });
            });
            return rects;
        };
        HeatMapComponent.prototype.onClick = function (data) {
            this.select.emit(data);
        };
        HeatMapComponent.prototype.setColors = function () {
            this.colors = new ColorHelper(this.scheme, this.scaleType, this.valueDomain);
        };
        HeatMapComponent.prototype.getLegendOptions = function () {
            return {
                scaleType: this.scaleType,
                domain: this.valueDomain,
                colors: this.scaleType === exports.ScaleType.Ordinal ? this.colors : this.colors.scale,
                title: this.scaleType === exports.ScaleType.Ordinal ? this.legendTitle : undefined,
                position: this.legendPosition
            };
        };
        HeatMapComponent.prototype.updateYAxisWidth = function (_a) {
            var width = _a.width;
            this.yAxisWidth = width;
            this.update();
        };
        HeatMapComponent.prototype.updateXAxisHeight = function (_a) {
            var height = _a.height;
            this.xAxisHeight = height;
            this.update();
        };
        HeatMapComponent.prototype.onActivate = function (event, group, fromLegend) {
            if (fromLegend === void 0) { fromLegend = false; }
            var item = Object.assign({}, event);
            if (group) {
                item.series = group.name;
            }
            var items = this.results
                .map(function (g) { return g.series; })
                .flat()
                .filter(function (i) {
                if (fromLegend) {
                    return i.label === item.name;
                }
                else {
                    return i.name === item.name && i.series === item.series;
                }
            });
            this.activeEntries = __spreadArray([], __read(items));
            this.activate.emit({ value: item, entries: this.activeEntries });
        };
        HeatMapComponent.prototype.onDeactivate = function (event, group, fromLegend) {
            if (fromLegend === void 0) { fromLegend = false; }
            var item = Object.assign({}, event);
            if (group) {
                item.series = group.name;
            }
            this.activeEntries = this.activeEntries.filter(function (i) {
                if (fromLegend) {
                    return i.label !== item.name;
                }
                else {
                    return !(i.name === item.name && i.series === item.series);
                }
            });
            this.deactivate.emit({ value: item, entries: this.activeEntries });
        };
        return HeatMapComponent;
    }(BaseChartComponent));
    HeatMapComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'ngx-charts-heat-map',
                    template: "\n    <ngx-charts-chart\n      [view]=\"[width, height]\"\n      [showLegend]=\"legend\"\n      [animations]=\"animations\"\n      [legendOptions]=\"legendOptions\"\n      (legendLabelClick)=\"onClick($event)\"\n    >\n      <svg:g [attr.transform]=\"transform\" class=\"heat-map chart\">\n        <svg:g\n          ngx-charts-x-axis\n          *ngIf=\"xAxis\"\n          [xScale]=\"xScale\"\n          [dims]=\"dims\"\n          [showLabel]=\"showXAxisLabel\"\n          [labelText]=\"xAxisLabel\"\n          [trimTicks]=\"trimXAxisTicks\"\n          [rotateTicks]=\"rotateXAxisTicks\"\n          [maxTickLength]=\"maxXAxisTickLength\"\n          [tickFormatting]=\"xAxisTickFormatting\"\n          [ticks]=\"xAxisTicks\"\n          (dimensionsChanged)=\"updateXAxisHeight($event)\"\n        ></svg:g>\n        <svg:g\n          ngx-charts-y-axis\n          *ngIf=\"yAxis\"\n          [yScale]=\"yScale\"\n          [dims]=\"dims\"\n          [showLabel]=\"showYAxisLabel\"\n          [labelText]=\"yAxisLabel\"\n          [trimTicks]=\"trimYAxisTicks\"\n          [maxTickLength]=\"maxYAxisTickLength\"\n          [tickFormatting]=\"yAxisTickFormatting\"\n          [ticks]=\"yAxisTicks\"\n          (dimensionsChanged)=\"updateYAxisWidth($event)\"\n        ></svg:g>\n        <svg:rect\n          *ngFor=\"let rect of rects\"\n          [attr.x]=\"rect.x\"\n          [attr.y]=\"rect.y\"\n          [attr.rx]=\"rect.rx\"\n          [attr.width]=\"rect.width\"\n          [attr.height]=\"rect.height\"\n          [attr.fill]=\"rect.fill\"\n        />\n        <svg:g\n          ngx-charts-heat-map-cell-series\n          [xScale]=\"xScale\"\n          [yScale]=\"yScale\"\n          [colors]=\"colors\"\n          [data]=\"results\"\n          [gradient]=\"gradient\"\n          [animations]=\"animations\"\n          [tooltipDisabled]=\"tooltipDisabled\"\n          [tooltipTemplate]=\"tooltipTemplate\"\n          [tooltipText]=\"tooltipText\"\n          (select)=\"onClick($event)\"\n          (activate)=\"onActivate($event, undefined)\"\n          (deactivate)=\"onDeactivate($event, undefined)\"\n        />\n      </svg:g>\n    </ngx-charts-chart>\n  ",
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    encapsulation: core.ViewEncapsulation.None,
                    styles: [".ngx-charts-outer{-webkit-animation:chartFadeIn linear .6s;animation:chartFadeIn linear .6s}@-webkit-keyframes chartFadeIn{0%{opacity:0}20%{opacity:0}to{opacity:1}}@keyframes chartFadeIn{0%{opacity:0}20%{opacity:0}to{opacity:1}}.ngx-charts{float:left;overflow:visible}.ngx-charts .circle,.ngx-charts .cell,.ngx-charts .bar,.ngx-charts .arc{cursor:pointer}.ngx-charts .bar.active,.ngx-charts .bar:hover,.ngx-charts .cell.active,.ngx-charts .cell:hover,.ngx-charts .arc.active,.ngx-charts .arc:hover,.ngx-charts .card.active,.ngx-charts .card:hover{opacity:.8;transition:opacity .1s ease-in-out}.ngx-charts .bar:focus,.ngx-charts .cell:focus,.ngx-charts .arc:focus,.ngx-charts .card:focus{outline:none}.ngx-charts .bar.hidden,.ngx-charts .cell.hidden,.ngx-charts .arc.hidden,.ngx-charts .card.hidden{display:none}.ngx-charts g:focus{outline:none}.ngx-charts .line-series.inactive,.ngx-charts .line-series-range.inactive,.ngx-charts .polar-series-path.inactive,.ngx-charts .polar-series-area.inactive,.ngx-charts .area-series.inactive{transition:opacity .1s ease-in-out;opacity:.2}.ngx-charts .line-highlight{display:none}.ngx-charts .line-highlight.active{display:block}.ngx-charts .area{opacity:.6}.ngx-charts .circle:hover{cursor:pointer}.ngx-charts .label{font-size:12px;font-weight:normal}.ngx-charts .tooltip-anchor{fill:#000}.ngx-charts .gridline-path{stroke:#ddd;stroke-width:1;fill:none}.ngx-charts .refline-path{stroke:#a8b2c7;stroke-width:1;stroke-dasharray:5;stroke-dashoffset:5}.ngx-charts .refline-label{font-size:9px}.ngx-charts .reference-area{fill-opacity:.05;fill:#000}.ngx-charts .gridline-path-dotted{stroke:#ddd;stroke-width:1;fill:none;stroke-dasharray:1,20;stroke-dashoffset:3}.ngx-charts .grid-panel rect{fill:none}.ngx-charts .grid-panel.odd rect{fill:#0000000d}\n"]
                },] }
    ];
    HeatMapComponent.propDecorators = {
        legend: [{ type: core.Input }],
        legendTitle: [{ type: core.Input }],
        legendPosition: [{ type: core.Input }],
        xAxis: [{ type: core.Input }],
        yAxis: [{ type: core.Input }],
        showXAxisLabel: [{ type: core.Input }],
        showYAxisLabel: [{ type: core.Input }],
        xAxisLabel: [{ type: core.Input }],
        yAxisLabel: [{ type: core.Input }],
        gradient: [{ type: core.Input }],
        innerPadding: [{ type: core.Input }],
        trimXAxisTicks: [{ type: core.Input }],
        trimYAxisTicks: [{ type: core.Input }],
        rotateXAxisTicks: [{ type: core.Input }],
        maxXAxisTickLength: [{ type: core.Input }],
        maxYAxisTickLength: [{ type: core.Input }],
        xAxisTickFormatting: [{ type: core.Input }],
        yAxisTickFormatting: [{ type: core.Input }],
        xAxisTicks: [{ type: core.Input }],
        yAxisTicks: [{ type: core.Input }],
        tooltipDisabled: [{ type: core.Input }],
        tooltipText: [{ type: core.Input }],
        min: [{ type: core.Input }],
        max: [{ type: core.Input }],
        activeEntries: [{ type: core.Input }],
        activate: [{ type: core.Output }],
        deactivate: [{ type: core.Output }],
        tooltipTemplate: [{ type: core.ContentChild, args: ['tooltipTemplate',] }]
    };

    var HeatMapModule = /** @class */ (function () {
        function HeatMapModule() {
        }
        return HeatMapModule;
    }());
    HeatMapModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [ChartCommonModule],
                    declarations: [HeatMapCellComponent, HeatCellSeriesComponent, HeatMapComponent],
                    exports: [HeatMapCellComponent, HeatCellSeriesComponent, HeatMapComponent]
                },] }
    ];

    var LineComponent = /** @class */ (function () {
        function LineComponent(element) {
            this.element = element;
            this.fill = 'none';
            this.animations = true;
            // @Output() select = new EventEmitter();
            this.initialized = false;
        }
        LineComponent.prototype.ngOnChanges = function (changes) {
            if (!this.initialized) {
                this.initialized = true;
                this.initialPath = this.path;
            }
            else {
                this.updatePathEl();
            }
        };
        LineComponent.prototype.updatePathEl = function () {
            var node = d3Selection.select(this.element.nativeElement).select('.line');
            if (this.animations) {
                node.transition().duration(750).attr('d', this.path);
            }
            else {
                node.attr('d', this.path);
            }
        };
        return LineComponent;
    }());
    LineComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'g[ngx-charts-line]',
                    template: "\n    <svg:path\n      [@animationState]=\"'active'\"\n      class=\"line\"\n      [attr.d]=\"initialPath\"\n      [attr.fill]=\"fill\"\n      [attr.stroke]=\"stroke\"\n      stroke-width=\"1.5px\"\n    />\n  ",
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    animations: [
                        animations.trigger('animationState', [
                            animations.transition(':enter', [
                                animations.style({
                                    strokeDasharray: 2000,
                                    strokeDashoffset: 2000
                                }),
                                animations.animate(1000, animations.style({
                                    strokeDashoffset: 0
                                }))
                            ])
                        ])
                    ]
                },] }
    ];
    LineComponent.ctorParameters = function () { return [
        { type: core.ElementRef }
    ]; };
    LineComponent.propDecorators = {
        path: [{ type: core.Input }],
        stroke: [{ type: core.Input }],
        data: [{ type: core.Input }],
        fill: [{ type: core.Input }],
        animations: [{ type: core.Input }]
    };

    var LineChartComponent = /** @class */ (function (_super) {
        __extends(LineChartComponent, _super);
        function LineChartComponent() {
            var _this = _super.apply(this, __spreadArray([], __read(arguments))) || this;
            _this.legendTitle = 'Legend';
            _this.legendPosition = exports.LegendPosition.Right;
            _this.showGridLines = true;
            _this.curve = d3Shape.curveLinear;
            _this.activeEntries = [];
            _this.trimXAxisTicks = true;
            _this.trimYAxisTicks = true;
            _this.rotateXAxisTicks = true;
            _this.maxXAxisTickLength = 16;
            _this.maxYAxisTickLength = 16;
            _this.roundDomains = false;
            _this.tooltipDisabled = false;
            _this.showRefLines = false;
            _this.showRefLabels = true;
            _this.activate = new core.EventEmitter();
            _this.deactivate = new core.EventEmitter();
            _this.margin = [10, 20, 10, 20];
            _this.xAxisHeight = 0;
            _this.yAxisWidth = 0;
            _this.timelineHeight = 50;
            _this.timelinePadding = 10;
            return _this;
        }
        LineChartComponent.prototype.update = function () {
            _super.prototype.update.call(this);
            this.dims = calculateViewDimensions({
                width: this.width,
                height: this.height,
                margins: this.margin,
                showXAxis: this.xAxis,
                showYAxis: this.yAxis,
                xAxisHeight: this.xAxisHeight,
                yAxisWidth: this.yAxisWidth,
                showXLabel: this.showXAxisLabel,
                showYLabel: this.showYAxisLabel,
                showLegend: this.legend,
                legendType: this.schemeType,
                legendPosition: this.legendPosition
            });
            if (this.timeline) {
                this.dims.height -= this.timelineHeight + this.margin[2] + this.timelinePadding;
            }
            this.xDomain = this.getXDomain();
            if (this.filteredDomain) {
                this.xDomain = this.filteredDomain;
            }
            this.yDomain = this.getYDomain();
            this.seriesDomain = this.getSeriesDomain();
            this.xScale = this.getXScale(this.xDomain, this.dims.width);
            this.yScale = this.getYScale(this.yDomain, this.dims.height);
            this.updateTimeline();
            this.setColors();
            this.legendOptions = this.getLegendOptions();
            this.transform = "translate(" + this.dims.xOffset + " , " + this.margin[0] + ")";
            this.clipPathId = 'clip' + id().toString();
            this.clipPath = "url(#" + this.clipPathId + ")";
        };
        LineChartComponent.prototype.updateTimeline = function () {
            if (this.timeline) {
                this.timelineWidth = this.dims.width;
                this.timelineXDomain = this.getXDomain();
                this.timelineXScale = this.getXScale(this.timelineXDomain, this.timelineWidth);
                this.timelineYScale = this.getYScale(this.yDomain, this.timelineHeight);
                this.timelineTransform = "translate(" + this.dims.xOffset + ", " + -this.margin[2] + ")";
            }
        };
        LineChartComponent.prototype.getXDomain = function () {
            var values = getUniqueXDomainValues(this.results);
            this.scaleType = getScaleType(values);
            var domain = [];
            if (this.scaleType === exports.ScaleType.Linear) {
                values = values.map(function (v) { return Number(v); });
            }
            var min;
            var max;
            if (this.scaleType === exports.ScaleType.Time || this.scaleType === exports.ScaleType.Linear) {
                min = this.xScaleMin ? this.xScaleMin : Math.min.apply(Math, __spreadArray([], __read(values)));
                max = this.xScaleMax ? this.xScaleMax : Math.max.apply(Math, __spreadArray([], __read(values)));
            }
            if (this.scaleType === exports.ScaleType.Time) {
                domain = [new Date(min), new Date(max)];
                this.xSet = __spreadArray([], __read(values)).sort(function (a, b) {
                    var aDate = a.getTime();
                    var bDate = b.getTime();
                    if (aDate > bDate)
                        return 1;
                    if (bDate > aDate)
                        return -1;
                    return 0;
                });
            }
            else if (this.scaleType === exports.ScaleType.Linear) {
                domain = [min, max];
                // Use compare function to sort numbers numerically
                this.xSet = __spreadArray([], __read(values)).sort(function (a, b) { return a - b; });
            }
            else {
                domain = values;
                this.xSet = values;
            }
            return domain;
        };
        LineChartComponent.prototype.getYDomain = function () {
            var e_1, _a, e_2, _b;
            var domain = [];
            try {
                for (var _c = __values(this.results), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var results = _d.value;
                    try {
                        for (var _e = (e_2 = void 0, __values(results.series)), _f = _e.next(); !_f.done; _f = _e.next()) {
                            var d = _f.value;
                            if (domain.indexOf(d.value) < 0) {
                                domain.push(d.value);
                            }
                            if (d.min !== undefined) {
                                this.hasRange = true;
                                if (domain.indexOf(d.min) < 0) {
                                    domain.push(d.min);
                                }
                            }
                            if (d.max !== undefined) {
                                this.hasRange = true;
                                if (domain.indexOf(d.max) < 0) {
                                    domain.push(d.max);
                                }
                            }
                        }
                    }
                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                    finally {
                        try {
                            if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                        }
                        finally { if (e_2) throw e_2.error; }
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                }
                finally { if (e_1) throw e_1.error; }
            }
            var values = __spreadArray([], __read(domain));
            if (!this.autoScale) {
                values.push(0);
            }
            var min = this.yScaleMin ? this.yScaleMin : Math.min.apply(Math, __spreadArray([], __read(values)));
            var max = this.yScaleMax ? this.yScaleMax : Math.max.apply(Math, __spreadArray([], __read(values)));
            return [min, max];
        };
        LineChartComponent.prototype.getSeriesDomain = function () {
            return this.results.map(function (d) { return d.name; });
        };
        LineChartComponent.prototype.getXScale = function (domain, width) {
            var scale;
            if (this.scaleType === exports.ScaleType.Time) {
                scale = d3Scale.scaleTime().range([0, width]).domain(domain);
            }
            else if (this.scaleType === exports.ScaleType.Linear) {
                scale = d3Scale.scaleLinear().range([0, width]).domain(domain);
                if (this.roundDomains) {
                    scale = scale.nice();
                }
            }
            else if (this.scaleType === exports.ScaleType.Ordinal) {
                scale = d3Scale.scalePoint().range([0, width]).padding(0.1).domain(domain);
            }
            return scale;
        };
        LineChartComponent.prototype.getYScale = function (domain, height) {
            var scale = d3Scale.scaleLinear().range([height, 0]).domain(domain);
            return this.roundDomains ? scale.nice() : scale;
        };
        LineChartComponent.prototype.updateDomain = function (domain) {
            this.filteredDomain = domain;
            this.xDomain = this.filteredDomain;
            this.xScale = this.getXScale(this.xDomain, this.dims.width);
        };
        LineChartComponent.prototype.updateHoveredVertical = function (item) {
            this.hoveredVertical = item.value;
            this.deactivateAll();
        };
        LineChartComponent.prototype.hideCircles = function () {
            this.hoveredVertical = null;
            this.deactivateAll();
        };
        LineChartComponent.prototype.onClick = function (data) {
            this.select.emit(data);
        };
        LineChartComponent.prototype.trackBy = function (index, item) {
            return "" + item.name;
        };
        LineChartComponent.prototype.setColors = function () {
            var domain;
            if (this.schemeType === exports.ScaleType.Ordinal) {
                domain = this.seriesDomain;
            }
            else {
                domain = this.yDomain;
            }
            this.colors = new ColorHelper(this.scheme, this.schemeType, domain, this.customColors);
        };
        LineChartComponent.prototype.getLegendOptions = function () {
            var opts = {
                scaleType: this.schemeType,
                colors: undefined,
                domain: [],
                title: undefined,
                position: this.legendPosition
            };
            if (opts.scaleType === exports.ScaleType.Ordinal) {
                opts.domain = this.seriesDomain;
                opts.colors = this.colors;
                opts.title = this.legendTitle;
            }
            else {
                opts.domain = this.yDomain;
                opts.colors = this.colors.scale;
            }
            return opts;
        };
        LineChartComponent.prototype.updateYAxisWidth = function (_a) {
            var width = _a.width;
            this.yAxisWidth = width;
            this.update();
        };
        LineChartComponent.prototype.updateXAxisHeight = function (_a) {
            var height = _a.height;
            this.xAxisHeight = height;
            this.update();
        };
        LineChartComponent.prototype.onActivate = function (item) {
            this.deactivateAll();
            var idx = this.activeEntries.findIndex(function (d) {
                return d.name === item.name && d.value === item.value;
            });
            if (idx > -1) {
                return;
            }
            this.activeEntries = [item];
            this.activate.emit({ value: item, entries: this.activeEntries });
        };
        LineChartComponent.prototype.onDeactivate = function (item) {
            var idx = this.activeEntries.findIndex(function (d) {
                return d.name === item.name && d.value === item.value;
            });
            this.activeEntries.splice(idx, 1);
            this.activeEntries = __spreadArray([], __read(this.activeEntries));
            this.deactivate.emit({ value: item, entries: this.activeEntries });
        };
        LineChartComponent.prototype.deactivateAll = function () {
            var e_3, _a;
            this.activeEntries = __spreadArray([], __read(this.activeEntries));
            try {
                for (var _b = __values(this.activeEntries), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var entry = _c.value;
                    this.deactivate.emit({ value: entry, entries: [] });
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_3) throw e_3.error; }
            }
            this.activeEntries = [];
        };
        return LineChartComponent;
    }(BaseChartComponent));
    LineChartComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'ngx-charts-line-chart',
                    template: "\n    <ngx-charts-chart\n      [view]=\"[width, height]\"\n      [showLegend]=\"legend\"\n      [legendOptions]=\"legendOptions\"\n      [activeEntries]=\"activeEntries\"\n      [animations]=\"animations\"\n      (legendLabelClick)=\"onClick($event)\"\n      (legendLabelActivate)=\"onActivate($event)\"\n      (legendLabelDeactivate)=\"onDeactivate($event)\"\n    >\n      <svg:defs>\n        <svg:clipPath [attr.id]=\"clipPathId\">\n          <svg:rect\n            [attr.width]=\"dims.width + 10\"\n            [attr.height]=\"dims.height + 10\"\n            [attr.transform]=\"'translate(-5, -5)'\"\n          />\n        </svg:clipPath>\n      </svg:defs>\n      <svg:g [attr.transform]=\"transform\" class=\"line-chart chart\">\n        <svg:g\n          ngx-charts-x-axis\n          *ngIf=\"xAxis\"\n          [xScale]=\"xScale\"\n          [dims]=\"dims\"\n          [showGridLines]=\"showGridLines\"\n          [showLabel]=\"showXAxisLabel\"\n          [labelText]=\"xAxisLabel\"\n          [trimTicks]=\"trimXAxisTicks\"\n          [rotateTicks]=\"rotateXAxisTicks\"\n          [maxTickLength]=\"maxXAxisTickLength\"\n          [tickFormatting]=\"xAxisTickFormatting\"\n          [ticks]=\"xAxisTicks\"\n          (dimensionsChanged)=\"updateXAxisHeight($event)\"\n        ></svg:g>\n        <svg:g\n          ngx-charts-y-axis\n          *ngIf=\"yAxis\"\n          [yScale]=\"yScale\"\n          [dims]=\"dims\"\n          [showGridLines]=\"showGridLines\"\n          [showLabel]=\"showYAxisLabel\"\n          [labelText]=\"yAxisLabel\"\n          [trimTicks]=\"trimYAxisTicks\"\n          [maxTickLength]=\"maxYAxisTickLength\"\n          [tickFormatting]=\"yAxisTickFormatting\"\n          [ticks]=\"yAxisTicks\"\n          [referenceLines]=\"referenceLines\"\n          [showRefLines]=\"showRefLines\"\n          [showRefLabels]=\"showRefLabels\"\n          (dimensionsChanged)=\"updateYAxisWidth($event)\"\n        ></svg:g>\n        <svg:g [attr.clip-path]=\"clipPath\">\n          <svg:g *ngFor=\"let series of results; trackBy: trackBy\" [@animationState]=\"'active'\">\n            <svg:g\n              ngx-charts-line-series\n              [xScale]=\"xScale\"\n              [yScale]=\"yScale\"\n              [colors]=\"colors\"\n              [data]=\"series\"\n              [activeEntries]=\"activeEntries\"\n              [scaleType]=\"scaleType\"\n              [curve]=\"curve\"\n              [rangeFillOpacity]=\"rangeFillOpacity\"\n              [hasRange]=\"hasRange\"\n              [animations]=\"animations\"\n            />\n          </svg:g>\n\n          <svg:g *ngIf=\"!tooltipDisabled\" (mouseleave)=\"hideCircles()\">\n            <svg:g\n              ngx-charts-tooltip-area\n              [dims]=\"dims\"\n              [xSet]=\"xSet\"\n              [xScale]=\"xScale\"\n              [yScale]=\"yScale\"\n              [results]=\"results\"\n              [colors]=\"colors\"\n              [tooltipDisabled]=\"tooltipDisabled\"\n              [tooltipTemplate]=\"seriesTooltipTemplate\"\n              (hover)=\"updateHoveredVertical($event)\"\n            />\n\n            <svg:g *ngFor=\"let series of results\">\n              <svg:g\n                ngx-charts-circle-series\n                [xScale]=\"xScale\"\n                [yScale]=\"yScale\"\n                [colors]=\"colors\"\n                [data]=\"series\"\n                [scaleType]=\"scaleType\"\n                [visibleValue]=\"hoveredVertical\"\n                [activeEntries]=\"activeEntries\"\n                [tooltipDisabled]=\"tooltipDisabled\"\n                [tooltipTemplate]=\"tooltipTemplate\"\n                (select)=\"onClick($event)\"\n                (activate)=\"onActivate($event)\"\n                (deactivate)=\"onDeactivate($event)\"\n              />\n            </svg:g>\n          </svg:g>\n        </svg:g>\n      </svg:g>\n      <svg:g\n        ngx-charts-timeline\n        *ngIf=\"timeline && scaleType != 'ordinal'\"\n        [attr.transform]=\"timelineTransform\"\n        [results]=\"results\"\n        [view]=\"[timelineWidth, height]\"\n        [height]=\"timelineHeight\"\n        [scheme]=\"scheme\"\n        [customColors]=\"customColors\"\n        [scaleType]=\"scaleType\"\n        [legend]=\"legend\"\n        (onDomainChange)=\"updateDomain($event)\"\n      >\n        <svg:g *ngFor=\"let series of results; trackBy: trackBy\">\n          <svg:g\n            ngx-charts-line-series\n            [xScale]=\"timelineXScale\"\n            [yScale]=\"timelineYScale\"\n            [colors]=\"colors\"\n            [data]=\"series\"\n            [scaleType]=\"scaleType\"\n            [curve]=\"curve\"\n            [hasRange]=\"hasRange\"\n            [animations]=\"animations\"\n          />\n        </svg:g>\n      </svg:g>\n    </ngx-charts-chart>\n  ",
                    encapsulation: core.ViewEncapsulation.None,
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    animations: [
                        animations.trigger('animationState', [
                            animations.transition(':leave', [
                                animations.style({
                                    opacity: 1
                                }),
                                animations.animate(500, animations.style({
                                    opacity: 0
                                }))
                            ])
                        ])
                    ],
                    styles: [".ngx-charts-outer{-webkit-animation:chartFadeIn linear .6s;animation:chartFadeIn linear .6s}@-webkit-keyframes chartFadeIn{0%{opacity:0}20%{opacity:0}to{opacity:1}}@keyframes chartFadeIn{0%{opacity:0}20%{opacity:0}to{opacity:1}}.ngx-charts{float:left;overflow:visible}.ngx-charts .circle,.ngx-charts .cell,.ngx-charts .bar,.ngx-charts .arc{cursor:pointer}.ngx-charts .bar.active,.ngx-charts .bar:hover,.ngx-charts .cell.active,.ngx-charts .cell:hover,.ngx-charts .arc.active,.ngx-charts .arc:hover,.ngx-charts .card.active,.ngx-charts .card:hover{opacity:.8;transition:opacity .1s ease-in-out}.ngx-charts .bar:focus,.ngx-charts .cell:focus,.ngx-charts .arc:focus,.ngx-charts .card:focus{outline:none}.ngx-charts .bar.hidden,.ngx-charts .cell.hidden,.ngx-charts .arc.hidden,.ngx-charts .card.hidden{display:none}.ngx-charts g:focus{outline:none}.ngx-charts .line-series.inactive,.ngx-charts .line-series-range.inactive,.ngx-charts .polar-series-path.inactive,.ngx-charts .polar-series-area.inactive,.ngx-charts .area-series.inactive{transition:opacity .1s ease-in-out;opacity:.2}.ngx-charts .line-highlight{display:none}.ngx-charts .line-highlight.active{display:block}.ngx-charts .area{opacity:.6}.ngx-charts .circle:hover{cursor:pointer}.ngx-charts .label{font-size:12px;font-weight:normal}.ngx-charts .tooltip-anchor{fill:#000}.ngx-charts .gridline-path{stroke:#ddd;stroke-width:1;fill:none}.ngx-charts .refline-path{stroke:#a8b2c7;stroke-width:1;stroke-dasharray:5;stroke-dashoffset:5}.ngx-charts .refline-label{font-size:9px}.ngx-charts .reference-area{fill-opacity:.05;fill:#000}.ngx-charts .gridline-path-dotted{stroke:#ddd;stroke-width:1;fill:none;stroke-dasharray:1,20;stroke-dashoffset:3}.ngx-charts .grid-panel rect{fill:none}.ngx-charts .grid-panel.odd rect{fill:#0000000d}\n"]
                },] }
    ];
    LineChartComponent.propDecorators = {
        legend: [{ type: core.Input }],
        legendTitle: [{ type: core.Input }],
        legendPosition: [{ type: core.Input }],
        xAxis: [{ type: core.Input }],
        yAxis: [{ type: core.Input }],
        showXAxisLabel: [{ type: core.Input }],
        showYAxisLabel: [{ type: core.Input }],
        xAxisLabel: [{ type: core.Input }],
        yAxisLabel: [{ type: core.Input }],
        autoScale: [{ type: core.Input }],
        timeline: [{ type: core.Input }],
        gradient: [{ type: core.Input }],
        showGridLines: [{ type: core.Input }],
        curve: [{ type: core.Input }],
        activeEntries: [{ type: core.Input }],
        schemeType: [{ type: core.Input }],
        rangeFillOpacity: [{ type: core.Input }],
        trimXAxisTicks: [{ type: core.Input }],
        trimYAxisTicks: [{ type: core.Input }],
        rotateXAxisTicks: [{ type: core.Input }],
        maxXAxisTickLength: [{ type: core.Input }],
        maxYAxisTickLength: [{ type: core.Input }],
        xAxisTickFormatting: [{ type: core.Input }],
        yAxisTickFormatting: [{ type: core.Input }],
        xAxisTicks: [{ type: core.Input }],
        yAxisTicks: [{ type: core.Input }],
        roundDomains: [{ type: core.Input }],
        tooltipDisabled: [{ type: core.Input }],
        showRefLines: [{ type: core.Input }],
        referenceLines: [{ type: core.Input }],
        showRefLabels: [{ type: core.Input }],
        xScaleMin: [{ type: core.Input }],
        xScaleMax: [{ type: core.Input }],
        yScaleMin: [{ type: core.Input }],
        yScaleMax: [{ type: core.Input }],
        activate: [{ type: core.Output }],
        deactivate: [{ type: core.Output }],
        tooltipTemplate: [{ type: core.ContentChild, args: ['tooltipTemplate',] }],
        seriesTooltipTemplate: [{ type: core.ContentChild, args: ['seriesTooltipTemplate',] }],
        hideCircles: [{ type: core.HostListener, args: ['mouseleave',] }]
    };

    var LineSeriesComponent = /** @class */ (function () {
        function LineSeriesComponent() {
            this.animations = true;
            this.barOrientation = exports.BarOrientation;
        }
        LineSeriesComponent.prototype.ngOnChanges = function (changes) {
            this.update();
        };
        LineSeriesComponent.prototype.update = function () {
            this.updateGradients();
            var data = this.sortData(this.data.series);
            var lineGen = this.getLineGenerator();
            this.path = lineGen(data) || '';
            var areaGen = this.getAreaGenerator();
            this.areaPath = areaGen(data) || '';
            if (this.hasRange) {
                var range = this.getRangeGenerator();
                this.outerPath = range(data) || '';
            }
            if (this.hasGradient) {
                this.stroke = this.gradientUrl;
                var values = this.data.series.map(function (d) { return d.value; });
                var max = Math.max.apply(Math, __spreadArray([], __read(values)));
                var min = Math.min.apply(Math, __spreadArray([], __read(values)));
                if (max === min) {
                    this.stroke = this.colors.getColor(max);
                }
            }
            else {
                this.stroke = this.colors.getColor(this.data.name);
            }
        };
        LineSeriesComponent.prototype.getLineGenerator = function () {
            var _this = this;
            return d3Shape.line()
                .x(function (d) {
                var label = d.name;
                var value;
                if (_this.scaleType === exports.ScaleType.Time) {
                    value = _this.xScale(label);
                }
                else if (_this.scaleType === exports.ScaleType.Linear) {
                    value = _this.xScale(Number(label));
                }
                else {
                    value = _this.xScale(label);
                }
                return value;
            })
                .y(function (d) { return _this.yScale(d.value); })
                .curve(this.curve);
        };
        LineSeriesComponent.prototype.getRangeGenerator = function () {
            var _this = this;
            return d3Shape.area()
                .x(function (d) {
                var label = d.name;
                var value;
                if (_this.scaleType === exports.ScaleType.Time) {
                    value = _this.xScale(label);
                }
                else if (_this.scaleType === exports.ScaleType.Linear) {
                    value = _this.xScale(Number(label));
                }
                else {
                    value = _this.xScale(label);
                }
                return value;
            })
                .y0(function (d) { return _this.yScale(typeof d.min === 'number' ? d.min : d.value); })
                .y1(function (d) { return _this.yScale(typeof d.max === 'number' ? d.max : d.value); })
                .curve(this.curve);
        };
        LineSeriesComponent.prototype.getAreaGenerator = function () {
            var _this = this;
            var xProperty = function (d) {
                var label = d.name;
                return _this.xScale(label);
            };
            return d3Shape.area()
                .x(xProperty)
                .y0(function () { return _this.yScale.range()[0]; })
                .y1(function (d) { return _this.yScale(d.value); })
                .curve(this.curve);
        };
        LineSeriesComponent.prototype.sortData = function (data) {
            if (this.scaleType === exports.ScaleType.Linear) {
                data = sortLinear(data, 'name');
            }
            else if (this.scaleType === exports.ScaleType.Time) {
                data = sortByTime(data, 'name');
            }
            else {
                data = sortByDomain(data, 'name', 'asc', this.xScale.domain());
            }
            return data;
        };
        LineSeriesComponent.prototype.updateGradients = function () {
            if (this.colors.scaleType === exports.ScaleType.Linear) {
                this.hasGradient = true;
                this.gradientId = 'grad' + id().toString();
                this.gradientUrl = "url(#" + this.gradientId + ")";
                var values = this.data.series.map(function (d) { return d.value; });
                var max = Math.max.apply(Math, __spreadArray([], __read(values)));
                var min = Math.min.apply(Math, __spreadArray([], __read(values)));
                this.gradientStops = this.colors.getLinearGradientStops(max, min);
                this.areaGradientStops = this.colors.getLinearGradientStops(max);
            }
            else {
                this.hasGradient = false;
                this.gradientStops = undefined;
                this.areaGradientStops = undefined;
            }
        };
        LineSeriesComponent.prototype.isActive = function (entry) {
            if (!this.activeEntries)
                return false;
            var item = this.activeEntries.find(function (d) {
                return entry.name === d.name;
            });
            return item !== undefined;
        };
        LineSeriesComponent.prototype.isInactive = function (entry) {
            if (!this.activeEntries || this.activeEntries.length === 0)
                return false;
            var item = this.activeEntries.find(function (d) {
                return entry.name === d.name;
            });
            return item === undefined;
        };
        return LineSeriesComponent;
    }());
    LineSeriesComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'g[ngx-charts-line-series]',
                    template: "\n    <svg:g>\n      <defs>\n        <svg:g\n          ngx-charts-svg-linear-gradient\n          *ngIf=\"hasGradient\"\n          [orientation]=\"barOrientation.Vertical\"\n          [name]=\"gradientId\"\n          [stops]=\"gradientStops\"\n        />\n      </defs>\n      <svg:g\n        ngx-charts-area\n        class=\"line-highlight\"\n        [data]=\"data\"\n        [path]=\"areaPath\"\n        [fill]=\"hasGradient ? gradientUrl : colors.getColor(data.name)\"\n        [opacity]=\"0.25\"\n        [startOpacity]=\"0\"\n        [gradient]=\"true\"\n        [stops]=\"areaGradientStops\"\n        [class.active]=\"isActive(data)\"\n        [class.inactive]=\"isInactive(data)\"\n        [animations]=\"animations\"\n      />\n      <svg:g\n        ngx-charts-line\n        class=\"line-series\"\n        [data]=\"data\"\n        [path]=\"path\"\n        [stroke]=\"stroke\"\n        [animations]=\"animations\"\n        [class.active]=\"isActive(data)\"\n        [class.inactive]=\"isInactive(data)\"\n      />\n      <svg:g\n        ngx-charts-area\n        *ngIf=\"hasRange\"\n        class=\"line-series-range\"\n        [data]=\"data\"\n        [path]=\"outerPath\"\n        [fill]=\"hasGradient ? gradientUrl : colors.getColor(data.name)\"\n        [class.active]=\"isActive(data)\"\n        [class.inactive]=\"isInactive(data)\"\n        [opacity]=\"rangeFillOpacity\"\n        [animations]=\"animations\"\n      />\n    </svg:g>\n  ",
                    changeDetection: core.ChangeDetectionStrategy.OnPush
                },] }
    ];
    LineSeriesComponent.propDecorators = {
        data: [{ type: core.Input }],
        xScale: [{ type: core.Input }],
        yScale: [{ type: core.Input }],
        colors: [{ type: core.Input }],
        scaleType: [{ type: core.Input }],
        curve: [{ type: core.Input }],
        activeEntries: [{ type: core.Input }],
        rangeFillOpacity: [{ type: core.Input }],
        hasRange: [{ type: core.Input }],
        animations: [{ type: core.Input }]
    };

    var LineChartModule = /** @class */ (function () {
        function LineChartModule() {
        }
        return LineChartModule;
    }());
    LineChartModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [ChartCommonModule],
                    declarations: [LineComponent, LineChartComponent, LineSeriesComponent],
                    exports: [LineComponent, LineChartComponent, LineSeriesComponent]
                },] }
    ];

    var twoPI = 2 * Math.PI;
    var PolarChartComponent = /** @class */ (function (_super) {
        __extends(PolarChartComponent, _super);
        function PolarChartComponent() {
            var _this = _super.apply(this, __spreadArray([], __read(arguments))) || this;
            _this.legendTitle = 'Legend';
            _this.legendPosition = exports.LegendPosition.Right;
            _this.showGridLines = true;
            _this.curve = d3Shape.curveCardinalClosed;
            _this.activeEntries = [];
            _this.rangeFillOpacity = 0.15;
            _this.trimYAxisTicks = true;
            _this.maxYAxisTickLength = 16;
            _this.roundDomains = false;
            _this.tooltipDisabled = false;
            _this.showSeriesOnHover = true;
            _this.gradient = false;
            _this.yAxisMinScale = 0;
            _this.labelTrim = true;
            _this.labelTrimSize = 10;
            _this.activate = new core.EventEmitter();
            _this.deactivate = new core.EventEmitter();
            // series: any; // ???
            _this.margin = [10, 20, 10, 20];
            _this.xAxisHeight = 0;
            _this.yAxisWidth = 0;
            _this.orientation = exports.Orientation;
            return _this;
        }
        PolarChartComponent.prototype.update = function () {
            _super.prototype.update.call(this);
            this.setDims();
            this.setScales();
            this.setColors();
            this.legendOptions = this.getLegendOptions();
            this.setTicks();
        };
        PolarChartComponent.prototype.setDims = function () {
            this.dims = calculateViewDimensions({
                width: this.width,
                height: this.height,
                margins: this.margin,
                showXAxis: this.xAxis,
                showYAxis: this.yAxis,
                xAxisHeight: this.xAxisHeight,
                yAxisWidth: this.yAxisWidth,
                showXLabel: this.showXAxisLabel,
                showYLabel: this.showYAxisLabel,
                showLegend: this.legend,
                legendType: this.schemeType,
                legendPosition: this.legendPosition
            });
            var halfWidth = Math.floor(this.dims.width / 2);
            var halfHeight = Math.floor(this.dims.height / 2);
            var outerRadius = (this.outerRadius = Math.min(halfHeight / 1.5, halfWidth / 1.5));
            var yOffset = Math.max(0, halfHeight - outerRadius);
            this.yAxisDims = Object.assign(Object.assign({}, this.dims), { width: halfWidth });
            this.transform = "translate(" + this.dims.xOffset + ", " + this.margin[0] + ")";
            this.transformYAxis = "translate(0, " + yOffset + ")";
            this.labelOffset = this.dims.height + 40;
            this.transformPlot = "translate(" + halfWidth + ", " + halfHeight + ")";
        };
        PolarChartComponent.prototype.setScales = function () {
            var xValues = this.getXValues();
            this.scaleType = getScaleType(xValues);
            this.xDomain = this.filteredDomain || this.getXDomain(xValues);
            this.yDomain = this.getYDomain();
            this.seriesDomain = this.getSeriesDomain();
            this.xScale = this.getXScale(this.xDomain, twoPI);
            this.yScale = this.getYScale(this.yDomain, this.outerRadius);
            this.yAxisScale = this.getYScale(this.yDomain.reverse(), this.outerRadius);
        };
        PolarChartComponent.prototype.setTicks = function () {
            var _this = this;
            var tickFormat;
            if (this.xAxisTickFormatting) {
                tickFormat = this.xAxisTickFormatting;
            }
            else if (this.xScale.tickFormat) {
                tickFormat = this.xScale.tickFormat.apply(this.xScale, [5]);
            }
            else {
                tickFormat = function (d) {
                    if (isDate(d)) {
                        return d.toLocaleDateString();
                    }
                    return d.toLocaleString();
                };
            }
            var outerRadius = this.outerRadius;
            var s = 1.1;
            this.thetaTicks = this.xDomain.map(function (d) {
                var startAngle = _this.xScale(d);
                var dd = s * outerRadius * (startAngle > Math.PI ? -1 : 1);
                var label = tickFormat(d);
                var startPos = [outerRadius * Math.sin(startAngle), -outerRadius * Math.cos(startAngle)];
                var pos = [dd, s * startPos[1]];
                return {
                    innerRadius: 0,
                    outerRadius: outerRadius,
                    startAngle: startAngle,
                    endAngle: startAngle,
                    value: outerRadius,
                    label: label,
                    startPos: startPos,
                    pos: pos
                };
            });
            var minDistance = 10;
            /* from pie chart, abstract out -*/
            for (var i = 0; i < this.thetaTicks.length - 1; i++) {
                var a = this.thetaTicks[i];
                for (var j = i + 1; j < this.thetaTicks.length; j++) {
                    var b = this.thetaTicks[j];
                    // if they're on the same side
                    if (b.pos[0] * a.pos[0] > 0) {
                        // if they're overlapping
                        var o = minDistance - Math.abs(b.pos[1] - a.pos[1]);
                        if (o > 0) {
                            // push the second up or down
                            b.pos[1] += Math.sign(b.pos[0]) * o;
                        }
                    }
                }
            }
            this.radiusTicks = this.yAxisScale.ticks(Math.floor(this.dims.height / 50)).map(function (d) { return _this.yScale(d); });
        };
        PolarChartComponent.prototype.getXValues = function () {
            var e_1, _a, e_2, _b;
            var values = [];
            try {
                for (var _c = __values(this.results), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var results = _d.value;
                    try {
                        for (var _e = (e_2 = void 0, __values(results.series)), _f = _e.next(); !_f.done; _f = _e.next()) {
                            var d = _f.value;
                            if (!values.includes(d.name)) {
                                values.push(d.name);
                            }
                        }
                    }
                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                    finally {
                        try {
                            if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                        }
                        finally { if (e_2) throw e_2.error; }
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return values;
        };
        PolarChartComponent.prototype.getXDomain = function (values) {
            if (values === void 0) { values = this.getXValues(); }
            if (this.scaleType === exports.ScaleType.Time) {
                var min = Math.min.apply(Math, __spreadArray([], __read(values)));
                var max = Math.max.apply(Math, __spreadArray([], __read(values)));
                return [min, max];
            }
            else if (this.scaleType === exports.ScaleType.Linear) {
                values = values.map(function (v) { return Number(v); });
                var min = Math.min.apply(Math, __spreadArray([], __read(values)));
                var max = Math.max.apply(Math, __spreadArray([], __read(values)));
                return [min, max];
            }
            return values;
        };
        PolarChartComponent.prototype.getYValues = function () {
            var e_3, _a, e_4, _b;
            var domain = [];
            try {
                for (var _c = __values(this.results), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var results = _d.value;
                    try {
                        for (var _e = (e_4 = void 0, __values(results.series)), _f = _e.next(); !_f.done; _f = _e.next()) {
                            var d = _f.value;
                            if (domain.indexOf(d.value) < 0) {
                                domain.push(d.value);
                            }
                            if (d.min !== undefined) {
                                if (domain.indexOf(d.min) < 0) {
                                    domain.push(d.min);
                                }
                            }
                            if (d.max !== undefined) {
                                if (domain.indexOf(d.max) < 0) {
                                    domain.push(d.max);
                                }
                            }
                        }
                    }
                    catch (e_4_1) { e_4 = { error: e_4_1 }; }
                    finally {
                        try {
                            if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                        }
                        finally { if (e_4) throw e_4.error; }
                    }
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                }
                finally { if (e_3) throw e_3.error; }
            }
            return domain;
        };
        PolarChartComponent.prototype.getYDomain = function (domain) {
            if (domain === void 0) { domain = this.getYValues(); }
            var min = Math.min.apply(Math, __spreadArray([], __read(domain)));
            var max = Math.max.apply(Math, __spreadArray([this.yAxisMinScale], __read(domain)));
            min = Math.max(0, min);
            if (!this.autoScale) {
                min = Math.min(0, min);
            }
            return [min, max];
        };
        PolarChartComponent.prototype.getSeriesDomain = function () {
            return this.results.map(function (d) { return d.name; });
        };
        PolarChartComponent.prototype.getXScale = function (domain, width) {
            switch (this.scaleType) {
                case exports.ScaleType.Time:
                    return d3Scale.scaleTime().range([0, width]).domain(domain);
                case exports.ScaleType.Linear:
                    var scale = d3Scale.scaleLinear().range([0, width]).domain(domain);
                    return this.roundDomains ? scale.nice() : scale;
                default:
                    return d3Scale.scalePoint()
                        .range([0, width - twoPI / domain.length])
                        .padding(0)
                        .domain(domain);
            }
        };
        PolarChartComponent.prototype.getYScale = function (domain, height) {
            var scale = d3Scale.scaleLinear().range([0, height]).domain(domain);
            return this.roundDomains ? scale.nice() : scale;
        };
        PolarChartComponent.prototype.onClick = function (data, series) {
            if (series) {
                data.series = series.name;
            }
            this.select.emit(data);
        };
        PolarChartComponent.prototype.setColors = function () {
            var domain = this.schemeType === exports.ScaleType.Ordinal ? this.seriesDomain : this.yDomain.reverse();
            this.colors = new ColorHelper(this.scheme, this.schemeType, domain, this.customColors);
        };
        PolarChartComponent.prototype.getLegendOptions = function () {
            if (this.schemeType === exports.ScaleType.Ordinal) {
                return {
                    scaleType: this.schemeType,
                    colors: this.colors,
                    domain: this.seriesDomain,
                    title: this.legendTitle,
                    position: this.legendPosition
                };
            }
            return {
                scaleType: this.schemeType,
                colors: this.colors.scale,
                domain: this.yDomain,
                title: undefined,
                position: this.legendPosition
            };
        };
        PolarChartComponent.prototype.updateYAxisWidth = function (_a) {
            var width = _a.width;
            this.yAxisWidth = width;
            this.update();
        };
        PolarChartComponent.prototype.updateXAxisHeight = function (_a) {
            var height = _a.height;
            this.xAxisHeight = height;
            this.update();
        };
        PolarChartComponent.prototype.onActivate = function (item) {
            var idx = this.activeEntries.findIndex(function (d) {
                return d.name === item.name && d.value === item.value;
            });
            if (idx > -1) {
                return;
            }
            this.activeEntries = this.showSeriesOnHover ? __spreadArray([item], __read(this.activeEntries)) : this.activeEntries;
            this.activate.emit({ value: item, entries: this.activeEntries });
        };
        PolarChartComponent.prototype.onDeactivate = function (item) {
            var idx = this.activeEntries.findIndex(function (d) {
                return d.name === item.name && d.value === item.value;
            });
            this.activeEntries.splice(idx, 1);
            this.activeEntries = __spreadArray([], __read(this.activeEntries));
            this.deactivate.emit({ value: item, entries: this.activeEntries });
        };
        PolarChartComponent.prototype.deactivateAll = function () {
            var e_5, _a;
            this.activeEntries = __spreadArray([], __read(this.activeEntries));
            try {
                for (var _b = __values(this.activeEntries), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var entry = _c.value;
                    this.deactivate.emit({ value: entry, entries: [] });
                }
            }
            catch (e_5_1) { e_5 = { error: e_5_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_5) throw e_5.error; }
            }
            this.activeEntries = [];
        };
        PolarChartComponent.prototype.trackBy = function (index, item) {
            return "" + item.name;
        };
        return PolarChartComponent;
    }(BaseChartComponent));
    PolarChartComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'ngx-charts-polar-chart',
                    template: "\n    <ngx-charts-chart\n      [view]=\"[width, height]\"\n      [showLegend]=\"legend\"\n      [legendOptions]=\"legendOptions\"\n      [activeEntries]=\"activeEntries\"\n      [animations]=\"animations\"\n      (legendLabelClick)=\"onClick($event)\"\n      (legendLabelActivate)=\"onActivate($event)\"\n      (legendLabelDeactivate)=\"onDeactivate($event)\"\n    >\n      <svg:g class=\"polar-chart chart\" [attr.transform]=\"transform\">\n        <svg:g [attr.transform]=\"transformPlot\">\n          <svg:circle class=\"polar-chart-background\" cx=\"0\" cy=\"0\" [attr.r]=\"this.outerRadius\" />\n          <svg:g *ngIf=\"showGridLines\">\n            <svg:circle\n              *ngFor=\"let r of radiusTicks\"\n              class=\"gridline-path radial-gridline-path\"\n              cx=\"0\"\n              cy=\"0\"\n              [attr.r]=\"r\"\n            />\n          </svg:g>\n          <svg:g *ngIf=\"xAxis\">\n            <svg:g\n              ngx-charts-pie-label\n              *ngFor=\"let tick of thetaTicks\"\n              [data]=\"tick\"\n              [radius]=\"outerRadius\"\n              [label]=\"tick.label\"\n              [max]=\"outerRadius\"\n              [value]=\"showGridLines ? 1 : outerRadius\"\n              [explodeSlices]=\"true\"\n              [animations]=\"animations\"\n              [labelTrim]=\"labelTrim\"\n              [labelTrimSize]=\"labelTrimSize\"\n            ></svg:g>\n          </svg:g>\n        </svg:g>\n        <svg:g\n          ngx-charts-y-axis\n          [attr.transform]=\"transformYAxis\"\n          *ngIf=\"yAxis\"\n          [yScale]=\"yAxisScale\"\n          [dims]=\"yAxisDims\"\n          [showGridLines]=\"showGridLines\"\n          [showLabel]=\"showYAxisLabel\"\n          [labelText]=\"yAxisLabel\"\n          [trimTicks]=\"trimYAxisTicks\"\n          [maxTickLength]=\"maxYAxisTickLength\"\n          [tickFormatting]=\"yAxisTickFormatting\"\n          (dimensionsChanged)=\"updateYAxisWidth($event)\"\n        ></svg:g>\n        <svg:g\n          ngx-charts-axis-label\n          *ngIf=\"xAxis && showXAxisLabel\"\n          [label]=\"xAxisLabel\"\n          [offset]=\"labelOffset\"\n          [orient]=\"orientation.Bottom\"\n          [height]=\"dims.height\"\n          [width]=\"dims.width\"\n        ></svg:g>\n        <svg:g [attr.transform]=\"transformPlot\">\n          <svg:g *ngFor=\"let series of results; trackBy: trackBy\" [@animationState]=\"'active'\">\n            <svg:g\n              ngx-charts-polar-series\n              [gradient]=\"gradient\"\n              [xScale]=\"xScale\"\n              [yScale]=\"yScale\"\n              [colors]=\"colors\"\n              [data]=\"series\"\n              [activeEntries]=\"activeEntries\"\n              [scaleType]=\"scaleType\"\n              [curve]=\"curve\"\n              [rangeFillOpacity]=\"rangeFillOpacity\"\n              [animations]=\"animations\"\n              [tooltipDisabled]=\"tooltipDisabled\"\n              [tooltipTemplate]=\"tooltipTemplate\"\n              (select)=\"onClick($event)\"\n              (activate)=\"onActivate($event)\"\n              (deactivate)=\"onDeactivate($event)\"\n            />\n          </svg:g>\n        </svg:g>\n      </svg:g>\n    </ngx-charts-chart>\n  ",
                    encapsulation: core.ViewEncapsulation.None,
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    animations: [
                        animations.trigger('animationState', [
                            animations.transition(':leave', [
                                animations.style({
                                    opacity: 1
                                }),
                                animations.animate(500, animations.style({
                                    opacity: 0
                                }))
                            ])
                        ])
                    ],
                    styles: [".ngx-charts-outer{-webkit-animation:chartFadeIn linear .6s;animation:chartFadeIn linear .6s}@-webkit-keyframes chartFadeIn{0%{opacity:0}20%{opacity:0}to{opacity:1}}@keyframes chartFadeIn{0%{opacity:0}20%{opacity:0}to{opacity:1}}.ngx-charts{float:left;overflow:visible}.ngx-charts .circle,.ngx-charts .cell,.ngx-charts .bar,.ngx-charts .arc{cursor:pointer}.ngx-charts .bar.active,.ngx-charts .bar:hover,.ngx-charts .cell.active,.ngx-charts .cell:hover,.ngx-charts .arc.active,.ngx-charts .arc:hover,.ngx-charts .card.active,.ngx-charts .card:hover{opacity:.8;transition:opacity .1s ease-in-out}.ngx-charts .bar:focus,.ngx-charts .cell:focus,.ngx-charts .arc:focus,.ngx-charts .card:focus{outline:none}.ngx-charts .bar.hidden,.ngx-charts .cell.hidden,.ngx-charts .arc.hidden,.ngx-charts .card.hidden{display:none}.ngx-charts g:focus{outline:none}.ngx-charts .line-series.inactive,.ngx-charts .line-series-range.inactive,.ngx-charts .polar-series-path.inactive,.ngx-charts .polar-series-area.inactive,.ngx-charts .area-series.inactive{transition:opacity .1s ease-in-out;opacity:.2}.ngx-charts .line-highlight{display:none}.ngx-charts .line-highlight.active{display:block}.ngx-charts .area{opacity:.6}.ngx-charts .circle:hover{cursor:pointer}.ngx-charts .label{font-size:12px;font-weight:normal}.ngx-charts .tooltip-anchor{fill:#000}.ngx-charts .gridline-path{stroke:#ddd;stroke-width:1;fill:none}.ngx-charts .refline-path{stroke:#a8b2c7;stroke-width:1;stroke-dasharray:5;stroke-dashoffset:5}.ngx-charts .refline-label{font-size:9px}.ngx-charts .reference-area{fill-opacity:.05;fill:#000}.ngx-charts .gridline-path-dotted{stroke:#ddd;stroke-width:1;fill:none;stroke-dasharray:1,20;stroke-dashoffset:3}.ngx-charts .grid-panel rect{fill:none}.ngx-charts .grid-panel.odd rect{fill:#0000000d}\n", ".pie-label{font-size:11px}.pie-label.animation{-webkit-animation:.75s ease-in fadeIn;animation:.75s ease-in fadeIn}@-webkit-keyframes fadeIn{0%{opacity:0}to{opacity:1}}@keyframes fadeIn{0%{opacity:0}to{opacity:1}}.pie-label-line{stroke-dasharray:100%}.pie-label-line.animation{-webkit-animation:3s linear drawOut;animation:3s linear drawOut;transition:d .75s}@-webkit-keyframes drawOut{0%{stroke-dashoffset:100%}to{stroke-dashoffset:0}}@keyframes drawOut{0%{stroke-dashoffset:100%}to{stroke-dashoffset:0}}\n", ".polar-chart .polar-chart-background{fill:none}.polar-chart .radial-gridline-path{stroke-dasharray:10 10;fill:none}.polar-chart .pie-label-line{stroke:#2f3646}.polar-charts-series .polar-series-area{pointer-events:none}.polar-series-path{pointer-events:none}\n"]
                },] }
    ];
    PolarChartComponent.propDecorators = {
        legend: [{ type: core.Input }],
        legendTitle: [{ type: core.Input }],
        legendPosition: [{ type: core.Input }],
        xAxis: [{ type: core.Input }],
        yAxis: [{ type: core.Input }],
        showXAxisLabel: [{ type: core.Input }],
        showYAxisLabel: [{ type: core.Input }],
        xAxisLabel: [{ type: core.Input }],
        yAxisLabel: [{ type: core.Input }],
        autoScale: [{ type: core.Input }],
        showGridLines: [{ type: core.Input }],
        curve: [{ type: core.Input }],
        activeEntries: [{ type: core.Input }],
        schemeType: [{ type: core.Input }],
        rangeFillOpacity: [{ type: core.Input }],
        trimYAxisTicks: [{ type: core.Input }],
        maxYAxisTickLength: [{ type: core.Input }],
        xAxisTickFormatting: [{ type: core.Input }],
        yAxisTickFormatting: [{ type: core.Input }],
        roundDomains: [{ type: core.Input }],
        tooltipDisabled: [{ type: core.Input }],
        showSeriesOnHover: [{ type: core.Input }],
        gradient: [{ type: core.Input }],
        yAxisMinScale: [{ type: core.Input }],
        labelTrim: [{ type: core.Input }],
        labelTrimSize: [{ type: core.Input }],
        activate: [{ type: core.Output }],
        deactivate: [{ type: core.Output }],
        tooltipTemplate: [{ type: core.ContentChild, args: ['tooltipTemplate',] }]
    };

    var PolarSeriesComponent = /** @class */ (function () {
        function PolarSeriesComponent() {
            this.tooltipDisabled = false;
            this.gradient = false;
            this.animations = true;
            this.select = new core.EventEmitter();
            this.activate = new core.EventEmitter();
            this.deactivate = new core.EventEmitter();
            this.circleRadius = 3;
            this.barOrientation = exports.BarOrientation;
            this.placementTypes = exports.PlacementTypes;
            this.styleTypes = exports.StyleTypes;
        }
        PolarSeriesComponent.prototype.ngOnChanges = function (changes) {
            this.update();
        };
        PolarSeriesComponent.prototype.update = function () {
            var _this = this;
            this.updateGradients();
            var line = this.getLineGenerator();
            var data = this.sortData(this.data.series);
            var seriesName = this.data.name;
            var linearScaleType = this.colors.scaleType === exports.ScaleType.Linear;
            var min = this.yScale.domain()[0];
            this.seriesColor = this.colors.getColor(linearScaleType ? min : seriesName);
            this.path = line(data) || '';
            this.circles = data.map(function (d) {
                var a = _this.getAngle(d);
                var r = _this.getRadius(d);
                var value = d.value;
                var color = _this.colors.getColor(linearScaleType ? Math.abs(value) : seriesName);
                var cData = Object.assign({}, d, {
                    series: seriesName,
                    value: value,
                    name: d.name
                });
                return {
                    data: cData,
                    cx: r * Math.sin(a),
                    cy: -r * Math.cos(a),
                    value: value,
                    color: color,
                    label: d.name
                };
            });
            this.active = this.isActive(this.data);
            this.inactive = this.isInactive(this.data);
            this.tooltipText = this.tooltipText || (function (c) { return _this.defaultTooltipText(c); });
        };
        PolarSeriesComponent.prototype.getAngle = function (d) {
            var label = d.name;
            if (this.scaleType === exports.ScaleType.Time) {
                return this.xScale(label);
            }
            else if (this.scaleType === exports.ScaleType.Linear) {
                return this.xScale(Number(label));
            }
            return this.xScale(label);
        };
        PolarSeriesComponent.prototype.getRadius = function (d) {
            return this.yScale(d.value);
        };
        PolarSeriesComponent.prototype.getLineGenerator = function () {
            var _this = this;
            return d3Shape.lineRadial()
                .angle(function (d) { return _this.getAngle(d); })
                .radius(function (d) { return _this.getRadius(d); })
                .curve(this.curve);
        };
        PolarSeriesComponent.prototype.sortData = function (data) {
            if (this.scaleType === exports.ScaleType.Linear) {
                return sortLinear(data, 'name');
            }
            else if (this.scaleType === exports.ScaleType.Time) {
                return sortByTime(data, 'name');
            }
            return sortByDomain(data, 'name', 'asc', this.xScale.domain());
        };
        PolarSeriesComponent.prototype.isActive = function (entry) {
            if (!this.activeEntries)
                return false;
            var item = this.activeEntries.find(function (d) {
                return entry.name === d.name;
            });
            return item !== undefined;
        };
        PolarSeriesComponent.prototype.isInactive = function (entry) {
            if (!this.activeEntries || this.activeEntries.length === 0)
                return false;
            var item = this.activeEntries.find(function (d) {
                return entry.name === d.name;
            });
            return item === undefined;
        };
        PolarSeriesComponent.prototype.defaultTooltipText = function (_a) {
            var label = _a.label, value = _a.value;
            return "\n      <span class=\"tooltip-label\">" + escapeLabel(this.data.name) + " \u2022 " + escapeLabel(label) + "</span>\n      <span class=\"tooltip-val\">" + value.toLocaleString() + "</span>\n    ";
        };
        PolarSeriesComponent.prototype.updateGradients = function () {
            this.hasGradient = this.gradient || this.colors.scaleType === exports.ScaleType.Linear;
            if (!this.hasGradient) {
                return;
            }
            this.gradientId = 'grad' + id().toString();
            this.gradientUrl = "url(#" + this.gradientId + ")";
            if (this.colors.scaleType === exports.ScaleType.Linear) {
                var values = this.data.series.map(function (d) { return d.value; });
                var max = Math.max.apply(Math, __spreadArray([], __read(values)));
                var min = Math.min.apply(Math, __spreadArray([], __read(values)));
                this.gradientStops = this.colors.getLinearGradientStops(max, min);
            }
            else {
                this.gradientStops = undefined;
            }
        };
        return PolarSeriesComponent;
    }());
    PolarSeriesComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'g[ngx-charts-polar-series]',
                    template: "\n    <svg:g class=\"polar-charts-series\">\n      <defs>\n        <svg:g\n          ngx-charts-svg-radial-gradient\n          *ngIf=\"hasGradient\"\n          [color]=\"seriesColor\"\n          [name]=\"gradientId\"\n          [startOpacity]=\"0.25\"\n          [endOpacity]=\"1\"\n          [stops]=\"gradientStops\"\n        />\n      </defs>\n      <svg:g\n        ngx-charts-line\n        class=\"polar-series-path\"\n        [path]=\"path\"\n        [stroke]=\"hasGradient ? gradientUrl : seriesColor\"\n        [class.active]=\"active\"\n        [class.inactive]=\"inactive\"\n        [attr.fill-opacity]=\"rangeFillOpacity\"\n        [fill]=\"hasGradient ? gradientUrl : seriesColor\"\n        [animations]=\"animations\"\n      />\n      <svg:g\n        ngx-charts-circle\n        *ngFor=\"let circle of circles\"\n        class=\"circle\"\n        [cx]=\"circle.cx\"\n        [cy]=\"circle.cy\"\n        [r]=\"circleRadius\"\n        [fill]=\"circle.color\"\n        [style.opacity]=\"inactive ? 0.2 : 1\"\n        ngx-tooltip\n        [tooltipDisabled]=\"tooltipDisabled\"\n        [tooltipPlacement]=\"placementTypes.Top\"\n        [tooltipType]=\"styleTypes.tooltip\"\n        [tooltipTitle]=\"tooltipTemplate ? undefined : tooltipText(circle)\"\n        [tooltipTemplate]=\"tooltipTemplate\"\n        [tooltipContext]=\"circle.data\"\n        (select)=\"select.emit(circle.data)\"\n        (activate)=\"activate.emit({ name: circle.data.series })\"\n        (deactivate)=\"deactivate.emit({ name: circle.data.series })\"\n      ></svg:g>\n    </svg:g>\n  ",
                    changeDetection: core.ChangeDetectionStrategy.OnPush
                },] }
    ];
    PolarSeriesComponent.propDecorators = {
        name: [{ type: core.Input }],
        data: [{ type: core.Input }],
        xScale: [{ type: core.Input }],
        yScale: [{ type: core.Input }],
        colors: [{ type: core.Input }],
        scaleType: [{ type: core.Input }],
        curve: [{ type: core.Input }],
        activeEntries: [{ type: core.Input }],
        rangeFillOpacity: [{ type: core.Input }],
        tooltipDisabled: [{ type: core.Input }],
        tooltipText: [{ type: core.Input }],
        gradient: [{ type: core.Input }],
        tooltipTemplate: [{ type: core.Input }],
        animations: [{ type: core.Input }],
        select: [{ type: core.Output }],
        activate: [{ type: core.Output }],
        deactivate: [{ type: core.Output }]
    };

    var AdvancedPieChartComponent = /** @class */ (function (_super) {
        __extends(AdvancedPieChartComponent, _super);
        function AdvancedPieChartComponent() {
            var _this = _super.apply(this, __spreadArray([], __read(arguments))) || this;
            _this.activeEntries = [];
            _this.tooltipDisabled = false;
            _this.label = 'Total';
            _this.activate = new core.EventEmitter();
            _this.deactivate = new core.EventEmitter();
            _this.margin = [20, 20, 20, 20];
            return _this;
        }
        AdvancedPieChartComponent.prototype.update = function () {
            _super.prototype.update.call(this);
            this.dims = calculateViewDimensions({
                width: (this.width * 4) / 12.0,
                height: this.height,
                margins: this.margin
            });
            this.formatDates();
            this.domain = this.getDomain();
            this.setColors();
            var xOffset = this.dims.width / 2;
            var yOffset = this.margin[0] + this.dims.height / 2;
            this.legendWidth = this.width - this.dims.width - this.margin[1];
            this.outerRadius = Math.min(this.dims.width, this.dims.height) / 2.5;
            this.innerRadius = this.outerRadius * 0.75;
            this.transform = "translate(" + xOffset + " , " + yOffset + ")";
        };
        AdvancedPieChartComponent.prototype.getDomain = function () {
            return this.results.map(function (d) { return d.label; });
        };
        AdvancedPieChartComponent.prototype.onClick = function (data) {
            this.select.emit(data);
        };
        AdvancedPieChartComponent.prototype.setColors = function () {
            this.colors = new ColorHelper(this.scheme, exports.ScaleType.Ordinal, this.domain, this.customColors);
        };
        AdvancedPieChartComponent.prototype.onActivate = function (item, fromLegend) {
            if (fromLegend === void 0) { fromLegend = false; }
            item = this.results.find(function (d) {
                if (fromLegend) {
                    return d.label === item.name;
                }
                else {
                    return d.name === item.name;
                }
            });
            var idx = this.activeEntries.findIndex(function (d) {
                return d.name === item.name && d.value === item.value && d.series === item.series;
            });
            if (idx > -1) {
                return;
            }
            this.activeEntries = __spreadArray([item], __read(this.activeEntries));
            this.activate.emit({ value: item, entries: this.activeEntries });
        };
        AdvancedPieChartComponent.prototype.onDeactivate = function (item, fromLegend) {
            if (fromLegend === void 0) { fromLegend = false; }
            item = this.results.find(function (d) {
                if (fromLegend) {
                    return d.label === item.name;
                }
                else {
                    return d.name === item.name;
                }
            });
            var idx = this.activeEntries.findIndex(function (d) {
                return d.name === item.name && d.value === item.value && d.series === item.series;
            });
            this.activeEntries.splice(idx, 1);
            this.activeEntries = __spreadArray([], __read(this.activeEntries));
            this.deactivate.emit({ value: item, entries: this.activeEntries });
        };
        return AdvancedPieChartComponent;
    }(BaseChartComponent));
    AdvancedPieChartComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'ngx-charts-advanced-pie-chart',
                    template: "\n    <div [style.width.px]=\"width\" [style.height.px]=\"height\">\n      <div class=\"advanced-pie chart\" [style.width.px]=\"dims.width\" [style.height.px]=\"dims.height\">\n        <ngx-charts-chart [view]=\"[width, height]\" [showLegend]=\"false\" [animations]=\"animations\">\n          <svg:g [attr.transform]=\"transform\" class=\"pie chart\">\n            <svg:g\n              ngx-charts-pie-series\n              [colors]=\"colors\"\n              [series]=\"results\"\n              [innerRadius]=\"innerRadius\"\n              [activeEntries]=\"activeEntries\"\n              [outerRadius]=\"outerRadius\"\n              [gradient]=\"gradient\"\n              [tooltipDisabled]=\"tooltipDisabled\"\n              [tooltipTemplate]=\"tooltipTemplate\"\n              [tooltipText]=\"tooltipText\"\n              (select)=\"onClick($event)\"\n              (activate)=\"onActivate($event)\"\n              (deactivate)=\"onDeactivate($event)\"\n              [animations]=\"animations\"\n            ></svg:g>\n          </svg:g>\n        </ngx-charts-chart>\n      </div>\n      <div class=\"advanced-pie-legend-wrapper\" [style.width.px]=\"width - dims.width\" [style.height.px]=\"height\">\n        <ngx-charts-advanced-legend\n          [data]=\"results\"\n          [colors]=\"colors\"\n          [width]=\"width - dims.width - margin[1]\"\n          [label]=\"label\"\n          [animations]=\"animations\"\n          [valueFormatting]=\"valueFormatting\"\n          [labelFormatting]=\"nameFormatting\"\n          [percentageFormatting]=\"percentageFormatting\"\n          (select)=\"onClick($event)\"\n          (activate)=\"onActivate($event, true)\"\n          (deactivate)=\"onDeactivate($event, true)\"\n        >\n        </ngx-charts-advanced-legend>\n      </div>\n    </div>\n  ",
                    encapsulation: core.ViewEncapsulation.None,
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    styles: [".ngx-charts-outer{-webkit-animation:chartFadeIn linear .6s;animation:chartFadeIn linear .6s}@-webkit-keyframes chartFadeIn{0%{opacity:0}20%{opacity:0}to{opacity:1}}@keyframes chartFadeIn{0%{opacity:0}20%{opacity:0}to{opacity:1}}.ngx-charts{float:left;overflow:visible}.ngx-charts .circle,.ngx-charts .cell,.ngx-charts .bar,.ngx-charts .arc{cursor:pointer}.ngx-charts .bar.active,.ngx-charts .bar:hover,.ngx-charts .cell.active,.ngx-charts .cell:hover,.ngx-charts .arc.active,.ngx-charts .arc:hover,.ngx-charts .card.active,.ngx-charts .card:hover{opacity:.8;transition:opacity .1s ease-in-out}.ngx-charts .bar:focus,.ngx-charts .cell:focus,.ngx-charts .arc:focus,.ngx-charts .card:focus{outline:none}.ngx-charts .bar.hidden,.ngx-charts .cell.hidden,.ngx-charts .arc.hidden,.ngx-charts .card.hidden{display:none}.ngx-charts g:focus{outline:none}.ngx-charts .line-series.inactive,.ngx-charts .line-series-range.inactive,.ngx-charts .polar-series-path.inactive,.ngx-charts .polar-series-area.inactive,.ngx-charts .area-series.inactive{transition:opacity .1s ease-in-out;opacity:.2}.ngx-charts .line-highlight{display:none}.ngx-charts .line-highlight.active{display:block}.ngx-charts .area{opacity:.6}.ngx-charts .circle:hover{cursor:pointer}.ngx-charts .label{font-size:12px;font-weight:normal}.ngx-charts .tooltip-anchor{fill:#000}.ngx-charts .gridline-path{stroke:#ddd;stroke-width:1;fill:none}.ngx-charts .refline-path{stroke:#a8b2c7;stroke-width:1;stroke-dasharray:5;stroke-dashoffset:5}.ngx-charts .refline-label{font-size:9px}.ngx-charts .reference-area{fill-opacity:.05;fill:#000}.ngx-charts .gridline-path-dotted{stroke:#ddd;stroke-width:1;fill:none;stroke-dasharray:1,20;stroke-dashoffset:3}.ngx-charts .grid-panel rect{fill:none}.ngx-charts .grid-panel.odd rect{fill:#0000000d}\n", ".advanced-pie{display:inline-block;float:left}.advanced-pie-legend-wrapper{display:inline-block}\n"]
                },] }
    ];
    AdvancedPieChartComponent.propDecorators = {
        gradient: [{ type: core.Input }],
        activeEntries: [{ type: core.Input }],
        tooltipDisabled: [{ type: core.Input }],
        tooltipText: [{ type: core.Input }],
        label: [{ type: core.Input }],
        activate: [{ type: core.Output }],
        deactivate: [{ type: core.Output }],
        tooltipTemplate: [{ type: core.ContentChild, args: ['tooltipTemplate',] }],
        valueFormatting: [{ type: core.Input }],
        nameFormatting: [{ type: core.Input }],
        percentageFormatting: [{ type: core.Input }]
    };

    var PieLabelComponent = /** @class */ (function () {
        function PieLabelComponent(platformId) {
            this.platformId = platformId;
            this.animations = true;
            this.labelTrim = true;
            this.labelTrimSize = 10;
            this.trimLabel = trimLabel;
        }
        PieLabelComponent.prototype.ngOnChanges = function (changes) {
            this.setTransforms();
            this.update();
        };
        PieLabelComponent.prototype.setTransforms = function () {
            if (common.isPlatformServer(this.platformId)) {
                this.styleTransform = "translate3d(" + this.textX + "px," + this.textY + "px, 0)";
                this.attrTransform = "translate(" + this.textX + "," + this.textY + ")";
                this.textTransition = !this.animations ? null : 'transform 0.75s';
            }
            else {
                var isIE = /(edge|msie|trident)/i.test(navigator.userAgent);
                this.styleTransform = isIE ? null : "translate3d(" + this.textX + "px," + this.textY + "px, 0)";
                this.attrTransform = !isIE ? null : "translate(" + this.textX + "," + this.textY + ")";
                this.textTransition = isIE || !this.animations ? null : 'transform 0.75s';
            }
        };
        PieLabelComponent.prototype.update = function () {
            var startRadius = this.radius;
            if (this.explodeSlices) {
                startRadius = (this.radius * this.value) / this.max;
            }
            var innerArc = d3Shape.arc().innerRadius(startRadius).outerRadius(startRadius);
            // Calculate innerPos then scale outer position to match label position
            var innerPos = innerArc.centroid(this.data);
            var scale = this.data.pos[1] / innerPos[1];
            if (this.data.pos[1] === 0 || innerPos[1] === 0) {
                scale = 1;
            }
            var outerPos = [scale * innerPos[0], scale * innerPos[1]];
            this.line = "M" + innerPos + "L" + outerPos + "L" + this.data.pos;
        };
        Object.defineProperty(PieLabelComponent.prototype, "textX", {
            get: function () {
                return this.data.pos[0];
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PieLabelComponent.prototype, "textY", {
            get: function () {
                return this.data.pos[1];
            },
            enumerable: false,
            configurable: true
        });
        PieLabelComponent.prototype.textAnchor = function () {
            return this.midAngle(this.data) < Math.PI ? exports.TextAnchor.Start : exports.TextAnchor.End;
        };
        PieLabelComponent.prototype.midAngle = function (d) {
            return d.startAngle + (d.endAngle - d.startAngle) / 2;
        };
        return PieLabelComponent;
    }());
    PieLabelComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'g[ngx-charts-pie-label]',
                    template: "\n    <title>{{ label }}</title>\n    <svg:g [attr.transform]=\"attrTransform\" [style.transform]=\"styleTransform\" [style.transition]=\"textTransition\">\n      <svg:text\n        class=\"pie-label\"\n        [class.animation]=\"animations\"\n        dy=\".35em\"\n        [style.textAnchor]=\"textAnchor()\"\n        [style.shapeRendering]=\"'crispEdges'\"\n      >\n        {{ labelTrim ? trimLabel(label, labelTrimSize) : label }}\n      </svg:text>\n    </svg:g>\n    <svg:path\n      [attr.d]=\"line\"\n      [attr.stroke]=\"color\"\n      fill=\"none\"\n      class=\"pie-label-line line\"\n      [class.animation]=\"animations\"\n    ></svg:path>\n  ",
                    changeDetection: core.ChangeDetectionStrategy.OnPush
                },] }
    ];
    PieLabelComponent.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: core.Inject, args: [core.PLATFORM_ID,] }] }
    ]; };
    PieLabelComponent.propDecorators = {
        data: [{ type: core.Input }],
        radius: [{ type: core.Input }],
        label: [{ type: core.Input }],
        color: [{ type: core.Input }],
        max: [{ type: core.Input }],
        value: [{ type: core.Input }],
        explodeSlices: [{ type: core.Input }],
        animations: [{ type: core.Input }],
        labelTrim: [{ type: core.Input }],
        labelTrimSize: [{ type: core.Input }]
    };

    var PieArcComponent = /** @class */ (function () {
        function PieArcComponent(element) {
            this.startAngle = 0;
            this.endAngle = Math.PI * 2;
            this.cornerRadius = 0;
            this.explodeSlices = false;
            this.gradient = false;
            this.animate = true;
            this.pointerEvents = true;
            this.isActive = false;
            this.select = new core.EventEmitter();
            this.activate = new core.EventEmitter();
            this.deactivate = new core.EventEmitter();
            this.dblclick = new core.EventEmitter();
            this.barOrientation = exports.BarOrientation;
            this.initialized = false;
            this.element = element.nativeElement;
        }
        PieArcComponent.prototype.ngOnChanges = function (changes) {
            this.update();
        };
        PieArcComponent.prototype.getGradient = function () {
            return this.gradient ? this.gradientFill : this.fill;
        };
        PieArcComponent.prototype.getPointerEvents = function () {
            return this.pointerEvents ? 'auto' : 'none';
        };
        PieArcComponent.prototype.update = function () {
            var calc = this.calculateArc();
            this.startOpacity = 0.5;
            this.radialGradientId = 'linearGrad' + id().toString();
            this.gradientFill = "url(#" + this.radialGradientId + ")";
            if (this.animate) {
                if (this.initialized) {
                    this.updateAnimation();
                }
                else {
                    this.loadAnimation();
                    this.initialized = true;
                }
            }
            else {
                this.path = calc.startAngle(this.startAngle).endAngle(this.endAngle)();
            }
        };
        PieArcComponent.prototype.calculateArc = function () {
            var outerRadius = this.outerRadius;
            if (this.explodeSlices && this.innerRadius === 0) {
                outerRadius = (this.outerRadius * this.value) / this.max;
            }
            return d3Shape.arc().innerRadius(this.innerRadius).outerRadius(outerRadius).cornerRadius(this.cornerRadius);
        };
        PieArcComponent.prototype.loadAnimation = function () {
            var node = d3Selection.select(this.element)
                .selectAll('.arc')
                .data([{ startAngle: this.startAngle, endAngle: this.endAngle }]);
            var calc = this.calculateArc();
            node
                .transition()
                .attrTween('d', function (d) {
                this._current = this._current || d;
                var copyOfD = Object.assign({}, d);
                copyOfD.endAngle = copyOfD.startAngle;
                var interpolater = d3Interpolate.interpolate(copyOfD, copyOfD);
                this._current = interpolater(0);
                return function (t) {
                    return calc(interpolater(t));
                };
            })
                .transition()
                .duration(750)
                .attrTween('d', function (d) {
                this._current = this._current || d;
                var interpolater = d3Interpolate.interpolate(this._current, d);
                this._current = interpolater(0);
                return function (t) {
                    return calc(interpolater(t));
                };
            });
        };
        PieArcComponent.prototype.updateAnimation = function () {
            var node = d3Selection.select(this.element)
                .selectAll('.arc')
                .data([{ startAngle: this.startAngle, endAngle: this.endAngle }]);
            var calc = this.calculateArc();
            node
                .transition()
                .duration(750)
                .attrTween('d', function (d) {
                this._current = this._current || d;
                var interpolater = d3Interpolate.interpolate(this._current, d);
                this._current = interpolater(0);
                return function (t) {
                    return calc(interpolater(t));
                };
            });
        };
        PieArcComponent.prototype.onClick = function () {
            var _this = this;
            clearTimeout(this._timeout);
            this._timeout = setTimeout(function () { return _this.select.emit(_this.data); }, 200);
        };
        PieArcComponent.prototype.onDblClick = function (event) {
            event.preventDefault();
            event.stopPropagation();
            clearTimeout(this._timeout);
            this.dblclick.emit({
                data: this.data,
                nativeEvent: event
            });
        };
        return PieArcComponent;
    }());
    PieArcComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'g[ngx-charts-pie-arc]',
                    template: "\n    <svg:g class=\"arc-group\">\n      <svg:defs *ngIf=\"gradient\">\n        <svg:g ngx-charts-svg-radial-gradient [color]=\"fill\" [name]=\"radialGradientId\" [startOpacity]=\"startOpacity\" />\n      </svg:defs>\n      <svg:path\n        [attr.d]=\"path\"\n        class=\"arc\"\n        [class.active]=\"isActive\"\n        [attr.fill]=\"getGradient()\"\n        (click)=\"onClick()\"\n        (dblclick)=\"onDblClick($event)\"\n        (mouseenter)=\"activate.emit(data)\"\n        (mouseleave)=\"deactivate.emit(data)\"\n        [style.pointer-events]=\"getPointerEvents()\"\n      />\n    </svg:g>\n  ",
                    changeDetection: core.ChangeDetectionStrategy.OnPush
                },] }
    ];
    PieArcComponent.ctorParameters = function () { return [
        { type: core.ElementRef }
    ]; };
    PieArcComponent.propDecorators = {
        fill: [{ type: core.Input }],
        startAngle: [{ type: core.Input }],
        endAngle: [{ type: core.Input }],
        innerRadius: [{ type: core.Input }],
        outerRadius: [{ type: core.Input }],
        cornerRadius: [{ type: core.Input }],
        value: [{ type: core.Input }],
        max: [{ type: core.Input }],
        data: [{ type: core.Input }],
        explodeSlices: [{ type: core.Input }],
        gradient: [{ type: core.Input }],
        animate: [{ type: core.Input }],
        pointerEvents: [{ type: core.Input }],
        isActive: [{ type: core.Input }],
        select: [{ type: core.Output }],
        activate: [{ type: core.Output }],
        deactivate: [{ type: core.Output }],
        dblclick: [{ type: core.Output }]
    };

    var PieChartComponent = /** @class */ (function (_super) {
        __extends(PieChartComponent, _super);
        function PieChartComponent() {
            var _this = _super.apply(this, __spreadArray([], __read(arguments))) || this;
            _this.labels = false;
            _this.legend = false;
            _this.legendTitle = 'Legend';
            _this.legendPosition = exports.LegendPosition.Right;
            _this.explodeSlices = false;
            _this.doughnut = false;
            _this.arcWidth = 0.25;
            _this.activeEntries = [];
            _this.tooltipDisabled = false;
            _this.trimLabels = true;
            _this.maxLabelLength = 10;
            _this.dblclick = new core.EventEmitter();
            _this.select = new core.EventEmitter();
            _this.activate = new core.EventEmitter();
            _this.deactivate = new core.EventEmitter();
            return _this;
        }
        PieChartComponent.prototype.update = function () {
            var _this = this;
            _super.prototype.update.call(this);
            if (this.labels && this.hasNoOptionalMarginsSet()) {
                this.margins = [30, 80, 30, 80];
            }
            else if (!this.labels && this.hasNoOptionalMarginsSet()) {
                // default value for margins
                this.margins = [20, 20, 20, 20];
            }
            this.dims = calculateViewDimensions({
                width: this.width,
                height: this.height,
                margins: this.margins,
                showLegend: this.legend,
                legendPosition: this.legendPosition
            });
            this.formatDates();
            var xOffset = this.margins[3] + this.dims.width / 2;
            var yOffset = this.margins[0] + this.dims.height / 2;
            this.translation = "translate(" + xOffset + ", " + yOffset + ")";
            this.outerRadius = Math.min(this.dims.width, this.dims.height);
            if (this.labels) {
                // make room for labels
                this.outerRadius /= 3;
            }
            else {
                this.outerRadius /= 2;
            }
            this.innerRadius = 0;
            if (this.doughnut) {
                this.innerRadius = this.outerRadius * (1 - this.arcWidth);
            }
            this.domain = this.getDomain();
            // sort data according to domain
            this.data = this.results.sort(function (a, b) {
                return _this.domain.indexOf(a.name) - _this.domain.indexOf(b.name);
            });
            this.setColors();
            this.legendOptions = this.getLegendOptions();
        };
        PieChartComponent.prototype.getDomain = function () {
            return this.results.map(function (d) { return d.label; });
        };
        PieChartComponent.prototype.onClick = function (data) {
            this.select.emit(data);
        };
        PieChartComponent.prototype.setColors = function () {
            this.colors = new ColorHelper(this.scheme, exports.ScaleType.Ordinal, this.domain, this.customColors);
        };
        PieChartComponent.prototype.getLegendOptions = function () {
            return {
                scaleType: exports.ScaleType.Ordinal,
                domain: this.domain,
                colors: this.colors,
                title: this.legendTitle,
                position: this.legendPosition
            };
        };
        PieChartComponent.prototype.onActivate = function (item, fromLegend) {
            if (fromLegend === void 0) { fromLegend = false; }
            item = this.results.find(function (d) {
                if (fromLegend) {
                    return d.label === item.name;
                }
                else {
                    return d.name === item.name;
                }
            });
            var idx = this.activeEntries.findIndex(function (d) {
                return d.name === item.name && d.value === item.value && d.series === item.series;
            });
            if (idx > -1) {
                return;
            }
            this.activeEntries = __spreadArray([item], __read(this.activeEntries));
            this.activate.emit({ value: item, entries: this.activeEntries });
        };
        PieChartComponent.prototype.onDeactivate = function (item, fromLegend) {
            if (fromLegend === void 0) { fromLegend = false; }
            item = this.results.find(function (d) {
                if (fromLegend) {
                    return d.label === item.name;
                }
                else {
                    return d.name === item.name;
                }
            });
            var idx = this.activeEntries.findIndex(function (d) {
                return d.name === item.name && d.value === item.value && d.series === item.series;
            });
            this.activeEntries.splice(idx, 1);
            this.activeEntries = __spreadArray([], __read(this.activeEntries));
            this.deactivate.emit({ value: item, entries: this.activeEntries });
        };
        PieChartComponent.prototype.hasNoOptionalMarginsSet = function () {
            return !this.margins || this.margins.length <= 0;
        };
        return PieChartComponent;
    }(BaseChartComponent));
    PieChartComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'ngx-charts-pie-chart',
                    template: "\n    <ngx-charts-chart\n      [view]=\"[width, height]\"\n      [showLegend]=\"legend\"\n      [legendOptions]=\"legendOptions\"\n      [activeEntries]=\"activeEntries\"\n      [animations]=\"animations\"\n      (legendLabelActivate)=\"onActivate($event, true)\"\n      (legendLabelDeactivate)=\"onDeactivate($event, true)\"\n      (legendLabelClick)=\"onClick($event)\"\n    >\n      <svg:g [attr.transform]=\"translation\" class=\"pie-chart chart\">\n        <svg:g\n          ngx-charts-pie-series\n          [colors]=\"colors\"\n          [series]=\"data\"\n          [showLabels]=\"labels\"\n          [labelFormatting]=\"labelFormatting\"\n          [trimLabels]=\"trimLabels\"\n          [maxLabelLength]=\"maxLabelLength\"\n          [activeEntries]=\"activeEntries\"\n          [innerRadius]=\"innerRadius\"\n          [outerRadius]=\"outerRadius\"\n          [explodeSlices]=\"explodeSlices\"\n          [gradient]=\"gradient\"\n          [animations]=\"animations\"\n          [tooltipDisabled]=\"tooltipDisabled\"\n          [tooltipTemplate]=\"tooltipTemplate\"\n          [tooltipText]=\"tooltipText\"\n          (dblclick)=\"dblclick.emit($event)\"\n          (select)=\"onClick($event)\"\n          (activate)=\"onActivate($event)\"\n          (deactivate)=\"onDeactivate($event)\"\n        />\n      </svg:g>\n    </ngx-charts-chart>\n  ",
                    encapsulation: core.ViewEncapsulation.None,
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    styles: [".ngx-charts-outer{-webkit-animation:chartFadeIn linear .6s;animation:chartFadeIn linear .6s}@-webkit-keyframes chartFadeIn{0%{opacity:0}20%{opacity:0}to{opacity:1}}@keyframes chartFadeIn{0%{opacity:0}20%{opacity:0}to{opacity:1}}.ngx-charts{float:left;overflow:visible}.ngx-charts .circle,.ngx-charts .cell,.ngx-charts .bar,.ngx-charts .arc{cursor:pointer}.ngx-charts .bar.active,.ngx-charts .bar:hover,.ngx-charts .cell.active,.ngx-charts .cell:hover,.ngx-charts .arc.active,.ngx-charts .arc:hover,.ngx-charts .card.active,.ngx-charts .card:hover{opacity:.8;transition:opacity .1s ease-in-out}.ngx-charts .bar:focus,.ngx-charts .cell:focus,.ngx-charts .arc:focus,.ngx-charts .card:focus{outline:none}.ngx-charts .bar.hidden,.ngx-charts .cell.hidden,.ngx-charts .arc.hidden,.ngx-charts .card.hidden{display:none}.ngx-charts g:focus{outline:none}.ngx-charts .line-series.inactive,.ngx-charts .line-series-range.inactive,.ngx-charts .polar-series-path.inactive,.ngx-charts .polar-series-area.inactive,.ngx-charts .area-series.inactive{transition:opacity .1s ease-in-out;opacity:.2}.ngx-charts .line-highlight{display:none}.ngx-charts .line-highlight.active{display:block}.ngx-charts .area{opacity:.6}.ngx-charts .circle:hover{cursor:pointer}.ngx-charts .label{font-size:12px;font-weight:normal}.ngx-charts .tooltip-anchor{fill:#000}.ngx-charts .gridline-path{stroke:#ddd;stroke-width:1;fill:none}.ngx-charts .refline-path{stroke:#a8b2c7;stroke-width:1;stroke-dasharray:5;stroke-dashoffset:5}.ngx-charts .refline-label{font-size:9px}.ngx-charts .reference-area{fill-opacity:.05;fill:#000}.ngx-charts .gridline-path-dotted{stroke:#ddd;stroke-width:1;fill:none;stroke-dasharray:1,20;stroke-dashoffset:3}.ngx-charts .grid-panel rect{fill:none}.ngx-charts .grid-panel.odd rect{fill:#0000000d}\n", ".pie-label{font-size:11px}.pie-label.animation{-webkit-animation:.75s ease-in fadeIn;animation:.75s ease-in fadeIn}@-webkit-keyframes fadeIn{0%{opacity:0}to{opacity:1}}@keyframes fadeIn{0%{opacity:0}to{opacity:1}}.pie-label-line{stroke-dasharray:100%}.pie-label-line.animation{-webkit-animation:3s linear drawOut;animation:3s linear drawOut;transition:d .75s}@-webkit-keyframes drawOut{0%{stroke-dashoffset:100%}to{stroke-dashoffset:0}}@keyframes drawOut{0%{stroke-dashoffset:100%}to{stroke-dashoffset:0}}\n"]
                },] }
    ];
    PieChartComponent.propDecorators = {
        labels: [{ type: core.Input }],
        legend: [{ type: core.Input }],
        legendTitle: [{ type: core.Input }],
        legendPosition: [{ type: core.Input }],
        explodeSlices: [{ type: core.Input }],
        doughnut: [{ type: core.Input }],
        arcWidth: [{ type: core.Input }],
        gradient: [{ type: core.Input }],
        activeEntries: [{ type: core.Input }],
        tooltipDisabled: [{ type: core.Input }],
        labelFormatting: [{ type: core.Input }],
        trimLabels: [{ type: core.Input }],
        maxLabelLength: [{ type: core.Input }],
        tooltipText: [{ type: core.Input }],
        dblclick: [{ type: core.Output }],
        margins: [{ type: core.Input }],
        select: [{ type: core.Output }],
        activate: [{ type: core.Output }],
        deactivate: [{ type: core.Output }],
        tooltipTemplate: [{ type: core.ContentChild, args: ['tooltipTemplate',] }]
    };

    function gridSize(dims, len, minWidth) {
        var rows = 1;
        var cols = len;
        var width = dims.width;
        if (width > minWidth) {
            while (width / cols < minWidth) {
                rows += 1;
                cols = Math.ceil(len / rows);
            }
        }
        return [cols, rows];
    }
    function gridLayout(dims, data, minWidth, designatedTotal) {
        var xScale = d3Scale.scaleBand();
        var yScale = d3Scale.scaleBand();
        var width = dims.width;
        var height = dims.height;
        var _a = __read(gridSize(dims, data.length, minWidth), 2), columns = _a[0], rows = _a[1];
        var xDomain = [];
        var yDomain = [];
        for (var i = 0; i < rows; i++) {
            yDomain.push(i);
        }
        for (var i = 0; i < columns; i++) {
            xDomain.push(i);
        }
        xScale.domain(xDomain);
        yScale.domain(yDomain);
        xScale.rangeRound([0, width], 0.1);
        yScale.rangeRound([0, height], 0.1);
        var res = [];
        var total = designatedTotal ? designatedTotal : getTotal(data);
        var cardWidth = xScale.bandwidth();
        var cardHeight = yScale.bandwidth();
        for (var i = 0; i < data.length; i++) {
            res[i] = {};
            res[i].data = {
                name: data[i] ? data[i].name : '',
                value: data[i] ? data[i].value : undefined,
                extra: data[i] ? data[i].extra : undefined,
                label: data[i] ? data[i].label : ''
            };
            res[i].x = xScale(i % columns);
            res[i].y = yScale(Math.floor(i / columns));
            res[i].width = cardWidth;
            res[i].height = cardHeight;
            res[i].data.percent = total > 0 ? res[i].data.value / total : 0;
            res[i].data.total = total;
        }
        return res;
    }
    function getTotal(results) {
        return results.map(function (d) { return (d ? d.value : 0); }).reduce(function (sum, val) { return sum + val; }, 0);
    }

    var PieGridComponent = /** @class */ (function (_super) {
        __extends(PieGridComponent, _super);
        function PieGridComponent() {
            var _this = _super.apply(this, __spreadArray([], __read(arguments))) || this;
            _this.tooltipDisabled = false;
            _this.label = 'Total';
            _this.minWidth = 150;
            _this.activeEntries = [];
            _this.activate = new core.EventEmitter();
            _this.deactivate = new core.EventEmitter();
            _this.margin = [20, 20, 20, 20];
            _this.placementTypes = exports.PlacementTypes;
            _this.styleTypes = exports.StyleTypes;
            return _this;
        }
        PieGridComponent.prototype.update = function () {
            _super.prototype.update.call(this);
            this.dims = calculateViewDimensions({
                width: this.width,
                height: this.height,
                margins: this.margin
            });
            this.formatDates();
            this.domain = this.getDomain();
            this.data = gridLayout(this.dims, this.results, this.minWidth, this.designatedTotal);
            this.transform = "translate(" + this.margin[3] + " , " + this.margin[0] + ")";
            this.series = this.getSeries();
            this.setColors();
            this.tooltipText = this.tooltipText || this.defaultTooltipText;
        };
        PieGridComponent.prototype.defaultTooltipText = function (_a) {
            var data = _a.data;
            var label = trimLabel(formatLabel(data.name));
            var val = data.value.toLocaleString();
            return "\n      <span class=\"tooltip-label\">" + label + "</span>\n      <span class=\"tooltip-val\">" + val + "</span>\n    ";
        };
        PieGridComponent.prototype.getDomain = function () {
            return this.results.map(function (d) { return d.label; });
        };
        PieGridComponent.prototype.getSeries = function () {
            var _this = this;
            var total = this.designatedTotal ? this.designatedTotal : this.getTotal();
            return this.data.map(function (d) {
                var baselineLabelHeight = 20;
                var padding = 10;
                var name = d.data.name;
                var label = formatLabel(name);
                var value = d.data.value;
                var radius = d3Array.min([d.width - padding, d.height - baselineLabelHeight]) / 2 - 5;
                var innerRadius = radius * 0.9;
                var count = 0;
                var colors = function () {
                    count += 1;
                    if (count === 1) {
                        return 'rgba(100,100,100,0.3)';
                    }
                    else {
                        return _this.colorScale.getColor(label);
                    }
                };
                var xPos = d.x + (d.width - padding) / 2;
                var yPos = d.y + (d.height - baselineLabelHeight) / 2;
                return {
                    transform: "translate(" + xPos + ", " + yPos + ")",
                    colors: colors,
                    innerRadius: innerRadius,
                    outerRadius: radius,
                    name: name,
                    label: trimLabel(label),
                    total: value,
                    value: value,
                    percent: d3Format.format('.1%')(d.data.percent),
                    data: [
                        d,
                        {
                            data: {
                                other: true,
                                value: total - value,
                                name: d.data.name
                            }
                        }
                    ]
                };
            });
        };
        PieGridComponent.prototype.getTotal = function () {
            return this.results.map(function (d) { return d.value; }).reduce(function (sum, d) { return sum + d; }, 0);
        };
        PieGridComponent.prototype.onClick = function (data) {
            this.select.emit(data);
        };
        PieGridComponent.prototype.setColors = function () {
            this.colorScale = new ColorHelper(this.scheme, exports.ScaleType.Ordinal, this.domain, this.customColors);
        };
        PieGridComponent.prototype.onActivate = function (item, fromLegend) {
            if (fromLegend === void 0) { fromLegend = false; }
            item = this.results.find(function (d) {
                if (fromLegend) {
                    return d.label === item.name;
                }
                else {
                    return d.name === item.name;
                }
            });
            var idx = this.activeEntries.findIndex(function (d) {
                return d.name === item.name && d.value === item.value && d.series === item.series;
            });
            if (idx > -1) {
                return;
            }
            this.activeEntries = __spreadArray([item], __read(this.activeEntries));
            this.activate.emit({ value: item, entries: this.activeEntries });
        };
        PieGridComponent.prototype.onDeactivate = function (item, fromLegend) {
            if (fromLegend === void 0) { fromLegend = false; }
            item = this.results.find(function (d) {
                if (fromLegend) {
                    return d.label === item.name;
                }
                else {
                    return d.name === item.name;
                }
            });
            var idx = this.activeEntries.findIndex(function (d) {
                return d.name === item.name && d.value === item.value && d.series === item.series;
            });
            this.activeEntries.splice(idx, 1);
            this.activeEntries = __spreadArray([], __read(this.activeEntries));
            this.deactivate.emit({ value: item, entries: this.activeEntries });
        };
        return PieGridComponent;
    }(BaseChartComponent));
    PieGridComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'ngx-charts-pie-grid',
                    template: "\n    <ngx-charts-chart [view]=\"[width, height]\" [showLegend]=\"false\" [animations]=\"animations\">\n      <svg:g [attr.transform]=\"transform\" class=\"pie-grid chart\">\n        <svg:g *ngFor=\"let series of series\" class=\"pie-grid-item\" [attr.transform]=\"series.transform\">\n          <svg:g\n            ngx-charts-pie-grid-series\n            [colors]=\"series.colors\"\n            [data]=\"series.data\"\n            [innerRadius]=\"series.innerRadius\"\n            [outerRadius]=\"series.outerRadius\"\n            [animations]=\"animations\"\n            (select)=\"onClick($event)\"\n            ngx-tooltip\n            [tooltipDisabled]=\"tooltipDisabled\"\n            [tooltipPlacement]=\"placementTypes.Top\"\n            [tooltipType]=\"styleTypes.tooltip\"\n            [tooltipTitle]=\"tooltipTemplate ? undefined : tooltipText({ data: series })\"\n            [tooltipTemplate]=\"tooltipTemplate\"\n            [tooltipContext]=\"series.data[0].data\"\n            (activate)=\"onActivate($event)\"\n            (deactivate)=\"onDeactivate($event)\"\n          />\n          <svg:text\n            *ngIf=\"animations\"\n            class=\"label percent-label\"\n            dy=\"-0.5em\"\n            x=\"0\"\n            y=\"5\"\n            ngx-charts-count-up\n            [countTo]=\"series.percent\"\n            [countSuffix]=\"'%'\"\n            text-anchor=\"middle\"\n          ></svg:text>\n          <svg:text *ngIf=\"!animations\" class=\"label percent-label\" dy=\"-0.5em\" x=\"0\" y=\"5\" text-anchor=\"middle\">\n            {{ series.percent.toLocaleString() }}\n          </svg:text>\n          <svg:text class=\"label\" dy=\"0.5em\" x=\"0\" y=\"5\" text-anchor=\"middle\">\n            {{ series.label }}\n          </svg:text>\n          <svg:text\n            *ngIf=\"animations\"\n            class=\"label\"\n            dy=\"1.23em\"\n            x=\"0\"\n            [attr.y]=\"series.outerRadius\"\n            text-anchor=\"middle\"\n            ngx-charts-count-up\n            [countTo]=\"series.total\"\n            [countPrefix]=\"label + ': '\"\n          ></svg:text>\n          <svg:text\n            *ngIf=\"!animations\"\n            class=\"label\"\n            dy=\"1.23em\"\n            x=\"0\"\n            [attr.y]=\"series.outerRadius\"\n            text-anchor=\"middle\"\n          >\n            {{ label }}: {{ series.total.toLocaleString() }}\n          </svg:text>\n        </svg:g>\n      </svg:g>\n    </ngx-charts-chart>\n  ",
                    encapsulation: core.ViewEncapsulation.None,
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    styles: [".ngx-charts-outer{-webkit-animation:chartFadeIn linear .6s;animation:chartFadeIn linear .6s}@-webkit-keyframes chartFadeIn{0%{opacity:0}20%{opacity:0}to{opacity:1}}@keyframes chartFadeIn{0%{opacity:0}20%{opacity:0}to{opacity:1}}.ngx-charts{float:left;overflow:visible}.ngx-charts .circle,.ngx-charts .cell,.ngx-charts .bar,.ngx-charts .arc{cursor:pointer}.ngx-charts .bar.active,.ngx-charts .bar:hover,.ngx-charts .cell.active,.ngx-charts .cell:hover,.ngx-charts .arc.active,.ngx-charts .arc:hover,.ngx-charts .card.active,.ngx-charts .card:hover{opacity:.8;transition:opacity .1s ease-in-out}.ngx-charts .bar:focus,.ngx-charts .cell:focus,.ngx-charts .arc:focus,.ngx-charts .card:focus{outline:none}.ngx-charts .bar.hidden,.ngx-charts .cell.hidden,.ngx-charts .arc.hidden,.ngx-charts .card.hidden{display:none}.ngx-charts g:focus{outline:none}.ngx-charts .line-series.inactive,.ngx-charts .line-series-range.inactive,.ngx-charts .polar-series-path.inactive,.ngx-charts .polar-series-area.inactive,.ngx-charts .area-series.inactive{transition:opacity .1s ease-in-out;opacity:.2}.ngx-charts .line-highlight{display:none}.ngx-charts .line-highlight.active{display:block}.ngx-charts .area{opacity:.6}.ngx-charts .circle:hover{cursor:pointer}.ngx-charts .label{font-size:12px;font-weight:normal}.ngx-charts .tooltip-anchor{fill:#000}.ngx-charts .gridline-path{stroke:#ddd;stroke-width:1;fill:none}.ngx-charts .refline-path{stroke:#a8b2c7;stroke-width:1;stroke-dasharray:5;stroke-dashoffset:5}.ngx-charts .refline-label{font-size:9px}.ngx-charts .reference-area{fill-opacity:.05;fill:#000}.ngx-charts .gridline-path-dotted{stroke:#ddd;stroke-width:1;fill:none;stroke-dasharray:1,20;stroke-dashoffset:3}.ngx-charts .grid-panel rect{fill:none}.ngx-charts .grid-panel.odd rect{fill:#0000000d}\n", ".pie-grid .arc1{opacity:.4}.pie-grid .percent-label{font-size:16px;font-weight:400}\n"]
                },] }
    ];
    PieGridComponent.propDecorators = {
        designatedTotal: [{ type: core.Input }],
        tooltipDisabled: [{ type: core.Input }],
        tooltipText: [{ type: core.Input }],
        label: [{ type: core.Input }],
        minWidth: [{ type: core.Input }],
        activeEntries: [{ type: core.Input }],
        activate: [{ type: core.Output }],
        deactivate: [{ type: core.Output }],
        tooltipTemplate: [{ type: core.ContentChild, args: ['tooltipTemplate',] }]
    };

    var PieGridSeriesComponent = /** @class */ (function () {
        function PieGridSeriesComponent(element) {
            this.innerRadius = 70;
            this.outerRadius = 80;
            this.animations = true;
            this.select = new core.EventEmitter();
            this.activate = new core.EventEmitter();
            this.deactivate = new core.EventEmitter();
            this.element = element.nativeElement;
        }
        PieGridSeriesComponent.prototype.ngOnChanges = function (changes) {
            this.update();
        };
        PieGridSeriesComponent.prototype.update = function () {
            this.layout = d3Shape.pie()
                .value(function (d) { return d.data.value; })
                .sort(null);
            this.arcs = this.getArcs();
        };
        PieGridSeriesComponent.prototype.getArcs = function () {
            var _this = this;
            return this.layout(this.data).map(function (arc, index) {
                var label = arc.data.data.name;
                var other = arc.data.data.other;
                if (index === 0) {
                    arc.startAngle = 0;
                }
                var color = _this.colors(label);
                return {
                    data: arc.data.data,
                    class: 'arc ' + 'arc' + index,
                    fill: color,
                    startAngle: other ? 0 : arc.startAngle,
                    endAngle: arc.endAngle,
                    animate: _this.animations && !other,
                    pointerEvents: !other
                };
            });
        };
        PieGridSeriesComponent.prototype.onClick = function (data) {
            this.select.emit(this.data[0].data);
        };
        PieGridSeriesComponent.prototype.trackBy = function (index, item) {
            return item.data.name;
        };
        PieGridSeriesComponent.prototype.label = function (arc) {
            return arc.data.name;
        };
        PieGridSeriesComponent.prototype.color = function (arc) {
            return this.colors(this.label(arc));
        };
        return PieGridSeriesComponent;
    }());
    PieGridSeriesComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'g[ngx-charts-pie-grid-series]',
                    template: "\n    <svg:g class=\"pie-grid-arcs\">\n      <svg:g\n        ngx-charts-pie-arc\n        *ngFor=\"let arc of arcs; trackBy: trackBy\"\n        [attr.class]=\"arc.class\"\n        [startAngle]=\"arc.startAngle\"\n        [endAngle]=\"arc.endAngle\"\n        [innerRadius]=\"innerRadius\"\n        [outerRadius]=\"outerRadius\"\n        [fill]=\"color(arc)\"\n        [value]=\"arc.data.value\"\n        [data]=\"arc.data\"\n        [gradient]=\"false\"\n        [pointerEvents]=\"arc.pointerEvents\"\n        [animate]=\"arc.animate\"\n        (select)=\"onClick($event)\"\n        (activate)=\"activate.emit($event)\"\n        (deactivate)=\"deactivate.emit($event)\"\n      ></svg:g>\n    </svg:g>\n  ",
                    changeDetection: core.ChangeDetectionStrategy.OnPush
                },] }
    ];
    PieGridSeriesComponent.ctorParameters = function () { return [
        { type: core.ElementRef }
    ]; };
    PieGridSeriesComponent.propDecorators = {
        colors: [{ type: core.Input }],
        data: [{ type: core.Input }],
        innerRadius: [{ type: core.Input }],
        outerRadius: [{ type: core.Input }],
        animations: [{ type: core.Input }],
        select: [{ type: core.Output }],
        activate: [{ type: core.Output }],
        deactivate: [{ type: core.Output }]
    };

    var PieSeriesComponent = /** @class */ (function () {
        function PieSeriesComponent() {
            this.series = [];
            this.innerRadius = 60;
            this.outerRadius = 80;
            this.trimLabels = true;
            this.maxLabelLength = 10;
            this.tooltipDisabled = false;
            this.animations = true;
            this.select = new core.EventEmitter();
            this.activate = new core.EventEmitter();
            this.deactivate = new core.EventEmitter();
            this.dblclick = new core.EventEmitter();
            this.placementTypes = exports.PlacementTypes;
            this.styleTypes = exports.StyleTypes;
        }
        PieSeriesComponent.prototype.ngOnChanges = function (changes) {
            this.update();
        };
        PieSeriesComponent.prototype.update = function () {
            var pieGenerator = d3Shape.pie()
                .value(function (d) { return d.value; })
                .sort(null);
            var arcData = pieGenerator(this.series);
            this.max = d3Array.max(arcData, function (d) {
                return d.value;
            });
            this.data = this.calculateLabelPositions(arcData);
            this.tooltipText = this.tooltipText || this.defaultTooltipText;
        };
        PieSeriesComponent.prototype.midAngle = function (d) {
            return d.startAngle + (d.endAngle - d.startAngle) / 2;
        };
        PieSeriesComponent.prototype.outerArc = function () {
            var factor = 1.5;
            return d3Shape.arc()
                .innerRadius(this.outerRadius * factor)
                .outerRadius(this.outerRadius * factor);
        };
        PieSeriesComponent.prototype.calculateLabelPositions = function (pieData) {
            var _this = this;
            var factor = 1.5;
            var minDistance = 10;
            var labelPositions = pieData;
            labelPositions.forEach(function (d) {
                d.pos = _this.outerArc().centroid(d);
                d.pos[0] = factor * _this.outerRadius * (_this.midAngle(d) < Math.PI ? 1 : -1);
            });
            for (var i = 0; i < labelPositions.length - 1; i++) {
                var a = labelPositions[i];
                if (!this.labelVisible(a)) {
                    continue;
                }
                for (var j = i + 1; j < labelPositions.length; j++) {
                    var b = labelPositions[j];
                    if (!this.labelVisible(b)) {
                        continue;
                    }
                    // if they're on the same side
                    if (b.pos[0] * a.pos[0] > 0) {
                        // if they're overlapping
                        var o = minDistance - Math.abs(b.pos[1] - a.pos[1]);
                        if (o > 0) {
                            // push the second up or down
                            b.pos[1] += Math.sign(b.pos[0]) * o;
                        }
                    }
                }
            }
            return labelPositions;
        };
        PieSeriesComponent.prototype.labelVisible = function (myArc) {
            return this.showLabels && myArc.endAngle - myArc.startAngle > Math.PI / 30;
        };
        PieSeriesComponent.prototype.getTooltipTitle = function (a) {
            return this.tooltipTemplate ? undefined : this.tooltipText(a);
        };
        PieSeriesComponent.prototype.labelText = function (myArc) {
            if (this.labelFormatting) {
                return this.labelFormatting(myArc.data.name);
            }
            return this.label(myArc);
        };
        PieSeriesComponent.prototype.label = function (myArc) {
            return formatLabel(myArc.data.name);
        };
        PieSeriesComponent.prototype.defaultTooltipText = function (myArc) {
            var label = this.label(myArc);
            var val = formatLabel(myArc.data.value);
            return "\n      <span class=\"tooltip-label\">" + escapeLabel(label) + "</span>\n      <span class=\"tooltip-val\">" + val + "</span>\n    ";
        };
        PieSeriesComponent.prototype.color = function (myArc) {
            return this.colors.getColor(this.label(myArc));
        };
        PieSeriesComponent.prototype.trackBy = function (index, item) {
            return item.data.name;
        };
        PieSeriesComponent.prototype.onClick = function (data) {
            this.select.emit(data);
        };
        PieSeriesComponent.prototype.isActive = function (entry) {
            if (!this.activeEntries)
                return false;
            var item = this.activeEntries.find(function (d) {
                return entry.name === d.name && entry.series === d.series;
            });
            return item !== undefined;
        };
        return PieSeriesComponent;
    }());
    PieSeriesComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'g[ngx-charts-pie-series]',
                    template: "\n    <svg:g *ngFor=\"let arc of data; trackBy: trackBy\">\n      <svg:g\n        ngx-charts-pie-label\n        *ngIf=\"labelVisible(arc)\"\n        [data]=\"arc\"\n        [radius]=\"outerRadius\"\n        [color]=\"color(arc)\"\n        [label]=\"labelText(arc)\"\n        [labelTrim]=\"trimLabels\"\n        [labelTrimSize]=\"maxLabelLength\"\n        [max]=\"max\"\n        [value]=\"arc.value\"\n        [explodeSlices]=\"explodeSlices\"\n        [animations]=\"animations\"\n      ></svg:g>\n      <svg:g\n        ngx-charts-pie-arc\n        [startAngle]=\"arc.startAngle\"\n        [endAngle]=\"arc.endAngle\"\n        [innerRadius]=\"innerRadius\"\n        [outerRadius]=\"outerRadius\"\n        [fill]=\"color(arc)\"\n        [value]=\"arc.data.value\"\n        [gradient]=\"gradient\"\n        [data]=\"arc.data\"\n        [max]=\"max\"\n        [explodeSlices]=\"explodeSlices\"\n        [isActive]=\"isActive(arc.data)\"\n        [animate]=\"animations\"\n        (select)=\"onClick($event)\"\n        (activate)=\"activate.emit($event)\"\n        (deactivate)=\"deactivate.emit($event)\"\n        (dblclick)=\"dblclick.emit($event)\"\n        ngx-tooltip\n        [tooltipDisabled]=\"tooltipDisabled\"\n        [tooltipPlacement]=\"placementTypes.Top\"\n        [tooltipType]=\"styleTypes.tooltip\"\n        [tooltipTitle]=\"getTooltipTitle(arc)\"\n        [tooltipTemplate]=\"tooltipTemplate\"\n        [tooltipContext]=\"arc.data\"\n      ></svg:g>\n    </svg:g>\n  ",
                    changeDetection: core.ChangeDetectionStrategy.OnPush
                },] }
    ];
    PieSeriesComponent.propDecorators = {
        colors: [{ type: core.Input }],
        series: [{ type: core.Input }],
        dims: [{ type: core.Input }],
        innerRadius: [{ type: core.Input }],
        outerRadius: [{ type: core.Input }],
        explodeSlices: [{ type: core.Input }],
        showLabels: [{ type: core.Input }],
        gradient: [{ type: core.Input }],
        activeEntries: [{ type: core.Input }],
        labelFormatting: [{ type: core.Input }],
        trimLabels: [{ type: core.Input }],
        maxLabelLength: [{ type: core.Input }],
        tooltipText: [{ type: core.Input }],
        tooltipDisabled: [{ type: core.Input }],
        tooltipTemplate: [{ type: core.Input }],
        animations: [{ type: core.Input }],
        select: [{ type: core.Output }],
        activate: [{ type: core.Output }],
        deactivate: [{ type: core.Output }],
        dblclick: [{ type: core.Output }]
    };

    var PieChartModule = /** @class */ (function () {
        function PieChartModule() {
        }
        return PieChartModule;
    }());
    PieChartModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [ChartCommonModule],
                    declarations: [
                        AdvancedPieChartComponent,
                        PieLabelComponent,
                        PieArcComponent,
                        PieChartComponent,
                        PieGridComponent,
                        PieGridSeriesComponent,
                        PieSeriesComponent
                    ],
                    exports: [
                        AdvancedPieChartComponent,
                        PieLabelComponent,
                        PieArcComponent,
                        PieChartComponent,
                        PieGridComponent,
                        PieGridSeriesComponent,
                        PieSeriesComponent
                    ]
                },] }
    ];

    var PolarChartModule = /** @class */ (function () {
        function PolarChartModule() {
        }
        return PolarChartModule;
    }());
    PolarChartModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [ChartCommonModule, PieChartModule, LineChartModule],
                    declarations: [PolarChartComponent, PolarSeriesComponent],
                    exports: [PolarChartComponent, PolarSeriesComponent]
                },] }
    ];

    function calculateTextWidth(fontFamilyKey, text, defaultWidth) {
        if (defaultWidth === void 0) { defaultWidth = 8; }
        return text.split('').reduce(function (acc, curr) {
            var width = fontFamilyKey[curr] || defaultWidth;
            return acc + width;
        }, 0);
    }

    var VERDANA_FONT_WIDTHS_16_PX = {
        '0': 10,
        '1': 10,
        '2': 10,
        '3': 10,
        '4': 10,
        '5': 10,
        '6': 10,
        '7': 10,
        '8': 10,
        '9': 10,
        A: 11,
        B: 11,
        C: 11,
        D: 12,
        E: 10,
        F: 9,
        G: 12,
        H: 12,
        I: 7,
        J: 7,
        K: 11,
        L: 9,
        M: 13,
        N: 12,
        O: 13,
        P: 10,
        Q: 13,
        R: 11,
        S: 11,
        T: 10,
        U: 12,
        V: 11,
        W: 16,
        X: 11,
        Y: 10,
        Z: 11,
        a: 10,
        b: 10,
        c: 8,
        d: 10,
        e: 10,
        f: 6,
        g: 10,
        h: 10,
        i: 4,
        j: 6,
        k: 9,
        l: 4,
        m: 16,
        n: 10,
        o: 10,
        p: 10,
        q: 10,
        r: 7,
        s: 8,
        t: 6,
        u: 10,
        v: 9,
        w: 13,
        x: 9,
        y: 9,
        z: 8,
        '!': 6,
        '@': 16,
        '#': 13,
        $: 10,
        '%': 17,
        '^': 13,
        '&': 12,
        '*': 10,
        '(': 7,
        ')': 7,
        _: 10,
        '-': 7,
        '+': 13,
        '=': 13,
        ',': 6,
        '.': 6,
        '/': 7,
        "'": 4,
        ':': 7,
        '|': 7,
        '?': 9,
        ';': 7,
        '<': 13,
        '>': 13
    };

    var CardComponent = /** @class */ (function () {
        function CardComponent(element, cd, zone, platformId) {
            this.cd = cd;
            this.zone = zone;
            this.platformId = platformId;
            this.animations = true;
            this.select = new core.EventEmitter();
            this.value = '';
            this.textFontSize = 12;
            this.textTransform = '';
            this.initialized = false;
            this.bandHeight = 10;
            this.textPadding = [10, 20, 5, 20];
            this.labelFontSize = 15;
            this.element = element.nativeElement;
        }
        CardComponent.prototype.ngOnChanges = function (changes) {
            this.update();
        };
        CardComponent.prototype.ngOnInit = function () {
            if (common.isPlatformServer(this.platformId)) {
                this.scaleTextSSR();
            }
        };
        CardComponent.prototype.ngOnDestroy = function () {
            if (common.isPlatformBrowser(this.platformId)) {
                cancelAnimationFrame(this.animationReq);
            }
        };
        CardComponent.prototype.update = function () {
            var _this = this;
            this.zone.run(function () {
                var hasValue = _this.data && typeof _this.data.value !== 'undefined';
                var valueFormatting = _this.valueFormatting || (function (card) { return card.value.toLocaleString(); });
                var labelFormatting = _this.labelFormatting || (function (card) { return escapeLabel(trimLabel(card.label, 55)); });
                _this.transform = "translate(" + _this.x + " , " + _this.y + ")";
                _this.textWidth = Math.max(0, _this.width) - _this.textPadding[1] - _this.textPadding[3];
                _this.cardWidth = Math.max(0, _this.width);
                _this.cardHeight = Math.max(0, _this.height);
                _this.label = _this.label ? _this.label : _this.data.name;
                var cardData = {
                    label: _this.label,
                    data: _this.data,
                    value: _this.data.value
                };
                _this.formattedLabel = labelFormatting(cardData);
                _this.transformBand = "translate(0 , " + (_this.cardHeight - _this.bandHeight) + ")";
                var value = hasValue ? valueFormatting(cardData) : '';
                _this.value = _this.paddedValue(value);
                _this.setPadding();
                _this.bandPath = roundedRect(0, 0, _this.cardWidth, _this.bandHeight, 3, [false, false, true, true]);
                setTimeout(function () {
                    if (common.isPlatformBrowser(_this.platformId)) {
                        _this.scaleText();
                    }
                    _this.value = value;
                    if (hasValue && !_this.initialized) {
                        setTimeout(function () { return _this.startCount(); }, 20);
                    }
                }, 8);
            });
        };
        CardComponent.prototype.paddedValue = function (value) {
            if (this.medianSize && this.medianSize > value.length) {
                value += '\u2007'.repeat(this.medianSize - value.length);
            }
            return value;
        };
        CardComponent.prototype.startCount = function () {
            var _this = this;
            if (!this.initialized && this.animations) {
                cancelAnimationFrame(this.animationReq);
                var val_1 = this.data.value;
                var decs = decimalChecker(val_1);
                var valueFormatting_1 = this.valueFormatting || (function (card) { return card.value.toLocaleString(); });
                var callback = function (_a) {
                    var value = _a.value, finished = _a.finished;
                    _this.zone.run(function () {
                        value = finished ? val_1 : value;
                        _this.value = valueFormatting_1({ label: _this.label, data: _this.data, value: value });
                        if (!finished) {
                            _this.value = _this.paddedValue(_this.value);
                        }
                        _this.cd.markForCheck();
                    });
                };
                this.animationReq = count(0, val_1, decs, 1, callback);
                this.initialized = true;
            }
        };
        CardComponent.prototype.scaleText = function () {
            var _this = this;
            this.zone.run(function () {
                var _a = _this.textEl.nativeElement.getBoundingClientRect(), width = _a.width, height = _a.height;
                if (width === 0 || height === 0) {
                    return;
                }
                var textPadding = (_this.textPadding[1] = _this.textPadding[3] = _this.cardWidth / 8);
                var availableWidth = _this.cardWidth - 2 * textPadding;
                var availableHeight = _this.cardHeight / 3;
                var resizeScale = Math.min(availableWidth / width, availableHeight / height);
                _this.textFontSize = Math.floor(_this.textFontSize * resizeScale);
                _this.labelFontSize = Math.min(_this.textFontSize, 15);
                _this.setPadding();
                _this.cd.markForCheck();
            });
        };
        CardComponent.prototype.scaleTextSSR = function () {
            var width = calculateTextWidth(VERDANA_FONT_WIDTHS_16_PX, this.value, 10);
            var height = 18;
            var textPadding = (this.textPadding[1] = this.textPadding[3] = this.cardWidth / 8);
            var availableWidth = this.cardWidth - 2 * textPadding;
            var availableHeight = this.cardHeight / 3;
            var resizeScale = Math.min(availableWidth / width, availableHeight / height);
            this.textFontSize = Math.floor(this.textFontSize * resizeScale);
            this.labelFontSize = Math.min(this.textFontSize, 15);
            this.setPadding();
        };
        CardComponent.prototype.setPadding = function () {
            this.textPadding[1] = this.textPadding[3] = this.cardWidth / 8;
            var padding = this.cardHeight / 2;
            this.textPadding[0] = padding - this.textFontSize - this.labelFontSize / 2;
            this.textPadding[2] = padding - this.labelFontSize;
        };
        CardComponent.prototype.onClick = function () {
            this.select.emit(this.data);
        };
        return CardComponent;
    }());
    CardComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'g[ngx-charts-card]',
                    template: "\n    <svg:g [attr.transform]=\"transform\" class=\"cell\" (click)=\"onClick()\">\n      <svg:rect class=\"card\" [style.fill]=\"color\" [attr.width]=\"cardWidth\" [attr.height]=\"cardHeight\" rx=\"3\" ry=\"3\" />\n      <svg:path\n        *ngIf=\"bandColor && bandColor !== color\"\n        class=\"card-band\"\n        [attr.fill]=\"bandColor\"\n        [attr.transform]=\"transformBand\"\n        stroke=\"none\"\n        [attr.d]=\"bandPath\"\n      />\n      <title>{{ label }}</title>\n      <svg:foreignObject\n        class=\"trimmed-label\"\n        x=\"5\"\n        [attr.x]=\"textPadding[3]\"\n        [attr.y]=\"cardHeight - textPadding[2]\"\n        [attr.width]=\"textWidth\"\n        [attr.height]=\"labelFontSize + textPadding[2]\"\n        alignment-baseline=\"hanging\"\n      >\n        <xhtml:p\n          [style.color]=\"textColor\"\n          [style.fontSize.px]=\"labelFontSize\"\n          [style.lineHeight.px]=\"labelFontSize\"\n          [innerHTML]=\"formattedLabel\"\n        >\n        </xhtml:p>\n      </svg:foreignObject>\n      <svg:text\n        #textEl\n        class=\"value-text\"\n        [attr.x]=\"textPadding[3]\"\n        [attr.y]=\"textPadding[0]\"\n        [style.fill]=\"textColor\"\n        text-anchor=\"start\"\n        alignment-baseline=\"hanging\"\n        [style.font-size.pt]=\"textFontSize\"\n      >\n        {{ value }}\n      </svg:text>\n    </svg:g>\n  ",
                    changeDetection: core.ChangeDetectionStrategy.OnPush
                },] }
    ];
    CardComponent.ctorParameters = function () { return [
        { type: core.ElementRef },
        { type: core.ChangeDetectorRef },
        { type: core.NgZone },
        { type: undefined, decorators: [{ type: core.Inject, args: [core.PLATFORM_ID,] }] }
    ]; };
    CardComponent.propDecorators = {
        color: [{ type: core.Input }],
        bandColor: [{ type: core.Input }],
        textColor: [{ type: core.Input }],
        x: [{ type: core.Input }],
        y: [{ type: core.Input }],
        width: [{ type: core.Input }],
        height: [{ type: core.Input }],
        label: [{ type: core.Input }],
        data: [{ type: core.Input }],
        medianSize: [{ type: core.Input }],
        valueFormatting: [{ type: core.Input }],
        labelFormatting: [{ type: core.Input }],
        animations: [{ type: core.Input }],
        select: [{ type: core.Output }],
        textEl: [{ type: core.ViewChild, args: ['textEl', { static: false },] }]
    };

    /**
     * Converts a hex to RGB
     *
     * @export
     */
    function hexToRgb(value) {
        // deprecated, use d3.color()
        return d3_color__namespace.rgb(value);
    }
    /**
     * Accepts a color (string) and returns a inverted hex color (string)
     * http://stackoverflow.com/questions/9600295/automatically-change-text-color-to-assure-readability
     *
     * @export
     */
    function invertColor(value) {
        var color = d3_color__namespace.rgb(value);
        var r = color.r, g = color.g, b = color.b, opacity = color.opacity;
        if (opacity === 0) {
            return color.toString();
        }
        var yiq = (r * 299 + g * 587 + b * 114) / 1000;
        var depth = yiq >= 128 ? -0.8 : 0.8;
        return shadeRGBColor(color, depth);
    }
    /**
     * Given a rgb, it will darken/lighten
     * http://stackoverflow.com/questions/5560248/programmatically-lighten-or-darken-a-hex-color-or-rgb-and-blend-colors
     *
     * @export
     * @param \{ r, g, b }
     */
    function shadeRGBColor(_a, percent) {
        var r = _a.r, g = _a.g, b = _a.b;
        var t = percent < 0 ? 0 : 255;
        var p = percent < 0 ? percent * -1 : percent;
        r = Math.round((t - r) * p) + r;
        g = Math.round((t - g) * p) + g;
        b = Math.round((t - b) * p) + b;
        return "rgb(" + r + ", " + g + ", " + b + ")";
    }

    var CardSeriesComponent = /** @class */ (function () {
        function CardSeriesComponent() {
            this.innerPadding = 15;
            this.emptyColor = 'rgba(0, 0, 0, 0)';
            this.animations = true;
            this.select = new core.EventEmitter();
        }
        CardSeriesComponent.prototype.ngOnChanges = function (changes) {
            this.update();
        };
        CardSeriesComponent.prototype.update = function () {
            if (this.data.length > 2) {
                var valueFormatting_1 = this.valueFormatting || (function (card) { return card.value.toLocaleString(); });
                var sortedLengths = this.data
                    .map(function (d) {
                    var hasValue = d && d.data && typeof d.data.value !== 'undefined' && d.data.value !== null;
                    return hasValue
                        ? valueFormatting_1({
                            data: d.data,
                            label: d ? d.data.name : '',
                            value: d && d.data ? d.data.value : ''
                        }).length
                        : 0;
                })
                    .sort(function (a, b) { return b - a; });
                var idx = Math.ceil(this.data.length / 2);
                this.medianSize = sortedLengths[idx];
            }
            var cards = this.getCards();
            this.cards = cards.filter(function (d) { return d.data.value !== null; });
            this.emptySlots = cards.filter(function (d) { return d.data.value === null; });
        };
        CardSeriesComponent.prototype.getCards = function () {
            var _this = this;
            var yPadding = typeof this.innerPadding === 'number' ? this.innerPadding : this.innerPadding[0] + this.innerPadding[2];
            var xPadding = typeof this.innerPadding === 'number' ? this.innerPadding : this.innerPadding[1] + this.innerPadding[3];
            return this.data.map(function (d, index) {
                var label = d.data.name;
                if (label && label.constructor.name === 'Date') {
                    label = label.toLocaleDateString();
                }
                else {
                    label = label ? label.toLocaleString() : label;
                }
                var value = d.data.value;
                var valueColor = label ? _this.colors.getColor(label) : _this.emptyColor;
                var color = _this.cardColor || valueColor || '#000';
                return {
                    x: d.x,
                    y: d.y,
                    width: d.width - xPadding,
                    height: d.height - yPadding,
                    color: color,
                    bandColor: _this.bandColor || valueColor,
                    textColor: _this.textColor || invertColor(color),
                    label: label,
                    data: d.data,
                    tooltipText: label + ": " + value
                };
            });
        };
        CardSeriesComponent.prototype.trackBy = function (index, card) {
            return card.label;
        };
        CardSeriesComponent.prototype.onClick = function (data) {
            this.select.emit(data);
        };
        return CardSeriesComponent;
    }());
    CardSeriesComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'g[ngx-charts-card-series]',
                    template: "\n    <svg:rect\n      *ngFor=\"let c of emptySlots; trackBy: trackBy\"\n      class=\"card-empty\"\n      [attr.x]=\"c.x\"\n      [attr.y]=\"c.y\"\n      [style.fill]=\"emptyColor\"\n      [attr.width]=\"c.width\"\n      [attr.height]=\"c.height\"\n      rx=\"3\"\n      ry=\"3\"\n    />\n    <svg:g\n      ngx-charts-card\n      *ngFor=\"let c of cards; trackBy: trackBy\"\n      [x]=\"c.x\"\n      [y]=\"c.y\"\n      [width]=\"c.width\"\n      [height]=\"c.height\"\n      [color]=\"c.color\"\n      [bandColor]=\"c.bandColor\"\n      [textColor]=\"c.textColor\"\n      [data]=\"c.data\"\n      [label]=\"c.label\"\n      [medianSize]=\"medianSize\"\n      [valueFormatting]=\"valueFormatting\"\n      [labelFormatting]=\"labelFormatting\"\n      [animations]=\"animations\"\n      (select)=\"onClick($event)\"\n    />\n  ",
                    changeDetection: core.ChangeDetectionStrategy.OnPush
                },] }
    ];
    CardSeriesComponent.propDecorators = {
        data: [{ type: core.Input }],
        dims: [{ type: core.Input }],
        colors: [{ type: core.Input }],
        innerPadding: [{ type: core.Input }],
        cardColor: [{ type: core.Input }],
        bandColor: [{ type: core.Input }],
        emptyColor: [{ type: core.Input }],
        textColor: [{ type: core.Input }],
        valueFormatting: [{ type: core.Input }],
        labelFormatting: [{ type: core.Input }],
        animations: [{ type: core.Input }],
        select: [{ type: core.Output }]
    };

    var NumberCardComponent = /** @class */ (function (_super) {
        __extends(NumberCardComponent, _super);
        function NumberCardComponent() {
            var _this = _super.apply(this, __spreadArray([], __read(arguments))) || this;
            _this.emptyColor = 'rgba(0, 0, 0, 0)';
            _this.innerPadding = 15;
            _this.margin = [10, 10, 10, 10];
            return _this;
        }
        Object.defineProperty(NumberCardComponent.prototype, "clickable", {
            get: function () {
                return !!this.select.observers.length;
            },
            enumerable: false,
            configurable: true
        });
        NumberCardComponent.prototype.update = function () {
            _super.prototype.update.call(this);
            this.dims = calculateViewDimensions({
                width: this.width,
                height: this.height,
                margins: this.margin
            });
            this.formatDates();
            this.domain = this.getDomain();
            this.setColors();
            this.transform = "translate(" + this.dims.xOffset + " , " + this.margin[0] + ")";
            var size = gridSize(this.dims, this.results.length, 150);
            var N = size[0] * size[1];
            var data = this.results.slice();
            while (data.length < N) {
                data.push({ value: null });
            }
            this.data = gridLayout(this.dims, data, 150, this.designatedTotal);
        };
        NumberCardComponent.prototype.getDomain = function () {
            return this.results.map(function (d) { return d.label; });
        };
        NumberCardComponent.prototype.onClick = function (data) {
            this.select.emit(data);
        };
        NumberCardComponent.prototype.setColors = function () {
            this.colors = new ColorHelper(this.scheme, exports.ScaleType.Ordinal, this.domain, this.customColors);
        };
        return NumberCardComponent;
    }(BaseChartComponent));
    NumberCardComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'ngx-charts-number-card',
                    template: "\n    <ngx-charts-chart [view]=\"[width, height]\" [showLegend]=\"false\" [animations]=\"animations\">\n      <svg:g [attr.transform]=\"transform\" class=\"number-card chart\" [class.clickable]=\"clickable\">\n        <svg:g\n          ngx-charts-card-series\n          [colors]=\"colors\"\n          [cardColor]=\"cardColor\"\n          [bandColor]=\"bandColor\"\n          [textColor]=\"textColor\"\n          [emptyColor]=\"emptyColor\"\n          [data]=\"data\"\n          [dims]=\"dims\"\n          [innerPadding]=\"innerPadding\"\n          [valueFormatting]=\"valueFormatting\"\n          [labelFormatting]=\"labelFormatting\"\n          [animations]=\"animations\"\n          (select)=\"onClick($event)\"\n        />\n      </svg:g>\n    </ngx-charts-chart>\n  ",
                    encapsulation: core.ViewEncapsulation.None,
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    styles: [".ngx-charts-outer{-webkit-animation:chartFadeIn linear .6s;animation:chartFadeIn linear .6s}@-webkit-keyframes chartFadeIn{0%{opacity:0}20%{opacity:0}to{opacity:1}}@keyframes chartFadeIn{0%{opacity:0}20%{opacity:0}to{opacity:1}}.ngx-charts{float:left;overflow:visible}.ngx-charts .circle,.ngx-charts .cell,.ngx-charts .bar,.ngx-charts .arc{cursor:pointer}.ngx-charts .bar.active,.ngx-charts .bar:hover,.ngx-charts .cell.active,.ngx-charts .cell:hover,.ngx-charts .arc.active,.ngx-charts .arc:hover,.ngx-charts .card.active,.ngx-charts .card:hover{opacity:.8;transition:opacity .1s ease-in-out}.ngx-charts .bar:focus,.ngx-charts .cell:focus,.ngx-charts .arc:focus,.ngx-charts .card:focus{outline:none}.ngx-charts .bar.hidden,.ngx-charts .cell.hidden,.ngx-charts .arc.hidden,.ngx-charts .card.hidden{display:none}.ngx-charts g:focus{outline:none}.ngx-charts .line-series.inactive,.ngx-charts .line-series-range.inactive,.ngx-charts .polar-series-path.inactive,.ngx-charts .polar-series-area.inactive,.ngx-charts .area-series.inactive{transition:opacity .1s ease-in-out;opacity:.2}.ngx-charts .line-highlight{display:none}.ngx-charts .line-highlight.active{display:block}.ngx-charts .area{opacity:.6}.ngx-charts .circle:hover{cursor:pointer}.ngx-charts .label{font-size:12px;font-weight:normal}.ngx-charts .tooltip-anchor{fill:#000}.ngx-charts .gridline-path{stroke:#ddd;stroke-width:1;fill:none}.ngx-charts .refline-path{stroke:#a8b2c7;stroke-width:1;stroke-dasharray:5;stroke-dashoffset:5}.ngx-charts .refline-label{font-size:9px}.ngx-charts .reference-area{fill-opacity:.05;fill:#000}.ngx-charts .gridline-path-dotted{stroke:#ddd;stroke-width:1;fill:none;stroke-dasharray:1,20;stroke-dashoffset:3}.ngx-charts .grid-panel rect{fill:none}.ngx-charts .grid-panel.odd rect{fill:#0000000d}\n", "ngx-charts-number-card .cell .trimmed-label{font-size:12px;pointer-events:none;overflow:hidden;text-align:left;line-height:1em}ngx-charts-number-card .cell .trimmed-label p{overflow:hidden;white-space:nowrap;text-overflow:ellipsis;width:100%;padding:0;margin:0}ngx-charts-number-card .cell .value-text{pointer-events:none}ngx-charts-number-card .number-card.clickable .cell .card,ngx-charts-number-card .number-card.clickable .cell .card-band{cursor:pointer}\n"]
                },] }
    ];
    NumberCardComponent.propDecorators = {
        cardColor: [{ type: core.Input }],
        bandColor: [{ type: core.Input }],
        emptyColor: [{ type: core.Input }],
        innerPadding: [{ type: core.Input }],
        textColor: [{ type: core.Input }],
        valueFormatting: [{ type: core.Input }],
        labelFormatting: [{ type: core.Input }],
        designatedTotal: [{ type: core.Input }]
    };

    var NumberCardModule = /** @class */ (function () {
        function NumberCardModule() {
        }
        return NumberCardModule;
    }());
    NumberCardModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [ChartCommonModule],
                    declarations: [CardComponent, CardSeriesComponent, NumberCardComponent],
                    exports: [CardComponent, CardSeriesComponent, NumberCardComponent]
                },] }
    ];

    var TreeMapCellComponent = /** @class */ (function () {
        function TreeMapCellComponent(element) {
            this.gradient = false;
            this.animations = true;
            this.select = new core.EventEmitter();
            this.initialized = false;
            this.orientation = exports.BarOrientation;
            this.element = element.nativeElement;
        }
        TreeMapCellComponent.prototype.ngOnChanges = function () {
            this.update();
            this.valueFormatting = this.valueFormatting || (function (value) { return value.toLocaleString(); });
            var labelFormatting = this.labelFormatting || (function (cell) { return escapeLabel(trimLabel(cell.label, 55)); });
            var cellData = {
                data: this.data,
                label: this.label,
                value: this.value
            };
            this.formattedValue = this.valueFormatting(cellData.value);
            this.formattedLabel = labelFormatting(cellData);
            this.gradientId = 'grad' + id().toString();
            this.gradientUrl = "url(#" + this.gradientId + ")";
            this.gradientStops = this.getGradientStops();
        };
        TreeMapCellComponent.prototype.update = function () {
            if (this.initialized) {
                this.animateToCurrentForm();
            }
            else {
                if (this.animations) {
                    this.loadAnimation();
                }
                this.initialized = true;
            }
        };
        TreeMapCellComponent.prototype.loadAnimation = function () {
            var node = d3Selection.select(this.element).select('.cell');
            node.attr('opacity', 0).attr('x', this.x).attr('y', this.y);
            this.animateToCurrentForm();
        };
        TreeMapCellComponent.prototype.getTextColor = function () {
            return invertColor(this.fill);
        };
        TreeMapCellComponent.prototype.animateToCurrentForm = function () {
            var node = d3Selection.select(this.element).select('.cell');
            if (this.animations) {
                node
                    .transition()
                    .duration(750)
                    .attr('opacity', 1)
                    .attr('x', this.x)
                    .attr('y', this.y)
                    .attr('width', this.width)
                    .attr('height', this.height);
            }
            else {
                node.attr('opacity', 1).attr('x', this.x).attr('y', this.y).attr('width', this.width).attr('height', this.height);
            }
        };
        TreeMapCellComponent.prototype.onClick = function () {
            this.select.emit(this.data);
        };
        TreeMapCellComponent.prototype.getGradientStops = function () {
            return [
                {
                    offset: 0,
                    color: this.fill,
                    opacity: 0.3
                },
                {
                    offset: 100,
                    color: this.fill,
                    opacity: 1
                }
            ];
        };
        return TreeMapCellComponent;
    }());
    TreeMapCellComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'g[ngx-charts-tree-map-cell]',
                    template: "\n    <svg:g>\n      <defs *ngIf=\"gradient\">\n        <svg:g\n          ngx-charts-svg-linear-gradient\n          [orientation]=\"orientation.Vertical\"\n          [name]=\"gradientId\"\n          [stops]=\"gradientStops\"\n        />\n      </defs>\n      <svg:rect\n        [attr.fill]=\"gradient ? gradientUrl : fill\"\n        [attr.width]=\"width\"\n        [attr.height]=\"height\"\n        [attr.x]=\"x\"\n        [attr.y]=\"y\"\n        class=\"cell\"\n        (click)=\"onClick()\"\n      />\n      <svg:foreignObject\n        *ngIf=\"width >= 70 && height >= 35\"\n        [attr.x]=\"x\"\n        [attr.y]=\"y\"\n        [attr.width]=\"width\"\n        [attr.height]=\"height\"\n        class=\"treemap-label\"\n        [style.pointer-events]=\"'none'\"\n      >\n        <xhtml:p [style.color]=\"getTextColor()\" [style.height]=\"height + 'px'\" [style.width]=\"width + 'px'\">\n          <xhtml:span class=\"treemap-label\" [innerHTML]=\"formattedLabel\"> </xhtml:span>\n          <xhtml:br />\n          <xhtml:span\n            *ngIf=\"animations\"\n            class=\"treemap-val\"\n            ngx-charts-count-up\n            [countTo]=\"value\"\n            [valueFormatting]=\"valueFormatting\"\n          >\n          </xhtml:span>\n          <xhtml:span *ngIf=\"!animations\" class=\"treemap-val\">\n            {{ formattedValue }}\n          </xhtml:span>\n        </xhtml:p>\n      </svg:foreignObject>\n    </svg:g>\n  ",
                    changeDetection: core.ChangeDetectionStrategy.OnPush
                },] }
    ];
    TreeMapCellComponent.ctorParameters = function () { return [
        { type: core.ElementRef }
    ]; };
    TreeMapCellComponent.propDecorators = {
        data: [{ type: core.Input }],
        fill: [{ type: core.Input }],
        x: [{ type: core.Input }],
        y: [{ type: core.Input }],
        width: [{ type: core.Input }],
        height: [{ type: core.Input }],
        label: [{ type: core.Input }],
        value: [{ type: core.Input }],
        valueFormatting: [{ type: core.Input }],
        labelFormatting: [{ type: core.Input }],
        gradient: [{ type: core.Input }],
        animations: [{ type: core.Input }],
        select: [{ type: core.Output }]
    };

    var TreeMapCellSeriesComponent = /** @class */ (function () {
        function TreeMapCellSeriesComponent() {
            this.gradient = false;
            this.tooltipDisabled = false;
            this.animations = true;
            this.select = new core.EventEmitter();
            this.styleTypes = exports.StyleTypes;
            this.placementTypes = exports.PlacementTypes;
        }
        TreeMapCellSeriesComponent.prototype.ngOnChanges = function (changes) {
            this.cells = this.getCells();
        };
        TreeMapCellSeriesComponent.prototype.getCells = function () {
            var _this = this;
            return this.data.children
                .filter(function (d) {
                return d.depth === 1;
            })
                .map(function (d, index) {
                var label = d.id;
                return {
                    data: d.data,
                    x: d.x0,
                    y: d.y0,
                    width: d.x1 - d.x0,
                    height: d.y1 - d.y0,
                    fill: _this.colors.getColor(label),
                    label: label,
                    value: d.value
                };
            });
        };
        TreeMapCellSeriesComponent.prototype.getTooltipText = function (_a) {
            var label = _a.label, value = _a.value;
            return "\n      <span class=\"tooltip-label\">" + escapeLabel(label) + "</span>\n      <span class=\"tooltip-val\">" + value.toLocaleString() + "</span>\n    ";
        };
        TreeMapCellSeriesComponent.prototype.onClick = function (data) {
            this.select.emit(data);
        };
        TreeMapCellSeriesComponent.prototype.trackBy = function (index, item) {
            return item.label;
        };
        return TreeMapCellSeriesComponent;
    }());
    TreeMapCellSeriesComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'g[ngx-charts-tree-map-cell-series]',
                    template: "\n    <svg:g\n      ngx-charts-tree-map-cell\n      *ngFor=\"let c of cells; trackBy: trackBy\"\n      [data]=\"c.data\"\n      [x]=\"c.x\"\n      [y]=\"c.y\"\n      [width]=\"c.width\"\n      [height]=\"c.height\"\n      [fill]=\"c.fill\"\n      [label]=\"c.label\"\n      [value]=\"c.value\"\n      [valueFormatting]=\"valueFormatting\"\n      [labelFormatting]=\"labelFormatting\"\n      [gradient]=\"gradient\"\n      [animations]=\"animations\"\n      (select)=\"onClick($event)\"\n      ngx-tooltip\n      [tooltipDisabled]=\"tooltipDisabled\"\n      [tooltipPlacement]=\"placementTypes.Top\"\n      [tooltipType]=\"styleTypes.tooltip\"\n      [tooltipTitle]=\"tooltipTemplate ? undefined : getTooltipText(c)\"\n      [tooltipTemplate]=\"tooltipTemplate\"\n      [tooltipContext]=\"c.data\"\n    ></svg:g>\n  ",
                    changeDetection: core.ChangeDetectionStrategy.OnPush
                },] }
    ];
    TreeMapCellSeriesComponent.propDecorators = {
        data: [{ type: core.Input }],
        dims: [{ type: core.Input }],
        colors: [{ type: core.Input }],
        valueFormatting: [{ type: core.Input }],
        labelFormatting: [{ type: core.Input }],
        gradient: [{ type: core.Input }],
        tooltipDisabled: [{ type: core.Input }],
        tooltipTemplate: [{ type: core.Input }],
        animations: [{ type: core.Input }],
        select: [{ type: core.Output }]
    };

    var TreeMapComponent = /** @class */ (function (_super) {
        __extends(TreeMapComponent, _super);
        function TreeMapComponent() {
            var _this = _super.apply(this, __spreadArray([], __read(arguments))) || this;
            _this.tooltipDisabled = false;
            _this.gradient = false;
            _this.select = new core.EventEmitter();
            _this.margin = [10, 10, 10, 10];
            return _this;
        }
        TreeMapComponent.prototype.update = function () {
            _super.prototype.update.call(this);
            this.dims = calculateViewDimensions({
                width: this.width,
                height: this.height,
                margins: this.margin
            });
            this.domain = this.getDomain();
            this.treemap = d3Hierarchy.treemap().size([this.dims.width, this.dims.height]);
            var rootNode = {
                name: 'root',
                value: 0,
                isRoot: true
            };
            var root = d3Hierarchy.stratify()
                .id(function (d) {
                var label = d.name;
                if (label.constructor.name === 'Date') {
                    label = label.toLocaleDateString();
                }
                else {
                    label = label.toLocaleString();
                }
                return label;
            })
                .parentId(function (d) { return (d.isRoot ? null : 'root'); })(__spreadArray([rootNode], __read(this.results)))
                .sum(function (d) { return d.value; });
            this.data = this.treemap(root);
            this.setColors();
            this.transform = "translate(" + this.dims.xOffset + " , " + this.margin[0] + ")";
        };
        TreeMapComponent.prototype.getDomain = function () {
            return this.results.map(function (d) { return d.name; });
        };
        TreeMapComponent.prototype.onClick = function (data) {
            this.select.emit(data);
        };
        TreeMapComponent.prototype.setColors = function () {
            this.colors = new ColorHelper(this.scheme, exports.ScaleType.Ordinal, this.domain, this.customColors);
        };
        return TreeMapComponent;
    }(BaseChartComponent));
    TreeMapComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'ngx-charts-tree-map',
                    template: "\n    <ngx-charts-chart [view]=\"[width, height]\" [showLegend]=\"false\" [animations]=\"animations\">\n      <svg:g [attr.transform]=\"transform\" class=\"tree-map chart\">\n        <svg:g\n          ngx-charts-tree-map-cell-series\n          [colors]=\"colors\"\n          [data]=\"data\"\n          [dims]=\"dims\"\n          [tooltipDisabled]=\"tooltipDisabled\"\n          [tooltipTemplate]=\"tooltipTemplate\"\n          [valueFormatting]=\"valueFormatting\"\n          [labelFormatting]=\"labelFormatting\"\n          [gradient]=\"gradient\"\n          [animations]=\"animations\"\n          (select)=\"onClick($event)\"\n        />\n      </svg:g>\n    </ngx-charts-chart>\n  ",
                    encapsulation: core.ViewEncapsulation.None,
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    styles: [".tree-map .treemap-val{font-size:1.3em;padding-top:5px;display:inline-block}.tree-map .treemap-label p{display:table-cell;text-align:center;line-height:1.2em;vertical-align:middle}\n"]
                },] }
    ];
    TreeMapComponent.propDecorators = {
        results: [{ type: core.Input }],
        tooltipDisabled: [{ type: core.Input }],
        valueFormatting: [{ type: core.Input }],
        labelFormatting: [{ type: core.Input }],
        gradient: [{ type: core.Input }],
        select: [{ type: core.Output }],
        tooltipTemplate: [{ type: core.ContentChild, args: ['tooltipTemplate',] }]
    };

    var TreeMapModule = /** @class */ (function () {
        function TreeMapModule() {
        }
        return TreeMapModule;
    }());
    TreeMapModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [ChartCommonModule],
                    declarations: [TreeMapCellComponent, TreeMapCellSeriesComponent, TreeMapComponent],
                    exports: [TreeMapCellComponent, TreeMapCellSeriesComponent, TreeMapComponent]
                },] }
    ];

    var ElementType;
    (function (ElementType) {
        ElementType["Value"] = "value";
        ElementType["Units"] = "units";
    })(ElementType || (ElementType = {}));
    var LinearGaugeComponent = /** @class */ (function (_super) {
        __extends(LinearGaugeComponent, _super);
        function LinearGaugeComponent() {
            var _this = _super.apply(this, __spreadArray([], __read(arguments))) || this;
            _this.min = 0;
            _this.max = 100;
            _this.value = 0;
            _this.margin = [10, 20, 10, 20];
            _this.valueResizeScale = 1;
            _this.unitsResizeScale = 1;
            _this.valueTextTransform = '';
            _this.valueTranslate = '';
            _this.unitsTextTransform = '';
            _this.unitsTranslate = '';
            _this.barOrientation = exports.BarOrientation;
            return _this;
        }
        LinearGaugeComponent.prototype.ngAfterViewInit = function () {
            var _this = this;
            _super.prototype.ngAfterViewInit.call(this);
            setTimeout(function () {
                _this.scaleText(ElementType.Value);
                _this.scaleText(ElementType.Units);
            });
        };
        LinearGaugeComponent.prototype.update = function () {
            var _this = this;
            _super.prototype.update.call(this);
            this.hasPreviousValue = this.previousValue !== undefined;
            this.max = Math.max(this.max, this.value);
            this.min = Math.min(this.min, this.value);
            if (this.hasPreviousValue) {
                this.max = Math.max(this.max, this.previousValue);
                this.min = Math.min(this.min, this.previousValue);
            }
            this.dims = calculateViewDimensions({
                width: this.width,
                height: this.height,
                margins: this.margin
            });
            this.valueDomain = this.getValueDomain();
            this.valueScale = this.getValueScale();
            this.displayValue = this.getDisplayValue();
            this.setColors();
            var xOffset = this.margin[3] + this.dims.width / 2;
            var yOffset = this.margin[0] + this.dims.height / 2;
            this.transform = "translate(" + xOffset + ", " + yOffset + ")";
            this.transformLine = "translate(" + (this.margin[3] + this.valueScale(this.previousValue)) + ", " + yOffset + ")";
            this.valueTranslate = "translate(0, -15)";
            this.unitsTranslate = "translate(0, 15)";
            if (common.isPlatformServer(this.platformId)) {
                this.scaleTextSSR('value');
                this.scaleTextSSR('units');
            }
            else {
                setTimeout(function () { return _this.scaleText(ElementType.Value); }, 50);
                setTimeout(function () { return _this.scaleText(ElementType.Units); }, 50);
            }
        };
        LinearGaugeComponent.prototype.getValueDomain = function () {
            return [this.min, this.max];
        };
        LinearGaugeComponent.prototype.getValueScale = function () {
            return d3Scale.scaleLinear().range([0, this.dims.width]).domain(this.valueDomain);
        };
        LinearGaugeComponent.prototype.getDisplayValue = function () {
            if (this.valueFormatting) {
                return this.valueFormatting(this.value);
            }
            return this.value.toLocaleString();
        };
        LinearGaugeComponent.prototype.scaleText = function (element, repeat) {
            var _this = this;
            if (repeat === void 0) { repeat = true; }
            var el;
            var resizeScale;
            if (element === ElementType.Value) {
                el = this.valueTextEl;
                resizeScale = this.valueResizeScale;
            }
            else {
                el = this.unitsTextEl;
                resizeScale = this.unitsResizeScale;
            }
            var _a = el.nativeElement.getBoundingClientRect(), width = _a.width, height = _a.height;
            if (width === 0 || height === 0)
                return;
            var oldScale = resizeScale;
            var availableWidth = this.dims.width;
            var availableHeight = Math.max(this.dims.height / 2 - 15, 0);
            var resizeScaleWidth = Math.floor((availableWidth / (width / resizeScale)) * 100) / 100;
            var resizeScaleHeight = Math.floor((availableHeight / (height / resizeScale)) * 100) / 100;
            resizeScale = Math.min(resizeScaleHeight, resizeScaleWidth);
            if (resizeScale !== oldScale) {
                if (element === ElementType.Value) {
                    this.valueResizeScale = resizeScale;
                    this.valueTextTransform = "scale(" + resizeScale + ", " + resizeScale + ")";
                }
                else {
                    this.unitsResizeScale = resizeScale;
                    this.unitsTextTransform = "scale(" + resizeScale + ", " + resizeScale + ")";
                }
                this.cd.markForCheck();
                if (repeat && common.isPlatformBrowser(this.platformId)) {
                    setTimeout(function () {
                        _this.scaleText(element, false);
                    }, 50);
                }
            }
        };
        LinearGaugeComponent.prototype.scaleTextSSR = function (element) {
            var resizeScale = 1;
            var value = element === 'value' ? this.displayValue : this.units;
            var width = calculateTextWidth(VERDANA_FONT_WIDTHS_16_PX, value, 10);
            var height = 25;
            var availableWidth = this.dims.width;
            var availableHeight = Math.max(this.dims.height / 2 - 15, 0);
            var resizeScaleWidth = Math.floor((availableWidth / (width / resizeScale)) * 100) / 100;
            var resizeScaleHeight = Math.floor((availableHeight / (height / resizeScale)) * 100) / 100;
            resizeScale = Math.min(resizeScaleHeight, resizeScaleWidth);
            if (element === 'value') {
                this.valueResizeScale = resizeScale;
                this.valueTextTransform = "scale(" + resizeScale + ", " + resizeScale + ")";
            }
            else {
                this.unitsResizeScale = resizeScale;
                this.unitsTextTransform = "scale(" + resizeScale + ", " + resizeScale + ")";
            }
            this.cd.markForCheck();
        };
        LinearGaugeComponent.prototype.onClick = function () {
            this.select.emit({
                name: 'Value',
                value: this.value
            });
        };
        LinearGaugeComponent.prototype.setColors = function () {
            this.colors = new ColorHelper(this.scheme, exports.ScaleType.Ordinal, [this.value], this.customColors);
        };
        return LinearGaugeComponent;
    }(BaseChartComponent));
    LinearGaugeComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'ngx-charts-linear-gauge',
                    template: "\n    <ngx-charts-chart [view]=\"[width, height]\" [showLegend]=\"false\" [animations]=\"animations\" (click)=\"onClick()\">\n      <svg:g class=\"linear-gauge chart\">\n        <svg:g\n          ngx-charts-bar\n          class=\"background-bar\"\n          [width]=\"dims.width\"\n          [height]=\"3\"\n          [x]=\"margin[3]\"\n          [y]=\"dims.height / 2 + margin[0] - 2\"\n          [data]=\"{}\"\n          [orientation]=\"barOrientation.Horizontal\"\n          [roundEdges]=\"true\"\n          [animations]=\"animations\"\n        ></svg:g>\n        <svg:g\n          ngx-charts-bar\n          [width]=\"valueScale(value)\"\n          [height]=\"3\"\n          [x]=\"margin[3]\"\n          [y]=\"dims.height / 2 + margin[0] - 2\"\n          [fill]=\"colors.getColor(units)\"\n          [data]=\"{}\"\n          [orientation]=\"barOrientation.Horizontal\"\n          [roundEdges]=\"true\"\n          [animations]=\"animations\"\n        ></svg:g>\n\n        <svg:line\n          *ngIf=\"hasPreviousValue\"\n          [attr.transform]=\"transformLine\"\n          x1=\"0\"\n          y1=\"5\"\n          x2=\"0\"\n          y2=\"15\"\n          [attr.stroke]=\"colors.getColor(units)\"\n        />\n\n        <svg:line\n          *ngIf=\"hasPreviousValue\"\n          [attr.transform]=\"transformLine\"\n          x1=\"0\"\n          y1=\"-5\"\n          x2=\"0\"\n          y2=\"-15\"\n          [attr.stroke]=\"colors.getColor(units)\"\n        />\n\n        <svg:g [attr.transform]=\"transform\">\n          <svg:g [attr.transform]=\"valueTranslate\">\n            <svg:text\n              #valueTextEl\n              class=\"value\"\n              [style.textAnchor]=\"'middle'\"\n              [attr.transform]=\"valueTextTransform\"\n              alignment-baseline=\"after-edge\"\n            >\n              {{ displayValue }}\n            </svg:text>\n          </svg:g>\n\n          <svg:g [attr.transform]=\"unitsTranslate\">\n            <svg:text\n              #unitsTextEl\n              class=\"units\"\n              [style.textAnchor]=\"'middle'\"\n              [attr.transform]=\"unitsTextTransform\"\n              alignment-baseline=\"before-edge\"\n            >\n              {{ units }}\n            </svg:text>\n          </svg:g>\n        </svg:g>\n      </svg:g>\n    </ngx-charts-chart>\n  ",
                    encapsulation: core.ViewEncapsulation.None,
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    styles: [".ngx-charts-outer{-webkit-animation:chartFadeIn linear .6s;animation:chartFadeIn linear .6s}@-webkit-keyframes chartFadeIn{0%{opacity:0}20%{opacity:0}to{opacity:1}}@keyframes chartFadeIn{0%{opacity:0}20%{opacity:0}to{opacity:1}}.ngx-charts{float:left;overflow:visible}.ngx-charts .circle,.ngx-charts .cell,.ngx-charts .bar,.ngx-charts .arc{cursor:pointer}.ngx-charts .bar.active,.ngx-charts .bar:hover,.ngx-charts .cell.active,.ngx-charts .cell:hover,.ngx-charts .arc.active,.ngx-charts .arc:hover,.ngx-charts .card.active,.ngx-charts .card:hover{opacity:.8;transition:opacity .1s ease-in-out}.ngx-charts .bar:focus,.ngx-charts .cell:focus,.ngx-charts .arc:focus,.ngx-charts .card:focus{outline:none}.ngx-charts .bar.hidden,.ngx-charts .cell.hidden,.ngx-charts .arc.hidden,.ngx-charts .card.hidden{display:none}.ngx-charts g:focus{outline:none}.ngx-charts .line-series.inactive,.ngx-charts .line-series-range.inactive,.ngx-charts .polar-series-path.inactive,.ngx-charts .polar-series-area.inactive,.ngx-charts .area-series.inactive{transition:opacity .1s ease-in-out;opacity:.2}.ngx-charts .line-highlight{display:none}.ngx-charts .line-highlight.active{display:block}.ngx-charts .area{opacity:.6}.ngx-charts .circle:hover{cursor:pointer}.ngx-charts .label{font-size:12px;font-weight:normal}.ngx-charts .tooltip-anchor{fill:#000}.ngx-charts .gridline-path{stroke:#ddd;stroke-width:1;fill:none}.ngx-charts .refline-path{stroke:#a8b2c7;stroke-width:1;stroke-dasharray:5;stroke-dashoffset:5}.ngx-charts .refline-label{font-size:9px}.ngx-charts .reference-area{fill-opacity:.05;fill:#000}.ngx-charts .gridline-path-dotted{stroke:#ddd;stroke-width:1;fill:none;stroke-dasharray:1,20;stroke-dashoffset:3}.ngx-charts .grid-panel rect{fill:none}.ngx-charts .grid-panel.odd rect{fill:#0000000d}\n", ".linear-gauge{cursor:pointer}.linear-gauge .background-bar path{fill:#0000000d}.linear-gauge .units{fill:#666}\n"]
                },] }
    ];
    LinearGaugeComponent.propDecorators = {
        min: [{ type: core.Input }],
        max: [{ type: core.Input }],
        value: [{ type: core.Input }],
        units: [{ type: core.Input }],
        previousValue: [{ type: core.Input }],
        valueFormatting: [{ type: core.Input }],
        valueTextEl: [{ type: core.ViewChild, args: ['valueTextEl',] }],
        unitsTextEl: [{ type: core.ViewChild, args: ['unitsTextEl',] }]
    };

    var GaugeComponent = /** @class */ (function (_super) {
        __extends(GaugeComponent, _super);
        function GaugeComponent() {
            var _this = _super.apply(this, __spreadArray([], __read(arguments))) || this;
            _this.legend = false;
            _this.legendTitle = 'Legend';
            _this.legendPosition = exports.LegendPosition.Right;
            _this.min = 0;
            _this.max = 100;
            _this.bigSegments = 10;
            _this.smallSegments = 5;
            _this.showAxis = true;
            _this.startAngle = -120;
            _this.angleSpan = 240;
            _this.activeEntries = [];
            _this.tooltipDisabled = false;
            _this.showText = true;
            _this.activate = new core.EventEmitter();
            _this.deactivate = new core.EventEmitter();
            _this.resizeScale = 1;
            _this.rotation = '';
            _this.textTransform = 'scale(1, 1)';
            _this.cornerRadius = 10;
            return _this;
        }
        GaugeComponent.prototype.ngAfterViewInit = function () {
            var _this = this;
            _super.prototype.ngAfterViewInit.call(this);
            setTimeout(function () { return _this.scaleText(); });
        };
        GaugeComponent.prototype.update = function () {
            var _this = this;
            _super.prototype.update.call(this);
            if (!this.showAxis) {
                if (!this.margin) {
                    this.margin = [10, 20, 10, 20];
                }
            }
            else {
                if (!this.margin) {
                    this.margin = [60, 100, 60, 100];
                }
            }
            // make the starting angle positive
            if (this.startAngle < 0) {
                this.startAngle = (this.startAngle % 360) + 360;
            }
            this.angleSpan = Math.min(this.angleSpan, 360);
            this.dims = calculateViewDimensions({
                width: this.width,
                height: this.height,
                margins: this.margin,
                showLegend: this.legend,
                legendPosition: this.legendPosition
            });
            this.domain = this.getDomain();
            this.valueDomain = this.getValueDomain();
            this.valueScale = this.getValueScale();
            this.displayValue = this.getDisplayValue();
            this.outerRadius = Math.min(this.dims.width, this.dims.height) / 2;
            this.arcs = this.getArcs();
            this.setColors();
            this.legendOptions = this.getLegendOptions();
            var xOffset = this.margin[3] + this.dims.width / 2;
            var yOffset = this.margin[0] + this.dims.height / 2;
            this.transform = "translate(" + xOffset + ", " + yOffset + ")";
            this.rotation = "rotate(" + this.startAngle + ")";
            setTimeout(function () { return _this.scaleText(); }, 50);
        };
        GaugeComponent.prototype.getArcs = function () {
            var e_1, _a;
            var arcs = [];
            var availableRadius = this.outerRadius * 0.7;
            var radiusPerArc = Math.min(availableRadius / this.results.length, 10);
            var arcWidth = radiusPerArc * 0.7;
            this.textRadius = this.outerRadius - this.results.length * radiusPerArc;
            this.cornerRadius = Math.floor(arcWidth / 2);
            var i = 0;
            try {
                for (var _b = __values(this.results), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var d = _c.value;
                    var outerRadius = this.outerRadius - i * radiusPerArc;
                    var innerRadius = outerRadius - arcWidth;
                    var backgroundArc = {
                        endAngle: (this.angleSpan * Math.PI) / 180,
                        innerRadius: innerRadius,
                        outerRadius: outerRadius,
                        data: {
                            value: this.max,
                            name: d.name
                        }
                    };
                    var valueArc = {
                        endAngle: (Math.min(this.valueScale(d.value), this.angleSpan) * Math.PI) / 180,
                        innerRadius: innerRadius,
                        outerRadius: outerRadius,
                        data: {
                            value: d.value,
                            name: d.name
                        }
                    };
                    var arc = {
                        backgroundArc: backgroundArc,
                        valueArc: valueArc
                    };
                    arcs.push(arc);
                    i++;
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return arcs;
        };
        GaugeComponent.prototype.getDomain = function () {
            return this.results.map(function (d) { return d.name; });
        };
        GaugeComponent.prototype.getValueDomain = function () {
            var values = this.results.map(function (d) { return d.value; });
            var dataMin = Math.min.apply(Math, __spreadArray([], __read(values)));
            var dataMax = Math.max.apply(Math, __spreadArray([], __read(values)));
            if (this.min !== undefined) {
                this.min = Math.min(this.min, dataMin);
            }
            else {
                this.min = dataMin;
            }
            if (this.max !== undefined) {
                this.max = Math.max(this.max, dataMax);
            }
            else {
                this.max = dataMax;
            }
            return [this.min, this.max];
        };
        GaugeComponent.prototype.getValueScale = function () {
            return d3Scale.scaleLinear().range([0, this.angleSpan]).nice().domain(this.valueDomain);
        };
        GaugeComponent.prototype.getDisplayValue = function () {
            var value = this.results.map(function (d) { return d.value; }).reduce(function (a, b) { return a + b; }, 0);
            if (this.textValue && 0 !== this.textValue.length) {
                return this.textValue.toLocaleString();
            }
            if (this.valueFormatting) {
                return this.valueFormatting(value);
            }
            return value.toLocaleString();
        };
        GaugeComponent.prototype.scaleText = function (repeat) {
            var _this = this;
            if (repeat === void 0) { repeat = true; }
            if (!this.showText) {
                return;
            }
            var width = this.textEl.nativeElement.getBoundingClientRect().width;
            var oldScale = this.resizeScale;
            if (width === 0) {
                this.resizeScale = 1;
            }
            else {
                var availableSpace = this.textRadius;
                this.resizeScale = Math.floor((availableSpace / (width / this.resizeScale)) * 100) / 100;
            }
            if (this.resizeScale !== oldScale) {
                this.textTransform = "scale(" + this.resizeScale + ", " + this.resizeScale + ")";
                this.cd.markForCheck();
                if (repeat) {
                    setTimeout(function () { return _this.scaleText(false); }, 50);
                }
            }
        };
        GaugeComponent.prototype.onClick = function (data) {
            this.select.emit(data);
        };
        GaugeComponent.prototype.getLegendOptions = function () {
            return {
                scaleType: exports.ScaleType.Ordinal,
                colors: this.colors,
                domain: this.domain,
                title: this.legendTitle,
                position: this.legendPosition
            };
        };
        GaugeComponent.prototype.setColors = function () {
            this.colors = new ColorHelper(this.scheme, exports.ScaleType.Ordinal, this.domain, this.customColors);
        };
        GaugeComponent.prototype.onActivate = function (item) {
            var idx = this.activeEntries.findIndex(function (d) {
                return d.name === item.name && d.value === item.value;
            });
            if (idx > -1) {
                return;
            }
            this.activeEntries = __spreadArray([item], __read(this.activeEntries));
            this.activate.emit({ value: item, entries: this.activeEntries });
        };
        GaugeComponent.prototype.onDeactivate = function (item) {
            var idx = this.activeEntries.findIndex(function (d) {
                return d.name === item.name && d.value === item.value;
            });
            this.activeEntries.splice(idx, 1);
            this.activeEntries = __spreadArray([], __read(this.activeEntries));
            this.deactivate.emit({ value: item, entries: this.activeEntries });
        };
        GaugeComponent.prototype.isActive = function (entry) {
            if (!this.activeEntries)
                return false;
            var item = this.activeEntries.find(function (d) {
                return entry.name === d.name && entry.series === d.series;
            });
            return item !== undefined;
        };
        GaugeComponent.prototype.trackBy = function (index, item) {
            return item.valueArc.data.name;
        };
        return GaugeComponent;
    }(BaseChartComponent));
    GaugeComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'ngx-charts-gauge',
                    template: "\n    <ngx-charts-chart\n      [view]=\"[width, height]\"\n      [showLegend]=\"legend\"\n      [legendOptions]=\"legendOptions\"\n      [activeEntries]=\"activeEntries\"\n      [animations]=\"animations\"\n      (legendLabelClick)=\"onClick($event)\"\n      (legendLabelActivate)=\"onActivate($event)\"\n      (legendLabelDeactivate)=\"onDeactivate($event)\"\n    >\n      <svg:g [attr.transform]=\"transform\" class=\"gauge chart\">\n        <svg:g *ngFor=\"let arc of arcs; trackBy: trackBy\" [attr.transform]=\"rotation\">\n          <svg:g\n            ngx-charts-gauge-arc\n            [backgroundArc]=\"arc.backgroundArc\"\n            [valueArc]=\"arc.valueArc\"\n            [cornerRadius]=\"cornerRadius\"\n            [colors]=\"colors\"\n            [isActive]=\"isActive(arc.valueArc.data)\"\n            [tooltipDisabled]=\"tooltipDisabled\"\n            [tooltipTemplate]=\"tooltipTemplate\"\n            [valueFormatting]=\"valueFormatting\"\n            [animations]=\"animations\"\n            (select)=\"onClick($event)\"\n            (activate)=\"onActivate($event)\"\n            (deactivate)=\"onDeactivate($event)\"\n          ></svg:g>\n        </svg:g>\n\n        <svg:g\n          ngx-charts-gauge-axis\n          *ngIf=\"showAxis\"\n          [bigSegments]=\"bigSegments\"\n          [smallSegments]=\"smallSegments\"\n          [min]=\"min\"\n          [max]=\"max\"\n          [radius]=\"outerRadius\"\n          [angleSpan]=\"angleSpan\"\n          [valueScale]=\"valueScale\"\n          [startAngle]=\"startAngle\"\n          [tickFormatting]=\"axisTickFormatting\"\n        ></svg:g>\n\n        <svg:text\n          #textEl\n          *ngIf=\"showText\"\n          [style.textAnchor]=\"'middle'\"\n          [attr.transform]=\"textTransform\"\n          alignment-baseline=\"central\"\n        >\n          <tspan x=\"0\" dy=\"0\">{{ displayValue }}</tspan>\n          <tspan x=\"0\" dy=\"1.2em\">{{ units }}</tspan>\n        </svg:text>\n      </svg:g>\n    </ngx-charts-chart>\n  ",
                    encapsulation: core.ViewEncapsulation.None,
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    styles: [".ngx-charts-outer{-webkit-animation:chartFadeIn linear .6s;animation:chartFadeIn linear .6s}@-webkit-keyframes chartFadeIn{0%{opacity:0}20%{opacity:0}to{opacity:1}}@keyframes chartFadeIn{0%{opacity:0}20%{opacity:0}to{opacity:1}}.ngx-charts{float:left;overflow:visible}.ngx-charts .circle,.ngx-charts .cell,.ngx-charts .bar,.ngx-charts .arc{cursor:pointer}.ngx-charts .bar.active,.ngx-charts .bar:hover,.ngx-charts .cell.active,.ngx-charts .cell:hover,.ngx-charts .arc.active,.ngx-charts .arc:hover,.ngx-charts .card.active,.ngx-charts .card:hover{opacity:.8;transition:opacity .1s ease-in-out}.ngx-charts .bar:focus,.ngx-charts .cell:focus,.ngx-charts .arc:focus,.ngx-charts .card:focus{outline:none}.ngx-charts .bar.hidden,.ngx-charts .cell.hidden,.ngx-charts .arc.hidden,.ngx-charts .card.hidden{display:none}.ngx-charts g:focus{outline:none}.ngx-charts .line-series.inactive,.ngx-charts .line-series-range.inactive,.ngx-charts .polar-series-path.inactive,.ngx-charts .polar-series-area.inactive,.ngx-charts .area-series.inactive{transition:opacity .1s ease-in-out;opacity:.2}.ngx-charts .line-highlight{display:none}.ngx-charts .line-highlight.active{display:block}.ngx-charts .area{opacity:.6}.ngx-charts .circle:hover{cursor:pointer}.ngx-charts .label{font-size:12px;font-weight:normal}.ngx-charts .tooltip-anchor{fill:#000}.ngx-charts .gridline-path{stroke:#ddd;stroke-width:1;fill:none}.ngx-charts .refline-path{stroke:#a8b2c7;stroke-width:1;stroke-dasharray:5;stroke-dashoffset:5}.ngx-charts .refline-label{font-size:9px}.ngx-charts .reference-area{fill-opacity:.05;fill:#000}.ngx-charts .gridline-path-dotted{stroke:#ddd;stroke-width:1;fill:none;stroke-dasharray:1,20;stroke-dashoffset:3}.ngx-charts .grid-panel rect{fill:none}.ngx-charts .grid-panel.odd rect{fill:#0000000d}\n", ".gauge .background-arc path{fill:#0000000d}.gauge .gauge-tick path{stroke:#666}.gauge .gauge-tick text{font-size:12px;fill:#666;font-weight:bold}.gauge .gauge-tick-large path{stroke-width:2px}.gauge .gauge-tick-small path{stroke-width:1px}\n"]
                },] }
    ];
    GaugeComponent.propDecorators = {
        legend: [{ type: core.Input }],
        legendTitle: [{ type: core.Input }],
        legendPosition: [{ type: core.Input }],
        min: [{ type: core.Input }],
        max: [{ type: core.Input }],
        textValue: [{ type: core.Input }],
        units: [{ type: core.Input }],
        bigSegments: [{ type: core.Input }],
        smallSegments: [{ type: core.Input }],
        results: [{ type: core.Input }],
        showAxis: [{ type: core.Input }],
        startAngle: [{ type: core.Input }],
        angleSpan: [{ type: core.Input }],
        activeEntries: [{ type: core.Input }],
        axisTickFormatting: [{ type: core.Input }],
        tooltipDisabled: [{ type: core.Input }],
        valueFormatting: [{ type: core.Input }],
        showText: [{ type: core.Input }],
        margin: [{ type: core.Input }],
        activate: [{ type: core.Output }],
        deactivate: [{ type: core.Output }],
        tooltipTemplate: [{ type: core.ContentChild, args: ['tooltipTemplate',] }],
        textEl: [{ type: core.ViewChild, args: ['textEl',] }]
    };

    var GaugeArcComponent = /** @class */ (function () {
        function GaugeArcComponent() {
            this.isActive = false;
            this.tooltipDisabled = false;
            this.animations = true;
            this.select = new core.EventEmitter();
            this.activate = new core.EventEmitter();
            this.deactivate = new core.EventEmitter();
            this.placementTypes = exports.PlacementTypes;
            this.styleTypes = exports.StyleTypes;
        }
        GaugeArcComponent.prototype.tooltipText = function (arc) {
            var label = formatLabel(arc.data.name);
            var val;
            if (this.valueFormatting) {
                val = this.valueFormatting(arc.data.value);
            }
            else {
                val = formatLabel(arc.data.value);
            }
            return "\n      <span class=\"tooltip-label\">" + escapeLabel(label) + "</span>\n      <span class=\"tooltip-val\">" + val + "</span>\n    ";
        };
        return GaugeArcComponent;
    }());
    GaugeArcComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'g[ngx-charts-gauge-arc]',
                    template: "\n    <svg:g\n      ngx-charts-pie-arc\n      class=\"background-arc\"\n      [startAngle]=\"0\"\n      [endAngle]=\"backgroundArc.endAngle\"\n      [innerRadius]=\"backgroundArc.innerRadius\"\n      [outerRadius]=\"backgroundArc.outerRadius\"\n      [cornerRadius]=\"cornerRadius\"\n      [data]=\"backgroundArc.data\"\n      [animate]=\"false\"\n      [pointerEvents]=\"false\"\n    ></svg:g>\n    <svg:g\n      ngx-charts-pie-arc\n      [startAngle]=\"0\"\n      [endAngle]=\"valueArc.endAngle\"\n      [innerRadius]=\"valueArc.innerRadius\"\n      [outerRadius]=\"valueArc.outerRadius\"\n      [cornerRadius]=\"cornerRadius\"\n      [fill]=\"colors.getColor(valueArc.data.name)\"\n      [data]=\"valueArc.data\"\n      [animate]=\"animations\"\n      [isActive]=\"isActive\"\n      (select)=\"select.emit($event)\"\n      (activate)=\"activate.emit($event)\"\n      (deactivate)=\"deactivate.emit($event)\"\n      ngx-tooltip\n      [tooltipDisabled]=\"tooltipDisabled\"\n      [tooltipPlacement]=\"placementTypes.Top\"\n      [tooltipType]=\"styleTypes.tooltip\"\n      [tooltipTitle]=\"tooltipTemplate ? undefined : tooltipText(valueArc)\"\n      [tooltipTemplate]=\"tooltipTemplate\"\n      [tooltipContext]=\"valueArc.data\"\n    ></svg:g>\n  ",
                    changeDetection: core.ChangeDetectionStrategy.OnPush
                },] }
    ];
    GaugeArcComponent.propDecorators = {
        backgroundArc: [{ type: core.Input }],
        valueArc: [{ type: core.Input }],
        cornerRadius: [{ type: core.Input }],
        colors: [{ type: core.Input }],
        isActive: [{ type: core.Input }],
        tooltipDisabled: [{ type: core.Input }],
        valueFormatting: [{ type: core.Input }],
        tooltipTemplate: [{ type: core.Input }],
        animations: [{ type: core.Input }],
        select: [{ type: core.Output }],
        activate: [{ type: core.Output }],
        deactivate: [{ type: core.Output }]
    };

    var GaugeAxisComponent = /** @class */ (function () {
        function GaugeAxisComponent() {
            this.rotate = '';
        }
        GaugeAxisComponent.prototype.ngOnChanges = function (changes) {
            this.update();
        };
        GaugeAxisComponent.prototype.update = function () {
            this.rotationAngle = -90 + this.startAngle;
            this.rotate = "rotate(" + this.rotationAngle + ")";
            this.ticks = this.getTicks();
        };
        GaugeAxisComponent.prototype.getTicks = function () {
            var bigTickSegment = this.angleSpan / this.bigSegments;
            var smallTickSegment = bigTickSegment / this.smallSegments;
            var tickLength = 20;
            var ticks = {
                big: [],
                small: []
            };
            var startDistance = this.radius + 10;
            var textDist = startDistance + tickLength + 10;
            for (var i = 0; i <= this.bigSegments; i++) {
                var angleDeg = i * bigTickSegment;
                var angle = (angleDeg * Math.PI) / 180;
                var textAnchor = this.getTextAnchor(angleDeg);
                var skip = false;
                if (i === 0 && this.angleSpan === 360) {
                    skip = true;
                }
                if (!skip) {
                    var text = Number.parseFloat(this.valueScale.invert(angleDeg).toString()).toLocaleString();
                    if (this.tickFormatting) {
                        text = this.tickFormatting(text);
                    }
                    ticks.big.push({
                        line: this.getTickPath(startDistance, tickLength, angle),
                        textAnchor: textAnchor,
                        text: text,
                        textTransform: "\n            translate(" + textDist * Math.cos(angle) + ", " + textDist * Math.sin(angle) + ") rotate(" + -this.rotationAngle + ")\n          "
                    });
                }
                if (i === this.bigSegments) {
                    continue;
                }
                for (var j = 1; j <= this.smallSegments; j++) {
                    var smallAngleDeg = angleDeg + j * smallTickSegment;
                    var smallAngle = (smallAngleDeg * Math.PI) / 180;
                    ticks.small.push({
                        line: this.getTickPath(startDistance, tickLength / 2, smallAngle)
                    });
                }
            }
            return ticks;
        };
        GaugeAxisComponent.prototype.getTextAnchor = function (angle) {
            // [0, 45] = 'middle';
            // [46, 135] = 'start';
            // [136, 225] = 'middle';
            // [226, 315] = 'end';
            angle = (this.startAngle + angle) % 360;
            var textAnchor = exports.TextAnchor.Middle;
            if (angle > 45 && angle <= 135) {
                textAnchor = exports.TextAnchor.Start;
            }
            else if (angle > 225 && angle <= 315) {
                textAnchor = exports.TextAnchor.End;
            }
            return textAnchor;
        };
        GaugeAxisComponent.prototype.getTickPath = function (startDistance, tickLength, angle) {
            var y1 = startDistance * Math.sin(angle);
            var y2 = (startDistance + tickLength) * Math.sin(angle);
            var x1 = startDistance * Math.cos(angle);
            var x2 = (startDistance + tickLength) * Math.cos(angle);
            var points = [
                { x: x1, y: y1 },
                { x: x2, y: y2 }
            ];
            var lineGenerator = d3Shape.line()
                .x(function (d) { return d.x; })
                .y(function (d) { return d.y; });
            return lineGenerator(points);
        };
        return GaugeAxisComponent;
    }());
    GaugeAxisComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'g[ngx-charts-gauge-axis]',
                    template: "\n    <svg:g [attr.transform]=\"rotate\">\n      <svg:g *ngFor=\"let tick of ticks.big\" class=\"gauge-tick gauge-tick-large\">\n        <svg:path [attr.d]=\"tick.line\" />\n      </svg:g>\n      <svg:g *ngFor=\"let tick of ticks.big\" class=\"gauge-tick gauge-tick-large\">\n        <svg:text\n          [style.textAnchor]=\"tick.textAnchor\"\n          [attr.transform]=\"tick.textTransform\"\n          alignment-baseline=\"central\"\n        >\n          {{ tick.text }}\n        </svg:text>\n      </svg:g>\n      <svg:g *ngFor=\"let tick of ticks.small\" class=\"gauge-tick gauge-tick-small\">\n        <svg:path [attr.d]=\"tick.line\" />\n      </svg:g>\n    </svg:g>\n  ",
                    changeDetection: core.ChangeDetectionStrategy.OnPush
                },] }
    ];
    GaugeAxisComponent.propDecorators = {
        bigSegments: [{ type: core.Input }],
        smallSegments: [{ type: core.Input }],
        min: [{ type: core.Input }],
        max: [{ type: core.Input }],
        angleSpan: [{ type: core.Input }],
        startAngle: [{ type: core.Input }],
        radius: [{ type: core.Input }],
        valueScale: [{ type: core.Input }],
        tickFormatting: [{ type: core.Input }]
    };

    var GaugeModule = /** @class */ (function () {
        function GaugeModule() {
        }
        return GaugeModule;
    }());
    GaugeModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [ChartCommonModule, PieChartModule, BarChartModule],
                    declarations: [LinearGaugeComponent, GaugeComponent, GaugeArcComponent, GaugeAxisComponent],
                    exports: [LinearGaugeComponent, GaugeComponent, GaugeArcComponent, GaugeAxisComponent]
                },] }
    ];

    // The export is needed here to generate a valid polyfills.metadata.json file
    function ngxChartsPolyfills() {
        // IE11 fix
        // Ref: https://github.com/swimlane/ngx-charts/issues/386
        if (typeof SVGElement !== 'undefined' && typeof SVGElement.prototype.contains === 'undefined') {
            SVGElement.prototype.contains = HTMLDivElement.prototype.contains;
        }
    }

    var NgxChartsModule = /** @class */ (function () {
        function NgxChartsModule() {
            ngxChartsPolyfills();
        }
        return NgxChartsModule;
    }());
    NgxChartsModule.decorators = [
        { type: core.NgModule, args: [{
                    exports: [
                        ChartCommonModule,
                        AreaChartModule,
                        BarChartModule,
                        BoxChartModule,
                        BubbleChartModule,
                        HeatMapModule,
                        LineChartModule,
                        PolarChartModule,
                        NumberCardModule,
                        PieChartModule,
                        TreeMapModule,
                        GaugeModule
                    ]
                },] }
    ];
    NgxChartsModule.ctorParameters = function () { return []; };

    function tickFormat(fieldType, groupByType) {
        return function (label) {
            if (label === 'No Value' || label === 'Other') {
                return label;
            }
            if (fieldType === 'date' && groupByType === 'groupBy') {
                var formatter = d3TimeFormat.timeFormat('MM/DD/YYYY');
                return formatter(label);
            }
            return label.toString();
        };
    }

    /*
     * Public API Surface of ngx-charts
     */

    /**
     * Generated bundle index. Do not edit.
     */

    exports.AdvancedLegendComponent = AdvancedLegendComponent;
    exports.AdvancedPieChartComponent = AdvancedPieChartComponent;
    exports.AreaChartComponent = AreaChartComponent;
    exports.AreaChartModule = AreaChartModule;
    exports.AreaChartNormalizedComponent = AreaChartNormalizedComponent;
    exports.AreaChartStackedComponent = AreaChartStackedComponent;
    exports.AreaComponent = AreaComponent;
    exports.AreaSeriesComponent = AreaSeriesComponent;
    exports.AxesModule = AxesModule;
    exports.AxisLabelComponent = AxisLabelComponent;
    exports.BarChartModule = BarChartModule;
    exports.BarComponent = BarComponent;
    exports.BarHorizontal2DComponent = BarHorizontal2DComponent;
    exports.BarHorizontalComponent = BarHorizontalComponent;
    exports.BarHorizontalNormalizedComponent = BarHorizontalNormalizedComponent;
    exports.BarHorizontalStackedComponent = BarHorizontalStackedComponent;
    exports.BarLabelComponent = BarLabelComponent;
    exports.BarVertical2DComponent = BarVertical2DComponent;
    exports.BarVerticalComponent = BarVerticalComponent;
    exports.BarVerticalNormalizedComponent = BarVerticalNormalizedComponent;
    exports.BarVerticalStackedComponent = BarVerticalStackedComponent;
    exports.BaseChartComponent = BaseChartComponent;
    exports.BoxChartComponent = BoxChartComponent;
    exports.BoxChartModule = BoxChartModule;
    exports.BoxComponent = BoxComponent;
    exports.BoxSeriesComponent = BoxSeriesComponent;
    exports.BubbleChartComponent = BubbleChartComponent;
    exports.BubbleChartModule = BubbleChartModule;
    exports.BubbleSeriesComponent = BubbleSeriesComponent;
    exports.CardComponent = CardComponent;
    exports.CardSeriesComponent = CardSeriesComponent;
    exports.ChartCommonModule = ChartCommonModule;
    exports.ChartComponent = ChartComponent;
    exports.CircleComponent = CircleComponent;
    exports.CircleSeriesComponent = CircleSeriesComponent;
    exports.ColorHelper = ColorHelper;
    exports.CountUpDirective = CountUpDirective;
    exports.GaugeArcComponent = GaugeArcComponent;
    exports.GaugeAxisComponent = GaugeAxisComponent;
    exports.GaugeComponent = GaugeComponent;
    exports.GaugeModule = GaugeModule;
    exports.GridPanelComponent = GridPanelComponent;
    exports.GridPanelSeriesComponent = GridPanelSeriesComponent;
    exports.HeatCellSeriesComponent = HeatCellSeriesComponent;
    exports.HeatMapCellComponent = HeatMapCellComponent;
    exports.HeatMapComponent = HeatMapComponent;
    exports.HeatMapModule = HeatMapModule;
    exports.LegendComponent = LegendComponent;
    exports.LegendEntryComponent = LegendEntryComponent;
    exports.LineChartComponent = LineChartComponent;
    exports.LineChartModule = LineChartModule;
    exports.LineComponent = LineComponent;
    exports.LineSeriesComponent = LineSeriesComponent;
    exports.LinearGaugeComponent = LinearGaugeComponent;
    exports.NgxChartsModule = NgxChartsModule;
    exports.NumberCardComponent = NumberCardComponent;
    exports.NumberCardModule = NumberCardModule;
    exports.PieArcComponent = PieArcComponent;
    exports.PieChartComponent = PieChartComponent;
    exports.PieChartModule = PieChartModule;
    exports.PieGridComponent = PieGridComponent;
    exports.PieGridSeriesComponent = PieGridSeriesComponent;
    exports.PieLabelComponent = PieLabelComponent;
    exports.PieSeriesComponent = PieSeriesComponent;
    exports.PolarChartComponent = PolarChartComponent;
    exports.PolarChartModule = PolarChartModule;
    exports.PolarSeriesComponent = PolarSeriesComponent;
    exports.ScaleLegendComponent = ScaleLegendComponent;
    exports.SeriesHorizontal = SeriesHorizontal;
    exports.SeriesVerticalComponent = SeriesVerticalComponent;
    exports.SvgLinearGradientComponent = SvgLinearGradientComponent;
    exports.SvgRadialGradientComponent = SvgRadialGradientComponent;
    exports.Timeline = Timeline;
    exports.TooltipArea = TooltipArea;
    exports.TooltipContentComponent = TooltipContentComponent;
    exports.TooltipDirective = TooltipDirective;
    exports.TooltipModule = TooltipModule;
    exports.TooltipService = TooltipService;
    exports.TreeMapCellComponent = TreeMapCellComponent;
    exports.TreeMapCellSeriesComponent = TreeMapCellSeriesComponent;
    exports.TreeMapComponent = TreeMapComponent;
    exports.TreeMapModule = TreeMapModule;
    exports.VisibilityObserver = VisibilityObserver;
    exports.XAxisComponent = XAxisComponent;
    exports.XAxisTicksComponent = XAxisTicksComponent;
    exports.YAxisComponent = YAxisComponent;
    exports.YAxisTicksComponent = YAxisTicksComponent;
    exports.calculateViewDimensions = calculateViewDimensions;
    exports.colorSets = colorSets;
    exports.count = count;
    exports.decimalChecker = decimalChecker;
    exports.escapeLabel = escapeLabel;
    exports.formatLabel = formatLabel;
    exports.getDomain = getDomain;
    exports.getScale = getScale;
    exports.getScaleType = getScaleType;
    exports.getUniqueXDomainValues = getUniqueXDomainValues;
    exports.getXDomainArray = getXDomainArray;
    exports.gridLayout = gridLayout;
    exports.gridSize = gridSize;
    exports.hexToRgb = hexToRgb;
    exports.id = id;
    exports.invertColor = invertColor;
    exports.reduceTicks = reduceTicks;
    exports.shadeRGBColor = shadeRGBColor;
    exports.sortByDomain = sortByDomain;
    exports.sortByTime = sortByTime;
    exports.sortLinear = sortLinear;
    exports.throttle = throttle;
    exports.throttleable = throttleable;
    exports.tickFormat = tickFormat;
    exports.trimLabel = trimLabel;
    exports.ɵa = InjectionRegisteryService;
    exports.ɵb = InjectionService;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=swimlane-ngx-charts.umd.js.map
