export const PlaySound = (sound: string, volume?: number) => {
    const audio = new Audio(sound);
    audio.volume = volume ? volume : 0.75;
    audio.play().catch(error => {
        console.error("Error al reproducir el sonido:", error);
    });
}