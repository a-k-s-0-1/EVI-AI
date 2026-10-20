# Evidence-Aware AI Research Agent with Selective Recovery

A developer-focused research agent that extracts substantive claims from generated answers, links them to verbatim source passages, assigns provisional evidence statuses, and performs bounded selective recovery for evidence gaps.

Built in accordance with [PROJECT_SPEC.md](PROJECT_SPEC.md) and [Evidence_Aware_Agent_Build_Log_Activities_1_to_6.md](Evidence_Aware_Agent_Build_Log_Activities_1_to_6.md).

---

## Architecture Overview

* **Backend (`/backend`)**:
  * **FastAPI** REST API.
  * **Groq** Llama-3.3-70b / Llama-3.1-8b with Gemini fallback.
  * **DuckDuckGo Search (`duckduckgo-search` / `ddgs`) + Trafilatura**: 100% free search & clean HTML passage extraction.
  * **Claim-Evidence Ledger**: SQLite persistent storage for runs, claims, verbatim excerpts, and recovery actions.
  * **Selective Recovery Engine**: Identifies unsupported or contradicted claims, triggers targeted follow-up queries, and enforces strict tool-call budgets.
  * **Automated Break-Test Harness**: Endpoints and pytest suite for BT01–BT06.

* **Frontend (`/frontend`)**:
  * **Vite + React** with modern dark-mode aesthetic.
  * **Claim-Evidence Ledger**: Color-coded badges (`Supported`, `Unsupported`, `Contradicted`, `Unresolved`), inspection links, and rationale explanations.
  * **Selective Recovery Decision Trace**: Step-by-step visual log of recovery actions and explicit stop reasons.
  * **Baseline vs Recovery Comparison**: Multi-run evaluation table showing correctness percentage, tool calls used, and latency.
  * **1-Click Break-Test Runner**: Interactive UI testing for BT01 through BT06.

---

## Quickstart

### 1. Backend Setup & Run

```bash
cd D:\EVI-AI\backend

# Activate virtual environment
.\venv\Scripts\Activate.ps1

# (Optional) Set your Groq API key in .env or shell:
$env:GROQ_API_KEY="your_groq_api_key_here"

# Start FastAPI server
$env:PYTHONPATH="."
python -m uvicorn app.main:app --host 127.0.0.1 --port 8000
```
API Documentation will be available at: `http://127.0.0.1:8000/docs`

### 2. Frontend Setup & Run

```bash
cd D:\EVI-AI\frontend
npm run dev -- --host 127.0.0.1 --port 5173
```
Dashboard will be available at: `http://127.0.0.1:5173`

---

## Break-Test Suite (BT01 - BT06)

To run the automated break tests via `pytest`:
```bash
cd D:\EVI-AI\backend
$env:PYTHONPATH="."
.\venv\Scripts\pytest -v tests/test_break_tests.py
```
Or use the **Break Tests (BT01-06)** tab directly in the web UI.
