$(document).ready(function() {
  let e = new Lenis;
  function a(t) {
      e.raf(t),
      requestAnimationFrame(a)
  }
  e.on("scroll", e => {}
  ),
  requestAnimationFrame(a),
  $("#arrow").click(function() {
      gsap.to(window, {
          duration: 1,
          ease: Power2.easeInOut,
          scrollTo: {
              y: 0,
              x: 0
          }
      })
  });
  var t, o, n = bodymovin.loadAnimation({
      container: document.getElementById("arrow"),
      renderer: "svg",
      loop: !1,
      autoplay: !1,
      path: "img/svg/arrow.json"
  });
  $(".main-nav li a").click(function() {
      if ($(this).is(".actif")) {
          if (!$(this).is("#4"))
              return !1
      } else
          $(".main-nav li a").removeClass("actif"),
          $(this).addClass("actif"),
          gsap.to(window, {
              duration: 1,
              ease: Power2.easeInOut,
              scrollTo: {
                  y: 0,
                  x: 0
              }
          });
      window.innerWidth < 1024 && $("header .menu").trigger("click")
  });
  var i = document.documentElement
    , r = window
    , l = r.scrollY || i.scrollTop
    , s = 0
    , c = 0
    , p = $("header")
    , d = function() {
      (o = r.scrollY || i.scrollTop) > l ? s = 2 : o < l && (s = 1),
      s !== c && h(s, o),
      l = o
  }
    , h = function(e, a) {
      2 === e && a > 52 ? (window.innerWidth > 1023 && (gsap.to(p, {
          autoAlpha: 0,
          duration: 1,
          y: "-100%",
          ease: Power2.easeInOut,
          force3D: !0
      }),
      $("#scroll").length > 0 && gsap.to($("#scroll"), {
          autoAlpha: 0,
          duration: 1,
          ease: Power2.easeInOut,
          force3D: !0
      }),
      $("#arrow").length > 0 && gsap.to($("#arrow"), {
          autoAlpha: 1,
          duration: 1,
          display: "block",
          ease: Power2.easeInOut,
          force3D: !0
      }),
      $(".text-head").length > 0 && gsap.to(".text-head", 1, {
          x: 50,
          opacity: 0,
          ease: Power2.easeInOut,
          force3D: !0
      }),
      n.setDirection(1),
      n.play()),
      c = e) : 1 === e && (window.innerWidth > 1023 && (gsap.to(p, {
          autoAlpha: 1,
          duration: 1,
          y: "0",
          ease: Power2.easeInOut,
          force3D: !0
      }),
      $("#scroll").length > 0 && gsap.to($("#scroll"), {
          autoAlpha: 1,
          duration: 2,
          ease: Power2.easeInOut,
          force3D: !0
      }),
      $(".text-head").length > 0 && gsap.to(".text-head", 1, {
          x: 0,
          opacity: 1,
          ease: Power2.easeInOut,
          force3D: !0
      }),
      n.setDirection(-1),
      n.play()),
      c = e)
  };
  function m() {
      $(".contact-link").length > 0 ? ($(".main-nav a").removeClass("actif"),
      $(".main-nav a#5").addClass("actif")) : $(".page-int .project-bloc").length > 0 ? ($(".main-nav a").removeClass("actif"),
      $(".main-nav a#4").addClass("actif")) : $(".page-int .services").length > 0 ? ($(".main-nav a").removeClass("actif"),
      $(".main-nav a#2").addClass("actif")) : $(".homepage").length > 0 ? ($(".main-nav a").removeClass("actif"),
      $(".main-nav a#1").addClass("actif")) : $(".page-int .parcours").length > 0 && ($(".main-nav a").removeClass("actif"),
      $(".main-nav a#3").addClass("actif"));
      var e = bodymovin.loadAnimation({
          container: document.getElementById("scroll"),
          renderer: "svg",
          loop: !0,
          autoplay: !1,
          path: "img/svg/scroll.json"
      });
      if ($(".lazyload").length > 0 && $(".lazyload").each(function(e, a) {
          let t = new Image;
          t.onload = function() {
              var e, t = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${this.width / 6} ${this.height / 6}'%3E%3C/svg%3E`;
              $(a).attr("src", t)
          }
          ,
          t.src = $(this).attr("data-src")
      }),
      gsap.to(".header-content h1,.header-content p", 1.8, {
          y: 0,
          skewX: 0,
          rotate: 0,
          scale: 1,
          delay: .4,
          stagger: {
              amount: .6
          },
          opacity: 1,
          force3D: !0,
          ease: "power4.out"
      }),
      setTimeout(function() {
          $(".animation-bloc h2,.animation-bloc h3,.animation-bloc .bouton,.animation-bloc ul, .animation-bloc p").waypoint(function(e) {
              gsap.to(this.element, 1.8, {
                  y: 0,
                  skewY: 0,
                  skewX: 0,
                  rotate: 0,
                  scale: 1,
                  delay: .2,
                  opacity: 1,
                  force3D: !0,
                  ease: "power4.out"
              })
          }, {
              offset: "bottom-in-view"
          }),
          e.play()
      }, 1500),
      $(".project").length > 0 && (window.innerWidth < 1023 && $(".img-bloc img").each(function(e, a) {
          let t = new Image;
          t.onload = function() {
              var e, t = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${this.width / 6} ${this.height / 6}'%3E%3C/svg%3E`;
              $(a).attr("src", t)
          }
          ,
          t.src = $(this).attr("data-src")
      }),
      window.innerWidth < 1023 ? $(".project .project-bloc li").waypoint(function(e) {
          gsap.to(this.element, 1.8, {
              y: 0,
              skewY: 0,
              skewX: 0,
              rotate: 0,
              scale: 1,
              opacity: 1,
              force3D: !0,
              ease: "power4.out"
          }),
          $(this.element).find(".img-bloc img").lazy({
              visibleOnly: !0,
              enableThrottle: !0,
              throttle: 250,
              threshold: 200,
              scrollDirection: "vertical",
              afterLoad: function(e) {
                  gsap.from(e, {
                      opacity: 0,
                      y: 40,
                      duration: .6
                  })
              }
          })
      }, {
          offset: "bottom-in-view"
      }) : $(".project .project-bloc li").waypoint(function(e) {
          gsap.to(this.element, 1.8, {
              y: 0,
              skewY: 0,
              skewX: 0,
              rotate: 0,
              scale: 1,
              delay: .2,
              opacity: 1,
              force3D: !0,
              ease: "power4.out"
          })
      }, {
          offset: "bottom-in-view"
      })),
      $(".homepage").length > 0 && $(".bloc-service .bloc-service-icn").waypoint(function() {
          var e = $(this.element).find(".round");
          new TimelineLite().staggerTo(e, 1, {
              x: 0,
              delay: .5,
              opacity: 1,
              force3D: !0,
              ease: "power4.out"
          }, .2)
      }, {
          offset: "bottom-in-view"
      }),
      $(".project-bloc").length > 0 && $(".project .project-bloc nav a.link-project").hover(function() {
          if (window.innerWidth > 1023) {
              gsap.to($(".img-bloc img"), 1, {
                  y: "102%",
                  force3D: !0,
                  ease: Power2.easeInOut
              });
              var e = $(this).find("h5");
              gsap.to($(".project .project-bloc nav a"), 1, {
                  autoAlpha: .02,
                  ease: Power2.easeInOut
              }),
              gsap.to($(this), 1, {
                  paddingTop: "100px",
                  paddingBottom: "100px",
                  autoAlpha: 1,
                  ease: Power2.easeInOut,
                  force3D: !0
              }),
              gsap.set(e, {
                  height: 0,
                  ease: "power2.inOut"
              }),
              gsap.to(e, {
                  duration: 1,
                  ease: "power2.inOut",
                  height: "auto"
              }),
              $(this).addClass("actif");
              var a = $(this).parent().find(".img-bloc img");
              a.lazy(),
              gsap.to(a, 1, {
                  y: "0",
                  force3D: !0,
                  ease: Power2.easeInOut
              })
          }
      }, function() {
          if (window.innerWidth > 1023) {
              var e = $(this).find("h5");
              gsap.to($(this), 1, {
                  paddingTop: "70px",
                  paddingBottom: "70px",
                  ease: Power2.easeInOut,
                  force3D: !0
              }),
              gsap.to($(".project .project-bloc nav a"), 1, {
                  autoAlpha: 1,
                  ease: Power2.easeInOut
              }),
              gsap.set(e, {
                  height: "auto",
                  ease: "power2.inOut"
              }),
              gsap.to(e, {
                  duration: 1,
                  ease: "power2.inOut",
                  height: 0
              }),
              $(this).removeClass("actif");
              var a = $(this).parent().find(".img-bloc img");
              gsap.to(a, 1, {
                  y: "102%",
                  force3D: !0,
                  ease: Power2.easeInOut
              })
          }
      }),
      $(".projetdetail").length > 0) {
          if ($(".main-nav li a").removeClass("actif"),
          $(".main-nav li a#4").addClass("actif"),
          Modernizr.touchevents)
              var a = 0;
          else
              var a = 1;
          gsap.to(window, {
              duration: a,
              ease: Power2.easeInOut,
              scrollTo: {
                  y: 0,
                  x: 0,
                  onComplete: function() {
                      setTimeout(function() {
                          $(".lazyload").length > 0 && $(".lazyload").lazy({
                              visibleOnly: !0,
                              enableThrottle: !0,
                              throttle: 250,
                              threshold: -250,
                              scrollDirection: "vertical",
                              afterLoad: function(e) {
                                  Modernizr.touchevents ? gsap.from(e, {
                                      opacity: 0,
                                      duration: 1
                                  }) : gsap.from(e, {
                                      opacity: 0,
                                      y: 40,
                                      duration: 1
                                  })
                              }
                          }),
                          $(".projetdetail").find(".project-detail-back").addClass("actif")
                      }, 1e3),
                      $(window).scroll(function() {
                          if ($(".parallax").length > 0 && !Modernizr.touchevents && window.innerWidth > 1023) {
                              var e = $(window).scrollTop();
                              gsap.to($(".parallax"), .4, {
                                  y: -e / 3 + "px",
                                  force3D: !0
                              })
                          }
                      })
                  }
              }
          })
      }
      if ($(".contact-link a").hover(function() {
          window.innerWidth > 1023 && gsap.to($(this), .4, {
              paddingLeft: 20,
              ease: Power2.easeInOut,
              force3D: !0
          })
      }, function() {
          window.innerWidth > 1023 && gsap.to($(this), .4, {
              paddingLeft: 0,
              ease: Power2.easeInOut,
              force3D: !0
          })
      }),
      $("#animationdigital").length > 0) {
          $("#GeneralWrapper").is(".white") && $(".services .animation-bloc .bouton a img").attr("src", "img/playvideo-b.svg"),
          new Waypoint({
              element: document.getElementById("digital"),
              enabled: !0,
              handler: function(e) {
                  "down" === e && n.play()
              },
              offset: "35%"
          });
          var t = $(".services .digital-right #animationdigital").attr("data-id");
          if ($("#GeneralWrapper").is(".white"))
              var o = "-b";
          else
              var o = "";
          var n = bodymovin.loadAnimation({
              container: document.getElementById("animationdigital"),
              renderer: "svg",
              loop: !1,
              autoplay: !1,
              path: "" + t + o + ".json"
          });
          n.addEventListener("complete", function e() {
              n.playSegments([54, 744], !0)
          })
      }
      if ($("#animationimprime").length > 0) {
          new Waypoint({
              element: document.getElementById("imprime"),
              enabled: !0,
              handler: function(e) {
                  "down" === e && l.play()
              },
              offset: "35%"
          });
          var i = $(".services .digital-right #animationimprime").attr("data-id");
          if ($("#GeneralWrapper").is(".white"))
              var r = "-b";
          else
              var r = "";
          var l = bodymovin.loadAnimation({
              container: document.getElementById("animationimprime"),
              renderer: "svg",
              loop: !1,
              autoplay: !1,
              path: "" + i + r + ".json"
          });
          l.addEventListener("complete", function e() {
              l.playSegments([54, 597], !0)
          })
      }
  }
  function u() {
      splatStack.push(800),
      gsap.to($("#loader"), {
          duration: 1,
          rotation: 0,
          ease: Power2.easeInOut,
          force3D: !0
      }),
      gsap.to($("header, main"), {
          filter: "blur(0px)"
      }),
      $("#GeneralWrapper").is(".white") ? ($("#GeneralWrapper, body").removeClass("white"),
      $(".logo img").attr("src", "img/logo.svg"),
      $(".services").length > 0 && $(".services .animation-bloc .bouton a img").attr("src", "img/playvideo.svg"),
      $(".homepage").length > 0 && $(".toggleversion-bloc").addClass("actif")) : ($("#GeneralWrapper, body").addClass("white"),
      $(".logo img").attr("src", "img/logo_b.svg"),
      $(".services").length > 0 && $("#GeneralWrapper").is(".white") && $(".services .animation-bloc .bouton a img").attr("src", "img/playvideo-b.svg"),
      $(".homepage").length > 0 && $(".toggleversion-bloc").removeClass("actif")),
      $(this).toggleClass("actif")
  }
  $(window).on("scroll", function() {
      t || (t = setTimeout(function() {
          d(),
          t = null,
          500 > $(window).scrollTop() ? gsap.to($("#anim canvas"), {
              autoAlpha: 1,
              duration: 1
          }) : gsap.to($("#anim canvas"), {
              autoAlpha: .1,
              duration: 1
          })
      }, 200))
  }),
  $("header .menu").on("click", function() {
      $(this).toggleClass("is-active"),
      $("#GeneralWrapper").removeAttr("style"),
      $(this).is(".is-active") ? ($("html, body").css({
          overflowY: "hidden",
          height: "100%"
      }),
      gsap.to($(".main-nav"), {
          autoAlpha: 1,
          duration: .5
      })) : ($("html, body").css({
          overflowY: "overlay",
          height: "auto"
      }),
      gsap.to($(".main-nav"), {
          autoAlpha: 0,
          delay: .4,
          duration: .5
      }))
  }),
  $(".logo").on("click", function() {
      if (!$(".homepage").length > 0 && (splatStack.push(200),
      window.innerWidth < 1023 && ($("header .menu.is-active").length > 0 && (gsap.to($(".main-nav"), {
          autoAlpha: 0,
          delay: .5,
          duration: .5
      }),
      $("header .menu").trigger("click")),
      $("header .menu").removeClass("is-active"),
      $("html, body").css({
          overflowY: "overlay",
          height: "auto"
      }))),
      $(".main-nav a").removeClass("actif"),
      $(".main-nav a#1").addClass("actif"),
      $(".homepage").length > 0)
          return gsap.to(window, {
              duration: 1,
              ease: Power2.easeInOut,
              scrollTo: {
                  y: 0,
                  x: 0
              }
          }),
          !1;
      gsap.to(window, {
          duration: 1,
          ease: Power2.easeInOut,
          scrollTo: {
              y: 0,
              x: 0
          }
      })
  }),
  m(),
  Modernizr.touchevents ? $("#GeneralWrapper, body").addClass("touch") : ($("#GeneralWrapper, body").addClass("nn-touch"),
  gsap.to(".head .main-nav", 1.8, {
      opacity: 1
  }),
  gsap.from(".main-nav li", 1.8, {
      y: -50,
      delay: .5,
      stagger: {
          amount: .6
      },
      opacity: 0,
      force3D: !0,
      ease: "power4.out"
  }),
  $(".text-head").length > 0 && gsap.from(".text-head", 1.8, {
      x: 50,
      delay: 1.5,
      opacity: 0,
      force3D: !0,
      ease: "power4.out"
  }),
  gsap.to(".head .logo", 1.8, {
      opacity: 1,
      delay: .5
  })),
  barba.init({
      preventRunning: !0,
      sync: !1,
      transitions: [{
          async leave(e) {
              let a = this.async();
              var t = 500;
              gsap.to($(".animate"), .6, {
                  ease: Power3.easeInOut,
                  opacity: 0
              }),
              Modernizr.touchevents || window.innerWidth,
              await (t = t || 0,
              new Promise(e => {
                  setTimeout( () => {
                      e()
                  }
                  , t)
              }
              )),
              a()
          },
          async enter(e) {
              Modernizr.touchevents ? gsap.to($(".animate"), 1, {
                  opacity: 1
              }) : gsap.to($(".animate"), 1, {
                  ease: Power3.easeInOut,
                  opacity: 1
              }),
              $(".toggleversion-bloc").on("click", u)
          },
          beforeEnter() {
              $("#GeneralWrapper").removeClass("page-int"),
              $("#GeneralWrapper").addClass("homepage")
          },
          once() {
              gsap.to($(".animate"), 2, {
                  ease: Power3.easeInOut,
                  opacity: 1
              })
          }
      }]
  }),
  barba.hooks.after(e => {
      "homepage" == e.next.namespace ? ($("#GeneralWrapper").removeClass("page-int"),
      $("#GeneralWrapper").addClass("homepage"),
      $("#GeneralWrapper").is(".white") ? ($(".text-head p b").text("Black"),
      $(".toggleversion-bloc").addClass("actif")) : ($(".text-head p b").text("White"),
      $(".toggleversion-bloc").removeClass("actif"))) : ($("#GeneralWrapper").removeClass("homepage"),
      $("#GeneralWrapper").addClass("page-int")),
      setTimeout(function() {
          Waypoint.refreshAll()
      }, 250),
      m()
  }
  ),
  $(".toggleversion-bloc").on("click", u),
  history.scrollRestoration = "manual";
  let g = 0;
  barba.hooks.after(e => {
      g = barba.history.current.scroll.y
  }
  ),
  barba.hooks.beforeEnter(e => {
      "listprojet" == e.next.namespace && "detailprojet" == e.current.namespace && (Modernizr.touchevents ? gsap.to(window, {
          duration: 0,
          ease: Power2.easeInOut,
          scrollTo: {
              y: g
          },
          onComplete: function() {
              setTimeout(function() {
                  $(".img-bloc img").lazy()
              }, 1e3)
          }
      }) : ($(".project-bloc li a.link-project").css("pointer-events", "none"),
      gsap.to(window, {
          duration: 0,
          ease: Power2.easeInOut,
          scrollTo: {
              y: g
          },
          onComplete: function() {
              $(".project-bloc li a.link-project").css("pointer-events", "auto"),
              setTimeout(function() {
                  $(".img-bloc img").lazy()
              }, 1e3)
          }
      }))),
      "mentions" == e.next.namespace && $(".head .main-nav li a").removeClass("actif")
  }
  ),
  barba.hooks.before(e => {
      "detailprojet" == e.current.namespace || "listprojet" == e.current.namespace || (Modernizr.touchevents,
      gsap.to(window, {
          duration: 1,
          ease: Power2.easeInOut,
          scrollTo: {
              y: 0
          }
      }))
  }
  )
});
