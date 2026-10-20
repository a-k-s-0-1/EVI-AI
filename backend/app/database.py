import aiosqlite
import json
from datetime import datetime
from typing import List, Optional, Dict, Any
from app.config import settings

DB_FILE = settings.DATABASE_FILE

async def init_db():
    async with aiosqlite.connect(DB_FILE) as db:
        await db.execute("""
            CREATE TABLE IF NOT EXISTS runs (
                run_id TEXT PRIMARY KEY,
                query TEXT NOT NULL,
                mode TEXT NOT NULL,
                final_report TEXT,
                tool_calls_count INTEGER DEFAULT 0,
                duration_seconds REAL DEFAULT 0,
                total_claims INTEGER DEFAULT 0,
                supported_claims INTEGER DEFAULT 0,
                unsupported_claims INTEGER DEFAULT 0,
                contradicted_claims INTEGER DEFAULT 0,
                unresolved_claims INTEGER DEFAULT 0,
                citation_correctness_pct REAL DEFAULT 0,
                stop_reason TEXT,
                created_at TEXT NOT NULL
            )
        """)
        
        await db.execute("""
            CREATE TABLE IF NOT EXISTS claims (
                id TEXT NOT NULL,
                run_id TEXT NOT NULL,
                text TEXT NOT NULL,
                status TEXT NOT NULL,
                rationale TEXT,
                recovery_attempted INTEGER DEFAULT 0,
                PRIMARY KEY (id, run_id),
                FOREIGN KEY (run_id) REFERENCES runs (run_id) ON DELETE CASCADE
            )
        """)
        
        await db.execute("""
            CREATE TABLE IF NOT EXISTS evidence_passages (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                claim_id TEXT NOT NULL,
                run_id TEXT NOT NULL,
                url TEXT NOT NULL,
                title TEXT,
                excerpt TEXT NOT NULL,
                is_conflicting INTEGER DEFAULT 0
            )
        """)
        
        await db.execute("""
            CREATE TABLE IF NOT EXISTS recovery_actions (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                run_id TEXT NOT NULL,
                step INTEGER NOT NULL,
                action_type TEXT NOT NULL,
                target_claim_id TEXT,
                query TEXT,
                outcome TEXT,
                tool_calls_used INTEGER DEFAULT 0
            )
        """)
        
        await db.commit()

async def save_run(run_data: Dict[str, Any]):
    async with aiosqlite.connect(DB_FILE) as db:
        await db.execute("""
            INSERT OR REPLACE INTO runs (
                run_id, query, mode, final_report, tool_calls_count,
                duration_seconds, total_claims, supported_claims, unsupported_claims,
                contradicted_claims, unresolved_claims, citation_correctness_pct,
                stop_reason, created_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            run_data["run_id"], run_data["query"], run_data["mode"],
            run_data.get("final_report", ""), run_data.get("tool_calls_count", 0),
            run_data.get("duration_seconds", 0.0), run_data.get("total_claims", 0),
            run_data.get("supported_claims", 0), run_data.get("unsupported_claims", 0),
            run_data.get("contradicted_claims", 0), run_data.get("unresolved_claims", 0),
            run_data.get("citation_correctness_pct", 0.0), run_data.get("stop_reason"),
            run_data.get("created_at", datetime.utcnow().isoformat())
        ))
        
        # Save claims
        for claim in run_data.get("claims", []):
            await db.execute("""
                INSERT OR REPLACE INTO claims (id, run_id, text, status, rationale, recovery_attempted)
                VALUES (?, ?, ?, ?, ?, ?)
            """, (
                claim["id"], run_data["run_id"], claim["text"],
                claim["status"], claim.get("rationale", ""),
                1 if claim.get("recovery_attempted") else 0
            ))
            
            for p in claim.get("passages", []):
                await db.execute("""
                    INSERT INTO evidence_passages (claim_id, run_id, url, title, excerpt, is_conflicting)
                    VALUES (?, ?, ?, ?, ?, ?)
                """, (
                    claim["id"], run_data["run_id"], p["url"],
                    p.get("title", ""), p["excerpt"], 1 if p.get("is_conflicting") else 0
                ))
                
        # Save recovery actions
        for act in run_data.get("recovery_actions", []):
            await db.execute("""
                INSERT INTO recovery_actions (run_id, step, action_type, target_claim_id, query, outcome, tool_calls_used)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            """, (
                run_data["run_id"], act["step"], act["action_type"],
                act.get("target_claim_id"), act.get("query"),
                act["outcome"], act.get("tool_calls_used", 0)
            ))
            
        await db.commit()

async def get_all_runs(limit: int = 50) -> List[Dict[str, Any]]:
    async with aiosqlite.connect(DB_FILE) as db:
        db.row_factory = aiosqlite.Row
        cursor = await db.execute("SELECT * FROM runs ORDER BY created_at DESC LIMIT ?", (limit,))
        rows = await cursor.fetchall()
        return [dict(r) for r in rows]

async def get_run_details(run_id: str) -> Optional[Dict[str, Any]]:
    async with aiosqlite.connect(DB_FILE) as db:
        db.row_factory = aiosqlite.Row
        c_run = await db.execute("SELECT * FROM runs WHERE run_id = ?", (run_id,))
        run_row = await c_run.fetchone()
        if not run_row:
            return None
        
        run_data = dict(run_row)
        
        # Get claims
        c_claims = await db.execute("SELECT * FROM claims WHERE run_id = ?", (run_id,))
        claims_rows = await c_claims.fetchall()
        claims = []
        for c in claims_rows:
            claim_dict = dict(c)
            # Get passages
            c_pass = await db.execute("SELECT * FROM evidence_passages WHERE claim_id = ? AND run_id = ?", (claim_dict["id"], run_id))
            pass_rows = await c_pass.fetchall()
            claim_dict["passages"] = [dict(p) for p in pass_rows]
            claims.append(claim_dict)
            
        run_data["claims"] = claims
        
        # Get recovery actions
        c_actions = await db.execute("SELECT * FROM recovery_actions WHERE run_id = ? ORDER BY step ASC", (run_id,))
        actions_rows = await c_actions.fetchall()
        run_data["recovery_actions"] = [dict(a) for a in actions_rows]
        
        return run_data
