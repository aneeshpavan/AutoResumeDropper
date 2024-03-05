function automateResumeDrop() {
    let employerButtons = document.querySelectorAll('div.MuiListItemButton-root.employer-list-item');
    let currentEmployerIndex = 0;
    let delayForAlreadyDropped = 500;
    let delayBetweenEmployerClicks = 3000;

    function clickNextEmployerAndDropResume() {
        if (currentEmployerIndex >= employerButtons.length) {
            console.log("Finished clicking through all employers.");
            return;
        }

        let employerButton = employerButtons[currentEmployerIndex];
        employerButton.scrollIntoView({ behavior: "smooth", block: "center" });

        setTimeout(() => {
            employerButton.click();
            console.log(`Clicked on employer number ${currentEmployerIndex + 1}`);

            setTimeout(() => {
                let dropResumeButtonXPath = `//*[@id="root"]/div/div/main/div/section/section[1]/div/button`;
                let dropResumeButton = document.evaluate(dropResumeButtonXPath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
                
                if (dropResumeButton && !dropResumeButton.classList.contains("Mui-disabled")) {
                    console.log(`Dropping resume for employer number ${currentEmployerIndex + 1}`);
                    dropResumeButton.click();
                    currentEmployerIndex++;
                    setTimeout(clickNextEmployerAndDropResume, delayBetweenEmployerClicks);
                } else {
                    console.log(`Resume already dropped or button disabled for employer number ${currentEmployerIndex + 1}. Moving on immediately.`);
                    currentEmployerIndex++;
                    setTimeout(clickNextEmployerAndDropResume, delayForAlreadyDropped);
                }
            }, 1000);

        }, 500);
    }

    clickNextEmployerAndDropResume();
}

automateResumeDrop();
