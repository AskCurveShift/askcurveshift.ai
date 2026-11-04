import data from '@/data/glm-53-safeguard-refusals.data.json'

const descriptions = [
  'The unmodified model refused every trial.',
  'The request was framed as a security exercise.',
  'Supplied text suggested the model had already agreed.',
  'No refusals observed in the 50 modified-model trials.',
]

export function SafeguardRefusalChart() {
  return (
    <figure
      id="safeguard-chart"
      className="safeguard-chart"
      aria-labelledby="safeguard-chart-title"
    >
      <header className="safeguard-chart-header">
        <h3 id="safeguard-chart-title">When GLM-5.3 stopped refusing</h3>
        <p>Share of simulated trials where the model did not engage</p>
      </header>

      <ul className="safeguard-chart-conditions" role="list">
        {data.conditions.map((condition, index) => (
          <li
            key={condition.label}
            className={
              condition.non_engagement_percent === 0
                ? 'safeguard-chart-condition safeguard-chart-condition-modified'
                : 'safeguard-chart-condition'
            }
          >
            <div className="safeguard-chart-label">
              <span>{condition.label}</span>
              <strong>{condition.non_engagement_percent}%</strong>
            </div>
            <p>{descriptions[index]}</p>
            <div className="safeguard-chart-track" aria-hidden="true">
              <div
                className="safeguard-chart-bar"
                style={{ width: `${condition.non_engagement_percent}%` }}
              />
            </div>
          </li>
        ))}
      </ul>

      <section className="safeguard-chart-costs" aria-labelledby="safeguard-cost-title">
        <h4 id="safeguard-cost-title">Computing cost to remove safeguards</h4>
        <dl>
          <div>
            <dt>Anthropic’s research run</dt>
            <dd>~${data.computing_cost_usd.anthropic_research_run_approx.toLocaleString('en-US')}</dd>
          </div>
          <div>
            <dt>Experienced-team estimate</dt>
            <dd>~${data.computing_cost_usd.experienced_team_estimate_approx.toLocaleString('en-US')}</dd>
          </div>
        </dl>
      </section>

      <figcaption>
        <p>{data.trials_per_condition} trials per condition. Separate conditions, not sequential steps.</p>
        <p>Measures willingness to act, not successful attacks.</p>
        <p>Source: Anthropic Frontier Red Team · September 29, 2026</p>
      </figcaption>
    </figure>
  )
}
