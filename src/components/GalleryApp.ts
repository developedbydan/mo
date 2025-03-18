import { AppConfig } from "@/types/gallery";
import { debounce, lerp } from "@/utils/gallery";
import { Camera, Plane, Renderer, Transform } from "ogl";
import { Media } from "./Media";

export class GalleryApp {
  container: HTMLElement;
  scroll: {
    ease: number;
    current: number;
    target: number;
    last: number;
    position?: number;
  };
  onCheckDebounce: (...args: any[]) => void;
  renderer!: Renderer;
  gl!: any;
  camera!: Camera;
  scene!: Transform;
  planeGeometry!: Plane;
  medias: Media[] = [];
  mediasImages: { image: string; text: string; videoUrl?: string }[] = [];
  screen!: { width: number; height: number };
  viewport!: { width: number; height: number };
  raf: number = 0;

  boundOnResize!: () => void;
  boundOnTouchDown!: (e: MouseEvent | TouchEvent) => void;
  boundOnTouchMove!: (e: MouseEvent | TouchEvent) => void;
  boundOnTouchUp!: () => void;

  isDown: boolean = false;
  start: number = 0;
  onVideoClick?: (videoUrl: string) => void;
  isModalOpen: boolean = false;
  isDragging: boolean = false;
  dragStartX: number = 0;
  dragStartY: number = 0;
  dragThreshold: number = 10;

  constructor(
    container: HTMLElement,
    {
      items,
      bend = 1,
      borderRadius = 0,
      onVideoClick,
      isModalOpen = false,
    }: AppConfig
  ) {
    document.documentElement.classList.remove("no-js");
    this.container = container;
    this.scroll = { ease: 0.05, current: 0, target: 0, last: 0 };
    this.onCheckDebounce = debounce(this.onCheck.bind(this), 200);
    this.onVideoClick = onVideoClick;
    this.isModalOpen = isModalOpen;
    this.createRenderer();
    this.createCamera();
    this.createScene();
    this.onResize();
    this.createGeometry();
    this.createMedias(items, bend, borderRadius);
    this.update();
    this.addEventListeners();
  }

  createRenderer() {
    this.renderer = new Renderer({ alpha: true });
    this.gl = this.renderer.gl;
    this.gl.clearColor(0, 0, 0, 0);
    const canvas = this.renderer.gl.canvas as HTMLCanvasElement;
    this.container.appendChild(canvas);

    canvas.addEventListener("click", (e) => {
      if (this.isDragging) {
        return;
      }

      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const ndcX = (x / rect.width) * 2 - 1;
      const ndcY = -(y / rect.height) * 2 + 1;

      this.medias.forEach((media) => {
        const plane = media.plane;

        const planeLeft = plane.position.x - plane.scale.x / 2;
        const planeRight = plane.position.x + plane.scale.x / 2;
        const planeTop = plane.position.y + plane.scale.y / 2;
        const planeBottom = plane.position.y - plane.scale.y / 2;

        if (
          ndcX >= planeLeft &&
          ndcX <= planeRight &&
          ndcY >= planeBottom &&
          ndcY <= planeTop
        ) {
          media.onTouchDown();
        }
      });
    });
  }

  createCamera() {
    this.camera = new Camera(this.gl);
    this.camera.fov = 45;
    this.camera.position.z = 20;
  }

  createScene() {
    this.scene = new Transform();
  }

  createGeometry() {
    this.planeGeometry = new Plane(this.gl, {
      heightSegments: 50,
      widthSegments: 100,
    });
  }

  createMedias(
    items: { image: string; text: string; videoUrl?: string }[] | undefined,
    bend: number = 1,
    borderRadius: number
  ) {
    const defaultItems = [
      {
        image: `https://picsum.photos/seed/1/800/600`,
        text: "Video1",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
      },
      {
        image: `https://picsum.photos/seed/2/800/600`,
        text: "Video2",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
      },
      {
        image: `https://picsum.photos/seed/3/800/600`,
        text: "Video3",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
      },
      {
        image: `https://picsum.photos/seed/4/800/600`,
        text: "Video4",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
      },
      {
        image: `https://picsum.photos/seed/5/800/600`,
        text: "Video5",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
      },
    ];
    const galleryItems = items && items.length ? items : defaultItems;
    this.mediasImages = galleryItems.concat(galleryItems);
    this.medias = this.mediasImages.map((data, index) => {
      return new Media({
        geometry: this.planeGeometry,
        gl: this.gl,
        image: data.image,
        videoUrl: data.videoUrl,
        index,
        length: this.mediasImages.length,
        renderer: this.renderer,
        scene: this.scene,
        screen: this.screen,
        viewport: this.viewport,
        bend,
        borderRadius,
        onVideoClick: this.onVideoClick,
      });
    });
  }

  onWheel(e: WheelEvent) {
    e.preventDefault();
  }

  onTouchDown(e: MouseEvent | TouchEvent) {
    this.isDown = true;
    this.isDragging = false;
    this.scroll.position = this.scroll.current;
    this.start = "touches" in e ? e.touches[0].clientX : e.clientX;
    this.dragStartX = "touches" in e ? e.touches[0].clientX : e.clientX;
    this.dragStartY = "touches" in e ? e.touches[0].clientY : e.clientY;
  }

  onTouchMove(e: MouseEvent | TouchEvent) {
    if (!this.isDown) return;

    const currentX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const currentY = "touches" in e ? e.touches[0].clientY : e.clientY;

    const dragDistanceX = Math.abs(currentX - this.dragStartX);
    const dragDistanceY = Math.abs(currentY - this.dragStartY);

    if (!this.isDragging && dragDistanceX < this.dragThreshold) {
      return;
    }

    if (dragDistanceY > dragDistanceX) {
      return;
    }

    this.isDragging = true;
    const distance = (this.start - currentX) * 0.05;
    this.scroll.target = (this.scroll.position ?? 0) + distance;
  }

  onTouchUp() {
    this.isDown = false;
    setTimeout(() => {
      this.isDragging = false;
    }, 100);
    this.onCheck();
  }

  onCheck() {
    if (!this.medias || !this.medias[0]) return;
    const width = this.medias[0].width;
    const itemIndex = Math.round(Math.abs(this.scroll.target) / width);
    const item = width * itemIndex;
    this.scroll.target = this.scroll.target < 0 ? -item : item;
  }

  onResize() {
    this.screen = {
      width: this.container.clientWidth,
      height: this.container.clientHeight,
    };
    this.renderer.setSize(this.screen.width, this.screen.height);
    this.camera.perspective({
      aspect: this.screen.width / this.screen.height,
    });
    const fov = (this.camera.fov * Math.PI) / 180;
    const height = 2 * Math.tan(fov / 2) * this.camera.position.z;
    const width = height * this.camera.aspect;
    this.viewport = { width, height };
    if (this.medias) {
      this.medias.forEach((media) =>
        media.onResize({ screen: this.screen, viewport: this.viewport })
      );
    }
  }

  update() {
    this.scroll.current = lerp(
      this.scroll.current,
      this.scroll.target,
      this.scroll.ease
    );
    const direction = this.scroll.current > this.scroll.last ? "right" : "left";
    if (this.medias) {
      this.medias.forEach((media) => media.update(this.scroll, direction));
    }
    this.renderer.render({ scene: this.scene, camera: this.camera });
    this.scroll.last = this.scroll.current;
    this.raf = window.requestAnimationFrame(this.update.bind(this));
  }

  addEventListeners() {
    this.boundOnResize = this.onResize.bind(this);
    this.boundOnTouchDown = this.onTouchDown.bind(this);
    this.boundOnTouchMove = this.onTouchMove.bind(this);
    this.boundOnTouchUp = this.onTouchUp.bind(this);

    window.addEventListener("resize", this.boundOnResize);

    if (!this.isModalOpen) {
      window.addEventListener("mousedown", this.boundOnTouchDown);
      window.addEventListener("mousemove", this.boundOnTouchMove);
      window.addEventListener("mouseup", this.boundOnTouchUp);
      window.addEventListener("touchstart", this.boundOnTouchDown);
      window.addEventListener("touchmove", this.boundOnTouchMove);
      window.addEventListener("touchend", this.boundOnTouchUp);
    }
  }

  destroy() {
    window.cancelAnimationFrame(this.raf);
    window.removeEventListener("resize", this.boundOnResize);
    window.removeEventListener("mousedown", this.boundOnTouchDown);
    window.removeEventListener("mousemove", this.boundOnTouchMove);
    window.removeEventListener("mouseup", this.boundOnTouchUp);
    window.removeEventListener("touchstart", this.boundOnTouchDown);
    window.removeEventListener("touchmove", this.boundOnTouchMove);
    window.removeEventListener("touchend", this.boundOnTouchUp);
    if (
      this.renderer &&
      this.renderer.gl &&
      this.renderer.gl.canvas.parentNode
    ) {
      this.renderer.gl.canvas.parentNode.removeChild(
        this.renderer.gl.canvas as HTMLCanvasElement
      );
    }
  }
}
