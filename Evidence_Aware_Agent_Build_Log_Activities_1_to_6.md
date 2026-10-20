# Build with AI: AI Builder's Operating Kit

## Build Log: Activities 1 to 6

**Working project:** Evidence-Aware AI Research Agent with Selective Recovery  

**Theme:** AI and Developer Tools  

**Team:** 2 to 4 people | **Time window:** 1 to 2 weeks | **Current skills:** Agentic AI and APIs

> **Evidence and completion note:** This document completes the draft work that can be prepared from the project context and cited public sources. It does not invent participants, interviews, user findings, test outcomes, or deployment results. Items that require real-world evidence are clearly marked PENDING. Technical stack, API provider, exact tool-call budget, sample size, and numerical success thresholds remain open for approval.


---


# Activity 1: Define my problem statement

Status: WORKING DRAFT. The theme and initial scope were approved for planning. User demand and problem severity have not been validated by interviews.

## 1.1 My theme

My registered HackFront Innovation Theme is AI and Developer Tools.

## 1.2 My problem statement, version 1

AI developers who build multi-step research agents need a way to check whether important generated claims are actually supported by retrieved sources, especially when evidence is incomplete or sources disagree. Today they may rely on manual source opening, citation review, evaluation frameworks, and repeated searches; I have not yet confirmed which methods my target users use or where those methods fall short. When checks are slow or incomplete, they may add review effort or allow unsupported statements to remain in an output; the frequency and cost of this outcome are assumptions I still need to test. As research agents perform more multi-step retrieval and synthesis, I want to test whether evidence-aware selective recovery can improve claim support without excessive tool usage.

## 1.3 My intended solution direction

I plan to build a small web prototype that turns a research question into a set of sourced claims, links each claim to relevant source passages, and marks evidence as supported, unsupported, potentially contradicted, or unresolved. When evidence is missing or weak, the agent will propose or perform a targeted recovery action, or stop when its approved research limits are reached; I will compare it with a baseline and record both quality and tool usage.

## 1.4 My task leverage map

| Task | AI work mode | How I would use AI | Human check |

| --- | --- | --- | --- |

| 1. Identify target user needs and sharpen the problem | Augmentation | Generate interview prompts and possible problem framings. | I decide the target user and revise the problem using real interviews. |

| 2. Conduct desk research and map prior work | Augmentation | Find and summarize papers, docs, and related tools. | I inspect original sources and label claims by evidence status. |

| 3. Retrieve source pages or a bounded source set | Automation | Fetch known URLs or search results using defined inputs. | I choose permitted sources and check retrieval failures. |

| 4. Extract substantive claims and relevant evidence passages | Automation | Propose claim units and candidate supporting excerpts. | I inspect examples and reject false claim-to-source links. |

| 5. Assess claim support and possible contradiction | Augmentation | Suggest a support status with a quoted rationale. | I verify statuses against a manually checked reference set. |

| 6. Choose a targeted recovery action or stop | Agency, bounded | Handle the multi-step recovery objective within approved limits. | I approve the policy and inspect whether recovery helped. |

| 7. Compare baseline and recovery-enabled outputs | Augmentation | Calculate metrics and summarize differences. | I validate the calculations and interpret limitations. |

| 8. Compile the final report and trace record | Automation | Format claim records, citations, and evaluation output. | I approve every conclusion that leaves the project. |



## 1.5 Decisions I will not delegate to AI

- **Problem and user selection:** I will decide which user problem deserves work after considering participant evidence, not because AI ranks it first.

- **Evidence acceptance:** I will decide whether a central claim is sufficiently supported for the final report. AI can flag and explain, but not self-certify its own output.

- **Release and scope decisions:** I will approve exclusions, success criteria, and whether the prototype is ready to demonstrate.



# Activity 2: Run a 4D check and map delegation

Status: DRAFT COMPLETE FOR THE CURRENT REAL TASK. I have used the actual work of preparing this project's research plan, source review, and interview materials as the task for this week.

## 2.1 My real task this week

My task is to prepare a defensible research plan for my evidence-aware AI research agent, including a research brief, an interview worksheet, source verification, and the first version of my Build Log. The decision this work should inform is whether evidence-aware selective recovery is a useful and feasible contribution for my project.

## 2.2 My 4D check

| 4D decision | What I delegated or kept | How I applied it |

| --- | --- | --- |

| Delegation | I delegated first drafts, source discovery, interview question structure, comparison tables, and document organization. I kept project selection, the target user choice, the scope approval, and the decision to accept evidence. | AI can draft and organize. I remain responsible for deciding which problem to solve and which claims I can defend. |

| Description | I supplied the theme, my project idea, 1 to 2 week limit, 2 to 4 person team, agentic AI/API skills, intended first-person voice, and instruction not to invent findings. | The context and constraints made the output more specific than a generic request for an AI project. |

| Discernment | I compared output with the six activity requirements and checked source claims against original publications or official documentation. | I treat an AI summary as a pointer to evidence, not as evidence itself. I distinguish published results from my own hypothesis. |

| Diligence | Before submitting, I must recheck citations, formulas, assumptions, privacy, and every line that sounds like a completed interview or test. | The deliverable must mark interview findings, experiment results, and stranger-test results as pending until they exist. |



## 2.3 Ownership of my Activity 1 tasks

| Task | Ownership | Reason |

| --- | --- | --- |

| 1. Target user needs and problem framing | Shared | AI can suggest questions. I need actual users and must decide what their evidence means. |

| 2. Desk research and related-work map | Shared | AI can find and summarize sources. I must open original sources and judge relevance. |

| 3. Source retrieval | AI-led, with my limits | Once configured, retrieval can run from a defined query or list. I choose the source policy and budget. |

| 4. Claim and passage extraction | Shared | AI can propose claim units and passages; I must inspect extraction quality. |

| 5. Claim support and contradiction assessment | Shared | AI can suggest a status and rationale; human review is needed for evaluation labels and important claims. |

| 6. Recovery choice and stopping | Shared | The agent may select a bounded action, but I define, approve, and evaluate the policy. |

| 7. Baseline comparison | Shared | AI can calculate and summarize. I verify calculations and report uncertainty. |

| 8. Final report and trace record | AI-led drafting, me-led approval | AI can format and draft the report; I own the claims and final submission. |



## 2.4 Tasks I cannot evaluate yet

- I cannot judge the accuracy of the claim verifier until I learn how to create or annotate a small reference set with supporting passages and expected labels.

- I cannot judge whether recovery is cost-effective until I can record a baseline and a recovery-enabled run on comparable questions.

- I cannot judge user value until I complete real conversations with developers who match my target group.



## 2.5 My three review points

1. **After source and claim extraction:** I will manually inspect sample claims, URLs, and evidence snippets before trusting support labels.

1. **After baseline and recovery runs:** I will check the scoring method, unsupported claims, tool-call counts, and API cost calculations before comparing versions.

1. **Before demo or submission:** I will run the break tests, complete two stranger tests if participants are available, and verify that the report does not overstate the results.




---


# Activity 3: Brief well, then verify

Status: BRIEF AND SOURCE CHECK PREPARED. The live user research output and some follow-up facts remain pending.

## 3.1 The research question I need answered

For developers who build AI research agents, what problems do they encounter when checking whether generated claims are supported by sources, what workarounds do they use, and what time or quality consequences do they report?

## 3.2 My six-part research brief

| Part | My brief |

| --- | --- |

| Context | I am investigating evidence support and recovery in multi-step AI research agents. My target users are developers who build or test research workflows that use external sources. I have not yet established that the problem is frequent or costly for these users. |

| Objective | I want to establish whether claim-level evidence gaps are a meaningful user problem, understand existing alternatives, and identify a specific gap my prototype can test. |

| Task | I will review original research and official tool documentation, compare claim verification and budgeted search approaches, interview developers about past events, and record supported claims and unresolved questions. |

| Constraints | I have 1 to 2 weeks and a team of 2 to 4. I will not invent user findings or statistics. API provider, stack, exact tool-call budget, sample size, and numerical success thresholds remain open. |

| Output | I will produce a source-backed findings table, related-work comparison, tagged claim register, one original-source verification record, interview notes, and a list of remaining evidence gaps. |

| Success criteria | Important factual claims must link to original sources or be marked unverified; one selected claim must be checked against its source; numerical claims must be recalculated where data permit; and evidence must remain separate from inference, hypothesis, and assumption. |



## 3.3 Original-source verification example

Claim I checked: Gao, Yen, Yu, and Chen's ALCE paper reports that, on the ELI5 dataset used in their experiments, even the best tested models lacked complete citation support 50% of the time.

Original source: Gao et al. (2023), “Enabling Large Language Models to Generate Text with Citations,” Proceedings of EMNLP 2023. https://aclanthology.org/2023.emnlp-main.398/

My verification steps: I opened the ACL Anthology paper record, read the abstract, and checked that the statement matches the authors' reported result. The claim is supported as a report of what the paper says. I did not independently reproduce the benchmark experiment, and I will not present the 50% result as a universal rate for all research agents.

Status: SUPPORTED AS AN AUTHOR-REPORTED FINDING. Type: Evidence. Confidence: High that the source reports this result; no claim is made here that I independently replicated it.

## 3.4 Tagged claim register

| Claim | Type | Status and source | What I will do |

| --- | --- | --- | --- |

| ALCE reports incomplete citation support for 50% of the best systems' outputs on ELI5 in its tested setting. | Evidence | Supported as an author-reported result. ACL Anthology: https://aclanthology.org/2023.emnlp-main.398/ | Keep scope attached; do not generalize to all systems. |

| DEER includes verification for cited and uncited claims in deep research reports. | Evidence | Supported by PMLR paper record: https://proceedings.mlr.press/v306/han26m.html | Use to describe existing work and refine differentiation. |

| Ragas faithfulness measures whether response claims are supported by retrieved context. | Evidence | Supported by official Ragas documentation: https://docs.ragas.io/en/latest/concepts/metrics/available_metrics/faithfulness/ | Assess whether it can help evaluate the prototype. |

| Developers may spend time manually checking claim-to-source support. | Assumption | Not established for my target users. | Ask for a recent example in interviews. |

| Evidence-gap-conditioned recovery can improve claim support without excessive tool usage. | Hypothesis | Not tested. | Compare baseline and recovery-enabled runs. |

| Claim-level verification by itself is not a unique contribution. | Inference | Existing examples include ALCE, DEER, and Ragas; novelty has not been exhaustively searched. | Review related work and avoid novelty claims until then. |

| AI developers are willing to adopt or pay for my tool. | Assumption | Not tested. | Ask about current budgets, alternatives, and purchasing or adoption behavior. |

| A constrained recovery policy may stop unproductive searches earlier. | Hypothesis | Not tested. | Record action choices, outcome, calls, time, and unresolved claims. |



## 3.5 Raw output record

> PENDING: I must preserve the actual unedited AI research response used for this activity. This build log contains my current source-backed synthesis, not a verbatim capture of a separate model run. Before submission, I will paste the actual raw output here or append it as a file, then keep my corrections separate.



---


# Activity 4: Unwind my idea and challenge assumptions

Status: HYPOTHESIS-BASED DRAFT. I have not completed the developer interviews, so this analysis must be revisited after real evidence is collected.

## 4.1 My Five Whys chain

| Why | My provisional answer | Evidence status |

| --- | --- | --- |

| 1. Why am I considering an evidence-aware research agent? | I want to reduce the risk that important claims in AI research outputs remain unsupported or poorly traceable. | Project objective, not yet a validated user need. |

| 2. Why might important claims remain unsupported? | A citation may be topically relevant while not directly supporting the specific claim, or the report may include uncited claims. | Supported as a known evaluation concern in published work; frequency in my user group is unknown. |

| 3. Why might this survive a normal research workflow? | The workflow may track sources or final citations without retaining a clear claim-to-passage relationship for every important statement. | Hypothesis to test by examining actual workflows and tools. |

| 4. Why might a system not recover the gap properly? | The system may retry broadly, continue searching without a clear decision rule, or finish despite insufficient evidence. | Hypothesis; not yet observed in my target users' systems. |

| 5. Why is this worth solving as a developer tool? | A policy that links evidence state to a bounded recovery action may improve claim support while controlling extra calls and review effort. | Research hypothesis, not an established result. |



Research item arising from the chain: I need to inspect real developer workflows and recent failure cases to learn whether the main problem is claim-to-evidence traceability, source retrieval, verifier accuracy, or recovery policy. I should not build around a presumed root cause before this investigation.

## 4.2 Two reframes

| Reframe | How I would challenge the brief | What it exposes |

| --- | --- | --- |

| Disbeliever | I would argue that experienced developers already click through citations, use evaluation frameworks, and inspect traces. A new tool may add another dashboard without reducing meaningful work. | I need evidence of a concrete failure or measurable burden, and I must compare against existing tools and workarounds. |

| Transplant from incident response | I would treat each unsupported claim like a small incident: record severity and evidence state, select a targeted recovery action, keep an audit trail, and close only when evidence is sufficient or the budget is exhausted. | This reframes the product around a controlled decision policy and traceable outcomes rather than a generic research chat UI. |



## 4.3 Two critic objections

| Critic | Strongest objection | My response to test, not assume |

| --- | --- | --- |

| Target user | I can already inspect sources manually or use an evaluation library. I do not need another interface unless it cuts real work or catches mistakes that my current workflow misses. | I will ask the developer to walk through a recent event, show the current process where possible, and identify an actual limitation. |

| Technical lead or competitor | An LLM verifier may itself make mistakes, and each verification/recovery step increases latency and cost. Existing tools already offer faithfulness or research-report evaluation. | I will compare a baseline and recovery policy, retain supporting passages for review, report failure cases, and compare the added quality with measured cost. |



## 4.4 My three highest-risk assumptions and 48-hour tests

| Rank | Assumption | 48-hour test I propose | Evidence that would change my view |

| --- | --- | --- | --- |

| 1 | Target developers have meaningful evidence-verification failures or costs. | Contact five actual prospects from my technical network; seek 2 to 3 interviews; ask about a recent incident, workaround, and consequence. | If examples are rare, low impact, or already handled well, I will narrow or change the problem. |

| 2 | A recovery decision based on evidence gaps can improve outcomes compared with an otherwise comparable baseline. | Prepare a small manually checked set of questions and source excerpts; compare baseline and recovery-enabled runs, recording support status and tool usage. Exact sample size remains open. | If recovery does not resolve gaps or consistently costs more than the value it adds, I will revise the policy or claim of value. |

| 3 | My available retrieval and model APIs can provide usable source text and evidence records within the deadline. | Run a small feasibility test on several representative questions or fixed source pages, and record failed retrievals, extraction issues, and time. | If external search is unreliable or too slow, I will consider a fixed source set for the first experiment, subject to approval. |



## 4.5 My problem statement, version 2

I am investigating whether developers who build multi-step AI research agents lose time or risk producing unsupported statements because their workflows do not consistently connect each important claim to the source passage that supports it. I also want to test whether current recovery behavior handles missing or conflicting evidence in a targeted way, rather than repeating broad searches or stopping too early. I will validate the problem with developer interviews and compare a baseline with an evidence-aware recovery policy before claiming that this approach improves quality or cost.

> Version 2 is still provisional. I will revise it after interview evidence. I will retain version 1 in my Build Log to show what changed and why.



---


# Activity 5: Build my product-market-fit case

Status: HYPOTHESIS AND RESEARCH PLAN COMPLETE. The five named prospects, interview findings, validated substitute costs, and numerical opportunity estimate are pending real data.

## 5.1 My falsifiable product hypothesis

| Element | My working hypothesis |

| --- | --- |

| User | AI developers who build or evaluate multi-step research agents that retrieve external sources and generate source-backed reports. |

| Situation | They review a report whose claims may be unsupported, whose sources disagree, or whose retrieval steps have failed. |

| Outcome they care about | They want to identify unsupported claims, retain traceable evidence, resolve important gaps, and understand the extra work or cost. |

| Current alternative | Manual source opening, existing faithfulness/citation evaluation tools, test scripts, rerunning search, or accepting unresolved claims. Which alternatives are actually used must be checked in interviews. |

| My possible edge | I would connect each claim to evidence and select a targeted recovery action based on the detected gap, while recording when the agent stops and the tool usage. I must show this adds value beyond existing approaches. |



Falsifiable form: On a manually reviewed, comparable set of research questions, my evidence-aware recovery version will improve claim-support or citation-correctness measures over a baseline while staying within an approved tool-use limit. The actual sample size and success thresholds are not set yet.

## 5.2 My initial Ideal Customer Profile (ICP)

My ICP is a developer or research engineer who has built or evaluated an LLM application that performs multi-step research or retrieval over external sources, generates claims with citations, and can describe or show how evidence quality is checked. I should be able to contact this person through my existing technical network and ask about a specific recent workflow.

| Slot | Real name | Evidence of ICP fit | How I know/reach them | Status |

| --- | --- | --- | --- | --- |

| P01 | PENDING: enter a real person | PENDING | PENDING | Not contacted |

| P02 | PENDING: enter a real person | PENDING | PENDING | Not contacted |

| P03 | PENDING: enter a real person | PENDING | PENDING | Not contacted |

| P04 | PENDING: enter a real person | PENDING | PENDING | Not contacted |

| P05 | PENDING: enter a real person | PENDING | PENDING | Not contacted |



> I have not been given five real names and will not invent them. Before treating this requirement as complete, I must fill these slots with actual people who match the ICP. Keep personal contact details in the private tracker, not the public Build Log.


## 5.3 My current substitute and its costs

Substitutes I will ask about include manual clicking through citations, checking source passages, custom evaluation scripts, Ragas faithfulness scoring, existing research-report evaluation methods, rerunning search, and leaving uncertain claims unresolved. I have not yet confirmed which of these my target users actually use.

| Possible cost | How I will measure it | Status |

| --- | --- | --- |

| Manual review time | Ask the participant to estimate or reconstruct time for a recent concrete task. Record whether the number is observed or recalled. | Unknown |

| Extra search/retry cost | Count tool calls and record API usage for a reproducible test, where available. | Pending experiment |

| Missed claim error | Record what the claim affected and how the participant discovered it. Do not assign a monetary value without evidence. | Pending interview |

| Existing tool cost | Record tool name, current paid tier or actual spend only if participant knows and is comfortable sharing. | Pending interview |



## 5.4 My interview notes, to be filled after real conversations

| Field | Interview 1 | Interview 2 | Interview 3 |

| --- | --- | --- | --- |

| Participant code | PENDING | PENDING | PENDING |

| Relevant experience | PENDING | PENDING | PENDING |

| Recent past incident | PENDING: use actual notes only | PENDING: use actual notes only | PENDING: use actual notes only |

| Current workaround | PENDING | PENDING | PENDING |

| Time/cost/consequence | PENDING | PENDING | PENDING |

| Contradiction to my assumption | PENDING | PENDING | PENDING |

| Quote or observed behavior, with consent and no sensitive details | PENDING | PENDING | PENDING |

| Follow-up question | PENDING | PENDING | PENDING |



I will use past-behaviour questions such as: “Tell me about the last time a research agent returned a citation that you had to check. What did you do next?” I will not count hypothetical intent such as “I would use this” as proof of demand.

## 5.5 My mechanism

I will maintain a claim-evidence ledger that stores each important claim with source URLs, relevant passages, and an evidence status. When a claim is unsupported, contradicted, or blocked by a failed retrieval, the agent will choose a targeted next action or stop and mark the claim unresolved, then record the result and tool usage.

## 5.6 My opportunity sizing, with source-backed context

I do not yet have enough evidence to state a defensible addressable market value. The 2025 Stack Overflow Developer Survey received more than 49,000 responses from 177 countries; the survey summary reports that 31% of respondents currently use AI agents, and the official survey press release reports that 46% do not trust the accuracy of AI tool output. These are broad developer-survey context figures, not a count of developers who build research agents or a measure of willingness to pay. Sources: https://survey.stackoverflow.co/2025/ai and https://stackoverflow.co/company/press/archive/stack-overflow-2025-developer-survey/

| Sizing input | How I will ground it | Current status |

| --- | --- | --- |

| N: findable qualified users or teams | Count identifiable developers or teams matching my ICP in a defined channel or community. Start with the five real prospects, then expand only using traceable sources. | Not counted yet; names and reachable pool pending. |

| P: realistic annual price or value per user/team | Compare observed competitor pricing, current spend, and actual willingness-to-pay evidence. I must first decide whether the intended route is open source, paid individual use, or team use. | Business model and price open. |

| A: realistic adoption share | Build conservative/base/high assumptions only after I have a defined N and evidence about access, need, and adoption barriers. Label assumptions explicitly. | No defensible estimate yet. |

| Opportunity estimate | Annual opportunity = N × P × A, with each input supported by a source or tagged as an assumption. | No numeric market estimate published until inputs are grounded. |



> This is an explicit evidence gap, not a completed market-size estimate. I will not multiply the global developer population by an invented price or adoption share. If I choose an open-source tool, I may need an adoption or usage estimate rather than revenue sizing.


## 5.7 My initial Insight Ledger

| Insight | Origin | Type and confidence | Consequence for my project |

| --- | --- | --- | --- |

| ALCE reports that even the best models tested lacked complete citation support 50% of the time on ELI5 in its experimental setting. | Gao et al. (2023), ACL Anthology. https://aclanthology.org/2023.emnlp-main.398/ | Sourced evidence. High confidence that the paper reports this finding; not a universal failure rate. | I should measure claim support directly and keep dataset and evaluation scope visible. |

| DEER includes claim verification for both cited and uncited claims in deep research reports. | Han et al. (2026), PMLR. https://proceedings.mlr.press/v306/han26m.html | Sourced evidence. High confidence about the described framework; I have not independently replicated it. | My possible contribution must go beyond the general idea of claim verification and examine recovery decisions. |

| Budget-constrained agentic search research reports that accuracy can improve with additional searches up to a small cap in its tested settings. | McCleary and Ghawaly (2026), LREC/ACL Anthology. https://aclanthology.org/2026.lrec-1.808/ | Sourced evidence. High confidence about the authors' report; not yet verified by my own tests. | It supports measuring search quality and cost together. It does not prove my policy will work. |



## 5.8 The one flow I will build

1. I enter one research question and receive a trace of the sources retrieved.

1. The agent extracts important claims and records relevant source passages for each claim.

1. The agent assigns provisional evidence statuses and displays gaps or possible contradictions.

1. The agent chooses a targeted recovery action or stops, then presents a report with claim links, unresolved items, and tool-use records.




---


# Activity 6: Specify, build, test, and systemize

Status: SPECIFICATION DRAFT COMPLETE. Implementation choices remain options. Break tests and stranger tests have not been run because no completed prototype or actual test sessions have been reported.

## 6.1 My eight-question product specification

| Specification question | My current answer |

| --- | --- |

| 1. What is this? | I am proposing a small research-agent prototype that records important claims alongside the source passages used to support them. It will use evidence gaps to choose a targeted recovery action or stop and report unresolved claims. |

| 2. Who uses it? | My initial target is an AI developer who builds or tests multi-step research agents that gather external sources and produce cited reports. |

| 3. What must it do? | Accept a research question; retrieve a bounded source set; extract claims; link claims to source passages; record evidence status; flag unsupported or potentially conflicting claims; log a recovery or stop decision; produce a report and trace record. |

| 4. What does it not do? EXCLUSIONS | **I will not build a general-purpose autonomous researcher, user accounts, collaboration, a knowledge base, payments, multi-agent planning, or a production-grade reliability guarantee in the first version. I will not claim that model-generated labels are ground truth.** |

| 5. What data does it use? | I intend to begin with public source pages or an approved test corpus, research queries, extracted passages, claim records, URLs, status labels, and tool-use logs. I will not put private participant information or confidential source material into the prototype. The exact source route and data retention behavior remain open. |

| 6. What are the constraints? | I have 1 to 2 weeks, a team of 2 to 4, and experience with agentic AI and APIs. The API provider, stack, retrieval service, exact tool-call budget, sample size, and numerical success thresholds are not approved yet. |

| 7. What does done mean? | A demonstrable end-to-end flow exists; sources and claim records are inspectable; the baseline and recovery version can be compared on a documented test set; break tests and two stranger tests are recorded if test participants are available; failures and limitations are documented. Numerical acceptance thresholds must be set before the main experiment. |

| 8. What is still unknown? | Whether target users experience the problem; current substitutes and their actual cost; willingness to adopt or pay; the best source retrieval method; model/API choice; reliable support labels; exact research budget; sample size; success thresholds; and whether recovery provides enough benefit to justify its cost. |



## 6.2 Candidate tech stacks, not yet approved

I have not selected the final stack. These are options to compare against access, time, skill, and evaluation requirements.

| Area | Option 1: lower setup effort | Option 2: more separation | Decision status |

| --- | --- | --- | --- |

| Interface | Streamlit or an equivalent Python-first interface. It reduces front-end setup and can present claim/evidence tables quickly. | React or another separate web front end. It offers more UI control but adds build and integration work. | Open; I should choose after agreeing who owns UI work. |

| Application logic | Python functions/modules in the same app for a small first flow. | Python API service such as FastAPI separated from the front end. | Open; select based on expected reuse and team capacity. |

| Model/API | Choose a model/API available to the team and permitted by the project constraints. | Compare another available provider only if time and access allow. | OPEN: no provider chosen. |

| Source retrieval | A source/search API or a small fixed source corpus. A fixed corpus improves reproducibility but narrows generality. | Web search plus page extraction. It is closer to real usage but introduces availability and extraction failures. | OPEN: compare reliability and access before selection. |

| Storage | JSON/CSV artifacts for a reproducible, single-run demo. | SQLite if structured records and repeatable runs require persistence. | Open. |

| Hosting | Local demo first, avoiding deployment setup if the demo setting permits it. | A hosted demo if reviewers need remote access. | Open; deployment requirement not confirmed. |



## 6.3 Proposed ten-day build plan

| Period | Proposed work | Evidence/output |

| --- | --- | --- |

| Days 1-2 | Complete initial interviews where scheduled, refine the problem, define evaluation labels, and select stack after approval. | Updated problem statement, test protocol, approved technology choices. |

| Days 3-4 | Implement source input/retrieval and claim-evidence records. | Inspectible URLs, passages, claim records. |

| Days 5-6 | Add support-status assessment and bounded recovery/stop decisions. | End-to-end flow plus trace log. |

| Days 7-8 | Run baseline and recovery experiments; measure quality and tool usage. | Raw outputs, scoring sheet, error cases, calculations. |

| Days 9-10 | Run break tests and stranger tests, fix blocking defects, prepare demo and final report. | Test notes, changes made, documented limitations. |



This plan assumes a 10-day working window and suitable access to APIs and users. If the deadline is closer to one week, I will need to shorten the schedule after reviewing the actual requirements. I will not silently drop evaluation or source traceability.

## 6.4 Break-test plan and results

| Test | Input or failure to try | Expected behavior | Actual result |

| --- | --- | --- | --- |

| BT01: empty question | Submit an empty research question. | The app rejects the request with a clear message and makes no research call. | NOT RUN: no completed prototype result recorded. |

| BT02: very long question | Submit an unusually long input. | The app enforces a stated input limit or handles the input without crashing. | NOT RUN. |

| BT03: failed retrieval | Use an invalid URL or simulate a retrieval failure. | The agent records the failure, avoids inventing source content, and recovers or stops. | NOT RUN. |

| BT04: irrelevant source | Provide a topically related passage that does not entail the claim. | The claim should not be marked supported solely because the passage is relevant. | NOT RUN. |

| BT05: conflicting sources | Provide two credible but disagreeing passages. | The agent flags the conflict and records both sources instead of hiding the disagreement. | NOT RUN. |

| BT06: budget exhaustion | Use a run that reaches the approved tool limit. | The agent stops, reports unresolved claims, and records the reason. | NOT RUN; exact limit not approved. |



## 6.5 Stranger-test notes for two people

I will recruit two people who have not heard my explanation of the prototype. I will give each the same task, watch without guiding, and record hesitation, wrong clicks, questions, task completion, and changes I make afterward. These tests have not yet occurred.

| Field | Stranger test S01 | Stranger test S02 |

| --- | --- | --- |

| Date and consent | PENDING | PENDING |

| Task given | PENDING | PENDING |

| Completed without help? | PENDING | PENDING |

| Hesitation or wrong click | PENDING: observed only | PENDING: observed only |

| Questions asked | PENDING: actual notes | PENDING: actual notes |

| Main usability gap | PENDING | PENDING |

| Change I made after test | PENDING | PENDING |



## 6.6 My reusable four-part workflow

| Part | My workflow |

| --- | --- |

| Input | A research question, permitted source list or retrieval configuration, and an explicit research limit once I approve it. |

| Process | Retrieve sources; extract important claims; record URLs and passages; assign provisional evidence status; select targeted recovery or stop for each unresolved gap. |

| Verification | Check URL access and source excerpts; manually review support labels on the reference set; count claims, errors, recovery outcomes, tool calls, latency, and cost where available. |

| Output | A report containing claims, source links, evidence passages, status and uncertainty, recovery actions, unresolved items, and an evaluation record. |



## 6.7 Final release checklist

- I will verify that every important report claim links to a source or is marked unverified.

- I will inspect raw outputs and keep baseline and recovery results separate.

- I will check numerical calculations and preserve the evaluation rules used.

- I will record the break-test and stranger-test outcomes as observed, not expected outcomes.

- I will list limitations, errors, and unknowns in the demo and final report.

- I will not state that the tool improves reliability unless the completed comparison supports that conclusion.




---


# References and source register

I used the following original papers, proceedings records, and official documentation for the preliminary desk research. The cited findings describe what these sources report; they do not replace my own user interviews or experiments.

| Source | Use in my Build Log | URL |

| --- | --- | --- |

| Gao, T., Yen, H., Yu, J., and Chen, D. (2023). Enabling Large Language Models to Generate Text with Citations. EMNLP. | Citation evaluation and reported incomplete citation support on ELI5. | https://aclanthology.org/2023.emnlp-main.398/ |

| Han, J. et al. (2026). DEER: A Benchmark for Evaluating Deep Research Agents on Expert Report Generation. ICML/PMLR 306. | Research-report evaluation and claim verification for cited and uncited claims. | https://proceedings.mlr.press/v306/han26m.html |

| McCleary, K. A., and Ghawaly, J. M. (2026). Quantifying the Accuracy and Cost Impact of Design Decisions in Budget-Constrained Agentic LLM Search. LREC 2026. | Budget-constrained agentic search, retrieval strategy, and accuracy/cost trade-offs. | https://aclanthology.org/2026.lrec-1.808/ |

| Ragas documentation: Faithfulness metric. | Definition and implementation concept for checking support from retrieved context. | https://docs.ragas.io/en/latest/concepts/metrics/available_metrics/faithfulness/ |

| Stack Overflow. (2025). Developer Survey, AI section. | Broad context on developer use of AI agents and concerns about AI output accuracy. | https://survey.stackoverflow.co/2025/ai |

| Stack Overflow. (29 July 2025). 2025 Developer Survey press release. | Survey sample information and reported developer trust figures. | https://stackoverflow.co/company/press/archive/stack-overflow-2025-developer-survey/ |

| GitHub. (2025, updated 2026). Octoverse: developer growth and AI. | Broad developer ecosystem context only; not used as the target market count. | https://github.blog/news-insights/octoverse/octoverse-a-new-developer-joins-github-every-second-as-ai-leads-to-1/ |



## Open items I still need to complete with real evidence

- Fill the five ICP slots with real people and document actual contact status.

- Conduct 2 to 3 real past-behaviour interviews, preserve written notes, and add at least two genuine Insight Ledger entries from field research.

- Run the actual model clarification prompt and preserve the unedited response if the course requires it as a build-log artifact.

- Agree on stack, API provider, tool-call budget, evaluation sample size, and numerical success thresholds before the main experiment.

- Run break tests and stranger tests, and record actual results.

- Complete a defensible opportunity estimate after I have a defined user pool, an evidence-based price/value assumption, and a clearly labeled adoption scenario.


