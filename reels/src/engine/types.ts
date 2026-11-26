import type {FontSpec} from './fit';
import type {EaseName} from './motion';
import type {Brand, SceneKind, TransitionId} from './schema';

export type Palette = {
  bg: string; // canvas
  surface: string; // cards, blocks
  ink: string; // primary text on bg
  inkOnSurface: string;
  muted: string; // secondary text on bg
  accent: string; // brand-led highlight
  onAccent: string; // text on accent
  line: string; // rules, frames
};

export type TextAnim = 'wordRise' | 'typewriter' | 'maskUp' | 'punch' | 'trackIn' | 'fade' | 'slideIn' | 'highlight' | 'stamp' | 'lineStagger';
export type MediaAnim = 'kenBurns' | 'zoomOut' | 'panUp' | 'panLeft' | 'parallax' | 'float' | 'spotlight' | 'curtain' | 'still' | 'tiltIn' | 'orbit' | 'dolly' | 'tilt3d';
export type LayoutId =
  | 'fullBleed' | 'framed' | 'split' | 'magazine' | 'collage' | 'arch' | 'typeOnly' | 'floating'
  | 'filmFrame' | 'lowerThird' | 'swissGrid' | 'sticker' | 'cta' | 'logo' | 'noir'
  | 'depthStack' | 'cube' | 'floor' | 'montage';
export type Texture = 'none' | 'paper' | 'fabric' | 'grid' | 'film' | 'gradient' | 'motif' | 'halftone';
export type LogoAnim = 'fade' | 'stamp' | 'outline' | 'letters' | 'mask';
export type CtaStyle = 'minimal' | 'pill' | 'product' | 'sticker' | 'block';

export type ThemeSpec = {
  id: string;
  name: string;
  mood: string;
  description: string;
  fonts: {display: FontSpec; body: FontSpec; label: FontSpec};
  palette: (b: Brand) => Palette;
  pacing: {
    /** relative screen time per scene kind */
    weights: Partial<Record<SceneKind, number>>;
    transitionFrames: number;
    energy: 'slow' | 'medium' | 'fast';
    ease: EaseName;
  };
  motion: {text: Partial<Record<SceneKind, TextAnim>> & {default: TextAnim}; media: MediaAnim[]; transitions: TransitionId[]};
  layouts: Partial<Record<SceneKind, LayoutId[]>> & {default: LayoutId[]};
  decor: {grain: number; vignette: number; texture: Texture; letterbox?: boolean; frameRule?: boolean; grade?: string};
  logoAnim: LogoAnim;
  cta: CtaStyle;
  captionStyle: 'karaoke' | 'editorial' | 'box' | 'none';
  /** typical title sizes (px at 1080 wide) */
  scale: {hero: number; title: number; body: number; label: number};
};
