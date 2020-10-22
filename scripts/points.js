class Polygon {
    constructor(x, y) {
        this.dots = [];
        this.x = x;
        this.y = y;
        this.area = 0;
    }

    clearPoints() {
        this.dots = [];
        this.addPoint(this.x, this.y);
        this.area = 0;
    }

    addPoint(x, y) {
        this.dots.push({
            x: x,
            y: y
        });
        this.updateArea();
    }
    
    updateArea() {
        if (this.dots.length <= 2) return;
        let newTriangle = [this.dots[0], this.dots[this.dots.length - 2], this.dots[this.dots.length - 1]];
        this.area += this.calculateArea(newTriangle);
    }

    calculateArea(points) {
        //using Gauss Shoelace
        let sum = 0;
        for (let i = 0; i < points.length; i++) {
            const point = points[i];
            const point2 = points[(i + 1) % points.length];
            sum += point.x * point2.y - point.y * point2.x;
        }
        return Math.abs(sum / 2);
    }

    getArea() {
        return this.area;
    }
}