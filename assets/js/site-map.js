
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
    const progressBar = document.querySelector(".progress-line");
    const progressFill = progressBar?.querySelector("span");

    if (!progressBar || !progressFill) return;

    // Current step / total steps (override per page via data-step / data-total on .progress-line)
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