window.onload = function () {
    PAGE.addListeners();
    document.querySelector("#result-code").contentWindow.eval(
        `
            console.oldLog = console.log;
            let text = "";
            console.log = function(uText) {
                text = text + '<div class="console-line">' + uText + '</div>';
                window.parent.document.querySelector(".console-box").innerHTML = text;
            };
            console.clear = function() {
                text = "";
            };
            
        `);
};

let PAGE = {
    htmlButton: document.getElementById("html"),
    cssButton: document.getElementById("css"),
    jsButton: document.getElementById("js"),
    htmlMButton: document.getElementById("html-m"),
    cssMButton: document.getElementById("css-m"),
    jsMButton: document.getElementById("js-m"),
    burgerButton: document.getElementById("burger"),
    sideMenu: document.getElementById("side-menu"),
    playButton: document.getElementById("play-button"),
    textArea: document.getElementsByTagName("textarea")[0],
    leftArrow: document.getElementById("left-arrow"),
    rightArrow: document.getElementById("right-arrow"),
    exampleNumber: document.getElementById("example-number"),
    exampleHeading: document.getElementById("example-heading"),
    exampleDescriptionTwo: document.getElementById("example-description-two"),
    exampleDescriptionThree: document.getElementById("example-description-three"),
    exampleDescription: document.getElementById("example-description"),
    exampleCode: document.getElementsByClassName("code-example")[0],
    htmlFile: document.getElementById("html-file"),
    cssFile: document.getElementById("css-file"),
    jsFile: document.getElementById("js-file"),
    iFrame: document.getElementById("result-code").contentDocument,
    console: document.querySelector(".console-span"),
    consoleBox: document.querySelector(".console-box"),
    trash: document.querySelector(".i-box"),
    htmlCode: "",
    cssCode: "",
    jsCode: "",
    selectedFile: "HTML",
    currentPage: "HTML",
    isConsoleOpen: false,
    transitionEnd: true,
    borderTransparent: false,
    addListeners: function () {
        this.htmlButton.addEventListener("click", this.changeLanguage);
        this.cssButton.addEventListener("click", this.changeLanguage);
        this.jsButton.addEventListener("click", this.changeLanguage);
        this.burgerButton.addEventListener("click", this.menuInteraction);
        this.htmlMButton.addEventListener("click", this.changeLanguage);
        this.cssMButton.addEventListener("click", this.changeLanguage);
        this.jsMButton.addEventListener("click", this.changeLanguage);
        window.addEventListener("scroll", this.appearWhenScrolling);
        this.playButton.addEventListener("click", this.runCode);
        this.textArea.addEventListener("focus", this.makeTab);
        this.leftArrow.addEventListener("click", this.previousExample);
        this.rightArrow.addEventListener("click", this.nextExample);
        this.htmlFile.addEventListener("click", this.changeCode);
        this.cssFile.addEventListener("click", this.changeCode);
        this.jsFile.addEventListener("click", this.changeCode);
        this.textArea.addEventListener("keydown", this.showNotRun);
        this.console.addEventListener("click", this.showCloseConsole);
        this.trash.addEventListener("click", function () {
            PAGE.consoleBox.innerHTML = "";
            document.getElementById("result-code").contentWindow.console.clear();
        });
    },
    changeLanguage: function (e) {
        if (PAGE.transitionEnd) {
            PAGE.transitionEnd = false;
            let title = document.querySelector(".title-item");
            title.style.color = "#fff";
            PAGE.htmlButton.style.color = "#fff";
            PAGE.cssButton.style.color = "#fff";

            let nav = document.querySelector("nav");
            let background = document.querySelector("#lang-background");
            let langIcon = document.querySelector(".language-icon-opacity");

            let descHeading = document.querySelector(".language-desc h2");
            let langDescription = document.querySelector(".language-desc p");

            let borderOrange = document.querySelector(".border-orange");
            let borderBlue = document.querySelector(".border-blue");
            let borderYellow = document.querySelector(".border-yellow");

            let orangeButton = document.querySelector(".read-more-button-orange");
            let blueButton = document.querySelector(".read-more-button-blue");
            let yellowButton = document.querySelector(".read-more-button-yellow");

            let burgerLay = document.querySelector(".burger-lay");
            let burgerLayBefore = document.querySelector(".burger-lay-before");
            let burgerLayAfter = document.querySelector(".burger-lay-after");

            let appears = document.querySelectorAll(".appear");

            burgerLay.style.backgroundColor = "#fff";
            burgerLayBefore.style.backgroundColor = "#fff";
            burgerLayAfter.style.backgroundColor = "#fff";
            if (!PAGE.borderTransparent)
                PAGE.burgerButton.style.borderColor = "#fff";

            let logoMobile = document.querySelector(".language-icon-mobile img");

            let iconsBackground = document.getElementById("html-advantages");

            let advTitle = document.querySelector(".html-adv-title");
            advTitle.setAttribute("class", "html-adv-title appear");
            iconsBackground.style.backgroundColor = "#fff";

            let historyTitle = document.querySelector("#html-history .html-adv-title");
            historyTitle.style.color = "#000";

            let historyBg = document.getElementById("html-history");
            let description = document.querySelectorAll(".description");
            let line = document.querySelectorAll(".line");

            let descriptionsText = document.querySelectorAll(".description span");
            let datesPC = document.querySelectorAll(".date span");
            let datesMobile = document.querySelectorAll(".date-mobile");

            let tryItUrselfTextLight = document.querySelectorAll("#try-it-urself h2 span, .results h2 span");
            let tryItUrselfTextDark = document.querySelectorAll("#example-heading, #example-description, #example-description-two, #example-description-three, .select-example");

            let runButton = document.getElementById("play-button");
            let exampleNumber = PAGE.exampleNumber;

            let footer = document.querySelector("footer");

            let codeImage = document.querySelector(".code-image img");
            let languageImage = document.querySelector(".language-image img");
            languageImage.style.transform = "rotate(35deg)";

            let body = document.getElementById("body");
            let toTopButton = document.querySelector(".fa-chevron-up");
            let toTopButtonBg = document.querySelector(".to-top");
            toTopButtonBg.style.backgroundColor = "#EFEFEF";

            let instructions = document.querySelector(".instructions");
            instructions.style.opacity = 0;
            switch (e.target.id) {
                case "html":
                case "html-m": {
                    nav.style.backgroundColor = "#e34c26";
                    PAGE.cssButton.classList.remove("selected-css");
                    PAGE.jsButton.classList.remove("selected-js");
                    PAGE.htmlButton.classList.add("selected-html");

                    background.style.backgroundImage = "url(img/html-bg.jpg)";
                    langIcon.style.backgroundImage = "url('img/html-logo.png')";

                    if (PAGE.currentPage != "HTML") {
                        descHeading.style.opacity = 0;
                        langDescription.style.opacity = 0;
                        logoMobile.style.opacity = 0;
                        setTimeout(function () {
                            descHeading.innerHTML = "HTML";
                            langDescription.innerHTML = "The HyperText Markup Language, or HTML is the standard markup language for documents designed to be displayed in a web browser. It can be assisted by technologies such as Cascading Style Sheets (CSS) and scripting languages such as JavaScript.";
                            descHeading.style.opacity = 1;
                            langDescription.style.opacity = 1;
                            logoMobile.src = "img/html-logo.png";
                            logoMobile.style.opacity = 1;
                        }, 250);
                    }

                    switch (PAGE.currentPage) {
                        case "CSS": {
                            borderBlue.style.zIndex = 1;
                            borderYellow.style.zIndex = -1;
                            blueButton.style.zIndex = 1;
                            yellowButton.style.zIndex = -1;
                        } break;
                        case "JS": {
                            borderYellow.style.zIndex = 1;
                            borderBlue.style.zIndex = -1;
                            yellowButton.style.zIndex = 1;
                            blueButton.style.zIndex = -1;
                        } break;
                    }

                    PAGE.currentPage = "HTML";

                    borderOrange.style.zIndex = 2;
                    orangeButton.style.zIndex = 2;

                    setTimeout(function () {
                        borderOrange.style.opacity = 1;
                        orangeButton.style.opacity = 1;
                    }, 0);

                    setTimeout(function () {
                        borderBlue.style.opacity = 0;
                        borderYellow.style.opacity = 0;
                        blueButton.style.opacity = 0;
                        yellowButton.style.opacity = 0;
                    }, 500);

                    let icons = [
                        "fas fa-laptop-code",
                        "fas fa-user-friends",
                        "fas fa-file-code",
                        "fab fa-chrome",
                        "fas fa-feather-alt"
                    ];

                    let iconsText = [
                        "Easy to learn",
                        "For everyone",
                        "Can integrate with other languages easily",
                        "Supported by all browsers",
                        "Lightweight"
                    ];

                    let i = -1;
                    let iconsSwap = document.querySelectorAll('.html-container i[class*="fa-"]');
                    let iconsTextSwap = document.querySelectorAll('.html-container p');
                    iconsSwap.forEach(el => {
                        i++;
                        el.setAttribute("class", icons[i]);
                        el.style.color = "#e34c26";
                    });
                    i = -1;
                    iconsTextSwap.forEach(el => {
                        i++;
                        el.innerHTML = iconsText[i];
                        el.style.color = "#000";
                    });

                    historyBg.style.backgroundColor = "#e34c26";
                    description.forEach(el => {
                        el.setAttribute("class", "description");
                    });

                    line.forEach(el => {
                        el.setAttribute("class", "line");
                    });

                    let descriptions = [
                        "HTML 1.0 was released with the intention of sharing information that can be readable and accessible via web browsers. But not many of the developers were involved in creating websites. So the language was also not growing.",
                        'Then comes the HTML 2.0 which contains all the features of HTML 1.0 along with that few additional features, which remained as the standard markup language for designing and creating websites until January 1997 and refined various core features of HTML.',
                        'Then comes the HTML 3.0, where Dave Raggett who introduced a fresh paper or draft on HTML. It included improved new features of HTML, giving more powerful characteristics for webmasters in designing web pages. But these powerful features of new HTML slowed down the browser in applying improvements.',
                        'Then comes HTML 4.01, which is widely used and was a successful version of HTML before HTML 5.0, which is currently released and used worldwide. HTML 5 can be said for an extended version of HTML 4.01, which was published in the year 2012.'
                    ];

                    i = -1;
                    descriptionsText.forEach(el => {
                        (i <= 2) ? i++ : i = 0;
                        el.innerHTML = descriptions[i];
                    });

                    let dates = [
                        1993,
                        1995,
                        1997,
                        1999
                    ];

                    for(let i = 0; i < 4; i++) {
                        datesPC[i].innerHTML = dates[i];
                        datesMobile[i].innerHTML = dates[i];
                    }

                    tryItUrselfTextLight.forEach(el => {
                        el.style.color = "#f06529";
                    });

                    tryItUrselfTextDark.forEach(el => {
                        el.style.color = "#e34c26";
                    });

                    runButton.style.backgroundColor = "#e34c26";
                    footer.style.backgroundColor = "#e34c26";
                    codeImage.src = "img/html-code.png";
                    languageImage.src = "img/html-logo.png";
                    body.setAttribute("class", "orange");
                    toTopButton.style.color = "#e34c26";
                    
                } break;
                case "css":
                case "css-m": {
                    nav.style.backgroundColor = "#264de4";
                    PAGE.htmlButton.classList.remove("selected-html");
                    PAGE.jsButton.classList.remove("selected-js");
                    PAGE.cssButton.classList.add("selected-css");

                    background.style.backgroundImage = "url(img/css-bg.jpg)";
                    langIcon.style.backgroundImage = "url('img/css-logo.png')";

                    if (PAGE.currentPage != "CSS") {
                        descHeading.style.opacity = 0;
                        langDescription.style.opacity = 0;
                        logoMobile.style.opacity = 0;
                        setTimeout(function () {
                            descHeading.innerHTML = "CSS";
                            langDescription.innerHTML = "Cascading Style Sheets (CSS) is a stylesheet language used to describe the presentation of a document written in HTML. CSS describes how elements should be rendered on screen, on paper, in speech, or on other media.";
                            descHeading.style.opacity = 1;
                            langDescription.style.opacity = 1;
                            logoMobile.src = "img/css-logo.png";
                            logoMobile.style.opacity = 1;
                        }, 250);
                    }


                    switch (PAGE.currentPage) {
                        case "HTML": {
                            borderOrange.style.zIndex = 1;
                            borderYellow.style.zIndex = -1;
                            orangeButton.style.zIndex = 1;
                            yellowButton.style.zIndex = -1;
                        } break;
                        case "JS": {
                            borderYellow.style.zIndex = 1;
                            borderOrange.style.zIndex = -1;
                            orangeButton.style.zIndex = -1;
                            yellowButton.style.zIndex = 1;
                        } break;
                    }

                    PAGE.currentPage = "CSS";

                    borderBlue.style.zIndex = 2;
                    blueButton.style.zIndex = 2;

                    setTimeout(function () {
                        borderBlue.style.opacity = 1;
                        blueButton.style.opacity = 1;
                    }, 0);

                    setTimeout(function () {
                        borderOrange.style.opacity = 0;
                        borderYellow.style.opacity = 0;
                        orangeButton.style.opacity = 0;
                        yellowButton.style.opacity = 0;
                    }, 500);

                    let icons = [
                        "fas fa-laptop-code",
                        "fas fa-user-friends",
                        "fas fa-tablet-alt",
                        "fas fa-tachometer-alt",
                        "fas fa-feather-alt"
                    ];

                    let iconsText = [
                        "Easy to learn",
                        "For everyone",
                        "Device friendly",
                        "Improves site speed",
                        "Lightweight"
                    ];

                    let i = -1;
                    let iconsSwap = document.querySelectorAll('.html-container i[class*="fa-"]');
                    let iconsTextSwap = document.querySelectorAll('.html-container p');
                    iconsSwap.forEach(el => {
                        i++;
                        el.setAttribute("class", icons[i]);
                        el.style.color = "#264de4";
                    });
                    i = -1;
                    iconsTextSwap.forEach(el => {
                        i++;
                        el.innerHTML = iconsText[i];
                        el.style.color = "#000";
                    });

                    historyBg.style.backgroundColor = "#264de4";

                    description.forEach(el => {
                        el.setAttribute("class", "description description-css");
                    });

                    line.forEach(el => {
                        el.setAttribute("class", "line");
                        el.classList.add("line-css");
                    });

                    let descriptions = [
                        "The first CSS specification to become an official W3C Recommendation is CSS level 1, published on December 17, 1996. Håkon Wium Lie and Bert Bos are credited as the original developers.",
                        "A superset of CSS 1, CSS 2 includes a number of new capabilities like absolute, relative, and fixed positioning of elements and z-index, the concept of media types, support for aural style sheets and bidirectional text, and new font properties such as shadows.",
                        'Unlike CSS 2, which is a large single specification defining various features, CSS 3 is divided into several separate documents called "modules". Each module adds new capabilities or extends features defined in CSS 2, preserving backward compatibility.',
                        "There is no single, integrated CSS4 specification,because the specification has been split into many separate modules which level independently. Modules that build on things from CSS Level 2 started at Level 3. Some of them have already reached Level 4 or are already approaching Level 5."
                    ];

                    i = -1;
                    descriptionsText.forEach(el => {
                        (i <= 2) ? i++ : i = 0;
                        el.innerHTML = descriptions[i];
                    });

                    let dates = [
                        1996,
                        1998,
                        1999,
                        "Never"
                    ];

                    for(let i = 0; i < 4; i++) {
                        datesPC[i].innerHTML = dates[i];
                        datesMobile[i].innerHTML = dates[i];
                    }

                    tryItUrselfTextLight.forEach(el => {
                        el.style.color = "#2965f1";
                    });

                    tryItUrselfTextDark.forEach(el => {
                        el.style.color = "#264de4";
                    });

                    runButton.style.backgroundColor = "#264de4";
                    footer.style.backgroundColor = "#264de4";
                    codeImage.src = "img/css-code.png";
                    languageImage.src = "img/css-logo.png";
                    body.setAttribute("class", "blue");
                    toTopButton.style.color = "#264de4";
                } break;
                case "js":
                case "js-m": {
                    nav.style.backgroundColor = "#f7e018";
                    PAGE.htmlButton.classList.remove("selected-html");
                    PAGE.cssButton.classList.remove("selected-css");
                    PAGE.jsButton.classList.add("selected-js");
                    PAGE.htmlButton.style.color = "#000";
                    PAGE.cssButton.style.color = "#000";
                    title.style.color = "#000";

                    background.style.backgroundImage = "url(img/js-bg.jpg)";
                    langIcon.style.backgroundImage = "url('img/js-logo.png')";

                    if (PAGE.currentPage != "JS") {
                        descHeading.style.opacity = 0;
                        langDescription.style.opacity = 0;
                        logoMobile.style.opacity = 0;
                        setTimeout(function () {
                            descHeading.innerHTML = "JavaScript";
                            langDescription.innerHTML = "JavaScript is a text-based programming language used both on the client-side and server-side that allows you to make web pages interactive. Where HTML and CSS are languages that give structure and style to web pages, JavaScript gives web pages interactive elements that engage a user.";
                            descHeading.style.opacity = 1;
                            langDescription.style.opacity = 1;
                            logoMobile.src = "img/js-logo.png";
                            logoMobile.style.opacity = 1;
                        }, 250);
                    }

                    switch (PAGE.currentPage) {
                        case "HTML": {
                            borderOrange.style.zIndex = 1;
                            borderBlue.style.zIndex = -1;
                            blueButton.style.zIndex = -1;
                            orangeButton.style.zIndex = 1;
                        } break;
                        case "CSS": {
                            borderBlue.style.zIndex = 1;
                            borderOrange.style.zIndex = -1;
                            blueButton.style.zIndex = 1;
                            orangeButton.style.zIndex = -1;
                        } break;
                    }

                    PAGE.currentPage = "JS";

                    borderYellow.style.zIndex = 2;
                    yellowButton.style.zIndex = 2;

                    setTimeout(function () {
                        borderYellow.style.opacity = 1;
                        yellowButton.style.opacity = 1;
                    }, 0);

                    setTimeout(function () {
                        borderBlue.style.opacity = 0;
                        borderOrange.style.opacity = 0;
                        orangeButton.style.opacity = 0;
                        blueButton.style.opacity = 0;
                    }, 500);

                    let burgerLay = document.querySelector(".burger-lay");
                    let burgerLayBefore = document.querySelector(".burger-lay-before");
                    let burgerLayAfter = document.querySelector(".burger-lay-after");

                    burgerLay.style.backgroundColor = "#000";
                    burgerLayBefore.style.backgroundColor = "#000";
                    burgerLayAfter.style.backgroundColor = "#000";
                    if (!PAGE.borderTransparent)
                        PAGE.burgerButton.style.borderColor = "#000";


                    let icons = [
                        "fas fa-laptop-code",
                        "fas fa-users",
                        "far fa-handshake",
                        "fas fa-magic",
                        "far fa-lightbulb"
                    ];

                    let iconsText = [
                        "Easy to learn",
                        "Popular",
                        "Interoperability",
                        "Rich interfaces",
                        "Versatility"
                    ];

                    let i = -1;
                    let iconsSwap = document.querySelectorAll('.html-container i[class*="fa-"]');
                    let iconsTextSwap = document.querySelectorAll('.html-container p');
                    iconsBackground.style.backgroundColor = "#000";
                    iconsSwap.forEach(el => {
                        i++;
                        el.setAttribute("class", icons[i]);
                        el.style.color = "#f7e018";
                    });
                    i = -1;
                    iconsTextSwap.forEach(el => {
                        i++;
                        el.innerHTML = iconsText[i];
                        el.style.color = "#fff";
                    });
                    advTitle.classList.add("adv-title-js");
                    historyTitle.style.color = "#000";

                    historyBg.style.backgroundColor = "#f7e018";

                    description.forEach(el => {
                        el.setAttribute("class", "description description-js");
                    });

                    line.forEach(el => {
                        el.setAttribute("class", "line");
                        el.classList.add("line-js");
                    });

                    let descriptions = [
                        "JavaScript was invented by Brendan Eich",
                        'It was developed for Netscape 2, and became the ECMA-262 standard',
                        'Internet Explorer (IE4) was the first browser to support ECMA-262 Edition 1 (ES1).',
                        'Next ES versions has been released and supported by all browsers.'
                    ];

                    i = -1;
                    descriptionsText.forEach(el => {
                        (i <= 2) ? i++ : i = 0;
                        el.innerHTML = descriptions[i];
                    });

                    let dates = [
                        1995,
                        1997,
                        1997,
                        "1998 - 2018"
                    ];

                    for(let i = 0; i < 4; i++) {
                        datesPC[i].innerHTML = dates[i];
                        datesMobile[i].innerHTML = dates[i];
                    }

                    tryItUrselfTextLight.forEach(el => {
                        el.style.color = "#F9f23a";
                    });

                    tryItUrselfTextDark.forEach(el => {
                        el.style.color = "#F7E018";
                    });

                    runButton.style.backgroundColor = "#F7E018";
                    footer.style.backgroundColor = "#F7E018"
                    codeImage.src = "img/js-code.png";
                    languageImage.src = "img/js-logo.png";
                    languageImage.style.transform = "translate(-50px, -70px) rotate(35deg)";
                    body.setAttribute("class", "yellow");
                    toTopButton.style.color = "#F7E018";
                    toTopButtonBg.style.backgroundColor = "#111";
                } break;
            }

            setTimeout(function () {
                PAGE.transitionEnd = true;
            }, 500);
            appears.forEach(el => {
                el.style = "";
                el.classList.add("appear");
            });
            PAGE.InstructionsSwitch(1, exampleNumber);
        }
        
    },
    menuInteraction: function () {
        let burgerLay = document.querySelector(".burger-lay");
        let burgerLayBefore = document.querySelector(".burger-lay-before");
        let burgerLayAfter = document.querySelector(".burger-lay-after");

        if (PAGE.sideMenu.offsetHeight < 174) {
            PAGE.sideMenu.style.height = "174px";
            burgerLay.style.opacity = 0;
            burgerLayBefore.style = "transform: translateY(-11px) rotate(-45deg)";
            burgerLayAfter.style = "transform: translateY(11px) rotate(45deg)";
            PAGE.borderTransparent = true;
        } else {
            PAGE.sideMenu.style.height = "0";
            burgerLay.style.opacity = 1;
            burgerLayBefore.style = "transform: translateY(0px) rotate(0deg)";
            burgerLayAfter.style = "transform: translateY(0px) rotate(0deg)";
            PAGE.borderTransparent = false;
        }
        switch (PAGE.currentPage) {
            case "HTML":
            case "CSS": {
                burgerLayAfter.style.backgroundColor = "#fff";
                burgerLayBefore.style.backgroundColor = "#fff";
                if (!PAGE.borderTransparent) {
                    PAGE.burgerButton.style.borderColor = "white";
                } else
                    PAGE.burgerButton.style.borderColor = "transparent";
            } break;
            case "JS": {
                burgerLayAfter.style.backgroundColor = "#000";
                burgerLayBefore.style.backgroundColor = "#000";
                if (!PAGE.borderTransparent) {
                    PAGE.burgerButton.style.borderColor = "black";
                } else
                    PAGE.burgerButton.style.borderColor = "transparent";
            }
        }
    },
    appearWhenScrolling: function () {
        let advElements = document.querySelectorAll(".appear");
        let windowHeight = window.innerHeight;
        let revealPoint = 150;

        for (let i = 0; i < advElements.length; i++) {
            let revealTop = advElements[i].getBoundingClientRect().top;

            if (revealTop < windowHeight - revealPoint) {
                advElements[i].style.opacity = "1";
                advElements[i].style.transform = "translateY(0)";
            }
        }

        let historySection = document.getElementById("html-history");
        let topButton = document.querySelector(".to-top");

        if (historySection.getBoundingClientRect().top < windowHeight - revealPoint) {
            topButton.style.visibility = "visible";
            topButton.style.opacity = 1;
        } else {
            topButton.style.visibility = "hidden";
            topButton.style.opacity = 0;
        }
    },
    runCode: function () {
        let code = PAGE.textArea.value;
        let point = document.querySelectorAll(".not-run");
        let iFrameWindow = document.querySelector("#result-code");
        switch (PAGE.selectedFile) {
            case "HTML": {
                PAGE.iFrame.body.innerHTML = code;
                point[0].style.opacity = 0;
            } break;
            case "CSS": {
                PAGE.iFrame.head.innerHTML = "<style>" + code + "</style>";
                point[1].style.opacity = 0;
            } break;
            case "JS": {
                try {
                    iFrameWindow.contentWindow.eval(code);
                    point[2].style.opacity = 0;
                } catch (e) {
                    if (e) point[2].style.backgroundColor = "red";
                    console.error(e);
                }
            } break;
        }
        if (iFrameWindow.contentWindow.document.querySelector("body").innerHTML) {
            iFrameWindow.style.height = "1000px";
        } else {
            iFrameWindow.style.height = "600px";
        }

    },
    makeTab: function () {
        PAGE.textArea.addEventListener("keydown", PAGE.keyDownListener);
        PAGE.textArea.addEventListener("blur", function () {
            PAGE.textArea.removeEventListener("keydown", PAGE.keyDownListener);
        });
    },
    keyDownListener: function (e) {
        let code = PAGE.textArea.value;
        if (e.keyCode == 9) {
            let beforeTab = code.substring(0, PAGE.textArea.selectionStart);
            let afterTab = code.substring(PAGE.textArea.selectionStart);

            this.value = beforeTab + "    " + afterTab;
            PAGE.textArea.selectionStart = beforeTab.length + 4;
            PAGE.textArea.selectionEnd = beforeTab.length + 4;

            if (e.preventDefault) {
                e.preventDefault();
            }
        }
    },
    previousExample: function (e) {
        let exampleNumber = PAGE.exampleNumber;
        if (exampleNumber.innerHTML == "1/5") return;
        else {
            switch (exampleNumber.innerHTML) {
                case "2/5": {
                    PAGE.InstructionsSwitch(1, exampleNumber, e);
                } break;
                case "3/5": {
                    PAGE.InstructionsSwitch(2, exampleNumber, e);
                } break;
                case "4/5": {
                    PAGE.InstructionsSwitch(3, exampleNumber, e);
                } break;
                case "5/5": {
                    PAGE.InstructionsSwitch(4, exampleNumber, e);
                } break;
            }
        }
    },
    nextExample: function (e) {
        let exampleNumber = PAGE.exampleNumber;
        if (exampleNumber.innerHTML == "5/5") return;
        else {
            switch (exampleNumber.innerHTML) {
                case "2/5": {
                    PAGE.InstructionsSwitch(3, exampleNumber, e);
                } break;
                case "3/5": {
                    PAGE.InstructionsSwitch(4, exampleNumber, e);
                } break;
                case "4/5": {
                    PAGE.InstructionsSwitch(5, exampleNumber, e);
                } break;
                case "1/5": {
                    PAGE.InstructionsSwitch(2, exampleNumber, e);
                } break;
            }
        }
    },
    InstructionsSwitch: function (page, exampleNumber ,e) {
        let instructions = document.getElementsByClassName("instructions")[0];
        instructions.style.opacity = 0;
        setTimeout(function () {
            switch (page) {
                case 1: {
                    exampleNumber.innerHTML = "1/5";

                    switch(PAGE.currentPage) {
                        case "HTML": {
                            PAGE.exampleHeading.innerHTML = "Headings";
                            PAGE.exampleDescription.innerHTML = "Use <code>&lt;h1&gt;</code> tag, to make a heading.";
                            PAGE.exampleDescriptionTwo.innerHTML = "There are six sizes:";
                            PAGE.exampleDescriptionThree.innerHTML =
                                `
                                    <code>&lt;h1&gt;</code>
                                    <code>&lt;h2&gt;</code>
                                    <code>&lt;h3&gt;</code>
                                    <code>&lt;h4&gt;</code>
                                    <code>&lt;h5&gt;</code>
                                    <code>&lt;h6&gt;</code>
                                `;
                            PAGE.exampleCode.innerHTML =
                                `<p>&lt;h1&gt;I'm the biggest&lt;/h1&gt;</p>
                                <p>&lt;h3&gt;I'm not too big&lt;/h3&gt;</p>
                                <p>&lt;h6&gt;Why I'm so tiny?&lt;/h6&gt;</p>`;
                        } break;
                        case "CSS": {
                            PAGE.exampleHeading.innerHTML = "Selectors";
                            PAGE.exampleDescription.innerHTML = "You can style everything you want on he page.";
                            PAGE.exampleDescriptionTwo.innerHTML = "Just type the selector you want to style.";
                            PAGE.exampleDescriptionThree.innerHTML =
                                `
                                    Create some elements in HTML and then style them!
                                `;
                            PAGE.exampleCode.innerHTML =
                                `<p>&lt;p&gt;I'm blue!&lt;/p&gt;</p>
                                <p>&nbsp;</p>
                                <p>&lt;div&gt;</p>
                                <p>&nbsp; &nbsp; I have 100px width and 70px height! Also I'm orange!</p>
                                <p>&lt;/div&gt;</p>
                                <p>&nbsp;</p>
                                <p>&lt;div&gt;</p>
                                <p>&nbsp; &nbsp; I'm div and just like you!</p>
                                <p>&lt;/div&gt;</p>
                                <div class="seperator"></div>
                                <div class="code-blue"><p>p {</p>
                                    <p>&nbsp; &nbsp; color: blue;</p>
                                    <p>}</p>
                                    <p>&nbsp;</p>
                                    <p>div {</p>
                                    <p>&nbsp; &nbsp; width: 100px;</p>
                                    <p>&nbsp; &nbsp; height: 70px;</p>
                                    <p>&nbsp; &nbsp; background-color: orange;</p>
                                    <p>&nbsp; &nbsp; border: 2px solid red;</p>
                                    <p>}</p></div>`;
                        } break;
                        case "JS": {
                            PAGE.exampleHeading.innerHTML = "Variables";
                            PAGE.exampleDescription.innerHTML = 'Create variable with key word <code class="code-yellow">var</code>.';
                            PAGE.exampleDescriptionTwo.innerHTML = 'It allows you to keep data which can be useful later.';
                            PAGE.exampleDescriptionThree.innerHTML =
                                `
                                    <code class="code-yellow">console.log()</code> allows you to output your data in the console.
                                `;
                            PAGE.exampleCode.innerHTML =
                                `
                                <div class="code-yellow"><p>var name = "Chris";</p>
                                <p>&nbsp;</p>
                                <p>console.log(name);</p></div>`;
                        } break;
                    }

                    
                } break;
                case 2: {
                    exampleNumber.innerHTML = "2/5";

                    switch(PAGE.currentPage) {
                        case "HTML": {
                            PAGE.exampleHeading.innerHTML = "Paragraphs";
                            PAGE.exampleDescription.innerHTML = "Use <code>&lt;p&gt;</code> tag, to make a paragraph.";
                            PAGE.exampleDescriptionTwo.innerHTML = "By default, every paragraph is placed one by one.";
                            PAGE.exampleDescriptionThree.innerHTML =
                                ``;
                            PAGE.exampleCode.innerHTML =
                                `<p>&lt;p&gt;First paragraph&lt;/p&gt;</p>
                                <p>&lt;p&gt;Second paragraph&lt;/p&gt;</p>
                                <p>&lt;p&gt;Last paragraph&lt;/p&gt;</p>`;
                        } break;
                        case "CSS": {
                            PAGE.exampleHeading.innerHTML = "ID or Class?";
                            PAGE.exampleDescription.innerHTML = "You can add id or class to an element.";
                            PAGE.exampleDescriptionTwo.innerHTML = 'Add <code class="code-blue">id</code> to the elements which are unique.';
                            PAGE.exampleDescriptionThree.innerHTML =
                                `
                                    Add <code class="code-blue">class</code> to the elements which are similiar.
                                `;
                            PAGE.exampleCode.innerHTML =
                                `<p>&lt;div id="unique-tile"&gt;</p>
                                <p>&nbsp; &nbsp; There's no one like me!</p>
                                <p>&nbsp; &nbsp; My text is centered!</p>
                                <p>&lt;/div&gt;</p>
                                <p>&nbsp;</p>
                                <p>&lt;div class="tiles"&gt;</p>
                                <p>&nbsp; &nbsp; We are lime!</p>
                                <p>&nbsp; &nbsp; We have 30px font size!</p>
                                <p>&lt;/div&gt;</p>
                                <p>&nbsp;</p>
                                <p>&lt;div class="tiles"&gt;</p>
                                <p>&nbsp; &nbsp; Yeah!</p>
                                <p>&lt;/div&gt;</p>
                                <div class="seperator"></div>
                                <div class="code-blue"><p>#unique-tile {</p>
                                    <p>&nbsp; &nbsp; width: 150px;</p>
                                    <p>&nbsp; &nbsp; height: 100px;</p>
                                    <p>&nbsp; &nbsp; background-color: crimson;</p>
                                    <p>&nbsp; &nbsp; text-align: center;</p>
                                    <p>}</p>
                                    <p>&nbsp;</p>
                                    <p>.tiles {</p>
                                    <p>&nbsp; &nbsp; width: 300px;</p>
                                    <p>&nbsp; &nbsp; height: 250px;</p>
                                    <p>&nbsp; &nbsp; background-color: lime;</p>
                                    <p>&nbsp; &nbsp; font-size: 30px;</p>
                                    <p>&nbsp; &nbsp; border: 2px solid skyblue;</p>
                                    <p>}</p></div>`;
                        } break;
                        case "JS": {
                            PAGE.exampleHeading.innerHTML = "Modifying";
                            PAGE.exampleDescription.innerHTML = 'You can overwrite your variable.';
                            PAGE.exampleDescriptionTwo.innerHTML = 'Combine two variables into one by using <code class="code-yellow">+</code> operator.';
                            PAGE.exampleDescriptionThree.innerHTML =
                                `
                                    
                                `;
                            PAGE.exampleCode.innerHTML =
                                `
                                <div class="code-yellow"><p>var name = "Chris";</p>
                                <p>var awesome = " is awesome!";</p>
                                <p>var newName = name + awesome;</p>
                                <p>&nbsp;</p>
                                <p>console.log(newName);</p></div>`;
                        } break;
                    }
                    
                } break;
                case 3: {
                    exampleNumber.innerHTML = "3/5";

                    switch(PAGE.currentPage) {
                        case "HTML": {
                            PAGE.exampleHeading.innerHTML = "Lists";
                            PAGE.exampleDescription.innerHTML = "Create lists by using <code>&lt;ol&gt;</code> tag which gives you ordered list.";
                            PAGE.exampleDescriptionTwo.innerHTML = "Use <code>&lt;ul&gt; tag to make unordered list</code>.";
                            PAGE.exampleDescriptionThree.innerHTML =
                                `
                                    Every item of the list has to be placed between <code>&lt;li&gt;</code> tags.
                                `;
                            PAGE.exampleCode.innerHTML =
                                `<p>&lt;ol&gt;</p>
                                <p>&nbsp; &nbsp; &lt;li&gt;One&lt;/li&gt;</p>
                                <p>&nbsp; &nbsp; &lt;li&gt;Two&lt;/li&gt;</p>
                                <p>&nbsp; &nbsp; &lt;li&gt;Three&lt;/li&gt;</p>
                                <p>&lt;/ol&gt;</p>
                                <p>&nbsp;</p>
                                <p>&lt;ul&gt;</p>
                                <p>&nbsp; &nbsp; &lt;li&gt;First&lt;/li&gt;</p>
                                <p>&nbsp; &nbsp; &lt;li&gt;Second&lt;/li&gt;</p>
                                <p>&nbsp; &nbsp; &lt;li&gt;Third&lt;/li&gt;</p>
                                <p>&lt;/ul&gt;</p>`;
                        } break;
                        case "CSS": {
                            PAGE.exampleHeading.innerHTML = "Comma or Space?";
                            PAGE.exampleDescription.innerHTML = "You can define styles for many selectors by using comma.";
                            PAGE.exampleDescriptionTwo.innerHTML = 'Define which tags should be styled by adding space to your selector.';
                            PAGE.exampleDescriptionThree.innerHTML =
                                `
                                    
                                `;
                            PAGE.exampleCode.innerHTML =
                                `<p>&lt;div class="h2-container"&gt;</p>
                                <p>&nbsp; &nbsp; &lt;h2&gt;I'm styled!&lt;/h2&gt;</p>
                                <p>&nbsp; &nbsp; &lt;h3&gt;We are both styled!&lt;/h3&gt;</p>
                                <p>&lt;/div&gt;</p>
                                <p>&nbsp;</p>
                                <p>&lt;div&gt;</p>
                                <p>&nbsp; &nbsp; &lt;h2&gt;I'm not styled :(&lt;/h2&gt;</p>
                                <p>&nbsp; &nbsp; &lt;h4&gt;Yeah!&lt;/h4&gt;</p>
                                <p>&lt;/div&gt;</p>
                                <div class="seperator"></div>
                                <div class="code-blue">
                                <p>.h2-container h2 {</p>
                                    <p>&nbsp; &nbsp; color: red;</p>
                                    <p>&nbsp; &nbsp; text-transform: uppercase;</p>
                                    <p>&nbsp; &nbsp; text-decoration: underline;</p>
                                    <p>}</p>
                                    <p>&nbsp;</p>
                                    <p>h3, h4 {</p>
                                    <p>&nbsp; &nbsp; color: green;</p>
                                    <p>&nbsp; &nbsp; letter-spacing: 5px;</p>
                                    <p>&nbsp; &nbsp; font-style: italic;</p>
                                    <p>}</p></div>`;
                        } break;
                        case "JS": {
                            PAGE.exampleHeading.innerHTML = "IF statement";
                            PAGE.exampleDescription.innerHTML = 'Make decisions in your program.';
                            PAGE.exampleDescriptionTwo.innerHTML = 'If the condition in the <code class="code-yellow">if()</code> statement is true, that codeblock will be executed.';
                            PAGE.exampleDescriptionThree.innerHTML =
                                `
                                    Otherwise, the codeblock after <code class="code-yellow">else</code> will be executed.
                                `;
                            PAGE.exampleCode.innerHTML =
                                `
                                <div class="code-yellow"><p>var number = 7;</p>
                                <p>&nbsp;</p>
                                <p>if(number &gt; 0) {</p>
                                <p>&nbsp; &nbsp; console.log("This number is bigger than 0");</p>
                                <p>} else {</p>
                                <p>&nbsp; &nbsp; console.log("This number is smaller than 0");</p>
                                <p>}</p></div>`;
                        } break;
                    }
                  
                } break;
                case 4: {
                    exampleNumber.innerHTML = "4/5";

                    switch(PAGE.currentPage) {
                        case "HTML": {
                            PAGE.exampleHeading.innerHTML = "Links";
                            PAGE.exampleDescription.innerHTML = "Use <code>&lt;a&gt;</code> tag, to make a link.";
                            PAGE.exampleDescriptionTwo.innerHTML = "By adding <code>href</code> attribute you can add source which the user will be moved to.";
                            PAGE.exampleDescriptionThree.innerHTML =
                                `
                                    You can also add <code>target="_blank"</code> attribute which will open the link in a new tab.
                                `;
                            PAGE.exampleCode.innerHTML =
                                `<p>&lt;a href="https://www.facebook.com" target="_blank"&gt;</p>
                                <p>&nbsp; &nbsp; &nbsp; &nbsp; Facebook</p>
                                <p>&lt;/a&gt;</p>
                                <p>&lt;a href="https://www.twitter.com" target="_blank"&gt;</p>
                                <p>&nbsp; &nbsp; &nbsp; &nbsp; Twitter</p>
                                <p>&lt;/a&gt;</p>
                                <p>&lt;a href="https://www.youtube.com" target="_blank"&gt;</p>
                                <p>&nbsp; &nbsp; &nbsp; &nbsp; YouTube</p>
                                <p>&lt;/a&gt;</p>
                                <p>&lt;a href="https://www.instagram.com" target="_blank"&gt;</p>
                                <p>&nbsp; &nbsp; &nbsp; &nbsp; Instagram</p>
                                <p>&lt;/a&gt;</p>`;
                        } break;
                        case "CSS": {
                            PAGE.exampleHeading.innerHTML = "Pseudoclasses";
                            PAGE.exampleDescription.innerHTML = "Define element's styles on special states.";
                            PAGE.exampleDescriptionTwo.innerHTML = 'For example use <code class="code-blue">:hover</code> pseudoclass next to your selector to change background color when the pointer hovers over your div.';
                            PAGE.exampleDescriptionThree.innerHTML =
                                `
                                    There are many more pseudoclasses to know!
                                `;
                            PAGE.exampleCode.innerHTML =
                                `<p>&lt;div&gt;</p>
                                <p>&nbsp; &nbsp; Hover!</p>
                                <p>&lt;/div&gt;</p>
                                <div class="seperator"></div>
                                <div class="code-blue">
                                <p>div {</p>
                                    <p>&nbsp; &nbsp; width: 200px;</p>
                                    <p>&nbsp; &nbsp; height: 200px;</p>
                                    <p>&nbsp; &nbsp; background-color: purple;</p>
                                    <p>}</p>
                                    <p>&nbsp;</p>
                                    <p>div:hover {</p>
                                    <p>&nbsp; &nbsp; background-color: orange;</p>
                                    <p>}</p></div>`;
                        } break;
                        case "JS": {
                            PAGE.exampleHeading.innerHTML = "While loop";
                            PAGE.exampleDescription.innerHTML = 'Do more than once your instructions';
                            PAGE.exampleDescriptionTwo.innerHTML = 'The blockcode in <code class="code-yellow">while()</code> loop will be executing as many times as the condition is true.';
                            PAGE.exampleDescriptionThree.innerHTML =
                                `
                                
                                `;
                            PAGE.exampleCode.innerHTML =
                                `
                                <div class="code-yellow"><p>var loopNumber = 5;</p>
                                <p>while(loopNumber &gt; 0) {</p>
                                <p>&nbsp; &nbsp; console.log(loopNumber);</p>
                                <p>&nbsp; &nbsp; loopNumber = loopNumber - 1;</p>
                                <p>}</p></div>`;
                        } break;
                    }

                } break;
                case 5: {
                    exampleNumber.innerHTML = "5/5";

                    switch(PAGE.currentPage) {
                        case "HTML": {
                            PAGE.exampleHeading.innerHTML = "Images";
                            PAGE.exampleDescription.innerHTML = "Use <code>&lt;img&gt;</code> tag, to make an image.";
                            PAGE.exampleDescriptionTwo.innerHTML = "Add <code>alt</code> attribute and write alternative text to it. That will be displayed every time when the browser won't be able to load the image.";
                            PAGE.exampleDescriptionThree.innerHTML =
                                `
                                    The <code>src</code> attribute allows you to give a link or a file on on your computer which photo will be displayed. You can also add <code>width</code> and <code>height</code> attributes to set Image sizes.
                                `;
                            PAGE.exampleCode.innerHTML =
                                `<p>&lt;img src="https://cdn.pixabay.com/photo/2018/11/26/19/43/autumn-3840138_960_720.jpg" alt="Fall" width="400"&gt;</p>`;
                        } break;
                        case "CSS": {
                            PAGE.exampleHeading.innerHTML = "Pseudoelements";
                            PAGE.exampleDescription.innerHTML = "It allows you to define special parts of your element.";
                            PAGE.exampleDescriptionTwo.innerHTML = 'For example use <code class="code-blue">::first-line</code> pseudoclass next to your selector to define the first line of your text.';
                            PAGE.exampleDescriptionThree.innerHTML =
                                `
                                    There is also <code class="code-blue">::first-letter</code> which allows you to define (you will be shocked) first letter.
                                `;
                            PAGE.exampleCode.innerHTML =
                                `<p>&lt;h1&gt;Heading&lt;/h1&gt;</p>
                                <p>&nbsp;</p>
                                <p>&lt;p&gt;</p>
                                <p>&nbsp; &nbsp; This text is created for filling that gap here. It's really useless, all we want to achieve is more than one line here. You will see that first line is different! Isn't it cool? Yes, it is. You don't know how powerful CSS is.</p>
                                <p>&lt;/p&gt;</p>
                                <div class="seperator"></div>
                                <div class="code-blue">
                                <p>h1::first-letter {</p>
                                    <p>&nbsp; &nbsp; font-size: 50px;</p>
                                    <p>&nbsp; &nbsp; color: red;</p>
                                    <p>}</p>
                                    <p>&nbsp;</p>
                                    <p>p {<br />&nbsp; &nbsp; width: 50%;<br />}</p>
                                    <p>&nbsp;</p>
                                    <p>p::first-line {</p>
                                    <p>&nbsp; &nbsp; color: purple;</p>
                                    <p>&nbsp; &nbsp; font-size: 30px;</p>
                                    <p>&nbsp; &nbsp; text-decoration: overline;</p>
                                    <p>}</p></div>`;
                        } break;
                        case "JS": {
                            PAGE.exampleHeading.innerHTML = "Modifying elements";
                            PAGE.exampleDescription.innerHTML = 'Catch an HTML element via JavaScript by using <code class="code-yellow">document.getElementById()</code> method.';
                            PAGE.exampleDescriptionTwo.innerHTML = 'As an argument put the <code class="code-yellow">id</code> of the element.';
                            PAGE.exampleDescriptionThree.innerHTML =
                                `
                                Then you can modify everything you want like style or text inside tags.
                                `;
                            PAGE.exampleCode.innerHTML =
                                `<p>&lt;div id="myDiv"&gt;&lt;/div&gt;</p>
                                <div class="seperator"></div>
                                <div class="code-yellow">
                                <p>document.getElementById("myDiv").style = "width: 200px; height: 200px; background-color: yellow;";</p>
                                <p>&nbsp;</p>
                                <p>document.getElementById("myDiv").innerHTML = "I'm yellow div!";</p></div>`;
                        } break;
                    }
              
                } break;
            }
            if(e) 
                instructions.style.opacity = 1;
            else
                return;
        }, 300);

    },
    changeCode: function (e) {
        switch (PAGE.selectedFile) {
            case "HTML":
                PAGE.htmlCode = PAGE.textArea.value;
                break;
            case "CSS":
                PAGE.cssCode = PAGE.textArea.value;
                break;
            case "JS":
                PAGE.jsCode = PAGE.textArea.value;
                break;
        }

        document.querySelectorAll(".files-item").forEach(el => {
            el.classList.remove("selected-file");
        });
        e.target.classList.add("selected-file");

        switch (e.target.id) {
            case "html-file": {
                PAGE.selectedFile = "HTML";
                PAGE.textArea.value = PAGE.htmlCode;
                PAGE.textArea.style.color = "#F06529";
            }
                break;
            case "css-file": {
                PAGE.selectedFile = "CSS";
                PAGE.textArea.value = PAGE.cssCode;
                PAGE.textArea.style.color = "#3a76f2";
            }
                break;
            case "js-file": {
                PAGE.selectedFile = "JS";
                PAGE.textArea.value = PAGE.jsCode;
                PAGE.textArea.style.color = "#f0db4f";
            }
                break;
        }
    },
    showNotRun: function (e) {
        let point = document.querySelectorAll(".not-run");
        point[2].style.backgroundColor = "#fff";
        switch (PAGE.selectedFile) {
            case "HTML":
                point[0].style.opacity = 1;
                break;
            case "CSS":
                point[1].style.opacity = 1;
                break;
            case "JS":
                point[2].style.opacity = 1;
                break;
        }
    },
    showCloseConsole: function () {
        let consoleIcon = document.querySelector(".console-span");
        let consoleBox = document.querySelector(".console-box");

        if (!PAGE.isConsoleOpen) {
            PAGE.isConsoleOpen = true;
            consoleBox.style.height = "200px";
            consoleIcon.classList.add("console-active");
            consoleBox.classList.add("console-box-active");
            PAGE.trash.style.zIndex = 1;
            PAGE.trash.style.height = "24px";
        } else {
            PAGE.isConsoleOpen = false;
            consoleBox.style.height = "0";
            consoleIcon.classList.remove("console-active");
            consoleBox.classList.remove("console-box-active");
            PAGE.trash.style.zIndex = -1;
            PAGE.trash.style.height = "0";
        }
    },
};