const sleep = (delay) => {  
    return new Promise(resolve => {  
      setTimeout(resolve, delay)  
    });  
}

class Ellipse {
    constructor (a, b, useLeftFocus, ctx, color="white") {
        this.ctx = ctx;
        this.setSize(a, b);
        this.color = color;
    }

    updateFocus() {
        let focus = [0, 0];
        const focusDistance = this.getFocusDistance();
        if (this.a > this.b) {
            focus[0] = (this.useLeftFocus != true) ? focusDistance : -focusDistance;
        } else 
            focus[1] = (this.useLeftFocus != true) ? focusDistance : -focusDistance;
        return focus;
    }

    getFocusDistance() {
        const aSquare = Math.pow(this.a, 2);
        const bSquare = Math.pow(this.b, 2);
        const c = Math.sqrt(Math.abs(aSquare - bSquare));
        return c;
    }

    setSize(a, b, useLeftFocus=true) {
        this.useLeftFocus = useLeftFocus;
        this.a = parseFloat(a);
        this.b = parseFloat(b);
        this.focus = this.updateFocus();
    }

    getArea() {
        return Math.PI * this.a * this.b;
    }

    draw(x, y, areasAmt=13) {
        const triangleArea = this.getArea() / areasAmt;

        //color set
        this.ctx.strokeStyle = this.color;
        this.ctx.fillStyle = this.color;

        //draw ellipse
        this.ctx.beginPath();
        const firstX = x + this.a * Math.sin(0);
        const firstY = y + this.b * Math.cos(0);
        this.ctx.moveTo(firstX, firstY);
        
        let polygon = new Polygon(x + this.focus[0], y + this.focus[1]);
        polygon.addPoint(firstX, firstY);

        let actualX, actualY, previousArea;
        for (let t = 0; t <= 2 * Math.PI; t += .002) {

            actualX = x + this.a * Math.sin(t);
            actualY = y + this.b * Math.cos(t);

            this.ctx.lineTo(actualX, actualY);
            this.ctx.stroke();
            //draw line
            polygon.addPoint(actualX, actualY);
            if (polygon.calculateArea() >= triangleArea || t == 0) {
                polygon.clearPoints();
                this.ctx.moveTo(x + this.focus[0], y + this.focus[1]);
                this.ctx.lineTo(actualX, actualY);
                this.ctx.stroke();
            }
        }
        
        this.ctx.lineTo(firstX, firstY);
        this.ctx.stroke();
    }
}