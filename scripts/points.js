class Polygon {
    constructor(x, y) {
        this.dots = [];
        this.x = x;
        this.y = y;
    }

    addPoint(x, y) {
        this.dots.push({
            x: x,
            y: y
        });
    }

    clearPoints() {
        this.dots = [];
        this.addPoint(this.x, this.y);
    }
    
    calculateArea() {
        let sum = 0;
        for (let i = 0; i < this.dots.length; i++) {
            const point = this.dots[i];
            const point2 = this.dots[(i + 1) % this.dots.length];
            sum += point.x * point2.y - point.y * point2.x;
        }
        return Math.abs(sum / 2);
    }
}