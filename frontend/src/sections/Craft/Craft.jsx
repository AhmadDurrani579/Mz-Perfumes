import './Craft.css'

const stages = [
  {
    number: '01',
    title: 'SOURCED',
    description: 'Raw materials chosen from a short list of growers we’ve worked with for years, not the cheapest bid.',
  },
  {
    number: '02',
    title: 'MATURED',
    description: 'Every blend rests for a minimum of six weeks before it’s approved for bottling.',
  },
  {
    number: '03',
    title: 'NUMBERED',
    description: 'Each batch is logged and numbered — what you wear is traceable to the day it was poured.',
  },
]

export default function Craft() {
  return (
    <section id="craft" className="craft-section" aria-labelledby="craft-title">
      <div className="craft-section__inner">
        <div className="craft-ornament" aria-hidden="true" />
        <h2 id="craft-title">Poured in small batches, not factory lines.</h2>

        <div className="craft-steps">
          {stages.map((stage) => (
            <article className="craft-step" key={stage.number}>
              <p className="craft-step__label">{stage.number} — {stage.title}</p>
              <p className="craft-step__description">{stage.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
