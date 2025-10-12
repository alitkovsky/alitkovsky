import { animateObjectTo } from './motionExtends';
import { rand } from '../utils';
import { animate } from 'motion';
import { clamp, mix } from '.';
export function createBlob(options: {
    numPoints: number,
    centerX: number,
    centerY: number,
    minRadius: number,
    maxRadius: number,
    minDuration: number,
    maxDuration: number,
}, debug = false) {

    let points = [];
    let path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    let slice = (Math.PI * 2) / options.numPoints;
    let startAngle = rand(0, 360);
    const animations = []

    const centerCoords = {
        x: options.centerX,
        y: options.centerY
    }
    let magnetCoords = { ...centerCoords }
    const setMagnet = (x: number, y: number) => {
        magnetCoords = { x, y }
    }

    for (let i = 0; i < options.numPoints; i++) {

        let angle = startAngle + i * slice;
        let duration = rand(options.minDuration, options.maxDuration);

        const animationOptions: Parameters<typeof animateObjectTo>[2] = {
            duration,
            easing: sine.inOut,
            direction: 'alternate',
            repeat: Infinity,
        }

        const startX = options.centerX + Math.cos(angle) * options.minRadius
        const startY = options.centerY + Math.sin(angle) * options.minRadius
        const endX = options.centerX + Math.cos(angle) * options.maxRadius
        const endY = options.centerY + Math.sin(angle) * options.maxRadius
        let point = {
            x: startX,
            y: startY
        };
        // const animation = animateObjectTo(point, {
        //     x: options.centerX + Math.cos(angle) * options.maxRadius,
        //     y: options.centerY + Math.sin(angle) * options.maxRadius,
        // }, animationOptions);
        const animation = animate(p => {
            const angle = angleBetween(magnetCoords, point, centerCoords)
            const magnetAugment = clamp(((Math.PI - Math.abs(angle)) / Math.PI) * 0.75 - 0.5, 0, 1)
            p += magnetAugment
            p = clamp(p, 0, 1)
            point.x = mix(startX, endX, p)
            point.y = mix(startY, endY, p)
            if (i === 0) {
                update()
            }
        }, animationOptions)

        animation.currentTime = rand(0, duration)
        animations.push(animation)
        points.push(point);
    }
    const destroy = () => {
        animations.forEach(animation => animation?.cancel())
    }
    function update() {
        const data = cardinal(points, true, 1)
        if (!data.includes('NaN')) {
            path.setAttribute("d", data);
        }
    }

    return {
        path,
        destroy,
        setMagnet
    }
}

// Cardinal spline - a uniform Catmull-Rom spline with a tension option
function cardinal(data, closed, tension) {

    if (data.length < 1) return "M0 0";
    if (tension == null) tension = 1;

    let size = data.length - (closed ? 0 : 1);
    let path = "M" + data[0].x + " " + data[0].y + " C";

    for (let i = 0; i < size; i++) {

        let p0, p1, p2, p3;

        if (closed) {
            p0 = data[(i - 1 + size) % size];
            p1 = data[i];
            p2 = data[(i + 1) % size];
            p3 = data[(i + 2) % size];

        } else {
            p0 = i == 0 ? data[0] : data[i - 1];
            p1 = data[i];
            p2 = data[i + 1];
            p3 = i == size - 1 ? p2 : data[i + 2];
        }

        let x1 = p1.x + (p2.x - p0.x) / 6 * tension;
        let y1 = p1.y + (p2.y - p0.y) / 6 * tension;

        let x2 = p2.x - (p3.x - p1.x) / 6 * tension;
        let y2 = p2.y - (p3.y - p1.y) / 6 * tension;

        path += " " + x1 + " " + y1 + " " + x2 + " " + y2 + " " + p2.x + " " + p2.y;
    }

    return closed ? path + "z" : path;
}

interface Point {
    x: number;
    y: number;
}

function angleBetween(a: Point, b: Point, center: Point): number {
    const angle = Math.atan2(b.y - center.y, b.x - center.x) - Math.atan2(a.y - center.y, a.x - center.x);
    return (angle + Math.PI) % (2 * Math.PI) - Math.PI;
}

function radialDistance(a: Point, b: Point, center: Point): number {
    return Math.sqrt((b.x - center.x) ** 2 + (b.y - center.y) ** 2) - Math.sqrt((a.x - center.x) ** 2 + (a.y - center.y) ** 2);
}