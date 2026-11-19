// Replace your existing createCardSortTrial() function in experiment.js with this one.
// Works with mouse drag-and-drop (desktop) AND tap-to-select / tap-to-place (phones, tablets, desktop).

let currentAssignments = {};
let currentLabels = {};

function createCardSortTrial(vignette) {

    return {

        type: jsPsychHtmlButtonResponse,

        stimulus: function() {

            let cardsHTML = "";

            vignette.statements.forEach((statement, index) => {
                cardsHTML += `
                    <div class="card" data-card-id="${index}" data-statement="${statement}">
                        ${statement}
                    </div>
                `;
            });

            let groupsHTML = "";

            for (let n = 1; n <= 4; n++) {
                groupsHTML += `
                    <div class="group" data-group="${n}">
                        <h3>Group ${n}</h3>
                        <div class="group-cards"></div>
                        <div class="group-labels" style="display:none;">
                            <label>
                                Group ${n} name (optional)
                                <input type="text" class="group-name">
                            </label>
                            <label>
                                Brief explanation (optional): what do these statements have in common?
                                <textarea class="group-explanation" rows="3"></textarea>
                            </label>
                        </div>
                    </div>
                `;
            }

            return `

                <div class="card-sort-container">

                    <h2>${vignette.title}</h2>

                    ${vignette.scenario}

                    <p>
                        The statements below were made in response to the
                        situation above. Although all of the statements
                        blame the victim or reduce the responsibility of the
                        perpetrator in some way, they do so in different
                        ways.
                    </p>

                    <p>
                        <strong>
                            Please group together statements that seem to
                            use the same kind of reasoning.
                        </strong>
                        Tap a statement, then tap the group you want to put
                        it in (or drag it with a mouse). To move a statement
                        again, just tap it and choose another group. There are
                        no right or wrong answers. Use as many or as few
                        groups as you wish.
                    </p>

                    <p>
                        When you put statements in a group, a box will
                        appear under that group. If you would like to, you
                        can give the group a name and a brief explanation
                        there. This is optional.
                    </p>

                    <div id="sort-hint" class="mobile-sort-hint">
                        Tap a statement to select it, then tap a group.
                    </div>

                    <div id="cards-container" class="cards-container">
                        ${cardsHTML}
                    </div>

                    <div class="groups-container">

                        ${groupsHTML}

                        <div class="group" data-group="none">
                            <h3>Does not belong in a group</h3>
                            <div class="group-cards"></div>
                        </div>

                    </div>

                    <p id="sort-warning" class="warning"></p>

                </div>

            `;
        },

        choices: ["Continue"],

        data: {
            vignette: vignette.id,
            scenario_position: vignette.position
        },

        on_load: function() {

            const container = document.querySelector(".card-sort-container");
            const groups = document.querySelectorAll(".group");
            const cardsContainer = document.querySelector("#cards-container");
            const continueButton = document.querySelector(".jspsych-btn");
            const warning = document.querySelector("#sort-warning");
            const hint = document.querySelector("#sort-hint");

            currentAssignments = {};
            currentLabels = {};
            continueButton.disabled = true;

            let draggedCard = null;
            let selectedCard = null;

            const DEFAULT_HINT = "Tap a statement to select it, then tap a group.";
            const SELECTED_HINT = "Statement selected. Now tap the group you want to put it in " +
                                  "(or tap the grey box at the top to un-sort it).";

            // ---------- helpers ----------

            function clearSelection() {
                if (selectedCard) selectedCard.classList.remove("selected");
                selectedCard = null;
                groups.forEach(g => g.classList.remove("selected-target"));
                hint.textContent = DEFAULT_HINT;
            }

            function selectCard(card) {
                clearSelection();
                selectedCard = card;
                card.classList.add("selected");
                groups.forEach(g => g.classList.add("selected-target-ready"));
                hint.textContent = SELECTED_HINT;
            }

            // target is either a .group element or the unsorted #cards-container
            function placeCard(card, target) {
                if (target === cardsContainer) {
                    cardsContainer.appendChild(card);
                    card.classList.remove("group-card");
                } else {
                    target.querySelector(".group-cards").appendChild(card);
                    card.classList.add("group-card");
                }
                update();
            }

            function update() {

                const assignments = {};
                const labels = {};

                groups.forEach(group => {

                    const groupId = group.dataset.group;
                    const groupCards = group.querySelectorAll(".card");

                    groupCards.forEach(card => {
                        assignments[card.dataset.cardId] = {
                            statement: card.dataset.statement,
                            group: groupId
                        };
                    });

                    const labelBox = group.querySelector(".group-labels");

                    if (labelBox) {

                        if (groupCards.length > 0) {

                            labelBox.style.display = "block";

                            const name = labelBox.querySelector(".group-name").value.trim();
                            const explanation = labelBox.querySelector(".group-explanation").value.trim();

                            labels[groupId] = { name: name, explanation: explanation };

                        } else {
                            labelBox.style.display = "none";
                        }

                    }

                });

                currentAssignments = assignments;
                currentLabels = labels;

                const remaining = cardsContainer.querySelectorAll(".card").length;

                if (remaining > 0) {
                    warning.textContent = "Please place every statement in a group before continuing.";
                    warning.style.display = "block";
                    continueButton.disabled = true;
                } else {
                    warning.style.display = "none";
                    continueButton.disabled = false;
                }

            }

            // ---------- tap / click to sort (touch + mouse) ----------

            container.addEventListener("click", function(event) {

                // Let people type in the name/explanation boxes without triggering a move
                if (event.target.closest(".group-labels")) return;

                const tappedCard = event.target.closest(".card");
                const tappedGroup = event.target.closest(".group");
                const tappedUnsorted = event.target.closest("#cards-container");

                // 1. Nothing selected yet: tapping a card selects it
                if (!selectedCard) {
                    if (tappedCard) selectCard(tappedCard);
                    return;
                }

                // 2. Tapping the already-selected card deselects it
                if (tappedCard && tappedCard === selectedCard) {
                    clearSelection();
                    return;
                }

                // 3. A card is selected and a destination was tapped: move it
                if (tappedGroup) {
                    placeCard(selectedCard, tappedGroup);
                    clearSelection();
                } else if (tappedUnsorted) {
                    placeCard(selectedCard, cardsContainer);
                    clearSelection();
                }

            });

            // ---------- drag and drop (desktop mouse only) ----------

            // Touch devices use tap-to-sort; turning draggable on there can
            // interfere with scrolling and taps.
            const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;

            if (!isTouchDevice) {

                document.querySelectorAll(".card").forEach(card => {

                    card.setAttribute("draggable", "true");

                    card.addEventListener("dragstart", function(event) {
                        clearSelection();
                        draggedCard = card;
                        event.dataTransfer.effectAllowed = "move";
                        event.dataTransfer.setData("text/plain", card.dataset.cardId);
                        setTimeout(() => { card.style.opacity = "0.4"; }, 0);
                    });

                    card.addEventListener("dragend", function() {
                        card.style.opacity = "1";
                        draggedCard = null;
                    });

                });

                cardsContainer.addEventListener("dragover", function(event) {
                    event.preventDefault();
                });

                cardsContainer.addEventListener("drop", function(event) {
                    event.preventDefault();
                    if (draggedCard) placeCard(draggedCard, cardsContainer);
                });

                groups.forEach(group => {

                    group.addEventListener("dragover", function(event) {
                        event.preventDefault();
                        event.dataTransfer.dropEffect = "move";
                        group.classList.add("drag-over");
                    });

                    group.addEventListener("dragleave", function() {
                        group.classList.remove("drag-over");
                    });

                    group.addEventListener("drop", function(event) {
                        event.preventDefault();
                        group.classList.remove("drag-over");
                        if (draggedCard) placeCard(draggedCard, group);
                    });

                });

            }

            document.querySelectorAll(".group-name, .group-explanation").forEach(field => {
                field.addEventListener("input", update);
            });

            update();

        },

        on_finish: function(data) {
            data.card_assignments = currentAssignments;
            data.group_labels = currentLabels;
        }

    };

}
