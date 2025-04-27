import "../css/ChordDiagram.css"

const ChordDiagram = ({ name, positions, fingers }) => {
  // Renderiza um diagrama de acorde para violão
  const renderFretboard = () => {
    const frets = 5
    const strings = 6

    const grid = []

    for (let i = 0; i < frets; i++) {
      for (let j = 0; j < strings; j++) {
        const position = positions[0][j]
        const finger = fingers[0][j]

        const isActive = position === i && position !== 0
        const isOpen = position === 0 && i === 0
        const isMuted = position === "x" && i === 0

        grid.push(
          <div
            key={`${i}-${j}`}
            className={`fret ${isActive ? "active" : ""} ${isOpen ? "open" : ""} ${isMuted ? "muted" : ""}`}
            style={{ gridRow: i + 1, gridColumn: j + 1 }}
          >
            {isActive && <div className="dot">{finger}</div>}
            {isOpen && <div className="open-circle"></div>}
            {isMuted && <div className="muted-x">x</div>}
          </div>,
        )
      }
    }

    return grid
  }

  return (
    <div className="chord-diagram">
      <div className="chord-name">{name}</div>
      <div className="fretboard">{renderFretboard()}</div>
      <div className="fret-markers">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  )
}

export default ChordDiagram
