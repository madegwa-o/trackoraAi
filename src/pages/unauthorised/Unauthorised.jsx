import { useNavigate, Link } from "react-router-dom"
import { useState, useEffect, useRef } from "react"
import styles from "./Unauthorised.module.css"

export default function Unauthorised() {
    const navigate = useNavigate()
    const canvasRef = useRef(null)
    const animationRef = useRef(null)

    // Game state
    const [gameActive, setGameActive] = useState(false)
    const [gameStarted, setGameStarted] = useState(false)
    const [attemptsLeft, setAttemptsLeft] = useState(5)
    const [score, setScore] = useState(0)
    const [level, setLevel] = useState(1)
    const [gameWon, setGameWon] = useState(false)
    const [isAiming, setIsAiming] = useState(false)
    const [wind, setWind] = useState(0)
    const [ball, setBall] = useState({
        x: 80,
        y: 350,
        vx: 0,
        vy: 0,
        radius: 12,
        flying: false,
        bounces: 0
    })
    const [trajectory, setTrajectory] = useState([])
    const [hoopAnimation, setHoopAnimation] = useState(0)

    // Game physics constants
    const gravity = 0.5
    const friction = 0.98
    const bounciness = 0.7
    const windResistance = 0.02
    const slingshot = { x: 80, y: 350 }

    // Basketball hoop (more challenging positioning)
    const hoop = {
        x: 620,
        y: 180,
        width: 60,
        height: 8,
        rimWidth: 4,
        netHeight: 40
    }

    // Dynamic difficulty based on level
    const getDifficulty = () => {
        return {
            wind: level > 1 ? (Math.random() - 0.5) * (level * 0.3) : 0,
            hoopSize: Math.max(50, 70 - level * 3),
            attempts: Math.max(3, 6 - level)
        }
    }

    const startGame = () => {
        const difficulty = getDifficulty()
        setGameActive(true)
        setGameStarted(true)
        setAttemptsLeft(difficulty.attempts)
        setScore(0)
        setLevel(1)
        setGameWon(false)
        setWind(difficulty.wind)
        setBall({
            x: 80,
            y: 350,
            vx: 0,
            vy: 0,
            radius: 12,
            flying: false,
            bounces: 0
        })
        setTrajectory([])
    }

    const nextLevel = () => {
        const nextLvl = level + 1
        const difficulty = getDifficulty()
        setLevel(nextLvl)
        setAttemptsLeft(difficulty.attempts)
        setWind((Math.random() - 0.5) * (nextLvl * 0.3))
        resetBall()
    }

    const resetBall = () => {
        setBall({
            x: 80,
            y: 350,
            vx: 0,
            vy: 0,
            radius: 12,
            flying: false,
            bounces: 0
        })
        setTrajectory([])
        setIsAiming(false)
    }

    const resetGame = () => {
        setGameActive(false)
        setGameStarted(false)
        setAttemptsLeft(5)
        setScore(0)
        setLevel(1)
        setGameWon(false)
        setWind(0)
        resetBall()
        if (animationRef.current) {
            cancelAnimationFrame(animationRef.current)
        }
    }

    // Mouse/touch handlers for aiming
    const handleMouseDown = (e) => {
        if (!gameActive || ball.flying || attemptsLeft <= 0) return

        const canvas = canvasRef.current
        const rect = canvas.getBoundingClientRect()
        const mouseX = e.clientX - rect.left
        const mouseY = e.clientY - rect.top

        // Check if click is near the ball
        const distance = Math.sqrt((mouseX - ball.x) ** 2 + (mouseY - ball.y) ** 2)
        if (distance < 30) {
            setIsAiming(true)
        }
    }

    const handleMouseMove = (e) => {
        if (!isAiming || ball.flying) return

        const canvas = canvasRef.current
        const rect = canvas.getBoundingClientRect()
        const mouseX = e.clientX - rect.left
        const mouseY = e.clientY - rect.top

        // Calculate trajectory preview with wind effect
        const dx = slingshot.x - mouseX
        const dy = slingshot.y - mouseY
        const power = Math.min(Math.sqrt(dx * dx + dy * dy) / 2.5, 30)
        const angle = Math.atan2(dy, dx)

        const vx = Math.cos(angle) * power
        const vy = Math.sin(angle) * power

        // Generate trajectory points with wind
        const points = []
        let px = slingshot.x
        let py = slingshot.y
        let pvx = vx
        let pvy = vy

        for (let i = 0; i < 80; i++) {
            px += pvx
            py += pvy
            pvy += gravity
            pvx *= friction
            pvx += wind * windResistance // Apply wind effect

            if (py > 450) break // Ground level
            points.push({ x: px, y: py })
        }

        setTrajectory(points)
    }

    const handleMouseUp = (e) => {
        if (!isAiming || ball.flying) return

        const canvas = canvasRef.current
        const rect = canvas.getBoundingClientRect()
        const mouseX = e.clientX - rect.left
        const mouseY = e.clientY - rect.top

        const dx = slingshot.x - mouseX
        const dy = slingshot.y - mouseY
        const power = Math.min(Math.sqrt(dx * dx + dy * dy) / 2.5, 30)
        const angle = Math.atan2(dy, dx)

        // Launch the ball
        setBall(prev => ({
            ...prev,
            vx: Math.cos(angle) * power,
            vy: Math.sin(angle) * power,
            flying: true,
            bounces: 0
        }))

        setIsAiming(false)
        setTrajectory([])
        setAttemptsLeft(prev => prev - 1)
    }

    // Check if ball scores in hoop
    const checkHoopScore = (ballPos) => {
        const hoopLeft = hoop.x
        const hoopRight = hoop.x + hoop.width
        const hoopTop = hoop.y
        const hoopBottom = hoop.y + hoop.height

        // Ball must pass through hoop from above
        return (
            ballPos.x > hoopLeft + 5 &&
            ballPos.x < hoopRight - 5 &&
            ballPos.y > hoopTop - 5 &&
            ballPos.y < hoopBottom + 10 &&
            ballPos.vy > 0 // Moving downward
        )
    }

    // Game physics update
    useEffect(() => {
        if (!gameActive || !ball.flying) return

        const updatePhysics = () => {
            setBall(prevBall => {
                let newBall = { ...prevBall }

                // Apply physics
                newBall.x += newBall.vx
                newBall.y += newBall.vy
                newBall.vy += gravity
                newBall.vx *= friction

                // Apply wind effect
                newBall.vx += wind * windResistance

                // Check for hoop score
                if (checkHoopScore(newBall)) {
                    const levelBonus = level * 50
                    const bounceBonus = Math.max(0, (3 - newBall.bounces) * 25)
                    const totalPoints = 100 + levelBonus + bounceBonus

                    setScore(prev => prev + totalPoints)
                    setHoopAnimation(Date.now())

                    // Check if advancing to next level
                    if (level < 5) {
                        setTimeout(() => {
                            nextLevel()
                        }, 2000)
                    } else {
                        setGameWon(true)
                        setGameActive(false)
                    }

                    newBall.flying = false
                    return newBall
                }

                // Ground collision with bounce
                if (newBall.y + newBall.radius > 450) {
                    newBall.y = 450 - newBall.radius
                    newBall.vy *= -bounciness
                    newBall.vx *= 0.8
                    newBall.bounces++

                    // Stop bouncing if too slow or too many bounces
                    if (Math.abs(newBall.vy) < 2 || newBall.bounces > 3) {
                        newBall.flying = false

                        if (attemptsLeft <= 1) {
                            setTimeout(() => setGameActive(false), 1000)
                        } else {
                            setTimeout(() => resetBall(), 2000)
                        }
                    }
                }

                // Side walls collision
                if (newBall.x - newBall.radius < 0 || newBall.x + newBall.radius > 800) {
                    newBall.vx *= -0.6
                    newBall.x = newBall.x < 400 ? newBall.radius : 800 - newBall.radius
                    newBall.bounces++
                }

                // Backboard collision (behind hoop)
                if (newBall.x + newBall.radius > hoop.x + hoop.width + 20 &&
                    newBall.x - newBall.radius < hoop.x + hoop.width + 30 &&
                    newBall.y > hoop.y - 50 && newBall.y < hoop.y + 100) {
                    newBall.vx *= -0.7
                    newBall.x = hoop.x + hoop.width + 20 - newBall.radius
                }

                // Rim collision
                if (newBall.y + newBall.radius > hoop.y &&
                    newBall.y - newBall.radius < hoop.y + hoop.height &&
                    ((newBall.x + newBall.radius > hoop.x - 5 && newBall.x + newBall.radius < hoop.x + 5) ||
                        (newBall.x - newBall.radius > hoop.x + hoop.width - 5 && newBall.x - newBall.radius < hoop.x + hoop.width + 5))) {
                    newBall.vy *= -0.3
                    newBall.vx *= 0.5
                    newBall.bounces++
                }

                // Stop if ball goes too far off screen
                if (newBall.x > 900 || newBall.y > 600) {
                    newBall.flying = false
                    if (attemptsLeft <= 1) {
                        setTimeout(() => setGameActive(false), 1000)
                    } else {
                        setTimeout(() => resetBall(), 1500)
                    }
                }

                return newBall
            })

            if (ball.flying) {
                animationRef.current = requestAnimationFrame(updatePhysics)
            }
        }

        animationRef.current = requestAnimationFrame(updatePhysics)

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current)
            }
        }
    }, [gameActive, ball.flying, attemptsLeft, level, wind])

    // Canvas drawing
    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        const draw = () => {
            // Clear canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            // Draw sky gradient
            const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
            gradient.addColorStop(0, '#87CEEB')
            gradient.addColorStop(1, '#98FB98')
            ctx.fillStyle = gradient
            ctx.fillRect(0, 0, canvas.width, canvas.height)

            // Draw ground
            ctx.fillStyle = '#8B4513'
            ctx.fillRect(0, 450, canvas.width, 100)

            // Draw grass
            ctx.fillStyle = '#228B22'
            ctx.fillRect(0, 445, canvas.width, 10)

            // Draw basketball court line
            ctx.strokeStyle = 'white'
            ctx.lineWidth = 3
            ctx.beginPath()
            ctx.arc(400, 450, 100, Math.PI, 0)
            ctx.stroke()

            // Draw slingshot
            ctx.strokeStyle = '#8B4513'
            ctx.lineWidth = 8
            ctx.beginPath()
            ctx.moveTo(slingshot.x - 15, slingshot.y + 30)
            ctx.lineTo(slingshot.x - 15, slingshot.y - 40)
            ctx.moveTo(slingshot.x + 15, slingshot.y + 30)
            ctx.lineTo(slingshot.x + 15, slingshot.y - 40)
            ctx.stroke()

            // Draw slingshot strings when aiming
            if (isAiming && trajectory.length > 0) {
                ctx.strokeStyle = '#654321'
                ctx.lineWidth = 3
                ctx.beginPath()
                ctx.moveTo(slingshot.x - 15, slingshot.y - 30)
                ctx.lineTo(ball.x, ball.y)
                ctx.lineTo(slingshot.x + 15, slingshot.y - 30)
                ctx.stroke()
            }

            // Draw trajectory preview
            if (trajectory.length > 0) {
                ctx.strokeStyle = 'rgba(255, 100, 100, 0.7)'
                ctx.lineWidth = 3
                ctx.setLineDash([8, 8])
                ctx.beginPath()
                trajectory.forEach((point, index) => {
                    if (index === 0) {
                        ctx.moveTo(point.x, point.y)
                    } else {
                        ctx.lineTo(point.x, point.y)
                    }
                })
                ctx.stroke()
                ctx.setLineDash([])
            }

            // Draw basketball hoop pole
            ctx.fillStyle = '#C0C0C0'
            ctx.fillRect(hoop.x + hoop.width + 25, hoop.y, 8, 270)

            // Draw backboard
            ctx.fillStyle = 'white'
            ctx.fillRect(hoop.x + hoop.width + 15, hoop.y - 60, 15, 120)
            ctx.strokeStyle = 'black'
            ctx.lineWidth = 2
            ctx.strokeRect(hoop.x + hoop.width + 15, hoop.y - 60, 15, 120)

            // Draw backboard square
            ctx.strokeRect(hoop.x + hoop.width + 18, hoop.y - 25, 9, 18)

            // Animate hoop on score
            const animOffset = hoopAnimation && (Date.now() - hoopAnimation < 500) ?
                Math.sin((Date.now() - hoopAnimation) * 0.02) * 3 : 0

            // Draw basketball rim
            ctx.fillStyle = '#FF4500'
            ctx.fillRect(hoop.x, hoop.y + animOffset, hoop.width, hoop.height)

            // Draw rim details
            ctx.fillStyle = '#FF6600'
            ctx.fillRect(hoop.x, hoop.y + animOffset, hoop.width, 2)
            ctx.fillRect(hoop.x, hoop.y + hoop.height - 2 + animOffset, hoop.width, 2)

            // Draw net
            ctx.strokeStyle = 'white'
            ctx.lineWidth = 2
            for (let i = 0; i < 6; i++) {
                const x = hoop.x + (i * hoop.width / 5) + 5
                ctx.beginPath()
                ctx.moveTo(x, hoop.y + hoop.height + animOffset)
                ctx.quadraticCurveTo(x + 5, hoop.y + hoop.height + 20 + animOffset, x, hoop.y + hoop.height + hoop.netHeight + animOffset)
                ctx.stroke()
            }

            // Draw basketball
            const ballGradient = ctx.createRadialGradient(ball.x - 3, ball.y - 3, 0, ball.x, ball.y, ball.radius)
            ballGradient.addColorStop(0, '#FF8C00')
            ballGradient.addColorStop(1, '#FF4500')
            ctx.fillStyle = ballGradient
            ctx.beginPath()
            ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2)
            ctx.fill()

            // Basketball lines
            ctx.strokeStyle = 'black'
            ctx.lineWidth = 1.5
            ctx.beginPath()
            ctx.arc(ball.x, ball.y, ball.radius - 2, 0, Math.PI * 2)
            ctx.moveTo(ball.x - ball.radius, ball.y)
            ctx.lineTo(ball.x + ball.radius, ball.y)
            ctx.moveTo(ball.x, ball.y - ball.radius)
            ctx.lineTo(ball.x, ball.y + ball.radius)
            ctx.stroke()

            // Draw wind indicator
            if (Math.abs(wind) > 0.1) {
                ctx.fillStyle = 'rgba(255, 255, 255, 0.8)'
                ctx.font = '16px Arial'
                ctx.fillText(`Wind: ${wind > 0 ? '→' : '←'} ${Math.abs(wind).toFixed(1)}`, 10, 30)
            }

            requestAnimationFrame(draw)
        }

        draw()
    }, [ball, trajectory, isAiming, wind, hoopAnimation])

    return (
        <div className={styles.container}>
            {/* Animated background */}
            <div className={styles.backgroundAnimation}>
                <div className={styles.floatingShape}></div>
                <div className={styles.floatingShape}></div>
                <div className={styles.floatingShape}></div>
            </div>

            <div className={styles.content}>
                <div className={styles.errorSection}>
                    <div className={styles.lockIcon}>🔒</div>
                    <h1 className={styles.title}>Access Denied</h1>
                    <p className={styles.subtitle}>You don't have permission to view this page</p>
                </div>

                <div className={styles.gameSection}>
                    <h2 className={styles.gameTitle}>🏀 Basketball Challenge!</h2>
                    <p className={styles.gameInstructions}>
                        Shoot the basketball through the hoop! Navigate wind, bounces, and increasing difficulty across 5 levels.
                    </p>

                    {!gameStarted ? (
                        <button className={styles.startButton} onClick={startGame}>
                            Start Basketball Challenge
                        </button>
                    ) : (
                        <div className={styles.gameContainer}>
                            <div className={styles.gameStats}>
                                <div className={styles.stat}>Level: {level}</div>
                                <div className={styles.stat}>Attempts: {attemptsLeft}</div>
                                <div className={styles.stat}>Score: {score}</div>
                                {Math.abs(wind) > 0.1 && (
                                    <div className={styles.stat}>
                                        Wind: {wind > 0 ? '→' : '←'} {Math.abs(wind).toFixed(1)}
                                    </div>
                                )}
                            </div>

                            {gameActive ? (
                                <div className={styles.gameCanvasContainer}>
                                    <canvas
                                        ref={canvasRef}
                                        width={800}
                                        height={500}
                                        className={styles.gameCanvas}
                                        onMouseDown={handleMouseDown}
                                        onMouseMove={handleMouseMove}
                                        onMouseUp={handleMouseUp}
                                    />
                                    <div className={styles.gameInstructions}>
                                        Click and drag the basketball to aim, then release to shoot!
                                        {level > 1 && <span> Watch out for wind effects!</span>}
                                    </div>
                                </div>
                            ) : (
                                <div className={styles.gameOver}>
                                    {gameWon ? (
                                        <>
                                            <h3>🏆 Champion!</h3>
                                            <p>You conquered all 5 levels!</p>
                                            <p>Final Score: {score}</p>
                                        </>
                                    ) : (
                                        <>
                                            <h3>Game Over!</h3>
                                            <p>Reached Level {level}</p>
                                            <p>Final Score: {score}</p>
                                        </>
                                    )}
                                    <button className={styles.playAgainButton} onClick={startGame}>
                                        Play Again
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <div className={styles.navigation}>
                    <Link to='/' className={styles.navLink}>
                        <span className={styles.linkIcon}>🏠</span>
                        Home
                    </Link>
                    <Link to='/articles' className={styles.navLink}>
                        <span className={styles.linkIcon}>📖</span>
                        Articles
                    </Link>
                    <Link to='/login' className={styles.navLink}>
                        <span className={styles.linkIcon}>🔑</span>
                        Login
                    </Link>
                </div>
            </div>
        </div>
    )
}