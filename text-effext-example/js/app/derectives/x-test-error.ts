import { AlpineDirective } from "./AlpineDirective";

export default class TestError extends AlpineDirective {
    onMount(): void {
        console.log('hello')
        throw new Error('This is just a test error')
    }
}