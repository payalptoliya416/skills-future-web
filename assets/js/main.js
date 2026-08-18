
// ---zone dashboard progressbar-- start
document.addEventListener('DOMContentLoaded', () => {
  const zoneTabs = document.querySelectorAll('.zone-tab');
  const progressText = document.getElementById('progressPercentage');
  const totalZones = zoneTabs.length;

  // Bootstrap Modal Open Trigger Function
  function triggerPassportCompleteModal() {
    const modalElement = document.getElementById('passportModal');
    if (modalElement && typeof bootstrap !== 'undefined') {
      const modalInstance = bootstrap.Modal.getOrCreateInstance(modalElement);
      modalInstance.show();
    }
  }

  zoneTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const clickedIndex = parseInt(tab.getAttribute('data-index'));

      // Check if clicking the currently highest active zone to toggle off
      const isHighestActive = tab.classList.contains('active') && 
        (clickedIndex === totalZones || !zoneTabs[clickedIndex].classList.contains('active'));

      zoneTabs.forEach(t => {
        const idx = parseInt(t.getAttribute('data-index'));
        if (isHighestActive) {
          if (idx >= clickedIndex) t.classList.remove('active');
        } else {
          if (idx <= clickedIndex) t.classList.add('active');
          else t.classList.remove('active');
        }
      });

      // Update Percentage Text
      const activeCount = document.querySelectorAll('.zone-tab.active').length;
      const percentage = Math.round((activeCount / totalZones) * 100);
      progressText.textContent = `${percentage}%`;

      // 🎯 100% Progress thay tyare Bootstrap Modal direct open thase
      if (percentage === 100) {
        setTimeout(() => {
          triggerPassportCompleteModal();
        }, 200);
      }
    });
  });
});
// ---zone dashboard progressbar-- end

// ---scanner passport complete start
document.addEventListener('DOMContentLoaded', () => {
  let mediaStream = null;
  const claimRewardBtn = document.getElementById('claimRewardBtn');
  const scannerModalEl = document.getElementById('scannerModal');
  const passportModalEl = document.getElementById('passportModal');

  // Start Camera Stream
  function startCamera() {
    const video = document.getElementById("vid");
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: "environment" } },
        audio: false
      })
      .then((stream) => {
        mediaStream = stream;
        video.srcObject = stream;
        video.play();
      })
      .catch((err) => {
        console.error("Camera access error:", err);
        alert("Unable to access camera.");
      });
    }
  }

  // Stop Camera Stream (Memory & Battery saving on close)
  function stopCamera() {
    const video = document.getElementById("vid");
    if (mediaStream) {
      mediaStream.getTracks().forEach(track => track.stop());
      mediaStream = null;
    }
    if (video) {
      video.srcObject = null;
    }
  }

  // Claim Button Click Event: Switch Modals
  if (claimRewardBtn) {
    claimRewardBtn.addEventListener('click', () => {
      // 1. Hide Passport Modal
      const passportModal = bootstrap.Modal.getInstance(passportModalEl);
      if (passportModal) {
        passportModal.hide();
      }

      // 2. Open Scanner Modal
      const scannerModal = bootstrap.Modal.getOrCreateInstance(scannerModalEl);
      scannerModal.show();
    });
  }

  // Auto start camera when scanner modal opens & stop when closed
  scannerModalEl.addEventListener('shown.bs.modal', startCamera);
  scannerModalEl.addEventListener('hidden.bs.modal', stopCamera);
});
// ---scanner passport complete end 

// ---index file to js start

    const inputs = document.querySelectorAll(".otp-inputs input");

    inputs.forEach((input, index) => {

      input.addEventListener("input", () => {
        input.value = input.value.replace(/[^0-9]/g, "");

        if (input.value && index < inputs.length - 1) {
          inputs[index + 1].focus();
        }
      });

      input.addEventListener("keydown", (e) => {
        if (e.key === "Backspace" && !input.value && index > 0) {
          inputs[index - 1].focus();
        }
      });

      input.addEventListener("paste", (e) => {
        e.preventDefault();

        const pastedData = e.clipboardData
          .getData("text")
          .replace(/\D/g, "")
          .slice(0, inputs.length);

        pastedData.split("").forEach((digit, i) => {
          inputs[i].value = digit;
        });

        if (pastedData.length) {
          inputs[Math.min(pastedData.length, inputs.length) - 1].focus();
        }
      });

    });




    // cover letter landing start

document.addEventListener("DOMContentLoaded", () => {
    const progressBar = document.querySelector(".progress-line-data");
    const progressFill = progressBar?.querySelector("span");

    if (!progressBar || !progressFill) return;

    // Current step / total steps (override per page via data-step / data-total on .progress-line-data)
    const currentStep = Number(progressBar.dataset.step) || 1;
    const totalSteps = Number(progressBar.dataset.total) || 9;

    // Calculate progress percentage
    const progress = (currentStep / totalSteps) * 100;

    // Update accessibility value
    progressBar.setAttribute("aria-valuenow", progress);

    // Start animation after a small delay
    requestAnimationFrame(() => {
        setTimeout(() => {
            progressFill.style.width = `${progress}%`;
        }, 150);
    });
});

// cover letter landing end


// AI Photobooth - gender & style selection start

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".gender-options, .style-options").forEach((group) => {
        const options = group.querySelectorAll(".gender-option, .style-option");

        options.forEach((option) => {
            const input = option.querySelector('input[type="radio"]');
            if (!input) return;

            input.addEventListener("change", () => {
                options.forEach((opt) => opt.classList.remove("is-selected"));
                option.classList.add("is-selected");
            });
        });
    });
});

// AI Photobooth - gender & style selection end



  /*Quetionary page
      Entire box is clickable.
      Pink background appears ONLY when checkbox is checked.
    */

    const careerInterestOptions =
      document.querySelectorAll(
        ".career-interest-option"
      );


    careerInterestOptions.forEach((option) => {

      const checkbox =
        option.querySelector(
          'input[type="checkbox"]'
        );


      // Set initial state
      option.classList.toggle(
        "is-selected",
        checkbox.checked
      );


      // Checkbox state change
      checkbox.addEventListener(
        "change",
        function () {

          option.classList.toggle(
            "is-selected",
            this.checked
          );

        }
      );

    });


    /*
      Keep Going button
    */

    const careerQuestionnaireContinueBtn = document.getElementById(
      "careerQuestionnaireContinue"
    );

    if (careerQuestionnaireContinueBtn) {
      careerQuestionnaireContinueBtn.addEventListener(
        "click",
        function () {

          const selectedCareerInterests = [
            ...document.querySelectorAll(
              'input[name="career_interests[]"]:checked'
            )
          ].map(
            (input) => input.value
          );

          console.log(
            "Selected Career Interests:",
            selectedCareerInterests
          );

        }
      );
    }


    /*
      Job Listings page
      Filter pills switch between the job-listing-list panels.
    */

    const jobFilterPills = document.querySelectorAll(".filter-pill[data-tab]");
    const jobListingPanels = document.querySelectorAll(".job-listing-list[data-tab-panel]");

    jobFilterPills.forEach((pill) => {

      pill.addEventListener("click", function () {

        jobFilterPills.forEach((p) => p.classList.remove("active"));
        this.classList.add("active");

        const targetTab = this.dataset.tab;

        jobListingPanels.forEach((panel) => {
          panel.hidden = panel.dataset.tabPanel !== targetTab;
        });

      });

    });


    /*
      Job Listings page
      Sort by button reorders the cards of whichever tab panel is
      currently visible, toggling between ascending / descending.
    */

    const jobSortByBtn = document.querySelector(".sort-by-btn");

    if (jobSortByBtn) {

      jobSortByBtn.addEventListener("click", function () {

        const activePanel = document.querySelector(
          ".job-listing-list[data-tab-panel]:not([hidden])"
        );

        if (!activePanel) return;

        const cards = [...activePanel.querySelectorAll(".job-card")];

        cards.reverse().forEach((card) => activePanel.appendChild(card));

        const nextOrder = this.dataset.sortOrder === "asc" ? "desc" : "asc";
        this.dataset.sortOrder = nextOrder;
        this.classList.toggle("is-asc", nextOrder === "asc");
        this.setAttribute("aria-pressed", String(nextOrder === "asc"));

      });

    }


    /*
      Schedule page
      Workshops / Pop Up tab toggle.
    */

    const scheduleTabBtns = document.querySelectorAll(".schedule-tab-btn");
    const scheduleTabPanels = document.querySelectorAll(".schedule-timeline[data-tab-panel]");

    scheduleTabBtns.forEach((btn) => {

      btn.addEventListener("click", function () {
        scheduleTabBtns.forEach((b) => b.classList.remove("active"));
        this.classList.add("active");

        const targetTab = this.dataset.scheduleTab;

        scheduleTabPanels.forEach((panel) => {
          panel.hidden = panel.dataset.tabPanel !== targetTab;
        });
      });

    });


    /*
      AI Photobooth - Take Photo page
      Opens the device camera, runs a 3-2-1 countdown on "Take photo",
      captures a still frame to canvas, then hands off to review.html.
    */

    (function () {

      const cameraVideo = document.getElementById("cameraVideo");
      if (!cameraVideo) return; // not on the take-photo page

      const capturedPhoto = document.getElementById("capturedPhoto");
      const cameraCountdown = document.getElementById("cameraCountdown");
      const cameraFlash = document.getElementById("cameraFlash");
      const cameraPlaceholder = document.getElementById("cameraPlaceholder");
      const cameraPlaceholderText = document.getElementById("cameraPlaceholderText");
      const cameraRetryBtn = document.getElementById("cameraRetryBtn");
      const captureCanvas = document.getElementById("captureCanvas");
      const takePhotoBtn = document.getElementById("takePhotoBtn");

      let activeStream = null;
      let isCapturing = false;

      function stopStream() {
        if (activeStream) {
          activeStream.getTracks().forEach((track) => track.stop());
          activeStream = null;
        }
      }

      async function startCamera() {
        cameraPlaceholder.hidden = false;
        cameraPlaceholderText.textContent = "Requesting camera access…";
        cameraRetryBtn.hidden = true;
        takePhotoBtn.disabled = true;

        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
          cameraPlaceholderText.textContent = "Camera isn't supported in this browser.";
          return;
        }

        try {
          activeStream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: "user" },
            audio: false,
          });

          cameraVideo.srcObject = activeStream;
          await cameraVideo.play();

          cameraPlaceholder.hidden = true;
          takePhotoBtn.disabled = false;
        } catch (error) {
          cameraPlaceholderText.textContent =
            "Camera access was blocked. Allow camera permission to continue.";
          cameraRetryBtn.hidden = false;
        }
      }

      function runCountdown(seconds) {
        return new Promise((resolve) => {
          let remaining = seconds;
          cameraCountdown.hidden = false;

          const tick = () => {
            cameraCountdown.textContent = remaining;
            cameraCountdown.classList.remove("is-pulsing");
            // restart the pulse animation on every tick
            void cameraCountdown.offsetWidth;
            cameraCountdown.classList.add("is-pulsing");

            remaining -= 1;

            if (remaining < 0) {
              cameraCountdown.hidden = true;
              cameraCountdown.classList.remove("is-pulsing");
              resolve();
            } else {
              setTimeout(tick, 1000);
            }
          };

          tick();
        });
      }

      function capturePhoto() {
        const width = cameraVideo.videoWidth;
        const height = cameraVideo.videoHeight;

        captureCanvas.width = width;
        captureCanvas.height = height;

        const ctx = captureCanvas.getContext("2d");
        // mirror the capture so it matches the mirrored live preview
        ctx.translate(width, 0);
        ctx.scale(-1, 1);
        ctx.drawImage(cameraVideo, 0, 0, width, height);

        const dataUrl = captureCanvas.toDataURL("image/png");
        capturedPhoto.src = dataUrl;

        try {
          sessionStorage.setItem("photoboothCapturedPhoto", dataUrl);
        } catch (error) {
          // storage unavailable (e.g. private mode) - safe to ignore
        }

        cameraFlash.classList.remove("is-flashing");
        void cameraFlash.offsetWidth;
        cameraFlash.classList.add("is-flashing");

        cameraVideo.hidden = true;
        capturedPhoto.hidden = false;
        takePhotoBtn.hidden = true;
      }

      takePhotoBtn.addEventListener("click", async function () {
        if (isCapturing || takePhotoBtn.disabled) return;

        isCapturing = true;
        takePhotoBtn.disabled = true;

        await runCountdown(3);
        capturePhoto();

        // let the capture flash/photo register before handing off
        setTimeout(() => {
          window.location.href = "review.html";
        }, 500);
      });

      cameraRetryBtn.addEventListener("click", startCamera);

      window.addEventListener("pagehide", stopStream);

      startCamera();

    })();


    /*
      AI Photobooth - Review Photo page
      Loads the photo captured on the take-photo page (handed off via
      sessionStorage) and shows a fallback if none was found.
    */

    (function () {

      const reviewPhoto = document.getElementById("reviewPhoto");
      if (!reviewPhoto) return; // not on the review page

      const reviewPhotoPlaceholder = document.getElementById("reviewPhotoPlaceholder");
      const generateHeadshotBtn = document.getElementById("generateHeadshotBtn");

      let capturedPhoto = null;
      try {
        capturedPhoto = sessionStorage.getItem("photoboothCapturedPhoto");
      } catch (error) {
        // storage unavailable (e.g. private mode) - safe to ignore
      }

      if (capturedPhoto) {
        reviewPhoto.src = capturedPhoto;
        reviewPhoto.hidden = false;
        reviewPhotoPlaceholder.hidden = true;
      } else if (generateHeadshotBtn) {
        generateHeadshotBtn.classList.add("photobooth-start-btn--disabled");
        generateHeadshotBtn.setAttribute("aria-disabled", "true");
      }

    })();


    /*
      AI Photobooth - Generating page
      Simulates the AI processing time, then unlocks the button that
      takes the user through to their finished headshot.
    */

    (function () {

      const previewGeneratedBtn = document.getElementById("previewGeneratedBtn");
      if (!previewGeneratedBtn) return; // not on the generating page

      setTimeout(() => {
        previewGeneratedBtn.disabled = false;
      }, 2500);

      previewGeneratedBtn.addEventListener("click", function () {
        if (previewGeneratedBtn.disabled) return;
        window.location.href = "result.html";
      });

    })();


    /*
      AI Photobooth - Results page
      Shows the finished headshot (handed off via sessionStorage) and
      lets the user download it.
    */

    (function () {

      const resultPhoto = document.getElementById("resultPhoto");
      if (!resultPhoto) return; // not on the results page

      const resultPhotoPlaceholder = document.getElementById("resultPhotoPlaceholder");
      const downloadHeadshotBtn = document.getElementById("downloadHeadshotBtn");

      let generatedPhoto = null;
      try {
        generatedPhoto = sessionStorage.getItem("photoboothCapturedPhoto");
      } catch (error) {
        // storage unavailable (e.g. private mode) - safe to ignore
      }

      if (generatedPhoto) {
        resultPhoto.src = generatedPhoto;
        resultPhoto.hidden = false;
        resultPhotoPlaceholder.hidden = true;
      } else if (downloadHeadshotBtn) {
        downloadHeadshotBtn.disabled = true;
      }

      downloadHeadshotBtn.addEventListener("click", function () {
        if (!generatedPhoto) return;

        const link = document.createElement("a");
        link.href = generatedPhoto;
        link.download = "professional-headshot.png";
        document.body.appendChild(link);
        link.click();
        link.remove();
      });

    })();
// ---index file to js end


// ---------ai code start 
// cover letter landing start

document.addEventListener("DOMContentLoaded", () => {

    const progressBar = document.querySelector(".progress-line-data");

    if (!progressBar) return;

    const progressFill = progressBar.querySelector("span");

    if (!progressFill) return;

    const currentStep = parseInt(progressBar.dataset.step, 10) || 1;
    const totalSteps = parseInt(progressBar.dataset.total, 10) || 7;

    /*
     * Each step occupies an equal section of the progress bar.
     */
    const stepWidth = 100 / totalSteps;

    /*
     * Previous steps are completely filled.
     */
    const completedSteps = currentStep - 1;
    const completedWidth = completedSteps * stepWidth;

    /*
     * Animate current step.
     */
    progressFill.style.width = `${completedWidth}%`;

    setTimeout(() => {

        progressFill.style.width = `${currentStep * stepWidth}%`;

    }, 150);

    /*
     * Accessibility value.
     */
    const progress = (currentStep / totalSteps) * 100;

    progressBar.setAttribute(
        "aria-valuenow",
        progress.toFixed(2)
    );
});

// cover letter landing end


// highlight selection start

document.addEventListener("DOMContentLoaded", function () {

    // ----- Back button -----
    var backBtn = document.querySelector(".back-btn");

    if (backBtn) {
        backBtn.addEventListener("click", function () {
            if (window.history.length > 1) {
                window.history.back();
            } else {
                console.log("No previous page in history.");
            }
        });
    }

    // ----- Start building CTA -----
    var startBtn = document.querySelector(".start-building-btn");

    if (startBtn && !startBtn.closest(".job-detail-btn-container")) {
        startBtn.addEventListener("click", function () {
            startBtn.classList.add("is-pressed");

            window.setTimeout(function () {
                startBtn.classList.remove("is-pressed");
            }, 160);

            console.log("Start building clicked");

            // Hook for the next step in the AI cover letter flow.
            // e.g. window.location.href = "/cover-letter/questions";
        });
    }

    // =====================================================
    // Step 2 — "What should your letter highlight?"
    // Character counters + inline content flagging
    // =====================================================

    var highlightForm = document.querySelector(".job-detail-form");

    if (highlightForm) {
        initHighlightStep(highlightForm);
    }

    function initHighlightStep(form) {

        // Small illustrative list of phrases the letter should avoid.
        // In production this check would run server-side against a
        // proper moderation service; this is a lightweight client-side
        // stand-in so the flow can be demonstrated end to end.
        var flaggedPhrases = [
            "threatening to hurt",
            "hurt a colleague",
            "kill",
            "violence",
            "violent",
            "assault",
            "attack",
            "harass",
            "threat"
        ].sort(function (a, b) {
            return b.length - a.length; // longer phrases matched first
        });

        var alertBox = document.getElementById("contentAlert");
        var continueBtn = document.getElementById("highlightContinueBtn");
        var fieldGroups = form.querySelectorAll("[data-field-group]");

        function escapeHtml(str) {
            return str
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;");
        }

        function escapeRegExp(str) {
            return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        }

        function findFlags(value) {
            var lower = value.toLowerCase();
            return flaggedPhrases.filter(function (phrase) {
                return lower.indexOf(phrase) !== -1;
            });
        }

        function buildHighlightedHtml(value, matches) {
            if (!matches.length) {
                return escapeHtml(value);
            }

            var pattern = new RegExp(
                "(" + matches.map(escapeRegExp).join("|") + ")",
                "gi"
            );

            return escapeHtml(value).replace(
                new RegExp(pattern.source, "gi"),
                function (match) {
                    return '<mark class="flagged-highlight">' + match + "</mark>";
                }
            );
        }

        function updateAnyError() {
            var anyError = form.querySelector(".form-group.has-error") !== null;

            if (alertBox) {
                alertBox.hidden = !anyError;
            }

            if (continueBtn) {
                continueBtn.classList.toggle("is-disabled", anyError);
                continueBtn.setAttribute("aria-disabled", anyError ? "true" : "false");
            }
        }

        fieldGroups.forEach(function (group) {
            var textarea = group.querySelector("textarea");
            var backdrop = group.querySelector(".textarea-backdrop");
            var counter = group.querySelector(".char-counter");

            if (!textarea) {
                return;
            }

            function refresh() {
                var value = textarea.value;
                var max = counter ? counter.getAttribute("data-max") : textarea.getAttribute("maxlength");

                // character counter
                if (counter) {
                    counter.textContent = value.length + " / " + max;
                }

                // content flagging + inline highlight
                if (textarea.hasAttribute("data-flag-check") && backdrop) {
                    var matches = findFlags(value);
                    backdrop.innerHTML = buildHighlightedHtml(value, matches);
                    group.classList.toggle("has-error", matches.length > 0);
                }

                updateAnyError();
            }

            textarea.addEventListener("input", refresh);
            textarea.addEventListener("scroll", function () {
                if (backdrop) {
                    backdrop.scrollTop = textarea.scrollTop;
                }
            });

            refresh();
        });

        if (continueBtn) {
            continueBtn.addEventListener("click", function (event) {
                var anyError = form.querySelector(".form-group.has-error");

                var firstEmptyRequired = null;
                form.querySelectorAll("textarea[data-required]").forEach(function (t) {
                    if (!t.value.trim() && !firstEmptyRequired) {
                        firstEmptyRequired = t;
                    }
                });

                if (anyError || firstEmptyRequired) {
                    event.preventDefault();
                    var target = anyError
                        ? anyError.querySelector("textarea")
                        : firstEmptyRequired;

                    if (target) {
                        target.focus();
                    }

                    if (alertBox && anyError) {
                        alertBox.hidden = false;
                    }

                    return;
                }

                console.log("Step 2 complete, continuing to step 3");
                // Hook for the next step in the AI cover letter flow.
                // e.g. window.location.href = "step-3-tone.html";
            });
        }
    }

});

// highlight selection end


/* choose-tone start
   Handles tone selection and the "Generate cover letter" flow
   (generation allowance countdown + navigation) for choose-tone.html */

(function () {
    "use strict";

    document.addEventListener("DOMContentLoaded", init);

    var MAX_ATTEMPTS = 2;
    var STORAGE_KEY_ATTEMPTS = "skillsFuture:generationAttemptsRemaining";
    var STORAGE_KEY_TONE = "skillsFuture:selectedTone";
    var NEXT_PAGE_URL = "cover-letter-result.html"; // update to the real result page

    function init() {
        var toneOptions = Array.prototype.slice.call(
            document.querySelectorAll("[data-tone-option]")
        );
        var allowanceBox = document.getElementById("generationAllowance");
        var allowanceCount = document.getElementById("generationAllowanceCount");
        var generateBtn = document.getElementById("generateLetterBtn");

        if (!toneOptions.length || !generateBtn) return;

        // ---------- restore saved state ----------
        var attemptsRemaining = getStoredAttempts();
        var savedTone = window.localStorage
            ? window.localStorage.getItem(STORAGE_KEY_TONE)
            : null;

        if (savedTone) {
            selectTone(toneOptions, savedTone);
        }

        renderAllowance(attemptsRemaining, allowanceBox, allowanceCount, generateBtn);

        // ---------- tone selection ----------
        toneOptions.forEach(function (option) {
            option.addEventListener("click", function () {
                var input = option.querySelector('input[type="radio"]');
                if (!input) return;

                toneOptions.forEach(function (opt) {
                    opt.classList.remove("is-selected");
                });
                option.classList.add("is-selected");
                input.checked = true;

                setStoredValue(STORAGE_KEY_TONE, input.value);
            });

            // keyboard support (Enter / Space) since the card itself isn't a button
            option.addEventListener("keydown", function (event) {
                if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    option.click();
                }
            });
        });

        // ---------- generate cover letter ----------
        generateBtn.addEventListener("click", function () {
            if (generateBtn.classList.contains("is-disabled")) return;

            var selectedInput = document.querySelector(
                'input[name="letter-tone"]:checked'
            );
            var selectedTone = selectedInput ? selectedInput.value : "professional";

            attemptsRemaining = Math.max(0, attemptsRemaining - 1);
            setStoredAttempts(attemptsRemaining);
            renderAllowance(attemptsRemaining, allowanceBox, allowanceCount, generateBtn);

            // Simulate generation start; wire this up to the real API call.
            generateBtn.classList.add("is-loading");
            generateBtn.textContent = "Generating…";

            setTimeout(function () {
                window.location.href =
                    NEXT_PAGE_URL + "?tone=" + encodeURIComponent(selectedTone);
            }, 600);
        });
    }

    function selectTone(toneOptions, toneValue) {
        toneOptions.forEach(function (option) {
            var input = option.querySelector('input[type="radio"]');
            var isMatch = input && input.value === toneValue;
            option.classList.toggle("is-selected", !!isMatch);
            if (input) input.checked = !!isMatch;
        });
    }

    function renderAllowance(attemptsRemaining, allowanceBox, allowanceCount, generateBtn) {
        if (!allowanceBox || !allowanceCount || !generateBtn) return;

        var label =
            attemptsRemaining === 1
                ? "1 attempt remaining"
                : attemptsRemaining + " attempts remaining";
        allowanceCount.textContent = label;

        var isEmpty = attemptsRemaining <= 0;
        allowanceBox.classList.toggle("is-empty", isEmpty);
        generateBtn.classList.toggle("is-disabled", isEmpty);

        if (isEmpty) {
            allowanceCount.textContent = "No attempts remaining";
        }
    }

    function getStoredAttempts() {
        if (!window.localStorage) return MAX_ATTEMPTS;
        var stored = window.localStorage.getItem(STORAGE_KEY_ATTEMPTS);
        var parsed = parseInt(stored, 10);
        return Number.isNaN(parsed) ? MAX_ATTEMPTS : parsed;
    }

    function setStoredAttempts(value) {
        setStoredValue(STORAGE_KEY_ATTEMPTS, String(value));
    }

    function setStoredValue(key, value) {
        if (!window.localStorage) return;
        try {
            window.localStorage.setItem(key, value);
        } catch (e) {
            /* storage unavailable (private mode, quota, etc.) — fail silently */
        }
    }
})();

// choose-tone end 


/* generating.js
   Runs the "creating your cover letter" simulation:
   - shows which generation attempt is in use
   - builds the letter text from the answers/tone stored earlier in the flow
   - flips the spinner to a success check and unlocks "Preview generated letter" */

(function () {
    "use strict";

    document.addEventListener("DOMContentLoaded", init);

    var MAX_ATTEMPTS = 2;
    var STORAGE_KEY_ATTEMPTS = "skillsFuture:generationAttemptsRemaining";
    var STORAGE_KEY_TONE = "skillsFuture:selectedTone";
    var STORAGE_KEY_LETTER = "skillsFuture:coverLetterText";
    var STORAGE_KEY_ROLE = "skillsFuture:coverLetterRole";
    var REVIEW_PAGE_URL = "review_cover_letter.html";
    var GENERATION_DELAY_MS = 2400;

    function init() {
        var spinner = document.getElementById("generatingSpinner");
        var title = document.getElementById("generatingTitle");
        var subtext = document.getElementById("generatingSubtext");
        var attemptValue = document.getElementById("attemptPillValue");
        var previewBtn = document.getElementById("previewLetterBtn");

        if (!spinner || !previewBtn) return;

        var attemptsRemaining = getStoredNumber(STORAGE_KEY_ATTEMPTS, MAX_ATTEMPTS);
        var attemptsUsed = MAX_ATTEMPTS - attemptsRemaining;
        if (attemptsUsed < 1) attemptsUsed = 1; // this page only loads once a generation has started

        if (attemptValue) {
            attemptValue.textContent = attemptsUsed + " of " + MAX_ATTEMPTS;
        }

        // Build (or reuse) the letter now so review.html has it ready.
        var letterText = buildLetterText();
        setStoredValue(STORAGE_KEY_LETTER, letterText);

        // Simulate generation, then reveal the success state.
        window.setTimeout(function () {
            spinner.classList.add("is-complete");
            if (title) title.textContent = "Your cover letter is ready";
            if (subtext) subtext.textContent = "Take a look before you approve it.";

            previewBtn.classList.remove("is-disabled");
            previewBtn.setAttribute("aria-disabled", "false");
        }, GENERATION_DELAY_MS);

        previewBtn.addEventListener("click", function () {
            if (previewBtn.classList.contains("is-disabled")) return;
            window.location.href = REVIEW_PAGE_URL;
        });
    }

    function buildLetterText() {
        var experience = getStoredValue("relevant-experience") ||
            "three years of experience managing social media campaigns and coordinating events";
        var strengths = getStoredValue("key-strengths");
        var role = getStoredValue(STORAGE_KEY_ROLE) || "Marketing Executive";
        var tone = getStoredValue(STORAGE_KEY_TONE) || "professional";

        setStoredValue(STORAGE_KEY_ROLE, role);

        var strengthsLine = strengths
            ? " I’ve also " + strengths.toLowerCase().replace(/\.$/, "") + "."
            : "";

        var closingByTone = {
            professional:
                "I would welcome the opportunity to bring this experience to your team and support meaningful campaigns in financial services.",
            confident:
                "I’m confident I can make an immediate impact on your team, and I’d welcome the chance to show you how.",
            warm:
                "I’d love the chance to bring this experience to your team, and I’m genuinely excited about what we could build together."
        };

        var closing = closingByTone[tone] || closingByTone.professional;

        return (
            "Dear Hiring Manager,\n\n" +
            "I am excited to apply for the " + role + " position. With " + experience.replace(/^3 years/i, "three years") +
            ", I have developed the organisation and communication skills needed to contribute effectively." + strengthsLine +
            "\n\n" + closing +
            "\n\nSincerely,\nJane Doe"
        );
    }

    function getStoredValue(key) {
        if (!window.localStorage) return "";
        try {
            return window.localStorage.getItem(key) || "";
        } catch (e) {
            return "";
        }
    }

    function getStoredNumber(key, fallback) {
        var raw = getStoredValue(key);
        var parsed = parseInt(raw, 10);
        return Number.isNaN(parsed) ? fallback : parsed;
    }

    function setStoredValue(key, value) {
        if (!window.localStorage) return;
        try {
            window.localStorage.setItem(key, value);
        } catch (e) {
            /* storage unavailable — fail silently */
        }
    }
})();



/* review.js
   Populates the letter preview with the text generated on generating.html
   and wires up the approve / edit actions. */

(function () {
    "use strict";

    document.addEventListener("DOMContentLoaded", init);

    var STORAGE_KEY_LETTER = "skillsFuture:coverLetterText";
    var STORAGE_KEY_APPROVED = "skillsFuture:letterApproved";
    var COMPLETE_PAGE_URL = "complete.html";

    var FALLBACK_LETTER =
        "Dear Hiring Manager,\n\n" +
        "I am excited to apply for the Marketing Executive position. With three years of experience managing social media campaigns and coordinating events, I have developed the organisation and communication skills needed to contribute effectively.\n\n" +
        "I would welcome the opportunity to bring this experience to your team and support meaningful campaigns in financial services.\n\n" +
        "Sincerely,\nJane Doe";

    function init() {
        var letterPreview = document.getElementById("letterPreview");
        var approveBtn = document.getElementById("approveLetterBtn");

        if (!letterPreview || !approveBtn) return;

        var letterText = getStoredValue(STORAGE_KEY_LETTER) || FALLBACK_LETTER;
        letterPreview.textContent = letterText;

        approveBtn.addEventListener("click", function () {
            setStoredValue(STORAGE_KEY_APPROVED, "true");
            window.location.href = COMPLETE_PAGE_URL;
        });
    }

    function getStoredValue(key) {
        if (!window.localStorage) return "";
        try {
            return window.localStorage.getItem(key) || "";
        } catch (e) {
            return "";
        }
    }

    function setStoredValue(key, value) {
        if (!window.localStorage) return;
        try {
            window.localStorage.setItem(key, value);
        } catch (e) {
            /* storage unavailable — fail silently */
        }
    }
})();


/* complete.js
   Wires up the final step: shows the right filename, generates a real PDF
   download of the approved letter, and gates "create another" on the
   remaining generation allowance. */

(function () {
    "use strict";

    document.addEventListener("DOMContentLoaded", init);

    var MAX_ATTEMPTS = 2;
    var STORAGE_KEY_ATTEMPTS = "skillsFuture:generationAttemptsRemaining";
    var STORAGE_KEY_LETTER = "skillsFuture:coverLetterText";
    var STORAGE_KEY_ROLE = "skillsFuture:coverLetterRole";
    var CHOOSE_TONE_URL = "choose-tone.html";

    var FALLBACK_LETTER =
        "Dear Hiring Manager,\n\n" +
        "I am excited to apply for the Marketing Executive position. With three years of experience managing social media campaigns and coordinating events, I have developed the organisation and communication skills needed to contribute effectively.\n\n" +
        "I would welcome the opportunity to bring this experience to your team and support meaningful campaigns in financial services.\n\n" +
        "Sincerely,\nJane Doe";

    function init() {
        var pdfCardTitle = document.getElementById("pdfCardTitle");
        var downloadBtn = document.getElementById("downloadLetterBtn");
        var createAnotherBtn = document.getElementById("createAnotherBtn");
        var createAnotherSub = document.getElementById("createAnotherSub");

        var role = getStoredValue(STORAGE_KEY_ROLE) || "Marketing Executive";
        var letterText = getStoredValue(STORAGE_KEY_LETTER) || FALLBACK_LETTER;

        if (pdfCardTitle) {
            pdfCardTitle.textContent = "Cover Letter \u2014 " + role;
        }

        var attemptsRemaining = getStoredNumber(STORAGE_KEY_ATTEMPTS, MAX_ATTEMPTS - 1);
        var hasAttemptsLeft = attemptsRemaining > 0;

        if (createAnotherBtn && createAnotherSub) {
            if (hasAttemptsLeft) {
                createAnotherSub.textContent =
                    attemptsRemaining === 1 ? "Uses 1 attempt" : "Uses 1 of " + attemptsRemaining + " remaining";
            } else {
                createAnotherSub.textContent = "No attempts remaining";
                createAnotherBtn.classList.add("is-disabled");
            }
        }

        if (downloadBtn) {
            downloadBtn.addEventListener("click", function () {
                downloadLetterAsPdf(role, letterText);
            });
        }

        if (createAnotherBtn) {
            createAnotherBtn.addEventListener("click", function () {
                if (createAnotherBtn.classList.contains("is-disabled")) return;
                window.location.href = CHOOSE_TONE_URL;
            });
        }
    }

    function downloadLetterAsPdf(role, letterText) {
        var jsPDFCtor = window.jspdf && window.jspdf.jsPDF;

        if (!jsPDFCtor) {
            // Library failed to load (e.g. offline) — fall back to a plain-text file
            // so the download still works.
            downloadAsTextFile(role, letterText);
            return;
        }

        var doc = new jsPDFCtor({ unit: "pt", format: "a4" });
        var marginLeft = 56;
        var marginTop = 72;
        var maxWidth = 483; // A4 width (595pt) minus margins

        doc.setFont("helvetica", "normal");
        doc.setFontSize(11);

        var lines = doc.splitTextToSize(letterText, maxWidth);
        doc.text(lines, marginLeft, marginTop, { lineHeightFactor: 1.6 });

        doc.save(fileNameFor(role));
    }

    function downloadAsTextFile(role, letterText) {
        var blob = new Blob([letterText], { type: "text/plain" });
        var url = URL.createObjectURL(blob);
        var link = document.createElement("a");
        link.href = url;
        link.download = fileNameFor(role).replace(/\.pdf$/, ".txt");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }

    function fileNameFor(role) {
        var slug = role.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
        return "cover-letter-" + (slug || "draft") + ".pdf";
    }

    function getStoredValue(key) {
        if (!window.localStorage) return "";
        try {
            return window.localStorage.getItem(key) || "";
        } catch (e) {
            return "";
        }
    }

    function getStoredNumber(key, fallback) {
        var raw = getStoredValue(key);
        var parsed = parseInt(raw, 10);
        return Number.isNaN(parsed) ? fallback : parsed;
    }
})();


/* qr-checkin.js
   Shared camera + QR scanning logic for the check-in flow:
   camera-permission.html -> permission-prompt.html -> scanner.html -> checked-in.html
*/

(function () {
    "use strict";

    var ZONE_STORAGE_KEY = "skillsFuture:lastScannedZone";

    /* ---------- shared camera helper ---------- */

    function requestCamera() {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            return Promise.reject(new Error("Camera API not supported in this browser."));
        }
        return navigator.mediaDevices.getUserMedia({
            audio: false,
            video: {
                facingMode: { ideal: "environment" },
                width: { ideal: 720 },
                height: { ideal: 720 }
            }
        });
    }

    function stopStream(stream) {
        if (!stream) return;
        stream.getTracks().forEach(function (track) {
            track.stop();
        });
    }

    window.QRCheckIn = {
        requestCamera: requestCamera,
        stopStream: stopStream
    };

    /* ---------- camera-permission.html ---------- */

    document.addEventListener("DOMContentLoaded", function () {
        var tryAgainBtn = document.getElementById("tryAgainBtn");
        var statusEl = document.getElementById("cameraOffStatus");

        if (!tryAgainBtn) return;

        tryAgainBtn.addEventListener("click", function () {
            tryAgainBtn.disabled = true;
            tryAgainBtn.textContent = "Checking camera…";
            if (statusEl) statusEl.textContent = "";

            requestCamera()
                .then(function (stream) {
                    stopStream(stream);
                    window.location.href = "scanner.html";
                })
                .catch(function () {
                    tryAgainBtn.disabled = false;
                    tryAgainBtn.textContent = "Try again";
                    if (statusEl) {
                        statusEl.textContent =
                            "Camera is still blocked. Update the permission in your browser or phone settings, then try again.";
                    }
                });
        });
    });

    /* ---------- permission-prompt.html ---------- */

    document.addEventListener("DOMContentLoaded", function () {
        var allowBtn = document.getElementById("allowCameraBtn");
        var denyBtn = document.getElementById("denyCameraBtn");

        if (!allowBtn && !denyBtn) return;

        if (allowBtn) {
            allowBtn.addEventListener("click", function () {
                allowBtn.disabled = true;
                if (denyBtn) denyBtn.disabled = true;
                allowBtn.textContent = "Requesting…";

                requestCamera()
                    .then(function (stream) {
                        stopStream(stream);
                        window.location.href = "scanner.html";
                    })
                    .catch(function () {
                        window.location.href = "camera-permission.html";
                    });
            });
        }

        if (denyBtn) {
            denyBtn.addEventListener("click", function () {
                window.location.href = "camera-permission.html";
            });
        }
    });

    /* ---------- scanner.html ---------- */

    document.addEventListener("DOMContentLoaded", function () {
        var video = document.getElementById("qrVideo");
        var canvas = document.getElementById("qrCanvas");
        var statusEl = document.getElementById("scanStatus");
        var closeBtn = document.getElementById("scannerCloseBtn");

        if (closeBtn) {
            closeBtn.addEventListener("click", function () {
                if (window.history.length > 1) {
                    window.history.back();
                } else {
                    window.location.href = "camera-permission.html";
                }
            });
        }

        if (!video || !canvas) return;

        if (typeof window.jsQR !== "function") {
            if (statusEl) statusEl.textContent = "QR scanning library failed to load.";
            return;
        }

        var ctx = canvas.getContext("2d", { willReadFrequently: true });
        var activeStream = null;
        var rafId = null;
        var scanning = true;

        requestCamera()
            .then(function (stream) {
                activeStream = stream;
                video.srcObject = stream;
                video.setAttribute("playsinline", "true");
                return video.play();
            })
            .then(function () {
                rafId = requestAnimationFrame(tick);
            })
            .catch(function () {
                window.location.href = "camera-permission.html";
            });

        function tick() {
            if (!scanning) return;

            if (video.readyState === video.HAVE_ENOUGH_DATA) {
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

                var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                var code = window.jsQR(imageData.data, imageData.width, imageData.height, {
                    inversionAttempts: "dontInvert"
                });

                if (code && code.data) {
                    scanning = false;
                    onCodeScanned(code.data);
                    return;
                }
            }

            rafId = requestAnimationFrame(tick);
        }

        function onCodeScanned(data) {
            if (statusEl) statusEl.textContent = "QR code recognised — checking you in…";

            try {
                window.sessionStorage.setItem(ZONE_STORAGE_KEY, data);
            } catch (e) {
                /* storage unavailable — continue without it */
            }

            stopStream(activeStream);

            window.setTimeout(function () {
                window.location.href = "checked-in.html";
            }, 450);
        }

        window.addEventListener("beforeunload", function () {
            scanning = false;
            if (rafId) cancelAnimationFrame(rafId);
            stopStream(activeStream);
        });

        document.addEventListener("visibilitychange", function () {
            if (document.hidden) {
                scanning = false;
                if (rafId) cancelAnimationFrame(rafId);
            } else if (video.srcObject) {
                scanning = true;
                rafId = requestAnimationFrame(tick);
            }
        });
    });

    /* ---------- checked-in.html ---------- */

    document.addEventListener("DOMContentLoaded", function () {
        var zoneEl = document.getElementById("checkedInZone");
        var scanAnotherBtn = document.getElementById("scanAnotherBtn");
        var viewPassportBtn = document.getElementById("viewPassportBtn");

        if (zoneEl) {
            var zone = "";
            try {
                zone = window.sessionStorage.getItem(ZONE_STORAGE_KEY) || "";
            } catch (e) {
                zone = "";
            }
            zoneEl.textContent = zone
                ? "\u201C" + zone + "\u201D has been added to your Event Passport."
                : "This zone has been added to your Event Passport.";
        }

        if (scanAnotherBtn) {
            scanAnotherBtn.addEventListener("click", function () {
                window.location.href = "scanner.html";
            });
        }

        if (viewPassportBtn) {
            viewPassportBtn.addEventListener("click", function () {
                // Hook this up to the real Event Passport page.
                window.location.href = "#";
            });
        }
    });
})();
// ---------ai code end 