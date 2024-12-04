import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-colors',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './colors.component.html',
  styleUrl: './colors.component.scss'
})
export class ColorsComponent {
  @Output() colorHover: EventEmitter<string> = new EventEmitter<string>(); // Emit color on hover

  colors: string[] = [
    'White',
    'Grey Melange',
    'Slate Grey',
    'Charcoal Melange',
    'Graphite Melange',
    'Graphite Grey',
    'Black',
    'Emerald',
    'Bottle Green',
    'Khaki',
    'Pink',
    'Yellow',
    'Orange',
    'Red',
    'Burgundy',
    'Royal Blue',
    'Navy Blue',
    'Denim Blue',
  ];

  selectedColor: string = '';
  hoveredColor: string = '';

  onColorSelect(color: string): void {
    this.selectedColor = color;
  }

  getColor(color: string): string {
    const colorMap: { [key: string]: string } = {
      'White': '#FFFFFF',
      'Grey Melange': '#A0A0A0',
      'Slate Grey': '#708090',
      'Charcoal Melange': '#36454F',
      'Graphite Melange': '#4B4B4B',
      'Graphite Grey': '#3A3A3A',
      'Black': '#000000',
      'Emerald': '#50C878',
      'Bottle Green': '#006A4E',
      'Khaki': '#C3B091',
      'Pink': '#FFC0CB',
      'Yellow': '#FFFF00',
      'Orange': '#FFA500',
      'Red': '#FF0000',
      'Burgundy': '#800020',
      'Royal Blue': '#4169E1',
      'Navy Blue': '#000080',
      'Denim Blue': '#1560BD',
    };
    return colorMap[color] || color;
  }

  isLightColor(color: string): boolean {
    return ['White', 'Yellow', 'Pink'].includes(color);
  }
  
  onColorHover(color: string): void {
    this.colorHover.emit(color);
  }
}
