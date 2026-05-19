import { useState, useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';

type Rarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';

const baseColor: Record<Rarity, string> = {
  common: '#6b7280',
  uncommon: '#52b788',
  rare: '#219ebc',
  epic: '#a855f7',
  legendary: '#ffb703',
};

// Função para clarear uma cor
const lightenColor = (color: string, amount: number) => {
  if (!color || typeof color !== 'string') {
    return '#6b7280'; // fallback para gray
  }
  const hex = color.replace('#', '');
  if (hex.length !== 6) {
    return '#6b7280'; // fallback para gray
  }
  const r = Math.min(255, parseInt(hex.substring(0, 2), 16) + amount);
  const g = Math.min(255, parseInt(hex.substring(2, 4), 16) + amount);
  const b = Math.min(255, parseInt(hex.substring(4, 6), 16) + amount);
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
};

export function useAnimatedGradient(rarity: Rarity) {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const [gradientColors, setGradientColors] = useState<string[]>([]);

  useEffect(() => {
    // Validação de rarity
    const validRarity: Rarity = rarity && baseColor[rarity] ? rarity : 'common';
    const base = baseColor[validRarity];
    
    // Para common e uncommon, retornar cor estática
    if (validRarity === 'common' || validRarity === 'uncommon') {
      setGradientColors([base, base, base]);
      return;
    }

    setGradientColors([base, base, base]);

    // Animação infinita lenta com easing suave (apenas para rare, epic, legendary)
    const animate = () => {
      Animated.loop(
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 4000,
          easing: Easing.linear,
          useNativeDriver: false,
        })
      ).start();
    };

    animate();

    let lastUpdate = 0;
    const listener = animatedValue.addListener(({ value }) => {
      // Throttle para atualizar apenas a cada 16ms (~60fps)
      const now = Date.now();
      if (now - lastUpdate < 16) return;
      lastUpdate = now;

      // Criar efeito de onda usando função senoidal
      // Elevar ao cubo para que o brilho seja ainda mais curto (mais tempo escuro, menos tempo brilhando)
      const wave1 = Math.pow(Math.sin(value * Math.PI * 2) * 0.5 + 0.5, 3);
      const wave2 = Math.pow(Math.sin((value * Math.PI * 2) + Math.PI / 2) * 0.5 + 0.5, 3);
      const wave3 = Math.pow(Math.sin((value * Math.PI * 2) + Math.PI) * 0.5 + 0.5, 3);

      // Criar gradiente com múltiplas cores para efeito wave metálico
      // Valores reduzidos para brilho menos intenso
      const color1 = lightenColor(base, Math.round(wave1 * 80));
      const color2 = lightenColor(base, Math.round(wave2 * 100));
      const color3 = lightenColor(base, Math.round(wave3 * 80));

      setGradientColors([color1, color2, color3]);
    });

    return () => {
      animatedValue.removeListener(listener);
      animatedValue.stopAnimation();
    };
  }, [rarity]);

  return gradientColors;
}
