const jsPsych = initJsPsych({
    display_element: 'jspsych-target',
    on_finish: function() {
        console.log("FULL DATA:", jsPsych.data.get().csv());
    }
});

// consent form

const consent = {
    type: jsPsychHtmlButtonResponse,

    stimulus: `
        <div class="consent-container">

            <h1>Investigating Types of Victim-Blaming Language</h1>

            <h2>Invitation to Participate</h2>

            <p>
                You are being invited to take part in a research study to identify
                different types of victim-blaming language. Before you decide,
                it is important for you to understand why the research is being
                done and what it will involve.
            </p>

            <p>
                Please take time to read the following information carefully and
                discuss it with others if you wish before you decide whether or
                not you want to take part in the study.
            </p>

            <h2>What is the purpose of the research?</h2>

            <p>
                Victim blaming is often discussed as a single phenomenon, but
                people may blame victims in many different ways. This study seeks
                to identify whether individuals recognise different patterns or
                types of victim-blaming arguments and whether there is agreement
                about how these arguments should be grouped.
            </p>

            <h2>Do I have to take part?</h2>

            <p>
                It is up to you to decide whether or not to take part. You can
                withdraw from the study at any time during the study by closing
                the survey.
            </p>

            <p>
                Once you have completed the study you cannot withdraw since no
                personal data will be collected to identify you and your answers.
            </p>

            <h2>What will I have to do?</h2>

            <p>
                You will be asked to read a series of small scenarios about
                victims making allegations of inappropriate behaviour and then
                group different statements based on if you think they are making
                the same kind of argument.
            </p>

            <h2>What are the possible risks or benefits of taking part?</h2>

            <p>
                The scenarios describe sexually inappropriate behaviour and
                victim-blaming statements which may be upsetting to some.
                At the end of the survey we provide sources of support you
                can access.
            </p>

            <p>
                We hope that by participating we will be able to identify
                different types of victim-blaming language.
            </p>

            <h2>Data Protection and Confidentiality</h2>

            <p>
                Personal data is any data that can lead to the identification
                of a specific (living) person.
            </p>

            <p>
                It can be obviously identifiable data such as name or ID number,
                but it can also be a combination of "innocent" data such as age,
                height/weight, wealth, job position, company, city, etc. that
                when combined can lead to the identification of a person.
            </p>

            <p>
                Personal data (e.g., your name, email address, voice or any data
                that can identify you) <strong>WILL NOT</strong> be processed
                (collected) by this study and your confidentiality will be
                protected.
            </p>

            <h2>What will happen to the results of the research study?</h2>

            <p>
                The results of the research study will be used to inform a
                taxonomy of victim-blaming language.
            </p>

            <h2>Who has reviewed the study?</h2>

            <p>
                The study has received full ethical clearance from the Research
                Ethics Committee who reviewed the study. The committee is the
                Psychology Ethics Committee.
            </p>

            <h2>Contact for further information</h2>

            <p>
                If you require further information or have any questions,
                please contact:
            </p>

            <p>
                <strong>Ruth Spence</strong><br>
                <a href="mailto:r.spence@mdx.ac.uk">
                    r.spence@mdx.ac.uk
                </a>
            </p>

            <hr>

            <div class="consent-choice">
                <label>
                    <input type="checkbox" id="consent-checkbox">
                    I have read and understood the information above and I
                    freely and voluntarily give my consent to participate in
                    this study.
                </label>
            </div>

        </div>
    `,

    choices: ["I consent and wish to continue"],

    on_load: function() {

        const checkbox = document.getElementById("consent-checkbox");
        const button = document.querySelector(".jspsych-btn");

        button.disabled = true;

        checkbox.addEventListener("change", function() {
            button.disabled = !checkbox.checked;
        });

    },

    on_finish: function(data) {
        data.consent = true;
    }

};

// demographics

const demographics = {

    type: jsPsychSurveyHtmlForm,

    preamble: `
        <div class="instructions">
            <h2>About You</h2>
            <p>Please answer the following questions.</p>
        </div>
    `,

    html: `

        <p><strong>2. Are you</strong></p>

        <p>
            <label>
                <input type="radio" name="gender" value="Male" required>
                Male
            </label>
        </p>

        <p>
            <label>
                <input type="radio" name="gender" value="Female">
                Female
            </label>
        </p>

        <p>
            <label>
                <input type="radio" name="gender" value="Other">
                Other
            </label>
        </p>

        <p>
            <label>
                <input type="radio" name="gender" value="Prefer not to say">
                Prefer not to say
            </label>
        </p>

        <hr style="margin: 30px 0;">

        <p>
            <label for="age">
                <strong>3. What age are you?</strong>
            </label>
        </p>

        <p>
            <input
                id="age"
                name="age"
                type="text"
                inputmode="numeric"
                maxlength="3"
                pattern="(1[89]|[2-9][0-9]|1[01][0-9]|120)"
                title="Please type your age as a number (18 or over)"
                required
                style="width: 150px; padding: 10px; font-size: 16px;"
            >
        </p>

    `,

    button_label: "Continue"

};

// general task instructions 

const generalInstructions = {

    type: jsPsychHtmlButtonResponse,

    stimulus: `
        <div class="instructions">

            <h2>Card Sorting Task</h2>

            <p>
                Victim blaming occurs when people suggest the victim of an
                abusive or traumatic experience is responsible for some or
                all of the harm they have experienced. However, people can
                blame victims in different ways. For example, they may focus
                on different aspects of the victim's behaviour, other
                people's actions, or the circumstances of the event.
            </p>

            <p>
                In this study, you will read short descriptions of situations
                in which someone experiences harm. Each situation is followed
                by a set of statements that blame the victim or excuse the
                perpetrator in some way.
            </p>

            <p>
                <strong>
                    All the examples you will see are victim blaming. Your
                    job is to group and classify the type of victim blaming.
                </strong>
                Please focus on the type of reasoning each statement uses.
                Place statements together when you think they are making a
                similar argument or drawing attention to a similar factor.
            </p>

            <p>
                There are no right or wrong answers. Different people may
                group the statements in different ways. You may use
                <strong>as many or as few of the four groups</strong> as you
                wish, and you may place a statement in
                <strong>"Does not belong in a group"</strong>.
            </p>

            <p>
                As you sort, a box will appear under each group you use.
                If you would like to, you can give each group a name and a
                brief explanation of what its statements have in common. This
                is optional. You will repeat this task for four different
                scenarios.
            </p>

        </div>
    `,

    choices: ["Begin"]

};

// vignette data

const vignettes = [

    {
        id: "sarah",
        title: "Scenario 1",
        scenario: `
            <p>
                Sarah, a junior employee, went out drinking with her manager
                and colleagues after work. She got drunk and stayed out after
                the rest of her colleagues went home. At the end of the night
                she went to her manager's flat. When there, Sarah flirted
                with her manager but said no when he tried to kiss her. She
                stayed at the flat and continued drinking, later in the
                evening her manager forced her to have sex. Sarah did not
                tell anyone at work what had happened and continued working
                with her manager and going out for office drinks. She was
                later promoted and started going out with one of her new
                colleagues. Shortly after she reported the incident to
                police.
            </p>
        `,
        statements: [
            "She shouldn't have drank so much",
            "She shouldn't have flirted with him",
            "She shouldn't have gone back to his flat",
            "If it was so bad, why did she continue to work with him afterwards",
            "If it happened why did she not report it at the time",
            "If it was really that bad, she would have said something after",
            "She's doing this for attention",
            "Maybe she didn't get the promotion she wanted",
            "She's doing this so she can't get fired for her poor job performance"
        ]
    },

    {
        id: "lisa_mark",
        title: "Scenario 2",
        scenario: `
            <p>
                Lisa and Mark were married for eight years and had two
                children together. Throughout the relationship, Lisa says
                that Mark frequently controlled household finances,
                monitored where she went by installing spyware, and became
                angry when she spent any time with friends or family without
                him.
            </p>
            <p>
                After the relationship ended, Lisa applied to the family
                court, stating that Mark's behaviour had been emotionally
                abusive. In court Lisa sometimes cried and sometimes got
                confused as she described feeling frightened of upsetting
                him. She said she gradually stopped seeing many of her
                friends because she was afraid of what he would do. Mark
                denied the allegations and said that he had simply been
                trying to support and protect his family. Following the
                court case, several people discussed Lisa's claims online.
            </p>
        `,
        statements: [
            "Lisa sounds paranoid",
            "Lisa is not emotionally stable",
            "Lisa needs counselling more than a court case",
            "Women always make these kinds of accusations during custody disputes",
            "Divorced women always want revenge",
            "Mothers frequently exaggerate problems with fathers",
            "She's remembering it wrong and decided it was abuse",
            "She has convinced herself she was experiencing abuse",
            "She's misinterpreted Mark's support as abuse"
        ]
    },

    {
        id: "rachel",
        title: "Scenario 3",
        scenario: `
            <p>
                Rachel attended university between 2010 and 2013. During her
                second year, she says that a lecturer repeatedly made sexual
                comments, sent inappropriate messages, and pressured her into
                meeting him alone. At the time, Rachel did not make a formal
                complaint. More than ten years later, after seeing other
                former students share similar experiences online, she came
                forward and reported what had happened.
            </p>
        `,
        statements: [
            "She is making a big deal out of something minor",
            "What happened wasn't very serious",
            "It was just awkward behaviour, not as bad as abuse",
            "Lots of lecturers behaved like that back then",
            "Unfortunately, things like this happened all the time at universities",
            "That kind of behaviour is pretty common in academia",
            "He's a completely different person these days",
            "People shouldn't be judged forever for things they did when they were younger",
            "Whatever happened is in the past and should be left there, he's not the same person now"
        ]
    },

    {
        id: "david_hannah",
        title: "Scenario 4",
        scenario: `
            <p>
                David and Hannah were together for six years and had a young
                daughter. They argued frequently and Hannah says David
                frequently shouted at her, controlled household finances, and
                on several occasions damaged property during arguments.
            </p>
            <p>
                After they separated, Hannah reported the incidents to the
                police and later described the relationship as abusive. She
                said after David lost his job, on one occasion during an
                argument he pushed her against a wall. David denied being
                abusive and said the relationship had been difficult for both
                of them.
            </p>
        `,
        statements: [
            "David is a great guy who has contributed a lot to the local community",
            "I can't believe David hurt her, he volunteers and helps other people",
            "David isn't like that, he is a devoted father",
            "These allegations have ruined David's reputation",
            "David is the real victim in all of this",
            "David's life has been destroyed by these allegations",
            "David was under a lot of stress at the time",
            "David had lost his job and wasn't coping well",
            "David was overwhelmed by everything that was happening",
            "They both made mistakes during the relationship",
            "They were both hurting each other",
            "You can't put all the blame on David, it takes two to argue"
        ]
    }

];

// card sort and group naming

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
                        Drag each statement into a group. There are no right
                        or wrong answers. Use as many or as few groups as you
                        wish.
                    </p>

                    <p>
                        When you put statements in a group, a box will
                        appear under that group. If you would like to, you
                        can give the group a name and a brief explanation
                        there. This is optional.
                    </p>

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

            const groups = document.querySelectorAll(".group");
            const cardsContainer = document.querySelector("#cards-container");
            const continueButton = document.querySelector(".jspsych-btn");
            const warning = document.querySelector("#sort-warning");

            currentAssignments = {};
            currentLabels = {};
            continueButton.disabled = true;

            let draggedCard = null;

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

            document.querySelectorAll(".card").forEach(card => {

                card.setAttribute("draggable", "true");

                card.addEventListener("dragstart", function(event) {
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

            // dropping back on the unsorted area
            cardsContainer.addEventListener("dragover", function(event) {
                event.preventDefault();
            });

            cardsContainer.addEventListener("drop", function(event) {
                event.preventDefault();
                if (draggedCard) {
                    cardsContainer.appendChild(draggedCard);
                    draggedCard.classList.remove("group-card");
                }
                update();
            });

            // dropping into a group
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
                    if (draggedCard) {
                        group.querySelector(".group-cards").appendChild(draggedCard);
                        draggedCard.classList.add("group-card");
                    }
                    update();
                });

            });

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

// build block for one vignette

function createVignetteBlock(vignette) {
    return [ createCardSortTrial(vignette) ];
}

// debrief

const debrief = {

    type: jsPsychHtmlButtonResponse,

    stimulus: `
        <div class="instructions">

            <h2>Debrief</h2>

            <p>Thank you for taking part in this study.</p>

            <p>
                The aim of this research is to better understand how people
                perceive and organise different forms of victim-blaming
                language. Victim blaming is often discussed as a single
                phenomenon, but people may blame victims in many different
                ways. This study seeks to identify whether individuals
                recognise different patterns or types of victim-blaming
                arguments and whether there is agreement about how these
                arguments should be grouped.
            </p>

            <p>
                In this study, you were presented with scenarios involving
                harm and a series of statements that blamed the victim or
                reduced the responsibility of the perpetrator. These
                statements were created for research purposes and do not
                necessarily reflect the views of the researchers. We were
                interested in how participants grouped the statements
                according to the kind of reasoning they appeared to use.
                Your responses will help us understand the structure of
                victim-blaming beliefs and language.
            </p>

            <p>
                If you found the scenarios or statements upsetting because
                they included references to sexual violence, abuse, or other
                harmful experiences you may wish to seek support from a
                specialist support organisation:
            </p>

            <ul>
                <li>
                    <a href="https://womensaid.org.uk/information-support/" target="_blank" rel="noopener noreferrer">
                        Women's Aid &mdash; information and support on domestic abuse
                    </a>
                </li>
                <li>
                    <a href="https://rapecrisis.org.uk/get-help/" target="_blank" rel="noopener noreferrer">
                        Rape Crisis England &amp; Wales &mdash; get help after rape or sexual assault
                    </a>
                </li>
                <li>
                    <a href="https://www.victimsupport.org.uk/help-and-support/" target="_blank" rel="noopener noreferrer">
                        Victim Support &mdash; help and support
                    </a>
                </li>
            </ul>

            <p>
                You can also contact the researcher
                <a href="mailto:r.spence@mdx.ac.uk">r.spence@mdx.ac.uk</a>
                if you have any questions or comments.
            </p>

            <p>Thank you again for your time and contribution to this research.</p>

        </div>
    `,

    choices: ["Close"]

};

// randomized scenario order

const shuffledVignettes = jsPsych.randomization.shuffle(vignettes).map((v, i) => {
    return Object.assign({}, v, {
        title: "Scenario " + (i + 1),   // numbered by position shown, not by identity
        position: i + 1
    });
});

// timeline

const timeline = [

    consent,
    demographics,
    generalInstructions,

    ...shuffledVignettes.flatMap(createVignetteBlock),

    debrief

];

// run

jsPsych.run(timeline);