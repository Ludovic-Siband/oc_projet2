import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';

/**
 * Displays a standalone pie chart using Chart.js.
 * 
 * It is responsible only for:
 *  - Rendering a pie chart based on provided labels and values
 *  - Handling user interaction on the chart (click on a slice)
 *  - Emitting the selected country label back to the parent component
 */
@Component({
  selector: 'app-pie-chart',
  standalone: true,
  template: `
    <div class="pie-chart">
      <canvas
        #canvas
        role="img">
      </canvas>
    </div>
  `,
})
export class PieChart implements OnDestroy, AfterViewInit {
  private chart?: Chart;
  private _labels: string[] = [];
  private _values: number[] = [];
  private viewReady = false;

    /**
     * Labels used for the chart slices.
     * Trigger a chart re-render when updated.
     */
  @Input() set labels(value: string[]) {
    this._labels = value ?? [];
    this.renderChartIfReady();
  }

    /**
     * Numeric values associated with each label.
     * Trigger a chart re-render when updated.
     */
  @Input() set values(value: number[]) {
    this._values = value ?? [];
    this.renderChartIfReady();
  }

    /**
     * Emits the label corresponding to the clicked chart slice.
     */
    @Output() sliceSelected = new EventEmitter<string>();

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
      type: 'pie',
      plugins: [ChartDataLabels],
      data: {
        labels: this._labels,
        datasets: [
          {
            label: 'Medals',
            data: this._values,
            backgroundColor: ['#0b868f', '#adc3de', '#7a3c53', '#8f6263', 'orange', '#94819d'],
            hoverOffset: 4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        layout:{
          padding: {
            top: 24,
            right: 24,
            bottom: 24,
            left: 24,
          },
        },
        plugins: {
          legend: {display: false},
          tooltip: {enabled: true},
          datalabels: {
            formatter: (_value, context) => {
              const labels = context.chart.data.labels;
              const label = labels ? labels[context.dataIndex] : undefined;

              return typeof label === 'string' ? label : '';
            },
            anchor: 'end',
            align: 'end',
            offset: 8,
            clamp: true,
            clip: false,
            color: '#3b3b3b',
            font: {
              size: 14,
              weight: 500
            }
          }
        },
        onClick: (_event, elements) => {
          if (!this.chart || !elements.length) {
            return;
          }

          const index = elements[0].index;
          const label = this.chart.data.labels?.[index];

          if (typeof label === 'string') {
            this.sliceSelected.emit(label);
          }
        },
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
