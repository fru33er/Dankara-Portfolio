export interface BasketBounds {
  left: number;
  right: number;
  top: number;
  bottom: number;
  active: boolean;
}

export interface CatchEvent {
  type: "green" | "red";
  x: number;
  y: number;
  points: number;
}

type CatchListener = (event: CatchEvent) => void;

let basket: BasketBounds = {
  left: -9999,
  right: -9999,
  top: -9999,
  bottom: -9999,
  active: false,
};

const listeners = new Set<CatchListener>();

export function updateBasket(bounds: BasketBounds) {
  basket = bounds;
}

export function getBasket(): BasketBounds {
  return basket;
}

export function emitCatch(event: CatchEvent) {
  listeners.forEach((listener) => {
    try {
      listener(event);
    } catch {
      // ignore
    }
  });
}

export function subscribeCatch(listener: CatchListener): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

