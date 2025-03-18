import { Mesh, Renderer, Transform } from "ogl";

export interface ScreenSize {
  width: number;
  height: number;
}

export interface Viewport {
  width: number;
  height: number;
}

export interface MediaProps {
  geometry: any;
  gl: Renderer["gl"];
  image: string;
  videoUrl?: string;
  index: number;
  length: number;
  renderer: Renderer;
  scene: Transform;
  screen: ScreenSize;
  viewport: Viewport;
  bend: number;
  borderRadius?: number;
  onVideoClick?: (videoUrl: string) => void;
}

export interface AppConfig {
  items?: { image: string; text: string; videoUrl?: string }[];
  bend?: number;
  borderRadius?: number;
  onVideoClick?: (videoUrl: string) => void;
  isModalOpen?: boolean;
}

export interface CircularGalleryProps {
  items?: { image: string; text: string; videoUrl?: string }[];
  bend?: number;
  borderRadius?: number;
}

export interface TitleProps {
  gl: Renderer;
  plane: Mesh;
  renderer: Renderer;
  text: string;
  textColor?: string;
  font?: string;
}
