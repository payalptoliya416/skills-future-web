const otpInputs = document.querySelectorAll(".otp-inputs input");

otpInputs.forEach((otpInput, otpIndex) => {
  otpInput.addEventListener("input", () => {
    otpInput.value = otpInput.value.replace(/[^0-9]/g, "");

    if (otpInput.value && otpIndex < otpInputs.length - 1) {
      otpInputs[otpIndex + 1].focus();
    }
  });

  otpInput.addEventListener("keydown", (event) => {
    if (event.key === "Backspace" && !otpInput.value && otpIndex > 0) {
      otpInputs[otpIndex - 1].focus();
    }
  });

  otpInput.addEventListener("paste", (event) => {
    event.preventDefault();

    const otpPastedData = event.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, otpInputs.length);

    otpPastedData.split("").forEach((digit, digitIndex) => {
      otpInputs[digitIndex].value = digit;
    });

    if (otpPastedData.length) {
      otpInputs[Math.min(otpPastedData.length, otpInputs.length) - 1].focus();
    }
  });
});

// cover letter landing start

document.addEventListener("DOMContentLoaded", () => {
  const coverLetterProgressBar = document.querySelector(".progress-line");
  const coverLetterProgressFill = coverLetterProgressBar?.querySelector("span");

  if (!coverLetterProgressBar || !coverLetterProgressFill) return;

  // Current step / total steps
  const coverLetterCurrentStep =
    Number(coverLetterProgressBar.dataset.step) || 1;

  const coverLetterTotalSteps =
    Number(coverLetterProgressBar.dataset.total) || 9;

  // Calculate progress percentage
  const coverLetterProgress =
    (coverLetterCurrentStep / coverLetterTotalSteps) * 100;

  // Update accessibility value
  coverLetterProgressBar.setAttribute("aria-valuenow", coverLetterProgress);

  // Start animation after a small delay
  requestAnimationFrame(() => {
    setTimeout(() => {
      coverLetterProgressFill.style.width = `${coverLetterProgress}%`;
    }, 150);
  });
});
// cover letter landing end

// AI Photobooth - gender & style selection start

document.addEventListener("DOMContentLoaded", () => {
  document
    .querySelectorAll(".gender-options, .style-options")
    .forEach((selectionGroup) => {
      const selectionOptions = selectionGroup.querySelectorAll(
        ".gender-option, .style-option",
      );

      selectionOptions.forEach((selectionOption) => {
        const radioInput = selectionOption.querySelector('input[type="radio"]');

        if (!radioInput) return;

        radioInput.addEventListener("change", () => {
          selectionOptions.forEach((optionItem) => {
            optionItem.classList.remove("is-selected");
          });

          selectionOption.classList.add("is-selected");
        });
      });
    });
});

// AI Photobooth - gender & style selection end

/*Quetionary page
      Entire box is clickable.
      Pink background appears ONLY when checkbox is checked.
    */

const careerSelectionOptions = document.querySelectorAll(
  ".career-interest-option",
);

careerSelectionOptions.forEach((careerOption) => {
  const careerCheckbox = careerOption.querySelector('input[type="checkbox"]');

  // Set initial state
  careerOption.classList.toggle("is-selected", careerCheckbox.checked);

  // Checkbox state change
  careerCheckbox.addEventListener("change", function () {
    careerOption.classList.toggle("is-selected", this.checked);
  });
});
/*
      Keep Going button
    */

const careerQuestionnaireContinueButton = document.getElementById(
  "careerQuestionnaireContinue",
);

if (careerQuestionnaireContinueButton) {
  careerQuestionnaireContinueButton.addEventListener("click", function () {
    const selectedCareerInterestValues = [
      ...document.querySelectorAll('input[name="career_interests[]"]:checked'),
    ].map((careerInterestInput) => careerInterestInput.value);

    console.log("Selected Career Interests:", selectedCareerInterestValues);
  });
}

/*
      Job Listings page
      Filter pills switch between the job-listing-list panels.
    */
const jobListingFilterPills = document.querySelectorAll(
  ".filter-pill[data-tab]",
);

const jobListingTabPanels = document.querySelectorAll(
  ".job-listing-list[data-tab-panel]",
);

jobListingFilterPills.forEach((jobFilterPill) => {
  jobFilterPill.addEventListener("click", function () {
    jobListingFilterPills.forEach((filterPillItem) => {
      filterPillItem.classList.remove("active");
    });

    this.classList.add("active");

    const selectedJobTab = this.dataset.tab;

    jobListingTabPanels.forEach((jobTabPanel) => {
      jobTabPanel.hidden = jobTabPanel.dataset.tabPanel !== selectedJobTab;
    });
  });
});

/*
      Job Listings page
      Sort by button reorders the cards of whichever tab panel is
      currently visible, toggling between ascending / descending.
    */
const jobListingSortButton = document.querySelector(".sort-by-btn");

if (jobListingSortButton) {
  jobListingSortButton.addEventListener("click", function () {
    const visibleJobListingPanel = document.querySelector(
      ".job-listing-list[data-tab-panel]:not([hidden])",
    );

    if (!visibleJobListingPanel) return;

    const jobCards = [...visibleJobListingPanel.querySelectorAll(".job-card")];

    jobCards.reverse().forEach((jobCard) => {
      visibleJobListingPanel.appendChild(jobCard);
    });

    const updatedSortOrder = this.dataset.sortOrder === "asc" ? "desc" : "asc";

    this.dataset.sortOrder = updatedSortOrder;

    this.classList.toggle("is-asc", updatedSortOrder === "asc");

    this.setAttribute("aria-pressed", String(updatedSortOrder === "asc"));
  });
}

/*
      Schedule page
      Workshops / Pop Up tab toggle.
    */

const scheduleTabButtons = document.querySelectorAll(".schedule-tab-btn");

const scheduleTabPanels = document.querySelectorAll(
  ".schedule-timeline[data-tab-panel]",
);

scheduleTabButtons.forEach((scheduleTabButton) => {
  scheduleTabButton.addEventListener("click", function () {
    scheduleTabButtons.forEach((scheduleButtonItem) => {
      scheduleButtonItem.classList.remove("active");
    });

    this.classList.add("active");

    const selectedScheduleTab = this.dataset.scheduleTab;

    scheduleTabPanels.forEach((scheduleTabPanel) => {
      scheduleTabPanel.hidden =
        scheduleTabPanel.dataset.tabPanel !== selectedScheduleTab;
    });
  });
});

/*
      AI Photobooth - Take Photo page
      Opens the device camera, runs a 3-2-1 countdown on "Take photo",
      captures a still frame to canvas, then hands off to review.html.
    */

(function () {
  const photoboothCameraVideo = document.getElementById("cameraVideo");
  if (!photoboothCameraVideo) return;

  const photoboothCapturedPhoto = document.getElementById("capturedPhoto");

  const photoboothCountdown = document.getElementById("cameraCountdown");

  const photoboothCameraFlash = document.getElementById("cameraFlash");

  const photoboothCameraPlaceholder =
    document.getElementById("cameraPlaceholder");

  const photoboothPlaceholderText = document.getElementById(
    "cameraPlaceholderText",
  );

  const photoboothRetryButton = document.getElementById("cameraRetryBtn");

  const photoboothCaptureCanvas = document.getElementById("captureCanvas");

  const photoboothTakePhotoButton = document.getElementById("takePhotoBtn");

  let photoboothActiveStream = null;
  let photoboothIsCapturing = false;

  function stopPhotoboothStream() {
    if (photoboothActiveStream) {
      photoboothActiveStream
        .getTracks()
        .forEach((cameraTrack) => cameraTrack.stop());

      photoboothActiveStream = null;
    }
  }

  async function startPhotoboothCamera() {
    photoboothCameraPlaceholder.hidden = false;
    photoboothPlaceholderText.textContent = "Requesting camera access…";

    photoboothRetryButton.hidden = true;
    photoboothTakePhotoButton.disabled = true;

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      photoboothPlaceholderText.textContent =
        "Camera isn't supported in this browser.";

      return;
    }

    try {
      photoboothActiveStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
        audio: false,
      });

      photoboothCameraVideo.srcObject = photoboothActiveStream;

      await photoboothCameraVideo.play();

      photoboothCameraPlaceholder.hidden = true;
      photoboothTakePhotoButton.disabled = false;
    } catch (cameraError) {
      photoboothPlaceholderText.textContent =
        "Camera access was blocked. Allow camera permission to continue.";

      photoboothRetryButton.hidden = false;
    }
  }

  function runPhotoboothCountdown(countdownSeconds) {
    return new Promise((resolveCountdown) => {
      let countdownRemaining = countdownSeconds;

      photoboothCountdown.hidden = false;

      const updateCountdown = () => {
        photoboothCountdown.textContent = countdownRemaining;

        photoboothCountdown.classList.remove("is-pulsing");

        void photoboothCountdown.offsetWidth;

        photoboothCountdown.classList.add("is-pulsing");

        countdownRemaining -= 1;

        if (countdownRemaining < 0) {
          photoboothCountdown.hidden = true;

          photoboothCountdown.classList.remove("is-pulsing");

          resolveCountdown();
        } else {
          setTimeout(updateCountdown, 1000);
        }
      };

      updateCountdown();
    });
  }

  function capturePhotoboothPhoto() {
    const photoWidth = photoboothCameraVideo.videoWidth;

    const photoHeight = photoboothCameraVideo.videoHeight;

    photoboothCaptureCanvas.width = photoWidth;
    photoboothCaptureCanvas.height = photoHeight;

    const canvasContext = photoboothCaptureCanvas.getContext("2d");

    // Mirror the capture to match the live preview
    canvasContext.translate(photoWidth, 0);
    canvasContext.scale(-1, 1);

    canvasContext.drawImage(
      photoboothCameraVideo,
      0,
      0,
      photoWidth,
      photoHeight,
    );

    const capturedPhotoData = photoboothCaptureCanvas.toDataURL("image/png");

    photoboothCapturedPhoto.src = capturedPhotoData;

    try {
      sessionStorage.setItem("photoboothCapturedPhoto", capturedPhotoData);
    } catch (storageError) {
      // Storage unavailable - safely ignore
    }

    photoboothCameraFlash.classList.remove("is-flashing");

    void photoboothCameraFlash.offsetWidth;

    photoboothCameraFlash.classList.add("is-flashing");

    photoboothCameraVideo.hidden = true;
    photoboothCapturedPhoto.hidden = false;
    photoboothTakePhotoButton.hidden = true;
  }

  photoboothTakePhotoButton.addEventListener("click", async function () {
    if (photoboothIsCapturing || photoboothTakePhotoButton.disabled) {
      return;
    }

    photoboothIsCapturing = true;
    photoboothTakePhotoButton.disabled = true;

    await runPhotoboothCountdown(3);

    capturePhotoboothPhoto();

    setTimeout(() => {
      window.location.href = "review.html";
    }, 500);
  });

  photoboothRetryButton.addEventListener("click", startPhotoboothCamera);

  window.addEventListener("pagehide", stopPhotoboothStream);

  startPhotoboothCamera();
})();

/*
      AI Photobooth - Review Photo page
      Loads the photo captured on the take-photo page (handed off via
      sessionStorage) and shows a fallback if none was found.
    */

(function () {
  const photoboothReviewPhoto = document.getElementById("reviewPhoto");

  if (!photoboothReviewPhoto) return;

  const photoboothReviewPlaceholder = document.getElementById(
    "reviewPhotoPlaceholder",
  );

  const photoboothGenerateHeadshotButton = document.getElementById(
    "generateHeadshotBtn",
  );

  let photoboothCapturedPhotoData = null;

  try {
    photoboothCapturedPhotoData = sessionStorage.getItem(
      "photoboothCapturedPhoto",
    );
  } catch (storageError) {
    // Storage unavailable - safely ignore
  }

  if (photoboothCapturedPhotoData) {
    photoboothReviewPhoto.src = photoboothCapturedPhotoData;

    photoboothReviewPhoto.hidden = false;

    photoboothReviewPlaceholder.hidden = true;
  } else if (photoboothGenerateHeadshotButton) {
    photoboothGenerateHeadshotButton.classList.add(
      "photobooth-start-btn--disabled",
    );

    photoboothGenerateHeadshotButton.setAttribute("aria-disabled", "true");
  }
})();

/*
      AI Photobooth - Generating page
      Simulates the AI processing time, then unlocks the button that
      takes the user through to their finished headshot.
    */

(function () {
  const photoboothPreviewGeneratedButton = document.getElementById(
    "previewGeneratedBtn",
  );

  if (!photoboothPreviewGeneratedButton) return;

  setTimeout(() => {
    photoboothPreviewGeneratedButton.disabled = false;
  }, 2500);

  photoboothPreviewGeneratedButton.addEventListener("click", function () {
    if (photoboothPreviewGeneratedButton.disabled) {
      return;
    }

    window.location.href = "result.html";
  });
})();

/*
      AI Photobooth - Results page
      Shows the finished headshot (handed off via sessionStorage) and
      lets the user download it.
    */

(function () {
  const photoboothResultPhoto = document.getElementById("resultPhoto");

  if (!photoboothResultPhoto) return;

  const photoboothResultPlaceholder = document.getElementById(
    "resultPhotoPlaceholder",
  );

  const photoboothDownloadHeadshotButton = document.getElementById(
    "downloadHeadshotBtn",
  );

  let photoboothGeneratedPhotoData = null;

  try {
    photoboothGeneratedPhotoData = sessionStorage.getItem(
      "photoboothCapturedPhoto",
    );
  } catch (storageError) {
    // Storage unavailable - safely ignore
  }

  if (photoboothGeneratedPhotoData) {
    photoboothResultPhoto.src = photoboothGeneratedPhotoData;

    photoboothResultPhoto.hidden = false;

    photoboothResultPlaceholder.hidden = true;
  } else if (photoboothDownloadHeadshotButton) {
    photoboothDownloadHeadshotButton.disabled = true;
  }

  if (photoboothDownloadHeadshotButton) {
    photoboothDownloadHeadshotButton.addEventListener("click", function () {
      if (!photoboothGeneratedPhotoData) return;

      const photoboothDownloadLink = document.createElement("a");

      photoboothDownloadLink.href = photoboothGeneratedPhotoData;

      photoboothDownloadLink.download = "professional-headshot.png";

      document.body.appendChild(photoboothDownloadLink);

      photoboothDownloadLink.click();

      photoboothDownloadLink.remove();
    });
  }
})();
