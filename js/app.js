(() => {
  "use strict";
  function e(e) {
    this.type = e;
  }
  (e.prototype.init = function () {
    const e = this;
    (this.оbjects = []),
      (this.daClassname = "_dynamic_adapt_"),
      (this.nodes = document.querySelectorAll("[data-da]"));
    for (let e = 0; e < this.nodes.length; e++) {
      const t = this.nodes[e],
        o = t.dataset.da.trim().split(","),
        r = {};
      (r.element = t),
        (r.parent = t.parentNode),
        (r.destination = document.querySelector(o[0].trim())),
        (r.breakpoint = o[1] ? o[1].trim() : "767"),
        (r.place = o[2] ? o[2].trim() : "last"),
        (r.index = this.indexInParent(r.parent, r.element)),
        this.оbjects.push(r);
    }
    this.arraySort(this.оbjects),
      (this.mediaQueries = Array.prototype.map.call(
        this.оbjects,
        function (e) {
          return (
            "(" + this.type + "-width: " + e.breakpoint + "px)," + e.breakpoint
          );
        },
        this
      )),
      (this.mediaQueries = Array.prototype.filter.call(
        this.mediaQueries,
        function (e, t, o) {
          return Array.prototype.indexOf.call(o, e) === t;
        }
      ));
    for (let t = 0; t < this.mediaQueries.length; t++) {
      const o = this.mediaQueries[t],
        r = String.prototype.split.call(o, ","),
        n = window.matchMedia(r[0]),
        s = r[1],
        a = Array.prototype.filter.call(this.оbjects, function (e) {
          return e.breakpoint === s;
        });
      n.addListener(function () {
        e.mediaHandler(n, a);
      }),
        this.mediaHandler(n, a);
    }
  }),
    (e.prototype.mediaHandler = function (e, t) {
      if (e.matches)
        for (let e = 0; e < t.length; e++) {
          const o = t[e];
          (o.index = this.indexInParent(o.parent, o.element)),
            this.moveTo(o.place, o.element, o.destination);
        }
      else
        for (let e = t.length - 1; e >= 0; e--) {
          const o = t[e];
          o.element.classList.contains(this.daClassname) &&
            this.moveBack(o.parent, o.element, o.index);
        }
    }),
    (e.prototype.moveTo = function (e, t, o) {
      t.classList.add(this.daClassname),
        "last" === e || e >= o.children.length
          ? o.insertAdjacentElement("beforeend", t)
          : "first" !== e
          ? o.children[e].insertAdjacentElement("beforebegin", t)
          : o.insertAdjacentElement("afterbegin", t);
    }),
    (e.prototype.moveBack = function (e, t, o) {
      t.classList.remove(this.daClassname),
        void 0 !== e.children[o]
          ? e.children[o].insertAdjacentElement("beforebegin", t)
          : e.insertAdjacentElement("beforeend", t);
    }),
    (e.prototype.indexInParent = function (e, t) {
      const o = Array.prototype.slice.call(e.children);
      return Array.prototype.indexOf.call(o, t);
    }),
    (e.prototype.arraySort = function (e) {
      "min" === this.type
        ? Array.prototype.sort.call(e, function (e, t) {
            return e.breakpoint === t.breakpoint
              ? e.place === t.place
                ? 0
                : "first" === e.place || "last" === t.place
                ? -1
                : "last" === e.place || "first" === t.place
                ? 1
                : e.place - t.place
              : e.breakpoint - t.breakpoint;
          })
        : Array.prototype.sort.call(e, function (e, t) {
            return e.breakpoint === t.breakpoint
              ? e.place === t.place
                ? 0
                : "first" === e.place || "last" === t.place
                ? 1
                : "last" === e.place || "first" === t.place
                ? -1
                : t.place - e.place
              : t.breakpoint - e.breakpoint;
          });
    });
  new e("max").init();
  class t {
    constructor(e, t = null) {
      if (
        ((this.config = Object.assign({ init: !0, logging: !0 }, e)),
        this.config.init)
      ) {
        const e = document.querySelectorAll("[data-prlx-mouse]");
        e.length
          ? (this.paralaxMouseInit(e),
            this.setLogging(`Проснулся, слежу за объектами: (${e.length})`))
          : this.setLogging("Нет ни одного объекта. Сплю...zzZZZzZZz...");
      }
    }
    paralaxMouseInit(e) {
      e.forEach((e) => {
        const t = e.closest("[data-prlx-mouse-wrapper]"),
          o = e.dataset.prlxCx ? +e.dataset.prlxCx : 100,
          r = e.dataset.prlxCy ? +e.dataset.prlxCy : 100,
          n = e.hasAttribute("data-prlx-dxr") ? -1 : 1,
          s = e.hasAttribute("data-prlx-dyr") ? -1 : 1,
          a = e.dataset.prlxA ? +e.dataset.prlxA : 50;
        let l = 0,
          i = 0,
          c = 0,
          d = 0;
        function m(t = window) {
          t.addEventListener("mousemove", function (t) {
            const o = e.getBoundingClientRect().top + window.scrollY;
            if (o >= window.scrollY || o + e.offsetHeight >= window.scrollY) {
              const e = window.innerWidth,
                o = window.innerHeight,
                r = t.clientX - e / 2,
                n = t.clientY - o / 2;
              (c = (r / e) * 100), (d = (n / o) * 100);
            }
          });
        }
        !(function t() {
          (l += ((c - l) * a) / 1e3),
            (i += ((d - i) * a) / 1e3),
            (e.style.cssText = `transform: translate3D(${(n * l) / (o / 10)}%,${
              (s * i) / (r / 10)
            }%,0);`),
            requestAnimationFrame(t);
        })(),
          t ? m(t) : m();
      });
    }
    setLogging(e) {
      this.config.logging && c(`[PRLX Mouse]: ${e}`);
    }
  }
  let o = (e, t = 500, o = 0) => {
      e.classList.contains("_slide") ||
        (e.classList.add("_slide"),
        (e.style.transitionProperty = "height, margin, padding"),
        (e.style.transitionDuration = t + "ms"),
        (e.style.height = `${e.offsetHeight}px`),
        e.offsetHeight,
        (e.style.overflow = "hidden"),
        (e.style.height = o ? `${o}px` : "0px"),
        (e.style.paddingTop = 0),
        (e.style.paddingBottom = 0),
        (e.style.marginTop = 0),
        (e.style.marginBottom = 0),
        window.setTimeout(() => {
          (e.hidden = !o),
            !o && e.style.removeProperty("height"),
            e.style.removeProperty("padding-top"),
            e.style.removeProperty("padding-bottom"),
            e.style.removeProperty("margin-top"),
            e.style.removeProperty("margin-bottom"),
            !o && e.style.removeProperty("overflow"),
            e.style.removeProperty("transition-duration"),
            e.style.removeProperty("transition-property"),
            e.classList.remove("_slide");
        }, t));
    },
    r = (e, t = 500, o = 0) => {
      if (!e.classList.contains("_slide")) {
        e.classList.add("_slide"),
          (e.hidden = !e.hidden && null),
          o && e.style.removeProperty("height");
        let r = e.offsetHeight;
        (e.style.overflow = "hidden"),
          (e.style.height = o ? `${o}px` : "0px"),
          (e.style.paddingTop = 0),
          (e.style.paddingBottom = 0),
          (e.style.marginTop = 0),
          (e.style.marginBottom = 0),
          e.offsetHeight,
          (e.style.transitionProperty = "height, margin, padding"),
          (e.style.transitionDuration = t + "ms"),
          (e.style.height = r + "px"),
          e.style.removeProperty("padding-top"),
          e.style.removeProperty("padding-bottom"),
          e.style.removeProperty("margin-top"),
          e.style.removeProperty("margin-bottom"),
          window.setTimeout(() => {
            e.style.removeProperty("height"),
              e.style.removeProperty("overflow"),
              e.style.removeProperty("transition-duration"),
              e.style.removeProperty("transition-property"),
              e.classList.remove("_slide");
          }, t);
      }
    },
    n = (e, t = 500) => (e.hidden ? r(e, t) : o(e, t)),
    s = !0,
    a = (e = 500) => {
      document.documentElement.classList.contains("lock") ? l(e) : i(e);
    },
    l = (e = 500) => {
      let t = document.querySelector("body");
      if (s) {
        let o = document.querySelectorAll("[data-lp]");
        setTimeout(() => {
          for (let e = 0; e < o.length; e++) {
            o[e].style.paddingRight = "0px";
          }
          (t.style.paddingRight = "0px"),
            document.documentElement.classList.remove("lock");
        }, e),
          (s = !1),
          setTimeout(function () {
            s = !0;
          }, e);
      }
    },
    i = (e = 500) => {
      let t = document.querySelector("body");
      if (s) {
        let o = document.querySelectorAll("[data-lp]");
        for (let e = 0; e < o.length; e++) {
          o[e].style.paddingRight =
            window.innerWidth -
            document.querySelector(".wrapper").offsetWidth +
            "px";
        }
        (t.style.paddingRight =
          window.innerWidth -
          document.querySelector(".wrapper").offsetWidth +
          "px"),
          document.documentElement.classList.add("lock"),
          (s = !1),
          setTimeout(function () {
            s = !0;
          }, e);
      }
    };
  function c(e) {
    setTimeout(() => {
      window.FLS && console.log(e);
    }, 0);
  }
  function d(e, t) {
    const o = Array.from(e).filter(function (e, o, r) {
      if (e.dataset[t]) return e.dataset[t].split(",")[0];
    });
    if (o.length) {
      const e = [];
      o.forEach((o) => {
        const r = {},
          n = o.dataset[t].split(",");
        (r.value = n[0]),
          (r.type = n[1] ? n[1].trim() : "max"),
          (r.item = o),
          e.push(r);
      });
      let r = e.map(function (e) {
        return (
          "(" + e.type + "-width: " + e.value + "px)," + e.value + "," + e.type
        );
      });
      r = (function (e) {
        return e.filter(function (e, t, o) {
          return o.indexOf(e) === t;
        });
      })(r);
      const n = [];
      if (r.length)
        return (
          r.forEach((t) => {
            const o = t.split(","),
              r = o[1],
              s = o[2],
              a = window.matchMedia(o[0]),
              l = e.filter(function (e) {
                if (e.value === r && e.type === s) return !0;
              });
            n.push({ itemsArray: l, matchMedia: a });
          }),
          n
        );
    }
  }
  let m = (e, t = !1, o = 500, r = 0) => {
    const n = document.querySelector(e);
    if (n) {
      let s = "",
        a = 0;
      t &&
        ((s = "header.header"), (a = document.querySelector(s).offsetHeight));
      let i = {
        speedAsDuration: !0,
        speed: o,
        header: s,
        offset: r,
        easing: "easeOutQuad",
      };
      if (
        (document.documentElement.classList.contains("menu-open") &&
          (l(), document.documentElement.classList.remove("menu-open")),
        "undefined" != typeof SmoothScroll)
      )
        new SmoothScroll().animateScroll(n, "", i);
      else {
        let e = n.getBoundingClientRect().top + scrollY;
        window.scrollTo({ top: a ? e - a : e, behavior: "smooth" });
      }
      c(`[gotoBlock]: Юхуу...едем к ${e}`);
    } else c(`[gotoBlock]: Ой ой..Такого блока нет на странице: ${e}`);
  };
  const u = { inputMaskModule: null, selectModule: null };
  let p = {
    getErrors(e) {
      let t = 0,
        o = e.querySelectorAll("*[data-required]");
      return (
        o.length &&
          o.forEach((e) => {
            (null === e.offsetParent && "SELECT" !== e.tagName) ||
              e.disabled ||
              (t += this.validateInput(e));
          }),
        t
      );
    },
    validateInput(e) {
      let t = 0;
      return (
        "email" === e.dataset.required
          ? ((e.value = e.value.replace(" ", "")),
            this.emailTest(e) ? (this.addError(e), t++) : this.removeError(e))
          : ("checkbox" !== e.type || e.checked) && e.value
          ? this.removeError(e)
          : (this.addError(e), t++),
        t
      );
    },
    addError(e) {
      e.classList.add("_form-error"),
        e.parentElement.classList.add("_form-error");
      let t = e.parentElement.querySelector(".form__error");
      t && e.parentElement.removeChild(t),
        e.dataset.error &&
          e.parentElement.insertAdjacentHTML(
            "beforeend",
            `<div class="form__error">${e.dataset.error}</div>`
          );
    },
    removeError(e) {
      e.classList.remove("_form-error"),
        e.parentElement.classList.remove("_form-error"),
        e.parentElement.querySelector(".form__error") &&
          e.parentElement.removeChild(
            e.parentElement.querySelector(".form__error")
          );
    },
    formClean(e) {
      e.reset(),
        setTimeout(() => {
          let t = e.querySelectorAll("input,textarea");
          for (let e = 0; e < t.length; e++) {
            const o = t[e];
            o.parentElement.classList.remove("_form-focus"),
              o.classList.remove("_form-focus"),
              p.removeError(o),
              (o.value = o.dataset.placeholder);
          }
          let o = e.querySelectorAll(".checkbox__input");
          if (o.length > 0)
            for (let e = 0; e < o.length; e++) {
              o[e].checked = !1;
            }
          if (u.selectModule) {
            let t = e.querySelectorAll(".select");
            if (t.length)
              for (let e = 0; e < t.length; e++) {
                const o = t[e].querySelector("select");
                u.selectModule.selectBuild(o);
              }
          }
        }, 0);
    },
    emailTest: (e) =>
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(e.value),
  };
  let h = !1;
  setTimeout(() => {
    if (h) {
      let e = new Event("windowScroll");
      window.addEventListener("scroll", function (t) {
        document.dispatchEvent(e);
      });
    }
  }, 0),
    window.addEventListener("load", function () {
      const e = document.documentElement,
        t = localStorage.getItem("user-theme");
      let o;
      window.matchMedia &&
        (o = window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light");
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .addEventListener("change", (e) => {
          !t && s();
        });
      const r = document.querySelector(".header__theme"),
        n = document.querySelector(".header__reset");
      r &&
        r.addEventListener("click", function (e) {
          n.classList.add("active"), s(!0);
        });
      n &&
        n.addEventListener("click", function (e) {
          n.classList.remove("active"), localStorage.setItem("user-theme", "");
        });
      function s(t = !1) {
        let o,
          r = e.classList.contains("light") ? "light" : "dark";
        "light" === r ? (o = "dark") : "dark" === r && (o = "light"),
          e.classList.remove(r),
          e.classList.add(o),
          t && localStorage.setItem("user-theme", o);
      }
      t ? (e.classList.add(t), n.classList.add("active")) : e.classList.add(o);
    });
  const f = document.querySelectorAll("#parallax");
  window.addEventListener("scroll", () => {
    const e = window.pageYOffset;
    f.forEach((t) => {
      const o = parseFloat(t.dataset.speed);
      t.style.transform = `translateY(${e * o}px)`;
    });
  }),
    (window.FLS = !0),
    (function (e) {
      let t = new Image();
      (t.onload = t.onerror =
        function () {
          e(2 == t.height);
        }),
        (t.src =
          "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA");
    })(function (e) {
      let t = !0 === e ? "webp" : "no-webp";
      document.documentElement.classList.add(t);
    }),
    (function () {
      let e = document.querySelector(".icon-menu");
      e &&
        e.addEventListener("click", function (e) {
          s && (a(), document.documentElement.classList.toggle("menu-open"));
        });
    })(),
    (function () {
      const e = document.querySelectorAll("[data-spollers]");
      if (e.length > 0) {
        const t = Array.from(e).filter(function (e, t, o) {
          return !e.dataset.spollers.split(",")[0];
        });
        t.length && s(t);
        let r = d(e, "spollers");
        function s(e, t = !1) {
          e.forEach((e) => {
            (e = t ? e.item : e),
              t.matches || !t
                ? (e.classList.add("_spoller-init"),
                  a(e),
                  e.addEventListener("click", l))
                : (e.classList.remove("_spoller-init"),
                  a(e, !1),
                  e.removeEventListener("click", l));
          });
        }
        function a(e, t = !0) {
          const o = e.querySelectorAll("[data-spoller]");
          o.length > 0 &&
            o.forEach((e) => {
              t
                ? (e.removeAttribute("tabindex"),
                  e.classList.contains("_spoller-active") ||
                    (e.nextElementSibling.hidden = !0))
                : (e.setAttribute("tabindex", "-1"),
                  (e.nextElementSibling.hidden = !1));
            });
        }
        function l(e) {
          const t = e.target;
          if (t.closest("[data-spoller]")) {
            const o = t.closest("[data-spoller]"),
              r = o.closest("[data-spollers]"),
              s = !!r.hasAttribute("data-one-spoller");
            r.querySelectorAll("._slide").length ||
              (s && !o.classList.contains("_spoller-active") && i(r),
              o.classList.toggle("_spoller-active"),
              n(o.nextElementSibling, 500)),
              e.preventDefault();
          }
        }
        function i(e) {
          const t = e.querySelector("[data-spoller]._spoller-active");
          t &&
            (t.classList.remove("_spoller-active"),
            o(t.nextElementSibling, 500));
        }
        r &&
          r.length &&
          r.forEach((e) => {
            e.matchMedia.addEventListener("change", function () {
              s(e.itemsArray, e.matchMedia);
            }),
              s(e.itemsArray, e.matchMedia);
          });
      }
    })(),
    new t({}),
    (function () {
      const e = document.querySelectorAll(
        "input[placeholder],textarea[placeholder]"
      );
      e.length &&
        e.forEach((e) => {
          e.dataset.placeholder = e.placeholder;
        }),
        document.body.addEventListener("focusin", function (e) {
          const t = e.target;
          ("INPUT" !== t.tagName && "TEXTAREA" !== t.tagName) ||
            (t.dataset.placeholder && (t.placeholder = ""),
            t.classList.add("_form-focus"),
            t.parentElement.classList.add("_form-focus"),
            p.removeError(t));
        }),
        document.body.addEventListener("focusout", function (e) {
          const t = e.target;
          ("INPUT" !== t.tagName && "TEXTAREA" !== t.tagName) ||
            (t.dataset.placeholder && (t.placeholder = t.dataset.placeholder),
            t.classList.remove("_form-focus"),
            t.parentElement.classList.remove("_form-focus"),
            t.hasAttribute("data-validate") && p.validateInput(t));
        });
    })(),
    (function (e) {
      const t = document.forms;
      if (t.length)
        for (const e of t)
          e.addEventListener("submit", function (e) {
            o(e.target, e);
          }),
            e.addEventListener("reset", function (e) {
              const t = e.target;
              p.formClean(t);
            });
      async function o(t, o) {
        if (0 === (e ? p.getErrors(t) : 0)) {
          if (t.hasAttribute("data-ajax")) {
            o.preventDefault();
            const e = t.getAttribute("action")
                ? t.getAttribute("action").trim()
                : "#",
              n = t.getAttribute("method")
                ? t.getAttribute("method").trim()
                : "GET",
              s = new FormData(t);
            t.classList.add("_sending");
            const a = await fetch(e, { method: n, body: s });
            if (a.ok) {
              await a.json();
              t.classList.remove("_sending"), r(t);
            } else alert("Ошибка"), t.classList.remove("_sending");
          } else t.hasAttribute("data-dev") && (o.preventDefault(), r(t));
        } else {
          o.preventDefault();
          const e = t.querySelector("._form-error");
          e && t.hasAttribute("data-goto-error") && m(e, !0, 1e3);
        }
      }
      function r(e) {
        document.dispatchEvent(
          new CustomEvent("formSent", { detail: { form: e } })
        ),
          p.formClean(e),
          c(`[Формы]: ${"Форма отправлена!"}`);
      }
    })(!0),
    (function () {
      h = !0;
      const e = document.querySelector("header.header"),
        t = e.hasAttribute("data-scroll-show"),
        o = e.dataset.scrollShow ? e.dataset.scrollShow : 500,
        r = e.dataset.scroll ? e.dataset.scroll : 1;
      let n,
        s = 0;
      document.addEventListener("windowScroll", function (a) {
        const l = window.scrollY;
        clearTimeout(n),
          l >= r
            ? (!e.classList.contains("_header-scroll") &&
                e.classList.add("_header-scroll"),
              t &&
                (l > s
                  ? e.classList.contains("_header-show") &&
                    e.classList.remove("_header-show")
                  : !e.classList.contains("_header-show") &&
                    e.classList.add("_header-show"),
                (n = setTimeout(() => {
                  !e.classList.contains("_header-show") &&
                    e.classList.add("_header-show");
                }, o))))
            : (e.classList.contains("_header-scroll") &&
                e.classList.remove("_header-scroll"),
              t &&
                e.classList.contains("_header-show") &&
                e.classList.remove("_header-show")),
          (s = l <= 0 ? 0 : l);
      });
    })();
})();
