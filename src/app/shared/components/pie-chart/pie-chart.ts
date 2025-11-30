import {
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnDestroy,
    Output,
    ViewChild,
} from '@angular/core';
import Chart from 'chart.js/auto';

/**
 * Displays a standalone pie chart using Chart.js.
 * 
 * It is responsible only for:
 *  - Rendering a pie chart based on provided labels and values
 *  - Handling user interaction on the chart (click on a slice)
 *  - Emitting the selected country label back to the parent component
 */

@Component({
    selector: 'app-medals-pie-chart',
    standalone: true,
    template: `
     <div class="pie-chart">
      <canvas #canvas></canvas>
    </div>`,
})
export class PieChart implements OnDestroy {

    private chart?: Chart;
    private _labels: string[] = [];
    private _values: number[] = [];

    /**
     * Labels used for the chart slices.
     * Trigger a chart re-render when updated.
     */
    @Input() set labels(value: string[]) {
        this._labels = value ?? [];
        this.renderChart();
    }

    /**
     * Numeric values associated with each label.
     * Trigger a chart re-render when updated.
     */
    @Input() set values(value: number[]) {
        this._values = value ?? [];
        this.renderChart();
    }

    /**
     * Emits the label corresponding to the clicked chart slice.
     */
    @Output() countrySelected = new EventEmitter<string>();

    @ViewChild('canvas', { static: true })
    private canvasRef!: ElementRef<HTMLCanvasElement>;

    ngOnDestroy(): void {
        this.destroyChart();
    }

    /**
     * Creates a new pie chart or re-renders it if data changes.
     * Ensures the previous chart instance is always destroyed before creating a new one.
     */
    private renderChart(): void {
        if (!this.canvasRef) {
            return;
        }

        this.destroyChart();

        if (!this._labels.length || !this._values.length) {
            return;
        }

        const context = this.canvasRef.nativeElement.getContext('2d');
        if (!context) {
            return;
        }

        this.chart = new Chart(context, {
            type: 'pie',
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
                onClick: (_event, elements) => {
                    if (!this.chart || !elements.length) {
                        return;
                    }

                    const index = elements[0].index;
                    const label = this.chart.data.labels?.[index];

                    if (typeof label === 'string') {
                        this.countrySelected.emit(label);
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
