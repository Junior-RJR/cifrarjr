"use client"

import { useState, useEffect, useRef } from "react"
import "../css/CifraViewer.css"
import { FaPlay, FaPause, FaHeart, FaCheck } from "react-icons/fa"
import { MdOutlineKeyboardArrowDown } from "react-icons/md"

const CifraViewer2 = () => {
  const [isScrolling, setIsScrolling] = useState(false)
  const [scrollSpeed, setScrollSpeed] = useState(20) // Valor inicial (0-100)
  const cifraRef = useRef(null)
  const sliderRef = useRef(null)
  const isDraggingRef = useRef(false)
  const accumulatedScrollRef = useRef(0) // Para acumular valores parciais de scroll

  // Função para converter o valor do slider (0-100) para a velocidade real
  const getActualSpeed = (sliderValue) => {
    // Quando o slider está em 0, a velocidade é 0
    if (sliderValue === 0) return 0

    // Escala exponencial para dar mais controle nas velocidades baixas
    // Valor mínimo EXTREMAMENTE pequeno para velocidades baixas
    const minSpeed = 0.0005 // 10x mais lento que antes
    const maxSpeed = 2.5

    // Convertendo o valor do slider (0-100) para um valor entre minSpeed e maxSpeed
    // Usando uma curva mais suave para dar mais controle nas velocidades baixas
    return minSpeed + (maxSpeed - minSpeed) * Math.pow(sliderValue / 100, 2.2)
  }

  const toggleScroll = () => {
    setIsScrolling(!isScrolling)
    // Resetar o acumulador quando inicia/para a rolagem
    accumulatedScrollRef.current = 0
  }

  // Funções para o controle deslizante
  const handleSliderMouseDown = (e) => {
    isDraggingRef.current = true
    updateSliderPosition(e)
    document.addEventListener("mousemove", handleSliderMouseMove)
    document.addEventListener("mouseup", handleSliderMouseUp)
  }

  const handleSliderMouseMove = (e) => {
    if (isDraggingRef.current) {
      updateSliderPosition(e)
    }
  }

  const handleSliderMouseUp = () => {
    isDraggingRef.current = false
    document.removeEventListener("mousemove", handleSliderMouseMove)
    document.removeEventListener("mouseup", handleSliderMouseUp)
  }

  const updateSliderPosition = (e) => {
    if (!sliderRef.current) return

    const sliderRect = sliderRef.current.getBoundingClientRect()
    const sliderWidth = sliderRect.width
    const offsetX = e.clientX - sliderRect.left

    // Calculando a porcentagem (0-100)
    const percentage = Math.max(0, Math.min(100, (offsetX / sliderWidth) * 100))

    setScrollSpeed(Math.round(percentage))
  }

  // Funções para incrementar/decrementar a velocidade
  const increaseSpeed = () => {
    setScrollSpeed((prev) => Math.min(100, prev + 10))
  }

  const decreaseSpeed = () => {
    setScrollSpeed((prev) => Math.max(0, prev - 10))
  }

  useEffect(() => {
    let animationFrameId
    let lastTimestamp = 0

    const scrollStep = (timestamp) => {
      if (!lastTimestamp) lastTimestamp = timestamp

      const elapsed = timestamp - lastTimestamp
      const actualSpeed = getActualSpeed(scrollSpeed)

      if (elapsed > 16 && actualSpeed > 0) {
        // Acumular o valor de scroll para lidar com valores muito pequenos
        accumulatedScrollRef.current += actualSpeed * (elapsed / 16)

        // Quando acumular pelo menos 0.5 pixels, fazer o scroll
        if (accumulatedScrollRef.current >= 0.5) {
          const pixelsToScroll = Math.floor(accumulatedScrollRef.current)
          window.scrollBy({
            top: pixelsToScroll,
            behavior: "auto", // Usando 'auto' para evitar travamentos
          })

          // Subtrair a parte inteira e manter apenas a parte fracionária
          accumulatedScrollRef.current -= pixelsToScroll
        }

        lastTimestamp = timestamp
      }

      if (isScrolling) {
        animationFrameId = requestAnimationFrame(scrollStep)
      }
    }

    if (isScrolling) {
      animationFrameId = requestAnimationFrame(scrollStep)
    }

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [isScrolling, scrollSpeed])

  // Função para colorir as cifras (notas musicais)
  const formatCifra = (text) => {
    // Regex para identificar acordes comuns
    const chordRegex = /\b([A-G][#b]?m?[0-9]?(?:\/[A-G][#b]?)?)\b/g

    // Substituir acordes por spans com classe para estilização
    const formattedText = text.replace(chordRegex, '<span class="chord">$1</span>')

    // Retornar HTML formatado
    return { __html: formattedText }
  }

  const cifraText = `
  
                              G
Na via dolorosa, estava esquecido?
                         A     Bm
Crucificaram Ele, estava esquecido?
                              F#m
No primeiro dia, estava esquecido?
                             G
No segundo dia, estava esquecido?


Mas no terceiro dia, Ele ressuscitou
                         A    Bm
No terceiro dia, Ele se levantou

e mandou eu vir aqui
              F#m
Só para te dizer


            F7M/C
a morte venceste 
             G
O véu Tu rompeste
           Am7         C/E
a tumba vazia agora está

           F7M/C
O céu Te adora
               G
Proclama Tua glória
              Am7            C/E
Pois ressuscitaste e vivo está

         Am             F9          C
e te adorar é o que sustenta-me de pé
                        G
Eu não vou, não vou perder a guerra
 Dm           F9           C
Te louvar em meio as tentações
                 G
é mais que estratégia
           Am        F9
Posso não ver o amanhã
          C
Mas hoje sei
            G            Dm
Que esse deserto vai chegar ao fim
      F9
O Senhor está cuidando de mim       


  `

return (
  <div className="cifra-container">
    <div className="song-header">
      <div className="song-info">
        <h1>O Fogo Arderá</h1>
        <h2>Alexsander Lúcio</h2>
        <div className="cifra-type">
          <span className="cifra-badge">
            <FaCheck /> Cifra: Simplificada (violão e guitarra)
          </span>
          <MdOutlineKeyboardArrowDown />
        </div>
      </div>
      <div className="song-actions">
        <button className="favorite-button">
          <FaHeart /> Favoritar Cifra
        </button>
        <div className="views">133.102 exibições</div>
      </div>
    </div>

    <div className="cifra-content-container">
      <div className="cifra-content" ref={cifraRef}>
        <div className="cifra-controls">
          <div className="auto-scroll">
            <button onClick={toggleScroll} className={isScrolling ? "active" : ""}>
              {isScrolling ? <FaPause /> : <FaPlay />} Auto rolagem
            </button>
            <div className="scroll-speed">
              <button onClick={decreaseSpeed}>-</button>
              <span>½ Tom</span>
              <button onClick={increaseSpeed}>+</button>
            </div>
          </div>
        </div>

        <div className="tom-info">
          <span>Tom: </span>
          <span className="tom">C</span>
        </div>

        <div className="cifra-text" dangerouslySetInnerHTML={formatCifra(cifraText)}></div>
      </div>
    </div>

    <div className="player-controls">
      <button className={`play-button ${isScrolling ? "playing" : ""}`} onClick={toggleScroll}>
        {isScrolling ? <FaPause /> : <FaPlay />}
      </button>
      <div className="speed-control">
        <button onClick={decreaseSpeed}>-</button>
        <div className="speed-slider" ref={sliderRef} onMouseDown={handleSliderMouseDown}>
          <div className="speed-value" style={{ width: `${scrollSpeed}%` }}></div>
          <div className="speed-handle" style={{ left: `${scrollSpeed}%` }}></div>
        </div>
        <button onClick={increaseSpeed}>+</button>
      </div>
    </div>
  </div>
)
}

export default CifraViewer2
