import React, { useState, useEffect } from 'react';
import { Play, Pause, SkipForward, SkipBack, RotateCcw, Zap } from 'lucide-react';

export function LCPVisualization({ lcpData, sampleText = "chaitanya" }) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1000); // ms per step

  const steps = lcpData?.steps || [];
  const totalSteps = steps.length;
  const safeStepIndex = Math.min(currentStepIndex, Math.max(0, totalSteps - 1));
  const currentStep = steps[safeStepIndex] || null;
  const lcpRows = lcpData?.lcpResults || lcpData?.lcpArray || [];

  // Auto-play timer
  useEffect(() => {
    let timer = null;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentStepIndex((prev) => {
          if (prev < totalSteps - 1) {
            return prev + 1;
          } else {
            setIsPlaying(false);
            return prev;
          }
        });
      }, playbackSpeed);
    }
    return () => clearInterval(timer);
  }, [isPlaying, totalSteps, playbackSpeed]);

  const handleStepForward = () => {
    if (currentStepIndex < totalSteps - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  const handleStepBack = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStepIndex(0);
  };

  const handleSliderChange = (e) => {
    const nextIdx = Number(e.target.value);
    setIsPlaying(false);
    setCurrentStepIndex(nextIdx);
  };

  const progressPercent = totalSteps > 1 ? (safeStepIndex / (totalSteps - 1)) * 100 : (totalSteps === 1 ? 100 : 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Kasai Algorithm Control Bar */}
      <div className="card" style={{ padding: '20px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
          marginBottom: '16px'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Zap size={18} style={{ color: 'var(--accent-primary)' }} />
              <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#fff' }}>
                Kasai's Algorithm Execution Stepper
              </h3>
              <span className="status-chip ready" style={{ fontSize: '10px' }}>
                O(n) Linear Time
              </span>
            </div>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>
              Iterating original suffixes from index i = 0 to {sampleText.length - 1}. Reusing previous LCP h to guarantee O(n).
            </p>
          </div>

          {/* Stepper Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              className="btn btn-outline btn-sm"
              onClick={handleReset}
              title="Reset Stepper"
            >
              <RotateCcw size={14} />
            </button>
            <button
              className="btn btn-secondary btn-sm"
              onClick={handleStepBack}
              disabled={currentStepIndex === 0 || isPlaying}
              title="Step Back"
            >
              <SkipBack size={14} />
            </button>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => setIsPlaying(!isPlaying)}
              title={isPlaying ? "Pause" : "Run Visualization"}
            >
              {isPlaying ? <Pause size={14} /> : <Play size={14} />}
              <span>{isPlaying ? 'Pause' : 'Run Visualization'}</span>
            </button>
            <button
              className="btn btn-secondary btn-sm"
              onClick={handleStepForward}
              disabled={currentStepIndex >= totalSteps - 1 || isPlaying}
              title="Step Forward"
            >
              <SkipForward size={14} />
            </button>

            {/* Speed Control */}
            <select
              className="select-dropdown"
              value={playbackSpeed}
              onChange={(e) => setPlaybackSpeed(Number(e.target.value))}
              style={{ padding: '4px 8px', fontSize: '11px' }}
            >
              <option value={1800}>0.5x</option>
              <option value={1000}>1.0x</option>
              <option value={500}>2.0x</option>
            </select>
          </div>
        </div>

        {/* Interactive Step Dragger / Scrubber Slider */}
        <div style={{ marginTop: '8px', marginBottom: '4px' }}>
          <div style={{ position: 'relative', width: '100%', display: 'flex', alignItems: 'center' }}>
            <input
              type="range"
              min={0}
              max={Math.max(0, totalSteps - 1)}
              value={safeStepIndex}
              onChange={handleSliderChange}
              disabled={totalSteps <= 1}
              className="stepper-range-slider"
              style={{
                width: '100%',
                background: `linear-gradient(to right, var(--cyan) 0%, var(--accent-primary) ${progressPercent}%, var(--bg-surface) ${progressPercent}%, var(--bg-surface) 100%)`
              }}
              title={`Step ${safeStepIndex + 1} of ${totalSteps} (drag or click to change step)`}
              aria-label="Kasai Algorithm Step Scrubber"
            />
          </div>

          {/* Discrete Step Dots for visual precision */}
          {totalSteps > 1 && totalSteps <= 20 && (
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '0 4px',
              marginTop: '-2px',
              marginBottom: '6px'
            }}>
              {Array.from({ length: totalSteps }).map((_, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    setIsPlaying(false);
                    setCurrentStepIndex(idx);
                  }}
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: idx <= safeStepIndex ? 'var(--accent-highlight)' : 'var(--border-subtle)',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    boxShadow: idx === safeStepIndex ? '0 0 6px var(--cyan)' : 'none'
                  }}
                  title={`Jump to Step ${idx + 1}`}
                />
              ))}
            </div>
          )}

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '6px',
            fontSize: '11.5px',
            color: 'var(--text-dim)',
            fontFamily: 'var(--font-mono)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: 'var(--accent-highlight)', fontWeight: '700' }}>
                Step {safeStepIndex + 1} of {totalSteps}
              </span>
              <span style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>
                • Drag blue line to change step
              </span>
            </div>
            <span>
              Text Pos: <strong style={{ color: '#fff' }}>i = {currentStep?.i ?? 0}</strong>
              {currentStep?.suffixI ? (
                <span style={{ color: 'var(--cyan)', marginLeft: '6px' }}>
                  ("{currentStep.suffixI}")
                </span>
              ) : null}
            </span>
          </div>
        </div>
      </div>

      {/* Step Inspector Cards */}
      {currentStep && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '16px'
        }}>
          {/* Active Suffix Card */}
          <div className="card-elevated" style={{ borderLeft: '3px solid var(--accent-primary)' }}>
            <span style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: '700' }}>
              Current Suffix (Order: i = {currentStep.i})
            </span>
            <div className="font-mono" style={{ fontSize: '18px', fontWeight: '700', color: '#fff', margin: '8px 0 4px 0' }}>
              "{currentStep.suffixI}"
            </div>
            <div style={{ fontSize: '12px', color: 'var(--accent-highlight)', fontFamily: 'var(--font-mono)' }}>
              SA Rank: {currentStep.currentRank}
            </div>
          </div>

          {/* Predecessor Suffix Card */}
          <div className="card-elevated" style={{ borderLeft: '3px solid var(--cyan)' }}>
            <span style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: '700' }}>
              Predecessor in SA (Rank {currentStep.currentRank > 0 ? currentStep.currentRank - 1 : 'None'})
            </span>
            <div className="font-mono" style={{ fontSize: '18px', fontWeight: '700', color: '#fff', margin: '8px 0 4px 0' }}>
              {currentStep.j !== null ? `"${currentStep.suffixJ}"` : '— (Smallest Suffix)'}
            </div>
            <div style={{ fontSize: '12px', color: 'var(--cyan)', fontFamily: 'var(--font-mono)' }}>
              {currentStep.j !== null ? `Original Pos: j = ${currentStep.j}` : 'No predecessor'}
            </div>
          </div>

          {/* Kasai Theorem Metrics Card */}
          <div className="card-elevated" style={{ borderLeft: '3px solid var(--warning)' }}>
            <span style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: '700' }}>
              Kasai Reused Invariant (h)
            </span>
            <div className="font-mono" style={{ fontSize: '18px', fontWeight: '700', color: 'var(--warning)', margin: '8px 0 4px 0' }}>
              LCP = {currentStep.calculatedLcp}
            </div>
            <div style={{ fontSize: '11.5px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
              Reused: {currentStep.reusedH} | New: +{currentStep.newMatches} | Next h: {currentStep.decrementedH}
            </div>
          </div>
        </div>
      )}

      {/* Step Explanation Text */}
      {currentStep && (
        <div style={{
          background: 'rgba(22, 119, 255, 0.08)',
          border: '1px solid rgba(22, 119, 255, 0.25)',
          borderRadius: 'var(--radius-md)',
          padding: '16px 20px',
          fontSize: '13px',
          color: 'var(--text-secondary)',
          lineHeight: '1.6'
        }}>
          <strong style={{ color: '#fff', display: 'block', marginBottom: '4px' }}>
            Algorithm Step Walkthrough:
          </strong>
          {currentStep.explanation}
        </div>
      )}

      {/* LCP Array Values Table */}
      <div className="card" style={{ padding: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div>
            <h4 style={{ fontSize: '15px', fontWeight: '700', color: '#fff' }}>
              Adjacent Sorted Suffixes & LCP Values
            </h4>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
              LCP[k] is the longest common prefix between suffix at Rank k and Rank k-1
            </span>
          </div>
        </div>

        <div className="data-table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th style={{ width: '80px' }}>Rank</th>
                <th style={{ width: '90px' }}>Pos</th>
                <th>Suffix</th>
                <th style={{ width: '120px' }}>LCP Value</th>
                <th>Visual Prefix Overlap</th>
              </tr>
            </thead>
            <tbody>
              {lcpRows.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '24px' }}>
                    No LCP entries available for the provided text.
                  </td>
                </tr>
              ) : (
                lcpRows.map((item) => {
                  const isStepActive = currentStep && currentStep.currentRank === item.rank;
                  const lcpVal = item.rank === 0 ? 0 : item.lcp;

                  return (
                    <tr key={item.rank} className={isStepActive ? 'selected-row' : ''}>
                      <td className="font-mono" style={{ fontWeight: '700', color: isStepActive ? '#fff' : 'var(--accent-highlight)' }}>
                        {item.rank}
                      </td>
                      <td className="font-mono">
                        <span style={{ background: 'rgba(36, 50, 71, 0.5)', padding: '2px 6px', borderRadius: '4px' }}>
                          {item.position}
                        </span>
                      </td>
                      <td className="font-mono" style={{ fontSize: '13.5px' }}>
                        <span style={{ color: 'var(--cyan)', fontWeight: '700' }}>
                          {item.suffix ? item.suffix.substring(0, lcpVal) : ''}
                        </span>
                        <span style={{ color: 'var(--text-secondary)' }}>
                          {item.suffix ? item.suffix.substring(lcpVal) : ''}
                        </span>
                      </td>
                      <td>
                        <span style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '14px',
                          fontWeight: '800',
                          color: item.rank === 0 ? 'var(--text-dim)' : 'var(--success)',
                          background: item.rank === 0 ? 'transparent' : 'var(--success-bg)',
                          padding: '3px 10px',
                          borderRadius: '4px',
                          border: item.rank === 0 ? 'none' : '1px solid var(--success-border)'
                        }}>
                          {item.displayLcp}
                        </span>
                      </td>
                      <td>
                        {item.rank > 0 && lcpVal > 0 ? (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div style={{
                              width: `${Math.min(140, lcpVal * 28)}px`,
                              height: '14px',
                              background: 'linear-gradient(90deg, var(--cyan), var(--accent-primary))',
                              borderRadius: '3px'
                            }} />
                            <span className="font-mono" style={{ fontSize: '11px', color: 'var(--cyan)' }}>
                              "{item.suffix ? item.suffix.substring(0, lcpVal) : ''}"
                            </span>
                          </div>
                        ) : (
                          <span style={{ color: 'var(--text-dim)', fontSize: '11.5px' }}>None (0)</span>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
