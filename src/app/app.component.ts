import { CommonModule } from '@angular/common';
import { Component, computed, ElementRef, signal, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-root',
  standalone: true,
  imports:[CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  imageSrc: string | ArrayBuffer | null = null;


  imageWidth = signal(0);
  imageHeight = signal(0);

  cellWidth = computed(() => this.imageWidth() / this.gridCols());
  cellHeight = computed(() => this.imageHeight() / this.gridRows())


  gridRows = signal(10);
  gridCols = signal(10);

  gridVisibility = computed(() =>
    Array.from({ length: this.gridRows() }, () =>
      Array(this.gridCols()).fill(false)
    )
  );

  @ViewChild('imageElement') imageElement!: ElementRef<HTMLImageElement>;

onFileSelected(event: Event): void {
  const input = event.target as HTMLInputElement;

  if (input.files && input.files[0]) {
    const file = input.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const image = new Image();

      image.onload = () => {
        this.imageSrc = reader.result;
        this.imageWidth.set(image.width);
        this.imageHeight.set(image.height);
      };

      image.src = reader.result as string;
    };

    reader.readAsDataURL(file);
  }
}

  setRows(rowsAsString:string){
     this.gridRows.set(+rowsAsString)
  }

  setCols(colsAsString:string){
    this.gridCols.set(+colsAsString)
  }


  toggleVisibility(row: number, col: number, keyPressed:MouseEvent): void {
    // if ctrl key is pressed , toggle visbility to true
    // else toggle to false
    const gridVisibility = this.gridVisibility();
    if(keyPressed.ctrlKey){
       gridVisibility[row][col] = true
    }
    if(keyPressed.altKey){
       gridVisibility[row][col] =false
    }
  }


}