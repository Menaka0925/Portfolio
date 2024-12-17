$(window).on("load", function () {
  "use strict";
  /*=========================================================================
        Preloader
    =========================================================================*/
  $("#preloader").delay(350).fadeOut("slow");

  /*=========================================================================
        Custom Scrollbar
    =========================================================================*/
  $(".header-inner").mCustomScrollbar();

  /*=========================================================================
     Isotope
     =========================================================================*/
  $(".portfolio-filter").on("click", "li", function () {
    var filterValue = $(this).attr("data-filter");
    $container.isotope({ filter: filterValue });
  });

  // change is-checked class on buttons
  $(".portfolio-filter").each(function (i, buttonGroup) {
    var $buttonGroup = $(buttonGroup);
    $buttonGroup.on("click", "li", function () {
      $buttonGroup.find(".current").removeClass("current");
      $(this).addClass("current");
    });
  });

  var $container = $(".portfolio-wrapper");
  $container.imagesLoaded(function () {
    $(".portfolio-wrapper").isotope({
      // options
      itemSelector: '[class*="col-"]',
      percentPosition: true,
      masonry: {
        // use element for option
        columnWidth: '[class*="col-"]',
      },
    });
  });

  /*=========================================================================
     Infinite Scroll
     =========================================================================*/
  var curPage = 1;
  var pagesNum = $(".portfolio-pagination").find("li a:last").text(); // Number of pages

  $container.infinitescroll(
    {
      itemSelector: ".grid-item",
      nextSelector: ".portfolio-pagination li a",
      navSelector: ".portfolio-pagination",
      extraScrollPx: 0,
      bufferPx: 0,
      maxPage: 6,
      loading: {
        finishedMsg: "No more works",
        msgText: "",
        speed: "slow",
        selector: ".load-more",
      },
    },
    // trigger Masonry as a callback
    function (newElements) {
      var $newElems = $(newElements);
      $newElems.imagesLoaded(function () {
        $newElems.animate({ opacity: 1 });
        $container.isotope("appended", $newElems);
      });

      // Check last page
      curPage++;
      if (curPage == pagesNum) {
        $(".load-more").remove();
      }
    }
  );

  $container.infinitescroll("unbind");

  $(".load-more .btn").on("click", function () {
    $container.infinitescroll("retrieve");
    // display loading icon
    $(".load-more .btn i").css("display", "inline-block");
    $(".load-more .btn i").addClass("fa-spin");

    $(document).ajaxStop(function () {
      setTimeout(function () {
        // hide loading icon
        $(".load-more .btn i").hide();
      }, 1000);
    });
    return false;
  });

  /* ======= Mobile Filter ======= */

  // bind filter on select change
  $(".portfolio-filter-mobile").on("change", function () {
    // get filter value from option value
    var filterValue = this.value;
    // use filterFn if matches value
    filterValue = filterFns[filterValue] || filterValue;
    $container.isotope({ filter: filterValue });
  });

  var filterFns = {
    // show if number is greater than 50
    numberGreaterThan50: function () {
      var number = $(this).find(".number").text();
      return parseInt(number, 10) > 50;
    },
    // show if name ends with -ium
    ium: function () {
      var name = $(this).find(".name").text();
      return name.match(/ium$/);
    },
  };
});

/*=========================================================================
            Carousels
=========================================================================*/
$(document).on("ready", function () {
  "use strict";

  $(".testimonials-wrapper").slick({
    dots: true,
    arrows: false,
    slidesToShow: 2,
    slidesToScroll: 2,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
          arrows: false,
        },
      },
    ],
  });

  $(".clients-wrapper").slick({
    dots: false,
    arrows: false,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          dots: false,
          arrows: false,
        },
      },
      {
        breakpoint: 425,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
          arrows: false,
        },
      },
    ],
  });
});

$(function () {
  "use strict";

  $(".menu-icon").on("click", function () {
    $("header.left").toggleClass("open");
    $(".mobile-header, main.content").toggleClass("push");
  });

  $("main.content, header.left button.close").on("click", function () {
    $("header.left").removeClass("open");
    $(".mobile-header, main.content").removeClass("push");
  });

  /*=========================================================================
     Counterup JS for facts
     =========================================================================*/
  $(".count").counterUp({
    delay: 10,
    time: 2000,
  });

  /*=========================================================================
     Progress bar animation with Waypoint JS
     =========================================================================*/
  if ($(".skill-item").length > 0) {
    var waypoint = new Waypoint({
      element: document.getElementsByClassName("skill-item"),
      handler: function (direction) {
        $(".progress-bar").each(function () {
          var bar_value = $(this).attr("aria-valuenow") + "%";
          $(this).animate({ width: bar_value }, { easing: "linear" });
        });

        this.destroy();
      },
      offset: "50%",
    });
  }

  /*=========================================================================
     One Page Scroll with jQuery
     =========================================================================*/
  $('.vertical-menu li a[href^="#"]:not([href="#"])').on(
    "click",
    function (event) {
      var $anchor = $(this);
      $("html, body")
        .stop()
        .animate(
          {
            scrollTop: $($anchor.attr("href")).offset().top - 50,
          },
          800,
          "easeInOutQuad"
        );
      event.preventDefault();
    }
  );

  /*=========================================================================
     Add (nav-link) class to main menu.
     =========================================================================*/
  $(".vertical-menu li a").addClass("nav-link");

  /*=========================================================================
     Bootstrap Scrollspy
     =========================================================================*/
  $("body").scrollspy({ target: ".scrollspy", offset: 50 });

  /*=========================================================================
     Background Image with Data Attribute
     =========================================================================*/
  var bg_img = document.getElementsByClassName("background");

  for (var i = 0; i < bg_img.length; i++) {
    var src = bg_img[i].getAttribute("data-image-src");
    bg_img[i].style.backgroundImage = "url('" + src + "')";
  }

  /*=========================================================================
     Spacer with Data Attribute
     =========================================================================*/
  var list = document.getElementsByClassName("spacer");

  for (var i = 0; i < list.length; i++) {
    var size = list[i].getAttribute("data-height");
    list[i].style.height = "" + size + "px";
  }

  /*=========================================================================
            Scroll to Top
    =========================================================================*/
  $(window).scroll(function () {
    if ($(this).scrollTop() >= 250) {
      // If page is scrolled more than 50px
      $("#return-to-top").fadeIn(200); // Fade in the arrow
    } else {
      $("#return-to-top").fadeOut(200); // Else fade out the arrow
    }
  });
  $("#return-to-top").on("click", function () {
    // When arrow is clicked
    $("body,html").animate(
      {
        scrollTop: 0, // Scroll to top of body
      },
      400
    );
  });
});

/*===============================================================================
               Certification js
  =========================================================================*/

      const imagesData = [
			{src: "images/certify/Guvi.png", alt: "Guvi Certificate"},
			{src: "images/certify/mern.png", alt: "MERN Certification"},
			{src: "images/certify/react certify.png", alt: "React Certification"},
			{src: "images/certify/Oracle certify.jpg", alt: "Oracle Certification"},
			{src: "images/certify/Ai certify.png", alt: "AI Certification"},
     			{src: "images/certify/javascript.png", alt: " Web Certificate"},
			{src: "images/certify/rweb.png", alt: "Js Certificate"},
		];
		
			const itemsPerPage = 3;
			let currentPage = 1;
		
			function generatePortfolioItems(start, end) {
				const portfolioWrapper = document.getElementById("portfolio-wrapper");
				portfolioWrapper.innerHTML = "";
		
				for (let i = start; i < end && i < imagesData.length; i++) {
					const image = imagesData[i];
					const html = `
						<div class="grid-item" style="cursor: pointer; width: calc(33.33% - 20px); margin: 10px; display: inline-block; height: auto;">
							<div class="port-item" style="border: 2px solid white; border-radius: 8px; overflow: hidden; position: relative; height: auto;">
								<div class="certify" style="overflow: hidden; position: relative; height: auto;">
									<img src="${image.src}" alt="${image.alt}" 
										 style="transition: transform 0.3s ease; width: 100%; height: auto; object-fit: contain; max-height: 300px;">
									<div class="masks" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; 
										  background-color: rgba(0, 0, 0, 0.5); opacity: 0; transition: opacity 0.3s;">
										<span style="color: white; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
											font-size: 1.5em; text-align: center;">View Certificate</span>
									</div>
								</div>
							</div>
						</div>
					`;
					portfolioWrapper.innerHTML += html;
				}
			}
		
			function changePage(direction) {
				const totalPages = Math.ceil(imagesData.length / itemsPerPage);
		
				if (direction === 'next') {
					if (currentPage < totalPages) {
						currentPage++;
					}
				} else if (direction === 'prev') {
					if (currentPage > 1) {
						currentPage--;
					}
				}
		
				const start = (currentPage - 1) * itemsPerPage;
				const end = start + itemsPerPage;
		
				generatePortfolioItems(start, end);
				
				// update button states
				document.getElementById("prev-btn").disabled = currentPage === 1;
				document.getElementById("next-btn").disabled = currentPage === totalPages;
			}
		
			// initialize
			generatePortfolioItems(0, itemsPerPage);
			document.getElementById("prev-btn").disabled = true; // Disable "Prev" on the first page
