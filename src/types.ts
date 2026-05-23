/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface CollectionItem {
  id: string;
  name: string;
  price: string;
  category: string;
  materials: string[];
  specs: string[];
  description: string;
  image: string;
  coordinate: string; // Tailoring coordinate reference e.g. "45.2 // N"
  hoverImage?: string;
}

export interface CinematicScene {
  id: string;
  title: string;
  subtitle: string;
  caption: string;
  image: string;
  coordinates: { x: string; y: string };
  exposureDefault: number; // For development simulation
  soundFreq?: number;
}

export interface JournalEntry {
  id: string;
  date: string;
  title: string;
  excerpt: string;
  body: string[];
  category: string;
}

export interface CoordinateState {
  x: number;
  y: number;
  relativeX: string;
  relativeY: string;
}
