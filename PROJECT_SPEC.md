# PROJECT_SPEC.md

**Project:** Evidence-Aware AI Research Agent with Selective Recovery  
**Theme:** AI and Developer Tools  
**Status:** Working specification for review. It is not final where a decision is marked OPEN.

## 1. What is this?

I am proposing a small research-agent prototype that records important claims alongside source passages that may support them. It will use detected evidence gaps to choose a targeted recovery action or stop and report unresolved claims.

## 2. Who uses it?

My initial target is an AI developer who builds or tests multi-step research agents that retrieve external sources and produce cited reports. I have not yet validated this ICP through completed interviews.

## 3. What must it do?

- Accept one research question.
- Retrieve a bounded set of public sources or approved test documents.
- Extract important claims from the generated answer.
- Link each claim to relevant source passages and source URLs.
- Record a provisional evidence status: supported, unsupported, potentially contradicted, or unresolved.
- Select a targeted recovery action for an evidence gap, or stop and mark the gap unresolved.
- Record the final claims, sources, recovery actions, unresolved items, and tool usage.
- Support a comparison between a baseline run and a recovery-enabled run.

## 4. What does it not do? EXCLUSIONS

**The first version will not build:**

- A general-purpose autonomous researcher covering every domain.
- User accounts, team collaboration, payments, or a persistent knowledge base.
- Multi-agent planning or broad workflow automation unrelated to evidence verification.
- Production-grade factual guarantees or automatic certification that a claim is true.
- A polished public SaaS product before the core flow and evaluation work.

**The system must not:**

- Mark a claim supported merely because a source is topically relevant.
- Hide source conflicts or silently fill missing evidence with generated text.
- Present model scores as ground truth without an evaluation method.
- Use private participant data or confidential documents in the prototype without explicit approval.

## 5. What data does it use?

I intend to begin with public source pages or a controlled test corpus, research queries, extracted text passages, claim records, source URLs, provisional evidence statuses, recovery decisions, and tool-use logs. The exact source retrieval method, external services, retention behavior, and data structure are **OPEN** until I compare the options and approve a choice.

## 6. What are the constraints?

- Time window: 1 to 2 weeks.
- Team size: 2 to 4 people.
- Current skills: agentic AI and APIs.
- Recruitment: existing technical network.
- Interview note method: written notes only.
- API provider: **OPEN**.
- Technical stack: **OPEN**.
- Retrieval provider or fixed source corpus: **OPEN**.
- Exact tool-call and token budget: **OPEN**.
- Evaluation sample size: **OPEN**.
- Numerical success thresholds: **OPEN**.
- Hosting/deployment requirement: **OPEN**.

## 7. What does done mean?

The project will be ready for its planned demo when:

- One research question can be processed end to end.
- Important claims link to inspectable sources and evidence passages, or are marked unresolved.
- The system can record a recovery decision or an explicit stop decision.
- A baseline and recovery-enabled version can be run on a documented test set.
- The evaluation records claim support, unsupported claims, citation correctness, recovery outcomes, tool usage, and time/cost where measurable.
- The required break tests and two stranger tests have actual results or are transparently marked not run with a reason.
- The report states limitations and does not claim improvement unless the comparison supports it.

Numerical pass thresholds must be agreed before the main experiment. They are not set in this draft.

## 8. What is still unknown?

- Whether the target developers experience a frequent or costly evidence-verification problem.
- Which alternative tools and manual workarounds they use today.
- Whether users value a standalone interface, a CLI, an API, or a workflow integrated into existing tools.
- Whether there is willingness to pay, or whether open source distribution is a better starting point.
- Which model/API provider is available and suitable.
- Which source retrieval approach is reliable enough for the deadline.
- Whether automatic support labels agree sufficiently with human review.
- The exact research budget, sample size, and pass thresholds.
- The true size of the serviceable user pool and a defensible price/adoption estimate.

## Core user flow

1. I enter a research question and the agent retrieves a bounded source set.
2. The agent extracts substantive claims and records relevant source passages.
3. The agent assigns provisional evidence statuses and flags gaps or possible conflicts.
4. The agent performs a targeted recovery action or stops, then presents a report with source links, unresolved claims, and tool-use records.

## Candidate implementation choices, not yet approved

| Area | Lower setup effort option | Alternative | Decision |
|---|---|---|---|
| Interface | Streamlit or similar Python-first interface | React or separate web UI | OPEN |
| Application logic | Python modules in one app | Python API service such as FastAPI | OPEN |
| Model/API | One provider available to the team | Compare another provider if time permits | OPEN |
| Retrieval | Search API or fixed source corpus | Web search plus page extraction | OPEN |
| Storage | JSON/CSV run artifacts | SQLite for persistent structured records | OPEN |
| Hosting | Local demo | Hosted demo if required | OPEN |

I will select the stack only after confirming access, integration effort, reproducibility, cost, and demo requirements.

## Planned break tests

| ID | Test | Expected behavior | Result |
|---|---|---|---|
| BT01 | Empty research question | Reject clearly and do not call research tools | NOT RUN |
| BT02 | Very long question | Enforce an input limit or handle it without crashing | NOT RUN |
| BT03 | Failed retrieval or invalid URL | Record the failure and recover or stop without inventing source content | NOT RUN |
| BT04 | Topically related but non-supporting passage | Do not mark claim supported based on relevance alone | NOT RUN |
| BT05 | Conflicting source passages | Flag the conflict and preserve both sources | NOT RUN |
| BT06 | Approved budget exhausted | Stop and report unresolved claims and reason | NOT RUN; limit OPEN |

## Stranger tests

| Field | Stranger test S01 | Stranger test S02 |
|---|---|---|
| Date and consent | PENDING | PENDING |
| Task given | PENDING | PENDING |
| Completed without help? | PENDING | PENDING |
| Hesitations or wrong clicks | PENDING, record observations only | PENDING, record observations only |
| Questions asked | PENDING | PENDING |
| Main usability gap | PENDING | PENDING |
| Change made afterwards | PENDING | PENDING |

## Reusable workflow

- **Input:** A research question, approved source route, and approved research limit.
- **Process:** Retrieve sources, extract claims, record passages, assign provisional statuses, choose targeted recovery or stop.
- **Verification:** Check source links and excerpts, review support labels against a reference set, and record tool usage and quality measures.
- **Output:** A report with claims, evidence links, statuses, uncertainty, recovery actions, unresolved items, and an evaluation record.

## Approval record

The project direction and initial workflow are approved for planning. The technical stack, API provider, retrieval path, exact tool-call budget, sample size, numerical success thresholds, and opportunity/pricing model are still open and must not be treated as final without approval.
