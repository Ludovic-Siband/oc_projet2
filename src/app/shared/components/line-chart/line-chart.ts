import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import Chart from 'chart.js/auto';

/**
 * Displays a standalone line chart using Chart.js.
 * 
 * It is responsible only for:
 *  - Rendering a line chart from provided labels and numeric values
 *  - Destroy the previous chart instance before creating a new one
 *  - Wait for the view to be initialized before rendering (canvas required)
 */
@Component({
  selector: 'app-line-chart',
  standalone: true,
  template: `
    <div class="line-chart">
      <canvas #canvas></canvas>
    </div>
  `,
})
export class LineChart implements AfterViewInit, OnDestroy {
  private chart?: Chart;
  private viewReady = false;
  private _labels: (string | number)[] = [];
  private _values: number[] = [];
  private _datasetLabel = 'Values';

  @Input() set labels(value: (string | number)[]) {
    this._labels = value ?? [];
    this.renderChartIfReady();
  }

  @Input() set values(value: number[]) {
    this._values = value ?? [];
    this.renderChartIfReady();
  }

  @Input() set datasetLabel(value: string) {
    this._datasetLabel = value ?? 'Values';
    this.renderChartIfReady();
  }

  @ViewChild('canvas', { static: true })
  private canvasRef!: ElementRef<HTMLCanvasElement>;

  ngAfterViewInit(): void {
    this.viewReady = true;
    this.renderChartIfReady();
  }

  ngOnDestroy(): void {
    this.destroyChart();
  }

  private renderChartIfReady(): void {
    
    if (!this.viewReady) {
      return;
    }

    if (!this._labels.length || !this._values.length) {
      this.destroyChart();
      return;
    }

    this.renderChart();
  }

  private renderChart(): void {
    this.destroyChart();

    const context = this.canvasRef.nativeElement.getContext('2d');
    if (!context) {
      return;
    }

    this.chart = new Chart(context, {
      type: 'line',
      data: {
        labels: this._labels,
        datasets: [
          {
            label: this._datasetLabel,
            data: this._values,
            borderWidth: 2,
            tension: 0.2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });
  }

  private destroyChart(): void {
    if (this.chart) {
      this.chart.destroy();
      this.chart = undefined;
    }
  }
}
