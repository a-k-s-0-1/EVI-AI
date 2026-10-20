import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, Search, RefreshCw, AlertTriangle, CheckCircle2, 
  XCircle, HelpCircle, Layers, ArrowRight, Play, Database, ExternalLink,
  ChevronDown, ChevronUp, Clock, Zap
} from 'lucide-react';
import { runResearch, fetchRuns, executeBreakTest } from './api';

export default function App() {
  const [query, setQuery] = useState('What were the performance trade-offs reported in the ALCE benchmark for citation support?');
  const [mode, setMode] = useState('recovery'); // 'recovery' or 'baseline'
  const [budget, setBudget] = useState(6);
  const [loading, setLoading] = useState(false);
  const [currentRun, setCurrentRun] = useState(null);
  const [pastRuns, setPastRuns] = useState([]);
  const [activeTab, setActiveTab] = useState('research'); // 'research', 'comparison', 'breaktests'
  const [error, setError] = useState(null);
  
  // Break test state
  const [breakTestResults, setBreakTestResults] = useState({});
  const [runningTest, setRunningTest] = useState(null);

  useEffect(() => {
    loadPastRuns();
  }, []);

  const loadPastRuns = async () => {
    try {
      const runs = await fetchRuns();
      setPastRuns(runs);
      if (runs.length > 0 && !currentRun) {
        setCurrentRun(runs[0]);
      }
    } catch (e) {
      console.warn("Could not load past runs:", e);
    }
  };

  const handleExecute = async (e) => {
    e?.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const result = await runResearch({
        query: query.trim(),
        mode: mode,
        max_tool_budget: Number(budget)
      });
      setCurrentRun(result);
      loadPastRuns();
    } catch (err) {
      setError(err.message || 'Error executing research agent');
    } finally {
      setLoading(false);
    }
  };

  const handleRunBreakTest = async (testId) => {
    setRunningTest(testId);
    try {
      const res = await executeBreakTest(testId);
      setBreakTestResults(prev => ({ ...prev, [testId]: res }));
    } catch (err) {
      alert(`Test ${testId} error: ${err.message}`);
    } finally {
      setRunningTest(null);
    }
  };

  const renderBadge = (status) => {
    switch (status) {
      case 'supported':
        return <span className="badge badge-supported"><CheckCircle2 size={12}/> Supported</span>;
      case 'unsupported':
        return <span className="badge badge-unsupported"><AlertTriangle size={12}/> Unsupported</span>;
      case 'potentially_contradicted':
        return <span className="badge badge-potentially_contradicted"><XCircle size={12}/> Contradicted</span>;
      default:
        return <span className="badge badge-unresolved"><HelpCircle size={12}/> Unresolved</span>;
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Top Navbar */}
      <header style={{ 
        borderBottom: '1px solid var(--border-subtle)', 
        padding: '16px 32px', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        backgroundColor: 'rgba(9, 13, 22, 0.85)',
        backdropFilter: 'blur(12px)',
        position: 'sticky',
        top: 0,
        zIndex: 50
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ 
            width: '38px', 
            height: '38px', 
            borderRadius: '10px', 
            background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            boxShadow: '0 0 16px rgba(59, 130, 246, 0.4)'
          }}>
            <ShieldCheck size={22} color="#fff" />
          </div>
          <div>
            <h1 style={{ fontSize: '1.15rem', fontWeight: 800, letterSpacing: '-0.02em' }}>
              EVI-AI <span style={{ color: 'var(--accent-cyan)', fontWeight: 500, fontSize: '0.9rem' }}>Research Agent</span>
            </h1>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Evidence-Aware with Selective Recovery</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div style={{ display: 'flex', gap: '8px', background: 'var(--bg-secondary)', padding: '4px', borderRadius: '10px', border: '1px solid var(--border-subtle)' }}>
          <button 
            className="btn-secondary" 
            style={{ 
              background: activeTab === 'research' ? 'var(--primary)' : 'transparent',
              color: activeTab === 'research' ? '#fff' : 'var(--text-muted)',
              border: 'none',
              padding: '6px 14px'
            }}
            onClick={() => setActiveTab('research')}
          >
            <Search size={15}/> Live Research
          </button>
          <button 
            className="btn-secondary" 
            style={{ 
              background: activeTab === 'comparison' ? 'var(--primary)' : 'transparent',
              color: activeTab === 'comparison' ? '#fff' : 'var(--text-muted)',
              border: 'none',
              padding: '6px 14px'
            }}
            onClick={() => setActiveTab('comparison')}
          >
            <Layers size={15}/> Baseline vs Recovery
          </button>
          <button 
            className="btn-secondary" 
            style={{ 
              background: activeTab === 'breaktests' ? 'var(--primary)' : 'transparent',
              color: activeTab === 'breaktests' ? '#fff' : 'var(--text-muted)',
              border: 'none',
              padding: '6px 14px'
            }}
            onClick={() => setActiveTab('breaktests')}
          >
            <Zap size={15}/> Break Tests (BT01-06)
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main style={{ flex: 1, padding: '32px', maxWidth: '1440px', margin: '0 auto', width: '100%' }}>
        {error && (
          <div style={{ 
            padding: '14px 20px', 
            borderRadius: '8px', 
            background: 'var(--status-contradicted-bg)', 
            border: '1px solid var(--status-contradicted)', 
            color: '#fca5a5', 
            marginBottom: '24px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <AlertTriangle size={18} />
            <span>{error}</span>
          </div>
        )}

        {/* TAB 1: LIVE RESEARCH */}
        {activeTab === 'research' && (
          <div>
            {/* Query Form */}
            <form onSubmit={handleExecute} className="glass-panel" style={{ padding: '24px', marginBottom: '32px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '8px' }}>
                    RESEARCH QUESTION OR CLAIM INVESTIGATION
                  </label>
                  <input 
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Enter an empirical research question to verify against web sources..."
                    style={{
                      width: '100%',
                      background: 'rgba(0,0,0,0.3)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: '8px',
                      padding: '14px 18px',
                      color: 'var(--text-main)',
                      fontSize: '1rem',
                      outline: 'none'
                    }}
                  />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Mode:</span>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontSize: '0.9rem' }}>
                        <input 
                          type="radio" 
                          name="mode" 
                          value="recovery" 
                          checked={mode === 'recovery'} 
                          onChange={() => setMode('recovery')} 
                        />
                        <span style={{ color: mode === 'recovery' ? 'var(--accent-cyan)' : 'inherit' }}>Selective Recovery</span>
                      </label>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontSize: '0.9rem' }}>
                        <input 
                          type="radio" 
                          name="mode" 
                          value="baseline" 
                          checked={mode === 'baseline'} 
                          onChange={() => setMode('baseline')} 
                        />
                        <span style={{ color: mode === 'baseline' ? 'var(--accent-cyan)' : 'inherit' }}>Baseline (No Recovery)</span>
                      </label>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Tool Budget:</span>
                      <select 
                        value={budget} 
                        onChange={(e) => setBudget(e.target.value)}
                        style={{
                          background: 'var(--bg-tertiary)',
                          color: '#fff',
                          border: '1px solid var(--border-subtle)',
                          borderRadius: '6px',
                          padding: '6px 12px',
                          outline: 'none'
                        }}
                      >
                        <option value={2}>2 calls</option>
                        <option value={4}>4 calls</option>
                        <option value={6}>6 calls (Standard)</option>
                        <option value={8}>8 calls</option>
                      </select>
                    </div>
                  </div>

                  <button type="submit" className="btn-primary" disabled={loading}>
                    {loading ? <RefreshCw size={16} className="animate-spin" /> : <Play size={16} />}
                    {loading ? 'Executing Research & Verifying...' : 'Start Research Run'}
                  </button>
                </div>
              </div>
            </form>

            {/* Current Run Dashboard */}
            {currentRun && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
                {/* Metric Summary Ribbon */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                  <div className="glass-panel" style={{ padding: '18px 24px' }}>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Citation Correctness</div>
                    <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--status-supported)', marginTop: '4px' }}>
                      {currentRun.citation_correctness_pct}%
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-faint)' }}>{currentRun.supported_claims} of {currentRun.total_claims} verified</div>
                  </div>

                  <div className="glass-panel" style={{ padding: '18px 24px' }}>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Tool Calls Used</div>
                    <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--accent-cyan)', marginTop: '4px' }}>
                      {currentRun.tool_calls_count}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-faint)' }}>Duration: {currentRun.duration_seconds}s</div>
                  </div>

                  <div className="glass-panel" style={{ padding: '18px 24px' }}>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Unsupported Gaps</div>
                    <div style={{ fontSize: '1.8rem', fontWeight: 800, color: currentRun.unsupported_claims > 0 ? 'var(--status-unsupported)' : 'var(--text-muted)', marginTop: '4px' }}>
                      {currentRun.unsupported_claims}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-faint)' }}>Unresolved: {currentRun.unresolved_claims}</div>
                  </div>

                  <div className="glass-panel" style={{ padding: '18px 24px' }}>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Stop Reason</div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-main)', marginTop: '6px' }}>
                      {currentRun.stop_reason || 'Normal Completion'}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-faint)' }}>Mode: {currentRun.mode}</div>
                  </div>
                </div>

                {/* Synthesis Report Preview */}
                <div className="glass-panel" style={{ padding: '24px' }}>
                  <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Zap size={18} color="var(--primary)"/> Synthesized Research Output
                  </h3>
                  <div style={{ 
                    background: 'rgba(0,0,0,0.25)', 
                    padding: '16px 20px', 
                    borderRadius: '8px', 
                    fontSize: '0.92rem', 
                    color: 'var(--text-main)',
                    whiteSpace: 'pre-wrap',
                    lineHeight: '1.6'
                  }}>
                    {currentRun.final_report}
                  </div>
                </div>

                {/* Claim-Evidence Ledger (Core Specification Requirement) */}
                <div className="glass-panel" style={{ padding: '24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                    <div>
                      <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Claim-Evidence Ledger</h3>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Inspect substantive claims, verifiable source passages, and entailment rationale</p>
                    </div>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-faint)' }}>
                      Total Claims: {currentRun.claims?.length || 0}
                    </span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {currentRun.claims?.map((claim) => (
                      <div 
                        key={claim.id} 
                        style={{ 
                          background: 'var(--bg-secondary)', 
                          border: '1px solid var(--border-subtle)',
                          borderRadius: '10px',
                          padding: '18px 20px'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px', marginBottom: '12px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <span style={{ 
                              background: 'var(--bg-tertiary)', 
                              padding: '2px 8px', 
                              borderRadius: '4px', 
                              fontFamily: 'monospace', 
                              fontSize: '0.8rem',
                              fontWeight: 700,
                              color: 'var(--accent-cyan)'
                            }}>
                              {claim.id}
                            </span>
                            <span style={{ fontSize: '0.98rem', fontWeight: 600, color: '#fff' }}>{claim.text}</span>
                          </div>
                          <div>{renderBadge(claim.status)}</div>
                        </div>

                        {/* Entailment Rationale */}
                        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '14px', background: 'rgba(255,255,255,0.03)', padding: '8px 12px', borderRadius: '6px' }}>
                          <strong>Verification Rationale:</strong> {claim.rationale}
                        </div>

                        {/* Associated Passages */}
                        {claim.passages && claim.passages.length > 0 ? (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-faint)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                              Linked Source Passages ({claim.passages.length})
                            </span>
                            {claim.passages.map((p, pIdx) => (
                              <div 
                                key={pIdx} 
                                style={{ 
                                  background: 'rgba(0,0,0,0.2)', 
                                  borderLeft: p.is_conflicting ? '3px solid var(--status-contradicted)' : '3px solid var(--primary)', 
                                  padding: '10px 14px',
                                  borderRadius: '0 6px 6px 0'
                                }}
                              >
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                                  <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--accent-cyan)' }}>{p.title || 'Source Passage'}</span>
                                  <a 
                                    href={p.url} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    style={{ fontSize: '0.75rem', color: 'var(--text-faint)', display: 'flex', alignItems: 'center', gap: '4px', textDecoration: 'none' }}
                                  >
                                    Inspect Source <ExternalLink size={12}/>
                                  </a>
                                </div>
                                <p style={{ fontSize: '0.85rem', color: 'var(--text-main)', fontStyle: 'italic', lineHeight: '1.5' }}>
                                  "{p.excerpt}"
                                </p>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div style={{ fontSize: '0.8rem', color: 'var(--text-faint)', fontStyle: 'italic' }}>
                            No source passages could be mapped to this claim.
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Selective Recovery Trace Log */}
                {currentRun.recovery_actions && currentRun.recovery_actions.length > 0 && (
                  <div className="glass-panel" style={{ padding: '24px' }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <RefreshCw size={18} color="var(--accent-cyan)"/> Selective Recovery Decision Trace
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {currentRun.recovery_actions.map((act, aIdx) => (
                        <div 
                          key={aIdx} 
                          style={{ 
                            display: 'flex', 
                            alignItems: 'flex-start', 
                            gap: '14px',
                            background: 'var(--bg-secondary)',
                            padding: '12px 16px',
                            borderRadius: '8px',
                            border: '1px solid var(--border-subtle)'
                          }}
                        >
                          <div style={{ 
                            background: 'var(--bg-tertiary)', 
                            borderRadius: '50%', 
                            width: '28px', 
                            height: '28px', 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center',
                            fontSize: '0.8rem',
                            fontWeight: 700,
                            flexShrink: 0
                          }}>
                            {act.step}
                          </div>
                          <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                              <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--accent-cyan)' }}>
                                {act.action_type.replace('_', ' ')}
                              </span>
                              {act.target_claim_id && (
                                <span style={{ fontSize: '0.75rem', background: 'var(--bg-tertiary)', padding: '1px 6px', borderRadius: '4px' }}>
                                  Target: {act.target_claim_id}
                                </span>
                              )}
                              <span style={{ fontSize: '0.75rem', color: 'var(--text-faint)', marginLeft: 'auto' }}>
                                Tool Calls Cumulative: {act.tool_calls_used}
                              </span>
                            </div>
                            {act.query && (
                              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                                Query Executed: <code style={{ color: '#fff', background: 'rgba(0,0,0,0.3)', padding: '2px 6px', borderRadius: '4px' }}>{act.query}</code>
                              </div>
                            )}
                            <div style={{ fontSize: '0.85rem', color: 'var(--text-main)' }}>{act.outcome}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: BASELINE VS RECOVERY COMPARISON */}
        {activeTab === 'comparison' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div className="glass-panel" style={{ padding: '24px' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '8px' }}>Baseline vs Recovery Evaluation Record</h2>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
                Compare evidence accuracy, unsupported rate, tool budget utilization, and latency across experimental runs.
              </p>

              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-muted)' }}>
                      <th style={{ padding: '12px 16px' }}>Run ID</th>
                      <th style={{ padding: '12px 16px' }}>Mode</th>
                      <th style={{ padding: '12px 16px' }}>Query</th>
                      <th style={{ padding: '12px 16px' }}>Citation Correctness</th>
                      <th style={{ padding: '12px 16px' }}>Supported / Total</th>
                      <th style={{ padding: '12px 16px' }}>Unsupported</th>
                      <th style={{ padding: '12px 16px' }}>Tool Calls</th>
                      <th style={{ padding: '12px 16px' }}>Latency</th>
                      <th style={{ padding: '12px 16px' }}>Stop Reason</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pastRuns.map((r) => (
                      <tr 
                        key={r.run_id} 
                        style={{ 
                          borderBottom: '1px solid rgba(255,255,255,0.04)',
                          cursor: 'pointer',
                          background: currentRun?.run_id === r.run_id ? 'rgba(59, 130, 246, 0.08)' : 'transparent'
                        }}
                        onClick={() => { setCurrentRun(r); setActiveTab('research'); }}
                      >
                        <td style={{ padding: '12px 16px', fontFamily: 'monospace', color: 'var(--accent-cyan)' }}>{r.run_id}</td>
                        <td style={{ padding: '12px 16px' }}>
                          <span style={{ 
                            textTransform: 'uppercase', 
                            fontSize: '0.75rem', 
                            fontWeight: 700,
                            color: r.mode === 'recovery' ? 'var(--accent-cyan)' : 'var(--text-faint)' 
                          }}>
                            {r.mode}
                          </span>
                        </td>
                        <td style={{ padding: '12px 16px', maxWidth: '300px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {r.query}
                        </td>
                        <td style={{ padding: '12px 16px', fontWeight: 700, color: r.citation_correctness_pct >= 80 ? 'var(--status-supported)' : 'var(--status-unsupported)' }}>
                          {r.citation_correctness_pct}%
                        </td>
                        <td style={{ padding: '12px 16px' }}>{r.supported_claims} / {r.total_claims}</td>
                        <td style={{ padding: '12px 16px', color: r.unsupported_claims > 0 ? 'var(--status-unsupported)' : 'var(--text-muted)' }}>
                          {r.unsupported_claims}
                        </td>
                        <td style={{ padding: '12px 16px', fontWeight: 600 }}>{r.tool_calls_count}</td>
                        <td style={{ padding: '12px 16px' }}>{r.duration_seconds}s</td>
                        <td style={{ padding: '12px 16px', color: 'var(--text-muted)' }}>{r.stop_reason || '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: BREAK TESTS (BT01-BT06) */}
        {activeTab === 'breaktests' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div className="glass-panel" style={{ padding: '24px' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '8px' }}>Automated Break-Test Suite (BT01 – BT06)</h2>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
                Verifies critical edge cases and failure modes mandated in <code>PROJECT_SPEC.md</code> without manual intervention.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {[
                  { id: 'BT01', name: 'Empty research question', desc: 'Reject clearly with 400 Bad Request and make zero research calls.' },
                  { id: 'BT02', name: 'Very long question', desc: 'Enforce 2000-character input boundary without server or process crash.' },
                  { id: 'BT03', name: 'Failed retrieval or invalid URL', desc: 'Record the failure and recover/stop without hallucinating or inventing source content.' },
                  { id: 'BT04', name: 'Topically related but non-supporting passage', desc: 'Reject claims when source talks about topic but fails to entail fact.' },
                  { id: 'BT05', name: 'Conflicting source passages', desc: 'Flag contradiction and preserve both disagreeing sources in the ledger.' },
                  { id: 'BT06', name: 'Approved budget exhausted', desc: 'Halt when tool budget limit is reached, reporting explicit reason and unresolved items.' },
                ].map((test) => {
                  const res = breakTestResults[test.id];
                  const isRunning = runningTest === test.id;
                  return (
                    <div 
                      key={test.id} 
                      style={{ 
                        background: 'var(--bg-secondary)', 
                        border: '1px solid var(--border-subtle)',
                        borderRadius: '10px',
                        padding: '18px 20px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '12px'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <span style={{ fontFamily: 'monospace', fontWeight: 800, color: 'var(--accent-cyan)' }}>{test.id}</span>
                            <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>{test.name}</span>
                          </div>
                          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>{test.desc}</p>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          {res && (
                            <span className={`badge ${res.passed ? 'badge-supported' : 'badge-potentially_contradicted'}`}>
                              {res.passed ? 'PASSED' : 'FAILED'}
                            </span>
                          )}
                          <button 
                            className="btn-secondary" 
                            disabled={isRunning}
                            onClick={() => handleRunBreakTest(test.id)}
                            style={{ minWidth: '100px' }}
                          >
                            {isRunning ? <RefreshCw size={14} className="animate-spin"/> : <Play size={14}/>}
                            {isRunning ? 'Running...' : 'Run Test'}
                          </button>
                        </div>
                      </div>

                      {res && (
                        <div style={{ 
                          background: 'rgba(0,0,0,0.25)', 
                          padding: '12px 14px', 
                          borderRadius: '6px', 
                          fontSize: '0.82rem',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '6px'
                        }}>
                          <div><strong>Expected:</strong> {res.expected_behavior}</div>
                          <div><strong>Observed:</strong> {res.actual_behavior}</div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
