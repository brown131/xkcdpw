(() => {
  // output/Affjax/foreign.js
  function _ajax(platformSpecificDriver, timeoutErrorMessageIdent, requestFailedMessageIdent, mkHeader, options2) {
    return function(errback, callback) {
      var xhr = platformSpecificDriver.newXHR();
      var fixedUrl = platformSpecificDriver.fixupUrl(options2.url, xhr);
      xhr.open(options2.method || "GET", fixedUrl, true, options2.username, options2.password);
      if (options2.headers) {
        try {
          for (var i2 = 0, header2; (header2 = options2.headers[i2]) != null; i2++) {
            xhr.setRequestHeader(header2.field, header2.value);
          }
        } catch (e) {
          errback(e);
        }
      }
      var onerror = function(msgIdent) {
        return function() {
          errback(new Error(msgIdent));
        };
      };
      xhr.onerror = onerror(requestFailedMessageIdent);
      xhr.ontimeout = onerror(timeoutErrorMessageIdent);
      xhr.onload = function() {
        callback({
          status: xhr.status,
          statusText: xhr.statusText,
          headers: xhr.getAllResponseHeaders().split("\r\n").filter(function(header3) {
            return header3.length > 0;
          }).map(function(header3) {
            var i3 = header3.indexOf(":");
            return mkHeader(header3.substring(0, i3))(header3.substring(i3 + 2));
          }),
          body: xhr.response
        });
      };
      xhr.responseType = options2.responseType;
      xhr.withCredentials = options2.withCredentials;
      xhr.timeout = options2.timeout;
      xhr.send(options2.content);
      return function(error4, cancelErrback, cancelCallback) {
        try {
          xhr.abort();
        } catch (e) {
          return cancelErrback(e);
        }
        return cancelCallback();
      };
    };
  }

  // output/Data.Functor/foreign.js
  var arrayMap = function(f) {
    return function(arr) {
      var l = arr.length;
      var result = new Array(l);
      for (var i2 = 0; i2 < l; i2++) {
        result[i2] = f(arr[i2]);
      }
      return result;
    };
  };

  // output/Control.Semigroupoid/index.js
  var semigroupoidFn = {
    compose: function(f) {
      return function(g) {
        return function(x) {
          return f(g(x));
        };
      };
    }
  };

  // output/Control.Category/index.js
  var identity = function(dict) {
    return dict.identity;
  };
  var categoryFn = {
    identity: function(x) {
      return x;
    },
    Semigroupoid0: function() {
      return semigroupoidFn;
    }
  };

  // output/Data.Boolean/index.js
  var otherwise = true;

  // output/Data.Function/index.js
  var on = function(f) {
    return function(g) {
      return function(x) {
        return function(y) {
          return f(g(x))(g(y));
        };
      };
    };
  };
  var flip = function(f) {
    return function(b2) {
      return function(a2) {
        return f(a2)(b2);
      };
    };
  };
  var $$const = function(a2) {
    return function(v) {
      return a2;
    };
  };

  // output/Data.Unit/foreign.js
  var unit = void 0;

  // output/Data.Functor/index.js
  var map = function(dict) {
    return dict.map;
  };
  var mapFlipped = function(dictFunctor) {
    var map110 = map(dictFunctor);
    return function(fa) {
      return function(f) {
        return map110(f)(fa);
      };
    };
  };
  var $$void = function(dictFunctor) {
    return map(dictFunctor)($$const(unit));
  };
  var voidLeft = function(dictFunctor) {
    var map110 = map(dictFunctor);
    return function(f) {
      return function(x) {
        return map110($$const(x))(f);
      };
    };
  };
  var functorArray = {
    map: arrayMap
  };

  // output/Data.Semigroup/foreign.js
  var concatArray = function(xs) {
    return function(ys) {
      if (xs.length === 0)
        return ys;
      if (ys.length === 0)
        return xs;
      return xs.concat(ys);
    };
  };

  // output/Data.Semigroup/index.js
  var semigroupArray = {
    append: concatArray
  };
  var append = function(dict) {
    return dict.append;
  };

  // output/Control.Alt/index.js
  var alt = function(dict) {
    return dict.alt;
  };

  // output/Control.Apply/index.js
  var identity2 = /* @__PURE__ */ identity(categoryFn);
  var apply = function(dict) {
    return dict.apply;
  };
  var applySecond = function(dictApply) {
    var apply1 = apply(dictApply);
    var map24 = map(dictApply.Functor0());
    return function(a2) {
      return function(b2) {
        return apply1(map24($$const(identity2))(a2))(b2);
      };
    };
  };

  // output/Control.Applicative/index.js
  var pure = function(dict) {
    return dict.pure;
  };
  var unless = function(dictApplicative) {
    var pure14 = pure(dictApplicative);
    return function(v) {
      return function(v1) {
        if (!v) {
          return v1;
        }
        ;
        if (v) {
          return pure14(unit);
        }
        ;
        throw new Error("Failed pattern match at Control.Applicative (line 68, column 1 - line 68, column 65): " + [v.constructor.name, v1.constructor.name]);
      };
    };
  };
  var when = function(dictApplicative) {
    var pure14 = pure(dictApplicative);
    return function(v) {
      return function(v1) {
        if (v) {
          return v1;
        }
        ;
        if (!v) {
          return pure14(unit);
        }
        ;
        throw new Error("Failed pattern match at Control.Applicative (line 63, column 1 - line 63, column 63): " + [v.constructor.name, v1.constructor.name]);
      };
    };
  };
  var liftA1 = function(dictApplicative) {
    var apply3 = apply(dictApplicative.Apply0());
    var pure14 = pure(dictApplicative);
    return function(f) {
      return function(a2) {
        return apply3(pure14(f))(a2);
      };
    };
  };

  // output/Data.Bounded/foreign.js
  var topChar = String.fromCharCode(65535);
  var bottomChar = String.fromCharCode(0);
  var topNumber = Number.POSITIVE_INFINITY;
  var bottomNumber = Number.NEGATIVE_INFINITY;

  // output/Data.Ord/foreign.js
  var unsafeCompareImpl = function(lt) {
    return function(eq3) {
      return function(gt) {
        return function(x) {
          return function(y) {
            return x < y ? lt : x === y ? eq3 : gt;
          };
        };
      };
    };
  };
  var ordIntImpl = unsafeCompareImpl;
  var ordStringImpl = unsafeCompareImpl;
  var ordCharImpl = unsafeCompareImpl;

  // output/Data.Eq/foreign.js
  var refEq = function(r1) {
    return function(r2) {
      return r1 === r2;
    };
  };
  var eqIntImpl = refEq;
  var eqCharImpl = refEq;
  var eqStringImpl = refEq;

  // output/Data.Eq/index.js
  var eqString = {
    eq: eqStringImpl
  };
  var eqInt = {
    eq: eqIntImpl
  };
  var eqChar = {
    eq: eqCharImpl
  };
  var eq = function(dict) {
    return dict.eq;
  };

  // output/Data.Ordering/index.js
  var LT = /* @__PURE__ */ function() {
    function LT2() {
    }
    ;
    LT2.value = new LT2();
    return LT2;
  }();
  var GT = /* @__PURE__ */ function() {
    function GT2() {
    }
    ;
    GT2.value = new GT2();
    return GT2;
  }();
  var EQ = /* @__PURE__ */ function() {
    function EQ2() {
    }
    ;
    EQ2.value = new EQ2();
    return EQ2;
  }();

  // output/Data.Ord/index.js
  var ordString = /* @__PURE__ */ function() {
    return {
      compare: ordStringImpl(LT.value)(EQ.value)(GT.value),
      Eq0: function() {
        return eqString;
      }
    };
  }();
  var ordInt = /* @__PURE__ */ function() {
    return {
      compare: ordIntImpl(LT.value)(EQ.value)(GT.value),
      Eq0: function() {
        return eqInt;
      }
    };
  }();
  var ordChar = /* @__PURE__ */ function() {
    return {
      compare: ordCharImpl(LT.value)(EQ.value)(GT.value),
      Eq0: function() {
        return eqChar;
      }
    };
  }();
  var compare = function(dict) {
    return dict.compare;
  };

  // output/Data.Bounded/index.js
  var top = function(dict) {
    return dict.top;
  };
  var boundedChar = {
    top: topChar,
    bottom: bottomChar,
    Ord0: function() {
      return ordChar;
    }
  };
  var bottom = function(dict) {
    return dict.bottom;
  };

  // output/Data.Show/foreign.js
  var showIntImpl = function(n) {
    return n.toString();
  };
  var showStringImpl = function(s) {
    var l = s.length;
    return '"' + s.replace(
      /[\0-\x1F\x7F"\\]/g,
      function(c, i2) {
        switch (c) {
          case '"':
          case "\\":
            return "\\" + c;
          case "\x07":
            return "\\a";
          case "\b":
            return "\\b";
          case "\f":
            return "\\f";
          case "\n":
            return "\\n";
          case "\r":
            return "\\r";
          case "	":
            return "\\t";
          case "\v":
            return "\\v";
        }
        var k = i2 + 1;
        var empty7 = k < l && s[k] >= "0" && s[k] <= "9" ? "\\&" : "";
        return "\\" + c.charCodeAt(0).toString(10) + empty7;
      }
    ) + '"';
  };

  // output/Data.Show/index.js
  var showString = {
    show: showStringImpl
  };
  var showInt = {
    show: showIntImpl
  };
  var show = function(dict) {
    return dict.show;
  };

  // output/Data.Maybe/index.js
  var identity3 = /* @__PURE__ */ identity(categoryFn);
  var Nothing = /* @__PURE__ */ function() {
    function Nothing2() {
    }
    ;
    Nothing2.value = new Nothing2();
    return Nothing2;
  }();
  var Just = /* @__PURE__ */ function() {
    function Just2(value0) {
      this.value0 = value0;
    }
    ;
    Just2.create = function(value0) {
      return new Just2(value0);
    };
    return Just2;
  }();
  var maybe = function(v) {
    return function(v1) {
      return function(v2) {
        if (v2 instanceof Nothing) {
          return v;
        }
        ;
        if (v2 instanceof Just) {
          return v1(v2.value0);
        }
        ;
        throw new Error("Failed pattern match at Data.Maybe (line 237, column 1 - line 237, column 51): " + [v.constructor.name, v1.constructor.name, v2.constructor.name]);
      };
    };
  };
  var isNothing = /* @__PURE__ */ maybe(true)(/* @__PURE__ */ $$const(false));
  var isJust = /* @__PURE__ */ maybe(false)(/* @__PURE__ */ $$const(true));
  var functorMaybe = {
    map: function(v) {
      return function(v1) {
        if (v1 instanceof Just) {
          return new Just(v(v1.value0));
        }
        ;
        return Nothing.value;
      };
    }
  };
  var map2 = /* @__PURE__ */ map(functorMaybe);
  var fromMaybe = function(a2) {
    return maybe(a2)(identity3);
  };
  var fromJust = function() {
    return function(v) {
      if (v instanceof Just) {
        return v.value0;
      }
      ;
      throw new Error("Failed pattern match at Data.Maybe (line 288, column 1 - line 288, column 46): " + [v.constructor.name]);
    };
  };
  var applyMaybe = {
    apply: function(v) {
      return function(v1) {
        if (v instanceof Just) {
          return map2(v.value0)(v1);
        }
        ;
        if (v instanceof Nothing) {
          return Nothing.value;
        }
        ;
        throw new Error("Failed pattern match at Data.Maybe (line 67, column 1 - line 69, column 30): " + [v.constructor.name, v1.constructor.name]);
      };
    },
    Functor0: function() {
      return functorMaybe;
    }
  };
  var bindMaybe = {
    bind: function(v) {
      return function(v1) {
        if (v instanceof Just) {
          return v1(v.value0);
        }
        ;
        if (v instanceof Nothing) {
          return Nothing.value;
        }
        ;
        throw new Error("Failed pattern match at Data.Maybe (line 125, column 1 - line 127, column 28): " + [v.constructor.name, v1.constructor.name]);
      };
    },
    Apply0: function() {
      return applyMaybe;
    }
  };
  var applicativeMaybe = /* @__PURE__ */ function() {
    return {
      pure: Just.create,
      Apply0: function() {
        return applyMaybe;
      }
    };
  }();

  // output/Data.MediaType.Common/index.js
  var applicationJSON = "application/json";
  var applicationFormURLEncoded = "application/x-www-form-urlencoded";

  // output/Affjax.RequestBody/index.js
  var ArrayView = /* @__PURE__ */ function() {
    function ArrayView2(value0) {
      this.value0 = value0;
    }
    ;
    ArrayView2.create = function(value0) {
      return new ArrayView2(value0);
    };
    return ArrayView2;
  }();
  var Blob = /* @__PURE__ */ function() {
    function Blob3(value0) {
      this.value0 = value0;
    }
    ;
    Blob3.create = function(value0) {
      return new Blob3(value0);
    };
    return Blob3;
  }();
  var Document = /* @__PURE__ */ function() {
    function Document3(value0) {
      this.value0 = value0;
    }
    ;
    Document3.create = function(value0) {
      return new Document3(value0);
    };
    return Document3;
  }();
  var $$String = /* @__PURE__ */ function() {
    function $$String3(value0) {
      this.value0 = value0;
    }
    ;
    $$String3.create = function(value0) {
      return new $$String3(value0);
    };
    return $$String3;
  }();
  var FormData = /* @__PURE__ */ function() {
    function FormData2(value0) {
      this.value0 = value0;
    }
    ;
    FormData2.create = function(value0) {
      return new FormData2(value0);
    };
    return FormData2;
  }();
  var FormURLEncoded = /* @__PURE__ */ function() {
    function FormURLEncoded2(value0) {
      this.value0 = value0;
    }
    ;
    FormURLEncoded2.create = function(value0) {
      return new FormURLEncoded2(value0);
    };
    return FormURLEncoded2;
  }();
  var Json = /* @__PURE__ */ function() {
    function Json3(value0) {
      this.value0 = value0;
    }
    ;
    Json3.create = function(value0) {
      return new Json3(value0);
    };
    return Json3;
  }();
  var toMediaType = function(v) {
    if (v instanceof FormURLEncoded) {
      return new Just(applicationFormURLEncoded);
    }
    ;
    if (v instanceof Json) {
      return new Just(applicationJSON);
    }
    ;
    return Nothing.value;
  };

  // output/Unsafe.Coerce/foreign.js
  var unsafeCoerce2 = function(x) {
    return x;
  };

  // output/Safe.Coerce/index.js
  var coerce = function() {
    return unsafeCoerce2;
  };

  // output/Data.Newtype/index.js
  var coerce2 = /* @__PURE__ */ coerce();
  var unwrap = function() {
    return coerce2;
  };
  var alaF = function() {
    return function() {
      return function() {
        return function() {
          return function(v) {
            return coerce2;
          };
        };
      };
    };
  };

  // output/Affjax.RequestHeader/index.js
  var unwrap2 = /* @__PURE__ */ unwrap();
  var Accept = /* @__PURE__ */ function() {
    function Accept2(value0) {
      this.value0 = value0;
    }
    ;
    Accept2.create = function(value0) {
      return new Accept2(value0);
    };
    return Accept2;
  }();
  var ContentType = /* @__PURE__ */ function() {
    function ContentType2(value0) {
      this.value0 = value0;
    }
    ;
    ContentType2.create = function(value0) {
      return new ContentType2(value0);
    };
    return ContentType2;
  }();
  var RequestHeader = /* @__PURE__ */ function() {
    function RequestHeader2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    RequestHeader2.create = function(value0) {
      return function(value1) {
        return new RequestHeader2(value0, value1);
      };
    };
    return RequestHeader2;
  }();
  var value = function(v) {
    if (v instanceof Accept) {
      return unwrap2(v.value0);
    }
    ;
    if (v instanceof ContentType) {
      return unwrap2(v.value0);
    }
    ;
    if (v instanceof RequestHeader) {
      return v.value1;
    }
    ;
    throw new Error("Failed pattern match at Affjax.RequestHeader (line 26, column 1 - line 26, column 33): " + [v.constructor.name]);
  };
  var name = function(v) {
    if (v instanceof Accept) {
      return "Accept";
    }
    ;
    if (v instanceof ContentType) {
      return "Content-Type";
    }
    ;
    if (v instanceof RequestHeader) {
      return v.value0;
    }
    ;
    throw new Error("Failed pattern match at Affjax.RequestHeader (line 21, column 1 - line 21, column 32): " + [v.constructor.name]);
  };

  // output/Affjax.ResponseFormat/index.js
  var identity4 = /* @__PURE__ */ identity(categoryFn);
  var $$ArrayBuffer = /* @__PURE__ */ function() {
    function $$ArrayBuffer2(value0) {
      this.value0 = value0;
    }
    ;
    $$ArrayBuffer2.create = function(value0) {
      return new $$ArrayBuffer2(value0);
    };
    return $$ArrayBuffer2;
  }();
  var Blob2 = /* @__PURE__ */ function() {
    function Blob3(value0) {
      this.value0 = value0;
    }
    ;
    Blob3.create = function(value0) {
      return new Blob3(value0);
    };
    return Blob3;
  }();
  var Document2 = /* @__PURE__ */ function() {
    function Document3(value0) {
      this.value0 = value0;
    }
    ;
    Document3.create = function(value0) {
      return new Document3(value0);
    };
    return Document3;
  }();
  var Json2 = /* @__PURE__ */ function() {
    function Json3(value0) {
      this.value0 = value0;
    }
    ;
    Json3.create = function(value0) {
      return new Json3(value0);
    };
    return Json3;
  }();
  var $$String2 = /* @__PURE__ */ function() {
    function $$String3(value0) {
      this.value0 = value0;
    }
    ;
    $$String3.create = function(value0) {
      return new $$String3(value0);
    };
    return $$String3;
  }();
  var Ignore = /* @__PURE__ */ function() {
    function Ignore2(value0) {
      this.value0 = value0;
    }
    ;
    Ignore2.create = function(value0) {
      return new Ignore2(value0);
    };
    return Ignore2;
  }();
  var toResponseType = function(v) {
    if (v instanceof $$ArrayBuffer) {
      return "arraybuffer";
    }
    ;
    if (v instanceof Blob2) {
      return "blob";
    }
    ;
    if (v instanceof Document2) {
      return "document";
    }
    ;
    if (v instanceof Json2) {
      return "text";
    }
    ;
    if (v instanceof $$String2) {
      return "text";
    }
    ;
    if (v instanceof Ignore) {
      return "";
    }
    ;
    throw new Error("Failed pattern match at Affjax.ResponseFormat (line 44, column 3 - line 50, column 19): " + [v.constructor.name]);
  };
  var toMediaType2 = function(v) {
    if (v instanceof Json2) {
      return new Just(applicationJSON);
    }
    ;
    return Nothing.value;
  };
  var string = /* @__PURE__ */ function() {
    return new $$String2(identity4);
  }();
  var ignore = /* @__PURE__ */ function() {
    return new Ignore(identity4);
  }();

  // output/Affjax.ResponseHeader/index.js
  var ResponseHeader = /* @__PURE__ */ function() {
    function ResponseHeader2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    ResponseHeader2.create = function(value0) {
      return function(value1) {
        return new ResponseHeader2(value0, value1);
      };
    };
    return ResponseHeader2;
  }();

  // output/Control.Bind/index.js
  var discard = function(dict) {
    return dict.discard;
  };
  var bind = function(dict) {
    return dict.bind;
  };
  var bindFlipped = function(dictBind) {
    return flip(bind(dictBind));
  };
  var composeKleisliFlipped = function(dictBind) {
    var bindFlipped12 = bindFlipped(dictBind);
    return function(f) {
      return function(g) {
        return function(a2) {
          return bindFlipped12(f)(g(a2));
        };
      };
    };
  };
  var discardUnit = {
    discard: function(dictBind) {
      return bind(dictBind);
    }
  };

  // output/Data.Either/index.js
  var Left = /* @__PURE__ */ function() {
    function Left2(value0) {
      this.value0 = value0;
    }
    ;
    Left2.create = function(value0) {
      return new Left2(value0);
    };
    return Left2;
  }();
  var Right = /* @__PURE__ */ function() {
    function Right2(value0) {
      this.value0 = value0;
    }
    ;
    Right2.create = function(value0) {
      return new Right2(value0);
    };
    return Right2;
  }();
  var note = function(a2) {
    return maybe(new Left(a2))(Right.create);
  };
  var functorEither = {
    map: function(f) {
      return function(m) {
        if (m instanceof Left) {
          return new Left(m.value0);
        }
        ;
        if (m instanceof Right) {
          return new Right(f(m.value0));
        }
        ;
        throw new Error("Failed pattern match at Data.Either (line 0, column 0 - line 0, column 0): " + [m.constructor.name]);
      };
    }
  };
  var either = function(v) {
    return function(v1) {
      return function(v2) {
        if (v2 instanceof Left) {
          return v(v2.value0);
        }
        ;
        if (v2 instanceof Right) {
          return v1(v2.value0);
        }
        ;
        throw new Error("Failed pattern match at Data.Either (line 208, column 1 - line 208, column 64): " + [v.constructor.name, v1.constructor.name, v2.constructor.name]);
      };
    };
  };

  // output/Effect/foreign.js
  var pureE = function(a2) {
    return function() {
      return a2;
    };
  };
  var bindE = function(a2) {
    return function(f) {
      return function() {
        return f(a2())();
      };
    };
  };

  // output/Control.Monad/index.js
  var unlessM = function(dictMonad) {
    var bind6 = bind(dictMonad.Bind1());
    var unless2 = unless(dictMonad.Applicative0());
    return function(mb) {
      return function(m) {
        return bind6(mb)(function(b2) {
          return unless2(b2)(m);
        });
      };
    };
  };
  var ap = function(dictMonad) {
    var bind6 = bind(dictMonad.Bind1());
    var pure10 = pure(dictMonad.Applicative0());
    return function(f) {
      return function(a2) {
        return bind6(f)(function(f$prime) {
          return bind6(a2)(function(a$prime) {
            return pure10(f$prime(a$prime));
          });
        });
      };
    };
  };

  // output/Data.Monoid/index.js
  var mempty = function(dict) {
    return dict.mempty;
  };

  // output/Effect/index.js
  var $runtime_lazy = function(name16, moduleName, init2) {
    var state3 = 0;
    var val;
    return function(lineNumber) {
      if (state3 === 2)
        return val;
      if (state3 === 1)
        throw new ReferenceError(name16 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
      state3 = 1;
      val = init2();
      state3 = 2;
      return val;
    };
  };
  var monadEffect = {
    Applicative0: function() {
      return applicativeEffect;
    },
    Bind1: function() {
      return bindEffect;
    }
  };
  var bindEffect = {
    bind: bindE,
    Apply0: function() {
      return $lazy_applyEffect(0);
    }
  };
  var applicativeEffect = {
    pure: pureE,
    Apply0: function() {
      return $lazy_applyEffect(0);
    }
  };
  var $lazy_functorEffect = /* @__PURE__ */ $runtime_lazy("functorEffect", "Effect", function() {
    return {
      map: liftA1(applicativeEffect)
    };
  });
  var $lazy_applyEffect = /* @__PURE__ */ $runtime_lazy("applyEffect", "Effect", function() {
    return {
      apply: ap(monadEffect),
      Functor0: function() {
        return $lazy_functorEffect(0);
      }
    };
  });
  var functorEffect = /* @__PURE__ */ $lazy_functorEffect(20);

  // output/Effect.Exception/foreign.js
  function error(msg) {
    return new Error(msg);
  }
  function message(e) {
    return e.message;
  }
  function throwException(e) {
    return function() {
      throw e;
    };
  }

  // output/Effect.Exception/index.js
  var $$throw = function($4) {
    return throwException(error($4));
  };

  // output/Control.Monad.Error.Class/index.js
  var throwError = function(dict) {
    return dict.throwError;
  };
  var catchError = function(dict) {
    return dict.catchError;
  };
  var $$try = function(dictMonadError) {
    var catchError1 = catchError(dictMonadError);
    var Monad0 = dictMonadError.MonadThrow0().Monad0();
    var map24 = map(Monad0.Bind1().Apply0().Functor0());
    var pure10 = pure(Monad0.Applicative0());
    return function(a2) {
      return catchError1(map24(Right.create)(a2))(function($52) {
        return pure10(Left.create($52));
      });
    };
  };

  // output/Data.Identity/index.js
  var Identity = function(x) {
    return x;
  };
  var functorIdentity = {
    map: function(f) {
      return function(m) {
        return f(m);
      };
    }
  };
  var applyIdentity = {
    apply: function(v) {
      return function(v1) {
        return v(v1);
      };
    },
    Functor0: function() {
      return functorIdentity;
    }
  };
  var bindIdentity = {
    bind: function(v) {
      return function(f) {
        return f(v);
      };
    },
    Apply0: function() {
      return applyIdentity;
    }
  };
  var applicativeIdentity = {
    pure: Identity,
    Apply0: function() {
      return applyIdentity;
    }
  };
  var monadIdentity = {
    Applicative0: function() {
      return applicativeIdentity;
    },
    Bind1: function() {
      return bindIdentity;
    }
  };

  // output/Effect.Ref/foreign.js
  var _new = function(val) {
    return function() {
      return { value: val };
    };
  };
  var read = function(ref2) {
    return function() {
      return ref2.value;
    };
  };
  var modifyImpl = function(f) {
    return function(ref2) {
      return function() {
        var t = f(ref2.value);
        ref2.value = t.state;
        return t.value;
      };
    };
  };
  var write = function(val) {
    return function(ref2) {
      return function() {
        ref2.value = val;
      };
    };
  };

  // output/Effect.Ref/index.js
  var $$void2 = /* @__PURE__ */ $$void(functorEffect);
  var $$new = _new;
  var modify$prime = modifyImpl;
  var modify = function(f) {
    return modify$prime(function(s) {
      var s$prime = f(s);
      return {
        state: s$prime,
        value: s$prime
      };
    });
  };
  var modify_ = function(f) {
    return function(s) {
      return $$void2(modify(f)(s));
    };
  };

  // output/Control.Monad.Rec.Class/index.js
  var bindFlipped2 = /* @__PURE__ */ bindFlipped(bindEffect);
  var map3 = /* @__PURE__ */ map(functorEffect);
  var Loop = /* @__PURE__ */ function() {
    function Loop2(value0) {
      this.value0 = value0;
    }
    ;
    Loop2.create = function(value0) {
      return new Loop2(value0);
    };
    return Loop2;
  }();
  var Done = /* @__PURE__ */ function() {
    function Done2(value0) {
      this.value0 = value0;
    }
    ;
    Done2.create = function(value0) {
      return new Done2(value0);
    };
    return Done2;
  }();
  var tailRecM = function(dict) {
    return dict.tailRecM;
  };
  var monadRecEffect = {
    tailRecM: function(f) {
      return function(a2) {
        var fromDone = function(v) {
          if (v instanceof Done) {
            return v.value0;
          }
          ;
          throw new Error("Failed pattern match at Control.Monad.Rec.Class (line 137, column 30 - line 137, column 44): " + [v.constructor.name]);
        };
        return function __do2() {
          var r = bindFlipped2($$new)(f(a2))();
          (function() {
            while (!function __do3() {
              var v = read(r)();
              if (v instanceof Loop) {
                var e = f(v.value0)();
                write(e)(r)();
                return false;
              }
              ;
              if (v instanceof Done) {
                return true;
              }
              ;
              throw new Error("Failed pattern match at Control.Monad.Rec.Class (line 128, column 22 - line 133, column 28): " + [v.constructor.name]);
            }()) {
            }
            ;
            return {};
          })();
          return map3(fromDone)(read(r))();
        };
      };
    },
    Monad0: function() {
      return monadEffect;
    }
  };

  // output/Data.HeytingAlgebra/foreign.js
  var boolConj = function(b1) {
    return function(b2) {
      return b1 && b2;
    };
  };
  var boolDisj = function(b1) {
    return function(b2) {
      return b1 || b2;
    };
  };
  var boolNot = function(b2) {
    return !b2;
  };

  // output/Data.HeytingAlgebra/index.js
  var tt = function(dict) {
    return dict.tt;
  };
  var not = function(dict) {
    return dict.not;
  };
  var implies = function(dict) {
    return dict.implies;
  };
  var ff = function(dict) {
    return dict.ff;
  };
  var disj = function(dict) {
    return dict.disj;
  };
  var heytingAlgebraBoolean = {
    ff: false,
    tt: true,
    implies: function(a2) {
      return function(b2) {
        return disj(heytingAlgebraBoolean)(not(heytingAlgebraBoolean)(a2))(b2);
      };
    },
    conj: boolConj,
    disj: boolDisj,
    not: boolNot
  };
  var conj = function(dict) {
    return dict.conj;
  };
  var heytingAlgebraFunction = function(dictHeytingAlgebra) {
    var ff1 = ff(dictHeytingAlgebra);
    var tt1 = tt(dictHeytingAlgebra);
    var implies1 = implies(dictHeytingAlgebra);
    var conj1 = conj(dictHeytingAlgebra);
    var disj1 = disj(dictHeytingAlgebra);
    var not1 = not(dictHeytingAlgebra);
    return {
      ff: function(v) {
        return ff1;
      },
      tt: function(v) {
        return tt1;
      },
      implies: function(f) {
        return function(g) {
          return function(a2) {
            return implies1(f(a2))(g(a2));
          };
        };
      },
      conj: function(f) {
        return function(g) {
          return function(a2) {
            return conj1(f(a2))(g(a2));
          };
        };
      },
      disj: function(f) {
        return function(g) {
          return function(a2) {
            return disj1(f(a2))(g(a2));
          };
        };
      },
      not: function(f) {
        return function(a2) {
          return not1(f(a2));
        };
      }
    };
  };

  // output/Data.Tuple/index.js
  var Tuple = /* @__PURE__ */ function() {
    function Tuple2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Tuple2.create = function(value0) {
      return function(value1) {
        return new Tuple2(value0, value1);
      };
    };
    return Tuple2;
  }();
  var snd = function(v) {
    return v.value1;
  };
  var functorTuple = {
    map: function(f) {
      return function(m) {
        return new Tuple(m.value0, f(m.value1));
      };
    }
  };
  var fst = function(v) {
    return v.value0;
  };

  // output/Control.Monad.State.Class/index.js
  var state = function(dict) {
    return dict.state;
  };
  var put = function(dictMonadState) {
    var state1 = state(dictMonadState);
    return function(s) {
      return state1(function(v) {
        return new Tuple(unit, s);
      });
    };
  };

  // output/Effect.Class/index.js
  var monadEffectEffect = {
    liftEffect: /* @__PURE__ */ identity(categoryFn),
    Monad0: function() {
      return monadEffect;
    }
  };
  var liftEffect = function(dict) {
    return dict.liftEffect;
  };

  // output/Control.Monad.Except.Trans/index.js
  var map4 = /* @__PURE__ */ map(functorEither);
  var ExceptT = function(x) {
    return x;
  };
  var runExceptT = function(v) {
    return v;
  };
  var mapExceptT = function(f) {
    return function(v) {
      return f(v);
    };
  };
  var functorExceptT = function(dictFunctor) {
    var map110 = map(dictFunctor);
    return {
      map: function(f) {
        return mapExceptT(map110(map4(f)));
      }
    };
  };
  var monadExceptT = function(dictMonad) {
    return {
      Applicative0: function() {
        return applicativeExceptT(dictMonad);
      },
      Bind1: function() {
        return bindExceptT(dictMonad);
      }
    };
  };
  var bindExceptT = function(dictMonad) {
    var bind6 = bind(dictMonad.Bind1());
    var pure10 = pure(dictMonad.Applicative0());
    return {
      bind: function(v) {
        return function(k) {
          return bind6(v)(either(function($187) {
            return pure10(Left.create($187));
          })(function(a2) {
            var v1 = k(a2);
            return v1;
          }));
        };
      },
      Apply0: function() {
        return applyExceptT(dictMonad);
      }
    };
  };
  var applyExceptT = function(dictMonad) {
    var functorExceptT1 = functorExceptT(dictMonad.Bind1().Apply0().Functor0());
    return {
      apply: ap(monadExceptT(dictMonad)),
      Functor0: function() {
        return functorExceptT1;
      }
    };
  };
  var applicativeExceptT = function(dictMonad) {
    return {
      pure: function() {
        var $188 = pure(dictMonad.Applicative0());
        return function($189) {
          return ExceptT($188(Right.create($189)));
        };
      }(),
      Apply0: function() {
        return applyExceptT(dictMonad);
      }
    };
  };
  var monadThrowExceptT = function(dictMonad) {
    var monadExceptT1 = monadExceptT(dictMonad);
    return {
      throwError: function() {
        var $198 = pure(dictMonad.Applicative0());
        return function($199) {
          return ExceptT($198(Left.create($199)));
        };
      }(),
      Monad0: function() {
        return monadExceptT1;
      }
    };
  };
  var altExceptT = function(dictSemigroup) {
    var append5 = append(dictSemigroup);
    return function(dictMonad) {
      var Bind1 = dictMonad.Bind1();
      var bind6 = bind(Bind1);
      var pure10 = pure(dictMonad.Applicative0());
      var functorExceptT1 = functorExceptT(Bind1.Apply0().Functor0());
      return {
        alt: function(v) {
          return function(v1) {
            return bind6(v)(function(rm) {
              if (rm instanceof Right) {
                return pure10(new Right(rm.value0));
              }
              ;
              if (rm instanceof Left) {
                return bind6(v1)(function(rn) {
                  if (rn instanceof Right) {
                    return pure10(new Right(rn.value0));
                  }
                  ;
                  if (rn instanceof Left) {
                    return pure10(new Left(append5(rm.value0)(rn.value0)));
                  }
                  ;
                  throw new Error("Failed pattern match at Control.Monad.Except.Trans (line 86, column 9 - line 88, column 49): " + [rn.constructor.name]);
                });
              }
              ;
              throw new Error("Failed pattern match at Control.Monad.Except.Trans (line 82, column 5 - line 88, column 49): " + [rm.constructor.name]);
            });
          };
        },
        Functor0: function() {
          return functorExceptT1;
        }
      };
    };
  };

  // output/Control.Monad.Except/index.js
  var unwrap3 = /* @__PURE__ */ unwrap();
  var runExcept = function($3) {
    return unwrap3(runExceptT($3));
  };

  // output/Data.Argonaut.Core/foreign.js
  function id(x) {
    return x;
  }
  function stringify(j) {
    return JSON.stringify(j);
  }

  // output/Foreign.Object/foreign.js
  var empty = {};
  function _lookup(no, yes, k, m) {
    return k in m ? yes(m[k]) : no;
  }
  function toArrayWithKey(f) {
    return function(m) {
      var r = [];
      for (var k in m) {
        if (hasOwnProperty.call(m, k)) {
          r.push(f(k)(m[k]));
        }
      }
      return r;
    };
  }
  var keys = Object.keys || toArrayWithKey(function(k) {
    return function() {
      return k;
    };
  });

  // output/Data.Array/foreign.js
  var replicateFill = function(count) {
    return function(value13) {
      if (count < 1) {
        return [];
      }
      var result = new Array(count);
      return result.fill(value13);
    };
  };
  var replicatePolyfill = function(count) {
    return function(value13) {
      var result = [];
      var n = 0;
      for (var i2 = 0; i2 < count; i2++) {
        result[n++] = value13;
      }
      return result;
    };
  };
  var replicate = typeof Array.prototype.fill === "function" ? replicateFill : replicatePolyfill;
  var fromFoldableImpl = function() {
    function Cons3(head4, tail) {
      this.head = head4;
      this.tail = tail;
    }
    var emptyList = {};
    function curryCons(head4) {
      return function(tail) {
        return new Cons3(head4, tail);
      };
    }
    function listToArray(list) {
      var result = [];
      var count = 0;
      var xs = list;
      while (xs !== emptyList) {
        result[count++] = xs.head;
        xs = xs.tail;
      }
      return result;
    }
    return function(foldr4) {
      return function(xs) {
        return listToArray(foldr4(curryCons)(emptyList)(xs));
      };
    };
  }();
  var length = function(xs) {
    return xs.length;
  };
  var indexImpl = function(just) {
    return function(nothing) {
      return function(xs) {
        return function(i2) {
          return i2 < 0 || i2 >= xs.length ? nothing : just(xs[i2]);
        };
      };
    };
  };
  var findIndexImpl = function(just) {
    return function(nothing) {
      return function(f) {
        return function(xs) {
          for (var i2 = 0, l = xs.length; i2 < l; i2++) {
            if (f(xs[i2]))
              return just(i2);
          }
          return nothing;
        };
      };
    };
  };
  var _deleteAt = function(just) {
    return function(nothing) {
      return function(i2) {
        return function(l) {
          if (i2 < 0 || i2 >= l.length)
            return nothing;
          var l1 = l.slice();
          l1.splice(i2, 1);
          return just(l1);
        };
      };
    };
  };
  var sortByImpl = function() {
    function mergeFromTo(compare2, fromOrdering, xs1, xs2, from2, to) {
      var mid;
      var i2;
      var j;
      var k;
      var x;
      var y;
      var c;
      mid = from2 + (to - from2 >> 1);
      if (mid - from2 > 1)
        mergeFromTo(compare2, fromOrdering, xs2, xs1, from2, mid);
      if (to - mid > 1)
        mergeFromTo(compare2, fromOrdering, xs2, xs1, mid, to);
      i2 = from2;
      j = mid;
      k = from2;
      while (i2 < mid && j < to) {
        x = xs2[i2];
        y = xs2[j];
        c = fromOrdering(compare2(x)(y));
        if (c > 0) {
          xs1[k++] = y;
          ++j;
        } else {
          xs1[k++] = x;
          ++i2;
        }
      }
      while (i2 < mid) {
        xs1[k++] = xs2[i2++];
      }
      while (j < to) {
        xs1[k++] = xs2[j++];
      }
    }
    return function(compare2) {
      return function(fromOrdering) {
        return function(xs) {
          var out;
          if (xs.length < 2)
            return xs;
          out = xs.slice(0);
          mergeFromTo(compare2, fromOrdering, out, xs.slice(0), 0, xs.length);
          return out;
        };
      };
    };
  }();
  var slice = function(s) {
    return function(e) {
      return function(l) {
        return l.slice(s, e);
      };
    };
  };

  // output/Data.Array.ST/foreign.js
  var pushAll = function(as) {
    return function(xs) {
      return function() {
        return xs.push.apply(xs, as);
      };
    };
  };
  var unsafeFreeze = function(xs) {
    return function() {
      return xs;
    };
  };
  function copyImpl(xs) {
    return function() {
      return xs.slice();
    };
  }
  var thaw = copyImpl;
  var sortByImpl2 = function() {
    function mergeFromTo(compare2, fromOrdering, xs1, xs2, from2, to) {
      var mid;
      var i2;
      var j;
      var k;
      var x;
      var y;
      var c;
      mid = from2 + (to - from2 >> 1);
      if (mid - from2 > 1)
        mergeFromTo(compare2, fromOrdering, xs2, xs1, from2, mid);
      if (to - mid > 1)
        mergeFromTo(compare2, fromOrdering, xs2, xs1, mid, to);
      i2 = from2;
      j = mid;
      k = from2;
      while (i2 < mid && j < to) {
        x = xs2[i2];
        y = xs2[j];
        c = fromOrdering(compare2(x)(y));
        if (c > 0) {
          xs1[k++] = y;
          ++j;
        } else {
          xs1[k++] = x;
          ++i2;
        }
      }
      while (i2 < mid) {
        xs1[k++] = xs2[i2++];
      }
      while (j < to) {
        xs1[k++] = xs2[j++];
      }
    }
    return function(compare2) {
      return function(fromOrdering) {
        return function(xs) {
          return function() {
            if (xs.length < 2)
              return xs;
            mergeFromTo(compare2, fromOrdering, xs, xs.slice(0), 0, xs.length);
            return xs;
          };
        };
      };
    };
  }();

  // output/Data.Array.ST/index.js
  var withArray = function(f) {
    return function(xs) {
      return function __do2() {
        var result = thaw(xs)();
        f(result)();
        return unsafeFreeze(result)();
      };
    };
  };
  var push = function(a2) {
    return pushAll([a2]);
  };

  // output/Data.Foldable/foreign.js
  var foldrArray = function(f) {
    return function(init2) {
      return function(xs) {
        var acc = init2;
        var len = xs.length;
        for (var i2 = len - 1; i2 >= 0; i2--) {
          acc = f(xs[i2])(acc);
        }
        return acc;
      };
    };
  };
  var foldlArray = function(f) {
    return function(init2) {
      return function(xs) {
        var acc = init2;
        var len = xs.length;
        for (var i2 = 0; i2 < len; i2++) {
          acc = f(acc)(xs[i2]);
        }
        return acc;
      };
    };
  };

  // output/Control.Plus/index.js
  var empty2 = function(dict) {
    return dict.empty;
  };

  // output/Data.Bifunctor/index.js
  var bimap = function(dict) {
    return dict.bimap;
  };

  // output/Data.Monoid.Disj/index.js
  var Disj = function(x) {
    return x;
  };
  var semigroupDisj = function(dictHeytingAlgebra) {
    var disj2 = disj(dictHeytingAlgebra);
    return {
      append: function(v) {
        return function(v1) {
          return disj2(v)(v1);
        };
      }
    };
  };
  var monoidDisj = function(dictHeytingAlgebra) {
    var semigroupDisj1 = semigroupDisj(dictHeytingAlgebra);
    return {
      mempty: ff(dictHeytingAlgebra),
      Semigroup0: function() {
        return semigroupDisj1;
      }
    };
  };

  // output/Data.Foldable/index.js
  var alaF2 = /* @__PURE__ */ alaF()()()();
  var foldr = function(dict) {
    return dict.foldr;
  };
  var traverse_ = function(dictApplicative) {
    var applySecond2 = applySecond(dictApplicative.Apply0());
    var pure10 = pure(dictApplicative);
    return function(dictFoldable) {
      var foldr22 = foldr(dictFoldable);
      return function(f) {
        return foldr22(function($454) {
          return applySecond2(f($454));
        })(pure10(unit));
      };
    };
  };
  var for_ = function(dictApplicative) {
    var traverse_14 = traverse_(dictApplicative);
    return function(dictFoldable) {
      return flip(traverse_14(dictFoldable));
    };
  };
  var foldl = function(dict) {
    return dict.foldl;
  };
  var foldableMaybe = {
    foldr: function(v) {
      return function(v1) {
        return function(v2) {
          if (v2 instanceof Nothing) {
            return v1;
          }
          ;
          if (v2 instanceof Just) {
            return v(v2.value0)(v1);
          }
          ;
          throw new Error("Failed pattern match at Data.Foldable (line 138, column 1 - line 144, column 27): " + [v.constructor.name, v1.constructor.name, v2.constructor.name]);
        };
      };
    },
    foldl: function(v) {
      return function(v1) {
        return function(v2) {
          if (v2 instanceof Nothing) {
            return v1;
          }
          ;
          if (v2 instanceof Just) {
            return v(v1)(v2.value0);
          }
          ;
          throw new Error("Failed pattern match at Data.Foldable (line 138, column 1 - line 144, column 27): " + [v.constructor.name, v1.constructor.name, v2.constructor.name]);
        };
      };
    },
    foldMap: function(dictMonoid) {
      var mempty2 = mempty(dictMonoid);
      return function(v) {
        return function(v1) {
          if (v1 instanceof Nothing) {
            return mempty2;
          }
          ;
          if (v1 instanceof Just) {
            return v(v1.value0);
          }
          ;
          throw new Error("Failed pattern match at Data.Foldable (line 138, column 1 - line 144, column 27): " + [v.constructor.name, v1.constructor.name]);
        };
      };
    }
  };
  var foldMapDefaultR = function(dictFoldable) {
    var foldr22 = foldr(dictFoldable);
    return function(dictMonoid) {
      var append5 = append(dictMonoid.Semigroup0());
      var mempty2 = mempty(dictMonoid);
      return function(f) {
        return foldr22(function(x) {
          return function(acc) {
            return append5(f(x))(acc);
          };
        })(mempty2);
      };
    };
  };
  var foldableArray = {
    foldr: foldrArray,
    foldl: foldlArray,
    foldMap: function(dictMonoid) {
      return foldMapDefaultR(foldableArray)(dictMonoid);
    }
  };
  var foldMap = function(dict) {
    return dict.foldMap;
  };
  var any = function(dictFoldable) {
    var foldMap2 = foldMap(dictFoldable);
    return function(dictHeytingAlgebra) {
      return alaF2(Disj)(foldMap2(monoidDisj(dictHeytingAlgebra)));
    };
  };

  // output/Data.Traversable/foreign.js
  var traverseArrayImpl = function() {
    function array1(a2) {
      return [a2];
    }
    function array2(a2) {
      return function(b2) {
        return [a2, b2];
      };
    }
    function array3(a2) {
      return function(b2) {
        return function(c) {
          return [a2, b2, c];
        };
      };
    }
    function concat2(xs) {
      return function(ys) {
        return xs.concat(ys);
      };
    }
    return function(apply3) {
      return function(map24) {
        return function(pure10) {
          return function(f) {
            return function(array) {
              function go2(bot, top2) {
                switch (top2 - bot) {
                  case 0:
                    return pure10([]);
                  case 1:
                    return map24(array1)(f(array[bot]));
                  case 2:
                    return apply3(map24(array2)(f(array[bot])))(f(array[bot + 1]));
                  case 3:
                    return apply3(apply3(map24(array3)(f(array[bot])))(f(array[bot + 1])))(f(array[bot + 2]));
                  default:
                    var pivot = bot + Math.floor((top2 - bot) / 4) * 2;
                    return apply3(map24(concat2)(go2(bot, pivot)))(go2(pivot, top2));
                }
              }
              return go2(0, array.length);
            };
          };
        };
      };
    };
  }();

  // output/Data.Traversable/index.js
  var identity5 = /* @__PURE__ */ identity(categoryFn);
  var traverse = function(dict) {
    return dict.traverse;
  };
  var sequenceDefault = function(dictTraversable) {
    var traverse22 = traverse(dictTraversable);
    return function(dictApplicative) {
      return traverse22(dictApplicative)(identity5);
    };
  };
  var traversableArray = {
    traverse: function(dictApplicative) {
      var Apply0 = dictApplicative.Apply0();
      return traverseArrayImpl(apply(Apply0))(map(Apply0.Functor0()))(pure(dictApplicative));
    },
    sequence: function(dictApplicative) {
      return sequenceDefault(traversableArray)(dictApplicative);
    },
    Functor0: function() {
      return functorArray;
    },
    Foldable1: function() {
      return foldableArray;
    }
  };

  // output/Data.Unfoldable/foreign.js
  var unfoldrArrayImpl = function(isNothing2) {
    return function(fromJust5) {
      return function(fst2) {
        return function(snd2) {
          return function(f) {
            return function(b2) {
              var result = [];
              var value13 = b2;
              while (true) {
                var maybe2 = f(value13);
                if (isNothing2(maybe2))
                  return result;
                var tuple = fromJust5(maybe2);
                result.push(fst2(tuple));
                value13 = snd2(tuple);
              }
            };
          };
        };
      };
    };
  };

  // output/Data.Unfoldable1/foreign.js
  var unfoldr1ArrayImpl = function(isNothing2) {
    return function(fromJust5) {
      return function(fst2) {
        return function(snd2) {
          return function(f) {
            return function(b2) {
              var result = [];
              var value13 = b2;
              while (true) {
                var tuple = f(value13);
                result.push(fst2(tuple));
                var maybe2 = snd2(tuple);
                if (isNothing2(maybe2))
                  return result;
                value13 = fromJust5(maybe2);
              }
            };
          };
        };
      };
    };
  };

  // output/Data.Unfoldable1/index.js
  var fromJust2 = /* @__PURE__ */ fromJust();
  var unfoldable1Array = {
    unfoldr1: /* @__PURE__ */ unfoldr1ArrayImpl(isNothing)(fromJust2)(fst)(snd)
  };

  // output/Data.Unfoldable/index.js
  var fromJust3 = /* @__PURE__ */ fromJust();
  var unfoldr = function(dict) {
    return dict.unfoldr;
  };
  var unfoldableArray = {
    unfoldr: /* @__PURE__ */ unfoldrArrayImpl(isNothing)(fromJust3)(fst)(snd),
    Unfoldable10: function() {
      return unfoldable1Array;
    }
  };

  // output/Data.Array/index.js
  var fromJust4 = /* @__PURE__ */ fromJust();
  var take = function(n) {
    return function(xs) {
      var $148 = n < 1;
      if ($148) {
        return [];
      }
      ;
      return slice(0)(n)(xs);
    };
  };
  var snoc = function(xs) {
    return function(x) {
      return withArray(push(x))(xs)();
    };
  };
  var index = /* @__PURE__ */ function() {
    return indexImpl(Just.create)(Nothing.value);
  }();
  var findIndex = /* @__PURE__ */ function() {
    return findIndexImpl(Just.create)(Nothing.value);
  }();
  var deleteAt = /* @__PURE__ */ function() {
    return _deleteAt(Just.create)(Nothing.value);
  }();
  var deleteBy = function(v) {
    return function(v1) {
      return function(v2) {
        if (v2.length === 0) {
          return [];
        }
        ;
        return maybe(v2)(function(i2) {
          return fromJust4(deleteAt(i2)(v2));
        })(findIndex(v(v1))(v2));
      };
    };
  };

  // output/Data.Function.Uncurried/foreign.js
  var runFn3 = function(fn) {
    return function(a2) {
      return function(b2) {
        return function(c) {
          return fn(a2, b2, c);
        };
      };
    };
  };
  var runFn4 = function(fn) {
    return function(a2) {
      return function(b2) {
        return function(c) {
          return function(d) {
            return fn(a2, b2, c, d);
          };
        };
      };
    };
  };

  // output/Foreign.Object.ST/foreign.js
  var newImpl = function() {
    return {};
  };

  // output/Foreign.Object/index.js
  var lookup = /* @__PURE__ */ function() {
    return runFn4(_lookup)(Nothing.value)(Just.create);
  }();

  // output/Data.Argonaut.Core/index.js
  var jsonEmptyObject = /* @__PURE__ */ id(empty);

  // output/Data.Argonaut.Parser/foreign.js
  function _jsonParser(fail3, succ, s) {
    try {
      return succ(JSON.parse(s));
    } catch (e) {
      return fail3(e.message);
    }
  }

  // output/Data.Argonaut.Parser/index.js
  var jsonParser = function(j) {
    return _jsonParser(Left.create, Right.create, j);
  };

  // output/Data.String.Common/foreign.js
  var split = function(sep) {
    return function(s) {
      return s.split(sep);
    };
  };
  var joinWith = function(s) {
    return function(xs) {
      return xs.join(s);
    };
  };

  // output/JSURI/foreign.js
  function encodeURIComponent_to_RFC3986(input3) {
    return input3.replace(/[!'()*]/g, function(c) {
      return "%" + c.charCodeAt(0).toString(16);
    });
  }
  function _encodeFormURLComponent(fail3, succeed, input3) {
    try {
      return succeed(encodeURIComponent_to_RFC3986(encodeURIComponent(input3)).replace(/%20/g, "+"));
    } catch (err) {
      return fail3(err);
    }
  }

  // output/JSURI/index.js
  var encodeFormURLComponent = /* @__PURE__ */ function() {
    return runFn3(_encodeFormURLComponent)($$const(Nothing.value))(Just.create);
  }();

  // output/Data.FormURLEncoded/index.js
  var apply2 = /* @__PURE__ */ apply(applyMaybe);
  var map5 = /* @__PURE__ */ map(functorMaybe);
  var traverse2 = /* @__PURE__ */ traverse(traversableArray)(applicativeMaybe);
  var toArray = function(v) {
    return v;
  };
  var encode = /* @__PURE__ */ function() {
    var encodePart = function(v) {
      if (v.value1 instanceof Nothing) {
        return encodeFormURLComponent(v.value0);
      }
      ;
      if (v.value1 instanceof Just) {
        return apply2(map5(function(key) {
          return function(val) {
            return key + ("=" + val);
          };
        })(encodeFormURLComponent(v.value0)))(encodeFormURLComponent(v.value1.value0));
      }
      ;
      throw new Error("Failed pattern match at Data.FormURLEncoded (line 37, column 16 - line 39, column 114): " + [v.constructor.name]);
    };
    var $37 = map5(joinWith("&"));
    var $38 = traverse2(encodePart);
    return function($39) {
      return $37($38(toArray($39)));
    };
  }();

  // output/Data.HTTP.Method/index.js
  var OPTIONS = /* @__PURE__ */ function() {
    function OPTIONS2() {
    }
    ;
    OPTIONS2.value = new OPTIONS2();
    return OPTIONS2;
  }();
  var GET = /* @__PURE__ */ function() {
    function GET3() {
    }
    ;
    GET3.value = new GET3();
    return GET3;
  }();
  var HEAD = /* @__PURE__ */ function() {
    function HEAD2() {
    }
    ;
    HEAD2.value = new HEAD2();
    return HEAD2;
  }();
  var POST = /* @__PURE__ */ function() {
    function POST3() {
    }
    ;
    POST3.value = new POST3();
    return POST3;
  }();
  var PUT = /* @__PURE__ */ function() {
    function PUT2() {
    }
    ;
    PUT2.value = new PUT2();
    return PUT2;
  }();
  var DELETE = /* @__PURE__ */ function() {
    function DELETE2() {
    }
    ;
    DELETE2.value = new DELETE2();
    return DELETE2;
  }();
  var TRACE = /* @__PURE__ */ function() {
    function TRACE2() {
    }
    ;
    TRACE2.value = new TRACE2();
    return TRACE2;
  }();
  var CONNECT = /* @__PURE__ */ function() {
    function CONNECT2() {
    }
    ;
    CONNECT2.value = new CONNECT2();
    return CONNECT2;
  }();
  var PROPFIND = /* @__PURE__ */ function() {
    function PROPFIND2() {
    }
    ;
    PROPFIND2.value = new PROPFIND2();
    return PROPFIND2;
  }();
  var PROPPATCH = /* @__PURE__ */ function() {
    function PROPPATCH2() {
    }
    ;
    PROPPATCH2.value = new PROPPATCH2();
    return PROPPATCH2;
  }();
  var MKCOL = /* @__PURE__ */ function() {
    function MKCOL2() {
    }
    ;
    MKCOL2.value = new MKCOL2();
    return MKCOL2;
  }();
  var COPY = /* @__PURE__ */ function() {
    function COPY2() {
    }
    ;
    COPY2.value = new COPY2();
    return COPY2;
  }();
  var MOVE = /* @__PURE__ */ function() {
    function MOVE2() {
    }
    ;
    MOVE2.value = new MOVE2();
    return MOVE2;
  }();
  var LOCK = /* @__PURE__ */ function() {
    function LOCK2() {
    }
    ;
    LOCK2.value = new LOCK2();
    return LOCK2;
  }();
  var UNLOCK = /* @__PURE__ */ function() {
    function UNLOCK2() {
    }
    ;
    UNLOCK2.value = new UNLOCK2();
    return UNLOCK2;
  }();
  var PATCH = /* @__PURE__ */ function() {
    function PATCH2() {
    }
    ;
    PATCH2.value = new PATCH2();
    return PATCH2;
  }();
  var unCustomMethod = function(v) {
    return v;
  };
  var showMethod = {
    show: function(v) {
      if (v instanceof OPTIONS) {
        return "OPTIONS";
      }
      ;
      if (v instanceof GET) {
        return "GET";
      }
      ;
      if (v instanceof HEAD) {
        return "HEAD";
      }
      ;
      if (v instanceof POST) {
        return "POST";
      }
      ;
      if (v instanceof PUT) {
        return "PUT";
      }
      ;
      if (v instanceof DELETE) {
        return "DELETE";
      }
      ;
      if (v instanceof TRACE) {
        return "TRACE";
      }
      ;
      if (v instanceof CONNECT) {
        return "CONNECT";
      }
      ;
      if (v instanceof PROPFIND) {
        return "PROPFIND";
      }
      ;
      if (v instanceof PROPPATCH) {
        return "PROPPATCH";
      }
      ;
      if (v instanceof MKCOL) {
        return "MKCOL";
      }
      ;
      if (v instanceof COPY) {
        return "COPY";
      }
      ;
      if (v instanceof MOVE) {
        return "MOVE";
      }
      ;
      if (v instanceof LOCK) {
        return "LOCK";
      }
      ;
      if (v instanceof UNLOCK) {
        return "UNLOCK";
      }
      ;
      if (v instanceof PATCH) {
        return "PATCH";
      }
      ;
      throw new Error("Failed pattern match at Data.HTTP.Method (line 43, column 1 - line 59, column 23): " + [v.constructor.name]);
    }
  };
  var print = /* @__PURE__ */ either(/* @__PURE__ */ show(showMethod))(unCustomMethod);

  // output/Data.NonEmpty/index.js
  var NonEmpty = /* @__PURE__ */ function() {
    function NonEmpty2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    NonEmpty2.create = function(value0) {
      return function(value1) {
        return new NonEmpty2(value0, value1);
      };
    };
    return NonEmpty2;
  }();
  var singleton3 = function(dictPlus) {
    var empty7 = empty2(dictPlus);
    return function(a2) {
      return new NonEmpty(a2, empty7);
    };
  };

  // output/Data.List.Types/index.js
  var Nil = /* @__PURE__ */ function() {
    function Nil3() {
    }
    ;
    Nil3.value = new Nil3();
    return Nil3;
  }();
  var Cons = /* @__PURE__ */ function() {
    function Cons3(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Cons3.create = function(value0) {
      return function(value1) {
        return new Cons3(value0, value1);
      };
    };
    return Cons3;
  }();
  var NonEmptyList = function(x) {
    return x;
  };
  var toList = function(v) {
    return new Cons(v.value0, v.value1);
  };
  var listMap = function(f) {
    var chunkedRevMap = function($copy_v) {
      return function($copy_v1) {
        var $tco_var_v = $copy_v;
        var $tco_done = false;
        var $tco_result;
        function $tco_loop(v, v1) {
          if (v1 instanceof Cons && (v1.value1 instanceof Cons && v1.value1.value1 instanceof Cons)) {
            $tco_var_v = new Cons(v1, v);
            $copy_v1 = v1.value1.value1.value1;
            return;
          }
          ;
          var unrolledMap = function(v2) {
            if (v2 instanceof Cons && (v2.value1 instanceof Cons && v2.value1.value1 instanceof Nil)) {
              return new Cons(f(v2.value0), new Cons(f(v2.value1.value0), Nil.value));
            }
            ;
            if (v2 instanceof Cons && v2.value1 instanceof Nil) {
              return new Cons(f(v2.value0), Nil.value);
            }
            ;
            return Nil.value;
          };
          var reverseUnrolledMap = function($copy_v2) {
            return function($copy_v3) {
              var $tco_var_v2 = $copy_v2;
              var $tco_done1 = false;
              var $tco_result2;
              function $tco_loop2(v2, v3) {
                if (v2 instanceof Cons && (v2.value0 instanceof Cons && (v2.value0.value1 instanceof Cons && v2.value0.value1.value1 instanceof Cons))) {
                  $tco_var_v2 = v2.value1;
                  $copy_v3 = new Cons(f(v2.value0.value0), new Cons(f(v2.value0.value1.value0), new Cons(f(v2.value0.value1.value1.value0), v3)));
                  return;
                }
                ;
                $tco_done1 = true;
                return v3;
              }
              ;
              while (!$tco_done1) {
                $tco_result2 = $tco_loop2($tco_var_v2, $copy_v3);
              }
              ;
              return $tco_result2;
            };
          };
          $tco_done = true;
          return reverseUnrolledMap(v)(unrolledMap(v1));
        }
        ;
        while (!$tco_done) {
          $tco_result = $tco_loop($tco_var_v, $copy_v1);
        }
        ;
        return $tco_result;
      };
    };
    return chunkedRevMap(Nil.value);
  };
  var functorList = {
    map: listMap
  };
  var foldableList = {
    foldr: function(f) {
      return function(b2) {
        var rev3 = function() {
          var go2 = function($copy_v) {
            return function($copy_v1) {
              var $tco_var_v = $copy_v;
              var $tco_done = false;
              var $tco_result;
              function $tco_loop(v, v1) {
                if (v1 instanceof Nil) {
                  $tco_done = true;
                  return v;
                }
                ;
                if (v1 instanceof Cons) {
                  $tco_var_v = new Cons(v1.value0, v);
                  $copy_v1 = v1.value1;
                  return;
                }
                ;
                throw new Error("Failed pattern match at Data.List.Types (line 107, column 7 - line 107, column 23): " + [v.constructor.name, v1.constructor.name]);
              }
              ;
              while (!$tco_done) {
                $tco_result = $tco_loop($tco_var_v, $copy_v1);
              }
              ;
              return $tco_result;
            };
          };
          return go2(Nil.value);
        }();
        var $284 = foldl(foldableList)(flip(f))(b2);
        return function($285) {
          return $284(rev3($285));
        };
      };
    },
    foldl: function(f) {
      var go2 = function($copy_b) {
        return function($copy_v) {
          var $tco_var_b = $copy_b;
          var $tco_done1 = false;
          var $tco_result;
          function $tco_loop(b2, v) {
            if (v instanceof Nil) {
              $tco_done1 = true;
              return b2;
            }
            ;
            if (v instanceof Cons) {
              $tco_var_b = f(b2)(v.value0);
              $copy_v = v.value1;
              return;
            }
            ;
            throw new Error("Failed pattern match at Data.List.Types (line 111, column 12 - line 113, column 30): " + [v.constructor.name]);
          }
          ;
          while (!$tco_done1) {
            $tco_result = $tco_loop($tco_var_b, $copy_v);
          }
          ;
          return $tco_result;
        };
      };
      return go2;
    },
    foldMap: function(dictMonoid) {
      var append22 = append(dictMonoid.Semigroup0());
      var mempty2 = mempty(dictMonoid);
      return function(f) {
        return foldl(foldableList)(function(acc) {
          var $286 = append22(acc);
          return function($287) {
            return $286(f($287));
          };
        })(mempty2);
      };
    }
  };
  var foldr2 = /* @__PURE__ */ foldr(foldableList);
  var semigroupList = {
    append: function(xs) {
      return function(ys) {
        return foldr2(Cons.create)(ys)(xs);
      };
    }
  };
  var append1 = /* @__PURE__ */ append(semigroupList);
  var semigroupNonEmptyList = {
    append: function(v) {
      return function(as$prime) {
        return new NonEmpty(v.value0, append1(v.value1)(toList(as$prime)));
      };
    }
  };
  var altList = {
    alt: append1,
    Functor0: function() {
      return functorList;
    }
  };
  var plusList = /* @__PURE__ */ function() {
    return {
      empty: Nil.value,
      Alt0: function() {
        return altList;
      }
    };
  }();

  // output/Data.List/index.js
  var reverse2 = /* @__PURE__ */ function() {
    var go2 = function($copy_v) {
      return function($copy_v1) {
        var $tco_var_v = $copy_v;
        var $tco_done = false;
        var $tco_result;
        function $tco_loop(v, v1) {
          if (v1 instanceof Nil) {
            $tco_done = true;
            return v;
          }
          ;
          if (v1 instanceof Cons) {
            $tco_var_v = new Cons(v1.value0, v);
            $copy_v1 = v1.value1;
            return;
          }
          ;
          throw new Error("Failed pattern match at Data.List (line 368, column 3 - line 368, column 19): " + [v.constructor.name, v1.constructor.name]);
        }
        ;
        while (!$tco_done) {
          $tco_result = $tco_loop($tco_var_v, $copy_v1);
        }
        ;
        return $tco_result;
      };
    };
    return go2(Nil.value);
  }();
  var $$null = function(v) {
    if (v instanceof Nil) {
      return true;
    }
    ;
    return false;
  };

  // output/Partial.Unsafe/foreign.js
  var _unsafePartial = function(f) {
    return f();
  };

  // output/Partial/foreign.js
  var _crashWith = function(msg) {
    throw new Error(msg);
  };

  // output/Partial/index.js
  var crashWith = function() {
    return _crashWith;
  };

  // output/Partial.Unsafe/index.js
  var crashWith2 = /* @__PURE__ */ crashWith();
  var unsafePartial = _unsafePartial;
  var unsafeCrashWith = function(msg) {
    return unsafePartial(function() {
      return crashWith2(msg);
    });
  };

  // output/Data.List.NonEmpty/index.js
  var singleton4 = /* @__PURE__ */ function() {
    var $200 = singleton3(plusList);
    return function($201) {
      return NonEmptyList($200($201));
    };
  }();
  var head = function(v) {
    return v.value0;
  };
  var cons = function(y) {
    return function(v) {
      return new NonEmpty(y, new Cons(v.value0, v.value1));
    };
  };

  // output/Data.Nullable/foreign.js
  var nullImpl = null;
  function nullable(a2, r, f) {
    return a2 == null ? r : f(a2);
  }
  function notNull(x) {
    return x;
  }

  // output/Data.Nullable/index.js
  var toNullable = /* @__PURE__ */ maybe(nullImpl)(notNull);
  var toMaybe = function(n) {
    return nullable(n, Nothing.value, Just.create);
  };

  // output/Effect.Aff/foreign.js
  var Aff = function() {
    var EMPTY = {};
    var PURE = "Pure";
    var THROW = "Throw";
    var CATCH = "Catch";
    var SYNC = "Sync";
    var ASYNC = "Async";
    var BIND = "Bind";
    var BRACKET = "Bracket";
    var FORK = "Fork";
    var SEQ = "Sequential";
    var MAP = "Map";
    var APPLY = "Apply";
    var ALT = "Alt";
    var CONS = "Cons";
    var RESUME = "Resume";
    var RELEASE = "Release";
    var FINALIZER = "Finalizer";
    var FINALIZED = "Finalized";
    var FORKED = "Forked";
    var FIBER = "Fiber";
    var THUNK = "Thunk";
    function Aff2(tag, _1, _2, _3) {
      this.tag = tag;
      this._1 = _1;
      this._2 = _2;
      this._3 = _3;
    }
    function AffCtr(tag) {
      var fn = function(_1, _2, _3) {
        return new Aff2(tag, _1, _2, _3);
      };
      fn.tag = tag;
      return fn;
    }
    function nonCanceler2(error4) {
      return new Aff2(PURE, void 0);
    }
    function runEff(eff) {
      try {
        eff();
      } catch (error4) {
        setTimeout(function() {
          throw error4;
        }, 0);
      }
    }
    function runSync(left, right, eff) {
      try {
        return right(eff());
      } catch (error4) {
        return left(error4);
      }
    }
    function runAsync(left, eff, k) {
      try {
        return eff(k)();
      } catch (error4) {
        k(left(error4))();
        return nonCanceler2;
      }
    }
    var Scheduler = function() {
      var limit = 1024;
      var size4 = 0;
      var ix = 0;
      var queue = new Array(limit);
      var draining = false;
      function drain() {
        var thunk;
        draining = true;
        while (size4 !== 0) {
          size4--;
          thunk = queue[ix];
          queue[ix] = void 0;
          ix = (ix + 1) % limit;
          thunk();
        }
        draining = false;
      }
      return {
        isDraining: function() {
          return draining;
        },
        enqueue: function(cb) {
          var i2, tmp;
          if (size4 === limit) {
            tmp = draining;
            drain();
            draining = tmp;
          }
          queue[(ix + size4) % limit] = cb;
          size4++;
          if (!draining) {
            drain();
          }
        }
      };
    }();
    function Supervisor(util) {
      var fibers = {};
      var fiberId = 0;
      var count = 0;
      return {
        register: function(fiber) {
          var fid = fiberId++;
          fiber.onComplete({
            rethrow: true,
            handler: function(result) {
              return function() {
                count--;
                delete fibers[fid];
              };
            }
          })();
          fibers[fid] = fiber;
          count++;
        },
        isEmpty: function() {
          return count === 0;
        },
        killAll: function(killError, cb) {
          return function() {
            if (count === 0) {
              return cb();
            }
            var killCount = 0;
            var kills = {};
            function kill2(fid) {
              kills[fid] = fibers[fid].kill(killError, function(result) {
                return function() {
                  delete kills[fid];
                  killCount--;
                  if (util.isLeft(result) && util.fromLeft(result)) {
                    setTimeout(function() {
                      throw util.fromLeft(result);
                    }, 0);
                  }
                  if (killCount === 0) {
                    cb();
                  }
                };
              })();
            }
            for (var k in fibers) {
              if (fibers.hasOwnProperty(k)) {
                killCount++;
                kill2(k);
              }
            }
            fibers = {};
            fiberId = 0;
            count = 0;
            return function(error4) {
              return new Aff2(SYNC, function() {
                for (var k2 in kills) {
                  if (kills.hasOwnProperty(k2)) {
                    kills[k2]();
                  }
                }
              });
            };
          };
        }
      };
    }
    var SUSPENDED = 0;
    var CONTINUE = 1;
    var STEP_BIND = 2;
    var STEP_RESULT = 3;
    var PENDING = 4;
    var RETURN = 5;
    var COMPLETED = 6;
    function Fiber(util, supervisor, aff) {
      var runTick = 0;
      var status = SUSPENDED;
      var step4 = aff;
      var fail3 = null;
      var interrupt = null;
      var bhead = null;
      var btail = null;
      var attempts = null;
      var bracketCount = 0;
      var joinId = 0;
      var joins = null;
      var rethrow = true;
      function run3(localRunTick) {
        var tmp, result, attempt;
        while (true) {
          tmp = null;
          result = null;
          attempt = null;
          switch (status) {
            case STEP_BIND:
              status = CONTINUE;
              try {
                step4 = bhead(step4);
                if (btail === null) {
                  bhead = null;
                } else {
                  bhead = btail._1;
                  btail = btail._2;
                }
              } catch (e) {
                status = RETURN;
                fail3 = util.left(e);
                step4 = null;
              }
              break;
            case STEP_RESULT:
              if (util.isLeft(step4)) {
                status = RETURN;
                fail3 = step4;
                step4 = null;
              } else if (bhead === null) {
                status = RETURN;
              } else {
                status = STEP_BIND;
                step4 = util.fromRight(step4);
              }
              break;
            case CONTINUE:
              switch (step4.tag) {
                case BIND:
                  if (bhead) {
                    btail = new Aff2(CONS, bhead, btail);
                  }
                  bhead = step4._2;
                  status = CONTINUE;
                  step4 = step4._1;
                  break;
                case PURE:
                  if (bhead === null) {
                    status = RETURN;
                    step4 = util.right(step4._1);
                  } else {
                    status = STEP_BIND;
                    step4 = step4._1;
                  }
                  break;
                case SYNC:
                  status = STEP_RESULT;
                  step4 = runSync(util.left, util.right, step4._1);
                  break;
                case ASYNC:
                  status = PENDING;
                  step4 = runAsync(util.left, step4._1, function(result2) {
                    return function() {
                      if (runTick !== localRunTick) {
                        return;
                      }
                      runTick++;
                      Scheduler.enqueue(function() {
                        if (runTick !== localRunTick + 1) {
                          return;
                        }
                        status = STEP_RESULT;
                        step4 = result2;
                        run3(runTick);
                      });
                    };
                  });
                  return;
                case THROW:
                  status = RETURN;
                  fail3 = util.left(step4._1);
                  step4 = null;
                  break;
                case CATCH:
                  if (bhead === null) {
                    attempts = new Aff2(CONS, step4, attempts, interrupt);
                  } else {
                    attempts = new Aff2(CONS, step4, new Aff2(CONS, new Aff2(RESUME, bhead, btail), attempts, interrupt), interrupt);
                  }
                  bhead = null;
                  btail = null;
                  status = CONTINUE;
                  step4 = step4._1;
                  break;
                case BRACKET:
                  bracketCount++;
                  if (bhead === null) {
                    attempts = new Aff2(CONS, step4, attempts, interrupt);
                  } else {
                    attempts = new Aff2(CONS, step4, new Aff2(CONS, new Aff2(RESUME, bhead, btail), attempts, interrupt), interrupt);
                  }
                  bhead = null;
                  btail = null;
                  status = CONTINUE;
                  step4 = step4._1;
                  break;
                case FORK:
                  status = STEP_RESULT;
                  tmp = Fiber(util, supervisor, step4._2);
                  if (supervisor) {
                    supervisor.register(tmp);
                  }
                  if (step4._1) {
                    tmp.run();
                  }
                  step4 = util.right(tmp);
                  break;
                case SEQ:
                  status = CONTINUE;
                  step4 = sequential3(util, supervisor, step4._1);
                  break;
              }
              break;
            case RETURN:
              bhead = null;
              btail = null;
              if (attempts === null) {
                status = COMPLETED;
                step4 = interrupt || fail3 || step4;
              } else {
                tmp = attempts._3;
                attempt = attempts._1;
                attempts = attempts._2;
                switch (attempt.tag) {
                  case CATCH:
                    if (interrupt && interrupt !== tmp && bracketCount === 0) {
                      status = RETURN;
                    } else if (fail3) {
                      status = CONTINUE;
                      step4 = attempt._2(util.fromLeft(fail3));
                      fail3 = null;
                    }
                    break;
                  case RESUME:
                    if (interrupt && interrupt !== tmp && bracketCount === 0 || fail3) {
                      status = RETURN;
                    } else {
                      bhead = attempt._1;
                      btail = attempt._2;
                      status = STEP_BIND;
                      step4 = util.fromRight(step4);
                    }
                    break;
                  case BRACKET:
                    bracketCount--;
                    if (fail3 === null) {
                      result = util.fromRight(step4);
                      attempts = new Aff2(CONS, new Aff2(RELEASE, attempt._2, result), attempts, tmp);
                      if (interrupt === tmp || bracketCount > 0) {
                        status = CONTINUE;
                        step4 = attempt._3(result);
                      }
                    }
                    break;
                  case RELEASE:
                    attempts = new Aff2(CONS, new Aff2(FINALIZED, step4, fail3), attempts, interrupt);
                    status = CONTINUE;
                    if (interrupt && interrupt !== tmp && bracketCount === 0) {
                      step4 = attempt._1.killed(util.fromLeft(interrupt))(attempt._2);
                    } else if (fail3) {
                      step4 = attempt._1.failed(util.fromLeft(fail3))(attempt._2);
                    } else {
                      step4 = attempt._1.completed(util.fromRight(step4))(attempt._2);
                    }
                    fail3 = null;
                    bracketCount++;
                    break;
                  case FINALIZER:
                    bracketCount++;
                    attempts = new Aff2(CONS, new Aff2(FINALIZED, step4, fail3), attempts, interrupt);
                    status = CONTINUE;
                    step4 = attempt._1;
                    break;
                  case FINALIZED:
                    bracketCount--;
                    status = RETURN;
                    step4 = attempt._1;
                    fail3 = attempt._2;
                    break;
                }
              }
              break;
            case COMPLETED:
              for (var k in joins) {
                if (joins.hasOwnProperty(k)) {
                  rethrow = rethrow && joins[k].rethrow;
                  runEff(joins[k].handler(step4));
                }
              }
              joins = null;
              if (interrupt && fail3) {
                setTimeout(function() {
                  throw util.fromLeft(fail3);
                }, 0);
              } else if (util.isLeft(step4) && rethrow) {
                setTimeout(function() {
                  if (rethrow) {
                    throw util.fromLeft(step4);
                  }
                }, 0);
              }
              return;
            case SUSPENDED:
              status = CONTINUE;
              break;
            case PENDING:
              return;
          }
        }
      }
      function onComplete(join4) {
        return function() {
          if (status === COMPLETED) {
            rethrow = rethrow && join4.rethrow;
            join4.handler(step4)();
            return function() {
            };
          }
          var jid = joinId++;
          joins = joins || {};
          joins[jid] = join4;
          return function() {
            if (joins !== null) {
              delete joins[jid];
            }
          };
        };
      }
      function kill2(error4, cb) {
        return function() {
          if (status === COMPLETED) {
            cb(util.right(void 0))();
            return function() {
            };
          }
          var canceler = onComplete({
            rethrow: false,
            handler: function() {
              return cb(util.right(void 0));
            }
          })();
          switch (status) {
            case SUSPENDED:
              interrupt = util.left(error4);
              status = COMPLETED;
              step4 = interrupt;
              run3(runTick);
              break;
            case PENDING:
              if (interrupt === null) {
                interrupt = util.left(error4);
              }
              if (bracketCount === 0) {
                if (status === PENDING) {
                  attempts = new Aff2(CONS, new Aff2(FINALIZER, step4(error4)), attempts, interrupt);
                }
                status = RETURN;
                step4 = null;
                fail3 = null;
                run3(++runTick);
              }
              break;
            default:
              if (interrupt === null) {
                interrupt = util.left(error4);
              }
              if (bracketCount === 0) {
                status = RETURN;
                step4 = null;
                fail3 = null;
              }
          }
          return canceler;
        };
      }
      function join3(cb) {
        return function() {
          var canceler = onComplete({
            rethrow: false,
            handler: cb
          })();
          if (status === SUSPENDED) {
            run3(runTick);
          }
          return canceler;
        };
      }
      return {
        kill: kill2,
        join: join3,
        onComplete,
        isSuspended: function() {
          return status === SUSPENDED;
        },
        run: function() {
          if (status === SUSPENDED) {
            if (!Scheduler.isDraining()) {
              Scheduler.enqueue(function() {
                run3(runTick);
              });
            } else {
              run3(runTick);
            }
          }
        }
      };
    }
    function runPar(util, supervisor, par, cb) {
      var fiberId = 0;
      var fibers = {};
      var killId = 0;
      var kills = {};
      var early = new Error("[ParAff] Early exit");
      var interrupt = null;
      var root = EMPTY;
      function kill2(error4, par2, cb2) {
        var step4 = par2;
        var head4 = null;
        var tail = null;
        var count = 0;
        var kills2 = {};
        var tmp, kid;
        loop:
          while (true) {
            tmp = null;
            switch (step4.tag) {
              case FORKED:
                if (step4._3 === EMPTY) {
                  tmp = fibers[step4._1];
                  kills2[count++] = tmp.kill(error4, function(result) {
                    return function() {
                      count--;
                      if (count === 0) {
                        cb2(result)();
                      }
                    };
                  });
                }
                if (head4 === null) {
                  break loop;
                }
                step4 = head4._2;
                if (tail === null) {
                  head4 = null;
                } else {
                  head4 = tail._1;
                  tail = tail._2;
                }
                break;
              case MAP:
                step4 = step4._2;
                break;
              case APPLY:
              case ALT:
                if (head4) {
                  tail = new Aff2(CONS, head4, tail);
                }
                head4 = step4;
                step4 = step4._1;
                break;
            }
          }
        if (count === 0) {
          cb2(util.right(void 0))();
        } else {
          kid = 0;
          tmp = count;
          for (; kid < tmp; kid++) {
            kills2[kid] = kills2[kid]();
          }
        }
        return kills2;
      }
      function join3(result, head4, tail) {
        var fail3, step4, lhs, rhs, tmp, kid;
        if (util.isLeft(result)) {
          fail3 = result;
          step4 = null;
        } else {
          step4 = result;
          fail3 = null;
        }
        loop:
          while (true) {
            lhs = null;
            rhs = null;
            tmp = null;
            kid = null;
            if (interrupt !== null) {
              return;
            }
            if (head4 === null) {
              cb(fail3 || step4)();
              return;
            }
            if (head4._3 !== EMPTY) {
              return;
            }
            switch (head4.tag) {
              case MAP:
                if (fail3 === null) {
                  head4._3 = util.right(head4._1(util.fromRight(step4)));
                  step4 = head4._3;
                } else {
                  head4._3 = fail3;
                }
                break;
              case APPLY:
                lhs = head4._1._3;
                rhs = head4._2._3;
                if (fail3) {
                  head4._3 = fail3;
                  tmp = true;
                  kid = killId++;
                  kills[kid] = kill2(early, fail3 === lhs ? head4._2 : head4._1, function() {
                    return function() {
                      delete kills[kid];
                      if (tmp) {
                        tmp = false;
                      } else if (tail === null) {
                        join3(fail3, null, null);
                      } else {
                        join3(fail3, tail._1, tail._2);
                      }
                    };
                  });
                  if (tmp) {
                    tmp = false;
                    return;
                  }
                } else if (lhs === EMPTY || rhs === EMPTY) {
                  return;
                } else {
                  step4 = util.right(util.fromRight(lhs)(util.fromRight(rhs)));
                  head4._3 = step4;
                }
                break;
              case ALT:
                lhs = head4._1._3;
                rhs = head4._2._3;
                if (lhs === EMPTY && util.isLeft(rhs) || rhs === EMPTY && util.isLeft(lhs)) {
                  return;
                }
                if (lhs !== EMPTY && util.isLeft(lhs) && rhs !== EMPTY && util.isLeft(rhs)) {
                  fail3 = step4 === lhs ? rhs : lhs;
                  step4 = null;
                  head4._3 = fail3;
                } else {
                  head4._3 = step4;
                  tmp = true;
                  kid = killId++;
                  kills[kid] = kill2(early, step4 === lhs ? head4._2 : head4._1, function() {
                    return function() {
                      delete kills[kid];
                      if (tmp) {
                        tmp = false;
                      } else if (tail === null) {
                        join3(step4, null, null);
                      } else {
                        join3(step4, tail._1, tail._2);
                      }
                    };
                  });
                  if (tmp) {
                    tmp = false;
                    return;
                  }
                }
                break;
            }
            if (tail === null) {
              head4 = null;
            } else {
              head4 = tail._1;
              tail = tail._2;
            }
          }
      }
      function resolve(fiber) {
        return function(result) {
          return function() {
            delete fibers[fiber._1];
            fiber._3 = result;
            join3(result, fiber._2._1, fiber._2._2);
          };
        };
      }
      function run3() {
        var status = CONTINUE;
        var step4 = par;
        var head4 = null;
        var tail = null;
        var tmp, fid;
        loop:
          while (true) {
            tmp = null;
            fid = null;
            switch (status) {
              case CONTINUE:
                switch (step4.tag) {
                  case MAP:
                    if (head4) {
                      tail = new Aff2(CONS, head4, tail);
                    }
                    head4 = new Aff2(MAP, step4._1, EMPTY, EMPTY);
                    step4 = step4._2;
                    break;
                  case APPLY:
                    if (head4) {
                      tail = new Aff2(CONS, head4, tail);
                    }
                    head4 = new Aff2(APPLY, EMPTY, step4._2, EMPTY);
                    step4 = step4._1;
                    break;
                  case ALT:
                    if (head4) {
                      tail = new Aff2(CONS, head4, tail);
                    }
                    head4 = new Aff2(ALT, EMPTY, step4._2, EMPTY);
                    step4 = step4._1;
                    break;
                  default:
                    fid = fiberId++;
                    status = RETURN;
                    tmp = step4;
                    step4 = new Aff2(FORKED, fid, new Aff2(CONS, head4, tail), EMPTY);
                    tmp = Fiber(util, supervisor, tmp);
                    tmp.onComplete({
                      rethrow: false,
                      handler: resolve(step4)
                    })();
                    fibers[fid] = tmp;
                    if (supervisor) {
                      supervisor.register(tmp);
                    }
                }
                break;
              case RETURN:
                if (head4 === null) {
                  break loop;
                }
                if (head4._1 === EMPTY) {
                  head4._1 = step4;
                  status = CONTINUE;
                  step4 = head4._2;
                  head4._2 = EMPTY;
                } else {
                  head4._2 = step4;
                  step4 = head4;
                  if (tail === null) {
                    head4 = null;
                  } else {
                    head4 = tail._1;
                    tail = tail._2;
                  }
                }
            }
          }
        root = step4;
        for (fid = 0; fid < fiberId; fid++) {
          fibers[fid].run();
        }
      }
      function cancel(error4, cb2) {
        interrupt = util.left(error4);
        var innerKills;
        for (var kid in kills) {
          if (kills.hasOwnProperty(kid)) {
            innerKills = kills[kid];
            for (kid in innerKills) {
              if (innerKills.hasOwnProperty(kid)) {
                innerKills[kid]();
              }
            }
          }
        }
        kills = null;
        var newKills = kill2(error4, root, cb2);
        return function(killError) {
          return new Aff2(ASYNC, function(killCb) {
            return function() {
              for (var kid2 in newKills) {
                if (newKills.hasOwnProperty(kid2)) {
                  newKills[kid2]();
                }
              }
              return nonCanceler2;
            };
          });
        };
      }
      run3();
      return function(killError) {
        return new Aff2(ASYNC, function(killCb) {
          return function() {
            return cancel(killError, killCb);
          };
        });
      };
    }
    function sequential3(util, supervisor, par) {
      return new Aff2(ASYNC, function(cb) {
        return function() {
          return runPar(util, supervisor, par, cb);
        };
      });
    }
    Aff2.EMPTY = EMPTY;
    Aff2.Pure = AffCtr(PURE);
    Aff2.Throw = AffCtr(THROW);
    Aff2.Catch = AffCtr(CATCH);
    Aff2.Sync = AffCtr(SYNC);
    Aff2.Async = AffCtr(ASYNC);
    Aff2.Bind = AffCtr(BIND);
    Aff2.Bracket = AffCtr(BRACKET);
    Aff2.Fork = AffCtr(FORK);
    Aff2.Seq = AffCtr(SEQ);
    Aff2.ParMap = AffCtr(MAP);
    Aff2.ParApply = AffCtr(APPLY);
    Aff2.ParAlt = AffCtr(ALT);
    Aff2.Fiber = Fiber;
    Aff2.Supervisor = Supervisor;
    Aff2.Scheduler = Scheduler;
    Aff2.nonCanceler = nonCanceler2;
    return Aff2;
  }();
  var _pure = Aff.Pure;
  var _throwError = Aff.Throw;
  function _catchError(aff) {
    return function(k) {
      return Aff.Catch(aff, k);
    };
  }
  function _map(f) {
    return function(aff) {
      if (aff.tag === Aff.Pure.tag) {
        return Aff.Pure(f(aff._1));
      } else {
        return Aff.Bind(aff, function(value13) {
          return Aff.Pure(f(value13));
        });
      }
    };
  }
  function _bind(aff) {
    return function(k) {
      return Aff.Bind(aff, k);
    };
  }
  function _fork(immediate) {
    return function(aff) {
      return Aff.Fork(immediate, aff);
    };
  }
  var _liftEffect = Aff.Sync;
  function _parAffMap(f) {
    return function(aff) {
      return Aff.ParMap(f, aff);
    };
  }
  function _parAffApply(aff1) {
    return function(aff2) {
      return Aff.ParApply(aff1, aff2);
    };
  }
  var makeAff = Aff.Async;
  function generalBracket(acquire) {
    return function(options2) {
      return function(k) {
        return Aff.Bracket(acquire, options2, k);
      };
    };
  }
  function _makeFiber(util, aff) {
    return function() {
      return Aff.Fiber(util, null, aff);
    };
  }
  var _delay = function() {
    function setDelay(n, k) {
      if (n === 0 && typeof setImmediate !== "undefined") {
        return setImmediate(k);
      } else {
        return setTimeout(k, n);
      }
    }
    function clearDelay(n, t) {
      if (n === 0 && typeof clearImmediate !== "undefined") {
        return clearImmediate(t);
      } else {
        return clearTimeout(t);
      }
    }
    return function(right, ms) {
      return Aff.Async(function(cb) {
        return function() {
          var timer = setDelay(ms, cb(right()));
          return function() {
            return Aff.Sync(function() {
              return right(clearDelay(ms, timer));
            });
          };
        };
      });
    };
  }();
  var _sequential = Aff.Seq;

  // output/Control.Parallel.Class/index.js
  var sequential = function(dict) {
    return dict.sequential;
  };
  var parallel = function(dict) {
    return dict.parallel;
  };

  // output/Control.Parallel/index.js
  var identity6 = /* @__PURE__ */ identity(categoryFn);
  var parTraverse_ = function(dictParallel) {
    var sequential3 = sequential(dictParallel);
    var traverse_7 = traverse_(dictParallel.Applicative1());
    var parallel3 = parallel(dictParallel);
    return function(dictFoldable) {
      var traverse_14 = traverse_7(dictFoldable);
      return function(f) {
        var $48 = traverse_14(function($50) {
          return parallel3(f($50));
        });
        return function($49) {
          return sequential3($48($49));
        };
      };
    };
  };
  var parSequence_ = function(dictParallel) {
    var parTraverse_1 = parTraverse_(dictParallel);
    return function(dictFoldable) {
      return parTraverse_1(dictFoldable)(identity6);
    };
  };

  // output/Effect.Unsafe/foreign.js
  var unsafePerformEffect = function(f) {
    return f();
  };

  // output/Effect.Aff/index.js
  var $runtime_lazy2 = function(name16, moduleName, init2) {
    var state3 = 0;
    var val;
    return function(lineNumber) {
      if (state3 === 2)
        return val;
      if (state3 === 1)
        throw new ReferenceError(name16 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
      state3 = 1;
      val = init2();
      state3 = 2;
      return val;
    };
  };
  var pure2 = /* @__PURE__ */ pure(applicativeEffect);
  var $$void3 = /* @__PURE__ */ $$void(functorEffect);
  var map6 = /* @__PURE__ */ map(functorEffect);
  var Canceler = function(x) {
    return x;
  };
  var suspendAff = /* @__PURE__ */ _fork(false);
  var functorParAff = {
    map: _parAffMap
  };
  var functorAff = {
    map: _map
  };
  var map1 = /* @__PURE__ */ map(functorAff);
  var forkAff = /* @__PURE__ */ _fork(true);
  var ffiUtil = /* @__PURE__ */ function() {
    var unsafeFromRight = function(v) {
      if (v instanceof Right) {
        return v.value0;
      }
      ;
      if (v instanceof Left) {
        return unsafeCrashWith("unsafeFromRight: Left");
      }
      ;
      throw new Error("Failed pattern match at Effect.Aff (line 412, column 21 - line 414, column 54): " + [v.constructor.name]);
    };
    var unsafeFromLeft = function(v) {
      if (v instanceof Left) {
        return v.value0;
      }
      ;
      if (v instanceof Right) {
        return unsafeCrashWith("unsafeFromLeft: Right");
      }
      ;
      throw new Error("Failed pattern match at Effect.Aff (line 407, column 20 - line 409, column 55): " + [v.constructor.name]);
    };
    var isLeft = function(v) {
      if (v instanceof Left) {
        return true;
      }
      ;
      if (v instanceof Right) {
        return false;
      }
      ;
      throw new Error("Failed pattern match at Effect.Aff (line 402, column 12 - line 404, column 21): " + [v.constructor.name]);
    };
    return {
      isLeft,
      fromLeft: unsafeFromLeft,
      fromRight: unsafeFromRight,
      left: Left.create,
      right: Right.create
    };
  }();
  var makeFiber = function(aff) {
    return _makeFiber(ffiUtil, aff);
  };
  var launchAff = function(aff) {
    return function __do2() {
      var fiber = makeFiber(aff)();
      fiber.run();
      return fiber;
    };
  };
  var bracket = function(acquire) {
    return function(completed) {
      return generalBracket(acquire)({
        killed: $$const(completed),
        failed: $$const(completed),
        completed: $$const(completed)
      });
    };
  };
  var applyParAff = {
    apply: _parAffApply,
    Functor0: function() {
      return functorParAff;
    }
  };
  var monadAff = {
    Applicative0: function() {
      return applicativeAff;
    },
    Bind1: function() {
      return bindAff;
    }
  };
  var bindAff = {
    bind: _bind,
    Apply0: function() {
      return $lazy_applyAff(0);
    }
  };
  var applicativeAff = {
    pure: _pure,
    Apply0: function() {
      return $lazy_applyAff(0);
    }
  };
  var $lazy_applyAff = /* @__PURE__ */ $runtime_lazy2("applyAff", "Effect.Aff", function() {
    return {
      apply: ap(monadAff),
      Functor0: function() {
        return functorAff;
      }
    };
  });
  var pure22 = /* @__PURE__ */ pure(applicativeAff);
  var bind1 = /* @__PURE__ */ bind(bindAff);
  var bindFlipped3 = /* @__PURE__ */ bindFlipped(bindAff);
  var $$finally = function(fin) {
    return function(a2) {
      return bracket(pure22(unit))($$const(fin))($$const(a2));
    };
  };
  var monadEffectAff = {
    liftEffect: _liftEffect,
    Monad0: function() {
      return monadAff;
    }
  };
  var liftEffect2 = /* @__PURE__ */ liftEffect(monadEffectAff);
  var effectCanceler = function($75) {
    return Canceler($$const(liftEffect2($75)));
  };
  var joinFiber = function(v) {
    return makeAff(function(k) {
      return map6(effectCanceler)(v.join(k));
    });
  };
  var functorFiber = {
    map: function(f) {
      return function(t) {
        return unsafePerformEffect(makeFiber(map1(f)(joinFiber(t))));
      };
    }
  };
  var killFiber = function(e) {
    return function(v) {
      return bind1(liftEffect2(v.isSuspended))(function(suspended) {
        if (suspended) {
          return liftEffect2($$void3(v.kill(e, $$const(pure2(unit)))));
        }
        ;
        return makeAff(function(k) {
          return map6(effectCanceler)(v.kill(e, k));
        });
      });
    };
  };
  var monadThrowAff = {
    throwError: _throwError,
    Monad0: function() {
      return monadAff;
    }
  };
  var monadErrorAff = {
    catchError: _catchError,
    MonadThrow0: function() {
      return monadThrowAff;
    }
  };
  var $$try2 = /* @__PURE__ */ $$try(monadErrorAff);
  var runAff = function(k) {
    return function(aff) {
      return launchAff(bindFlipped3(function($80) {
        return liftEffect2(k($80));
      })($$try2(aff)));
    };
  };
  var runAff_ = function(k) {
    return function(aff) {
      return $$void3(runAff(k)(aff));
    };
  };
  var parallelAff = {
    parallel: unsafeCoerce2,
    sequential: _sequential,
    Monad0: function() {
      return monadAff;
    },
    Applicative1: function() {
      return $lazy_applicativeParAff(0);
    }
  };
  var $lazy_applicativeParAff = /* @__PURE__ */ $runtime_lazy2("applicativeParAff", "Effect.Aff", function() {
    return {
      pure: function() {
        var $82 = parallel(parallelAff);
        return function($83) {
          return $82(pure22($83));
        };
      }(),
      Apply0: function() {
        return applyParAff;
      }
    };
  });
  var applicativeParAff = /* @__PURE__ */ $lazy_applicativeParAff(136);
  var monadRecAff = {
    tailRecM: function(k) {
      var go2 = function(a2) {
        return bind1(k(a2))(function(res) {
          if (res instanceof Done) {
            return pure22(res.value0);
          }
          ;
          if (res instanceof Loop) {
            return go2(res.value0);
          }
          ;
          throw new Error("Failed pattern match at Effect.Aff (line 104, column 7 - line 106, column 23): " + [res.constructor.name]);
        });
      };
      return go2;
    },
    Monad0: function() {
      return monadAff;
    }
  };
  var nonCanceler = /* @__PURE__ */ $$const(/* @__PURE__ */ pure22(unit));

  // output/Effect.Aff.Compat/index.js
  var fromEffectFnAff = function(v) {
    return makeAff(function(k) {
      return function __do2() {
        var v1 = v(function($9) {
          return k(Left.create($9))();
        }, function($10) {
          return k(Right.create($10))();
        });
        return function(e) {
          return makeAff(function(k2) {
            return function __do3() {
              v1(e, function($11) {
                return k2(Left.create($11))();
              }, function($12) {
                return k2(Right.create($12))();
              });
              return nonCanceler;
            };
          });
        };
      };
    });
  };

  // output/Foreign/foreign.js
  function typeOf(value13) {
    return typeof value13;
  }
  function tagOf(value13) {
    return Object.prototype.toString.call(value13).slice(8, -1);
  }
  var isArray = Array.isArray || function(value13) {
    return Object.prototype.toString.call(value13) === "[object Array]";
  };

  // output/Data.Int/foreign.js
  var fromStringAsImpl = function(just) {
    return function(nothing) {
      return function(radix) {
        var digits;
        if (radix < 11) {
          digits = "[0-" + (radix - 1).toString() + "]";
        } else if (radix === 11) {
          digits = "[0-9a]";
        } else {
          digits = "[0-9a-" + String.fromCharCode(86 + radix) + "]";
        }
        var pattern2 = new RegExp("^[\\+\\-]?" + digits + "+$", "i");
        return function(s) {
          if (pattern2.test(s)) {
            var i2 = parseInt(s, radix);
            return (i2 | 0) === i2 ? just(i2) : nothing;
          } else {
            return nothing;
          }
        };
      };
    };
  };
  var toStringAs = function(radix) {
    return function(i2) {
      return i2.toString(radix);
    };
  };

  // output/Data.Int/index.js
  var fromStringAs = /* @__PURE__ */ function() {
    return fromStringAsImpl(Just.create)(Nothing.value);
  }();
  var fromString = /* @__PURE__ */ fromStringAs(10);
  var decimal = 10;

  // output/Data.String.CodeUnits/foreign.js
  var length3 = function(s) {
    return s.length;
  };
  var drop2 = function(n) {
    return function(s) {
      return s.substring(n);
    };
  };

  // output/Data.String.Unsafe/foreign.js
  var charAt = function(i2) {
    return function(s) {
      if (i2 >= 0 && i2 < s.length)
        return s.charAt(i2);
      throw new Error("Data.String.Unsafe.charAt: Invalid index.");
    };
  };

  // output/Foreign/index.js
  var show2 = /* @__PURE__ */ show(showString);
  var show1 = /* @__PURE__ */ show(showInt);
  var ForeignError = /* @__PURE__ */ function() {
    function ForeignError2(value0) {
      this.value0 = value0;
    }
    ;
    ForeignError2.create = function(value0) {
      return new ForeignError2(value0);
    };
    return ForeignError2;
  }();
  var TypeMismatch = /* @__PURE__ */ function() {
    function TypeMismatch2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    TypeMismatch2.create = function(value0) {
      return function(value1) {
        return new TypeMismatch2(value0, value1);
      };
    };
    return TypeMismatch2;
  }();
  var ErrorAtIndex = /* @__PURE__ */ function() {
    function ErrorAtIndex2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    ErrorAtIndex2.create = function(value0) {
      return function(value1) {
        return new ErrorAtIndex2(value0, value1);
      };
    };
    return ErrorAtIndex2;
  }();
  var ErrorAtProperty = /* @__PURE__ */ function() {
    function ErrorAtProperty2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    ErrorAtProperty2.create = function(value0) {
      return function(value1) {
        return new ErrorAtProperty2(value0, value1);
      };
    };
    return ErrorAtProperty2;
  }();
  var unsafeToForeign = unsafeCoerce2;
  var unsafeFromForeign = unsafeCoerce2;
  var renderForeignError = function(v) {
    if (v instanceof ForeignError) {
      return v.value0;
    }
    ;
    if (v instanceof ErrorAtIndex) {
      return "Error at array index " + (show1(v.value0) + (": " + renderForeignError(v.value1)));
    }
    ;
    if (v instanceof ErrorAtProperty) {
      return "Error at property " + (show2(v.value0) + (": " + renderForeignError(v.value1)));
    }
    ;
    if (v instanceof TypeMismatch) {
      return "Type mismatch: expected " + (v.value0 + (", found " + v.value1));
    }
    ;
    throw new Error("Failed pattern match at Foreign (line 78, column 1 - line 78, column 45): " + [v.constructor.name]);
  };
  var fail = function(dictMonad) {
    var $153 = throwError(monadThrowExceptT(dictMonad));
    return function($154) {
      return $153(singleton4($154));
    };
  };
  var unsafeReadTagged = function(dictMonad) {
    var pure14 = pure(applicativeExceptT(dictMonad));
    var fail1 = fail(dictMonad);
    return function(tag) {
      return function(value13) {
        if (tagOf(value13) === tag) {
          return pure14(unsafeFromForeign(value13));
        }
        ;
        if (otherwise) {
          return fail1(new TypeMismatch(tag, tagOf(value13)));
        }
        ;
        throw new Error("Failed pattern match at Foreign (line 123, column 1 - line 123, column 104): " + [tag.constructor.name, value13.constructor.name]);
      };
    };
  };

  // output/Affjax/index.js
  var pure3 = /* @__PURE__ */ pure(/* @__PURE__ */ applicativeExceptT(monadIdentity));
  var fail2 = /* @__PURE__ */ fail(monadIdentity);
  var unsafeReadTagged2 = /* @__PURE__ */ unsafeReadTagged(monadIdentity);
  var alt2 = /* @__PURE__ */ alt(/* @__PURE__ */ altExceptT(semigroupNonEmptyList)(monadIdentity));
  var composeKleisliFlipped2 = /* @__PURE__ */ composeKleisliFlipped(/* @__PURE__ */ bindExceptT(monadIdentity));
  var map7 = /* @__PURE__ */ map(functorMaybe);
  var any3 = /* @__PURE__ */ any(foldableArray)(heytingAlgebraBoolean);
  var eq2 = /* @__PURE__ */ eq(eqString);
  var bindFlipped4 = /* @__PURE__ */ bindFlipped(bindMaybe);
  var map12 = /* @__PURE__ */ map(functorArray);
  var mapFlipped2 = /* @__PURE__ */ mapFlipped(functorAff);
  var $$try3 = /* @__PURE__ */ $$try(monadErrorAff);
  var pure1 = /* @__PURE__ */ pure(applicativeAff);
  var RequestContentError = /* @__PURE__ */ function() {
    function RequestContentError2(value0) {
      this.value0 = value0;
    }
    ;
    RequestContentError2.create = function(value0) {
      return new RequestContentError2(value0);
    };
    return RequestContentError2;
  }();
  var ResponseBodyError = /* @__PURE__ */ function() {
    function ResponseBodyError2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    ResponseBodyError2.create = function(value0) {
      return function(value1) {
        return new ResponseBodyError2(value0, value1);
      };
    };
    return ResponseBodyError2;
  }();
  var TimeoutError = /* @__PURE__ */ function() {
    function TimeoutError2() {
    }
    ;
    TimeoutError2.value = new TimeoutError2();
    return TimeoutError2;
  }();
  var RequestFailedError = /* @__PURE__ */ function() {
    function RequestFailedError2() {
    }
    ;
    RequestFailedError2.value = new RequestFailedError2();
    return RequestFailedError2;
  }();
  var XHROtherError = /* @__PURE__ */ function() {
    function XHROtherError2(value0) {
      this.value0 = value0;
    }
    ;
    XHROtherError2.create = function(value0) {
      return new XHROtherError2(value0);
    };
    return XHROtherError2;
  }();
  var request = function(driver2) {
    return function(req) {
      var parseJSON = function(v2) {
        if (v2 === "") {
          return pure3(jsonEmptyObject);
        }
        ;
        return either(function($74) {
          return fail2(ForeignError.create($74));
        })(pure3)(jsonParser(v2));
      };
      var fromResponse = function() {
        if (req.responseFormat instanceof $$ArrayBuffer) {
          return unsafeReadTagged2("ArrayBuffer");
        }
        ;
        if (req.responseFormat instanceof Blob2) {
          return unsafeReadTagged2("Blob");
        }
        ;
        if (req.responseFormat instanceof Document2) {
          return function(x) {
            return alt2(unsafeReadTagged2("Document")(x))(alt2(unsafeReadTagged2("XMLDocument")(x))(unsafeReadTagged2("HTMLDocument")(x)));
          };
        }
        ;
        if (req.responseFormat instanceof Json2) {
          return composeKleisliFlipped2(function($75) {
            return req.responseFormat.value0(parseJSON($75));
          })(unsafeReadTagged2("String"));
        }
        ;
        if (req.responseFormat instanceof $$String2) {
          return unsafeReadTagged2("String");
        }
        ;
        if (req.responseFormat instanceof Ignore) {
          return $$const(req.responseFormat.value0(pure3(unit)));
        }
        ;
        throw new Error("Failed pattern match at Affjax (line 274, column 18 - line 283, column 57): " + [req.responseFormat.constructor.name]);
      }();
      var extractContent = function(v2) {
        if (v2 instanceof ArrayView) {
          return new Right(v2.value0(unsafeToForeign));
        }
        ;
        if (v2 instanceof Blob) {
          return new Right(unsafeToForeign(v2.value0));
        }
        ;
        if (v2 instanceof Document) {
          return new Right(unsafeToForeign(v2.value0));
        }
        ;
        if (v2 instanceof $$String) {
          return new Right(unsafeToForeign(v2.value0));
        }
        ;
        if (v2 instanceof FormData) {
          return new Right(unsafeToForeign(v2.value0));
        }
        ;
        if (v2 instanceof FormURLEncoded) {
          return note("Body contains values that cannot be encoded as application/x-www-form-urlencoded")(map7(unsafeToForeign)(encode(v2.value0)));
        }
        ;
        if (v2 instanceof Json) {
          return new Right(unsafeToForeign(stringify(v2.value0)));
        }
        ;
        throw new Error("Failed pattern match at Affjax (line 235, column 20 - line 250, column 69): " + [v2.constructor.name]);
      };
      var addHeader = function(mh) {
        return function(hs) {
          if (mh instanceof Just && !any3(on(eq2)(name)(mh.value0))(hs)) {
            return snoc(hs)(mh.value0);
          }
          ;
          return hs;
        };
      };
      var headers = function(reqContent) {
        return addHeader(map7(ContentType.create)(bindFlipped4(toMediaType)(reqContent)))(addHeader(map7(Accept.create)(toMediaType2(req.responseFormat)))(req.headers));
      };
      var ajaxRequest = function(v2) {
        return {
          method: print(req.method),
          url: req.url,
          headers: map12(function(h) {
            return {
              field: name(h),
              value: value(h)
            };
          })(headers(req.content)),
          content: v2,
          responseType: toResponseType(req.responseFormat),
          username: toNullable(req.username),
          password: toNullable(req.password),
          withCredentials: req.withCredentials,
          timeout: fromMaybe(0)(map7(function(v1) {
            return v1;
          })(req.timeout))
        };
      };
      var send = function(content3) {
        return mapFlipped2($$try3(fromEffectFnAff(_ajax(driver2, "AffjaxTimeoutErrorMessageIdent", "AffjaxRequestFailedMessageIdent", ResponseHeader.create, ajaxRequest(content3)))))(function(v2) {
          if (v2 instanceof Right) {
            var v1 = runExcept(fromResponse(v2.value0.body));
            if (v1 instanceof Left) {
              return new Left(new ResponseBodyError(head(v1.value0), v2.value0));
            }
            ;
            if (v1 instanceof Right) {
              return new Right({
                body: v1.value0,
                headers: v2.value0.headers,
                status: v2.value0.status,
                statusText: v2.value0.statusText
              });
            }
            ;
            throw new Error("Failed pattern match at Affjax (line 209, column 9 - line 211, column 52): " + [v1.constructor.name]);
          }
          ;
          if (v2 instanceof Left) {
            return new Left(function() {
              var message2 = message(v2.value0);
              var $61 = message2 === "AffjaxTimeoutErrorMessageIdent";
              if ($61) {
                return TimeoutError.value;
              }
              ;
              var $62 = message2 === "AffjaxRequestFailedMessageIdent";
              if ($62) {
                return RequestFailedError.value;
              }
              ;
              return new XHROtherError(v2.value0);
            }());
          }
          ;
          throw new Error("Failed pattern match at Affjax (line 207, column 144 - line 219, column 28): " + [v2.constructor.name]);
        });
      };
      if (req.content instanceof Nothing) {
        return send(toNullable(Nothing.value));
      }
      ;
      if (req.content instanceof Just) {
        var v = extractContent(req.content.value0);
        if (v instanceof Right) {
          return send(toNullable(new Just(v.value0)));
        }
        ;
        if (v instanceof Left) {
          return pure1(new Left(new RequestContentError(v.value0)));
        }
        ;
        throw new Error("Failed pattern match at Affjax (line 199, column 7 - line 203, column 48): " + [v.constructor.name]);
      }
      ;
      throw new Error("Failed pattern match at Affjax (line 195, column 3 - line 203, column 48): " + [req.content.constructor.name]);
    };
  };
  var printError = function(v) {
    if (v instanceof RequestContentError) {
      return "There was a problem with the request content: " + v.value0;
    }
    ;
    if (v instanceof ResponseBodyError) {
      return "There was a problem with the response body: " + renderForeignError(v.value0);
    }
    ;
    if (v instanceof TimeoutError) {
      return "There was a problem making the request: timeout";
    }
    ;
    if (v instanceof RequestFailedError) {
      return "There was a problem making the request: request failed";
    }
    ;
    if (v instanceof XHROtherError) {
      return "There was a problem making the request: " + message(v.value0);
    }
    ;
    throw new Error("Failed pattern match at Affjax (line 113, column 14 - line 123, column 66): " + [v.constructor.name]);
  };
  var defaultRequest = /* @__PURE__ */ function() {
    return {
      method: new Left(GET.value),
      url: "/",
      headers: [],
      content: Nothing.value,
      username: Nothing.value,
      password: Nothing.value,
      withCredentials: false,
      responseFormat: ignore,
      timeout: Nothing.value
    };
  }();
  var get = function(driver2) {
    return function(rf) {
      return function(u2) {
        return request(driver2)({
          method: defaultRequest.method,
          url: u2,
          headers: defaultRequest.headers,
          content: defaultRequest.content,
          username: defaultRequest.username,
          password: defaultRequest.password,
          withCredentials: defaultRequest.withCredentials,
          responseFormat: rf,
          timeout: defaultRequest.timeout
        });
      };
    };
  };

  // output/Affjax.Web/foreign.js
  var driver = {
    newXHR: function() {
      return new XMLHttpRequest();
    },
    fixupUrl: function(url) {
      return url || "/";
    }
  };

  // output/Affjax.Web/index.js
  var get2 = /* @__PURE__ */ get(driver);

  // output/DOM.HTML.Indexed.ButtonType/index.js
  var ButtonButton = /* @__PURE__ */ function() {
    function ButtonButton2() {
    }
    ;
    ButtonButton2.value = new ButtonButton2();
    return ButtonButton2;
  }();
  var ButtonSubmit = /* @__PURE__ */ function() {
    function ButtonSubmit2() {
    }
    ;
    ButtonSubmit2.value = new ButtonSubmit2();
    return ButtonSubmit2;
  }();
  var ButtonReset = /* @__PURE__ */ function() {
    function ButtonReset2() {
    }
    ;
    ButtonReset2.value = new ButtonReset2();
    return ButtonReset2;
  }();
  var renderButtonType = function(v) {
    if (v instanceof ButtonButton) {
      return "button";
    }
    ;
    if (v instanceof ButtonSubmit) {
      return "submit";
    }
    ;
    if (v instanceof ButtonReset) {
      return "reset";
    }
    ;
    throw new Error("Failed pattern match at DOM.HTML.Indexed.ButtonType (line 14, column 20 - line 17, column 25): " + [v.constructor.name]);
  };

  // output/Data.String.CodePoints/foreign.js
  var hasArrayFrom = typeof Array.from === "function";
  var hasStringIterator = typeof Symbol !== "undefined" && Symbol != null && typeof Symbol.iterator !== "undefined" && typeof String.prototype[Symbol.iterator] === "function";
  var hasFromCodePoint = typeof String.prototype.fromCodePoint === "function";
  var hasCodePointAt = typeof String.prototype.codePointAt === "function";
  var _unsafeCodePointAt0 = function(fallback) {
    return hasCodePointAt ? function(str) {
      return str.codePointAt(0);
    } : fallback;
  };
  var _toCodePointArray = function(fallback) {
    return function(unsafeCodePointAt02) {
      if (hasArrayFrom) {
        return function(str) {
          return Array.from(str, unsafeCodePointAt02);
        };
      }
      return fallback;
    };
  };

  // output/Data.Enum/foreign.js
  function toCharCode(c) {
    return c.charCodeAt(0);
  }
  function fromCharCode(c) {
    return String.fromCharCode(c);
  }

  // output/Data.Enum/index.js
  var bottom1 = /* @__PURE__ */ bottom(boundedChar);
  var top1 = /* @__PURE__ */ top(boundedChar);
  var fromEnum = function(dict) {
    return dict.fromEnum;
  };
  var defaultSucc = function(toEnum$prime) {
    return function(fromEnum$prime) {
      return function(a2) {
        return toEnum$prime(fromEnum$prime(a2) + 1 | 0);
      };
    };
  };
  var defaultPred = function(toEnum$prime) {
    return function(fromEnum$prime) {
      return function(a2) {
        return toEnum$prime(fromEnum$prime(a2) - 1 | 0);
      };
    };
  };
  var charToEnum = function(v) {
    if (v >= toCharCode(bottom1) && v <= toCharCode(top1)) {
      return new Just(fromCharCode(v));
    }
    ;
    return Nothing.value;
  };
  var enumChar = {
    succ: /* @__PURE__ */ defaultSucc(charToEnum)(toCharCode),
    pred: /* @__PURE__ */ defaultPred(charToEnum)(toCharCode),
    Ord0: function() {
      return ordChar;
    }
  };
  var boundedEnumChar = /* @__PURE__ */ function() {
    return {
      cardinality: toCharCode(top1) - toCharCode(bottom1) | 0,
      toEnum: charToEnum,
      fromEnum: toCharCode,
      Bounded0: function() {
        return boundedChar;
      },
      Enum1: function() {
        return enumChar;
      }
    };
  }();

  // output/Data.String.CodePoints/index.js
  var fromEnum2 = /* @__PURE__ */ fromEnum(boundedEnumChar);
  var map8 = /* @__PURE__ */ map(functorMaybe);
  var unfoldr2 = /* @__PURE__ */ unfoldr(unfoldableArray);
  var unsurrogate = function(lead) {
    return function(trail) {
      return (((lead - 55296 | 0) * 1024 | 0) + (trail - 56320 | 0) | 0) + 65536 | 0;
    };
  };
  var isTrail = function(cu) {
    return 56320 <= cu && cu <= 57343;
  };
  var isLead = function(cu) {
    return 55296 <= cu && cu <= 56319;
  };
  var uncons2 = function(s) {
    var v = length3(s);
    if (v === 0) {
      return Nothing.value;
    }
    ;
    if (v === 1) {
      return new Just({
        head: fromEnum2(charAt(0)(s)),
        tail: ""
      });
    }
    ;
    var cu1 = fromEnum2(charAt(1)(s));
    var cu0 = fromEnum2(charAt(0)(s));
    var $43 = isLead(cu0) && isTrail(cu1);
    if ($43) {
      return new Just({
        head: unsurrogate(cu0)(cu1),
        tail: drop2(2)(s)
      });
    }
    ;
    return new Just({
      head: cu0,
      tail: drop2(1)(s)
    });
  };
  var unconsButWithTuple = function(s) {
    return map8(function(v) {
      return new Tuple(v.head, v.tail);
    })(uncons2(s));
  };
  var toCodePointArrayFallback = function(s) {
    return unfoldr2(unconsButWithTuple)(s);
  };
  var unsafeCodePointAt0Fallback = function(s) {
    var cu0 = fromEnum2(charAt(0)(s));
    var $47 = isLead(cu0) && length3(s) > 1;
    if ($47) {
      var cu1 = fromEnum2(charAt(1)(s));
      var $48 = isTrail(cu1);
      if ($48) {
        return unsurrogate(cu0)(cu1);
      }
      ;
      return cu0;
    }
    ;
    return cu0;
  };
  var unsafeCodePointAt0 = /* @__PURE__ */ _unsafeCodePointAt0(unsafeCodePointAt0Fallback);
  var toCodePointArray = /* @__PURE__ */ _toCodePointArray(toCodePointArrayFallback)(unsafeCodePointAt0);
  var length4 = function($74) {
    return length(toCodePointArray($74));
  };

  // output/Effect.Aff.Class/index.js
  var monadAffAff = {
    liftAff: /* @__PURE__ */ identity(categoryFn),
    MonadEffect0: function() {
      return monadEffectAff;
    }
  };
  var liftAff = function(dict) {
    return dict.liftAff;
  };

  // output/Data.Exists/index.js
  var runExists = unsafeCoerce2;
  var mkExists = unsafeCoerce2;

  // output/Data.Coyoneda/index.js
  var CoyonedaF = /* @__PURE__ */ function() {
    function CoyonedaF2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    CoyonedaF2.create = function(value0) {
      return function(value1) {
        return new CoyonedaF2(value0, value1);
      };
    };
    return CoyonedaF2;
  }();
  var unCoyoneda = function(f) {
    return function(v) {
      return runExists(function(v1) {
        return f(v1.value0)(v1.value1);
      })(v);
    };
  };
  var coyoneda = function(k) {
    return function(fi) {
      return mkExists(new CoyonedaF(k, fi));
    };
  };
  var functorCoyoneda = {
    map: function(f) {
      return function(v) {
        return runExists(function(v1) {
          return coyoneda(function($180) {
            return f(v1.value0($180));
          })(v1.value1);
        })(v);
      };
    }
  };
  var liftCoyoneda = /* @__PURE__ */ coyoneda(/* @__PURE__ */ identity(categoryFn));

  // output/Data.Map.Internal/index.js
  var Leaf = /* @__PURE__ */ function() {
    function Leaf2() {
    }
    ;
    Leaf2.value = new Leaf2();
    return Leaf2;
  }();
  var Two = /* @__PURE__ */ function() {
    function Two2(value0, value1, value22, value32) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value22;
      this.value3 = value32;
    }
    ;
    Two2.create = function(value0) {
      return function(value1) {
        return function(value22) {
          return function(value32) {
            return new Two2(value0, value1, value22, value32);
          };
        };
      };
    };
    return Two2;
  }();
  var Three = /* @__PURE__ */ function() {
    function Three2(value0, value1, value22, value32, value42, value52, value62) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value22;
      this.value3 = value32;
      this.value4 = value42;
      this.value5 = value52;
      this.value6 = value62;
    }
    ;
    Three2.create = function(value0) {
      return function(value1) {
        return function(value22) {
          return function(value32) {
            return function(value42) {
              return function(value52) {
                return function(value62) {
                  return new Three2(value0, value1, value22, value32, value42, value52, value62);
                };
              };
            };
          };
        };
      };
    };
    return Three2;
  }();
  var TwoLeft = /* @__PURE__ */ function() {
    function TwoLeft2(value0, value1, value22) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value22;
    }
    ;
    TwoLeft2.create = function(value0) {
      return function(value1) {
        return function(value22) {
          return new TwoLeft2(value0, value1, value22);
        };
      };
    };
    return TwoLeft2;
  }();
  var TwoRight = /* @__PURE__ */ function() {
    function TwoRight2(value0, value1, value22) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value22;
    }
    ;
    TwoRight2.create = function(value0) {
      return function(value1) {
        return function(value22) {
          return new TwoRight2(value0, value1, value22);
        };
      };
    };
    return TwoRight2;
  }();
  var ThreeLeft = /* @__PURE__ */ function() {
    function ThreeLeft2(value0, value1, value22, value32, value42, value52) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value22;
      this.value3 = value32;
      this.value4 = value42;
      this.value5 = value52;
    }
    ;
    ThreeLeft2.create = function(value0) {
      return function(value1) {
        return function(value22) {
          return function(value32) {
            return function(value42) {
              return function(value52) {
                return new ThreeLeft2(value0, value1, value22, value32, value42, value52);
              };
            };
          };
        };
      };
    };
    return ThreeLeft2;
  }();
  var ThreeMiddle = /* @__PURE__ */ function() {
    function ThreeMiddle2(value0, value1, value22, value32, value42, value52) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value22;
      this.value3 = value32;
      this.value4 = value42;
      this.value5 = value52;
    }
    ;
    ThreeMiddle2.create = function(value0) {
      return function(value1) {
        return function(value22) {
          return function(value32) {
            return function(value42) {
              return function(value52) {
                return new ThreeMiddle2(value0, value1, value22, value32, value42, value52);
              };
            };
          };
        };
      };
    };
    return ThreeMiddle2;
  }();
  var ThreeRight = /* @__PURE__ */ function() {
    function ThreeRight2(value0, value1, value22, value32, value42, value52) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value22;
      this.value3 = value32;
      this.value4 = value42;
      this.value5 = value52;
    }
    ;
    ThreeRight2.create = function(value0) {
      return function(value1) {
        return function(value22) {
          return function(value32) {
            return function(value42) {
              return function(value52) {
                return new ThreeRight2(value0, value1, value22, value32, value42, value52);
              };
            };
          };
        };
      };
    };
    return ThreeRight2;
  }();
  var KickUp = /* @__PURE__ */ function() {
    function KickUp2(value0, value1, value22, value32) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value22;
      this.value3 = value32;
    }
    ;
    KickUp2.create = function(value0) {
      return function(value1) {
        return function(value22) {
          return function(value32) {
            return new KickUp2(value0, value1, value22, value32);
          };
        };
      };
    };
    return KickUp2;
  }();
  var lookup2 = function(dictOrd) {
    var compare2 = compare(dictOrd);
    return function(k) {
      var go2 = function($copy_v) {
        var $tco_done = false;
        var $tco_result;
        function $tco_loop(v) {
          if (v instanceof Leaf) {
            $tco_done = true;
            return Nothing.value;
          }
          ;
          if (v instanceof Two) {
            var v2 = compare2(k)(v.value1);
            if (v2 instanceof EQ) {
              $tco_done = true;
              return new Just(v.value2);
            }
            ;
            if (v2 instanceof LT) {
              $copy_v = v.value0;
              return;
            }
            ;
            $copy_v = v.value3;
            return;
          }
          ;
          if (v instanceof Three) {
            var v3 = compare2(k)(v.value1);
            if (v3 instanceof EQ) {
              $tco_done = true;
              return new Just(v.value2);
            }
            ;
            var v4 = compare2(k)(v.value4);
            if (v4 instanceof EQ) {
              $tco_done = true;
              return new Just(v.value5);
            }
            ;
            if (v3 instanceof LT) {
              $copy_v = v.value0;
              return;
            }
            ;
            if (v4 instanceof GT) {
              $copy_v = v.value6;
              return;
            }
            ;
            $copy_v = v.value3;
            return;
          }
          ;
          throw new Error("Failed pattern match at Data.Map.Internal (line 241, column 5 - line 241, column 22): " + [v.constructor.name]);
        }
        ;
        while (!$tco_done) {
          $tco_result = $tco_loop($copy_v);
        }
        ;
        return $tco_result;
      };
      return go2;
    };
  };
  var fromZipper = function($copy_dictOrd) {
    return function($copy_v) {
      return function($copy_v1) {
        var $tco_var_dictOrd = $copy_dictOrd;
        var $tco_var_v = $copy_v;
        var $tco_done = false;
        var $tco_result;
        function $tco_loop(dictOrd, v, v1) {
          if (v instanceof Nil) {
            $tco_done = true;
            return v1;
          }
          ;
          if (v instanceof Cons) {
            if (v.value0 instanceof TwoLeft) {
              $tco_var_dictOrd = dictOrd;
              $tco_var_v = v.value1;
              $copy_v1 = new Two(v1, v.value0.value0, v.value0.value1, v.value0.value2);
              return;
            }
            ;
            if (v.value0 instanceof TwoRight) {
              $tco_var_dictOrd = dictOrd;
              $tco_var_v = v.value1;
              $copy_v1 = new Two(v.value0.value0, v.value0.value1, v.value0.value2, v1);
              return;
            }
            ;
            if (v.value0 instanceof ThreeLeft) {
              $tco_var_dictOrd = dictOrd;
              $tco_var_v = v.value1;
              $copy_v1 = new Three(v1, v.value0.value0, v.value0.value1, v.value0.value2, v.value0.value3, v.value0.value4, v.value0.value5);
              return;
            }
            ;
            if (v.value0 instanceof ThreeMiddle) {
              $tco_var_dictOrd = dictOrd;
              $tco_var_v = v.value1;
              $copy_v1 = new Three(v.value0.value0, v.value0.value1, v.value0.value2, v1, v.value0.value3, v.value0.value4, v.value0.value5);
              return;
            }
            ;
            if (v.value0 instanceof ThreeRight) {
              $tco_var_dictOrd = dictOrd;
              $tco_var_v = v.value1;
              $copy_v1 = new Three(v.value0.value0, v.value0.value1, v.value0.value2, v.value0.value3, v.value0.value4, v.value0.value5, v1);
              return;
            }
            ;
            throw new Error("Failed pattern match at Data.Map.Internal (line 462, column 3 - line 467, column 88): " + [v.value0.constructor.name]);
          }
          ;
          throw new Error("Failed pattern match at Data.Map.Internal (line 459, column 1 - line 459, column 80): " + [v.constructor.name, v1.constructor.name]);
        }
        ;
        while (!$tco_done) {
          $tco_result = $tco_loop($tco_var_dictOrd, $tco_var_v, $copy_v1);
        }
        ;
        return $tco_result;
      };
    };
  };
  var insert = function(dictOrd) {
    var fromZipper1 = fromZipper(dictOrd);
    var compare2 = compare(dictOrd);
    return function(k) {
      return function(v) {
        var up = function($copy_v1) {
          return function($copy_v2) {
            var $tco_var_v1 = $copy_v1;
            var $tco_done = false;
            var $tco_result;
            function $tco_loop(v1, v2) {
              if (v1 instanceof Nil) {
                $tco_done = true;
                return new Two(v2.value0, v2.value1, v2.value2, v2.value3);
              }
              ;
              if (v1 instanceof Cons) {
                if (v1.value0 instanceof TwoLeft) {
                  $tco_done = true;
                  return fromZipper1(v1.value1)(new Three(v2.value0, v2.value1, v2.value2, v2.value3, v1.value0.value0, v1.value0.value1, v1.value0.value2));
                }
                ;
                if (v1.value0 instanceof TwoRight) {
                  $tco_done = true;
                  return fromZipper1(v1.value1)(new Three(v1.value0.value0, v1.value0.value1, v1.value0.value2, v2.value0, v2.value1, v2.value2, v2.value3));
                }
                ;
                if (v1.value0 instanceof ThreeLeft) {
                  $tco_var_v1 = v1.value1;
                  $copy_v2 = new KickUp(new Two(v2.value0, v2.value1, v2.value2, v2.value3), v1.value0.value0, v1.value0.value1, new Two(v1.value0.value2, v1.value0.value3, v1.value0.value4, v1.value0.value5));
                  return;
                }
                ;
                if (v1.value0 instanceof ThreeMiddle) {
                  $tco_var_v1 = v1.value1;
                  $copy_v2 = new KickUp(new Two(v1.value0.value0, v1.value0.value1, v1.value0.value2, v2.value0), v2.value1, v2.value2, new Two(v2.value3, v1.value0.value3, v1.value0.value4, v1.value0.value5));
                  return;
                }
                ;
                if (v1.value0 instanceof ThreeRight) {
                  $tco_var_v1 = v1.value1;
                  $copy_v2 = new KickUp(new Two(v1.value0.value0, v1.value0.value1, v1.value0.value2, v1.value0.value3), v1.value0.value4, v1.value0.value5, new Two(v2.value0, v2.value1, v2.value2, v2.value3));
                  return;
                }
                ;
                throw new Error("Failed pattern match at Data.Map.Internal (line 498, column 5 - line 503, column 108): " + [v1.value0.constructor.name, v2.constructor.name]);
              }
              ;
              throw new Error("Failed pattern match at Data.Map.Internal (line 495, column 3 - line 495, column 56): " + [v1.constructor.name, v2.constructor.name]);
            }
            ;
            while (!$tco_done) {
              $tco_result = $tco_loop($tco_var_v1, $copy_v2);
            }
            ;
            return $tco_result;
          };
        };
        var down = function($copy_v1) {
          return function($copy_v2) {
            var $tco_var_v1 = $copy_v1;
            var $tco_done1 = false;
            var $tco_result;
            function $tco_loop(v1, v2) {
              if (v2 instanceof Leaf) {
                $tco_done1 = true;
                return up(v1)(new KickUp(Leaf.value, k, v, Leaf.value));
              }
              ;
              if (v2 instanceof Two) {
                var v3 = compare2(k)(v2.value1);
                if (v3 instanceof EQ) {
                  $tco_done1 = true;
                  return fromZipper1(v1)(new Two(v2.value0, k, v, v2.value3));
                }
                ;
                if (v3 instanceof LT) {
                  $tco_var_v1 = new Cons(new TwoLeft(v2.value1, v2.value2, v2.value3), v1);
                  $copy_v2 = v2.value0;
                  return;
                }
                ;
                $tco_var_v1 = new Cons(new TwoRight(v2.value0, v2.value1, v2.value2), v1);
                $copy_v2 = v2.value3;
                return;
              }
              ;
              if (v2 instanceof Three) {
                var v3 = compare2(k)(v2.value1);
                if (v3 instanceof EQ) {
                  $tco_done1 = true;
                  return fromZipper1(v1)(new Three(v2.value0, k, v, v2.value3, v2.value4, v2.value5, v2.value6));
                }
                ;
                var v4 = compare2(k)(v2.value4);
                if (v4 instanceof EQ) {
                  $tco_done1 = true;
                  return fromZipper1(v1)(new Three(v2.value0, v2.value1, v2.value2, v2.value3, k, v, v2.value6));
                }
                ;
                if (v3 instanceof LT) {
                  $tco_var_v1 = new Cons(new ThreeLeft(v2.value1, v2.value2, v2.value3, v2.value4, v2.value5, v2.value6), v1);
                  $copy_v2 = v2.value0;
                  return;
                }
                ;
                if (v3 instanceof GT && v4 instanceof LT) {
                  $tco_var_v1 = new Cons(new ThreeMiddle(v2.value0, v2.value1, v2.value2, v2.value4, v2.value5, v2.value6), v1);
                  $copy_v2 = v2.value3;
                  return;
                }
                ;
                $tco_var_v1 = new Cons(new ThreeRight(v2.value0, v2.value1, v2.value2, v2.value3, v2.value4, v2.value5), v1);
                $copy_v2 = v2.value6;
                return;
              }
              ;
              throw new Error("Failed pattern match at Data.Map.Internal (line 478, column 3 - line 478, column 55): " + [v1.constructor.name, v2.constructor.name]);
            }
            ;
            while (!$tco_done1) {
              $tco_result = $tco_loop($tco_var_v1, $copy_v2);
            }
            ;
            return $tco_result;
          };
        };
        return down(Nil.value);
      };
    };
  };
  var pop = function(dictOrd) {
    var fromZipper1 = fromZipper(dictOrd);
    var compare2 = compare(dictOrd);
    return function(k) {
      var up = function($copy_ctxs) {
        return function($copy_tree) {
          var $tco_var_ctxs = $copy_ctxs;
          var $tco_done = false;
          var $tco_result;
          function $tco_loop(ctxs, tree) {
            if (ctxs instanceof Nil) {
              $tco_done = true;
              return tree;
            }
            ;
            if (ctxs instanceof Cons) {
              if (ctxs.value0 instanceof TwoLeft && (ctxs.value0.value2 instanceof Leaf && tree instanceof Leaf)) {
                $tco_done = true;
                return fromZipper1(ctxs.value1)(new Two(Leaf.value, ctxs.value0.value0, ctxs.value0.value1, Leaf.value));
              }
              ;
              if (ctxs.value0 instanceof TwoRight && (ctxs.value0.value0 instanceof Leaf && tree instanceof Leaf)) {
                $tco_done = true;
                return fromZipper1(ctxs.value1)(new Two(Leaf.value, ctxs.value0.value1, ctxs.value0.value2, Leaf.value));
              }
              ;
              if (ctxs.value0 instanceof TwoLeft && ctxs.value0.value2 instanceof Two) {
                $tco_var_ctxs = ctxs.value1;
                $copy_tree = new Three(tree, ctxs.value0.value0, ctxs.value0.value1, ctxs.value0.value2.value0, ctxs.value0.value2.value1, ctxs.value0.value2.value2, ctxs.value0.value2.value3);
                return;
              }
              ;
              if (ctxs.value0 instanceof TwoRight && ctxs.value0.value0 instanceof Two) {
                $tco_var_ctxs = ctxs.value1;
                $copy_tree = new Three(ctxs.value0.value0.value0, ctxs.value0.value0.value1, ctxs.value0.value0.value2, ctxs.value0.value0.value3, ctxs.value0.value1, ctxs.value0.value2, tree);
                return;
              }
              ;
              if (ctxs.value0 instanceof TwoLeft && ctxs.value0.value2 instanceof Three) {
                $tco_done = true;
                return fromZipper1(ctxs.value1)(new Two(new Two(tree, ctxs.value0.value0, ctxs.value0.value1, ctxs.value0.value2.value0), ctxs.value0.value2.value1, ctxs.value0.value2.value2, new Two(ctxs.value0.value2.value3, ctxs.value0.value2.value4, ctxs.value0.value2.value5, ctxs.value0.value2.value6)));
              }
              ;
              if (ctxs.value0 instanceof TwoRight && ctxs.value0.value0 instanceof Three) {
                $tco_done = true;
                return fromZipper1(ctxs.value1)(new Two(new Two(ctxs.value0.value0.value0, ctxs.value0.value0.value1, ctxs.value0.value0.value2, ctxs.value0.value0.value3), ctxs.value0.value0.value4, ctxs.value0.value0.value5, new Two(ctxs.value0.value0.value6, ctxs.value0.value1, ctxs.value0.value2, tree)));
              }
              ;
              if (ctxs.value0 instanceof ThreeLeft && (ctxs.value0.value2 instanceof Leaf && (ctxs.value0.value5 instanceof Leaf && tree instanceof Leaf))) {
                $tco_done = true;
                return fromZipper1(ctxs.value1)(new Three(Leaf.value, ctxs.value0.value0, ctxs.value0.value1, Leaf.value, ctxs.value0.value3, ctxs.value0.value4, Leaf.value));
              }
              ;
              if (ctxs.value0 instanceof ThreeMiddle && (ctxs.value0.value0 instanceof Leaf && (ctxs.value0.value5 instanceof Leaf && tree instanceof Leaf))) {
                $tco_done = true;
                return fromZipper1(ctxs.value1)(new Three(Leaf.value, ctxs.value0.value1, ctxs.value0.value2, Leaf.value, ctxs.value0.value3, ctxs.value0.value4, Leaf.value));
              }
              ;
              if (ctxs.value0 instanceof ThreeRight && (ctxs.value0.value0 instanceof Leaf && (ctxs.value0.value3 instanceof Leaf && tree instanceof Leaf))) {
                $tco_done = true;
                return fromZipper1(ctxs.value1)(new Three(Leaf.value, ctxs.value0.value1, ctxs.value0.value2, Leaf.value, ctxs.value0.value4, ctxs.value0.value5, Leaf.value));
              }
              ;
              if (ctxs.value0 instanceof ThreeLeft && ctxs.value0.value2 instanceof Two) {
                $tco_done = true;
                return fromZipper1(ctxs.value1)(new Two(new Three(tree, ctxs.value0.value0, ctxs.value0.value1, ctxs.value0.value2.value0, ctxs.value0.value2.value1, ctxs.value0.value2.value2, ctxs.value0.value2.value3), ctxs.value0.value3, ctxs.value0.value4, ctxs.value0.value5));
              }
              ;
              if (ctxs.value0 instanceof ThreeMiddle && ctxs.value0.value0 instanceof Two) {
                $tco_done = true;
                return fromZipper1(ctxs.value1)(new Two(new Three(ctxs.value0.value0.value0, ctxs.value0.value0.value1, ctxs.value0.value0.value2, ctxs.value0.value0.value3, ctxs.value0.value1, ctxs.value0.value2, tree), ctxs.value0.value3, ctxs.value0.value4, ctxs.value0.value5));
              }
              ;
              if (ctxs.value0 instanceof ThreeMiddle && ctxs.value0.value5 instanceof Two) {
                $tco_done = true;
                return fromZipper1(ctxs.value1)(new Two(ctxs.value0.value0, ctxs.value0.value1, ctxs.value0.value2, new Three(tree, ctxs.value0.value3, ctxs.value0.value4, ctxs.value0.value5.value0, ctxs.value0.value5.value1, ctxs.value0.value5.value2, ctxs.value0.value5.value3)));
              }
              ;
              if (ctxs.value0 instanceof ThreeRight && ctxs.value0.value3 instanceof Two) {
                $tco_done = true;
                return fromZipper1(ctxs.value1)(new Two(ctxs.value0.value0, ctxs.value0.value1, ctxs.value0.value2, new Three(ctxs.value0.value3.value0, ctxs.value0.value3.value1, ctxs.value0.value3.value2, ctxs.value0.value3.value3, ctxs.value0.value4, ctxs.value0.value5, tree)));
              }
              ;
              if (ctxs.value0 instanceof ThreeLeft && ctxs.value0.value2 instanceof Three) {
                $tco_done = true;
                return fromZipper1(ctxs.value1)(new Three(new Two(tree, ctxs.value0.value0, ctxs.value0.value1, ctxs.value0.value2.value0), ctxs.value0.value2.value1, ctxs.value0.value2.value2, new Two(ctxs.value0.value2.value3, ctxs.value0.value2.value4, ctxs.value0.value2.value5, ctxs.value0.value2.value6), ctxs.value0.value3, ctxs.value0.value4, ctxs.value0.value5));
              }
              ;
              if (ctxs.value0 instanceof ThreeMiddle && ctxs.value0.value0 instanceof Three) {
                $tco_done = true;
                return fromZipper1(ctxs.value1)(new Three(new Two(ctxs.value0.value0.value0, ctxs.value0.value0.value1, ctxs.value0.value0.value2, ctxs.value0.value0.value3), ctxs.value0.value0.value4, ctxs.value0.value0.value5, new Two(ctxs.value0.value0.value6, ctxs.value0.value1, ctxs.value0.value2, tree), ctxs.value0.value3, ctxs.value0.value4, ctxs.value0.value5));
              }
              ;
              if (ctxs.value0 instanceof ThreeMiddle && ctxs.value0.value5 instanceof Three) {
                $tco_done = true;
                return fromZipper1(ctxs.value1)(new Three(ctxs.value0.value0, ctxs.value0.value1, ctxs.value0.value2, new Two(tree, ctxs.value0.value3, ctxs.value0.value4, ctxs.value0.value5.value0), ctxs.value0.value5.value1, ctxs.value0.value5.value2, new Two(ctxs.value0.value5.value3, ctxs.value0.value5.value4, ctxs.value0.value5.value5, ctxs.value0.value5.value6)));
              }
              ;
              if (ctxs.value0 instanceof ThreeRight && ctxs.value0.value3 instanceof Three) {
                $tco_done = true;
                return fromZipper1(ctxs.value1)(new Three(ctxs.value0.value0, ctxs.value0.value1, ctxs.value0.value2, new Two(ctxs.value0.value3.value0, ctxs.value0.value3.value1, ctxs.value0.value3.value2, ctxs.value0.value3.value3), ctxs.value0.value3.value4, ctxs.value0.value3.value5, new Two(ctxs.value0.value3.value6, ctxs.value0.value4, ctxs.value0.value5, tree)));
              }
              ;
              $tco_done = true;
              return unsafeCrashWith("The impossible happened in partial function `up`.");
            }
            ;
            throw new Error("Failed pattern match at Data.Map.Internal (line 552, column 5 - line 573, column 86): " + [ctxs.constructor.name]);
          }
          ;
          while (!$tco_done) {
            $tco_result = $tco_loop($tco_var_ctxs, $copy_tree);
          }
          ;
          return $tco_result;
        };
      };
      var removeMaxNode = function($copy_ctx) {
        return function($copy_m) {
          var $tco_var_ctx = $copy_ctx;
          var $tco_done1 = false;
          var $tco_result;
          function $tco_loop(ctx, m) {
            if (m instanceof Two && (m.value0 instanceof Leaf && m.value3 instanceof Leaf)) {
              $tco_done1 = true;
              return up(ctx)(Leaf.value);
            }
            ;
            if (m instanceof Two) {
              $tco_var_ctx = new Cons(new TwoRight(m.value0, m.value1, m.value2), ctx);
              $copy_m = m.value3;
              return;
            }
            ;
            if (m instanceof Three && (m.value0 instanceof Leaf && (m.value3 instanceof Leaf && m.value6 instanceof Leaf))) {
              $tco_done1 = true;
              return up(new Cons(new TwoRight(Leaf.value, m.value1, m.value2), ctx))(Leaf.value);
            }
            ;
            if (m instanceof Three) {
              $tco_var_ctx = new Cons(new ThreeRight(m.value0, m.value1, m.value2, m.value3, m.value4, m.value5), ctx);
              $copy_m = m.value6;
              return;
            }
            ;
            $tco_done1 = true;
            return unsafeCrashWith("The impossible happened in partial function `removeMaxNode`.");
          }
          ;
          while (!$tco_done1) {
            $tco_result = $tco_loop($tco_var_ctx, $copy_m);
          }
          ;
          return $tco_result;
        };
      };
      var maxNode = function($copy_m) {
        var $tco_done2 = false;
        var $tco_result;
        function $tco_loop(m) {
          if (m instanceof Two && m.value3 instanceof Leaf) {
            $tco_done2 = true;
            return {
              key: m.value1,
              value: m.value2
            };
          }
          ;
          if (m instanceof Two) {
            $copy_m = m.value3;
            return;
          }
          ;
          if (m instanceof Three && m.value6 instanceof Leaf) {
            $tco_done2 = true;
            return {
              key: m.value4,
              value: m.value5
            };
          }
          ;
          if (m instanceof Three) {
            $copy_m = m.value6;
            return;
          }
          ;
          $tco_done2 = true;
          return unsafeCrashWith("The impossible happened in partial function `maxNode`.");
        }
        ;
        while (!$tco_done2) {
          $tco_result = $tco_loop($copy_m);
        }
        ;
        return $tco_result;
      };
      var down = function($copy_ctx) {
        return function($copy_m) {
          var $tco_var_ctx = $copy_ctx;
          var $tco_done3 = false;
          var $tco_result;
          function $tco_loop(ctx, m) {
            if (m instanceof Leaf) {
              $tco_done3 = true;
              return Nothing.value;
            }
            ;
            if (m instanceof Two) {
              var v = compare2(k)(m.value1);
              if (m.value3 instanceof Leaf && v instanceof EQ) {
                $tco_done3 = true;
                return new Just(new Tuple(m.value2, up(ctx)(Leaf.value)));
              }
              ;
              if (v instanceof EQ) {
                var max6 = maxNode(m.value0);
                $tco_done3 = true;
                return new Just(new Tuple(m.value2, removeMaxNode(new Cons(new TwoLeft(max6.key, max6.value, m.value3), ctx))(m.value0)));
              }
              ;
              if (v instanceof LT) {
                $tco_var_ctx = new Cons(new TwoLeft(m.value1, m.value2, m.value3), ctx);
                $copy_m = m.value0;
                return;
              }
              ;
              $tco_var_ctx = new Cons(new TwoRight(m.value0, m.value1, m.value2), ctx);
              $copy_m = m.value3;
              return;
            }
            ;
            if (m instanceof Three) {
              var leaves = function() {
                if (m.value0 instanceof Leaf && (m.value3 instanceof Leaf && m.value6 instanceof Leaf)) {
                  return true;
                }
                ;
                return false;
              }();
              var v = compare2(k)(m.value4);
              var v3 = compare2(k)(m.value1);
              if (leaves && v3 instanceof EQ) {
                $tco_done3 = true;
                return new Just(new Tuple(m.value2, fromZipper1(ctx)(new Two(Leaf.value, m.value4, m.value5, Leaf.value))));
              }
              ;
              if (leaves && v instanceof EQ) {
                $tco_done3 = true;
                return new Just(new Tuple(m.value5, fromZipper1(ctx)(new Two(Leaf.value, m.value1, m.value2, Leaf.value))));
              }
              ;
              if (v3 instanceof EQ) {
                var max6 = maxNode(m.value0);
                $tco_done3 = true;
                return new Just(new Tuple(m.value2, removeMaxNode(new Cons(new ThreeLeft(max6.key, max6.value, m.value3, m.value4, m.value5, m.value6), ctx))(m.value0)));
              }
              ;
              if (v instanceof EQ) {
                var max6 = maxNode(m.value3);
                $tco_done3 = true;
                return new Just(new Tuple(m.value5, removeMaxNode(new Cons(new ThreeMiddle(m.value0, m.value1, m.value2, max6.key, max6.value, m.value6), ctx))(m.value3)));
              }
              ;
              if (v3 instanceof LT) {
                $tco_var_ctx = new Cons(new ThreeLeft(m.value1, m.value2, m.value3, m.value4, m.value5, m.value6), ctx);
                $copy_m = m.value0;
                return;
              }
              ;
              if (v3 instanceof GT && v instanceof LT) {
                $tco_var_ctx = new Cons(new ThreeMiddle(m.value0, m.value1, m.value2, m.value4, m.value5, m.value6), ctx);
                $copy_m = m.value3;
                return;
              }
              ;
              $tco_var_ctx = new Cons(new ThreeRight(m.value0, m.value1, m.value2, m.value3, m.value4, m.value5), ctx);
              $copy_m = m.value6;
              return;
            }
            ;
            throw new Error("Failed pattern match at Data.Map.Internal (line 525, column 16 - line 548, column 80): " + [m.constructor.name]);
          }
          ;
          while (!$tco_done3) {
            $tco_result = $tco_loop($tco_var_ctx, $copy_m);
          }
          ;
          return $tco_result;
        };
      };
      return down(Nil.value);
    };
  };
  var foldableMap = {
    foldr: function(f) {
      return function(z) {
        return function(m) {
          if (m instanceof Leaf) {
            return z;
          }
          ;
          if (m instanceof Two) {
            return foldr(foldableMap)(f)(f(m.value2)(foldr(foldableMap)(f)(z)(m.value3)))(m.value0);
          }
          ;
          if (m instanceof Three) {
            return foldr(foldableMap)(f)(f(m.value2)(foldr(foldableMap)(f)(f(m.value5)(foldr(foldableMap)(f)(z)(m.value6)))(m.value3)))(m.value0);
          }
          ;
          throw new Error("Failed pattern match at Data.Map.Internal (line 133, column 17 - line 136, column 85): " + [m.constructor.name]);
        };
      };
    },
    foldl: function(f) {
      return function(z) {
        return function(m) {
          if (m instanceof Leaf) {
            return z;
          }
          ;
          if (m instanceof Two) {
            return foldl(foldableMap)(f)(f(foldl(foldableMap)(f)(z)(m.value0))(m.value2))(m.value3);
          }
          ;
          if (m instanceof Three) {
            return foldl(foldableMap)(f)(f(foldl(foldableMap)(f)(f(foldl(foldableMap)(f)(z)(m.value0))(m.value2))(m.value3))(m.value5))(m.value6);
          }
          ;
          throw new Error("Failed pattern match at Data.Map.Internal (line 137, column 17 - line 140, column 85): " + [m.constructor.name]);
        };
      };
    },
    foldMap: function(dictMonoid) {
      var mempty2 = mempty(dictMonoid);
      var append22 = append(dictMonoid.Semigroup0());
      return function(f) {
        return function(m) {
          if (m instanceof Leaf) {
            return mempty2;
          }
          ;
          if (m instanceof Two) {
            return append22(foldMap(foldableMap)(dictMonoid)(f)(m.value0))(append22(f(m.value2))(foldMap(foldableMap)(dictMonoid)(f)(m.value3)));
          }
          ;
          if (m instanceof Three) {
            return append22(foldMap(foldableMap)(dictMonoid)(f)(m.value0))(append22(f(m.value2))(append22(foldMap(foldableMap)(dictMonoid)(f)(m.value3))(append22(f(m.value5))(foldMap(foldableMap)(dictMonoid)(f)(m.value6)))));
          }
          ;
          throw new Error("Failed pattern match at Data.Map.Internal (line 141, column 17 - line 144, column 93): " + [m.constructor.name]);
        };
      };
    }
  };
  var empty3 = /* @__PURE__ */ function() {
    return Leaf.value;
  }();
  var $$delete2 = function(dictOrd) {
    var pop1 = pop(dictOrd);
    return function(k) {
      return function(m) {
        return maybe(m)(snd)(pop1(k)(m));
      };
    };
  };
  var alter = function(dictOrd) {
    var lookup12 = lookup2(dictOrd);
    var delete1 = $$delete2(dictOrd);
    var insert12 = insert(dictOrd);
    return function(f) {
      return function(k) {
        return function(m) {
          var v = f(lookup12(k)(m));
          if (v instanceof Nothing) {
            return delete1(k)(m);
          }
          ;
          if (v instanceof Just) {
            return insert12(k)(v.value0)(m);
          }
          ;
          throw new Error("Failed pattern match at Data.Map.Internal (line 596, column 15 - line 598, column 25): " + [v.constructor.name]);
        };
      };
    };
  };

  // output/Halogen.Data.Slot/index.js
  var foreachSlot = function(dictApplicative) {
    var traverse_7 = traverse_(dictApplicative)(foldableMap);
    return function(v) {
      return function(k) {
        return traverse_7(function($54) {
          return k($54);
        })(v);
      };
    };
  };
  var empty4 = empty3;

  // output/Halogen.Query.Input/index.js
  var RefUpdate = /* @__PURE__ */ function() {
    function RefUpdate2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    RefUpdate2.create = function(value0) {
      return function(value1) {
        return new RefUpdate2(value0, value1);
      };
    };
    return RefUpdate2;
  }();
  var Action = /* @__PURE__ */ function() {
    function Action3(value0) {
      this.value0 = value0;
    }
    ;
    Action3.create = function(value0) {
      return new Action3(value0);
    };
    return Action3;
  }();

  // output/Halogen.VDom.Machine/index.js
  var Step = /* @__PURE__ */ function() {
    function Step3(value0, value1, value22, value32) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value22;
      this.value3 = value32;
    }
    ;
    Step3.create = function(value0) {
      return function(value1) {
        return function(value22) {
          return function(value32) {
            return new Step3(value0, value1, value22, value32);
          };
        };
      };
    };
    return Step3;
  }();
  var unStep = unsafeCoerce2;
  var step2 = function(v, a2) {
    return v.value2(v.value1, a2);
  };
  var mkStep = unsafeCoerce2;
  var halt = function(v) {
    return v.value3(v.value1);
  };
  var extract2 = /* @__PURE__ */ unStep(function(v) {
    return v.value0;
  });

  // output/Halogen.VDom.Types/index.js
  var map9 = /* @__PURE__ */ map(functorArray);
  var map13 = /* @__PURE__ */ map(functorTuple);
  var Text = /* @__PURE__ */ function() {
    function Text2(value0) {
      this.value0 = value0;
    }
    ;
    Text2.create = function(value0) {
      return new Text2(value0);
    };
    return Text2;
  }();
  var Elem = /* @__PURE__ */ function() {
    function Elem2(value0, value1, value22, value32) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value22;
      this.value3 = value32;
    }
    ;
    Elem2.create = function(value0) {
      return function(value1) {
        return function(value22) {
          return function(value32) {
            return new Elem2(value0, value1, value22, value32);
          };
        };
      };
    };
    return Elem2;
  }();
  var Keyed = /* @__PURE__ */ function() {
    function Keyed2(value0, value1, value22, value32) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value22;
      this.value3 = value32;
    }
    ;
    Keyed2.create = function(value0) {
      return function(value1) {
        return function(value22) {
          return function(value32) {
            return new Keyed2(value0, value1, value22, value32);
          };
        };
      };
    };
    return Keyed2;
  }();
  var Widget = /* @__PURE__ */ function() {
    function Widget2(value0) {
      this.value0 = value0;
    }
    ;
    Widget2.create = function(value0) {
      return new Widget2(value0);
    };
    return Widget2;
  }();
  var Grafted = /* @__PURE__ */ function() {
    function Grafted2(value0) {
      this.value0 = value0;
    }
    ;
    Grafted2.create = function(value0) {
      return new Grafted2(value0);
    };
    return Grafted2;
  }();
  var Graft = /* @__PURE__ */ function() {
    function Graft2(value0, value1, value22) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value22;
    }
    ;
    Graft2.create = function(value0) {
      return function(value1) {
        return function(value22) {
          return new Graft2(value0, value1, value22);
        };
      };
    };
    return Graft2;
  }();
  var unGraft = function(f) {
    return function($61) {
      return f($61);
    };
  };
  var graft = unsafeCoerce2;
  var bifunctorGraft = {
    bimap: function(f) {
      return function(g) {
        return unGraft(function(v) {
          return graft(new Graft(function($63) {
            return f(v.value0($63));
          }, function($64) {
            return g(v.value1($64));
          }, v.value2));
        });
      };
    }
  };
  var bimap2 = /* @__PURE__ */ bimap(bifunctorGraft);
  var runGraft = /* @__PURE__ */ unGraft(function(v) {
    var go2 = function(v2) {
      if (v2 instanceof Text) {
        return new Text(v2.value0);
      }
      ;
      if (v2 instanceof Elem) {
        return new Elem(v2.value0, v2.value1, v.value0(v2.value2), map9(go2)(v2.value3));
      }
      ;
      if (v2 instanceof Keyed) {
        return new Keyed(v2.value0, v2.value1, v.value0(v2.value2), map9(map13(go2))(v2.value3));
      }
      ;
      if (v2 instanceof Widget) {
        return new Widget(v.value1(v2.value0));
      }
      ;
      if (v2 instanceof Grafted) {
        return new Grafted(bimap2(v.value0)(v.value1)(v2.value0));
      }
      ;
      throw new Error("Failed pattern match at Halogen.VDom.Types (line 86, column 7 - line 86, column 27): " + [v2.constructor.name]);
    };
    return go2(v.value2);
  });

  // output/Halogen.VDom.Util/foreign.js
  function unsafeGetAny(key, obj) {
    return obj[key];
  }
  function unsafeHasAny(key, obj) {
    return obj.hasOwnProperty(key);
  }
  function unsafeSetAny(key, val, obj) {
    obj[key] = val;
  }
  function forE2(a2, f) {
    var b2 = [];
    for (var i2 = 0; i2 < a2.length; i2++) {
      b2.push(f(i2, a2[i2]));
    }
    return b2;
  }
  function forEachE(a2, f) {
    for (var i2 = 0; i2 < a2.length; i2++) {
      f(a2[i2]);
    }
  }
  function forInE(o, f) {
    var ks = Object.keys(o);
    for (var i2 = 0; i2 < ks.length; i2++) {
      var k = ks[i2];
      f(k, o[k]);
    }
  }
  function diffWithIxE(a1, a2, f1, f2, f3) {
    var a3 = [];
    var l1 = a1.length;
    var l2 = a2.length;
    var i2 = 0;
    while (1) {
      if (i2 < l1) {
        if (i2 < l2) {
          a3.push(f1(i2, a1[i2], a2[i2]));
        } else {
          f2(i2, a1[i2]);
        }
      } else if (i2 < l2) {
        a3.push(f3(i2, a2[i2]));
      } else {
        break;
      }
      i2++;
    }
    return a3;
  }
  function strMapWithIxE(as, fk, f) {
    var o = {};
    for (var i2 = 0; i2 < as.length; i2++) {
      var a2 = as[i2];
      var k = fk(a2);
      o[k] = f(k, i2, a2);
    }
    return o;
  }
  function diffWithKeyAndIxE(o1, as, fk, f1, f2, f3) {
    var o2 = {};
    for (var i2 = 0; i2 < as.length; i2++) {
      var a2 = as[i2];
      var k = fk(a2);
      if (o1.hasOwnProperty(k)) {
        o2[k] = f1(k, i2, o1[k], a2);
      } else {
        o2[k] = f3(k, i2, a2);
      }
    }
    for (var k in o1) {
      if (k in o2) {
        continue;
      }
      f2(k, o1[k]);
    }
    return o2;
  }
  function refEq2(a2, b2) {
    return a2 === b2;
  }
  function createTextNode(s, doc) {
    return doc.createTextNode(s);
  }
  function setTextContent(s, n) {
    n.textContent = s;
  }
  function createElement(ns, name16, doc) {
    if (ns != null) {
      return doc.createElementNS(ns, name16);
    } else {
      return doc.createElement(name16);
    }
  }
  function insertChildIx(i2, a2, b2) {
    var n = b2.childNodes.item(i2) || null;
    if (n !== a2) {
      b2.insertBefore(a2, n);
    }
  }
  function removeChild(a2, b2) {
    if (b2 && a2.parentNode === b2) {
      b2.removeChild(a2);
    }
  }
  function parentNode(a2) {
    return a2.parentNode;
  }
  function setAttribute(ns, attr3, val, el) {
    if (ns != null) {
      el.setAttributeNS(ns, attr3, val);
    } else {
      el.setAttribute(attr3, val);
    }
  }
  function removeAttribute(ns, attr3, el) {
    if (ns != null) {
      el.removeAttributeNS(ns, attr3);
    } else {
      el.removeAttribute(attr3);
    }
  }
  function hasAttribute(ns, attr3, el) {
    if (ns != null) {
      return el.hasAttributeNS(ns, attr3);
    } else {
      return el.hasAttribute(attr3);
    }
  }
  function addEventListener(ev, listener, el) {
    el.addEventListener(ev, listener, false);
  }
  function removeEventListener(ev, listener, el) {
    el.removeEventListener(ev, listener, false);
  }
  var jsUndefined = void 0;

  // output/Halogen.VDom.Util/index.js
  var unsafeLookup = unsafeGetAny;
  var unsafeFreeze2 = unsafeCoerce2;
  var pokeMutMap = unsafeSetAny;
  var newMutMap = newImpl;

  // output/Web.DOM.Element/foreign.js
  var getProp = function(name16) {
    return function(doctype) {
      return doctype[name16];
    };
  };
  var _namespaceURI = getProp("namespaceURI");
  var _prefix = getProp("prefix");
  var localName = getProp("localName");
  var tagName = getProp("tagName");

  // output/Web.DOM.ParentNode/foreign.js
  var getEffProp = function(name16) {
    return function(node) {
      return function() {
        return node[name16];
      };
    };
  };
  var children = getEffProp("children");
  var _firstElementChild = getEffProp("firstElementChild");
  var _lastElementChild = getEffProp("lastElementChild");
  var childElementCount = getEffProp("childElementCount");
  function _querySelector(selector) {
    return function(node) {
      return function() {
        return node.querySelector(selector);
      };
    };
  }

  // output/Web.DOM.ParentNode/index.js
  var map10 = /* @__PURE__ */ map(functorEffect);
  var querySelector = function(qs) {
    var $2 = map10(toMaybe);
    var $3 = _querySelector(qs);
    return function($4) {
      return $2($3($4));
    };
  };

  // output/Web.DOM.Element/index.js
  var toNode = unsafeCoerce2;

  // output/Halogen.VDom.DOM/index.js
  var $runtime_lazy3 = function(name16, moduleName, init2) {
    var state3 = 0;
    var val;
    return function(lineNumber) {
      if (state3 === 2)
        return val;
      if (state3 === 1)
        throw new ReferenceError(name16 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
      state3 = 1;
      val = init2();
      state3 = 2;
      return val;
    };
  };
  var haltWidget = function(v) {
    return halt(v.widget);
  };
  var $lazy_patchWidget = /* @__PURE__ */ $runtime_lazy3("patchWidget", "Halogen.VDom.DOM", function() {
    return function(state3, vdom) {
      if (vdom instanceof Grafted) {
        return $lazy_patchWidget(291)(state3, runGraft(vdom.value0));
      }
      ;
      if (vdom instanceof Widget) {
        var res = step2(state3.widget, vdom.value0);
        var res$prime = unStep(function(v) {
          return mkStep(new Step(v.value0, {
            build: state3.build,
            widget: res
          }, $lazy_patchWidget(296), haltWidget));
        })(res);
        return res$prime;
      }
      ;
      haltWidget(state3);
      return state3.build(vdom);
    };
  });
  var patchWidget = /* @__PURE__ */ $lazy_patchWidget(286);
  var haltText = function(v) {
    var parent2 = parentNode(v.node);
    return removeChild(v.node, parent2);
  };
  var $lazy_patchText = /* @__PURE__ */ $runtime_lazy3("patchText", "Halogen.VDom.DOM", function() {
    return function(state3, vdom) {
      if (vdom instanceof Grafted) {
        return $lazy_patchText(82)(state3, runGraft(vdom.value0));
      }
      ;
      if (vdom instanceof Text) {
        if (state3.value === vdom.value0) {
          return mkStep(new Step(state3.node, state3, $lazy_patchText(85), haltText));
        }
        ;
        if (otherwise) {
          var nextState = {
            build: state3.build,
            node: state3.node,
            value: vdom.value0
          };
          setTextContent(vdom.value0, state3.node);
          return mkStep(new Step(state3.node, nextState, $lazy_patchText(89), haltText));
        }
        ;
      }
      ;
      haltText(state3);
      return state3.build(vdom);
    };
  });
  var patchText = /* @__PURE__ */ $lazy_patchText(77);
  var haltKeyed = function(v) {
    var parent2 = parentNode(v.node);
    removeChild(v.node, parent2);
    forInE(v.children, function(v1, s) {
      return halt(s);
    });
    return halt(v.attrs);
  };
  var haltElem = function(v) {
    var parent2 = parentNode(v.node);
    removeChild(v.node, parent2);
    forEachE(v.children, halt);
    return halt(v.attrs);
  };
  var eqElemSpec = function(ns1, v, ns2, v1) {
    var $63 = v === v1;
    if ($63) {
      if (ns1 instanceof Just && (ns2 instanceof Just && ns1.value0 === ns2.value0)) {
        return true;
      }
      ;
      if (ns1 instanceof Nothing && ns2 instanceof Nothing) {
        return true;
      }
      ;
      return false;
    }
    ;
    return false;
  };
  var $lazy_patchElem = /* @__PURE__ */ $runtime_lazy3("patchElem", "Halogen.VDom.DOM", function() {
    return function(state3, vdom) {
      if (vdom instanceof Grafted) {
        return $lazy_patchElem(135)(state3, runGraft(vdom.value0));
      }
      ;
      if (vdom instanceof Elem && eqElemSpec(state3.ns, state3.name, vdom.value0, vdom.value1)) {
        var v = length(vdom.value3);
        var v1 = length(state3.children);
        if (v1 === 0 && v === 0) {
          var attrs2 = step2(state3.attrs, vdom.value2);
          var nextState = {
            build: state3.build,
            node: state3.node,
            attrs: attrs2,
            ns: vdom.value0,
            name: vdom.value1,
            children: state3.children
          };
          return mkStep(new Step(state3.node, nextState, $lazy_patchElem(149), haltElem));
        }
        ;
        var onThis = function(v2, s) {
          return halt(s);
        };
        var onThese = function(ix, s, v2) {
          var res = step2(s, v2);
          insertChildIx(ix, extract2(res), state3.node);
          return res;
        };
        var onThat = function(ix, v2) {
          var res = state3.build(v2);
          insertChildIx(ix, extract2(res), state3.node);
          return res;
        };
        var children2 = diffWithIxE(state3.children, vdom.value3, onThese, onThis, onThat);
        var attrs2 = step2(state3.attrs, vdom.value2);
        var nextState = {
          build: state3.build,
          node: state3.node,
          attrs: attrs2,
          ns: vdom.value0,
          name: vdom.value1,
          children: children2
        };
        return mkStep(new Step(state3.node, nextState, $lazy_patchElem(172), haltElem));
      }
      ;
      haltElem(state3);
      return state3.build(vdom);
    };
  });
  var patchElem = /* @__PURE__ */ $lazy_patchElem(130);
  var $lazy_patchKeyed = /* @__PURE__ */ $runtime_lazy3("patchKeyed", "Halogen.VDom.DOM", function() {
    return function(state3, vdom) {
      if (vdom instanceof Grafted) {
        return $lazy_patchKeyed(222)(state3, runGraft(vdom.value0));
      }
      ;
      if (vdom instanceof Keyed && eqElemSpec(state3.ns, state3.name, vdom.value0, vdom.value1)) {
        var v = length(vdom.value3);
        if (state3.length === 0 && v === 0) {
          var attrs2 = step2(state3.attrs, vdom.value2);
          var nextState = {
            build: state3.build,
            node: state3.node,
            attrs: attrs2,
            ns: vdom.value0,
            name: vdom.value1,
            children: state3.children,
            length: 0
          };
          return mkStep(new Step(state3.node, nextState, $lazy_patchKeyed(237), haltKeyed));
        }
        ;
        var onThis = function(v2, s) {
          return halt(s);
        };
        var onThese = function(v2, ix$prime, s, v3) {
          var res = step2(s, v3.value1);
          insertChildIx(ix$prime, extract2(res), state3.node);
          return res;
        };
        var onThat = function(v2, ix, v3) {
          var res = state3.build(v3.value1);
          insertChildIx(ix, extract2(res), state3.node);
          return res;
        };
        var children2 = diffWithKeyAndIxE(state3.children, vdom.value3, fst, onThese, onThis, onThat);
        var attrs2 = step2(state3.attrs, vdom.value2);
        var nextState = {
          build: state3.build,
          node: state3.node,
          attrs: attrs2,
          ns: vdom.value0,
          name: vdom.value1,
          children: children2,
          length: v
        };
        return mkStep(new Step(state3.node, nextState, $lazy_patchKeyed(261), haltKeyed));
      }
      ;
      haltKeyed(state3);
      return state3.build(vdom);
    };
  });
  var patchKeyed = /* @__PURE__ */ $lazy_patchKeyed(217);
  var buildWidget = function(v, build, w) {
    var res = v.buildWidget(v)(w);
    var res$prime = unStep(function(v1) {
      return mkStep(new Step(v1.value0, {
        build,
        widget: res
      }, patchWidget, haltWidget));
    })(res);
    return res$prime;
  };
  var buildText = function(v, build, s) {
    var node = createTextNode(s, v.document);
    var state3 = {
      build,
      node,
      value: s
    };
    return mkStep(new Step(node, state3, patchText, haltText));
  };
  var buildKeyed = function(v, build, ns1, name1, as1, ch1) {
    var el = createElement(toNullable(ns1), name1, v.document);
    var node = toNode(el);
    var onChild = function(v1, ix, v2) {
      var res = build(v2.value1);
      insertChildIx(ix, extract2(res), node);
      return res;
    };
    var children2 = strMapWithIxE(ch1, fst, onChild);
    var attrs = v.buildAttributes(el)(as1);
    var state3 = {
      build,
      node,
      attrs,
      ns: ns1,
      name: name1,
      children: children2,
      length: length(ch1)
    };
    return mkStep(new Step(node, state3, patchKeyed, haltKeyed));
  };
  var buildElem = function(v, build, ns1, name1, as1, ch1) {
    var el = createElement(toNullable(ns1), name1, v.document);
    var node = toNode(el);
    var onChild = function(ix, child) {
      var res = build(child);
      insertChildIx(ix, extract2(res), node);
      return res;
    };
    var children2 = forE2(ch1, onChild);
    var attrs = v.buildAttributes(el)(as1);
    var state3 = {
      build,
      node,
      attrs,
      ns: ns1,
      name: name1,
      children: children2
    };
    return mkStep(new Step(node, state3, patchElem, haltElem));
  };
  var buildVDom = function(spec) {
    var $lazy_build = $runtime_lazy3("build", "Halogen.VDom.DOM", function() {
      return function(v) {
        if (v instanceof Text) {
          return buildText(spec, $lazy_build(59), v.value0);
        }
        ;
        if (v instanceof Elem) {
          return buildElem(spec, $lazy_build(60), v.value0, v.value1, v.value2, v.value3);
        }
        ;
        if (v instanceof Keyed) {
          return buildKeyed(spec, $lazy_build(61), v.value0, v.value1, v.value2, v.value3);
        }
        ;
        if (v instanceof Widget) {
          return buildWidget(spec, $lazy_build(62), v.value0);
        }
        ;
        if (v instanceof Grafted) {
          return $lazy_build(63)(runGraft(v.value0));
        }
        ;
        throw new Error("Failed pattern match at Halogen.VDom.DOM (line 58, column 27 - line 63, column 52): " + [v.constructor.name]);
      };
    });
    var build = $lazy_build(58);
    return build;
  };

  // output/Web.Event.EventTarget/foreign.js
  function eventListener(fn) {
    return function() {
      return function(event) {
        return fn(event)();
      };
    };
  }
  function addEventListener2(type) {
    return function(listener) {
      return function(useCapture) {
        return function(target6) {
          return function() {
            return target6.addEventListener(type, listener, useCapture);
          };
        };
      };
    };
  }
  function removeEventListener2(type) {
    return function(listener) {
      return function(useCapture) {
        return function(target6) {
          return function() {
            return target6.removeEventListener(type, listener, useCapture);
          };
        };
      };
    };
  }

  // output/Halogen.VDom.DOM.Prop/index.js
  var $runtime_lazy4 = function(name16, moduleName, init2) {
    var state3 = 0;
    var val;
    return function(lineNumber) {
      if (state3 === 2)
        return val;
      if (state3 === 1)
        throw new ReferenceError(name16 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
      state3 = 1;
      val = init2();
      state3 = 2;
      return val;
    };
  };
  var Created = /* @__PURE__ */ function() {
    function Created2(value0) {
      this.value0 = value0;
    }
    ;
    Created2.create = function(value0) {
      return new Created2(value0);
    };
    return Created2;
  }();
  var Removed = /* @__PURE__ */ function() {
    function Removed2(value0) {
      this.value0 = value0;
    }
    ;
    Removed2.create = function(value0) {
      return new Removed2(value0);
    };
    return Removed2;
  }();
  var Attribute = /* @__PURE__ */ function() {
    function Attribute2(value0, value1, value22) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value22;
    }
    ;
    Attribute2.create = function(value0) {
      return function(value1) {
        return function(value22) {
          return new Attribute2(value0, value1, value22);
        };
      };
    };
    return Attribute2;
  }();
  var Property = /* @__PURE__ */ function() {
    function Property2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Property2.create = function(value0) {
      return function(value1) {
        return new Property2(value0, value1);
      };
    };
    return Property2;
  }();
  var Handler = /* @__PURE__ */ function() {
    function Handler2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Handler2.create = function(value0) {
      return function(value1) {
        return new Handler2(value0, value1);
      };
    };
    return Handler2;
  }();
  var Ref = /* @__PURE__ */ function() {
    function Ref2(value0) {
      this.value0 = value0;
    }
    ;
    Ref2.create = function(value0) {
      return new Ref2(value0);
    };
    return Ref2;
  }();
  var unsafeGetProperty = unsafeGetAny;
  var setProperty = unsafeSetAny;
  var removeProperty = function(key, el) {
    var v = hasAttribute(nullImpl, key, el);
    if (v) {
      return removeAttribute(nullImpl, key, el);
    }
    ;
    var v1 = typeOf(unsafeGetAny(key, el));
    if (v1 === "string") {
      return unsafeSetAny(key, "", el);
    }
    ;
    if (key === "rowSpan") {
      return unsafeSetAny(key, 1, el);
    }
    ;
    if (key === "colSpan") {
      return unsafeSetAny(key, 1, el);
    }
    ;
    return unsafeSetAny(key, jsUndefined, el);
  };
  var propToStrKey = function(v) {
    if (v instanceof Attribute && v.value0 instanceof Just) {
      return "attr/" + (v.value0.value0 + (":" + v.value1));
    }
    ;
    if (v instanceof Attribute) {
      return "attr/:" + v.value1;
    }
    ;
    if (v instanceof Property) {
      return "prop/" + v.value0;
    }
    ;
    if (v instanceof Handler) {
      return "handler/" + v.value0;
    }
    ;
    if (v instanceof Ref) {
      return "ref";
    }
    ;
    throw new Error("Failed pattern match at Halogen.VDom.DOM.Prop (line 182, column 16 - line 187, column 16): " + [v.constructor.name]);
  };
  var propFromString = unsafeCoerce2;
  var buildProp = function(emit) {
    return function(el) {
      var removeProp = function(prevEvents) {
        return function(v, v1) {
          if (v1 instanceof Attribute) {
            return removeAttribute(toNullable(v1.value0), v1.value1, el);
          }
          ;
          if (v1 instanceof Property) {
            return removeProperty(v1.value0, el);
          }
          ;
          if (v1 instanceof Handler) {
            var handler3 = unsafeLookup(v1.value0, prevEvents);
            return removeEventListener(v1.value0, fst(handler3), el);
          }
          ;
          if (v1 instanceof Ref) {
            return unit;
          }
          ;
          throw new Error("Failed pattern match at Halogen.VDom.DOM.Prop (line 169, column 5 - line 179, column 18): " + [v1.constructor.name]);
        };
      };
      var mbEmit = function(v) {
        if (v instanceof Just) {
          return emit(v.value0)();
        }
        ;
        return unit;
      };
      var haltProp = function(state3) {
        var v = lookup("ref")(state3.props);
        if (v instanceof Just && v.value0 instanceof Ref) {
          return mbEmit(v.value0.value0(new Removed(el)));
        }
        ;
        return unit;
      };
      var diffProp = function(prevEvents, events) {
        return function(v, v1, v11, v2) {
          if (v11 instanceof Attribute && v2 instanceof Attribute) {
            var $66 = v11.value2 === v2.value2;
            if ($66) {
              return v2;
            }
            ;
            setAttribute(toNullable(v2.value0), v2.value1, v2.value2, el);
            return v2;
          }
          ;
          if (v11 instanceof Property && v2 instanceof Property) {
            var v4 = refEq2(v11.value1, v2.value1);
            if (v4) {
              return v2;
            }
            ;
            if (v2.value0 === "value") {
              var elVal = unsafeGetProperty("value", el);
              var $75 = refEq2(elVal, v2.value1);
              if ($75) {
                return v2;
              }
              ;
              setProperty(v2.value0, v2.value1, el);
              return v2;
            }
            ;
            setProperty(v2.value0, v2.value1, el);
            return v2;
          }
          ;
          if (v11 instanceof Handler && v2 instanceof Handler) {
            var handler3 = unsafeLookup(v2.value0, prevEvents);
            write(v2.value1)(snd(handler3))();
            pokeMutMap(v2.value0, handler3, events);
            return v2;
          }
          ;
          return v2;
        };
      };
      var applyProp = function(events) {
        return function(v, v1, v2) {
          if (v2 instanceof Attribute) {
            setAttribute(toNullable(v2.value0), v2.value1, v2.value2, el);
            return v2;
          }
          ;
          if (v2 instanceof Property) {
            setProperty(v2.value0, v2.value1, el);
            return v2;
          }
          ;
          if (v2 instanceof Handler) {
            var v3 = unsafeGetAny(v2.value0, events);
            if (unsafeHasAny(v2.value0, events)) {
              write(v2.value1)(snd(v3))();
              return v2;
            }
            ;
            var ref2 = $$new(v2.value1)();
            var listener = eventListener(function(ev) {
              return function __do2() {
                var f$prime = read(ref2)();
                return mbEmit(f$prime(ev));
              };
            })();
            pokeMutMap(v2.value0, new Tuple(listener, ref2), events);
            addEventListener(v2.value0, listener, el);
            return v2;
          }
          ;
          if (v2 instanceof Ref) {
            mbEmit(v2.value0(new Created(el)));
            return v2;
          }
          ;
          throw new Error("Failed pattern match at Halogen.VDom.DOM.Prop (line 113, column 5 - line 135, column 15): " + [v2.constructor.name]);
        };
      };
      var $lazy_patchProp = $runtime_lazy4("patchProp", "Halogen.VDom.DOM.Prop", function() {
        return function(state3, ps2) {
          var events = newMutMap();
          var onThis = removeProp(state3.events);
          var onThese = diffProp(state3.events, events);
          var onThat = applyProp(events);
          var props = diffWithKeyAndIxE(state3.props, ps2, propToStrKey, onThese, onThis, onThat);
          var nextState = {
            events: unsafeFreeze2(events),
            props
          };
          return mkStep(new Step(unit, nextState, $lazy_patchProp(100), haltProp));
        };
      });
      var patchProp = $lazy_patchProp(87);
      var renderProp = function(ps1) {
        var events = newMutMap();
        var ps1$prime = strMapWithIxE(ps1, propToStrKey, applyProp(events));
        var state3 = {
          events: unsafeFreeze2(events),
          props: ps1$prime
        };
        return mkStep(new Step(unit, state3, patchProp, haltProp));
      };
      return renderProp;
    };
  };

  // output/Halogen.HTML.Core/index.js
  var HTML = function(x) {
    return x;
  };
  var toPropValue = function(dict) {
    return dict.toPropValue;
  };
  var text = function($29) {
    return HTML(Text.create($29));
  };
  var prop = function(dictIsProp) {
    var toPropValue1 = toPropValue(dictIsProp);
    return function(v) {
      var $31 = Property.create(v);
      return function($32) {
        return $31(toPropValue1($32));
      };
    };
  };
  var isPropString = {
    toPropValue: propFromString
  };
  var isPropButtonType = {
    toPropValue: function($50) {
      return propFromString(renderButtonType($50));
    }
  };
  var handler = /* @__PURE__ */ function() {
    return Handler.create;
  }();
  var element = function(ns) {
    return function(name16) {
      return function(props) {
        return function(children2) {
          return new Elem(ns, name16, props, children2);
        };
      };
    };
  };

  // output/Control.Applicative.Free/index.js
  var identity7 = /* @__PURE__ */ identity(categoryFn);
  var Pure = /* @__PURE__ */ function() {
    function Pure2(value0) {
      this.value0 = value0;
    }
    ;
    Pure2.create = function(value0) {
      return new Pure2(value0);
    };
    return Pure2;
  }();
  var Lift = /* @__PURE__ */ function() {
    function Lift3(value0) {
      this.value0 = value0;
    }
    ;
    Lift3.create = function(value0) {
      return new Lift3(value0);
    };
    return Lift3;
  }();
  var Ap = /* @__PURE__ */ function() {
    function Ap2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Ap2.create = function(value0) {
      return function(value1) {
        return new Ap2(value0, value1);
      };
    };
    return Ap2;
  }();
  var mkAp = function(fba) {
    return function(fb) {
      return new Ap(fba, fb);
    };
  };
  var liftFreeAp = /* @__PURE__ */ function() {
    return Lift.create;
  }();
  var goLeft = function(dictApplicative) {
    var pure10 = pure(dictApplicative);
    return function(fStack) {
      return function(valStack) {
        return function(nat) {
          return function(func) {
            return function(count) {
              if (func instanceof Pure) {
                return new Tuple(new Cons({
                  func: pure10(func.value0),
                  count
                }, fStack), valStack);
              }
              ;
              if (func instanceof Lift) {
                return new Tuple(new Cons({
                  func: nat(func.value0),
                  count
                }, fStack), valStack);
              }
              ;
              if (func instanceof Ap) {
                return goLeft(dictApplicative)(fStack)(cons(func.value1)(valStack))(nat)(func.value0)(count + 1 | 0);
              }
              ;
              throw new Error("Failed pattern match at Control.Applicative.Free (line 102, column 41 - line 105, column 81): " + [func.constructor.name]);
            };
          };
        };
      };
    };
  };
  var goApply = function(dictApplicative) {
    var apply3 = apply(dictApplicative.Apply0());
    return function(fStack) {
      return function(vals) {
        return function(gVal) {
          if (fStack instanceof Nil) {
            return new Left(gVal);
          }
          ;
          if (fStack instanceof Cons) {
            var gRes = apply3(fStack.value0.func)(gVal);
            var $31 = fStack.value0.count === 1;
            if ($31) {
              if (fStack.value1 instanceof Nil) {
                return new Left(gRes);
              }
              ;
              return goApply(dictApplicative)(fStack.value1)(vals)(gRes);
            }
            ;
            if (vals instanceof Nil) {
              return new Left(gRes);
            }
            ;
            if (vals instanceof Cons) {
              return new Right(new Tuple(new Cons({
                func: gRes,
                count: fStack.value0.count - 1 | 0
              }, fStack.value1), new NonEmpty(vals.value0, vals.value1)));
            }
            ;
            throw new Error("Failed pattern match at Control.Applicative.Free (line 83, column 11 - line 88, column 50): " + [vals.constructor.name]);
          }
          ;
          throw new Error("Failed pattern match at Control.Applicative.Free (line 72, column 3 - line 88, column 50): " + [fStack.constructor.name]);
        };
      };
    };
  };
  var functorFreeAp = {
    map: function(f) {
      return function(x) {
        return mkAp(new Pure(f))(x);
      };
    }
  };
  var foldFreeAp = function(dictApplicative) {
    var goApply1 = goApply(dictApplicative);
    var pure10 = pure(dictApplicative);
    var goLeft1 = goLeft(dictApplicative);
    return function(nat) {
      return function(z) {
        var go2 = function($copy_v) {
          var $tco_done = false;
          var $tco_result;
          function $tco_loop(v) {
            if (v.value1.value0 instanceof Pure) {
              var v1 = goApply1(v.value0)(v.value1.value1)(pure10(v.value1.value0.value0));
              if (v1 instanceof Left) {
                $tco_done = true;
                return v1.value0;
              }
              ;
              if (v1 instanceof Right) {
                $copy_v = v1.value0;
                return;
              }
              ;
              throw new Error("Failed pattern match at Control.Applicative.Free (line 54, column 17 - line 56, column 24): " + [v1.constructor.name]);
            }
            ;
            if (v.value1.value0 instanceof Lift) {
              var v1 = goApply1(v.value0)(v.value1.value1)(nat(v.value1.value0.value0));
              if (v1 instanceof Left) {
                $tco_done = true;
                return v1.value0;
              }
              ;
              if (v1 instanceof Right) {
                $copy_v = v1.value0;
                return;
              }
              ;
              throw new Error("Failed pattern match at Control.Applicative.Free (line 57, column 17 - line 59, column 24): " + [v1.constructor.name]);
            }
            ;
            if (v.value1.value0 instanceof Ap) {
              var nextVals = new NonEmpty(v.value1.value0.value1, v.value1.value1);
              $copy_v = goLeft1(v.value0)(nextVals)(nat)(v.value1.value0.value0)(1);
              return;
            }
            ;
            throw new Error("Failed pattern match at Control.Applicative.Free (line 53, column 5 - line 62, column 47): " + [v.value1.value0.constructor.name]);
          }
          ;
          while (!$tco_done) {
            $tco_result = $tco_loop($copy_v);
          }
          ;
          return $tco_result;
        };
        return go2(new Tuple(Nil.value, singleton4(z)));
      };
    };
  };
  var retractFreeAp = function(dictApplicative) {
    return foldFreeAp(dictApplicative)(identity7);
  };
  var applyFreeAp = {
    apply: function(fba) {
      return function(fb) {
        return mkAp(fba)(fb);
      };
    },
    Functor0: function() {
      return functorFreeAp;
    }
  };
  var applicativeFreeAp = /* @__PURE__ */ function() {
    return {
      pure: Pure.create,
      Apply0: function() {
        return applyFreeAp;
      }
    };
  }();
  var foldFreeAp1 = /* @__PURE__ */ foldFreeAp(applicativeFreeAp);
  var hoistFreeAp = function(f) {
    return foldFreeAp1(function($54) {
      return liftFreeAp(f($54));
    });
  };

  // output/Data.CatQueue/index.js
  var CatQueue = /* @__PURE__ */ function() {
    function CatQueue2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    CatQueue2.create = function(value0) {
      return function(value1) {
        return new CatQueue2(value0, value1);
      };
    };
    return CatQueue2;
  }();
  var uncons3 = function($copy_v) {
    var $tco_done = false;
    var $tco_result;
    function $tco_loop(v) {
      if (v.value0 instanceof Nil && v.value1 instanceof Nil) {
        $tco_done = true;
        return Nothing.value;
      }
      ;
      if (v.value0 instanceof Nil) {
        $copy_v = new CatQueue(reverse2(v.value1), Nil.value);
        return;
      }
      ;
      if (v.value0 instanceof Cons) {
        $tco_done = true;
        return new Just(new Tuple(v.value0.value0, new CatQueue(v.value0.value1, v.value1)));
      }
      ;
      throw new Error("Failed pattern match at Data.CatQueue (line 82, column 1 - line 82, column 63): " + [v.constructor.name]);
    }
    ;
    while (!$tco_done) {
      $tco_result = $tco_loop($copy_v);
    }
    ;
    return $tco_result;
  };
  var snoc3 = function(v) {
    return function(a2) {
      return new CatQueue(v.value0, new Cons(a2, v.value1));
    };
  };
  var $$null2 = function(v) {
    if (v.value0 instanceof Nil && v.value1 instanceof Nil) {
      return true;
    }
    ;
    return false;
  };
  var empty5 = /* @__PURE__ */ function() {
    return new CatQueue(Nil.value, Nil.value);
  }();

  // output/Data.CatList/index.js
  var CatNil = /* @__PURE__ */ function() {
    function CatNil2() {
    }
    ;
    CatNil2.value = new CatNil2();
    return CatNil2;
  }();
  var CatCons = /* @__PURE__ */ function() {
    function CatCons2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    CatCons2.create = function(value0) {
      return function(value1) {
        return new CatCons2(value0, value1);
      };
    };
    return CatCons2;
  }();
  var link = function(v) {
    return function(v1) {
      if (v instanceof CatNil) {
        return v1;
      }
      ;
      if (v1 instanceof CatNil) {
        return v;
      }
      ;
      if (v instanceof CatCons) {
        return new CatCons(v.value0, snoc3(v.value1)(v1));
      }
      ;
      throw new Error("Failed pattern match at Data.CatList (line 108, column 1 - line 108, column 54): " + [v.constructor.name, v1.constructor.name]);
    };
  };
  var foldr3 = function(k) {
    return function(b2) {
      return function(q2) {
        var foldl2 = function($copy_v) {
          return function($copy_v1) {
            return function($copy_v2) {
              var $tco_var_v = $copy_v;
              var $tco_var_v1 = $copy_v1;
              var $tco_done = false;
              var $tco_result;
              function $tco_loop(v, v1, v2) {
                if (v2 instanceof Nil) {
                  $tco_done = true;
                  return v1;
                }
                ;
                if (v2 instanceof Cons) {
                  $tco_var_v = v;
                  $tco_var_v1 = v(v1)(v2.value0);
                  $copy_v2 = v2.value1;
                  return;
                }
                ;
                throw new Error("Failed pattern match at Data.CatList (line 124, column 3 - line 124, column 59): " + [v.constructor.name, v1.constructor.name, v2.constructor.name]);
              }
              ;
              while (!$tco_done) {
                $tco_result = $tco_loop($tco_var_v, $tco_var_v1, $copy_v2);
              }
              ;
              return $tco_result;
            };
          };
        };
        var go2 = function($copy_xs) {
          return function($copy_ys) {
            var $tco_var_xs = $copy_xs;
            var $tco_done1 = false;
            var $tco_result;
            function $tco_loop(xs, ys) {
              var v = uncons3(xs);
              if (v instanceof Nothing) {
                $tco_done1 = true;
                return foldl2(function(x) {
                  return function(i2) {
                    return i2(x);
                  };
                })(b2)(ys);
              }
              ;
              if (v instanceof Just) {
                $tco_var_xs = v.value0.value1;
                $copy_ys = new Cons(k(v.value0.value0), ys);
                return;
              }
              ;
              throw new Error("Failed pattern match at Data.CatList (line 120, column 14 - line 122, column 67): " + [v.constructor.name]);
            }
            ;
            while (!$tco_done1) {
              $tco_result = $tco_loop($tco_var_xs, $copy_ys);
            }
            ;
            return $tco_result;
          };
        };
        return go2(q2)(Nil.value);
      };
    };
  };
  var uncons4 = function(v) {
    if (v instanceof CatNil) {
      return Nothing.value;
    }
    ;
    if (v instanceof CatCons) {
      return new Just(new Tuple(v.value0, function() {
        var $66 = $$null2(v.value1);
        if ($66) {
          return CatNil.value;
        }
        ;
        return foldr3(link)(CatNil.value)(v.value1);
      }()));
    }
    ;
    throw new Error("Failed pattern match at Data.CatList (line 99, column 1 - line 99, column 61): " + [v.constructor.name]);
  };
  var empty6 = /* @__PURE__ */ function() {
    return CatNil.value;
  }();
  var append2 = link;
  var semigroupCatList = {
    append: append2
  };
  var snoc4 = function(cat) {
    return function(a2) {
      return append2(cat)(new CatCons(a2, empty5));
    };
  };

  // output/Control.Monad.Free/index.js
  var $runtime_lazy5 = function(name16, moduleName, init2) {
    var state3 = 0;
    var val;
    return function(lineNumber) {
      if (state3 === 2)
        return val;
      if (state3 === 1)
        throw new ReferenceError(name16 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
      state3 = 1;
      val = init2();
      state3 = 2;
      return val;
    };
  };
  var append3 = /* @__PURE__ */ append(semigroupCatList);
  var Free = /* @__PURE__ */ function() {
    function Free2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Free2.create = function(value0) {
      return function(value1) {
        return new Free2(value0, value1);
      };
    };
    return Free2;
  }();
  var Return = /* @__PURE__ */ function() {
    function Return2(value0) {
      this.value0 = value0;
    }
    ;
    Return2.create = function(value0) {
      return new Return2(value0);
    };
    return Return2;
  }();
  var Bind = /* @__PURE__ */ function() {
    function Bind2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Bind2.create = function(value0) {
      return function(value1) {
        return new Bind2(value0, value1);
      };
    };
    return Bind2;
  }();
  var toView = function($copy_v) {
    var $tco_done = false;
    var $tco_result;
    function $tco_loop(v) {
      var runExpF = function(v22) {
        return v22;
      };
      var concatF = function(v22) {
        return function(r) {
          return new Free(v22.value0, append3(v22.value1)(r));
        };
      };
      if (v.value0 instanceof Return) {
        var v2 = uncons4(v.value1);
        if (v2 instanceof Nothing) {
          $tco_done = true;
          return new Return(v.value0.value0);
        }
        ;
        if (v2 instanceof Just) {
          $copy_v = concatF(runExpF(v2.value0.value0)(v.value0.value0))(v2.value0.value1);
          return;
        }
        ;
        throw new Error("Failed pattern match at Control.Monad.Free (line 227, column 7 - line 231, column 64): " + [v2.constructor.name]);
      }
      ;
      if (v.value0 instanceof Bind) {
        $tco_done = true;
        return new Bind(v.value0.value0, function(a2) {
          return concatF(v.value0.value1(a2))(v.value1);
        });
      }
      ;
      throw new Error("Failed pattern match at Control.Monad.Free (line 225, column 3 - line 233, column 56): " + [v.value0.constructor.name]);
    }
    ;
    while (!$tco_done) {
      $tco_result = $tco_loop($copy_v);
    }
    ;
    return $tco_result;
  };
  var fromView = function(f) {
    return new Free(f, empty6);
  };
  var freeMonad = {
    Applicative0: function() {
      return freeApplicative;
    },
    Bind1: function() {
      return freeBind;
    }
  };
  var freeFunctor = {
    map: function(k) {
      return function(f) {
        return bindFlipped(freeBind)(function() {
          var $189 = pure(freeApplicative);
          return function($190) {
            return $189(k($190));
          };
        }())(f);
      };
    }
  };
  var freeBind = {
    bind: function(v) {
      return function(k) {
        return new Free(v.value0, snoc4(v.value1)(k));
      };
    },
    Apply0: function() {
      return $lazy_freeApply(0);
    }
  };
  var freeApplicative = {
    pure: function($191) {
      return fromView(Return.create($191));
    },
    Apply0: function() {
      return $lazy_freeApply(0);
    }
  };
  var $lazy_freeApply = /* @__PURE__ */ $runtime_lazy5("freeApply", "Control.Monad.Free", function() {
    return {
      apply: ap(freeMonad),
      Functor0: function() {
        return freeFunctor;
      }
    };
  });
  var pure4 = /* @__PURE__ */ pure(freeApplicative);
  var liftF = function(f) {
    return fromView(new Bind(f, function($192) {
      return pure4($192);
    }));
  };
  var foldFree = function(dictMonadRec) {
    var Monad0 = dictMonadRec.Monad0();
    var map110 = map(Monad0.Bind1().Apply0().Functor0());
    var pure14 = pure(Monad0.Applicative0());
    var tailRecM4 = tailRecM(dictMonadRec);
    return function(k) {
      var go2 = function(f) {
        var v = toView(f);
        if (v instanceof Return) {
          return map110(Done.create)(pure14(v.value0));
        }
        ;
        if (v instanceof Bind) {
          return map110(function($199) {
            return Loop.create(v.value1($199));
          })(k(v.value0));
        }
        ;
        throw new Error("Failed pattern match at Control.Monad.Free (line 158, column 10 - line 160, column 37): " + [v.constructor.name]);
      };
      return tailRecM4(go2);
    };
  };

  // output/Halogen.Query.ChildQuery/index.js
  var unChildQueryBox = unsafeCoerce2;

  // output/Unsafe.Reference/foreign.js
  function reallyUnsafeRefEq(a2) {
    return function(b2) {
      return a2 === b2;
    };
  }

  // output/Unsafe.Reference/index.js
  var unsafeRefEq = reallyUnsafeRefEq;

  // output/Halogen.Subscription/index.js
  var $$void4 = /* @__PURE__ */ $$void(functorEffect);
  var bind2 = /* @__PURE__ */ bind(bindEffect);
  var append4 = /* @__PURE__ */ append(semigroupArray);
  var traverse_2 = /* @__PURE__ */ traverse_(applicativeEffect);
  var traverse_1 = /* @__PURE__ */ traverse_2(foldableArray);
  var unsubscribe = function(v) {
    return v;
  };
  var subscribe = function(v) {
    return function(k) {
      return v(function($76) {
        return $$void4(k($76));
      });
    };
  };
  var notify = function(v) {
    return function(a2) {
      return v(a2);
    };
  };
  var create = function __do() {
    var subscribers = $$new([])();
    return {
      emitter: function(k) {
        return function __do2() {
          modify_(function(v) {
            return append4(v)([k]);
          })(subscribers)();
          return modify_(deleteBy(unsafeRefEq)(k))(subscribers);
        };
      },
      listener: function(a2) {
        return bind2(read(subscribers))(traverse_1(function(k) {
          return k(a2);
        }));
      }
    };
  };

  // output/Halogen.Query.HalogenM/index.js
  var SubscriptionId = function(x) {
    return x;
  };
  var ForkId = function(x) {
    return x;
  };
  var State = /* @__PURE__ */ function() {
    function State2(value0) {
      this.value0 = value0;
    }
    ;
    State2.create = function(value0) {
      return new State2(value0);
    };
    return State2;
  }();
  var Subscribe = /* @__PURE__ */ function() {
    function Subscribe2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Subscribe2.create = function(value0) {
      return function(value1) {
        return new Subscribe2(value0, value1);
      };
    };
    return Subscribe2;
  }();
  var Unsubscribe = /* @__PURE__ */ function() {
    function Unsubscribe2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Unsubscribe2.create = function(value0) {
      return function(value1) {
        return new Unsubscribe2(value0, value1);
      };
    };
    return Unsubscribe2;
  }();
  var Lift2 = /* @__PURE__ */ function() {
    function Lift3(value0) {
      this.value0 = value0;
    }
    ;
    Lift3.create = function(value0) {
      return new Lift3(value0);
    };
    return Lift3;
  }();
  var ChildQuery2 = /* @__PURE__ */ function() {
    function ChildQuery3(value0) {
      this.value0 = value0;
    }
    ;
    ChildQuery3.create = function(value0) {
      return new ChildQuery3(value0);
    };
    return ChildQuery3;
  }();
  var Raise = /* @__PURE__ */ function() {
    function Raise2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Raise2.create = function(value0) {
      return function(value1) {
        return new Raise2(value0, value1);
      };
    };
    return Raise2;
  }();
  var Par = /* @__PURE__ */ function() {
    function Par2(value0) {
      this.value0 = value0;
    }
    ;
    Par2.create = function(value0) {
      return new Par2(value0);
    };
    return Par2;
  }();
  var Fork = /* @__PURE__ */ function() {
    function Fork2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Fork2.create = function(value0) {
      return function(value1) {
        return new Fork2(value0, value1);
      };
    };
    return Fork2;
  }();
  var Join = /* @__PURE__ */ function() {
    function Join2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Join2.create = function(value0) {
      return function(value1) {
        return new Join2(value0, value1);
      };
    };
    return Join2;
  }();
  var Kill = /* @__PURE__ */ function() {
    function Kill2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Kill2.create = function(value0) {
      return function(value1) {
        return new Kill2(value0, value1);
      };
    };
    return Kill2;
  }();
  var GetRef = /* @__PURE__ */ function() {
    function GetRef2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    GetRef2.create = function(value0) {
      return function(value1) {
        return new GetRef2(value0, value1);
      };
    };
    return GetRef2;
  }();
  var HalogenM = function(x) {
    return x;
  };
  var ordSubscriptionId = ordInt;
  var ordForkId = ordInt;
  var monadHalogenM = freeMonad;
  var monadStateHalogenM = {
    state: function($181) {
      return HalogenM(liftF(State.create($181)));
    },
    Monad0: function() {
      return monadHalogenM;
    }
  };
  var monadEffectHalogenM = function(dictMonadEffect) {
    return {
      liftEffect: function() {
        var $186 = liftEffect(dictMonadEffect);
        return function($187) {
          return HalogenM(liftF(Lift2.create($186($187))));
        };
      }(),
      Monad0: function() {
        return monadHalogenM;
      }
    };
  };
  var monadAffHalogenM = function(dictMonadAff) {
    var monadEffectHalogenM1 = monadEffectHalogenM(dictMonadAff.MonadEffect0());
    return {
      liftAff: function() {
        var $188 = liftAff(dictMonadAff);
        return function($189) {
          return HalogenM(liftF(Lift2.create($188($189))));
        };
      }(),
      MonadEffect0: function() {
        return monadEffectHalogenM1;
      }
    };
  };
  var functorHalogenM = freeFunctor;
  var bindHalogenM = freeBind;
  var applicativeHalogenM = freeApplicative;

  // output/Halogen.Query.HalogenQ/index.js
  var Initialize = /* @__PURE__ */ function() {
    function Initialize3(value0) {
      this.value0 = value0;
    }
    ;
    Initialize3.create = function(value0) {
      return new Initialize3(value0);
    };
    return Initialize3;
  }();
  var Finalize = /* @__PURE__ */ function() {
    function Finalize2(value0) {
      this.value0 = value0;
    }
    ;
    Finalize2.create = function(value0) {
      return new Finalize2(value0);
    };
    return Finalize2;
  }();
  var Receive = /* @__PURE__ */ function() {
    function Receive2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Receive2.create = function(value0) {
      return function(value1) {
        return new Receive2(value0, value1);
      };
    };
    return Receive2;
  }();
  var Action2 = /* @__PURE__ */ function() {
    function Action3(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Action3.create = function(value0) {
      return function(value1) {
        return new Action3(value0, value1);
      };
    };
    return Action3;
  }();
  var Query = /* @__PURE__ */ function() {
    function Query2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Query2.create = function(value0) {
      return function(value1) {
        return new Query2(value0, value1);
      };
    };
    return Query2;
  }();

  // output/Halogen.VDom.Thunk/index.js
  var $runtime_lazy6 = function(name16, moduleName, init2) {
    var state3 = 0;
    var val;
    return function(lineNumber) {
      if (state3 === 2)
        return val;
      if (state3 === 1)
        throw new ReferenceError(name16 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
      state3 = 1;
      val = init2();
      state3 = 2;
      return val;
    };
  };
  var unsafeEqThunk = function(v, v1) {
    return refEq2(v.value0, v1.value0) && (refEq2(v.value1, v1.value1) && v.value1(v.value3, v1.value3));
  };
  var runThunk = function(v) {
    return v.value2(v.value3);
  };
  var buildThunk = function(toVDom) {
    var haltThunk = function(state3) {
      return halt(state3.vdom);
    };
    var $lazy_patchThunk = $runtime_lazy6("patchThunk", "Halogen.VDom.Thunk", function() {
      return function(state3, t2) {
        var $48 = unsafeEqThunk(state3.thunk, t2);
        if ($48) {
          return mkStep(new Step(extract2(state3.vdom), state3, $lazy_patchThunk(112), haltThunk));
        }
        ;
        var vdom = step2(state3.vdom, toVDom(runThunk(t2)));
        return mkStep(new Step(extract2(vdom), {
          vdom,
          thunk: t2
        }, $lazy_patchThunk(115), haltThunk));
      };
    });
    var patchThunk = $lazy_patchThunk(108);
    var renderThunk = function(spec) {
      return function(t) {
        var vdom = buildVDom(spec)(toVDom(runThunk(t)));
        return mkStep(new Step(extract2(vdom), {
          thunk: t,
          vdom
        }, patchThunk, haltThunk));
      };
    };
    return renderThunk;
  };

  // output/Halogen.Component/index.js
  var voidLeft2 = /* @__PURE__ */ voidLeft(functorHalogenM);
  var traverse_3 = /* @__PURE__ */ traverse_(applicativeHalogenM)(foldableMaybe);
  var map11 = /* @__PURE__ */ map(functorHalogenM);
  var pure5 = /* @__PURE__ */ pure(applicativeHalogenM);
  var ComponentSlot = /* @__PURE__ */ function() {
    function ComponentSlot2(value0) {
      this.value0 = value0;
    }
    ;
    ComponentSlot2.create = function(value0) {
      return new ComponentSlot2(value0);
    };
    return ComponentSlot2;
  }();
  var ThunkSlot = /* @__PURE__ */ function() {
    function ThunkSlot2(value0) {
      this.value0 = value0;
    }
    ;
    ThunkSlot2.create = function(value0) {
      return new ThunkSlot2(value0);
    };
    return ThunkSlot2;
  }();
  var unComponentSlot = unsafeCoerce2;
  var unComponent = unsafeCoerce2;
  var mkEval = function(args) {
    return function(v) {
      if (v instanceof Initialize) {
        return voidLeft2(traverse_3(args.handleAction)(args.initialize))(v.value0);
      }
      ;
      if (v instanceof Finalize) {
        return voidLeft2(traverse_3(args.handleAction)(args.finalize))(v.value0);
      }
      ;
      if (v instanceof Receive) {
        return voidLeft2(traverse_3(args.handleAction)(args.receive(v.value0)))(v.value1);
      }
      ;
      if (v instanceof Action2) {
        return voidLeft2(args.handleAction(v.value0))(v.value1);
      }
      ;
      if (v instanceof Query) {
        return unCoyoneda(function(g) {
          var $45 = map11(maybe(v.value1(unit))(g));
          return function($46) {
            return $45(args.handleQuery($46));
          };
        })(v.value0);
      }
      ;
      throw new Error("Failed pattern match at Halogen.Component (line 182, column 15 - line 192, column 71): " + [v.constructor.name]);
    };
  };
  var mkComponent = unsafeCoerce2;
  var defaultEval = /* @__PURE__ */ function() {
    return {
      handleAction: $$const(pure5(unit)),
      handleQuery: $$const(pure5(Nothing.value)),
      receive: $$const(Nothing.value),
      initialize: Nothing.value,
      finalize: Nothing.value
    };
  }();

  // output/Halogen.HTML.Elements/index.js
  var element2 = /* @__PURE__ */ function() {
    return element(Nothing.value);
  }();
  var h1 = /* @__PURE__ */ element2("h1");
  var h1_ = /* @__PURE__ */ h1([]);
  var p = /* @__PURE__ */ element2("p");
  var span2 = /* @__PURE__ */ element2("span");
  var div2 = /* @__PURE__ */ element2("div");
  var div_ = /* @__PURE__ */ div2([]);
  var button = /* @__PURE__ */ element2("button");

  // output/Web.HTML.Event.EventTypes/index.js
  var domcontentloaded = "DOMContentLoaded";

  // output/Web.UIEvent.MouseEvent.EventTypes/index.js
  var click = "click";

  // output/Halogen.HTML.Events/index.js
  var mouseHandler = unsafeCoerce2;
  var handler2 = function(et) {
    return function(f) {
      return handler(et)(function(ev) {
        return new Just(new Action(f(ev)));
      });
    };
  };
  var onClick = /* @__PURE__ */ function() {
    var $15 = handler2(click);
    return function($16) {
      return $15(mouseHandler($16));
    };
  }();

  // output/Halogen.HTML.Properties/index.js
  var unwrap4 = /* @__PURE__ */ unwrap();
  var prop2 = function(dictIsProp) {
    return prop(dictIsProp);
  };
  var prop22 = /* @__PURE__ */ prop2(isPropString);
  var type_3 = function(dictIsProp) {
    return prop2(dictIsProp)("type");
  };
  var id3 = /* @__PURE__ */ prop22("id");
  var class_ = /* @__PURE__ */ function() {
    var $36 = prop22("className");
    return function($37) {
      return $36(unwrap4($37));
    };
  }();

  // output/WordList/index.js
  var wordList = ["a", "a's", "a-1", "a-z", "aa", "aaa", "aaaa", "aaron", "ab", "aback", "abacus", "abase", "abash", "abate", "abbey", "abbot", "abbr", "abby", "abc", "abc's", "abcd", "abdomen", "abdominal", "abduct", "abdul", "abe", "abed", "abel", "abet", "abhor", "abide", "abiding", "ability", "ablaze", "able", "abm", "abner", "abnormal", "aboard", "abode", "abort", "about", "above", "abram", "abrasion", "abrasive", "abreast", "abridge", "abroad", "abruptly", "absence", "absent", "absentee", "absently", "absinthe", "absolute", "absolve", "absorb", "abstain", "abstract", "absurd", "abuse", "abut", "abyss", "ac", "ac/dc", "accent", "accept", "acclaim", "acclimate", "accompany", "account", "accuracy", "accurate", "accuse", "accustom", "ace", "aces", "acetone", "ache", "ached", "aches", "achiness", "aching", "achoo", "achy", "acid", "acidic", "acids", "acme", "acne", "acorn", "acquaint", "acquire", "acquit", "acre", "acres", "acrid", "acrobat", "acronym", "act", "acted", "acting", "action", "activate", "activator", "active", "activism", "activist", "activity", "actor", "actress", "acts", "acute", "acutely", "acuteness", "ad", "ada", "adage", "adagio", "adair", "adam", "adams", "adapt", "add", "added", "adder", "addict", "addle", "adds", "adele", "adept", "adieu", "adios", "adjust", "adler", "admit", "ado", "adobe", "adolf", "adonis", "adopt", "adore", "adorn", "ads", "adult", "advent", "adverb", "advise", "ae", "aeiou", "aeration", "aerial", "aerobics", "aerosol", "aerospace", "aesop", "af", "afar", "affair", "affected", "affecting", "affection", "affidavit", "affiliate", "affirm", "affix", "afflicted", "affluent", "afford", "affront", "afghan", "afire", "aflame", "afloat", "aflutter", "afoot", "afraid", "africa", "afro", "aft", "after", "afterglow", "afterlife", "aftermath", "aftermost", "afternoon", "ag", "again", "agate", "age", "aged", "ageless", "agency", "agenda", "agent", "ages", "aggregate", "aghast", "agile", "agility", "aging", "aglow", "agnes", "agnew", "agnostic", "ago", "agonize", "agonizing", "agony", "agree", "agreeable", "agreeably", "agreed", "agreeing", "agreement", "aground", "ah", "aha", "ahab", "ahead", "ahem", "ahmed", "ahoy", "ai", "aid", "aide", "aided", "aids", "ail", "aim", "aimed", "aims", "ain't", "air", "airman", "airway", "airy", "aisle", "aj", "ajar", "ajax", "ak", "aka", "akers", "akin", "akqj", "akron", "al", "alabaster", "alan", "alarm", "alas", "alaska", "albatross", "album", "alden", "ale", "alec", "aleck", "alert", "alex", "alexa", "alexei", "alfalfa", "algae", "algebra", "alger", "algorithm", "ali", "alias", "alibi", "alice", "alien", "alienable", "alienate", "aliens", "alight", "align", "alike", "alive", "alkali", "alkaline", "alkalize", "all", "allah", "allan", "allen", "alley", "allied", "allot", "allow", "alloy", "allure", "ally", "alma", "almanac", "almighty", "almost", "alms", "aloe", "aloft", "aloha", "alone", "along", "alongside", "aloof", "aloud", "alp", "alpha", "alphabet", "alps", "alright", "also", "alsop", "altar", "alter", "altho", "although", "altitude", "alto", "alum", "aluminum", "alumni", "alvin", "always", "alyx", "am", "am/fm", "amaretto", "amass", "amaze", "amazingly", "amber", "ambiance", "ambiguity", "ambiguous", "ambition", "ambitious", "amble", "ambulance", "ambush", "amen", "amend", "amendable", "amendment", "amends", "amenity", "ames", "amiable", "amicably", "amid", "amigo", "amino", "amish", "amiss", "amity", "ammo", "ammonia", "ammonium", "amnesty", "amniotic", "amok", "among", "amos", "amount", "amour", "amp", "amperage", "ampere", "ample", "amplifier", "amplify", "amply", "amps", "amuck", "amulet", "amusable", "amuse", "amused", "amusement", "amuser", "amusing", "amy", "an", "anaconda", "anaerobic", "anagram", "anal", "anatomist", "anatomy", "anchor", "anchovy", "ancient", "and", "andes", "andre", "andrew", "android", "andy", "anemia", "anemic", "aneurism", "anew", "angel", "angelfish", "angelic", "angelo", "anger", "angie", "angle", "angled", "angler", "angles", "angling", "anglo", "angrily", "angriness", "angry", "angst", "anguished", "angular", "angus", "animal", "animate", "animating", "animation", "animator", "anime", "animosity", "anita", "ankle", "ann", "anna", "anne", "annex", "annie", "annotate", "announcer", "annoy", "annoying", "annually", "annuity", "annul", "anointer", "anon", "another", "answer", "answering", "ant", "antacid", "antarctic", "ante", "anteater", "antelope", "antennae", "anthem", "anthill", "anthology", "anti", "antibody", "antic", "antics", "antidote", "antihero", "antiquely", "antiques", "antiquity", "antirust", "antitoxic", "antitrust", "antiviral", "antivirus", "antler", "anton", "antonym", "ants", "antsy", "anus", "anvil", "any", "anybody", "anyhow", "anymore", "anyone", "anyplace", "anything", "anytime", "anyway", "anywhere", "ao", "aok", "aorta", "ap", "apache", "apart", "apathy", "ape", "apes", "apex", "aphid", "aplomb", "apostle", "appeal", "appealing", "appear", "appease", "appeasing", "append", "appendage", "appendix", "appetite", "appetizer", "applaud", "applause", "apple", "appliance", "applicant", "applied", "apply", "appointee", "appraisal", "appraiser", "apprehend", "approach", "approval", "approve", "apr", "apricot", "april", "apron", "apt", "aptitude", "aptly", "aq", "aqua", "aqueduct", "ar", "arab", "arabs", "araby", "arbitrary", "arbitrate", "arbor", "arc", "arcade", "arch", "archer", "arcs", "ardent", "ardently", "are", "area", "areas", "arena", "argon", "arguable", "arguably", "argue", "aria", "arid", "arise", "ark", "arlene", "arm", "armadillo", "armband", "armchair", "armed", "armful", "armhole", "arming", "armless", "armoire", "armor", "armored", "armory", "armrest", "arms", "army", "arnold", "aroma", "arose", "around", "arousal", "arrange", "array", "arrest", "arrival", "arrive", "arrogance", "arrogant", "arrow", "arson", "art", "artery", "arthur", "artie", "arts", "arty", "aryan", "as", "asap", "ascend", "ascension", "ascent", "ascertain", "ascii", "ash", "ashamed", "ashen", "ashes", "ashley", "ashy", "asia", "asian", "aside", "ask", "asked", "askew", "asks", "asleep", "asp", "asparagus", "aspect", "aspen", "aspirate", "aspire", "aspirin", "ass", "asses", "asset", "assn", "assure", "asthma", "astonish", "astor", "astound", "astral", "astride", "astrology", "astronaut", "astronomy", "astute", "at", "at&t", "atari", "ate", "athens", "atlantic", "atlas", "atm", "atoll", "atom", "atomic", "atoms", "atonable", "atone", "atop", "atrium", "atrocious", "atrophy", "attach", "attain", "attempt", "attendant", "attendee", "attention", "attentive", "attest", "attic", "attire", "attitude", "attn", "attractor", "attribute", "atypical", "au", "auction", "audacious", "audacity", "audible", "audibly", "audience", "audio", "audit", "audition", "audrey", "aug", "augmented", "augur", "august", "auk", "aunt", "aunts", "aura", "aural", "austin", "authentic", "author", "autism", "autistic", "auto", "autograph", "automaker", "automated", "automatic", "autopilot", "autumn", "av", "avail", "available", "avalanche", "avatar", "avenge", "avenging", "avenue", "average", "aversion", "avert", "avery", "avian", "aviate", "aviation", "aviator", "avid", "avis", "avoid", "avon", "avow", "aw", "await", "awake", "awaken", "award", "aware", "awash", "away", "awe", "awed", "awful", "awhile", "awkward", "awl", "awn", "awning", "awoke", "awol", "awry", "ax", "axe", "axes", "axiom", "axis", "axle", "ay", "aye", "az", "aztec", "azure", "b", "b&w", "b's", "b-52", "ba", "baal", "babble", "babbling", "babe", "babel", "babes", "babied", "baboon", "baby", "bach", "back", "backache", "backboard", "backboned", "backdrop", "backed", "backer", "backfield", "backfire", "backhand", "backing", "backlands", "backlash", "backless", "backlight", "backlit", "backlog", "backpack", "backpedal", "backrest", "backroom", "backshift", "backside", "backslid", "backspace", "backspin", "backstab", "backstage", "backtalk", "backtrack", "backup", "backward", "backwash", "backwater", "backyard", "bacon", "bacteria", "bacterium", "bad", "badass", "badge", "badland", "badly", "badness", "baffle", "baffling", "bag", "bagel", "bagful", "baggage", "bagged", "baggie", "bagginess", "bagging", "baggy", "bagpipe", "bags", "baguette", "bah", "bahama", "bail", "bait", "bake", "baked", "baker", "bakery", "bakes", "bakeshop", "baking", "balance", "balancing", "balcony", "bald", "bale", "bali", "balk", "balkan", "ball", "balled", "ballot", "balls", "balm", "balmy", "balsa", "balsamic", "bambi", "bamboo", "ban", "banal", "banana", "band", "bandit", "bands", "bandy", "bane", "bang", "bangs", "banish", "banister", "banjo", "bank", "bankable", "bankbook", "banked", "banker", "banking", "banknote", "bankroll", "banks", "banner", "bannister", "banshee", "banter", "bar", "barb", "barbecue", "barbed", "barbell", "barber", "barbs", "barcode", "bard", "bare", "barf", "barge", "bargraph", "barista", "baritone", "bark", "barks", "barley", "barmaid", "barman", "barn", "barnes", "barometer", "baron", "barony", "barrack", "barracuda", "barrel", "barrette", "barricade", "barrier", "barry", "bars", "barstool", "bart", "bartender", "barter", "barterer", "barton", "base", "bash", "basic", "basically", "basics", "basil", "basin", "basis", "bask", "basket", "bass", "baste", "bat", "batboy", "batch", "bates", "bath", "bathe", "baths", "baton", "bats", "battalion", "battered", "battering", "battery", "batting", "battle", "bauble", "baud", "bawd", "bawdy", "bawl", "bay", "bayer", "bayou", "bays", "bazaar", "bazooka", "bb", "bbb", "bbbb", "bbc", "bbs", "bc", "bcd", "bd", "be", "beach", "beacon", "bead", "beads", "beady", "beak", "beam", "beams", "bean", "beans", "bear", "beard", "bears", "beast", "beat", "beats", "beau", "beauty", "beaver", "bebop", "beck", "becky", "bed", "beds", "bee", "beech", "beef", "beefy", "been", "beep", "beeps", "beer", "beers", "bees", "beet", "beets", "befall", "befit", "befog", "beg", "began", "beget", "beggar", "begin", "begs", "begun", "behind", "beige", "being", "beirut", "belch", "belfry", "belief", "bell", "bella", "belle", "bellow", "bells", "belly", "below", "belt", "belts", "bemoan", "ben", "bench", "bend", "bender", "bends", "benign", "benny", "bent", "benz", "beret", "berg", "berlin", "berra", "berry", "bert", "berth", "beryl", "beset", "bess", "best", "bet", "beta", "beth", "betray", "bets", "betsy", "bette", "betty", "bevy", "beware", "beyond", "bf", "bflat", "bg", "bh", "bi", "bias", "bib", "bible", "biceps", "bid", "bide", "bids", "bier", "big", "bigamy", "bigot", "bike", "biker", "bikini", "bile", "bilge", "bilk", "bill", "bills", "billy", "bimbo", "bin", "binary", "bind", "binge", "bingo", "biped", "birch", "bird", "birdie", "birds", "birth", "bison", "bisque", "bit", "bite", "bites", "bits", "bitten", "biz", "bj", "bk", "bl", "blab", "blabber", "black", "bladder", "blade", "blah", "blair", "blake", "blame", "blaming", "blanching", "bland", "blandness", "blank", "blare", "blaspheme", "blasphemy", "blast", "blat", "blatancy", "blatantly", "blaze", "blazer", "blazing", "bldg", "bleach", "bleak", "bleat", "bled", "bleed", "bleep", "blemish", "blend", "bless", "blew", "blighted", "blimp", "blind", "bling", "blink", "blinked", "blinker", "blinking", "blinks", "blip", "blips", "bliss", "blissful", "blithe", "blitz", "blizzard", "bloat", "bloated", "bloating", "blob", "blobs", "bloc", "block", "blog", "bloke", "blond", "blonde", "blood", "bloom", "bloomers", "blooming", "bloop", "blooper", "blot", "blotch", "blots", "blouse", "blow", "blown", "blows", "blt", "blubber", "blue", "blues", "bluff", "bluish", "blunderer", "blunt", "blur", "blurb", "blurred", "blurry", "blurs", "blurt", "blush", "blustery", "blvd", "blythe", "bm", "bmw", "bn", "bo", "boa", "boar", "board", "boast", "boaster", "boastful", "boasting", "boat", "boats", "bob", "bobbed", "bobbing", "bobble", "bobby", "bobcat", "bobs", "bobsled", "bobtail", "bodacious", "bode", "body", "bog", "bogey", "bogged", "boggle", "boggy", "bogs", "bogus", "boil", "boils", "boise", "bok", "bold", "bolster", "bolt", "bolts", "bomb", "bombay", "bombs", "bonanza", "bond", "bonded", "bonding", "bondless", "bone", "boned", "bonehead", "boneless", "bonelike", "bones", "boney", "bonfire", "bong", "bongo", "bonn", "bonnet", "bonsai", "bonus", "bony", "boo", "boob", "booby", "boogeyman", "boogie", "boogieman", "book", "books", "boom", "boon", "boondocks", "boone", "boor", "boost", "boot", "booted", "booth", "bootie", "booting", "bootlace", "bootleg", "boots", "booty", "booze", "boozy", "bop", "borax", "border", "bore", "bored", "bores", "borg", "boring", "boris", "born", "borneo", "boron", "borough", "borrower", "borrowing", "bosom", "boss", "bossy", "boston", "botanical", "botanist", "botany", "botch", "both", "bottle", "bottling", "bottom", "bough", "bounce", "bouncing", "bouncy", "bound", "bounding", "boundless", "bountiful", "bout", "bovine", "bow", "bowed", "bowel", "bowie", "bowl", "bowls", "bows", "box", "boxcar", "boxed", "boxer", "boxes", "boxing", "boxlike", "boxy", "boy", "boyd", "boyle", "boys", "bozo", "bp", "bq", "br", "bra", "brace", "brad", "brady", "brag", "brags", "braid", "brain", "brainy", "brake", "bran", "brand", "brandy", "brash", "brass", "brassy", "brat", "brats", "brave", "bravo", "brawl", "brawn", "bray", "brazil", "breach", "bread", "break", "breath", "bred", "breeches", "breeching", "breed", "breeder", "breeding", "breeze", "breezy", "brethren", "brew", "brewery", "brewing", "brian", "briar", "bribe", "brick", "bride", "bridge", "bridged", "brief", "brig", "brigade", "bright", "brilliant", "brim", "brine", "bring", "brink", "briny", "brisk", "brisket", "briskly", "briskness", "bristle", "brittle", "broad", "broadband", "broadcast", "broaden", "broadly", "broadness", "broadside", "broadways", "broil", "broiler", "broiling", "broke", "broken", "broker", "bronchial", "bronco", "bronx", "bronze", "bronzing", "brood", "brook", "broom", "broth", "brought", "brow", "browbeat", "brown", "brownnose", "brows", "browse", "browsing", "bruce", "bruin", "bruising", "brunch", "brunette", "bruno", "brunt", "brush", "brussels", "brutal", "brute", "brutishly", "bryan", "bs", "bt", "btu", "bu", "bub", "bubble", "bubbling", "bubbly", "buccaneer", "buck", "bucked", "bucket", "buckle", "bucks", "buckshot", "buckskin", "bucktooth", "buckwheat", "bud", "buddha", "buddhism", "buddhist", "budding", "buddy", "budge", "budget", "buds", "buff", "buffalo", "buffed", "buffer", "buffing", "buffoon", "bug", "buggy", "bugle", "bugs", "buick", "build", "built", "bulb", "bulbs", "bulge", "bulginess", "bulgur", "bulk", "bulky", "bull", "bulldog", "bulldozer", "bullfight", "bullfrog", "bullhorn", "bullion", "bullish", "bullpen", "bullring", "bulls", "bullseye", "bullwhip", "bully", "bum", "bump", "bumps", "bumpy", "bums", "bun", "bunch", "bunco", "bundle", "bundy", "bungee", "bunion", "bunk", "bunkbed", "bunkhouse", "bunkmate", "bunny", "buns", "bunt", "bunts", "buoy", "bureau", "burg", "burger", "buried", "burke", "burly", "burma", "burn", "burns", "burnt", "burp", "burps", "burro", "burst", "burt", "burton", "bury", "bus", "busboy", "bush", "bushel", "bushy", "busily", "busload", "buss", "bust", "busy", "busybody", "but", "butane", "butch", "butt", "butte", "buxom", "buy", "buyer", "buys", "buzz", "bv", "bvm", "bw", "bwana", "bx", "by", "bye", "bylaw", "byline", "byob", "bypass", "byrd", "byron", "byte", "bytes", "byway", "bz", "c", "c#", "c&w", "c's", "c/o", "ca", "cab", "cabal", "cabana", "cabbage", "cabbie", "cabdriver", "cabin", "cable", "caboose", "cabot", "cache", "cackle", "cacti", "cactus", "caddie", "caddy", "cadet", "cadillac", "cadmium", "caesar", "cafe", "cage", "caged", "cages", "cagey", "cahoots", "cain", "cairn", "cairo", "cajun", "cake", "cakes", "calamari", "calamity", "calcium", "calculate", "calculus", "calf", "caliber", "calibrate", "calico", "call", "calls", "callus", "calm", "calms", "caloric", "calorie", "calvin", "calzone", "cam", "camcorder", "came", "camel", "cameo", "camera", "camisole", "camp", "camper", "campfire", "camping", "camps", "campsite", "campus", "camry", "can", "can't", "canal", "canary", "cancel", "cancer", "candied", "candle", "candy", "cane", "caned", "canes", "canine", "canister", "cannabis", "canned", "canning", "cannon", "cannot", "canny", "canoe", "canola", "canon", "canopener", "canopy", "cans", "canteen", "canto", "canvas", "canyon", "cap", "capable", "capably", "capacity", "cape", "caped", "caper", "capillary", "capital", "capitol", "capped", "capri", "capricorn", "capsize", "capsule", "caption", "captivate", "captive", "captivity", "capture", "car", "caramel", "carat", "caravan", "carbon", "card", "cardboard", "carded", "cardiac", "cardigan", "cardinal", "cardstock", "care", "carefully", "caregiver", "careless", "cares", "caress", "caret", "caretaker", "cargo", "caring", "carl", "carla", "carless", "carlo", "carload", "carmaker", "carnage", "carnation", "carnival", "carnivore", "carol", "carp", "carpenter", "carpentry", "carpet", "carpool", "carport", "carrie", "carried", "carrot", "carrousel", "carry", "cars", "carson", "cart", "cartel", "cartload", "carton", "cartoon", "cartridge", "cartwheel", "caruso", "carve", "carving", "carwash", "cascade", "case", "cases", "casey", "cash", "cashew", "casing", "casino", "cask", "casket", "cassette", "cast", "caste", "casually", "casualty", "cat", "catacomb", "catalog", "catalyst", "catalyze", "catapult", "cataract", "catatonic", "catcall", "catch", "catchable", "catcher", "catching", "catchy", "cater", "caterer", "catering", "catfight", "catfish", "cathedral", "cathouse", "cathy", "catlike", "catnap", "catnip", "cats", "catsup", "cattail", "cattishly", "cattle", "catty", "catwalk", "caucasian", "caucus", "caulk", "causal", "causation", "cause", "causing", "cauterize", "caution", "cautious", "cavalier", "cavalry", "cave", "cavern", "caves", "caviar", "cavity", "cavort", "cb", "cc", "ccc", "cccc", "cccp", "cd", "cde", "ce", "cease", "cecil", "cedar", "cede", "celery", "celestial", "celia", "celibacy", "celibate", "cell", "cello", "celtic", "cement", "census", "cent", "cents", "ceo", "ceramics", "ceremony", "certainly", "certainty", "certified", "certify", "cesar", "cesarean", "cesspool", "cf", "cg", "ch", "chad", "chafe", "chaff", "chaffing", "chain", "chair", "chalice", "chalk", "challenge", "chamber", "chamomile", "champ", "champion", "chance", "change", "channel", "chant", "chaos", "chap", "chapel", "chaperone", "chaplain", "chapped", "chaps", "chapter", "char", "character", "charbroil", "charcoal", "charger", "charging", "chariot", "charity", "charm", "charred", "chart", "charter", "charting", "chase", "chasing", "chasm", "chaste", "chastise", "chastity", "chat", "chatroom", "chats", "chatter", "chatting", "chatty", "cheap", "cheat", "cheating", "check", "cheddar", "cheek", "cheeky", "cheer", "cheese", "cheesy", "chef", "chemicals", "chemist", "chemo", "cherisher", "cherub", "chess", "chest", "chevron", "chevy", "chew", "chewable", "chewer", "chewing", "chews", "chewy", "chi", "chic", "chick", "chide", "chief", "chihuahua", "child", "childcare", "childhood", "childish", "childless", "childlike", "chile", "chili", "chill", "chilly", "chime", "chimp", "chin", "china", "chip", "chips", "chirp", "chirping", "chirpy", "chisel", "chit", "chitchat", "chivalry", "chive", "chloe", "chloride", "chlorine", "chock", "choice", "choir", "choke", "chokehold", "choking", "chomp", "chooser", "choosing", "choosy", "chop", "chopin", "chops", "choral", "chord", "chore", "chose", "chosen", "chow", "chowder", "chowtime", "chris", "chrome", "chub", "chubby", "chuck", "chug", "chum", "chummy", "chump", "chunk", "churn", "chute", "ci", "cia", "ciao", "cicada", "cider", "cigar", "cilantro", "cilia", "cinch", "cindy", "cinema", "cinnamon", "cipher", "circa", "circe", "circle", "circling", "circular", "circulate", "circus", "citable", "citadel", "citation", "cite", "citizen", "citric", "citrus", "city", "civet", "civic", "civil", "cj", "ck", "cl", "clad", "claim", "clam", "clambake", "clammy", "clamor", "clamp", "clamshell", "clan", "clang", "clank", "clanking", "clap", "clapped", "clapper", "clapping", "claps", "clara", "clarify", "clarinet", "clarity", "clark", "clash", "clasp", "class", "clatter", "claus", "clause", "clavicle", "claw", "claws", "clay", "clean", "clear", "cleat", "cleaver", "clef", "cleft", "clem", "clench", "cleo", "clergyman", "clerical", "clerk", "clever", "cliche", "click", "clicker", "client", "cliff", "climate", "climatic", "climb", "cling", "clinic", "clink", "clinking", "clip", "clique", "cloak", "clobber", "clock", "clod", "clog", "clone", "cloning", "closable", "close", "closet", "closure", "clot", "cloth", "clothes", "clothing", "cloud", "clout", "clove", "clover", "clown", "cloy", "club", "clubbed", "clubbing", "clubhouse", "clubs", "cluck", "clue", "clues", "clump", "clumsily", "clumsy", "clung", "clunky", "clustered", "clutch", "clutter", "clyde", "cm", "cn", "co", "co2", "coach", "coagulant", "coal", "coast", "coastal", "coaster", "coasting", "coastland", "coastline", "coat", "coats", "coauthor", "coax", "cob", "cobalt", "cobble", "cobbler", "cobol", "cobra", "cobweb", "coca", "cock", "cockle", "cocky", "cocoa", "coconut", "cod", "coda", "coddle", "code", "coded", "codes", "cody", "coed", "coeditor", "coerce", "coexist", "coffee", "cofounder", "cog", "cogent", "cognition", "cognitive", "cogs", "cogwheel", "cohen", "coherence", "coherent", "cohesive", "coif", "coil", "coils", "coin", "coins", "coke", "cola", "colby", "cold", "cole", "coleslaw", "coliseum", "collage", "collapse", "collar", "collected", "collector", "collide", "collie", "collision", "colon", "colonial", "colonist", "colonize", "colony", "color", "colossal", "colt", "coma", "comb", "combat", "combo", "come", "comet", "comfort", "comfy", "comic", "coming", "comma", "commence", "commend", "comment", "commerce", "commode", "commodity", "commodore", "common", "commotion", "commute", "commuting", "compacted", "compacter", "compactly", "compactor", "companion", "company", "compare", "compel", "compile", "comply", "component", "composed", "composer", "composite", "compost", "composure", "compound", "compress", "comprised", "computer", "computing", "comrade", "con", "concave", "conceal", "conceded", "concept", "concerned", "concert", "conch", "concierge", "concise", "conclude", "concrete", "concur", "condense", "condiment", "condition", "condo", "condone", "conducive", "conductor", "conduit", "cone", "coney", "confess", "confetti", "confidant", "confident", "confider", "confiding", "configure", "confined", "confining", "confirm", "conflict", "conform", "confound", "confront", "confused", "confusing", "confusion", "congenial", "congested", "congo", "congrats", "congress", "conic", "conical", "conjoined", "conjure", "conjuror", "connected", "connector", "consensus", "consent", "console", "consoling", "consonant", "constable", "constant", "constrain", "constrict", "construct", "consult", "consumer", "consuming", "contact", "container", "contempt", "contend", "contented", "contently", "contents", "contest", "context", "contort", "contour", "contrite", "control", "contusion", "convene", "convent", "convex", "convoy", "conway", "coo", "cook", "cooky", "cool", "coon", "coop", "cooper", "coors", "coos", "coot", "cop", "copartner", "cope", "copes", "copied", "copier", "copilot", "coping", "copious", "copper", "copra", "cops", "copy", "coral", "cord", "cords", "core", "cork", "corn", "cornball", "cornbread", "corncob", "cornea", "corned", "corner", "cornfield", "cornflake", "cornhusk", "cornmeal", "cornstalk", "corny", "coronary", "coroner", "corp", "corporal", "corporate", "corps", "corral", "correct", "corridor", "corrode", "corroding", "corrosive", "corsage", "corset", "cortex", "cosigner", "cosmetics", "cosmic", "cosmos", "cosponsor", "cost", "costs", "cot", "cottage", "cotton", "couch", "cough", "could", "count", "countable", "countdown", "counting", "countless", "country", "county", "coup", "coupe", "courier", "court", "cousin", "cove", "coven", "covenant", "cover", "covet", "coveted", "coveting", "cow", "cowboy", "cowl", "cows", "cox", "coy", "coyness", "coyote", "cozily", "coziness", "cozy", "cp", "cpa", "cpr", "cpu", "cq", "cr", "crab", "crabbing", "crabgrass", "crablike", "crabmeat", "crack", "cradle", "cradling", "craft", "crafter", "craftily", "craftsman", "craftwork", "crafty", "crag", "craig", "cram", "cramp", "cranberry", "crane", "cranial", "cranium", "crank", "crap", "craps", "crash", "crass", "crate", "crater", "crave", "craving", "crawfish", "crawl", "crawlers", "crawling", "crayfish", "crayon", "craze", "crazed", "crazily", "craziness", "crazy", "creak", "cream", "creamed", "creamer", "creamlike", "crease", "creasing", "creatable", "create", "creation", "creative", "creature", "credible", "credibly", "credit", "credo", "creed", "creek", "creep", "creme", "creole", "crepe", "crept", "crescent", "cress", "crest", "crested", "cresting", "crestless", "crete", "crevice", "crew", "crewless", "crewman", "crewmate", "crib", "cricket", "cried", "crier", "crime", "crimp", "crimson", "cringe", "cringing", "crinkle", "crinkly", "crisp", "crisped", "crisping", "crisply", "crispness", "crispy", "criteria", "critter", "croak", "crock", "crocus", "crone", "crony", "crook", "croon", "crop", "crops", "cross", "crouch", "crouton", "crow", "crowbar", "crowd", "crown", "crows", "crt", "crucial", "crud", "crude", "crudely", "crudeness", "cruel", "cruelly", "cruelness", "cruelty", "crumb", "crummiest", "crummy", "crumpet", "crumpled", "crunch", "cruncher", "crunching", "crunchy", "crusader", "crush", "crushable", "crushed", "crusher", "crushing", "crust", "crux", "cry", "crying", "crypt", "cryptic", "crystal", "cs", "ct", "cu", "cub", "cuba", "cuban", "cubbyhole", "cube", "cubic", "cubical", "cubicle", "cubs", "cucumber", "cud", "cuddle", "cuddly", "cue", "cues", "cuff", "cufflink", "culinary", "cull", "culminate", "culpable", "culprit", "cult", "cultivate", "cults", "cultural", "culture", "cup", "cupbearer", "cupcake", "cupful", "cupid", "cupped", "cupping", "cups", "cur", "curable", "curator", "curb", "curd", "curdle", "cure", "cured", "curfew", "curie", "curing", "curio", "curl", "curled", "curler", "curliness", "curling", "curls", "curly", "curry", "curse", "cursive", "cursor", "curt", "curtain", "curtly", "curtsy", "curvature", "curve", "curvy", "cushy", "cusp", "cuss", "cussed", "custard", "custodian", "custody", "customary", "customer", "customize", "customs", "cut", "cute", "cutlet", "cuts", "cv", "cw", "cx", "cy", "cycle", "cyclic", "cycling", "cyclist", "cylinder", "cymbal", "cynic", "cyrus", "cyst", "cytoplasm", "cytoplast", "cz", "czar", "czech", "d", "d&d", "d's", "d-day", "da", "dab", "dad", "daddy", "daffodil", "daffy", "daft", "dagger", "dahlia", "daily", "daintily", "dainty", "dairy", "dais", "daisy", "dale", "dally", "dallying", "dam", "dame", "damn", "damon", "damp", "damsel", "dan", "dana", "dance", "dancing", "dandelion", "dander", "dandruff", "dandy", "dane", "dang", "danger", "dangle", "dangling", "dank", "danny", "dante", "dare", "dared", "daredevil", "dares", "daringly", "dark", "darken", "darkened", "darkening", "darkish", "darkness", "darkroom", "darling", "darn", "dart", "darts", "darwin", "darwinism", "daryl", "dash", "dastardly", "data", "date", "datebook", "dates", "dating", "datum", "daub", "daughter", "daunt", "daunting", "dave", "david", "davis", "davy", "dawdler", "dawn", "day", "daybed", "daybreak", "daycare", "daydream", "daylight", "daylong", "dayroom", "days", "daytime", "daze", "dazed", "dazzler", "dazzling", "db", "dbms", "dc", "dd", "ddd", "dddd", "dds", "ddt", "de", "deacon", "dead", "deaf", "deafening", "deafness", "deal", "dealer", "dealing", "dealmaker", "deals", "dealt", "dean", "dear", "death", "debatable", "debate", "debating", "debby", "debit", "debra", "debrief", "debris", "debt", "debtless", "debtor", "debts", "debug", "debunk", "debut", "dec", "decade", "decaf", "decal", "decathlon", "decay", "deceased", "deceit", "deceiver", "deceiving", "december", "decency", "decent", "deception", "deceptive", "decibel", "decidable", "decimal", "decimeter", "decipher", "deck", "declared", "decline", "decode", "decompose", "decor", "decorated", "decorator", "decoy", "decrease", "decree", "decry", "dedicate", "dedicator", "deduce", "deduct", "dee", "deed", "deeds", "deejay", "deem", "deep", "deepen", "deeply", "deepness", "deer", "def", "deface", "defacing", "defame", "default", "defeat", "defect", "defection", "defective", "defendant", "defender", "defense", "defensive", "defer", "deferral", "deferred", "defiance", "defiant", "defile", "defiling", "define", "definite", "deflate", "deflation", "deflator", "deflected", "deflector", "defog", "deforest", "deform", "defraud", "defrost", "deft", "deftly", "defuse", "defy", "degraded", "degrading", "degrease", "degree", "dehydrate", "deify", "deity", "dejected", "del", "delay", "delegate", "delegator", "delete", "deletion", "delhi", "deli", "delia", "delicacy", "delicate", "delicious", "delighted", "delirious", "delirium", "deliverer", "delivery", "della", "delouse", "delta", "deluge", "delusion", "deluxe", "delve", "demanding", "demeaning", "demeanor", "demise", "demo", "democracy", "democrat", "demon", "demote", "demotion", "demur", "demystify", "den", "denatured", "deniable", "denial", "denim", "denny", "denote", "dense", "density", "dent", "dental", "dentist", "dents", "denture", "deny", "deodorant", "deodorize", "departed", "departure", "depict", "deplete", "depletion", "deplored", "deploy", "deport", "depose", "depot", "depraved", "depravity", "deprecate", "depress", "deprive", "dept", "depth", "deputize", "deputy", "derail", "deranged", "derby", "derek", "derived", "desecrate", "deserve", "deserving", "designate", "designed", "designer", "designing", "desist", "desk", "deskbound", "desks", "desktop", "deskwork", "desolate", "despair", "despise", "despite", "destiny", "destitute", "destruct", "detach", "detached", "detail", "detection", "detective", "detector", "detention", "deter", "detergent", "detest", "detonate", "detonator", "detox", "detoxify", "detract", "deuce", "devalue", "deviancy", "deviant", "deviate", "deviation", "deviator", "device", "devil", "devious", "devoid", "devotedly", "devotee", "devotion", "devourer", "devouring", "devoutly", "dew", "dewey", "dewy", "dexterity", "dexterous", "df", "dg", "dh", "di", "diabetes", "diabetic", "diabolic", "diagnoses", "diagnosis", "diagram", "dial", "dials", "diameter", "diana", "diane", "diaper", "diaphragm", "diary", "dibs", "dice", "dicing", "dick", "dictate", "dictation", "dictator", "did", "die", "died", "diego", "dies", "diesel", "diet", "diets", "difficult", "diffused", "diffuser", "diffusion", "diffusive", "dig", "digit", "digs", "dike", "dilate", "dilation", "diligence", "diligent", "dill", "dilute", "dim", "dime", "dimes", "diminish", "dimly", "dimmed", "dimmer", "dimness", "dimple", "dims", "din", "dinah", "dine", "diner", "ding", "dingbat", "dinghy", "dinginess", "dingo", "dingy", "dining", "dinner", "dint", "diocese", "diode", "dioxide", "dip", "diploma", "dipped", "dipper", "dipping", "dips", "dire", "directed", "direction", "directive", "directly", "directory", "direness", "dirge", "dirk", "dirt", "dirtiness", "dirty", "disabled", "disagree", "disallow", "disarm", "disarray", "disaster", "disband", "disbelief", "disburse", "disc", "discard", "discern", "discharge", "disclose", "disco", "discolor", "discount", "discourse", "discover", "discuss", "disdain", "disengage", "disfigure", "disgrace", "dish", "disinfect", "disjoin", "disk", "dislike", "disliking", "dislocate", "dislodge", "disloyal", "dismantle", "dismay", "dismiss", "dismount", "disney", "disobey", "disorder", "disown", "disparate", "disparity", "dispatch", "dispense", "dispersal", "dispersed", "disperser", "displace", "display", "displease", "disposal", "dispose", "disprove", "dispute", "disregard", "disrupt", "dissuade", "distance", "distant", "distaste", "distill", "distinct", "distort", "distract", "distress", "district", "distrust", "ditch", "ditto", "ditty", "ditzy", "diva", "divan", "dive", "dives", "dividable", "divided", "dividend", "dividers", "dividing", "divinely", "diving", "divinity", "divisible", "divisibly", "division", "divisive", "divorcee", "divot", "dixie", "dizziness", "dizzy", "dj", "dk", "dl", "dm", "dn", "dna", "do", "doable", "dobro", "doc", "docile", "dock", "docket", "doctor", "doctrine", "document", "dodge", "dodgy", "dodo", "doe", "does", "doff", "dog", "dogma", "dogs", "doily", "doing", "dolby", "dole", "doll", "dollar", "dollhouse", "dollop", "dolly", "dolphin", "dolt", "domain", "dome", "domed", "domelike", "domestic", "dominion", "domino", "dominoes", "don", "don't", "donated", "donation", "donator", "done", "donna", "donor", "donut", "doodle", "doom", "door", "doorbell", "doorframe", "doorknob", "doorman", "doormat", "doornail", "doorpost", "doorstep", "doorstop", "doorway", "doozy", "dope", "dopey", "dora", "doris", "dork", "dorm", "dormitory", "dorsal", "dosage", "dose", "dot", "dote", "dots", "dotted", "double", "doubling", "doubt", "douche", "doug", "dough", "douse", "dove", "doves", "dowel", "down", "dowry", "doze", "dozen", "dp", "dq", "dr", "drab", "draft", "drag", "dragging", "dragonfly", "dragonish", "dragster", "drain", "drainable", "drainage", "drained", "drainer", "drainpipe", "drake", "drama", "dramatic", "dramatize", "drank", "drape", "drapery", "drastic", "draw", "drawl", "drawn", "dread", "dreaded", "dreadful", "dreadlock", "dream", "dreamboat", "dreamily", "dreamland", "dreamless", "dreamlike", "dreamt", "dreamy", "drearily", "dreary", "dregs", "drench", "dress", "dressy", "drew", "dribble", "dried", "drier", "dries", "drift", "drill", "driller", "drilling", "drink", "drinkable", "drinking", "drip", "dripping", "drippy", "drips", "drivable", "drive", "driven", "driver", "driveway", "driving", "drizzle", "drizzly", "droid", "droll", "drone", "drool", "droop", "drop", "drop-down", "dropbox", "dropkick", "droplet", "dropout", "dropper", "drops", "drove", "drown", "drowsily", "dru", "drub", "drudge", "drug", "drugs", "druid", "drum", "drums", "drunk", "dry", "dryad", "ds", "dt", "du", "dual", "duane", "dub", "dubbed", "dubiously", "dublin", "duchess", "duck", "duckbill", "ducking", "duckling", "ducks", "ducktail", "ducky", "duct", "dud", "dude", "due", "duel", "dues", "duet", "duff", "duffel", "dug", "dugout", "duh", "duke", "dull", "duller", "dullness", "dully", "duly", "dumb", "dumbo", "dummy", "dump", "dumping", "dumpling", "dumps", "dumpster", "dumpy", "dun", "dunce", "dune", "dung", "dunk", "duo", "dupe", "duplex", "duplicate", "duplicity", "durable", "durably", "duration", "duress", "during", "dusk", "dusky", "dust", "dusty", "dutch", "dutiful", "duty", "duvet", "dv", "dw", "dwarf", "dweeb", "dwell", "dwelled", "dweller", "dwelling", "dwelt", "dwight", "dwindle", "dwindling", "dx", "dy", "dyad", "dye", "dyed", "dying", "dylan", "dynamic", "dynamite", "dynamo", "dynasty", "dyslexia", "dyslexic", "dz", "e", "e's", "ea", "each", "eager", "eagle", "ear", "earache", "eardrum", "earflap", "earful", "earl", "earlobe", "early", "earmark", "earmuff", "earn", "earns", "earphone", "earpiece", "earplugs", "earring", "ears", "earshot", "earth", "earthen", "earthlike", "earthling", "earthly", "earthworm", "earthy", "earwig", "ease", "easeful", "easel", "easiest", "easily", "easiness", "easing", "east", "eastbound", "eastcoast", "easter", "eastward", "easy", "eat", "eatable", "eaten", "eater", "eatery", "eating", "eats", "eave", "eaves", "eb", "ebay", "ebb", "ebony", "ebook", "ec", "ecard", "eccentric", "echo", "eclair", "eclipse", "ecologist", "ecology", "economic", "economist", "economy", "ecosphere", "ecosystem", "ed", "eddie", "eddy", "eden", "edgar", "edge", "edges", "edginess", "edging", "edgy", "edible", "edict", "edify", "edit", "edith", "edition", "editor", "edits", "edna", "edsel", "educated", "education", "educator", "edwin", "ee", "eee", "eeee", "eeg", "eel", "eerie", "ef", "efface", "effective", "effects", "efficient", "effort", "efg", "eflat", "eft", "eg", "egg", "eggbeater", "egging", "eggnog", "eggplant", "eggs", "eggshell", "ego", "egomaniac", "egotism", "egotistic", "egress", "egret", "egypt", "eh", "ei", "eight", "either", "ej", "eject", "ek", "ekg", "el", "elaborate", "elastic", "elate", "elated", "elbow", "elder", "eldercare", "elderly", "eldest", "elect", "electable", "election", "elective", "elegy", "elena", "elephant", "elevate", "elevating", "elevation", "elevator", "eleven", "elf", "elfin", "eli", "elide", "eligible", "eligibly", "eliminate", "eliot", "elite", "elitism", "elixir", "eliza", "elk", "elks", "ella", "ellen", "ellipse", "elliptic", "elm", "elmer", "elms", "elongated", "elope", "eloquence", "eloquent", "elroy", "else", "elsewhere", "elsie", "elton", "elude", "elusive", "elves", "elvis", "ely", "em", "email", "embalm", "embargo", "embark", "embassy", "embattled", "embed", "embellish", "ember", "embezzle", "emblaze", "emblem", "embody", "embolism", "emboss", "embroider", "emcee", "emerald", "emergency", "emery", "emil", "emile", "emily", "emission", "emit", "emits", "emma", "emmy", "emote", "emoticon", "emotion", "empathic", "empathy", "emperor", "emphases", "emphasis", "emphasize", "emphatic", "empirical", "employ", "employed", "employee", "employer", "emporium", "empower", "emptier", "emptiness", "empty", "emu", "en", "enable", "enact", "enactment", "enamel", "enchanted", "enchilada", "encircle", "enclose", "enclosure", "encode", "encore", "encounter", "encourage", "encroach", "encrust", "encrypt", "end", "endanger", "endeared", "endearing", "ended", "ending", "endless", "endnote", "endocrine", "endorphin", "endorse", "endow", "endowment", "endpoint", "ends", "endurable", "endurance", "enduring", "enema", "enemy", "energetic", "energize", "energy", "enforced", "enforcer", "engaged", "engaging", "engine", "engorge", "engraved", "engraver", "engraving", "engross", "engulf", "enhance", "enigma", "enigmatic", "enjoy", "enjoyable", "enjoyably", "enjoyer", "enjoying", "enjoyment", "enlarged", "enlarging", "enlighten", "enlisted", "enmity", "ennui", "enoch", "enquirer", "enrage", "enrich", "enroll", "ensnare", "ensue", "ensure", "entail", "entangled", "enter", "entering", "entertain", "enticing", "entire", "entitle", "entity", "entomb", "entourage", "entrap", "entree", "entrench", "entrust", "entry", "entryway", "entwine", "enunciate", "envelope", "enviable", "enviably", "envious", "envision", "envoy", "envy", "enzyme", "eo", "eon", "eons", "ep", "epic", "epics", "epidemic", "epidermal", "epidermis", "epidural", "epilepsy", "epileptic", "epilogue", "epiphany", "episode", "epoch", "epoxy", "epsom", "eq", "equal", "equate", "equation", "equator", "equinox", "equip", "equipment", "equity", "equivocal", "er", "era", "eradicate", "erasable", "erase", "erased", "eraser", "erasure", "erect", "ergo", "ergonomic", "eric", "erica", "erie", "erik", "erin", "ernest", "ernie", "erode", "eros", "err", "errand", "errant", "erratic", "errol", "error", "erupt", "es", "escalate", "escalator", "escapable", "escapade", "escapist", "escargot", "eskimo", "esophagus", "esp", "espionage", "espresso", "espy", "esq", "esquire", "essay", "essence", "essential", "establish", "estate", "esteemed", "ester", "estimate", "estimator", "estranged", "estrogen", "et", "eta", "etc", "etch", "etching", "eternal", "eternity", "ethanol", "ethel", "ether", "ethic", "ethically", "ethics", "ethos", "ethyl", "etude", "eu", "euphemism", "eureka", "ev", "eva", "evacuate", "evacuee", "evade", "evaluate", "evaluator", "evans", "evaporate", "evasion", "evasive", "eve", "even", "event", "ever", "everglade", "evergreen", "every", "everybody", "everyday", "everyone", "evict", "evidence", "evident", "evil", "evita", "evoke", "evolution", "evolve", "ew", "ewe", "ex", "exact", "exalt", "exalted", "exam", "example", "exams", "excavate", "excavator", "exceeding", "excel", "exception", "excess", "exchange", "excitable", "exciting", "exclaim", "exclude", "excluding", "exclusion", "exclusive", "excretion", "excretory", "excursion", "excusable", "excusably", "excuse", "exec", "exemplary", "exemplify", "exemption", "exerciser", "exert", "exes", "exfoliate", "exhale", "exhaust", "exhume", "exile", "exist", "existing", "exit", "exits", "exodus", "exonerate", "exorcism", "exorcist", "expand", "expanse", "expansion", "expansive", "expectant", "expedited", "expediter", "expel", "expend", "expenses", "expensive", "expert", "expire", "expiring", "explain", "expletive", "explicit", "explode", "exploit", "explore", "exploring", "expo", "exponent", "exporter", "exposable", "expose", "exposure", "express", "expulsion", "exquisite", "extant", "extended", "extending", "extent", "extenuate", "exterior", "external", "extinct", "extol", "extortion", "extra", "extradite", "extras", "extrovert", "extrude", "extruding", "exuberant", "exult", "exxon", "ey", "eye", "eyed", "eyes", "ez", "ezra", "f", "f#", "f's", "fa", "fable", "fabric", "fabulous", "face", "facebook", "facecloth", "facedown", "faceless", "facelift", "faceplate", "faces", "facet", "faceted", "facial", "facile", "facility", "facing", "facsimile", "fact", "faction", "factoid", "factor", "facts", "factsheet", "factual", "faculty", "fad", "fade", "fading", "fads", "fail", "failing", "faint", "fair", "fairy", "faith", "fake", "faker", "falcon", "fall", "false", "falsify", "fame", "familiar", "family", "famine", "famished", "fan", "fanatic", "fancied", "fanciness", "fancy", "fanfare", "fang", "fangs", "fanning", "fanny", "fans", "fantasize", "fantastic", "fantasy", "far", "farce", "fare", "farm", "farms", "fascism", "fast", "fastball", "faster", "fasting", "fastness", "fat", "fatal", "fate", "father", "fats", "fatty", "faucet", "fault", "fauna", "faust", "faux", "favorable", "favorably", "favored", "favoring", "favorite", "fawn", "fax", "faze", "fb", "fbi", "fc", "fd", "fe", "fear", "fears", "feast", "feat", "feb", "fed", "federal", "fedora", "fee", "feeble", "feed", "feeds", "feel", "feels", "fees", "feet", "feign", "feint", "feisty", "felice", "feline", "felix", "fell", "felon", "felt", "felt-tip", "feminine", "feminism", "feminist", "feminize", "femur", "fence", "fencing", "fend", "fender", "ferment", "fern", "fernlike", "ferocious", "ferocity", "ferret", "ferris", "ferry", "fervor", "fester", "festival", "festive", "festivity", "fetal", "fetch", "fete", "fetid", "fetus", "feud", "fever", "few", "fez", "ff", "fff", "ffff", "fg", "fgh", "fh", "fi", "fiat", "fib", "fiber", "fickle", "fiction", "fiddle", "fiddling", "fidelity", "fidgeting", "fidgety", "fido", "field", "fiend", "fiery", "fife", "fifteen", "fifth", "fiftieth", "fifty", "fig", "fight", "figment", "figs", "figure", "figurine", "fiji", "filch", "file", "filed", "files", "filet", "filing", "fill", "filled", "filler", "filling", "filly", "film", "films", "filmy", "filter", "filth", "filtrate", "fin", "final", "finale", "finalist", "finalize", "finally", "finance", "financial", "finch", "find", "fine", "fined", "fineness", "finer", "finicky", "finished", "finisher", "finishing", "finite", "fink", "finless", "finlike", "finn", "finny", "fir", "fire", "firm", "first", "fiscally", "fish", "fishy", "fist", "fit", "fits", "five", "fix", "fixed", "fizz", "fj", "fjord", "fk", "fl", "flab", "flaccid", "flag", "flagman", "flagpole", "flagship", "flagstick", "flagstone", "flail", "flair", "flak", "flake", "flakily", "flaky", "flame", "flammable", "flank", "flanked", "flanking", "flannels", "flap", "flare", "flaring", "flash", "flashback", "flashbulb", "flashcard", "flashily", "flashing", "flashy", "flask", "flat", "flatbed", "flatfoot", "flatly", "flatness", "flatten", "flattered", "flatterer", "flattery", "flattop", "flatware", "flatworm", "flavor", "flavored", "flavorful", "flavoring", "flaw", "flax", "flaxseed", "flay", "flea", "fled", "flee", "fleet", "flesh", "fleshed", "fleshy", "flew", "flex", "flick", "flier", "flies", "flight", "flinch", "fling", "flint", "flip", "flirt", "flit", "flo", "float", "flock", "flog", "flogging", "flood", "floor", "flop", "floppy", "flora", "floral", "florist", "floss", "flounder", "flour", "flow", "flown", "floyd", "flu", "flub", "flue", "fluff", "fluid", "fluke", "flung", "flush", "flute", "flux", "fly", "flyable", "flyaway", "flyer", "flying", "flyover", "flypaper", "fm", "fn", "fo", "foal", "foam", "foamy", "fob", "focal", "focus", "fodder", "foe", "foes", "fog", "foggy", "fogy", "foil", "foist", "fold", "folic", "folio", "folk", "follicle", "follow", "folly", "fond", "fondling", "fondly", "fondness", "fondue", "font", "food", "fool", "foot", "footage", "football", "footbath", "footboard", "footer", "footgear", "foothill", "foothold", "footing", "footless", "footman", "footnote", "footpad", "footpath", "footprint", "footrest", "footsie", "footsore", "footwear", "footwork", "fop", "for", "foray", "force", "ford", "fore", "forge", "forgot", "fork", "form", "forms", "fort", "forte", "forth", "forty", "forum", "fossil", "foster", "foul", "found", "founder", "founding", "fount", "fountain", "four", "fowl", "fox", "foxes", "foxy", "foyer", "fp", "fq", "fr", "fraction", "fracture", "fragile", "fragility", "fragment", "fragrance", "fragrant", "frail", "frame", "framing", "france", "frank", "frantic", "franz", "fraternal", "frau", "fraud", "fray", "frayed", "fraying", "frays", "freak", "freckled", "freckles", "fred", "free", "freebase", "freebee", "freebie", "freed", "freedom", "freefall", "freehand", "freeing", "freeload", "freely", "freemason", "freeness", "freer", "freestyle", "freeware", "freeway", "freewill", "freezable", "freezing", "freight", "french", "frenzied", "frenzy", "freon", "frequency", "frequent", "fresh", "fret", "fretful", "fretted", "freud", "fri", "friar", "friction", "friday", "fridge", "fried", "friend", "fries", "frighten", "frightful", "frigidity", "frigidly", "frill", "frilly", "fringe", "frisbee", "frisk", "frisky", "fritter", "fritz", "frivolous", "frock", "frog", "frogs", "frolic", "from", "frond", "front", "frost", "frostbite", "frosted", "frostily", "frosting", "frostlike", "frosty", "froth", "frown", "froze", "frozen", "fructose", "frugality", "frugally", "fruit", "frustrate", "fry", "frying", "fs", "ft", "fu", "fudge", "fuel", "fugue", "fuji", "full", "fully", "fumble", "fume", "fumes", "fun", "fund", "funds", "fungi", "funk", "funky", "funny", "fur", "furl", "furry", "furs", "fury", "fuse", "fuss", "fussy", "fuzz", "fuzzy", "fv", "fw", "fx", "fy", "fyi", "fz", "g", "g's", "ga", "gab", "gable", "gadget", "gaea", "gaffe", "gag", "gags", "gail", "gaily", "gain", "gainfully", "gaining", "gains", "gait", "gal", "gala", "galaxy", "gale", "gall", "gallantly", "galleria", "gallery", "galley", "gallon", "gallop", "gallows", "gallstone", "galore", "galvanize", "gam", "gambling", "game", "games", "gaming", "gamma", "gamut", "gamy", "gander", "gang", "gangly", "gangrene", "gangs", "gangway", "gap", "gape", "gapes", "gaps", "garage", "garb", "garbage", "garden", "gargle", "garish", "garland", "garlic", "garment", "garnet", "garnish", "garter", "gary", "gas", "gash", "gasp", "gasps", "gassy", "gate", "gates", "gatherer", "gathering", "gating", "gator", "gauche", "gaudy", "gauge", "gauging", "gaunt", "gauntlet", "gauze", "gave", "gavel", "gawk", "gawky", "gay", "gaze", "gazed", "gazes", "gazing", "gb", "gc", "gd", "ge", "gear", "gears", "gecko", "gee", "geek", "geese", "geiger", "gel", "geld", "gem", "gems", "gender", "gene", "generic", "generous", "genes", "genetics", "genie", "genre", "gent", "gentile", "gentleman", "gently", "gentry", "gents", "geo", "geography", "geologic", "geologist", "geology", "geometric", "geometry", "geranium", "gerbil", "geriatric", "germ", "germicide", "germinate", "germless", "germproof", "germs", "gestate", "gestation", "gesture", "get", "getaway", "gets", "getting", "getup", "gf", "gg", "ggg", "gggg", "gh", "ghetto", "ghi", "ghost", "ghoul", "ghq", "gi", "giant", "gibberish", "giblet", "giddily", "giddiness", "giddy", "gift", "gifts", "gig", "gigabyte", "gigahertz", "gigantic", "giggle", "giggling", "giggly", "gigolo", "gil", "gila", "gild", "gill", "gilled", "gills", "gilt", "gimme", "gimmick", "gimpy", "gin", "gina", "ginger", "gino", "gird", "girdle", "girl", "girls", "girth", "gist", "give", "giveaway", "given", "giver", "gives", "giving", "gizmo", "gizzard", "gj", "gk", "gl", "glacial", "glacier", "glad", "glade", "gladiator", "gladly", "glamor", "glamorous", "glamour", "glance", "glancing", "gland", "glandular", "glare", "glaring", "glass", "glaucoma", "glaze", "glazing", "gleam", "gleaming", "glean", "glee", "gleeful", "glen", "glenn", "glib", "glide", "glider", "gliding", "glimmer", "glimpse", "glint", "glisten", "glitch", "glitter", "glitzy", "gloat", "gloater", "gloating", "glob", "globe", "gloom", "gloomily", "gloomy", "glorified", "glorifier", "glorify", "glorious", "glory", "gloss", "glove", "glow", "glowing", "glows", "glowworm", "glucose", "glue", "glued", "gluey", "gluing", "glum", "glut", "gluten", "glutinous", "glutton", "gm", "gmt", "gn", "gnarly", "gnash", "gnat", "gnaw", "gnaws", "gnome", "gnp", "gnu", "go", "goad", "goal", "goals", "goat", "goats", "goatskin", "gob", "god", "godly", "gods", "goes", "goggle", "goggles", "gogh", "gogo", "going", "gold", "goldfish", "goldmine", "goldsmith", "golf", "goliath", "golly", "gomez", "gonad", "gondola", "gone", "gong", "goo", "good", "goods", "goody", "gooey", "goof", "goofball", "goofiness", "goofy", "google", "goon", "goose", "gopher", "gordon", "gore", "gorge", "gorged", "gorgeous", "gory", "gosh", "gosling", "gospel", "gossip", "got", "gothic", "gotten", "gouge", "gould", "gourd", "gout", "govt", "gown", "gowns", "gp", "gpa", "gq", "gr", "grab", "grabs", "grace", "graceful", "graceless", "gracious", "grad", "gradation", "grade", "graded", "grader", "gradient", "grading", "gradually", "graduate", "grady", "graffiti", "graft", "grafted", "grafting", "grail", "grain", "gram", "grams", "grand", "granddad", "grandkid", "grandly", "grandma", "grandpa", "grandson", "granite", "granny", "granola", "grant", "granular", "grape", "graph", "grapple", "grappling", "grasp", "grass", "grate", "gratified", "gratify", "grating", "gratitude", "gratuity", "grave", "gravel", "graveness", "graves", "graveyard", "gravitate", "gravity", "gravy", "gray", "graze", "grazing", "greasily", "great", "greed", "greedily", "greedless", "greedy", "greek", "green", "greet", "greeter", "greeting", "greg", "greta", "grew", "grey", "greyhound", "grid", "grief", "grievance", "grieve", "grieving", "grievous", "grill", "grim", "grimace", "grimacing", "grime", "griminess", "grimy", "grin", "grinch", "grind", "grinning", "grins", "grip", "gripe", "grips", "grist", "gristle", "grit", "groan", "grog", "groggily", "groggy", "groin", "groom", "groove", "grooving", "groovy", "grope", "gross", "ground", "group", "grouped", "grout", "grove", "grow", "grower", "growing", "growl", "grown", "grows", "grub", "grubs", "grudge", "grudging", "grueling", "gruff", "gruffly", "grumble", "grumbling", "grumbly", "grumpily", "grunge", "grunt", "gs", "gt", "gu", "guacamole", "guam", "guano", "guard", "guess", "guest", "gui", "guidable", "guidance", "guide", "guiding", "guild", "guile", "guileless", "guilt", "guise", "guitar", "gulag", "gulf", "gull", "gullible", "gulls", "gully", "gulp", "gum", "gumball", "gumbo", "gumdrop", "gumminess", "gumming", "gummy", "gun", "gunk", "guns", "guppy", "gurgle", "gurgling", "guru", "gus", "gush", "gust", "gusto", "gusts", "gusty", "gut", "gutless", "guts", "gutsy", "gutter", "guy", "guys", "guzzler", "gv", "gw", "gwen", "gx", "gy", "gym", "gyp", "gypsum", "gypsy", "gyration", "gyro", "gz", "h", "h's", "h2o", "ha", "habit", "habitable", "habitant", "habitat", "habitual", "hack", "hacked", "hacker", "hacking", "hacksaw", "had", "hag", "haggler", "haha", "haiku", "hail", "hair", "hairdo", "hairs", "hairy", "haiti", "hal", "half", "hall", "halls", "halo", "halogen", "halt", "halts", "halve", "halved", "halves", "ham", "hamburger", "hamlet", "hammer", "hammock", "hamper", "hams", "hamster", "hamstring", "hand", "handbag", "handball", "handbook", "handbrake", "handcart", "handclap", "handclasp", "handcraft", "handcuff", "handed", "handful", "handgrip", "handgun", "handheld", "handiness", "handiwork", "handle", "handlebar", "handled", "handler", "handling", "handmade", "handoff", "handpick", "handprint", "handrail", "hands", "handsaw", "handset", "handsfree", "handshake", "handstand", "handwash", "handwork", "handwoven", "handwrite", "handy", "handyman", "hang", "hangnail", "hangout", "hangover", "hangup", "hank", "hankering", "hankie", "hanky", "hanna", "hans", "haphazard", "happening", "happier", "happiest", "happily", "happiness", "happy", "harbor", "hard", "hardcopy", "hardcore", "hardcover", "harddisk", "hardened", "hardener", "hardening", "hardhat", "hardhead", "hardiness", "hardly", "hardness", "hardship", "hardware", "hardwired", "hardwood", "hardy", "hare", "harem", "hark", "harley", "harm", "harmful", "harmless", "harmonica", "harmonics", "harmonize", "harmony", "harms", "harness", "harp", "harpist", "harps", "harry", "harsh", "hart", "harv", "harvest", "harvey", "has", "hash", "hasp", "hassle", "haste", "hastily", "hastiness", "hasty", "hat", "hatbox", "hatch", "hatchback", "hatchery", "hatchet", "hatching", "hatchling", "hate", "hates", "hatless", "hatred", "hats", "haul", "hauls", "haunt", "have", "haven", "havoc", "hawk", "hawks", "hay", "haydn", "hayes", "hazard", "haze", "hazel", "hazelnut", "hazily", "haziness", "hazing", "hazy", "hb", "hc", "hd", "hdtv", "he", "he'd", "he'll", "head", "headache", "headband", "headboard", "headcount", "headdress", "headed", "header", "headfirst", "headgear", "heading", "headlamp", "headless", "headlock", "headphone", "headpiece", "headrest", "headroom", "heads", "headscarf", "headset", "headsman", "headstand", "headstone", "headway", "headwear", "heady", "heal", "heals", "heap", "heaps", "hear", "heard", "hears", "heart", "heat", "heath", "heats", "heave", "heaven", "heavily", "heaviness", "heaving", "heavy", "hebrew", "heck", "heckle", "hectic", "hedge", "hedging", "heed", "heel", "heels", "heft", "heftiness", "hefty", "height", "heinz", "heir", "heirs", "held", "helen", "helga", "helium", "helix", "hell", "hello", "helm", "helmet", "help", "helper", "helpful", "helping", "helpless", "helpline", "hem", "hemlock", "hemp", "hems", "hemstitch", "hen", "hence", "henchman", "henna", "henry", "hens", "hep", "her", "herald", "herb", "herbal", "herbicide", "herbs", "herd", "here", "heritage", "hermit", "hero", "herod", "heroic", "heroics", "heroism", "heron", "herr", "herring", "hers", "herself", "hertz", "hesitancy", "hesitant", "hesitate", "hew", "hex", "hexagon", "hexagram", "hexed", "hey", "hf", "hg", "hh", "hhh", "hhhh", "hi", "hick", "hid", "hide", "hides", "high", "hij", "hijack", "hike", "hikes", "hill", "hills", "hilly", "hilt", "him", "hind", "hindu", "hinge", "hint", "hints", "hip", "hippo", "hips", "hiram", "hire", "hired", "hires", "his", "hiss", "hit", "hitch", "hits", "hiv", "hive", "hives", "hj", "hk", "hl", "hm", "hn", "ho", "hoagy", "hoard", "hoax", "hobby", "hobo", "hock", "hockey", "hoe", "hog", "hogan", "hogs", "hoist", "hold", "holds", "holdup", "hole", "holes", "holly", "holmes", "holy", "home", "honda", "hone", "honey", "honk", "honor", "hooch", "hood", "hoof", "hook", "hooks", "hookup", "hoop", "hoot", "hop", "hope", "hopes", "hops", "horde", "horn", "horny", "horse", "hose", "host", "hot", "hotel", "hotrod", "hound", "hour", "house", "hovel", "hover", "how", "howdy", "howl", "howls", "hoyle", "hp", "hq", "hr", "hrh", "hs", "ht", "hu", "hub", "hubbub", "hubby", "hubcap", "hubs", "huddle", "huddling", "hue", "hues", "huey", "huff", "hug", "huge", "hugh", "hugo", "hugs", "huh", "hula", "hulk", "hull", "hum", "human", "humble", "humbling", "humbly", "humid", "humiliate", "humility", "humming", "hummus", "humongous", "humor", "humorist", "humorless", "humorous", "hump", "humpback", "humped", "humps", "hums", "humus", "humvee", "hun", "hunch", "hunchback", "hundredth", "hung", "hunger", "hungrily", "hungry", "hunk", "hunt", "hunter", "hunting", "huntress", "hunts", "huntsman", "hurdle", "hurl", "hurled", "hurler", "hurling", "huron", "hurrah", "hurray", "hurricane", "hurried", "hurry", "hurt", "husband", "hush", "husk", "husked", "huskiness", "husky", "hut", "hutch", "hv", "hw", "hwy", "hx", "hy", "hybrid", "hyde", "hydra", "hydrant", "hydrated", "hydration", "hydrogen", "hydroxide", "hyena", "hymn", "hymnal", "hype", "hyper", "hyperlink", "hypertext", "hyphen", "hypnoses", "hypnosis", "hypnotic", "hypnotism", "hypnotist", "hypnotize", "hypo", "hypocrisy", "hypocrite", "hz", "i", "i'd", "i'll", "i'm", "i's", "i've", "ia", "ian", "ib", "ibid", "ibm", "ibsen", "ibuprofen", "ic", "icbm", "ice", "iced", "icicle", "iciness", "icing", "icky", "icon", "icons", "icy", "id", "ida", "idaho", "idea", "ideal", "idealism", "idealist", "idealize", "ideally", "idealness", "ideas", "identical", "identify", "identity", "ideology", "idiocy", "idiom", "idiot", "idle", "idly", "idol", "idols", "ie", "if", "iffy", "ig", "igloo", "ignite", "ignition", "ignore", "igor", "iguana", "ih", "ii", "iii", "iiii", "ij", "ijk", "ik", "ike", "il", "iliad", "ill", "illicitly", "illusion", "illusive", "im", "image", "imaginary", "imagines", "imaging", "imbecile", "imbibe", "imf", "imitate", "imitation", "immature", "immerse", "immersion", "imminent", "immobile", "immodest", "immorally", "immortal", "immovable", "immovably", "immunity", "immunize", "imp", "impaired", "impale", "impart", "impatient", "impeach", "impeding", "impel", "impending", "imperfect", "imperial", "impish", "implant", "implement", "implicate", "implicit", "implode", "implosion", "implosive", "imply", "impolite", "import", "important", "importer", "impose", "imposing", "impotence", "impotency", "impotent", "impound", "imprecise", "imprint", "imprison", "impromptu", "improper", "improve", "improving", "improvise", "imprudent", "imps", "impulse", "impulsive", "impure", "impurity", "in", "inane", "inc", "inca", "incest", "inch", "incur", "index", "india", "indies", "indy", "inept", "inert", "infamy", "infect", "infer", "info", "ingot", "inhale", "ink", "inky", "inlay", "inlet", "inn", "inner", "inns", "input", "insect", "inset", "insult", "intel", "intend", "inter", "into", "intro", "invoke", "io", "iodine", "iodize", "ion", "ions", "iota", "iou", "iowa", "ip", "ipad", "iphone", "ipod", "iq", "ir", "ira", "iran", "iraq", "iraqi", "irate", "ire", "irene", "iris", "irish", "irk", "irked", "irma", "iron", "irons", "irony", "irregular", "irrigate", "irritable", "irritably", "irritant", "irritate", "irvin", "is", "isaac", "isabel", "islam", "islamic", "islamist", "island", "isle", "ism", "isn't", "isolated", "isolating", "isolation", "isotope", "israel", "issue", "issuing", "isuzu", "it", "it'd", "it'll", "it's", "italicize", "italics", "italy", "itch", "itchy", "item", "items", "itinerary", "itunes", "iu", "iud", "iv", "ivan", "ivory", "ivy", "iw", "ix", "iy", "iz", "j", "j's", "ja", "jab", "jack", "jackal", "jacket", "jackknife", "jackpot", "jacob", "jade", "jaded", "jag", "jaguar", "jail", "jailbird", "jailbreak", "jailer", "jailhouse", "jalapeno", "jam", "jamb", "james", "jan", "jane", "janet", "janis", "janitor", "january", "japan", "jar", "jargon", "jarring", "jars", "jasmine", "jason", "jaundice", "jaunt", "java", "jaw", "jawed", "jawless", "jawline", "jaws", "jay", "jaybird", "jaywalker", "jazz", "jazzy", "jb", "jc", "jd", "je", "jean", "jeans", "jed", "jedi", "jeep", "jeer", "jeeringly", "jeers", "jeff", "jellied", "jello", "jelly", "jenny", "jerk", "jerks", "jerky", "jerry", "jersey", "jesse", "jest", "jester", "jesus", "jet", "jets", "jew", "jewel", "jewish", "jf", "jfk", "jg", "jh", "ji", "jiffy", "jig", "jiggle", "jigs", "jigsaw", "jill", "jilt", "jim", "jimmy", "jingle", "jingling", "jinx", "jitters", "jittery", "jive", "jj", "jjj", "jjjj", "jk", "jkl", "jl", "jm", "jn", "jo", "joan", "job", "jobs", "jock", "jockey", "jockstrap", "jody", "joe", "joel", "joey", "jog", "jogger", "jogging", "jogs", "john", "join", "joining", "joins", "joint", "joke", "joker", "jokes", "jokester", "jokingly", "jolliness", "jolly", "jolt", "jonas", "jones", "jose", "josef", "josh", "joshua", "jostle", "jot", "jots", "joust", "jove", "jovial", "jowl", "jowls", "joy", "joyce", "joyfully", "joylessly", "joyous", "joyride", "joystick", "jp", "jq", "jr", "js", "jt", "ju", "juan", "jubilance", "jubilant", "judas", "jude", "judge", "judgingly", "judicial", "judiciary", "judo", "judy", "jug", "juggle", "juggling", "jugs", "jugular", "juice", "juiciness", "juicy", "jujitsu", "jukebox", "jul", "julep", "jules", "julia", "julie", "julio", "july", "jumble", "jumbo", "jump", "jumps", "jumpy", "jun", "junction", "juncture", "june", "jung", "junior", "juniper", "junk", "junkie", "junkman", "junky", "junkyard", "juno", "junta", "jurist", "juror", "jury", "just", "justice", "justifier", "justify", "justly", "justness", "jut", "jute", "juvenile", "jv", "jw", "jx", "jy", "jz", "k", "k's", "ka", "kabob", "kafka", "kale", "kane", "kangaroo", "kansas", "kant", "kappa", "kaput", "karaoke", "karate", "karen", "karl", "karma", "karol", "kate", "kathy", "katie", "kay", "kayak", "kayo", "kazoo", "kb", "kc", "kd", "ke", "keats", "kebab", "kebob", "keel", "keen", "keenly", "keenness", "keep", "keeps", "keg", "kegs", "keith", "kelly", "kelp", "ken", "kennel", "kent", "kept", "kerchief", "kerosene", "kerry", "kettle", "kevin", "key", "keyed", "keys", "kf", "kg", "kgb", "kh", "khaki", "khan", "khz", "ki", "kibitz", "kick", "kicks", "kid", "kidney", "kids", "kill", "kills", "kiln", "kilo", "kilobyte", "kilogram", "kilometer", "kilowatt", "kilt", "kilts", "kim", "kimono", "kin", "kind", "kindle", "kindling", "kindly", "kindness", "kindred", "kinds", "kinetic", "kinfolk", "king", "kings", "kink", "kinky", "kinship", "kinsman", "kinswoman", "kiosk", "kirby", "kirk", "kiss", "kissable", "kisser", "kissing", "kit", "kitchen", "kite", "kites", "kitten", "kitty", "kiwi", "kj", "kk", "kkk", "kkkk", "kl", "klan", "klaus", "klaxon", "kleenex", "klein", "klm", "klutz", "km", "kn", "knack", "knapsack", "knave", "knead", "knee", "kneel", "knees", "knelt", "knew", "knickers", "knife", "knight", "knit", "knits", "knob", "knobs", "knock", "knoll", "knot", "knots", "know", "known", "knows", "knox", "ko", "koala", "koan", "kodak", "kong", "kook", "kooks", "kooky", "koran", "korea", "kosher", "kp", "kq", "kr", "kraft", "kraut", "kris", "krypton", "ks", "kt", "ku", "kudo", "kudos", "kudzu", "kung", "kurt", "kv", "kw", "kx", "ky", "kz", "l", "l's", "la", "lab", "label", "labor", "labored", "laborer", "laboring", "laborious", "labrador", "labs", "lace", "laces", "lack", "lacks", "lacy", "lad", "ladder", "ladies", "ladle", "lads", "lady", "ladybug", "ladylike", "lag", "lager", "lagged", "lagging", "lagoon", "lags", "laid", "lair", "lake", "lakes", "lam", "lamar", "lamb", "lambs", "lame", "lamp", "lamps", "lana", "lance", "land", "landed", "landfall", "landfill", "landing", "landlady", "landless", "landline", "landlord", "landmark", "landmass", "landmine", "landowner", "lands", "landscape", "landside", "landslide", "lane", "language", "lankiness", "lanky", "lantern", "laos", "lap", "lapdog", "lapel", "lapped", "lapping", "laps", "lapse", "laptop", "lara", "lard", "large", "lark", "larks", "larry", "larva", "larynx", "laser", "lash", "lass", "lasso", "last", "latch", "late", "later", "latest", "latex", "lathe", "lather", "latin", "latitude", "latrine", "latter", "latticed", "laud", "laugh", "launch", "launder", "laundry", "laura", "laurel", "lava", "lavender", "lavish", "law", "lawn", "lawns", "laws", "lawson", "lax", "laxative", "lay", "layer", "layla", "lays", "lazily", "laziness", "lazy", "lb", "lbj", "lbs", "lc", "lcd", "ld", "le", "lead", "leads", "leaf", "leafy", "leah", "leak", "leaks", "leaky", "lean", "leap", "leaps", "lear", "learn", "leary", "lease", "leash", "least", "leave", "lecturer", "led", "leda", "ledge", "lee", "leech", "leer", "leers", "leery", "leeway", "left", "lefty", "leg", "legacy", "legal", "legend", "legged", "leggings", "legible", "legibly", "legion", "legislate", "lego", "legroom", "legs", "legume", "legwarmer", "legwork", "lei", "lemon", "len", "lend", "lends", "length", "lenin", "lenny", "lens", "lent", "leo", "leon", "leona", "leotard", "leper", "leroy", "less", "lesser", "lest", "let", "let's", "letdown", "lethargic", "lethargy", "lets", "letter", "lettuce", "levee", "level", "lever", "leverage", "levers", "levis", "levitate", "levitator", "levy", "lewd", "lewis", "lf", "lg", "lh", "li", "liability", "liable", "liar", "liars", "lib", "libel", "liberty", "libido", "librarian", "library", "libya", "lice", "lick", "licking", "licks", "licorice", "lid", "lids", "lie", "lied", "lien", "lies", "lieu", "lieut", "life", "lift", "lifter", "lifting", "liftoff", "ligament", "light", "like", "liked", "likely", "likeness", "likes", "likewise", "liking", "lil", "lilac", "lilly", "lilt", "lily", "lima", "limb", "limbo", "limbs", "lime", "limeade", "limelight", "limes", "limit", "limp", "limping", "limpness", "limps", "linda", "line", "linen", "lines", "lingo", "linguini", "linguist", "lining", "link", "linked", "linoleum", "linseed", "lint", "linus", "lion", "lip", "lips", "liquefy", "liqueur", "liquid", "lira", "lisa", "lisp", "list", "listen", "lists", "liszt", "lit", "litigate", "litigator", "litmus", "litter", "little", "litton", "livable", "live", "lived", "lively", "liver", "livestock", "livid", "lividly", "living", "liz", "liza", "lizard", "lizzie", "lj", "lk", "ll", "lll", "llll", "lloyd", "lm", "lmn", "ln", "lo", "load", "loaf", "loam", "loamy", "loan", "lob", "lobby", "lobe", "lobs", "local", "loch", "lock", "locks", "lode", "lodge", "loft", "lofty", "log", "logan", "logic", "logo", "logs", "loin", "loins", "lois", "loiter", "loki", "lola", "loll", "lone", "loner", "long", "longs", "look", "looks", "loom", "loon", "loony", "loop", "loose", "loot", "lop", "lopez", "lops", "lord", "lore", "loren", "lose", "loser", "loses", "loss", "lost", "lot", "lots", "lotto", "lotus", "lou", "loud", "louis", "louise", "louse", "lousy", "lout", "love", "loved", "lover", "low", "lower", "lowry", "lox", "loyal", "lp", "lq", "lr", "ls", "lsd", "lt", "ltd", "lu", "luau", "lubricant", "lubricate", "lucas", "luce", "lucia", "lucid", "luck", "luckily", "luckiness", "luckless", "lucky", "lucrative", "lucy", "ludicrous", "ludwig", "lug", "luger", "lugged", "lugs", "luis", "luke", "lukewarm", "lull", "lullaby", "lulu", "lumber", "luminance", "luminous", "lump", "lumpiness", "lumping", "lumpish", "lumps", "lumpy", "luna", "lunacy", "lunar", "lunch", "lunchbox", "luncheon", "lunchroom", "lunchtime", "lung", "lunge", "lungs", "lurch", "lure", "lurid", "luridness", "lurk", "lurks", "lush", "lushly", "lushness", "lust", "luster", "lustfully", "lustily", "lustiness", "lustrous", "lusty", "lute", "luxurious", "luxury", "lv", "lw", "lx", "ly", "lye", "lying", "lyle", "lymph", "lynn", "lynx", "lyre", "lyric", "lyrically", "lyricism", "lyricist", "lyrics", "lz", "m", "m&m", "m's", "m-16", "ma", "ma'am", "mabel", "mac", "macarena", "macaroni", "macaw", "mace", "machine", "machinist", "macho", "macro", "mad", "madam", "made", "madly", "madman", "mafia", "magazine", "magenta", "maggot", "magic", "magical", "magician", "magma", "magnesium", "magnet", "magnetic", "magnetism", "magnetize", "magnifier", "magnify", "magnitude", "magnolia", "magoo", "magpie", "mahogany", "maid", "maids", "mail", "maim", "maimed", "maims", "main", "maine", "maize", "maj", "majestic", "majesty", "major", "majorette", "majority", "make", "makeover", "maker", "makeshift", "making", "malady", "male", "malformed", "malice", "mall", "malls", "malt", "mama", "mambo", "mammal", "mammary", "mammogram", "man", "manager", "managing", "manatee", "mandarin", "mandate", "mandatory", "mandolin", "mane", "manger", "mangle", "mango", "mangy", "manhandle", "manhole", "manhood", "manhunt", "mania", "manic", "manicotti", "manicure", "manifesto", "manila", "mankind", "manlike", "manliness", "manly", "manmade", "manna", "manned", "mannish", "manor", "manpower", "mantis", "mantle", "mantra", "manual", "many", "mao", "map", "maple", "maps", "mar", "marathon", "marauding", "marble", "marbled", "marbles", "marbling", "march", "marco", "mardi", "mare", "mares", "margarine", "margarita", "marge", "margin", "margo", "maria", "marie", "marigold", "marina", "marine", "mario", "marital", "maritime", "mark", "marks", "marlin", "marmalade", "maroon", "married", "marrow", "marry", "mars", "marsh", "marshland", "marshy", "marsupial", "mart", "marty", "martyr", "marvelous", "marx", "marxism", "mary", "mascot", "masculine", "mash", "mashed", "mashing", "mask", "masks", "mason", "mass", "massager", "masses", "massive", "mast", "mastiff", "masts", "mat", "matador", "match", "matchbook", "matchbox", "matcher", "matching", "matchless", "mate", "mated", "material", "maternal", "maternity", "mates", "math", "mating", "matriarch", "matrimony", "matrix", "matron", "mats", "matt", "matted", "matter", "maturely", "maturing", "maturity", "matzo", "maud", "maude", "maul", "mauls", "mauve", "maverick", "maw", "max", "maxim", "maximize", "maximum", "may", "maybe", "mayday", "mayflower", "mayhem", "mayo", "mayor", "mazda", "maze", "mazes", "mb", "mba", "mc", "mccoy", "mcgee", "md", "me", "meadow", "meal", "meals", "mean", "means", "meant", "meat", "meaty", "mecca", "medal", "media", "medic", "medley", "meek", "meet", "meets", "meg", "meld", "melee", "mellow", "melody", "melon", "melt", "melts", "memo", "memoir", "men", "mend", "mends", "menu", "meow", "mercy", "mere", "merge", "merit", "merry", "mesa", "mesh", "mess", "messy", "met", "metal", "meteor", "meter", "metro", "meyer", "mf", "mg", "mgm", "mgmt", "mh", "mi", "mia", "miami", "mice", "mickey", "micro", "mid", "midas", "midst", "mig", "might", "migs", "mike", "mild", "mildew", "mile", "miles", "milk", "milky", "mill", "mills", "milo", "mime", "mimes", "mimi", "mimic", "mince", "mind", "minds", "mine", "mined", "miner", "mines", "mini", "mink", "minnow", "minor", "mint", "mints", "minty", "minus", "mirage", "mire", "mired", "mirth", "mirv", "misc", "miser", "misery", "miss", "mist", "mists", "misty", "mit", "mite", "mites", "mitt", "mitts", "mix", "mixed", "mixer", "mixes", "mixup", "mj", "mk", "ml", "mm", "mmm", "mmmm", "mn", "mno", "mo", "moan", "moaner", "moaning", "moans", "moat", "mob", "mobil", "mobile", "mobility", "mobilize", "mobs", "mobster", "moby", "mocha", "mock", "mocker", "mocks", "mockup", "mod", "mode", "model", "modem", "modified", "modify", "modular", "modulator", "module", "moe", "mogul", "moist", "moisten", "moistness", "moisture", "mojo", "molar", "molasses", "mold", "molds", "mole", "molecular", "molecule", "molehill", "moles", "mollusk", "molly", "molt", "molten", "mom", "momma", "mommy", "mon", "mona", "monastery", "monday", "monetary", "monetize", "money", "moneybags", "moneyless", "moneywise", "mongoose", "mongrel", "monitor", "monk", "monkey", "monkhood", "mono", "monogamy", "monogram", "monologue", "monopoly", "monorail", "monotone", "monotype", "monoxide", "monsieur", "monsoon", "monstrous", "month", "monthly", "monty", "monument", "moo", "mooch", "moocher", "mood", "moodiness", "moods", "moody", "mooing", "moon", "moonbeam", "mooned", "moonlight", "moonlike", "moonlit", "moonrise", "moons", "moonscape", "moonshine", "moonstone", "moonwalk", "moor", "moore", "moose", "mop", "mope", "mopes", "mops", "moral", "morale", "morality", "morally", "morbid", "morbidity", "morbidly", "more", "morn", "moron", "morph", "morphine", "morphing", "morse", "morsel", "mort", "mortality", "mortally", "mortician", "mortified", "mortify", "mortuary", "mosaic", "moses", "moss", "mossy", "most", "mote", "motel", "moth", "mothball", "mother", "mothproof", "moths", "motif", "motion", "motivate", "motivator", "motive", "motocross", "motor", "motto", "mound", "mount", "mountable", "mountain", "mounted", "mounting", "mourn", "mourner", "mournful", "mouse", "mousiness", "moustache", "mousy", "mouth", "movable", "move", "moved", "moves", "movie", "moving", "mow", "mowed", "mower", "mowing", "mows", "moxie", "mp", "mpg", "mph", "mq", "mr", "mrs", "ms", "msdos", "msg", "mt", "mu", "much", "muck", "mucus", "mud", "muddy", "muff", "muffin", "mug", "muggy", "mugs", "mulberry", "mulch", "mule", "mules", "mull", "mulled", "mullets", "multiple", "multiply", "multitask", "multitude", "mum", "mumble", "mumbling", "mumbo", "mummified", "mummify", "mummy", "mumps", "munch", "munchkin", "mundane", "municipal", "muppet", "mural", "muriel", "murk", "murkiness", "murky", "murmuring", "muscular", "muse", "muses", "museum", "mush", "mushily", "mushiness", "mushroom", "mushy", "music", "musk", "musket", "muskiness", "musky", "muslim", "muss", "must", "mustang", "mustard", "muster", "mustiness", "musty", "mutable", "mutate", "mutation", "mute", "muted", "mutilated", "mutilator", "mutiny", "mutt", "mutual", "muzak", "muzzle", "mv", "mw", "mx", "my", "mylar", "mynah", "myob", "myopia", "myra", "myron", "myself", "myspace", "mystified", "mystify", "myth", "myths", "mz", "n", "n's", "na", "nab", "nabs", "nacho", "nacl", "nag", "nags", "nail", "nails", "naive", "naked", "name", "named", "names", "naming", "nan", "nancy", "nanny", "nanometer", "naomi", "nap", "nape", "napkin", "napped", "napping", "nappy", "naps", "narrow", "nasa", "nasal", "nash", "nastily", "nastiness", "nasty", "nat", "natal", "nate", "national", "native", "nativity", "nato", "natural", "nature", "naturist", "nausea", "nautical", "naval", "navel", "navigate", "navigator", "navy", "nay", "nazi", "nb", "nc", "nd", "ne", "near", "nearby", "nearest", "nearly", "nearness", "neat", "neatly", "neatness", "nebula", "nebulizer", "neck", "necks", "nectar", "ned", "need", "needs", "needy", "negate", "negation", "negative", "neglector", "negligee", "negligent", "negotiate", "negro", "neigh", "neil", "nell", "nemeses", "nemesis", "neon", "nephew", "nerd", "nerve", "nervous", "nervy", "nest", "nests", "net", "nets", "neurology", "neuron", "neurosis", "neurotic", "neuter", "neutron", "never", "new", "newly", "news", "newt", "next", "nf", "ng", "nguyen", "nh", "ni", "nibble", "nice", "nicer", "nick", "nickel", "nickname", "nico", "nicotine", "niece", "nifty", "night", "nil", "nile", "nimble", "nimbly", "nina", "nine", "nineteen", "ninetieth", "ninja", "nintendo", "ninth", "niobe", "nip", "nips", "nitwit", "nix", "nj", "nk", "nl", "nm", "nn", "nne", "nnn", "nnnn", "nnw", "no", "noah", "noble", "nod", "node", "nods", "noel", "noise", "noisy", "nomad", "none", "nono", "nook", "noon", "noose", "nop", "nope", "nor", "nora", "norm", "norma", "north", "norway", "nose", "nosy", "not", "notch", "note", "noted", "notes", "noun", "nouns", "nov", "nova", "novak", "novel", "now", "np", "nq", "nr", "ns", "nt", "nu", "nuance", "nuclear", "nuclei", "nucleus", "nude", "nudge", "nugget", "nuke", "null", "nullify", "numb", "number", "numbing", "numbly", "numbness", "numeral", "numerate", "numerator", "numeric", "numerous", "nun", "nuns", "nuptials", "nurse", "nursery", "nursing", "nurture", "nut", "nutcase", "nutlike", "nutmeg", "nutrient", "nuts", "nutshell", "nuttiness", "nutty", "nuzzle", "nv", "nw", "nx", "ny", "nyc", "nylon", "nymph", "nz", "o", "o's", "oa", "oaf", "oak", "oaken", "oar", "oars", "oasis", "oat", "oath", "oats", "ob", "obedience", "obedient", "obese", "obey", "obeys", "obit", "obituary", "object", "obligate", "obliged", "oblivion", "oblivious", "oblong", "obnoxious", "oboe", "obscure", "obscurity", "observant", "observer", "observing", "obsessed", "obsession", "obsessive", "obsolete", "obstacle", "obstinate", "obstruct", "obtain", "obtrusive", "obtuse", "obvious", "oc", "occultist", "occupancy", "occupant", "occupier", "occupy", "occur", "ocean", "ocelot", "ocr", "oct", "octagon", "octal", "octane", "octave", "october", "octopus", "od", "odd", "odds", "ode", "odor", "odors", "oe", "of", "off", "offend", "offer", "often", "og", "ogle", "ogled", "ogles", "ogre", "oh", "ohio", "oho", "oi", "oil", "oiled", "oils", "oily", "oink", "ointment", "oj", "ok", "okay", "okays", "okra", "ol", "olaf", "old", "older", "ole", "olga", "olive", "olson", "olympics", "om", "omaha", "omega", "omen", "omens", "ominous", "omission", "omit", "omits", "omnivore", "on", "onboard", "once", "oncoming", "one", "ongoing", "onion", "online", "onlooker", "only", "onscreen", "onset", "onshore", "onslaught", "onstage", "onto", "onward", "onyx", "oo", "ooo", "oooo", "oops", "ooze", "oozed", "oozy", "op", "opacity", "opal", "opals", "opec", "open", "opens", "opera", "operable", "operate", "operating", "operation", "operative", "operator", "opium", "opossum", "opponent", "oppose", "opposing", "opposite", "oppressed", "oppressor", "opq", "opt", "optic", "opulently", "opus", "oq", "or", "oral", "orb", "orbit", "orbs", "orchid", "order", "ore", "organ", "orgy", "ornery", "orphan", "os", "oscar", "osmosis", "ot", "other", "otis", "otter", "otto", "ou", "ouch", "ought", "ouija", "ounce", "our", "ours", "oust", "out", "outage", "outback", "outbid", "outboard", "outbound", "outbreak", "outburst", "outcast", "outclass", "outcome", "outdated", "outdo", "outdoors", "outer", "outfield", "outfit", "outflank", "outgoing", "outgrow", "outhouse", "outing", "outlast", "outlaw", "outlet", "outline", "outlook", "outlying", "outmatch", "outmost", "outnumber", "outplayed", "outpost", "outpour", "output", "outrage", "outrank", "outreach", "outright", "outscore", "outsell", "outshine", "outshoot", "outsider", "outskirts", "outsmart", "outsource", "outspoken", "outtakes", "outthink", "outward", "outweigh", "outwit", "ov", "oval", "ovals", "ovary", "oven", "ovens", "over", "overact", "overall", "overarch", "overbid", "overbill", "overbite", "overblown", "overboard", "overbook", "overbuilt", "overcast", "overcoat", "overcome", "overcook", "overcrowd", "overdraft", "overdrawn", "overdress", "overdrive", "overdue", "overeager", "overeater", "overexert", "overfed", "overfeed", "overfill", "overflow", "overfull", "overgrown", "overhand", "overhang", "overhaul", "overhead", "overhear", "overheat", "overhung", "overjoyed", "overkill", "overlabor", "overlaid", "overlap", "overlay", "overload", "overlook", "overlord", "overlying", "overnight", "overpass", "overpay", "overplant", "overplay", "overpower", "overprice", "overrate", "overreach", "overreact", "override", "overripe", "overrule", "overrun", "overshoot", "overshot", "oversight", "oversized", "oversleep", "oversold", "overspend", "overstate", "overstay", "overstep", "overstock", "overstuff", "oversweet", "overt", "overtake", "overthrow", "overtime", "overtly", "overtone", "overture", "overturn", "overuse", "overvalue", "overview", "overwrite", "ow", "owe", "owed", "owens", "owes", "owing", "owl", "owls", "own", "owned", "owner", "owns", "ox", "oxen", "oxford", "oxidant", "oxidation", "oxide", "oxidize", "oxidizing", "oxygen", "oxymoron", "oy", "oyster", "oz", "ozone", "p", "p's", "pa", "pablo", "pace", "paced", "pacemaker", "paces", "pacific", "pacifier", "pacifism", "pacifist", "pacify", "pack", "packet", "packs", "pact", "pad", "padded", "padding", "paddle", "paddling", "paddy", "padlock", "pads", "pagan", "page", "pager", "pages", "paging", "paid", "pail", "pain", "pains", "paint", "pair", "pajama", "pajamas", "pal", "palace", "palatable", "pale", "palm", "palms", "palpable", "palpitate", "pals", "paltry", "pam", "pampered", "pamperer", "pampers", "pamphlet", "pan", "panama", "pancake", "pancreas", "panda", "pandemic", "pane", "panel", "pang", "panhandle", "panic", "panning", "panorama", "panoramic", "pans", "pansy", "pant", "panther", "pantomime", "pantry", "pants", "pantyhose", "papa", "paparazzi", "papaya", "paper", "pappy", "paprika", "papyrus", "par", "parabola", "parachute", "parade", "paradox", "paragraph", "parakeet", "paralegal", "paralyses", "paralysis", "paralyze", "paramedic", "parameter", "paramount", "parasail", "parasite", "parasitic", "parcel", "parched", "parchment", "pardon", "pare", "paris", "parish", "park", "parka", "parking", "parks", "parkway", "parlor", "parmesan", "parole", "parrot", "parse", "parsley", "parsnip", "part", "partake", "parted", "parting", "partition", "partly", "partner", "partridge", "parts", "party", "pascal", "pass", "passable", "passably", "passage", "passcode", "passenger", "passerby", "passing", "passion", "passive", "passivism", "passover", "passport", "password", "past", "pasta", "paste", "pasted", "pastel", "pastime", "pastor", "pastrami", "pasture", "pasty", "pat", "patch", "patchwork", "patchy", "paternal", "paternity", "path", "paths", "patience", "patient", "patio", "patriarch", "patriot", "patrol", "patronage", "patronize", "pats", "patsy", "patton", "patty", "paul", "paula", "pauper", "pause", "pave", "paved", "pavement", "paver", "paves", "pavestone", "pavilion", "paving", "paw", "pawed", "pawing", "pawn", "pawns", "paws", "pay", "payable", "payback", "paycheck", "payday", "payee", "payer", "paying", "payment", "payphone", "payroll", "pb", "pc", "pd", "pdq", "pe", "pea", "peace", "peach", "peak", "peaks", "pear", "pearl", "pears", "peas", "pebble", "pebbly", "pecan", "peck", "pecks", "pectin", "peculiar", "pedal", "peddling", "pediatric", "pedicure", "pedigree", "pedometer", "pedro", "pee", "peed", "peek", "peel", "peep", "peer", "peeve", "peg", "pegboard", "peggy", "pegs", "pelican", "pellet", "pelt", "pelvis", "pen", "penal", "penalize", "penalty", "pencil", "pendant", "pending", "penholder", "penknife", "penn", "pennant", "penniless", "penny", "penpal", "pens", "pension", "pentagon", "pentagram", "peony", "people", "pep", "peppy", "pepsi", "per", "perceive", "percent", "perch", "percolate", "percy", "perennial", "perez", "perfected", "perfectly", "perfume", "peril", "period", "periscope", "perish", "perjurer", "perjury", "perk", "perkiness", "perks", "perky", "perm", "peroxide", "perpetual", "perplexed", "perry", "persecute", "persevere", "persuaded", "persuader", "pert", "peru", "pesky", "peso", "pessimism", "pessimist", "pest", "pester", "pesticide", "pests", "pet", "petal", "pete", "peter", "petite", "petition", "petri", "petroleum", "pets", "petted", "petticoat", "pettiness", "petty", "petunia", "pf", "pfc", "pg", "ph", "phantom", "phase", "phd", "phi", "phil", "phlox", "phobia", "phoenix", "phone", "phonebook", "phoney", "phonics", "phoniness", "phony", "phosphate", "photo", "phrase", "phrasing", "pi", "piano", "pick", "picks", "pickup", "picky", "picnic", "pie", "piece", "pier", "pierce", "piers", "pies", "piety", "pig", "piggy", "pigs", "pike", "pile", "piles", "pill", "pills", "pilot", "pimp", "pimple", "pin", "pinch", "pine", "pines", "ping", "pink", "pinko", "pins", "pint", "pinto", "pinup", "pious", "pip", "pipe", "piper", "pirate", "pit", "pita", "pitch", "pith", "pithy", "pits", "pity", "pivot", "pixel", "pixie", "pizza", "pj", "pk", "pl", "placard", "placate", "place", "placidly", "plague", "plaid", "plain", "plan", "plane", "planet", "plank", "planner", "plant", "plasma", "plaster", "plastic", "plate", "plated", "platform", "plating", "platinum", "plato", "platonic", "platter", "platypus", "plausible", "plausibly", "play", "playable", "playback", "player", "playful", "playgroup", "playhouse", "playing", "playlist", "playmaker", "playmate", "playoff", "playpen", "playroom", "plays", "playset", "plaything", "playtime", "plaza", "plea", "plead", "pleading", "pleas", "pleat", "pledge", "plentiful", "plenty", "plethora", "plexiglas", "pliable", "plod", "plods", "plop", "plot", "plots", "plow", "plows", "ploy", "ploys", "pluck", "plug", "plugs", "plum", "plume", "plump", "plums", "plunder", "plunging", "plural", "plus", "plush", "pluto", "plutonium", "ply", "plywood", "pm", "pms", "pn", "po", "poach", "pobox", "pod", "pods", "poe", "poem", "poems", "poet", "poetry", "pogo", "poi", "point", "pointed", "pointer", "pointing", "pointless", "pointy", "poise", "poison", "poke", "poked", "poker", "pokes", "poking", "pol", "polar", "pole", "poles", "police", "policy", "polio", "polish", "politely", "polk", "polka", "poll", "polls", "polo", "polyester", "polygon", "polygraph", "polymer", "pomp", "poncho", "pond", "ponds", "pony", "pooch", "pooh", "pool", "pools", "poop", "poor", "pop", "popcorn", "pope", "poplar", "popper", "poppy", "pops", "popsicle", "populace", "popular", "populate", "porch", "porcupine", "pore", "pores", "pork", "porn", "porous", "porridge", "port", "portable", "portal", "portfolio", "porthole", "portion", "portly", "portside", "pose", "posed", "poser", "poses", "posh", "posing", "posse", "possible", "possibly", "possum", "post", "postage", "postal", "postbox", "postcard", "posted", "poster", "posting", "postnasal", "posts", "posture", "postwar", "posy", "pot", "potato", "pots", "potts", "pouch", "pounce", "pouncing", "pound", "pour", "pouring", "pours", "pout", "pouts", "pow", "powder", "powdered", "powdering", "powdery", "power", "powwow", "pox", "pp", "ppm", "ppp", "pppp", "pq", "pqr", "pr", "praising", "prance", "prancing", "prank", "pranker", "prankish", "prankster", "prawn", "pray", "prayer", "praying", "prays", "preacher", "preaching", "preachy", "preamble", "precinct", "precise", "precision", "precook", "precut", "predator", "predefine", "predict", "preen", "preface", "prefix", "preflight", "preformed", "pregame", "pregnancy", "pregnant", "preheated", "prelaunch", "prelaw", "prelude", "premiere", "premises", "premium", "prenatal", "preoccupy", "preorder", "prep", "prepaid", "prepay", "preplan", "preppy", "preschool", "prescribe", "preseason", "preset", "preshow", "president", "presoak", "press", "presume", "presuming", "preteen", "pretended", "pretender", "pretense", "pretext", "pretty", "pretzel", "prevail", "prevalent", "prevent", "preview", "previous", "prewar", "prewashed", "prexy", "prey", "price", "prick", "pride", "prideful", "pried", "prig", "prim", "primal", "primarily", "primary", "primate", "prime", "primer", "primp", "prince", "princess", "print", "prior", "prism", "prison", "prissy", "pristine", "privacy", "private", "privatize", "privy", "prize", "pro", "proactive", "probable", "probably", "probation", "probe", "probing", "probiotic", "problem", "procedure", "process", "proclaim", "procreate", "procurer", "prod", "prodigal", "prodigy", "prods", "produce", "product", "prof", "profane", "profanity", "professed", "professor", "profile", "profound", "profusely", "progeny", "prognosis", "program", "progress", "projector", "prologue", "prolonged", "prom", "promenade", "prominent", "promo", "promoter", "promotion", "prompter", "promptly", "prone", "prong", "pronounce", "pronto", "proof", "proofing", "proofread", "proofs", "prop", "propel", "propeller", "properly", "property", "proponent", "proposal", "propose", "props", "prorate", "prose", "protector", "protegee", "proton", "prototype", "protozoan", "protract", "protrude", "proud", "provable", "prove", "proved", "proven", "provided", "provider", "providing", "province", "proving", "provoke", "provoking", "provolone", "prow", "prowess", "prowl", "prowler", "prowling", "proximity", "proxy", "prozac", "prude", "prudishly", "prune", "pruning", "pry", "ps", "psalm", "psi", "psych", "psychic", "pt", "pu", "pub", "pubic", "public", "publisher", "pubs", "puck", "pucker", "puddle", "pudgy", "pueblo", "puff", "puffs", "puffy", "pug", "puke", "pull", "pulls", "pulmonary", "pulp", "pulsate", "pulse", "pulverize", "puma", "pumice", "pummel", "pump", "pumps", "pun", "punch", "punctual", "punctuate", "punctured", "pungent", "punish", "punisher", "punk", "punks", "punky", "puns", "punt", "punts", "puny", "pup", "pupil", "puppet", "puppy", "purchase", "pure", "pureblood", "purebred", "purely", "pureness", "purgatory", "purge", "purging", "purifier", "purify", "purist", "puritan", "purity", "purple", "purplish", "purposely", "purr", "purse", "pursuable", "pursuant", "pursuit", "purveyor", "pus", "push", "pushcart", "pushchair", "pusher", "pushiness", "pushing", "pushover", "pushpin", "pushup", "pushy", "pussy", "put", "putdown", "puts", "putt", "putty", "puzzle", "puzzling", "pv", "pvc", "pw", "px", "py", "pygmy", "pyramid", "pyre", "pyrex", "pyromania", "python", "pz", "q", "q&a", "q's", "qa", "qb", "qc", "qd", "qe", "qed", "qf", "qg", "qh", "qi", "qj", "qk", "ql", "qm", "qn", "qo", "qp", "qq", "qqq", "qqqq", "qr", "qrs", "qs", "qt", "qu", "quack", "quad", "quadrant", "quail", "quaintly", "quake", "quaking", "qualified", "qualifier", "qualify", "quality", "qualm", "quantum", "quarrel", "quarry", "quart", "quartered", "quarterly", "quarters", "quartet", "queasy", "queen", "quench", "query", "quest", "queue", "quick", "quicken", "quickly", "quickness", "quicksand", "quickstep", "quiet", "quill", "quilt", "quinn", "quintet", "quintuple", "quip", "quips", "quirk", "quit", "quite", "quits", "quiver", "quiz", "quizzical", "quota", "quotable", "quotation", "quote", "qv", "qw", "qx", "qy", "qz", "r", "r&b", "r&d", "r&r", "r's", "ra", "rabbi", "rabbit", "rabid", "race", "raced", "races", "racing", "racism", "rack", "racoon", "racy", "radar", "radial", "radiance", "radiantly", "radiated", "radiation", "radiator", "radio", "radish", "raffle", "raft", "rafts", "rag", "rage", "raged", "ragged", "raging", "rags", "ragweed", "raid", "raider", "raids", "rail", "railcar", "railing", "railroad", "rails", "railway", "rain", "rains", "rainy", "raise", "raisin", "rake", "raked", "rakes", "raking", "rally", "ralph", "ram", "ramble", "rambling", "rambo", "ramp", "ramrod", "rams", "ramsey", "ran", "ranch", "rancidity", "rand", "random", "randy", "rang", "range", "ranged", "ranger", "ranging", "rank", "ranked", "ranking", "ranks", "ransack", "rant", "ranting", "rants", "raoul", "rap", "rapid", "raps", "rare", "rarity", "rascal", "rash", "rasping", "rat", "rate", "rated", "rates", "ratio", "rats", "rattle", "ravage", "rave", "raved", "raven", "ravine", "raving", "ravioli", "ravishing", "raw", "ray", "rayon", "rays", "raze", "razor", "rb", "rc", "rd", "re", "reabsorb", "reach", "reacquire", "reaction", "reactive", "reactor", "read", "reads", "ready", "reaffirm", "real", "realm", "ream", "reanalyze", "reap", "reappear", "reapply", "reappoint", "reapprove", "rear", "rearrange", "rearview", "reason", "reassign", "reassure", "reattach", "reawake", "rebalance", "rebate", "rebel", "rebirth", "reboot", "reborn", "rebound", "rebuff", "rebuild", "rebuilt", "reburial", "rebut", "rebuttal", "recall", "recant", "recap", "recapture", "recast", "recede", "recent", "recess", "recharger", "recipe", "recipient", "recital", "recite", "reckless", "reclaim", "recliner", "reclining", "recluse", "reclusive", "recognize", "recoil", "recollect", "recolor", "reconcile", "reconfirm", "reconvene", "recopy", "record", "recount", "recoup", "recovery", "recreate", "rectal", "rectangle", "rectified", "rectify", "recur", "recycled", "recycler", "recycling", "red", "redeem", "redo", "reduce", "reed", "reeds", "reef", "reek", "reeks", "reel", "reels", "reemerge", "reenact", "reenter", "reentry", "reexamine", "ref", "refer", "referable", "referee", "reference", "refill", "refinance", "refined", "refinery", "refining", "refinish", "reflected", "reflector", "reflex", "reflux", "refocus", "refold", "reforest", "reformat", "reformed", "reformer", "reformist", "refract", "refrain", "refreeze", "refresh", "refried", "refs", "refueling", "refund", "refurbish", "refurnish", "refusal", "refuse", "refusing", "refutable", "refute", "regain", "regal", "regalia", "regally", "reggae", "regime", "region", "register", "registrar", "registry", "regress", "regretful", "regroup", "regs", "regular", "regulate", "regulator", "rehab", "reheat", "rehire", "rehydrate", "reich", "reid", "reign", "reimburse", "rein", "reins", "reissue", "reiterate", "reject", "rejoice", "rejoicing", "rejoin", "rekindle", "relapse", "relapsing", "relatable", "related", "relation", "relative", "relax", "relay", "relearn", "release", "relenting", "reliable", "reliably", "reliance", "reliant", "relic", "relieve", "relieving", "relight", "relish", "relive", "reload", "relocate", "relock", "reluctant", "rely", "rem", "remake", "remark", "remarry", "rematch", "remedial", "remedy", "remember", "reminder", "remindful", "remission", "remit", "remix", "remnant", "remodeler", "remold", "remorse", "remote", "removable", "removal", "removed", "remover", "removing", "rena", "rename", "rend", "renderer", "rendering", "rendition", "renee", "renegade", "renew", "renewable", "renewably", "renewal", "renewed", "reno", "renounce", "renovate", "renovator", "renown", "rent", "rentable", "rental", "rented", "renter", "rents", "reoccupy", "reoccur", "reopen", "reorder", "rep", "repackage", "repacking", "repaint", "repair", "repave", "repay", "repaying", "repayment", "repeal", "repeated", "repeater", "repel", "repent", "rephrase", "replace", "replay", "replica", "reply", "reporter", "repose", "repossess", "repost", "repressed", "reprimand", "reprint", "reprise", "reproach", "reprocess", "reproduce", "reprogram", "reps", "reptile", "reptilian", "repugnant", "repulsion", "repulsive", "repurpose", "reputable", "reputably", "request", "require", "requisite", "reroute", "rerun", "resale", "resample", "rescuer", "reseal", "research", "reselect", "reseller", "resemble", "resend", "resent", "reset", "reshape", "reshoot", "reshuffle", "residence", "residency", "resident", "residual", "residue", "resigned", "resilient", "resin", "resistant", "resisting", "resize", "resolute", "resolved", "resonant", "resonate", "resort", "resource", "respect", "rest", "rests", "resubmit", "result", "resume", "resupply", "resurface", "resurrect", "retail", "retainer", "retaining", "retake", "retaliate", "retch", "retention", "rethink", "retinal", "retired", "retiree", "retiring", "retold", "retool", "retorted", "retouch", "retrace", "retract", "retrain", "retread", "retreat", "retrial", "retrieval", "retriever", "retry", "return", "retying", "retype", "reunion", "reunite", "reusable", "reuse", "rev", "reveal", "revel", "reveler", "revenge", "revenue", "reverb", "revered", "reverence", "reverend", "reversal", "reverse", "reversing", "reversion", "revert", "review", "revisable", "revise", "revision", "revisit", "revivable", "revival", "reviver", "reviving", "revocable", "revoke", "revolt", "revolver", "revolving", "reward", "rewash", "rewind", "rewire", "reword", "rework", "rewrap", "rewrite", "rex", "rf", "rg", "rh", "rhino", "rho", "rhoda", "rhyme", "ri", "rib", "ribbon", "ribcage", "ribs", "rice", "rich", "riches", "richly", "richness", "rick", "rickety", "ricky", "rico", "ricotta", "rid", "riddance", "ridden", "ride", "rider", "ridge", "riding", "rif", "rifle", "rifling", "rift", "rig", "rigging", "riggs", "right", "rigid", "rigor", "rigs", "riley", "rim", "rimless", "rimmed", "rims", "rind", "ring", "ringo", "rings", "rink", "rinse", "rinsing", "rio", "riot", "riots", "rip", "ripcord", "ripe", "ripen", "ripeness", "ripening", "ripley", "ripping", "ripple", "rippling", "rips", "riptide", "rise", "risen", "rising", "risk", "risky", "risotto", "ritalin", "rite", "ritual", "ritzy", "rival", "river", "riverbank", "riverbed", "riverboat", "riverside", "rivet", "riveter", "riveting", "rj", "rk", "rl", "rm", "rn", "rna", "ro", "roach", "road", "roads", "roam", "roamer", "roaming", "roar", "roast", "rob", "robbing", "robe", "robin", "robot", "robotics", "robs", "robust", "rock", "rockband", "rocker", "rocket", "rockfish", "rockiness", "rocking", "rocklike", "rocks", "rockslide", "rockstar", "rocky", "rod", "rode", "rodeo", "rods", "roger", "rogue", "role", "roll", "rolls", "roman", "rome", "romeo", "romp", "ron", "roof", "rook", "rookie", "room", "rooms", "roomy", "roost", "root", "roots", "rope", "roping", "rosa", "rose", "ross", "roster", "rosy", "rot", "rote", "roth", "rots", "rotten", "rotting", "rotunda", "rouge", "rough", "roulette", "round", "rounding", "roundish", "roundness", "roundup", "roundworm", "rouse", "rout", "route", "routine", "routing", "rover", "roving", "row", "rowdy", "rows", "roy", "royal", "rp", "rpg", "rq", "rr", "rrr", "rrrr", "rs", "rst", "rsvp", "rt", "ru", "rub", "rubbed", "rubber", "rubbing", "rubble", "rubdown", "rube", "rubs", "ruby", "ruckus", "rudder", "rude", "rudy", "rufus", "rug", "rugged", "rugs", "ruin", "ruined", "ruins", "rule", "ruler", "rules", "rum", "rumble", "rumbling", "rummage", "rummy", "rumor", "rump", "rumpus", "run", "runaround", "rundown", "rune", "runes", "rung", "runner", "running", "runny", "runs", "runt", "runway", "rupture", "rural", "ruse", "rush", "russ", "rust", "rusts", "rusty", "rut", "ruth", "ruts", "rv", "rw", "rx", "ry", "ryan", "rye", "rz", "s", "s's", "sa", "sabbath", "saber", "sable", "sabotage", "sac", "sack", "sacks", "sacrament", "sacred", "sacrifice", "sad", "sadden", "saddle", "saddlebag", "saddled", "saddling", "sadly", "sadness", "safari", "safe", "safeguard", "safehouse", "safely", "safeness", "safer", "safes", "saffron", "sag", "saga", "sagas", "sage", "sagging", "saggy", "sags", "said", "sail", "sails", "saint", "sake", "sal", "salad", "salami", "salaried", "salary", "sale", "sales", "saline", "salk", "sally", "salon", "saloon", "salsa", "salt", "salts", "salty", "salutary", "salute", "salvage", "salvaging", "salvation", "salvo", "sam", "same", "sammy", "sample", "sampling", "samuel", "sanction", "sanctity", "sanctuary", "sand", "sandal", "sandbag", "sandbank", "sandbar", "sandblast", "sandbox", "sanded", "sandfish", "sanding", "sandlot", "sandpaper", "sandpit", "sands", "sandstone", "sandstorm", "sandworm", "sandy", "sane", "sang", "sanitary", "sanitizer", "sank", "santa", "sap", "sapling", "sappiness", "sappy", "saps", "sara", "sarah", "saran", "sarcasm", "sarcastic", "sardine", "sase", "sash", "sasquatch", "sassy", "sat", "satan", "satchel", "satiable", "satin", "satirical", "satisfied", "satisfy", "saturate", "saturday", "sauce", "sauciness", "saucy", "saudi", "saul", "sauna", "saute", "savage", "savanna", "save", "saved", "saves", "savings", "savior", "savor", "savvy", "saw", "saws", "sawyer", "sax", "saxophone", "say", "says", "sb", "sc", "scab", "scabbed", "scabby", "scald", "scalded", "scalding", "scale", "scaling", "scallion", "scallop", "scalp", "scalping", "scam", "scamp", "scan", "scandal", "scanner", "scanning", "scans", "scant", "scapegoat", "scar", "scarce", "scarcity", "scare", "scarecrow", "scared", "scarf", "scarily", "scariness", "scarring", "scars", "scary", "scat", "scavenger", "scene", "scenic", "scent", "schedule", "schematic", "scheme", "scheming", "schilling", "schnapps", "scholar", "school", "science", "scientist", "scion", "scoff", "scold", "scolding", "scone", "scoop", "scoot", "scooter", "scope", "scorch", "score", "scorebook", "scorecard", "scored", "scoreless", "scorer", "scoring", "scorn", "scorpion", "scot", "scotch", "scott", "scoundrel", "scour", "scoured", "scouring", "scout", "scouting", "scouts", "scow", "scowl", "scowling", "scrabble", "scraggly", "scram", "scrambled", "scrambler", "scrap", "scrape", "scratch", "scrawny", "screen", "screw", "scribble", "scribe", "scribing", "scrimmage", "scrip", "script", "scrod", "scroll", "scrooge", "scrounger", "scrub", "scrubbed", "scrubber", "scruffy", "scrunch", "scrutiny", "scuba", "scuff", "sculptor", "sculpture", "scum", "scurry", "scurvy", "scuttle", "sd", "sdi", "se", "sea", "seal", "seals", "seam", "seams", "seamy", "sean", "sear", "sears", "seas", "season", "seat", "seats", "secluded", "secluding", "seclusion", "second", "secrecy", "secret", "sect", "sectional", "sector", "sects", "secular", "securely", "security", "sedan", "sedate", "sedation", "sedative", "sediment", "seduce", "seducing", "see", "seed", "seeds", "seedy", "seek", "seeks", "seem", "seems", "seen", "seep", "seer", "seers", "sees", "seethe", "segment", "seismic", "seize", "seizing", "seldom", "selected", "selection", "selective", "selector", "self", "sell", "sells", "seltzer", "semantic", "semen", "semester", "semi", "semicolon", "semifinal", "seminar", "semisoft", "semisweet", "senate", "senator", "send", "sends", "senior", "senorita", "sensation", "sense", "sensitive", "sensitize", "sensually", "sensuous", "sent", "sentry", "sep", "sepia", "september", "septic", "septum", "sequel", "sequence", "sequester", "sequin", "serb", "serf", "series", "sermon", "serotonin", "serpent", "serrated", "serum", "serve", "service", "serving", "servo", "sesame", "sessions", "set", "setback", "seth", "sets", "setting", "settle", "settling", "setup", "seven", "sevenfold", "seventeen", "seventh", "seventy", "sever", "severe", "severity", "sew", "sewed", "sewer", "sewn", "sews", "sex", "sexy", "sf", "sg", "sgt", "sh", "shabby", "shack", "shade", "shaded", "shadily", "shadiness", "shading", "shadow", "shady", "shaft", "shaggy", "shakable", "shake", "shaken", "shakily", "shakiness", "shaking", "shaky", "shale", "shall", "shallot", "shallow", "sham", "shame", "shampoo", "shamrock", "shank", "shanty", "shape", "shaping", "share", "shari", "shark", "sharp", "sharpener", "sharper", "sharpie", "sharply", "sharpness", "shave", "shaw", "shawl", "she", "she'd", "she's", "shea", "sheaf", "shear", "sheath", "shed", "sheds", "sheep", "sheer", "sheet", "sheik", "shelf", "shell", "shelter", "shelve", "shelving", "sherry", "shh", "shield", "shift", "shifter", "shifting", "shiftless", "shifty", "shimmer", "shimmy", "shin", "shindig", "shine", "shingle", "shininess", "shining", "shins", "shiny", "ship", "ships", "shirk", "shirt", "shivering", "shock", "shoe", "shoes", "shone", "shoo", "shook", "shoot", "shop", "shoplift", "shopper", "shopping", "shops", "shoptalk", "shore", "short", "shortage", "shortcake", "shortcut", "shorten", "shorter", "shorthand", "shortlist", "shortly", "shortness", "shorts", "shortwave", "shorty", "shot", "shots", "shout", "shove", "show", "showbiz", "showcase", "showdown", "shower", "showgirl", "showing", "showman", "shown", "showoff", "showpiece", "showplace", "showroom", "shows", "showy", "shrank", "shrapnel", "shred", "shredder", "shredding", "shrew", "shrewdly", "shriek", "shrill", "shrimp", "shrine", "shrink", "shrivel", "shrouded", "shrub", "shrubbery", "shrubs", "shrug", "shrunk", "shuck", "shucking", "shudder", "shuffle", "shuffling", "shun", "shush", "shut", "shuts", "shy", "shyly", "si", "siamese", "siberian", "sibling", "sic", "sick", "sicko", "sid", "side", "siding", "siege", "sierra", "siesta", "sieve", "sift", "sifts", "sigh", "sighing", "sighs", "sight", "sigma", "sign", "signal", "signs", "silenced", "silencer", "silent", "silica", "silicon", "silk", "silks", "silky", "sill", "silliness", "silly", "silo", "silt", "silver", "similarly", "simile", "simmering", "simms", "simon", "simons", "simple", "simplify", "simply", "sims", "sin", "since", "sincere", "sincerity", "sinew", "sing", "singer", "singing", "single", "sings", "singular", "sinister", "sink", "sinks", "sinless", "sinner", "sins", "sinuous", "sinus", "sip", "sips", "sir", "sire", "siren", "sis", "sister", "sit", "sitcom", "site", "sites", "sits", "sitter", "sitting", "situated", "situation", "six", "sixfold", "sixgun", "sixteen", "sixth", "sixties", "sixtieth", "sixty", "sixtyfold", "sizable", "sizably", "size", "sizes", "sizing", "sizzle", "sizzling", "sj", "sk", "skate", "skater", "skating", "skedaddle", "skeletal", "skeleton", "skeptic", "sketch", "skew", "skewed", "skewer", "ski", "skid", "skids", "skied", "skier", "skies", "skiing", "skill", "skilled", "skillet", "skillful", "skim", "skimmed", "skimmer", "skimming", "skimpily", "skimpy", "skims", "skin", "skincare", "skinhead", "skinless", "skinning", "skinny", "skintight", "skip", "skipper", "skipping", "skips", "skirmish", "skirt", "skis", "skit", "skits", "skittle", "skulk", "skull", "skunk", "sky", "skydiver", "skylight", "skyline", "skype", "skyrocket", "skyward", "sl", "slab", "slabs", "slack", "slacked", "slacker", "slacking", "slackness", "slacks", "slain", "slam", "slams", "slander", "slang", "slant", "slap", "slapping", "slaps", "slapstick", "slash", "slashed", "slashing", "slate", "slater", "slather", "slaw", "slay", "sled", "sleds", "sleek", "sleep", "sleet", "sleeve", "slept", "slew", "slice", "sliceable", "sliced", "slicer", "slicing", "slick", "slid", "slide", "slider", "slideshow", "sliding", "slighted", "slighting", "slightly", "slim", "slime", "slimness", "slimy", "sling", "slinging", "slingshot", "slinky", "slip", "slips", "slit", "sliver", "slob", "slobbery", "slog", "slogan", "sloop", "slop", "slope", "sloped", "sloping", "sloppily", "sloppy", "slops", "slosh", "slot", "sloth", "slots", "slouching", "slouchy", "slow", "slows", "sludge", "slug", "slugs", "slum", "slump", "slums", "slung", "slur", "slurp", "slurs", "slush", "sly", "slyly", "sm", "smack", "small", "smart", "smartly", "smartness", "smash", "smasher", "smashing", "smashup", "smear", "smell", "smelting", "smile", "smilingly", "smirk", "smite", "smith", "smitten", "smock", "smog", "smoke", "smoked", "smokeless", "smokiness", "smoking", "smoky", "smolder", "smooth", "smother", "smudge", "smudgy", "smug", "smuggler", "smuggling", "smugly", "smugness", "smut", "sn", "snack", "snafu", "snag", "snagged", "snail", "snake", "snaking", "snap", "snaps", "snare", "snarl", "snatch", "snazzy", "sneak", "sneer", "sneeze", "sneezing", "snide", "sniff", "snip", "snipe", "snippet", "snipping", "snitch", "snob", "snobs", "snoop", "snooper", "snooze", "snore", "snoring", "snorkel", "snort", "snot", "snout", "snow", "snowbird", "snowboard", "snowbound", "snowcap", "snowdrift", "snowdrop", "snowfall", "snowfield", "snowflake", "snowiness", "snowless", "snowman", "snowplow", "snows", "snowshoe", "snowstorm", "snowsuit", "snowy", "snub", "snubs", "snuff", "snug", "snuggle", "snugly", "snugness", "so", "soak", "soaks", "soap", "soapy", "soar", "soars", "sob", "sober", "sobs", "social", "sock", "socks", "sod", "soda", "sofa", "soft", "soften", "soggy", "soil", "soils", "sol", "solar", "sold", "sole", "solemn", "solid", "solo", "solve", "somber", "some", "son", "sonar", "song", "songs", "sonny", "sons", "sony", "soon", "soot", "sop", "sore", "sorry", "sort", "sorts", "sos", "sot", "soul", "sound", "soup", "soupy", "sour", "source", "south", "sow", "sown", "sows", "sox", "soy", "soyuz", "sp", "spa", "space", "spade", "spain", "spam", "span", "spank", "spans", "spar", "spare", "spark", "sparks", "spas", "spasm", "spat", "spawn", "spay", "speak", "spear", "spearfish", "spearhead", "spearman", "spearmint", "spec", "species", "specimen", "speck", "specked", "speckled", "specks", "spectacle", "spectator", "spectrum", "speculate", "sped", "speech", "speed", "spell", "spellbind", "speller", "spelling", "spend", "spendable", "spender", "spending", "spent", "sperm", "spew", "sphere", "spherical", "sphinx", "spice", "spicy", "spider", "spied", "spies", "spiffy", "spike", "spiky", "spill", "spilt", "spin", "spinach", "spinal", "spindle", "spine", "spinner", "spinning", "spinout", "spins", "spinster", "spiny", "spiral", "spire", "spirited", "spiritism", "spirits", "spiritual", "spit", "spite", "spits", "spitz", "splashed", "splashing", "splashy", "splat", "splatter", "spleen", "splendid", "splendor", "splice", "splicing", "splinter", "split", "splotchy", "splurge", "spock", "spoil", "spoilage", "spoiled", "spoiler", "spoiling", "spoils", "spoke", "spoken", "spokesman", "sponge", "spongy", "sponsor", "spoof", "spook", "spookily", "spooky", "spool", "spoon", "spore", "sport", "sporting", "sports", "sporty", "spot", "spotless", "spotlight", "spots", "spotted", "spotter", "spotting", "spotty", "spousal", "spouse", "spout", "sprain", "sprang", "sprawl", "spray", "spree", "sprig", "spring", "sprinkled", "sprinkler", "sprint", "sprite", "sprout", "spruce", "sprung", "spry", "spud", "spun", "spunk", "spur", "spurn", "spurs", "spurt", "sputter", "spy", "spyglass", "sq", "squabble", "squad", "squall", "squander", "squash", "squat", "squatted", "squatter", "squatting", "squeak", "squealer", "squealing", "squeamish", "squeegee", "squeeze", "squeezing", "squid", "squiggle", "squiggly", "squint", "squire", "squirm", "squirt", "squishier", "squishy", "sr", "ss", "sse", "sss", "ssss", "sst", "ssw", "st", "stab", "stability", "stabilize", "stable", "stabs", "stack", "stacy", "stadium", "staff", "stag", "stage", "staging", "stagnant", "stagnate", "stain", "stainable", "stained", "staining", "stainless", "stair", "stake", "stale", "stalemate", "staleness", "stalk", "stall", "stalling", "stallion", "stamina", "stammer", "stamp", "stan", "stance", "stand", "stank", "staple", "stapling", "star", "starboard", "starch", "stardom", "stardust", "stare", "starfish", "stargazer", "staring", "stark", "starless", "starlet", "starlight", "starlit", "starr", "starring", "starry", "stars", "starship", "start", "starter", "starting", "startle", "startling", "startup", "starved", "starving", "stash", "stat", "state", "static", "statistic", "stats", "statue", "stature", "status", "statute", "statutory", "staunch", "stay", "stays", "steadfast", "steadier", "steadily", "steady", "steadying", "steak", "steal", "steam", "steed", "steel", "steep", "steer", "steerable", "steering", "steersman", "stegosaur", "stein", "stella", "stellar", "stem", "stems", "stench", "stencil", "step", "steps", "stereo", "sterile", "sterility", "sterilize", "sterling", "stern", "sternness", "sternum", "steve", "stew", "stick", "stiff", "stiffen", "stiffly", "stiffness", "stifle", "stifling", "still", "stillness", "stilt", "stimulant", "stimulate", "stimuli", "stimulus", "sting", "stinger", "stingily", "stinging", "stingray", "stingy", "stink", "stinking", "stinky", "stint", "stipend", "stipulate", "stir", "stirs", "stitch", "stock", "stoic", "stoke", "stole", "stomp", "stone", "stonewall", "stoneware", "stonework", "stoning", "stony", "stood", "stooge", "stool", "stoop", "stop", "stoplight", "stoppable", "stoppage", "stopped", "stopper", "stopping", "stops", "stopwatch", "storable", "storage", "store", "storeroom", "storewide", "stork", "storm", "stormy", "story", "stout", "stove", "stow", "stowaway", "stowing", "straddle", "strafe", "straggler", "strained", "strainer", "straining", "strangely", "stranger", "strangle", "strap", "strategic", "strategy", "stratus", "straw", "stray", "streak", "stream", "street", "strength", "strenuous", "strep", "stress", "stretch", "strewn", "stricken", "strict", "stride", "strife", "strike", "striking", "strip", "strive", "striving", "strobe", "strode", "stroll", "stroller", "strongbox", "strongly", "strongman", "struck", "structure", "strudel", "struggle", "strum", "strung", "strut", "stu", "stuart", "stub", "stubbed", "stubble", "stubbly", "stubborn", "stucco", "stuck", "stud", "student", "studied", "studio", "study", "stuff", "stuffed", "stuffing", "stuffy", "stumble", "stumbling", "stump", "stun", "stung", "stunk", "stunned", "stunner", "stunning", "stuns", "stunt", "stupor", "sturdily", "sturdy", "sty", "style", "styling", "stylishly", "stylist", "stylized", "stylus", "styx", "su", "suave", "sub", "subarctic", "subatomic", "subdivide", "subdued", "subduing", "subfloor", "subgroup", "subheader", "subject", "sublease", "sublet", "sublevel", "sublime", "submarine", "submerge", "submersed", "submitter", "subpanel", "subpar", "subplot", "subprime", "subs", "subscribe", "subscript", "subsector", "subside", "subsiding", "subsidize", "subsidy", "subsoil", "subsonic", "substance", "subsystem", "subtext", "subtitle", "subtle", "subtly", "subtotal", "subtract", "subtype", "suburb", "subway", "subwoofer", "subzero", "succulent", "such", "suck", "sucks", "suction", "sudden", "sudoku", "suds", "sue", "sued", "suede", "sues", "suey", "sufferer", "suffering", "suffice", "suffix", "suffocate", "suffrage", "sugar", "suggest", "suing", "suit", "suitable", "suitably", "suitcase", "suite", "suitor", "suits", "sulfate", "sulfide", "sulfite", "sulfur", "sulk", "sulks", "sulky", "sullen", "sulphate", "sulphuric", "sultry", "sum", "sumac", "summon", "sumo", "sums", "sun", "sung", "sunk", "sunny", "suns", "sunset", "sunup", "sup", "super", "superbowl", "superglue", "superhero", "superior", "superjet", "superman", "supermom", "supernova", "supervise", "supper", "supplier", "supply", "support", "supremacy", "supreme", "supt", "surcharge", "sure", "surely", "sureness", "surf", "surface", "surfacing", "surfboard", "surfer", "surge", "surgery", "surgical", "surging", "surname", "surpass", "surplus", "surprise", "surreal", "surrender", "surrogate", "surround", "survey", "survival", "survive", "surviving", "survivor", "susan", "sushi", "susie", "suspect", "suspend", "suspense", "sustained", "sustainer", "sutton", "suzy", "sv", "sven", "sw", "swab", "swaddling", "swag", "swagger", "swam", "swami", "swamp", "swampland", "swampy", "swan", "swank", "swans", "swap", "swapping", "swarm", "swat", "sway", "sways", "swear", "sweat", "sweaty", "swede", "sweep", "sweet", "swell", "swept", "swerve", "swift", "swifter", "swiftly", "swiftness", "swig", "swim", "swimmable", "swimmer", "swimming", "swims", "swimsuit", "swimwear", "swine", "swing", "swinger", "swinging", "swipe", "swirl", "swish", "swiss", "switch", "swivel", "swizzle", "swooned", "swoop", "swoosh", "sword", "swore", "sworn", "swum", "swung", "sx", "sy", "sybil", "sycamore", "symbol", "sympathy", "symphonic", "symphony", "symptom", "synapse", "syndrome", "synergy", "synopses", "synopsis", "synthesis", "synthetic", "syrup", "system", "sz", "t", "t&a", "t's", "t-shirt", "ta", "tab", "tabasco", "tabby", "table", "tableful", "tables", "tablet", "tableware", "tabloid", "taboo", "tabs", "tabu", "tack", "tackiness", "tacking", "tackle", "tackling", "tacky", "taco", "tact", "tactful", "tactic", "tactical", "tactics", "tactile", "tactless", "tad", "tadpole", "taekwondo", "taffy", "taft", "tag", "tags", "tail", "tails", "taint", "tainted", "take", "taken", "takes", "taking", "talcum", "tale", "tales", "talisman", "talk", "talks", "tall", "tally", "talon", "tamale", "tame", "tameness", "tamer", "tamper", "tan", "tang", "tango", "tangy", "tank", "tanks", "tanned", "tannery", "tanning", "tans", "tantrum", "tanya", "tao", "tap", "tape", "taped", "tapeless", "taper", "tapered", "tapering", "tapes", "tapestry", "tapioca", "tapping", "taps", "tar", "tarantula", "tardy", "target", "tarmac", "tarnish", "tarot", "tarp", "tarry", "tart", "tartar", "tartly", "tartness", "tarts", "task", "tassel", "taste", "tastiness", "tasting", "tasty", "tate", "tater", "tattered", "tattle", "tattling", "tattoo", "tau", "taunt", "taut", "tavern", "tax", "taxi", "tb", "tba", "tbsp", "tc", "td", "te", "tea", "teach", "teacup", "teak", "team", "teams", "tear", "tease", "tech", "ted", "teddy", "tee", "teen", "teens", "tees", "teeth", "tell", "tells", "temp", "temper", "temple", "tempo", "temps", "tempt", "ten", "tend", "tends", "tenor", "tens", "tense", "tent", "tenth", "tents", "term", "terms", "terra", "terry", "terse", "test", "tests", "testy", "tex", "texan", "texas", "text", "tf", "tg", "tgif", "th", "thai", "than", "thank", "that", "thaw", "thaws", "the", "theater", "theatrics", "thee", "theft", "their", "them", "theme", "then", "theology", "theorize", "there", "thermal", "thermos", "thesaurus", "these", "thesis", "thespian", "theta", "they", "thick", "thicken", "thicket", "thickness", "thief", "thieving", "thievish", "thigh", "thimble", "thin", "thing", "think", "thinly", "thinner", "thinness", "thinning", "thins", "third", "thirstily", "thirsting", "thirsty", "thirteen", "thirty", "this", "tho", "thong", "thor", "thorn", "thorny", "those", "thousand", "thrash", "thread", "threaten", "three", "threefold", "threw", "thrift", "thrill", "thrive", "thriving", "throat", "throb", "throbbing", "throng", "throttle", "throw", "throwaway", "throwback", "thrower", "throwing", "throws", "thru", "thu", "thud", "thug", "thumb", "thump", "thumping", "thur", "thursday", "thus", "thwarting", "thyme", "thyself", "ti", "tiara", "tibet", "tibia", "tic", "tick", "ticket", "ticks", "tics", "tidal", "tidbit", "tide", "tidiness", "tidings", "tidy", "tie", "tied", "tier", "ties", "tiger", "tight", "tighten", "tightly", "tightness", "tightrope", "tightwad", "tigress", "tile", "tiled", "tiles", "tiling", "till", "tilt", "tim", "time", "times", "timex", "timid", "timing", "timothy", "tin", "tina", "tinderbox", "tinfoil", "tinge", "tingle", "tingling", "tingly", "tinker", "tinkling", "tinny", "tinsel", "tinsmith", "tint", "tinwork", "tiny", "tip", "tipoff", "tipped", "tipper", "tipping", "tips", "tipsy", "tiptoeing", "tiptop", "tire", "tired", "tires", "tiring", "tissue", "title", "tj", "tk", "tl", "tlc", "tm", "tn", "tnt", "to", "toad", "toads", "toast", "toby", "today", "todd", "toe", "toes", "tofu", "toga", "toil", "toilet", "toils", "token", "tokyo", "told", "toll", "tolls", "tom", "tomb", "tombs", "tommy", "ton", "tonal", "tone", "toni", "tonic", "tons", "tonsil", "tony", "too", "took", "tool", "tools", "toot", "tooth", "top", "topaz", "topic", "topple", "tops", "topsy", "torah", "torch", "tore", "torn", "torso", "tort", "tory", "toss", "tot", "total", "tote", "totem", "tots", "touch", "tough", "tour", "tours", "tout", "tow", "towel", "tower", "town", "tows", "toxic", "toy", "toys", "tp", "tq", "tr", "trace", "tracing", "track", "tract", "traction", "tractor", "tracy", "trade", "trading", "tradition", "traffic", "tragedy", "trail", "trailing", "trailside", "train", "trait", "traitor", "tramp", "trance", "tranquil", "transfer", "transform", "translate", "transpire", "transport", "transpose", "trap", "trapdoor", "trapeze", "trapezoid", "trapped", "trapper", "trapping", "traps", "trash", "travel", "traverse", "travesty", "tray", "trays", "treachery", "tread", "treading", "treadmill", "treason", "treat", "treble", "tree", "trees", "trek", "trekker", "tremble", "trembling", "tremor", "trench", "trend", "trespass", "triage", "trial", "triangle", "tribe", "tribesman", "tribunal", "tribune", "tributary", "tribute", "triceps", "trick", "trickery", "trickily", "tricking", "trickle", "trickster", "tricky", "tricolor", "tricycle", "trident", "tried", "tries", "trifle", "trifocals", "trig", "trill", "trillion", "trilogy", "trim", "trimester", "trimmer", "trimming", "trimness", "trims", "trinity", "trio", "trip", "tripe", "tripod", "tripping", "trips", "trite", "triumph", "trivial", "trodden", "troll", "trolling", "trombone", "troop", "trophy", "tropical", "tropics", "trot", "trots", "trouble", "troubling", "trough", "trousers", "trout", "trowel", "troy", "truce", "truck", "trudge", "trudy", "true", "truffle", "truly", "trunk", "trunks", "truss", "trust", "trustable", "trustee", "trustful", "trusting", "trustless", "truth", "try", "ts", "tsar", "tsp", "tt", "ttt", "tttt", "tu", "tub", "tuba", "tubby", "tube", "tubeless", "tubes", "tubs", "tubular", "tuck", "tucking", "tue", "tues", "tuesday", "tuft", "tufts", "tug", "tugs", "tuition", "tulip", "tumble", "tumbling", "tummy", "tuna", "tune", "tuned", "tunic", "tunnel", "turban", "turbine", "turbofan", "turbojet", "turbulent", "turf", "turk", "turkey", "turmoil", "turn", "turret", "turtle", "tush", "tusk", "tusks", "tut", "tutor", "tutu", "tuv", "tux", "tv", "tw", "twa", "twain", "tweak", "tweed", "tweet", "tweezers", "twelve", "twentieth", "twenty", "twerp", "twice", "twiddle", "twiddling", "twig", "twigs", "twilight", "twin", "twine", "twins", "twirl", "twist", "twistable", "twisted", "twister", "twisting", "twisty", "twit", "twitch", "twitter", "two", "twos", "tx", "ty", "tycoon", "tying", "tyke", "tyler", "type", "typed", "types", "typo", "tz", "u", "u's", "u-2", "ua", "ub", "uc", "ud", "udder", "ue", "uf", "ufo", "ug", "ugh", "ugly", "uh", "ui", "uj", "uk", "ul", "ulcer", "ultimate", "ultimatum", "ultra", "um", "umbilical", "umbrella", "umpire", "un", "unabashed", "unable", "unadorned", "unadvised", "unafraid", "unaired", "unaligned", "unaltered", "unarmored", "unashamed", "unaudited", "unawake", "unaware", "unbaked", "unbalance", "unbeaten", "unbend", "unbent", "unbiased", "unbitten", "unblended", "unblessed", "unblock", "unbolted", "unbounded", "unboxed", "unbraided", "unbridle", "unbroken", "unbuckled", "unbundle", "unburned", "unbutton", "uncanny", "uncapped", "uncaring", "uncertain", "unchain", "unchanged", "uncharted", "uncheck", "uncivil", "unclad", "unclaimed", "unclamped", "unclasp", "uncle", "unclip", "uncloak", "unclog", "unclothed", "uncoated", "uncoiled", "uncolored", "uncombed", "uncommon", "uncooked", "uncork", "uncorrupt", "uncounted", "uncouple", "uncouth", "uncover", "uncross", "uncrown", "uncrushed", "uncured", "uncurious", "uncurled", "uncut", "undamaged", "undated", "undaunted", "undead", "undecided", "undefined", "under", "underage", "underarm", "undercoat", "undercook", "undercut", "underdog", "underdone", "underfed", "underfeed", "underfoot", "undergo", "undergrad", "underhand", "underline", "underling", "undermine", "undermost", "underpaid", "underpass", "underpay", "underrate", "undertake", "undertone", "undertook", "undertow", "underuse", "underwear", "underwent", "underwire", "undesired", "undiluted", "undivided", "undo", "undocked", "undoing", "undone", "undrafted", "undress", "undrilled", "undue", "undusted", "undying", "unearned", "unearth", "unease", "uneasily", "uneasy", "uneatable", "uneaten", "unedited", "unelected", "unending", "unengaged", "unenvied", "unequal", "unethical", "uneven", "unexpired", "unexposed", "unfailing", "unfair", "unfasten", "unfazed", "unfeeling", "unfiled", "unfilled", "unfit", "unfitted", "unfitting", "unfixable", "unfixed", "unflawed", "unfocused", "unfold", "unfounded", "unframed", "unfreeze", "unfrosted", "unfrozen", "unfunded", "unglazed", "ungloved", "unglue", "ungodly", "ungraded", "ungreased", "unguarded", "unguided", "unhappily", "unhappy", "unharmed", "unhealthy", "unheard", "unhearing", "unheated", "unhelpful", "unhidden", "unhinge", "unhitched", "unholy", "unhook", "unicorn", "unicycle", "unified", "unifier", "uniformed", "uniformly", "unify", "unimpeded", "uninjured", "uninstall", "uninsured", "uninvited", "union", "uniquely", "unisexual", "unison", "unissued", "unit", "unite", "units", "unity", "universal", "universe", "unix", "unjustly", "unkempt", "unkind", "unknotted", "unknowing", "unknown", "unlaced", "unlatch", "unlawful", "unleaded", "unlearned", "unleash", "unless", "unleveled", "unlighted", "unlikable", "unlimited", "unlined", "unlinked", "unlisted", "unlit", "unlivable", "unloaded", "unloader", "unlocked", "unlocking", "unlovable", "unloved", "unlovely", "unloving", "unluckily", "unlucky", "unmade", "unmanaged", "unmanned", "unmapped", "unmarked", "unmasked", "unmasking", "unmatched", "unmindful", "unmixable", "unmixed", "unmolded", "unmoral", "unmovable", "unmoved", "unmoving", "unnamable", "unnamed", "unnatural", "unneeded", "unnerve", "unnerving", "unnoticed", "unopened", "unopposed", "unpack", "unpadded", "unpaid", "unpainted", "unpaired", "unpaved", "unpeeled", "unpicked", "unpiloted", "unpinned", "unplanned", "unplanted", "unpleased", "unpledged", "unplowed", "unplug", "unpopular", "unproven", "unquote", "unranked", "unrated", "unraveled", "unreached", "unread", "unreal", "unreeling", "unrefined", "unrelated", "unrented", "unrest", "unretired", "unrevised", "unrigged", "unripe", "unrivaled", "unroasted", "unrobed", "unroll", "unruffled", "unruly", "unrushed", "unsaddle", "unsafe", "unsaid", "unsalted", "unsaved", "unsavory", "unscathed", "unscented", "unscrew", "unsealed", "unseated", "unsecured", "unseeing", "unseemly", "unseen", "unselect", "unselfish", "unsent", "unsettled", "unshackle", "unshaken", "unshaved", "unshaven", "unsheathe", "unshipped", "unsightly", "unsigned", "unskilled", "unsliced", "unsmooth", "unsnap", "unsocial", "unsoiled", "unsold", "unsolved", "unsorted", "unspoiled", "unspoken", "unstable", "unstaffed", "unstamped", "unsteady", "unsterile", "unstirred", "unstitch", "unstopped", "unstuck", "unstuffed", "unstylish", "unsubtle", "unsubtly", "unsuited", "unsure", "unsworn", "untagged", "untainted", "untaken", "untamed", "untangled", "untapped", "untaxed", "unthawed", "unthread", "untidy", "untie", "until", "untimed", "untimely", "untitled", "unto", "untoasted", "untold", "untouched", "untracked", "untrained", "untreated", "untried", "untrimmed", "untrue", "untruth", "unturned", "untwist", "untying", "unusable", "unused", "unusual", "unvalued", "unvaried", "unvarying", "unveiled", "unveiling", "unvented", "unviable", "unvisited", "unvocal", "unwanted", "unwarlike", "unwary", "unwashed", "unwatched", "unweave", "unwed", "unwelcome", "unwell", "unwieldy", "unwilling", "unwind", "unwired", "unwitting", "unwomanly", "unworldly", "unworn", "unworried", "unworthy", "unwound", "unwoven", "unwrapped", "unwritten", "unzip", "uo", "up", "upbeat", "upchuck", "upcoming", "upcountry", "update", "upfront", "upgrade", "upheaval", "upheld", "uphill", "uphold", "upi", "uplifted", "uplifting", "upload", "upon", "upper", "upright", "uprising", "upriver", "uproar", "uproot", "ups", "upscale", "upset", "upside", "upstage", "upstairs", "upstart", "upstate", "upstream", "upstroke", "upswing", "uptake", "uptight", "uptown", "upturned", "upward", "upwind", "uq", "ur", "uranium", "urban", "urchin", "urethane", "urge", "urged", "urgency", "urgent", "urges", "urging", "urine", "urn", "urologist", "urology", "us", "usa", "usable", "usaf", "usage", "use", "useable", "used", "useful", "uselessly", "user", "uses", "usher", "usia", "ussr", "usual", "usurp", "ut", "utah", "utensil", "utility", "utilize", "utmost", "utopia", "utter", "uu", "uuu", "uuuu", "uv", "uvula", "uvw", "uw", "ux", "uy", "uz", "v", "v's", "v-8", "va", "vacancy", "vacant", "vacate", "vacation", "vacuum", "vagabond", "vagrancy", "vagrantly", "vague", "vaguely", "vagueness", "vain", "val", "vale", "valet", "valiant", "valid", "valium", "valley", "valor", "valuables", "value", "valve", "vamp", "van", "vance", "vane", "vanilla", "vanish", "vanity", "vanquish", "vans", "vantage", "vapor", "vaporizer", "variable", "variably", "varied", "variety", "various", "varmint", "varnish", "varsity", "vary", "varying", "vascular", "vase", "vaseline", "vases", "vast", "vastly", "vastness", "vat", "vats", "vault", "vb", "vc", "vcr", "vd", "ve", "veal", "veep", "veer", "veers", "vegan", "veggie", "vehicular", "veil", "vein", "veins", "velcro", "velocity", "velvet", "venal", "vend", "vendetta", "vending", "vendor", "vends", "veneering", "vengeful", "venom", "venomous", "vent", "ventricle", "vents", "venture", "venue", "venus", "vera", "verb", "verbalize", "verbally", "verbose", "verbs", "verdi", "verdict", "verge", "verify", "vern", "verna", "verne", "verse", "version", "versus", "vertebrae", "vertical", "vertigo", "verve", "very", "vessel", "vest", "vests", "vet", "veteran", "veto", "vets", "vex", "vexed", "vexes", "vexingly", "vf", "vg", "vh", "vi", "via", "viability", "viable", "vial", "vibes", "vic", "vice", "vices", "vicinity", "vicky", "victory", "video", "vie", "viet", "view", "viewable", "viewer", "viewing", "viewless", "viewpoint", "vigil", "vigor", "vigorous", "vii", "viii", "vile", "village", "villain", "vinci", "vindicate", "vine", "vines", "vineyard", "vintage", "vinyl", "viola", "violate", "violation", "violator", "violet", "violin", "vip", "viper", "viral", "virgil", "virgo", "virtual", "virtuous", "virus", "visa", "viscosity", "viscous", "vise", "viselike", "visible", "visibly", "vision", "visit", "visiting", "visitor", "visor", "vista", "vital", "vitality", "vitalize", "vitally", "vitamins", "vito", "viva", "vivacious", "vivian", "vivid", "vividly", "vividness", "vixen", "vj", "vk", "vl", "vlad", "vm", "vn", "vo", "vocal", "vocalist", "vocalize", "vocally", "vocation", "vodka", "vogue", "voice", "voicing", "void", "volatile", "volley", "volt", "voltage", "volts", "volumes", "volvo", "vomit", "vote", "voter", "voting", "vouch", "voucher", "vow", "vowed", "vowel", "vows", "voyage", "vp", "vq", "vr", "vs", "vt", "vtol", "vu", "vulcan", "vv", "vvv", "vvvv", "vw", "vwx", "vx", "vy", "vz", "w", "w's", "w/o", "wa", "wackiness", "wacko", "wacky", "wad", "wade", "wades", "wafer", "waffle", "wag", "wage", "waged", "wager", "wages", "waggle", "wagon", "wags", "wahoo", "waif", "wail", "wails", "waist", "wait", "wake", "waken", "waking", "waldo", "walk", "wall", "walls", "wally", "walmart", "walnut", "walrus", "walsh", "walt", "walton", "waltz", "wand", "wang", "wannabe", "want", "wanted", "wanting", "wants", "war", "ward", "warm", "warmth", "warn", "warns", "warp", "warren", "wars", "wart", "warts", "wary", "was", "wasabi", "wash", "washable", "washbasin", "washboard", "washbowl", "washcloth", "washday", "washed", "washer", "washhouse", "washing", "washout", "washroom", "washstand", "washtub", "wasp", "wasps", "waste", "wasting", "watch", "water", "watt", "watts", "wave", "waved", "waver", "waves", "waviness", "waving", "wavy", "wax", "waxy", "way", "wayne", "ways", "wb", "wc", "wd", "we", "we'd", "we'll", "we're", "we've", "weak", "wealth", "wear", "wears", "weary", "weave", "web", "webb", "webs", "wed", "wedge", "weds", "wee", "weed", "weedy", "week", "weeks", "weep", "weeps", "weigh", "weird", "welch", "weld", "well", "wells", "welsh", "wendy", "went", "wept", "were", "wes", "west", "wet", "wets", "wf", "wg", "wh", "whacking", "whacky", "whale", "wham", "wharf", "what", "wheat", "whee", "wheel", "when", "whenever", "where", "whew", "which", "whiff", "while", "whim", "whimsical", "whine", "whinny", "whiny", "whip", "whips", "whir", "whirl", "whisking", "white", "whiz", "who", "who'd", "whoa", "whoever", "whole", "whom", "whomever", "whoop", "whoopee", "whooping", "whoops", "whoosh", "whose", "why", "wi", "wick", "wide", "widely", "widen", "wider", "widget", "widow", "width", "wield", "wieldable", "wielder", "wife", "wifi", "wig", "wigs", "wikipedia", "wild", "wildcard", "wildcat", "wilder", "wildfire", "wildfowl", "wildland", "wildlife", "wildly", "wildness", "wiley", "wilkes", "will", "willed", "willfully", "willing", "willow", "willpower", "wills", "willy", "wilma", "wilt", "wily", "wimp", "wimpy", "win", "wince", "winch", "wincing", "wind", "windy", "wine", "wines", "wing", "wings", "wink", "winking", "winks", "winner", "winnie", "winnings", "wino", "wins", "winter", "wipe", "wire", "wired", "wireless", "wires", "wiring", "wiry", "wisdom", "wise", "wiser", "wish", "wisp", "wisplike", "wispy", "wistful", "wit", "witch", "with", "wits", "witty", "wizard", "wj", "wk", "wl", "wm", "wn", "wnw", "wo", "wobble", "wobbling", "wobbly", "woe", "woes", "wok", "woke", "wolf", "wolff", "wolverine", "woman", "womanhood", "womankind", "womanless", "womanlike", "womanly", "womb", "women", "won", "won't", "wonder", "wong", "woo", "wood", "woods", "woody", "woof", "wooing", "wool", "woos", "woozy", "word", "words", "wordy", "wore", "work", "world", "worm", "worms", "wormy", "worn", "worried", "worrier", "worrisome", "worry", "worse", "worsening", "worshiper", "worst", "worth", "would", "wound", "wove", "woven", "wow", "wp", "wq", "wr", "wrangle", "wrap", "wrath", "wreak", "wreath", "wreck", "wreckage", "wrecker", "wrecking", "wren", "wrench", "wriggle", "wriggly", "wring", "wrinkle", "wrinkly", "wrist", "write", "writhe", "writing", "written", "wrong", "wrongdoer", "wronged", "wrongful", "wrongly", "wrongness", "wrote", "wrought", "wry", "ws", "wsw", "wt", "wu", "wv", "ww", "wwi", "wwii", "www", "wwww", "wx", "wxy", "wy", "wyatt", "wylie", "wyman", "wynn", "wz", "x", "x's", "xa", "xb", "xbox", "xc", "xd", "xe", "xerox", "xf", "xg", "xh", "xi", "xii", "xiii", "xiv", "xj", "xk", "xl", "xm", "xmas", "xn", "xo", "xp", "xq", "xr", "xray", "xrays", "xs", "xt", "xu", "xv", "xvi", "xvii", "xw", "xx", "xxx", "xxxx", "xy", "xyz", "xz", "y", "y'all", "y's", "ya", "yacht", "yahoo", "yak", "yale", "yam", "yamaha", "yams", "yang", "yank", "yanking", "yanks", "yap", "yapping", "yard", "yards", "yarn", "yawn", "yawns", "yb", "yc", "yd", "ye", "yea", "yeah", "year", "yearbook", "yearling", "yearly", "yearn", "yearning", "yeast", "yeats", "yell", "yelling", "yellow", "yelp", "yen", "yep", "yes", "yesterday", "yet", "yew", "yews", "yf", "yg", "yh", "yi", "yiddish", "yield", "yin", "yip", "yippee", "yips", "yj", "yk", "yl", "ym", "yn", "yo", "yo-yo", "yodel", "yoga", "yogi", "yogurt", "yoke", "yokel", "yolk", "yonder", "yore", "york", "you", "you'd", "young", "your", "yours", "youth", "yoyo", "yp", "yq", "yr", "yrs", "ys", "yt", "ytd", "yu", "yucca", "yuck", "yukon", "yule", "yummy", "yv", "yw", "yx", "yy", "yyy", "yyyy", "yz", "z", "z's", "za", "zag", "zap", "zaps", "zb", "zc", "zd", "ze", "zeal", "zealot", "zealous", "zebra", "zeke", "zen", "zeppelin", "zero", "zest", "zestfully", "zesty", "zeta", "zf", "zg", "zh", "zi", "zig", "ziggy", "zigzag", "zigzagged", "zilch", "zinc", "zing", "zion", "zip", "zipfile", "zipping", "zippy", "zips", "zit", "ziti", "zj", "zk", "zl", "zm", "zn", "zo", "zodiac", "zoe", "zombie", "zone", "zoned", "zoning", "zoo", "zookeeper", "zoologist", "zoology", "zoom", "zooms", "zoos", "zowie", "zp", "zq", "zr", "zs", "zt", "zu", "zulu", "zv", "zw", "zx", "zy", "zz", "zzz", "zzzz", "azathoth", "cthulhu", "dagon", "hastur", "nyarlathotep", "sub-niggurath", "shuggoth", "yog-sothoth", "coily", "gamera", "krankor", "mitchell", "nuveena", "pumaman", "rowsdower", "servo", "torgo", "andorian", "chekov", "gorn", "horta", "kirk", "klingon", "mccoy", "orion", "rigel", "romulan", "scotty", "spock", "sulu", "uhura", "vulcan", "borg", "ferengi", "geordi", "guinan", "picard", "riker", "sisko", "troi", "worf", "yar", "cybermen", "brigadier", "dalek", "k-9", "leela", "romana", "tardis", "aragorn", "balrog", "bilbo", "boramir", "elrond", "frodo", "galadriel", "gandalf", "gimli", "gollum", "legolas", "nazgul", "radagast", "samwise", "saruman", "sauron", "applejack", "celestia", "derpy", "fluttershy", "pinkie", "rainbow", "rarity", "sparkle", "anakin", "boba", "chewbacca", "darth", "han", "jaba", "kenobi", "leia", "obi-wan", "palpatine", "sith", "skywalker", "vadar", "yoda"];

  // output/Component/index.js
  var show3 = /* @__PURE__ */ show(showInt);
  var type_4 = /* @__PURE__ */ type_3(isPropButtonType);
  var map14 = /* @__PURE__ */ map(functorArray);
  var bind3 = /* @__PURE__ */ bind(bindHalogenM);
  var put3 = /* @__PURE__ */ put(monadStateHalogenM);
  var Initialize2 = /* @__PURE__ */ function() {
    function Initialize3() {
    }
    ;
    Initialize3.value = new Initialize3();
    return Initialize3;
  }();
  var GeneratePassword = /* @__PURE__ */ function() {
    function GeneratePassword2() {
    }
    ;
    GeneratePassword2.value = new GeneratePassword2();
    return GeneratePassword2;
  }();
  var render = function(state3) {
    return div_([h1_([text("xkcd Password Generator")]), div2([class_("xkcd_panel")])([p([class_("xkcd_result")])([text(state3.password)]), p([class_("xkcd_result_len")])([span2([id3("xkcd_pw_result_len")])([text(show3(length4(state3.password) - 3 | 0))]), text(" characters")]), button([type_4(ButtonSubmit.value), onClick(function(v) {
      return GeneratePassword.value;
    })])([text("Generate Another!")])])]);
  };
  var randomToWord = function(r) {
    return fromMaybe("")(index(wordList)(fromMaybe(0)(fromString(r))));
  };
  var initialState = function(v) {
    return {
      password: "_ _ _ _"
    };
  };
  var generatePassword = function(dictMonadAff) {
    var Monad0 = dictMonadAff.MonadEffect0().Monad0();
    var pure10 = pure(Monad0.Applicative0());
    var url = "https://www.random.org/integers/?num=4&min=0&max=" + (toStringAs(decimal)(length(wordList)) + "&col=1&base=10&&format=plain&rnd=new");
    return bind(Monad0.Bind1())(liftAff(dictMonadAff)(get2(string)(url)))(function(response) {
      var password = function() {
        if (response instanceof Left) {
          return printError(response.value0);
        }
        ;
        if (response instanceof Right) {
          return joinWith(" ")(map14(randomToWord)(take(4)(split("\n")(response.value0.body))));
        }
        ;
        throw new Error("Failed pattern match at Component (line 60, column 20 - line 62, column 108): " + [response.constructor.name]);
      }();
      return pure10(password);
    });
  };
  var handleAction = function(dictMonadAff) {
    var generatePassword1 = generatePassword(monadAffHalogenM(dictMonadAff));
    return function(v) {
      if (v instanceof Initialize2) {
        return bind3(generatePassword1)(function(randoms) {
          return put3({
            password: randoms
          });
        });
      }
      ;
      if (v instanceof GeneratePassword) {
        return bind3(generatePassword1)(function(randoms) {
          return put3({
            password: randoms
          });
        });
      }
      ;
      throw new Error("Failed pattern match at Component (line 66, column 16 - line 72, column 32): " + [v.constructor.name]);
    };
  };
  var component = function(dictMonadAff) {
    return mkComponent({
      initialState,
      render,
      "eval": mkEval({
        handleAction: handleAction(dictMonadAff),
        handleQuery: defaultEval.handleQuery,
        receive: defaultEval.receive,
        initialize: new Just(Initialize2.value),
        finalize: defaultEval.finalize
      })
    });
  };

  // output/Web.HTML/foreign.js
  var windowImpl = function() {
    return window;
  };

  // output/Web.HTML.HTMLDocument/foreign.js
  function _readyState(doc) {
    return doc.readyState;
  }

  // output/Web.HTML.HTMLDocument.ReadyState/index.js
  var Loading = /* @__PURE__ */ function() {
    function Loading2() {
    }
    ;
    Loading2.value = new Loading2();
    return Loading2;
  }();
  var Interactive = /* @__PURE__ */ function() {
    function Interactive2() {
    }
    ;
    Interactive2.value = new Interactive2();
    return Interactive2;
  }();
  var Complete = /* @__PURE__ */ function() {
    function Complete2() {
    }
    ;
    Complete2.value = new Complete2();
    return Complete2;
  }();
  var parse = function(v) {
    if (v === "loading") {
      return new Just(Loading.value);
    }
    ;
    if (v === "interactive") {
      return new Just(Interactive.value);
    }
    ;
    if (v === "complete") {
      return new Just(Complete.value);
    }
    ;
    return Nothing.value;
  };

  // output/Web.HTML.HTMLDocument/index.js
  var map15 = /* @__PURE__ */ map(functorEffect);
  var toParentNode = unsafeCoerce2;
  var toDocument = unsafeCoerce2;
  var readyState = function(doc) {
    return map15(function() {
      var $4 = fromMaybe(Loading.value);
      return function($5) {
        return $4(parse($5));
      };
    }())(function() {
      return _readyState(doc);
    });
  };

  // output/Web.HTML.HTMLElement/foreign.js
  function _read(nothing, just, value13) {
    var tag = Object.prototype.toString.call(value13);
    if (tag.indexOf("[object HTML") === 0 && tag.indexOf("Element]") === tag.length - 8) {
      return just(value13);
    } else {
      return nothing;
    }
  }

  // output/Web.HTML.HTMLElement/index.js
  var toNode2 = unsafeCoerce2;
  var fromElement = function(x) {
    return _read(Nothing.value, Just.create, x);
  };

  // output/Web.HTML.Window/foreign.js
  function document(window2) {
    return function() {
      return window2.document;
    };
  }

  // output/Web.HTML.Window/index.js
  var toEventTarget = unsafeCoerce2;

  // output/Halogen.Aff.Util/index.js
  var bind4 = /* @__PURE__ */ bind(bindAff);
  var liftEffect3 = /* @__PURE__ */ liftEffect(monadEffectAff);
  var bindFlipped5 = /* @__PURE__ */ bindFlipped(bindEffect);
  var composeKleisliFlipped3 = /* @__PURE__ */ composeKleisliFlipped(bindEffect);
  var pure6 = /* @__PURE__ */ pure(applicativeAff);
  var bindFlipped1 = /* @__PURE__ */ bindFlipped(bindMaybe);
  var pure12 = /* @__PURE__ */ pure(applicativeEffect);
  var map16 = /* @__PURE__ */ map(functorEffect);
  var discard2 = /* @__PURE__ */ discard(discardUnit);
  var throwError2 = /* @__PURE__ */ throwError(monadThrowAff);
  var selectElement = function(query2) {
    return bind4(liftEffect3(bindFlipped5(composeKleisliFlipped3(function() {
      var $16 = querySelector(query2);
      return function($17) {
        return $16(toParentNode($17));
      };
    }())(document))(windowImpl)))(function(mel) {
      return pure6(bindFlipped1(fromElement)(mel));
    });
  };
  var runHalogenAff = /* @__PURE__ */ runAff_(/* @__PURE__ */ either(throwException)(/* @__PURE__ */ $$const(/* @__PURE__ */ pure12(unit))));
  var awaitLoad = /* @__PURE__ */ makeAff(function(callback) {
    return function __do2() {
      var rs = bindFlipped5(readyState)(bindFlipped5(document)(windowImpl))();
      if (rs instanceof Loading) {
        var et = map16(toEventTarget)(windowImpl)();
        var listener = eventListener(function(v) {
          return callback(new Right(unit));
        })();
        addEventListener2(domcontentloaded)(listener)(false)(et)();
        return effectCanceler(removeEventListener2(domcontentloaded)(listener)(false)(et));
      }
      ;
      callback(new Right(unit))();
      return nonCanceler;
    };
  });
  var awaitBody = /* @__PURE__ */ discard2(bindAff)(awaitLoad)(function() {
    return bind4(selectElement("body"))(function(body2) {
      return maybe(throwError2(error("Could not find body")))(pure6)(body2);
    });
  });

  // output/Control.Monad.Fork.Class/index.js
  var monadForkAff = {
    suspend: suspendAff,
    fork: forkAff,
    join: joinFiber,
    Monad0: function() {
      return monadAff;
    },
    Functor1: function() {
      return functorFiber;
    }
  };
  var fork = function(dict) {
    return dict.fork;
  };

  // output/Effect.Console/foreign.js
  var warn = function(s) {
    return function() {
      console.warn(s);
    };
  };

  // output/Halogen.Aff.Driver.State/index.js
  var unRenderStateX = unsafeCoerce2;
  var unDriverStateX = unsafeCoerce2;
  var renderStateX_ = function(dictApplicative) {
    var traverse_7 = traverse_(dictApplicative)(foldableMaybe);
    return function(f) {
      return unDriverStateX(function(st) {
        return traverse_7(f)(st.rendering);
      });
    };
  };
  var mkRenderStateX = unsafeCoerce2;
  var renderStateX = function(dictFunctor) {
    return function(f) {
      return unDriverStateX(function(st) {
        return mkRenderStateX(f(st.rendering));
      });
    };
  };
  var mkDriverStateXRef = unsafeCoerce2;
  var mapDriverState = function(f) {
    return function(v) {
      return f(v);
    };
  };
  var initDriverState = function(component3) {
    return function(input3) {
      return function(handler3) {
        return function(lchs) {
          return function __do2() {
            var selfRef = $$new({})();
            var childrenIn = $$new(empty4)();
            var childrenOut = $$new(empty4)();
            var handlerRef = $$new(handler3)();
            var pendingQueries = $$new(new Just(Nil.value))();
            var pendingOuts = $$new(new Just(Nil.value))();
            var pendingHandlers = $$new(Nothing.value)();
            var fresh2 = $$new(1)();
            var subscriptions = $$new(new Just(empty3))();
            var forks = $$new(empty3)();
            var ds = {
              component: component3,
              state: component3.initialState(input3),
              refs: empty3,
              children: empty4,
              childrenIn,
              childrenOut,
              selfRef,
              handlerRef,
              pendingQueries,
              pendingOuts,
              pendingHandlers,
              rendering: Nothing.value,
              fresh: fresh2,
              subscriptions,
              forks,
              lifecycleHandlers: lchs
            };
            write(ds)(selfRef)();
            return mkDriverStateXRef(selfRef);
          };
        };
      };
    };
  };

  // output/Halogen.Aff.Driver.Eval/index.js
  var traverse_4 = /* @__PURE__ */ traverse_(applicativeEffect)(foldableMaybe);
  var bindFlipped6 = /* @__PURE__ */ bindFlipped(bindMaybe);
  var lookup4 = /* @__PURE__ */ lookup2(ordSubscriptionId);
  var bind12 = /* @__PURE__ */ bind(bindAff);
  var liftEffect4 = /* @__PURE__ */ liftEffect(monadEffectAff);
  var discard3 = /* @__PURE__ */ discard(discardUnit);
  var discard1 = /* @__PURE__ */ discard3(bindAff);
  var traverse_12 = /* @__PURE__ */ traverse_(applicativeAff);
  var traverse_22 = /* @__PURE__ */ traverse_12(foldableList);
  var fork3 = /* @__PURE__ */ fork(monadForkAff);
  var parSequence_2 = /* @__PURE__ */ parSequence_(parallelAff)(foldableList);
  var pure7 = /* @__PURE__ */ pure(applicativeAff);
  var map18 = /* @__PURE__ */ map(functorCoyoneda);
  var parallel2 = /* @__PURE__ */ parallel(parallelAff);
  var map19 = /* @__PURE__ */ map(functorAff);
  var sequential2 = /* @__PURE__ */ sequential(parallelAff);
  var map22 = /* @__PURE__ */ map(functorMaybe);
  var insert3 = /* @__PURE__ */ insert(ordSubscriptionId);
  var retractFreeAp2 = /* @__PURE__ */ retractFreeAp(applicativeParAff);
  var $$delete3 = /* @__PURE__ */ $$delete2(ordForkId);
  var unlessM2 = /* @__PURE__ */ unlessM(monadEffect);
  var insert1 = /* @__PURE__ */ insert(ordForkId);
  var traverse_32 = /* @__PURE__ */ traverse_12(foldableMaybe);
  var lookup1 = /* @__PURE__ */ lookup2(ordForkId);
  var lookup22 = /* @__PURE__ */ lookup2(ordString);
  var foldFree2 = /* @__PURE__ */ foldFree(monadRecAff);
  var alter2 = /* @__PURE__ */ alter(ordString);
  var unsubscribe3 = function(sid) {
    return function(ref2) {
      return function __do2() {
        var v = read(ref2)();
        var subs = read(v.subscriptions)();
        return traverse_4(unsubscribe)(bindFlipped6(lookup4(sid))(subs))();
      };
    };
  };
  var queueOrRun = function(ref2) {
    return function(au) {
      return bind12(liftEffect4(read(ref2)))(function(v) {
        if (v instanceof Nothing) {
          return au;
        }
        ;
        if (v instanceof Just) {
          return liftEffect4(write(new Just(new Cons(au, v.value0)))(ref2));
        }
        ;
        throw new Error("Failed pattern match at Halogen.Aff.Driver.Eval (line 188, column 33 - line 190, column 57): " + [v.constructor.name]);
      });
    };
  };
  var handleLifecycle = function(lchs) {
    return function(f) {
      return discard1(liftEffect4(write({
        initializers: Nil.value,
        finalizers: Nil.value
      })(lchs)))(function() {
        return bind12(liftEffect4(f))(function(result) {
          return bind12(liftEffect4(read(lchs)))(function(v) {
            return discard1(traverse_22(fork3)(v.finalizers))(function() {
              return discard1(parSequence_2(v.initializers))(function() {
                return pure7(result);
              });
            });
          });
        });
      });
    };
  };
  var handleAff = /* @__PURE__ */ runAff_(/* @__PURE__ */ either(throwException)(/* @__PURE__ */ $$const(/* @__PURE__ */ pure(applicativeEffect)(unit))));
  var fresh = function(f) {
    return function(ref2) {
      return bind12(liftEffect4(read(ref2)))(function(v) {
        return liftEffect4(modify$prime(function(i2) {
          return {
            state: i2 + 1 | 0,
            value: f(i2)
          };
        })(v.fresh));
      });
    };
  };
  var evalQ = function(render2) {
    return function(ref2) {
      return function(q2) {
        return bind12(liftEffect4(read(ref2)))(function(v) {
          return evalM(render2)(ref2)(v["component"]["eval"](new Query(map18(Just.create)(liftCoyoneda(q2)), $$const(Nothing.value))));
        });
      };
    };
  };
  var evalM = function(render2) {
    return function(initRef) {
      return function(v) {
        var evalChildQuery = function(ref2) {
          return function(cqb) {
            return bind12(liftEffect4(read(ref2)))(function(v1) {
              return unChildQueryBox(function(v2) {
                var evalChild = function(v3) {
                  return parallel2(bind12(liftEffect4(read(v3)))(function(dsx) {
                    return unDriverStateX(function(ds) {
                      return evalQ(render2)(ds.selfRef)(v2.value1);
                    })(dsx);
                  }));
                };
                return map19(v2.value2)(sequential2(v2.value0(applicativeParAff)(evalChild)(v1.children)));
              })(cqb);
            });
          };
        };
        var go2 = function(ref2) {
          return function(v1) {
            if (v1 instanceof State) {
              return bind12(liftEffect4(read(ref2)))(function(v2) {
                var v3 = v1.value0(v2.state);
                if (unsafeRefEq(v2.state)(v3.value1)) {
                  return pure7(v3.value0);
                }
                ;
                if (otherwise) {
                  return discard1(liftEffect4(write({
                    component: v2.component,
                    state: v3.value1,
                    refs: v2.refs,
                    children: v2.children,
                    childrenIn: v2.childrenIn,
                    childrenOut: v2.childrenOut,
                    selfRef: v2.selfRef,
                    handlerRef: v2.handlerRef,
                    pendingQueries: v2.pendingQueries,
                    pendingOuts: v2.pendingOuts,
                    pendingHandlers: v2.pendingHandlers,
                    rendering: v2.rendering,
                    fresh: v2.fresh,
                    subscriptions: v2.subscriptions,
                    forks: v2.forks,
                    lifecycleHandlers: v2.lifecycleHandlers
                  })(ref2)))(function() {
                    return discard1(handleLifecycle(v2.lifecycleHandlers)(render2(v2.lifecycleHandlers)(ref2)))(function() {
                      return pure7(v3.value0);
                    });
                  });
                }
                ;
                throw new Error("Failed pattern match at Halogen.Aff.Driver.Eval (line 86, column 7 - line 92, column 21): " + [v3.constructor.name]);
              });
            }
            ;
            if (v1 instanceof Subscribe) {
              return bind12(fresh(SubscriptionId)(ref2))(function(sid) {
                return bind12(liftEffect4(subscribe(v1.value0(sid))(function(act) {
                  return handleAff(evalF(render2)(ref2)(new Action(act)));
                })))(function(finalize) {
                  return bind12(liftEffect4(read(ref2)))(function(v2) {
                    return discard1(liftEffect4(modify_(map22(insert3(sid)(finalize)))(v2.subscriptions)))(function() {
                      return pure7(v1.value1(sid));
                    });
                  });
                });
              });
            }
            ;
            if (v1 instanceof Unsubscribe) {
              return discard1(liftEffect4(unsubscribe3(v1.value0)(ref2)))(function() {
                return pure7(v1.value1);
              });
            }
            ;
            if (v1 instanceof Lift2) {
              return v1.value0;
            }
            ;
            if (v1 instanceof ChildQuery2) {
              return evalChildQuery(ref2)(v1.value0);
            }
            ;
            if (v1 instanceof Raise) {
              return bind12(liftEffect4(read(ref2)))(function(v2) {
                return bind12(liftEffect4(read(v2.handlerRef)))(function(handler3) {
                  return discard1(queueOrRun(v2.pendingOuts)(handler3(v1.value0)))(function() {
                    return pure7(v1.value1);
                  });
                });
              });
            }
            ;
            if (v1 instanceof Par) {
              return sequential2(retractFreeAp2(hoistFreeAp(function() {
                var $118 = evalM(render2)(ref2);
                return function($119) {
                  return parallel2($118($119));
                };
              }())(v1.value0)));
            }
            ;
            if (v1 instanceof Fork) {
              return bind12(fresh(ForkId)(ref2))(function(fid) {
                return bind12(liftEffect4(read(ref2)))(function(v2) {
                  return bind12(liftEffect4($$new(false)))(function(doneRef) {
                    return bind12(fork3($$finally(liftEffect4(function __do2() {
                      modify_($$delete3(fid))(v2.forks)();
                      return write(true)(doneRef)();
                    }))(evalM(render2)(ref2)(v1.value0))))(function(fiber) {
                      return discard1(liftEffect4(unlessM2(read(doneRef))(modify_(insert1(fid)(fiber))(v2.forks))))(function() {
                        return pure7(v1.value1(fid));
                      });
                    });
                  });
                });
              });
            }
            ;
            if (v1 instanceof Join) {
              return bind12(liftEffect4(read(ref2)))(function(v2) {
                return bind12(liftEffect4(read(v2.forks)))(function(forkMap) {
                  return discard1(traverse_32(joinFiber)(lookup1(v1.value0)(forkMap)))(function() {
                    return pure7(v1.value1);
                  });
                });
              });
            }
            ;
            if (v1 instanceof Kill) {
              return bind12(liftEffect4(read(ref2)))(function(v2) {
                return bind12(liftEffect4(read(v2.forks)))(function(forkMap) {
                  return discard1(traverse_32(killFiber(error("Cancelled")))(lookup1(v1.value0)(forkMap)))(function() {
                    return pure7(v1.value1);
                  });
                });
              });
            }
            ;
            if (v1 instanceof GetRef) {
              return bind12(liftEffect4(read(ref2)))(function(v2) {
                return pure7(v1.value1(lookup22(v1.value0)(v2.refs)));
              });
            }
            ;
            throw new Error("Failed pattern match at Halogen.Aff.Driver.Eval (line 83, column 12 - line 139, column 33): " + [v1.constructor.name]);
          };
        };
        return foldFree2(go2(initRef))(v);
      };
    };
  };
  var evalF = function(render2) {
    return function(ref2) {
      return function(v) {
        if (v instanceof RefUpdate) {
          return liftEffect4(flip(modify_)(ref2)(mapDriverState(function(st) {
            return {
              component: st.component,
              state: st.state,
              refs: alter2($$const(v.value1))(v.value0)(st.refs),
              children: st.children,
              childrenIn: st.childrenIn,
              childrenOut: st.childrenOut,
              selfRef: st.selfRef,
              handlerRef: st.handlerRef,
              pendingQueries: st.pendingQueries,
              pendingOuts: st.pendingOuts,
              pendingHandlers: st.pendingHandlers,
              rendering: st.rendering,
              fresh: st.fresh,
              subscriptions: st.subscriptions,
              forks: st.forks,
              lifecycleHandlers: st.lifecycleHandlers
            };
          })));
        }
        ;
        if (v instanceof Action) {
          return bind12(liftEffect4(read(ref2)))(function(v1) {
            return evalM(render2)(ref2)(v1["component"]["eval"](new Action2(v.value0, unit)));
          });
        }
        ;
        throw new Error("Failed pattern match at Halogen.Aff.Driver.Eval (line 52, column 20 - line 58, column 62): " + [v.constructor.name]);
      };
    };
  };

  // output/Halogen.Aff.Driver/index.js
  var bind5 = /* @__PURE__ */ bind(bindEffect);
  var discard4 = /* @__PURE__ */ discard(discardUnit);
  var for_2 = /* @__PURE__ */ for_(applicativeEffect)(foldableMaybe);
  var traverse_5 = /* @__PURE__ */ traverse_(applicativeAff)(foldableList);
  var fork4 = /* @__PURE__ */ fork(monadForkAff);
  var bindFlipped7 = /* @__PURE__ */ bindFlipped(bindEffect);
  var traverse_13 = /* @__PURE__ */ traverse_(applicativeEffect);
  var traverse_23 = /* @__PURE__ */ traverse_13(foldableMaybe);
  var traverse_33 = /* @__PURE__ */ traverse_13(foldableMap);
  var discard22 = /* @__PURE__ */ discard4(bindAff);
  var parSequence_3 = /* @__PURE__ */ parSequence_(parallelAff)(foldableList);
  var liftEffect5 = /* @__PURE__ */ liftEffect(monadEffectAff);
  var pure8 = /* @__PURE__ */ pure(applicativeEffect);
  var map20 = /* @__PURE__ */ map(functorEffect);
  var pure13 = /* @__PURE__ */ pure(applicativeAff);
  var when2 = /* @__PURE__ */ when(applicativeEffect);
  var renderStateX2 = /* @__PURE__ */ renderStateX(functorEffect);
  var $$void5 = /* @__PURE__ */ $$void(functorAff);
  var foreachSlot2 = /* @__PURE__ */ foreachSlot(applicativeEffect);
  var renderStateX_2 = /* @__PURE__ */ renderStateX_(applicativeEffect);
  var tailRecM3 = /* @__PURE__ */ tailRecM(monadRecEffect);
  var voidLeft3 = /* @__PURE__ */ voidLeft(functorEffect);
  var bind13 = /* @__PURE__ */ bind(bindAff);
  var liftEffect1 = /* @__PURE__ */ liftEffect(monadEffectEffect);
  var newLifecycleHandlers = /* @__PURE__ */ function() {
    return $$new({
      initializers: Nil.value,
      finalizers: Nil.value
    });
  }();
  var handlePending = function(ref2) {
    return function __do2() {
      var queue = read(ref2)();
      write(Nothing.value)(ref2)();
      return for_2(queue)(function() {
        var $58 = traverse_5(fork4);
        return function($59) {
          return handleAff($58(reverse2($59)));
        };
      }())();
    };
  };
  var cleanupSubscriptionsAndForks = function(v) {
    return function __do2() {
      bindFlipped7(traverse_23(traverse_33(unsubscribe)))(read(v.subscriptions))();
      write(Nothing.value)(v.subscriptions)();
      bindFlipped7(traverse_33(function() {
        var $60 = killFiber(error("finalized"));
        return function($61) {
          return handleAff($60($61));
        };
      }()))(read(v.forks))();
      return write(empty3)(v.forks)();
    };
  };
  var runUI = function(renderSpec2) {
    return function(component3) {
      return function(i2) {
        var squashChildInitializers = function(lchs) {
          return function(preInits) {
            return unDriverStateX(function(st) {
              var parentInitializer = evalM(render2)(st.selfRef)(st["component"]["eval"](new Initialize(unit)));
              return modify_(function(handlers) {
                return {
                  initializers: new Cons(discard22(parSequence_3(reverse2(handlers.initializers)))(function() {
                    return discard22(parentInitializer)(function() {
                      return liftEffect5(function __do2() {
                        handlePending(st.pendingQueries)();
                        return handlePending(st.pendingOuts)();
                      });
                    });
                  }), preInits),
                  finalizers: handlers.finalizers
                };
              })(lchs);
            });
          };
        };
        var runComponent = function(lchs) {
          return function(handler3) {
            return function(j) {
              return unComponent(function(c) {
                return function __do2() {
                  var lchs$prime = newLifecycleHandlers();
                  var $$var2 = initDriverState(c)(j)(handler3)(lchs$prime)();
                  var pre2 = read(lchs)();
                  write({
                    initializers: Nil.value,
                    finalizers: pre2.finalizers
                  })(lchs)();
                  bindFlipped7(unDriverStateX(function() {
                    var $62 = render2(lchs);
                    return function($63) {
                      return $62(function(v) {
                        return v.selfRef;
                      }($63));
                    };
                  }()))(read($$var2))();
                  bindFlipped7(squashChildInitializers(lchs)(pre2.initializers))(read($$var2))();
                  return $$var2;
                };
              });
            };
          };
        };
        var renderChild = function(lchs) {
          return function(handler3) {
            return function(childrenInRef) {
              return function(childrenOutRef) {
                return unComponentSlot(function(slot) {
                  return function __do2() {
                    var childrenIn = map20(slot.pop)(read(childrenInRef))();
                    var $$var2 = function() {
                      if (childrenIn instanceof Just) {
                        write(childrenIn.value0.value1)(childrenInRef)();
                        var dsx = read(childrenIn.value0.value0)();
                        unDriverStateX(function(st) {
                          return function __do3() {
                            flip(write)(st.handlerRef)(function() {
                              var $64 = maybe(pure13(unit))(handler3);
                              return function($65) {
                                return $64(slot.output($65));
                              };
                            }())();
                            return handleAff(evalM(render2)(st.selfRef)(st["component"]["eval"](new Receive(slot.input, unit))))();
                          };
                        })(dsx)();
                        return childrenIn.value0.value0;
                      }
                      ;
                      if (childrenIn instanceof Nothing) {
                        return runComponent(lchs)(function() {
                          var $66 = maybe(pure13(unit))(handler3);
                          return function($67) {
                            return $66(slot.output($67));
                          };
                        }())(slot.input)(slot.component)();
                      }
                      ;
                      throw new Error("Failed pattern match at Halogen.Aff.Driver (line 213, column 14 - line 222, column 98): " + [childrenIn.constructor.name]);
                    }();
                    var isDuplicate = map20(function($68) {
                      return isJust(slot.get($68));
                    })(read(childrenOutRef))();
                    when2(isDuplicate)(warn("Halogen: Duplicate slot address was detected during rendering, unexpected results may occur"))();
                    modify_(slot.set($$var2))(childrenOutRef)();
                    return bind5(read($$var2))(renderStateX2(function(v) {
                      if (v instanceof Nothing) {
                        return $$throw("Halogen internal error: child was not initialized in renderChild");
                      }
                      ;
                      if (v instanceof Just) {
                        return pure8(renderSpec2.renderChild(v.value0));
                      }
                      ;
                      throw new Error("Failed pattern match at Halogen.Aff.Driver (line 227, column 37 - line 229, column 50): " + [v.constructor.name]);
                    }))();
                  };
                });
              };
            };
          };
        };
        var render2 = function(lchs) {
          return function($$var2) {
            return function __do2() {
              var v = read($$var2)();
              var shouldProcessHandlers = map20(isNothing)(read(v.pendingHandlers))();
              when2(shouldProcessHandlers)(write(new Just(Nil.value))(v.pendingHandlers))();
              write(empty4)(v.childrenOut)();
              write(v.children)(v.childrenIn)();
              var handler3 = function() {
                var $69 = queueOrRun(v.pendingHandlers);
                var $70 = evalF(render2)(v.selfRef);
                return function($71) {
                  return $69($$void5($70($71)));
                };
              }();
              var childHandler = function() {
                var $72 = queueOrRun(v.pendingQueries);
                return function($73) {
                  return $72(handler3(Action.create($73)));
                };
              }();
              var rendering = renderSpec2.render(function($74) {
                return handleAff(handler3($74));
              })(renderChild(lchs)(childHandler)(v.childrenIn)(v.childrenOut))(v.component.render(v.state))(v.rendering)();
              var children2 = read(v.childrenOut)();
              var childrenIn = read(v.childrenIn)();
              foreachSlot2(childrenIn)(function(v1) {
                return function __do3() {
                  var childDS = read(v1)();
                  renderStateX_2(renderSpec2.removeChild)(childDS)();
                  return finalize(lchs)(childDS)();
                };
              })();
              flip(modify_)(v.selfRef)(mapDriverState(function(ds$prime) {
                return {
                  component: ds$prime.component,
                  state: ds$prime.state,
                  refs: ds$prime.refs,
                  children: children2,
                  childrenIn: ds$prime.childrenIn,
                  childrenOut: ds$prime.childrenOut,
                  selfRef: ds$prime.selfRef,
                  handlerRef: ds$prime.handlerRef,
                  pendingQueries: ds$prime.pendingQueries,
                  pendingOuts: ds$prime.pendingOuts,
                  pendingHandlers: ds$prime.pendingHandlers,
                  rendering: new Just(rendering),
                  fresh: ds$prime.fresh,
                  subscriptions: ds$prime.subscriptions,
                  forks: ds$prime.forks,
                  lifecycleHandlers: ds$prime.lifecycleHandlers
                };
              }))();
              return when2(shouldProcessHandlers)(flip(tailRecM3)(unit)(function(v1) {
                return function __do3() {
                  var handlers = read(v.pendingHandlers)();
                  write(new Just(Nil.value))(v.pendingHandlers)();
                  traverse_23(function() {
                    var $75 = traverse_5(fork4);
                    return function($76) {
                      return handleAff($75(reverse2($76)));
                    };
                  }())(handlers)();
                  var mmore = read(v.pendingHandlers)();
                  var $51 = maybe(false)($$null)(mmore);
                  if ($51) {
                    return voidLeft3(write(Nothing.value)(v.pendingHandlers))(new Done(unit))();
                  }
                  ;
                  return new Loop(unit);
                };
              }))();
            };
          };
        };
        var finalize = function(lchs) {
          return unDriverStateX(function(st) {
            return function __do2() {
              cleanupSubscriptionsAndForks(st)();
              var f = evalM(render2)(st.selfRef)(st["component"]["eval"](new Finalize(unit)));
              modify_(function(handlers) {
                return {
                  initializers: handlers.initializers,
                  finalizers: new Cons(f, handlers.finalizers)
                };
              })(lchs)();
              return foreachSlot2(st.children)(function(v) {
                return function __do3() {
                  var dsx = read(v)();
                  return finalize(lchs)(dsx)();
                };
              })();
            };
          });
        };
        var evalDriver = function(disposed) {
          return function(ref2) {
            return function(q2) {
              return bind13(liftEffect5(read(disposed)))(function(v) {
                if (v) {
                  return pure13(Nothing.value);
                }
                ;
                return evalQ(render2)(ref2)(q2);
              });
            };
          };
        };
        var dispose = function(disposed) {
          return function(lchs) {
            return function(dsx) {
              return handleLifecycle(lchs)(function __do2() {
                var v = read(disposed)();
                if (v) {
                  return unit;
                }
                ;
                write(true)(disposed)();
                finalize(lchs)(dsx)();
                return unDriverStateX(function(v1) {
                  return function __do3() {
                    var v2 = liftEffect1(read(v1.selfRef))();
                    return for_2(v2.rendering)(renderSpec2.dispose)();
                  };
                })(dsx)();
              });
            };
          };
        };
        return bind13(liftEffect5(newLifecycleHandlers))(function(lchs) {
          return bind13(liftEffect5($$new(false)))(function(disposed) {
            return handleLifecycle(lchs)(function __do2() {
              var sio = create();
              var dsx = bindFlipped7(read)(runComponent(lchs)(function() {
                var $77 = notify(sio.listener);
                return function($78) {
                  return liftEffect5($77($78));
                };
              }())(i2)(component3))();
              return unDriverStateX(function(st) {
                return pure8({
                  query: evalDriver(disposed)(st.selfRef),
                  messages: sio.emitter,
                  dispose: dispose(disposed)(lchs)(dsx)
                });
              })(dsx)();
            });
          });
        });
      };
    };
  };

  // output/Web.DOM.Node/foreign.js
  var getEffProp2 = function(name16) {
    return function(node) {
      return function() {
        return node[name16];
      };
    };
  };
  var baseURI = getEffProp2("baseURI");
  var _ownerDocument = getEffProp2("ownerDocument");
  var _parentNode = getEffProp2("parentNode");
  var _parentElement = getEffProp2("parentElement");
  var childNodes = getEffProp2("childNodes");
  var _firstChild = getEffProp2("firstChild");
  var _lastChild = getEffProp2("lastChild");
  var _previousSibling = getEffProp2("previousSibling");
  var _nextSibling = getEffProp2("nextSibling");
  var _nodeValue = getEffProp2("nodeValue");
  var textContent = getEffProp2("textContent");
  function insertBefore(node1) {
    return function(node2) {
      return function(parent2) {
        return function() {
          parent2.insertBefore(node1, node2);
        };
      };
    };
  }
  function appendChild(node) {
    return function(parent2) {
      return function() {
        parent2.appendChild(node);
      };
    };
  }
  function removeChild2(node) {
    return function(parent2) {
      return function() {
        parent2.removeChild(node);
      };
    };
  }

  // output/Web.DOM.Node/index.js
  var map21 = /* @__PURE__ */ map(functorEffect);
  var parentNode2 = /* @__PURE__ */ function() {
    var $6 = map21(toMaybe);
    return function($7) {
      return $6(_parentNode($7));
    };
  }();
  var nextSibling = /* @__PURE__ */ function() {
    var $15 = map21(toMaybe);
    return function($16) {
      return $15(_nextSibling($16));
    };
  }();

  // output/Halogen.VDom.Driver/index.js
  var $runtime_lazy7 = function(name16, moduleName, init2) {
    var state3 = 0;
    var val;
    return function(lineNumber) {
      if (state3 === 2)
        return val;
      if (state3 === 1)
        throw new ReferenceError(name16 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
      state3 = 1;
      val = init2();
      state3 = 2;
      return val;
    };
  };
  var $$void6 = /* @__PURE__ */ $$void(functorEffect);
  var pure9 = /* @__PURE__ */ pure(applicativeEffect);
  var traverse_6 = /* @__PURE__ */ traverse_(applicativeEffect)(foldableMaybe);
  var unwrap5 = /* @__PURE__ */ unwrap();
  var when3 = /* @__PURE__ */ when(applicativeEffect);
  var not2 = /* @__PURE__ */ not(/* @__PURE__ */ heytingAlgebraFunction(/* @__PURE__ */ heytingAlgebraFunction(heytingAlgebraBoolean)));
  var identity8 = /* @__PURE__ */ identity(categoryFn);
  var bind14 = /* @__PURE__ */ bind(bindAff);
  var liftEffect6 = /* @__PURE__ */ liftEffect(monadEffectAff);
  var map23 = /* @__PURE__ */ map(functorEffect);
  var bindFlipped8 = /* @__PURE__ */ bindFlipped(bindEffect);
  var substInParent = function(v) {
    return function(v1) {
      return function(v2) {
        if (v1 instanceof Just && v2 instanceof Just) {
          return $$void6(insertBefore(v)(v1.value0)(v2.value0));
        }
        ;
        if (v1 instanceof Nothing && v2 instanceof Just) {
          return $$void6(appendChild(v)(v2.value0));
        }
        ;
        return pure9(unit);
      };
    };
  };
  var removeChild3 = function(v) {
    return function __do2() {
      var npn = parentNode2(v.node)();
      return traverse_6(function(pn) {
        return removeChild2(v.node)(pn);
      })(npn)();
    };
  };
  var mkSpec = function(handler3) {
    return function(renderChildRef) {
      return function(document2) {
        var getNode = unRenderStateX(function(v) {
          return v.node;
        });
        var done = function(st) {
          if (st instanceof Just) {
            return halt(st.value0);
          }
          ;
          return unit;
        };
        var buildWidget2 = function(spec) {
          var buildThunk2 = buildThunk(unwrap5)(spec);
          var $lazy_patch = $runtime_lazy7("patch", "Halogen.VDom.Driver", function() {
            return function(st, slot) {
              if (st instanceof Just) {
                if (slot instanceof ComponentSlot) {
                  halt(st.value0);
                  return $lazy_renderComponentSlot(100)(slot.value0);
                }
                ;
                if (slot instanceof ThunkSlot) {
                  var step$prime = step2(st.value0, slot.value0);
                  return mkStep(new Step(extract2(step$prime), new Just(step$prime), $lazy_patch(103), done));
                }
                ;
                throw new Error("Failed pattern match at Halogen.VDom.Driver (line 97, column 22 - line 103, column 79): " + [slot.constructor.name]);
              }
              ;
              return $lazy_render(104)(slot);
            };
          });
          var $lazy_render = $runtime_lazy7("render", "Halogen.VDom.Driver", function() {
            return function(slot) {
              if (slot instanceof ComponentSlot) {
                return $lazy_renderComponentSlot(86)(slot.value0);
              }
              ;
              if (slot instanceof ThunkSlot) {
                var step4 = buildThunk2(slot.value0);
                return mkStep(new Step(extract2(step4), new Just(step4), $lazy_patch(89), done));
              }
              ;
              throw new Error("Failed pattern match at Halogen.VDom.Driver (line 84, column 7 - line 89, column 75): " + [slot.constructor.name]);
            };
          });
          var $lazy_renderComponentSlot = $runtime_lazy7("renderComponentSlot", "Halogen.VDom.Driver", function() {
            return function(cs) {
              var renderChild = read(renderChildRef)();
              var rsx = renderChild(cs)();
              var node = getNode(rsx);
              return mkStep(new Step(node, Nothing.value, $lazy_patch(117), done));
            };
          });
          var patch2 = $lazy_patch(91);
          var render2 = $lazy_render(82);
          var renderComponentSlot = $lazy_renderComponentSlot(109);
          return render2;
        };
        var buildAttributes = buildProp(handler3);
        return {
          buildWidget: buildWidget2,
          buildAttributes,
          document: document2
        };
      };
    };
  };
  var renderSpec = function(document2) {
    return function(container) {
      var render2 = function(handler3) {
        return function(child) {
          return function(v) {
            return function(v1) {
              if (v1 instanceof Nothing) {
                return function __do2() {
                  var renderChildRef = $$new(child)();
                  var spec = mkSpec(handler3)(renderChildRef)(document2);
                  var machine = buildVDom(spec)(v);
                  var node = extract2(machine);
                  $$void6(appendChild(node)(toNode2(container)))();
                  return {
                    machine,
                    node,
                    renderChildRef
                  };
                };
              }
              ;
              if (v1 instanceof Just) {
                return function __do2() {
                  write(child)(v1.value0.renderChildRef)();
                  var parent2 = parentNode2(v1.value0.node)();
                  var nextSib = nextSibling(v1.value0.node)();
                  var machine$prime = step2(v1.value0.machine, v);
                  var newNode = extract2(machine$prime);
                  when3(not2(unsafeRefEq)(v1.value0.node)(newNode))(substInParent(newNode)(nextSib)(parent2))();
                  return {
                    machine: machine$prime,
                    node: newNode,
                    renderChildRef: v1.value0.renderChildRef
                  };
                };
              }
              ;
              throw new Error("Failed pattern match at Halogen.VDom.Driver (line 157, column 5 - line 173, column 80): " + [v1.constructor.name]);
            };
          };
        };
      };
      return {
        render: render2,
        renderChild: identity8,
        removeChild: removeChild3,
        dispose: removeChild3
      };
    };
  };
  var runUI2 = function(component3) {
    return function(i2) {
      return function(element3) {
        return bind14(liftEffect6(map23(toDocument)(bindFlipped8(document)(windowImpl))))(function(document2) {
          return runUI(renderSpec(document2)(element3))(component3)(i2);
        });
      };
    };
  };

  // output/Main/index.js
  var component2 = /* @__PURE__ */ component(monadAffAff);
  var main2 = /* @__PURE__ */ runHalogenAff(/* @__PURE__ */ bind(bindAff)(awaitBody)(function(body2) {
    return runUI2(component2)(unit)(body2);
  }));

  // <stdin>
  main2();
})();
