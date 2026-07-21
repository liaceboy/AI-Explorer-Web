type OrbState = 'idle' | 'typing' | 'searching';

export default function SolarSystemOrb({ state }: { state: OrbState }) {
  return (
    <div className={`solar-orb solar-orb--${state}`} aria-hidden>
      <div className="solar-orb-glow" />
      <div className="solar-orb-sun" />
      <div className="solar-orb-orbit solar-orb-orbit--1">
        <span className="solar-orb-planet solar-orb-planet--cyan" />
      </div>
      <div className="solar-orb-orbit solar-orb-orbit--2">
        <span className="solar-orb-planet solar-orb-planet--purple" />
      </div>
      <div className="solar-orb-orbit solar-orb-orbit--3">
        <span className="solar-orb-planet solar-orb-planet--gold" />
      </div>
      <div className="solar-orb-ring solar-orb-ring--a" />
      <div className="solar-orb-ring solar-orb-ring--b" />
    </div>
  );
}
